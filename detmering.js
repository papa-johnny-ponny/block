/* BLOCK. Chris Detmering programs (Busy Dads): 4-day upper/lower, 6-day PPL,
   bodyweight + DB. Runs after the inline script, so EX, PROGRAMS and INFO exist.
   Existing EX keys are reused; only cd_* keys are new. */
(function(){
Object.assign(EX,{
  cd_incline_bench:{n:'Incline Barbell Bench Press',c:'weighted'},
  cd_lat_pulldown:{n:'Lat Pulldown',c:'weighted'},
  cd_tri_pushdown:{n:'Cable Triceps Pushdown',c:'weighted'},
  cd_db_press:{n:'DB Shoulder Press',c:'weighted'},
  cd_hammer_curl:{n:'Hammer Curl',c:'weighted'},
  cd_calf_raise:{n:'Standing Calf Raise',c:'weighted'},
  cd_tib_raise:{n:'Tibialis Raise',c:'bodyweight'},
  cd_walking_lunge:{n:'Walking Lunge',c:'weighted'},
  cd_diamond_pushup:{n:'Diamond Push-Up',c:'bodyweight'},
  cd_situp:{n:'Sit-Up',c:'bodyweight'},
  cd_russian_twist:{n:'Russian Twist',c:'rotation'},
  cd_hike:{n:'Hike',c:'rec'}
});

/* ----- 4x/week upper/lower ----- */
const CD_CALF_TIB=[{grp:'D · superset × 5'},
  {id:'cd_calf_raise',s:'5 × 20–30'},{id:'cd_tib_raise',s:'5 × 15–20'}];
const CD_NORDIC=[{grp:'A · warm-up × 3'},{id:'nordic',s:'3 × 5–10',nt:'assist with a band if needed'}];
const CDUL_DAYS=[
 {key:'cdul1',eyebrow:'Day 1',n:'Upper · push focus',hard:true,tag:'~45 min',items:[
   {grp:'A · superset × 3–4'},
   {id:'cd_incline_bench',s:'3–4 × 8–12',nt:'first set is the warm-up'},
   {id:'wchin',s:'3–4 × 6–12'},
   {grp:'B · superset × 3–4'},
   {id:'wdips',s:'3–4 × 6–12'},
   {id:'sa_db_row',s:'3–4 × 10–15',nt:'per side'},
   {grp:'C · superset × 3'},
   {id:'lateral_raise',s:'3 × 10–15'},
   {id:'cd_lat_pulldown',s:'3 × 8–12'},
   {grp:'D · superset × 2'},
   {id:'rev_fly',s:'2 × F',nt:'max reps'},
   {id:'dbtricep',s:'2 × F',nt:'max reps'},
   {grp:'E · finisher'},
   {id:'legraise',s:'2 × 10–20',nt:'L raise · straight legs to hip height'}]},
 {key:'cdul2',eyebrow:'Day 2',n:'Lower · back squat',hard:true,tag:'~40 min',items:[
   ...CD_NORDIC,
   {grp:'B · 5 sets'},
   {id:'backsquat',s:'5 × 10–15',nt:'build from a light first set'},
   {grp:'C · 2–3 sets'},
   {id:'cd_walking_lunge',s:'2–3 × 30',nt:'30 steps in total'},
   ...CD_CALF_TIB]},
 {key:'cdul3',eyebrow:'Day 4',n:'Upper · pull focus',hard:true,tag:'~45 min',items:[
   {grp:'A · superset × 3–4'},
   {id:'wpullup',s:'3–4 × 6–12',nt:'first set is the warm-up'},
   {id:'bench',s:'3–4 × 10–15'},
   {grp:'B · superset × 3–4'},
   {id:'row',s:'3–4 × 10–15',nt:'bent over'},
   {id:'cd_db_press',s:'3–4 × 10–15',nt:'strict · no leg drive'},
   {grp:'C · tri-set × 3–4'},
   {id:'lateral_raise',s:'3–4 × 15–20'},
   {id:'cd_hammer_curl',s:'3–4 × 10–15'},
   {id:'cd_tri_pushdown',s:'3–4 × 8–12'},
   {grp:'D · finisher × 2–3'},
   {id:'legraise',s:'2–3 × 15–20'},
   {id:'pushup',s:'2–3 × F',nt:'max reps · or pull-ups'}]},
 {key:'cdul4',eyebrow:'Day 5',n:'Lower · front squat',hard:true,tag:'~40 min',items:[
   ...CD_NORDIC,
   {grp:'B · 5 sets'},
   {id:'frontsquat',s:'5 × 10–15',nt:'build from a light first set'},
   {grp:'C · 3 sets'},
   {id:'rdl',s:'3 × 10–15'},
   ...CD_CALF_TIB]}
];

/* ----- 6x/week push/pull/legs ----- */
const CD_MAIN='A · main set · 5–10 rounds · 20 min cap';
const CD_AMPAP='B · AMPAP finisher · AMRAP 10';
const CD_MAIN_NT='first round light, for a pump · last 2–3 rounds to failure';
const CD_LEGS_FIN=[{grp:CD_AMPAP},
  {id:'cd_calf_raise',s:'15–20',nt:'weighted'},{id:'cd_tib_raise',s:'15–20'}];
const CDPPL_DAYS=[
 {key:'cdppl1',eyebrow:'Day 1',n:'Push A',hard:true,tag:'~30 min',items:[
   {grp:CD_MAIN},{id:'cd_incline_bench',s:'5–10 × 10–15',nt:CD_MAIN_NT+' · DBs work too'},
   {grp:CD_AMPAP},{id:'cd_tri_pushdown',s:'10–15'},{id:'lateral_raise',s:'10–15'}]},
 {key:'cdppl2',eyebrow:'Day 2',n:'Pull A',hard:true,tag:'~30 min',items:[
   {grp:CD_MAIN},{id:'wchin',s:'5–10 × 5–10',nt:CD_MAIN_NT},
   {grp:CD_AMPAP},{id:'bbcurl',s:'10',nt:'or DB curls'},{id:'lateral_raise',s:'15'}]},
 {key:'cdppl3',eyebrow:'Day 3',n:'Legs A',hard:true,tag:'~30 min',items:[
   {grp:CD_MAIN},{id:'backsquat',s:'5–10 × 10–15',nt:'narrow stance · '+CD_MAIN_NT+' · or walking lunges × 20–30'},
   ...CD_LEGS_FIN]},
 {key:'cdppl4',eyebrow:'Day 4',n:'Push B',hard:true,tag:'~30 min',items:[
   {grp:CD_MAIN},{id:'wdips',s:'5–10 × 8–12',nt:CD_MAIN_NT+' · or deficit push-ups'},
   {grp:CD_AMPAP},{id:'cd_diamond_pushup',s:'15',nt:'weighted'},{id:'lateral_raise',s:'15–20'}]},
 {key:'cdppl5',eyebrow:'Day 5',n:'Pull B',hard:true,tag:'~30 min',items:[
   {grp:CD_MAIN},{id:'row',s:'5–10 × 10–15',nt:'bent over · '+CD_MAIN_NT},
   {grp:CD_AMPAP},{id:'cd_hammer_curl',s:'10–15',nt:'on a decline bench'},{id:'rev_fly',s:'10–15'}]},
 {key:'cdppl6',eyebrow:'Day 6',n:'Legs B',hard:true,tag:'~30 min',items:[
   {grp:CD_MAIN},{id:'frontsquat',s:'5–10 × 10–15',nt:CD_MAIN_NT+' · or goblet squats'},
   ...CD_LEGS_FIN]},
 {key:'cdppl7',eyebrow:'Day 7',n:'Rest · hike',hard:false,tag:'easy',items:[
   {id:'cd_hike',s:'60–120 min',nt:'or a long walk · it all counts toward your steps'}]}
];

/* ----- bodyweight + DB ----- */
const CDBW_DAYS=[
 {key:'cdbw1',eyebrow:'Day 1',n:'Push',hard:true,tag:'25 min cap',items:[
   {grp:'A · superset · 8–10 sets · METCON 25'},
   {id:'pushup',s:'8–10 × AMRAP',nt:'4 s lowering'},
   {id:'cd_situp',s:'8–10 × AMRAP'},
   {grp:'B · finisher · optional'},
   {id:'dbtricep',s:'1 × F',nt:'max reps'}]},
 {key:'cdbw2',eyebrow:'Day 2',n:'Pull',hard:true,tag:'25 min cap',items:[
   {grp:'A · superset · 8–10 sets · METCON 25'},
   {id:'pullups',s:'8–10 × AMRAP',nt:'4 s lowering · or DB bent-over rows'},
   {id:'cd_russian_twist',s:'8–10 × AMRAP',nt:'or leg raises'},
   {grp:'B · finisher · optional'},
   {id:'dbbicep',s:'2 × F',nt:'max reps'},
   {id:'hill_sprint',s:'5 × 20–50 m'}]},
 {key:'cdbw3',eyebrow:'Day 3',n:'Legs',hard:true,tag:'30 min cap',items:[
   {grp:'A · superset · 10 sets · METCON 30'},
   {id:'goblet_squat',s:'10 × AMRAP',nt:'4 s lowering · hold DBs and change the squat style from set to set'},
   {id:'cd_calf_raise',s:'10 × AMRAP',nt:'4 s lowering'},
   {grp:'B · finisher · optional'},
   {id:'rdl',s:'2 × F',nt:'max reps · DBs'}]}
];

{const at=PROGRAMS.findIndex(p=>p.id==='custom');
 PROGRAMS.splice(at<0?PROGRAMS.length:at,0,
  {id:'cd_ul',n:'Busy Dad Upper/Lower',sub:'4 days · supersets · 60–90 s rest',shape:'days',days:CDUL_DAYS,
   type:['Hypertrophy','Supersets','Gym'],by:'Chris Detmering',
   note:'Train days 1, 2, 4 and 5 · days 3, 6 and 7 are rest. Tempo 2111 · first set is the warm-up.'},
  {id:'cd_ppl',n:'Busy Dad PPL',sub:'6 days · one main lift · 10-min pump finisher',shape:'days',days:CDPPL_DAYS,
   type:['Hypertrophy','Time-capped','Gym'],by:'Chris Detmering',
   note:'Main set capped at 20 minutes, 60–90 s rest. The finisher is a superset for 10 minutes.'},
  {id:'cd_bwdb',n:'Busy Dad Bodyweight + DB',sub:'3 sessions · supersets to failure · time-capped',shape:'days',days:CDBW_DAYS,
   type:['Bodyweight','Dumbbells','Time-capped'],by:'Chris Detmering',
   note:'Superset until the clock runs out. Lower every rep over 4 seconds. Finishers are optional.'});
 /* the inline script lists programs A–Z before this file runs; keep that order */
 PROGRAMS.sort((a,b)=>a.n.localeCompare(b.n,'en',{sensitivity:'base',numeric:true}));}

const CD_PRINCIPLES=`<h4>Principles</h4>
  <ul><li><b>Move.</b> Aim for 10,000–20,000 steps a day on top of lifting.</li>
   <li><b>Lift.</b> About 30 minutes, 4–6 times a week. Take sets to failure, lower slowly, and rest only as long as you need.</li>
   <li><b>Pick easy-start lifts.</b> Choose movements that need little warm-up, so the first set can be the warm-up.</li>
   <li><b>Eat.</b> Plenty of protein, carbs matched to how active you are and timed around training, low to moderate fat, and mostly whole foods that need little prep.</li></ul>`;

INFO.cd_ul=`<h2 id="infoTitle">Busy Dad Upper/Lower</h2>
  <p class="by">Chris Detmering · Busy Dads · free 4-day plan</p>
  <span class="pill2">4 days a week</span><span class="pill2">Supersets</span><span class="pill2">60–90 s rest</span>
  <h4>What it is</h4>
  <p>Two upper days and two lower days. The upper days pair a push with a pull, so you train twice the muscle in the same time. One upper day leans on pressing, the other on pulling. The lower days open with Nordic curls, then a heavy squat, a hinge or lunge, and calves with shins.</p>
  <h4>The week</h4>
  <ul><li><b>Day 1</b> upper, push focus · <b>Day 2</b> lower, back squat</li>
   <li><b>Day 3</b> rest</li>
   <li><b>Day 4</b> upper, pull focus · <b>Day 5</b> lower, front squat</li>
   <li><b>Days 6 and 7</b> rest</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Warm up with the work.</b> Start each exercise lighter and build. The first set is your warm-up.</li>
   <li><b>Close to failure.</b> Every working set can go near failure.</li>
   <li><b>Tempo 2111.</b> Two seconds down, one second pause, one second up, one second at the top.</li>
   <li><b>Rest 60–90 s</b> between supersets.</li>
   <li><b>Progress.</b> Once you hit the top of the rep range, add 2.5–5 kg.</li>
   <li><b>Refuel.</b> A meal with 30–50 g protein and 50–100 g carbs right after training.</li></ul>
  ${CD_PRINCIPLES}`;

INFO.cd_ppl=`<h2 id="infoTitle">Busy Dad PPL</h2>
  <p class="by">Chris Detmering · Busy Dads · free 6-day plan</p>
  <span class="pill2">6 days a week</span><span class="pill2">20-min main set</span><span class="pill2">10-min pump finisher</span>
  <h4>What it is</h4>
  <p>Push, pull and legs, twice a week, with one rest day for a long hike. Each session is one main lift for 5–10 rounds, then a two-exercise finisher. Intensity and volume do the work, so sessions stay around half an hour.</p>
  <h4>How to run it</h4>
  <ul><li><b>Main set.</b> The first round is light and gets the blood flowing. Rest 60–90 s between rounds and take the last 2–3 rounds to failure. Stop at 20 minutes, however many rounds you have done.</li>
   <li><b>AMPAP finisher.</b> As much pump as possible: superset the two moves for 10 minutes, each set to failure. Pick the weight, reps and tempo that give you the biggest pump.</li>
   <li><b>Progress</b> however suits you and saves the most time: more reps, more weight or a slower tempo.</li>
   <li><b>Swaps.</b> DBs for the incline bench, DB curls for barbell curls, walking lunges for squats, deficit push-ups for dips, goblet squats for front squats.</li>
   <li><b>Day 7.</b> Rest, ideally with a 1–2 hour hike.</li>
   <li><b>Refuel.</b> About 60 g carbs and 30 g protein afterwards.</li></ul>
  ${CD_PRINCIPLES}`;

INFO.cd_bwdb=`<h2 id="infoTitle">Busy Dad Bodyweight + DB</h2>
  <p class="by">Chris Detmering · Busy Dads · free home plan</p>
  <span class="pill2">3 sessions</span><span class="pill2">Bodyweight + dumbbells</span><span class="pill2">25–30 min caps</span>
  <h4>What it is</h4>
  <p>Push, pull and legs with little more than a pull-up bar and a pair of dumbbells. Each session is one superset repeated against the clock, plus an optional finisher.</p>
  <h4>How to run it</h4>
  <ul><li><b>Superset to failure.</b> Do as many reps as you can on the first move, then the second, and repeat.</li>
   <li><b>Slow lowering.</b> Take 4 seconds on the way down for the main lifts.</li>
   <li><b>Time cap.</b> Push and pull are capped at 25 minutes for 8–10 sets, legs at 30 minutes for 10 sets.</li>
   <li><b>Squat styles.</b> Hold the dumbbells and change the squat from set to set: goblet, sumo, split stance.</li>
   <li><b>Finishers are optional.</b> Add them when you have the time and energy.</li></ul>
  ${CD_PRINCIPLES}`;
})();
