/* BLOCK. sync — keeps the log in step between devices through Supabase.
   The whole app state (S) is one JSON row per user. Sessions and sets are
   merged by id so two devices never overwrite each other's training; deleted
   sets and sessions leave a tombstone in S._del so they are not brought back. Everything
   else (current program, settings, maxes) comes from whichever device saved
   last (S._mt). */
(function(){
const LOCAL_ONLY=['mute'];          // per-device preferences, never uploaded
const TOMB_DAYS=120;                 // how long deleted-set markers are kept

const setId=r=>r.sid+'|'+r.t+'|'+r.idx;
const canon=v=>JSON.stringify(v,(k,x)=>x&&typeof x==='object'&&!Array.isArray(x)
  ?Object.keys(x).sort().reduce((o,kk)=>(o[kk]=x[kk],o),{}):x);
const strip=o=>{const c={...o};LOCAL_ONLY.forEach(k=>delete c[k]);return c;};

/* localFresh=false on a device's first sync: its own settings may be blank
   defaults, so the server's win; its sessions and sets are still kept. */
function merge(local,remote,localFresh){
  if(!remote)return local;
  const lmt=localFresh?(local._mt||0):0,rmt=remote._mt||0;
  const newer=rmt>lmt?remote:local,older=newer===remote?local:remote;
  const out={};
  for(const k of new Set([...Object.keys(local),...Object.keys(remote)])){
    if(k==='sessions'||k==='sets'||k==='_del'||k==='_mt')continue;
    if(k==='log'){out.log={...(older.log||{}),...(newer.log||{})};continue;}  // per exercise, so done marks from both devices survive
    if(LOCAL_ONLY.includes(k)){if(k in local)out[k]=local[k];continue;}
    out[k]=k in newer?newer[k]:older[k];
  }
  const del={...(remote._del||{}),...(local._del||{})},cut=Date.now()-TOMB_DAYS*864e5;
  for(const id in del)if(del[id]<cut)delete del[id];
  const sm=new Map();
  (older.sessions||[]).forEach(s=>sm.set(s.id,s));
  (newer.sessions||[]).forEach(s=>{const o=sm.get(s.id);sm.set(s.id,o&&o.end&&!s.end?o:s);});
  const xm=new Map();
  (older.sets||[]).forEach(r=>xm.set(setId(r),r));
  (newer.sets||[]).forEach(r=>xm.set(setId(r),r));
  for(const id in del)xm.delete(id);
  const gone=new Set(Object.keys(del).filter(k=>k.startsWith('sess|')).map(k=>k.slice(5)));
  if(gone.size){gone.forEach(id=>sm.delete(id));for(const[k,r]of xm)if(gone.has(r.sid))xm.delete(k);}
  out.sessions=[...sm.values()].sort((a,b)=>(a.start||0)-(b.start||0));
  out.sets=[...xm.values()].sort((a,b)=>(a.t||0)-(b.t||0));
  out._del=del;out._mt=Math.max(local._mt||0,rmt);
  return out;
}

/* skips made from a calendar event land in the cal_skips column; fold them into
   the plan and drop them from the queue. Returns true when anything was folded. */
function foldSkips(doc,skips){
  if(!skips||!Object.keys(skips).length)return false;
  const c=doc.cal;
  if(c){c.skip={...(c.skip||{}),...skips};c.queue=(c.queue||[]).filter(x=>!skips[x.k]);doc._mt=Math.max(doc._mt||0,Date.now());}
  return true;
}

if(typeof module!=='undefined'&&module.exports){module.exports={merge,canon,setId,strip,foldSkips};return;}

/* ===== browser side ===== */
const SB_URL='https://uuskbrhvpjybsmjpcokm.supabase.co';
const SB_KEY='sb_publishable_lWkdNEE_j38zAzBxidguDQ_W8VRzUZk';  // publishable: safe in the page, RLS guards the data
const AUTH_KEY='block.sync.auth',META_KEY='block.sync.meta';
const BUSY=['session','play','build'];   // never swap data under an open workout

const rd=k=>{try{return JSON.parse(localStorage.getItem(k));}catch(e){return null;}};
const wr=(k,v)=>{try{v==null?localStorage.removeItem(k):localStorage.setItem(k,JSON.stringify(v));}catch(e){}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let auth=rd(AUTH_KEY),meta=rd(META_KEY)||{},pending=false,running=false,timer=null;
let SEL='data,cal_skips';   // falls back to 'data' if the calendar column is not there yet
const ui={email:'',msg:''};

async function api(path,opt={}){
  const res=await fetch(SB_URL+path,{...opt,headers:{apikey:SB_KEY,'Content-Type':'application/json',...(opt.headers||{})}});
  const txt=await res.text();let body=null;try{body=txt?JSON.parse(txt):null;}catch(e){body=txt;}
  if(!res.ok){const e=new Error((body&&(body.msg||body.message||body.error_description||body.error))||'HTTP '+res.status);e.status=res.status;throw e;}
  return body;
}
function keep(b){
  auth={access:b.access_token,refresh:b.refresh_token,exp:Date.now()+(b.expires_in||3600)*1000,
    email:(b.user&&b.user.email)||(auth&&auth.email),uid:(b.user&&b.user.id)||(auth&&auth.uid)};
  wr(AUTH_KEY,auth);
}
async function token(){
  if(!auth)return null;
  if(Date.now()<auth.exp-60000)return auth.access;
  try{keep(await api('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:JSON.stringify({refresh_token:auth.refresh})}));return auth.access;}
  catch(e){if(e.status>=400&&e.status<500){auth=null;wr(AUTH_KEY,null);}throw e;}
}

const visible=v=>{const el=document.getElementById('v-'+v);return el&&!el.classList.contains('hide');};
const busy=()=>BUSY.some(visible);

function apply(m){
  try{localStorage.setItem(KEY,JSON.stringify(m));}catch(e){}
  load();
  if(visible('home'))renderHome();else if(visible('settings'))renderSettings();
}

async function sync(force){
  if(!auth)return;
  if(running){pending=true;return;}
  if(!navigator.onLine||(busy()&&!force)){pending=true;paint();return;}
  running=true;pending=false;
  try{
    const tk=await token();if(!tk)return;
    const H={Authorization:'Bearer '+tk};
    const get=()=>api('/rest/v1/block_state?select='+SEL+'&user_id=eq.'+encodeURIComponent(auth.uid),{headers:H});
    let rows;
    try{rows=await get();}catch(e){if(SEL!=='data'&&e.status===400){SEL='data';rows=await get();}else throw e;}
    const remote=rows&&rows[0]?rows[0].data:null;
    const local=JSON.parse(JSON.stringify(S));
    const merged=merge(local,remote,!!meta.last);
    const folded=foldSkips(merged,rows&&rows[0]&&rows[0].cal_skips);
    if(canon(merged)!==canon(local))apply(merged);
    const up=strip(merged);
    if(!remote||folded||canon(up)!==canon(remote))
      await api('/rest/v1/block_state?on_conflict=user_id',{method:'POST',
        headers:{...H,Prefer:'resolution=merge-duplicates,return=minimal'},
        body:JSON.stringify({user_id:auth.uid,data:up,updated_at:new Date().toISOString(),...(folded?{cal_skips:{}}:{})})});
    meta.last=Date.now();meta.err=null;
  }catch(e){meta.err=e.message||String(e);}
  finally{running=false;wr(META_KEY,meta);paint();if(pending)setTimeout(sync,800);}
}
const schedule=()=>{if(!auth)return;clearTimeout(timer);timer=setTimeout(sync,2000);};

/* every save stamps the state and queues an upload */
const _save=save;
save=function(){if(S)S._mt=Date.now();_save();schedule();};
/* catch up once a workout view is closed */
const _show=show;
show=function(v){_show(v);if(pending&&!BUSY.includes(v))sync();};

/* ----- settings section ----- */
function statusText(){
  if(!navigator.onLine)return 'Offline · syncs when you are back online';
  if(running)return 'Syncing…';
  if(!meta.last)return 'Not synced yet';
  const d=new Date(meta.last),m=Math.round((Date.now()-meta.last)/60000);
  return 'Synced '+(m<1?'just now':m<60?m+' min ago':d.toLocaleString([], {day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}));
}
function paint(){
  const st=document.getElementById('syStatus');if(st)st.textContent=statusText();
  const er=document.getElementById('syMsg');if(er&&auth)er.textContent=meta.err?'Last sync failed: '+meta.err:'';
}
function section(){
  if(auth)return `<p class="grp">Sync</p>
    <div class="srow"><div><b>${esc(auth.email||'Signed in')}</b><br><span id="syStatus">${esc(statusText())}</span></div></div>
    <div class="acts" style="margin:12px 0 0"><button class="btn-s" id="syNow">Sync now</button><button class="btn-s" id="syOut">Sign out</button></div>
    <p class="sub" id="syMsg" style="margin:8px 0 0">${meta.err?esc('Last sync failed: '+meta.err):''}</p>`;
  return `<p class="grp">Sync</p>
    <p class="sub" style="margin:0 0 10px">Sign in to keep your log in step between iPhone and Mac.</p>
    <form id="syForm" autocomplete="on">
    <input type="email" id="syEmail" name="email" autocomplete="username" placeholder="Email" value="${esc(ui.email)}">
    <input type="password" id="syPass" name="password" autocomplete="current-password" placeholder="Password" style="margin-top:8px">
    <button type="submit" class="btn-s" style="width:100%;margin-top:8px" id="syIn">Sign in</button></form>
    <p class="sub" id="syMsg" style="margin:8px 0 0">${esc(ui.msg)}</p>`;
}
function wire(){
  const q=id=>document.getElementById(id),msg=t=>{ui.msg=t;const m=q('syMsg');if(m)m.textContent=t;};
  if(auth){
    q('syNow').onclick=()=>{meta.err=null;sync(true);paint();};
    q('syOut').onclick=()=>{if(!confirm('Sign out? Your log stays on this device.'))return;
      const a=auth;auth=null;meta={};wr(AUTH_KEY,null);wr(META_KEY,null);
      if(a&&a.access)api('/auth/v1/logout',{method:'POST',headers:{Authorization:'Bearer '+a.access}}).catch(()=>{});
      ui.msg='';renderSettings();};
    return;
  }
  q('syForm').onsubmit=async e=>{e.preventDefault();
    const email=q('syEmail').value.trim(),password=q('syPass').value;
    if(!email||!password){msg('Enter your email and password.');return;}
    ui.email=email;q('syIn').disabled=true;msg('Signing in…');
    try{keep(await api('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password})}));
      meta={};wr(META_KEY,meta);ui.msg='';renderSettings();sync(true);}
    catch(err){q('syIn').disabled=false;msg('Could not sign in: '+err.message);}};
}
const _renderSettings=renderSettings;
renderSettings=function(){_renderSettings();
  const box=document.getElementById('setExtra');if(!box)return;
  const d=document.createElement('div');d.id='syncBox';d.innerHTML=section();box.prepend(d);wire();};

/* ----- when to sync ----- */
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')sync();});
window.addEventListener('online',()=>sync());
window.BLOCK_SYNC={signedIn:()=>!!auth};
if(auth)sync();
})();
