/* BLOCK. chat: a floating bubble (Claude or ChatGPT mark in the accent colour)
   that opens a drawer. Ask anything about your training, or tell it what to do:
   start the next session, open a program, build a session, log a set.
   Answers come one at a time in a card, with quick replies when they fit. Uses blockAI (ai.js); without a
   key a small local reader handles the common commands. */
(function(){
const css=`
.aibub{position:fixed;right:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 18px + var(--gbar,0px));z-index:70;width:58px;height:58px;border-radius:50%;
  display:grid;place-items:center;background:#141416;border:1px solid var(--line);color:var(--accent);box-shadow:0 10px 30px rgba(0,0,0,.5);cursor:pointer;
  transition:transform .2s cubic-bezier(.2,.8,.2,1),opacity .2s}
.aibub:active{transform:scale(.94)}
.aibub.off{opacity:0;pointer-events:none;transform:scale(.8)}
.aichat{position:fixed;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 12px + var(--gbar,0px));z-index:80;max-width:620px;margin:0 auto;
  transform:translateY(calc(100% + 40px + var(--gbar,0px)));transition:transform 300ms cubic-bezier(.32,.72,0,1);pointer-events:none}
.aichat.on{transform:none;pointer-events:auto}
.aipanel{background:#141416;border:1px solid var(--line);border-radius:24px;padding:0 12px 12px;box-shadow:0 20px 60px rgba(0,0,0,.6)}
/* the handle sits in the panel's top margin; drag it down to close, tap it to fold the answer */
.aitop{position:relative;height:22px;touch-action:none;cursor:grab}
.aihandle{position:absolute;left:50%;top:9px;width:40px;height:5px;margin-left:-20px;border-radius:3px;background:rgba(255,255,255,.28);border:0;padding:0;cursor:grab}
.aihandle::after{content:'';position:absolute;inset:-12px -40px}
.aihandle:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
.aibody{display:grid;grid-template-rows:1fr;transition:grid-template-rows 260ms cubic-bezier(.23,1,.32,1),opacity 200ms ease}
.aibody>div{min-height:0;overflow:hidden}
.aichat.min .aibody{grid-template-rows:0fr;opacity:0}
.aicard{background:#1f1f22;border-radius:18px;padding:14px 16px 18px;margin:0 0 10px}
.aiwho{display:flex;align-items:center;gap:7px;min-height:32px;font-size:13px;color:var(--dim);font-weight:600}
.aiwho>svg{color:var(--accent)}
.aimin{position:relative;margin-left:auto;width:32px;height:32px;border-radius:50%;background:none;border:0;color:var(--dim);display:grid;place-items:center;cursor:pointer;transition:transform 140ms ease-out}
.aimin::after{content:'';position:absolute;inset:-6px}
.aimin:active{transform:scale(.92)}
@media (hover:hover) and (pointer:fine){.aimin:hover{color:#fff;background:#2a2a2e}}
.aiscroll{max-height:min(48vh,440px);overflow-y:auto;overscroll-behavior:contain}
.aimsg{margin:6px 0 0;font:inherit;font-size:18px;font-weight:500;line-height:1.42;letter-spacing:-.005em;color:#fff;white-space:pre-wrap;animation:aiin 240ms cubic-bezier(.23,1,.32,1)}
@keyframes aiin{from{opacity:0;transform:translateY(4px)}}
.aichips{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px}
.aichips button{min-height:40px;padding:8px 14px;border-radius:12px;border:1px solid var(--line);background:var(--surface-2);color:#fff;font:inherit;font-size:15px;font-weight:600;text-align:left;cursor:pointer;
  transition:transform 140ms ease-out,background-color 140ms ease,border-color 140ms ease,color 140ms ease}
.aichips button:active{transform:scale(.97)}
.aichips button[disabled]{cursor:default;opacity:1}
.aiscroll>.aichips:first-child{margin-top:8px}
.aichips button.on{background:var(--accent);border-color:var(--accent);color:#000}
@media (hover:hover) and (pointer:fine){.aichips button:hover{border-color:rgba(255,255,255,.4)}}
.aidone{margin:12px 0 0;font-size:13px;font-weight:600;color:var(--accent)}
.aidots{display:flex;gap:6px;padding:14px 2px 6px}
.aidots i{width:7px;height:7px;border-radius:50%;background:var(--dim);animation:aidot 1s infinite ease-in-out}
.aidots i:nth-child(2){animation-delay:.15s}.aidots i:nth-child(3){animation-delay:.3s}
@keyframes aidot{0%,80%,100%{opacity:.25}40%{opacity:1}}
@media (prefers-reduced-motion:reduce){.aichat,.aibub,.aibody{transition:none}.aidots i,.aimsg{animation:none}}
.aiin{display:flex;align-items:center;gap:10px;padding:6px 6px 6px 18px;border-radius:16px;background:#fff}
.aiin input{flex:1;min-width:0;border:0;background:none;color:#000;font:inherit;font-size:17px;padding:10px 0;outline:none}
.aiin input::placeholder{color:#8a8a8a}
.aisend{flex:none;width:44px;height:44px;border-radius:12px;border:0;background:#e6e6e6;color:#8a8a8a;display:grid;place-items:center;cursor:pointer;transition:background-color 140ms ease,color 140ms ease,transform 140ms ease-out}
.aisend:active{transform:scale(.94)}
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
const CHEV_D='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
box.innerHTML=`<div class="aipanel"><div class="aitop"><button class="aihandle" type="button" aria-label="Fold the answer. Drag down to close."></button></div>
  <div class="aibody"><div><div class="aicard"><div class="aiwho"><span class="aimk"></span><span class="ainame"></span>
    <button class="aimin" type="button" aria-label="Hide the answer">${CHEV_D}</button></div><div class="aiscroll" aria-live="polite"></div></div></div></div>
  <form class="aiin"><input type="text" autocomplete="off" enterkeyhint="send" placeholder="Ask me anything…" aria-label="Message">
  <button class="aisend" type="submit" aria-label="Send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button></form></div>`;
document.body.append(bub,box);
const thread=box.querySelector('.aiscroll'),form=box.querySelector('.aiin'),input=form.querySelector('input'),sendB=form.querySelector('.aisend');
const paintBub=()=>{bub.innerHTML=mark(28);bub.setAttribute('aria-label',`Ask ${who()}`);};paintBub();

/* ---------- conversation ---------- */
const T=[];let busy=false;
const GREET=()=>({role:'assistant',local:true,text:'What do you want to do today?',chips:['Start my next session','Build me a 30 min session','How was my week?','Which program fits me?']});
/* one answer at a time: the card shows the latest reply, or dots while it thinks */
function render(){
  box.querySelector('.aimk').innerHTML=mark(14);box.querySelector('.ainame').textContent=who();
  const last=[...T].reverse().find(t=>t.role==='assistant'),q=busy&&[...T].reverse().find(t=>t.role==='user');
  /* while it thinks, what you picked or asked stays lit in the accent */
  if(busy){thread.innerHTML=`${q?`<div class="aichips"><button type="button" class="on" disabled>${escH(q.text)}</button></div>`:''}<div class="aidots" aria-label="Thinking"><i></i><i></i><i></i></div>`;return;}
  const t=last||GREET();
  thread.innerHTML=`<p class="aimsg">${escH(t.text)}</p>${t.done&&t.done.length?`<p class="aidone">${t.done.map(escH).join(' · ')}</p>`:''}
    ${t.chips&&t.chips.length?`<div class="aichips">${t.chips.map(c=>`<button type="button">${escH(c)}</button>`).join('')}</div>`:''}`;
  thread.querySelectorAll('.aichips button').forEach(b=>b.onclick=()=>{if(busy)return;b.classList.add('on');setTimeout(()=>send(b.textContent),140);});
  thread.scrollTop=0;}
const fold=m=>{box.classList.toggle('min',m);box.querySelector('.aihandle').setAttribute('aria-label',m?'Show the answer. Drag down to close.':'Fold the answer. Drag down to close.');};
function open(){paintBub();if(!T.length)T.push(GREET());render();fold(false);box.classList.add('on');bub.classList.add('off');
  if(matchMedia('(pointer:fine)').matches)setTimeout(()=>input.focus(),300);}
function close(){box.classList.remove('on');box.style.transform='';box.style.transition='';input.blur();syncBub();setTimeout(()=>{if(!box.classList.contains('on'))fold(false);},320);}
bub.onclick=open;
/* the chevron folds the answer away and leaves the input; the handle toggles it back */
box.querySelector('.aimin').onclick=()=>fold(true);
let dragged=false;const toggleFold=()=>fold(!box.classList.contains('min'));
/* pointer taps are handled by the drag code below; this covers Enter and Space */
box.querySelector('.aihandle').onclick=e=>{if(e.detail===0)toggleFold();};
input.oninput=()=>sendB.classList.toggle('ready',!!input.value.trim());
form.onsubmit=e=>{e.preventDefault();const t=input.value.trim();if(!t||busy)return;input.value='';sendB.classList.remove('ready');send(t);};
/* drag the handle: down closes the whole chat (a quick flick is enough), up unfolds the answer */
{const top=box.querySelector('.aitop');let y0=null,t0=0,dy=0,pid=null;
  /* move and up are followed on the window: the handle row is short and iOS does not always keep pointer capture,
     so a drag that leaves the row must still finish (and never leave the drawer stuck half-way with the bubble hidden) */
  top.addEventListener('pointerdown',e=>{if(y0!=null)return;y0=e.clientY;t0=performance.now();dy=0;dragged=false;pid=e.pointerId;box.style.transition='none';
    try{top.setPointerCapture(e.pointerId);}catch(err){}});
  window.addEventListener('pointermove',e=>{if(y0==null||e.pointerId!==pid)return;dy=e.clientY-y0;if(Math.abs(dy)>4)dragged=true;
    box.style.transform=`translateY(${dy>0?dy:-Math.sqrt(-dy)*2}px)`;},{passive:true});
  const end=e=>{if(y0==null||(e&&e.pointerId!==pid))return;const v=dy/Math.max(1,performance.now()-t0);y0=null;pid=null;box.style.transition='';box.style.transform='';
    if(!dragged){toggleFold();return;}if(dy>90||v>.5)close();else if(dy<-24)fold(false);};
  window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
  /* touch fallback: some iOS builds cancel pointer events mid-gesture; touchend still arrives */
  window.addEventListener('touchend',()=>{if(y0!=null)end();});}

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

async function send(text){T.push({role:'user',text});busy=true;fold(false);render();
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
/* a page with a sticky action bar (the generator) keeps it in view: bubble and chat sit just above it */
function lift(){const bar=[...document.querySelectorAll('.gbar')].find(b=>b.offsetParent!==null);
  document.documentElement.style.setProperty('--gbar',bar?`${Math.max(0,bar.offsetHeight-Math.round(parseFloat(getComputedStyle(bar).paddingBottom))+2)}px`:'0px');}
window.blockChatLift=lift;
function syncBub(){lift();const v=visibleView(),hide=v==='log'||v==='play'||box.classList.contains('on');bub.classList.toggle('off',hide);}
const _show=show;show=function(v){_show(v);if(box.classList.contains('on')&&(v==='log'||v==='play'))close();setTimeout(syncBub,0);paintBub();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&box.classList.contains('on'))close();});
syncBub();
})();
