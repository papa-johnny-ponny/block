/* BLOCK. visual clean-up: Settings as clear sections with fewer heavy buttons. */
(function(){
const css=`
#v-settings{padding-bottom:calc(env(safe-area-inset-bottom,0px) + 120px)}
#v-settings p.grp.grp,#v-settings .grp.grp{display:block;margin:64px 0 8px;padding-top:36px;border-top:1px solid var(--line);font-size:20px;font-weight:800;color:#fff;letter-spacing:-.005em;text-transform:none}
#v-settings .grp+.sub{margin-bottom:14px}
#v-settings #syncBox .grp.grp{margin-top:8px;padding-top:0;border-top:0}
/* fields read as boxes to fill in: darker, outlined, squarer; buttons stay filled pills */
#v-settings input:not([type=checkbox]):not([type=radio]):not([type=range]),#v-settings select,#v-settings textarea{background:#0b0b0d;border:1px solid #3a3a3f;border-radius:12px;min-height:50px;
  color:#fff;transition:border-color 160ms ease}
#v-settings input::placeholder,#v-settings textarea::placeholder{color:var(--dim-2)}
#v-settings input:focus,#v-settings select:focus,#v-settings textarea:focus{border-color:#fff;outline:none}
#v-settings #syPass{margin-top:10px!important}
#v-settings #syIn{background:#fff;color:#000;font-weight:700;min-height:50px;margin-top:16px!important;transition:transform 140ms ease-out}
#v-settings #syIn:active{transform:scale(.98)}
#v-settings #syncBox .grp{margin-top:8px;padding-top:0;border-top:0}
#v-settings .sub{font-size:14px;line-height:1.5;color:var(--dim)}
#v-settings .srow{padding:14px 0}
#v-settings .acts{gap:10px}
/* secondary actions read as quiet text buttons */
#syOut,#cCopy,#cOff,#resetAll{background:none!important;border:0!important;box-shadow:none!important;color:var(--dim)!important;font-weight:600;
  padding:10px 4px!important;min-height:44px;flex:0 0 auto!important;width:auto!important;text-decoration:none}
#cOff,#resetAll{color:#ff8a80!important}
#resetAll{display:block;margin:48px auto 0!important}
#v-settings .acts:has(#syOut),#v-settings .acts:has(#cCopy){align-items:center}
/* two-way choices as one segmented control */
#v-settings .acts:has([data-m]){display:flex;gap:0;padding:4px;border-radius:14px;background:var(--surface-2);border:1px solid var(--line)}
#v-settings .acts:has([data-m]) [data-m]{flex:1;background:none;border:0;color:var(--dim);border-radius:10px;min-height:42px}
#v-settings .acts:has([data-m]) [data-m].on{background:#fff;color:#000}
`;
const css2=`
/* session cards: one accent per card, quiet labels, clear reading order */
.sitem .slist .e:empty{display:none}
.sitem .slist .e.now{align-self:flex-start;padding:3px 9px;border-radius:999px;background:rgba(207,230,78,.14);color:var(--accent);font-size:12px;font-weight:700}
.sitem .slist .r,.sitem .slist .r.on{color:var(--dim);font-weight:600}
.sitem.open .sdet .chev{transform:none}
.sdet .xr .chev{font-size:20px;color:var(--dim-2)}
.xm b{font-size:17px;line-height:1.3}
.xl{margin-top:4px;font-size:14px;color:var(--dim)}
.xl .xrx{color:#d6d6d9;font-variant-numeric:tabular-nums}
.xm small{color:var(--dim-2);font-size:13px;margin-top:3px}
.adc,.sdet .adc{background:none;border-radius:0;border-top:1px solid var(--line);padding:12px 0 0;margin:14px 0 2px}
.adc h4{margin:0 0 2px;font-size:13px;color:var(--dim);font-weight:600}
.adc .xr{gap:12px;padding:7px 0}
.adc .xr+.xr{border-top:0}
.adc .th{border-radius:9px;opacity:.85}
.adc .xm b{font-size:15px;font-weight:600;line-height:1.3;color:#d6d6d9}
.adc .xl{margin-top:1px;font-size:13px}
.adc .xl .xrx{color:var(--dim)}
.adb{width:36px;height:36px;padding:0;border-radius:50%;display:grid;place-items:center;background:none;border:1px solid var(--line);color:var(--dim)}
.adb.on{background:var(--surface-2);border-color:transparent;color:var(--accent)}
@media (hover:hover) and (pointer:fine){.adb:hover{border-color:#fff;color:#fff}}
.adb:active,.xr:active{transform:scale(.98)}
.adb,.xr{transition:transform 140ms ease-out}`;
const st=document.createElement('style');st.textContent=css+css2+`
.sltools{margin:6px 0 14px!important}
#sessionList .sltools+.grp{margin-top:6px}
.gmore.closing>summary::after{transform:none}`;document.head.appendChild(st);

/* ---------- opening things: short, ease-out, interruptible; nothing for reduced motion ---------- */
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE='cubic-bezier(.23,1,.32,1)';
function grow(el,h0,h1,dur=280){if(RM()||!el||!h0||h0===h1)return;
  const bs=el.style.boxSizing,ov=el.style.overflow;el.style.boxSizing='border-box';el.style.overflow='hidden';
  const a=el.animate([{height:h0+'px'},{height:h1+'px'}],{duration:dur,easing:EASE});
  const done=()=>{el.style.boxSizing=bs;el.style.overflow=ov;};a.onfinish=done;a.oncancel=done;return a;}
function fadeIn(el,dy=6,dur=240){if(RM()||!el)return;
  el.animate([{opacity:0,transform:`translateY(${dy}px)`},{opacity:1,transform:'none'}],{duration:dur,easing:EASE});}
/* reveal a block that just appeared: height from 0 plus a fade */
window.blockReveal=el=>{if(RM()||!el)return;const h=el.offsetHeight;if(!h)return;
  const ov=el.style.overflow;el.style.overflow='hidden';
  const a=el.animate([{height:'0px',opacity:0},{height:h+'px',opacity:1}],{duration:280,easing:EASE});
  const done=()=>{el.style.overflow=ov;};a.onfinish=done;a.oncancel=done;};
window.blockFade=el=>fadeIn(el,6,220);
/* a session card opening or closing grows or shrinks to its new height. Opening fades the details in;
   closing keeps them on screen while they fade and the card shrinks, then hides them. A tap mid-way reverses from where it is */
if(typeof slSet==='function'){const _sl=slSet;
  slSet=function(P,d,w,open){const was=w.classList.contains('open'),h0=w.isConnected?w.offsetHeight:0;
    (w._sla||[]).forEach(a=>a.cancel());w._sla=null;
    _sl.apply(this,arguments);if(!h0||was===open||RM())return;
    const panel=w.querySelector('.sdet'),h1=w.offsetHeight;
    if(open){grow(w,h0,h1,300);fadeIn(panel,-4,280);return;}
    if(!panel)return grow(w,h0,h1,220);
    panel.hidden=false;
    const a=grow(w,h0,h1,220),f=panel.animate([{opacity:1},{opacity:0}],{duration:200,easing:'ease-in-out',fill:'forwards'});
    w._sla=[a,f].filter(Boolean);
    const end=()=>{if(!w.classList.contains('open'))panel.hidden=true;f.cancel();w._sla=null;};
    a?a.addEventListener('finish',end):end();};}
/* closing a block that is about to be removed: height, margins and opacity to zero, then done() */
window.blockCollapse=(els,done,dur=220)=>{els=(els||[]).filter(e=>e&&e.offsetHeight);if(RM()||!els.length){done();return;}
  let n=els.length;els.forEach(el=>{const cs=getComputedStyle(el);el.style.overflow='hidden';el.style.boxSizing='border-box';
    el.animate([{height:el.offsetHeight+'px',opacity:1,marginTop:cs.marginTop,marginBottom:cs.marginBottom},
      {height:'0px',opacity:0,marginTop:'0px',marginBottom:'0px'}],{duration:dur,easing:EASE,fill:'forwards'}).onfinish=()=>{if(--n===0)done();};});};
/* "More options" and other folds built on <details>: open and close with the same height animation */
document.addEventListener('click',e=>{const s=e.target.closest&&e.target.closest('details.gmore>summary');if(!s||RM())return;
  const d=s.parentElement,h0=d.offsetHeight,closing=d.open&&!d._closing;e.preventDefault();
  if(d._a){d._a.cancel();d._a=null;}d._closing=false;d.classList.remove('closing');
  if(!closing){d.open=true;d._a=grow(d,h0,d.offsetHeight,280);return;}
  d.open=false;const h1=d.offsetHeight;d.open=true;d._closing=true;d.classList.add('closing');
  const a=d._a=grow(d,h0,h1,220),end=()=>{d._closing=false;d.classList.remove('closing');d.open=false;d._a=null;};
  a?a.addEventListener('finish',end):end();});
/* switching screens: the new one fades up a few pixels. Views with fixed parts (workout, player) only fade,
   since a transform would move their fixed bars during the animation */
/* going deeper fades up from below; going back (closing a session, an exercise page…) mirrors it and settles down from above */
{let last=null;const _sh=show,DEPTH={home:0,session:2,play:3,log:3},dep=v=>v in DEPTH?DEPTH[v]:1;
  show=function(v){const same=v===last,back=last&&dep(v)<dep(last);_sh(v);last=v;if(same||RM())return;const el=document.getElementById('v-'+v);if(!el)return;
    if(v==='log'||v==='play')el.animate([{opacity:0},{opacity:1}],{duration:180,easing:'ease-out'});else fadeIn(el,back?-8:8,back?220:240);};}

})();
