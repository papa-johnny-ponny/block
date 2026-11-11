// BLOCK. calendar feed — Supabase Edge Function "block-cal".
// GET ?k=<key>              → iCalendar feed of the next sessions, at most a week ahead
// GET ?k=<key>&skip=<item>  → skips that session (the link inside each event)
// The key is the secret in the subscription link; the two SQL functions in
// supabase/calendar.sql only answer to it. Deploy with JWT verification off,
// since calendar apps send no login.
// Written as plain JavaScript so the same file runs in tests under Node.

const SB_URL = 'https://uuskbrhvpjybsmjpcokm.supabase.co';
const SB_KEY = 'sb_publishable_lWkdNEE_j38zAzBxidguDQ_W8VRzUZk'; // publishable: safe to ship
const FN = SB_URL + '/functions/v1/block-cal';
const APP = 'https://papa-johnny-ponny.github.io/block/';

/* ---- same as place() in cal.js: change both together ---- */
const SPAN = 7;
const ymdIn = (t, tz) => new Intl.DateTimeFormat('en-CA', { timeZone: tz || undefined, year: 'numeric', month: '2-digit', day: '2-digit' }).format(t);
const plusDays = (d, n) => { const x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
const dowOf = d => (new Date(d + 'T00:00:00Z').getUTCDay() + 6) % 7;
function place(c, now, skips) {
  if (!c || !c.on || !c.days || !c.days.length) return [];
  const today = ymdIn(now, c.tz), taken = !!c.last && ymdIn(c.last, c.tz) === today;
  const q = (c.queue || []).filter(x => !(skips && skips[x.k])), out = [];
  for (let n = 0, i = 0; n < SPAN && i < q.length; n++) {
    const d = plusDays(today, n);
    if ((n === 0 && taken) || !c.days.includes(dowOf(d))) continue;
    out.push({ ...q[i++], date: d });
  }
  return out;
}

/* local wall-clock time in a time zone → UTC milliseconds */
function tzOffset(t, tz) {
  const p = {};
  new Intl.DateTimeFormat('en-US', { timeZone: tz || undefined, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    .formatToParts(t).forEach(x => { p[x.type] = x.value; });
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(t / 1000) * 1000;
}
function utcOf(ymd, hm, tz) {
  const [y, m, d] = ymd.split('-').map(Number), [h, mi] = (hm || '07:00').split(':').map(Number);
  const wall = Date.UTC(y, m - 1, d, h, mi);
  let t = wall;
  for (let i = 0; i < 2; i++) t = wall - tzOffset(t, tz);
  return t;
}

const stamp = t => new Date(t).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const text = s => String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
function fold(line) {
  const enc = new TextEncoder(), out = [];
  let cur = '', len = 0;
  for (const ch of line) {
    const n = enc.encode(ch).length;
    if (len + n > (out.length ? 74 : 75)) { out.push(cur); cur = ''; len = 0; }
    cur += ch; len += n;
  }
  out.push(cur);
  return out.join('\r\n ');
}

function ics(row, now) {
  const c = row && row.cal, skips = row && row.skips;
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//BLOCK.//Training//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'X-WR-CALNAME:BLOCK.', 'REFRESH-INTERVAL;VALUE=DURATION:PT15M', 'X-PUBLISHED-TTL:PT15M'];
  for (const x of place(c, now, skips)) {
    const start = utcOf(x.date, c.time, c.tz), end = start + (c.len || 60) * 60000;
    const skip = `${FN}?k=${c.key}&skip=${encodeURIComponent(x.k)}`;
    L.push('BEGIN:VEVENT', `UID:block-${c.prog}-${x.k}@block.app`, `DTSTAMP:${stamp(now)}`,
      `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`,
      `SUMMARY:${text(x.t)}`,
      `DESCRIPTION:${text(`${x.e ? x.e + ' · ' : ''}${c.pn || ''}\n\nOpen BLOCK.: ${APP}\n\nSkip this session: ${skip}`)}`,
      `URL:${APP}`);
    if (c.alarm != null) L.push('BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${text(x.t)}`, `TRIGGER:-PT${+c.alarm}M`, 'END:VALARM');
    L.push('END:VEVENT');
  }
  L.push('END:VCALENDAR');
  return L.map(fold).join('\r\n') + '\r\n';
}

async function rpc(name, args) {
  const r = await fetch(`${SB_URL}/rest/v1/rpc/${name}`, {
    method: 'POST', headers: { apikey: SB_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(args) });
  if (!r.ok) throw new Error(`${name}: HTTP ${r.status}`);
  return r.json();
}

const plain = (body, status = 200) => new Response(body, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });

async function handle(req) {
  const u = new URL(req.url), k = u.searchParams.get('k') || '', skip = u.searchParams.get('skip');
  if (!/^[0-9a-f]{32}$/.test(k)) return plain('Not found', 404);
  const row = await rpc('block_cal_feed', { tok: k });
  if (!row) return plain('Not found', 404);
  if (skip != null) {
    const item = (row.cal && row.cal.queue || []).find(x => x.k === skip);
    if (!item || (row.skips && row.skips[skip])) return plain('Nothing to skip. That session is no longer planned.');
    await rpc('block_cal_skip', { tok: k, item: skip });
    return plain(`Skipped: ${item.t}.\n\nYour calendar moves on to the next session at its next refresh, and BLOCK. picks it up the next time it syncs.`);
  }
  return new Response(ics(row, Date.now()), { headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Cache-Control': 'no-store' } });
}

Deno.serve(req => handle(req).catch(e => plain('Calendar error: ' + e.message, 500)));
