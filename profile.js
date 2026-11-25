/* BLOCK. profile — your numbers, the training log and the ways into maxes, calculators
   and settings. The training log lists every session you have done, newest first; tap one
   to see the exercises, sets and notes. A summary on top writes up any period. */
(function(){
const $=id=>document.getElementById(id);
const svg=d=>`<svg class="ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const IC={log:svg('<path d="M7 4h10a2 2 0 0 1 2 2v14l-3.5-2-3.5 2-3.5-2L5 20V6a2 2 0 0 1 2-2z"/><path d="M9 9h6M9 13h4"/>'),
  own:svg('<path d="M12 5v14M5 12h14"/><rect x="3.5" y="3.5" width="17" height="17" rx="4"/>'),
  progs:svg('<rect x="4" y="5" width="16" height="15.5" rx="3"/><path d="M4 10h16M8.5 3v4M15.5 3v4"/>'),
  max:svg('<path d="M4 18l5-6 4 3 7-9"/><path d="M15 6h5v5"/>'),
  calc:svg('<rect x="5" y="3.5" width="14" height="17" rx="3"/><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"/>'),
  set:svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>')};

const st=document.createElement('style');st.textContent=`
#v-profile>.title,#v-tlog>.title{margin:22px 0 16px}
#v-tlog>.back+.title{margin-top:14px}
.pfnums{display:grid;grid-template-columns:repeat(3,1fr);margin:0 0 26px}
.pfnums div{padding:0 12px;border-left:1px solid var(--line)}.pfnums div:first-child{padding-left:0;border-left:0}
.pfnums b{display:block;font-size:34px;font-weight:800;letter-spacing:-.03em;line-height:1.05;font-variant-numeric:tabular-nums}
.pfnums span{display:block;color:var(--dim);font-size:13px;margin-top:4px}
.pfgrp{margin:0 0 16px;border-radius:20px;background:var(--surface);overflow:hidden}
.pfrow{width:100%;display:flex;align-items:center;gap:14px;padding:13px 14px;background:none;border:0;border-top:1px solid var(--line);color:#fff;font:inherit;text-align:left;
  transition:background-color 160ms ease,transform 140ms ease-out}
.pfrow:first-child{border-top:0}
.pfrow:active{background:var(--surface-2)}
.pfrow .pfi{flex:0 0 38px;height:38px;border-radius:12px;background:var(--surface-2);display:grid;place-items:center;color:var(--accent)}
.pfrow>span:not(.chev):not(.pfi){flex:1;min-width:0}.pfrow b{display:block;font-size:16px}.pfrow small{display:block;color:var(--dim);font-size:13px;margin-top:1px}
.pfrow .chev{color:var(--dim-2);font-size:20px}
@media (hover:hover) and (pointer:fine){.pfrow:hover{background:#1d1d20}}

/* summary */
.tlsum{border-radius:22px;background:var(--surface);padding:18px 18px 16px;margin:0 0 28px}
.tlsum h4{margin:0 0 12px;font-size:13px;font-weight:600;color:var(--dim)}
.tlspans{display:flex;gap:6px;overflow-x:auto;margin:0 -18px 14px;padding:0 18px;scrollbar-width:none}
.tlspans::-webkit-scrollbar{display:none}
.tlspans button{flex:0 0 auto;min-height:36px;padding:0 14px;border-radius:999px;border:0;background:var(--surface-2);color:var(--dim);font:inherit;font-size:14px;font-weight:600;
  transition:background-color 160ms ease,color 160ms ease,transform 140ms ease-out}
.tlspans button.on{background:#fff;color:#000}
.tlspans button:active{transform:scale(.96)}
.tlnums{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:0 0 14px}
.tlnums b{display:block;font-size:20px;font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.tlnums span{display:block;color:var(--dim);font-size:12px}
.tltext{white-space:pre-wrap;line-height:1.55;font-size:15px;color:#e4e4e7;margin:0 0 12px}
.tlmeta{color:var(--dim-2);font-size:12px;margin:0 0 12px}
.tlsum .pgo{width:100%;display:block}
.tlsum .err{color:#ff8a80;font-size:14px;margin:10px 0 0}
.tlsum .hint{color:var(--dim);font-size:14px;margin:0 0 12px}

/* list */
#tlList .grp{margin:26px 0 10px}
.tlc{border-radius:20px;background:var(--surface);margin:0 0 10px;overflow:hidden}
.tlh{width:100%;display:flex;align-items:center;gap:12px;padding:15px 16px;background:none;border:0;color:#fff;font:inherit;text-align:left;transition:transform 140ms ease-out}
.tlh:active{transform:scale(.985)}
.tlh>span:not(.chev){flex:1;min-width:0}
.tlh em{display:block;font-style:normal;font-size:12px;color:var(--dim);margin-bottom:2px}
.tlh b{display:block;font-size:17px;line-height:1.3}
.tlh small{display:block;color:var(--dim);font-size:13.5px;margin-top:3px}
.tlh .chev{color:var(--dim-2);font-size:20px;transition:transform 220ms cubic-bezier(.23,1,.32,1)}
.tlc.open .tlh .chev{transform:rotate(90deg)}
.tld{padding:0 16px 14px;border-top:1px solid var(--line)}
.tlx{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid var(--line);font-size:14px}
.tlx:last-of-type{border-bottom:0}
.tlx b{font-weight:600;color:#fff}.tlx span{color:var(--dim);text-align:right;font-variant-numeric:tabular-nums}
.tlnote{margin:10px 0 0;padding:10px 12px;border-radius:12px;background:var(--surface-2);color:#d6d6d9;font-size:14px;white-space:pre-wrap}
.tlnote small{display:block;color:var(--dim);font-size:12px;margin-bottom:2px}
.tlmore{width:100%;margin:6px 0 0}
.tlempty{color:var(--dim);margin:20px 0}`;
document.head.appendChild(st);

/* ---------- views ---------- */
const pv=document.createElement('section');pv.id='v-profile';pv.className='wrap hide';
const tv=document.createElement('section');tv.id='v-tlog';tv.className='wrap hide';
tv.innerHTML=`<button class="back" id="tlBack">‹ Profile</button><h2 class="title">Training log</h2><div id="tlSum"></div><div id="tlList"></div>`;
$('v-settings').after(pv,tv);
const _sh=show;show=function(v){_sh(v);pv.classList.toggle('hide',v!=='profile');tv.classList.toggle('hide',v!=='tlog');};
window.BLOCK_VIEWS=Object.assign(window.BLOCK_VIEWS||{},{
  profile:()=>{show('profile');renderProfile();},
  tlog:()=>{show('tlog');renderLog();}});
$('tlBack').onclick=()=>blockGo('profile');

/* settings: back goes to wherever you came from */
let setFrom='home';
$('toSettings').addEventListener('click',()=>{setFrom='home';$('setBack').textContent='‹ Home';},true);
$('setBack').onclick=()=>{if(setFrom==='profile')blockGo('profile');else{show('home');renderHome();}};
const openSettings=()=>{setFrom='profile';show('settings');renderSettings();$('setBack').textContent='‹ Profile';};

/* ---------- data ---------- */
const live=()=>S.sessions.filter(s=>{try{return liveSess(s);}catch(e){return false;}}).sort((a,b)=>b.start-a.start);
function setsBySid(){const m={};for(const r of S.sets){(m[r.sid]=m[r.sid]||[]).push(r);}return m;}
const work=r=>!r.check&&r.score==null&&!r.warm;
const volOf=list=>list.reduce((t,r)=>t+(work(r)&&r.kg&&r.reps?r.kg*r.reps:0),0);
const durMin=s=>s.retro?0:Math.round((typeof durOf==='function'?durOf(s):(s.end||s.start)-s.start)/60000);
function nameOf(s){let t='',p='';try{t=titleOf(s.prog,s.key)||'';}catch(e){}
  try{const P=progById(s.prog);p=P?P.n:'';}catch(e){}return{t:t||p||'Session',p:p&&p!==t?p:''};}
function weeksInARow(list){const wk=t=>{const d=new Date(t);d.setHours(0,0,0,0);d.setDate(d.getDate()-(d.getDay()+6)%7);return d.getTime();};
  const set=new Set(list.map(s=>wk(s.start)));let w=wk(Date.now()),n=0;if(!set.has(w))w-=6048e5;
  while(set.has(w)){n++;w=wk(w-6048e5+36e5);}return n;}
const kg=n=>Math.round(n).toLocaleString('en-GB');
const tim=m=>m<60?`<b>${m}</b><span>Minutes</span>`:`<b>${m<600?(m/60).toFixed(1):Math.round(m/60)}</b><span>Hours</span>`;

/* ---------- profile ---------- */
function renderProfile(){const L=live(),mins=L.reduce((t,s)=>t+durMin(s),0),last=L[0];
  const own=(S.custom||[]).length,mp=(S.myProgs||[]).length,maxes=Object.values(S.max||{}).filter(m=>m&&m.value).length;
  const row=(k,b,s,ic)=>`<button class="pfrow" data-go="${k}"><span class="pfi">${IC[ic]}</span><span><b>${b}</b>${s?`<small>${esc(s)}</small>`:''}</span><span class="chev">›</span></button>`;
  pv.innerHTML=`<h2 class="title">Profile</h2>
    <div class="pfnums"><div><b>${L.length}</b><span>Sessions</span></div><div>${tim(mins)}</div><div><b>${weeksInARow(L)}</b><span>Weeks in a row</span></div></div>
    <div class="pfgrp">${row('tlog','Training log',L.length?`${L.length} session${L.length===1?'':'s'} · last ${fmtDate(last.start)}`:'Nothing logged yet','log')}
      ${row('own','Own sessions',own?`${own} built by you`:'Build one from the library','own')}
      ${row('mine','Your programs',mp?`${mp} made in the generator`:'Make one in the generator','progs')}</div>
    <div class="pfgrp">${row('max','Maxes',maxes?`${maxes} recorded`:'Set your 1RMs and training maxes','max')}
      ${row('calc','Calculators','1RM, plates, RPE, attempts, points, calories','calc')}</div>
    <div class="pfgrp">${row('set','Settings','Sync, AI coach, sound, programs','set')}</div>`;
  pv.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{const k=b.dataset.go;
    if(k==='own'){if(own)blockGo('p:custom');else buildOpen(null);}
    else if(k==='mine'){blockGo('programs');setTimeout(()=>{const g=[...document.querySelectorAll('#progList *')].find(x=>x.children.length<3&&/own builds/i.test(x.textContent));g&&g.scrollIntoView({block:'start'});},50);}
    else if(k==='max'||k==='set')openSettings();
    else blockGo(k);});}

/* ---------- training log ---------- */
const SPANS=[['7d','7 days',7],['4w','4 weeks',28],['3m','3 months',91],['1y','1 year',365],['all','All time',0]];
let span='4w',busy=false,err='',shown=40;
const inSpan=(L,k)=>{const d=SPANS.find(x=>x[0]===k)[2];if(!d)return L;const cut=Date.now()-d*864e5;return L.filter(s=>s.start>=cut);};
function renderSum(){const box=$('tlSum'),L=inSpan(live(),span),by=setsBySid(),sets=L.reduce((t,s)=>t+(by[s.id]||[]).filter(work).length,0),
    vol=L.reduce((t,s)=>t+volOf(by[s.id]||[]),0),mins=L.reduce((t,s)=>t+durMin(s),0),saved=(S.tlogSum||{})[span],ai=window.blockAI&&blockAI.ready&&blockAI.ready();
  box.innerHTML=`<div class="tlsum"><h4>Summary</h4>
    <div class="tlspans" role="group" aria-label="Period">${SPANS.map(([k,l])=>`<button data-s="${k}" class="${k===span?'on':''}" aria-pressed="${k===span}">${l}</button>`).join('')}</div>
    <div class="tlnums"><div><b>${L.length}</b><span>Sessions</span></div><div>${tim(mins)}</div><div><b>${sets}</b><span>Work sets</span></div><div><b>${vol>=1e4?Math.round(vol/1e3)+'k':kg(vol)}</b><span>kg moved</span></div></div>
    ${saved?`<p class="tltext">${esc(saved.text)}</p><p class="tlmeta">Written ${fmtDate(saved.at)} from ${saved.n} session${saved.n===1?'':'s'}${saved.n!==L.length?' · there are new sessions since':''}</p>`:''}
    ${ai?`<button class="pgo" id="tlWrite" ${busy||!L.length?'disabled':''}>${busy?'Writing …':saved?'Write it again':'Write a summary'}</button>`
      :`<p class="hint">Add an API key under Settings → AI coach to get a written summary of the period.</p><button class="btn-s" id="tlKey" style="width:100%">Open settings</button>`}
    ${err?`<p class="err" role="alert">${esc(err)}</p>`:''}</div>`;
  box.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{span=b.dataset.s;err='';renderSum();});
  if($('tlKey'))$('tlKey').onclick=openSettings;
  if($('tlWrite'))$('tlWrite').onclick=()=>write(L,by);}
function digest(L,by){const lines=[];let size=0;
  for(const s of [...L].reverse()){const n=nameOf(s),list=(by[s.id]||[]),ex={};
    list.forEach(r=>{(ex[r.name||r.ex]=ex[r.name||r.ex]||[]).push(r);});
    let t=`${new Date(s.start).toISOString().slice(0,10)} · ${n.t}${n.p?` (${n.p})`:''}${durMin(s)?` · ${durMin(s)} min`:''}${s.retro?' · logged afterwards':''}`;
    for(const [nm,rs] of Object.entries(ex)){const w=rs.filter(work);
      t+=`\n  ${nm}: ${w.length?w.map(r=>r.kg?`${r.kg}×${r.reps}${r.rir!=null?` RIR${r.rir}`:''}`:r.reps?`${r.reps} reps`:'set').join(', '):rs.some(r=>r.score!=null)?rs.map(r=>`${r.score} ${r.unit||''}`).join(', '):'done'}`;}
    if(s.note)t+=`\n  Note: ${s.note}`;
    size+=t.length;if(size>24000)break;lines.push(t);}
  return lines.join('\n');}
async function write(L,by){busy=true;err='';renderSum();
  try{const lab=SPANS.find(x=>x[0]===span)[1].toLowerCase();
    const text=await blockAI.ask({system:blockAI.SYS+' You write a short training summary for one period of a training log.',effort:'medium',maxTokens:1500,
      prompt:`My training log for the last ${lab} (${L.length} sessions), oldest first. Weights in kg, sets as kg×reps.\n\n${digest(L,by)}\n\n`+
        'Write a summary of this period in about 150 words of plain text, 2–4 short paragraphs, no headings or lists: how consistent I was, what I trained most and what was missing, '+
        'progress on the lifts that repeat (first versus latest sets), anything notable in my notes, then two or three concrete suggestions for the next period. Only use what is in the log.'});
    (S.tlogSum=S.tlogSum||{})[span]={text:String(text).trim(),at:Date.now(),n:L.length};save();}
  catch(e){err=e.message||'Could not write the summary.';}
  busy=false;renderSum();}
function fmtSet(r){if(r.check)return'✓';if(r.score!=null)return`${r.score}${r.unit?' '+r.unit:''}`;if(r.kg&&r.reps)return`${r.kg}×${r.reps}`;if(r.reps)return`${r.reps}`;return'·';}
function detail(s,list){const ex=[];const by={};
  list.forEach(r=>{const k=r.name||r.ex;if(!by[k]){by[k]=[];ex.push(k);}by[k].push(r);});
  let h=ex.map(k=>{const rs=by[k],w=rs.filter(r=>!r.warm);return`<div class="tlx"><b>${esc(k)}</b><span>${esc((w.length?w:rs).map(fmtSet).join(' · '))}${rs.some(r=>r.warm)?' · + warm-up':''}</span></div>`;}).join('');
  if(!h)h=`<div class="tlx"><b>${s.retro?'Logged afterwards':'No sets recorded'}</b><span></span></div>`;
  if(s.note)h+=`<div class="tlnote"><small>Note</small>${esc(s.note)}</div>`;
  return h;}
function renderLog(){renderSum();const box=$('tlList'),L=live(),by=setsBySid();
  if(!L.length){box.innerHTML=`<p class="tlempty">Sessions you finish or log show up here.</p>`;return;}
  let h='',mon='';
  L.slice(0,shown).forEach(s=>{const m=new Date(s.start).toLocaleDateString('en-GB',{month:'long',year:'numeric'});
    if(m!==mon){h+=`<p class="grp">${m}</p>`;mon=m;}
    const n=nameOf(s),list=by[s.id]||[],w=list.filter(work),v=volOf(list),d=durMin(s);
    const meta=[n.p,s.retro?'logged afterwards':d?`${d} min`:'',w.length?`${w.length} set${w.length===1?'':'s'}`:'',v?`${kg(v)} kg`:''].filter(Boolean).join(' · ');
    h+=`<div class="tlc" data-id="${esc(s.id)}"><button class="tlh" aria-expanded="false"><span><em>${new Date(s.start).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})}${s.retro?'':' · '+new Date(s.start).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</em>
      <b>${esc(n.t)}</b>${meta?`<small>${esc(meta)}</small>`:''}</span><span class="chev">›</span></button></div>`;});
  if(L.length>shown)h+=`<button class="btn-s tlmore" id="tlMore">Show ${Math.min(40,L.length-shown)} more</button>`;
  box.innerHTML=h;
  box.querySelectorAll('.tlc').forEach(c=>c.querySelector('.tlh').onclick=()=>{const s=S.sessions.find(x=>x.id===c.dataset.id);if(!s)return;
    const open=!c.classList.contains('open'),b=c.querySelector('.tlh');
    if(open){const d=document.createElement('div');d.className='tld';d.innerHTML=detail(s,by[s.id]||[]);c.append(d);c.classList.add('open');b.setAttribute('aria-expanded','true');window.blockReveal&&blockReveal(d);}
    else{const d=c.querySelector('.tld');b.setAttribute('aria-expanded','false');c.classList.remove('open');
      if(d&&window.blockCollapse)blockCollapse([d],()=>d.remove());else if(d)d.remove();}});
  if($('tlMore'))$('tlMore').onclick=()=>{shown+=40;renderLog();};}
})();
