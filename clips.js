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
const css2=`
.clipnote{margin:10px 0 0;padding:10px 12px;border-radius:12px;background:var(--surface-2);color:#e4e4e7;font-size:14px;line-height:1.45}
.clipsetup{display:block;width:100%;margin:2px 0 14px;padding:10px 0;background:none;border:0;color:var(--accent-text);font:inherit;font-size:14px;font-weight:600;text-align:left}
.clipsteps{margin:6px 0 14px;padding-left:20px;color:#d6d6d9;line-height:1.5;font-size:15px}.clipsteps li{margin:0 0 8px}
.clipurl{display:flex;align-items:center;gap:10px;margin:0 0 14px;padding:10px 10px 10px 14px;border-radius:14px;background:var(--surface);border:1px solid var(--line)}
.clipurl code{flex:1;min-width:0;overflow-wrap:anywhere;font-size:13px;color:#fff}
.clipurl .btn-s{flex:0 0 auto}`;
const st=document.createElement('style');st.textContent=css+css2;document.head.appendChild(st);

const PLANES=['Sagittal','Frontal','Transverse'];
const pats=()=>window.BLOCK_PATTERNS||['Squat','Lunge','Hinge','Horizontal push','Vertical push','Horizontal pull','Vertical pull','Carry','Rotation','Arms'];
const catName=c=>{const l=(CAT[c]||[c])[0].toLowerCase();return l[0].toUpperCase()+l.slice(1);};
const isIG=u=>/instagram\.com\/(p|reel|reels|tv)\//i.test(u||'');
const igEmbed=u=>{const m=String(u).match(/instagram\.com\/(?:p|reels?|tv)\/([\w-]+)/i);return m?`https://www.instagram.com/${/\/reels?\//i.test(u)?'reel':'p'}/${m[1]}/embed/`:null;};
const linkIn=t=>{const m=String(t||'').match(/https?:\/\/\S+/);return m?m[0].replace(/[)\].,]+$/,''):'';};

function merge(){S.clips=S.clips||{};Object.keys(S.clips).forEach(k=>{EX[k]=S.clips[k];});}
merge();

/* ----- add / edit dialog ----- */
function clipDialog(url,id,after,opt){opt=opt||{};
  merge();const c=id?S.clips[id]:{n:'',c:'bodyweight',pat:'',pl:'Sagittal',v:url||''};
  const d=document.createElement('div');d.className='lgdlg clipdlg';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-labelledby','clipT');
  d.innerHTML=`<div><h3 id="clipT">${id?'Edit clip':'Save clip'}</h3><p>Name it and say what kind of exercise it is, so it shows up in the right place.</p>${opt.note?`<p class="clipnote">${esc(opt.note)}</p>`:''}
    <label>Link<input id="clipU" inputmode="url" autocomplete="off" placeholder="https://www.instagram.com/reel/…" value="${esc(c.v||'')}"></label>
    <label>Caption or notes <span style="font-weight:400">(optional)</span><textarea id="clipX" rows="2" style="display:block;width:100%;box-sizing:border-box;margin-top:6px;padding:12px 14px;border-radius:12px;background:var(--surface-2);color:#fff;border:1px solid var(--line);font:inherit;font-size:16px" placeholder="Paste the post text, or describe the exercise">${esc(c.cap||'')}</textarea></label>
    <button type="button" class="clipadd" id="clipAI" style="margin-top:10px;background:none;color:#fff;border:1px solid var(--line)">Fill in the rest for me</button>
    <label>Name<input id="clipN" autocomplete="off" placeholder="e.g. Copenhagen plank" value="${esc(c.n||'')}"></label>
    <label>Category<select id="clipC">${Object.keys(CAT).map(k=>`<option value="${k}" ${k===c.c?'selected':''}>${catName(k)}</option>`).join('')}</select></label>
    <div class="row"><label>Pattern<select id="clipP"><option value="">Not set</option>${pats().map(p=>`<option ${p===c.pat?'selected':''}>${p}</option>`).join('')}</select></label>
    <label>Plane<select id="clipL">${PLANES.map(p=>`<option ${p===c.pl?'selected':''}>${p}</option>`).join('')}</select></label></div>
    <p class="err" id="clipE" role="alert"></p>
    <button class="go" data-d="save"${opt.block?' disabled':''}>Save clip</button>${id?'<button data-d="del">Remove clip</button>':''}<button data-d="x">Cancel</button></div>`;
  document.body.append(d);
  let aiSteps=null;
  const q=x=>d.querySelector('#'+x);
  q('clipAI').onclick=async()=>{const cap=q('clipX').value.trim(),link=linkIn(q('clipU').value),b=q('clipAI');
    const A=window.blockAI;
    const setv=(id,v)=>{const el=q(id);if(v&&[...(el.options||[{value:v}])].some(o=>o.value===v))el.value=v;};
    if(!A||!A.ready()){const nm=(cap.split(/\n|[.!?]/)[0]||'').replace(/#\S+|@\S+/g,'').trim().slice(0,48);
      if(nm&&!q('clipN').value)q('clipN').value=nm;
      const pat=window.blockPat&&blockPat(q('clipN').value||cap);if(pat&&pat!=='Other')setv('clipP',pat);
      const pl=window.blockPlane&&blockPlane(q('clipN').value||cap);if(pl)setv('clipL',pl);
      q('clipE').textContent='Filled in from the text. Connect AI in Settings for better guesses and steps.';return;}
    if(!cap&&!q('clipN').value){q('clipE').textContent='Paste the caption or write what the exercise is first.';q('clipX').focus();return;}
    b.disabled=true;b.textContent='Thinking…';
    try{const r=await A.ask({system:A.SYS+' Classify an exercise from a social media post. If the text does not say what the exercise is, make the best guess and keep the name generic.',
        prompt:`Link: ${link||'(none)'}\nName so far: ${q('clipN').value||'(none)'}\nPost text / notes:\n${cap||'(none)'}\n\nGive a short exercise name (max 40 chars), its category, movement pattern, plane, and 3–5 short how-to steps.`,
        schema:A.obj({name:A.str,category:{type:'string',enum:Object.keys(CAT)},pattern:{type:'string',enum:[...pats(),'']},plane:{type:'string',enum:PLANES},steps:A.arr(A.str)})});
      if(r.name)q('clipN').value=r.name;setv('clipC',r.category);setv('clipP',r.pattern);setv('clipL',r.plane);
      aiSteps=(r.steps||[]).slice(0,6);q('clipE').textContent=aiSteps.length?`Filled in, with ${aiSteps.length} steps for the exercise page.`:'Filled in.';}
    catch(e){q('clipE').textContent=e.message;}
    b.disabled=false;b.textContent='Fill in the rest for me';};
  setTimeout(()=>(q('clipU').value?q('clipN'):q('clipU')).focus(),50);
  d.onclick=ev=>{const a=ev.target.dataset&&ev.target.dataset.d;if(!a&&ev.target!==d)return;
    if(a==='save'){if(opt.block)return;const v=linkIn(q('clipU').value),n=q('clipN').value.trim();
      if(!v){q('clipE').textContent='Paste the link to the clip.';return;}
      if(!n){q('clipE').textContent='Give the clip a name.';q('clipN').focus();return;}
      const k=id||('ig_'+uid());
      S.clips[k]={n,c:q('clipC').value,pat:q('clipP').value||null,pl:q('clipL').value,v,src:isIG(v)?'ig':'link',t:(c.t||Date.now()),
        cap:q('clipX').value.trim()||null,st:aiSteps||c.st||null};
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
    <button class="clipsetup" id="clipSetup">Share straight from Instagram · set up</button>
    ${ids.length?'':'<p class="cliphint">In Instagram, tap Share → Copy link, then tap Add clip here. The link is read from your clipboard.</p>'}`;
  ids.forEach(id=>{const c=S.clips[id],b=document.createElement('button');b.className='card';
    b.innerHTML=`<span class="cm"><h3>${esc(c.n)}</h3><p>${[catName(c.c),c.pat,c.pl].filter(Boolean).map(esc).join(' · ')}</p></span><span class="chev">›</span>`;
    b.onclick=()=>window.exOpen?exOpen(exOf({id})):openSheet(exOf({id}),null);w.appendChild(b);});
  box.prepend(w);
  /* category groups below should not list clips a second time */
  box.querySelectorAll(':scope>.card').forEach(b=>{const h=b.querySelector('h3');if(h&&ids.some(id=>S.clips[id].n===h.textContent))b.remove();});
  w.querySelector('#clipAdd').onclick=()=>addFromClipboard(()=>renderLibrary());
  w.querySelector('#clipSetup').onclick=setupGuide;
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

/* ----- iPhone: a Shortcut in the share sheet opens BLOCK with ?clip=<link> ----- */
const BASE=location.origin+location.pathname;
function setupGuide(){const url=BASE+'?clip=',S2=window.blockSheet;if(!S2)return;
  S2.open(`<h3>Share from Instagram</h3><p class="sub">iPhone can’t list web apps in the share sheet, so a Shortcut does it. Set it up once (the Swedish names are in brackets and may differ slightly):</p>
    <ol class="clipsteps">
      <li>Open <b>Shortcuts</b> (Genvägar), tap <b>+</b> and name the shortcut <b>BLOCK</b>.</li>
      <li>Tap <b>ⓘ</b> and turn on <b>Show in Share Sheet</b> (Visa i delningsblad). Let it receive <b>URLs</b> and <b>Text</b>.</li>
      <li>Add <b>Get URLs from Input</b> (Hämta URL:er från indata).</li>
      <li>Add <b>URL Encode</b> (URL-koda) and encode the URLs from the step above.</li>
      <li>Add <b>Text</b> and paste the address below, then put the <b>URL Encoded Text</b> (URL-kodad text) right after it.</li>
      <li>Add <b>Open URLs</b> (Öppna URL:er).</li></ol>
    <div class="clipurl"><code>${esc(url)}</code><button class="btn-s" id="clipCopy">Copy</button></div>
    <p class="sub">Then in Instagram: <b>Share → More → BLOCK</b>. The clip opens in Safari, not the app on your Home Screen, so sign in under Settings → Sync in Safari once. Saved clips then reach the app when it syncs.</p>`,
    sh=>{sh.querySelector('#clipCopy').onclick=async e=>{try{await navigator.clipboard.writeText(url);e.target.textContent='Copied';}catch(x){e.target.textContent='Select and copy';}};});}
window.blockClipSetup=setupGuide;

/* ----- arriving with a link: ?clip=… (Shortcut) or ?url= / ?text= (share sheet) ----- */
const qs=new URLSearchParams(location.search),inc=qs.get('clip')||qs.get('url')||linkIn(qs.get('text'))||'';
if(inc){history.replaceState(null,'',location.pathname);
  /* this copy may be days old (Safari): let the first sync bring it up to date before saving,
     or an old copy would win over newer settings from the app */
  const open=async()=>{const Y=window.BLOCK_SYNC;let note='',block=false;
    if(!Y||!Y.signedIn())note='Not signed in here, so the clip stays in this browser. Sign in under Settings → Sync to get it in the app on your other devices.';
    else if(!(await Y.ready(10000))){note='Could not reach sync, so this copy may be out of date. Open the link again when you are online.';block=true;}
    clipDialog(linkIn(inc)||inc,null,()=>{show('library');renderLibrary();},{note,block});};
  setTimeout(open,400);}
})();
