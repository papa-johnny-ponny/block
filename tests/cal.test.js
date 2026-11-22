// node tests/cal.test.js — calendar placement (cal.js) and the block-cal function, run under Node
const assert=require('assert'),fs=require('fs'),vm=require('vm'),path=require('path');
const ROOT=path.join(__dirname,'..');
const app=require(path.join(ROOT,'cal.js'));

let handler,rows={},calls=[];
const ctx={Deno:{serve:h=>{handler=h;}},URL,TextEncoder,Intl,Date,Response,encodeURIComponent,console,
  fetch:async(url,o)=>{const b=JSON.parse(o.body);calls.push([url,b]);const name=url.split('/').pop();
    if(name==='block_cal_feed')return new Response(JSON.stringify(rows[b.tok]||null));
    if(name==='block_cal_skip'){rows[b.tok].skips[b.item]=1;return new Response('true');}}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,'supabase/functions/block-cal/index.ts'),'utf8')+'\n;this.place=place;this.utcOf=utcOf;',ctx);

const TZ='Europe/Stockholm';
const now=Date.UTC(2026,10,11,9,0);   // Wed 11 Nov 2026, 10:00 in Stockholm
const q=[{k:'cc1',t:'Strength Foundation',e:'Session 1',d:'• Deadlift — 1 set × 5\n• Heavy Carry — 2 sets × 30'},
  {k:'cc2',t:'Lower, Body; Power',e:'Session 2'},{k:'cc3',t:'Explosive',e:'Session 3'},{k:'cc4',t:'Uni',e:'Session 4'}];
const c={on:true,key:'0123456789abcdef0123456789abcdef',prog:'chopcarry',pn:'Chop & Carry',days:[0,2,4],time:'07:00',len:60,alarm:15,tz:TZ,queue:q,last:null};
const same=f=>(...a)=>JSON.parse(JSON.stringify(f(...a)));   // results from the vm realm
for(const place of [app.place,same(ctx.place)]){
  const days=(cc,t,sk)=>place(cc,t,sk).map(x=>[x.date,x.k]);
  assert.deepStrictEqual(days(c,now),[['2026-11-11','cc1'],['2026-11-13','cc2'],['2026-11-16','cc3']]); // Wed, Fri, Mon; stops at a week
  assert.deepStrictEqual(days({...c,last:Date.UTC(2026,10,11,6,0)},now),[['2026-11-13','cc1'],['2026-11-16','cc2']]); // trained today
  assert.strictEqual(place({...c,last:Date.UTC(2026,10,10,6,0)},now)[0].date,'2026-11-11');  // yesterday does not block today
  assert.deepStrictEqual(place(c,now,{cc1:1}).map(x=>x.k),['cc2','cc3','cc4']);              // a skip lets the next one take the slot
  assert.deepStrictEqual(place({...c,on:false},now),[]);assert.deepStrictEqual(place({...c,days:[]},now),[]);assert.deepStrictEqual(place({...c,queue:[]},now),[]);
  assert.strictEqual(place(c,Date.UTC(2026,10,10,23,30))[0].date,'2026-11-11');             // the user's zone decides "today"
}
// wall time → UTC across daylight saving
assert.strictEqual(new Date(ctx.utcOf('2026-11-13','07:00',TZ)).toISOString(),'2026-11-13T06:00:00.000Z');
assert.strictEqual(new Date(ctx.utcOf('2026-07-01','07:00',TZ)).toISOString(),'2026-07-01T05:00:00.000Z');
assert.strictEqual(new Date(ctx.utcOf('2026-03-29','07:00',TZ)).toISOString(),'2026-03-29T05:00:00.000Z');

(async()=>{
  const get=async qs=>{const r=await handler(new Request('https://x.supabase.co/functions/v1/block-cal'+qs));return [r.status,r.headers.get('content-type'),await r.text()];};
  assert.strictEqual((await get('?k=nope'))[0],404);
  assert.strictEqual((await get('?k=ffffffffffffffffffffffffffffffff'))[0],404);
  rows[c.key]={cal:{...c,days:[0,1,2,3,4,5,6]},skips:{}};
  let [st,ct,body]=await get('?k='+c.key);
  assert.strictEqual(st,200);assert.match(ct,/text\/calendar/);
  assert.ok(body.startsWith('BEGIN:VCALENDAR\r\n')&&body.endsWith('END:VCALENDAR\r\n'));
  assert.strictEqual((body.match(/BEGIN:VEVENT/g)||[]).length,4);
  assert.ok(body.includes(String.raw`SUMMARY:Lower\, Body\; Power`));
  assert.ok(body.includes('TRIGGER:-PT15M'));
  assert.ok(body.includes('UID:block-chopcarry-cc1@block.app'));
  for(const line of body.split('\r\n'))assert.ok(Buffer.byteLength(line)<=75,'line too long: '+line);
  const flat=body.replace(/\r\n /g,'');
  assert.ok(flat.includes(String.raw`Session 1 · Chop & Carry\n\n• Deadlift — 1 set × 5\n• Heavy Carry — 2 sets × 30\n\nOpen BLOCK.`),'exercise list missing');
  assert.ok(flat.includes('skip=cc2'));
  rows[c.key].cal={...c,days:[0,1,2,3,4,5,6],alarm:null};
  assert.ok(!(await get('?k='+c.key))[2].includes('VALARM'));
  [st,ct,body]=await get('?k='+c.key+'&skip=cc2');
  assert.strictEqual(st,200);assert.match(body,/Skipped: Lower, Body; Power/);assert.deepStrictEqual(rows[c.key].skips,{cc2:1});
  body=(await get('?k='+c.key))[2];
  assert.strictEqual((body.match(/BEGIN:VEVENT/g)||[]).length,3);assert.ok(!body.includes('UID:block-chopcarry-cc2@'));
  calls=[];assert.match((await get('?k='+c.key+'&skip=cc2'))[2],/Nothing to skip/);
  assert.match((await get('?k='+c.key+'&skip=zzz'))[2],/Nothing to skip/);
  assert.ok(!calls.some(([u])=>u.endsWith('block_cal_skip')));
  rows[c.key].cal={...c,on:false};assert.ok(!(await get('?k='+c.key))[2].includes('VEVENT'));
  console.log('calendar tests: all passed');
})().catch(e=>{console.error(e);process.exit(1);});
