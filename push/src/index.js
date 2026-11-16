// Itmaen push server (Cloudflare Worker + Durable Object).
// Stores phones' push subscriptions and sends a notification at each prayer time.
// No manual setup: the VAPID key pair is generated on first use and kept in the Durable Object.
import { DurableObject } from "cloudflare:workers";
import { sendPush, b64u } from "./webpush.js";
import { times, ymdIn } from "./prayer.js";

const SITE = "https://etmaen.pages.dev/";
const ORIGINS = ["https://etmaen.pages.dev", "https://itmaen.pages.dev", "https://rana-ashrafff.github.io", "http://localhost:8765", "http://localhost:8770"];
const SITES = { "https://etmaen.pages.dev": "https://etmaen.pages.dev/", "https://itmaen.pages.dev": "https://itmaen.pages.dev/", "https://rana-ashrafff.github.io": "https://rana-ashrafff.github.io/itmaen/" };
const NAMES = { ar: ["الفجر", "الشروق", "الظهر", "العصر", "المغرب", "العشاء"], en: ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] };
const TXT = {
  ar: { t: p => `🕌 صلاة ${p} الآن`, b: (p, tm) => `حان الآن موعد أذان ${p} · ${tm} — حيّ على الصلاة، حيّ على الفلاح`, pt: (p, n) => `باقي ${n} دقائق على ${p}`, pb: "اتوضأ واستعد للصلاة", test: "تمام! الإشعارات شغالة، وهتوصلك في وقت كل صلاة", st: "إشعار تجريبي في ميعاده ✅", sb: "كده إشعارات الصلاة هتوصلك في وقتها بالظبط، حتى والتطبيق مقفول" },
  en: { t: p => `🕌 ${p} prayer now`, b: (p, tm) => `It's time for ${p} · ${tm} — come to prayer, come to success`, pt: (p, n) => `${n} minutes until ${p}`, pb: "Make wudu and get ready", test: "All set! You'll get a notification at every prayer time", st: "Scheduled test arrived on time ✅", sb: "Your prayer notifications will arrive right on time, even when the app is closed" }
};
const PRAYERS = [0, 2, 3, 4, 5];

export class SubStore extends DurableObject {
  async vapid() {
    let k = await this.ctx.storage.get("vapid");
    if (!k) {
      const kp = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
      k = { publicKey: b64u.enc(await crypto.subtle.exportKey("raw", kp.publicKey)), privateJwk: await crypto.subtle.exportKey("jwk", kp.privateKey) };
      await this.ctx.storage.put("vapid", k);
    }
    return k;
  }
  async put(id, rec) { await this.ctx.storage.put("s:" + id, rec); }
  async get(id) { return (await this.ctx.storage.get("s:" + id)) || null; }
  async del(id) { await this.ctx.storage.delete("s:" + id); }
  async all() { const m = await this.ctx.storage.list({ prefix: "s:" }); return [...m.entries()].map(([k, v]) => [k.slice(2), v]); }
  async delMany(ids) { if (ids.length) await this.ctx.storage.delete(ids.map(i => "s:" + i)); }
  async log(id, entry) { const k = "l:" + id, L = (await this.ctx.storage.get(k)) || []; L.unshift(entry); await this.ctx.storage.put(k, L.slice(0, 8)); }
  async logs(id) { return (await this.ctx.storage.get("l:" + id)) || []; }
}

const store = env => env.SUBS.get(env.SUBS.idFromName("main"));
function cors(req) {
  const o = req.headers.get("Origin") || "";
  return { "Access-Control-Allow-Origin": ORIGINS.includes(o) ? o : ORIGINS[0], "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400", Vary: "Origin" };
}
const json = (obj, status, h) => new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", ...h } });
async function idOf(endpoint) { const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(endpoint)); return [...new Uint8Array(d)].slice(0, 12).map(b => b.toString(16).padStart(2, "0")).join(""); }
function clean(b) {
  const s = b.sub || {};
  if (typeof s.endpoint !== "string" || !/^https:\/\//.test(s.endpoint) || !s.keys || !s.keys.p256dh || !s.keys.auth) return null;
  const num = (v, lo, hi, d) => (typeof v === "number" && v >= lo && v <= hi ? v : d);
  let tz = typeof b.tz === "string" ? b.tz.slice(0, 64) : "UTC"; try { new Intl.DateTimeFormat("en", { timeZone: tz }); } catch (_) { tz = "UTC"; }
  return {
    sub: { endpoint: s.endpoint.slice(0, 1000), keys: { p256dh: String(s.keys.p256dh).slice(0, 200), auth: String(s.keys.auth).slice(0, 100) } },
    lat: num(b.lat, -90, 90, 30.0444), lng: num(b.lng, -180, 180, 31.2357), tz,
    method: ["egypt", "umm", "mwl", "isna", "karachi"].includes(b.method) ? b.method : "mwl",
    asr: b.asr === 2 ? 2 : 1, prayers: Array.isArray(b.prayers) ? b.prayers.slice(0, 5).map(x => (x ? 1 : 0)) : [1, 1, 1, 1, 1],
    pre: [0, 5, 10, 15, 20, 30].includes(b.pre) ? b.pre : 0, lang: b.lang === "en" ? "en" : "ar", at: Date.now(),
    testAt: typeof b.testAt === "number" && b.testAt > Date.now() && b.testAt < Date.now() + 30 * 60000 ? Math.floor(b.testAt / 60000) * 60000 : 0
  };
}

export default {
  async fetch(req, env) {
    const h = cors(req), url = new URL(req.url), st = store(env), subject = env.VAPID_SUBJECT || SITE;
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    if (req.method === "GET" && url.pathname === "/") return json({ ok: true, service: "itmaen-push" }, 200, h);
    if (req.method === "GET" && url.pathname === "/vapid") return json({ publicKey: (await st.vapid()).publicKey }, 200, { ...h, "Cache-Control": "public, max-age=3600" });
    if (req.method !== "POST") return json({ error: "method" }, 405, h);
    let b; try { b = await req.json(); } catch (_) { return json({ error: "json" }, 400, h); }
    if (url.pathname === "/subscribe") {
      const rec = clean(b); if (!rec) return json({ error: "bad subscription" }, 400, h);
      rec.site = SITES[req.headers.get("Origin") || ""] || SITE;
      await st.put(await idOf(rec.sub.endpoint), rec);
      let test = null; if (b.test) { test = await sendPush(rec.sub, { title: "اطمئن", body: TXT[rec.lang].test, tag: "test", url: rec.site + "#prayer" }, await st.vapid(), subject); await st.log(await idOf(rec.sub.endpoint), { at: Date.now(), kind: "test", status: test }); }
      return json({ ok: true, test }, 200, h);
    }
    if (url.pathname === "/status") {
      if (typeof b.endpoint !== "string") return json({ error: "endpoint" }, 400, h);
      const id = await idOf(b.endpoint), rec = await st.get(id);
      return json({ found: !!rec, tz: rec && rec.tz, prayers: rec && rec.prayers, log: await st.logs(id) }, 200, h);
    }
    if (url.pathname === "/unsubscribe") {
      if (typeof b.endpoint !== "string") return json({ error: "endpoint" }, 400, h);
      await st.del(await idOf(b.endpoint)); return json({ ok: true }, 200, h);
    }
    return json({ error: "not found" }, 404, h);
  },
  async scheduled(event, env) {
    const minute = Math.floor(event.scheduledTime / 60000) * 60000, st = store(env), all = await st.all(), subject = env.VAPID_SUBJECT || SITE;
    const jobs = [], done = [];
    for (const [id, r] of all) {
      if (r.testAt && r.testAt <= minute) { if (minute - r.testAt < 5 * 60000) jobs.push([id, r, { title: TXT[r.lang].st, body: TXT[r.lang].sb, tag: "sched-test", url: (r.site || SITE) + "#prayer" }]); done.push([id, r]); }
      const d = ymdIn(minute, r.tz), tt = times(d.y, d.m, d.d, r.lat, r.lng, r.method, r.asr), N = NAMES[r.lang], T = TXT[r.lang];
      PRAYERS.forEach((idx, pi) => {
        if (!r.prayers[pi]) return;
        if (tt[idx] === minute) { const tm = new Intl.DateTimeFormat(r.lang === "ar" ? "ar-EG" : "en-GB", { timeZone: r.tz, hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(tt[idx]));
          jobs.push([id, r, { title: T.t(N[idx]), body: T.b(N[idx], tm), tag: "adhan-" + idx, url: (r.site || SITE) + "#prayer", adhan: 1 }]); }
        if (r.pre && tt[idx] - r.pre * 60000 === minute) jobs.push([id, r, { title: T.pt(N[idx], r.pre), body: T.pb, tag: "pre-" + idx, url: (r.site || SITE) + "#prayer" }]);
      });
    }
    for (const [id, r] of done) { r.testAt = 0; await st.put(id, r); }
    if (!jobs.length) return;
    const keys = await st.vapid(), dead = [];
    await Promise.all(jobs.map(async ([id, r, msg]) => { let s = 0; try { s = await sendPush(r.sub, msg, keys, subject); if (s === 404 || s === 410) dead.push(id); } catch (_) { s = -1; } try { await st.log(id, { at: minute, kind: msg.tag, title: msg.title, status: s }); } catch (_) {} }));
    await st.delMany(dead);
  }
};
