/* BLOCK. program packs. The bought programs are not in this public repo: they live
   in Supabase (table block_packs, readable only when signed in — see
   supabase/packs.sql) and are cached on the device after the first download, so
   they also work offline. The pack JSON is built locally with
   `node tools/build-packs.js` (into private/, which is git-ignored) and uploaded
   from the local app: Settings → Program packs → Upload. */
(function(){
const CACHE='block-packs-v1',META='block.packs.meta';
const rd=()=>{try{return JSON.parse(localStorage.getItem(META)||'{}');}catch(e){return{};}};
const wr=m=>{try{localStorage.setItem(META,JSON.stringify(m));}catch(e){}};
const loaded=new Set();let status='';

function register(pack){if(!pack||!pack.id||loaded.has(pack.id))return false;loaded.add(pack.id);
  try{BLOCK_REG.ex(pack.ex||{});BLOCK_REG.steps(pack.steps||{});
    if(typeof RM_ALIAS==='object')Object.keys(pack.alias||{}).forEach(k=>{if(!RM_ALIAS[k])RM_ALIAS[k]=pack.alias[k];});
    (pack.approaches||[]).forEach(a=>BLOCK_REG.approach(a));
    Object.keys(pack.groups||{}).forEach(n=>BLOCK_REG.group(n,pack.groups[n]));
    (pack.programs||[]).forEach(P=>BLOCK_REG.program(P,(pack.info||{})[P.id]));}
  catch(e){console.warn('[BLOCK packs]',pack.id,e);}
  return true;}
const visible=v=>{const el=document.getElementById('v-'+v);return el&&!el.classList.contains('hide');};
function repaint(){try{if(visible('home'))renderHome();else if(visible('settings'))mountSection();}catch(e){}}

/* 1. what is already on this device */
async function fromCache(){if(!window.caches)return 0;let n=0;
  try{const c=await caches.open(CACHE);for(const req of await c.keys()){const r=await c.match(req);if(!r)continue;
      if(register(await r.json()))n++;}}catch(e){}
  return n;}

/* 2. new or changed packs from Supabase (only when signed in) */
async function fromServer(){const Y=window.BLOCK_SYNC;if(!Y||!Y.signedIn()||!navigator.onLine)return 0;
  const tk=await Y.token();if(!tk)return 0;
  const H={apikey:Y.key,Authorization:'Bearer '+tk};
  const res=await fetch(Y.url+'/rest/v1/block_packs?select=id,updated_at',{headers:H});
  if(!res.ok){status=res.status===404?'The block_packs table is not set up yet.':'Could not reach the program packs.';return 0;}
  const list=await res.json(),meta=rd(),todo=list.filter(x=>meta[x.id]!==x.updated_at);let n=0,changed=false;
  const c=window.caches?await caches.open(CACHE):null;
  for(const x of todo){
    const r=await fetch(Y.url+'/rest/v1/block_packs?select=data&id=eq.'+encodeURIComponent(x.id),{headers:H});
    if(!r.ok)continue;const rows=await r.json(),pack=rows[0]&&rows[0].data;if(!pack)continue;
    if(c)await c.put('/packs/'+x.id,new Response(JSON.stringify(pack),{headers:{'Content-Type':'application/json'}}));
    meta[x.id]=x.updated_at;if(loaded.has(pack.id))changed=true;else if(register(pack))n++;}
  /* packs removed on the server: drop them from the device too */
  for(const id of Object.keys(meta))if(!list.some(x=>x.id===id)){delete meta[id];if(c)await c.delete('/packs/'+id);changed=true;}
  wr(meta);if(changed)status='Updated program packs are ready. They load the next time the app opens.';
  return n;}

async function boot(){const a=await fromCache();if(a)repaint();
  try{const b=await fromServer();if(b)repaint();}catch(e){}
  if(visible('settings'))mountSection();}
boot();
(window.BLOCK_SYNC&&window.BLOCK_SYNC.onSignIn||[]).push(()=>fromServer().then(n=>{if(n)repaint();mountSection();}).catch(()=>{}));
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')fromServer().then(n=>{if(n)repaint();}).catch(()=>{});});

/* ----- settings: status, and an upload button in the local copy of the app ----- */
async function localIndex(){if(!/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname))return null;
  try{const r=await fetch('private/packs/index.json',{cache:'no-store'});return r.ok?await r.json():null;}catch(e){return null;}}
async function upload(list,out){const Y=window.BLOCK_SYNC;
  if(!Y||!Y.signedIn()){out.textContent='Sign in under Sync first.';return;}
  const tk=await Y.token(),H={apikey:Y.key,Authorization:'Bearer '+tk,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates,return=minimal'};
  let ok=0;
  for(const x of list){out.textContent=`Uploading ${x.id}…`;
    const data=await (await fetch('private/packs/'+x.id+'.json',{cache:'no-store'})).json();
    const r=await fetch(Y.url+'/rest/v1/block_packs?on_conflict=id',{method:'POST',headers:H,
      body:JSON.stringify({id:x.id,data,updated_at:new Date().toISOString()})});
    if(!r.ok){out.textContent=`${x.id} failed: ${r.status} ${(await r.text()).slice(0,120)}`;return;}ok++;}
  out.textContent=`Uploaded ${ok} packs.`;await fromServer().then(n=>{if(n)repaint();}).catch(()=>{});}
async function mountSection(){const v=document.getElementById('v-settings');if(!v)return;
  let box=document.getElementById('packSet');
  if(!box){box=document.createElement('div');box.id='packSet';box.style.margin='26px 0 0';
    const anchor=document.getElementById('aiSet')||document.getElementById('resetAll');v.insertBefore(box,anchor);}
  const signed=window.BLOCK_SYNC&&BLOCK_SYNC.signedIn();
  box.innerHTML=`<p class="grp">Program packs</p><p class="sub" style="margin:0">${loaded.size?`${loaded.size} packs on this device.`:signed?'No packs downloaded yet.':'Sign in under Sync to load your bought programs. They are kept private, not in the public app.'}</p>
    <p class="sub" id="packMsg" style="margin:8px 0 0">${status}</p>`;
  const idx=await localIndex();
  if(idx&&idx.length){const b=document.createElement('button');b.className='btn-s';b.style.cssText='width:100%;margin-top:10px';
    b.textContent=`Upload ${idx.length} packs from this computer`;box.append(b);
    b.onclick=()=>{b.disabled=true;upload(idx,box.querySelector('#packMsg')).finally(()=>{b.disabled=false;});};}}
const _show=show;show=function(v){_show(v);if(v==='settings')mountSection();};
window.BLOCK_PACKS={loaded:()=>[...loaded],refresh:()=>fromServer()};
})();
