/* BLOCK. calendar — follows one program and publishes its next sessions as a
   calendar feed (Supabase function block-cal, see supabase/functions).
   The app works out the queue of sessions still to do (S.cal.queue); the feed
   lays them on your training days, at most a week ahead. A session you don't
   do simply lands on the next training day the next time the feed refreshes.
   place() below is mirrored in the function: change both together. */
(function(){
const SPAN=7,QMAX=14;

const ymdIn=(t,tz)=>new Intl.DateTimeFormat('en-CA',{timeZone:tz||undefined,year:'numeric',month:'2-digit',day:'2-digit'}).format(t);
const plusDays=(d,n)=>{const x=new Date(d+'T00:00:00Z');x.setUTCDate(x.getUTCDate()+n);return x.toISOString().slice(0,10);};
const dowOf=d=>(new Date(d+'T00:00:00Z').getUTCDay()+6)%7;   // Monday = 0
/* today is taken if a session was already logged today; otherwise the queue
   fills the chosen weekdays in order, starting today */
function place(c,now,skips){
  if(!c||!c.on||!c.days||!c.days.length)return[];
  const today=ymdIn(now,c.tz),taken=!!c.last&&ymdIn(c.last,c.tz)===today;
  const q=(c.queue||[]).filter(x=>!(skips&&skips[x.k])),out=[];
  for(let n=0,i=0;n<SPAN&&i<q.length;n++){const d=plusDays(today,n);
    if((n===0&&taken)||!c.days.includes(dowOf(d)))continue;
    out.push({...q[i++],date:d});}
  return out;
}
if(typeof module!=='undefined'&&module.exports){module.exports={place,ymdIn,plusDays,dowOf};return;}

/* ===== browser side ===== */
const FN='https://uuskbrhvpjybsmjpcokm.supabase.co/functions/v1/block-cal';
const WD=['M','T','W','T','F','S','S'],WDL=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function keysOf(P){
  if(P.shape==='weeks'){const k=[];for(let w=1;w<=TOTAL_WEEKS;w++)for(let d=0;d<7;d++)k.push(`w${w}d${d}`);return k;}
  return P.days.map(d=>d.key);
}
function queueOf(c){
  let P;try{P=progById(c.prog);}catch(e){}if(!P)return[];
  const out=[];
  for(const k of keysOf(P)){if(out.length>=QMAX)break;if(c.skip&&c.skip[k])continue;
    let s;try{s=sessionOf(P.id,k);}catch(e){continue;}
    if(/^rest\b/i.test(s.title||'')||!realItems(s.items).length||sessDone(P.id,k))continue;
    out.push({k,t:s.title,e:s.eyebrow});}
  return out;
}
/* keep the queue, program name and last-trained time current on every save */
function refresh(){
  const c=S&&S.cal;if(!c||!c.on)return;
  c.queue=queueOf(c);
  try{c.pn=progById(c.prog).n;}catch(e){c.pn=c.prog;}
  const withSets=new Set(S.sets.map(r=>r.sid));
  c.last=S.sessions.reduce((m,s)=>(s.end||withSets.has(s.id))?Math.max(m,s.start||0):m,0)||null;
}
const _save=save;
save=function(){try{refresh();}catch(e){}_save();};

function newKey(){const b=new Uint8Array(16);crypto.getRandomValues(b);return[...b].map(x=>x.toString(16).padStart(2,'0')).join('');}
function setup(){
  S.cal={on:true,key:(S.cal&&S.cal.key)||newKey(),prog:(S.cal&&S.cal.prog)||S.prog||PROGRAMS[0].id,
    days:(S.cal&&S.cal.days)||[0,2,4],time:(S.cal&&S.cal.time)||'07:00',len:(S.cal&&S.cal.len)||60,
    alarm:S.cal&&'alarm' in S.cal?S.cal.alarm:15,skip:{},tz:Intl.DateTimeFormat().resolvedOptions().timeZone};
  save();
}
const feedUrl=c=>FN+'?k='+c.key;
const dayLabel=d=>{const t=ymdIn(Date.now());
  return d===t?'Today':d===plusDays(t,1)?'Tomorrow':new Date(d+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});};

function section(){
  const c=S.cal,signed=window.BLOCK_SYNC&&window.BLOCK_SYNC.signedIn();
  let h=`<p class="grp">Calendar</p>`;
  if(!c||!c.on)return h+`<p class="sub" style="margin:0 0 10px">Put your next sessions in Apple Calendar, at most a week ahead. A session you don't do moves to your next training day.</p>
    <button class="btn-s" style="width:100%" id="cOn"${signed?'':' disabled'}>Set up calendar</button>
    ${signed?'':'<p class="sub" style="margin:8px 0 0">Sign in under Sync first. The calendar is built from your synced log.</p>'}`;
  const progs=PROGRAMS.filter(p=>p.id!=='custom'||(S.custom&&S.custom.length));
  h+=`<select id="cProg" aria-label="Program to follow">${progs.map(p=>`<option value="${p.id}" ${p.id===c.prog?'selected':''}>Follow ${esc(p.n)}</option>`).join('')}</select>
    <div class="cdays" role="group" aria-label="Training days">${WD.map((x,i)=>`<button class="btn-s ${c.days.includes(i)?'on':''}" data-wd="${i}" aria-label="${WDL[i]}" aria-pressed="${c.days.includes(i)}">${x}</button>`).join('')}</div>
    <div class="crow3"><input type="time" id="cTime" value="${esc(c.time)}" aria-label="Start time">
      <select id="cLen" aria-label="Length">${[30,45,60,75,90,120].map(m=>`<option value="${m}" ${m===c.len?'selected':''}>${m} min</option>`).join('')}</select>
      <select id="cAlarm" aria-label="Alert">${[[null,'No alert'],[0,'Alert at start'],[15,'15 min before'],[30,'30 min before'],[60,'1 h before']].map(([v,l])=>`<option value="${v}" ${v===c.alarm?'selected':''}>${l}</option>`).join('')}</select></div>`;
  const up=place(c,Date.now());
  h+=`<p class="grp" style="margin-top:18px">Up next</p>`;
  h+=up.length?up.map(x=>`<div class="hrow"><span>${esc(dayLabel(x.date))} ${esc(c.time)}</span><b>${esc(x.t)}</b><button class="lnk" data-skip="${esc(x.k)}" aria-label="Skip ${esc(x.t)}" style="flex:none;color:var(--dim)">Skip</button></div>`).join('')
    :`<p class="sub" style="margin:0">${c.days.length?(c.queue&&c.queue.length?'Nothing on your training days this week.':'Every session in this program is done.'):'Pick at least one training day.'}</p>`;
  const sk=Object.keys(c.skip||{});
  if(sk.length)h+=`<p class="sub" style="margin:10px 0 0">Skipped: ${sk.map(k=>{let t=k;try{t=sessionOf(c.prog,k).title;}catch(e){}return `${esc(t)} <button class="lnk" data-unskip="${esc(k)}">undo</button>`;}).join(' · ')}</p>`;
  h+=`<div class="acts" style="margin:14px 0 0"><a class="btn-s on" href="${esc(feedUrl(c).replace(/^https:/,'webcal:'))}" id="cSub">Add to Calendar</a><button class="btn-s" id="cCopy">Copy link</button></div>
    <p class="sub" id="cMsg" style="margin:8px 0 0">${signed?'Each event has a link to skip that session.':'Sign in under Sync so the calendar can follow your log.'}</p>
    <button class="btn-s" style="width:100%;margin-top:6px" id="cOff">Turn calendar off</button>`;
  return h;
}
function wire(){
  const q=id=>document.getElementById(id),c=S.cal;
  if(q('cOn'))q('cOn').onclick=()=>{setup();renderSettings();};
  if(!c||!c.on)return;
  const upd=f=>{f();save();renderSettings();};
  q('cProg').onchange=e=>upd(()=>{c.prog=e.target.value;c.skip={};});
  document.querySelectorAll('[data-wd]').forEach(b=>b.onclick=()=>upd(()=>{const i=+b.dataset.wd;
    c.days=c.days.includes(i)?c.days.filter(x=>x!==i):[...c.days,i].sort();}));
  q('cTime').onchange=e=>{if(/^\d\d:\d\d$/.test(e.target.value))upd(()=>{c.time=e.target.value;});};
  q('cLen').onchange=e=>upd(()=>{c.len=+e.target.value;});
  q('cAlarm').onchange=e=>upd(()=>{c.alarm=e.target.value==='null'?null:+e.target.value;});
  document.querySelectorAll('[data-skip]').forEach(b=>b.onclick=()=>upd(()=>{c.skip={...c.skip,[b.dataset.skip]:Date.now()};}));
  document.querySelectorAll('[data-unskip]').forEach(b=>b.onclick=()=>upd(()=>{const s={...c.skip};delete s[b.dataset.unskip];c.skip=s;}));
  q('cCopy').onclick=async()=>{try{await navigator.clipboard.writeText(feedUrl(c));q('cMsg').textContent='Link copied. In Calendar on Mac: File → New Calendar Subscription.';}
    catch(e){q('cMsg').textContent=feedUrl(c);}};
  q('cOff').onclick=()=>{if(confirm('Turn the calendar off? Its events disappear at the next refresh.'))upd(()=>{c.on=false;});};
}
const _renderSettings=renderSettings;
renderSettings=function(){_renderSettings();
  const box=document.getElementById('setExtra');if(!box)return;
  const d=document.createElement('div');d.id='calBox';d.innerHTML=section();
  const sb=document.getElementById('syncBox');sb?sb.after(d):box.prepend(d);wire();};
})();
