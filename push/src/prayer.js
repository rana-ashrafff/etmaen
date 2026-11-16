// Prayer-time calculation (same algorithm as the app).
const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;
const fix = (a, b) => { a = a - b * Math.floor(a / b); return a < 0 ? a + b : a; };
export const METHODS = { egypt: { f: 19.5, i: 17.5 }, umm: { f: 18.5, i: "90" }, mwl: { f: 18, i: 17 }, isna: { f: 15, i: 15 }, karachi: { f: 18, i: 18 } };
function julian(y, m, d) { if (m <= 2) { y -= 1; m += 12; } const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4); return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5; }
function sun(jd) { const D = jd - 2451545, g = fix(357.529 + .98560028 * D, 360), q = fix(280.459 + .98564736 * D, 360), L = fix(q + 1.915 * Math.sin(rad(g)) + .02 * Math.sin(rad(2 * g)), 360), e = 23.439 - .00000036 * D;
  const RA = fix(deg(Math.atan2(Math.cos(rad(e)) * Math.sin(rad(L)), Math.cos(rad(L)))) / 15, 24); let eqt = q / 15 - RA; eqt = eqt - 24 * Math.round(eqt / 24); return { decl: deg(Math.asin(Math.sin(rad(e)) * Math.sin(rad(L)))), eqt }; }
export function times(y, m, d, lat, lng, mk, asr) {
  const M = METHODS[mk] || METHODS.mwl, s = sun(julian(y, m, d) + .5 - lng / 360), noon = 12 - s.eqt - lng / 15, dc = rad(s.decl), la = rad(lat);
  const T = a => deg(Math.acos((-Math.sin(rad(a)) - Math.sin(dc) * Math.sin(la)) / (Math.cos(dc) * Math.cos(la)))) / 15;
  const asrA = -deg(Math.atan(1 / (asr + Math.tan(Math.abs(la - dc)))));
  const h = [noon - T(M.f), noon - T(.833), noon + 2 / 60, noon + T(asrA), noon + T(.833) + 1 / 60, 0];
  h[5] = typeof M.i === "string" ? h[4] + (+M.i) / 60 : noon + T(M.i);
  const base = Date.UTC(y, m - 1, d);
  return h.map(x => base + Math.ceil(x * 60) * 60000);
}
export function ymdIn(ts, tz) { const p = {}; new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(ts)).forEach(x => p[x.type] = x.value); return { y: +p.year, m: +p.month, d: +p.day }; }
