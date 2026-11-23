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
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
})();
