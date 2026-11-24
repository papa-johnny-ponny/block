/* BLOCK. visual clean-up: Settings as clear sections with fewer heavy buttons. */
(function(){
const css=`
#v-settings{padding-bottom:calc(env(safe-area-inset-bottom,0px) + 120px)}
#v-settings .grp{display:block;margin:40px 0 6px;padding-top:28px;border-top:1px solid var(--line);font-size:18px;font-weight:700;color:#fff;letter-spacing:0;text-transform:none}
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
#sessionList .sltools+.grp{margin-top:6px}`;document.head.appendChild(st);

/* ---------- opening things: short, ease-out, interruptible; nothing for reduced motion ---------- */
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE='cubic-bezier(.23,1,.32,1)';
function grow(el,h0,h1,dur=280){if(RM()||!el||!h0||h0===h1)return;
  const bs=el.style.boxSizing,ov=el.style.overflow;el.style.boxSizing='border-box';el.style.overflow='hidden';
  const a=el.animate([{height:h0+'px'},{height:h1+'px'}],{duration:dur,easing:EASE});
  const done=()=>{el.style.boxSizing=bs;el.style.overflow=ov;};a.onfinish=done;a.oncancel=done;}
function fadeIn(el,dy=6,dur=240){if(RM()||!el)return;
  el.animate([{opacity:0,transform:`translateY(${dy}px)`},{opacity:1,transform:'none'}],{duration:dur,easing:EASE});}
/* reveal a block that just appeared: height from 0 plus a fade */
window.blockReveal=el=>{if(RM()||!el)return;const h=el.offsetHeight;if(!h)return;
  const ov=el.style.overflow;el.style.overflow='hidden';
  const a=el.animate([{height:'0px',opacity:0},{height:h+'px',opacity:1}],{duration:280,easing:EASE});
  const done=()=>{el.style.overflow=ov;};a.onfinish=done;a.oncancel=done;};
window.blockFade=el=>fadeIn(el,6,220);
/* a session card opening or closing grows to its new height; its details fade in */
if(typeof slSet==='function'){const _sl=slSet;
  slSet=function(P,d,w,open){const was=w.classList.contains('open'),h0=w.isConnected?w.offsetHeight:0;
    _sl.apply(this,arguments);if(!h0||was===open)return;
    grow(w,h0,w.offsetHeight,open?300:220);if(open)fadeIn(w.querySelector('.sdet'),-4,280);};}
/* switching screens: the new one fades up a few pixels. Views with fixed parts (workout, player) only fade,
   since a transform would move their fixed bars during the animation */
{let last=null;const _sh=show;
  show=function(v){const same=v===last;_sh(v);last=v;if(same||RM())return;const el=document.getElementById('v-'+v);if(!el)return;
    if(v==='log'||v==='play')el.animate([{opacity:0},{opacity:1}],{duration:180,easing:'ease-out'});else fadeIn(el,8,240);};}

})();
