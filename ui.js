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
.adc h4{font-size:13px;color:var(--dim);font-weight:600}
.adb.on{background:var(--surface-2);border-color:transparent;color:var(--dim)}
@media (hover:hover) and (pointer:fine){.adb:hover{border-color:#fff}}
.adb:active,.xr:active{transform:scale(.98)}
.adb,.xr{transition:transform 140ms ease-out}`;
const st=document.createElement('style');st.textContent=css+css2;document.head.appendChild(st);
})();
