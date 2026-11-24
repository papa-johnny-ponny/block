/* BLOCK. AI coach: connect Claude (Anthropic API) or ChatGPT (OpenAI API) with your
   own API key. The key is kept in this browser's localStorage only — it is never
   synced — and is sent only to the provider you picked.
   Features: describe today → session (gen.js), coach after a workout, weekly review,
   clip interpreter (clips.js), ask a program, swap in the moment, voice logging.
   Every feature has a local fallback, so the app works without a key. */
(function(){
const css=`
.aibox{margin:16px 0 0;padding:14px 16px;border-radius:14px;background:var(--surface-2);border:1px solid var(--line)}
.aibox h4{margin:0 0 6px;font-size:13px;font-weight:600;color:var(--dim);text-transform:none;letter-spacing:0}
.aibox p,.aibox li{font-size:14px;line-height:1.5;color:#fff;margin:6px 0 0}
.aibox ul{margin:6px 0 0;padding-left:18px}
.aibox .dim{color:var(--dim)}
.aibox input,.aibox textarea,.aiset input,.aiset select{display:block;width:100%;box-sizing:border-box;margin-top:8px;padding:12px 14px;border-radius:12px;background:var(--bg,#000);color:#fff;border:1px solid var(--line);font:inherit;font-size:16px}
.aibox textarea{min-height:64px;resize:vertical}
.aibtn{margin-top:10px;padding:10px 14px;border-radius:999px;background:var(--accent);color:#000;font:inherit;font-size:14px;font-weight:700;border:0;cursor:pointer}
.aibtn.ghost{background:none;color:#fff;border:1px solid var(--line)}
/* weekly review: folds away, and can be written again later in the week */
.aiwrev{margin:12px 0 0;border-top:1px solid var(--line)}
.aiwhd{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:48px;padding:10px 0 4px;background:none;border:0;color:#fff;font:inherit;text-align:left;cursor:pointer}
.aiwhd b{display:block;font-size:15px;font-weight:600}
.aiwhd small{display:block;color:var(--dim);font-size:12px;font-weight:500;margin-top:1px}
.aiwhd .ic{flex:none;color:var(--dim);transition:transform 200ms cubic-bezier(.23,1,.32,1)}
.aiwrev.on .aiwhd .ic{transform:rotate(180deg)}
.aiwbody{display:grid;grid-template-rows:0fr;transition:grid-template-rows 240ms cubic-bezier(.23,1,.32,1)}
.aiwbody>div{min-height:0;overflow:hidden}
.aiwrev.on .aiwbody{grid-template-rows:1fr}
@media (prefers-reduced-motion:reduce){.aiwbody,.aiwhd .ic{transition:none}}
.aibtn[disabled]{opacity:.5}
.aiout{margin-top:10px}
.aipick{display:flex;justify-content:space-between;align-items:center;gap:10px;width:100%;margin-top:8px;padding:12px 14px;border-radius:12px;background:var(--bg,#000);border:1px solid var(--line);color:#fff;font:inherit;text-align:left;cursor:pointer}
.aipick small{display:block;color:var(--dim);font-size:13px;margin-top:2px}
.aiset{margin:0}
.aiset h3{margin:0 0 4px;font-size:18px}
.aiset .row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.aiset .seg{display:flex;gap:8px;margin-top:10px}
.aiset .seg button{flex:1;padding:10px;border-radius:12px;border:1px solid var(--line);background:var(--surface-2);color:#fff;font:inherit;font-weight:600}
.aiset .seg button.on{background:var(--accent);color:#000;border-color:var(--accent)}
.aistat{font-size:13px;color:var(--dim);margin-top:8px;min-height:18px}
#aiMic{margin-left:auto}
#aiMicStat{position:fixed;left:16px;right:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 90px);z-index:60;margin:0;padding:12px 16px;border-radius:14px;background:#1d1d20;border:1px solid var(--line);color:#fff;font-size:14px;opacity:0;pointer-events:none;transition:opacity .2s}
#aiMicStat.on{opacity:1}
#aiMic.on{background:var(--accent);color:#000}
.aiweek .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px}
.aiweek .grid div{background:var(--bg,#000);border:1px solid var(--line);border-radius:12px;padding:10px}
.aiweek .grid b{display:block;font-size:20px}.aiweek .grid span{font-size:12px;color:var(--dim)}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ---------- connection ---------- */
const LS='block-ai';
const cfg=()=>{try{return JSON.parse(localStorage.getItem(LS)||'{}');}catch(e){return{};}};
const setCfg=c=>{try{localStorage.setItem(LS,JSON.stringify(c));}catch(e){}};
const CLAUDE_MODELS=[['claude-opus-5-5','Claude Opus 5.5 · best'],['claude-sonnet-5-5','Claude Sonnet 5.5 · faster'],['claude-haiku-5-5','Claude Haiku 5.5 · cheapest']];
const ready=()=>{const c=cfg();return !!(c.key&&c.provider);};
let SDK=null;
async function claudeClient(key){
  if(!SDK){const m=await import('https://esm.sh/@anthropic-ai/sdk@0.136.0');SDK=m.default||m.Anthropic;}
  return new SDK({apiKey:key,dangerouslyAllowBrowser:true});}
/* one request: text back, or parsed JSON when a schema is given */
async function ask({system,prompt,messages,schema,effort='low',maxTokens=4000}){
  const msgs=messages&&messages.length?messages:[{role:'user',content:prompt}];
  const c=cfg();if(!c.key)throw new Error('Add an API key in Settings → AI coach first.');
  if(c.provider==='openai'){
    const res=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',
      headers:{'Content-Type':'application/json',Authorization:'Bearer '+c.key},
      body:JSON.stringify({model:c.omodel||'gpt-5-mini',messages:[{role:'system',content:system},...msgs],
        ...(schema?{response_format:{type:'json_schema',json_schema:{name:'answer',strict:true,schema}}}:{})})});
    const j=await res.json().catch(()=>({}));
    if(!res.ok)throw new Error((j.error&&j.error.message)||`OpenAI error ${res.status}`);
    const text=((j.choices||[])[0]||{}).message?.content||'';
    return schema?JSON.parse(text):text;}
  const client=await claudeClient(c.key),model=c.model||'claude-opus-5-5';
  const req={model,max_tokens:maxTokens,system,messages:msgs,
    output_config:{effort,...(schema?{format:{type:'json_schema',schema}}:{})}};
  let r;
  try{
    if(model==='claude-haiku-5-5')r=await client.messages.create(req);
    /* if a safety classifier declines, the API retries on a fallback model in the same call */
    else r=await client.beta.messages.create({...req,betas:['server-side-fallback-2026-07-01'],fallbacks:'default'});
  }catch(e){
    if(e&&e.status===401)throw new Error('The API key was not accepted.');
    if(e&&e.status===429)throw new Error('Rate limited. Try again in a minute.');
    if(e&&e.status>=500)throw new Error('Anthropic had a server error. Try again.');
    throw new Error((e&&e.message)||'Could not reach Anthropic.');}
  if(r.stop_reason==='refusal')throw new Error('The model declined this one.');
  const text=r.content.filter(b=>b.type==='text').map(b=>b.text).join('');
  return schema?JSON.parse(text):text;}
/* JSON-schema helper: every property required, no extras (works for both providers' strict modes) */
const obj=props=>({type:'object',properties:props,required:Object.keys(props),additionalProperties:false});
const str={type:'string'},num={type:'number'},arr=items=>({type:'array',items});
const SYS='You are the coach inside BLOCK., a training log. Be concrete and brief. Use kg. Never invent data you were not given. Reply in the language the user writes in; default to English.';
window.blockAI={ready,ask,obj,str,num,arr,SYS,cfg};

/* ---------- shared context ---------- */
const exName=k=>(EX[k]||{n:String(k).replace(/^x:/,'')}).n;
const day=t=>new Date(t).toISOString().slice(0,10);
function setLine(r){if(r.score!=null)return`score ${r.score}`;if(r.check)return'done';
  return`${r.kg?r.kg+' kg × ':''}${r.reps??'?'}${r.rir!=null?` (RIR ${r.rir})`:''}${r.warm?' warm-up':''}`;}
function sessionText(sid){const rs=S.sets.filter(r=>r.sid===sid),by={};
  rs.forEach(r=>{(by[r.ex]=by[r.ex]||[]).push(r);});
  return Object.keys(by).map(k=>`- ${exName(k)}: ${by[k].map(setLine).join(', ')}`).join('\n');}
function recentText(days){const cut=Date.now()-days*864e5,ss=(S.sessions||[]).filter(s=>s.start>cut).sort((a,b)=>a.start-b.start);
  return ss.map(s=>{const P=progById(s.prog),d=P&&P.shape==='days'?(P.days.find(x=>x.key===s.key)||{}):{};
    return`${day(s.start)} · ${P?P.n:s.prog} · ${d.n||s.key}${s.note?` · note: ${s.note}`:''}\n${sessionText(s.id)}`;}).join('\n\n');}
const esc2=s=>esc(String(s==null?'':s));
const busy=(b,on,txt)=>{if(!b)return;b.disabled=on;if(txt)b.textContent=txt;};
const errHTML=e=>`<p class="dim">${esc2(e.message||e)}</p>`;

/* ---------- settings ---------- */
function settingsHTML(){const c=cfg(),p=c.provider||'claude';
  return`<p class="grp">AI coach</p><p class="sub" style="margin:0">Connect Claude or ChatGPT with an API key from console.anthropic.com or platform.openai.com. The key stays on this device and is only sent to the provider you pick. A chat subscription login can't be used by other apps, so an API key is the way in.</p>
    <div class="seg"><button data-p="claude" class="${p==='claude'?'on':''}">Claude</button><button data-p="openai" class="${p==='openai'?'on':''}">ChatGPT</button></div>
    <input id="aiKey" type="password" autocomplete="off" placeholder="${p==='claude'?'sk-ant-…':'sk-…'}" value="${esc2(c.key||'')}" aria-label="API key">
    ${p==='claude'?`<select id="aiModel" aria-label="Model">${CLAUDE_MODELS.map(([v,l])=>`<option value="${v}" ${v===(c.model||'claude-opus-5-5')?'selected':''}>${l}</option>`).join('')}</select>`
      :`<input id="aiOModel" placeholder="Model, e.g. gpt-5-mini" value="${esc2(c.omodel||'gpt-5-mini')}" aria-label="OpenAI model">`}
    <div class="row"><button class="aibtn" id="aiSave">Save</button><button class="aibtn ghost" id="aiTest">Test</button>${c.key?'<button class="aibtn ghost" id="aiForget">Forget key</button>':''}</div>
    <p class="aistat" id="aiStat" role="status">${c.key?`Connected to ${p==='claude'?'Claude':'ChatGPT'}.`:'Not connected. Everything still works, with simpler suggestions.'}</p>`;}
function mountSettings(){const v=document.getElementById('v-settings');if(!v)return;
  let box=document.getElementById('aiSet');if(!box){box=document.createElement('div');box.id='aiSet';box.className='aiset';
    const r=document.getElementById('resetAll');v.insertBefore(box,r);}
  box.innerHTML=settingsHTML();
  box.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const c=cfg();c.provider=b.dataset.p;if(c.key&&!document.getElementById('aiKey').value)delete c.key;setCfg(c);mountSettings();});
  const $=id=>document.getElementById(id);
  $('aiSave').onclick=()=>{const c=cfg();c.provider=c.provider||'claude';c.key=$('aiKey').value.trim();
    if($('aiModel'))c.model=$('aiModel').value;if($('aiOModel'))c.omodel=$('aiOModel').value.trim();setCfg(c);mountSettings();};
  $('aiTest').onclick=async()=>{const c=cfg();c.provider=c.provider||'claude';c.key=$('aiKey').value.trim()||c.key;
    if($('aiModel'))c.model=$('aiModel').value;if($('aiOModel'))c.omodel=$('aiOModel').value.trim();setCfg(c);
    $('aiStat').textContent='Testing…';
    try{const t=await ask({system:'Reply with exactly: OK',prompt:'Say OK.',maxTokens:200});$('aiStat').textContent=/ok/i.test(t)?'It works.':'Connected, but the reply was odd: '+t.slice(0,60);}
    catch(e){$('aiStat').textContent=e.message;}};
  if($('aiForget'))$('aiForget').onclick=()=>{const c=cfg();delete c.key;setCfg(c);mountSettings();};}
const _show=show;show=function(v){_show(v);if(v==='settings')mountSettings();if(v==='log')setTimeout(mountMic,0);};

/* ---------- 2. coach after the workout ---------- */
function localCoach(sid){const rs=S.sets.filter(r=>r.sid===sid&&!r.warm&&!r.check&&r.score==null&&!/^x:warm/i.test(r.ex)),by={};
  rs.forEach(r=>{(by[r.ex]=by[r.ex]||[]).push(r);});
  return Object.keys(by).map(k=>{const w=by[k],kg=Math.max(...w.map(r=>+r.kg||0)),reps=w.map(r=>+r.reps||0),lo=Math.min(...reps);
    const easy=w.some(r=>r.rir!=null&&r.rir>=3),hard=w.some(r=>r.rir===0);
    const next=!kg?(lo>=12?'add a little load or a harder variation':`aim for ${lo+1}+ reps on every set`)
      :hard?`stay at ${kg} kg until every set has a rep in reserve`:easy||lo>=10?`try ${kg+2.5} kg`:`stay at ${kg} kg and add a rep where you can`;
    return{exercise:exName(k),next,why:''};});}
function coachHTML(c){return`${c.summary?`<p>${esc2(c.summary)}</p>`:''}<ul>${(c.items||[]).map(i=>`<li><b>${esc2(i.exercise)}</b>: ${esc2(i.next)}${i.why?` <span class="dim">· ${esc2(i.why)}</span>`:''}</li>`).join('')}</ul>${c.flag?`<p class="dim">${esc2(c.flag)}</p>`:''}`;}
async function runCoach(sid,out,btn){
  S.coach=S.coach||{};
  if(!ready()){const c={summary:'Simple rule-based suggestions (connect AI in Settings for a real coach):',items:localCoach(sid)};S.coach[sid]=c;save();out.innerHTML=coachHTML(c);return;}
  busy(btn,true,'Thinking…');
  const s=(S.sessions||[]).find(x=>x.id===sid)||{},keys=[...new Set(S.sets.filter(r=>r.sid===sid).map(r=>r.ex))];
  const past=keys.map(k=>`${exName(k)}:\n${historyOf(k).filter(h=>h[0].sid!==sid).slice(0,3).map(h=>`  ${day(h[0].t)}: ${h.map(setLine).join(', ')}`).join('\n')||'  no earlier sessions'}`).join('\n');
  let plan='';try{plan=sessionOf(s.prog,s.key).items.filter(x=>!x.item.grp).map(x=>`- ${exOf(x.item).n}: ${x.sp.s||''}${x.sp.p!=null?` @ ${x.sp.p}%`:''}${x.sp.nt?` (${x.sp.nt})`:''}`).join('\n');}catch(e){}
  try{const c=await ask({system:SYS,effort:'medium',
      prompt:`A workout just finished. Suggest what to do next time for each exercise (load and reps), based on how it went and the plan. Flag anything worrying (pain notes, big drops).\n\nPlan:\n${plan||'(no plan)'}\n\nToday:\n${sessionText(sid)}\n${s.note?`Note: ${s.note}\n`:''}\nEarlier sessions of the same exercises:\n${past}`,
      schema:obj({summary:str,items:arr(obj({exercise:str,next:str,why:str})),flag:str})});
    S.coach[sid]=c;save();out.innerHTML=coachHTML(c);}
  catch(e){out.innerHTML=errHTML(e);}busy(btn,false,'Ask again');}
const _fin=plFinishView;
plFinishView=function(){_fin();const box=document.getElementById('plDone');if(!box||!PL)return;const sid=PL.sid;
  const w=document.createElement('div');w.className='aibox';
  w.innerHTML=`<h4>Coach</h4><p class="dim">${ready()?'What to do next time, from today’s sets and your history.':'Rule-based tips now. Connect Claude or ChatGPT in Settings for a real coach.'}</p>
    <button class="aibtn" id="aiCoach">${S.coach&&S.coach[sid]?'Ask again':'What should I do next time?'}</button><div class="aiout" id="aiCoachOut">${S.coach&&S.coach[sid]?coachHTML(S.coach[sid]):''}</div>`;
  const note=box.querySelector('#plNote');(note?note.closest('.xsec'):box.lastElementChild).after(w);
  w.querySelector('#aiCoach').onclick=e=>runCoach(sid,w.querySelector('#aiCoachOut'),e.currentTarget);};

/* ---------- 3. weekly review ---------- */
const PAT_MAIN=['Squat','Lunge','Hinge','Horizontal push','Vertical push','Horizontal pull','Vertical pull','Carry','Rotation'];
function weekStats(){const cut=Date.now()-7*864e5,rs=(S.sets||[]).filter(r=>r.t>cut&&!r.warm&&!r.check&&r.score==null);
  const sess=new Set((S.sets||[]).filter(r=>r.t>cut).map(r=>r.sid)).size,pat={};
  rs.forEach(r=>{const e=EX[r.ex]||{};const p=e.pat||(window.blockPat?blockPat(e.n||r.name):'Other');pat[p]=(pat[p]||0)+1;});
  const missing=PAT_MAIN.filter(p=>!pat[p]);
  const vol=Math.round(rs.reduce((a,r)=>a+(+r.kg||0)*(+r.reps||0),0));
  return{sess,sets:rs.length,vol,pat,missing};}
const weekKey=()=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return day(d);};
function reviewHTML(r){return`<p><b>${esc2(r.headline)}</b></p><p>${esc2(r.review)}</p><ul>${(r.actions||[]).map(a=>`<li>${esc2(a)}</li>`).join('')}</ul>`;}
function renderWeek(){const home=document.getElementById('v-home');if(!home)return;
  let box=document.getElementById('aiWeek');
  if(!box){box=document.createElement('div');box.id='aiWeek';box.className='aibox aiweek';
    const anchor=document.getElementById('homeHealth')||document.getElementById('progList');if(!anchor)return;anchor.before(box);}
  const w=weekStats(),wk=weekKey(),saved=(S.reviews||{})[wk],stale=!!saved&&saved.sess!=null&&w.sess>saved.sess;
  const top=Object.entries(w.pat).filter(([p])=>p!=='Other').sort((a,b)=>b[1]-a[1]).slice(0,3).map(([p,n])=>`${p.toLowerCase()} ${n}`).join(', ');
  box.innerHTML=`<h4>Your week · last 7 days</h4><div class="grid"><div><b>${w.sess}</b><span>Sessions</span></div><div><b>${w.sets}</b><span>Work sets</span></div><div><b>${w.vol.toLocaleString('en-GB')}</b><span>kg moved</span></div></div>
    ${w.sets?`<p class="dim">Most sets: ${esc2(top||'—')}.${w.missing.length?` Nothing for ${esc2(w.missing.map(x=>x.toLowerCase()).join(', '))}.`:' Every main pattern got work.'}</p>`:'<p class="dim">No sets logged in the last 7 days yet.</p>'}
    ${saved?`<div class="aiwrev${revOpen(wk)?' on':''}"><button class="aiwhd" type="button" aria-expanded="${revOpen(wk)}"><span><b>${esc2(saved.headline||'Your review')}</b><small>Written after ${saved.sess!=null?`${saved.sess} session${saved.sess===1?'':'s'}`:'earlier this week'}${stale?` · ${w.sess-saved.sess} more since`:''}</small></span>${ICON.down}</button>
      <div class="aiwbody"><div>${reviewHTML({...saved,headline:''}).replace('<p><b></b></p>','')}</div></div></div>`:''}
    <button class="aibtn${saved&&!stale?' ghost':''}" id="aiWeekGo">${saved?(stale?'Update my review':'Review my week again'):ready()?'Write my weekly review':'Review my week'}</button><div class="aiout" id="aiWeekOut"></div>`;
  const rv=box.querySelector('.aiwrev');
  if(rv)rv.querySelector('.aiwhd').onclick=()=>{const on=!rv.classList.contains('on');rv.classList.toggle('on',on);rv.querySelector('.aiwhd').setAttribute('aria-expanded',on);revOpen(wk,on);};
  box.querySelector('#aiWeekGo').onclick=async e=>{const out=box.querySelector('#aiWeekOut'),btn=e.currentTarget;
    if(!ready()){const r={headline:w.sets?`${w.sess} session${w.sess===1?'':'s'}, ${w.sets} work set${w.sets===1?'':'s'}`:'A quiet week',
        review:w.missing.length?`You trained ${top||'little'} most. Patterns with no work: ${w.missing.join(', ').toLowerCase()}.`:'Every main movement pattern got some work. Good balance.',
        actions:w.missing.slice(0,3).map(p=>`Add 2–3 sets of a ${p.toLowerCase()} exercise next week`)};
      if(!r.actions.length)r.actions=['Keep the same rhythm next week'];
      r.sess=w.sess;(S.reviews=S.reviews||{})[wk]=r;revOpen(wk,true);save();renderWeek();return;}
    busy(btn,true,'Writing…');
    try{const r=await ask({system:SYS,effort:'medium',
        prompt:`Write my weekly training review. Be specific: what went well, what is out of balance, what to change next week. 3 actions, each one line.\n\nStats: ${JSON.stringify(w)}\nCurrent program: ${S.active?(progById(S.active)||{}).n:'none'}\n\nSessions in the last 7 days:\n${recentText(7)||'none'}\n\nThe 7 days before, for comparison:\n${recentText(14).split('\n\n').filter(b=>b.slice(0,10)<day(Date.now()-7*864e5)).join('\n\n')||'none'}`,
        schema:obj({headline:str,review:str,actions:arr(str)})});
      r.sess=w.sess;(S.reviews=S.reviews||{})[wk]=r;revOpen(wk,true);save();renderWeek();}
    catch(err){out.innerHTML=errHTML(err);busy(btn,false,'Try again');}};}
/* folded or open, per week, on this device only */
function revOpen(wk,v){let m={};try{m=JSON.parse(localStorage.getItem('block.weekrev')||'{}');}catch(e){}
  if(v===undefined)return m[wk]!==false;
  m={[wk]:!!v};try{localStorage.setItem('block.weekrev',JSON.stringify(m));}catch(e){}return v;}
const _rh=renderHome;renderHome=function(){_rh();try{renderWeek();}catch(e){}};

/* ---------- 5. ask about a program ---------- */
const _oi=openInfo;
openInfo=function(id){_oi(id);const P=progById(id),body=document.getElementById('infoBody');if(!P||!body)return;
  const w=document.createElement('div');w.className='aibox';
  w.innerHTML=`<h4>Ask about this program</h4><input id="aiPQ" placeholder="e.g. Why so many sets at 70 %? Can I train 3 days instead?" aria-label="Your question">
    <button class="aibtn" id="aiPGo">${ready()?'Ask':'Connect AI in Settings to ask'}</button><div class="aiout" id="aiPOut"></div>`;
  body.append(w);
  w.querySelector('#aiPGo').onclick=async e=>{const q=w.querySelector('#aiPQ').value.trim(),out=w.querySelector('#aiPOut'),btn=e.currentTarget;
    if(!ready()){out.innerHTML='<p class="dim">Add an API key under Settings → AI coach.</p>';return;}
    if(!q){w.querySelector('#aiPQ').focus();return;}
    busy(btn,true,'Thinking…');
    const days=P.shape==='days'?(P.days||[]).slice(0,14).map(d=>`${d.eyebrow} · ${d.n}: ${(d.items||[]).filter(i=>!i.grp).map(i=>`${i.id?exName(i.id):i.n} ${i.s||''}${i.p!=null?` @${i.p}%`:''}`).join('; ')}`).join('\n'):'(week-based program)';
    const info=(INFO[id]||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(0,6000);
    try{const t=await ask({system:SYS+' Answer questions about one training program. Stay within what the program text and sessions say; say so when you are inferring. Max 150 words, plain text.',effort:'medium',
        prompt:`Program: ${P.n} (${P.group||''}) — ${P.sub}\n\nAbout it:\n${info}\n\nFirst sessions:\n${days}\n\nMy progress: ${progDone(P)} of ${progTotal(P)} sessions done.\n\nQuestion: ${q}`});
      out.innerHTML=t.split(/\n+/).map(p=>`<p>${esc2(p)}</p>`).join('');}
    catch(err){out.innerHTML=errHTML(err);}busy(btn,false,'Ask');};};

/* ---------- 6. swap in the moment ---------- */
const _sw=renderSwap;
renderSwap=function(){_sw();if(!ctx||!ctx.c)return;const body=document.getElementById('sBody'),acts=body.querySelector('.acts');
  const {prog,sessKey,idx,item}=ctx.c,k=logKey(prog,sessKey,idx),cur=EX[S.swap[k]||item.id]||{n:item.n||''};
  const w=document.createElement('div');w.className='aibox';
  w.innerHTML=`<h4>What’s the problem?</h4><input id="aiSwQ" placeholder="e.g. bench is taken, only a 16 kg kettlebell, sore shoulder" aria-label="What's the problem">
    <button class="aibtn" id="aiSwGo">Find a swap</button><div class="aiout" id="aiSwOut"></div>`;
  body.insertBefore(w,acts);
  const pick=id=>{S.swap[k]=id;save();ctx.ex=exFor(item,k);swapMode=false;openSheet(ctx.ex,ctx.c);};
  const list=(picks,out)=>{out.innerHTML=picks.length?picks.map(p=>`<button class="aipick" data-id="${esc2(p.key)}"><span><b>${esc2(exName(p.key))}</b>${p.why?`<small>${esc2(p.why)}</small>`:''}</span><span>›</span></button>`).join(''):'<p class="dim">No good match in the library.</p>';
    out.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>pick(b.dataset.id));};
  w.querySelector('#aiSwGo').onclick=async e=>{const q=w.querySelector('#aiSwQ').value.trim(),out=w.querySelector('#aiSwOut'),btn=e.currentTarget;
    const pat=window.blockPat?blockPat(cur.n):'Other';
    const same=Object.keys(EX).filter(id=>id!==item.id&&EX[id].n&&EX[id].c!=='rec'&&(window.blockPat&&pat!=='Other'?blockPat(EX[id].n)===pat:EX[id].c===cur.c));
    if(!ready()){list(same.slice(0,5).map(id=>({key:id,why:`same pattern: ${pat.toLowerCase()}`})),out);return;}
    busy(btn,true,'Looking…');
    const lib=Object.keys(EX).filter(id=>EX[id].n&&EX[id].c!=='rec').map(id=>`${id}|${EX[id].n}`).join('\n');
    try{const r=await ask({system:SYS+' Pick replacement exercises from the library only, by key.',
        prompt:`I am supposed to do: ${cur.n} (${ctx.c.sp&&ctx.c.sp.s||''}). Problem: ${q||'I need an alternative'}.\nPick up to 3 exercises from the library that train the same thing and solve the problem. Give a one-line reason each.\n\nLibrary (key|name):\n${lib}`,
        schema:obj({picks:arr(obj({key:str,why:str}))})});
      list((r.picks||[]).filter(p=>EX[p.key]).slice(0,3),out);}
    catch(err){out.innerHTML=errHTML(err);}busy(btn,false,'Find a swap');};};

/* ---------- 7. voice logging in the log view ---------- */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
const NUM={en:{one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,fifteen:15,twenty:20,thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90,hundred:100},
  sv:{en:1,ett:1,två:2,tre:3,fyra:4,fem:5,sex:6,sju:7,åtta:8,nio:9,tio:10,elva:11,tolv:12,femton:15,tjugo:20,trettio:30,fyrtio:40,femtio:50,sextio:60,sjuttio:70,åttio:80,nittio:90,hundra:100}};
function parseSpoken(t){t=' '+t.toLowerCase().replace(/,/g,'.')+' ';
  Object.values(NUM).forEach(m=>Object.keys(m).forEach(w=>{t=t.replace(new RegExp(`\\s${w}\\s`,'g'),` ${m[w]} `);}));
  const n='(\\d+(?:\\.\\d+)?)',f=re=>{const m=t.match(re);return m?parseFloat(m[1]):null;};
  let kg=f(new RegExp(n+'\\s*(?:kg|kilo|kilos|kilogram|kilon)')),reps=f(new RegExp(n+'\\s*(?:reps?|repetitioner|repetitions|gånger|times|st)\\b'));
  const rpe=f(new RegExp('rpe\\s*'+n)),rir=f(new RegExp(n+'\\s*(?:in reserve|i reserv|kvar)'));
  if(kg==null||reps==null){const all=[...t.matchAll(/(\d+(?:\.\d+)?)/g)].map(m=>+m[1]).filter(x=>x!==rpe&&x!==rir);
    if(kg==null&&reps==null&&all.length>=2){kg=all[0];reps=all[1];}else if(reps==null&&all.length)reps=all.find(x=>x!==kg)??null;else if(kg==null&&all.length>1)kg=all.find(x=>x!==reps)??null;}
  return{kg,reps,rir:rir!=null?rir:rpe!=null?Math.max(0,Math.round(10-rpe)):null};}
function voiceLog(said,stat){const p=parseSpoken(said);
  const open=c=>[...c.querySelectorAll('.lgr:not(.done)')].find(r=>!/^w/.test(r.dataset.row));
  const card=[...document.querySelectorAll('#v-log .lgc')].find(c=>open(c)&&!/warm-?up/i.test((c.querySelector('.lgh b')||{}).textContent||''));
  if(!card){stat(`Heard “${said}” but every set is logged.`);return;}
  if(p.reps==null&&p.kg==null){stat(`Heard “${said}”. Say e.g. “60 kilo 8 reps”.`);return;}
  const row=open(card),set=(f,v)=>{const i=row.querySelector(`[data-f=${f}]`);if(i&&v!=null){i.value=v;i.dispatchEvent(new Event('change'));}};
  set('kg',p.kg);set('reps',p.reps);
  const btn=row.querySelector('[data-a=log]');
  const before=S.sets.length;if(btn)btn.click();
  if(p.rir!=null&&S.sets.length>before){S.sets[S.sets.length-1].rir=Math.min(3,p.rir);save();}
  const name=(card.querySelector('.lgh b')||{}).textContent||'';
  stat(`Logged ${name}: ${p.kg!=null?p.kg+' kg × ':''}${p.reps??'–'}${p.rir!=null?` · RIR ${p.rir}`:''}`);}
let REC=null;
function mountMic(){if(!SR)return;const x=document.getElementById('lgX');if(!x||document.getElementById('aiMic'))return;
  const b=document.createElement('button');b.id='aiMic';b.className='pbtn';b.setAttribute('aria-label','Log a set by voice');b.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';b.style.cssText='display:grid;place-items:center';
  x.parentElement.insertBefore(b,x.nextSibling);
  let tip=document.getElementById('aiMicStat');if(!tip){tip=document.createElement('p');tip.id='aiMicStat';tip.setAttribute('role','status');document.body.append(tip);}
  let tm=null;const stat=t=>{const el=document.getElementById('aiMicStat');if(!el)return;el.textContent=t;el.classList.add('on');clearTimeout(tm);tm=setTimeout(()=>el.classList.remove('on'),4500);};
  b.onclick=()=>{if(REC){REC.stop();return;}
    REC=new SR();REC.lang=navigator.language||'sv-SE';REC.interimResults=false;REC.maxAlternatives=1;
    b.classList.add('on');stat('Listening… say e.g. “60 kilo 8 reps”.');
    REC.onresult=e=>{voiceLog(e.results[0][0].transcript,stat);};
    REC.onerror=e=>stat(e.error==='not-allowed'?'Microphone access is off for this app.':'Didn’t catch that.');
    REC.onend=()=>{REC=null;const m=document.getElementById('aiMic');if(m)m.classList.remove('on');};
    try{REC.start();}catch(e){REC=null;b.classList.remove('on');}};}
new MutationObserver(()=>{if(!document.getElementById('v-log').classList.contains('hide'))mountMic();}).observe(document.getElementById('v-log'),{childList:true});
window.blockParseSpoken=parseSpoken;window.blockVoiceLog=t=>voiceLog(t,x=>{const el=document.getElementById('aiMicStat');if(el)el.textContent=x;});
if(!document.getElementById('v-home').classList.contains('hide'))try{renderWeek();}catch(e){}
})();
