/* BLOCK. own-session generator and program maker.
   A few taps (time, focus, equipment, goal, effort, format) give a session that fits
   the time, keeps exercises from competing with each other and leans on the programs
   already in the app. The session can then grow into a program: days a week, weeks,
   split, progression, autoregulation and deloads.
   Sources for the rules:
   - Flolyfe functional fitness guidelines: goal → reps, sets, rest and RPE; short on
     time = 2 upper + 2 lower + 1 core as a circuit; core finisher 20–40 s on, 10–20 s off.
   - Chris Detmering: time caps, supersets, last set close to failure, slow lowering.
   - Greg Nuckols / SBS program builder: double progression, sets-then-reps, rep
     increase for bodyweight, last-set RPE autoregulation, deload weeks.
   Also: program type tags on every program card. */
(function(){
const css=`
#v-gen .gh{font-size:26px;line-height:1.15;margin:4px 0 6px}
#v-gen .sub{margin:0}
.gq{margin:18px 0 0}
.gq>h4,.gslh h4{margin:0 0 8px;color:var(--dim);font-size:13px;font-weight:600;letter-spacing:0;text-transform:none}
.gsec{margin:30px 0 0;padding-top:22px;border-top:1px solid var(--line)}
.gsec>h3{margin:0;font-size:18px;font-weight:700;color:#fff;letter-spacing:0;text-transform:none}
.gsec>h3+.gq,.gsec>h3+.gpre{margin-top:14px}
.gchips{display:flex;flex-wrap:wrap;gap:6px}
.gchip{display:inline-flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:1px;min-height:38px;padding:6px 12px;border-radius:12px;background:var(--surface-2);border:1px solid var(--line);color:#fff;font:inherit;font-size:14px;font-weight:600;text-align:left;cursor:pointer;
  transition:transform 140ms ease-out,background-color 140ms ease,border-color 140ms ease}
.gchip:active{transform:scale(.97)}
.gchip small{font-size:11px;font-weight:500;color:var(--dim)}
/* intensity as a three-stop slider */
.gsl{margin:18px 0 0}
.gslh{display:flex;justify-content:space-between;align-items:baseline;gap:12px}
.gslv{font-size:13px;font-weight:600;color:#fff;font-variant-numeric:tabular-nums}
.gslv small{color:var(--dim);font-weight:500;font-size:13px}
.gsl input{-webkit-appearance:none;appearance:none;display:block;box-sizing:border-box;width:100%;height:28px;min-height:0;margin:2px 0 0;padding:0;border:0;border-radius:0;background:none;box-shadow:none;cursor:pointer;touch-action:pan-y}
.gsl input::-webkit-slider-runnable-track{height:6px;border-radius:3px;background:linear-gradient(90deg,var(--accent) var(--p,50%),var(--surface-2) var(--p,50%))}
.gsl input::-moz-range-track{height:6px;border-radius:3px;background:linear-gradient(90deg,var(--accent) var(--p,50%),var(--surface-2) var(--p,50%))}
.gsl input::-webkit-slider-thumb{-webkit-appearance:none;width:26px;height:26px;margin-top:-10px;border-radius:50%;background:#fff;border:0;box-shadow:0 2px 8px rgba(0,0,0,.5)}
.gsl input::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:#fff;border:0;box-shadow:0 2px 8px rgba(0,0,0,.5)}
.gsl input:focus-visible{outline:2px solid var(--accent);outline-offset:4px;border-radius:8px}
.gslt{display:flex;justify-content:space-between;margin:2px 0 0}
.gslt button{padding:6px 0;min-width:64px;background:none;border:0;color:var(--dim);font:inherit;font-size:13px;font-weight:600;cursor:pointer}
.gslt button:nth-child(2){text-align:center}.gslt button:first-child{text-align:left}.gslt button:last-child{text-align:right}
.gslt button.on{color:#fff}
/* long lists (approaches, creators) as one row that opens a list */
.gsel{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:52px;padding:8px 14px;border-radius:14px;background:var(--surface-2);border:1px solid var(--line);color:#fff;font:inherit;text-align:left;cursor:pointer}
.gsel b{display:block;font-size:15px;font-weight:600}
.gsel small{display:block;color:var(--dim);font-size:12px;margin-top:1px}
.gsel svg{flex:none;color:var(--dim);transition:transform 200ms cubic-bezier(.23,1,.32,1)}
.gsel[aria-expanded="true"] svg{transform:rotate(180deg)}
.gpl{margin:6px 0 0;border-radius:14px;background:var(--surface-2);border:1px solid var(--line);max-height:min(52vh,440px);overflow-y:auto;overscroll-behavior:contain}
.gpl[hidden]{display:none}
.gpf{display:block;width:calc(100% - 20px);box-sizing:border-box;margin:10px;padding:10px 12px;border-radius:10px;background:#000;color:#fff;border:1px solid var(--line);font:inherit;font-size:16px}
.gpg{margin:0;padding:12px 14px 4px;color:var(--dim);font-size:12px;font-weight:600}
.gpo{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:48px;padding:8px 14px;background:none;border:0;color:#fff;font:inherit;text-align:left;cursor:pointer}
.gpo span{min-width:0}.gpo b{display:block;font-size:15px;font-weight:600}.gpo small{display:block;color:var(--dim);font-size:12px;margin-top:1px}
.gpo i{flex:none;width:20px;height:20px;border-radius:50%;border:1.5px solid var(--line);display:grid;place-items:center}
.gpo.on i{background:var(--accent);border-color:var(--accent);color:#000}
.gpo i svg{opacity:0}.gpo.on i svg{opacity:1}
.gpo[hidden],.gpg[hidden]{display:none}
.gchip.on{background:var(--accent);border-color:var(--accent);color:#000}
.gchip.on small{color:rgba(0,0,0,.62)}
.gpre{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}
.gpre button{padding:6px 12px;border-radius:999px;border:1px solid var(--line);background:none;color:var(--dim);font:inherit;font-size:13px;font-weight:600}
.gmore{margin:30px 0 0;border-top:1px solid var(--line)}
.gmore>summary{display:flex;justify-content:space-between;align-items:center;cursor:pointer;padding:22px 0 0;color:#fff;font-size:18px;font-weight:700;list-style:none}
.gmore>summary::-webkit-details-marker{display:none}
.gmore>summary::after{content:'';flex:none;width:18px;height:18px;background:var(--dim);
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") center/contain no-repeat;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") center/contain no-repeat;
  transition:transform 200ms cubic-bezier(.23,1,.32,1)}
.gmore[open]>summary::after{transform:rotate(180deg)}
.gmore>summary small{display:block;color:var(--dim);font-size:13px;font-weight:500;margin-top:2px}
.gmore .gsec:first-of-type{border-top:0;margin-top:0;padding-top:0}
@media (prefers-reduced-motion:reduce){.gchip,.gsel svg,.gmore>summary::after{transition:none}}
.ggo{width:100%;margin-top:28px;min-height:52px}
/* the main actions stay in reach: a bar stuck to the bottom of the screen */
.gbar{position:sticky;bottom:0;z-index:60;display:flex;gap:10px;margin:72px -16px 0;padding:14px 16px calc(env(safe-area-inset-bottom,0px) + 14px);
  background:linear-gradient(to top,#000 72%,rgba(0,0,0,0))}
.gbar .pgo,.gbar .gout{text-align:center;display:grid;place-items:center}
#v-gen #genBody:has(.gbar){padding-bottom:0!important}
#v-gen.wrap:has(.gbar){padding-bottom:0}
.gbar .pgo{flex:1.35;margin:0;min-height:52px;padding:0 12px;border-radius:16px;transition:transform 140ms ease-out}
.gbar .gout{flex:1;min-height:52px;padding:0 12px;border-radius:16px;background:none;border:1.5px solid rgba(255,255,255,.32);color:#fff;font:inherit;font-size:16px;font-weight:700;cursor:pointer;transition:transform 140ms ease-out,border-color 140ms ease}
.gbar .pgo:active,.gbar .gout:active{transform:scale(.97)}
@media (hover:hover) and (pointer:fine){.gbar .gout:hover{border-color:#fff}}
.gkeep{display:flex;gap:8px;margin-top:14px}.gkeep .btn-s{flex:1;padding:11px 10px}
.glinks{display:flex;justify-content:center;gap:22px;margin-top:16px}.glinks .plink{margin:0}
.gwide{width:100%;margin-top:10px}
.gtitle{width:100%;box-sizing:border-box;font-size:22px;font-weight:700;margin:0 0 6px}
.gwhy{color:var(--dim);font-size:14px;line-height:1.5;margin:10px 0 0}
.ggrp{margin:28px 0 2px;padding-top:20px;border-top:1px solid var(--line);color:#fff;font-size:18px;font-weight:700;letter-spacing:0;text-transform:none}
.grow{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--line)}
.gex{flex:1;display:flex;align-items:center;gap:12px;min-width:0;padding:0;background:none;border:0;color:#fff;font:inherit;text-align:left;cursor:pointer}
.gex>span:last-child{min-width:0}
.gex b{display:block;font-size:16px;line-height:1.25}
.gex small{display:block;margin-top:2px;color:var(--dim);font-size:13px;line-height:1.35}
.gplain{padding:10px 0;border-bottom:1px solid var(--line);color:var(--dim);font-size:14px}
.gplain b{color:#fff;font-weight:600}
.gsw,.gdel{flex:none;width:42px;height:42px;padding:0;border-radius:12px;background:var(--surface-2);border:1px solid var(--line);color:#fff;display:grid;place-items:center;cursor:pointer}
.gsw svg,.gdel svg{display:block}
.gsw.on{background:#fff;color:#000;border-color:#fff}
.gpick{margin:4px 0 10px;padding:12px;border-radius:14px;background:var(--surface-2);border:1px solid var(--line)}
.gpick h5{margin:0 0 8px;font-size:13px;font-weight:600;color:var(--dim)}
.gpick input{display:block;width:100%;box-sizing:border-box;margin:0 0 8px;padding:11px 14px;border-radius:12px;background:#000;color:#fff;border:1px solid var(--line);font:inherit;font-size:16px}
.gpick .gopt{display:flex;justify-content:space-between;align-items:center;gap:10px;width:100%;padding:11px 4px;background:none;border:0;border-top:1px solid var(--line);color:#fff;font:inherit;font-size:15px;text-align:left;cursor:pointer}
.gpick .gopt small{color:var(--dim);font-size:12px;white-space:nowrap}
.gpick .gopt:first-of-type{border-top:0}
.gmsg{color:var(--dim);font-size:13px;min-height:18px;margin:8px 0 0}
.gsum{margin:18px 0 0;padding:14px 16px;border-radius:14px;background:var(--surface-2);border:1px solid var(--line);font-size:14px;line-height:1.5;color:var(--dim)}
.gsum b{color:#fff}
.pfilt{display:flex;gap:6px;overflow-x:auto;margin:0 -16px 12px;padding:0 16px 2px;scrollbar-width:none}
.pfilt::-webkit-scrollbar{display:none}
.pfilt button{flex:none;padding:8px 12px;border-radius:999px;border:1px solid var(--line);background:none;color:var(--dim);font:inherit;font-size:13px;font-weight:600;white-space:nowrap}
.pfilt button.on{background:#fff;color:#000;border-color:#fff}
.pgrp{border-bottom:1px solid var(--line)}
.pgh{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:16px 2px;background:none;border:0;color:#fff;font:inherit;text-align:left;cursor:pointer}
.pgh b{display:block;font-size:18px}.pgh small{display:block;color:var(--dim);font-size:13px;margin-top:2px}
.pgh .chev{transition:transform .2s;color:var(--dim)}
.pgrp.on .pgh .chev{transform:rotate(90deg)}
.pgrp .hlist{margin:0 0 14px}
.pgb{color:var(--dim);font-size:13px;margin:-6px 2px 10px;line-height:1.45}
.ptags{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 0}
.ptag{display:inline-block;font-style:normal;font-size:11px;font-weight:600;line-height:1;padding:4px 8px;border-radius:999px;border:1px solid var(--line);color:var(--dim);letter-spacing:0;text-transform:none}
.ptag.p{color:var(--accent);border-color:rgba(207,230,78,.45)}
.hrowp .ptags,.hcur .ptags{margin:6px 0 2px}
#progTags{margin:0 0 14px}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ---------- answers ---------- */
const TIME=[15,20,30,45,60,75].map(t=>[t,`${t} min`]);
const FOCUS=[['full','Full body'],['upper','Upper'],['lower','Lower'],['push','Push'],['pull','Pull'],
  ['fpush','Push + legs','squat, lunge, press'],['fpull','Pull + hinge','deadlift, row, pull-up'],['core','Core'],['cond','Conditioning']];
const EQ=[['bw','Bodyweight'],['db','Dumbbells'],['kb','Kettlebell'],['bb','Barbell'],['rack','Squat rack + bench'],['bar','Pull-up / dip bar'],['rings','Rings'],
  ['band','Bands'],['mach','Cables & machines'],['cardio','Bike, rower or ski'],['sb','Sandbag'],['mace','Mace']];
const EQ_PRE=[['Home',['bw','db','kb','bar','band']],['Gym',['bw','db','kb','bb','rack','bar','rings','band','mach','cardio']],['Kettlebell only',['kb']],['Bodyweight only',['bw']]];
const GOAL=[['power','Power','explosive · 3–5 reps'],['strength','Strength','heavy · 4–6 reps'],['muscle','Muscle','8–12 reps'],['endur','Endurance','15–20 reps']];
const EFF=[['easy','Easy','RPE 6'],['mod','Moderate','RPE 7–8'],['hard','Hard','last set to failure']];
const FMT=[['straight','Straight sets','one exercise at a time'],['super','Supersets','pairs that don’t compete'],
  ['circuit','Circuit','rounds, short rest'],['amrap','AMRAP','rounds against the clock'],['emom','EMOM','a set every minute']];
const AVOID=[['knee','Knees'],['back','Lower back'],['shoulder','Shoulders'],['wrist','Wrists']];
/* approaches: a creator's way of training, applied only when picked (packs add more via BLOCK_REG.approach) */
const BASE_APPR=[
  {id:'greg_rpe',by:'Greg Nuckols',n:'Autoregulated by RPE',short:'Load set by how the last set felt; sets, then reps, then load.',gp:{rpe:8},prog:'setsreps',cues:['judge the last set'],details:'Targets are effort-based: the last set should land at the RPE given. Easier than that and the load goes up next time, harder and it comes down. Accessories climb in sets first, then reps, then load.'},
  {id:'flo_move',by:'Flolyfe',n:'Movement-based circuits',short:'Two upper, two lower, one core, repeated. Push and pull days.',fmt:'circuit',details:'Pick movements by pattern (push, pull, lower, upper, core) and run them as a circuit when time is short. Goal sets the reps: power 1–6, strength 7–12, endurance 12–20. Finish with core intervals.'},
  {id:'chris_cap',by:'Chris Detmering',n:'Time-capped, close to failure',short:'Supersets, little rest, last sets near failure, slow lowering.',gp:{rest:60,rpe:9},fmt:'super',cues:['slow lowering','last set near failure'],details:'Short sessions with a hard cap on time. Pair exercises, keep rest short and take the last sets close to failure. Pick movements that need little warm-up.'}];
const APPR=()=>[...BASE_APPR,...(window.BLOCK_APPROACHES||[])];
const apprOf=o=>o&&o.appr?APPR().find(a=>a.id===o.appr)||null:null;
function gpOf(o){const g=GP[o.goal],A=apprOf(o);if(!A||!A.gp)return g;
  const x={...g,...A.gp};['s','r'].forEach(k=>{if(!Array.isArray(x[k])||x[k].length<2)x[k]=g[k];});return x;}
const EXTRA=[['warm','Warm-up'],['fin','Core finisher'],['fresh','Skip what I trained the last 2 days']];
const DEF={time:30,focus:'full',eq:['bw','db','kb','bar','band'],goal:'muscle',eff:'mod',fmt:'super',avoid:[],warm:true,fin:true,fresh:true,from:[],appr:''};
const PDEF={days:3,weeks:8,split:'auto',prog:'double',auto:'on',deload:4,name:''};
const SPLIT=[['auto','Pick for me'],['full','Full body'],['ul','Upper / lower'],['fpp','Push / pull','Flolyfe, legs included'],['ppl','Push / pull / legs']];
const PROG=[['double','Double progression','top of the range, then add load'],['setsreps','Sets, then reps','SBS: 3×8 up to 5×12, then add load'],
  ['reps','Rep increase','best for bodyweight'],['linear','Linear load','a little more every week'],['cluster','Cluster sets','mini-sets with 15–20 s rest']];
const AUTO=[['on','Autoregulate','RPE on the last set sets the load'],['off','Fixed','same targets, no RPE']];
const DELOAD=[[4,'Every 4th week'],[6,'Every 6th week'],[0,'No deload']];
const lab=(list,k)=>(list.find(x=>x[0]===k)||[k,k])[1];

/* goal → sets, reps, rest (s), RPE, seconds per rep */
const GP={power:{s:[4,5],r:[3,5],rest:150,rpe:6.5,sec:3},strength:{s:[3,5],r:[4,6],rest:150,rpe:8,sec:4},
  muscle:{s:[3,4],r:[8,12],rest:90,rpe:8,sec:4},endur:{s:[2,3],r:[15,20],rest:45,rpe:6,sec:3}};
const rpeTxt=x=>x%1?`RPE ${Math.floor(x)}–${Math.ceil(x)}`:`RPE ${x}`;
const restTxt=s=>s>=120?`${(s/60).toString().replace('.5','½')} min`:s===90?'60–90 s':`${s} s`;

/* ---------- exercise facts ---------- */
const SKIP=/table tennis|soccer|basketball|padel|juggle|\bthrow\b|rope flow|swiss ball|light movement|rest day|\bsplits?\b(?! squat| stance| jump| snatch)|grease the groove|challenge|over bar|barefoot|mobility|back bridge|sprint drills|heel pull|plate pinch|vertical bar|supination|wrist flex|external rot|toe press|warm-?up/;
const CORE=/plank|hollow|leg raise|sit-?ups?|crunch|rollout|ab wheel|dead ?bug|bird ?dog|v[- ]?sits?|l[- ]?sit|pallof|copenhagen|bicycle|twist|windmill|chop|get-?up|knees to|toes to|dragon flag/;
const HOLD=/plank|hold|hollow|l[- ]?sit|\biso\b|wall sit|copenhagen|hang\b/;
const TECH=/get-?up|windmill|snatch|clean|jerk|muscle[\s-]?up|planche|handstand|pistol|pole vault|ring dip|wall walk/;
const SPEC=/\| full|jefferson|zercher|pole vault|sternum|stahl|borzov|vmo|toe press|squat iso|rack pull iso|reactive|3 position|high hang|seated good morning|straddle|hip flexor|long lunge pulse|lunges to plateau|rolling db|extension to chin|unsupported|side split|bounces|scott curl/;
const HEAVY=/^(?!.*(romanian|single|split|sandbag|kettlebell|\bkb\b)).*(deadlift|good morning|rack pull|clean|snatch|jefferson)/;
const JOINT={knee:/sprint|\brun\b|squat|lunge|jump|pistol|nordic|step|split|bound|hop|leg ext|sissy|cossack|skater|box|vmo|landing/,
  back:/deadlift|\brdl\b|good morning|bent over|barbell row|jefferson|swing|clean|snatch|back ext|hyper|rack pull|zercher|gorilla/,
  shoulder:/overhead|press|\bdips?\b|handstand|pullover|snatch|jerk|muscle[\s-]?up|pike|behind the neck|wall walk|get-?up|windmill/,
  wrist:/push-?ups?|pushup|handstand|front squat|clean|planche|wall walk|front rack|crawl|bear\b|zottman|snatch/};
function needs(k,e,n){const r=[];
  if(/\bring/.test(n))r.push('rings');
  else if(/bodyweight row|inverted row|pull-?ups?|pullup|chin|hanging|muscle[\s-]?up|pole vault|\bdips?\b|l[- ]?sit|toes to bar|knees to elbow/.test(n))r.push('bar|rings');
  if(/\bmace\b/.test(n))r.push('mace');
  else if(/sandbag|bear hug/.test(n)||k.startsWith('sb_'))r.push('sb');
  else if(/goblet/.test(n))r.push('kb|db');
  else if(/kettlebell|\bkb\b|swing|get-?up|windmill|crush curl|suitcase hold/.test(n))r.push('kb');
  else if(/\bdb\b|dumbbell|scott curl|zottman|lying unsupported|lateral raise|reverse fly|rear delt/.test(n))r.push('db');
  else if(/smith/.test(n))r.push('mach');
  else if(/barbell|bench press|back squat|front squat|deadlift|clean|snatch|jerk|overhead press|push press|zercher|good morning|rack pull|hip thrust|box squat|behind the neck|landmine|rollout|squat iso|100-rep|skull/.test(n)){r.push('bb');
    if(/back squat|front squat|bench press|box squat|rack pull|squat iso|behind the neck|pin|incline barbell|close grip bench|medium grip bench|larsen|board press/.test(n))r.push('rack');}
  if(/leg curl|hamstring curl|leg ext|abduction|machine/.test(n))r.push(/single leg hamstring/.test(n)?'mach|band':'mach');
  else if(/cable|pulldown|push ?down|face pull|chop/.test(n))r.push('mach|band');
  if(/\bband/.test(n)||e.c==='banded')r.push('band');
  if(/\berg\b|bike|assault|airdyne|ski/.test(n))r.push('cardio');
  if(/back extension|roman chair|hyper/.test(n))r.push('mach');
  const named=r.some(x=>/db|kb|bb|sb|mach|mace/.test(x));
  if(!named&&['weighted','cal','carry','power'].includes(e.c))r.push('db|kb|bb|sb');
  return r;}
function rolesOf(e,n,pat,region){const R=new Set();
  const P={Squat:'squat',Lunge:'lunge',Hinge:'hinge','Horizontal push':'hpush','Vertical push':'vpush','Horizontal pull':'hpull','Vertical pull':'vpull',Carry:'carry',Rotation:'rot'};
  if(/leg ext|sissy/.test(n))R.add('legacc');else if(/leg curl|hamstring curl|nordic/.test(n))R.add('hamacc');
  else if(P[pat]&&region!=='core')R.add(P[pat]);
  if(pat==='Arms'||/curl|tricep|skull|push ?down/.test(n)){if(/curl/.test(n)&&!/leg curl|hamstring curl|jefferson/.test(n))R.add('curl');if(/tricep|skull|extension to chin|push ?down/.test(n))R.add('tri');}
  if(/rear delt|reverse fly/.test(n)){R.delete('hpush');R.add('hpull');}
  if(/lateral raise|rear delt|reverse fly|face pull/.test(n))R.add('delt');
  if(/calf|\btib/.test(n))R.add('calf');
  if(region==='core')R.add(pat==='Rotation'||/twist|chop|windmill|pallof/.test(n)?'rot':'core');
  if(region==='cond')R.add('cond');
  if(e.c==='plyo'||/jump|bound|hop/.test(n))R.add('plyo');
  if(e.c==='power'||/clean|snatch|high pull|swing|push press|thruster/.test(n))R.add('power');
  return R;}
const STOP=new Set(['barbell','db','dumbbell','kb','kettlebell','single','arm','leg','weighted','the','and','with','one','sandbag','banded','into','full','top','bottom','long','range','short','alternate','standing','seated','lying']);
const words=n=>n.toLowerCase().replace(/[^a-z ]/g,' ').split(/\s+/).filter(w=>w.length>2&&!STOP.has(w)).map(w=>w.replace(/s$/,''));
let POOL=null,META={},RECENT=new Set();
function meta(k,use,src){const e=EX[k];if(!e||!e.n)return null;const n=e.n.toLowerCase();
  if(e.c==='rec'||(e.c==='skill'&&!/push|pull|dip|chin|row|squat|press|handstand|planche|wall walk|kick/.test(n))||SKIP.test(n))return null;
  const pat=e.pat||(window.blockPat?blockPat(n):'Other');
  let region=null;
  if(e.c==='cond'||/sprint|\brun\b|bike|\berg\b|skipping|shuffle|ski/.test(n))region='cond';
  else if(pat==='Carry'||e.c==='carry')region='carry';
  else if(CORE.test(n)||pat==='Rotation'||e.c==='rotation')region='core';
  else if(['Squat','Lunge','Hinge'].includes(pat)||e.c==='plyo'||/calf|\btib|adduct|abduct|leg ext|leg curl|vmo|jump/.test(n))region='lower';
  else if(['Horizontal push','Vertical push','Horizontal pull','Vertical pull','Arms'].includes(pat)||/raise|fly|delt|face pull|pullover/.test(n))region='upper';
  if(!region)return null;
  const roles=rolesOf(e,n,pat,region);if(!roles.size)return null;
  const eq=needs(k,e,n),loaded=eq.some(r=>/db|kb|bb|sb|mach/.test(r));
  const joints=new Set(Object.keys(JOINT).filter(j=>JOINT[j].test(n)));
  return{k,n:e.n,c:e.c,region,roles,eq,loaded,free:!loaded&&!eq.includes('cardio'),joints,use,src:src?[...src]:[],
    tech:TECH.test(n),spec:SPEC.test(n),heavy:HEAVY.test(n),hold:HOLD.test(n),w:words(e.n),
    grip:roles.has('hpull')||roles.has('vpull')||region==='carry'||HEAVY.test(n),
    compound:['squat','lunge','hinge','hpush','vpush','hpull','vpull','power'].some(r=>roles.has(r))};}
function buildPool(){const use={},src={};
  const add=(it,pid)=>{if(!it||!it.id||!EX[it.id])return;use[it.id]=(use[it.id]||0)+1;(src[it.id]=src[it.id]||new Set()).add(pid);};
  PROGRAMS.forEach(P=>{if(P.id==='custom'||P.gen)return;
    try{if(P.shape==='days')(P.days||[]).forEach(d=>(d.items||[]).forEach(it=>add(it,P.id)));
      else if(typeof blockFor==='function')for(let w=1;w<=(typeof TOTAL_WEEKS!=='undefined'?TOTAL_WEEKS:12);w++)blockFor(w).days.forEach(d=>d.items.forEach(it=>add(it,P.id)));}catch(e){}});
  META={};POOL=Object.keys(EX).map(k=>meta(k,use[k]||0,src[k])).filter(Boolean);POOL.forEach(m=>META[m.k]=m);
  const cut=Date.now()-2*864e5;RECENT=new Set((S.sets||[]).filter(r=>r.t>cut).map(r=>r.ex));}
const has=(o,r)=>r.split('|').some(x=>o.eq.includes(x));
const ok=(m,o)=>m.eq.every(r=>has(o,r))&&!o.avoid.some(j=>m.joints.has(j))&&(o.eq.includes('bw')||!m.free);

/* ---------- picking ---------- */
function rngOf(seed){let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const TPL={
  full:[['squat','lunge'],['hpush','vpush'],['hinge'],['vpull','hpull'],['core','rot'],['lunge','squat'],['vpush','hpush'],['hpull','vpull'],['carry','rot'],['curl','tri','delt']],
  upper:[['hpush'],['vpull'],['vpush'],['hpull'],['curl'],['tri'],['delt'],['core']],
  lower:[['squat'],['hinge'],['lunge'],['hinge','hamacc'],['calf','legacc'],['core'],['carry']],
  push:[['hpush'],['vpush'],['hpush','vpush'],['tri'],['delt'],['core']],
  pull:[['vpull'],['hpull'],['vpull','hpull'],['curl'],['delt'],['core']],
  fpush:[['squat'],['hpush'],['lunge'],['vpush'],['tri','calf','legacc'],['core']],
  fpull:[['hinge'],['vpull'],['hinge','hamacc'],['hpull'],['curl'],['carry','core']],
  core:[['core'],['rot'],['carry'],['core'],['rot'],['core']],
  cond:[['cond'],['power','plyo'],['squat','lunge'],['hpush','vpush'],['hinge'],['hpull','vpull'],['carry'],['core']]};
const FAST=o=>['circuit','amrap','emom'].includes(o.fmt);
function clash(a,b){if(a.heavy&&b.heavy)return true;
  if(![...a.roles].some(r=>b.roles.has(r)))return false;
  const sh=a.w.filter(x=>b.w.includes(x)).length;return sh>0&&sh>=Math.min(2,a.w.length,b.w.length);}
const focus=(o,ctx)=>ctx.focus||o.focus;
function weight(m,o,roles,ctx){let w=1+Math.log2(1+m.use)*.8;
  if(o.from.length)w*=m.src.some(p=>o.from.includes(p)||o.from.includes((progById(p)||{}).group))?4:.5;
  const A=apprOf(o);if(A&&A.prefer){try{if(new RegExp(A.prefer,'i').test(m.n))w*=2.2;}catch(e){}}
  if(o.fresh&&RECENT.has(m.k))w*=.15;
  if(FAST(o)){if(m.tech)w*=.05;if(m.eq.includes('bb'))w*=.35;if(m.free||m.eq.includes('kb'))w*=1.4;}
  else if(m.tech)w*=ctx.fin?.05:.5;
  if(o.goal==='power'&&(m.roles.has('plyo')||m.roles.has('power')))w*=2.5;
  if(o.goal==='strength'&&m.loaded)w*=1.6;
  if(o.goal==='endur'&&(m.free||m.eq.includes('kb')))w*=1.4;
  if(m.c==='skill')w*=.4;if(m.spec)w*=.25;
  if(m.roles.has('plyo')&&!roles.includes('plyo')&&o.goal!=='power'&&(focus(o,ctx)!=='cond'))w*=.1;
  if(m.loaded&&m.eq.every(r=>has(o,r)))w*=m.eq.some(r=>!r.includes('|')&&o.eq.includes(r))?1.6:1.25;
  if(ctx.soft&&ctx.soft.has(m.k))w*=.12;
  const first=roles.findIndex(r=>m.roles.has(r));if(first>0)w*=.6;
  const used=new Set(ctx.chosen.flatMap(c=>[...c.roles]));if(roles.some(r=>m.roles.has(r)&&used.has(r))&&!['core','rot'].includes(roles[0]))w*=.35;
  return w*(.5+ctx.rng());}
function candidates(roles,o,ctx,skip){return POOL.filter(m=>roles.some(r=>m.roles.has(r))&&ok(m,o)&&!(skip&&skip.has(m.k))&&!ctx.chosen.some(c=>c.k===m.k||clash(c,m)));}
function choose(roles,o,ctx,skip){const c=candidates(roles,o,ctx,skip);if(!c.length)return null;
  let best=null,bw=-1;c.forEach(m=>{const w=weight(m,o,roles,ctx);if(w>bw){bw=w;best=m;}});return best;}
function tplOf(o,focus){let t=TPL[focus||o.focus]||TPL.full;if(o.goal==='power'&&!['core','cond'].includes(focus||o.focus))t=[['plyo','power'],...t];return t;}
function budget(o){const short=o.time<=20;return o.time*60-(o.warm?(short?180:300):0)-(o.fin?(short?120:270):0);}
function mainSets(o,m,i){const g=gpOf(o);let s=i<2&&m.compound?g.s[1]:g.s[0];
  if(o.eff==='easy')s=Math.max(2,s-1);if(o.time<=20)s=Math.max(2,Math.min(s,3));return s;}
function workSec(o,m){const g=gpOf(o);return m.hold||m.region==='cond'||m.region==='carry'?35:Math.max(20,(g.r[0]+g.r[1])/2*g.sec);}
const superRest=o=>Math.round(gpOf(o).rest*2/3/15)*15;
function est(ms,o){const g=gpOf(o);
  if(o.fmt==='straight')return ms.reduce((t,m,i)=>t+mainSets(o,m,i)*(workSec(o,m)+g.rest)+45,0);
  if(o.fmt==='super'){let t=0;pairUp(ms.map((m,i)=>({m,i}))).forEach(p=>{const s=Math.max(...p.map(x=>mainSets(o,x.m,x.i)));
    t+=s*(p.reduce((a,x)=>a+workSec(o,x.m),0)+20*(p.length-1)+(p.length>1?superRest(o):g.rest))+60;});return t;}
  return 0;}
function fastCount(o,focus){const b=budget(o)/60;
  if(o.fmt==='circuit')return b>=33?6:5;
  if(o.fmt==='amrap')return b<12?3:b<20?4:5;
  return b<13?3:4;}
/* the main picks, sized to the time, plus core finisher picks */
function buildPicks(o,seed,soft,focus){if(!POOL)buildPool();
  const ctx={chosen:[],rng:rngOf(seed),soft,focus},all=[];
  for(const roles of tplOf(o,focus)){const m=choose(roles,o,ctx);if(m){ctx.chosen.push(m);all.push({roles,k:m.k});}}
  let n;
  if(FAST(o))n=Math.min(all.length,fastCount(o,focus));
  else{n=Math.min(2,all.length);const B=budget(o);while(n<all.length&&est(all.slice(0,n+1).map(p=>META[p.k]),o)<=B*1.06)n++;}
  const picks=all.slice(0,n);
  if(o.fin&&!['core'].includes(focus||o.focus)){const c2={chosen:picks.map(p=>META[p.k]),rng:ctx.rng,soft,focus,fin:true};
    const fn=o.time<=20?1:2;for(let i=0;i<fn;i++){const roles=i?['rot','core']:['core'];const m=choose(roles,o,c2);if(m){c2.chosen.push(m);picks.push({roles,k:m.k,fin:true});}}}
  return picks;}

/* ---------- prescriptions ---------- */
function rx(m,o,i,opt){const g=gpOf(o);
  let rpe=Math.min(10,Math.max(5,g.rpe+(o.eff==='easy'?-1.5:o.eff==='hard'?1:0)));
  let sets=mainSets(o,m,i),reps=`${g.r[0]}–${g.r[1]}`;const tips=[];
  const timed=m.hold||m.region==='cond'||m.region==='carry';
  if(m.hold)reps=o.goal==='endur'?'45 s':'30 s';
  else if(m.region==='carry')reps='30 m';
  else if((EX[m.k]||{}).u==='min'){reps=`${o.time<=20?2:3} min`;sets=Math.min(Math.max(sets,2),3);tips.push('steady, 1 min easy between');}
  else if(m.region==='cond'){reps='30 s';sets=Math.max(sets,5);tips.push('hard, then 30–60 s easy');}
  else if(o.goal==='power'&&m.roles.has('plyo'))reps='3–5';
  let s=`${sets} × ${reps}`;
  if(opt){const lo=g.r[0],hi=g.r[1],k=opt.k;
    let sc=opt.prog;if(!m.loaded&&['double','linear','cluster'].includes(sc))sc='reps';if(sc==='cluster'&&!(i<2&&m.compound))sc='double';
    if(timed){const add=Math.min(k,4);if(m.hold){reps=`${parseInt(reps,10)+add*5} s`;s=`${sets} × ${reps}`;}
      else if(m.region==='carry'){s=`${sets} × ${30+add*10} m`;tips.push('heavier once the distance feels easy');}
      else{s=`${sets+Math.min(k,3)} × 30 s`;}}
    else if(sc==='double'){s=`${sets} × ${lo}–${hi}`;tips.push(`all sets at ${hi} → add 2.5–5 kg`);}
    else if(sc==='setsreps'){const step=Math.max(1,Math.round((hi-lo)/2)),rr=[lo,Math.min(hi,lo+step),hi],c=k%9;
      sets=g.s[0]+(c%3);s=`${sets} × ${rr[Math.floor(c/3)]}`;
      tips.push(c===0&&k>0?'new cycle · add load':'same load as last week');}
    else if(sc==='reps'){const c=k%3;sets=g.s[0]+1+c;const r=lo+Math.floor(k/3);s=`${sets} × ${m.loaded?r:Math.max(r,6)}`;tips.push('all reps done → one more set next week');}
    else if(sc==='linear'){const mid=Math.round((lo+hi)/2);s=`${sets} × ${mid}`;tips.push(m.roles.has('squat')||m.roles.has('hinge')?'+5 kg a week':'+2.5 kg a week');}
    else if(sc==='cluster'){const c=o.goal==='endur'?4:o.goal==='muscle'?3:2;s=`${sets} × (${c}+${c}+${c})`;tips.push(`15–20 s between mini-sets · a load you could lift about ${c*2} times`);}
    if(opt.auto&&!timed)rpe=Math.min(9.5,rpe-.5+.5*(opt.kb%opt.blockLen));
    if(opt.deload){const n=parseInt(s,10);s=s.replace(/^\d+/,String(Math.max(2,Math.round(n*.6))));rpe=6;tips.length=0;tips.push('deload · same load, fewer sets, stop well short of failure');}}
  const nt=[];if(!timed||m.hold)nt.push(rpeTxt(rpe)+(opt&&opt.auto&&!timed&&!opt.deload?' on the last set':''));
  if(!opt||!opt.deload){if(o.eff==='hard'&&!timed)nt.push('last set to failure');if(o.goal==='muscle'&&!timed)nt.push('slow lowering');}
  const A=apprOf(o),cues=A&&A.cues&&(!opt||!opt.deload)&&!timed?A.cues.slice(0,2):[];
  return{s,nt:[...nt,...cues,...tips].filter((x,i,a)=>a.indexOf(x)===i).join(' · ')};}
const LET='ABCDEFGHIJ';
const isPush=m=>m.roles.has('hpush')||m.roles.has('vpush')||m.roles.has('tri');
const isPull=m=>m.roles.has('hpull')||m.roles.has('vpull')||m.roles.has('curl');
const goodPair=(a,b)=>!(a.grip&&b.grip)&&(a.region!==b.region||(isPush(a)&&isPull(b))||(isPull(a)&&isPush(b)));
function pairUp(list){const left=[...list],out=[];
  while(left.length){const a=left.shift();let j=left.findIndex(b=>goodPair(a.m,b.m));if(j<0)j=left.length?0:-1;
    out.push(j<0?[a]:[a,left.splice(j,1)[0]]);}return out;}
function interleave(list){const lo=list.filter(x=>x.m.region==='lower'),up=list.filter(x=>x.m.region==='upper'),
  rest=list.filter(x=>x.m.region!=='lower'&&x.m.region!=='upper'),pw=rest.filter(x=>x.m.region==='cond'),tail=rest.filter(x=>x.m.region!=='cond'),out=[...pw];
  while(lo.length||up.length){if(lo.length)out.push(lo.shift());if(up.length)out.push(up.shift());}return[...out,...tail];}
/* turn picks into session items; each item remembers its pick (_p) for swaps */
function assemble(picks,o,opt){const g=gpOf(o),out=[],short=o.time<=20;
  const main=picks.map((p,i)=>({p,i,m:META[p.k]})).filter(x=>x.m&&!x.p.fin),fin=picks.map((p,i)=>({p,i,m:META[p.k]})).filter(x=>x.m&&x.p.fin);
  if(o.warm)out.push({grp:'Warm-up'},{n:'Warm-up',s:`${short?3:5} min`,nt:'easy cardio and joint circles, then two light sets of the first exercise'});
  const row=(x,j,s,nt)=>({id:x.p.k,s,nt,_p:x.i});
  if(o.fmt==='straight'){out.push({grp:`Main · rest ${restTxt(g.rest)} between sets`});
    main.forEach((x,j)=>{const r=rx(x.m,o,j,opt);out.push(row(x,j,r.s,r.nt));});}
  else if(o.fmt==='super'){pairUp(main.map((x,j)=>({...x,j}))).forEach((pr,n)=>{
      out.push({grp:pr.length>1?`${LET[n]}1–${LET[n]}2 · superset · rest ${restTxt(superRest(o))} after the pair`:`${LET[n]} · rest ${restTxt(g.rest)} between sets`});
      pr.forEach(x=>{const r=rx(x.m,o,x.j,opt);out.push(row(x,x.j,r.s,r.nt));});});}
  else if(o.fmt==='circuit'){const rr={power:120,strength:90,muscle:75,endur:45}[o.goal];
    const lowr=main.filter(x=>x.m.region==='lower'||x.m.region==='cond'),rest=main.filter(x=>!lowr.includes(x));
    const groups=main.length<6?[main]:lowr.length>=2&&rest.length>=2?[lowr,rest]:(o=>[o.filter((x,i)=>i%2===0),o.filter((x,i)=>i%2)])(interleave(main));
    groups.filter(gr=>gr.length).forEach((gr,n,arr)=>{const ord=interleave(gr),rt=ord.reduce((t,x)=>t+workSec(o,x.m)+15,0)+rr;
      let R=Math.max(2,Math.min(5,Math.floor(budget(o)/arr.length/rt)));if(opt)R=opt.deload?Math.max(2,R-1):R+Math.min(2,opt.k%3);
      out.push({grp:`${arr.length>1?`Circuit ${LET[n]}`:'Circuit'} · ${R} rounds · rest ${restTxt(rr)} between rounds`});
      ord.forEach((x,j)=>{const r=rx(x.m,o,j,opt);const reps=r.s.replace(/^\d+\s*×\s*/,'');
        out.push(row(x,j,`${R} × ${reps}`,r.nt.replace(/RPE [\d–.]+( · )?/,'')));});});}
  else{const cap=Math.max(6,Math.floor(budget(o)/60)),ord=interleave(main);
    const repsOf=(x)=>{const m=x.m;if(m.hold)return'20 s';if(m.region==='carry')return'20 m';if(m.region==='cond')return'10 cal';
      const lo=o.fmt==='emom'?{power:3,strength:5,muscle:8,endur:12}[o.goal]:Math.round((gpOf(o).r[0]+gpOf(o).r[1])/2);
      return`${lo+(opt&&!opt.deload?Math.min(2,opt.k%3):0)} reps`;};
    if(o.fmt==='amrap'){const blocks=cap>25?2:1,len=blocks>1?Math.floor((cap-2)/2):cap;
      for(let b=0;b<blocks;b++){if(b)out.push({grp:'Rest'},{n:'Rest 120 sec',s:''});
        out.push({grp:`AMRAP ${len}${blocks>1?` · ${LET[b]}`:''}`});
        ord.forEach((x,j)=>out.push(row(x,j,repsOf(x),opt?'beat last week’s rounds':'')));}}
    else{out.push({grp:`EMOM ${cap}`});ord.forEach((x,j)=>out.push(row(x,j,repsOf(x),`minute ${j+1}, ${j+1+ord.length}, ${j+1+2*ord.length} …`)));}}
  if(fin.length){out.push({grp:`Core finisher ${short?'20/10':'30/15'} X ${short?2:3} Rounds`});
    fin.forEach(x=>out.push({id:x.p.k,s:short?'20 s':'30 s',nt:'',_p:x.i}));}
  return out;}
function estMin(picks,o){const ms=picks.filter(p=>!p.fin).map(p=>META[p.k]).filter(Boolean),short=o.time<=20;
  let t=(o.warm?(short?180:300):0)+(picks.some(p=>p.fin)?(short?120:270):0);
  if(FAST(o))t+=budget(o);else t+=est(ms,o);return Math.max(5,Math.round(t/60));}

/* ---------- state ---------- */
let G=null;
const view=document.createElement('div');view.id='v-gen';view.className='wrap hide';
view.innerHTML=`<button class="back" id="genBack">‹ Home</button><p class="eyebrow" id="genEy">Own session</p><div id="genBody" style="padding-bottom:40px"></div>`;
document.getElementById('v-build').after(view);
const body=view.querySelector('#genBody');
const _show=show;show=function(v){_show(v);view.classList.toggle('hide',v!=='gen');};
function prefs(){const o=Object.assign({},DEF,S.genPrefs||{});o.eq=[...(o.eq||[])];
  /* answers saved before bodyweight and rack became choices: keep what they meant */
  if(!o.eqv){if(!o.eq.includes('bw'))o.eq.unshift('bw');if(o.eq.includes('bb')&&!o.eq.includes('rack'))o.eq.push('rack');o.eqv=2;}
  return o;}
function genOpen(){buildPool();G={step:1,o:prefs(),p:Object.assign({},PDEF),seed:Date.now()%1e6,swaps:0,key:null,title:''};show('gen');render();}
function genEdit(day){buildPool();const gd=day.gen||{};
  G={step:2,o:Object.assign({},DEF,gd.o||{}),p:Object.assign({},PDEF),seed:gd.seed||1,swaps:0,key:day.key,title:day.n,picks:(gd.picks||[]).filter(p=>META[p.k])};
  if(!G.picks.length)G.picks=buildPicks(G.o,G.seed);show('gen');render();}
window.blockGen=genOpen;
/* open the generator straight on a suggestion, from answers given elsewhere (the chat) */
window.blockGenFrom=(patch,title)=>{genOpen();Object.assign(G.o,patch||{});S.genPrefs=JSON.parse(JSON.stringify(G.o));save();
  G.picks=buildPicks(G.o,G.seed);G.title=title||autoTitle(G.o);G.step=2;render();};
document.getElementById('genBack').onclick=()=>{if(G&&G.step===3){G.step=2;render();return;}
  if(G&&G.step===2&&!G.key){G.step=1;render();return;}
  if(G&&G.key){S.prog='custom';S.sess=G.key;show('session');renderSession();return;}
  show('home');renderHome();};

/* ---------- step 1: questions ---------- */
function chips(name,list,val,multi){return`<div class="gchips" data-g="${name}"${multi?' data-m="1"':''}>${list.map(([k,l,sub])=>{
  const on=multi?val.includes(k):val===k;return`<button class="gchip${on?' on':''}" data-v="${k}" aria-pressed="${on}">${esc(l)}${sub?`<small>${esc(sub)}</small>`:''}</button>`;}).join('')}</div>`;}
const q=(t,inner)=>`<div class="gq"><h4>${t}</h4>${inner}</div>`;
const sec=(t,inner)=>`<section class="gsec"><h3>${t}</h3>${inner}</section>`;
const CHEV='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
const TICK='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
/* a stepped slider for ordered choices (effort) */
const SL={eff:EFF};
function slider(name,title,val){const list=SL[name],i=Math.max(0,list.findIndex(x=>x[0]===val));
  return`<div class="gsl" data-s="${name}"><div class="gslh"><h4>${title}</h4><span class="gslv"></span></div>
    <input type="range" min="0" max="${list.length-1}" step="1" value="${i}" aria-label="${title}">
    <div class="gslt">${list.map(([,l],j)=>`<button type="button" data-i="${j}" tabindex="-1">${esc(l)}</button>`).join('')}</div></div>`;}
function paintSl(sl){const list=SL[sl.dataset.s],inp=sl.querySelector('input'),i=+inp.value,max=list.length-1;
  inp.style.setProperty('--p',`calc(${i/max*100}% + ${13-26*i/max}px)`);inp.setAttribute('aria-valuetext',list[i][1]);
  sl.querySelector('.gslv').innerHTML=`${esc(list[i][1])} <small>· ${esc(list[i][2]||'')}</small>`;
  sl.querySelectorAll('.gslt button').forEach((b,j)=>b.classList.toggle('on',j===i));}
/* a long list behind one row: opts [[value,label,sub,group]] */
function picker(name,title,opts,val,multi,none){
  const groups=[...new Set(opts.map(o=>o[3]||''))],many=opts.length>12;
  const row=o=>{const on=multi?val.includes(o[0]):val===o[0];
    return`<button type="button" class="gpo${on?' on':''}" data-v="${esc(o[0])}" data-l="${esc(o[1])}" data-sub="${esc(o[2]||'')}" role="${multi?'menuitemcheckbox':'menuitemradio'}" aria-checked="${on}"><span><b>${esc(o[1])}</b>${o[2]?`<small>${esc(o[2])}</small>`:''}</span><i>${TICK}</i></button>`;};
  return`<div class="gq gpk" data-p="${name}"${multi?' data-m="1"':''} data-none="${esc(none)}"><h4>${title}</h4>
    <button type="button" class="gsel" aria-expanded="false"><span><b></b><small></small></span>${CHEV}</button>
    <div class="gpl" hidden role="menu">${many?`<input class="gpf" type="search" placeholder="Search" aria-label="Search ${title.toLowerCase()}">`:''}
    ${groups.map(g=>(g?`<p class="gpg">${esc(g)}</p>`:'')+opts.filter(o=>(o[3]||'')===g).map(row).join('')).join('')}</div></div>`;}
function paintPk(pk){const multi=!!pk.dataset.m,on=[...pk.querySelectorAll('.gpo.on')],b=pk.querySelector('.gsel b'),sm=pk.querySelector('.gsel small');
  if(multi){const n=on.filter(r=>r.dataset.v);b.textContent=n.length?n.slice(0,2).map(r=>r.dataset.l).join(', ')+(n.length>2?` +${n.length-2}`:''):pk.dataset.none;
    sm.textContent=n.length?`${n.length} picked`:'Tap to pick';}
  else{const r=on[0];b.textContent=r?r.dataset.l:pk.dataset.none;sm.textContent=r?r.dataset.sub:'';}}
function questions(o,withFocus){
  const own=window.BLOCK_OWN_GROUP||'Your own builds';
  const progs=[...new Set(PROGRAMS.filter(P=>P.id!=='custom'&&!P.gen).map(P=>P.group||'Other'))].sort((a,b)=>a===own?-1:b===own?1:a.localeCompare(b)).map(g=>[g,g]);
  const ap=APPR().slice().sort((a,b)=>(a.by||'').localeCompare(b.by||'')),cur=apprOf(o);
  return(withFocus?sec('Today',q('Time',chips('time',TIME,o.time))+q('Focus',chips('focus',FOCUS,o.focus))):sec('Session',q('Time per session',chips('time',TIME,o.time))))
   +sec('Equipment',`<div class="gpre">${EQ_PRE.map(([l],i)=>`<button data-pre="${i}">${l}</button>`).join('')}</div>${chips('eq',EQ,o.eq,true)}<p class="gmsg" style="margin-top:8px">Turn off Bodyweight to leave out moves without equipment.</p>`)
   +sec('Training',q('Goal',chips('goal',GOAL,o.goal))+slider('eff','Intensity',o.eff)+q('Format',chips('fmt',FMT,o.fmt)))
   +`<details class="gmore"${o.avoid.length||o.from.length||o.appr?' open':''}><summary><span>More options<small>Approach, things to go easy on, creators</small></span></summary>`
   +`<section class="gsec">`+picker('appr','Approach',[['','None','plain rules'],...ap.map(a=>[a.id,a.n,a.short||'',a.by])],o.appr||'',false,'None')
   +`<p class="gmsg" id="gApprTxt">${cur?esc(cur.details||cur.short||''):'Pick a coach’s way of training to shape sets, reps, rest and format. Only this session uses it.'}</p>`
   +q('Go easy on',chips('avoid',AVOID,o.avoid,true))
   +q('Include',chips('extra',EXTRA,EXTRA.filter(([k])=>o[k]).map(([k])=>k),true))
   +picker('from','Lean on these creators',progs,o.from,true,'Any creator')+`</section></details>`;}
function wire(target,after){wireInto(body,target,after);}
function renderAsk(){
  body.innerHTML=`<h2 class="gh">What do you have today?</h2><p class="sub">Describe it in a sentence, or tap your answers. Your last answers stay picked.</p>
    <div class="gq"><textarea id="gTell" rows="2" class="gtitle" style="font-size:16px;font-weight:500;min-height:60px" placeholder="e.g. 20 min in a hotel room, sore knee, want to sweat"></textarea>
    <button class="btn-s gwide" id="gTellGo">Build it from this</button><p class="gmsg" id="gTellMsg" role="status"></p></div>
    ${questions(G.o,true)}
    <div class="gbar"><button class="gout" id="gSelf">Build it myself</button><button class="pgo" id="gGo">Suggest a session</button></div>`;
  wire(G.o);
  body.querySelector('#gGo').onclick=()=>{S.genPrefs=JSON.parse(JSON.stringify(G.o));save();
    G.picks=buildPicks(G.o,G.seed);G.title=autoTitle(G.o);G.step=2;render();};
  body.querySelector('#gSelf').onclick=()=>buildOpen(null);
  body.querySelector('#gTellGo').onclick=async e=>{const t=body.querySelector('#gTell').value.trim(),msg=body.querySelector('#gTellMsg'),btn=e.currentTarget;
    if(!t){body.querySelector('#gTell').focus();return;}
    let patch=parseToday(t),title='';const A=window.blockAI;
    if(A&&A.ready()){btn.disabled=true;btn.textContent='Reading…';
      try{const r=await A.ask({system:A.SYS+' Turn a description of today into session settings. Keep what the user did not mention as "keep".',
          prompt:`Today: ${t}\nCurrent answers: ${JSON.stringify(G.o)}\nApproaches available: ${APPR().map(a=>a.id+' = '+a.n+' ('+a.by+')').join('; ')}`,
          schema:A.obj({time:A.num,focus:{type:'string',enum:[...FOCUS.map(f=>f[0]),'keep']},eq:A.arr({type:'string',enum:EQ.map(x=>x[0])}),eq_keep:{type:'boolean'},
            goal:{type:'string',enum:[...GOAL.map(f=>f[0]),'keep']},eff:{type:'string',enum:[...EFF.map(f=>f[0]),'keep']},fmt:{type:'string',enum:[...FMT.map(f=>f[0]),'keep']},
            avoid:A.arr({type:'string',enum:AVOID.map(x=>x[0])}),appr:{type:'string',enum:['',...APPR().map(a=>a.id),'keep']},title:A.str})});
        patch={};if(r.time>0)patch.time=TIME.map(x=>x[0]).reduce((b,x)=>Math.abs(x-r.time)<Math.abs(b-r.time)?x:b,30);
        ['focus','goal','eff','fmt','appr'].forEach(k=>{if(r[k]!=='keep')patch[k]=r[k];});if(!r.eq_keep)patch.eq=r.eq;patch.avoid=r.avoid;title=r.title;}
      catch(err){msg.textContent=err.message+' Used the simple reader instead.';}
      btn.disabled=false;btn.textContent='Build it from this';}
    Object.assign(G.o,patch);S.genPrefs=JSON.parse(JSON.stringify(G.o));save();
    G.picks=buildPicks(G.o,G.seed);G.title=title||autoTitle(G.o);G.step=2;render();};}
/* a simple reader for "20 min hotel room, sore knee, want to sweat" — used without an AI key */
function parseToday(t){const s=t.toLowerCase(),p={};
  const m=s.match(/(\d{1,3})\s*(?:min|m\b|minuter|minutes)/)||s.match(/(?:half an hour|halvtimme)/)&&['',30]||s.match(/(?:an hour|en timme|timme)/)&&['',60];
  if(m){const v=+m[1];p.time=TIME.map(x=>x[0]).reduce((b,x)=>Math.abs(x-v)<Math.abs(b-v)?x:b,30);}
  const F=[['fpush',/push.{0,6}(legs|ben)/],['fpull',/pull.{0,6}(hinge|mark)/],['upper',/upper|överkropp/],['lower',/lower|legs?\b|ben\b|underkropp/],['push',/\bpush|press/],['pull',/\bpull|drag/],
    ['core',/core|abs|mage|bål/],['cond',/sweat|svett|cardio|kondition|conditioning|flås/],['full',/full|hela kroppen|helkropp/]];
  for(const[k,re]of F)if(re.test(s)){p.focus=k;break;}
  if(/hotel|hotell|nothing|ingenting|no equipment|utan utrustning|bodyweight|kroppsvikt|travel|resa/.test(s))p.eq=['bw'];
  else{const eq=[];[['db',/dumbbell|hantel|hantlar|\bdb\b/],['kb',/kettlebell|\bkb\b/],['bb',/barbell|skivstång|stång|gym/],['bar',/pull-?up bar|räcke|chins/],['rings',/rings|ringar/],['band',/band/],['mach',/cable|kabel|maskin|gym/],['sb',/sandbag|sandsäck/],['mace',/\bmace|klubba|stålklubba/]]
    .forEach(([k,re])=>{if(re.test(s))eq.push(k);});if(eq.includes('bb')&&/gym|rack|ställning/.test(s))eq.push('rack');if(eq.length)p.eq=['bw',...eq];}
  const av=[];[['knee',/knä|knee/],['back',/rygg|back/],['shoulder',/axel|shoulder/],['wrist',/handled|wrist/]].forEach(([k,re])=>{if(re.test(s)&&/(sore|ont|pain|skad|öm|injur|stel|tweak)/.test(s))av.push(k);});if(av.length)p.avoid=av;
  if(/sweat|svett|flås|pulse|puls|cardio|kondition/.test(s)){p.goal='endur';p.fmt='circuit';}
  else if(/heavy|tungt|strength|styrka|max/.test(s))p.goal='strength';
  else if(/explosive|explosiv|power|snabb|jump|hopp/.test(s))p.goal='power';
  else if(/muscle|muskler|pump|hypertroph|bygga/.test(s))p.goal='muscle';
  if(/easy|lätt|tired|trött|lugnt|recover|återhämt/.test(s))p.eff='easy';else if(/hard|tufft|hårt|crush|maxa/.test(s))p.eff='hard';
  if(/amrap/.test(s))p.fmt='amrap';else if(/emom/.test(s))p.fmt='emom';else if(/circuit|cirkel/.test(s))p.fmt='circuit';else if(/superset/.test(s))p.fmt='super';
  return p;}
window.blockParseToday=parseToday;
const autoTitle=o=>`${lab(FOCUS,o.focus)} · ${lab(GOAL,o.goal).toLowerCase()}`;

/* ---------- step 2: the suggestion ---------- */
const ROLE={squat:'squat',lunge:'lunge',hinge:'hinge',hpush:'horizontal push',vpush:'vertical push',hpull:'horizontal pull',vpull:'vertical pull',
  curl:'biceps',tri:'triceps',delt:'shoulders',calf:'calves',legacc:'quads',hamacc:'hamstrings',core:'core',rot:'rotation',carry:'carry',cond:'conditioning',plyo:'jumps',power:'power'};
function why(){const o=G.o,main=G.picks.filter(p=>!p.fin),parts=[];
  const names=main.map(p=>{const m=META[p.k];const r=p.roles.find(x=>m&&m.roles.has(x))||p.roles[0];return ROLE[r];});
  const uniq=names.filter((x,i)=>names.indexOf(x)===i);
  parts.push(`${uniq.length>1?uniq.slice(0,-1).join(', ')+' and '+uniq[uniq.length-1]:uniq[0]||'—'}${G.picks.some(p=>p.fin)?', then a core finisher':''}.`.replace(/^./,c=>c.toUpperCase()));
  parts.push({straight:'Big lifts first while you are fresh, smaller work after.',super:'Each pair mixes upper and lower, or push and pull, so one side rests while the other works.',
    circuit:'Upper and lower alternate, so each station rests the one before it (Flolyfe: two upper, two lower, one core).',
    amrap:'Upper and lower alternate so you can keep moving. Score the rounds.',emom:'One exercise per minute in turn. What is left of the minute is your rest.'}[o.fmt]);
  const A=apprOf(o);if(A)parts.push(`Approach: ${A.n} (${A.by}). ${A.short||''}`);
  const cnt={};main.forEach(p=>{const m=META[p.k];(m&&m.src||[]).forEach(id=>cnt[id]=(cnt[id]||0)+1);});
  const top=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]).slice(0,3).map(id=>(progById(id)||{}).n).filter(Boolean);
  if(top.length)parts.push(`From your programs: ${top.join(', ')}.`);
  return parts.map(esc).join(' ');}
const SWAP_SVG='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4L3 8l4 4"/><path d="M3 8h13a4 4 0 0 1 4 4"/><path d="M17 20l4-4-4-4"/><path d="M21 16H8a4 4 0 0 1-4-4"/></svg>';
const X_SVG='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
/* the swap picker: alternatives for the same slot first, or search the whole library */
function pickerHTML(i){const o=G.o,p=G.picks[i],others=G.picks.filter((x,j)=>j!==i).map(x=>META[x.k]).filter(Boolean),q=(G.pickQ||'').trim().toLowerCase();
  let list;
  if(q)list=Object.keys(EX).filter(k=>k!==p.k&&EX[k].n&&EX[k].n.toLowerCase().includes(q)).slice(0,12).map(k=>({k,why:(META[k]&&ok(META[k],o))?'':'needs other gear'}));
  else{const ctx={chosen:others,rng:rngOf(G.seed+i*13)};list=candidates(p.roles,o,ctx,new Set([p.k])).map(m=>({m,w:weight(m,o,p.roles,ctx)}))
    .sort((a,b)=>b.w-a.w).slice(0,8).map(x=>({k:x.m.k,why:ROLE[p.roles.find(r=>x.m.roles.has(r))||p.roles[0]]||''}));}
  return`<div class="gpick"><h5>Swap ${esc((EX[p.k]||{}).n||'')} for</h5>
    <input type="search" placeholder="Search all exercises" value="${esc(G.pickQ||'')}" aria-label="Search all exercises" autocomplete="off">
    ${list.length?list.map(x=>`<button class="gopt" data-k="${esc(x.k)}"><span>${esc(EX[x.k].n)}</span><small>${esc(x.why)}</small></button>`).join(''):'<p class="gmsg">Nothing matches.</p>'}
    <button class="btn-s gwide" data-auto="1" style="margin-top:8px">Pick one for me</button></div>`;}
function renderSuggest(){const o=G.o,items=assemble(G.picks,o);
  let h=`<input id="gTitle" class="gtitle" value="${esc(G.title)}" aria-label="Session name">
    <p class="sub">~${estMin(G.picks,o)} min · ${lab(FMT,o.fmt).toLowerCase()} · ${lab(GOAL,o.goal).toLowerCase()} · ${lab(EFF,o.eff).toLowerCase()}</p>
    <p class="gwhy">${why()}</p>`;
  items.forEach(it=>{if(it.grp){h+=`<h4 class="ggrp">${esc(it.grp)}</h4>`;return;}
    if(!it.id){h+=`<div class="gplain"><b>${esc(it.n)}</b> · ${esc(it.s)}${it.nt?` · ${esc(it.nt)}`:''}</div>`;return;}
    const ex=exOf({id:it.id}),th=window.blockThumb?blockThumb(ex,44):'';
    h+=`<div class="grow"><button class="gex" data-x="${it.id}">${th}<span><b>${esc(ex.n)}</b><small>${esc(it.s)}${it.nt?` · ${esc(it.nt)}`:''}</small></span></button>
      <button class="gsw${G.pickOpen===it._p?' on':''}" data-sw="${it._p}" aria-label="Swap ${esc(ex.n)}" aria-expanded="${G.pickOpen===it._p}">${SWAP_SVG}</button><button class="gdel" data-rm="${it._p}" aria-label="Remove ${esc(ex.n)}">${X_SVG}</button></div>`;
    if(G.pickOpen===it._p)h+=pickerHTML(it._p);});
  h+=`<p class="gmsg" id="gMsg" role="status"></p>
    ${FAST(o)?'':'<button class="btn-s gwide" id="gAdd">+ Add an exercise</button>'}
    <section class="gsec"><h3>Keep it</h3><div class="gkeep"><button class="btn-s" id="gSave">${G.key?'Save changes':'Save to own sessions'}</button><button class="btn-s" id="gProg">Make it a program</button></div>
    <div class="glinks"><button class="plink" id="gAsk">Change answers</button><button class="plink" id="gSelf">Build it myself</button></div></section>
    <div class="gbar"><button class="gout" id="gShuf">Shuffle</button><button class="pgo" id="gStart">Start session</button></div>`;
  body.innerHTML=h;
  const $=id=>body.querySelector('#'+id),msg=t=>{$('gMsg').textContent=t;};
  $('gTitle').oninput=e=>{G.title=e.target.value;};
  body.querySelectorAll('.gex').forEach(b=>b.onclick=()=>window.exOpen&&exOpen(exOf({id:b.dataset.x})));
  body.querySelectorAll('[data-sw]').forEach(b=>b.onclick=()=>{const i=+b.dataset.sw;G.pickOpen=G.pickOpen===i?null:i;G.pickQ='';renderSuggest();
    const pk=body.querySelector('.gpick');if(pk)pk.scrollIntoView({block:'nearest',behavior:'smooth'});});
  const pk=body.querySelector('.gpick');
  if(pk){const i=G.pickOpen,p=G.picks[i];
    const use=k=>{const cur=META[p.k];G.picks[i]={...p,k};G.pickOpen=null;G.seen={};renderSuggest();msg(`Swapped ${cur?cur.n:''} for ${(EX[k]||{}).n||k}.`);};
    pk.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>use(b.dataset.k));
    const qi=pk.querySelector('input');qi.oninput=()=>{G.pickQ=qi.value;const pos=qi.selectionStart;renderSuggest();const n=body.querySelector('.gpick input');n.focus();n.setSelectionRange(pos,pos);};
    pk.querySelector('[data-auto]').onclick=()=>autoSwap(i);}
  function autoSwap(i){const p=G.picks[i],cur=META[p.k];G.pickOpen=null;
    const others=G.picks.filter((x,j)=>j!==i).map(x=>META[x.k]).filter(Boolean);
    G.seen=G.seen||{};const seen=G.seen[i]=G.seen[i]||new Set([p.k]);
    let m=choose(p.roles,o,{chosen:others,rng:rngOf(G.seed+(++G.swaps)*7919)},seen);
    if(!m){seen.clear();seen.add(p.k);m=choose(p.roles,o,{chosen:others,rng:rngOf(G.seed+G.swaps*31)},seen);}
    if(!m){msg(`No other ${ROLE[p.roles[0]]} fits your equipment.`);return;}
    seen.add(m.k);G.picks[i]={...p,k:m.k};renderSuggest();msg(`Swapped ${cur?cur.n:''} for ${m.n}.`);}
  body.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{if(G.picks.filter(p=>!p.fin).length<=1&&!G.picks[+b.dataset.rm].fin){msg('Keep at least one exercise.');return;}
    G.picks.splice(+b.dataset.rm,1);G.seen={};renderSuggest();});
  if($('gAdd'))$('gAdd').onclick=()=>{const chosen=G.picks.map(p=>META[p.k]).filter(Boolean),ctx={chosen,rng:rngOf(G.seed+(++G.swaps)*131)};
    const used=new Set(G.picks.map(p=>p.roles.join()));let m=null,roles=null;
    for(const r of tplOf(o)){if(used.has(r.join()))continue;m=choose(r,o,ctx);if(m){roles=r;break;}}
    if(!m){roles=['curl','tri','delt','core','calf','carry'];m=choose(roles,o,ctx);}
    if(!m){msg('Nothing else fits your answers.');return;}
    const at=G.picks.findIndex(p=>p.fin);G.picks.splice(at<0?G.picks.length:at,0,{roles,k:m.k});G.seen={};renderSuggest();msg(`Added ${m.n}.`);};
  $('gShuf').onclick=()=>{G.seed+=101;G.seen={};G.picks=buildPicks(o,G.seed);renderSuggest();};
  $('gStart').onclick=()=>{const k=saveDay();S.prog='custom';S.sess=k;save();playOpen('custom',k,'home');};
  $('gSave').onclick=()=>{saveDay();S.prog='custom';save();show('program');renderProgram();};
  $('gProg').onclick=()=>{G.p.name='';const A=apprOf(G.o);if(A&&A.prog)G.p.prog=A.prog;G.step=3;render();};
  $('gAsk').onclick=()=>{G.step=1;render();};
  $('gSelf').onclick=()=>buildOpen(null);}
const clean=items=>items.map(it=>{const c={...it};delete c._p;if(!c.nt)delete c.nt;return c;});
function saveDay(){const o=G.o,items=clean(assemble(G.picks,o)),title=(G.title||'').trim()||autoTitle(o);
  const gen={o:JSON.parse(JSON.stringify(o)),picks:G.picks.map(p=>({roles:p.roles,k:p.k,fin:p.fin||undefined})),seed:G.seed};
  const tag=`~${estMin(G.picks,o)} min`;
  if(G.key){const d=S.custom.find(x=>x.key===G.key);if(d){Object.assign(d,{n:title,items,tag,gen});save();return G.key;}}
  const key='c_'+uid();S.custom.unshift({key,eyebrow:`Own · ${fmtDate(Date.now())}`,n:title,hard:true,tag,items,gen});G.key=key;save();return key;}

/* ---------- step 3: make it a program ---------- */
function splitOf(p,focus){let s=p.split;const d=p.days;
  if(s==='auto'){if(focus==='fpush'||focus==='fpull')s='fpp';else if(d<=3)s=(focus==='push'||focus==='pull')&&d===3?'ppl':'full';
    else if(d===4)s='ul';else if(d===5)s='ulppl';else s='ppl';}
  const cyc={full:['full'],ul:['upper','lower'],fpp:['fpush','fpull'],ppl:['push','pull','lower'],ulppl:['upper','lower','push','pull','lower']}[s];
  let seq=Array.from({length:d},(_,i)=>cyc[i%cyc.length]);
  const at=seq.indexOf(focus);if(at>0)seq=[...seq.slice(at),...seq.slice(0,at)];
  return{s,seq,usesToday:seq[0]===focus};}
const SPLIT_LAB={full:'Full body',ul:'Upper/lower',fpp:'Push/pull',ppl:'PPL',ulppl:'Upper/lower + PPL'};
const DAY_LAB={full:'Full body',upper:'Upper',lower:'Lower',push:'Push',pull:'Pull',fpush:'Push + legs',fpull:'Pull + hinge',core:'Core',cond:'Conditioning'};
function deloadWeeks(p){return p.deload?Array.from({length:p.weeks},(_,i)=>i+1).filter(w=>w%p.deload===0):[];}
function summary(){const p=G.p,sp=splitOf(p,G.o.focus),dl=deloadWeeks(p);
  return`<b>${p.days} days a week · ${p.weeks} weeks · ${p.days*p.weeks} sessions</b><br>${SPLIT_LAB[sp.s]}: ${sp.seq.map(f=>DAY_LAB[f]).join(', ')}.<br>`
   +`${lab(PROG,p.prog)}${p.auto==='on'?', autoregulated by RPE':''}. ${dl.length?`Deload in week ${dl.join(' and ').replace(/ and (?=.* and )/g,', ')}.`:'No deload weeks.'}`
   +(sp.usesToday?'<br>Today’s session is day 1.':`<br>Today’s session doesn’t match this split, so it stays in your own sessions.`);}
function renderProgForm(){const p=G.p;
  body.innerHTML=`<h2 class="gh">Make it a program</h2><p class="sub">Today’s session becomes day 1. The other days are built from the same answers, without repeating exercises where there are alternatives.</p>
    <input id="gpName" class="gtitle" style="margin-top:18px;font-size:18px" placeholder="${esc(autoProgName())}" value="${esc(p.name)}" aria-label="Program name">
    ${sec('Schedule',q('Days a week',chips('days',[2,3,4,5,6].map(d=>[d,String(d)]),p.days))+q('Weeks',chips('weeks',[4,6,8,12].map(w=>[w,String(w)]),p.weeks))+q('Split',chips('split',SPLIT,p.split)))}
    ${sec('Progression',q('How it progresses',chips('prog',PROG,p.prog))+q('Autoregulation',chips('auto',AUTO,p.auto))+q('Deload',chips('deload',DELOAD,p.deload)))}
    <div class="gsum" id="gpSum">${summary()}</div>
    <details class="gmore"><summary><span>Session answers<small>Time, equipment, goal and more, same as today</small></span></summary>${questions(G.o,false)}</details>
    <div class="gbar"><button class="pgo" id="gpGo">Create program</button></div>`;
  wire(G.p,()=>{body.querySelector('#gpSum').innerHTML=summary();body.querySelector('#gpName').placeholder=autoProgName();});
  /* the session answers inside "Same answers" belong to G.o, not the program settings */
  wireInto(body.querySelector('.gmore'),G.o);
  body.querySelector('#gpName').oninput=e=>{G.p.name=e.target.value;};
  body.querySelector('#gpGo').onclick=()=>{const id=makeProgram();S.prog=id;progTab='sessions';save();show('program');renderProgram();};}
function wireInto(root,target,after){
  const pressed=(box,fn)=>box.querySelectorAll('.gchip').forEach(x=>{const on=fn(x);x.classList.toggle('on',on);x.setAttribute('aria-pressed',on);});
  root.querySelectorAll('.gchips').forEach(box=>{const name=box.dataset.g,multi=!!box.dataset.m;
    box.querySelectorAll('.gchip').forEach(b=>b.onclick=()=>{const raw=b.dataset.v,v=isNaN(+raw)?raw:+raw;
      if(name==='extra'){target[v]=!target[v];b.classList.toggle('on',target[v]);b.setAttribute('aria-pressed',target[v]);}
      else if(multi){const a=target[name],i=a.indexOf(v);if(i<0)a.push(v);else a.splice(i,1);b.classList.toggle('on',i<0);b.setAttribute('aria-pressed',i<0);}
      else{target[name]=v;pressed(box,x=>x===b);}
      after&&after(name);});});
  root.querySelectorAll('[data-pre]').forEach(b=>b.onclick=()=>{target.eq=[...EQ_PRE[+b.dataset.pre][1]];
    root.querySelectorAll('[data-g="eq"]').forEach(box=>pressed(box,x=>target.eq.includes(x.dataset.v)));after&&after('eq');});
  root.querySelectorAll('.gsl').forEach(sl=>{const name=sl.dataset.s,list=SL[name],inp=sl.querySelector('input');
    const set=i=>{inp.value=i;target[name]=list[i][0];paintSl(sl);after&&after(name);};
    inp.oninput=()=>set(+inp.value);sl.querySelectorAll('.gslt button').forEach(b=>b.onclick=()=>set(+b.dataset.i));paintSl(sl);});
  root.querySelectorAll('.gpk').forEach(pk=>{const name=pk.dataset.p,multi=!!pk.dataset.m,btn=pk.querySelector('.gsel'),list=pk.querySelector('.gpl'),f=pk.querySelector('.gpf');
    const toggle=open=>{list.hidden=!open;btn.setAttribute('aria-expanded',open);if(open&&f&&matchMedia('(pointer:fine)').matches)f.focus();};
    btn.onclick=()=>toggle(list.hidden);
    if(f)f.oninput=()=>{const t=f.value.trim().toLowerCase();
      list.querySelectorAll('.gpo').forEach(r=>r.hidden=!!t&&!r.textContent.toLowerCase().includes(t));
      list.querySelectorAll('.gpg').forEach(h=>{let n=h.nextElementSibling,any=false;while(n&&n.classList.contains('gpo')){if(!n.hidden)any=true;n=n.nextElementSibling;}h.hidden=!any;});};
    list.querySelectorAll('.gpo').forEach(r=>r.onclick=()=>{const v=r.dataset.v;
      if(multi){const a=target[name],i=a.indexOf(v);if(i<0)a.push(v);else a.splice(i,1);r.classList.toggle('on',i<0);r.setAttribute('aria-checked',i<0);}
      else{target[name]=v;list.querySelectorAll('.gpo').forEach(x=>{x.classList.toggle('on',x===r);x.setAttribute('aria-checked',x===r);});toggle(false);}
      paintPk(pk);
      if(name==='appr'){const A=apprOf(target),t=root.querySelector('#gApprTxt');if(t)t.textContent=A?(A.details||A.short||''):'';
        if(A&&A.fmt&&target.fmt!==undefined){target.fmt=A.fmt;root.querySelectorAll('[data-g="fmt"]').forEach(box=>pressed(box,x=>x.dataset.v===A.fmt));}}
      after&&after(name);});
    paintPk(pk);});}
function autoProgName(){const sp=splitOf(G.p,G.o.focus);return`${SPLIT_LAB[sp.s]} · ${lab(GOAL,G.o.goal).toLowerCase()} · ${G.p.weeks} weeks`;}
function typeOf(o,s){const t=FAST(o)?'Circuit':{power:'Power',strength:'Strength',muscle:'Hypertrophy',endur:'Endurance'}[o.goal];return[t,SPLIT_LAB[s],'Made by you'];}
function makeProgram(){const o=JSON.parse(JSON.stringify(G.o)),p={...G.p},sp=splitOf(p,o.focus),id='g_'+uid();
  const byFocus={},tpls=sp.seq.map((f,i)=>{const soft=new Set((byFocus[f]||[]).flat().map(x=>x.k));
    const picks=i===0&&sp.usesToday?G.picks.map(x=>({...x})):buildPicks({...o,focus:f},G.seed+(i+1)*977,soft,f);
    (byFocus[f]=byFocus[f]||[]).push(picks);return{f,picks,name:DAY_LAB[f]+(sp.seq.filter(x=>x===f).length>1?' '+LET[byFocus[f].length-1]:'')};});
  const days=[],dl=new Set(deloadWeeks(p));let k=0;
  for(let w=1;w<=p.weeks;w++){const deload=dl.has(w),blockLen=p.deload||4;
    const opt={k,kb:k%Math.max(1,blockLen-(p.deload?1:0)),blockLen:Math.max(1,blockLen-(p.deload?1:0)),deload,prog:p.prog,auto:p.auto==='on'};
    tpls.forEach((t,i)=>{const oo={...o,focus:t.f};
      days.push({key:`${id}w${w}d${i+1}`,eyebrow:`Week ${w} · Day ${i+1}${deload?' · deload':''}`,n:t.name,hard:!deload,
        tag:`~${estMin(t.picks,oo)} min`,items:clean(assemble(t.picks,oo,opt))});});
    if(!deload)k++;}
  const name=(p.name||'').trim()||autoProgName();
  const g={id,n:name,sub:`${p.days} days · ${p.weeks} weeks · ${lab(PROG,p.prog).toLowerCase()}`,type:typeOf(o,sp.s),made:Date.now(),o,p,days};
  S.myProgs=S.myProgs||[];S.myProgs.unshift(g);save();syncProgs();return id;}
function infoOf(g){const p=g.p||{},o=g.o||DEF,dl=p.weeks?deloadWeeks(p):[];
  const PT={double:'Each exercise has a rep range. When every set reaches the top of the range, add 2.5–5 kg and start again at the bottom.',
    setsreps:'Sets go up first, then reps: 3×8, 4×8, 5×8, 3×10 … up to 5×12 with the same load. After that, add load and start over at 3×8. This is how the Stronger by Science program builder runs accessories.',
    reps:'Bodyweight-style progression: one more set each week until the top of the set range, then one more rep per set and back to the lower set count.',
    linear:'Same sets and reps every week, a little more load each time: about 2.5 kg a week on upper body lifts and 5 kg on squats and hinges, as long as every rep stays clean.',
    cluster:'The first two big lifts use cluster sets: short mini-sets with 15–20 s between them, so you can handle a heavier load for more total reps. The rest use double progression.'};
  return`<h2 id="infoTitle">${esc(g.n)}</h2><p class="by">Made in BLOCK. · ${fmtDate(g.made||Date.now())}</p>
    ${(g.type||[]).map(t=>`<span class="pill2">${esc(t)}</span>`).join('')}
    <h4>How it progresses</h4><p>${PT[p.prog]||''} Bodyweight moves without added load use the rep increase instead. Holds, carries and conditioning get a little longer each week.</p>
    ${p.auto==='on'?'<h4>Autoregulation</h4><p>Each set has an RPE target that climbs a little through the block. Judge the last set: if it felt easier than the target, add 2.5–5 % next time; if it felt harder, take off 5 %. Your weights follow how you actually perform, not a fixed plan.</p>':''}
    <h4>Deloads</h4><p>${dl.length?`Week ${dl.join(', ')}: same load, about 40 % fewer sets, RPE 6. It clears fatigue before the next block.`:'No planned deloads. Take one when the RPE targets stop being reachable.'}</p>
    ${apprOf(o)?`<h4>Approach</h4><p>${esc(apprOf(o).n)} · ${esc(apprOf(o).by)}. ${esc(apprOf(o).details||apprOf(o).short||'')}</p>`:''}
    <h4>Built from</h4><p>${esc(o.time)} min · ${esc(o.eq.map(e=>lab(EQ,e).toLowerCase()).join(', ')||'bodyweight')} · ${esc(lab(GOAL,o.goal).toLowerCase())} · ${esc(lab(EFF,o.eff).toLowerCase())} · ${esc(lab(FMT,o.fmt).toLowerCase())}</p>
    <h4>Where the rules come from</h4><p>Rep, set, rest and effort ranges per goal follow the Flolyfe functional fitness guidelines. The progressions and last-set RPE come from the Stronger by Science program builder. Time caps, supersets and sets taken close to failure come from Chris Detmering.</p>`;}

/* ---------- generated programs live in S.myProgs ---------- */
function syncProgs(){if(typeof S==='undefined'||!S)return;S.myProgs=S.myProgs||[];
  for(let i=PROGRAMS.length-1;i>=0;i--)if(PROGRAMS[i].gen)PROGRAMS.splice(i,1);
  const at=PROGRAMS.findIndex(p=>p.id==='custom');
  PROGRAMS.splice(at<0?PROGRAMS.length:at,0,...S.myProgs.map(g=>({id:g.id,n:g.n,sub:g.sub,shape:'days',days:g.days,type:g.type,gen:true})));
  S.myProgs.forEach(g=>{INFO[g.id]=infoOf(g);});}
syncProgs();
const _show2=show;show=function(v){syncProgs();_show2(v);};

/* ---------- program type tags ---------- */
const TYPES={dense12:['Strength','Percentage-based','Barbell'],week:['Skill','Rings','Handstand'],tpp:['Strength','Push-pull-legs'],
  density:['Conditioning','Density'],chopcarry:['Functional','Longevity'],shredfast:['Circuit','Kettlebell'],sandbag:['Functional','Sandbag'],
  fiveweek:['Strength','Barbell'],ssforge:['Strength','Kettlebell'],bbw:['Bodyweight','Calisthenics'],hspro:['Skill','Handstand'],
  nogi:['Grip','Accessory'],built26:['Powerbuilding','Gym'],custom:['Own sessions']};
const typesOf=P=>P?(P.type||TYPES[P.id]||[]):[];
const tagHTML=P=>{const t=typesOf(P);return t.length?`<span class="ptags">${t.map((x,i)=>`<em class="ptag${i?'':' p'}">${esc(x)}</em>`).join('')}</span>`:'';};
window.blockProgTags=typesOf;

/* ---------- hooks into the app ---------- */
const _renderHome=renderHome;
renderHome=function(){syncProgs();_renderHome();
  const own=document.getElementById('nOwn');
  if(own){own.onclick=genOpen;const s=own.querySelector('small');if(s)s.textContent='A few taps and you have a session that fits';}
  try{renderGroups();}catch(e){console.warn(e);}
  document.querySelectorAll('#progList [data-p]').forEach(b=>{const P=progById(b.dataset.p),nm=b.querySelector('b');
    if(P&&nm&&!b.querySelector('.ptags'))nm.insertAdjacentHTML('afterend',tagHTML(P));});};
/* programs grouped by creator, collapsed, with a type filter on top */
/* sessions and programs made in the generator or the builder */
const OWN=()=>'Own builds';window.BLOCK_BUILD_GROUP='Own builds';
const LSG='block-open-groups';let PFILT='';
const openSet=()=>{try{const s=new Set(JSON.parse(localStorage.getItem(LSG)||'null')||[OWN()]);if(s.delete('Your own builds'))s.add(OWN());return s;}catch(e){return new Set([OWN()]);}};
const keepOpen=s=>{try{localStorage.setItem(LSG,JSON.stringify([...s]));}catch(e){}};
const rowHTML=(P,ey)=>`<button class="hrowp" data-p="${P.id}"><span><em class="ey">${esc(ey||`${progTotal(P)} sessions`)}</em><b>${esc(P.n)}</b><small>${esc(P.sub)}</small></span>
  <span class="n">${progDone(P)}/${progTotal(P)}</span><span class="chev">›</span></button>`;
function renderGroups(){const box=document.getElementById('progList');if(!box)return;
  const cur=box.querySelector('.hcur'),list=PROGRAMS.filter(P=>(P.id!=='custom'||(S.custom&&S.custom.length))&&P.id!==S.active);
  const CATS=['Handstand','Running','Mace'];/* categories that win over a program's first tag */
  const prim={};list.forEach(P=>{const tt=typesOf(P),t=CATS.find(c=>tt.includes(c))||tt[0];if(t&&t!=='Own sessions'&&t!=='Made by you')prim[t]=(prim[t]||0)+1;});
  const types=Object.keys(prim).sort((a,b)=>prim[b]-prim[a]).slice(0,9);CATS.forEach(c=>{if(prim[c]&&!types.includes(c))types.push(c);});if(PFILT&&!types.includes(PFILT))PFILT='';
  let h=`<div class="pfilt" role="group" aria-label="Filter programs by type"><button class="${PFILT?'':'on'}" data-t="">All · ${list.length}</button>${types.map(t=>`<button class="${PFILT===t?'on':''}" data-t="${esc(t)}">${esc(t)} · ${prim[t]}</button>`).join('')}</div>`;
  if(PFILT){h+=`<div class="hlist">${list.filter(P=>typesOf(P).includes(PFILT)).map(P=>rowHTML(P,`${P.group||'Other'} · ${progTotal(P)} sessions`)).join('')}</div>`;}
  else{const g={};list.forEach(P=>{const k=P.gen||P.id==='custom'?OWN():(P.group||'Other');(g[k]=g[k]||[]).push(P);});
    const top=[OWN(),window.BLOCK_OWN_GROUP],rk=n=>{const i=top.indexOf(n);return i<0?9:i;};
    const names=Object.keys(g).sort((a,b)=>rk(a)-rk(b)||a.localeCompare(b)),open=openSet();
    h+=names.map(n=>{const on=open.has(n),ps=g[n],done=ps.reduce((a,P)=>a+progDone(P),0),blurb=(window.BLOCK_GROUPS||{})[n];
      return`<section class="pgrp${on?' on':''}"><button class="pgh" data-g="${esc(n)}" aria-expanded="${on}"><span><b>${esc(n)}</b><small>${ps.length} program${ps.length>1?'s':''}${done?` · ${done} sessions done`:''}</small></span><span class="chev">›</span></button>
        ${on?`${blurb&&blurb.blurb?`<p class="pgb">${esc(blurb.blurb)}</p>`:''}<div class="hlist">${ps.map(P=>rowHTML(P)).join('')}</div>`:''}</section>`;}).join('');}
  box.innerHTML='';if(cur)box.append(cur);box.insertAdjacentHTML('beforeend',h);
  const openP=P=>{S.prog=P.id;progTab='sessions';save();show('program');renderProgram();};
  box.querySelectorAll('.hrowp[data-p]').forEach(b=>b.onclick=()=>openP(progById(b.dataset.p)));
  if(cur)cur.onclick=()=>openP(progById(cur.dataset.p));
  box.querySelectorAll('.pgh').forEach(b=>b.onclick=()=>{const s=openSet(),n=b.dataset.g,opening=!s.has(n);if(s.has(n))s.delete(n);else s.add(n);keepOpen(s);
    const cur=b.closest('.pgrp');
    if(!opening&&cur&&window.blockCollapse){cur.classList.remove('on');b.setAttribute('aria-expanded','false');blockCollapse([...cur.querySelectorAll('.pgb,.hlist')],renderHome);return;}
    renderHome();
    if(opening&&window.blockReveal){const g=[...document.querySelectorAll('.pgrp')].find(x=>x.querySelector('.pgh').dataset.g===n);if(g)g.querySelectorAll('.pgb,.hlist').forEach(blockReveal);}});
  box.querySelectorAll('.pfilt button').forEach(b=>b.onclick=()=>{PFILT=b.dataset.t;renderHome();});}
const _renderProgram=renderProgram;
renderProgram=function(){_renderProgram();const P=progById(S.prog);
  let t=document.getElementById('progTags');if(!t){t=document.createElement('div');t.id='progTags';document.getElementById('progSub').after(t);}
  t.innerHTML=tagHTML(P);
  let d=document.getElementById('genDel');
  if(P&&P.gen){if(!d){d=document.createElement('button');d.id='genDel';d.className='btn-s';d.style.flex='0 0 auto';d.textContent='Delete program';
      document.getElementById('progCurrent').after(d);}
    d.classList.remove('hide');d.onclick=()=>{if(!confirm(`Delete ${P.n}? Logged sets stay in your history.`))return;
      S.myProgs=S.myProgs.filter(g=>g.id!==P.id);if(S.active===P.id)S.active=null;save();syncProgs();show('home');renderHome();};}
  else if(d)d.classList.add('hide');};
document.getElementById('progNew').onclick=genOpen;
document.getElementById('sessEdit').onclick=()=>{const d=(S.custom||[]).find(x=>x.key===S.sess);if(d&&d.gen)genEdit(d);else buildOpen(S.sess);};

function render(){window.scrollTo(0,0);
  document.getElementById('genEy').textContent=G.step===3?'New program':'Own session';
  document.getElementById('genBack').textContent=G.step===1?'‹ Home':G.step===2&&G.key?'‹ Session':'‹ Back';
  if(G.step===1)renderAsk();else if(G.step===2)renderSuggest();else renderProgForm();
  window.blockChatLift&&blockChatLift();window.blockFade&&blockFade(body);}
if(!document.getElementById('v-home').classList.contains('hide'))renderHome();
})();
