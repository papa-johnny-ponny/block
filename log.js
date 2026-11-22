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
#lgRest{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 14px);transform:translate(-50%,140%);width:min(420px,calc(100% - 32px));z-index:60;
  display:flex;align-items:center;gap:8px;padding:8px;border-radius:999px;background:#1c1c1f;border:1px solid var(--line);overflow:hidden;transition:transform .25s ease}
#lgRest.on{transform:translate(-50%,0)}
#lgRest .bar{position:absolute;inset:0;width:0;background:var(--accent-soft);pointer-events:none}
#lgRest>*:not(.bar){position:relative}
#lgRest .rt{flex:1;display:flex;flex-direction:column;align-items:center;line-height:1.05}
#lgRest b{font-size:22px;font-weight:800;font-variant-numeric:tabular-nums}
#lgRest small{color:var(--dim);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-top:2px}
#lgRest.hot b{color:var(--accent)}
#lgRest button{width:40px;height:40px;border-radius:50%;background:var(--surface-2);display:grid;place-items:center;font-size:16px;color:#fff}
@media (prefers-reduced-motion:reduce){#lgRest{transition:none}}
/* exercise sheet in a session */
#sheet.lgsheet .vedit,#sheet.lgsheet .vnote,#sheet.lgsheet #sLast,#sheet.lgsheet #sEst{display:none}
#sheet.lgsheet.showvid .vedit{display:flex}
#sheet.lgsheet #sClose{margin-bottom:84px}
#sheet.lgsheet.showvid .vnote{display:block}
#sheet.lgsheet .lname{text-align:left;font-size:24px;margin:18px 20px 4px}
#sheet.lgsheet .lmeta,#sheet.lgsheet .desc{text-align:left}
#sheet.lgsheet .desc{font-style:normal;margin-top:4px}
.shb{margin:0 20px}
.shb .lgchips{margin:14px -20px 4px;padding:0 20px}
.lgchips button.on{background:#fff;color:#000}
.lgchips button i{font-style:normal;opacity:.6;margin-left:4px}
.shp{background:var(--surface);border-radius:14px;padding:12px 14px;margin:8px 0 4px}
.shp h4{margin:0 0 8px;color:var(--dim);font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase}
.shp .hrow:last-child{border-bottom:0}
.shp textarea{min-height:90px}
.shp .chipset{display:flex;flex-wrap:wrap;gap:6px}
.shp .chipset button{background:var(--surface-2);border-radius:999px;padding:7px 12px;font-size:13px;font-weight:600}
.shp .chipset button.on{background:#fff;color:#000}
.shp .rmbox{margin:0;padding:0;background:none}
.shrows{background:var(--surface);border-radius:16px;padding:2px 14px 0;margin-top:12px}
.shrows .lgadd:first-child{border-top:0}
.shhint{color:var(--accent-text);font-size:13px;margin:8px 0 0}
/* thumbnails, exercise rows, add-ons */
.th{flex:none;border-radius:12px;overflow:hidden;background:#1d1d20;display:grid;place-items:center;border:1px solid var(--line)}
.th img{width:100%;height:100%;object-fit:cover;display:block}
.th i{font-style:normal;font-weight:800;color:var(--dim-2);font-size:13px;letter-spacing:.04em}
.xblk{margin:28px 0 2px;padding-bottom:10px;border-bottom:1px solid var(--line)}
.xblk h3{margin:0;font-size:20px;font-weight:800;text-transform:uppercase;letter-spacing:-.005em}
.xr{display:flex;align-items:center;gap:14px;width:100%;padding:12px 0;text-align:left;border-radius:12px}
.xr:active{opacity:.7}
.xm{flex:1;min-width:0}
.xm b{display:block;font-size:16px;font-weight:700;line-height:1.25}
.xm b em{font-style:normal;color:var(--accent);margin-right:5px}
.xl{display:flex;align-items:center;flex-wrap:wrap;gap:6px 8px;margin-top:6px;color:var(--dim);font-size:14px}
.xeq{display:inline-flex;align-items:center;gap:4px;background:var(--surface-2);border-radius:8px;padding:4px 8px;font-size:13px;color:#ddd}
.xm small{display:block;color:var(--dim-2);font-size:12px;margin-top:4px}
.xr.done .xm b{color:var(--dim)}
.xr .prog{flex:none;color:var(--dim);font-size:13px;font-weight:700;font-variant-numeric:tabular-nums}
.xr.done .prog{color:var(--accent)}
.xedit{display:flex;align-items:center;gap:8px}
.xedit .xr{flex:1}
.xedit .ord{display:flex;gap:6px}
.xedit .ord button{width:36px;height:36px;border-radius:50%;background:var(--surface-2)}
.xedit .ord button[disabled]{opacity:.3}
#sessCards .ssw.on{padding-left:14px}
.adc{background:var(--surface);border-radius:16px;padding:14px 16px 6px;margin:20px 0 10px}
.adc h4{margin:0 0 4px;color:var(--dim);font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase}
.adc .xr{padding:10px 0}
.adc .xr+.xr{border-top:1px solid var(--line);border-radius:0}
.adb{flex:none;border-radius:999px;padding:8px 13px;font-size:13px;font-weight:700;background:var(--accent);color:#000}
.adb.on{background:var(--surface-2);color:var(--dim)}
.sitem.open{background:var(--surface);border-radius:18px;border-bottom:0;margin:10px -14px;padding:0 14px}
.sitem.open .slist{padding-top:16px}
.sitem.open .slist .t{font-size:20px;font-weight:800;letter-spacing:-.01em}
.sitem.open .sdet{padding:0 0 16px}
.sdet .xr{padding:9px 0}
.sdet .xr+.xr{border-top:1px solid var(--line);border-radius:0}
.sdet .adc{background:var(--surface-2);margin:14px 0 4px}
.sdet .acts{margin:16px 0 0}
.lgh .th{margin-right:2px}
.lgr .rpe{display:block;color:var(--dim-2);font-size:10px;font-weight:600;text-align:right;padding-right:8px;margin-top:-6px}`;
document.head.insertAdjacentHTML('beforeend',`<style id="lgcss">${css}</style>`);

const view=document.createElement('div');view.id='v-log';view.className='wrap hide';
document.getElementById('v-play').after(view);
const restEl=document.createElement('div');restEl.id='lgRest';restEl.setAttribute('role','timer');
document.body.append(restEl);

let LG=null,RT=null;
const VIEWS=['home','program','session','library','settings','play','build'];
const visibleView=()=>VIEWS.find(v=>{const el=document.getElementById('v-'+v);return el&&!el.classList.contains('hide');})||'program';
const isBW=ex=>{const c=(EX[ex.key]||{}).c;return c==='bodyweight'||c==='skill'||c==='animal'||c==='plyo';};
const unitOf=sp=>{const t=(sp&&sp.nt)||'';return /sec|second/i.test(t)?'s':/meter|\bm\b/i.test(t)?'m':'reps';};
const fmtKg=v=>v==null||v===''?'':String(+(+v).toFixed(2));
const numOf=v=>{const n=parseFloat(String(v==null?'':v).replace(',','.'));return isFinite(n)&&n>0?n:null;};

/* A "context" is one session's logging state: the log view (LG) or the exercise
   sheet (SC). Both use the same set rows. */
const SCS={};
function sheetCtx(prog,key){const id=prog+'|'+key;
  const c=SCS[id]||(SCS[id]={prog,key,sid:null,extra:{},wu:{},menu:null,v:{}});c.sid=curSid(prog,key);return c;}
const sidOf=C=>C.sid||curSid(C.prog,C.key);
function recsOf(C,x){const sid=sidOf(C);if(!sid)return[];
  return S.sets.filter(r=>r.sid===sid&&r.prog===C.prog&&r.key===C.key&&r.idx===x.idx);}
function removeRec(r){const i=S.sets.indexOf(r);if(i<0)return;
  (S._del=S._del||{})[r.sid+'|'+r.t+'|'+r.idx]=Date.now();S.sets.splice(i,1);}
/* keep the item's entry (done marks, set count) in step with its records */
function settle(C,x){const e=entry(C.prog,C.key,x.idx),P=parse(x.sp.s),w=recsOf(C,x).filter(r=>!r.check&&!r.warm&&r.score==null);
  e.sets=w.length;if(w.length){const k=w[w.length-1].kg;if(k)e.load=k;}
  if(P.sets>0)e.done=!!e.skip||e.sets>=P.sets;}
function findRec(C,x,id){const w=id[0]==='w',n=+id.replace('w','');
  return recsOf(C,x).filter(r=>(w?r.warm:(!r.warm&&!r.check&&r.score==null))&&r.set===n).pop()||null;}

/* ----- set rows (shared) ----- */
function rowsHTML(C,x,ex,P){
  const recs=recsOf(C,x),bw=isBW(ex),unit=unitOf(x.sp),ps=x.sp.ps;
  const work=recs.filter(r=>!r.check&&!r.warm&&r.score==null),warm=recs.filter(r=>r.warm);
  const maxN=work.reduce((m,r)=>Math.max(m,r.set||0),0);
  const nW=Math.max(0,P.sets+(C.extra[x.idx]||0),maxN),nWu=Math.max(warm.reduce((m,r)=>Math.max(m,r.set||0),0),C.wu[x.idx]||0);
  let h=`<button class="lgadd" data-a="addwu"><i>+</i>Warm-up</button>`;
  const row=(n,w)=>{
    const r=(w?warm:work).filter(z=>z.set===n).pop(),id=`${w?'w':''}${n}`,q=!w&&ps?ps[n-1]:null;
    const d=defaultsFor(C.prog,C.key,x,Math.max(1,Math.min(n,P.sets||n)),sidOf(C));
    const dk=w?(d.kg?Math.round(d.kg*.5/2.5)*2.5||null:null):d.kg,dr=w?d.reps:(q&&/^\d+$/.test(q.r)?+q.r:d.reps);
    const kg=r?r.kg:(C.v[x.idx+'|'+id+'|kg']??dk),reps=r?r.reps:(C.v[x.idx+'|'+id+'|reps']??dr);
    const kgPh=bw?'BW':(!w&&q&&q.p!=null?q.p+'%':(!w&&x.sp.p!=null?Math.round(x.sp.p)+'%':'–'));
    const rPh=q&&q.r&&!/^\d+$/.test(q.r)?q.r:'–';
    const open=C.menu===x.idx+'|'+id,last=!w&&n===nW&&!r;
    let s=`<div class="lgr ${r?'done':''}" data-row="${id}"><button class="lgn ${w?'w':''}" data-a="log" aria-label="${r?'Undo':'Log'} ${w?'warm-up':'set'} ${n}">${w?'W'+n:n}</button>
      <label class="lgv"><input type="number" inputmode="decimal" data-f="kg" value="${fmtKg(kg)}" placeholder="${esc(kgPh)}" aria-label="kg"><span>${bw?'+kg':'kg'}</span></label>
      <label class="lgv"><input type="number" inputmode="numeric" data-f="reps" value="${reps==null?'':reps}" placeholder="${esc(rPh)}" aria-label="${unit}"><span>${unit}</span></label>
      <button class="lgdot" data-a="menu" aria-label="More for this set" aria-expanded="${open}">⋮</button></div>`;
    if(open){s+=`<div class="lgmenu">`;
      if(r&&!w)s+=`<span>Reps in reserve</span>${[0,1,2,3].map(v=>`<button data-a="rir" data-v="${v}" class="${r.rir===v?'on':''}">${v===3?'3+':v}</button>`).join('')}`;
      if(!r&&(last||w))s+=`<button class="del" data-a="rmrow">Remove ${w?'warm-up':'set'}</button>`;
      if(r)s+=`<button class="del" data-a="log">Undo this ${w?'warm-up':'set'}</button>`;
      s+=`</div>`;}
    return s;};
  for(let n=1;n<=nWu;n++)h+=row(n,true);
  for(let n=1;n<=nW;n++)h+=row(n,false);
  return h+`<button class="lgadd" data-a="addset"><i>+</i>Set</button>`;
}
/* wire rows inside root; redraw() repaints whatever holds them */
function wireRows(C,x,root,redraw){
  const k=logKey(C.prog,C.key,x.idx),ex=exFor(x.item,k);
  root.querySelectorAll('.lgr input').forEach(inp=>inp.onchange=()=>{
    const id=inp.closest('.lgr').dataset.row,f=inp.dataset.f,val=numOf(inp.value),r=findRec(C,x,id);
    if(r){r[f]=val;settle(C,x);save();redraw();}else C.v[x.idx+'|'+id+'|'+f]=val;});
  root.querySelectorAll('[data-a]').forEach(b=>{if(b.tagName==='INPUT')return;const a=b.dataset.a;
    if(!['log','menu','rmrow','rir','addset','addwu'].includes(a))return;
    b.onclick=()=>{
      const row=b.closest('.lgr,.lgmenu'),id=row?(row.classList.contains('lgr')?row.dataset.row:row.previousElementSibling.dataset.row):null;
      if(a==='addset'){C.extra[x.idx]=(C.extra[x.idx]||0)+1;}
      else if(a==='addwu'){C.wu[x.idx]=(C.wu[x.idx]||0)+1;}
      else if(a==='menu'){const m=x.idx+'|'+id;C.menu=C.menu===m?null:m;}
      else if(a==='rmrow'){C.menu=null;if(id[0]==='w')C.wu[x.idx]=Math.max(0,(C.wu[x.idx]||0)-1);else C.extra[x.idx]=(C.extra[x.idx]||0)-1;}
      else if(a==='rir'){const r=findRec(C,x,id);if(r){const v=+b.dataset.v;r.rir=r.rir===v?null:v;save();}}
      else if(a==='log'){const r=findRec(C,x,id);C.menu=null;
        if(r)removeRec(r);
        else{ensureAudio();const el=root.querySelector(`.lgr[data-row="${id}"]`),w=id[0]==='w',n=+id.replace('w','');
          const val=f=>numOf(el.querySelector(`[data-f=${f}]`).value);
          const e=entry(C.prog,C.key,x.idx);e.skip=false;
          recordSet(C.prog,C.key,x.idx,ex,{set:n,kg:val('kg'),reps:val('reps'),...(w?{warm:true}:{})},sidOf(C));
          C.sid=sidOf(C);if(!w)restOn(S.rest||120,'Rest');}
        settle(C,x);save();}
      redraw();};});
}

/* ----- open / close the log view ----- */
function logOpen(prog,key,from){
  ensureAudio();wakeOn();
  const s=openSession(prog,key);save();
  LG={prog,key,sid:s.id,start:s.start,B:blocksOf(prog,key),from:from||visibleView(),extra:{},wu:{},menu:null,v:{}};
  show('log');render();window.scrollTo(0,0);
}
function logClose(){const from=LG?LG.from:'program';LG=null;restOff();wakeOff();
  if(from==='home'){show('home');renderHome();}
  else if(from==='session'){show('session');renderSession();}
  else{show('program');renderProgram();}}
window.logOpen=logOpen;

function pct(){const all=LG.B.blocks.flatMap(b=>b.items);
  return all.length?Math.round(all.filter(x=>entry(LG.prog,LG.key,x.idx).done).length/all.length*100):0;}
function render(){
  if(!LG)return;
  LG.B=blocksOf(LG.prog,LG.key);
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
  h+=addonsHTML(LG.prog,LG.key,'Add to this session')+summary()+`<button class="pgo" style="width:100%" id="lgDone">Finish workout</button>`;
  view.innerHTML=h;wire();wireAddons(view,LG.prog,LG.key,render);onTick();
}
function chipsHTML(x,e,eqName){
  return `<div class="lgchips">${x.item.id?`<button data-a="p:eq">${esc(eqName||'Equipment')}<i>▾</i></button><button data-a="swap">Swap</button>`:''}
    <button data-a="p:history">History</button><button data-a="p:notes">Notes</button>
    <button data-a="skip" class="${e.skip?'on':''}">${e.skip?'Skipped · undo':'Skip today'}</button></div>`;
}
function card(x){
  const k=logKey(LG.prog,LG.key,x.idx),ex=exFor(x.item,k),e=entry(LG.prog,LG.key,x.idx),P=parse(x.sp.s),D=densOf(x.item,k);
  const meta=[D?(D.clock?`${D.clock} min · score in ${UNITS[D.score]}`:'For time'):P.label,x.sp.nt].filter(Boolean).join(' · ');
  const pl=prevLine(ex.key,LG.sid);
  let h=`<section class="lgc ${e.skip?'skip':''}" data-idx="${x.idx}"><div class="lgh">${thumbHTML(ex,52)}<div><b>${esc(ex.n)}</b>
    ${meta?`<small>${esc(meta)}</small>`:''}${pl?`<small class="last">${esc(pl)}</small>`:''}</div>
    <button class="lgq" data-a="info" aria-label="About ${esc(ex.n)}: video and details">?</button></div>
    ${chipsHTML(x,e,x.item.id&&S.eq&&S.eq[x.item.id])}`;
  if(e.skip)return h+`</section>`;
  if(D){const hist=S.score[k]||[],t=target(hist,D.score),u=UNITS[D.score];
    h+=`<div class="lgsc"><input type="number" inputmode="decimal" data-a="score" placeholder="${hist.length?`Last ${hist[hist.length-1]} ${u}${t?` · target ${t}`:''}`:`Total in ${u}`}" aria-label="Score in ${u}">
      <button class="btn-s on" data-a="scoresave">${e.done?'Saved ✓':'Save'}</button>
      ${D.clock?`<button class="btn-s" data-a="clock" data-secs="${D.clock*60}">${D.clock}:00</button>`:''}</div>`;
    return h+`</section>`;}
  if(P.sets>0)return h+rowsHTML(LG,x,ex,P)+`</section>`;
  h+=`<div class="lgone ${e.done?'done':''}"><button class="lgn" data-a="tick" aria-label="${e.done?'Undo':'Mark done'}">${e.done?'✓':''}</button><p>${esc(P.label||'Tick when done')}</p>
    ${P.minutes?`<button class="btn-s" data-a="clock" data-secs="${P.minutes*60}">Start ${P.minutes}:00</button>`:'<span></span>'}</div>`;
  return h+`</section>`;
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
function itemOf(idx){return LG.B.blocks.flatMap(b=>b.items).find(x=>x.idx===idx);}
function wire(){
  const q=id=>document.getElementById(id);
  q('lgX').onclick=logClose;
  q('lgGuide').onclick=()=>{const p=LG.prog,k=LG.key;restOff();playOpen(p,k,'log',true);};
  q('lgFin').onclick=q('lgDone').onclick=finish;
  view.querySelectorAll('[data-timer]').forEach(b=>b.onclick=()=>{const bi=+b.dataset.timer,p=LG.prog,k=LG.key;restOff();playOpen(p,k,'log',true);plSetBlock(bi);});
  view.querySelectorAll('.lgc').forEach(c=>{
    const x=itemOf(+c.dataset.idx),k=logKey(LG.prog,LG.key,x.idx),e=entry(LG.prog,LG.key,x.idx),ex=exFor(x.item,k);
    const cc={prog:LG.prog,sessKey:LG.key,idx:x.idx,sp:x.sp,item:x.item};
    wireRows(LG,x,c,render);
    c.querySelectorAll('[data-a]').forEach(b=>{const a=b.dataset.a;if(b.tagName==='INPUT')return;
      if(a==='info')b.onclick=()=>openSheet(ex,cc);
      else if(a.startsWith('p:'))b.onclick=()=>{openSheet(ex,cc);SHP=a.slice(2);renderSheet();};
      else if(a==='swap')b.onclick=()=>{openSheet(ex,cc);swapMode=true;renderSheet();};
      else if(a==='skip')b.onclick=()=>{if(e.skip){e.skip=false;e.done=false;settle(LG,x);}else{e.skip=true;e.done=true;}save();render();};
      else if(a==='tick')b.onclick=()=>{if(!e.done){e.done=true;e.skip=false;recordSet(LG.prog,LG.key,x.idx,ex,{check:true},LG.sid);}
        else{e.done=false;const r=recsOf(LG,x).filter(z=>z.check).pop();if(r)removeRec(r);}save();render();};
      else if(a==='clock')b.onclick=()=>{ensureAudio();restOn(+b.dataset.secs,'Time');};
      else if(a==='scoresave')b.onclick=()=>saveScore(x,k,e,ex,c);});
    const sc=c.querySelector('[data-a=score]');if(sc)sc.onkeydown=ev=>{if(ev.key==='Enter')saveScore(x,k,e,ex,c);};
  });
}
function saveScore(x,k,e,ex,c){const inp=c.querySelector('[data-a=score]'),v=parseFloat(inp&&inp.value);
  if(!(v>0)){if(inp)inp.focus();return;}const D=densOf(x.item,k);
  S.score[k]=[...(S.score[k]||[]),v];e.done=true;e.sets=1;recordSet(LG.prog,LG.key,x.idx,ex,{score:v,unit:D.score},LG.sid);
  restOff();save();render();}
function finish(){const p=LG.prog,k=LG.key,from=LG.from;restOff();
  playOpen(p,k,from,true);plFinishView();
  const keep=document.getElementById('plKeep');
  if(keep){const o=keep.onclick;keep.onclick=()=>{o();if(PL&&PL.clk)clkPause(PL.clk);PL=null;logOpen(p,k,from);};}}

/* ----- exercise sheet: chips, panels and set rows ----- */
let SHP=null;   // which panel is open: eq, history, notes, video, rest, rm
const _openSheet=openSheet;
openSheet=function(ex,c){SHP=null;const sh=document.getElementById('sheet');sh.classList.remove('lgsheet','showvid');_openSheet(ex,c);};
const _closeSheet=closeSheet;
closeSheet=function(){_closeSheet();document.getElementById('sheet').classList.remove('lgsheet','showvid');
  if(LG&&!view.classList.contains('hide'))render();};
const _renderSheet=renderSheet;
renderSheet=function(){_renderSheet();
  const sh=document.getElementById('sheet');
  if(!ctx||!ctx.c||swapMode){sh.classList.remove('lgsheet','showvid');return;}
  const {prog,sessKey,idx,sp,item}=ctx.c,k=logKey(prog,sessKey,idx);
  if(densOf(item||{},k)){sh.classList.remove('lgsheet','showvid');return;}
  sh.classList.add('lgsheet');sh.classList.toggle('showvid',SHP==='video');
  const body=document.getElementById('sBody'),ex=ctx.ex,e=entry(prog,sessKey,idx),P=parse(sp.s);
  const C=sheetCtx(prog,sessKey),x={item,idx,sp};
  const rm=body.querySelector('.rmbox'),densFn=(document.getElementById('densOn')||{}).onclick;
  const pl=prevLine(ex.key,sidOf(C));
  document.getElementById('sScheme').innerHTML=`<b>${esc(sp.ps?sp.ps.length+' sets':P.label)}</b>${sp.ps?' · '+esc(sp.ps.map(z=>z.r).join(' / ')):''}${pl?`<br><span style="font-size:13px">${esc(pl)}</span>`:''}`;
  /* superset */
  const mem=ssMembers(prog,sessKey,idx),real=realItems(sessionOf(prog,sessKey).items),ri=real.findIndex(z=>z.idx===idx);
  const nextX=real[ri+1],noGrp=!sessionOf(prog,sessKey).items.some(z=>z.item.grp);
  const nx=mem.length?mem[(mem.findIndex(z=>z.idx===idx)+1)%mem.length]:null;
  const eqName=item.id&&S.eq&&S.eq[item.id];
  const chip=(a,label,on)=>`<button data-a="${a}" class="${on?'on':''}">${label}</button>`;
  let h=`<div class="lgchips">`
    +(item.id?chip('p:eq',`${esc(eqName||'Equipment')}<i>▾</i>`,SHP==='eq')+chip('swap','Swap'):'')
    +chip('p:history','History',SHP==='history')+chip('p:notes','Notes',SHP==='notes')
    +chip('p:rest',`Rest ${S.rest<120?S.rest+' s':S.rest/60+' min'}`,SHP==='rest')
    +(nx?chip('ssnext','Next · '+esc(exFor(nx.item,logKey(prog,sessKey,nx.idx)).n))+chip('ssout','Leave superset'):(nextX&&noGrp?chip('ssin','Superset with next'):''))
    +(P.sets>0?chip('broke',e.broke?'Form broke ✓':'Form broke',e.broke):'')
    +(densFn?chip('dens','Density'):'')
    +chip('skip',e.skip?'Skipped · undo':'Skip today',e.skip)
    +chip('p:video','Video link',SHP==='video')
    +(item.addon?chip('unadd','Remove from session'):'')
    +(rm?chip('p:rm','Set 1RM',SHP==='rm'):'')+`</div>`;
  if(rm&&SHP!=='rm')h+=`<p class="shhint">No 1RM on file, so weights show as %. Tap Set 1RM.</p>`;
  if(SHP==='eq')h+=`<div class="shp"><h4>Equipment</h4><div class="chipset">${['',...EQUIP].map(v=>`<button data-eq="${v}" class="${(eqName||'')===v?'on':''}">${v||'As written'}</button>`).join('')}</div></div>`;
  if(SHP==='history'){const H=historyOf(ex.key).slice(0,8);
    h+=`<div class="shp"><h4>History</h4>${H.length?H.map(g=>`<div class="hrow"><span>${fmtDate(g[0].t)}</span><b>${esc(g.map(setTxt).join(', '))}</b></div>`).join(''):'<p class="sub" style="margin:0">Nothing logged yet.</p>'}</div>`;}
  if(SHP==='notes')h+=`<div class="shp"><h4>Notes</h4><textarea id="shNote" placeholder="Grip, setup, what felt right">${esc((S.notes||{})[ex.key]||'')}</textarea></div>`;
  if(SHP==='rest')h+=`<div class="shp"><h4>Rest after each set</h4><div class="chipset">${[60,90,120,180].map(v=>`<button data-rest="${v}" class="${S.rest===v?'on':''}">${v<120?v+' s':v/60+' min'}</button>`).join('')}</div></div>`;
  if(SHP==='video')h+=`<p class="sub" style="margin:8px 0 0">Paste your own YouTube link above to replace the video.</p>`;
  if(SHP==='rm')h+=`<div class="shp" id="shRm"></div>`;
  if(e.broke)h+=`<p class="shhint">Form broke. The weight stays where it is next time.</p>`;
  h+=e.skip?`<p class="sub" style="margin:12px 0 0">Skipped today.</p>`
    :(P.sets>0?`<div class="shrows">${rowsHTML(C,x,ex,P)}</div>`
      :`<div class="shrows"><div class="lgone ${e.done?'done':''}" style="border-top:0"><button class="lgn" data-a="tick">${e.done?'✓':''}</button><p>${esc(P.label||'Tick when done')}</p>${P.minutes?`<button class="btn-s" data-a="clock" data-secs="${P.minutes*60}">Start ${P.minutes}:00</button>`:'<span></span>'}</div></div>`);
  const wrap=document.createElement('div');wrap.className='shb';wrap.innerHTML=h;
  body.innerHTML='';body.append(wrap);
  if(rm&&SHP==='rm')document.getElementById('shRm').append(rm);
  const redraw=()=>renderSheet();
  if(P.sets>0&&!e.skip)wireRows(C,x,wrap,redraw);
  wrap.querySelectorAll('.lgchips [data-a]').forEach(b=>b.onclick=()=>{const a=b.dataset.a;
    if(a.startsWith('p:')){const p=a.slice(2);SHP=SHP===p?null:p;}
    else if(a==='swap'){swapMode=true;}
    else if(a==='broke'){e.broke=!e.broke;save();}
    else if(a==='dens'){densFn();return;}
    else if(a==='skip'){if(e.skip){e.skip=false;e.done=false;settle(C,x);}else{e.skip=true;e.done=true;}save();}
    else if(a==='ssin'){const m=ssOf(prog,sessKey),g=m[idx]||m[nextX.idx]||uid();m[idx]=g;m[nextX.idx]=g;save();}
    else if(a==='ssout'){const m=ssOf(prog,sessKey),g=m[idx];delete m[idx];const left=Object.keys(m).filter(i=>m[i]===g);if(left.length<2)left.forEach(i=>delete m[i]);save();}
    else if(a==='unadd'){addonToggle(prog,sessKey,item.id);closeSheet();return;}
    else if(a==='ssnext'){openSheet(exFor(nx.item,logKey(prog,sessKey,nx.idx)),{prog,sessKey,idx:nx.idx,sp:nx.sp,item:nx.item});return;}
    renderSheet();});
  wrap.querySelectorAll('[data-eq]').forEach(b=>b.onclick=()=>{const v=b.dataset.eq;if(v)S.eq[item.id]=v;else delete S.eq[item.id];save();ctx.ex=exFor(item,k);renderSheet();});
  wrap.querySelectorAll('[data-rest]').forEach(b=>b.onclick=()=>{S.rest=+b.dataset.rest;save();renderSheet();});
  const nt=document.getElementById('shNote');
  if(nt)nt.oninput=()=>{const v=nt.value.trim();if(v)S.notes[ex.key]=nt.value;else delete S.notes[ex.key];save();};
  const tk=wrap.querySelector('[data-a=tick]');
  if(tk)tk.onclick=()=>{if(!e.done){e.done=true;e.skip=false;recordSet(prog,sessKey,idx,ex,{check:true},sidOf(C));}
    else{e.done=false;const r=recsOf(C,x).filter(z=>z.check).pop();if(r)removeRec(r);}save();renderSheet();};
  const ck=wrap.querySelector('[data-a=clock]');if(ck)ck.onclick=()=>{ensureAudio();restOn(+ck.dataset.secs,'Time');};
};

/* ----- rest / countdown bar (works in the log view and in the sheet) ----- */
function restOn(secs,label){RT={total:secs*1000,acc:0,since:Date.now(),label,fired:false,lastS:null};paintRest();restEl.classList.add('on');}
function restOff(){RT=null;restEl.classList.remove('on','hot');}
function paintRest(){const t=RT;if(!t)return;
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
    setTimeout(()=>{if(RT===t&&!t.since)restOff();},6000);paintRest();}
}
function onTick(){
  if(RT)paintRest();
  if(!LG||view.classList.contains('hide'))return;
  const el=document.getElementById('lgTime');
  if(el)el.textContent=`${fmtT((Date.now()-LG.start)/1000)} · ${pct()}%`;
}
setInterval(onTick,500);

/* ----- thumbnails ----- */
function thumbOf(ex){const u=(S.video||{})[ex.key]||ex.v||(EX[ex.key]||{}).v,id=u?ytId(u):null;
  return id?`https://i.ytimg.com/vi/${id}/mqdefault.jpg`:null;}
const initials=n=>String(n||'').replace(/\(.*?\)/g,'').split(/[\s·-]+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
function thumbHTML(ex,size){const t=thumbOf(ex);
  return `<span class="th" style="width:${size}px;height:${size}px" aria-hidden="true">${t?`<img src="${t}" alt="" loading="lazy">`:`<i>${esc(initials(ex.n))}</i>`}</span>`;}

/* ----- what a row says: 3x · reps per set · load ----- */
function planOf(prog,key,x,ex){
  const sp=x.sp,P=parse(sp.s),k=logKey(prog,key,x.idx),D=densOf(x.item,k),u=unitOf(sp);
  if(D)return{n:null,t:D.clock?`${D.clock} min · score in ${UNITS[D.score]}`:'For time'};
  let t;
  if(sp.ps)t='Reps '+sp.ps.map(z=>z.r).join(', ');
  else if(P.wave)t='Reps '+Array.from({length:P.sets},(_,i)=>P.wave[i%P.wave.length]).join(', ');
  else if(P.reps&&P.sets>1&&P.sets<=6)t=(u==='s'?'Seconds ':u==='m'?'Meters ':'Reps ')+Array(P.sets).fill(P.reps).join(', ');
  else if(P.reps)t=`${P.reps} ${u}`;
  else if(P.sets>0)t=P.label.replace(/^\S+ sets? × /,'');
  else t=P.label;
  if(sp.p!=null){const l=loadFor(ex.key,sp.p);t+=' · '+(l?`${sp.ps?'top ':''}${l} kg`:`${sp.p} %`);}
  return{n:P.sets>0?P.sets:null,t};
}
function guessEq(ex){const q=S.eq&&S.eq[ex.key.replace(/^x:/,'')];if(q)return q;
  const n=ex.n.toLowerCase(),c=(EX[ex.key]||{}).c;
  const hit=[['barbell','Barbell'],['dumbbell','Dumbbell'],[' db ','Dumbbell'],['kettlebell','Kettlebell'],['kb ','Kettlebell'],['cable','Cable'],['band','Band'],['ring','Rings'],['sandbag','Sandbag'],['landmine','Landmine'],['machine','Machine'],['plate','Plate'],['rope','Rope']]
    .find(([w])=>(' '+n+' ').includes(w));
  if(hit)return hit[1];
  if(c==='bodyweight'||c==='skill'||c==='animal'||c==='plyo')return 'Bodyweight';
  return /deadlift|squat|bench|press|row|clean/.test(n)?'Barbell':'Equipment';
}
function exRowHTML(prog,key,x,size,withEq,right){
  const k=logKey(prog,key,x.idx),ex=exFor(x.item,k),pl=planOf(prog,key,x,ex),e=entry(prog,key,x.idx);
  const nt=[x.sp.nt,e.broke?'form broke':'',e.skip?'skipped today':''].filter(Boolean).join(' · ');
  return `<span class="xr-in" style="display:contents">${thumbHTML(ex,size)}<span class="xm"><b>${pl.n?`<em>${pl.n}x</em>`:''}${esc(ex.n)}</b>
    <span class="xl">${withEq&&x.item.id?`<span class="xeq" data-eq="1">${esc(guessEq({...ex,key:x.item.id}))} ⇅</span>`:''}<span>${esc(pl.t)}</span></span>
    ${nt?`<small>${esc(nt)}</small>`:''}</span>${right||''}</span>`;
}

/* ----- add-ons: grip pairings you can add before or during a session ----- */
const GRIP_IDS=['thick_farmers','hammer_supro','towel_biceps'];
const _sessionOfA=sessionOf;
sessionOf=function(prog,key){const r=_sessionOfA(prog,key),a=S.addon&&S.addon[prog+'|'+key];
  if(a)Object.keys(a).forEach(id=>{const o=a[id];if(!EX[id])return;
    r.items.push({item:{id,s:o.s,nt:o.nt,addon:1},idx:o.idx,sp:{s:o.s,nt:o.nt,confirmed:true}});});
  return r;};
function addonToggle(prog,key,id,scheme){const sk=prog+'|'+key;S.addon=S.addon||{};const a=S.addon[sk]=S.addon[sk]||{};
  if(a[id]){delete a[id];if(!Object.keys(a).length)delete S.addon[sk];}
  else{const g=GRIP_IDS.indexOf(id);a[id]={idx:g>=0?900+g:950+Object.keys(a).length,s:scheme,nt:/\d\s*s$/.test(scheme)?'grip · seconds':'grip pairing'};}
  save();}
function tipsFor(prog,key){if(prog==='nogi')return[];
  let items;try{items=realItems(sessionOf(prog,key).items);}catch(e){return[];}
  const added=(S.addon&&S.addon[prog+'|'+key])||{};
  const tips=gripTips(items.filter(x=>!x.item.addon).map(x=>x.item.id));
  Object.keys(added).forEach(id=>{if(!tips.some(t=>t[0]===id))tips.push([id,added[id].s,'added']);});
  return tips.filter(t=>EX[t[0]]).map(t=>({id:t[0],s:t[1],why:t[2],on:!!added[t[0]]}));}
function addonsHTML(prog,key,title){const tips=tipsFor(prog,key);if(!tips.length)return'';
  return `<div class="adc"><h4>${esc(title||'Grip pairing')}</h4>${tips.map(t=>{const ex=exOf({id:t.id});
    return `<div class="xr">${thumbHTML(ex,44)}<span class="xm"><b>${esc(ex.n)}</b><span class="xl"><span>${esc(t.s)}${t.why!=='added'?' · '+esc(t.why):''}</span></span></span>
      <button class="adb ${t.on?'on':''}" data-add="${t.id}" data-s="${esc(t.s)}" aria-pressed="${t.on}">${t.on?'Added ✓':'+ Add'}</button></div>`;}).join('')}</div>`;}
function wireAddons(root,prog,key,redraw){
  root.querySelectorAll('[data-add]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();addonToggle(prog,key,b.dataset.add,b.dataset.s);redraw();});}

/* ----- session page: rows with thumbnails, block headings, 3x and reps ----- */
paintItems=function(box,prog,sessKey,items){
  box.innerHTML='';
  const sk=`${prog}|${sessKey}`,ss=S.ss[sk]||{},real=items.filter(x=>!x.item.grp),edit=EDIT===sk;
  items.forEach(x=>{const {item,idx,sp}=x;
    if(item.grp){const h=document.createElement('div');h.className='xblk';h.innerHTML=`<h3>${esc(item.grp)}</h3>`;box.appendChild(h);return;}
    const k=logKey(prog,sessKey,idx),ex=exFor(item,k),P=parse(sp.s),e=entry(prog,sessKey,idx);
    const ri=real.indexOf(x),g=ss[idx],pg=ri>0?ss[real[ri-1].idx]:null,ng=ri<real.length-1?ss[real[ri+1].idx]:null;
    const w=document.createElement('div');w.className='ssw'+(g?' on':'')+(g&&pg===g?' mid':'')+(g&&ng===g?' cont':'');
    if(g&&pg!==g)w.innerHTML='<p class="sslab">Superset</p>';
    const right=`<span class="prog">${e.done?'✓':(P.sets>0&&e.sets?`${Math.min(e.sets,P.sets)}/${P.sets}`:'')}</span>`;
    if(edit){const c=document.createElement('div');c.className='xedit';
      c.innerHTML=`<div class="xr">${exRowHTML(prog,sessKey,x,60,true,'')}</div><span class="ord"><button data-d="-1" ${ri===0?'disabled':''} aria-label="Move up">↑</button>
        <button data-d="1" ${ri===real.length-1?'disabled':''} aria-label="Move down">↓</button></span>`;
      c.querySelectorAll('.ord button').forEach(b=>b.onclick=()=>{const o=real.map(r=>r.idx),j=ri+ +b.dataset.d;
        [o[ri],o[j]]=[o[j],o[ri]];S.order[sk]=o;save();renderSession();});
      w.appendChild(c);}
    else{const b=document.createElement('button');b.className='xr'+(e.done?' done':'');b.innerHTML=exRowHTML(prog,sessKey,x,60,true,right);
      b.onclick=ev=>{openSheet(ex,{prog,sessKey,idx,sp,item});if(ev.target.closest('[data-eq]')){SHP='eq';renderSheet();}};w.appendChild(b);}
    box.appendChild(w);
  });
  if(!edit){const d=document.createElement('div');d.innerHTML=addonsHTML(prog,sessKey);
    if(d.firstChild){box.appendChild(d.firstChild);wireAddons(box,prog,sessKey,()=>{
      if(!document.getElementById('v-session').classList.contains('hide'))renderSession();else paintItems(box,prog,sessKey,sessionOf(prog,sessKey).items);});}}
};

/* ----- program overview: an open session lists its exercises the same way ----- */
slDetail=function(P,d){
  const items=sessionOf(P.id,d.key).items;let h='';
  for(const x of items){
    if(x.item.grp){h+=`<p class="sgh" style="margin:14px 0 2px">${esc(x.item.grp)}</p>`;continue;}
    h+=`<div class="xr">${exRowHTML(P.id,d.key,x,44,false,'')}</div>`;}
  return h+addonsHTML(P.id,d.key,'Grip pairing · add if you want')
    +`<div class="acts"><button class="btn-s on" data-go="start">Start session</button><button class="btn-s" data-go="open">Details</button></div>`;
};
const _slSet=slSet;
slSet=function(P,d,w,open){_slSet(P,d,w,open);const panel=w.querySelector('.sdet');
  if(open&&panel)wireAddons(panel,P.id,d.key,()=>{panel.innerHTML='';slSet(P,d,w,true);});};

/* ----- wiring into the app ----- */
const _show=show;
show=function(v){_show(v);view.classList.toggle('hide',v!=='log');if(v!=='log'&&v!=='session'&&v!=='program')restOff();};
/* every start button opens the log view unless guided mode is the default */
const _playOpen=playOpen;
playOpen=function(prog,key,from,guided){
  if(!guided&&S.logMode!=='guided')return logOpen(prog,key,from);
  _playOpen(prog,key,from);};
/* leaving the guided player brings you back to the log view if you came from it */
const _plClose=plClose;
plClose=function(){if(PL&&PL.from==='log'){const p=PL.prog,k=PL.key,from=LG&&LG.from;if(PL.clk)clkPause(PL.clk);PL=null;logOpen(p,k,from);return;}_plClose();};
document.getElementById('plX').onclick=()=>plClose();
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
