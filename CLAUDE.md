# اطمئن (Itmaen) — project notes for Claude

English display name is **Etmaen** (owner's choice, v23). Internal ids stay "itmaen" (worker name, sw cache, crypto salts `itmaen-auth`/`itmaen-data` — never change those or accounts break).

Islamic app ("اطمئن", from ﴿أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾). The owner speaks Egyptian Arabic: reply in Egyptian Arabic, keep it simple and friendly.

## Live
- Site (PWA): https://etmaen.pages.dev — Cloudflare Pages, deploys automatically from `main` of this repo (no build step, output dir `/`).
- Old address https://rana-ashrafff.github.io/itmaen/ (GitHub Pages, same repo) forwards to etmaen.pages.dev (script at top of `index.html`).
- Push server: https://itmaen.ranaxashraf88.workers.dev — Cloudflare Worker `itmaen`, deployed manually with `npx wrangler deploy` from `push/` on the owner's Mac (Workers Builds Git link was lost when the worker got deleted and recreated on 2026-11-16; all old subscriptions + VAPID keys were lost then). Durable Object stores subscriptions + auto-generated VAPID keys; cron every minute sends prayer-time notifications.

## Files
- `index.html` — the whole app (edit this file directly; the old /home/user/noor source is no longer used) (HTML + CSS + JS, single file). Arabic/English via `I18N` object. Data loaded from `data/*.js`.
- `data/quran.js` (Uthmani text, quranenc via quran-json, CC BY-SA), `data/tr-*.js` translations, `data/pages.js` (604 Madinah page starts, quran-meta MIT), `data/content.js` (prophet stories, mood stories, encouragement), `data/extra.js` (quiz + sunnah library), `data/habits.js` (bad-habits solutions), `data/kids.js` (kids mode + daily "رسالة من ربنا ليك" messages), `data/fonts/kfgqpc-hafs.otf` (KFGQPC Mushaf font — license forbids modifying the file; use as-is).
- `audio/` adhan recordings, `icons/` PWA icons, `manifest.webmanifest`, `sw.js` (bump `VERSION` on every release so phones update).
- `push/` Cloudflare Worker (`src/index.js`, `src/webpush.js` RFC8291/8292 via WebCrypto, `src/prayer.js`). Test with `npx wrangler dev --local --test-scheduled`.

## Run / publish
- Local preview: `python3 -m http.server 8000` in the repo root, open http://localhost:8000
- Publish: commit + push to `main` → Cloudflare Pages + GitHub Pages + Worker all redeploy. Bump `VERSION` in `sw.js`.

## Owner preferences (important)
- No hearts anywhere (no 🤍/♥) except the heart inside the logo.
- Surah names Arabic only in Arabic mode. Use "صلى الله عليه وسلم" written out on images (the ﷺ glyph renders badly).
- Mushaf reader: full screen, page + juz always visible at top, KFGQPC font, real 604-page layout.
- Khatma counts only when the user taps «خلصت» at the end of a surah.
- No usernames/handles on Instagram post images.
- Instagram posts: always use the original post template (scratchpad ig/posts3.html CSS: tag pill, Quran in KFGQPC, src, txt, logo foot). Morning posts = beige `light`, night/evening posts = green `dark`. No other palettes. Don't repeat content already in /home/user/instagram (check captions.txt).
- Privacy: everything is stored on-device (localStorage); safe space is AES-GCM encrypted with the user's PIN.
- Optional cloud account (email + password, added v20): the phone derives `auth` and a data key from the password (PBKDF2), uploads an AES-GCM-encrypted gzip of all `rm:` keys to the worker (`/acct/*`, one Durable Object instance per email). Server never sees the password or data. Forgotten password = data can't be recovered. Device-only keys skipped: see `ACCT_SKIP`.
- Browser tab vs installed app (v21): in a normal browser tab `index.html` shows only the landing page (`#landing`: what the app is + install steps for iPhone/Android/computer, auto-picks the tab). Installed (standalone), Capacitor, `?app` in the URL, or sessionStorage `itm-web=1` → the normal app. Screenshots for it: `img/shot-*.webp`. For local testing open http://localhost:8000/?app
- Usage stats (v24): installed app POSTs `/ping` once a day with a random device id (`rm:@devId`, device-only) + platform/push/acct/kid flags; sends non-kid profile first names (`names`, shown as a list on the stats page; users are told in onbNote + landing privacy text); landing page POSTs `{web:1}`. Private page: `GET /stats?key=…` on the worker; key is the worker secret `STATS_KEY` (set with `wrangler secret put`, never commit it; the owner has the link). Account count only counts accounts created after v24.
- Weekly review («أسبوعك», `#week`): Sat→Fri daily %, review on Friday; prayer/Quran/adhkar/tasbeeh can't be removed, others can (`wkOff`).

## Open items
- iPhone web push: tap-to-subscribe was fixed to run inside the user gesture; not yet confirmed working on the owner's iPhone (iOS 26). The Prayer tab shows a status line, an error line (⚠) and the server delivery log to diagnose.
- Android app (Capacitor, package `app.sakina.muslim`, display name اطمئن) lives outside this repo (project zip sent to the owner; signing key in its `keys/` folder — never commit it). The APK (v2.5) is older than the current site.
- Cloudflare API token saved in the cloud session never worked (rejected as bad format); deploys go through GitHub instead.
