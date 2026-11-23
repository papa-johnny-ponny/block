/* BLOCK. program pack: strength classics.
   Jamal Browner (Deadlift Specialization Vol. 2), Andy Bolton & Pavel Tsatsouline
   (Deadlift Dynamite), Street Lifting (Zero level) and Anatoly (APS).
   Structure only; notes are our own words. */
(function(){
const R=window.BLOCK_REG;if(!R)return;

/* ---------- exercises ---------- */
R.ex({
  pause_squat:{n:'Pause Squat',c:'weighted'},
  pause_bench:{n:'Paused Bench Press',c:'weighted'},
  deficit_deadlift:{n:'Deficit Deadlift',c:'weighted'},
  paused_deadlift:{n:'Paused Deadlift',c:'weighted'},
  leg_press:{n:'Leg Press',c:'weighted'},
  db_bench:{n:'DB Bench Press',c:'weighted'},
  side_plank:{n:'Side Plank',c:'bodyweight'},
  straight_arm_pulldown:{n:'Straight-Arm Pulldown',c:'weighted'},
  cable_crunch:{n:'Cable Crunch',c:'weighted'},
  mcgill_big3:{n:'McGill Big 3',c:'bodyweight'},
  dead_bug:{n:'Dead Bug',c:'bodyweight'},
  chest_supported_row:{n:'Chest-Supported Row',c:'weighted'},
  seal_row:{n:'Seal Row',c:'weighted'},
  plank:{n:'Plank',c:'bodyweight'},
  bb_glute_bridge:{n:'Barbell Glute Bridge',c:'weighted'},
  glute_bridge:{n:'Glute Bridge',c:'bodyweight'},
  lu_raise:{n:'Lu Raise',c:'weighted'},
  pallof_press:{n:'Pallof Press',c:'rotation'},
  ytw_raise:{n:'Shoulder Y-T-W Raise',c:'weighted'},
  db_side_bend:{n:'DB Side Bend',c:'weighted'},
  cable_row:{n:'Seated Cable Row',c:'weighted'},
  bb_shrug:{n:'Barbell Shrug',c:'weighted'},
  fat_bar_hold:{n:'Fat Bar Hold',c:'aux'},
  rack_pull:{n:'Rack Pull',c:'weighted'},
  kb_sumo_deadlift:{n:'Kettlebell Sumo Deadlift',c:'weighted'},
  db_sumo_squat:{n:'DB Sumo Squat',c:'weighted'},
  dead_hang:{n:'Dead Hang',c:'aux'}
});
R.steps({
  pause_squat:['Squat as in competition, braced and tight.','Sit to full depth and hold still for the pause.','Keep the brace through the pause.','Drive up hard from a dead stop.'],
  pause_bench:['Set up as for your competition bench.','Lower the bar under control to the chest.','Let it rest lightly on the chest and hold still for the pause.','Press up hard without bouncing.'],
  deficit_deadlift:['Stand on a plate or low platform, about 3–6 cm high.','Set up as for your normal deadlift.','Brace and push through the floor; the bar travels further.','Lock out, then lower under control to the floor.'],
  paused_deadlift:['Set up and pull as for your normal deadlift.','Stop just below the knee and hold for a count of one or two.','Keep the back flat and the bar against the legs in the pause.','Finish the pull and lower under control.'],
  leg_press:['Sit with your lower back flat against the pad.','Place your feet about hip-width on the platform.','Lower until the knees are well bent, without the hips lifting off the seat.','Press back up without locking the knees hard.'],
  db_bench:['Lie on a flat bench with a dumbbell in each hand over the chest.','Lower the dumbbells to the sides of the chest, elbows about 45° out.','Press up until the arms are straight.','Keep the feet planted and the shoulder blades pulled back.'],
  side_plank:['Lie on your side with the elbow under the shoulder.','Stack the feet, or stagger them for balance.','Lift the hips until the body is in a straight line.','Hold without letting the hips sag.'],
  straight_arm_pulldown:['Stand facing a high cable with a bar or rope.','Keep the arms straight with a small bend at the elbow.','Pull the bar down to the thighs with the lats.','Let it rise slowly back to eye height.'],
  cable_crunch:['Kneel facing a high cable, rope held beside the head.','Keep the hips still.','Curl the ribs down towards the pelvis.','Return slowly until the abs are stretched.'],
  mcgill_big3:['Curl-up: lie with one knee bent, hands under the low back, lift head and shoulders slightly and hold.','Side plank: hold on the elbow, body straight, then switch sides.','Bird dog: on hands and knees, reach the opposite arm and leg out and hold.','Hold each rep about 10 seconds and keep the spine neutral throughout.'],
  dead_bug:['Lie on your back, arms up, hips and knees at 90°.','Press the low back into the floor.','Lower the opposite arm and leg towards the floor.','Return and switch sides without the back lifting.'],
  chest_supported_row:['Lie face down on an incline bench with a dumbbell in each hand.','Let the arms hang straight down.','Row the elbows back towards the hips.','Lower slowly to a full stretch.'],
  seal_row:['Lie face down on a high flat bench, bar or dumbbells below you.','Grip with straight arms.','Row the weight up to the bench, squeezing the shoulder blades.','Lower to a full stretch without lifting the chest.'],
  plank:['Set the forearms under the shoulders and the feet together.','Tuck the pelvis and squeeze the glutes and abs hard.','Hold the body in a straight line.','Breathe behind the brace; stop before the hips sag.'],
  bb_glute_bridge:['Sit on the floor with a padded bar over the hips.','Lie back with the knees bent and feet flat.','Drive through the heels and lift the hips until the body is straight from knees to shoulders.','Squeeze the glutes at the top, then lower.'],
  glute_bridge:['Lie on your back with the knees bent and feet flat.','Tuck the pelvis slightly.','Drive through the heels and lift the hips.','Squeeze the glutes at the top, then lower.'],
  lu_raise:['Stand holding light plates or dumbbells at your sides, thumbs up.','Raise the arms out to the sides with straight elbows.','Keep going overhead until the arms are vertical.','Lower slowly the same way.'],
  pallof_press:['Stand side-on to a cable or band at chest height.','Hold the handle at the chest with both hands.','Press it straight out and resist the pull to rotate.','Bring it back to the chest under control; do both sides.'],
  ytw_raise:['Lie face down on an incline bench with light weights, or bend forward.','Raise the arms into a Y, thumbs up, and lower.','Raise them straight out to the sides into a T, and lower.','Pull the elbows back and rotate the hands up into a W, and lower.'],
  db_side_bend:['Stand tall with a dumbbell in one hand.','Bend sideways towards the dumbbell, no further than is comfortable.','Pull yourself back upright with the opposite side.','Finish the reps, then switch hands.'],
  cable_row:['Sit at a low cable with the feet braced and knees soft.','Sit tall and hold the handle with straight arms.','Row the handle to the lower ribs.','Return under control to a full stretch.'],
  bb_shrug:['Stand tall holding a barbell at arm\'s length, no straps.','Lift the shoulders straight up towards the ears.','Hold briefly at the top.','Lower under control.'],
  fat_bar_hold:['Set a thick bar, or a bar with thick grips, in the rack at about knee height.','Grip it double overhand and stand up with it.','Hold for the time or reps, crushing the bar.','Set it down before the grip opens.'],
  rack_pull:['Set the bar on rack pins at about knee height.','Set up as for a deadlift and pull from a dead stop.','Lock out with the hips and set the bar back down on the pins.','Lower the pins a little as you get stronger.'],
  kb_sumo_deadlift:['Stand wide with a kettlebell between the feet.','Hinge back and grip the handle with long arms.','Stand up by pushing the floor away.','Lower under control and touch the floor lightly before the next rep.'],
  db_sumo_squat:['Stand wide, toes out, holding one dumbbell between the legs.','Sit straight down with the chest up.','Keep the knees pushed out over the toes.','Stand up through the whole foot.'],
  dead_hang:['Grip a pull-up bar with straight arms.','Let the body hang, feet off the floor.','Keep the shoulders active, not shrugged to the ears.','Hold as long as you can.']
});
try{if(typeof RM_ALIAS==='object'){const A={pause_squat:'backsquat',pause_bench:'bench',deficit_deadlift:'deadlift',paused_deadlift:'deadlift'};
  Object.keys(A).forEach(k=>{if(!RM_ALIAS[k])RM_ALIAS[k]=A[k];});}}catch(e){}

/* I(id, sets, [% of 1RM], [note]) */
const I=(id,s,p,nt)=>{if(typeof p==='string'){nt=p;p=null;}const it={id,s};if(p!=null)it.p=p;if(nt)it.nt=nt;return it;};
const G=grp=>({grp});

/* =====================================================================
   Jamal Browner · Deadlift Specialization Vol. 2 (StrengthStudioTT)
   12 weeks · 4 days. Phase 1 weeks 1–6 (6 = deload), phase 2 weeks 7–11, week 12 test.
   Questionnaire left at its default (all 2s). Top sets are by RPE, back-offs by %.
   ===================================================================== */
const JB=[];
const jbDay=(w,d,n,items,tag)=>JB.push({key:`sc_jbds_w${w}d${d}`,eyebrow:`Week ${w} · Day ${d}`,n,hard:true,...(tag?{tag}:{}),items});
const rpe=r=>`RPE ${r}`;
for(let w=1;w<=11;w++){
  const p2=w>=7,dl=w===6,i=p2?w-7:w-1;           // index within phase
  const acc=dl?'RPE 6–7':'RPE 7–8',set=(n,m)=>dl?m:n;
  /* day 1 · heavy deadlift by RPE + variant + varied-grip bench */
  const single=p2?null:[5,null,6.5,null,7.5,null][i];
  const top=p2?[6,6.5,7,7.5,7.5][i]:[6,6.5,7,7.5,8,'5–6'][i];
  const vr=p2?['5, 6, 7','5.5, 6.5, 7.5','6, 7, 8','6.5, 7.5, 8.5','7, 8, 9'][i]:['5, 6, 7','5.5, 6.5, 7.5','6, 7, 8','6.5, 7.5, 8.5','7, 8, 9','5, 5, 5'][i];
  const vgp=p2?[62.5,65,67.5,70,72.5][i]:[60,62.5,65,67.5,70,60][i];
  const tr=p2||dl?4:5;
  jbDay(w,1,'Heavy deadlift',[
    G('A · Deadlift · top set by RPE'),
    ...(single?[I('deadlift','1 × 1',null,`${rpe(single)} single`)]:[]),
    I('deadlift',`1 × ${tr}`,null,`top set · ${rpe(top)}`),
    I('deadlift',dl?'2 × 4':`3 × ${tr}`,null,`back-off · ${dl?82.5:87.5} % of today's top set`),
    G('B · Deadlift variant'),
    I(p2?'paused_deadlift':'deficit_deadlift',`4 × ${p2||dl?5:6}`,null,`sets 1–3 at RPE ${vr} · set 4: 12 % lighter than set 3 · `+(p2?'or a low block pull':'or block pull, paused deadlift, stiff-leg sumo or RDL')),
    G('C · Bench, varied grip'),
    I('bench',`3 × ${p2?7:8}`,vgp,'grip one finger in or out from your usual'),
    G('D · Accessories'),
    ...(p2?[I('rdl','3 × 6–8',null,`dumbbells · ${acc}`),I('ytw_raise','3 × 8–10',null,acc)]
          :[I('backext',`${set(3,2)} × 8–10`,null,`GHD · ${acc}`),I('facepull',`${set(3,2)} × 12–15`,null,`or rear-delt flyes · rotate out · ${acc}`)]),
    I('cable_crunch','3 × 12–20'),
    I('mcgill_big3','3 × 15–20','each exercise, each side')]);
  /* day 2 · squat + bench by % + upper accessories */
  const sp=p2?[72.5,75,77.5,80,82.5][i]:[67.5,70,72.5,75,77.5,70][i],sr=p2?(w===11?3:4):5;
  jbDay(w,2,'Squat + bench',[
    G('A · Squat'),I('backsquat',`3 × ${sr}`,sp),
    G('B · Bench'),I('bench',`4 × ${sr}`,sp),
    G('C · Accessories'),
    ...(p2?[I('cd_lat_pulldown','4 × 6–8',null,`wide grip · ${acc}`),I('sa_db_row','4 × 7–9',null,acc),I('db_bench','3 × 6–8',null,acc),I('skull_crusher','4 × 8–10',null,acc)]
          :[I('cd_lat_pulldown','1 × myo-reps',null,`neutral grip · one 15–25 rep set, then mini-sets of 3–5 every 5–15 s until you can't get 3 · ${acc}`),
            I('chest_supported_row',`${set(4,3)} × 10–12`,null,acc),I('dbincline',`${set(3,2)} × 8–10`,null,acc),I('cd_tri_pushdown',`${set(4,3)} × 10–12`,null,acc)]),
    I('dead_bug','3 × 15+','each side')]);
  /* day 3 · deadlift by % + back and legs */
  const d3=p2?[[2,3,80,4,4,75],[2,3,82.5,4,4,77.5],[2,3,85,4,4,80],[2,2,87.5,4,3,82.5],[2,2,87.5,4,3,82.5]][i]
             :[[2,3,75,3,4,70],[2,3,77.5,3,4,72.5],[2,3,80,3,4,75],[2,3,82.5,3,4,77.5],[2,3,85,3,4,80],[1,3,80,3,4,75]][i];
  const amr=p2?null:[6,6,6,6,7,5][i];
  jbDay(w,3,'Volume deadlift',[
    G('A · Deadlift'),
    ...(w===11?[I('deadlift','1 × 1',null,'RPE 8–9 single, before the work sets')]:[]),
    I('deadlift',`${d3[0]} × ${d3[1]}`,d3[2]),I('deadlift',`${d3[3]} × ${d3[4]}`,d3[5]),
    ...(amr?[I('deadlift','1 × AMRAP',d3[5],`reps until RPE ${amr}`)]:[]),
    G('B · Accessories'),
    ...(p2?[I('seal_row','4 × 6–8',null,acc),I('cd_lat_pulldown','3 × 8–10',null,`single arm · ${acc}`)]
          :[I('row',`${set(4,3)} × 8–10`,null,acc),I('cd_lat_pulldown',`${set(3,2)} × 12–15`,null,`reverse grip · ${acc}`)]),
    G(`C · superset × ${p2?4:set(4,3)}`),
    ...(p2?[I('leg_press','4 × 8–10',null,acc),I('nordic','4 × 8–10',null,acc)]
          :[I('leg_ext',`${set(4,3)} × 12–16`,null,acc),I('leg_curl',`${set(4,3)} × 12–16`,null,acc)]),
    G('D · Core'),I('plank','3 × 30–60 s','weighted · tuck the pelvis, squeeze the glutes')]);
  /* day 4 · squat + bench variants by RPE + giant set */
  const v4=p2?[6,6.5,7,8,8.5][i]:[6,6.5,7,7.5,8,6][i],gs=set(3,2);
  jbDay(w,4,'Squat + bench variants',[
    G('A · Squat variant'),
    I('pause_squat',`1 × ${p2?5:7}`,null,`top set · ${rpe(v4)} · or high-bar, pin or SSB front squat`),
    I('pause_squat',`2 × ${p2?6:(dl?7:8)}`,null,`back-off · ${dl?85:90} % of the top set`),
    G('B · Bench variant'),
    I('cg_bench',`1 × ${p2?5:6}`,null,`top set · ${rpe(v4)} · or Larsen, Spoto, board, floor or tempo press`),
    I('cg_bench',`2 × ${p2?6:(dl?6:7)}`,null,`back-off · ${dl?85:90} % of the top set`),
    G(`C · giant set × ${gs}`),
    ...(p2?[I('cd_db_press',`${gs} × 6–8`,null,`standing · ${acc}`),I('bb_glute_bridge',`${gs} × 6–8`,null,acc),I('lateral_raise',`${gs} × 8–10`,null,acc)]
          :[I('ohp',`${gs} × 8–10`,null,acc),I('bb_glute_bridge',`${gs} × 8–10`,null,acc),I('lu_raise',`${gs} × 12–15`,null,acc)]),
    G('D · Core'),I('side_plank','3 × 20–40 s','each side'),I('pallof_press','3 × 8–10','each side')]);
}
/* week 12 · peak and test */
jbDay(12,1,'Opener practice',[
  G('A · Deadlift'),
  I('deadlift','1 × 1',85,'about 92.5 % of your planned opener'),
  I('deadlift','3 × 3',76,'about 82.5 % of your planned opener'),
  G('B · Squat + bench'),I('backsquat','4 × 4',70),I('bench','3 × 6',65),
  G('C · Accessories'),I('ytw_raise','2 × 10–12',null,'RPE 7'),I('cable_crunch','3 × 12–20')],'light');
jbDay(12,2,'Squat + bench',[
  G('A · Squat + bench'),I('backsquat','3 × 2',80),I('bench','4 × 2',80),
  G('B · Accessories'),I('sa_db_row','2 × 6–8',null,'RPE 7'),I('skull_crusher','2 × 8–10',null,'RPE 7'),I('dead_bug','3 × 15+','each side'),
  {n:'Rest 2–3 days before the test',s:''}],'light');
jbDay(12,3,'Test day',[
  G('A · Test'),
  I('deadlift','1 × 1',null,'PR single · RPE 9–10 · warm up as for a meet'),
  I('bench','1 × 1',null,'optional · RPE 9–10'),
  I('backsquat','1 × 1',null,'optional · RPE 9–10')],'test');

R.group('Jamal Browner',{blurb:'Elite raw deadlifter whose programs pull twice a week: a heavy day by RPE and a volume day by percentage.'});
R.program({id:'sc_jbds',n:'Deadlift Specialization Vol. 2',sub:'Deadlift focus · 12 weeks · 4 days',
  shape:'days',group:'Jamal Browner',by:'Jamal Browner × StrengthStudioTT',type:['Powerlifting','Deadlift','Autoregulated'],
  note:'Split: day 1, rest, day 2, rest, day 3, day 4, rest. Week 6 is a deload; week 12 peaks to a deadlift PR.',
  days:JB},
`<h2 id="infoTitle">Deadlift Specialization Vol. 2</h2>
  <p class="by">Jamal Browner × StrengthStudioTT</p>
  <span class="pill2">12 weeks</span><span class="pill2">4 days a week</span><span class="pill2">RPE + % of 1RM</span><span class="pill2">Ends in a PR test</span>
  <h4>What it is</h4>
  <p>A twelve-week block that pulls twice a week while keeping squat and bench ticking over. Day 1 is a heavy deadlift by feel: a top set at a set RPE, then back-off sets a fixed step below it, then a deadlift variation. Day 3 is a volume day by percentage. Days 2 and 4 hold squat, bench and their variations.</p>
  <h4>Phases</h4>
  <ul><li><b>Weeks 1–5</b> build: sets of five and six, RPE rising about half a point a week.</li>
   <li><b>Week 6</b> deload: less volume, lower RPE.</li>
   <li><b>Weeks 7–11</b> heavier: fours, threes and twos, a paused deadlift as the variation.</li>
   <li><b>Week 12</b> peak: an opener practice, a light day, 2–3 days off, then a PR single.</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Split.</b> Day 1, rest, day 2, rest, day 3, day 4, rest, then repeat.</li>
   <li><b>Top sets by RPE.</b> Pick the load from your warm-ups. Never go above the target. If it was well over, take another 5–10 % off the back-offs.</li>
   <li><b>Back-offs</b> are a % of the top set you just did (87.5–90 %), not of your 1RM.</li>
   <li><b>Variant sets</b> climb by RPE over three sets; the fourth drops 12 % from the third.</li>
   <li><b>Variations.</b> Pick one deadlift, squat and bench variation from the list on each row and keep it for the phase. The app logs them under one exercise each.</li>
   <li><b>Accessories</b> are swappable for similar moves; keep the sets, reps and RPE.</li>
   <li><b>Warm up</b> with 3–5 min of easy cardio, 3–4 mobility drills, then 1–2 light sets of 10–15 with the bar.</li></ul>
  <p>The original sheet scales sets with a short questionnaire about stress, recovery and technique. This version uses its default answers.</p>`);

R.approach({id:'jb_topset_backoff',by:'Jamal Browner',n:'RPE top set, % back-offs',
  short:'One top set at a target RPE, then 2–3 back-off sets about 10–12 % lighter.',
  gp:{s:[3,4],r:[3,6],rest:180,rpe:7},fmt:'straight',prog:'linear',cues:['never beat the target RPE'],prefer:'deadlift|squat|bench',
  details:'The day\'s strength sets its own load: work up to one set at the target RPE, then drop a fixed share for the back-offs. The target climbs about half a point a week, then a deload resets it. It fits lifters whose day-to-day strength swings, and it is not a licence to grind.'});
R.approach({id:'jb_dl_twice',by:'Jamal Browner',n:'Deadlift twice a week',
  short:'A heavy day by feel plus a volume day at 70–85 % with one rep-out set.',
  gp:{s:[4,6],r:[2,5],rest:180,rpe:7},fmt:'straight',prog:'linear',prefer:'deadlift|pull|row',
  details:'Split pulling into a heavy day and a lighter, higher-volume day a few days later. The volume day uses percentages and ends with one set taken to a fixed RPE, which shows how the block is going. Accessories go to the back, lats and hamstrings.'});

/* =====================================================================
   Andy Bolton & Pavel Tsatsouline · Deadlift Dynamite
   ===================================================================== */
/* --- your first year: 8-week cycle, top set of five, Mon squat / Wed bench / Fri deadlift --- */
const FY=[];
for(let w=1;w<=8;w++){
  const top=(id,step)=>w===1?I(id,'1 × 5',75,'a weight you could lift 10 times · warm up first'):I(id,'1 × 5',null,`add ${step} kg to last week's top set`);
  FY.push(
   {key:`sc_ddfy_w${w}d1`,eyebrow:`Week ${w} · Monday`,n:'Squat',hard:w>4,items:[
     G('A · Squat · one top set'),top('backsquat',2.5),
     G('B · Assistance'),I('leg_press','4–5 × 8–12'),I('leg_curl','3 × 12–15','lying'),I('db_side_bend','3 × 6–8','per side')]},
   {key:`sc_ddfy_w${w}d2`,eyebrow:`Week ${w} · Wednesday`,n:'Bench',hard:w>4,items:[
     G('A · Bench · one top set'),top('bench',2.5),
     G('B · Assistance'),I('ohp','3 × 8–12','military press'),I('rev_fly','3 × 10–12'),I('lateral_raise','3 × 10–12')]},
   {key:`sc_ddfy_w${w}d3`,eyebrow:`Week ${w} · Friday`,n:'Deadlift',hard:w>4,items:[
     G('A · Deadlift · one top set'),top('deadlift',5),
     G('B · Assistance'),I('reverse_lunge','3 × 6–8','per side'),I('leg_press','3 × 25'),I('leg_curl','3 × 25','lying'),
     I('plank','3 × 10 s','hard, full-body tension'),I('pullups','3 × AMRAP'),I('cable_row','5 × 8–12','low pulley')]});
}
/* --- the advanced week with a six-week power cycle (top set of five) --- */
const PC=[76,79,82,84,87,90];          /* the book's 5RM-based example, as % of 1RM */
const OPEN=[G('Opener'),I('glute_bridge','1 × 12'),I('plank','1 × 10 s')];
const ADV=[];
PC.forEach((p,i)=>{const w=i+1,pr=w===6?' · aim for a 5RM PR':'';
  ADV.push(
   {key:`sc_ddadv_w${w}d1`,eyebrow:`Week ${w} · Monday`,n:'Bench + rear delts',hard:true,items:[...OPEN,
     G('A · Bench · power cycle'),I('bench','1 × 5',p,`top set after warm-ups${pr}`),
     G('B · Rear delts'),I('rev_fly','3–5 × 10–15','or band pull-aparts')]},
   {key:`sc_ddadv_w${w}d2`,eyebrow:`Week ${w} · Wednesday`,n:'Squat + deadlift',hard:true,items:[...OPEN,
     G('A · Squat · power cycle'),I('backsquat','1 × 5',p,`top set after warm-ups${pr}`),
     G('B · Deadlift · power cycle'),I('deadlift','1 × 5',p,`top set, pulled after squats${pr}`),
     G('C · Leg size'),I('leg_press','3–5 × 10–12','pull yourself into the seat, low back on the pad')]},
   {key:`sc_ddadv_w${w}d3`,eyebrow:`Week ${w} · Thursday`,n:'Back + shoulders',hard:false,items:[...OPEN,
     G('A · Cardio'),I('lightmove','15 min','treadmill or cross-trainer, easy'),
     G('B · Assistance · 2–4 sets of 8–12'),I('sa_db_row','3–4 × 5–8','machine or DB · per side · push these'),
     I('cd_lat_pulldown','3–4 × 10','leave a couple of reps in the tank'),I('straight_arm_pulldown','3 × 12','moderate, just pump them out'),
     I('bb_shrug','3 × 3–6','no straps, a grip test'),I('ohp','4 × 10','push these quite hard'),I('bbcurl','2 × 10','easy')]},
   {key:`sc_ddadv_w${w}d4`,eyebrow:`Week ${w} · Saturday`,n:'Grip, core + light legs',hard:false,items:[...OPEN,
     G('A · Light legs · 25–40 % of max'),I('leg_curl','3 × 10'),I('leg_press','2 × 20'),
     G('B · Hips, core, grip'),I('swing','2 × 10'),I('plank','3 × 10 s'),I('fat_bar_hold','3 × 5','short holds, under 20 s')]});});
/* --- road to the platform: grooving the pull, barbell and kettlebell days alternate --- */
const RP=[];
const bbDay=()=>[G('Barbell day · partial pulls'),I('rack_pull','5 × 5',null,'dead stop from the pins · build to bodyweight, then lower the pins a little at a time'),
  {n:'Short-term goal: 5 × 5 with bodyweight, double overhand',s:''}];
const kbDay=()=>[G('Kettlebell day · grease the groove'),I('kb_sumo_deadlift','5 × 10',null,'touch-and-go · a third to half of bodyweight · easy on purpose')];
[['bb','kb','bb'],['kb','bb','kb']].forEach((wk,i)=>wk.forEach((t,j)=>RP.push(
  {key:`sc_ddroad_w${i+1}d${j+1}`,eyebrow:`Week ${i+1} · ${['Monday','Wednesday','Friday'][j]}`,n:t==='bb'?'Barbell partial pulls':'Kettlebell deadlifts',hard:false,
   items:t==='bb'?bbDay():kbDay()})));

R.group('Pavel Tsatsouline',{blurb:'StrongFirst founder; his barbell books with Andy Bolton teach tension, low reps and simple power cycles.'});
const DD_BY='Andy Bolton & Pavel Tsatsouline';
R.program({id:'sc_dd_road',n:'Road to the Platform',sub:'Learning the deadlift · 2-week rotation · 3 days',
  shape:'days',group:'Pavel Tsatsouline',by:DD_BY,type:['Strength','Deadlift','Beginner'],
  note:'Repeat the two weeks until you pull bodyweight for 5 × 5 off the floor, then move to Your First Year.',days:RP},
`<h2 id="infoTitle">Road to the Platform</h2>
  <p class="by">${DD_BY} · Deadlift Dynamite</p>
  <span class="pill2">3 days a week</span><span class="pill2">Barbell + kettlebell</span><span class="pill2">Practice, not max effort</span>
  <h4>What it is</h4>
  <p>The book's on-ramp for a new deadlifter. You pull three times a week, swapping between barbell days and kettlebell days, so you get lots of practice without much fatigue.</p>
  <h4>How to run it</h4>
  <ul><li><b>Barbell days:</b> 5 × 5 partial pulls from rack pins, each rep from a dead stop. Build to about bodyweight, then lower the pins in small steps rather than adding weight.</li>
   <li><b>Kettlebell days:</b> 5 × 10 sumo deadlifts, touch-and-go, with one or two bells at a third to half of bodyweight. Easy on purpose.</li>
   <li><b>Grip:</b> double overhand until bodyweight for 5 × 5 off the floor; then a mixed grip, switching hands between sets.</li>
   <li><b>Form first.</b> Breathe into the belly, crush the bar, keep the shins still and lock out with the glutes.</li></ul>`);
R.program({id:'sc_dd_first_year',n:'Your First Year',sub:'Squat, bench, deadlift · 8-week cycle · 3 days',
  shape:'days',group:'Pavel Tsatsouline',by:DD_BY,type:['Strength','Beginner','Full body'],
  note:'One top set of five per lift. Start light and add 2.5 kg a week (5 kg on the deadlift).',days:FY},
`<h2 id="infoTitle">Your First Year</h2>
  <p class="by">${DD_BY} · Deadlift Dynamite</p>
  <span class="pill2">8 weeks, repeat</span><span class="pill2">Mon · Wed · Fri</span><span class="pill2">Sets of five</span>
  <h4>What it is</h4>
  <p>A plain plan for your first year once the technique is solid. Squat on Monday, bench on Wednesday, deadlift on Friday, each as one top set of five after warm-ups, followed by basic assistance.</p>
  <h4>How to run it</h4>
  <ul><li><b>Week 1:</b> a weight you could lift for 10, done for 5. It should feel easy.</li>
   <li><b>Each week</b> add 2.5 kg to squat and bench, 5 kg to the deadlift.</li>
   <li><b>After week 8:</b> if the five was easy, keep adding. If it was a grind, start a new cycle 5–10 kg above the last start.</li>
   <li><b>Missed reps?</b> End the cycle a week or two early and start over. No failures in training.</li>
   <li><b>Swap assistance</b> for similar moves every 4–8 weeks.</li>
   <li>After about six months, try cycles of six or twelve weeks.</li></ul>`);
R.program({id:'sc_dd_power',n:'Power Cycle · Advanced Week',sub:'Squat, bench, deadlift · 6 weeks · 4 days',
  shape:'days',group:'Pavel Tsatsouline',by:DD_BY,type:['Powerlifting','Percentage-based','Upper/lower'],
  note:'One top set of five per lift, a few % heavier each week, ending with a 5RM PR. Thursday and Saturday are light.',days:ADV},
`<h2 id="infoTitle">Power Cycle · Advanced Week</h2>
  <p class="by">${DD_BY} · Deadlift Dynamite</p>
  <span class="pill2">6 weeks</span><span class="pill2">4 days a week</span><span class="pill2">One top set</span><span class="pill2">% of 1RM</span>
  <h4>What it is</h4>
  <p>Andy Bolton's own training week with a six-week power cycle on the three lifts. Bench on Monday, squat then deadlift on Wednesday (the way a meet runs), a bodybuilding-style back and shoulder day on Thursday, and light legs, grip and core on Saturday.</p>
  <h4>The cycle</h4>
  <p>One top set of five per lift after warm-ups. The load climbs from about 76 % to 90 % of 1RM, so week 6 should be a small five-rep PR. The book sets the cycle from your best five: start well under it and finish about 5 kg over. Adjust the % if your numbers say otherwise.</p>
  <h4>How to run it</h4>
  <ul><li><b>Warm-ups by feel:</b> as many sets as you need to feel strong on the top set.</li>
   <li><b>Never to failure.</b> Leave a rep in the tank, lift every rep as fast as you can, stay tight.</li>
   <li><b>Start every session</b> with 12 glute bridges and a 10 s plank.</li>
   <li><b>Saturday</b> stays light: high reps at 25–40 % for tendons and recovery.</li>
   <li><b>Stalling?</b> Take a week off and repeat the week you missed, go back two or three weeks, or switch stance for the next cycle.</li>
   <li><b>Next cycle:</b> start again with moderate weights and aim a little higher.</li></ul>`);

R.approach({id:'dd_power_cycle',by:'Pavel Tsatsouline',n:'Power cycle to a PR',
  short:'One top set, a little heavier each week for 4–12 weeks, ending with a PR.',
  gp:{s:[1,2],r:[3,5],rest:240,rpe:8},fmt:'straight',prog:'linear',prefer:'deadlift|squat|bench|press',
  details:'Start a cycle well under your best and add a small, planned amount each week until the last week beats it. Fives build strength and size; triples and doubles suit stronger lifters. When reps start to slip, rest or go back a few weeks rather than forcing it. It is not a max-out every week.'});
R.approach({id:'dd_never_failure',by:'Pavel Tsatsouline',n:'Tight, fast, never to failure',
  short:'Low reps, full-body tension, every rep driven fast, one rep always in reserve.',
  gp:{s:[3,5],r:[1,5],rest:180,rpe:7},fmt:'straight',prog:'linear',cues:['get tight before you lift','drive every rep fast'],prefer:'deadlift|squat|press|swing',
  details:'Strength is a skill: brace, crush the bar and tense the abs, lats and grip before each rep, then move the weight as fast as you can. Stop before form breaks. Grinders are saved for the platform, which keeps technique clean and recovery easy.'});
R.approach({id:'dd_light_volume',by:'Pavel Tsatsouline',n:'Light, high-rep tendon work',
  short:'An easy day of 10–30 reps at 25–40 % for legs, grip and core.',
  gp:{s:[2,3],r:[10,30],rest:60,rpe:5},fmt:'straight',prog:'reps',prefer:'leg press|leg curl|swing|plank|hold',
  details:'Between heavy days, pump the legs with light, high-rep work instead of total rest. It builds the tendons and aids recovery without eating into the next heavy session. Keep it short and well short of failure.'});

/* =====================================================================
   Street Lifting · Zero level (muscle-up + weighted pull-ups and dips)
   ===================================================================== */
const MU=()=>[G('A · Muscle-ups · E2MOM · METCON 20'),I('ring_mu','10 × 1',null,'one rep every 2 min · low rings or bar, start from a jump · or bar muscle-ups')];
const SLW='special warm-up: 50 % of the work load × 6, 65 % × 5, 80 % × 3';
const SL=[1,2,3].map(d=>({key:`sc_slzero_d${d}`,eyebrow:`Standard week · ${['Monday','Wednesday','Friday'][d-1]}`,n:'Muscle-ups + weighted pulls and dips',hard:true,items:[
  ...MU(),
  G('B · Weighted dips + pull-ups · 2+ min rest'),
  I('wdips','3 × 8',50,`start at 50 %; next time add by your lowest set: 8 reps +2.5 kg, 7 +1.25, 6 +0.5 · ${SLW}`),
  I('wpullup','3 × 8',50,'start at 50 %; same rule for adding load')]}));
SL.push(
 {key:'sc_slzero_u1',eyebrow:'Unload week · Monday',n:'Unload',hard:false,items:[...MU(),G('B · Weighted dips + pull-ups'),I('wdips','2 × 5+',null,'work load'),I('wpullup','2 × 5+',null,'work load')]},
 {key:'sc_slzero_u2',eyebrow:'Unload week · Wednesday',n:'Unload',hard:false,items:[...MU(),G('B · Weighted dips + pull-ups'),I('wdips','1 × 5+',null,'work load'),I('wpullup','1 × 5+',null,'work load')]},
 {key:'sc_slzero_u3',eyebrow:'Unload week · Friday',n:'1RM test',hard:true,tag:'test',items:[
   G('A · 1RM test'),I('wdips','1 × 1',null,'work up to a new 1RM'),I('wpullup','1 × 1',null,'work up to a new 1RM'),
   ...MU().map(x=>x.grp?{grp:x.grp.replace('A ·','B ·')+' · after the test'}:x)]});
R.group('Street Lifting',{blurb:'Weighted pull-ups and dips with muscle-up skill work, organised in levels.'});
R.program({id:'sc_sl_zero',n:'Streetlifting · Zero Level',sub:'Muscle-up + weighted pull-ups and dips · 3 days',
  shape:'days',group:'Street Lifting',by:'Street Lifting',type:['Weighted calisthenics','Pull-ups','Percentage-based'],
  note:'Repeat the standard week; run the unload week when pull-ups and dips stop moving. Graduate at 10 clean muscle-ups in 20 minutes.',days:SL},
`<h2 id="infoTitle">Streetlifting · Zero Level</h2>
  <p class="by">Street Lifting · muscle-up and streetlifting, zero level</p>
  <span class="pill2">Mon · Wed · Fri</span><span class="pill2">Muscle-ups on a timer</span><span class="pill2">% of 1RM</span>
  <h4>What it is</h4>
  <p>The entry level: learn the muscle-up and build a base on weighted dips and pull-ups. Every session is the same: ten single muscle-ups, one every two minutes, then three sets of eight on dips and pull-ups.</p>
  <h4>How to run it</h4>
  <ul><li><b>Muscle-ups.</b> Rings are easier to learn than the bar. Set them low enough to start from a jump, and make it harder by raising them or jumping less.</li>
   <li><b>Muscle-up progress</b> is the number of clean sets in 20 minutes: 10 is progress, 8–9 is a little, fewer than 8 means work on adding sets.</li>
   <li><b>Dips and pull-ups</b> start at 50 % of a 1RM tested on a separate day. After that, the lowest set last time sets the jump: 8 reps add 2.5 kg, 7 add 1.25 kg, 6 add 0.5 kg, fewer than 6 keep the load.</li>
   <li><b>Not there yet?</b> Under 10 pull-ups or 20 dips, skip the 1RM and add reps instead. At 15 pull-ups and 25 dips, drop to 8 reps and start adding weight.</li>
   <li><b>Rest</b> at least 2 minutes between sets.</li>
   <li><b>Warm up:</b> up to 15 min easy cardio, joint circles, then 50 % × 6, 65 % × 5, 80 % × 3 of the work load.</li>
   <li><b>Unload week</b> when progress stalls for more than a week: less volume Monday and Wednesday, a new 1RM on Friday, then recalculate the loads.</li></ul>`);
R.approach({id:'sl_submax',by:'Street Lifting',n:'Submax weighted pulls and dips',
  short:'3 × 8 from 50 % of 1RM; the lowest set decides the next small jump in load.',
  gp:{s:[3,3],r:[8,8],rest:120,rpe:7},fmt:'straight',prog:'linear',prefer:'pull-up|dip|muscle',
  details:'Start well under your max and add a little load each session, sized by how the hardest set went: all eights earns the full step, sevens or sixes a smaller one, anything less keeps the load. When progress stops, unload for a week and retest. It fits a calisthenics base, not peaking.'});
R.approach({id:'sl_skill_timer',by:'Street Lifting',n:'Skill singles on a timer',
  short:'One clean rep every 2 minutes for 20 minutes; count the good sets.',
  gp:{s:[10,10],r:[1,1],rest:120,rpe:6},fmt:'emom',prefer:'muscle|handstand|skill',
  details:'Learn a hard skill such as the muscle-up with fresh, spaced singles rather than tired sets. Progress is the number of clean reps in the window, then a harder version of the drill. Stop a rep that turns sloppy.'});

/* =====================================================================
   Anatoly · APS (Anatoly's Power System) sample week
   ===================================================================== */
const APS=[
 {key:'sc_aps_d1',eyebrow:'Monday',n:'Legs',hard:true,items:[
   G('A · Legs'),I('backsquat','2 × 12',null,'low bar'),I('leg_press','2 × 12'),I('db_sumo_squat','3 × 6'),
   G('B · Power + grip'),I('jumps','2 × 6','vertical jumps'),I('dead_hang','1 × F','as long as you can')]},
 {key:'sc_aps_d2',eyebrow:'Wednesday',n:'Chest, shoulders, triceps',hard:true,items:[
   G('A · Press'),I('pause_bench','2 × 10',null,'1 s pause on the chest'),I('cg_bench','2 × 12'),I('ohp','3 × 8'),
   G('B · Accessories'),I('dips','2 × 12','add weight if you can'),I('lateral_raise','3 × 10','standing')]},
 {key:'sc_aps_d3',eyebrow:'Friday',n:'Back, biceps, grip',hard:true,items:[
   G('A · Pull'),I('deadlift','4 × 12','classic deadlift'),I('deficit_deadlift','3 × 3',null,'3–5 cm deficit'),
   G('B · Back + arms'),I('row','2 × 8','bent over'),I('pullups','3 × 7','or a wide-grip lat pulldown'),I('cd_hammer_curl','3 × 7'),
   G('C · Grip'),I('plate_pinch','4 × 35–50 s','plate holds')]},
 {key:'sc_aps_d4',eyebrow:'Saturday',n:'Core + easy cardio',hard:false,items:[
   {n:'Abs and core work',s:''},{n:'Light cardio or an outdoor walk',s:''},{n:'Stretching',s:''}]}];
R.group('Anatoly',{blurb:'Anatoly\'s Power System (APS): fewer sessions, planned blocks and strength over the pump.'});
R.program({id:'sc_aps_week',n:'APS Sample Week',sub:'Legs, push, pull · 1 week · 3 days + core',
  shape:'days',group:'Anatoly',by:'Anatoly',type:['Strength','Full body','Gym'],
  note:'Train Monday, Wednesday and Friday; Saturday is optional core and easy cardio. Run the main lifts in APS blocks.',days:APS},
`<h2 id="infoTitle">APS Sample Week</h2>
  <p class="by">Anatoly · Anatoly's Power System (free guide)</p>
  <span class="pill2">3 days + core</span><span class="pill2">Low volume</span><span class="pill2">Periodized</span>
  <h4>What it is</h4>
  <p>The example week from Anatoly's guide, set against the six-day bro split it replaces: legs on Monday, chest, shoulders and triceps on Wednesday, back, biceps and grip on Friday, and easy core and cardio on Saturday. Few sets, heavy basics, rest in between.</p>
  <h4>How to run it</h4>
  <ul><li><b>Three to four sessions</b> a week is the point; rest days are part of the plan.</li>
   <li><b>Change the load week to week</b> rather than repeating the same weights. The guide's example cycle for the main lifts:
    <ul><li>Weeks 1–2: 4 × 8 at 65–70 %</li><li>Weeks 3–4: 5 × 5 at 75–85 %</li><li>Weeks 5–6: 4 × 4 at 85–90 %</li><li>Week 7: 3 × 3 at 90–95 %, a peak test</li><li>Week 8: light work at 50–60 %, deload</li></ul></li>
   <li>The guide lists the DB sumo squat twice on Monday; it appears once here.</li></ul>`);
R.approach({id:'aps_blocks',by:'Anatoly',n:'Planned blocks, not the pump',
  short:'3–4 sessions a week; 8-week waves from 4 × 8 at 65 % to 3 × 3 at 90 %+, then deload.',
  gp:{s:[3,5],r:[3,8],rest:150,rpe:8},fmt:'straight',prog:'linear',prefer:'squat|bench|deadlift|press|row',
  details:'Train fewer days with a clear plan: a base phase of moderate loads and more volume, a strength phase, a short peak and then a deload week before the next wave. Loads and lifts change from week to week so the body keeps adapting. It is the opposite of six pump-chasing sessions a week.'});
})();
