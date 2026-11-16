// Itmaen push server (Cloudflare Worker + Durable Object).
// Stores phones' push subscriptions and sends a notification at each prayer time.
// No manual setup: the VAPID key pair is generated on first use and kept in the Durable Object.
import { DurableObject } from "cloudflare:workers";
import { sendPush, b64u } from "./webpush.js";
import { times, ymdIn } from "./prayer.js";

const SITE = "https://etmaen.pages.dev/";
const ORIGINS = ["https://etmaen.pages.dev", "https://itmaen.pages.dev", "https://rana-ashrafff.github.io", "http://localhost:8765", "http://localhost:8770", "http://localhost:8000", "https://localhost", "capacitor://localhost", "http://localhost"];
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
  // generic key/value used by the per-user account instances
  async kget(k) { return (await this.ctx.storage.get(k)) ?? null; }
  async kgetMany(ks) { const m = await this.ctx.storage.get(ks); return ks.map(k => m.get(k) ?? null); }
  async kput(obj) { await this.ctx.storage.put(obj); }
  async kdel(ks) { if (ks.length) await this.ctx.storage.delete(ks); }
  async wipe() { await this.ctx.storage.deleteAll(); }
  async klist(prefix) { return [...(await this.ctx.storage.list({ prefix })).entries()]; }
  async incr(k, n) { const v = ((await this.ctx.storage.get(k)) || 0) + (n || 1); await this.ctx.storage.put(k, v); return v; }
}

const store = env => env.SUBS.get(env.SUBS.idFromName("main"));
const userStore = (env, email) => env.SUBS.get(env.SUBS.idFromName("acct:" + email));
const enc = new TextEncoder();
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
const sha = async s => hex(await crypto.subtle.digest("SHA-256", enc.encode(s)));
const randHex = n => hex(crypto.getRandomValues(new Uint8Array(n)));
const statsStore = env => env.SUBS.get(env.SUBS.idFromName("stats"));
const dayIn = (ts, tz) => new Intl.DateTimeFormat("en-CA", { timeZone: tz || "Africa/Cairo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(ts));
const CHUNK = 100000, MAXDATA = 4000000;
function eqStr(a, b) { if (a.length !== b.length) return false; let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i); return r === 0; }
// Accounts: the app derives `auth` from the password on the phone (slow PBKDF2) and encrypts the
// backup on the phone too, so this server never sees the password or the user's data in clear.
async function account(path, b, env, h) {
  const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
  if (!/^[^\s@]{1,64}@[^\s@]{1,100}\.[^\s@]{2,}$/.test(email)) return json({ error: "email" }, 400, h);
  const us = userStore(env, email);
  if (path === "/acct/register" || path === "/acct/login") {
    if (typeof b.auth !== "string" || !/^[0-9a-f]{64}$/.test(b.auth)) return json({ error: "auth" }, 400, h);
    let u = await us.kget("user");
    if (path === "/acct/register") {
      if (u) return json({ error: "exists" }, 409, h);
      try { await statsStore(env).incr("accts", 1); } catch (_) {}
      const salt = randHex(16); u = { salt, hash: await sha(salt + b.auth), created: Date.now(), toks: [], fails: 0, lock: 0 };
    } else {
      if (!u) return json({ error: "nouser" }, 404, h);
      if (u.lock > Date.now()) return json({ error: "locked", wait: Math.ceil((u.lock - Date.now()) / 60000) }, 429, h);
      if (!eqStr(await sha(u.salt + b.auth), u.hash)) { u.fails = (u.fails || 0) + 1; if (u.fails >= 8) { u.fails = 0; u.lock = Date.now() + 15 * 60000; } await us.kput({ user: u }); return json({ error: "wrong" }, 401, h); }
      u.fails = 0; u.lock = 0;
    }
    const token = randHex(24); u.toks = [await sha(token), ...(u.toks || [])].slice(0, 12);
    await us.kput({ user: u });
    const meta = await us.kget("meta");
    return json({ ok: true, token, updated: meta ? meta.updated : 0 }, 200, h);
  }
  if (typeof b.token !== "string" || b.token.length > 100) return json({ error: "token" }, 401, h);
  const u = await us.kget("user"), th = await sha(b.token);
  if (!u || !(u.toks || []).includes(th)) return json({ error: "token" }, 401, h);
  const meta = (await us.kget("meta")) || { updated: 0, n: 0 };
  if (path === "/acct/meta") return json({ updated: meta.updated }, 200, h);
  if (path === "/acct/pull") {
    if (!meta.n) return json({ updated: 0, data: null }, 200, h);
    const parts = await us.kgetMany([...Array(meta.n).keys()].map(i => "c:" + i));
    return json({ updated: meta.updated, data: parts.join("") }, 200, h);
  }
  if (path === "/acct/push") {
    if (typeof b.data !== "string" || b.data.length > MAXDATA || !/^[A-Za-z0-9+\/=.]+$/.test(b.data)) return json({ error: "data" }, 400, h);
    if (typeof b.base === "number" && b.base && meta.updated > b.base && !b.force) return json({ error: "newer", updated: meta.updated }, 409, h);
    const n = Math.ceil(b.data.length / CHUNK), put = {}; for (let i = 0; i < n; i++) put["c:" + i] = b.data.slice(i * CHUNK, (i + 1) * CHUNK);
    const nm = { updated: Date.now(), n, size: b.data.length }; put.meta = nm;
    await us.kput(put); if (meta.n > n) await us.kdel([...Array(meta.n - n).keys()].map(i => "c:" + (n + i)));
    return json({ ok: true, updated: nm.updated }, 200, h);
  }
  if (path === "/acct/logout") { u.toks = u.toks.filter(x => x !== th); await us.kput({ user: u }); return json({ ok: true }, 200, h); }
  if (path === "/acct/delete") { try { await statsStore(env).incr("accts", -1); } catch (_) {} await us.wipe(); return json({ ok: true }, 200, h); }
  return json({ error: "not found" }, 404, h);
}
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

// Anonymous usage counter: each installed app sends a random device id once a day (no name, email or location).
async function ping(b, env, h) {
  const ss = statsStore(env), now = Date.now(), day = dayIn(now);
  if (b.web) { await ss.incr("w:" + day, 1); return json({ ok: true }, 200, h); }
  if (typeof b.id !== "string" || !/^[0-9a-f]{16,40}$/.test(b.id)) return json({ error: "id" }, 400, h);
  const k = "d:" + b.id, d = (await ss.kget(k)) || { f: day };
  const isNewDay = d.l !== day;
  d.l = day; d.p = ["ios", "and", "pc", "apk"].includes(b.p) ? b.p : "other"; d.n = b.push ? 1 : 0; d.a = b.acct ? 1 : 0; d.k = b.kid ? 1 : 0;
  await ss.kput({ [k]: d }); if (isNewDay) await ss.incr("c:" + day, 1);
  return json({ ok: true }, 200, h);
}
async function stats(url, env) {
  const H = { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
  if (!env.STATS_KEY || url.searchParams.get("key") !== env.STATS_KEY) return new Response("Not found", { status: 404 });
  const ss = statsStore(env), now = Date.now(), today = dayIn(now), d7 = dayIn(now - 6 * 864e5), d30 = dayIn(now - 29 * 864e5);
  const devs = (await ss.klist("d:")).map(x => x[1]);
  const c = { tot: devs.length, today: 0, w: 0, m: 0, nw: 0, push: 0, acct: 0, kid: 0, ios: 0, and: 0, pc: 0, apk: 0, other: 0 };
  devs.forEach(d => { if (d.l === today) c.today++; if (d.l >= d7) c.w++; if (d.l >= d30) c.m++; if (d.f === today) c.nw++; if (d.n) c.push++; if (d.a) c.acct++; if (d.k) c.kid++; c[d.p] = (c[d.p] || 0) + 1; });
  const days = [...Array(14).keys()].reverse().map(i => dayIn(now - i * 864e5));
  const hist = await ss.kgetMany(days.map(x => "c:" + x)), web = await ss.kgetMany(days.map(x => "w:" + x));
  const accts = (await ss.kget("accts")) || 0, subs = (await store(env).all()).length, mx = Math.max(1, ...hist.map(x => x || 0));
  const card = (n, t) => `<div class="c"><b>${n.toLocaleString("ar-EG")}</b><span>${t}</span></div>`;
  const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>إحصائيات اطمئن</title><style>
body{margin:0;font-family:system-ui,"Segoe UI",Tahoma,sans-serif;background:#F6F2E8;color:#0B3D2E;padding:20px}h1{margin:0 0 4px;font-size:24px}p{margin:0 0 18px;color:#5E6F69;font-size:14px}
h2{font-size:17px;margin:24px 0 10px}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.c{background:#fff;border-radius:16px;padding:14px;box-shadow:0 6px 18px -12px rgba(11,61,46,.4)}
.c b{display:block;font-size:28px;color:#0B5A43}.c span{font-size:13px;color:#5E6F69}.bars{display:grid;grid-template-columns:repeat(14,1fr);gap:6px;align-items:end;height:160px;background:#fff;border-radius:16px;padding:14px}
.bar{display:grid;grid-template-rows:auto 1fr auto;justify-items:center;height:100%;font-size:11px;color:#5E6F69}.bar i{width:70%;background:#0B5A43;border-radius:6px 6px 3px 3px;align-self:end}</style></head><body>
<h1>إحصائيات اطمئن</h1><p>أرقام بس، من غير أي بيانات شخصية · آخر تحديث ${new Date(now).toLocaleString("ar-EG", { timeZone: "Africa/Cairo" })}</p>
<h2>المستخدمين</h2><div class="g">${card(c.tot, "إجمالي الأجهزة اللي ثبّتت التطبيق")}${card(c.today, "فتحوا التطبيق النهارده")}${card(c.w, "فتحوه آخر ٧ أيام")}${card(c.m, "فتحوه آخر ٣٠ يوم")}${card(c.nw, "أجهزة جديدة النهارده")}</div>
<h2>الأجهزة</h2><div class="g">${card(c.ios, "آيفون")}${card(c.and, "أندرويد (من اللينك)")}${card(c.apk, "أندرويد (APK)")}${card(c.pc, "لابتوب / كمبيوتر")}</div>
<h2>المميزات</h2><div class="g">${card(subs, "مفعّلين إشعارات الأذان")}${card(accts, "حسابات اتعملت")}${card(c.kid, "بيستخدموا حساب أطفال")}${card(web[13] || 0, "زاروا صفحة التعريف النهارده")}</div>
<h2>اللي فتحوا التطبيق كل يوم (آخر ١٤ يوم)</h2><div class="bars">${days.map((x, i) => `<div class="bar"><span>${(hist[i] || 0).toLocaleString("ar-EG")}</span><i style="height:${Math.round((hist[i] || 0) / mx * 100)}%"></i><span>${x.slice(8)}/${x.slice(5, 7)}</span></div>`).join("")}</div>
</body></html>`;
  return new Response(html, { headers: H });
}

export default {
  async fetch(req, env) {
    const h = cors(req), url = new URL(req.url), st = store(env), subject = env.VAPID_SUBJECT || SITE;
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    if (req.method === "GET" && url.pathname === "/") return json({ ok: true, service: "itmaen-push" }, 200, h);
    if (req.method === "GET" && url.pathname === "/vapid") return json({ publicKey: (await st.vapid()).publicKey }, 200, { ...h, "Cache-Control": "public, max-age=3600" });
    if (req.method === "GET" && url.pathname === "/stats") return stats(url, env);
    if (req.method !== "POST") return json({ error: "method" }, 405, h);
    let b; try { b = await req.json(); } catch (_) { return json({ error: "json" }, 400, h); }
    if (url.pathname.startsWith("/acct/")) return account(url.pathname, b || {}, env, h);
    if (url.pathname === "/ping") return ping(b || {}, env, h);
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
