/* BLOCK. chat: a floating bubble (Claude or ChatGPT mark in the accent colour)
   that opens a drawer. Ask anything about your training, or tell it what to do:
   start the next session, open a program, build a session, log a set.
   Answers come as a card with quick replies. Uses blockAI (ai.js); without a
   key a small local reader handles the common commands. */
(function(){
const css=`
.aibub{position:fixed;right:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 18px);z-index:70;width:58px;height:58px;border-radius:50%;
  display:grid;place-items:center;background:#141416;border:1px solid var(--line);color:var(--accent);box-shadow:0 10px 30px rgba(0,0,0,.5);cursor:pointer;
  transition:transform .2s cubic-bezier(.2,.8,.2,1),opacity .2s}
.aibub:active{transform:scale(.94)}
.aibub.off{opacity:0;pointer-events:none;transform:scale(.8)}
.aichat{position:fixed;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 12px);z-index:80;max-width:620px;margin:0 auto;
  transform:translateY(calc(100% + 40px));transition:transform .28s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.aichat.on{transform:none;pointer-events:auto}
.aitop{position:relative;height:56px;display:flex;align-items:center;justify-content:flex-end;touch-action:none}
.aihandle{position:absolute;left:50%;top:50%;width:44px;height:5px;margin:-2px 0 0 -22px;border-radius:3px;background:rgba(255,255,255,.35);border:0;padding:0;cursor:grab}
.aihandle::after{content:'';position:absolute;inset:-14px -20px}
.aimin{width:46px;height:46px;border-radius:50%;background:#1c1c1f;border:1px solid var(--line);color:#fff;display:grid;place-items:center;cursor:pointer}
.aipanel{background:#141416;border:1px solid var(--line);border-radius:22px;padding:14px;box-shadow:0 20px 60px rgba(0,0,0,.6)}
.aithread{max-height:min(56vh,520px);overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:2px;overscroll-behavior:contain}
.aicard{background:#1f1f22;border-radius:16px;padding:20px 20px 18px}
.aicard p{margin:0;font-family:Georgia,'Iowan Old Style','Times New Roman',serif;font-size:20px;line-height:1.35;color:#fff;white-space:pre-wrap}
.aicard .aiwho{display:flex;align-items:center;gap:6px;margin:0 0 10px;font-family:inherit;font-size:12px;color:var(--dim);font-weight:600}
.aicard .aiwho svg{color:var(--accent)}
.aichips{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
.aichips button{padding:12px 20px;border-radius:999px;border:1px solid rgba(255,255,255,.16);background:none;color:#fff;font:inherit;font-size:16px;cursor:pointer}
.aichips button:first-child{background:#fff;color:#000;border-color:#fff}
.aidone{margin:12px 0 0;font-size:13px;color:var(--accent)}
.aiu{align-self:flex-end;max-width:80%;padding:10px 14px;border-radius:16px 16px 4px 16px;background:#2a2a2e;color:#fff;font-size:15px;line-height:1.4}
.aidots{display:flex;gap:6px;padding:8px 2px}
.aidots i{width:7px;height:7px;border-radius:50%;background:var(--dim);animation:aidot 1s infinite ease-in-out}
.aidots i:nth-child(2){animation-delay:.15s}.aidots i:nth-child(3){animation-delay:.3s}
@keyframes aidot{0%,80%,100%{opacity:.25}40%{opacity:1}}
@media (prefers-reduced-motion:reduce){.aichat,.aibub{transition:none}.aidots i{animation:none}}
.aiin{display:flex;align-items:center;gap:10px;margin-top:12px;padding:8px 8px 8px 18px;border-radius:16px;background:#fff}
.aiin input{flex:1;min-width:0;border:0;background:none;color:#000;font:inherit;font-size:17px;padding:10px 0;outline:none}
.aiin input::placeholder{color:#8a8a8a}
.aisend{flex:none;width:44px;height:44px;border-radius:50%;border:0;background:#555;color:#fff;display:grid;place-items:center;cursor:pointer}
.aisend.ready{background:#000;color:var(--accent)}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* marks: simplified Claude spark and ChatGPT knot, drawn in the accent colour */
function claudeMark(s){let p='';for(let i=0;i<12;i++){const a=i*30+8,l=[9.6,7.8,8.8][i%3];
    p+=`<rect x="-1" y="1.4" width="2" height="${l}" rx="1" transform="rotate(${a})"/>`;}
  return`<svg viewBox="-12 -12 24 24" width="${s}" height="${s}" fill="currentColor" aria-hidden="true">${p}</svg>`;}
function gptMark(s){return`<svg viewBox="-12 -12 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">${[0,60,120].map(r=>`<rect x="-9.6" y="-4.4" width="19.2" height="8.8" rx="4.4" transform="rotate(${r})"/>`).join('')}</svg>`;}
const prov=()=>{const c=window.blockAI?blockAI.cfg():{};return c.provider==='openai'?'openai':'claude';};
const mark=s=>prov()==='openai'?gptMark(s):claudeMark(s);
const who=()=>prov()==='openai'?'ChatGPT':'Claude';
const escH=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- elements ---------- */
const bub=document.createElement('button');bub.className='aibub';bub.type='button';
const box=document.createElement('div');box.className='aichat';box.setAttribute('role','dialog');box.setAttribute('aria-modal','false');
box.innerHTML=`<div class="aitop"><button class="aihandle" type="button" aria-label="Close chat"></button>
  <button class="aimin" type="button" aria-label="Close chat"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button></div>
  <div class="aipanel"><div class="aithread" aria-live="polite"></div>
  <form class="aiin"><input type="text" autocomplete="off" enterkeyhint="send" placeholder="Ask me anything…" aria-label="Message">
  <button class="aisend" type="submit" aria-label="Send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button></form></div>`;
document.body.append(bub,box);
const thread=box.querySelector('.aithread'),form=box.querySelector('.aiin'),input=form.querySelector('input'),sendB=form.querySelector('.aisend');
const paintBub=()=>{bub.innerHTML=mark(28);bub.setAttribute('aria-label',`Ask ${who()}`);};paintBub();

/* ---------- conversation ---------- */
const T=[];let busy=false;
const GREET=()=>({role:'assistant',local:true,text:'What do you want to do today?',chips:['Start my next session','Build me a 30 min session','How was my week?','Which program fits me?']});
function render(){
  thread.innerHTML=T.map((t,i)=>t.role==='user'?`<div class="aiu">${escH(t.text)}</div>`
    :`<div class="aicard"><div class="aiwho">${mark(14)}${who()}</div><p>${escH(t.text)}</p>
      ${t.done&&t.done.length?`<p class="aidone">${t.done.map(escH).join(' · ')}</p>`:''}
      ${t.chips&&t.chips.length&&i===T.length-1?`<div class="aichips">${t.chips.map(c=>`<button type="button">${escH(c)}</button>`).join('')}</div>`:''}</div>`).join('')
    +(busy?`<div class="aicard"><div class="aiwho">${mark(14)}${who()}</div><div class="aidots"><i></i><i></i><i></i></div></div>`:'');
  thread.querySelectorAll('.aichips button').forEach(b=>b.onclick=()=>send(b.textContent));
  thread.scrollTop=thread.scrollHeight;}
function open(){paintBub();if(!T.length)T.push(GREET());render();box.classList.add('on');bub.classList.add('off');setTimeout(()=>input.focus(),280);}
function close(){box.classList.remove('on');input.blur();syncBub();}
bub.onclick=open;box.querySelector('.aimin').onclick=close;box.querySelector('.aihandle').onclick=close;
input.oninput=()=>sendB.classList.toggle('ready',!!input.value.trim());
form.onsubmit=e=>{e.preventDefault();const t=input.value.trim();if(!t||busy)return;input.value='';sendB.classList.remove('ready');send(t);};
/* drag the handle down to close */
{const top=box.querySelector('.aitop');let y0=null,dy=0;
  top.addEventListener('pointerdown',e=>{if(e.target.closest('.aimin'))return;y0=e.clientY;dy=0;box.style.transition='none';top.setPointerCapture(e.pointerId);});
  top.addEventListener('pointermove',e=>{if(y0==null)return;dy=Math.max(0,e.clientY-y0);box.style.transform=`translateY(${dy}px)`;});
  const end=()=>{if(y0==null)return;y0=null;box.style.transition='';box.style.transform='';if(dy>80)close();};
  top.addEventListener('pointerup',end);top.addEventListener('pointercancel',end);}

/* ---------- what the assistant may do ---------- */
const ACTIONS=['none','start_next_session','start_session','open_program','set_current_program','build_session','open_view','open_exercise','log_set'];
const visibleView=()=>['home','program','session','library','settings','log','gen','ex','build','play'].find(v=>{const el=document.getElementById('v-'+v);return el&&!el.classList.contains('hide');})||'home';
function findProg(a){a=String(a||'').trim();return progById(a)||PROGRAMS.find(P=>P.n.toLowerCase()===a.toLowerCase())||PROGRAMS.find(P=>P.n.toLowerCase().includes(a.toLowerCase()));}
function findEx(a){a=String(a||'').trim().toLowerCase();if(EX[a])return a;const ks=Object.keys(EX);
  return ks.find(k=>EX[k].n&&EX[k].n.toLowerCase()===a)||ks.find(k=>EX[k].n&&EX[k].n.toLowerCase().includes(a));}
function startSession(P,k){if(!P||!k)return false;S.prog=P.id;
  if(P.shape==='weeks'){const m=k.match(/^w(\d+)d(\d+)$/);if(m){S.week=+m[1];S.day=+m[2];}}else S.sess=k;
  save();playOpen(P.id,k,'home');return true;}
function act(a){const arg=a.arg||'';
  switch(a.type){
    case 'start_next_session':{const P=S.active&&progById(S.active),k=P&&nextOf(P.id);return startSession(P,k)?`Started ${sessionOf(P.id,k).title}`:'No current program to start from';}
    case 'start_session':{const[pid,k]=arg.split('|'),P=findProg(pid);return P&&k&&startSession(P,k)?`Started ${P.n}`:'Could not find that session';}
    case 'open_program':{const P=findProg(arg);if(!P)return`No program called ${arg}`;S.prog=P.id;progTab='sessions';save();show('program');renderProgram();return`Opened ${P.n}`;}
    case 'set_current_program':{const P=findProg(arg);if(!P)return`No program called ${arg}`;S.active=P.id;save();if(visibleView()==='home')renderHome();return`${P.n} is now your current program`;}
    case 'build_session':{if(!window.blockGenFrom)return'';blockGenFrom(window.blockParseToday?blockParseToday(arg):{});return'Built a session';}
    case 'open_view':{const v=/library/.test(arg)?'library':/setting/.test(arg)?'settings':'home';show(v);
      if(v==='home')renderHome();else if(v==='library')renderLibrary();else renderSettings();return`Opened ${v}`;}
    case 'open_exercise':{const k=findEx(arg);if(!k||!window.exOpen)return`No exercise called ${arg}`;exOpen(exOf({id:k}));return`Opened ${EX[k].n}`;}
    case 'log_set':{if(visibleView()!=='log'||!window.blockVoiceLog)return'Open a workout to log sets';blockVoiceLog(arg);return`Logged ${arg}`;}
  }return'';}
const MOVES=['start_next_session','start_session','open_program','build_session','open_view','open_exercise'];

/* ---------- context for the model ---------- */
function context(){const A=S.active&&progById(S.active),k=A&&nextOf(A.id);
  let recent='';try{const cut=Date.now()-14*864e5;
    recent=(S.sessions||[]).filter(s=>s.start>cut).map(s=>{const P=progById(s.prog);const n=(S.sets||[]).filter(r=>r.sid===s.id&&!r.warm&&!r.check).length;
      return`${new Date(s.start).toISOString().slice(0,10)} ${P?P.n:s.prog} · ${n} sets`;}).join('\n');}catch(e){}
  const progs=PROGRAMS.filter(P=>P.id!=='custom').map(P=>`${P.id}|${P.n}|${P.group||''}|${(P.type||[]).join('/')}|${progTotal(P)} sessions`).join('\n');
  return`Today: ${new Date().toISOString().slice(0,10)}. Screen: ${visibleView()}.
Current program: ${A?`${A.n} (${A.id}), ${progDone(A)} of ${progTotal(A)} done, next session: ${k?sessionOf(A.id,k).title+' ('+k+')':'none'}`:'none'}.
Last 14 days:\n${recent||'nothing logged'}
Programs (id|name|creator|type|length):\n${progs}`;}
const SYS_CHAT=`You are the assistant inside BLOCK., a training app. You can answer questions about training and the user's log, and you can act in the app with "actions":
- start_next_session (arg ""): starts the next session of the current program
- start_session (arg "programId|sessionKey")
- open_program (arg programId) · set_current_program (arg programId)
- build_session (arg: one-line description like "30 min upper body, dumbbells, sore knee") opens a generated session
- open_view (arg home|library|settings) · open_exercise (arg exercise name)
- log_set (arg like "60 kg 8 reps") only while a workout is open
Only act when the user asks for it or clearly wants it. Use [] for no action.
Reply in the user's language, short and concrete: one to three sentences, no lists, no markdown. Offer 2–4 short follow-up replies in "chips" (what the user is likely to tap next), or [] if none fit.`;
const SCHEMA=()=>{const A=blockAI;return A.obj({message:A.str,chips:A.arr(A.str),actions:A.arr(A.obj({type:{type:'string',enum:ACTIONS},arg:A.str}))});};

/* ---------- without a key: the common commands ---------- */
function localReply(t){const s=t.toLowerCase(),r={chips:[],actions:[]};
  if(/next|nästa|start(a)? (my|mitt)|kör igång/.test(s)){r.actions.push({type:'start_next_session',arg:''});r.text='Starting your next session.';return r;}
  if(/week|vecka/.test(s)){r.actions.push({type:'open_view',arg:'home'});r.text='Your week is on the home screen. Connect Claude or ChatGPT in Settings and I can write a real review.';return r;}
  if(/min|session|pass|build|bygg|workout|träna/.test(s)){r.actions.push({type:'build_session',arg:t});r.text='Here is a session from what you wrote.';return r;}
  const P=PROGRAMS.find(P=>s.includes(P.n.toLowerCase()));if(P){r.actions.push({type:'open_program',arg:P.id});r.text=`Opening ${P.n}.`;return r;}
  r.text=`I need ${who()} connected for that. Add an API key in Settings → AI coach. Until then I can start your next session or build one for you.`;
  r.chips=['Start my next session','Build me a 30 min session','Open settings'];if(/setting|inställ/.test(s)){r.actions.push({type:'open_view',arg:'settings'});r.chips=[];r.text='Opening Settings.';}
  return r;}

async function send(text){T.push({role:'user',text});busy=true;render();
  let r;
  if(window.blockAI&&blockAI.ready()){
    const hist=T.filter(t=>!t.local).slice(-12).map(t=>({role:t.role,content:t.text}));
    while(hist.length&&hist[0].role!=='user')hist.shift();
    const msgs=[];hist.forEach(m=>{const l=msgs[msgs.length-1];if(l&&l.role===m.role)l.content+='\n'+m.content;else msgs.push({...m});});
    try{const o=await blockAI.ask({system:SYS_CHAT+'\n\n'+context(),messages:msgs,schema:SCHEMA(),effort:'low',maxTokens:2000});
      r={text:o.message||'',chips:(o.chips||[]).slice(0,4),actions:(o.actions||[]).filter(a=>a&&a.type&&a.type!=='none')};}
    catch(e){r={text:e.message||'Something went wrong.',chips:['Try again'],actions:[]};if(/again/.test(text))r.chips=[];}
  }else r=localReply(text);
  busy=false;
  const done=[];let moved=false;
  for(const a of r.actions||[]){try{const d=act(a);if(d)done.push(d);if(MOVES.includes(a.type))moved=true;}catch(e){done.push('Could not do that');}}
  T.push({role:'assistant',text:r.text,chips:r.chips,done});render();
  if(moved)setTimeout(close,700);}
window.blockChat={open,send};

/* the bubble steps aside during a workout and while the drawer is open */
function syncBub(){const v=visibleView(),hide=v==='log'||v==='play'||box.classList.contains('on');bub.classList.toggle('off',hide);}
const _show=show;show=function(v){_show(v);if(box.classList.contains('on')&&(v==='log'||v==='play'))close();setTimeout(syncBub,0);paintBub();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&box.classList.contains('on'))close();});
syncBub();
})();
