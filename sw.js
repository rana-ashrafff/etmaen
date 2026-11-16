/* Itmaen service worker: works offline, keeps the app fast. */
const VERSION = "itmaen-v19";
const CORE = ["./", "index.html", "manifest.webmanifest", "data/quran.js", "data/content.js", "data/extra.js",
  "data/habits.js", "data/kids.js", "data/pages.js", "data/fonts/kfgqpc-hafs.otf", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // fonts, recitation audio: straight to network
  // Pages: network first so updates arrive; fall back to cache offline
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put("index.html", cp)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // Everything else: cache first, then save what we fetch (translations, adhan audio)
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok && !req.headers.has("range")) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); }
    return r;
  })));
});
/* Push notifications (adhan) — sent by the Itmaen push server */
self.addEventListener("push", e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (_) { d = { title: "اطمئن", body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || "اطمئن", {
    body: d.body || "", icon: "icons/icon-192.png", badge: "icons/icon-192.png", tag: d.tag || "itmaen",
    lang: "ar", dir: "rtl", vibrate: d.adhan ? [500, 200, 500, 200, 800] : [300, 150, 300], data: { url: d.url || (self.registration.scope + "#prayer") }, renotify: true, requireInteraction: !!d.adhan, silent: false
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || self.registration.scope;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) { if ("focus" in c) { c.navigate(target); return c.focus(); } }
    return self.clients.openWindow(target);
  }));
});
