/* BLOCK. program pack: Josef Eriksson (Bänkpress.nu / Tyngre).
   Bench, squat and deadlift programs from the Swedish originals. Loads are % of 1RM
   (p) on the main lift key; variants that run off another lift's max say so in the note.
   Runs after reg.js, so EX, PROGRAMS, INFO and BLOCK_REG exist. */
(function(){
const R_=BLOCK_REG,GRP='Josef Eriksson',BY='Josef Eriksson';

/* ---------- helpers ---------- */
const DASH=x=>String(x).replace(/-/g,'–');
const st=(s,r)=>`${DASH(s)} × ${({M:'AMRAP',MR:'AMRAP',T:'max hold'})[r]||DASH(r)}`;
const I=(id,s,p,nt)=>{const o={id,s};if(p!=null)o.p=p;if(nt)o.nt=nt;return o;};
const H=g=>({grp:g});
/* ramp: '1x10@60 2x10@70 3xMR@75' -> one item per step on the same key.
   o.top goes on the step marked * (or the last), o.first on the first step. */
function R(id,spec,o){o=o||{};const t=spec.trim().split(/\s+/);let top=t.findIndex(x=>x.endsWith('*'));if(top<0)top=t.length-1;
  return t.map((x,i)=>{const m=x.replace('*','').match(/^(\d+)x([^@]+)@([\d.]+)$/);if(!m)throw new Error('ramp '+x);
    return I(id,st(m[1],m[2]),+m[3],i===top?o.top:(i===0?o.first:null));});}
/* accessories: 'ohp 4x10; rev_fly 3x12-15/note' */
function A(spec,dn){return spec.split(';').map(x=>x.trim()).filter(Boolean).map(x=>{
  const m=x.match(/^(\w+)\s+([\d-]+)x([^/]+?)\s*(?:\/(.*))?$/);if(!m)throw new Error('acc '+x);
  return I(m[1],st(m[2],m[3]),null,m[4]||(dn&&dn[m[1]])||null);});}
const D=(key,eyebrow,n,items,tag,hard)=>({key,eyebrow,n,hard:hard!==false,tag:tag||'~75 min',items});
const P=(o,info)=>R_.program(Object.assign({shape:'days',group:GRP,by:BY},o),info);
const DN={cd_lat_pulldown:'or chin-ups',row:'any row',bbcurl:'barbell or dumbbells',
  skull_crusher:'lying, lower the bar behind your head',rolling_db_tri:'rolling dumbbell extensions',
  jm_press:'or rolling dumbbell extensions'};

/* ---------- exercises ---------- */
R_.ex({
  jm_press:{n:'JM Press',c:'weighted'},
  seal_row:{n:'Seal Row',c:'weighted'},
  btn_pulldown:{n:'Behind-the-Neck Lat Pulldown',c:'weighted'},
  forward_lunge:{n:'Barbell Forward Lunge',c:'weighted'},
  hip_ext_rotation:{n:'Seated Banded Hip External Rotation',c:'banded'},
  torso_rotation:{n:'Standing Torso Rotation',c:'rotation'},
  sldl:{n:'Stiff-Legged Deadlift',c:'weighted'},
  split_squat:{n:'Barbell Split Squat',c:'weighted'},
  bar_hold:{n:'Barbell Hold',c:'aux'},
  cable_crunch:{n:'Cable Crunch',c:'weighted'},
  plank:{n:'Plank',c:'bodyweight'},
  side_plank:{n:'Side Plank',c:'bodyweight'},
  side_leg_raise:{n:'Side-Lying Leg Raise',c:'bodyweight'},
  side_bend:{n:'Side Bend',c:'weighted'},
  glute_ham_raise:{n:'Glute-Ham Raise',c:'bodyweight'},
  deficit_deadlift:{n:'Deficit Deadlift',c:'weighted'},
  db_bench:{n:'DB Bench Press',c:'weighted'},
  board_press:{n:'Board Press',c:'weighted'},
  banded_bench:{n:'Bench Press Against Bands',c:'weighted'}
});
R_.steps({
  jm_press:['Lie on a bench with a close grip, elbows pointing toward your feet.','Lower the bar toward your chin by bending the elbows and letting them drift forward.','Stop a few cm above the chest, when the forearms meet the upper arms.','Press back up by straightening the elbows.','Keep the shoulders pinned to the bench.'],
  seal_row:['Lie face down on a raised bench with the bar or dumbbells hanging below.','Pull the weight up to the underside of the bench, elbows back.','Squeeze the shoulder blades together at the top.','Lower under control to a full stretch.'],
  btn_pulldown:['Sit at the pulldown with a wide grip and tip your head slightly forward.','Pull the bar down behind your head to about ear height.','Keep the chest up and the elbows under the bar.','Let the bar rise to a full stretch under control.'],
  forward_lunge:['Stand tall with the bar high on your upper back.','Step forward and lower until the back knee nearly touches the floor.','Keep the torso upright and the trunk braced.','Push back to standing through the front heel.','When the program says so, step onto a low platform for more depth.'],
  hip_ext_rotation:['Sit on a bench with a mini band just above both knees.','Keep the feet together on the floor.','Press the knees apart against the band.','Pause, then let the knees come back under control.'],
  torso_rotation:['Stand side-on to a cable or band anchored at chest height.','Hold the handle with long arms and brace.','Rotate the torso away from the anchor, hips square.','Return slowly; finish the set, then switch sides.'],
  sldl:['Stand with the bar over mid-foot, knees only slightly bent.','Hinge at the hips with a flat back and slide the bar down the legs.','Go as low as the hamstrings allow without rounding.','Drive the hips forward to stand tall.'],
  split_squat:['Stand in a long split stance with the bar on your back.','Lower straight down until the back knee nearly touches the floor.','Keep the front heel planted and the torso upright.','Push up through the front foot; finish the reps, then switch legs.'],
  bar_hold:['Deadlift a heavy barbell to lockout.','Stand tall with straight arms and a braced trunk.','Hold for the set time without letting the bar roll in your hands.','Lower it under control.'],
  cable_crunch:['Kneel under a cable or band anchored overhead, rope at your chest.','Round the spine and crunch the ribs toward the hips.','Squeeze the abs at the bottom.','Return slowly without sitting back.'],
  plank:['Rest on your forearms and toes, elbows under the shoulders.','Keep a straight line from head to heels.','Brace the abs and squeeze the glutes; do not let the lower back sag.','Stop when the position starts to break.'],
  side_plank:['Lie on your side with the elbow under the shoulder.','Lift the hips until the body is a straight line.','Keep the hips stacked and pushed forward.','Hold, then switch sides.'],
  side_leg_raise:['Lie on your side with the legs straight and stacked.','Lift the top leg up and slightly back, toes pointing forward.','Pause at the top and lower slowly.','Finish the reps, then switch sides.'],
  side_bend:['Stand tall with a dumbbell in one hand.','Bend sideways toward the weight under control.','Brace and pull back up until fully upright.','Finish the reps, then switch sides.'],
  glute_ham_raise:['Lock your feet in a glute-ham bench, knees just behind the pad.','Start upright and lower the body forward under control.','Pull yourself back up with the hamstrings, hips straight.','Push off the floor with your hands if you need help.'],
  deficit_deadlift:['Stand on a 5–7 cm plate or platform with the bar over mid-foot.','Set up as for your normal deadlift with a flat back.','Push the floor away and keep the bar against the legs.','Lock out hips and knees together, then lower under control.'],
  db_bench:['Lie on a flat bench with a dumbbell in each hand over the chest.','Lower the dumbbells to the sides of the chest, elbows about 45 degrees out.','Press back up until the arms are straight.','Keep the shoulder blades pinned to the bench.'],
  board_press:['Set up as for a bench press with a board on your chest, about 40 % of your range of motion.','Lower the bar under control until it touches the board.','Stay tight; do not bounce or relax on the board.','Press back up to lockout.'],
  banded_bench:['Anchor a band under the bench on each side and loop it over the bar ends.','Set up as for your normal bench press.','Lower under control against the band pulling down.','Press hard through the top, where the band tension is highest.']
});

R_.group(GRP,{blurb:'Swedish bench press coach behind Bänkpress.nu. High-volume, percentage-based programs built on a clean, controlled 1RM.'});

/* ---------- approaches ---------- */
R_.approach({id:'je_junk_volume',by:BY,n:'Junk volume',
  short:'Lots of sub-max sets of 10–25 reps at 45–70 %, plus one max-rep day a week.',
  gp:{s:[5,10],r:[8,20],rest:240,rpe:7},fmt:'straight',prog:'setsreps',
  cues:['slow, controlled reps','same groove at 50 % as at max'],
  prefer:'bench|press|row|pulldown|curl|extension|face',
  details:'Pile up clean reps with light and medium weights and add sets or reps week by week. Rest is long, so every set is done with good form, not chased with fatigue. Once a week, take a few sets to max reps to see where you are. It suits lifters who have stalled on heavy singles. It is not a pump routine: each rep should look like a max attempt, only lighter.'});
R_.approach({id:'je_conjugate',by:BY,n:'Conjugate bench',
  short:'Max a new bench variant each week, then 3 max-rep sets at 80 %. Speed and rep days fill the week.',
  gp:{s:[3,9],r:[1,3],rest:90,rpe:8},fmt:'straight',
  cues:['press, never bounce','faster every set'],
  prefer:'bench|board|band|close grip|press|row|pulldown|curl',
  details:'Three bench days a week, each with its own job. One day works up to a max single on a variant (grip, board or bands) that changes every week, then does max reps at 80 % of it. One day is fast triples at 50–60 % with bands and short rest. One day is medium sets of 6–10 for volume. It suits lifters with solid technique; with shaky form the low volume gives little back.'});
R_.approach({id:'je_controlled_max',by:BY,n:'Controlled 1RM first',
  short:'Base every load on your clean, controlled max and build volume under it.',
  gp:{s:[3,5],r:[5,10],rest:180,rpe:6},prog:'linear',
  cues:['stop when the form changes','own every rep'],
  prefer:'bench|squat|deadlift|press|row',
  details:'Test a max you can lift with the same position every time, not the heaviest weight you can move. Start the program light and add a little each week. You may drop a few kg on paper, but the cleaner lift keeps improving for longer. Good for beginners and for anyone who has been stuck for a long time.'});

/* =====================================================================
   1. Bench Press Junk Volume Kings & Queens
   ===================================================================== */
{const ACC={1:'ohp X6-10; jm_press X10-15; cd_lat_pulldown X8-15; bbcurl X8-15',
  2:'skull_crusher X8-12; row X8-15; cd_lat_pulldown X8-15; rev_fly X12-20',
  3:'rolling_db_tri X8-15; cd_lat_pulldown X8-15; facepull X15-20; bbcurl X8-15'};
 const acc=(d,n)=>A(ACC[d].replace(/X/g,n+'x'),DN);
 const MRN='5–8 min rest · stop at the last clean rep';
 const W=[
  ['1x1@100 1xMR@50','4x20','2x10@50 3xMR@50'],
  ['10x10@60','5x20','1x10@50 1x8@60 4xMR@60'],
  ['5x10@60 5x10@64','6x20','1x10@50 1x8@60 1x5@70 5xMR@70'],
  ['1x10@60 1x10@64 2x10@68* 3x10@64 3x10@60','6x21','1x10@50 1x8@60 1x5@70 1x3@75 5xMR@75'],
  ['1x10@60 1x10@64 3x10@68* 3x10@64 2x10@60','6x22','1x10@50 1x8@60 1x6@70 1x4@75 1x2@80 5xMR@80'],
  ['1x10@60 1x10@64 4x10@68* 4x10@64','6x24','1x10@50 1x8@60 1x6@70 1x4@75 1x2@80 3xMR@85']];
 const days=[];
 W.forEach((w,i)=>{const k=i+1,sets=k===1?2:3;
  const d1=k===1?[I('bench','1 × 1',100,'controlled max, no form breakdown · 5–8 min rest'),I('bench','1 × AMRAP',50,'max reps at 50 % · sets your day 2 load')]
                :R('bench',w[0],{top:'3–5 min rest, start near 5 min'});
  const m=w[1].split('x');
  days.push(D(`je_junk_w${k}d1`,`Week ${k} · Day 1`,k===1?'Test and tens':'Volume tens',[H('A · bench'),...d1,H('B · accessories · 1–3 min rest'),...acc(1,sets)]));
  days.push(D(`je_junk_w${k}d2`,`Week ${k} · Day 2`,'Light high reps',[H('A · bench · 3–5 min rest'),
    I('bench',st(m[0],m[1]),45,'load from your 50 % rep test: about 38 % at 20 reps, 44 % at 26, 48 % at 30 · add 30 s rest per rep over 20'),
    H('B · accessories · 1–3 min rest'),...acc(2,sets)]));
  days.push(D(`je_junk_w${k}d3`,`Week ${k} · Day 3`,'Max reps',[H('A · bench'),...R('bench',w[2],{top:MRN}),H('B · accessories · 1–3 min rest'),...acc(3,k===6?2:sets)]));});
 const NEW='percent of your new estimated 1RM: update your bench 1RM first';
 days.push(D('je_junk_w7d1','Week 7 · Day 1','Test week · heavy singles',[H('A · bench · 3–5 min rest'),...R('bench','1x8@50 1x5@65 1x1@76 1x1@85 1x1@91 2x10@60',{first:NEW}),
   H('B · accessories'),...A('row 1x8-15; cd_lat_pulldown 1x8-15; rev_fly 1x12-20; bbcurl 1x8-15',DN)],'~50 min'));
 days.push(D('je_junk_w7d2','Week 7 · Day 2','Test week · primer',[H('A · bench · 3–5 min rest'),...R('bench','1x8@50 1x5@65 3x1@76',{first:NEW})],'~30 min',false));
 days.push(D('je_junk_w7d3','Week 7 · Day 3','Max test',[H('A · bench · 5–8 min rest on singles'),...R('bench','1x8@50 1x5@65 1x1@76 1x1@85 1x1@92 1x1@96 1x1@100',{first:NEW,top:'new max · add weight if it moves'})],'~45 min'));
 P({id:'je_junk',n:'Bench Press Junk Volume Kings & Queens',sub:'Bench press · 7 weeks · 3 days',type:['Powerlifting','Bench','Percentage-based'],days,
   note:'Rest a week before you run it again. Week 7 uses your new estimated 1RM from the week 6 max-rep sets.'},
 `<h2 id="infoTitle">Bench Press Junk Volume Kings & Queens</h2>
  <p class="by">Josef Eriksson · Bänkpress.nu</p>
  <span class="pill2">7 weeks</span><span class="pill2">3 bench days</span><span class="pill2">% of a controlled 1RM</span>
  <h4>What it is</h4>
  <p>The framework Josef and many of his medal-winning lifters bench with. People call this kind of training junk volume: lots of light and medium reps. It works from beginners to masters. Six weeks of training, then a test week.</p>
  <h4>The week</h4>
  <ul><li><b>Day 1</b> sets of 10 at 60–68 %, more sets each week.</li>
   <li><b>Day 2</b> 4–6 sets of 20–24 on a light load set by your rep test.</li>
   <li><b>Day 3</b> a short ramp, then 3–5 max-rep sets on a heavier weight each week.</li>
   <li><b>Week 7</b> heavy singles and a max on your new estimate.</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Start from a controlled max.</b> Use the heaviest lift you can do without the elbows flaring, the hips moving or the bar drifting. If you can grind 120 but only lift 100 cleanly, use 100.</li>
   <li><b>Week 1, day 1.</b> Test your max, then do as many reps as you can at 50 %. More reps means a heavier day 2: about 38 % of 1RM for 20 reps, 44 % for 26, 48 % for 30.</li>
   <li><b>Rest.</b> 3–5 min on work sets, starting near 5. Day 2 gets 30 s more for each rep over 20. Take 5–8 min (ideally 8) between max-rep sets. Accessories 1–3 min.</li>
   <li><b>Slow it down.</b> Control and symmetry come before speed. Every rep at 50 % should look like your max.</li>
   <li><b>Accessories.</b> Two sets in week 1, then three. Find a hard weight and beat your reps or load next week.</li>
   <li><b>Weekly steps.</b> The spreadsheet adds a fixed 2.5–12.5 kg step (by bar weight) between the 60 % sets. Here that is about 4 %.</li>
   <li><b>Estimate your new max</b> from the best max-rep set on week 6, day 3, and save it as your bench 1RM before week 7. For a paused (competition) test, use about 96 % of that estimate and pause every rep.</li>
   <li><b>Missed a session?</b> Train a little more often for a couple of weeks. Missed two weeks or more: start over.</li></ul>
  <p>Josef suggests cycling it with his 10x10, B.T.2 and Conjugate programs, at most twice in a row.</p>`);
}

/* =====================================================================
   2. B.T.2 – Bänkpress Test Två
   ===================================================================== */
{const DAYA={1:'1x10@62 1x10@65 2x10@70* 1x10@65',4:'1x10@60 1x10@65 2x10@70* 1x10@65',7:'1x10@60 1x10@65 3x10@70* 2x10@65',
   10:'1x10@60 1x10@65 4x10@70* 1x10@65',13:'1x10@60 1x10@65 4x10@70* 2x10@65',16:'1x10@60 1x10@65 1x10@70 1x10@75* 3x10@70 1x10@65',19:'2x5@60 2x2@72 1x1@82 3x1@90'};
 const ACCA={1:'rolling_db_tri 4x15-20; row 4x10-12; rev_fly 4x12-15; bbcurl 4x12-15',4:'ohp 4x8-10; rev_fly 4x10-12; cd_lat_pulldown 4x20-25; cd_tri_pushdown 4x12-15',
   7:'rolling_db_tri 8x10-15; row 5x10-15; rev_fly 5x10-15; bbcurl 5x10-15',10:'rolling_db_tri 8x8-12; row 5x8-12; rev_fly 5x8-12; bbcurl 5x8-12',
   13:'rolling_db_tri 8x12-20; row 5x12-20; rev_fly 5x12-20; bbcurl 5x12-20',16:'rolling_db_tri 8x12-20; row 5x12-20; rev_fly 5x12-20; bbcurl 5x12-20',
   19:'rolling_db_tri 3x12-20; row 3x12-20; rev_fly 3x12-20; bbcurl 3x12-20'};
 const DAYB={2:[12,3,55],5:[12,3,55],8:[12,3,65],11:[12,3,60],14:[12,3,65],17:[9,3,70]};
 const ACCB={2:'ohp 4x8-10; cd_lat_pulldown 4x10-12; facepull 4x20-25; cd_tri_pushdown 4x12-15',5:'ohp 4x8-10; rev_fly 4x10-12; cd_lat_pulldown 4x20-25; cd_tri_pushdown 4x12-15',
   8:'ohp 5x10-12; cd_lat_pulldown 5x10-15; facepull 5x20-25; cd_tri_pushdown 5x10-15',11:'ohp 5x5-8; cd_lat_pulldown 5x8-12; facepull 5x20-25; cd_tri_pushdown 5x8-12',
   14:'ohp 5x10-15; cd_lat_pulldown 5x12-20; facepull 5x20-25; cd_tri_pushdown 5x12-20',17:'ohp 5x10-15; cd_lat_pulldown 5x12-20; facepull 5x20-25; cd_tri_pushdown 5x12-20',
   20:'cd_lat_pulldown 3x10-15'};
 const DAYC={3:'1x8@60 1x5@70 5x5@75* 1x15@60',6:'1x8@60 1x5@70 5x5@75* 1x15@60',9:'1x10@60 1x8@70 1x5@75 1x3@80 3x3@85* 1x15@60 1x20@50',
   12:'1x10@60 1x8@70 5x7@75* 1x18@60 3x23@50',15:'1x10@60 1x8@70 1x5@75 5x3@80* 1x18@60 1x23@50',18:'2x5@60 2x2@72 1x1@82 5x1@90* 1x1@97 1x23@50'};
 const ACCC={3:'jm_press 4x12-20; row 4x8-12; rev_fly 4x10-15; bbcurl 4x12-15',6:'ohp 4x8-10; rev_fly 4x10-12; cd_lat_pulldown 4x20-25; cd_tri_pushdown 4x12-15',
   9:'jm_press 8x10-15; row 5x10-15; rev_fly 5x10-15; bbcurl 5x10-15',12:'jm_press 8x8-12; row 5x8-12; rev_fly 5x8-12; bbcurl 5x8-12',
   15:'jm_press 8x12-20; row 5x12-20; rev_fly 5x12-20; bbcurl 5x12-20',18:'jm_press 8x12-20; row 5x12-20; rev_fly 5x12-20; bbcurl 5x12-20'};
 const ACCH='B · accessories · first set can be a warm-up · 1–5 min rest';
 const days=[];
 for(let n=1;n<=21;n++){const c=Math.ceil(n/3),d=(n-1)%3+1,ey=`Cycle ${c} · Day ${d} · Session ${n}`,key=`je_bt2_s${n}`;
  if(d===1)days.push(D(key,ey,'Medium tens',[H('A · bench · one set every 5–8 min'),...R('bench',DAYA[n],{top:'same grip and precision as a max'}),H(ACCH),...A(ACCA[n],DN)]));
  else if(n===20)days.push(D(key,ey,'Speed primer',[H('A · speed bench · EMOM 8'),I('bench','5 × 2',60,'one set a minute · full force · your normal grip'),I('bench','3 × 1',72,'one set a minute'),H(ACCH),...A(ACCB[n],DN)],'~25 min',false));
  else if(d===2){const [s,r,p]=DAYB[n];days.push(D(key,ey,'Explosive triples',[H(`A · speed bench · EMOM ${s}`),
    I('bench',st(s,r),p,n===17?'one set a minute · as fast as you can · your normal grip':'one set a minute · as fast as you can · rotate narrow, medium and wide grip'),H(ACCH),...A(ACCB[n],DN)],'~60 min'));}
  else if(n===21)days.push(D(key,ey,'Max test',[H('A · bench · 5–8 min rest on singles'),...R('bench','2x3@60 2x2@72 1x1@82 1x1@90 1x1@97 1x1@102',{top:'new max · add more if it moves'})],'~45 min'));
  else days.push(D(key,ey,'High and low reps',[H('A · bench · one set every 5–8 min'),...R('bench',DAYC[n],{top:'your normal, strongest grip'}),H(ACCH),...A(ACCC[n],DN)]));}
 P({id:'je_bt2',n:'B.T.2 – Bänkpress Test Två',sub:'Bench press · 21 sessions · about 6 weeks',type:['Powerlifting','Bench','Percentage-based'],days,
   note:'Three session types in a row, seven times. Set your 1RM to your current max, not an old PB.'},
 `<h2 id="infoTitle">B.T.2 – Bänkpress Test Två</h2>
  <p class="by">Josef Eriksson · Bänkpress.nu · tested on 30 lifters</p>
  <span class="pill2">21 sessions</span><span class="pill2">3-session cycle</span><span class="pill2">% of current 1RM</span>
  <h4>What it is</h4>
  <p>Josef's second group-tested bench program, built on what worked for his own medals and records. Less volume than 10x10 but more demanding: it trains volume, endurance, speed and heavy lifting in one cycle. 28 of 30 testers set a PB, on average about 7 %.</p>
  <h4>The cycle</h4>
  <ul><li><b>Day 1 · medium tens.</b> Eight-ish sets of 10 from light to fairly hard. One set every 5–8 minutes, every rep like a max rep.</li>
   <li><b>Day 2 · explosive triples.</b> 12 sets of 3 on the minute at 55–70 %. Rotate narrow, medium and wide grip. Fast, but never at the cost of position: no bouncing, no shoulder blades slipping. Turn 1–2 cm above the chest if you can't stop touching hard.</li>
   <li><b>Day 3 · high and low reps.</b> Normal grip. Starts with sets of 5–15 and later mixes in singles and sets of 18–23. Session 12 was the toughest for the test group.</li>
   <li><b>Session 21</b> is the max test.</li></ul>
  <h4>Grips</h4>
  <p>Wide is index finger on the rings, medium is the little finger on the rings, narrow is the index finger at the start of the knurling. If your strongest grip is narrower, make that your widest.</p>
  <h4>Accessories</h4>
  <p>The first set can be a warm-up. The next set ends with zero to a few reps in reserve. If you start yanking, take weight off. Rest 1–5 min by feel.</p>`);
}

/* =====================================================================
   3. 10x10 av J.E
   ===================================================================== */
{const P1=['ohp 4x10; lateral_raise 3x10; rev_fly 4x10; cd_tri_pushdown 4x10','cd_lat_pulldown 4x12; row 4x12; facepull 4x20; bbcurl 4x12',
   'ohp 4x15; lateral_raise 3x15; rev_fly 4x15; cd_tri_pushdown 5x15','ohp 5x10; cd_lat_pulldown 4x12; rev_fly 3x15; cd_tri_pushdown 4x15',
   'cd_lat_pulldown 4x12; row 5x12; facepull 3x20; cd_tri_pushdown 4x15','ohp 5x8; lateral_raise 4x12; rev_fly 5x12; cd_tri_pushdown 4x15',
   'row 5x12; cd_lat_pulldown 4x12; facepull 3x20; bbcurl 4x15','ohp 5x8; lateral_raise 4x12; rev_fly 4x15; cd_tri_pushdown 5x15',
   'cd_lat_pulldown 5x15; row 5x12; facepull 4x20; bbcurl 5x15','ohp 5x8; lateral_raise 4x12; rev_fly 4x20; cd_tri_pushdown 5x15'];
 const P2=[['2x15@42 2x10@54 1x5@62 3x3@67 5x1@72* 1x10@62','cd_lat_pulldown 5x12; row 4x10; facepull 4x20; bbcurl 5x12'],
   ['2x15@42 2x12@54 1x8@62 1x5@67 5x5@72* 2x12@62','ohp 5x10; lateral_raise 3x12; rev_fly 4x12; cd_tri_pushdown 5x12'],
   ['2x15@42 2x12@54 1x8@62 1x5@67 1x5@72 5x5@77* 2x12@62','row 5x10; cd_lat_pulldown 4x12; facepull 4x20; bbcurl 5x12'],
   ['2x15@42 2x10@54 2x5@64 2x3@72 2x2@80 5x1@83* 2x12@62','ohp 4x8; row 4x12; rev_fly 4x12; cd_tri_pushdown 5x15; bbcurl 5x12'],
   ['2x15@42 2x12@54 1x8@64 1x5@72 1x3@78 3x2@84* 2x20@50','ohp 4x12; lateral_raise 3x12; rev_fly 5x15; cd_tri_pushdown 5x12'],
   ['2x10@42 2x8@52 2x5@61 2x3@69 2x2@76 1x1@82 3x1@87* 3x12@60','cd_lat_pulldown 5x12; row 4x12; facepull 5x15; bbcurl 5x12'],
   ['2x10@42 2x8@54 2x5@64 2x3@73 2x2@81 1x1@85 3x1@88* 5x3@75 3x12@60','ohp 4x10; lateral_raise 4x12; rev_fly 5x15; cd_tri_pushdown 5x12'],
   ['2x12@42 2x8@54 2x5@64 1x2@73 1x1@81 1x1@88 3x1@93* 2x4@81 2x8@70 2x12@60','row 5x15; cd_lat_pulldown 5x15; facepull 5x15; bbcurl 5x15'],
   ['2x10@42 2x5@54 2x3@64 1x1@73 1x1@81 1x1@88 1x1@93 1x1@97* 1x1@93 5x1@85 1x10@70 1x20@55','rev_fly 4x15'],
   ['2x10@42 2x5@54 3x1@62','cd_lat_pulldown 3x12; row 4x12']];
 const ACCH='B · accessories · first set is a warm-up';
 const days=[];
 P1.forEach((a,i)=>days.push(D(`je_10x10_p1s${i+1}`,`Part 1 · Session ${i+1}`,'10 × 10',[H('A · bench · 50–60 min for all ten sets'),
   I('bench','10 × 10',58,'no sets to failure · generous rest'),H(ACCH),...A(a)],'~90 min')));
 P2.forEach((x,i)=>days.push(D(`je_10x10_p2s${i+1}`,`Part 2 · Session ${i+1}`,i===9?'Light primer':'Peaking',[H('A · bench · 3–5 min rest on work sets'),
   ...R('bench',x[0]),H(ACCH),...A(x[1])],i===9?'~30 min':'~75 min',i!==9)));
 days.push(D('je_10x10_max','Max test','Max test',[H('A · bench · 5–8 min rest on singles'),...R('bench','2x10@42 2x5@54 2x3@64 1x1@73 1x1@81 1x1@88 1x1@93 1x1@98 1x1@103',{top:'new max · try heavier if there is more'})],'~45 min'));
 P({id:'je_10x10',n:'10x10 av J.E',sub:'Bench press · 21 sessions · every other day',type:['Powerlifting','Bench','Percentage-based'],days,
   note:'Bench every other day. Part 1 is ten sessions of 10 × 10 at 58 %, part 2 is a ten-session peak, then a max test.'},
 `<h2 id="infoTitle">10x10 av J.E</h2>
  <p class="by">Josef Eriksson · Bänkpress.nu · tested on 87 lifters</p>
  <span class="pill2">21 sessions</span><span class="pill2">Every other day</span><span class="pill2">About 58 % on average</span>
  <h4>What it is</h4>
  <p>Josef's first group-tested bench program. Part 1 is ten sessions of 10 × 10 at 58 % with shoulder, back and arm work. Part 2 starts very light to recover and then builds through ramps to heavy singles. A max test closes it. 80 of 87 testers set a PB, on average 6.8 %, without a single set to failure.</p>
  <h4>How to run it</h4>
  <ul><li><b>Use a fresh max.</b> Something you lifted this week, with good form. Not an old PB and not a dream number. Unsure? Test it first.</li>
   <li><b>Every other day.</b> If you get sick, start over or go back 3–4 sessions once you are fully well.</li>
   <li><b>10 × 10 takes 50–60 minutes.</b> The light load gives you a thousand reps to clean up your technique.</li>
   <li><b>Warm up properly</b> before the first listed set: at least 60 reps over 4 sets up to 100 kg, 80 reps over 5 sets up to 150 kg, 100 over 6 sets up to 200 kg.</li>
   <li><b>Accessories.</b> The first set is a warm-up. If you are new or out of shape, go easy: about half your capacity on set one, then 60–80 %.</li>
   <li><b>Cycle it twice at most,</b> then do something else for a while. Josef pairs it with B.T.2 and Conjugate. On a later round, run part 1 at 63 % instead of 58 %.</li></ul>`);
}

/* =====================================================================
   4. Conjugate bänk av J.E (Bänkpress Test Tre)
   ===================================================================== */
{const REP=['','1x10@60 1x10@64 2x10@68* 2x10@64 2x10@60','1x8@64 1x8@68 2x8@72* 2x8@68 2x8@64','1x6@68 1x6@72 3x6@76* 3x6@72',
   '1x10@60 1x10@64 1x10@68 1x10@72* 2x10@68 2x10@64','1x8@64 1x8@68 1x8@72 1x8@76* 2x8@72 2x8@68'];
 const ME=[['cg_bench','Close grip'],['mg_bench','Medium grip'],['board_press','Wide grip to a board'],['board_press','Medium grip to a board'],['board_press','Close grip to a board'],['banded_bench','Wide grip against bands']];
 const BOARD=[[40,'3x10'],[60,'3x10'],[60,'3x12'],[60,'3x15'],[60,'3x15'],null];
 const days=[];
 for(let w=1;w<=6;w++){const s=w<=3?3:4,sx=n=>A(`rolling_db_tri ${n}x6-20/or JM press; cd_lat_pulldown ${n}x6-20/or chin-ups · use assistance if you can't do 6; rev_fly ${n}x10-15; bbcurl ${n}x8-20/any curl`);
  const d1=w===1?[I('bench','1 × 1',100,'max, no pause · this sets all day 1 and 2 loads'),I('bench','3 × AMRAP',80,'5 min rest · strict reps')]
                 :R('bench',REP[w-1],{top:'3–5 min rest'});
  days.push(D(`je_conj_w${w}d1`,`Week ${w} · Day 1`,w===1?'Max and reps':'Repetition day',[H('A · bench · your normal grip'),...d1,H('B · accessories · near technical failure'),...sx(s)]));
  const b=BOARD[w-1];
  days.push(D(`je_conj_w${w}d2`,`Week ${w} · Day 2`,'Speed day',[H('A · speed bench + bands · 1 min rest'),
    I('bench','3 × 3',50,'narrow grip · turn 2 cm above the chest'),I('bench','3 × 3',55,'medium-narrow grip · turn 2 cm above the chest'),I('bench','3 × 3',60,'medium grip · turn 2 cm above the chest'),
    ...(b?[H('B · close grip to a board · 3–5 min rest'),w===1?I('bench','3 × 10',40,'close grip to a board · % of your normal bench'):I('cg_bench',st(...b[1].split('x')),60,'to a board · % of your close-grip max from week 1')]:[]),
    H('C · accessories'),I('ohp','3 × 8',null,'slow, about 3 s up and 3 s down · light'),...A(`row ${w<3?3:4}x6-20/any row; cd_lat_pulldown ${w<3?3:4}x8-12/pulldowns; facepull ${w<3?3:4}x15-25`)],'~60 min'));
  const [mk,mn]=ME[w-1];
  days.push(D(`je_conj_w${w}d3`,`Week ${w} · Day 3`,`Max effort · ${mn.toLowerCase()}`,[H(`A · ${mn.toLowerCase()} · 5 min rest`),
    I(mk,'1 × 1',null,`${mn} · single up from 70–80 % of your guess to a max for today · save it as this lift's 1RM`),I(mk,'3 × AMRAP',80,'80 % of today\'s max · strict reps'),
    H('B · accessories'),...A(w===6?'btn_pulldown 4x8-12; row 4x8-15/any row; bbcurl 4x8-20/any curl':`rolling_db_tri 3x8-15/or JM press; btn_pulldown 3x8-12; row 3x8-15/any row; bbcurl 3x8-20/any curl`)]));}
 days.push(D('je_conj_w7d1','Week 7 · Day 1','Test week · heavy singles',[H('A · bench · 3–5 min rest'),...R('bench','1x8@60 1x3@72 1x1@80 5x1@88 3x10@60'),
   H('B · accessories'),...A('cd_lat_pulldown 3x6-20/or chin-ups; rev_fly 3x10-15; bbcurl 3x8-20/any curl')],'~50 min'));
 days.push(D('je_conj_w7d2','Week 7 · Day 2','Test week · primer',[H('A · bench · 3–5 min rest'),...R('bench','1x8@60 1x3@72 5x1@80',{top:'feeling flat? repeat this session 2–3 times and skip day 1'})],'~30 min',false));
 days.push(D('je_conj_w7d3','Week 7 · Day 3','Max test',[H('A · bench · 5–8 min rest on singles'),...R('bench','1x8@60 1x3@72 1x1@80 1x1@88 1x1@95 1x1@101',{top:'0.5–2.5 kg over your week 1 max · keep adding while it moves'}),
   I('bench','3 × AMRAP',80,'80 % of the new max · 5 min rest')],'~50 min'));
 P({id:'je_conj',n:'Conjugate bänk av J.E (Bänkpress Test Tre)',sub:'Bench press · 7 weeks · 3 days · max, speed, reps',type:['Powerlifting','Bench','Percentage-based'],days,
   note:'Day 1 and 2 loads come from the week 1 max. Day 3 maxes a new variant each week: save it as that lift\'s 1RM before the 80 % sets.'},
 `<h2 id="infoTitle">Conjugate bänk av J.E</h2>
  <p class="by">Josef Eriksson · Bänkpress Test Tre · tested on 97 lifters</p>
  <span class="pill2">7 weeks</span><span class="pill2">3 days a week</span><span class="pill2">Westside-style</span>
  <h4>What it is</h4>
  <p>A Westside Barbell–inspired bench program: eight max attempts in seven weeks, backed by a speed day and a medium volume day. 84 of 97 testers raised their max, on average about 6 %. Lower in volume than 10x10 and B.T.2, with many more heavy lifts.</p>
  <h4>The week</h4>
  <ul><li><b>Day 1 · repetition.</b> Your normal grip, sets of 6–10 at 60–76 %. Week 1 starts with a max test and three max-rep sets at 80 %.</li>
   <li><b>Day 2 · speed.</b> Three triples each at 50, 55 and 60 % with bands, narrow to medium grip, 1 min rest. Turn about 2 cm above the chest. Then close-grip board presses.</li>
   <li><b>Day 3 · max effort.</b> Single up to a max on the week's variant: close grip, medium grip, wide to a board, medium to a board, close to a board, wide against bands. Then three max-rep sets at 80 % of that max.</li>
   <li><b>Week 7</b> tapers to a max. If you feel worn out, repeat day 2 two or three times and skip day 1.</li></ul>
  <h4>Setup</h4>
  <ul><li><b>Board</b> about 40 % (±10 %) of your range of motion. Measure bar to chest with 70–80 % on the bar. Use the same board every time.</li>
   <li><b>Band</b> by max: under 100 kg light, 100–160 kg medium, 160–200 kg heavy, 200 kg+ heavier. Same band all program.</li>
   <li><b>Grips.</b> Narrow: index finger where the knurling ends. Medium-narrow: hand between that and the ring. Medium: little finger on the ring. Wide: index finger on the ring.</li>
   <li><b>Rest.</b> Max and max-rep sets 5 min, day 1 sets 3–5 min, speed sets 1 min, board presses 2–5 min.</li>
   <li><b>Form.</b> Press, never bounce off the chest or the board. Better 2.5 kg more than a 10 kg miss. Have a spotter or safeties for the max-rep sets.</li></ul>
  <p>Josef's suggested rotation: Conjugate twice, 10x10 part 1, B.T.2, Conjugate, then the full 10x10 at 63 % in part 1.</p>`);
}

/* =====================================================================
   5. Basic Bench 1.0
   ===================================================================== */
{const days=[];
 for(let w=1;w<=8;w++){const p1=w<8?65+2.5*(w-1):85,p2=w<8?55+2.5*(w-1):102;
  days.push(D(`je_basic_w${w}d1`,`Week ${w} · Day 1`,'Fives',[H('A · bench · 3–6 min rest'),I('bench',w<8?'5 × 5':'5 × 1',p1,w<8?'strict, rear on the bench':'crisp singles'),
    H('B · accessories · 3 min rest'),...A('skull_crusher 3x10/lower the bar to the bench behind your head; ohp 3x8; row 3x12; rev_fly 2x15')],'~60 min'));
  days.push(D(`je_basic_w${w}d2`,`Week ${w} · Day 2`,w<8?'Tens':'Max test',w<8?[H('A · bench · 3–6 min rest'),I('bench','5 × 10',p2,'every rep the same'),
    H('B · accessories · 3 min rest'),...A('jm_press 3x15; cd_lat_pulldown 3x8; bbcurl 3x12; facepull 2x20')]
    :[H('A · bench · 5–8 min rest'),I('bench','1 × 1',102,'one attempt at a small PR · only with clean form')],w<8?'~60 min':'~30 min'));}
 P({id:'je_basic',n:'Basic Bench 1.0',sub:'Bench press · 8 weeks · 2 days',type:['Powerlifting','Bench','Beginner'],days,
   note:'Two bench days a week with 2–3 days between. Starts light on purpose: in week 7 you lift what you could do in week 1, only cleaner.'},
 `<h2 id="infoTitle">Basic Bench 1.0</h2>
  <p class="by">Josef Eriksson · Bänkpress.nu</p>
  <span class="pill2">8 weeks</span><span class="pill2">2 days a week</span><span class="pill2">Technique first</span>
  <h4>What it is</h4>
  <p>A foundation program whose main goal is a better-looking bench, with strength as a bonus. Starting with a shaky 125 and finishing with a solid 120 counts as progress here: it builds the base the next program grows from.</p>
  <h4>How to run it</h4>
  <ul><li><b>Day 1</b> 5 × 5, from 65 % up 2.5 % a week to 80 %. <b>Day 2</b> 5 × 10, from 55 % to 70 %.</li>
   <li><b>Week 8</b> is 5 singles at 85 %, then a single at about 102 % on day 2.</li>
   <li><b>Use an honest 1RM:</b> rear on the bench, no bounce. Hold every training rep to the same standard.</li>
   <li><b>Rest</b> 3–6 min between bench sets, 3 min in accessories. Leave 2–3 days between sessions; one day is too little the first time through.</li>
   <li><b>Accessories.</b> Count only working sets. If a set feels easy, add weight; if you can't reach the reps, drop it. Try to beat last week's weight or reps.</li></ul>
  <p>The spreadsheet lists the week 8 test as 102 % × 10, which reads as a typo; it is entered here as a single.</p>`);
}

/* =====================================================================
   6. Tyngre nybörjarprogram: Bänkpress
   ===================================================================== */
{const S=[
  ['2x8@50 2x5@60 8x3@65','4 min rest','row 3x8-12/pause at the chest; cd_lat_pulldown 3x8-12/pause at the chest; rev_fly 3x10-15'],
  ['2x8@50 2x5@60 2x2@66 8x2@70','5 min rest','rolling_db_tri 3x8-12; row 3x8-12/pause at the chest; facepull 3x10-15/pause at your head'],
  ['2x8@50 2x6@62 2x4@72 8x1@80','5 min rest','cd_tri_pushdown 3x10-20; cd_lat_pulldown 3x8-12/pause at the chest; row 3x8-12/pause at the bottom'],
  ['2x8@50 2x5@60 10x5@65','4 min rest','db_bench 3x10/about 20 % of your bench 1RM per dumbbell; cd_lat_pulldown 5x8-12/pause at the chest; rev_fly 3x10-15; bbcurl 3x8-12'],
  ['2x8@50 2x5@60 2x2@66 10x3@70','5 min rest','rolling_db_tri 5x8-12; row 5x8-12/pause at the chest; facepull 3x10-15/pause at your head'],
  ['2x8@50 2x6@62 2x4@72 10x1@80','5 min rest','cd_tri_pushdown 5x10-20; cd_lat_pulldown 5x8-12/pause at the chest; sa_db_row 5x8-12/pause at the chest; bbcurl 3x10-20'],
  ['2x8@50 2x5@62 10x4@70','4 min rest','cd_lat_pulldown 5x8-12/pause at the chest; rev_fly 5x10-15; bbcurl 3x8-12; cd_tri_pushdown 3x10-20'],
  ['2x8@50 2x5@62 2x2@71 8x2@75','5 min rest','rolling_db_tri 5x8-12; row 5x8-12/pause at the chest; facepull 5x10-15'],
  ['2x8@50 2x6@62 3x2@72 3x1@80 3x1@85','5 min rest','db_bench 5x12/about 20 % of your bench 1RM per dumbbell; cd_lat_pulldown 5x8-12/pause at the chest; rev_fly 3x10-15; bbcurl 3x10-20'],
  ['1x10@50 1x8@62 10x5@70','5 min rest','rolling_db_tri 5x8-12; sa_db_row 6x8-12/pause at the chest; facepull 5x10-15; cd_tri_pushdown 3x10-20'],
  ['2x8@50 4x3@60 4x3@63 4x3@66','explosive · 1 min rest','db_bench 3x15/about 20 % of your bench 1RM per dumbbell; row 5x8-12; facepull 5x10-15'],
  ['1x10@50 1x6@65 1x4@75 2x2@81 6x1@85 3x10@70','5 min rest','row 3x8-12; cd_lat_pulldown 3x8-12/pause at the chest; rev_fly 5x10-15; bbcurl 3x10-20'],
  ['1x10@50 1x10@60 10x10@65','5 min rest','rolling_db_tri 5x8-12; row 5x8-12/pause at the chest; facepull 5x10-15; bbcurl 3x10-20'],
  ['2x8@50 4x3@60 4x3@63 4x3@66','explosive · 1 min rest','db_bench 3x15/about 20 % of your bench 1RM per dumbbell; sa_db_row 6x8-12/pause at the chest; facepull 5x10-15; cd_tri_pushdown 3x10-20'],
  ['1x10@50 1x6@65 1x4@75 2x2@84 4x1@90 3x10@70','5 min rest','row 5x8-12; cd_lat_pulldown 5x8-12; cd_tri_pushdown 3x10-20; bbcurl 3x10-20'],
  ['1x8@50 1x6@65 2x3@75 2x1@88 1x1@92','3–5 min rest','row 5x8-12; facepull 5x10-15; bbcurl 3x10-20'],
  ['2x8@50 3x3@60 3x3@63 3x3@66 3x1@69','explosive · 1 min rest','sa_db_row 6x8-12; facepull 5x10-15'],
  ['2x5@50 2x3@65 2x1@75 2x1@88 1x1@92 1x1@95','5 min rest',null]];
 const days=S.map((x,i)=>{const w=Math.floor(i/3)+1,d=i%3+1,ex=/explosive/.test(x[1]);
  const b=ex?[I('bench','2 × 8',50,'warm-up'),...R('bench',x[0].split(' ').slice(1).join(' '),{first:'as fast as you can without losing position'})]:R('bench',x[0],{first:'warm-up sets rest by feel'});
  return D(`je_nybo_w${w}d${d}`,`Week ${w} · Day ${d}`,ex?'Explosive':i===17?'Heavy singles':['Triples','Doubles','Singles'][d-1],
   [H(`A · bench · ${x[1]} on work sets`),...b,...(i===17?[{n:'Feeling good on the last set? Test a max.',s:''}]:[]),...(x[2]?[H('B · accessories'),...A(x[2],DN)]:[])],i===17?'~40 min':'~60 min');});
 P({id:'je_nybo',n:'Tyngre nybörjarprogram: Bänkpress',sub:'Bench press · 6 weeks · 3 days · technique focus',type:['Powerlifting','Bench','Beginner'],days,
   note:'For new lifters, or anyone whose bench style needs work. Enter the max you can lift today without a wobbly, ragged rep.'},
 `<h2 id="infoTitle">Tyngre nybörjarprogram: Bänkpress</h2>
  <p class="by">Josef Eriksson · Tyngre</p>
  <span class="pill2">6 weeks</span><span class="pill2">3 days a week</span><span class="pill2">Style first</span>
  <h4>What it is</h4>
  <p>A six-week bench program for beginners, and for experienced lifters who need to rebuild their style. Bench every session with a short ramp into the work sets. Accessories build and coordinate the muscles that bench.</p>
  <h4>How to run it</h4>
  <ul><li><b>Warm-up sets</b> are the lighter ramp sets: rest by feel. <b>Work sets</b> have a set rest of 4–5 min.</li>
   <li><b>Explosive days</b> (from week 4): triples at 60–66 % with 1 min rest, as fast as you can without giving up position.</li>
   <li><b>Accessories</b> have no fixed load. Pick a weight that challenges the muscle and still lets you lift well. Pause rows and pulldowns at the chest, face pulls at your head.</li>
   <li><b>Week 6</b> peaks with singles up to 95 %. If the last one moves well, test a max.</li></ul>`);
}

/* =====================================================================
   7. Bultprogrammet
   ===================================================================== */
{const BEN=['1x10@50 1x10@60 3xMR@60','1x10@50 1x10@60 1x8@66 4xMR@66','1x10@50 1x10@60 1x8@66 1x6@72 5xMR@72','1x10@50 1x10@60 1x8@66 1x6@72 1x4@78 5xMR@78','1x10@50 1x10@60 1x8@66 1x6@72 1x4@78 1x2@84 5xMR@84'];
 const OHP=['1x10@50 2x10@60','1x10@50 1x8@60 2x10@65','1x10@50 1x8@60 2x6@70','1x10@50 1x8@60 1x6@75 2x4@75','1x10@50 1x8@60 1x6@75 2x2@80'];
 const DL=['1x10@50 1x10@60 1xMR@70','1x10@50 1x8@65 1xMR@75','1x10@50 1x8@60 1x6@70 1xMR@80','1x10@50 1x6@65 1x4@75 1xMR@85','1x10@50 1x8@60 1x6@70 1x4@80 1xMR@90'];
 const SQ=['1x10@50 1x10@60 2x10@65','1x10@50 1x8@60 2x8@70','1x10@50 1x8@60 1x6@70 3x6@76','1x10@50 1x8@60 1x6@70 1x4@76 2x4@82','1x10@50 1x8@60 1x5@70 1x3@80 3x1@88'];
 const BOX=[[45,'3x12'],[47.5,'3x12'],[50,'3x12'],[47.5,'3x12'],[60,'2x12']],SLDL=[[45,'3x12'],[47.5,'3x12'],[50,'3x12'],[52.5,'2x12'],[40,'1x10']];
 const MRB='3–8 min rest between max-rep sets, ideally 8',MRL='last set to max reps';
 const days=[];
 for(let w=1;w<=5;w++){const a=w===1?2:w<=2?2:3,l=w===1?1:2,m3=w===5?1:a;
  const ul=(i)=>`skull_crusher ${i}x8-15/${w>1?'last set max reps · ':''}lying, behind the head`;
  days.push(D(`je_bult_w${w}d1`,`Week ${w} · Day 1`,'Upper · wide bench',[H('A · bench · wide grip'),...R('bench',BEN[w-1],{top:MRB}),
    H('B · overhead press · 3–5 min rest'),...R('ohp',OHP[w-1],{top:MRL}),
    H('C · accessories · 1–3 min rest'),...A(`cd_lat_pulldown ${a}x8-15/${w>1?'last set max reps · ':''}or chin-ups; ${ul(a)}; bbcurl ${a}x8-15${w>1?'/last set max reps':''}; rev_fly ${a}x12-20`)],'~90 min'));
  const lower2=w<=3?`forward_lunge ${[1,2,2][w-1]}x${w<3?'10':'8-12'}; legraise ${l}xMR; torso_rotation ${l}x10-15; hip_ext_rotation ${l}x8-20`
    :w===4?'forward_lunge 2x8-12; legraise 2xMR; backext 2xMR; hip_ext_rotation 2x8-20':'forward_lunge 1x8-12; legraise 1xMR; hip_ext_rotation 1x8-20';
  days.push(D(`je_bult_w${w}d2`,`Week ${w} · Day 2`,'Lower · deadlift',[H('A · deadlift · belt allowed · 3–5 min rest'),...R('deadlift',DL[w-1],{top:'max reps · sumo pullers add about 3 % to the heavier sets'}),
    H('B · box squat · no belt · 3–5 min rest'),I('box_squat',st(...BOX[w-1][1].split('x')),null,`${BOX[w-1][0]} % of your squat 1RM`),
    H('C · accessories · 1–3 min rest'),...A(lower2)],'~90 min'));
  days.push(D(`je_bult_w${w}d3`,`Week ${w} · Day 3`,'Upper · medium bench',[H('A · bench · medium grip'),...R('mg_bench',BEN[w-1],{top:MRB}),
    H('B · accessories · 1–3 min rest'),I('chinups',st(['2','2','3-4','3','3-5'][w-1],'8-15'),null,'2–5 min rest'),
    ...A(`${ul(m3)}; row ${m3}x8-15/${w>1?'last set max reps · ':''}any row; facepull ${m3}x12-20; bbcurl ${m3}x8-15${w>1?'/last set max reps':''}`)],'~80 min'));
  const lower4=w<5?`good_morning ${l}x${w<3?'10':'8-12'}; split_squat ${l}x10; bar_hold ${l}x20-40 s; cable_crunch ${l}x8-20/or any ab exercise`:'cable_crunch 1x8-20/or any ab exercise';
  days.push(D(`je_bult_w${w}d4`,`Week ${w} · Day 4`,'Lower · squat',[H('A · squat · belt allowed · 3–5 min rest'),...R('backsquat',SQ[w-1],{top:w<5?MRL:'heavy singles'}),
    H('B · stiff-legged deadlift · no belt · 3–5 min rest'),I('sldl',st(...SLDL[w-1][1].split('x')),null,`${SLDL[w-1][0]} % of your deadlift 1RM`),
    H('C · accessories · 1–3 min rest'),...A(lower4)],'~80 min'));}
 const NEW='% of your new estimated 1RM: update it from your heaviest max-rep set first';
 days.push(D('je_bult_w6d1','Week 6 · Day 1','Bench primer · press max',[H('A · bench · 3–5 min rest'),...R('bench','1x8@60 1x3@70 1x1@78 3x1@85 3x10@60',{first:NEW}),
   H('B · overhead press max'),...R('ohp','1x5@50 1x3@65 1x1@75 1x1@85 1x1@93 1x1@100',{first:NEW,top:'5–8 min rest · go heavier if it is there'}),
   H('C · accessories'),...A('cd_lat_pulldown 2x8-15; rev_fly 2x12-20')],'~60 min'));
 days.push(D('je_bult_w6d2','Week 6 · Day 2','Light lower',[H('A · squat and deadlift · 3–5 min rest'),I('backsquat','3 × 3',50,NEW),I('deadlift','3 × 1',50)],'~30 min',false));
 days.push(D('je_bult_w6d3','Week 6 · Day 3','Light bench',[H('A · bench · 3–5 min rest'),...R('bench','1x10@50 1x10@64 3x1@75',{first:NEW}),H('B · accessories'),...A('facepull 1x12-20')],'~30 min',false));
 const MAX='1x5@60 1x3@70 1x1@78 1x1@85 1x1@91 1x1@96 1x1@100';
 days.push(D('je_bult_w6d4','Week 6 · Day 4','Max test',[H('A · squat · 5–8 min rest on the top singles'),...R('backsquat',MAX,{top:'go heavier if it is there'}),
   H('B · bench'),...R('bench',MAX.replace('1x5@60','1x8@60'),{top:'go heavier if it is there'}),H('C · deadlift'),...R('deadlift',MAX,{top:'go heavier if it is there'})],'~2 h'));
 P({id:'je_bult',n:'Bultprogrammet',sub:'Powerlifting · 6 weeks · 4 days · upper/lower',type:['Powerlifting','Upper/lower','Percentage-based'],days,
   note:'Two upper and two lower days. Leave at least two days between the upper days and between the lower days. Week 6 is a max test.'},
 `<h2 id="infoTitle">Bultprogrammet</h2>
  <p class="by">Josef Eriksson · Bänkpress.nu · tested on 50+ lifters</p>
  <span class="pill2">6 weeks</span><span class="pill2">4 days a week</span><span class="pill2">Squat, bench, deadlift, press</span>
  <h4>What it is</h4>
  <p>Strength with size: "bult" means blocky and solid, the kind of build that looks strong in clothes. The basics plus simple barbell and bar work: a rack, bench, bar, plates, a band and ideally a pull-up bar.</p>
  <h4>The week</h4>
  <ul><li><b>Day 1</b> wide-grip bench and overhead press. <b>Day 2</b> deadlift and box squat.</li>
   <li><b>Day 3</b> medium-grip bench and chin-ups. <b>Day 4</b> squat and stiff-legged deadlift.</li>
   <li>For example Monday, Wednesday, Friday, Sunday. Most sessions take an hour if you keep moving, about 1.5 h otherwise.</li>
   <li><b>Week 5</b> starts cutting volume. <b>Week 6</b> recovers and tests on new estimated maxes from your heaviest max-rep sets (bench week 5 day 1, deadlift week 5 day 2, squat week 4 day 4).</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Use a technical max,</b> the heaviest weight you can lift before the form visibly changes. For some that is 70–80 % of what they can grind up. Everyone who started too light has improved.</li>
   <li><b>Five good reps beat ten bad ones.</b> Every bad rep practises a bad lift.</li>
   <li><b>Max reps (AMRAP)</b> means as many as you can, ideally stopping just before failure. Rest 3–8 min between max-rep bench sets (8 is best) and keep it the same all session.</li>
   <li><b>Grips.</b> Wide is index fingers on the rings (81 cm); medium is little fingers on the rings.</li>
   <li><b>Gear.</b> Belt only on the heavy deadlift and squat days; none on box squats or stiff-legged deadlifts. No knee sleeves until the test. Straps on one hand at most.</li>
   <li><b>Sumo deadlifters:</b> the sheet adds about 3 % to the heavier deadlift sets.</li>
   <li><b>Conditioning</b> on the side helps: 2–4 hard 15-minute sessions a week, or 30–60 minutes easy. Keep it away from leg days.</li></ul>`);
}

/* =====================================================================
   8. Tillbaka till Styrketräning Del III
   ===================================================================== */
{const PC=['3x5@60 5x5@68','2x5@60 5x5@72','1x5@60 1x5@68 5x5@76','1x5@60 1x5@72 5x3@80','1x5@60 1x5@72 1x3@80 3x3@85','1x5@60 1x3@70 1x3@78 1x2@85 2x2@90'];
 const DLT=[['1x8@60 3x8@70',55,'2x8',45,'2x8'],['1x8@60 1x5@70 3x5@75',55,'2x10',45,'2x10'],['1x8@60 1x5@72 3x3@80',65,'2x8',50,'2x8'],
   ['1x8@60 1x8@68 3x8@74',60,'2x10',50,'2x10'],['1x8@60 1x5@72 5x5@80',65,'2x6',55,'2x6'],['1x8@60 3x5@72 1x3@80 3x3@85',65,'2x8',55,'2x8']];
 const BEN=[['6x15@60',45,'2x10'],['1x12@60 6x12@63',45,'2x12'],['1x10@60 6x10@66',50,'2x10'],['1x10@60 6x8@68',50,'2x12'],['1x10@60 1x8@68 6x6@74',55,'2x8'],['1x10@60 1x8@68 1x6@74 6x4@80',55,'2x10']];
 const SQT=['1x8@60 6x8@65* 2x10@50','1x8@60 6x8@69* 2x10@50','1x8@60 1x5@66 6x5@70* 2x10@54','1x8@60 1x5@68 6x5@75* 2x10@54','1x8@60 1x5@68 1x3@74 6x3@78* 2x10@57','1x8@60 1x5@70 1x3@76 6x3@82* 2x10@57'];
 const OH=['1x8@60 5x8@68','1x8@60 1x5@68 5x5@75','1x8@60 1x5@68 1x3@75 5x3@80','1x8@60 5x8@70','1x8@60 1x5@72 5x5@80','1x8@60 1x5@72 1x3@80 5x3@85'];
 const A1=[['4x6+','1–3 RIR',3,3],['6x6+','0–3 RIR',4,4],['6x6+','0–3 RIR',4,4],['6x6+','2–4 RIR',4,4],['6x6+','2–4 RIR',4,4],['6x6+','2–4 RIR',2,2]];
 const A2=['dbincline 3x20-30/20° incline · 2–5 RIR; rolling_db_tri 4x10-20/1–6 RIR; row 4x8-20/any row · 1–3 RIR; btn_pulldown 4x8-12/2–4 RIR',
   'dbincline 3x15-25/20° incline · 2–5 RIR; rolling_db_tri 5x10-15/0–5 RIR; row 5x8-20/any row · 0–3 RIR; btn_pulldown 4x8-12/0–4 RIR',
   'dbincline 3x10-20/20° incline · 2–5 RIR; rolling_db_tri 6x8-12/0–4 RIR; row 6x8-20/any row · 0–3 RIR; btn_pulldown 4x8-12/0–4 RIR',
   'dbincline 3x20-30/20° incline · 1–4 RIR; rolling_db_tri 6x12-15/0–4 RIR; row 6x8-20/any row · 0–3 RIR; btn_pulldown 4x8-12/0–4 RIR',
   'dbincline 3x15-25/20° incline · 1–4 RIR; rolling_db_tri 6x10-12/0–3 RIR; row 6x8-20/any row · 0–3 RIR; btn_pulldown 4x8-12/0–4 RIR',
   'dbincline 3x10-20/20° incline · 1–4 RIR; rolling_db_tri 6x8-12/0–3 RIR; row 6x8-20/any row · 0–3 RIR; btn_pulldown 4x8-12/0–4 RIR'];
 const A3=[[3,3,3,'3x8+'],[4,4,4,'4x8+'],[5,4,4,'5x10+'],[6,4,4,'6x10+'],[6,4,4,'6x12+'],[6,4,4,'3x12+']];
 const A4=[['3x6+','3x10-20','3x15-30','4x10-20'],['3x6+','4x10-20','4x15-30','6x10-20'],['4x10+','4x6-10','4x15-30','6x6-10'],['4x10+','4x8-12','4x15-30','6x8-12'],['4x12+','4x10-15','4x15-30','6x10-15'],['4x12+','4x10-20','4x15-30','6x10-20']];
 const days=[];
 for(let w=0;w<6;w++){const k=w+1,[dl,dp,ds,sp,ss]=DLT[w],[bn,cp,cs]=BEN[w],[ch,rit,gs,bs]=A1[w],[ht,sq,he,ab]=A3[w],[dp4,sd,fp,cu]=A4[w];
  days.push(D(`je_tts3_w${k}d1`,`Week ${k} · Day 1`,'Power clean and deadlift',[H('A · power clean · 3–5 min rest'),...R('power_clean',PC[w]),
    H('B · deadlift · 3–5 min rest'),...R('deadlift',dl,{top:'last set to max reps'}),
    I('deficit_deadlift',st(...ds.split('x')),null,`6 cm deficit · ${dp} % of your deadlift 1RM`),I('sldl',st(...ss.split('x')),null,`${sp} % of your deadlift 1RM`),
    H('C · accessories · 1–3 min rest'),I('chinups',st(...ch.split('x')),null,rit),I('glute_ham_raise',st(gs,'6-20'),null,'0–3 RIR'),
    H(`D · superset × ${bs}`),I('backext',st(bs,'8+'),null,'0–3 RIR'),I('legraise',st(bs,'8+'),null,'0–3 RIR')],'~90 min'));
  days.push(D(`je_tts3_w${k}d2`,`Week ${k} · Day 2`,'Bench',[H('A · bench · 3–5 min rest'),...R('bench',bn,{top:'last set to max reps'}),I('cg_bench',st(...cs.split('x')),cp,'close grip, hands shoulder-width · last set to max reps'),
    H('B · accessories · 1–3 min rest'),...A(A2[w])],'~80 min'));
  days.push(D(`je_tts3_w${k}d3`,`Week ${k} · Day 3`,'Squat',[H('A · squat · 3–5 min rest'),...R('backsquat',SQT[w],{top:'last set to max reps'}),
    H('B · accessories · 1–3 min rest'),...A(`hip_thrust ${ht}x8-12/0–4 RIR; split_squat ${sq}x8-12/1–3 RIR; hip_ext_rotation ${he}x8-15/0–5 RIR; ab_wheel ${ab}/0–3 RIR`)],'~80 min'));
  days.push(D(`je_tts3_w${k}d4`,`Week ${k} · Day 4`,'Overhead press',[H('A · overhead press · 3–5 min rest'),...R('ohp',OH[w],{top:'last set to max reps'}),
    H('B · accessories · 1–3 min rest'),...A(`dips ${dp4}/0–5 RIR; cd_db_press ${sd}/seated · 0–5 RIR; facepull ${fp}/0–4 RIR; bbcurl ${cu}/0–5 RIR`)],'~70 min'));}
 const NEW='% of your new estimated 1RM from the week 6 max-rep sets',T=(id,x)=>R(id,x,{first:NEW,top:'test more if it moves'});
 days.push(D('je_tts3_t1','Test · Day 1','Max test · clean, bench, deadlift',[H('A · power clean'),...T('power_clean','1x3@60 1x2@72 1x1@82 3x1@90 1x1@96 1x1@100'),
   H('B · bench'),...T('bench','1x3@60 1x2@72 1x1@82 3x1@90 1x1@96 1x1@100'),H('C · deadlift'),...T('deadlift','1x3@60 1x2@72 3x1@82 1x1@90 1x1@96 1x1@100')],'~2 h'));
 days.push(D('je_tts3_t2','Test · Day 2','Max test · squat, press',[H('A · squat'),...T('backsquat','1x3@60 1x2@72 1x1@82 2x1@90 1x1@96 1x1@100'),
   H('B · overhead press'),...T('ohp','1x3@60 1x2@72 1x1@82 2x1@90 1x1@96 1x1@100')],'~90 min'));
 const ALL='1x3@60 1x2@72 1x1@82 1x1@90 1x1@96 1x1@100';
 days.push(D('je_tts3_t3','Test · Day 3','Max test · all five lifts',[H('A · power clean'),...T('power_clean',ALL),H('B · squat'),...T('backsquat',ALL),H('C · bench'),...T('bench',ALL),
   H('D · deadlift'),...T('deadlift',ALL),H('E · overhead press'),...T('ohp',ALL)],'~2.5 h'));
 P({id:'je_tts3',n:'Tillbaka till Styrketräning Del III',sub:'Strength · 6 weeks · 4 days · plus a 3-day test',type:['Powerlifting','Full body','Percentage-based'],days,
   note:'Needs a 1RM in power clean, squat, bench, deadlift and overhead press. Rest 1–3 days after week 6 before testing.'},
 `<h2 id="infoTitle">Tillbaka till Styrketräning Del III</h2>
  <p class="by">Josef Eriksson</p>
  <span class="pill2">6 weeks + test</span><span class="pill2">4 days a week</span><span class="pill2">Five main lifts</span>
  <h4>What it is</h4>
  <p>Part three of a back-to-strength series. Each day has one main lift: power clean and deadlift, bench, squat, overhead press. Each main lift is a short ramp from 60 % into work sets, with the last set to max reps. Then come accessories by reps in reserve. Loads rise and reps fall over six weeks. A three-day max test follows.</p>
  <h4>How to run it</h4>
  <ul><li><b>Use a fresh, clean max.</b> No shallow bouncing squats, no butt-off-the-bench presses, no rounded deadlifts. If a lift was ugly, take weight off or retest.</li>
   <li><b>Warm up</b> with a few rising sets before the first listed 60 % set: maybe three for the press, eight for the squat.</li>
   <li><b>Accessories</b> are set by RIR, the reps you leave in the tank. With a range like 0–6, one set can be fairly easy and the next all-out.</li>
   <li><b>Rest</b> 3–5 min on heavy main sets, 1–3 min elsewhere.</li>
   <li><b>Deficit deadlifts</b> stand on a 6 cm plate. Stiff-legged and deficit pulls run off your deadlift max.</li>
   <li><b>Testing.</b> Keep the week 6 max-rep sets strict, estimate new maxes from them and save them before the test days. Rest 1–2 days before test day 2 and 2–3 days before day 3.</li></ul>`);
}

/* =====================================================================
   9. Vägen till 200 kg knäböj (VT2KIK)
   ===================================================================== */
{const VT=[
[1,1,0,'SQ|3-5|10x5@50;SL|3-5|3x10@30;SPL||3x6|u;SLR||4x6|l;PLK|1|3xM'],
[1,2,0,'SQ|3-5|10x3@55;SL|3-5|3x12@30;SPL||3x8|u;SLR||4x6|l;PLK|1|3xM;BCR||3x20-40'],
[1,3,0,'SQ|3-5|10x3@60;SL|3-5|3x15@30;SPL||3x10|u;SLR||4x6|l;PLK|1|3xM;BCR||3x20-40'],
[2,1,0,'SQ|3-5|10x8@50;DEF|3-5|3x8@40;L6||3x10|u;SLR||4x10|l;PLK|1|3xM'],
[2,2,0,'SQ|3-5|10x6@55;DEF|3-5|3x10@40;L6||3x8|u;SLR||4x10|l;PLK|1|2xM;LR||3xM'],
[2,3,0,'SQ|3-5|10x4@60;DEF|3-5|3x12@40;L6||3x10|u;SLR||4x6|l;PLK|1|2xM;BCR||3x20-40'],
[3,1,0,'SQ|3-5|3x10@40,3x10@45;DL|3-5|2x8@60,2x8@65;HT||3x10-15;HER||4x10;BE||3xM;PLK|1|2xM;SPK||2xM'],
[3,2,0,'BOX|1|10x3@40;DL|1|10x1@60;L10||3x10|u;GM||3x10;SLR||3xM;LR||4xM'],
[3,3,1,'SQ|3-5|1x5@60,6x5@74;SL|3-5|2x8@50,2x8@55;HT||3x10-15;HER||3x12-20;BE||3xM;PLK|1|3xM;SPK||3xM'],
[4,1,0,'SQ|3-5|3x12@40,3x12@45;DL|3-5|2x6@65,2x6@70;HT||3x10-15;HER||4x12-20;BE||3xM;PLK|1|3xM;SPK||3xM'],
[4,2,0,'BOX|1|10x3@45;DL|1|10x1@65;L10||3x10|u;GM||3x10;SLR||3xM;LR||4xM'],
[4,3,1,'SQ|3-5|1x4@60,1x4@70,6x4@78;SL|3-5|2x10@50,2x10@55;HT||3x15-20;GM||3x15;BLC||3x20-30;PLK|1|3xM;BCR||3x20-40'],
[5,1,0,'SQ|3-5|3x12@45,3x12@50;DL|3-5|1x6@60,2x6@70,2x6@75;HT||3x10-15;BLC||4x20-40;BE||3xM;PLK|1|3xM;SPK||3xM'],
[5,2,0,'BOX|1|10x3@50;DL|1|1x1@60,8x1@70;LUN||3x10|l;GM||3x15;SLR||3xM;LR||4xM'],
[5,3,1,'SQ|3-5|1x5@60,1x3@70,1x3@78,6x3@85;SL|3-5|2x12@50,2x12@55;HT||3x15-20;GM||3x15;BLC||3x20-30;PLK|1|3xM;BCR||3x20-40'],
[6,1,0,'SQ|3-5|3x8@55,3x8@60;DL|3-5|3x8@60,3x8@65;SPL||4x8-12|l;BLC||4x20-40;BE||3xM;PLK|1|3xM;SPK||3xM'],
[6,2,0,'BOX|1|10x3@45;DL|1|10x1@60;SPL||4x8-12|l;GM||4x15;HER||3xM;LR|1|5xM'],
[6,3,1,'SQ|3-5|1x4@60,1x4@72,6x4@83;SL|3-5|2x12@50,2x12@55;SPL||4x8-12|l;GM||4x15;BLC||3x20-30;BCR||3x20-40;PLK|1|3xM'],
[7,1,0,'SQ|3-5|3x8@60,3x8@65;DL|3-5|1x6@60,3x6@65,3x6@70;SPL||4x8-12|l;BLC||4x20-40;BE||3xM;PLK|1|3xM;SPK||3xM'],
[7,2,0,'BOX|1|10x3@50;DL|1|10x1@65;SPL||4x8-12|l;HER||3xM;BE||3xM;LR|1|5xM'],
[7,3,2,'SQ|3-5|1x5@60,1x3@72,1x3@82,6x3@90;SL|3-5|2x12@50,2x12@55;SPL||4x8-12|l;GM||4x15;BLC||3x20-30;BCR||3x20-40;PLK|1|3xM'],
[8,1,3,'SQ|3-5|1x5@60,6x3@70;DL|3-5|1x6@60,3x6@65,3x6@70;SPL||2x8-12|l;BLC||2x20-40;BE||2xM;PLK|1|2xM;SPK||2xM'],
[8,2,3,'BOX|1|1x5@60,1x2@72,5x1@80;DL|1|1x1@60,6x1@70;SPL||2x8-12|l;HER||2xM;BE||2xM;LR|1|2xM'],
[8,3,3,'SQ||1x5@60,1x2@72,1x1@82,1x1@90,1x1@97,1x1@102.5|h;DL||1x5@60,1x2@72,1x1@82,1x1@90,1x1@97,1x1@102.5|h'],
[9,1,0,'SQH|3-5|6x10@50;DEF|3-5|6x10@40;LUN||3x6-10|l;BLC||3x20-40;PLK|1|3xM'],
[9,2,0,'BOX|1|10x3@40;DL|1|8x1@60;LUN||3x8-12|l;GM||3x15;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[9,3,1,'SQ|3-5|1x5@60,1x5@70,1x5@74,1x5@77,1x5@80,2x5@70;SL|3-5|1x10@40,1x10@44,1x10@47,1x10@50,2x10@40;LUN||4x10-12|l;BE||3xM|w;LR||3xM;BCR||3xM;SPK||3xM'],
[10,1,0,'SQH|3-5|6x10@55;DEF|3-5|6x10@45;LUN||4x6-10|l;BLC||3x20-40;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[10,2,0,'BOX|1|10x3@45;DL|1|10x1@65;LUN||4x8-12|l;GM||4x8-12;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[10,3,1,'SQ|3-5|1x4@60,1x4@75,1x4@79,1x4@82,1x4@85,2x4@75;SL|3-5|1x8@45,1x8@49,1x8@52,1x8@55,2x8@45;LUN||4x10-12|l;BE||3xM|w;LR||3xM;BCR||3xM;SPK||3xM'],
[11,1,0,'SQH|3-5|6x10@60;DEF|3-5|6x10@50;LUN||5x6-10|l;BLC||4x20-40;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[11,2,0,'BOX|1|10x3@50;DL|1|10x1@70;LUN||5x6-10|l;GM||5x10;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[11,3,1,'SQ|3-5|1x5@60,1x3@72,1x3@80,1x3@84,1x3@87,1x3@90,2x3@80;SL|3-5|1x10@45,1x10@49,1x10@52,1x10@55,2x10@45;LUN||4x10-12|l;BE||4xM|w;BCR||4xM;SPK||3xM'],
[12,1,0,'SQH|3-5|6x12@60;DL|3-5|1x5@60,1x5@70,1x5@74,1x5@77,1x5@80,2x5@70;HT||4x8-15;BLC||4x20-40;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[12,2,0,'BOX|1|10x3@50;DL|1|10x1@70;LUN||5x8-12|l;GM||5x10-15;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[12,3,1,'SQ|3-5|1x5@60,1x5@70,1x5@75,1x5@80,1x5@84,1x5@87,2x5@75;SL|3-5|1x12@40,1x12@44,1x12@47,1x12@50,2x12@40;HT||4x8-15;BE||4xM|w;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[13,1,0,'SQH|3-5|6x10@63;DL|3-5|1x4@60,1x4@75,1x4@79,1x4@82,1x4@85,2x4@75;HT||4x8-15;BLC||4x20-40;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[13,2,0,'BOX|1|10x3@55;DL|1|10x1@75;LUN||5x8-12|l;GM||5x10-15;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[13,3,1,'SQ|3-5|1x4@60,1x4@72,1x4@80,1x4@84,1x4@87,1x4@90,1x4@80;SL|3-5|1x10@45,1x10@48,1x10@52,1x10@55,2x10@50;HT||4x8-15;BE||4xM|w;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[14,1,0,'SQH|3-5|1x8@60,6x8@66;DL|3-5|1x5@60,1x3@72,1x3@80,1x3@84,1x3@87,1x3@90,2x3@80;SPL||4x8-12|l;BLC||4x20-40;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[14,2,0,'BOX|1|8x3@60;DL|1-2|1x1@60,1x1@72,8x1@80;LUN||5x8-12|l;GM||5x10-15;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[14,3,1,'SQ|3-5|1x5@60,1x3@72,1x3@80,1x3@85,1x3@88,1x3@91,1x3@95,1x3@85;SL|3-5|1x8@50,1x8@54,1x8@57,1x8@60,2x8@50;HT||4x8-15;BE||4xM|w;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[15,1,2,'SQ|3-5|6x3@60;DL|3-5|6x3@60;HT||2x8-15|l;BLC||2x20-40;>LR||1xM;BCR||1xM;PLK|1|1xM'],
[15,2,0,'BOX|3-5|1x3@60,6x1@70;DL|3-5|1x3@60,3x3@70;HT||1x8-15|l;BLC||1x20-40;>LR||1xM;BCR||1xM;PLK|1|1xM'],
[15,3,3,'SQ||1x5@60,1x2@72,1x1@82,1x1@90,1x1@97,1x1@102.5|h;DL||1x5@60,1x2@72,1x1@82,1x1@90,1x1@97,1x1@102.5|h'],
[16,1,5,'SQ|3-5|6x10@60;DL|3-8|1x5@60,1x5@65,1x5@69,1x5@72,1x5@75,1x5@60;LUN||5x10|l;GM||5x12;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[16,2,0,'BOX|1|10x3@50;DL|1|10x1@60;HT||5x8-15|l;BLC||3x20-40;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[16,3,1,'SQ|3-8|1x5@60,1x5@70,1x5@75,1x5@79,1x5@82,1x5@75,1x5@70;SL|3-5|1x8@40,1x8@48,1x8@56,1x8@60,2x8@40;LUN||5x8|l;GM||5x8;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[17,1,5,'SQ|3-5|6x8@65;DL|3-5|1x4@65,1x4@71,1x4@76,1x4@80,2x4@65;LUN||5x5|l;GM||5x8;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[17,2,0,'BOX|1|10x3@55;DL|1|10x1@70;HT||5x8-15|l;SPL||5x8;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[17,3,1,'SQ|3-8|1x4@60,1x4@75,1x4@79,1x4@82,1x4@85,1x4@80,1x4@75;SL|3-5|1x8@45,1x8@49,1x8@52,1x8@55,2x8@45;LUN||5x10-12|l;GM||5x8;LR||3xM;BCR||3xM;SPK||3xM'],
[18,1,5,'SQ|3-5|1x8@60,6x8@70;DL|3-8|1x5@60,1x3@70,1x3@75,1x3@78,1x3@82,1x3@85,1x3@75;LUN||5x8|l;GM||5x10;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[18,2,2,'BOX|1|8x3@60;DL|1|1x3@60,10x1@70;HT||5x8-15;SPL||5x6;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[18,3,1,'SQ|3-8|1x5@60,1x3@72,1x3@80,1x3@85,1x3@88,1x3@91,1x3@85,1x3@80;SL|3-5|1x10@40,1x10@46,1x10@51,1x10@55,1x10@58,1x10@40;LUN||4x10-12|l;GM||4x15;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[19,1,5,'SQ|3-5|1x6@60,6x6@75;DL|3-8|1x5@60,1x2@75,1x2@80,1x2@84,1x2@87,1x2@90,1x2@80;LUN||3x8|l;GM||3x10;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[19,2,0,'BOX|1-2|1x3@60,6x3@65;DL|1-2|1x3@60,6x1@75;HT||3x8-15;SPL||3x6;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[19,3,4,'SQ|3-8|1x5@60,1x3@75,1x2@85,1x2@90,1x2@94,1x2@96,1x2@90,1x2@85;SL|3-5|1x8@40,1x8@48,1x8@55,1x8@60,1x8@55,1x8@50;LUN||3x10-12|l;GM||3x15;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[20,1,3,'SQ|3-5|2x5@60,1x3@72,5x1@80,2x6@60;DL|3-8|2x5@60,1x3@72,3x1@80,2x6@60;LUN||5x5|l;GM||3x10;>LR||3xM;BCR||3xM;PLK|1|3xM'],
[20,2,3,'BOX|1-2|8x3@50;DL|1-2|8x1@60;HT||3x8-15;SPL||2x6|l;>LR||1xM;BCR||1xM;PLK|1|1xM'],
[20,3,4,'SQ|3-8|1x5@60,1x3@72,1x2@80,1x1@87,1x1@90,1x1@92,2x1@87;SL|3-5|4x8@40;LUN||2x8|l;GM||2x15;>LR||2xM;BCR||2xM;PLK|1|2xM'],
[21,1,3,'SQ|3-5|2x3@60,5x1@72;DL|3-8|2x5@60,5x1@72;LUN||2x6|l;>LR||1xM;BCR||1xM;PLK|1|1xM'],
[21,2,3,'BOX|3|5x1@60;DL|3|5x1@60'],
[21,3,3,'SQ|3-8|2x3@60,1x2@72,1x1@80,1x1@87,1x1@92,1x1@96,1x1@102.5|h;DL|3-8|2x3@60,1x2@72,1x1@80,1x1@87,1x1@92,1x1@96,1x1@102.5|h']];
 /* code: [key, name for the group, note, max it runs off (no p)] */
 const X={SQ:['backsquat','squat'],SQH:['backsquat','high-bar squat','high bar'],BOX:['box_squat','box squat','high bar, sit back onto the box','squat'],
   DL:['deadlift','deadlift'],SL:['sldl','stiff-legged deadlift',null,'deadlift'],DEF:['deficit_deadlift','deficit deadlift','stand on a 6 cm plate','deadlift'],
   SPL:['split_squat'],SLR:['side_leg_raise'],PLK:['plank'],SPK:['side_plank'],BCR:['cable_crunch',0,'with a band'],L6:['forward_lunge',0,'step onto a 6 cm platform'],
   L10:['forward_lunge',0,'step onto a 10 cm platform'],LUN:['forward_lunge'],LR:['legraise',0,'hanging or lying'],HT:['hip_thrust'],HER:['hip_ext_rotation'],
   BE:['backext',0,'or reverse leg raises'],GM:['good_morning'],BLC:['leg_curl',0,'with a long band']};
 const NT={u:'reps per leg, no load',l:'reps per leg',w:'with or without weight',h:'go heavier if it moves'};
 const BELT=['No belt or sleeves','Belt on squat only','Belt, no sleeves','Belt and sleeves allowed','Belt and sleeves on squat','Belt on deadlift only'];
 const LET='ABCDEFGH';
 const days=VT.map(([w,d,b,s])=>{const items=[];let L=0,inAcc=false;
  s.split(';').forEach(t=>{const ss=t[0]==='>';const [code,rest,rows,note]=(ss?t.slice(1):t).split('|');const x=X[code];
   if(!x)throw new Error('vt '+code);
   const main=['SQ','SQH','BOX','DL','SL','DEF'].includes(code);
   if(main){items.push(H(`${LET[L++]} · ${x[1]}${rest?` · ${DASH(rest)} min rest`:''}`));inAcc=false;}
   else if(ss){items.push(H(`${LET[L++]} · superset · 1–5 min rest`));inAcc=true;}
   else if(!inAcc){items.push(H(`${LET[L++]} · accessories · 1–5 min rest`));inAcc=true;}
   rows.split(',').forEach(r=>{const m=r.match(/^(\d+)x([^@]+)(?:@([\d.]+))?$/);let rep=m[2];if(rep==='M'&&(code==='PLK'||code==='SPK'))rep='T';
    const nts=[x[2],note&&NT[note]].filter(Boolean);let p=m[3]!=null?+m[3]:null;
    if(p!=null&&x[3]){nts.unshift(`${p} % of your ${x[3]} 1RM`);p=null;}
    items.push(I(x[0],st(m[1],rep),p,nts.join(' · ')||null));});});
  const test=d===3&&(w===8||w===15||w===21);
  const n=test?'Max test':w<=2?['Intro · volume','Intro · volume','Intro · heavier'][d-1]:['Volume','Speed','Heavy'][d-1];
  return D(`je_vt200_w${w}d${d}`,`Week ${w} · Day ${d}`,n,items,BELT[b],!(w===21&&d===2));});
 P({id:'je_vt200',n:'Vägen till 200 kg knäböj',sub:'Squat · 21 weeks · 3 lower-body days',type:['Powerlifting','Squat','Percentage-based'],days,
   note:'Three periods with a max test in weeks 8, 15 and 21. Save your new squat and deadlift maxes after each test: the next period runs off them.'},
 `<h2 id="infoTitle">Vägen till 200 kg knäböj</h2>
  <p class="by">Josef Eriksson · written for Viktor Söder's squat project</p>
  <span class="pill2">21 weeks</span><span class="pill2">3 lower-body days</span><span class="pill2">Squat + deadlift %</span>
  <h4>What it is</h4>
  <p>The program Viktor Söder ran from a 150 kg to a 200 kg squat, alongside 70 others. On average they added about 21 % to the squat and 15 % to the deadlift. It is three lower-body sessions a week for 21 weeks, in three periods. Deadlift is the main supporting lift.</p>
  <h4>The periods</h4>
  <ul><li><b>Weeks 1–2 · intro.</b> Light squats for many sets, a deadlift variant and plenty of single-leg work to find your balance.</li>
   <li><b>Weeks 3–8 · build.</b> A volume day, a speed day (box squat triples and deadlift singles on 1 min rest) and a heavy day. Week 8 is lighter and ends in a max test.</li>
   <li><b>Weeks 9–15 · base.</b> No overreaching: the same structure session after session, with high-bar volume. Max test in week 15.</li>
   <li><b>Weeks 16–21 · finale.</b> Three normal weeks, then a three-week peak with less volume, heavier weights, more belted competition-style work and a final max.</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Technique first, always.</b> On volume days, take weight off rather than let the last reps break down. On heavy days, slow down to feel and fix a caving knee or a hip shift.</li>
   <li><b>Speed days</b> are light but not easy: short rest, full focus and maximum intent on every rep.</li>
   <li><b>Box squat</b> high bar, a bit wider than normal, sit back onto the box for a moment, then drive the hips forward. The % is of your squat max; a box squat is about 50 % lighter in effort terms than it looks.</li>
   <li><b>Gear</b> follows each session's tag: belt and sleeves come in only as the program gets heavier.</li>
   <li><b>Equipment:</b> rack, bar, plates, a box at legal depth, a bench, a back-extension bench (or reverse leg raises), mini bands and long bands.</li>
   <li><b>Accessories</b> rest 1–5 min. Lunges and split squats are reps per leg.</li></ul>`);
}

/* =====================================================================
   10. Viktors väg till +200 kg marklyft
   ===================================================================== */
{const C={BOX:'box_squat',GM:'good_morning',LC:'leg_curl',BE:'backext',CR:'cable_crunch',PL:'plank',LUN:'forward_lunge',HT:'hip_thrust',SB:'side_bend',TR:'torso_rotation',LR:'legraise',DL:'deadlift'};
 const XN={GM:'safety squat bar or regular bar',LUN:'to an 8–12 cm platform · SSB or regular bar',BOX:'safety squat bar or regular bar, high bar'};
 const S=[
  'BOX 5x8|1–3 RIR|2×12, 2×10, 1×8;GM 3x12|2–5 RIR|1×12;LC 2x15|2–5 RIR|1×15;BE 3xM|80–90 %;CR 3xM|80–90 %;PL 3xT|80–90 %',
  'BOX 5x5|1–3 RIR|2×12, 2×10, 1×8;LUN 3x12|3–5 RIR|1×12;HT 2x15|3–5 RIR|1×15;BE 3xM|80–90 %;CR 3xM|80–90 %;PL 3xT|80–90 %',
  'BOX 5x10|1–3 RIR|2×12, 2×10, 1×8;GM 4x10|3–5 RIR|1×10;LUN 3x8|3–5 RIR|1×8;BE 3xM|80–90 %;CR 4xM|80–90 %;PL 4xT|80–90 %',
  'BOX 5x5|1–3 RIR|2×12, 2×10, 1×8;GM 3x10|2–5 RIR|1×10;LC 3x15|2–5 RIR|1×15;BE 4xM|80–100 %;CR 5xM|80–100 %;PL 4xT|80–100 %',
  'BOX 8x3|explosive · load from session 4, set 5|2×12, 1×10, 1×5 fast;LUN 3x10|3–5 RIR|1×10;HT 3x15|3–5 RIR|1×15;BE 4xM|80–100 %;CR 5xM|80–100 %;PL 4xT|80–100 %',
  'BOX 5x8|1–3 RIR|2×12, 2×10, 1×8;GM 3x10|3–5 RIR|1×10;LUN 3x8|3–5 RIR|1×8;BE 4xM|80–90 %;CR 4xM|80–90 %;PL 4xT|80–90 %',
  'BOX 5x5|1–3 RIR|2×12, 2×10, 1×8;GM 4x10|2–5 RIR|1×10;LUN 4x10|2–5 RIR|1×10;LC 4x15|2–5 RIR|1×15;BE 4xM|80–100 %;CR 5xM|80–100 %;PL 5xT|80–100 %',
  'BOX 8x3|explosive · load from session 7, set 5|2×12, 1×10, 1×5 fast;LUN 4x10|3–5 RIR|1×10;HT 4x15|3–5 RIR|1×15;BE 5xM|80–100 %;SB 5xM|80–100 %;PL 5xT|80–100 %',
  'BOX 5x8|1–3 RIR|2×12, 2×10, 1×8;GM 4x10|3–5 RIR|1×10;LUN 4x8|3–5 RIR|1×8;BE 5x8|3–5 RIR;CR 5xM|80–90 %;PL 5xT|80–90 %',
  'DL 5x3|3–5 RIR|3×10, 2×8, 1×8, 1×5;BOX 5x5|1–3 RIR|2×12, 2×10, 1×8;HT 4x12|1–3 RIR|1×12;LC 4x15|2–5 RIR|1×15;TR 5xM|80–100 %;LR 5xM|80–100 %;BE 5xM|80–100 %',
  'DL 8x3|explosive · load from session 10, set 5|3×10, 3×8;BOX 8x3|load from session 10, set 5|2×12, 2×10, 1×5;GM 4x10|2–3 RIR|1×10;LUN 4x8|3–5 RIR|1×8;TR 5xM|80–100 %;LR 5xM|80–100 %;BE 5xM|80–100 %',
  'DL 5x5|1–3 RIR|3×10, 2×8, 1×8, 1×5;GM 4x10|2–3 RIR|1×10;LUN 4x8|2–3 RIR|1×8;BE 3x8|3–5 RIR;CR 5xM|80–90 %;PL 5xT|80–90 %',
  'DL 8x3|1–3 RIR|3×10, 2×8, 1×8, 1×5;BOX 5x5|1–3 RIR|2×12, 2×10, 1×8;HT 4x12|1–3 RIR|1×12;LC 4x15|2–5 RIR|1×15;TR 5xM|80–100 %;LR 5xM|80–100 %;BE 5xM|80–100 %',
  'DL 8x3|explosive · load from session 13, set 5|3×10, 3×8;BOX 8x3|load from session 13, set 5|2×12, 2×10, 1×5;GM 4x10|3–5 RIR|1×10;LUN 4x8|3–5 RIR|1×8;SB 5xM|80–100 %;LR 5xM|80–100 %;BE 5xM|80–100 %',
  'DL 8x5|1–4 RIR|3×10, 2×8, 1×8, 1×5;GM 4x10|3–5 RIR|1×10;LUN 4x8|3–5 RIR|1×8;BE 3x8|3–5 RIR;CR 5xM|80–90 %;PL 5xT|80–90 %',
  'DL 5x8|5 RIR|3×10, 2×8, 1×8;BOX 5x5|5 RIR|2×12, 2×10, 1×8;HT 4x12|5 RIR|1×12;SB 3xM|80–100 %;LR 3xM|80–100 %;BE 3xM|80–100 %',
  'DL 8x3|explosive · load from session 16, set 5|3×10, 3×8;BOX 8x3|load from session 16, set 5|2×12, 2×10, 1×5;GM 4x10|5 RIR|1×10;LUN 4x8|5 RIR;SB 3xM|80–100 %;LR 3xM|80–100 %;BE 3xM|80–100 %',
  'DL 5x5|5 RIR|3×10, 2×8, 1×8;GM 4x10|5 RIR|1×10;LUN 4x8|5 RIR|1×8;BE 3x8|3–5 RIR;CR 3xM|80–90 %;PL 3xT|80–90 %',
  'DL 8x8|1–3 RIR|3×10, 2×8, 1×8;BOX 5x5|1–3 RIR|2×12, 2×10, 1×8;HT 4x12|1–3 RIR|1×12;LC 4x15|2–5 RIR|1×15;TR 6xM|80–100 %;LR 6xM|80–100 %;BE 5xM|80–100 %',
  'DL 8x3|explosive · load from session 19, set 5|3×10, 3×8;BOX 8x3|load from session 19, set 5|2×12, 2×10, 1×5;GM 4x10|1–3 RIR|1×10;LUN 4x8|3–5 RIR|1×8;SB 6xM|80–100 %;LR 6xM|80–100 %;BE 5xM|80–100 %',
  'DL 8x3|1–4 RIR|3×10, 2×8, 1×8, 1×5;GM 4x10|3–5 RIR|1×10;LUN 4x8|3–5 RIR|1×8;BE 3x8|3–5 RIR;CR 6xM|80–90 %;PL 6xT|80–90 %',
  'DL 5x3|1–3 RIR|3×10, 2×8, 1×8, 1×5;BOX 5x5|1–3 RIR|2×12, 2×10, 1×8;HT 4x12|1–3 RIR|1×12;LC 4x15|2–5 RIR|1×15;TR 6xM|80–100 %;LR 6xM|80–100 %;BE 5xM|80–100 %',
  'DL 8x3|explosive · load from session 22, set 5|3×10, 3×8;BOX 8x3|load from session 22, set 5|2×12, 2×10, 1×5;GM 4x10|1–3 RIR|1×10;LUN 4x8|3–5 RIR|1×8;SB 6xM|80–100 %;LR 6xM|80–100 %;BE 5xM|80–100 %',
  'DL 5x1|1–2 RIR|3×10, 2×8, 1×5, 1×3;GM 4x10|1–3 RIR|1×10;LUN 4x8|1–3 RIR|1×8;BE 3x8|3–5 RIR;CR 6xM|80–90 %;PL 6xT|80–90 %',
  'DL 5x5|light, warm-up weight|3×10, 2×8, 1×8;BOX 5x5|1–3 RIR|2×12, 2×10, 1×8;HT 4x12|1–3 RIR|1×12;LC 4x15|2–5 RIR|1×15;TR 6xM|80–100 %;LR 6xM|80–100 %;BE 5xM|80–100 %',
  'DL 8x3|explosive · load from session 25, set 5|3×10, 3×8;BOX 8x3|load from session 25, set 5|2×12, 2×10, 1×5;GM 4x10|1–3 RIR|1×10;LUN 4x8|3–5 RIR|1×8;SB 6xM|80–100 %;LR 6xM|80–100 %;BE 5xM|80–100 %',
  'DL 3x1|1–2 RIR|3×10, 2×8, 1×5, 1×3;GM 4x10|1–3 RIR|1×10;LUN 4x8|1–3 RIR|1×8;BE 3x8|3–5 RIR;CR 3xM|80–90 %;PL 3xT|80–90 %',
  'DL 3x1|4–5 RIR|3×12, 2×10, 1×5, 1×3;GM 2x12|5 RIR|1×12;HT 2x10|5 RIR|1×10;LC 3x15|3 RIR;TR 2xM|80–100 %;LR 2xM|80–100 %',
  'DL 3x1|load from session 28|3×10, 2×8, 1×3',
  'DL 3x1|climb in singles toward a new max|3×10, 2×8, 1×5, 1×3'];
 const BOXH=['4–6 cm above parallel','2–4 cm above parallel','0–2 cm above parallel'];
 const days=S.map((s,i)=>{const n=i+1,w=Math.ceil(n/3),d=(n-1)%3+1,items=[];let L=0,acc=false;
  s.split(';').forEach((t,j)=>{const [ex,note,wu]=t.split('|');const m=ex.match(/^(\w+) (\d+)x(\w+)$/);const code=m[1];
   const big=code==='DL'||(code==='BOX'&&j<2);
   if(big){items.push(H(`${'AB'[L++]} · ${code==='DL'?'deadlift':'box squat'} · 3–5 min rest`));acc=false;}
   else if(!acc){items.push(H(`${'ABC'[L++]} · accessories · 1–3 min rest`));acc=true;}
   const nts=[];if(note)nts.push(/%$/.test(note)?`${note} of max ${m[3]==='T'?'time':'reps'}`:note);
   if(code==='BOX'&&w<=3)nts.push(BOXH[w-1]);if(XN[code])nts.push(XN[code]);if(wu)nts.push('warm-up '+wu);
   items.push(I(C[code],st(m[2],m[3]),null,nts.join(' · ')));});
  const nm=n===30?'Max test':n===29?'Primer':/explosive/.test(s)?'Speed':w<=3?'Box squat · strength':'Deadlift · strength';
  return D(`je_mark200_s${n}`,`Week ${w} · Day ${d}`,nm,items,n>=29?'~40 min':'~75 min',n!==29);});
 P({id:'je_mark200',n:'Viktors väg till +200 kg marklyft',sub:'Deadlift · 10 weeks · 3 days · reps in reserve',type:['Powerlifting','Deadlift','Autoregulated'],days,
   note:'Weeks 1–3 build the deadlift without deadlifting. Loads are set by reps in reserve: log every session, later sessions reuse earlier weights.'},
 `<h2 id="infoTitle">Viktors väg till +200 kg marklyft</h2>
  <p class="by">Josef Eriksson · written for Viktor Söder</p>
  <span class="pill2">10 weeks</span><span class="pill2">3 days a week</span><span class="pill2">Reps in reserve</span>
  <h4>What it is</h4>
  <p>Viktor Söder went from a 155 kg deadlift to 210 kg in twelve weeks, then 220 kg, after breaking his forearm in week one. For six weeks he could not hold a bar, so he trained everything else that pulls: box squats and good mornings with a safety squat bar, hip thrusts, leg curls and a lot of ab work. His first deadlift after the cast came off was 185 kg. This is that program, adjusted for someone with two working arms.</p>
  <h4>How to run it</h4>
  <ul><li><b>Three days a week</b> with a day off between sessions and two after the third. Keep other training easy on the legs and lower back.</li>
   <li><b>Weeks 1–3</b> are box squat–based, lowering the box from 4–6 cm above parallel to 0–2 cm. Deadlifts start in week 4.</li>
   <li><b>RIR</b> (reps in reserve) sets the load: 1–3 RIR means stop with one to three reps left. The weight can change between sets to stay in range.</li>
   <li><b>Max reps or max time at 80–100 %</b> means that share of what you could do all-out.</li>
   <li><b>"Load from session X, set 5"</b> reuses that weight for fast triples, so log your sessions.</li>
   <li><b>Warm-ups</b> are listed in each note: light enough that you could do about three times the reps.</li>
   <li><b>Before every session:</b> 3 × 20 hip thrusts (light or no weight), 3 × 10 good mornings and 3 × 10 lunges to an 8–12 cm platform.</li>
   <li><b>Fix your weak links.</b> Abs and glutes were Viktor's; if yours are hamstrings, shift some of the ab work there.</li></ul>`);
}

/* =====================================================================
   11. JE Träningsupplägg (rep-cycle bench volume, from Josef's whiteboard)
   ===================================================================== */
{const EXS=[['bench','30 min block'],['jm_press'],['ohp','any shoulder press'],['seal_row'],['cd_lat_pulldown'],['facepull'],['cd_tri_pushdown'],['bbcurl']];
 const mk=(r,nt)=>[H('Warm-up'),{n:'Warm-up',s:'30 min',nt:'general warm-up, then ramp up on the bar'},H('A · bench'),I('bench',`5 × ${r}`,null,[EXS[0][1],nt].filter(Boolean).join(' · ')),
   H('B · accessories · about 10 min each'),...EXS.slice(1).map(e=>I(e[0],`5 × ${r}`,null,[e[1],nt].filter(Boolean).join(' · ')||null))];
 const LAST='last rep of the last set should be hard';
 const days=[8,10,12,15,20].map((r,i)=>D(`je_upplagg_s${i+1}`,`Cycle · Session ${i+1}`,`Sets of ${r}`,mk(r,LAST),'~2 h 10 min'));
 days.push(D('je_upplagg_s6','Cycle · Session 6','Light session',mk(8,'light: about 60–80 % of your recent working weights'),'~1 h 30 min',false));
 P({id:'je_upplagg',n:'JE Träningsupplägg',sub:'Bench volume · 6-session rep cycle · 40 sets',type:['Hypertrophy','Bench','Gym'],days,
   note:'Run the cycle 8 → 10 → 12 → 15 → 20 reps, a light session, then start over at 8 with heavier weights than last time.'},
 `<h2 id="infoTitle">JE Träningsupplägg</h2>
  <p class="by">Josef Eriksson · from an Instagram whiteboard</p>
  <span class="pill2">8 exercises × 5 sets</span><span class="pill2">8 → 20 reps</span><span class="pill2">About 2 hours</span>
  <h4>What it is</h4>
  <p>A simple upper-body volume plan: 30 minutes of warm-up, 30 minutes of bench, then about 10 minutes each for JM presses, shoulder presses, seal rows, lat pulldowns, face pulls, pushdowns and curls. That is 40 sets a session.</p>
  <h4>How to run it</h4>
  <ul><li><b>Reps climb each session:</b> 8, 10, 12, 15, 20 on every exercise. That is 320 reps in total at 8 and 800 at 20.</li>
   <li><b>Choose weights</b> so at least the last rep of the last set is hard.</li>
   <li><b>Then cycle back to 8</b> and beat the average weight per exercise from the previous 8-rep round.</li>
   <li><b>One light session per cycle,</b> six sessions in all. At about 2–2.5 sessions a week, four cycles take roughly 24 weeks. Add a 2–3 week peak before testing.</li></ul>
  <p>Part of the source is covered by text. The light session here is a best reading of it: the same exercises for sets of 8 at about 60–80 % of your working weights.</p>`);
}
})();
