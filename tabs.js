/* BLOCK. tabs — a bottom bar (Home · Programs · Library · Profile) and a + button for
   starting something new. Home is split into sections you arrange yourself: press and
   hold a section and they start to wiggle; drag the handle to move one, tap − to take it
   away, Edit (top left) to bring sections back, ✓ (top right) when you are done.
   News lists what is new in the app. */
(function(){
const $=id=>document.getElementById(id);
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE='cubic-bezier(.23,1,.32,1)',DRAWER='cubic-bezier(.32,.72,0,1)';
const svg=(d,w=24)=>`<svg class="ic" width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const IC={
  home:svg('<path d="M4 10.4 12 4l8 6.4V19a1.5 1.5 0 0 1-1.5 1.5H15v-5.2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5.2H5.5A1.5 1.5 0 0 1 4 19z"/>'),
  programs:svg('<rect x="4" y="5" width="16" height="15.5" rx="3"/><path d="M8.5 3v4M15.5 3v4M4 10h16M8 14h3.5M8 17.2h7"/>'),
  library:svg('<path d="M6.5 7v10M17.5 7v10M3.8 9.5v5M20.2 9.5v5M6.5 12h11"/>'),
  profile:svg('<circle cx="12" cy="8.3" r="3.8"/><path d="M4.8 20.2c1.1-3.5 3.9-5.4 7.2-5.4s6.1 1.9 7.2 5.4"/>'),
  plus:svg('<path d="M12 5v14M5 12h14"/>',26),
  gen:svg('<path d="M12 3.5 13.8 9l5.7.3-4.5 3.4 1.6 5.5L12 15l-4.6 3.2L9 12.7 4.5 9.3l5.7-.3z"/>'),
  build:svg('<path d="M5 6h14M5 12h14M5 18h9"/>'),
  run:svg('<circle cx="14.5" cy="4.8" r="1.8"/><path d="M8.5 21l2.5-5 3 2.5V21M6 12.5l3-3.5 3.5.8 2.5 3 3 .7M11 16l1.5-6"/>'),
  past:svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  check:svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>',22),
  grip:svg('<path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/>',22),
  minus:svg('<path d="M7 12h10"/>',16)};

/* ---------- styles ---------- */
const st=document.createElement('style');st.textContent=`
/* bottom bar */
.tabbar{position:fixed;left:0;right:0;bottom:0;z-index:60;display:none;justify-content:center;padding:0 14px calc(env(safe-area-inset-bottom,0px) + 10px);pointer-events:none}
.tabbar::before{content:'';position:absolute;inset:-26px 0 0;background:linear-gradient(to top,#000 45%,rgba(0,0,0,0));pointer-events:none}
body.tabbed .tabbar{display:flex}
.tabin{position:relative;display:flex;align-items:center;gap:10px;width:100%;max-width:560px}
.tbp{flex:1;display:flex;padding:5px;border-radius:999px;background:rgba(28,28,31,.88);-webkit-backdrop-filter:blur(18px) saturate(1.4);backdrop-filter:blur(18px) saturate(1.4);
  border:1px solid rgba(255,255,255,.08);pointer-events:auto}
.tbp button{flex:1;min-width:0;height:54px;border-radius:999px;border:0;background:none;color:var(--dim);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;
  font:inherit;font-size:10.5px;font-weight:600;transition:color 160ms ease,background-color 200ms ease,transform 140ms ease-out}
.tbp button[aria-current="page"]{background:var(--surface-2);color:#fff}
.tbp button[aria-current="page"] .ic{color:var(--accent)}
.tbp button:active,.tbplus:active{transform:scale(.95)}
.tbplus{flex:0 0 auto;width:64px;height:64px;border-radius:50%;border:0;background:#fff;color:#000;display:grid;place-items:center;pointer-events:auto;
  box-shadow:0 6px 20px rgba(0,0,0,.45);transition:transform 140ms ease-out}
.tbplus .ic{stroke-width:2.4}
@media (hover:hover) and (pointer:fine){.tbp button:not([aria-current="page"]):hover{color:#fff}}
body.tabbed .wrap{padding-bottom:calc(env(safe-area-inset-bottom,0px) + 128px)}
body.tabbed .aibub{bottom:calc(env(safe-area-inset-bottom,0px) + 92px + var(--gbar,0px))}
body.tabbed #lBack{display:none}
body.tabbed #v-library>.title{margin-top:22px!important}
body.hedit .tabbar,body.hedit .aibub{opacity:0;pointer-events:none}
.tabbar,.aibub{transition:opacity 180ms ease}

/* sheets */
.tscrim{position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.6);opacity:0;pointer-events:none;transition:opacity 240ms ease}
.tscrim.on{opacity:1;pointer-events:auto}
.tsheet{position:fixed;left:0;right:0;bottom:0;z-index:91;max-width:620px;margin:0 auto;max-height:86vh;overflow:auto;background:#121214;border-radius:24px 24px 0 0;
  border:1px solid var(--line);border-bottom:0;padding:10px 18px calc(env(safe-area-inset-bottom,0px) + 18px);transform:translateY(105%);transition:transform 320ms ${DRAWER};visibility:hidden}
.tsheet.on{transform:none;visibility:visible}
@media (prefers-reduced-motion:reduce){.tsheet,.tscrim{transition:none}}
.tsheet .grab{width:38px;height:5px;border-radius:3px;background:var(--surface-2);margin:0 auto 14px}
.tsheet h3{margin:0 0 4px;font-size:20px;font-weight:800}
.tsheet>p.sub{margin:0 0 14px}
.tsrow{width:100%;display:flex;align-items:center;gap:14px;padding:14px 4px;background:none;border:0;border-top:1px solid var(--line);color:#fff;font:inherit;text-align:left;
  transition:transform 140ms ease-out}
.tsrow:first-of-type{border-top:0}
.tsrow:active{transform:scale(.98)}
.tsrow .tsi{flex:0 0 44px;height:44px;border-radius:14px;background:var(--surface);display:grid;place-items:center;color:var(--accent)}
.tsrow span{flex:1;min-width:0}.tsrow b{display:block;font-size:16px}.tsrow small{display:block;color:var(--dim);font-size:13.5px;margin-top:2px}
.tsrow input{width:24px;height:24px;accent-color:var(--accent);flex:0 0 auto}
.tsclose{width:100%;margin-top:14px}

/* programs view */
#v-programs>.title{margin:22px 0 4px}
#v-programs>.sub{margin:0 0 6px}

/* home sections */
#hmods .hmod{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
.hmod>.hmx,.hmod>.hmh,.hmod>.hml{display:none}
.hebar{position:fixed;left:0;right:0;top:0;z-index:65;display:flex;align-items:center;justify-content:space-between;gap:10px;
  padding:calc(env(safe-area-inset-top,0px) + 10px) 16px 12px;background:linear-gradient(#000 70%,rgba(0,0,0,0));transform:translateY(-110%);transition:transform 260ms ${EASE}}
body.hedit .hebar{transform:none}
.hebar small{color:var(--dim);font-size:12.5px;line-height:1.35;text-align:center;flex:1}
.hebar button{min-height:44px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:#fff;font:inherit;font-weight:700;padding:0 16px;display:inline-flex;align-items:center;gap:8px;
  transition:transform 140ms ease-out}
.hebar button:active{transform:scale(.96)}
.hebar #heDone{width:44px;padding:0;justify-content:center;background:var(--accent);border-color:var(--accent);color:#000}
.hebar .cnt{min-width:20px;height:20px;border-radius:10px;background:var(--accent);color:#000;font-size:12px;display:grid;place-items:center;padding:0 6px}
.hebar .cnt:empty{display:none}
body.hedit #v-home>.brand{visibility:hidden}
body.hedit #hmods{padding-top:26px}
body.hedit #hmods .hmod{position:relative;margin:0 0 16px;padding:44px 14px 12px;border-radius:22px;background:var(--surface);border:1px solid var(--line);transform-origin:50% 50%}
body.hedit #hmods .hmod:not(.drag){animation:hjig 280ms ease-in-out infinite alternate}
body.hedit #hmods .hmod:nth-child(even):not(.drag){animation-delay:-140ms;animation-duration:300ms}
@keyframes hjig{from{transform:rotate(-.55deg)}to{transform:rotate(.55deg)}}
@media (prefers-reduced-motion:reduce){body.hedit #hmods .hmod{animation:none!important;border-style:dashed}}
body.hedit .hmod>.hmb{max-height:150px;overflow:hidden;pointer-events:none;-webkit-mask-image:linear-gradient(#000 45%,transparent);mask-image:linear-gradient(#000 45%,transparent)}
body.hedit .hmod>.hmb *{margin-top:0}
body.hedit .hmod>.hml{display:block;position:absolute;left:50px;right:56px;top:13px;font-size:14px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
body.hedit .hmod>.hmx{display:grid;place-items:center;position:absolute;left:-8px;top:-8px;width:34px;height:34px;border-radius:50%;border:2px solid #000;background:#3a3a3e;color:#fff;padding:0;z-index:2}
body.hedit .hmod>.hmh{display:grid;place-items:center;position:absolute;right:4px;top:2px;width:44px;height:40px;border:0;background:none;color:var(--dim);touch-action:none;cursor:grab;padding:0}
body.hedit .hmod.drag{z-index:5;box-shadow:0 18px 40px rgba(0,0,0,.6);border-color:#4a4a4f}
body.hedit .hmod.drag>.hmh{cursor:grabbing;color:#fff}
.hmx:active{transform:scale(.92)}

/* news */
#homeNews .hsech .hmore,.nwmore{background:none;border:0;color:var(--dim);font:inherit;font-size:15px;font-weight:600;padding:8px 0 8px 12px;min-height:44px}
@media (hover:hover) and (pointer:fine){#homeNews .hmore:hover{color:#fff}}
.nwlist{border-top:1px solid var(--line)}
.nwrow{width:100%;display:flex;align-items:flex-start;gap:12px;padding:14px 0;background:none;border:0;border-bottom:1px solid var(--line);color:#fff;font:inherit;text-align:left;
  transition:transform 140ms ease-out}
.nwrow:active{transform:scale(.985)}
.nwrow>span:not(.chev){flex:1;min-width:0}
.nwrow em{display:flex;align-items:center;gap:7px;font-style:normal;font-size:12px;color:var(--dim);margin-bottom:3px}
.nwrow em i{width:7px;height:7px;border-radius:50%;background:var(--accent)}
.nwrow b{display:block;font-size:16px;line-height:1.3}
.nwrow small{display:block;color:var(--dim);font-size:14px;line-height:1.45;margin-top:3px}
.nwrow .chev{color:var(--dim-2);font-size:20px;align-self:center}
#v-news>.title{margin:14px 0 18px}`;
document.head.appendChild(st);

/* ---------- views: programs and news ---------- */
const home=$('v-home');
const pv=document.createElement('section');pv.id='v-programs';pv.className='wrap hide';
pv.innerHTML='<h2 class="title">Programs</h2><p class="sub">Every program in the app, by creator. Set one as current and its next session shows on Home.</p>';
const nv=document.createElement('section');nv.id='v-news';nv.className='wrap hide';
nv.innerHTML='<button class="back" id="nwBack">‹ Home</button><h2 class="title">News</h2><div class="nwlist" id="nwAllList"></div>';
home.after(pv,nv);
/* move the program list and the reference rows off Home */
const grps=[...home.querySelectorAll(':scope>p.grp')],gProg=grps.find(p=>/programs/i.test(p.textContent)),gRef=grps.find(p=>/reference/i.test(p.textContent));
if(gProg)gProg.remove();
pv.append($('progList'));
if(gRef){pv.append(gRef);['toOther23','toMobility'].forEach(id=>$(id)&&pv.append($(id)));}
if($('toLibrary'))$('toLibrary').hidden=true;
/* rules written for Home's lists apply to the Programs view too */
{const add=[];const walk=rules=>{for(const r of rules){if(r.cssRules&&!r.selectorText){walk(r.cssRules);continue;}
    if(r.selectorText&&r.selectorText.includes('#v-home'))add.push(r.cssText.replace(/#v-home/g,'#v-programs'));}};
  for(const sh of document.styleSheets){try{walk(sh.cssRules);}catch(e){}}
  const s2=document.createElement('style');s2.textContent=add.join('\n');document.head.appendChild(s2);}

/* ---------- the bar ---------- */
const TABS=[['home','Home'],['programs','Programs'],['library','Library'],['profile','Profile']];
const TAB_OF={home:'home',news:'home',programs:'programs',library:'library',profile:'profile',tlog:'profile',calc:'profile'};
const bar=document.createElement('nav');bar.className='tabbar';bar.setAttribute('aria-label','Main');
bar.innerHTML=`<div class="tabin"><div class="tbp">${TABS.map(([k,l])=>`<button data-tab="${k}">${IC[k]}<span>${l}</span></button>`).join('')}</div>
  <button class="tbplus" id="tbPlus" aria-label="Start something new">${IC.plus}</button></div>`;
document.body.append(bar);
let cur='home';
const OPEN={
  home:()=>{show('home');renderHome();},
  programs:()=>{show('programs');renderHome();},
  library:()=>{show('library');renderLibrary();},
  news:()=>{show('news');renderNewsAll();}};
window.BLOCK_VIEWS=Object.assign(window.BLOCK_VIEWS||{},OPEN);
/* one place to go anywhere: a tab, a view, 'gen', 'run' or 'p:<program id>' */
window.blockGo=t=>{if(!t)return;const V=window.BLOCK_VIEWS;
  if(t.startsWith('p:')){const P=progById(t.slice(2));if(!P)return;S.prog=P.id;try{progTab='sessions';}catch(e){}save();show('program');renderProgram();return;}
  if(t==='gen'){window.blockGen&&blockGen();return;}
  if(t==='run'){window.blockGenFrom&&blockGenFrom({focus:'run'},'Run');return;}
  if(V[t])V[t]();};
bar.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{const t=b.dataset.tab;
  if(TAB_OF[cur]===t&&cur===t){window.scrollTo({top:0,behavior:RM()?'auto':'smooth'});return;}blockGo(t);});
function syncTab(v){cur=v;const tab=TAB_OF[v];document.body.classList.toggle('tabbed',!!tab);
  bar.querySelectorAll('[data-tab]').forEach(b=>{if(b.dataset.tab===tab)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});}
/* a program opened from the Programs tab goes back there */
let progFrom='home';
$('pBack').onclick=()=>{if(progFrom==='programs')blockGo('programs');else{show('home');renderHome();}};
const _sh=show;
show=function(v){if(v==='program'&&cur!=='program'&&cur!=='session'&&cur!=='play'){progFrom=cur==='programs'?'programs':'home';$('pBack').textContent=progFrom==='programs'?'‹ Programs':'‹ Home';}
  _sh(v);
  pv.classList.toggle('hide',v!=='programs');nv.classList.toggle('hide',v!=='news');
  syncTab(v);closeSheet();if(v!=='home'&&EDIT)exitEdit();};
$('nwBack').onclick=()=>blockGo('home');

/* ---------- sheet ---------- */
const scrim=document.createElement('div');scrim.className='tscrim';
const sheet=document.createElement('div');sheet.className='tsheet';sheet.setAttribute('role','dialog');sheet.setAttribute('aria-modal','true');
document.body.append(scrim,sheet);
let sheetBack=null,sheetRaf=0;
function openSheet(html,wire){sheet.innerHTML=`<div class="grab"></div>${html}<button class="btn-s tsclose" data-close>Close</button>`;
  sheetBack=document.activeElement;wire&&wire(sheet);sheet.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeSheet);
  cancelAnimationFrame(sheetRaf);sheetRaf=requestAnimationFrame(()=>{scrim.classList.add('on');sheet.classList.add('on');const f=sheet.querySelector('button,input');f&&f.focus({preventScroll:true});});}
function closeSheet(){cancelAnimationFrame(sheetRaf);if(!sheet.classList.contains('on'))return;scrim.classList.remove('on');sheet.classList.remove('on');if(sheetBack&&sheetBack.focus)sheetBack.focus({preventScroll:true});}
scrim.onclick=closeSheet;
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(sheet.classList.contains('on'))closeSheet();else if(EDIT)exitEdit();});
window.blockSheet={open:openSheet,close:closeSheet};

/* + : start something */
const NEW=[['gen','Generate a session','Pick time, focus and equipment, get a session'],['build','Build it yourself','Choose exercises from the library'],
  ['run','Run or sprints','An easy run, tempo, intervals or a sprint session'],['past','Log a past session','Add training you did without the app']];
$('tbPlus').onclick=()=>openSheet(`<h3>New</h3><p class="sub">Start a session now, or log one you already did.</p>
  ${NEW.map(([k,b,s])=>`<button class="tsrow" data-n="${k}"><span class="tsi">${IC[k]}</span><span><b>${b}</b><small>${s}</small></span></button>`).join('')}`,
  box=>box.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{closeSheet();const k=b.dataset.n;
    if(k==='gen')blockGo('gen');else if(k==='run')blockGo('run');else if(k==='build')buildOpen(null);
    else{blockGo('home');CAL.day=ymd(Date.now());CAL.form=true;renderHome();const w=home.querySelector('.hmod[data-mod="cal"]');
      if(w){w.hidden=false;setTimeout(()=>w.scrollIntoView({block:'start',behavior:RM()?'auto':'smooth'}),60);}}}));

/* ---------- news ---------- */
const NEWS=[
  {d:'2026-11-25',t:'A new home',x:'Tabs at the bottom, news here, and a start page you arrange yourself. Press and hold a section to move it or take it away.',go:'edit'},
  {d:'2026-11-25',t:'Calculators',x:'1RM, plates, RPE, warm-up for a max, meet attempts, IPF GL and Wilks, Sinclair, calories, protein and body fat. Under Profile.',go:'calc'},
  {d:'2026-11-25',t:'Training log',x:'Every session you have done in one list, and a written summary of any period. Under Profile.',go:'tlog'},
  {d:'2026-11-25',t:'Warm-ups and running',x:'Jump rope, rope flow or animal moves as the warm-up, and Run or Sprints as a session of their own.',go:'run'},
  {d:'2026-11-24',t:'The Stone Circle',x:'Sandbag Foundation in two phases, and power-endurance intervals.',go:'p:sc_found1'},
  {d:'2026-11-24',t:'Running, jump rope, mace and rope flow',x:'Walk, run and sprint weeks, Steel Mace foundations, rope flow basics and a SuperFunctional week.',go:'p:rope_basics'},
  {d:'2026-11-24',t:'Smoother motion',x:'Things open and close with the same short animation all through the app.'}];
const SEEN='block-news-seen';
const seen=()=>{try{return localStorage.getItem(SEEN)||'';}catch(e){return'';}};
const fmtD=d=>new Date(d+'T12:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'});
const nrow=(n,i,s)=>`<button class="nwrow" data-i="${i}"><span><em>${n.d>s?'<i aria-label="New"></i>':''}${fmtD(n.d)}</em><b>${esc(n.t)}</b><small>${esc(n.x)}</small></span>${n.go?'<span class="chev">›</span>':''}</button>`;
function wireNews(box){box.querySelectorAll('.nwrow').forEach(b=>b.onclick=()=>{const n=NEWS[+b.dataset.i];if(!n.go)return;
  if(n.go==='edit'){blockGo('home');const m=home.querySelector('.hmod:not([hidden])');if(m)enterEdit(m);return;}blockGo(n.go);});}
const newsBox=document.createElement('div');newsBox.id='homeNews';
function renderNews(){const s=seen();
  newsBox.innerHTML=`<div class="hsech"><span class="hsec">News</span><button class="hmore" id="nwMore">View all</button></div>
    <div class="nwlist">${NEWS.slice(0,3).map((n,i)=>nrow(n,i,s)).join('')}</div>`;
  newsBox.querySelector('#nwMore').onclick=()=>blockGo('news');wireNews(newsBox);}
function renderNewsAll(){const box=$('nwAllList'),s=seen();box.innerHTML=NEWS.map((n,i)=>nrow(n,i,s)).join('');wireNews(box);
  try{localStorage.setItem(SEEN,NEWS[0].d);}catch(e){}}

/* ---------- home sections ---------- */
const MODS=[['next','Next session','Your next session and a quick start',()=>$('homeNext')],
  ['cal','This week','The week at a glance and logging past sessions',()=>$('homeCal')],
  ['stats','Overview','Sessions, sets and training time, with charts',()=>$('homeOv')],
  ['news','News','New features and programs',()=>newsBox],
  ['review','Weekly review','Your last 7 days, with a written review',()=>$('aiWeek')],
  ['health','Apple Health','Weight and steps from a Shortcut',()=>$('homeHealth')]];
const MOD=Object.fromEntries(MODS.map(m=>[m[0],m]));
function cfg(){const H=S.home=S.home||{};H.order=(H.order||[]).filter(k=>MOD[k]);H.off=(H.off||[]).filter(k=>MOD[k]);
  MODS.forEach(([k])=>{if(!H.order.includes(k))H.order.push(k);});return H;}
const box=document.createElement('div');box.id='hmods';
home.querySelector('.brand').after(box);
const ebar=document.createElement('div');ebar.className='hebar';
ebar.innerHTML=`<button id="heEdit" aria-label="Edit sections">Edit<span class="cnt" id="heCnt"></span></button><small>Drag the dots to move<br>Tap − to remove</small><button id="heDone" aria-label="Done">${IC.check}</button>`;
document.body.append(ebar);
function wrapper(k){let w=box.querySelector(`.hmod[data-mod="${k}"]`);if(w)return w;
  w=document.createElement('div');w.className='hmod';w.dataset.mod=k;
  w.innerHTML=`<button class="hmx" aria-label="Remove ${MOD[k][1]}">${IC.minus}</button><span class="hml">${MOD[k][1]}</span>
    <button class="hmh" aria-label="Move ${MOD[k][1]}">${IC.grip}</button><div class="hmb"></div>`;
  w.querySelector('.hmx').onclick=()=>removeMod(w);w.querySelector('.hmh').onpointerdown=e=>startDrag(e,w);
  return w;}
function layout(){const H=cfg();
  H.order.forEach(k=>{const el=MOD[k][3]();if(!el)return;const w=wrapper(k),b=w.querySelector('.hmb');
    if(el.parentElement!==b)b.append(el);w.hidden=H.off.includes(k);box.append(w);});
  $('heCnt').textContent=H.off.filter(k=>MOD[k][3]()).length||'';}
const _rh=renderHome;
renderHome=function(){_rh.apply(this,arguments);renderNews();layout();};

/* ---------- edit mode ---------- */
let EDIT=false,lp=null,D=null;
function enterEdit(m){if(EDIT)return;const y0=m?m.getBoundingClientRect().top:0;
  EDIT=true;document.body.classList.add('hedit');layout();
  if(m){const y1=m.getBoundingClientRect().top;window.scrollBy(0,y1-y0);}
  try{navigator.vibrate&&navigator.vibrate(12);}catch(e){}}
function exitEdit(){if(!EDIT)return;EDIT=false;document.body.classList.remove('hedit');save();layout();}
box.addEventListener('pointerdown',e=>{if(EDIT||e.button>0)return;const m=e.target.closest('.hmod');if(!m)return;
  lp={x:e.clientX,y:e.clientY,m,fired:false};lp.t=setTimeout(()=>{if(lp){lp.fired=true;enterEdit(lp.m);}},520);});
const cancelLp=()=>{if(lp&&!lp.fired){clearTimeout(lp.t);lp=null;}};
addEventListener('pointermove',e=>{if(lp&&!lp.fired&&Math.hypot(e.clientX-lp.x,e.clientY-lp.y)>10)cancelLp();},{passive:true});
addEventListener('pointerup',()=>{if(lp&&lp.fired)setTimeout(()=>{lp=null;},0);else cancelLp();});
addEventListener('pointercancel',()=>{if(lp&&lp.fired)lp=null;else cancelLp();});
addEventListener('scroll',cancelLp,{passive:true});
box.addEventListener('click',e=>{if(lp&&lp.fired){e.preventDefault();e.stopPropagation();lp=null;}},true);
box.addEventListener('contextmenu',e=>{if(EDIT||lp)e.preventDefault();});
$('heDone').onclick=exitEdit;
function removeMod(w){const k=w.dataset.mod,H=cfg();if(!H.off.includes(k))H.off.push(k);
  const done=()=>{w.getAnimations().forEach(a=>a.cancel());w.style.overflow='';w.style.boxSizing='';w.hidden=true;save();layout();};
  if(window.blockCollapse)blockCollapse([w],done);else done();}
$('heEdit').onclick=()=>{const H=cfg();
  openSheet(`<h3>Home sections</h3><p class="sub">Tick what you want on Home. Drag the handle on a section to move it.</p>
    ${MODS.filter(m=>m[3]()).map(([k,n,s])=>`<label class="tsrow"><span><b>${n}</b><small>${s}</small></span><input type="checkbox" data-k="${k}"${H.off.includes(k)?'':' checked'}></label>`).join('')}`,
    sh=>sh.querySelectorAll('input[data-k]').forEach(c=>c.onchange=()=>{const k=c.dataset.k;
      H.off=H.off.filter(x=>x!==k);if(!c.checked)H.off.push(k);save();
      const w=box.querySelector(`.hmod[data-mod="${k}"]`),was=w&&w.hidden;layout();
      if(w&&was&&!w.hidden&&window.blockReveal){blockReveal(w);}}));};

/* drag to reorder: the section follows the finger, its neighbours slide out of the way */
function flip(fn,els){const before=els.map(el=>el.getBoundingClientRect().top);fn();
  if(RM())return;els.forEach((el,i)=>{const dy=before[i]-el.getBoundingClientRect().top;if(dy)el.animate([{transform:`translateY(${dy}px)`},{transform:'none'}],{duration:220,easing:EASE});});}
const vis=w=>w&&!w.hidden;
function sib(w,dir){let n=dir<0?w.previousElementSibling:w.nextElementSibling;while(n&&!vis(n))n=dir<0?n.previousElementSibling:n.nextElementSibling;return n;}
function startDrag(e,w){if(!EDIT)return;e.preventDefault();e.stopPropagation();const h=e.currentTarget;try{h.setPointerCapture(e.pointerId);}catch(x){}
  const r=w.getBoundingClientRect();D={w,off:e.clientY-r.top,y:e.clientY,tr:0};w.classList.add('drag');
  h.onpointermove=ev=>{if(!D)return;D.y=ev.clientY;move();};
  h.onpointerup=h.onpointercancel=()=>endDrag(h);
  const loop=()=>{if(!D)return;const v=D.y<110?-10:D.y>innerHeight-130?10:0;if(v){window.scrollBy(0,v);move();}D.raf=requestAnimationFrame(loop);};D.raf=requestAnimationFrame(loop);
  move();}
function move(){const w=D.w,top=D.y-D.off,h=w.offsetHeight,p=sib(w,-1),n=sib(w,1);
  if(p){const pr=p.getBoundingClientRect();if(top<pr.top+pr.height/2)flip(()=>box.insertBefore(w,p),[p]);}
  if(n){const nr=n.getBoundingClientRect();if(top+h>nr.top+nr.height/2)flip(()=>n.after(w),[n]);}
  const nat=w.getBoundingClientRect().top-D.tr;D.tr=top-nat;w.style.transform=`translateY(${D.tr}px) scale(1.02)`;}
function endDrag(h){if(!D)return;cancelAnimationFrame(D.raf);const w=D.w,tr=D.tr;h.onpointermove=h.onpointerup=h.onpointercancel=null;D=null;
  w.style.transform='';w.classList.remove('drag');
  if(!RM())w.animate([{transform:`translateY(${tr}px) scale(1.02)`},{transform:'none'}],{duration:220,easing:EASE});
  const H=cfg();H.order=[...box.querySelectorAll('.hmod')].map(x=>x.dataset.mod);save();}

/* first paint */
renderHome();
syncTab(((document.querySelector('body>[id^="v-"]:not(.hide)')||{id:'v-home'}).id).slice(2));
})();
