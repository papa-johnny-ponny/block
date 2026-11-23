/* BLOCK. saved clips: exercises from Instagram (or any video link) with a name,
   category, pattern and plane. They live in S.clips, show up in the Library,
   as their own "Saved clips" group under Swap, and the video plays embedded
   on the exercise page.
   Ways in: Library → "Add clip" (reads a copied link from the clipboard),
   ?clip=<link> in the app URL (iOS Shortcut), or the Android share sheet
   (manifest share_target sends ?url= / ?text=). */
(function(){
const css=`
.clipdlg>div{max-height:calc(100vh - 40px);overflow:auto}
.clipdlg label{display:block;margin:12px 0 0;color:var(--dim);font-size:13px;font-weight:600}
.clipdlg input,.clipdlg select{display:block;width:100%;box-sizing:border-box;margin-top:6px;padding:12px 14px;border-radius:12px;background:var(--surface-2);color:#fff;border:1px solid var(--line);font:inherit;font-size:16px}
.clipdlg .row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.clipdlg .err{color:#ff8a80;font-size:13px;margin:8px 0 0;min-height:1px}
.cliphead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:24px 0 8px}
.cliphead .grp{margin:0}
.clipadd{padding:8px 14px;border-radius:999px;background:var(--accent);color:#000;font-size:14px;font-weight:700}
.cliphint{color:var(--dim-2);font-size:13px;margin:0 0 6px;line-height:1.45}
.exvid.ig{aspect-ratio:auto;height:min(620px,calc(100vh - 220px))}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

const PLANES=['Sagittal','Frontal','Transverse'];
const pats=()=>window.BLOCK_PATTERNS||['Squat','Lunge','Hinge','Horizontal push','Vertical push','Horizontal pull','Vertical pull','Carry','Rotation','Arms'];
const catName=c=>{const l=(CAT[c]||[c])[0].toLowerCase();return l[0].toUpperCase()+l.slice(1);};
const isIG=u=>/instagram\.com\/(p|reel|reels|tv)\//i.test(u||'');
const igEmbed=u=>{const m=String(u).match(/instagram\.com\/(?:p|reels?|tv)\/([\w-]+)/i);return m?`https://www.instagram.com/${/\/reels?\//i.test(u)?'reel':'p'}/${m[1]}/embed/`:null;};
const linkIn=t=>{const m=String(t||'').match(/https?:\/\/\S+/);return m?m[0].replace(/[)\].,]+$/,''):'';};

function merge(){S.clips=S.clips||{};Object.keys(S.clips).forEach(k=>{EX[k]=S.clips[k];});}
merge();

/* ----- add / edit dialog ----- */
function clipDialog(url,id,after){
  merge();const c=id?S.clips[id]:{n:'',c:'bodyweight',pat:'',pl:'Sagittal',v:url||''};
  const d=document.createElement('div');d.className='lgdlg clipdlg';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-labelledby','clipT');
  d.innerHTML=`<div><h3 id="clipT">${id?'Edit clip':'Save clip'}</h3><p>Name it and say what kind of exercise it is, so it shows up in the right place.</p>
    <label>Link<input id="clipU" inputmode="url" autocomplete="off" placeholder="https://www.instagram.com/reel/…" value="${esc(c.v||'')}"></label>
    <label>Name<input id="clipN" autocomplete="off" placeholder="e.g. Copenhagen plank" value="${esc(c.n||'')}"></label>
    <label>Category<select id="clipC">${Object.keys(CAT).map(k=>`<option value="${k}" ${k===c.c?'selected':''}>${catName(k)}</option>`).join('')}</select></label>
    <div class="row"><label>Pattern<select id="clipP"><option value="">Not set</option>${pats().map(p=>`<option ${p===c.pat?'selected':''}>${p}</option>`).join('')}</select></label>
    <label>Plane<select id="clipL">${PLANES.map(p=>`<option ${p===c.pl?'selected':''}>${p}</option>`).join('')}</select></label></div>
    <p class="err" id="clipE" role="alert"></p>
    <button class="go" data-d="save">Save clip</button>${id?'<button data-d="del">Remove clip</button>':''}<button data-d="x">Cancel</button></div>`;
  document.body.append(d);
  const q=x=>d.querySelector('#'+x);setTimeout(()=>(q('clipU').value?q('clipN'):q('clipU')).focus(),50);
  d.onclick=ev=>{const a=ev.target.dataset&&ev.target.dataset.d;if(!a&&ev.target!==d)return;
    if(a==='save'){const v=linkIn(q('clipU').value),n=q('clipN').value.trim();
      if(!v){q('clipE').textContent='Paste the link to the clip.';return;}
      if(!n){q('clipE').textContent='Give the clip a name.';q('clipN').focus();return;}
      const k=id||('ig_'+uid());
      S.clips[k]={n,c:q('clipC').value,pat:q('clipP').value||null,pl:q('clipL').value,v,src:isIG(v)?'ig':'link',t:(c.t||Date.now())};
      EX[k]=S.clips[k];save();d.remove();after&&after(k);return;}
    if(a==='del'){delete S.clips[id];delete EX[id];save();d.remove();after&&after(null);return;}
    d.remove();};
}
async function addFromClipboard(after){
  let t='';try{t=await navigator.clipboard.readText();}catch(e){}
  clipDialog(linkIn(t),null,after);
}
window.blockClip=clipDialog;

/* ----- library: saved clips first ----- */
const _lib=renderLibrary;
renderLibrary=function(){merge();_lib();
  const box=document.getElementById('libList'),ids=Object.keys(S.clips).sort((a,b)=>S.clips[b].t-S.clips[a].t);
  const w=document.createElement('div');
  w.innerHTML=`<div class="cliphead"><p class="grp">Saved clips</p><button class="clipadd" id="clipAdd">+ Add clip</button></div>
    ${ids.length?'':'<p class="cliphint">In Instagram, tap Share → Copy link, then tap Add clip here. The link is read from your clipboard.</p>'}`;
  ids.forEach(id=>{const c=S.clips[id],b=document.createElement('button');b.className='card';
    b.innerHTML=`<span class="cm"><h3>${esc(c.n)}</h3><p>${[catName(c.c),c.pat,c.pl].filter(Boolean).map(esc).join(' · ')}</p></span><span class="chev">›</span>`;
    b.onclick=()=>window.exOpen?exOpen(exOf({id})):openSheet(exOf({id}),null);w.appendChild(b);});
  box.prepend(w);
  /* category groups below should not list clips a second time */
  box.querySelectorAll(':scope>.card').forEach(b=>{const h=b.querySelector('h3');if(h&&ids.some(id=>S.clips[id].n===h.textContent))b.remove();});
  w.querySelector('#clipAdd').onclick=()=>addFromClipboard(()=>renderLibrary());
};

/* ----- swap: a "Saved clips" group under the same-category list ----- */
const _swap=renderSwap;
renderSwap=function(){merge();_swap();
  const body=document.getElementById('sBody'),acts=body.querySelector('.acts');if(!ctx||!ctx.c)return;
  const {prog,sessKey,idx,item}=ctx.c,k=logKey(prog,sessKey,idx),cur=S.swap[k]||item.id;
  body.querySelectorAll('.swp').forEach(b=>{if(S.clips[b.dataset.id])b.remove();});
  const ids=Object.keys(S.clips).sort((a,b)=>S.clips[a].n.localeCompare(S.clips[b].n));
  const sec=document.createElement('div');sec.className='xsec';
  sec.innerHTML=`<h4>Saved clips</h4>${ids.map(id=>`<button class="hrow swp clipswp" data-id="${id}" style="width:100%"><b>${esc(S.clips[id].n)}</b><span>${id===cur?'current':esc([S.clips[id].pat,S.clips[id].pl].filter(Boolean).join(' · '))}</span></button>`).join('')}
    <button class="hrow" id="clipSwAdd" style="width:100%"><b>+ Add a clip</b><span>from a copied link</span></button>`;
  body.insertBefore(sec,acts);
  sec.querySelectorAll('.clipswp').forEach(b=>b.onclick=()=>{S.swap[k]=b.dataset.id;save();ctx.ex=exFor(item,k);swapMode=false;openSheet(ctx.ex,ctx.c);});
  sec.querySelector('#clipSwAdd').onclick=()=>addFromClipboard(id=>{if(id){S.swap[k]=id;save();ctx.ex=exFor(item,k);swapMode=false;openSheet(ctx.ex,ctx.c);}else renderSheet();});
};

/* ----- exercise page: play Instagram clips inline, edit the clip ----- */
function decorate(){
  const v=document.getElementById('v-ex');if(!v||v.classList.contains('hide'))return;
  const key=v.dataset.key;const c=key&&S.clips&&S.clips[key];
  const tab=v.querySelector('.extabs .on');if(!c||!tab||tab.dataset.t!=='about')return;
  if(v.querySelector('#clipEd'))return;
  const link=v.querySelector('.exlink');const src=igEmbed(c.v);
  const h=(src?`<div class="exvid ig"><iframe src="${src}" title="${esc(c.n)}" allow="encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`:'')
    +`<a class="exlink" href="${esc(c.v)}" target="_blank" rel="noopener">Open ${isIG(c.v)?'on Instagram':'link'}</a>
     <p class="exdesc">${[catName(c.c),c.pat,c.pl].filter(Boolean).map(esc).join(' · ')} · <button class="exlink" id="clipEd" style="margin:0;padding:0;background:none">Edit clip</button></p>`;
  if(link)link.outerHTML=h;else v.querySelector('.extop').insertAdjacentHTML('afterend',h);
  const ed=v.querySelector('#clipEd');if(ed)ed.onclick=()=>clipDialog(c.v,key,k=>{if(k)exOpen(exOf({id:k}));else exClose();});
}
const exv=document.getElementById('v-ex');if(exv)new MutationObserver(decorate).observe(exv,{childList:true});
/* sync can replace S at any time: keep EX in step whenever the view changes */
const _show=show;show=function(v){merge();_show(v);};

/* ----- arriving with a link: ?clip=… (Shortcut) or ?url= / ?text= (share sheet) ----- */
const qs=new URLSearchParams(location.search),inc=qs.get('clip')||qs.get('url')||linkIn(qs.get('text'))||'';
if(inc){history.replaceState(null,'',location.pathname);
  setTimeout(()=>clipDialog(linkIn(inc)||inc,null,()=>{show('library');renderLibrary();}),400);}
})();
