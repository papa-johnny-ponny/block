/* BLOCK. calculators — 1RM, plates, RPE, warm-up for a max, meet attempts, IPF GL / DOTS /
   Wilks, Sinclair, daily calories, protein and body fat. Results update as you type; the
   ? on each explains the method. Inputs are remembered (bodyweight, height and so on are
   shared between calculators). */
(function(){
const $=id=>document.getElementById(id);
const r25=x=>Math.round(x/2.5)*2.5,r1=x=>Math.round(x*10)/10,fmt=x=>Number.isFinite(x)?(Math.round(x*10)/10).toLocaleString('en-GB'):'–';
const poly=(c,x)=>c.reduce((t,a,i)=>t+a*Math.pow(x,i),0);

/* RTS-style chart: % of 1RM at RPE 10 for 1–16 reps; one RPE point lower = one more rep in the tank */
const P10=[100,95.5,92.2,89.2,86.3,83.7,81.1,78.6,76.2,73.9,70.7,68,65.3,62.6,59.9,57.4];
function pctAt(reps,rpe){const x=reps+(10-rpe)-1,i=Math.floor(x),f=x-i;if(i<0)return 100;if(i>=P10.length-1)return P10[P10.length-1];return P10[i]+(P10[i+1]-P10[i])*f;}

const C=[
 {id:'orm',n:'1RM calculator',sub:'Estimate your max from a set',grp:0,
  help:'<p>Enter a weight and how many clean reps you did with it. The estimate is the average of the <b>Epley</b> (weight × (1 + reps / 30)) and <b>Brzycki</b> (weight × 36 / (37 − reps)) formulas. They are most accurate from sets of 2–8 reps; above 10 the guess gets loose.</p><p>The table shows the load for each percentage and roughly how many reps you could do with it.</p>',
  f:[['orm_w','Weight','kg',100],['orm_r','Reps','',5]],
  out:v=>{const w=v.orm_w,r=Math.max(1,v.orm_r);if(!(w>0))return'';const e=r===1?w:(w*(1+r/30)+(r<37?w*36/(37-r):w*(1+r/30)))/2;
    return big(fmt(e),'kg','Estimated 1RM')+table(['%','Load','Reps'],[100,95,90,85,80,75,70,65,60,55,50].map(p=>[p+' %',fmt(r25(e*p/100))+' kg',p===100?'1':'~'+Math.max(1,Math.round(30*(100/p-1)))]));}},
 {id:'plates',n:'Plate calculator',sub:'What to load on each side',grp:0,
  help:'<p>Pick the bar and the plates you have. The calculator loads the heaviest plates first, the same on both sides. If the weight can’t be made exactly, it shows the closest you can load under it.</p><p>Colours follow competition plates: 25 red, 20 blue, 15 yellow, 10 green, 5 white.</p>',
  f:[['pl_t','Target','kg',100],['pl_bar','Bar',[[20,'20 kg'],[15,'15 kg'],[10,'10 kg'],[0,'None']],20],['pl_have','Plates',[[25,'25'],[20,'20'],[15,'15'],[10,'10'],[5,'5'],[2.5,'2.5'],[1.25,'1.25'],[0.5,'0.5']],[25,20,15,10,5,2.5,1.25],'multi']],
  out:v=>{const bar=+v.pl_bar,have=(v.pl_have||[]).map(Number).sort((a,b)=>b-a);let side=(v.pl_t-bar)/2;if(!(v.pl_t>0))return'';
    if(side<0)return`<p class="ccnote">That is less than the bar.</p>`;const used=[];
    for(const p of have){while(side>=p-1e-9){used.push(p);side-=p;}}const loaded=bar+2*used.reduce((t,p)=>t+p,0);
    const COL={25:'#d9363e',20:'#2f6fdb',15:'#e8b52c',10:'#3ba55c',5:'#f2f2f2',2.5:'#5a5a5f',1.25:'#9a9aa0',0.5:'#c6c6cc'};
    const viz=`<div class="cbar" aria-hidden="true"><i class="sleeve"></i>${used.map(p=>`<i class="pl" style="--c:${COL[p]};--h:${Math.max(34,Math.min(100,p*4+20))}%"></i>`).join('')}<i class="cap"></i></div>`;
    return big(used.length?used.map(String).join(' + '):'Just the bar','',`Each side${Math.abs(loaded-v.pl_t)>1e-9?` · loads ${fmt(loaded)} kg`:''}`)+viz;}},
 {id:'rpe',n:'RPE calculator',sub:'Loads from reps and effort',grp:0,
  help:'<p>RPE is how hard a set felt: 10 means nothing left, 9 means one more rep was there, 8 two more. From a set you did (weight, reps, RPE) the calculator estimates your max with an RTS-style chart, then gives the load for the set you want next.</p>',
  f:[['rp_w','Weight done','kg',100],['rp_r','Reps done','',5],['rp_e','RPE done',[[6,'6'],[7,'7'],[7.5,'7.5'],[8,'8'],[8.5,'8.5'],[9,'9'],[9.5,'9.5'],[10,'10']],8],
    ['rp_tr','Reps wanted','',3],['rp_te','RPE wanted',[[6,'6'],[7,'7'],[7.5,'7.5'],[8,'8'],[8.5,'8.5'],[9,'9'],[9.5,'9.5'],[10,'10']],9]],
  out:v=>{if(!(v.rp_w>0&&v.rp_r>0))return'';const e=v.rp_w/(pctAt(v.rp_r,+v.rp_e)/100),p=pctAt(Math.max(1,v.rp_tr),+v.rp_te);
    return big(fmt(r25(e*p/100)),'kg',`${v.rp_tr} reps at RPE ${v.rp_te} · ${fmt(p)} % of ${fmt(e)} kg`);}},
 {id:'wu',n:'Warm-up for a max',sub:'Ramp up to a heavy single',grp:1,
  help:'<p>A ramp that gets you ready without tiring you: many reps on the bar, then fewer reps as the weight climbs, singles from about 80 %. Rest 1–2 minutes early on and 3–5 minutes before the last singles and the attempt.</p>',
  f:[['wu_t','Attempt','kg',140],['wu_bar','Bar',[[20,'20 kg'],[15,'15 kg']],20]],
  out:v=>{const t=v.wu_t,bar=+v.wu_bar;if(!(t>bar))return'';
    const steps=[[0,10],[40,5],[55,3],[65,2],[75,1],[82,1],[88,1],[93,1]].map(([p,r])=>[p?Math.max(bar,r25(t*p/100)):bar,r,p]).filter((x,i,a)=>!i||x[0]>a[i-1][0]);
    return table(['Set','Load','Reps'],[...steps.map(([w,r,p],i)=>[String(i+1),fmt(w)+' kg'+(p?` · ${p} %`:''),String(r)]),['→',fmt(t)+' kg','attempt']]);}},
 {id:'att',n:'Meet attempts',sub:'Opener, second and third',grp:1,
  help:'<p>A common way to pick attempts: open around 91 % of what you can do on a good day (a weight you could hit for a double), take the second around 96 %, and the third at 100–102 %. Rounded to 2.5 kg.</p>',
  f:[['at_s','Squat max','kg',180],['at_b','Bench max','kg',120],['at_d','Deadlift max','kg',220]],
  out:v=>{const L=[['Squat',v.at_s],['Bench',v.at_b],['Deadlift',v.at_d]].filter(x=>x[1]>0);if(!L.length)return'';const a=m=>[r25(m*.91),r25(m*.96),r25(m*1.0),r25(m*1.02)];
    const rows=L.map(([n,m])=>{const x=a(m);return[n,fmt(x[0]),fmt(x[1]),`${fmt(x[2])}–${fmt(x[3])}`];});
    const tot=L.reduce((t,[,m])=>t+a(m)[1],0),top=L.reduce((t,[,m])=>t+a(m)[3],0);
    return table(['Lift','1st','2nd','3rd'],rows)+`<p class="ccnote">Total with good seconds: ${fmt(tot)} kg · with every third: up to ${fmt(top)} kg.</p>`;}},
 {id:'pts',n:'IPF GL, DOTS and Wilks',sub:'Powerlifting points',grp:2,
  help:'<p>Points let lifters of different bodyweights be compared. <b>IPF GL</b> is the IPF’s formula since 2020, with separate numbers for raw and equipped and for full meets and bench only. <b>DOTS</b> is used by many federations. <b>Wilks</b> is the classic formula.</p>',
  f:[['sex','Sex',[['m','Male'],['f','Female']],'m'],['bw','Bodyweight','kg',83],['pt_t','Result','kg',600],['pt_ev','Event',[['3','Full meet'],['b','Bench only']],'3'],['pt_eq','Equipment',[['raw','Raw'],['eq','Equipped']],'raw']],
  out:v=>{const x=v.bw,T=v.pt_t;if(!(x>0&&T>0))return'';const m=v.sex!=='f';
    const GL={raw3:m?[1199.72839,1025.18162,.00921]:[610.32796,1045.59282,.03048],eq3:m?[1236.25115,1449.21864,.01644]:[758.63878,949.31382,.02435],
      rawb:m?[320.98041,281.40258,.01008]:[142.40398,442.52671,.04724],eqb:m?[381.22073,733.79378,.02398]:[221.82209,357.00377,.02937]}[v.pt_eq+v.pt_ev];
    const gl=T*100/(GL[0]-GL[1]*Math.exp(-GL[2]*x));
    const dx=Math.min(Math.max(x,m?40:40),m?210:150),dots=T*500/poly(m?[-307.75076,24.0900756,-0.1918759221,0.0007391293,-0.000001093]:[-57.96288,13.6175032,-0.1126655495,0.0005158568,-0.0000010706],dx);
    const wx=Math.min(Math.max(x,m?40:26.51),m?201.9:154.53),wilks=T*500/poly(m?[-216.0475144,16.2606339,-0.002388645,-0.00113732,7.01863e-6,-1.291e-8]:[594.31747775582,-27.23842536447,0.82112226871,-0.00930733913,4.731582e-5,-9.054e-8],wx);
    return big(fmt(gl),'','IPF GL points')+table(['Formula','Points'],[['IPF GL',fmt(gl)],['DOTS',fmt(dots)],['Wilks',fmt(wilks)]]);}},
 {id:'sin',n:'Sinclair',sub:'Weightlifting points',grp:2,
  help:'<p>The Sinclair coefficient scales a weightlifting total (snatch + clean and jerk) to what it would be at the heaviest class. This uses the 2021–2024 coefficients: men A 0.722762521, b 193.609 kg; women A 0.787004341, b 153.757 kg. Above b the coefficient is 1.</p>',
  f:[['sex','Sex',[['m','Male'],['f','Female']],'m'],['bw','Bodyweight','kg',83],['sn_t','Total','kg',250]],
  out:v=>{if(!(v.bw>0&&v.sn_t>0))return'';const [A,b]=v.sex==='f'?[0.787004341,153.757]:[0.722762521,193.609];const k=v.bw>=b?1:Math.pow(10,A*Math.pow(Math.log10(v.bw/b),2));
    return big(fmt(v.sn_t*k),'','Sinclair total')+`<p class="ccnote">Coefficient ${k.toFixed(4)}</p>`;}},
 {id:'kcal',n:'Daily calories',sub:'What you burn in a day',grp:3,
  help:'<p>Resting burn from the <b>Mifflin–St Jeor</b> formula (weight, height, age, sex), times an activity factor. It is a starting point: weigh yourself for two or three weeks and adjust by 100–200 kcal if the scale goes the wrong way.</p>',
  f:[['sex','Sex',[['m','Male'],['f','Female']],'m'],['bw','Bodyweight','kg',83],['h','Height','cm',180],['age','Age','years',35],
    ['act','Activity',[[1.2,'Desk, little exercise'],[1.375,'Train 1–3 days'],[1.55,'Train 3–5 days'],[1.725,'Train 6–7 days'],[1.9,'Hard daily training or physical job']],1.55,'list']],
  out:v=>{if(!(v.bw>0&&v.h>0&&v.age>0))return'';const bmr=10*v.bw+6.25*v.h-5*v.age+(v.sex==='f'?-161:5),tdee=bmr*v.act,k=x=>Math.round(x/10)*10;
    return big(k(tdee).toLocaleString('en-GB'),'kcal','To stay the same weight')+table(['Goal','Per day'],[['Lose fat (about −0.5 kg a week)',k(tdee-500).toLocaleString('en-GB')+' kcal'],['Lose slowly',k(tdee*.9).toLocaleString('en-GB')+' kcal'],
      ['Build muscle, lean',k(tdee*1.1).toLocaleString('en-GB')+' kcal'],['Resting burn',k(bmr).toLocaleString('en-GB')+' kcal']]);}},
 {id:'prot',n:'Protein',sub:'How much a day',grp:3,
  help:'<p>For people who strength train, research points to about <b>1.6 g per kg</b> of bodyweight a day, with up to 2.2 g/kg as a safe upper end. When dieting, eating toward the top (2.0–2.4 g/kg) helps keep muscle. Split it over 3–5 meals.</p>',
  f:[['bw','Bodyweight','kg',83],['pr_g','Goal',[['keep','Keep'],['build','Build'],['cut','Lose fat']],'build'],['pr_m','Meals a day','',4]],
  out:v=>{if(!(v.bw>0))return'';const [lo,hi]={keep:[1.4,1.8],build:[1.6,2.2],cut:[2.0,2.4]}[v.pr_g]||[1.6,2.2],m=Math.max(1,v.pr_m||4);
    return big(`${Math.round(v.bw*lo)}–${Math.round(v.bw*hi)}`,'g','Protein a day')+`<p class="ccnote">${lo}–${hi} g per kg · about ${Math.round(v.bw*lo/m)}–${Math.round(v.bw*hi/m)} g per meal over ${m} meals.</p>`;}},
 {id:'bf',n:'Body fat and fat-free mass',sub:'From a tape measure',grp:3,
  help:'<p>The <b>US Navy</b> method estimates body fat from height and a few circumferences: neck and waist (at the navel), and hips for women. Measure relaxed, in the morning, tape level and snug. Expect about ±3 %; the trend over time tells you more than one number.</p><p><b>FFMI</b> is fat-free mass divided by height squared, adjusted to 1.80 m.</p>',
  f:[['sex','Sex',[['m','Male'],['f','Female']],'m'],['bw','Bodyweight','kg',83],['h','Height','cm',180],['bf_n','Neck','cm',38],['bf_w','Waist','cm',85],['bf_h','Hips','cm',95,'f']],
  out:v=>{const f=v.sex==='f';if(!(v.h>0&&v.bf_n>0&&v.bf_w>0)||(f&&!(v.bf_h>0)))return'';
    const a=f?v.bf_w+v.bf_h-v.bf_n:v.bf_w-v.bf_n;if(a<=0)return`<p class="ccnote">Waist${f?' and hips':''} must be larger than the neck.</p>`;
    const bf=f?495/(1.29579-0.35004*Math.log10(a)+0.221*Math.log10(v.h))-450:495/(1.0324-0.19077*Math.log10(a)+0.15456*Math.log10(v.h))-450;
    if(!(bf>2&&bf<70))return`<p class="ccnote">Check the measurements, the result is out of range.</p>`;
    const ffm=v.bw>0?v.bw*(1-bf/100):NaN,hm=v.h/100,ffmi=ffm/(hm*hm),adj=ffmi+6.1*(1.8-hm);
    return big(fmt(bf),'%','Body fat')+(v.bw>0?table(['','Value'],[['Fat-free mass',fmt(ffm)+' kg'],['Fat mass',fmt(v.bw-ffm)+' kg'],['FFMI',fmt(ffmi)+(Math.abs(adj-ffmi)>.05?` · ${fmt(adj)} adjusted`:'')]]):'');}}];
const GRPS=[[0,'Training'],[1,'Competition prep'],[2,'Points'],[3,'Body and food']];

const big=(n,u,l)=>`<div class="cbig${String(n).length>12?' long':''}"><b>${n}${u?`<small>${u}</small>`:''}</b><span>${esc(l)}</span></div>`;
const table=(head,rows)=>`<table class="ctab"><thead><tr>${head.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

const st=document.createElement('style');st.textContent=`
#v-calc>.title{margin:14px 0 18px}
.cgrp{margin:0 0 16px;border-radius:20px;background:var(--surface);overflow:hidden}
.crow{display:flex;align-items:center;border-top:1px solid var(--line)}.crow:first-child{border-top:0}
.crow>button:first-child{flex:1;min-width:0;display:block;padding:14px 16px;background:none;border:0;color:#fff;font:inherit;text-align:left;transition:background-color 160ms ease}
.crow>button:first-child:active{background:var(--surface-2)}
.crow b{display:block;font-size:16px}.crow small{display:block;color:var(--dim);font-size:13px;margin-top:1px}
.chelp{flex:0 0 44px;height:44px;margin-right:8px;border-radius:50%;border:1.5px solid var(--dim-2);background:none;color:var(--dim);font:inherit;font-weight:700;font-size:15px;
  display:grid;place-items:center;transition:transform 140ms ease-out,color 160ms ease,border-color 160ms ease;transform:scale(.8)}
.chelp:active{transform:scale(.74)}
@media (hover:hover) and (pointer:fine){.crow>button:first-child:hover{background:#1d1d20}.chelp:hover{color:#fff;border-color:#fff}}
.cgl{margin:22px 0 8px;font-size:13px;font-weight:600;color:var(--dim)}
.cform{display:grid;gap:14px;margin:0 0 22px}
.cf label{display:block;font-size:13px;font-weight:600;color:var(--dim);margin:0 0 6px}
.cf .cin{display:flex;align-items:center;gap:10px;border-radius:14px;background:var(--surface);border:1px solid var(--line);padding:0 14px;transition:border-color 160ms ease}
.cf .cin:focus-within{border-color:#fff}
.cf input{flex:1;min-width:0;height:50px;border:0;background:none;color:#fff;font:inherit;font-size:20px;font-weight:700;font-variant-numeric:tabular-nums;outline:none;padding:0}
.cf .cin span{color:var(--dim);font-size:14px}
.cf select{width:100%;height:50px;border-radius:14px;background:var(--surface);border:1px solid var(--line);color:#fff;font:inherit;padding:0 12px}
.cseg{display:flex;flex-wrap:wrap;gap:6px}
.cseg button{min-height:40px;padding:0 14px;border-radius:999px;border:0;background:var(--surface);color:var(--dim);font:inherit;font-size:14px;font-weight:600;
  transition:background-color 160ms ease,color 160ms ease,transform 140ms ease-out}
.cseg button.on{background:#fff;color:#000}
.cseg button:active{transform:scale(.96)}
.cout{border-radius:22px;background:var(--surface);padding:18px;min-height:60px}
.cout:empty{display:none}
.cbig b{display:block;font-size:44px;font-weight:800;letter-spacing:-.03em;line-height:1.05;font-variant-numeric:tabular-nums;color:var(--accent)}
.cbig b small{font-size:18px;font-weight:700;color:var(--dim);margin-left:6px;letter-spacing:0}
.cbig.long b{font-size:30px;line-height:1.15}
.cbig span{display:block;color:var(--dim);font-size:14px;margin-top:4px}
.ctab{width:100%;border-collapse:collapse;margin-top:14px;font-variant-numeric:tabular-nums}
.ctab th{text-align:left;font-size:12px;font-weight:600;color:var(--dim);padding:0 0 6px}
.ctab td{padding:9px 0;border-top:1px solid var(--line);font-size:15px}
.ctab th:not(:first-child),.ctab td:not(:first-child){text-align:right}
.ccnote{color:var(--dim);font-size:14px;margin:12px 0 0;line-height:1.5}
.cbar{display:flex;align-items:center;height:96px;margin-top:16px;padding:0 4px}
.cbar .sleeve{width:44px;height:10px;border-radius:3px;background:#8a8a8f}
.cbar .pl{width:12px;height:var(--h);margin-left:3px;border-radius:3px;background:var(--c);box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
.cbar .cap{width:16px;height:16px;margin-left:3px;border-radius:3px;background:#8a8a8f}
.chelpbody p{color:#d6d6d9;line-height:1.55;margin:0 0 10px}`;
document.head.appendChild(st);

const view=document.createElement('section');view.id='v-calc';view.className='wrap hide';
$('v-settings').after(view);
const _sh=show;show=function(v){_sh(v);view.classList.toggle('hide',v!=='calc');};
let curC=null;
window.BLOCK_VIEWS=Object.assign(window.BLOCK_VIEWS||{},{calc:()=>{curC=null;show('calc');render();}});

const store=()=>S.calc=S.calc||{};
function val(k,def){const s=store();return k in s?s[k]:def;}
function help(c){window.blockSheet&&blockSheet.open(`<h3>${esc(c.n)}</h3><div class="chelpbody">${c.help}</div>`);}
function render(){window.scrollTo(0,0);
  if(!curC){view.innerHTML=`<button class="back" id="cBack">‹ Profile</button><h2 class="title">Calculators</h2>`+
      GRPS.map(([g,l])=>`<p class="cgl">${l}</p><div class="cgrp">${C.filter(c=>c.grp===g).map(c=>`<div class="crow"><button data-c="${c.id}"><b>${esc(c.n)}</b><small>${esc(c.sub)}</small></button>
        <button class="chelp" data-h="${c.id}" aria-label="How ${esc(c.n)} works">?</button></div>`).join('')}</div>`).join('');
    $('cBack').onclick=()=>blockGo('profile');
    view.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{curC=b.dataset.c;render();});
    view.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>help(C.find(c=>c.id===b.dataset.h)));return;}
  const c=C.find(x=>x.id===curC);
  view.innerHTML=`<button class="back" id="cBack">‹ Calculators</button><div class="titlerow"><h2 class="title">${esc(c.n)}</h2><button class="chelp" id="cHelp" aria-label="How it works">?</button></div>
    <div class="cform">${c.f.map(fieldHTML).join('')}</div><div class="cout" id="cOut" aria-live="polite"></div>`;
  $('cBack').onclick=()=>{curC=null;render();};$('cHelp').onclick=()=>help(c);
  view.querySelectorAll('input[data-k]').forEach(inp=>inp.oninput=()=>{const n=parseFloat(String(inp.value).replace(',','.'));store()[inp.dataset.k]=Number.isFinite(n)?n:null;save();out();});
  view.querySelectorAll('select[data-k]').forEach(sel=>sel.onchange=()=>{store()[sel.dataset.k]=parseFloat(sel.value);save();out();});
  view.querySelectorAll('.cseg[data-k]').forEach(box=>box.querySelectorAll('button').forEach(b=>b.onclick=()=>{const k=box.dataset.k,raw=b.dataset.v,v=isNaN(+raw)?raw:+raw;
    if(box.dataset.multi){const a=[...(val(k,[])||[])],i=a.indexOf(v);if(i<0)a.push(v);else a.splice(i,1);store()[k]=a;b.classList.toggle('on',i<0);b.setAttribute('aria-pressed',i<0);}
    else{store()[k]=v;box.querySelectorAll('button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b);});if(k==='sex')render();}
    save();out();}));
  out();}
function fieldHTML([k,l,u,def,mode]){
  if(mode==='f'&&val('sex','m')!=='f')return'';
  if(Array.isArray(u)){const v=val(k,def);
    if(mode==='list')return`<div class="cf"><label for="cf_${k}">${esc(l)}</label><select id="cf_${k}" data-k="${k}">${u.map(([x,t])=>`<option value="${x}"${+x===+v?' selected':''}>${esc(t)}</option>`).join('')}</select></div>`;
    const on=x=>mode==='multi'?(v||[]).map(String).includes(String(x)):String(x)===String(v);
    return`<div class="cf"><label>${esc(l)}</label><div class="cseg" data-k="${k}"${mode==='multi'?' data-multi="1"':''} role="group" aria-label="${esc(l)}">${u.map(([x,t])=>`<button data-v="${x}" class="${on(x)?'on':''}" aria-pressed="${on(x)}">${esc(t)}</button>`).join('')}</div></div>`;}
  const v=val(k,def);
  return`<div class="cf"><label for="cf_${k}">${esc(l)}</label><div class="cin"><input id="cf_${k}" data-k="${k}" type="text" inputmode="decimal" autocomplete="off" value="${v==null?'':v}">${u?`<span>${esc(u)}</span>`:''}</div></div>`;}
function out(){const c=C.find(x=>x.id===curC);if(!c)return;const v={};
  c.f.forEach(([k,,u,def])=>{const x=val(k,def);v[k]=x==null?NaN:x;});
  let h='';try{h=c.out(v)||'';}catch(e){h='';}$('cOut').innerHTML=h;}
})();
