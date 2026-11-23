/* BLOCK. home — fewer boxes. Cards are kept for what you act on (the next
   session); numbers sit on the page as type, programs and links are list rows,
   and each section gets a heading in the same style as the session blocks. */
(function(){
const css=`
#v-home .hsec,#v-home .grp,#homeCal .calhead b,#homeHealth .hkhead b{display:block;margin:0;font-size:20px;font-weight:800;letter-spacing:-.005em;text-transform:uppercase;color:#fff}
#v-home .grp{margin:38px 0 12px!important}
#v-home .hsech{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:38px 0 14px}

/* next session: the one big surface */
#homeNext .nextc{padding:20px 20px 18px;margin:4px 0 0;border-radius:22px}
#homeNext .nextc h3{font-size:28px;margin:2px 0 6px}
.hthumbs{display:flex;align-items:center;gap:6px;margin:16px 0 18px}
.hthumbs .th{border-radius:10px}
.hthumbs .more{color:var(--dim);font-size:13px;font-weight:700;margin-left:4px}
#homeNext .pacts{margin-top:0}
.hlink{display:flex;align-items:center;gap:10px;width:100%;padding:14px 2px;color:var(--dim);font-size:15px;font-weight:600}
.hlink i{font-style:normal;color:var(--accent);font-size:20px;line-height:1;width:20px;text-align:center}
.hlink b{color:#fff;font-weight:600}

/* week: days on the page, the day as a line */
#homeCal{margin-top:8px}
#homeCal .calhead{margin:38px 0 14px}
#homeCal .calhead button{background:none;padding:6px 0 6px 10px;color:var(--dim)}
#homeCal .cd{background:none;height:58px;border-radius:999px}
#homeCal .cgrid.month .cd{height:42px}
#homeCal .cd.sel{background:#fff}
#homeCal .cd.has::after{background:var(--accent)}
#homeCal .cd.sel.has::after{background:#000}
#homeCal .dayp{background:none;border-radius:0;padding:12px 2px 0;margin:4px 0 0;border-top:1px solid var(--line)}
#homeCal .dayp .dlab{color:#fff;font-size:15px;letter-spacing:0;margin:0 0 2px}
#homeCal #calLog{background:none;width:auto!important;padding:10px 0 0!important;margin:0!important;color:var(--accent-text);font-weight:600}
#homeCal .cform{margin-top:10px}

/* overview: numbers as type */
.hstats{display:grid;grid-template-columns:repeat(3,1fr);margin:16px 0 6px}
.hstats>div{padding:0 14px;border-left:1px solid var(--line);min-width:0}
.hstats>div:first-child{padding-left:2px;border-left:0}
.hstats b{display:block;font-size:30px;font-weight:800;letter-spacing:-.03em;line-height:1.05;font-variant-numeric:tabular-nums}
.hstats b small{font-size:15px;font-weight:700;color:var(--dim);margin-left:2px}
.hstats span{display:block;color:var(--dim);font-size:12px;margin-top:4px}
.hdelta{color:var(--dim-2);font-size:12px;margin:8px 2px 0}
.hbars{margin:22px 0 0}
.hbars h4,.hlist h4{margin:0 0 4px;color:var(--dim);font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase}
.hbars .pbar span{width:112px}
.hbars .pbar i em{background:var(--accent)}
.hlhead{display:flex;align-items:center;gap:10px}
.hlhead .hlt{display:flex;gap:4px;flex:1}
.hlhead .hlt button{padding:5px 10px;border-radius:999px;font-size:13px;font-weight:600;color:var(--dim);background:transparent}
.hlhead .hlt button.on{background:var(--surface);color:#fff}
.hlx{font-size:13px;font-weight:600;color:var(--accent-text);padding:6px 0}
.hlsub{margin:6px 0 0;color:var(--dim-2);font-size:13px}
.hlcar{display:flex;align-items:flex-start;transition:height .25s ease;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin:0 -20px;overscroll-behavior-x:contain}
.hlcar::-webkit-scrollbar{display:none}
.hlcar>section{flex:0 0 100%;scroll-snap-align:start;padding:0 20px;box-sizing:border-box}
.hlex{margin:4px 0 10px 122px;font-size:13px;color:var(--dim);line-height:1.6}
.hlex div{display:flex;justify-content:space-between;gap:10px}
.hlex div b{color:var(--dim-2);font-weight:600}
.hldots{display:flex;justify-content:center;gap:6px;margin-top:12px}
.hldots i{width:6px;height:6px;border-radius:50%;background:var(--surface-2)}
.hldots i.on{background:var(--accent)}
.hstreak{margin:22px 2px 0;padding-top:14px;border-top:1px solid var(--line);color:var(--dim);font-size:15px;display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.hstreak b{color:var(--accent);font-size:22px;font-weight:800;margin-right:4px}

/* health: one line until it has data */
#homeHealth .hkhead{margin:38px 0 14px}
#homeHealth .hkhead button{background:none;padding:6px 0 6px 10px}
#homeHealth .hkhead button.on{background:none;color:var(--accent-text)}
#homeHealth .ovstat{background:none;padding:0 2px}
#homeHealth .ovstats{gap:18px}
.hhrow{display:flex;align-items:center;gap:12px;padding:14px 2px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:30px}
.hhrow>span{flex:1;min-width:0}
.hhrow b{display:block;font-size:15px;font-weight:700}
.hhrow small{display:block;color:var(--dim);font-size:12px;margin-top:2px}
.hhrow button{flex:none;color:var(--accent-text);font-size:14px;font-weight:600;padding:6px 0 6px 10px}
.hhrow button+button{color:var(--dim)}

/* programs and links: list rows */
.hlist{margin:0}
.hrowp small{white-space:normal}
.hrowp{display:flex;align-items:flex-start;gap:12px;width:100%;padding:16px;margin:0 0 10px;background:var(--surface);border-radius:18px;text-align:left}
.hrowp:active,.hcur:active{background:var(--surface-2)}
.hrowp .ey,.hcur .ey{display:block;font-style:normal;font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--dim-2);margin-bottom:6px}
.hcur .ey{color:var(--accent)}
.hrowp>span:first-child{flex:1;min-width:0}
.hrowp b{display:block;font-size:18px;font-weight:700;letter-spacing:-.01em}
.hrowp small{display:block;color:var(--dim);font-size:13px;margin-top:3px}
.hrowp .n{flex:none;color:var(--dim);font-size:12px;font-weight:600;font-variant-numeric:tabular-nums;margin-top:1px}
.hrowp .chev{flex:none;color:var(--dim-2);font-size:20px;line-height:1;margin-top:-2px}
.hcur{background:var(--surface);border-radius:18px;padding:16px;margin:0 0 10px;width:100%;text-align:left;display:block;box-shadow:inset 0 0 0 1.5px var(--accent-soft)}
.hcur b{display:block;font-size:20px;font-weight:800;letter-spacing:-.015em}
.hcur small{display:block;color:var(--dim);font-size:13px;margin-top:3px}
.hcur .bar{height:4px;border-radius:999px;background:var(--surface-2);margin-top:12px;overflow:hidden}
.hcur .bar i{display:block;height:100%;background:var(--accent);border-radius:999px}
#v-home .sec{background:none;border-radius:0;border-top:1px solid var(--line);padding:15px 2px;margin:0}
#v-home .sec:last-of-type{border-bottom:1px solid var(--line)}
#v-home .sec b{font-size:16px}
#v-home .foot{margin-top:40px}`;
document.head.insertAdjacentHTML('beforeend',`<style id="homecss">${css}</style>`);

/* ----- next session ----- */
const _renderNext=renderNext;
renderNext=function(){_renderNext();
  const box=document.getElementById('homeNext'),P=S.active?progById(S.active):null,k=P?nextOf(P.id):null;
  const card=box.querySelector('.nextc');
  if(card&&P&&k&&window.blockThumb){
    const items=realItems(sessionOf(P.id,k).items),show=items.slice(0,5);
    const strip=document.createElement('div');strip.className='hthumbs';
    strip.innerHTML=show.map(x=>blockThumb(exFor(x.item,logKey(P.id,k,x.idx)),44)).join('')+(items.length>show.length?`<span class="more">+${items.length-show.length}</span>`:'');
    const acts=card.querySelector('.pacts');if(acts)acts.before(strip);}
  const own=document.getElementById('nOwn');
  if(own){own.className='hlink';own.innerHTML='<i>+</i><span><b>Own session</b> · pick exercises and go</span>';}
};

/* ----- overview ----- */
renderOverview=function(){
  const box=document.getElementById('homeOv'),[from,to,prevFrom]=periodRange(OVP);
  const inR=(t,a,b)=>t>=a&&t<=b;
  const ss=S.sessions.filter(s=>liveSess(s)&&inR(s.start,from,to));
  const ps=prevFrom!=null?S.sessions.filter(s=>liveSess(s)&&inR(s.start,prevFrom,from)).length:null;
  const recs=S.sets.filter(r=>inR(r.t,from,to));
  const sets=recs.filter(r=>!r.check&&!r.warm&&r.score==null).length;
  const time=ss.reduce((a,s)=>a+durOf(s),0)/1000;
  const sc=recs.filter(r=>r.score!=null);
  const st=streak();
  const delta=ps==null?'':(ss.length-ps===0?'Same number of sessions as the period before':`${ss.length-ps>0?'+':''}${ss.length-ps} sessions vs the previous ${OVP} days`);
  const h=Math.floor(time/3600),m=Math.round(time%3600/60);
  const tTxt=time>=3600?`${h}:${String(m).padStart(2,'0')}<small>h</small>`:`${m}<small>min</small>`;
  box.innerHTML=`<div class="hsech"><span class="hsec">Overview</span></div>
    <div class="chips">${PERIODS.map(([v,l])=>`<button data-p="${v}" class="${String(v)===String(OVP)?'on':''}">${l}</button>`).join('')}</div>
    <div class="hstats"><div><b>${ss.length}</b><span>Sessions</span></div><div><b>${sets}</b><span>Sets</span></div><div><b>${tTxt}</b><span>Training</span></div></div>
    ${delta?`<p class="hdelta">${delta}${sc.length?` · ${sc.length} score${sc.length===1?'':'s'} logged`:''}</p>`:''}
    ${loadHTML(recs)}
    <div class="hstreak"><span><b>${st.n}</b>week${st.n===1?'':'s'} streak</span><span>This week ${st.thisW} of ${st.goal}</span></div>`;
  box.querySelectorAll('.chips button').forEach(b=>b.onclick=()=>{const v=b.dataset.p;OVP=isNaN(+v)?v:+v;renderOverview();});
  wireLoad(box);
};

/* ----- load by pattern / plane: swipe between the two, expand to see the exercises behind each bar ----- */
const PAT2=[
  ['Carry',/carry|farmer|suitcase|yoke/],
  ['Rotation',/twist|chop|rotat|grappler|windmill|russian|pallof|turn\b/],
  ['Hinge',/pull[\s-]?through|swing|deadlift|\brdl\b|hinge|clean|snatch|good morning|hyper|back ext|jefferson|hip thrust|glute bridge|high pull|nordic|leg curl|hamstring curl|kb overs|rack pull/],
  ['Lunge',/lunge|split squat|bulgarian|step[\s-]?up|cossack|skater|pistol|single leg squat/],
  ['Squat',/squat|thruster|zercher|leg press|wall sit|leg ext/],
  ['Vertical push',/overhead|\bohp\b|military|push press|jerk|handstand|hspu|pike push|landmine press|z press|\bdips?\b/],
  ['Horizontal push',/bench|push[\s-]?ups?|pushup|floor press|chest press|\bfly|press/],
  ['Vertical pull',/pull[\s-]?ups?|chin|pulldown|muscle[\s-]?up|rope climb|pullover/],
  ['Horizontal pull',/\brows?\b|face pull|rear delt|reverse fly|inverted/],
  ['Arms',/curl|tricep|skull|extension/]];
const PAT_ORDER=['Squat','Lunge','Hinge','Horizontal push','Vertical push','Horizontal pull','Vertical pull','Carry','Rotation','Arms','Other'];
const PLANE=[['Transverse',/twist|chop|rotat|grappler|windmill|russian|pallof|turn\b|\bfly|face pull|throw|slam|landmine/],
  ['Frontal',/lateral|side|cossack|skater|abduct|adduct|copenhagen|suitcase|jack|carioca|straddle|offset/]];
const pat2=n=>{n=(n||'').toLowerCase();for(const[p,re]of PAT2)if(re.test(n))return p;return'Other';};
const plane=n=>{n=(n||'').toLowerCase();for(const[p,re]of PLANE)if(re.test(n))return p;return'Sagittal';};
let LOADX=false,LOADPG=0;
window.BLOCK_PATTERNS=PAT_ORDER.slice(0,10);
window.blockPat=pat2;window.blockPlane=plane;
function loadHTML(recs){
  const work=recs.filter(r=>r.score==null&&!r.warm&&!r.check);
  const group=(fn,order,keep)=>{const g={};order.forEach(k=>g[k]={n:0,ex:{}});
    work.forEach(r=>{const k=fn(r);g[k].n++;g[k].ex[r.name]=(g[k].ex[r.name]||0)+1;});
    return order.filter(k=>g[k].n||keep.includes(k)).map(k=>[k,g[k]]);};
  const page=rows=>{const max=Math.max(1,...rows.map(r=>r[1].n));
    return rows.map(([k,v])=>`<div class="pbar"><span>${k}</span><i><em style="width:${v.n/max*100}%"></em></i><b>${v.n}</b></div>`
      +(LOADX&&v.n?`<div class="hlex">${Object.entries(v.ex).sort((a,b)=>b[1]-a[1]).map(([n,c])=>`<div><span>${esc(n)}</span><b>${c} set${c===1?'':'s'}</b></div>`).join('')}</div>`:'')).join('');};
  const tag=(r,f)=>(EX[r.ex]||{})[f];
  const P=group(r=>tag(r,'pat')||pat2(r.name),PAT_ORDER,PAT_ORDER.slice(0,9)),L=group(r=>tag(r,'pl')||plane(r.name),['Sagittal','Frontal','Transverse'],['Sagittal','Frontal','Transverse']);
  return `<div class="hbars"><div class="hlhead"><div class="hlt" role="tablist">${['Pattern','Plane'].map((t,i)=>`<button role="tab" data-pg="${i}" class="${LOADPG===i?'on':''}" aria-selected="${LOADPG===i}">${t}</button>`).join('')}</div>
    ${work.length?`<button class="hlx" aria-expanded="${LOADX}">${LOADX?'Collapse':'Expand'}</button>`:''}</div>
    <p class="hlsub">Work sets logged in this period. Warm-ups and scored rounds are left out. Swipe to see ${LOADPG?'patterns':'planes'}.</p>
    <div class="hlcar"><section aria-label="By movement pattern">${page(P)}</section><section aria-label="By movement plane">${page(L)}</section></div>
    <div class="hldots" aria-hidden="true"><i class="${LOADPG?'':'on'}"></i><i class="${LOADPG?'on':''}"></i></div></div>`;
}
function wireLoad(box){
  const car=box.querySelector('.hlcar');if(!car)return;
  let hold=0;
  const go=(i,smooth)=>{const x=i*car.clientWidth;hold=Date.now()+600;car.scrollTo({left:x,behavior:smooth?'smooth':'auto'});
    setTimeout(()=>{if(Math.abs(car.scrollLeft-x)>2)car.scrollLeft=x;},smooth?450:30);};
  requestAnimationFrame(()=>go(LOADPG,false));
  const fit=i=>{const sec=car.children[i];if(sec)car.style.height=sec.offsetHeight+'px';};
  requestAnimationFrame(()=>fit(LOADPG));
  const mark=i=>{LOADPG=i;fit(i);box.querySelectorAll('.hlt button').forEach((b,j)=>{b.classList.toggle('on',j===i);b.setAttribute('aria-selected',j===i);});
    box.querySelectorAll('.hldots i').forEach((d,j)=>d.classList.toggle('on',j===i));
    const sub=box.querySelector('.hlsub');if(sub)sub.textContent=sub.textContent.replace(/Swipe to see \w+\./,`Swipe to see ${i?'patterns':'planes'}.`);};
  car.addEventListener('scroll',()=>{if(Date.now()<hold)return;const i=Math.round(car.scrollLeft/Math.max(1,car.clientWidth));if(i!==LOADPG)mark(i);},{passive:true});
  box.querySelectorAll('.hlt button').forEach(b=>b.onclick=()=>{const i=+b.dataset.pg;mark(i);go(i,true);});
  const x=box.querySelector('.hlx');if(x)x.onclick=()=>{LOADX=!LOADX;renderOverview();};
}

/* ----- health: a single row until there is data ----- */
const _renderHealth=renderHealth;
renderHealth=function(){_renderHealth();
  const box=document.getElementById('homeHealth');
  const any=hkSeries('weight').length||hkSeries('steps').length||Object.keys(S.health).some(k=>hkSeries(k).length);
  if(any||HK_PASTE||HK_MSG)return;
  const help=document.getElementById('hkHelp'),imp=document.getElementById('hkImp');
  const row=document.createElement('div');row.className='hhrow';
  row.innerHTML='<span><b>Apple Health</b><small>Bring in weight and steps with a Shortcut</small></span>';
  help.textContent='Set up';imp.textContent='Import';imp.className='';row.append(help,imp);
  box.innerHTML='';box.append(row);
};

/* ----- programs as a list, the current one on top ----- */
const _renderHome=renderHome;
renderHome=function(){_renderHome();
  const box=document.getElementById('progList');if(!box)return;
  const list=PROGRAMS.filter(P=>P.id!=='custom'||(S.custom&&S.custom.length));
  const cur=list.find(P=>P.id===S.active);
  const open=P=>{S.prog=P.id;progTab='sessions';save();show('program');renderProgram();};
  let h='';
  if(cur){const d=progDone(cur),t=progTotal(cur);
    h+=`<button class="hcur" data-p="${cur.id}"><em class="ey">Current program · ${t} sessions</em><b>${esc(cur.n)}</b><small>${esc(cur.sub)}</small>
      <div class="bar"><i style="width:${t?Math.round(d/t*100):0}%"></i></div><small>${d} of ${t} sessions done</small></button>`;}
  h+=`<div class="hlist">${list.filter(P=>P!==cur).map(P=>`<button class="hrowp" data-p="${P.id}"><span><em class="ey">${progTotal(P)} sessions</em><b>${esc(P.n)}</b><small>${esc(P.sub)}</small></span>
    <span class="n">${progDone(P)}/${progTotal(P)}</span><span class="chev">›</span></button>`).join('')}</div>`;
  box.innerHTML=h;
  box.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>open(progById(b.dataset.p)));
};
/* health sits after the overview, so the top of the page is the session and the week */
{const hh=document.getElementById('homeHealth'),ov=document.getElementById('homeOv');if(hh&&ov)ov.after(hh);}
renderHome();
})();
