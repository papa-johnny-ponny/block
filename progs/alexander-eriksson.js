/* BLOCK. program pack: Alexander Eriksson (AE Performance Coaching).
   AE Power Program (3-day): 6-week squat/bench/deadlift block, every lift ramped
   from 50 % of 1RM. Per-set loads ride in `ps`; variations borrow the main lift's max. */
(function(){
const R=window.BLOCK_REG;if(!R)return;

/* ---------- exercises ---------- */
R.ex({
  pause_squat:{n:'Pause Squat',c:'weighted'},
  tempo_squat:{n:'Tempo Squat',c:'weighted'},
  alt_bar_squat:{n:'Opposite Bar-Position Squat',c:'weighted'},
  pause_bench:{n:'Paused Bench Press',c:'weighted'},
  sldl:{n:'Stiff-Leg Deadlift',c:'weighted'},
  alt_stance_deadlift:{n:'Opposite-Stance Deadlift',c:'weighted'},
  deficit_deadlift:{n:'Deficit Deadlift',c:'weighted'},
  leg_press:{n:'Leg Press',c:'weighted'},
  db_bench:{n:'DB Bench Press',c:'weighted'},
  db_fly:{n:'DB Chest Fly',c:'weighted'},
  band_pull_apart:{n:'Band Pull-Apart',c:'banded'},
  sl_hip_thrust:{n:'Single-Leg Hip Thrust',c:'bodyweight'},
  side_plank:{n:'Side Plank',c:'bodyweight'},
  side_lunge:{n:'Side Lunge',c:'bodyweight'},
  straight_arm_pulldown:{n:'Straight-Arm Pulldown',c:'weighted'}
});
R.steps({
  pause_squat:['Squat as in competition, braced and tight.','Sit to full depth and hold still for the pause.','Keep the brace through the pause.','Drive up hard from a dead stop.'],
  tempo_squat:['Unrack and brace as for a normal squat.','Lower slowly for the counted seconds.','Keep the bar over mid-foot all the way down.','Stand up at normal speed.'],
  alt_bar_squat:['Put the bar in the other position from your usual one: high bar if you squat low bar, low bar if you squat high bar.','Use the same stance and brace.','Squat to full depth under control.','Drive up fast from the bottom.'],
  pause_bench:['Set up as for your competition bench.','Lower the bar under control to the chest.','Let it rest lightly on the chest and hold still for the pause.','Press up hard without bouncing.'],
  sldl:['Stand with the bar at your thighs, knees almost straight.','Push the hips back and let the bar slide down the legs.','Lower slowly, back flat, until you feel the hamstrings.','Stand up by driving the hips forward.'],
  alt_stance_deadlift:['Pull with the stance you do not compete with: sumo if you pull conventional, conventional if you pull sumo.','Set the bar over mid-foot and take your grip.','Brace, pull the slack out of the bar and push the floor away.','Lock out with the hips and lower under control.'],
  deficit_deadlift:['Stand on a plate or low platform, about 4–6 cm high.','Set up as for your normal deadlift.','Brace and push through the floor; the bar travels further.','Lock out, then lower under control to the floor.'],
  leg_press:['Sit with your lower back flat against the pad.','Place your feet about hip-width on the platform.','Lower until the knees are well bent, without the hips lifting off the seat.','Press back up without locking the knees hard.'],
  db_bench:['Lie on a flat bench with a dumbbell in each hand over the chest.','Lower the dumbbells to the sides of the chest, elbows about 45° out.','Press up until the arms are straight.','Keep the feet planted and the shoulder blades pulled back.'],
  db_fly:['Lie on a bench with the dumbbells over the chest, palms facing.','Keep a slight bend in the elbows.','Open the arms wide until you feel a stretch in the chest.','Squeeze the dumbbells back together over the chest.'],
  band_pull_apart:['Hold a light band at shoulder height, arms straight.','Pull the band apart by squeezing the shoulder blades together.','Stop when the band touches the chest.','Return slowly to the start.'],
  sl_hip_thrust:['Sit with your upper back against a bench, one foot on the floor.','Lift the other leg off the floor.','Drive the hips up through the heel until the body is straight.','Pause at the top, then lower under control.'],
  side_plank:['Lie on your side with the elbow under the shoulder.','Stack the feet, or stagger them for balance.','Lift the hips until the body is in a straight line.','Hold without letting the hips sag.'],
  side_lunge:['Stand with the feet wide.','Shift your weight to one side and bend that knee, the other leg straight.','Push the hips back and keep the chest up.','Push back to the middle and switch sides; go a little deeper each rep.'],
  straight_arm_pulldown:['Stand facing a high cable with a bar or rope.','Keep the arms straight with a small bend at the elbow.','Pull the bar down to the thighs with the lats.','Let it rise slowly back to eye height.']
});
/* variations take their loads from the main lift's 1RM */
try{if(typeof RM_ALIAS==='object'){const A={pause_squat:'backsquat',tempo_squat:'backsquat',alt_bar_squat:'backsquat',pause_bench:'bench',
  sldl:'deadlift',alt_stance_deadlift:'deadlift',deficit_deadlift:'deadlift'};
  Object.keys(A).forEach(k=>{if(!RM_ALIAS[k])RM_ALIAS[k]=A[k];});}}catch(e){}

/* ---------- helpers ---------- */
/* ramp '50x6 57.5x6 70x6*4 85x1@8.5' → per-set prescription */
const PS=str=>str.split(' ').flatMap(t=>{const m=t.match(/^([\d.]+)x(\w+)(?:@([\d.]+))?(?:\*(\d+))?$/);
  const q={r:m[2],p:+m[1]};if(m[3])q.rpe=+m[3];return Array.from({length:+(m[4]||1)},()=>({...q}));});
function M(id,ramp,nt){const ps=PS(ramp),it={id},sameR=ps.every(q=>q.r===ps[0].r);
  it.s=`${ps.length} × ${sameR?ps[0].r:ps.map(q=>q.r).join(' / ')}`;
  it.p=Math.max(...ps.map(q=>q.p));
  if(!(sameR&&ps.every(q=>q.p===ps[0].p&&q.rpe==null)))it.ps=ps;
  if(nt)it.nt=nt;return it;}
/* accessory: '12*4' or '20 15 12 10 8' */
function A(id,reps,nt){const m=reps.match(/^(\S+)\*(\d+)$/),rs=m?Array(+m[2]).fill(m[1]):reps.split(' '),it={id};
  it.s=`${rs.length} × ${m?m[1]:rs.join(' / ')}`;if(!m)it.ps=rs.map(r=>({r}));
  it.nt=[nt,'RPE 7–10, last sets hardest'].filter(Boolean).join(' · ');return it;}
const G=grp=>({grp});
/* warm-up superset for each day of the week */
const WU={
 1:[['sl_hip_thrust','6','per side · pause at the top'],['goblet_squat','12','kettlebell or dumbbell'],['ab_wheel','12','ab wheel, Swiss ball or rings'],['backext','10','flat or 45°']],
 2:[['side_plank','20–30 s','per side · flat or 45°'],['rev_back_ext','12'],['sl_rdl','8','barbell, dumbbell or kettlebell'],['side_lunge','8','per side · a little deeper each rep']],
 3:[['legraise','12','hanging'],['backext','12','flat or 45°'],['band_pull_apart','12','or reverse flyes'],['straight_arm_pulldown','12','or pullovers']]};
const warm=(d,n)=>[G(`Warm-up · superset × ${n}`),...WU[d].map(([id,r,nt])=>{const it={id,s:`${n} × ${r}`};if(nt)it.nt=nt;return it;})];
/* mock meet: ramp, then three attempts given as [low, suggested, high] % */
function MEET(id,label,ramp,att){
  return[G(`${label} · mock meet`),M(id,ramp,'warm-up ramp'),
    ...att.map((a,i)=>({id,s:'1 × 1',p:a[1],nt:`${['opener','second attempt','third attempt'][i]} · ${a[0]}–${a[2]} % · pick by feel`}))];}
const DAYS=[];
function D(w,d,n,rounds,items,ver){
  DAYS.push({key:`ae_power_w${w}d${d}${ver?'v'+ver:''}`,eyebrow:`Week ${w} · Day ${d}${ver?' · option '+ver:''}`,n,hard:true,
    tag:ver?'pick one':(w===4?'heavy singles':''),items:[...warm(d,rounds),...items.flat()]});}

/* ---------- the 6 weeks ---------- */
D(1,1,"Squat + bench",2,[G('A · Squat'),M('backsquat','50x6 57.5x6 65x6 70x6*4'),G('B · Bench'),M('bench','50x6 57.5x6 65x6 70x6*4'),G('Accessories'),A('leg_press','12*4'),A('db_bench','12*4')]),
D(1,2,"Deadlift + bench",2,[G('A · Deadlift'),M('deadlift','50x6 60x6 70x6*4'),G('B · Medium-grip bench'),M('mg_bench','50x6 55x5 60x7 60x3 60x8 60x4','one hand-width narrower than normal'),G('Accessories'),A('cd_tri_pushdown','20 15 12 10 8'),A('leg_curl','20 15 12 10 8 6'),A('row','12*5'),A('cd_lat_pulldown','15 12 10 8')]),
D(1,3,"Squat, bench, deadlift",2,[G('A · Tempo squat + leg extension · superset'),M('tempo_squat','50x6 55x4 60x4*4','4–6 s on the way down'),A('leg_ext','12*5','from set 2 of the squat, straight after each set'),G('B · Bench'),M('bench','50x6 60x5 67.5x4 75x3*2 80x2*3 75x4 67.5x6 60x8 50x10'),G('Accessories'),A('db_fly','15*3'),G('C · Other-stance deadlift'),M('alt_stance_deadlift','50x8 55x8 60x8*2'),G('Accessories'),A('band_pull_apart','12*3'),A('dbbicep','12*4')]),
D(2,1,"Squat + bench",2,[G('A · Squat'),M('backsquat','50x6 60x5 67.5x4 75x3*2 80x2*3'),G('B · Pause squat'),M('pause_squat','50x4 57.5x4 65x4*3'),G('C · Bench'),M('bench','50x6 60x5 67.5x4*2 75x3*2 80x2*4'),G('D · Close-grip bench'),M('cg_bench','50x6 55x6 60x6 65x6','about shoulder-width grip'),G('Accessories'),A('leg_press','15*3'),A('db_bench','15*3')]),
D(2,2,"Deadlift + bench",2,[G('A · Deadlift'),M('deadlift','50x6 60x5 67.5x4 75x3*2 80x2*2'),G('B · Stiff-leg deadlift'),M('sldl','50x8*3','brake the descent, hips back'),G('C · Pause bench'),M('pause_bench','50x6 57.5x4*2 65x2*5','3 s pause, chest touched lightly · control down, drive up fast'),G('D · Medium-grip bench'),M('mg_bench','50x10*3','one hand-width narrower · 3–5 s lowering'),G('Accessories'),A('cd_tri_pushdown','12*4'),A('leg_curl','12*4'),A('row','12 10 8 8 8 8'),A('cd_lat_pulldown','15*3')]),
D(2,3,"Squat, bench, deadlift",2,[G('A · Other-bar squat'),M('alt_bar_squat','50x6 57.5x4*2 65x2*6','control down, drive up fast'),G('B · Bench'),M('bench','50x6 60x5 67.5x4 75x3*2 80x2*4'),G('Accessories'),A('db_fly','12*3'),G('C · Deficit deadlift'),M('deficit_deadlift','50x6 55x5 60x4*2 65x3*3','~6 cm conventional, ~4 cm sumo'),G('Accessories'),A('band_pull_apart','12*3'),A('dbbicep','12*4')]),
D(3,1,"Squat + bench",2,[G('A · Squat'),M('backsquat','50x6 60x5 67.5x4 75x4*5'),G('B · Bench'),M('bench','50x6 60x5 67.5x4 75x4*6'),G('Accessories'),A('leg_press','10*4'),A('db_bench','10*4')]),
D(3,2,"Deadlift + bench",2,[G('A · Deadlift'),M('deadlift','50x4 60x4 67.5x4 75x4*5'),G('B · Medium-grip bench'),M('mg_bench','50x6 57.5x5 65x7 65x3 65x8 65x4','one hand-width narrower than normal'),G('Accessories'),A('cd_tri_pushdown','15 12 10 8 6'),A('leg_curl','15 12 10 8 8'),A('row','10*5'),A('cd_lat_pulldown','12 10 8 6')]),
D(3,3,"Squat, bench, deadlift",2,[G('A · Tempo squat + leg extension · superset'),M('tempo_squat','50x6 55x5 60x4 65x3*2 65x5','4–6 s on the way down'),A('leg_ext','12*4','from set 2 of the squat, straight after each set'),G('B · Bench'),M('bench','50x6 60x5 67.5x4*2 75x3*5 67.5x7 60x9 50x12'),G('Accessories'),A('db_fly','12*3'),G('C · Other-stance deadlift'),M('alt_stance_deadlift','50x6 57.5x6 65x6*3'),G('Accessories'),A('band_pull_apart','12*3'),A('dbbicep','12*4')]),
D(4,1,"Squat + bench",2,[G('A · Squat'),M('backsquat','50x5 60x4 70x3 77.5x2 85x1@8.5 88.5x1@8.5 92x1@8.5 70x8*2','singles: pick the load yourself around these %, RPE 8.5 at most'),G('B · Bench'),M('bench','50x5 60x4 70x3 77.5x2 85x1@8.5 88x1@8.5 90x1@8.5 93x1@8.5 70x8*3','singles: pick the load yourself around these %, RPE 8.5 at most'),G('Accessories'),A('leg_press','10*4'),A('db_bench','10*4')]),
D(4,2,"Deadlift + bench",2,[G('A · Deadlift'),M('deadlift','50x5 60x4 70x3 77.5x2 85x1@8.5 88.5x1@8.5 92x1@8.5 70x8*2','singles: pick the load yourself around these %, RPE 8.5 at most'),G('B · Pause bench'),M('pause_bench','50x5 60x3*2 67.5x2*4','3 s pause, chest touched lightly · control down, drive up fast'),G('C · Medium-grip bench'),M('mg_bench','50x8 55x8*3','one hand-width narrower · 3–5 s lowering'),G('Accessories'),A('cd_tri_pushdown','10*4'),A('leg_curl','12 10 8 8 8'),A('row','15 12 10 8 8'),A('cd_lat_pulldown','12*4')]),
D(4,3,"Squat, bench, deadlift",2,[G('A · Other-bar squat'),M('alt_bar_squat','50x5 60x3*2 67.5x2*5','control down, drive up fast'),G('B · Bench'),M('bench','50x5 60x4 70x3 77.5x3*2 85x2*3'),G('Accessories'),A('db_fly','12*3'),G('C · Deficit deadlift'),M('deficit_deadlift','50x6 57.5x4*2 65x3*2 70x2*2','~6 cm conventional, ~4 cm sumo'),G('Accessories'),A('band_pull_apart','12*3'),A('dbbicep','12*4')]),
D(5,1,"Squat + bench",2,[G('A · Squat'),M('backsquat','50x6 60x5 67.5x4 75x4*2 80x3*2 76x3*2'),G('B · Bench'),M('bench','50x6 60x5 67.5x4 75x4*2 80x3*5'),G('Accessories'),A('leg_press','12 10 8 8 8'),A('db_bench','12 10 8 8 8')]),
D(5,2,"Deadlift + bench",2,[G('A · Deadlift'),M('deadlift','50x6 60x5 67.5x4 75x4 80x3*4'),G('B · Bench'),M('bench','50x6 60x5 67.5x7 67.5x3 67.5x8 67.5x4'),G('Accessories'),A('cd_tri_pushdown','12*4'),A('leg_curl','12*4'),A('row','12 10 8 8 8 8'),A('cd_lat_pulldown','10*4')]),
D(5,3,"Squat, bench, deadlift",2,[G('A · Squat'),M('backsquat','50x6 60x5 67.5x4*2 75x3*3'),G('B · Bench'),M('bench','50x6 60x5 67.5x4*2 75x3*2 80x2*2 70x6 60x9 50x12'),G('Accessories'),A('db_fly','10*3'),G('C · Other-stance deadlift'),M('alt_stance_deadlift','50x6 57.5x5 65x4*2 70x3*3'),G('Accessories'),A('leg_ext','12*4'),A('band_pull_apart','12*3'),A('dbbicep','12*4')]),
D(6,1,"Squat + bench",2,[G('A · Squat'),M('backsquat','50x5 60x4 67.5x3 75x2 80x1*2 70x2*3'),G('B · Bench'),M('bench','50x6 57.5x5 65x4 70x3 75x2 80x1*2 70x3*4'),G('Accessories'),A('leg_press','15*3'),A('db_bench','15*3')]),
D(6,2,"Deadlift + bench",2,[G('A · Deadlift'),M('deadlift','50x5 55x4 60x3*2 65x2*4'),G('B · Bench'),M('bench','50x5 57.5x3*3 65x2*4'),G('Accessories'),A('cd_tri_pushdown','12*3'),A('leg_curl','15*3'),A('row','12*3'),A('cd_lat_pulldown','15*3')]),
D(6,3,"Test · rep test",1,[G('A · Squat'),M('backsquat','50x5 60x4 67.5x3 75x2 80x1 85xAMRAP','last set: as many reps as you can, 1–2 reps left or to failure'),G('B · Bench'),M('bench','50x6 60x4 67.5x3 75x2 80x1 85xAMRAP','last set: as many reps as you can, 1 rep left or to failure'),G('C · Deadlift'),M('deadlift','50x4 60x3 67.5x2 75x2 80x1 85xAMRAP','last set: as many reps as you can, 1–2 reps left or to failure')],'1'),
D(6,3,"Test · mock meet",1,[
  MEET('backsquat','Squat','50x5 60x4 70x3 77.5x2 85x1',[[89,92,94],[94,97,99],[99,102,105]]),
  MEET('bench','Bench','50x6 60x4 70x3 77.5x2 85x1',[[89,92,94],[94,97,99],[99,102,105]]),
  MEET('deadlift','Deadlift','50x4 60x3 68x2 76x2 84x1',[[88,91,94],[94,97,99],[99,102,105]])],'2');
DAYS.forEach(d=>{if(!d.tag)delete d.tag;});

R.group('Alexander Eriksson',{blurb:'Swedish powerlifting coach (AE Performance Coaching) whose programs ramp every lift from 50 % and rotate close variations.'});

R.program({id:'ae_power',n:'AE Power Program (3-day)',sub:'Squat, bench, deadlift · 6 weeks · 3 days',
  shape:'days',group:'Alexander Eriksson',by:'Alexander Eriksson',type:['Powerlifting','Percentage-based','Autoregulated'],
  note:'Train days 1, 3 and 5 of the week. Every lift ramps from 50 %; loads may move 5 % either way with the day.',
  days:DAYS},
`<h2 id="infoTitle">AE Power Program (3-day)</h2>
  <p class="by">Alexander Eriksson · AE Performance Coaching</p>
  <span class="pill2">6 weeks</span><span class="pill2">3 days a week</span><span class="pill2">% of 1RM</span><span class="pill2">Ends in a test</span>
  <h4>What it is</h4>
  <p>A six-week powerlifting block. Squat and bench come twice a week, the deadlift twice, and each session also has a close variation: paused, tempo, other bar position, other grip or other stance. Accessories cover the rest of the body, so the plan works on its own as a full week of training.</p>
  <h4>The week</h4>
  <ul><li><b>Day 1</b> squat and bench · <b>Day 2</b> deadlift and bench · <b>Day 3</b> squat, bench and deadlift</li>
   <li>Days 1, 3 and 5 suit most weeks. Keep the order; if you miss a day, just carry on with the next one.</li>
   <li>Day 3 needs you fresh, so keep hard muscular work away from the day before it.</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Warm-up superset.</b> Each day opens with four short drills done as a circuit, twice through.</li>
   <li><b>Ramp every lift.</b> Each main lift starts at 50 % of 1RM. Do two or three sets with the empty bar and one or two build-up sets before it.</li>
   <li><b>Read the sets.</b> Each set has its own % and reps; the session player shows the load set by set.</li>
   <li><b>Variations</b> run off the main lift's 1RM: squat variations off your squat, bench variations off your bench, deadlift variations off your deadlift.</li>
   <li><b>Adjust by 5 %.</b> On a bad day take 5 % off; on a great day you may add 5 %. Keep the reps.</li>
   <li><b>Week 4 singles.</b> Choose the single loads yourself around the listed %, never above RPE 8.5 (two reps in reserve).</li>
   <li><b>Accessories</b> are for muscle and balance: full range, strict, RPE 7–10, the last sets hardest. Swap in a similar move if the gym lacks the kit.</li>
   <li><b>Rest</b> as long as you need to do the next set well: short on easy sets, longer on hard ones.</li>
   <li><b>Belt and sleeves</b> only on competition-style sets, if you normally use them.</li></ul>
  <h4>Week 6 test and the next round</h4>
  <ul><li><b>First time through:</b> pick the rep test. Ramp up, then do as many reps as you can at 85 %, stopping with 1–2 left or at failure.</li>
   <li><b>Second or third round:</b> pick the mock meet and work up to three attempts, the last one around 102 %.</li>
   <li><b>New 1RM.</b> After the rep test, raise each 1RM by about 3–4 % if you got around six reps, less if fewer. Or rate how hard the block felt from 1 to 5 and raise the max by about 3 % for a middling block.</li></ul>`);

/* ---------- approaches ---------- */
R.approach({id:'ae_ramp',by:'Alexander Eriksson',n:'Ramp from 50 %, then work sets',
  short:'Every main lift climbs from 50 % to work sets of 2–6 at 65–80 %, variations rotate.',
  gp:{s:[5,10],r:[2,6],rest:180,rpe:7.5},fmt:'straight',prog:'linear',cues:['ramp from 50 % every time'],
  prefer:'squat|bench|deadlift',
  details:'Each main lift is treated as its own little pyramid: start at half your max, build in a few sets, then do the work sets. Close variations (paused, tempo, other grip or stance) replace extra competition-style work. Loads may move 5 % either way with the day; the reps stay. Suits lifters who want structure without grinding.'});
R.approach({id:'ae_accessory',by:'Alexander Eriksson',n:'Strict accessories, near failure',
  short:'Accessories for muscle and balance: full range, 8–20 reps, RPE 7–10.',
  gp:{s:[3,5],r:[8,15],rest:90,rpe:8.5},prog:'reps',cues:['full range, strict','last sets hardest'],
  details:'Assistance work is about muscle and function, not load. Pick the muscle group first, then any exercise that trains it well. Sets start around RPE 7 and the last ones get close to failure, with descending reps (20, 15, 12, 10, 8) common.'});
})();
