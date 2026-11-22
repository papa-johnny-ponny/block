/* BLOCK. log view — the whole session on one page: every exercise as a card with
   one row per set (number · kg · reps), tap the number to log it and start the
   rest timer. The guided player (big clock, one block at a time) stays one tap
   away and is the default for anyone who picks it under Settings → Logging. */
(function(){
const css=`
#v-log{padding-bottom:120px}
.lgtop{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:10px;margin:0 -20px;padding:calc(env(safe-area-inset-top,0px) + 10px) 20px 10px;background:rgba(0,0,0,.88);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.lgtt{flex:1;min-width:0}
.lgtt b{display:block;font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lgtt span{color:var(--dim);font-size:13px;font-variant-numeric:tabular-nums}
.lgtop .pbtn{width:40px;height:40px;flex:none;align-self:center}
.lgtop .pbtn.lgok{background:var(--accent);color:#000;font-weight:800}
.lgblk{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:26px 2px 10px}
.lgblk h3{margin:0;font-size:20px;font-weight:800;letter-spacing:-.01em;text-transform:uppercase}
.lgblk small{display:block;color:var(--dim);font-size:13px;margin-top:2px;text-transform:none;letter-spacing:0;font-weight:500}
.lgblk .btn-s{flex:none;padding:8px 14px;font-size:13px}
.lgc{background:var(--surface);border-radius:16px;padding:14px 14px 6px;margin-bottom:10px}
.lgc.skip{opacity:.5}
.lgh{display:flex;align-items:flex-start;gap:10px}
.lgh>div{flex:1;min-width:0}
.lgh b{display:block;font-size:17px;font-weight:700;line-height:1.25}
.lgh small{display:block;color:var(--dim);font-size:13px;margin-top:3px}
.lgh .last{color:var(--dim-2);font-size:12px}
.lgq{flex:none;width:28px;height:28px;border-radius:50%;border:1.5px solid var(--dim-2);color:var(--dim);font-size:14px;font-weight:700;display:grid;place-items:center}
.lgchips{display:flex;gap:6px;overflow-x:auto;margin:12px -14px 6px;padding:0 14px;scrollbar-width:none}
.lgchips::-webkit-scrollbar{display:none}
.lgchips button{flex:none;background:var(--surface-2);border-radius:999px;padding:7px 12px;font-size:13px;font-weight:600;color:var(--dim)}
.lgadd{display:flex;align-items:center;gap:10px;width:100%;padding:11px 2px;color:var(--dim);font-size:15px}
.lgadd i{font-style:normal;color:var(--accent);font-size:20px;line-height:1;width:32px;text-align:center}
.lgr{display:grid;grid-template-columns:40px 1fr 1fr 30px;align-items:center;gap:4px;border-top:1px solid var(--line);min-height:50px}
.lgn{width:32px;height:32px;border-radius:50%;border:1.5px solid var(--dim-2);display:grid;place-items:center;font-size:14px;font-weight:700;font-variant-numeric:tabular-nums}
.lgn.w{font-size:12px;color:var(--dim)}
.lgr.done .lgn{background:var(--accent);border-color:var(--accent);color:#000}
.lgv{display:flex;align-items:baseline;justify-content:flex-end;gap:4px;padding-right:8px}
.lgv input{width:100%;max-width:76px;text-align:right;background:transparent;border:0;border-radius:8px;padding:8px 2px;font-size:18px;font-weight:700;font-variant-numeric:tabular-nums;color:#fff}
.lgv input::placeholder{color:var(--dim-2);font-weight:600}
.lgv input:focus{background:var(--surface-2);outline:none}
.lgv span{color:var(--dim);font-size:12px;flex:none}
.lgr:not(.done) .lgv input{color:var(--dim)}
.lgdot{width:30px;height:36px;display:grid;place-items:center;color:var(--dim);font-size:18px;line-height:1}
.lgmenu{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:4px 0 12px 44px}
.lgmenu span{color:var(--dim);font-size:12px;margin-right:2px}
.lgmenu button{background:var(--surface-2);border-radius:999px;padding:7px 12px;font-size:13px;font-weight:600}
.lgmenu button.on{background:#fff;color:#000}
.lgmenu .del{color:var(--accent-text)}
.lgone{display:grid;grid-template-columns:40px 1fr auto;align-items:center;gap:8px;border-top:1px solid var(--line);min-height:52px}
.lgone p{margin:0;color:var(--dim);font-size:15px}
.lgone.done .lgn{background:var(--accent);border-color:var(--accent);color:#000}
.lgsc{display:flex;gap:8px;align-items:center;border-top:1px solid var(--line);padding:10px 0}
.lgsc input{flex:1;font-size:17px;font-weight:700}
.lgsum{background:var(--surface);border-radius:16px;padding:16px;margin:26px 0 12px}
.lgsum h4{margin:0 0 12px;color:var(--dim);font-size:12px;font-weight:700;letter-spacing:.09em;text-transform:uppercase}
.lgsg{display:grid;grid-template-columns:repeat(3,1fr);gap:14px 10px}
.lgsg b{display:block;font-size:20px;font-weight:800;font-variant-numeric:tabular-nums}
.lgsg span{color:var(--dim);font-size:12px}
.lgsum .mmap{margin-top:14px}
#lgRest{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 14px);transform:translate(-50%,140%);width:min(420px,calc(100% - 32px));z-index:30;
  display:flex;align-items:center;gap:8px;padding:8px;border-radius:999px;background:#1c1c1f;border:1px solid var(--line);overflow:hidden;transition:transform .25s ease}
#lgRest.on{transform:translate(-50%,0)}
#lgRest .bar{position:absolute;inset:0;width:0;background:var(--accent-soft);pointer-events:none}
#lgRest>*:not(.bar){position:relative}
#lgRest .rt{flex:1;display:flex;flex-direction:column;align-items:center;line-height:1.05}
#lgRest b{font-size:22px;font-weight:800;font-variant-numeric:tabular-nums}
#lgRest small{color:var(--dim);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-top:2px}
#lgRest.hot b{color:var(--accent)}
#lgRest button{width:40px;height:40px;border-radius:50%;background:var(--surface-2);display:grid;place-items:center;font-size:16px;color:#fff}
@media (prefers-reduced-motion:reduce){#lgRest{transition:none}}`;
document.head.insertAdjacentHTML('beforeend',`<style id="lgcss">${css}</style>`);

const view=document.createElement('div');view.id='v-log';view.className='wrap hide';
document.getElementById('v-play').after(view);
const restEl=document.createElement('div');restEl.id='lgRest';restEl.setAttribute('role','timer');
document.body.append(restEl);

let LG=null,tick=null;
const VIEWS=['home','program','session','library','settings','play','build'];
const visibleView=()=>VIEWS.find(v=>{const el=document.getElementById('v-'+v);return el&&!el.classList.contains('hide');})||'program';
const recsOf=x=>S.sets.filter(r=>r.sid===LG.sid&&r.prog===LG.prog&&r.key===LG.key&&r.idx===x.idx);
const isBW=ex=>{const c=(EX[ex.key]||{}).c;return c==='bodyweight'||c==='skill'||c==='animal'||c==='plyo';};
const unitOf=sp=>{const t=(sp&&sp.nt)||'';return /sec|second/i.test(t)?'s':/meter|\bm\b/i.test(t)?'m':'reps';};
const fmtKg=v=>v==null||v===''?'':String(+(+v).toFixed(2));

function removeRec(r){const i=S.sets.indexOf(r);if(i<0)return;
  (S._del=S._del||{})[r.sid+'|'+r.t+'|'+r.idx]=Date.now();S.sets.splice(i,1);}
/* keep the item's entry (done marks, set count) in step with its records */
function settle(x){const e=entry(LG.prog,LG.key,x.idx),P=parse(x.sp.s),w=recsOf(x).filter(r=>!r.check&&!r.warm&&r.score==null);
  e.sets=w.length;if(w.length){const k=w[w.length-1].kg;if(k)e.load=k;}
  if(P.sets>0){e.done=e.skip||e.sets>=P.sets;}}

/* ----- open / close ----- */
function logOpen(prog,key,from){
  ensureAudio();wakeOn();
  const s=openSession(prog,key);save();
  LG={prog,key,sid:s.id,start:s.start,B:blocksOf(prog,key),from:from||visibleView(),extra:{},wu:{},menu:null,v:{},t:null};
  show('log');render();window.scrollTo(0,0);
  if(!tick)tick=setInterval(onTick,500);
}
function logClose(){const from=LG?LG.from:'program';LG=null;restOff();wakeOff();
  if(from==='home'){show('home');renderHome();}
  else if(from==='session'){show('session');renderSession();}
  else{show('program');renderProgram();}}
window.logOpen=logOpen;

/* ----- render ----- */
function pct(){const all=LG.B.blocks.flatMap(b=>b.items);
  return all.length?Math.round(all.filter(x=>entry(LG.prog,LG.key,x.idx).done).length/all.length*100):0;}
function render(){
  if(!LG)return;
  const multi=LG.B.blocks.length>1;
  let h=`<div class="lgtop"><button class="pbtn" id="lgX" aria-label="Close session">×</button>
    <div class="lgtt"><b>${esc(LG.B.title)}</b><span id="lgTime"></span></div>
    <button class="pbtn" id="lgGuide" aria-label="Guided mode" title="Guided mode"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 4.5V8l2.4 1.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
    <button class="pbtn lgok" id="lgFin" aria-label="Finish session">✓</button></div>
    <p class="eyebrow" style="margin-top:14px">${esc(LG.B.eyebrow||'').toUpperCase()}</p>`;
  LG.B.blocks.forEach((b,bi)=>{
    const p=b.pr,timed=p.mode==='clock'||p.mode==='interval';
    if((multi&&b.name!==LG.B.title)||timed)h+=`<div class="lgblk"><div><h3>${esc(b.name)}</h3>${p.mode!=='sets'&&p.mode!=='check'?`<small>${esc(p.label)}</small>`:''}</div>
      ${timed?`<button class="btn-s" data-timer="${bi}">Start timer</button>`:''}</div>`;
    b.items.forEach(x=>{h+=card(x);});
  });
  h+=summary()+`<button class="pgo" style="width:100%" id="lgDone">Finish workout</button>`;
  view.innerHTML=h;wire();onTick();
}
function card(x){
  const k=logKey(LG.prog,LG.key,x.idx),ex=exFor(x.item,k),e=entry(LG.prog,LG.key,x.idx),P=parse(x.sp.s),D=densOf(x.item,k);
  const meta=[D?(D.clock?`${D.clock} min · score in ${UNITS[D.score]}`:'For time'):P.label,x.sp.nt].filter(Boolean).join(' · ');
  const pl=prevLine(ex.key,LG.sid);
  let h=`<section class="lgc ${e.skip?'skip':''}" data-idx="${x.idx}"><div class="lgh"><div><b>${esc(ex.n)}</b>
    ${meta?`<small>${esc(meta)}</small>`:''}${pl?`<small class="last">${esc(pl)}</small>`:''}</div>
    <button class="lgq" data-a="info" aria-label="About ${esc(ex.n)}: video, notes and history">?</button></div>
    <div class="lgchips">${x.item.id?'<button data-a="swap">Swap</button>':''}<button data-a="info">History &amp; notes</button>
      <button data-a="skip">${e.skip?'Unskip':'Skip today'}</button></div>`;
  if(e.skip)return h+`</section>`;
  if(D){const hist=S.score[k]||[],t=target(hist,D.score),u=UNITS[D.score];
    h+=`<div class="lgsc"><input type="number" inputmode="decimal" data-a="score" placeholder="${hist.length?`Last ${hist[hist.length-1]} ${u}${t?` · target ${t}`:''}`:`Total in ${u}`}" aria-label="Score in ${u}">
      <button class="btn-s on" data-a="scoresave">${e.done?'Saved ✓':'Save'}</button>
      ${D.clock?`<button class="btn-s" data-a="clock" data-secs="${D.clock*60}">${D.clock}:00</button>`:''}</div>`;
    return h+`</section>`;}
  if(P.sets>0)return h+rows(x,ex,P)+`<button class="lgadd" data-a="addset"><i>+</i>Set</button></section>`;
  h+=`<div class="lgone ${e.done?'done':''}"><button class="lgn" data-a="tick" aria-label="${e.done?'Undo':'Mark done'}">${e.done?'✓':''}</button><p>${esc(P.label||'Tick when done')}</p>
    ${P.minutes?`<button class="btn-s" data-a="clock" data-secs="${P.minutes*60}">Start ${P.minutes}:00</button>`:'<span></span>'}</div>`;
  return h+`</section>`;
}
function rows(x,ex,P){
  const recs=recsOf(x),bw=isBW(ex),unit=unitOf(x.sp);
  const work=recs.filter(r=>!r.check&&!r.warm&&r.score==null),warm=recs.filter(r=>r.warm);
  const maxN=work.reduce((m,r)=>Math.max(m,r.set||0),0);
  const nW=Math.max(0,P.sets+(LG.extra[x.idx]||0),maxN),nWu=Math.max(warm.reduce((m,r)=>Math.max(m,r.set||0),0),LG.wu[x.idx]||0);
  let h=`<button class="lgadd" data-a="addwu"><i>+</i>Warm-up</button>`;
  const row=(n,w)=>{
    const r=(w?warm:work).filter(z=>z.set===n).pop(),id=`${w?'w':''}${n}`;
    const d=defaultsFor(LG.prog,LG.key,x,Math.max(1,Math.min(n,P.sets||n)),LG.sid);
    const dk=w?(d.kg?Math.round(d.kg*.5/2.5)*2.5||null:null):d.kg,dr=d.reps;
    const kg=r?r.kg:(LG.v[x.idx+'|'+id+'|kg']??dk),reps=r?r.reps:(LG.v[x.idx+'|'+id+'|reps']??dr);
    const open=LG.menu===x.idx+'|'+id,last=!w&&n===nW&&!r;
    let s=`<div class="lgr ${r?'done':''}" data-row="${id}"><button class="lgn ${w?'w':''}" data-a="log" aria-label="${r?'Undo':'Log'} ${w?'warm-up':'set'} ${n}">${w?'W'+n:n}</button>
      <label class="lgv"><input type="number" inputmode="decimal" data-f="kg" value="${fmtKg(kg)}" placeholder="${bw?'BW':(x.sp.p!=null&&!w?Math.round(x.sp.p)+'%':'–')}" aria-label="kg"><span>${bw?'+kg':'kg'}</span></label>
      <label class="lgv"><input type="number" inputmode="numeric" data-f="reps" value="${reps==null?'':reps}" placeholder="–" aria-label="${unit}"><span>${unit}</span></label>
      <button class="lgdot" data-a="menu" aria-label="More for this set" aria-expanded="${open}">⋮</button></div>`;
    if(open){s+=`<div class="lgmenu">`;
      if(r&&!w)s+=`<span>Reps in reserve</span>${[0,1,2,3].map(v=>`<button data-a="rir" data-v="${v}" class="${r.rir===v?'on':''}">${v===3?'3+':v}</button>`).join('')}`;
      if(!r&&(last||w))s+=`<button class="del" data-a="rmrow">Remove ${w?'warm-up':'set'}</button>`;
      if(r)s+=`<button class="del" data-a="log">Undo this ${w?'warm-up':'set'}</button>`;
      s+=`</div>`;}
    return s;};
  for(let n=1;n<=nWu;n++)h+=row(n,true);
  for(let n=1;n<=nW;n++)h+=row(n,false);
  return h;
}
function summary(){
  const all=S.sets.filter(r=>r.sid===LG.sid),w=all.filter(r=>!r.check&&!r.warm&&r.score==null);
  const items=LG.B.blocks.flatMap(b=>b.items);
  const planned=items.reduce((a,x)=>a+Math.max(0,parse(x.sp.s).sets),0);
  const reps=w.reduce((a,r)=>a+(+r.reps||0),0),vol=w.reduce((a,r)=>a+(+r.kg||0)*(+r.reps||0),0),top=w.reduce((m,r)=>Math.max(m,+r.kg||0),0);
  const keys=[...new Set(items.map(x=>exFor(x.item,logKey(LG.prog,LG.key,x.idx)).key))];
  let map='';try{map=muscleMap(keys)||'';}catch(e){}
  return `<div class="lgsum"><h4>Summary</h4><div class="lgsg">
    <div><b>${items.length}</b><span>Exercises</span></div><div><b>${w.length}${planned?`<span style="font-size:14px;color:var(--dim)">/${planned}</span>`:''}</b><span>Sets</span></div><div><b>${reps}</b><span>Reps</span></div>
    <div><b>${Math.round(vol).toLocaleString('en-GB')}</b><span>Volume · kg</span></div><div><b>${top||'–'}</b><span>Heaviest · kg</span></div><div><b>${pct()}%</b><span>Complete</span></div></div>${map}</div>`;
}

/* ----- actions ----- */
function itemOf(idx){return LG.B.blocks.flatMap(b=>b.items).find(x=>x.idx===idx);}
function wire(){
  const q=id=>document.getElementById(id);
  q('lgX').onclick=logClose;
  q('lgGuide').onclick=()=>{const p=LG.prog,k=LG.key;restOff();playOpen(p,k,'log',true);};
  q('lgFin').onclick=q('lgDone').onclick=finish;
  view.querySelectorAll('[data-timer]').forEach(b=>b.onclick=()=>{const bi=+b.dataset.timer,p=LG.prog,k=LG.key;restOff();playOpen(p,k,'log',true);plSetBlock(bi);});
  view.querySelectorAll('.lgc').forEach(c=>{
    const x=itemOf(+c.dataset.idx),k=logKey(LG.prog,LG.key,x.idx),e=entry(LG.prog,LG.key,x.idx);
    c.querySelectorAll('[data-a]').forEach(b=>{if(b.tagName==='INPUT')return;b.onclick=()=>act(b.dataset.a,x,k,e,b);});
    c.querySelectorAll('.lgr input').forEach(inp=>inp.onchange=()=>{
      const id=inp.closest('.lgr').dataset.row,f=inp.dataset.f,v=parseFloat(String(inp.value).replace(',','.'));
      const val=isFinite(v)&&v>0?v:null,r=findRec(x,id);
      if(r){r[f]=val;settle(x);save();render();}else LG.v[x.idx+'|'+id+'|'+f]=val;});
    const sc=c.querySelector('[data-a=score]');if(sc)sc.onkeydown=ev=>{if(ev.key==='Enter')act('scoresave',x,k,e,null);};
  });
}
function findRec(x,id){const w=id[0]==='w',n=+id.replace('w','');
  return recsOf(x).filter(r=>(w?r.warm:(!r.warm&&!r.check&&r.score==null))&&r.set===n).pop()||null;}
function act(a,x,k,e,b){
  const ex=exFor(x.item,k),ctxc={prog:LG.prog,sessKey:LG.key,idx:x.idx,sp:x.sp,item:x.item};
  const row=b&&b.closest('.lgr,.lgmenu'),id=row?(row.classList.contains('lgr')?row.dataset.row:row.previousElementSibling.dataset.row):null;
  if(a==='info'){openSheet(ex,ctxc);return;}
  if(a==='swap'){openSheet(ex,ctxc);swapMode=true;renderSheet();return;}
  if(a==='skip'){if(e.skip){e.skip=false;e.done=false;settle(x);}else{e.skip=true;e.done=true;}save();render();return;}
  if(a==='addset'){LG.extra[x.idx]=(LG.extra[x.idx]||0)+1;render();return;}
  if(a==='addwu'){LG.wu[x.idx]=(LG.wu[x.idx]||0)+1;render();return;}
  if(a==='menu'){const m=x.idx+'|'+id;LG.menu=LG.menu===m?null:m;render();return;}
  if(a==='rmrow'){LG.menu=null;if(id[0]==='w')LG.wu[x.idx]=Math.max(0,(LG.wu[x.idx]||0)-1);else LG.extra[x.idx]=(LG.extra[x.idx]||0)-1;render();return;}
  if(a==='rir'){const r=findRec(x,id);if(r){const v=+b.dataset.v;r.rir=r.rir===v?null:v;save();}render();return;}
  if(a==='log'){const r=findRec(x,id);LG.menu=null;
    if(r)removeRec(r);
    else{ensureAudio();const el=view.querySelector(`.lgc[data-idx="${x.idx}"] .lgr[data-row="${id}"]`);
      const val=f=>{const v=parseFloat(String(el.querySelector(`[data-f=${f}]`).value).replace(',','.'));return isFinite(v)&&v>0?v:null;};
      const w=id[0]==='w',n=+id.replace('w','');
      recordSet(LG.prog,LG.key,x.idx,ex,{set:n,kg:val('kg'),reps:val('reps'),...(w?{warm:true}:{})},LG.sid);
      if(!w)restOn(S.rest||120,'Rest');}
    settle(x);save();render();return;}
  if(a==='tick'){if(!e.done){e.done=true;e.skip=false;recordSet(LG.prog,LG.key,x.idx,ex,{check:true},LG.sid);}
    else{e.done=false;const r=recsOf(x).filter(z=>z.check).pop();if(r)removeRec(r);}save();render();return;}
  if(a==='clock'){ensureAudio();restOn(+b.dataset.secs,'Time');return;}
  if(a==='scoresave'){const inp=view.querySelector(`.lgc[data-idx="${x.idx}"] [data-a=score]`),v=parseFloat(inp&&inp.value);
    if(!(v>0)){if(inp)inp.focus();return;}const D=densOf(x.item,k);
    S.score[k]=[...(S.score[k]||[]),v];e.done=true;e.sets=1;recordSet(LG.prog,LG.key,x.idx,ex,{score:v,unit:D.score},LG.sid);
    restOff();save();render();return;}
}
function finish(){const p=LG.prog,k=LG.key,from=LG.from;restOff();
  playOpen(p,k,from,true);plFinishView();
  const keep=document.getElementById('plKeep');
  if(keep){const o=keep.onclick;keep.onclick=()=>{o();if(PL&&PL.clk)clkPause(PL.clk);PL=null;logOpen(p,k,from);};}}

/* ----- rest / countdown bar ----- */
function restOn(secs,label){LG.t={total:secs*1000,acc:0,since:Date.now(),label,fired:false,lastS:null};paintRest();restEl.classList.add('on');}
function restOff(){if(LG)LG.t=null;restEl.classList.remove('on','hot');}
function paintRest(){const t=LG&&LG.t;if(!t)return;
  const el=t.acc+(t.since?Date.now()-t.since:0),rem=Math.max(0,t.total-el),s=Math.ceil(rem/1000);
  restEl.innerHTML=`<i class="bar" style="width:${Math.min(100,el/t.total*100)}%"></i>
    <button data-r="reset" aria-label="Restart timer">↺</button><span class="rt"><b>${fmtT(s)}</b><small>${rem?(t.since?t.label:'Paused'):(t.label==='Rest'?'Rest over':'Time')}</small></span>
    <button data-r="pause" aria-label="${t.since?'Pause':'Resume'}">${t.since?'❚❚':'▶'}</button><button data-r="x" aria-label="Hide timer">×</button>`;
  restEl.classList.toggle('hot',!!t.since&&rem<=10000);
  restEl.querySelector('[data-r=reset]').onclick=()=>{t.acc=0;t.since=Date.now();t.fired=false;paintRest();};
  restEl.querySelector('[data-r=pause]').onclick=()=>{if(t.since){t.acc+=Date.now()-t.since;t.since=null;}else{if(t.acc>=t.total){t.acc=0;t.fired=false;}t.since=Date.now();}paintRest();};
  restEl.querySelector('[data-r=x]').onclick=restOff;
  if(t.since&&s<=3&&s>0&&s!==t.lastS){t.lastS=s;beep(660,.07);}
  if(t.since&&rem<=0&&!t.fired){t.fired=true;t.acc=t.total;t.since=null;beep(990,.6);if(navigator.vibrate)navigator.vibrate([300,100,300]);
    setTimeout(()=>{if(LG&&LG.t===t&&!t.since)restOff();},6000);paintRest();}
}
function onTick(){
  if(!LG||view.classList.contains('hide'))return;
  const el=document.getElementById('lgTime');
  if(el)el.textContent=`${fmtT((Date.now()-LG.start)/1000)} · ${pct()}%`;
  if(LG.t)paintRest();
}

/* ----- wiring into the app ----- */
const _show=show;
show=function(v){_show(v);view.classList.toggle('hide',v!=='log');if(v!=='log')restEl.classList.remove('on');};
/* every start button opens the log view unless guided mode is the default */
const _playOpen=playOpen;
playOpen=function(prog,key,from,guided){
  if(!guided&&S.logMode!=='guided')return logOpen(prog,key,from);
  _playOpen(prog,key,from);};
/* leaving the guided player brings you back to the log view if you came from it */
const _plClose=plClose;
plClose=function(){if(PL&&PL.from==='log'){const p=PL.prog,k=PL.key,from=LG&&LG.from;if(PL.clk)clkPause(PL.clk);PL=null;logOpen(p,k,from);return;}_plClose();};
document.getElementById('plX').onclick=()=>plClose();
/* refresh after the exercise sheet closes (swap, notes, a set logged there) */
const _closeSheet=closeSheet;
closeSheet=function(){_closeSheet();if(LG&&!view.classList.contains('hide'))render();};
/* warm-ups stay out of "last time" and history */
previousOf=function(exKey,sid){let last=null;
  for(let i=S.sets.length-1;i>=0;i--){const r=S.sets[i];if(r.ex===exKey&&r.sid!==sid&&!r.check&&!r.warm){last=r.sid;break;}}
  return last?S.sets.filter(r=>r.sid===last&&r.ex===exKey&&!r.check&&!r.warm):null;};
historyOf=function(exKey){const by={};
  S.sets.forEach(r=>{if(r.ex===exKey&&!r.check&&!r.warm)(by[r.sid]=by[r.sid]||[]).push(r);});
  return Object.values(by).sort((a,b)=>b[0].t-a[0].t);};
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&LG&&!view.classList.contains('hide'))wakeOn();});

/* Settings → Logging */
const _renderSettings=renderSettings;
renderSettings=function(){_renderSettings();
  const box=document.getElementById('setExtra');if(!box)return;
  const d=document.createElement('div');d.id='logBox';const g=S.logMode==='guided';
  d.innerHTML=`<p class="grp">Logging</p><p class="sub" style="margin:0 0 10px">How a session opens when you press Start. You can switch inside any session.</p>
    <div class="acts" style="margin:0"><button class="btn-s ${g?'':'on'}" data-m="list">Sets list</button><button class="btn-s ${g?'on':''}" data-m="guided">Guided clock</button></div>`;
  const after=document.getElementById('calBox')||document.getElementById('syncBox');after?after.after(d):box.prepend(d);
  d.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{S.logMode=b.dataset.m==='guided'?'guided':'list';save();renderSettings();});};
})();
