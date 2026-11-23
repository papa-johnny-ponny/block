/* BLOCK. exercise page — About (video, muscles, strength level, similar),
   Records (best weight per rep count, best reps per weight), Stats (charts over
   time) and History. Opens from the ? on an exercise, the library and grip tips. */
(function(){
const css=`
#v-ex{padding-bottom:60px}
.extop{position:sticky;top:0;z-index:20;margin:0 -20px;padding:calc(env(safe-area-inset-top,0px) + 10px) 20px 0;background:rgba(0,0,0,.9);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.exhead{display:flex;align-items:center;gap:12px}
.exhead h2{flex:1;min-width:0;margin:0;font-size:20px;font-weight:800;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.extabs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin:12px -20px 0;padding:0 20px 12px}
.extabs::-webkit-scrollbar{display:none}
.extabs button{flex:none;padding:8px 14px;border-radius:999px;background:var(--surface);color:var(--dim);font-size:14px;font-weight:600}
.extabs button.on{background:#fff;color:#000}
.exsec{margin:28px 0 0}
.exsec>h3{margin:0 0 12px;font-size:20px;font-weight:800;text-transform:uppercase;letter-spacing:-.005em}
.exsec>h4{margin:0 0 8px;color:var(--dim);font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase}
.exvid{border-radius:16px;overflow:hidden;background:#000;aspect-ratio:16/9;position:relative;margin-top:14px}
.exvid iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.exlink{display:inline-block;margin-top:10px;color:var(--accent-text);font-size:14px;font-weight:600;text-decoration:none}
.exdesc{color:var(--dim);font-size:15px;line-height:1.5;margin:14px 0 0}
.exsteps{list-style:none;margin:0;padding:0;counter-reset:st}
.exsteps li{counter-increment:st;display:grid;grid-template-columns:28px 1fr;gap:12px;align-items:start;font-size:15px;line-height:1.5;padding:9px 0}
.exsteps li+li{border-top:1px solid var(--line)}
.exsteps li::before{content:counter(st);width:28px;height:28px;border-radius:50%;background:var(--surface);color:var(--accent-text);display:grid;place-items:center;font-size:13px;font-weight:800;margin-top:-2px}
.exmus{display:grid;grid-template-columns:1fr 1fr;gap:6px 18px;margin-top:14px}
.exmus h4{margin:0 0 4px;color:var(--dim-2);font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase}
.exmus p{margin:0;font-size:15px;line-height:1.5;text-transform:capitalize}
.exsim .xr{padding:10px 0}
.exsim .xr+.xr{border-top:1px solid var(--line);border-radius:0}
.exlvl{background:var(--surface);border-radius:18px;padding:16px}
.exlvl .lv{font-size:24px;font-weight:800;color:var(--accent);letter-spacing:-.01em}
.exlvl .lvs{color:var(--dim);font-size:13px;margin-top:2px}
.lvbar{position:relative;display:grid;grid-template-columns:repeat(5,1fr);gap:2px;margin:16px 0 6px;height:8px}
.lvbar i{border-radius:2px;background:var(--accent)}
.lvbar i:first-child{border-radius:999px 2px 2px 999px}.lvbar i:last-child{border-radius:2px 999px 999px 2px}
.lvbar em{position:absolute;top:-5px;width:4px;height:18px;margin-left:-2px;border-radius:2px;background:#fff;box-shadow:0 0 0 2px var(--surface)}
.lvlab{display:grid;grid-template-columns:repeat(5,1fr);font-size:10px;color:var(--dim-2);font-weight:600}
.lvin{display:flex;gap:8px;align-items:center;margin-top:14px;flex-wrap:wrap}
.lvin input{width:92px;padding:9px 11px;font-size:15px}
.lvin span{color:var(--dim);font-size:13px}
.lvin .seg{display:flex;gap:4px;margin-left:auto}
.lvin .seg button{padding:7px 12px;border-radius:999px;background:var(--surface-2);color:var(--dim);font-size:13px;font-weight:600}
.lvin .seg button.on{background:#fff;color:#000}
.exrow{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:13px 2px;border-top:1px solid var(--line)}
.exrow:last-child{border-bottom:1px solid var(--line)}
.exrow span{color:var(--dim);font-size:14px}
.exrow b{font-size:17px;font-weight:700;font-variant-numeric:tabular-nums}
.exrow small{display:block;color:var(--dim-2);font-size:12px;font-weight:500;text-align:right}
.exhero{display:flex;align-items:baseline;gap:8px;margin:18px 0 4px}
.exhero b{font-size:44px;font-weight:800;letter-spacing:-.03em;line-height:1}
.exhero span{color:var(--dim);font-size:15px}
.exnote{color:var(--dim-2);font-size:12px;margin:6px 0 0}
.exempty{color:var(--dim);font-size:15px;margin:28px 0 0}
.chart{position:relative;margin-top:8px}
.chart svg{display:block;width:100%;height:auto;overflow:visible;touch-action:pan-y}
.chart .tip{position:absolute;top:0;transform:translate(-50%,-100%);background:#fff;color:#000;border-radius:8px;padding:5px 8px;font-size:12px;font-weight:700;white-space:nowrap;pointer-events:none;display:none}
.chart .tip small{display:block;font-weight:500;color:#555;font-size:11px}
.exstat{display:grid;grid-template-columns:repeat(3,1fr);margin:18px 0 0}
.exstat>div{padding:0 12px;border-left:1px solid var(--line)}
.exstat>div:first-child{padding-left:2px;border-left:0}
.exstat b{display:block;font-size:26px;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.exstat span{color:var(--dim);font-size:12px}
.exhist .exrow b{font-size:14px;font-weight:600;text-align:right;max-width:62%}
.exvl{display:flex;gap:8px;margin-top:12px}
.exvl input{flex:1;font-size:14px;padding:10px 12px}
/* finish dialog */
.lgdlg{position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.65);display:grid;place-items:end center;padding:16px}
.lgdlg>div{width:min(440px,100%);background:#1c1c1f;border:1px solid var(--line);border-radius:22px;padding:20px;margin-bottom:env(safe-area-inset-bottom,0px)}
.lgdlg h3{margin:0 0 4px;font-size:20px;font-weight:800}
.lgdlg p{margin:0 0 16px;color:var(--dim);font-size:14px}
.lgdlg button{display:block;width:100%;text-align:center;border-radius:14px;padding:14px;font-size:16px;font-weight:700;margin-top:8px;background:var(--surface-2)}
.lgdlg button.go{background:#fff;color:#000}`;
document.head.insertAdjacentHTML('beforeend',`<style id="excss">${css}</style>`);

const view=document.createElement('div');view.id='v-ex';view.className='wrap hide';
(document.getElementById('v-log')||document.getElementById('v-play')).after(view);
const VIEWS=['home','program','session','library','settings','log'];
const visibleView=()=>VIEWS.find(v=>{const el=document.getElementById('v-'+v);return el&&!el.classList.contains('hide');})||'home';
let X=null;   // {ex, tab, from, rec:'w'|'r', per}

/* ----- data ----- */
const workRecs=key=>S.sets.filter(r=>r.ex===key&&!r.check&&!r.warm&&r.score==null);
const e1=r=>r.kg&&r.reps&&r.reps<=12?Math.round(epley(r.kg,r.reps)*2)/2:null;
function bySession(recs){const m=new Map();recs.forEach(r=>{if(!m.has(r.sid))m.set(r.sid,[]);m.get(r.sid).push(r);});
  return[...m.values()].map(g=>({t:g[0].t,recs:g})).sort((a,b)=>a.t-b.t);}
const STD={backsquat:[.75,1.25,1.5,2.25,2.75],frontsquat:[.6,1,1.25,1.75,2.25],deadlift:[1,1.5,2,2.5,3],bench:[.5,.75,1.25,1.5,2],
  mg_bench:[.5,.75,1.25,1.5,2],cg_bench:[.45,.7,1.1,1.35,1.75],ohp:[.35,.55,.8,1.05,1.35],row:[.5,.75,1,1.5,1.75]};
const LV=['Beginner','Novice','Intermediate','Advanced','Elite'];
function bodyweight(){if(S.bw)return S.bw;try{const w=hkSeries('weight');if(w.length)return +w[w.length-1][1];}catch(e){}return null;}
function bestE1(key){let b=null;workRecs(key).forEach(r=>{const v=e1(r);if(v&&(!b||v>b.v))b={v,r};});
  const m=S.max&&S.max[key];if(m&&m.value&&!m.alias&&(!b||m.value>b.v))b={v:m.value,max:true};return b;}

/* ----- open / close ----- */
function exOpen(ex){
  if(typeof ex==='string')ex=exOf({id:ex});
  const from=X?X.from:visibleView();
  X={ex,tab:'about',from,rec:'w',per:'all'};
  show('ex');render();window.scrollTo(0,0);
}
function exClose(){const f=X?X.from:'home';X=null;show(f);
  if(f==='home')renderHome();else if(f==='program')renderProgram();else if(f==='session')renderSession();else if(f==='library')renderLibrary();}
window.exOpen=exOpen;

/* ----- render ----- */
function render(){
  if(!X)return;const ex=X.ex;
  const tabs=[['about','About'],['records','Records'],['stats','Stats'],['history','History']];
  let h=`<div class="extop"><div class="exhead"><button class="pbtn" id="exBack" aria-label="Back">‹</button><h2>${esc(ex.n)}</h2></div>
    <div class="extabs" role="tablist">${tabs.map(([k,l])=>`<button role="tab" aria-selected="${X.tab===k}" class="${X.tab===k?'on':''}" data-t="${k}">${l}</button>`).join('')}</div></div>`;
  h+=X.tab==='about'?about(ex):X.tab==='records'?records(ex):X.tab==='stats'?stats(ex):history(ex);
  view.dataset.key=ex.key||'';view.innerHTML=h;wire();
}
function about(ex){
  const key=ex.key,url=(S.video||{})[key]||ex.v,vid=url?ytId(url):null;
  let h=vid?`<div class="exvid"><iframe src="https://www.youtube-nocookie.com/embed/${vid}?rel=0&playsinline=1" title="${esc(ex.n)}" allow="encrypted-media; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe></div>
      <a class="exlink" href="${esc(url)}" target="_blank" rel="noopener">Open on YouTube</a>`
    :`<a class="exlink" href="${esc(ytSearch(ex.n))}" target="_blank" rel="noopener">Search on YouTube</a>`;
  const d=ex.d||(EX[key]||{}).d;if(d)h+=`<p class="exdesc">${esc(d)}</p>`;
  const st=stepsOf(key,ex.n);
  if(st)h+=`<div class="exsec"><h3>How to</h3><ol class="exsteps">${st.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`;
  const mu=MU[key]||[];
  if(mu.length)h+=`<div class="exsec"><h3>Muscles worked</h3>${muscleMap([key])}
    <div class="exmus"><div><h4>Primary</h4><p>${mu.slice(0,2).map(esc).join('<br>')}</p></div><div><h4>Secondary</h4><p>${mu.slice(2).map(esc).join('<br>')||'–'}</p></div></div></div>`;
  if(STD[key])h+=level(key);
  const sim=similar(key,ex.n);
  if(sim.length)h+=`<div class="exsec exsim"><h3>Similar exercises</h3>${sim.map(k=>{const e=exOf({id:k});
    return `<button class="xr" data-ex="${k}">${window.blockThumb?blockThumb(e,44):''}<span class="xm"><b>${esc(e.n)}</b><span class="xl"><span>${esc((MU[k]||[]).slice(0,2).join(' · '))}</span></span></span><span class="chev">›</span></button>`;}).join('')}</div>`;
  h+=`<div class="exsec"><h4>Your own video link</h4><div class="exvl"><input id="exVl" placeholder="Paste a YouTube link" value="${esc((S.video||{})[key]||'')}"><button class="btn-s" id="exVs">Save</button></div></div>`;
  if(String(key).startsWith('u_')&&S.customEx&&S.customEx[key])h+=`<button class="btn-s" style="width:100%;margin-top:20px" id="exDel">Remove from library</button>`;
  return h;
}
/* step-by-step text: by EX key, else by plain name with counts/sides stripped ("5X Clean (R)" → "Clean") */
function stepsOf(key,name){const ST=window.BLOCK_STEPS||{};if(ST[key])return ST[key];
  if(/^(ig_|u_)/.test(String(key)))return null;/* own clips and exercises: no guessed steps */
  const n=String(name||'').replace(/^\s*[\d\-–\/]+\s*x\s+/i,'').replace(/\s*\([^)]*\)\s*$/,'').trim().toLowerCase();
  const hit=Object.keys(ST).find(k=>k.startsWith('x:')&&k.slice(2).toLowerCase()===n);if(hit)return ST[hit];
  const part=Object.keys(ST).filter(k=>k.startsWith('x:')).sort((a,b)=>b.length-a.length).find(k=>n.includes(k.slice(2).toLowerCase()));
  return part?ST[part]:null;}
window.blockSteps=stepsOf;
function similar(key,name){
  const mu=MU[key]||[],pat=patternOf(name),c=(EX[key]||{}).c;
  const score=k=>{if(k===key||!EX[k])return 0;const m=MU[k]||[];let s=0;
    if(mu[0]&&m[0]===mu[0])s+=3;if(mu.some(x=>m.slice(0,2).includes(x)))s+=1;
    if(pat&&patternOf(EX[k].n)===pat)s+=2;if(c&&EX[k].c===c)s+=.5;return s;};
  return Object.keys(EX).map(k=>[k,score(k)]).filter(x=>x[1]>=3).sort((a,b)=>b[1]-a[1]).slice(0,8).map(x=>x[0]);
}
function level(key){
  const bw=bodyweight(),sex=S.sex==='f'?'f':'m',best=bestE1(key);
  const t=STD[key].map(v=>v*(sex==='f'?.65:1));
  let body='';
  if(!bw)body=`<p class="lvs">Add your bodyweight to see where you stand.</p>`;
  else if(!best)body=`<p class="lvs">Log a set with weight and reps (up to 12) to get your level.</p>`;
  else{const r=best.v/bw;let i=-1;t.forEach((v,j)=>{if(r>=v)i=j;});
    const pos=i<0?Math.max(0,r/t[0])*20*0.5:Math.min(100,i*20+(i<4?Math.min(1,(r-t[i])/(t[i+1]-t[i])):1)*20);
    const next=i<4?Math.round(t[i+1]*bw*2)/2:null;
    body=`<div class="lv">${i<0?'Not yet beginner':LV[i]}</div>
      <div class="lvs">Best estimated 1RM ${best.v} kg · ${(r).toFixed(2)}× bodyweight${next?` · ${LV[i+1]} at ${next} kg`:''}</div>
      <div class="lvbar" aria-hidden="true">${LV.map((_,j)=>`<i style="opacity:${.25+j*.18}"></i>`).join('')}<em style="left:${pos}%"></em></div>
      <div class="lvlab">${LV.map(l=>`<span>${l}</span>`).join('')}</div>`;}
  return `<div class="exsec"><h3>Strength level</h3><div class="exlvl">${body}
    <div class="lvin"><input type="number" inputmode="decimal" id="exBw" value="${bw||''}" placeholder="kg" aria-label="Bodyweight in kg"><span>kg bodyweight</span>
      <div class="seg"><button data-sex="m" class="${sex==='m'?'on':''}" aria-label="Male standards">♂</button><button data-sex="f" class="${sex==='f'?'on':''}" aria-label="Female standards">♀</button></div></div>
    <p class="exnote">A rough guide from common bodyweight standards.</p></div></div>`;
}
function records(ex){
  const R=workRecs(ex.key);
  let h=`<div class="extabs" style="margin:16px 0 0;padding:0"><button data-rec="w" class="${X.rec==='w'?'on':''}">Weight</button><button data-rec="r" class="${X.rec==='r'?'on':''}">Reps</button></div>`;
  if(!R.length){const m=S.max&&S.max[ex.key];
    return h+`<p class="exempty">No sets logged yet.${m&&m.value&&!m.alias?` 1RM on file: ${m.value} kg.`:''}</p>`;}
  const withKg=R.filter(r=>r.kg),dt=t=>fmtDate(t);
  if(X.rec==='w'){
    if(!withKg.length)return h+`<p class="exempty">No sets with weight yet. Switch to Reps.</p>`;
    const b=bestE1(ex.key);
    if(b)h+=`<div class="exhero"><b>${b.v}</b><span>kg estimated 1RM${b.r?` · ${b.r.kg} × ${b.r.reps} on ${dt(b.r.t)}`:' · on file'}</span></div>`;
    h+=`<div class="exsec" style="margin-top:20px"><h4>Heaviest for at least</h4>`;
    const maxR=Math.min(15,Math.max(...withKg.map(r=>r.reps||0)));
    for(let n=1;n<=maxR;n++){let best=null;withKg.forEach(r=>{if((r.reps||0)>=n&&(!best||r.kg>best.kg))best=r;});
      if(best)h+=`<div class="exrow"><span>${n} rep${n>1?'s':''}</span><b>${best.kg} kg<small>${best.kg} × ${best.reps} · ${dt(best.t)}</small></b></div>`;}
    return h+`</div>`;}
  const m=new Map();R.forEach(r=>{const k=r.kg?+(+r.kg).toFixed(1):0;const c=m.get(k);if(r.reps&&(!c||r.reps>c.reps))m.set(k,r);});
  const rows=[...m.entries()].sort((a,b)=>b[0]-a[0]);
  const sess=bySession(R).map(s=>({t:s.t,n:s.recs.reduce((a,r)=>a+(+r.reps||0),0)})).sort((a,b)=>b.n-a.n)[0];
  if(sess)h+=`<div class="exhero"><b>${sess.n}</b><span>reps in one session · ${dt(sess.t)}</span></div>`;
  h+=`<div class="exsec" style="margin-top:20px"><h4>Most reps at</h4>${rows.map(([k,r])=>`<div class="exrow"><span>${k?k+' kg':'Bodyweight'}</span><b>${r.reps} reps<small>${dt(r.t)}</small></b></div>`).join('')}</div>`;
  return h;
}
const PER=[['3m','3 months',91],['6m','6 months',182],['1y','1 year',365],['all','All time',null]];
function stats(ex){
  const p=PER.find(x=>x[0]===X.per)||PER[3],from=p[2]?Date.now()-p[2]*864e5:0;
  const R=workRecs(ex.key).filter(r=>r.t>=from),S1=bySession(R);
  let h=`<div class="extabs" style="margin:16px 0 0;padding:0">${PER.map(([k,l])=>`<button data-per="${k}" class="${X.per===k?'on':''}">${l}</button>`).join('')}</div>`;
  if(!R.length)return h+`<p class="exempty">Nothing logged in this period.</p>`;
  const vol=R.reduce((a,r)=>a+(+r.kg||0)*(+r.reps||0),0);
  h+=`<div class="exstat"><div><b>${S1.length}</b><span>Sessions</span></div><div><b>${R.length}</b><span>Sets</span></div><div><b>${Math.round(vol).toLocaleString('en-GB')}</b><span>Volume · kg</span></div></div>`;
  const series=[
    ['Estimated 1RM','kg',S1.map(s=>({t:s.t,v:Math.max(0,...s.recs.map(e1).filter(Boolean))})).filter(x=>x.v>0)],
    ['Heaviest set','kg',S1.map(s=>({t:s.t,v:Math.max(0,...s.recs.map(r=>+r.kg||0))})).filter(x=>x.v>0)],
    ['Volume per session','kg',S1.map(s=>({t:s.t,v:Math.round(s.recs.reduce((a,r)=>a+(+r.kg||0)*(+r.reps||0),0))})).filter(x=>x.v>0)],
    ['Reps per session','reps',S1.map(s=>({t:s.t,v:s.recs.reduce((a,r)=>a+(+r.reps||0),0)})).filter(x=>x.v>0)]];
  series.forEach(([title,unit,pts],i)=>{if(!pts.length)return;
    const last=pts[pts.length-1],first=pts[0],d=pts.length>1?last.v-first.v:null;
    h+=`<div class="exsec"><h4>${title}</h4><div class="exhero" style="margin:4px 0 0"><b style="font-size:30px">${last.v.toLocaleString('en-GB')}</b><span>${unit}${d!=null&&d!==0?` · ${d>0?'+':''}${(+d.toFixed(1)).toLocaleString('en-GB')} since ${fmtDate(first.t)}`:''}</span></div>
      ${chart(pts,unit,'c'+i)}</div>`;});
  return h;
}
/* single-series line: 2px line, 8px markers with a surface ring, recessive grid, tap or hover for values */
function chart(pts,unit,id){
  const W=340,H=150,L=34,R=8,T=12,B=22,vs=pts.map(p=>p.v),mn=Math.min(...vs),mx=Math.max(...vs);
  const pad=(mx-mn)*.15||Math.max(1,mx*.1),lo=Math.max(0,mn-pad),hi=mx+pad;
  const t0=pts[0].t,t1=pts[pts.length-1].t,x=t=>pts.length===1?L+(W-L-R)/2:L+(t-t0)/(t1-t0||1)*(W-L-R),y=v=>T+(1-(v-lo)/(hi-lo))*(H-T-B);
  const grid=[lo,(lo+hi)/2,hi].map(v=>`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="#2e2e31" stroke-width="1"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end" font-size="10" fill="#5e5e63">${Math.round(v).toLocaleString('en-GB')}</text>`).join('');
  const line=pts.length>1?`<polyline points="${pts.map(p=>`${x(p.t)},${y(p.v)}`).join(' ')}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`:'';
  const dots=pts.map(p=>`<circle cx="${x(p.t)}" cy="${y(p.v)}" r="4" fill="var(--accent)" stroke="#000" stroke-width="2"/>`).join('');
  const xl=`<text x="${L}" y="${H-4}" font-size="10" fill="#5e5e63">${fmtDate(t0)}</text>${pts.length>1?`<text x="${W-R}" y="${H-4}" text-anchor="end" font-size="10" fill="#5e5e63">${fmtDate(t1)}</text>`:''}`;
  return `<div class="chart" data-c="${id}" data-pts='${JSON.stringify(pts.map(p=>[x(p.t)/W,y(p.v)/H,p.v,p.t]))}' data-u="${unit}">
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${pts.length} sessions, latest ${pts[pts.length-1].v} ${unit}">${grid}${line}${dots}<line class="xh" x1="0" x2="0" y1="${T}" y2="${H-B}" stroke="#8a8a8f" stroke-width="1" visibility="hidden"/>${xl}</svg><div class="tip"></div></div>`;
}
function history(ex){
  const S1=bySession(workRecs(ex.key)).reverse();
  if(!S1.length)return `<p class="exempty">No sessions with this exercise yet.</p>`;
  return `<div class="exsec exhist" style="margin-top:18px">${S1.map(s=>{const se=S.sessions.find(z=>z.id===s.recs[0].sid);
    let title='';try{if(se)title=titleOf(se.prog,se.key);}catch(e){}
    return `<div class="exrow"><span>${fmtDate(s.t)}${title?`<br><small style="text-align:left">${esc(title)}</small>`:''}</span><b>${esc(s.recs.map(setTxt).join(', '))}</b></div>`;}).join('')}</div>`;
}
function wire(){
  const q=id=>document.getElementById(id);
  q('exBack').onclick=exClose;
  view.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{X.tab=b.dataset.t;render();});
  view.querySelectorAll('[data-rec]').forEach(b=>b.onclick=()=>{X.rec=b.dataset.rec;render();});
  view.querySelectorAll('[data-per]').forEach(b=>b.onclick=()=>{X.per=b.dataset.per;render();});
  view.querySelectorAll('[data-ex]').forEach(b=>b.onclick=()=>{const from=X.from;exOpen(b.dataset.ex);X.from=from;});
  view.querySelectorAll('[data-sex]').forEach(b=>b.onclick=()=>{S.sex=b.dataset.sex;save();render();});
  const bw=q('exBw');if(bw)bw.onchange=()=>{const v=parseFloat(String(bw.value).replace(',','.'));if(v>20&&v<400){S.bw=v;save();render();}};
  const vs=q('exVs');if(vs)vs.onclick=()=>{const v=q('exVl').value.trim();S.video=S.video||{};if(v)S.video[X.ex.key]=v;else delete S.video[X.ex.key];save();render();};
  const del=q('exDel');if(del)del.onclick=()=>{if(!confirm('Remove this exercise from the library? Logged sets stay in your history.'))return;
    delete S.customEx[X.ex.key];delete EX[X.ex.key];save();exClose();};
  view.querySelectorAll('.chart').forEach(c=>{const pts=JSON.parse(c.dataset.pts),tip=c.querySelector('.tip'),svg=c.querySelector('svg'),xh=svg.querySelector('.xh'),u=c.dataset.u;
    const at=ev=>{const r=svg.getBoundingClientRect(),fx=(ev.clientX-r.left)/r.width;let best=pts[0];pts.forEach(p=>{if(Math.abs(p[0]-fx)<Math.abs(best[0]-fx))best=p;});
      tip.style.display='block';tip.style.left=best[0]*100+'%';tip.style.top=(best[1]*r.height-8)+'px';
      tip.innerHTML=`${best[2].toLocaleString('en-GB')} ${u}<small>${fmtDate(best[3])}</small>`;
      xh.setAttribute('x1',best[0]*340);xh.setAttribute('x2',best[0]*340);xh.setAttribute('visibility','visible');};
    const off=()=>{tip.style.display='none';xh.setAttribute('visibility','hidden');};
    svg.addEventListener('pointermove',at);svg.addEventListener('pointerdown',at);svg.addEventListener('pointerleave',off);});
}

/* ----- wiring ----- */
const _show=show;
show=function(v){_show(v);view.classList.toggle('hide',v!=='ex');};
/* the library and grip tips open the exercise page instead of the old info sheet */
const _openSheet=openSheet;
openSheet=function(ex,c){if(!c)return exOpen(ex);_openSheet(ex,c);};
})();
