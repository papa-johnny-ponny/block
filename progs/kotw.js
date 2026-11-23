/* BLOCK. program pack: kotw. King of Weighted (Michael Schulz) and Strength Side.
   Runs after reg.js. Programs are stored as structure only (exercises, sets, reps,
   RIR/RPE, order, short notes); every text is written fresh for the app.
   The KOTW sources prescribe load by RIR/RPE, not by % of 1RM, so no item has `p`. */
(function(){
const R=window.BLOCK_REG;if(!R)return;
const KW='King of the Weighted',SS='Strength Side';

/* ---------- exercises ---------- */
R.ex({
  weighted_muscle_up:{n:'Weighted Muscle-Up',c:'cal',v:'https://www.youtube.com/watch?v=KCM3HEgy0iY'},
  bar_muscle_up:{n:'Bar Muscle-Up',c:'skill',v:'https://www.youtube.com/watch?v=3o0WNektRHg'},
  high_pullup:{n:'Explosive High Pull-Up',c:'bodyweight',v:'https://www.youtube.com/watch?v=IRpJY8tY0GM'},
  scap_pullup:{n:'Scapula Pull-Up',c:'bodyweight',v:'https://www.youtube.com/watch?v=-ZIpSoTRsuE'},
  front_lever_raise:{n:'Front Lever Raise',c:'skill',v:'https://www.youtube.com/watch?v=ABvrIIso0uw'},
  front_lever_hold:{n:'Front Lever Hold',c:'skill',v:'https://www.youtube.com/watch?v=lkGhntOoLNk'},
  planche_pushup:{n:'Planche Push-Up',c:'skill',v:'https://www.youtube.com/watch?v=TZ63httkob4'},
  planche_hold:{n:'Planche Hold',c:'skill',v:'https://www.youtube.com/watch?v=bFyxSxcJoZE'},
  ring_rollout:{n:'Ring Roll-Out',c:'bodyweight',v:'https://www.youtube.com/watch?v=3Y55VgF39Rk'},
  ring_triceps_ext:{n:'Ring Triceps Extension',c:'bodyweight',v:'https://www.youtube.com/watch?v=MK6h_OCJuWI'},
  chest_fly:{n:'Chest Fly',c:'weighted',v:'https://www.youtube.com/watch?v=W5CFUpcfywI'},
  ring_support_hold:{n:'Ring Support Hold (Turned Out)',c:'skill',v:'https://www.youtube.com/watch?v=KyvLK70-U-0'},
  ring_yt_raise:{n:'Ring Y-T Raise',c:'bodyweight',v:'https://www.youtube.com/watch?v=tvja1NWjUHg'},
  ring_hamstring_curl:{n:'Ring Hamstring Curl',c:'bodyweight',v:'https://www.youtube.com/watch?v=IIFNZx3_CEE&t=497s'},
  ring_pushup:{n:'Ring Push-Up',c:'bodyweight',v:'https://www.youtube.com/watch?v=NK4P-v58Px0&t=51s'},
  wrist_routine:{n:'Wrist Routine',c:'bodyweight',v:'https://www.youtube.com/watch?v=7KdsGAuQBC4'},
  straight_leg_gm:{n:'Straight-Leg Good Morning',c:'bodyweight',v:'https://www.youtube.com/watch?v=EqZ1OOOwreI&t=31s'},
  pigeon_hinge:{n:'90/90 Pigeon Hinge',c:'bodyweight',v:'https://www.youtube.com/watch?v=0eS-AkszSDw&t=96s'},
  couch_stretch:{n:'Couch Stretch',c:'bodyweight',v:'https://www.youtube.com/watch?v=EqZ1OOOwreI&t=80s'},
  squat_knees_inout:{n:'Squat Knees Out + In',c:'bodyweight',v:'https://www.youtube.com/watch?v=EqZ1OOOwreI&t=143s'}
});
R.steps({
  weighted_muscle_up:['Hang a light load from a dip belt and grip the bar with your wrists slightly over it.','Swing into a hollow body and start the pull as the swing turns back.','Pull the bar to your lower chest in a C-shape, not straight up.','Let the wrists roll over, drive the elbows up and press out to lockout.','Lower under control and reset the hang before the next rep.'],
  bar_muscle_up:['Hang with a semi-false grip, wrists turned over the bar.','Swing into a hollow body and pull hard as the swing turns back.','Drive the bar toward your lower chest so your chest passes it.','Loosen the grip a little, roll the wrists and bring the elbows up.','Press out of the straight bar dip to lockout.'],
  high_pullup:['Hang in a hollow body with shoulders active.','Pull as fast as you can, aiming the bar at your lower chest or belly.','Keep the body tight; no kicking.','Lower under control and reset before each rep.'],
  scap_pullup:['Hang from the bar with straight arms.','Pull the shoulder blades down and together without bending the elbows.','Hold the top for the prescribed seconds.','Let the shoulders rise back slowly to a full hang.'],
  front_lever_raise:['Hang from the bar and tuck the knees as much as you need.','Keep the arms straight and press the bar down toward your hips.','Raise the body to horizontal, shoulders depressed and back flat.','Pause briefly, then lower with control.'],
  front_lever_hold:['Hang from the bar and pull the shoulders down and back.','Keep the arms straight and lift the body to horizontal in your progression.','Hold a flat back with hips level with the shoulders.','Stop the set when the position breaks.'],
  planche_pushup:['Set your hands by the hips with fingers turned out and lean forward.','Lock the shoulders forward and keep the body in your planche progression.','Lower until the chest is near hand height, elbows close.','Press back up without losing the lean.'],
  planche_hold:['Place your hands beside the hips and lean the shoulders well past the hands.','Push the floor away and round the upper back slightly.','Lift the feet in your progression: lean, tuck or beyond.','Hold with straight arms; stop when the shoulders sink.'],
  ring_rollout:['Kneel and hold the rings low in front of you, arms straight.','Brace the abs and tuck the pelvis.','Let the rings travel forward as far as you can control.','Pull back to the start with straight arms.'],
  ring_triceps_ext:['Hold the rings in a lean, arms straight at shoulder height.','Bend only the elbows and bring the hands toward your forehead.','Keep the body in one straight line.','Press back out by straightening the elbows.'],
  chest_fly:['Set up on rings, cables or a machine with a slight bend in the elbows.','Open the arms wide until you feel a stretch across the chest.','Bring the hands together in an arc, keeping the elbow angle fixed.','Lower slowly into the stretch again.'],
  ring_support_hold:['Jump to the top of a ring dip with straight arms.','Press the shoulders down away from the ears.','Turn the rings out so the palms face forward.','Hold a hollow body for the set time.'],
  ring_yt_raise:['Hold the rings and lean back with straight arms.','Raise the arms overhead into a Y and pull your body up.','Lower and repeat with the arms out to the side in a T.','Keep the body straight and the shoulders down.'],
  ring_hamstring_curl:['Lie on your back with the heels in low rings.','Lift the hips so the body is straight from knees to shoulders.','Curl the heels toward the glutes while keeping the hips high.','Straighten the legs slowly to return.'],
  ring_pushup:['Set the rings low and get into a push-up plank.','Lower until the rings touch the chest, elbows close.','Keep the rings steady and the body straight.','Press up and turn the rings out at the top.'],
  wrist_routine:['Kneel on all fours with the palms down.','Rock gently forward and back over the hands.','Repeat with fingers pointing back and with the backs of the hands down.','Finish with circles and a few palm lifts.'],
  straight_leg_gm:['Stand with the legs straight and the hands behind the head.','Hinge at the hips with a flat back.','Lower until you feel a strong stretch in the hamstrings.','Drive the hips forward to stand tall.'],
  pigeon_hinge:['Sit with both legs bent at 90°, one in front and one to the side.','Sit tall over the front shin.','Hinge forward from the hips with a long spine.','Return to tall and repeat, then switch sides.'],
  couch_stretch:['Kneel with one shin up against a wall or couch.','Step the other foot forward into a lunge.','Squeeze the glute of the back leg and lift the chest.','Hold, breathing slowly, then switch sides.'],
  squat_knees_inout:['Sit in a deep squat with the heels down.','Push the knees out wide and hold.','Let the knees drop inward one at a time.','Keep moving gently between out and in for the set time.']
});
R.group(KW,{blurb:'Michael Schulz, a competitive weighted calisthenics athlete and coach from Berlin: RIR-driven blocks for weighted pull-ups, dips and muscle-ups, with skills on the side.'});
R.group(SS,{blurb:'Bodyweight strength coaching built around rings, handstands and leg strength.'});

/* ---------- helpers ---------- */
const X=(id,s,nt)=>nt?{id,s,nt}:{id,s};
const rir=(id,s,r,nt)=>X(id,s,'RIR '+r+(nt?' · '+nt:''));
const rpe=(id,s,r,nt)=>X(id,s,'@ RPE '+r+(nt?' · '+nt:''));
const G=grp=>({grp});
const pick=(v,i)=>Array.isArray(v)?v[i]:v;
const ADDED='Your 1RM on weighted pull-ups, chin-ups, dips and muscle-ups is the added load on the belt, not bodyweight plus belt.';

/* ===== 1. KOTW 1RM Edition · 10 weeks, 5 days ===== */
/* block weeks: index 0–4 = weeks 1–5, 5–8 = weeks 6–9 */
const P1=w=>{const b2=w>=5;
  const mu=[['3 × 3',3],['3 × 3',3],['3 × 2',2],['3 × 2',2],['3 × 1',2,'submax singles'],
    ['4 × 1, 3, 3, 3','1, 3, 3, 2'],['4 × 1, 3, 3, 3','1, 3, 2, 2'],['4 × 1, 2, 2, 2','1, 2, 2, 2'],['4 × 1, 2, 2, 2','1, 3, 3, 3']][w];
  const pu=[['4 × 5',3],['4 × 5',3],['4 × 5',2],['4 × 5',2],['4 × 1, 3, 3, 3',2,'a single, then 3 triples'],
    ['4 × 1, 3, 3, 3','2, 3, 3, 2'],['4 × 1, 3, 3, 3','2, 3, 2, 2'],['4 × 1, 3, 3, 3','1, 2, 2, 2'],['4 × 1, 3, 3, 3','1, 3, 3, 3']][w];
  const late=w>=4,r3=w===8?3:2,it=[G('A · main lifts'),
    rir('weighted_muscle_up',mu[0],mu[1],mu[2]||(w===0?'strict form beats load · competition rules are strict':'')),
    rir('wpullup',pu[0],pu[1],(pu[2]?pu[2]+' · ':'')+'or chin-ups, whichever you compete in'),
    G('B · skill')];
  if(w<5)it.push(rir('front_lever_raise','5 × 1–2',2,'front lever rows, or raises if rows are too hard · pick a progression'));
  else if(w<7)it.push(rir('front_lever_raise','5 × 1–2',2,'negatives · pick a progression that fits the RIR'));
  else if(w===7)it.push(rir('front_lever_raise','5 × 3',2,'raises · hold the lever 1 s at the top if you can'));
  else it.pop();
  it.push(G('C · assistance'),rir('cd_lat_pulldown',late?'4 × 8':'4 × 10',r3,'or any vertical pull: pull-ups, chin-ups, machine'));
  if(w<7)it.push(rir('row',late?'4 × 8':'4 × 10',2,'or front lever rows, ring rows, DB rows'));
  it.push(rir('rev_fly',late?'3 × 12':'3 × 15',r3,'cable, DB or machine'),rir('dbbicep','3 × 8–12',r3,'any curl · pick your reps'));
  return it;};
const P2=w=>{
  const dp=[['4 × 3',3],['4 × 3',3],['4 × 2',2],['4 × 2',2],['4 × 1, 3, 3, 3',2,'a single, then 3 triples'],
    ['4 × 1, 3, 3, 3','2, 3, 3, 2'],['4 × 1, 3, 3, 3','2, 3, 2, 2'],['4 × 1, 3, 3, 3','1, 2, 2, 2'],['4 × 1, 3, 3, 3','1, 3, 3, 3']][w];
  const r3=w===8?3:2,it=[G('A · main lift'),rir('wdips',dp[0],dp[1],dp[2]||(w===0?'set the load from the RIR; new to RIR? estimate it from your 1RM':'')),G('B · skill + press')];
  if(w<5)it.push(rir('planche_pushup',w<2?'4 × 3':w<4?'4 × 3':'4 × 2',w===4?1:2,'weighted if you can · pick a progression that fits the RIR'));
  else if(w<8)it.push(X('planche_hold','4 × 5 s','pick a progression'));
  it.push(rir('ohp',w<2?'4 × 4':'4 × 3',w===4?1:w===8?3:2,'or HSPU: change the progression, not the load'),G('C · assistance'));
  if(w<5)it.push(rir('bench',w===4?'4 × 8':'4 × 10',2,'chest-biased variation: DB bench or alternating machine'));
  else if(w<7)it.push(rir('bench','3 × 8',2,'DB bench or alternating machine'));
  if(w>=5)it.push(rir('chest_fly',w<7?'2 × 10':'3 × 10',r3,'rings, cable or machine'));
  it.push(rir('lateral_raise',w<4?'3 × 15–20':w===4?'3 × 12':'2 × 12',r3,w<4?'high reps work best here':'a little heavier'),
    G('D · superset'),rir('ring_rollout','3 × 10',r3),rir('ring_triceps_ext','3 × 10',r3));
  return it;};
const P3=w=>{
  const sq=[['4 × 5',3],['4 × 5',3],['4 × 4',2],['4 × 4',2],['4 × 1, 3, 3, 3',2,'a single, then 3 triples'],
    ['4 × 3, 4, 4, 4','2, 3, 3, 3','a triple, then 3 sets of 4'],['4 × 3, 4, 4, 4','2, 3, 3, 2','a triple, then 3 sets of 4'],
    ['4 × 2, 3, 3, 3','1, 2, 2, 2','a double, then 3 triples'],['4 × 1, 3, 3, 3','1, 3, 3, 3','a single, then 3 triples']][w];
  const dl=[['4 × 4',3],['4 × 4',3],['4 × 3',3],['4 × 3',2],['4 × 3',2],['3 × 4',3],['3 × 4',3],['3 × 5',3],['3 × 5',3]][w];
  const it=[G('A · main lifts'),rir('backsquat',sq[0],sq[1],(sq[2]?sq[2]+' · ':'')+'sleeves and belt are fine'),
    rir('deadlift',dl[0],dl[1],'conventional or sumo · straps are fine'),G('B · assistance')];
  if(w<5){const e=w===4?1:2;
    it.push(rir('leg_ext','4 × 20',e,'80 reps in total'),rir('leg_curl','3 × 15',e),
      rir('seated_abd','3 × 10',2,'superset with adduction, 10 each'),rir('cd_calf_raise','4 × 15–20',2,'any calf exercise'));}
  else{const b=w===8?3:2;
    it.push(rir('bulgarian',w===5||w===6?'4 × 10':'3 × 10',b,'back foot raised · load it any way you like'),
      rir('good_morning',w===8?'2 × 8':'3 × 8',2,'barbell'));
    if(w<8)it.push(rir('leg_ext',w<7?'4 × 15':'3 × 15',2,'chase the quad pump'));
    it.push(rir('cd_calf_raise',w<7?'4 × 10–15':'3 × 10–15',2,'any calf exercise'));}
  return it;};
const P4=w=>{const it=[G('A · main lifts')];
  if(w<5){const m=[['4 × 2',3],['4 × 2',3],['4 × 1',2,'singles now'],['4 × 1',2,'singles now'],['4 × 1',1,'submax singles']][w];
    it.push(rir('weighted_muscle_up',m[0],m[1],(m[2]?m[2]+' · ':'')+'keep reps low and form high'),
      rir('high_pullup','4 × 3',w===4?1:2,'against a resistance band, so the top gets harder · add a little weight to fine-tune'),
      rir('wdips','3 × 3',w===4?2:3,'weighted and against a band · low volume, push day is close'),
      rir('wchin',w===2||w===3?'4 × 3':'4 × 4',2,'pause 1–2 s with the chin over the bar · weight behind the legs, no kicking'),
      G('B · assistance'),rir('row','3 × 8',2,'upper-back focus: seal rows or more upright bent-over rows'),
      rir('dbincline','3 × 8',2,'DB, barbell, machine or incline weighted push-ups'),
      rir('facepull','4 × 15–20',2,'rings, TRX or cable · high reps for shoulder health'));}
  else{const last=w===8;
    it.push(rir('bar_muscle_up','4 × 2',last?2:'1–2','against a resistance band · add a little weight to fine-tune'));
    if(!last)it.push(rir('high_pullup','3 × 3',2,'against a resistance band'));
    it.push(rir('wdips','4 × 3',3,'pause 2 s with elbows at 90°'),
      rir('wchin',w<7?'3 × 4':'3 × 3',w===8?3:2,'tempo: 1 s up, 2 s chin over bar, 3 s down'),
      G('B · assistance'),rir('row','4 × 6',w<7?2:3,'upper-back focus'));
    if(!last)it.push(rir('dbincline','3 × 6',3,'DB, barbell, machine or incline weighted push-ups'));
    it.push(rir('facepull','3 × 12',2,'rings, TRX or cable'));}
  return it;};
const P5=w=>{
  const ts=w<2?['4 × 3',3]:w<5?['4 × 3',2]:[['4 × 4',3],['4 × 4',2],['4 × 3',2],['4 × 3',3]][w-5];
  const it=[G('A · main lifts'),rir('backsquat',ts[0],ts[1],w<5?'tempo 3-2-X: 3 s down, 2 s in the hole, explode up':'tempo 1-2-1')];
  if(w<5)it.push(rir('deadlift',w===4?'4 × 4':'4 × 5',3,'pause 1 s at your sticking point, usually just off the floor'));
  else it.push(rir('rdl',w===8?'3 × 8':'4 × 8',[3,2,2,3][w-5],'barbell or DB · replaces the paused deadlift'));
  const lr=w<6?2:3;
  it.push(G('B · assistance'),rir('reverse_lunge',w===8?'3 × 8':'3 × 8–12',lr,'any lunge you are comfortable with'),
    rir('ring_hamstring_curl',w===8?'2 × 6–8':'3 × 6–8',lr,'or GHR if you have one'),
    X('hollow_body','3 × 10 + 10 + 10','combo: swings, crunches, hold · hold a plate to make it harder'),
    rir('cd_calf_raise','3 × 15–20',2,'any calf exercise'));
  return it;};
const KW1_DAYS=[];
const DN=['Pull','Push','Legs','Upper','Lower'],DF=[P1,P2,P3,P4,P5];
const wk1=(w,label)=>DF.forEach((f,d)=>KW1_DAYS.push({key:`kw_1rm_w${w+1}d${d+1}`,eyebrow:`${label} · Day ${d+1}`,n:DN[d],hard:true,items:f(w)}));
for(let w=0;w<5;w++)wk1(w,`Week ${w+1}`);
KW1_DAYS.push(
 {key:'kw_1rm_dl1',eyebrow:'Deload · Day 1',n:'Upper',hard:false,items:[G('A · lighter work'),
   rir('weighted_muscle_up','4 × 2',3,'more RIR, less volume this week'),rir('wpullup','3 × 6',3),rir('wdips','3 × 6',3),
   rir('ohp','3 × 5','3–4','or HSPU'),rir('facepull','3 × 12',2)]},
 {key:'kw_1rm_dl2',eyebrow:'Deload · Day 2',n:'Legs',hard:false,items:[G('A · lighter work'),
   rir('backsquat','3 × 6','3–4','joints and tendons need the break, respect the RIR'),rir('rdl','3 × 8',4,'DB or barbell'),
   rir('leg_ext','3 × 15',3),rir('cd_calf_raise','3 × 5','3–4'),X('hollow_body','3 × 10 + 10 + 10','combo: swings, crunches, hold')]},
 {key:'kw_1rm_dl3',eyebrow:'Deload · Day 3',n:'Upper',hard:false,items:[G('A · lighter work'),
   rir('high_pullup','3 × 3–5',3,'bodyweight · stop with 3 in reserve'),rir('wdips','3 × 4',3),rir('wchin','3 × 4',3,'or pull-ups'),
   rir('chest_fly','3 × 10',2),rir('dbbicep','3–4 × 8–12',2,'arms of your choice')]});
for(let w=5;w<9;w++)wk1(w,`Week ${w+1}`);
KW1_DAYS.push(
 {key:'kw_1rm_pk1',eyebrow:'Peak week · Day 1',n:'Pull PRs',hard:true,tag:'test',items:[G('A · max attempts'),
   rir('weighted_muscle_up','1 × 1',0,'all in · warm up with lighter singles and climb in small jumps'),
   rir('wpullup','4 × 1, 4, 4, 4','0, 3, 3, 3','set 1 is the max test, the rest are back-offs · log the added load as your new 1RM'),
   G('B · assistance'),rir('facepull','4 × 12',2)]},
 {key:'kw_1rm_pk2',eyebrow:'Peak week · Day 2',n:'Push PRs',hard:true,tag:'test',items:[G('A · max attempts'),
   rir('wdips','1 × 1',0,'all in · climb in small jumps · log the added load as your new 1RM'),
   rir('ohp','1 × 1',0,'1RM for OHP, or max reps for HSPU'),G('B · back-offs'),rir('wdips','3 × 5',3,'easy back-offs')]},
 {key:'kw_1rm_pk3',eyebrow:'Peak week · Day 3',n:'Squat PRs',hard:true,tag:'test',items:[G('A · max attempt'),
   rir('backsquat','1 × 1',0,'all in · climb in small jumps'),G('B · heavy pulls'),
   rir('deadlift','3 × 1, 3, 5','1, 2, 2','heavy, but not all in')]});

R.program({id:'kw_1rm',n:'King of Weighted · 1RM Edition',sub:'Weighted pull-up, dip and squat peak · 10 weeks · 5 days',
  shape:'days',group:KW,by:'Michael Schulz',type:['Weighted calisthenics','Test day','Autoregulated'],
  note:'Load is set by RIR (reps in reserve). The 1RM for weighted pull-ups and dips is the added load.',days:KW1_DAYS},
 `<h2 id="infoTitle">King of Weighted · 1RM Edition</h2>
  <p class="by">Michael Schulz · King of Weighted · 1RM program</p>
  <span class="pill2">5 days a week</span><span class="pill2">2 blocks + deload</span><span class="pill2">Peak week</span><span class="pill2">RIR-based</span>
  <h4>What it is</h4>
  <p>A hybrid of weighted calisthenics, skills and barbell work, aimed at new maxes in the weighted pull-up, weighted dip and back squat. Two blocks with a deload between them, then a peak week where you test.</p>
  <h4>The week</h4>
  <ul><li><b>Day 1</b> pull: weighted muscle-ups, pull-ups, front lever, back work</li>
   <li><b>Day 2</b> push: weighted dips, planche work, press, chest and arms</li>
   <li><b>Day 3</b> legs: squat and deadlift, plus machine work</li>
   <li><b>Day 4</b> upper: technique and assistance for pull-ups and dips</li>
   <li><b>Day 5</b> lower: tempo squats, deadlift variations, hamstrings and core</li></ul>
  <h4>How the load moves</h4>
  <ul><li><b>Block 1 (weeks 1–5).</b> Intensity climbs each week. Reps drop from 5s toward singles while RIR falls from 3 to 1–2.</li>
   <li><b>Deload.</b> Three easy sessions with more RIR and less volume.</li>
   <li><b>Block 2 (weeks 6–9).</b> Starts above where block 1 began. A single, then triples, with a target RIR for each set. Volume drops toward the end to shed fatigue.</li>
   <li><b>Peak week.</b> Rest two full days first. Work up to a true single on muscle-up, pull-up, dip, press and squat. If you have a competition, it replaces this week.</li>
   <li><b>Assistance</b> stays at higher reps so you keep muscle while the main lifts get heavy.</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>RIR.</b> Pick the load that leaves the stated reps in reserve. "1, 3, 3, 2" means one value per set.</li>
   <li><b>Free-choice slots.</b> Rows, vertical pulls, curls, calves and lunges are open: pick the variation you like and log it under the listed exercise.</li>
   <li><b>Pull-ups or chin-ups.</b> Train the one you will test or compete in.</li>
   <li><b>Your 1RM.</b> ${ADDED} Log it that way after the peak week.</li></ul>`);

/* ===== 2. Road to Weighted 2.0 · 14 weeks, 4 days ===== */
const KW2_DAYS=[];
const rt=(w,d,n,items,hard=true)=>KW2_DAYS.push({key:`kw_rtw_w${w}d${d}`,eyebrow:`Week ${w} · Day ${d}`,n,hard,items});
/* block 1: weeks 1–4 */
for(let i=0;i<4;i++){const w=i+1,a=['7–8','7–8','8','8–9'][i];
  rt(w,1,'Upper',[G('A · activation'),rpe('scap_pullup','3 × 3 + 3 s','6–7','hold 3 s in an active hang'),
    G('B · main lifts'),rpe('pullups','4 × 3–5',i<3?'8–9':'9','only the range you control'),
    rpe('dips','4 × 3–5',['8–9','8–9','8','9'][i],'closed-chest technique · shoulders down and forward'),
    G('C · assistance'),rpe('row','3 × 6–8',a,'any row · focus on retraction'),rpe('pushup','3 × 6–8',a,'or bench'),
    rpe('facepull','3 × 10–12',a,'focus on external rotation')]);
  rt(w,2,'Lower',[G('A · handstand'),rpe('hs_hold','4–7 × 5–10 s','6–7','belly to wall · walk up and find a straight line'),
    G('B · legs'),rpe('backsquat','4 × 6–8',a,'high bar · tempo 3-1-1, no bounce'),rpe('rdl','3 × 8',a,'tempo 2-1-1 · pause 1 s at the bottom'),
    rpe('sissy_squat','3 × 6–8','8–9','half range, band-assisted'),rpe('cd_calf_raise','3 × 15–20','10','one leg at a time'),
    rpe('hollow_body','3 × 10 + 10 s','8–9','swings, then a hold')]);
  rt(w,3,'Upper',[G('A · main lifts'),rpe('dips','4 × 3–5','8–9','closed-chest technique'),
    rpe('chinups','4 × 3–5','8–9','tempo 1-2-1 · pause at the top'),
    G('B · assistance'),rpe('ohp','3 × 6–8',['7–8','7–8','8','8–9'][i],'overhead strength for dips and HSPU'),
    rpe('ring_rows','3 × 4–6',i<2?'7–8':'8','hinge row · tempo 1-2-1'),rpe('ring_support_hold','3 × 10 s',i<2?'7–8':'8','shoulders down, rings turned out'),
    G('C · arms superset'),rpe('dbbicep','3 × 8','8–9','any curl'),rpe('dbtricep','3 × 8','8–9','any triceps move')]);
  rt(w,4,'Full body',[G('A · handstand'),rpe('hs_hold','4–7 × 5–10 s','6–7','belly to wall'),
    G('B · strength'),rpe('backsquat','4 × 4–5',a,'tempo 1-3-1 · pause 3 s in the hole'),rpe('hip_thrust','3 × 8',a,'barbell, a loop band helps'),
    rpe('row','3 × 8',a,'bent over · only as far as your back stays neutral'),rpe('pike_pushup','3 × 6',a,'pike as much as you can'),
    rpe('ring_yt_raise','3 × 6 + 6',a)]);}
/* deload week 5 */
rt(5,1,'Upper',[G('A · main lifts'),rpe('high_pullup','3 × 1','7','hollow body · builds pop for muscle-ups'),rpe('pullups','3 × 3–4','7'),
  rpe('dips','3 × 3–4','7','tempo 1-2-1 · pause 2 s at the bottom'),G('B · assistance'),rpe('front_lever_raise','4 × 1','7','tuck as needed · start from the shoulders, not the hips'),
  rpe('pushup','3 × 6','7','or bench'),rpe('facepull','3 × 10','7')],false);
rt(5,2,'Lower',[G('A · handstand'),rpe('hs_kickup','5 × 1','7','back to wall · kick up and find the line'),G('B · legs'),
  rpe('backsquat','3 × 6–8','7','no tempo this week'),rpe('rdl','3 × 6–8','7'),rpe('sissy_squat','3 × 4–5','7','half range, band-assisted'),
  rpe('cd_calf_raise','3 × 15','7'),rpe('hollow_body','3 × 10 + 10','7','swings, then crunches')],false);
rt(5,3,'Full body',[G('A · handstand'),rpe('hspu_ecc','3 × 1','7','belly to wall · tempo 3-2-0'),G('B · strength'),
  rpe('backsquat','3 × 4–5','7','1.5 reps'),rpe('hip_thrust','3 × 6–8','7'),rpe('row','3 × 8','7'),rpe('ohp','3 × 6–8','7'),rpe('ring_yt_raise','3 × 6 + 6','7')],false);
/* block 2: weeks 6–9 */
for(let i=0;i<4;i++){const w=i+6,a=['8','8','8–9','9'][i];
  rt(w,1,'Upper',[G('A · main lifts'),rpe('high_pullup',`${[4,5,6,6][i]} × 1`,i?'8':'7','hollow body'),
    rpe('pullups','4 × 5–7',a),rpe('dips','4 × 5–6',a,'tempo 1-2-1 · pause 2 s at the bottom'),
    G('B · assistance'),rpe('front_lever_raise',`${[4,5,6,6][i]} × 1`,['7','8','8–9','9'][i],'tuck as needed'),
    rpe('pushup','3 × 6–8',a,'or bench'),rpe('facepull','3 × 10–12','8')]);
  rt(w,2,'Lower',[G('A · handstand'),rpe('hs_kickup','5–7 × 1','7','back to wall'),G('B · legs'),
    rpe('backsquat','4 × 8',a),rpe('rdl','4 × 8',a),rpe('sissy_squat','4 × 6',i<3?'8':'9','half range, band-assisted'),
    rpe('cd_calf_raise','3 × 15','9'),rpe('hollow_body','3 × 10 + 10','8','swings, then crunches')]);
  rt(w,3,'Upper',[G('A · main lifts'),rpe('dips','4 × 5–7',a),rpe('chinups','4 × 5–7',a,'pause at the top'),
    G('B · assistance'),rpe('ohp','4 × 6–8',a),rpe('ring_rows','4 × 8–10',a,'high rows · neutral spine, shoulders back'),
    rpe('ring_support_hold','3 × 10 s','8'),G('C · arms superset'),rpe('dbbicep','3 × 8','8–9'),rpe('dbtricep','3 × 8','8–9')]);
  rt(w,4,'Full body',[G('A · handstand'),rpe('hspu_ecc',`${i?5:4} × 1`,i?'8':'7–8',`belly to wall · tempo ${['3-2-0','3-2-0','4-3-0','5-3-0'][i]}`),
    G('B · strength'),rpe('backsquat','4 × 4–5',a,'1.5 reps'),rpe('hip_thrust','3 × 6–8',a),rpe('row','4 × 8',a,'knee high enough that the pelvis tilts up'),
    rpe('ohp','4 × 6–8',['8','8','8','9'][i]),rpe('ring_yt_raise','3 × 8 + 8','8')]);}
/* deload week 10 */
rt(10,1,'Upper',[G('A · main lifts'),rpe('high_pullup','3 × 2','7'),rpe('wpullup','1 × 1','6–7','weighted top single'),
  rpe('pullups','3 × 5–7','7','back-offs · add load to fit the RPE, or bodyweight'),rpe('dips','3 × 6–7','7','tempo 1-2-1'),
  G('B · assistance'),rpe('front_lever_hold','4 × 3–5 s','7','tuck as needed · flat back'),rpe('pushup','3 × 6–8','7','or bench'),rpe('facepull','3 × 10–12','8')],false);
rt(10,2,'Lower',[G('A · handstand'),rpe('handstand','5–7 × 1','7','free attempts · try a few without the wall'),G('B · legs'),
  rpe('backsquat','1 × 1','6–7','top single · work up to it'),rpe('backsquat','3 × 6','7','back-offs'),rpe('rdl','3 × 10','6–7'),
  rpe('sissy_squat','3 × 6','6–7'),rpe('cd_calf_raise','3 × 15','9'),rpe('hollow_body','3 × 10 + 10','8')],false);
rt(10,3,'Full body',[G('A · handstand'),rpe('hspu_ecc','3 × 1','6–7','free-standing if you can · tempo 4-2-0'),G('B · strength'),
  rpe('backsquat','3 × 4–5','6–7','tempo 1-2-1'),rpe('hip_thrust','3 × 6–8','6–7'),rpe('row','3 × 8','6–7'),rpe('ohp','3 × 6–8','6–7'),rpe('ring_yt_raise','3 × 8 + 8','7')],false);
/* block 3: weeks 11–14 */
for(let i=0;i<4;i++){const w=i+11,b=['7–8','8','8','8'][i];
  rt(w,1,'Upper',[G('A · main lifts'),rpe('high_pullup','3 × 2','7'),rpe('wpullup','1 × 1',['7','8','8','9'][i],'weighted top single'),
    rpe('pullups','3 × 5–7',['8','8','8–9','9'][i],'back-offs · add load to fit the RPE, or bodyweight'),rpe('dips','4 × 6–7',b,'tempo 1-2-1'),
    G('B · assistance'),rpe('front_lever_hold','4 × 3–5 s',b,'tuck as needed · flat back'),rpe('pushup','4 × 6–8',b,'or bench'),rpe('facepull','3 × 12–15','8')]);
  rt(w,2,'Lower',[G('A · handstand'),rpe('handstand','5–7 × 1','7','free attempts'),G('B · legs'),
    rpe('backsquat','1 × 1',i?'8':'7','top single · work up to it'),rpe('backsquat','3 × 6',['7–8','8','8–9','9'][i],'back-offs'),
    rpe('rdl','4 × 10',['7–8','8','8','9'][i]),rpe('sissy_squat','3 × 6','8'),rpe('cd_calf_raise',i?'4 × 15':'3 × 15','9'),rpe('hollow_body','3 × 10 + 10','8')]);
  rt(w,3,'Upper',[G('A · main lifts'),rpe('wdips','1 × 1',['7','8','8','9'][i],'weighted top single'),
    rpe('dips','3 × 6',['7–8','8','9','9'][i],'back-offs · add load to fit the RPE'),rpe('chinups','4 × 5–7',b,'tempo 1-2-1 · pause 2 s at the top'),
    G('B · assistance'),rpe('ohp','4 × 6–8',b),rpe('ring_rows','4 × 8–10',b,'high rows'),rpe('ring_support_hold','3 × 10 s','8'),
    G('C · arms superset'),rpe('dbbicep','3 × 8','8–9'),rpe('dbtricep','3 × 8','8–9')]);
  rt(w,4,'Full body',[G('A · handstand'),rpe('hspu_ecc',`${i?5:4} × 1`,['7–8','8','9','9'][i],`free-standing if you can · tempo ${i<2?'4-2-0':'5-3-0'}`),
    G('B · strength'),rpe('backsquat','4 × 5–7',['7–8','8','8','8–9'][i],'tempo 1-2-1'),rpe('hip_thrust','3 × 10',b),
    rpe('row','4 × 8–12',['7–8','8','8–9','8–9'][i]),rpe('ohp','4 × 5',['7–8','8','8–9','8–9'][i],'heavier overhead work for HSPU'),
    rpe('ring_yt_raise','3 × 8 + 8',i?'8':'7')]);}

R.program({id:'kw_rtw',n:'Road to Weighted 2.0',sub:'From bodyweight basics to weighted top sets · 14 weeks · 4 days',
  shape:'days',group:KW,by:'Michael Schulz',type:['Weighted calisthenics','Autoregulated','Upper/lower'],
  note:'Load is set by RPE. Weeks 5 and 10 are 3-day deloads. Week 15 is an easy week before your next program.',days:KW2_DAYS},
 `<h2 id="infoTitle">Road to Weighted 2.0</h2>
  <p class="by">Michael Schulz · King of Weighted · on-ramp program</p>
  <span class="pill2">4 days a week</span><span class="pill2">3 blocks</span><span class="pill2">2 deloads</span><span class="pill2">RPE-based</span>
  <h4>What it is</h4>
  <p>The on-ramp to weighted calisthenics. It builds clean pull-ups, dips and squats with tempo work, adds handstand and front lever practice, and ends with weighted top singles followed by back-off sets.</p>
  <h4>The week</h4>
  <ul><li><b>Day 1</b> upper · <b>Day 2</b> lower · <b>Day 3</b> rest</li>
   <li><b>Day 4</b> upper · <b>Day 5</b> full body · <b>Days 6 and 7</b> rest</li></ul>
  <h4>The three blocks</h4>
  <ul><li><b>Block 1 (weeks 1–4).</b> Low-rep pull-ups and dips with perfect form, tempo squats, belly-to-wall handstands. RPE creeps up week by week.</li>
   <li><b>Block 2 (weeks 6–9).</b> More reps on the basics, explosive pull-ups and front lever raises for the muscle-up, HSPU negatives.</li>
   <li><b>Block 3 (weeks 11–14).</b> A weighted top single on pull-ups, dips and squats, then back-off sets. Front lever holds and free handstand attempts.</li>
   <li><b>Deloads (weeks 5 and 10).</b> Three easy days at RPE 6–7.</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Tempo.</b> Three numbers: lowering, pause at the turn, lifting, in seconds. 3-1-1 means 3 s down, 1 s pause, 1 s up.</li>
   <li><b>RPE.</b> 10 is failure, 8 leaves about two reps in the tank.</li>
   <li><b>Warm up</b> the shoulders and hips before the handstand days.</li>
   <li><b>Top singles.</b> ${ADDED}</li>
   <li><b>What next.</b> Take an easy week, then move on to the 1RM Edition, starting its first week as a deload.</li></ul>`);

/* ===== 3. Muscle-Up Guide · 3 levels ===== */
R.program({id:'kw_mu',n:'King of Weighted · Muscle-Up Guide',sub:'Three levels from pull-ups to clean muscle-ups · 2× a week',
  shape:'days',group:KW,by:'Michael Schulz',type:['Skill','Pull-ups'],
  note:'Train your current level twice a week. Move up when you own it.',
  days:[
   {key:'kw_mu_l1',eyebrow:'Level 1',n:'More pull-ups',hard:true,tag:'~60 min',items:[G('A · main lifts · 2–3 min rest'),
     X('pullups','4 × 4–6','scale the reps to your max'),X('dips','4 × 6–8','or straight bar dips'),
     G('B · assistance · 1–2 min rest'),X('cd_lat_pulldown','3 × 6–8','or any vertical pull: negatives, band-assisted, chin-ups'),
     X('row','3 × 8–12','any row'),X('pushup','3 × 8–12','or bench or a dip variation'),X('rev_fly','3 × 8–12','1 min rest'),X('dbbicep','3 × 8–12')]},
   {key:'kw_mu_l2',eyebrow:'Level 2',n:'Technique and pulling height',hard:true,tag:'~60 min',items:[G('A · power · 3–4 min rest'),
     X('high_pullup','4–5 × 2–3','pull as high as you can'),G('B · technique'),X('bar_muscle_up','3 × 3–5','band-assisted · 2 min rest'),
     X('wpullup','3 × 5','or pull-ups against a band · 3 min rest'),X('bar_muscle_up','6–8 × 1','negatives · go slowly through each phase'),
     G('C · assistance · 2 min rest'),X('row','3 × 8–12'),X('hollow_body','3 × 10','hollow crunches, holds or leg raises'),X('rev_fly','3 × 10–15','or curls')]},
   {key:'kw_mu_l3',eyebrow:'Level 3',n:'Muscle-ups',hard:true,tag:'~60 min',items:[G('A · main lift · 3–4 min rest'),
     X('bar_muscle_up','4–5 × 2–3','film your reps · less momentum over time'),G('B · strength'),
     X('high_pullup','3–4 × 3–5','2 min rest'),X('wpullup','3–4 × 6–8','3 min rest'),X('dips','3 × 2–3','deep straight bar dips · 2–3 min rest'),
     G('C · assistance · 2 min rest'),X('row','3 × 8–12'),X('hollow_body','3 × 10'),X('rev_fly','3 × 10–15','or curls')]}]},
 `<h2 id="infoTitle">King of Weighted · Muscle-Up Guide</h2>
  <p class="by">Michael Schulz · King of Weighted · free guide</p>
  <span class="pill2">3 levels</span><span class="pill2">2 sessions a week</span>
  <h4>What it is</h4>
  <p>A step-by-step path to the bar muscle-up. Each level is one session you repeat twice a week until you own it.</p>
  <h4>The levels</h4>
  <ul><li><b>Level 1, more pull-ups.</b> Build to about 10 clean pull-ups and dips. Pull-ups lead, with pushing and back work around them.</li>
   <li><b>Level 2, technique and height.</b> Explosive high pulls, assisted and negative muscle-ups, weighted pulling. Try a real muscle-up now and then at the start of a session.</li>
   <li><b>Level 3, muscle-ups.</b> The muscle-up itself, low reps at first, plus the strength work from level 2.</li></ul>
  <h4>Technique</h4>
  <ul><li><b>Grip.</b> Start with a semi-false grip, wrists turned over the bar.</li>
   <li><b>Timing.</b> Swing in a hollow body and pull as the swing turns back, so the body travels in a C.</li>
   <li><b>Height.</b> Pull the bar to the lower chest, then roll the wrists and bring the elbows up.</li></ul>
  <p>Levels 2 and 3 are pull-heavy, so adjust the rest of your split. Rest longer when you need it.</p>`);

/* ===== 4. Too Strong for Your Bodyweight · free sample day ===== */
R.program({id:'kw_tsfb',n:'King of Weighted · Sample Day',sub:'Weighted push/pull trial session · 1 day',
  shape:'days',group:KW,by:'Michael Schulz',type:['Weighted calisthenics','Gym'],
  note:'Week 1, day 1 of the paid "Too Strong for Your Bodyweight" plan, released as a free trial.',
  days:[{key:'kw_tsfb_d1',eyebrow:'Week 1 · Day 1',n:'Weighted push/pull',hard:true,tag:'~60 min',items:[
    G('A · pull · 2 min rest'),X('pullups','5 × 3','chest to bar · bodyweight warm-up · 1 min rest'),
    X('wpullup','5 × 10–12','a load you could lift about 12 times'),
    G('B · push · 2 min rest'),X('dips','3 × 5','pause 2 s with elbows at 90° · bodyweight warm-up · 1 min rest'),
    X('wdips','5 × 10–12','a load you could lift about 12 times'),
    G('C · assistance · 2 min rest'),X('chest_fly','5 × 6–8','on rings · ring push-ups if your straight-arm strength is not there yet'),X('facepull','3 × 8–10')]}]},
 `<h2 id="infoTitle">King of Weighted · Sample Day</h2>
  <p class="by">Michael Schulz · free trial of "Too Strong for Your Bodyweight"</p>
  <span class="pill2">1 session</span><span class="pill2">12RM loads</span>
  <h4>What it is</h4>
  <p>The first session of a longer paid plan, given away as a trial. Bodyweight warm-up sets lead into five heavy-ish sets of weighted pull-ups and dips, then ring flys and face pulls.</p>
  <h4>How to run it</h4>
  <ul><li><b>Pick the load per set.</b> Start with roughly your 12-rep max. If a set falls short of the range, drop the load for the next one; if it is too easy, add some.</li>
   <li><b>Rest</b> 2 minutes between work sets, longer if you need it.</li>
   <li><b>Form first.</b> Clean reps matter more than the number on the belt.</li>
   <li><b>Your 1RM.</b> ${ADDED}</li></ul>`);

/* ===== 5. Understanding Calisthenics · weighted & skills sample week ===== */
R.program({id:'kw_uc_week',n:'Weighted & Skills Week',sub:'Front lever, planche, weighted dips and chin-ups · 4 days',
  shape:'days',group:KW,by:'Michael Schulz',type:['Weighted calisthenics','Skill','Autoregulated'],
  note:'Sample week from the book Understanding Calisthenics. Repeat it and adjust weekly.',
  days:[
   {key:'kw_uc_tue',eyebrow:'Tuesday',n:'Primary push · secondary pull',hard:true,tag:'90–120 min',items:[
     G('A · planche'),rpe('planche_hold','3 × 3 × 1–3 s','8–9','ballistic: raise or lower into the hold, 3 short holds per set'),
     rpe('planche_hold','3–4 × 4–6 s','7–8','back-off holds'),G('B · front lever'),rpe('front_lever_hold','3–4 × 8–10 s','6–7','easy conditioning holds'),
     G('C · strength'),rpe('wdips','3–4 × 5','6–7','a technique variation is fine'),rpe('ohp','2–3 × 6–8','7–8'),
     G('D · superset'),rpe('row','2–3 × 12–15','7–8','upper-back focus'),rpe('chest_fly','2–3 × 10–12','7–8','any chest-biased assistance')]},
   {key:'kw_uc_thu',eyebrow:'Thursday',n:'Primary pull · secondary push',hard:true,tag:'90–120 min',items:[
     G('A · front lever'),rpe('front_lever_hold','3 × 4–6 s','8–9','top sets'),rpe('front_lever_hold','3–4 × 6–8 s','7–8','back-off holds'),
     G('B · planche'),rpe('planche_hold','3–4 × 8–10 s','6–7','easy conditioning holds'),
     G('C · strength'),rpe('wchin','3–4 × 5','7','any chin-up variation'),
     G('D · health and core'),rpe('facepull','2–3 × 12–15','8–9'),rpe('lateral_raise','2–3 × 12–15','8–9'),rpe('legraise','3–4 × 12–15','8–9','or other core work')]},
   {key:'kw_uc_fri',eyebrow:'Friday',n:'Primary legs',hard:true,tag:'90 min',items:[
     G('A · squat'),rpe('backsquat','1 × 4','6–7','top set'),rpe('backsquat','3–4 × 6','7–8','back-offs'),
     G('B · hinge and assistance'),rpe('rdl','3–4 × 6–8','7–8','or deadlift, hip thrust, back extension'),
     rpe('reverse_lunge','2–3 × 10–12','7–8','or leg press, hack squat'),rpe('backext','2–3 × 12–15','7–8','any hinge assistance'),
     G('C · arms superset'),rpe('dbbicep','3–4 × 10–12','8–9'),rpe('dbtricep','3–4 × 10–12','8–9')]},
   {key:'kw_uc_sun',eyebrow:'Sunday',n:'Primary pull · primary push',hard:true,tag:'90–120 min',items:[
     G('A · lever superset'),rpe('planche_hold','3–4 × 4–6 s','8–9'),rpe('front_lever_hold','3–4 × 4–6 s','8–9'),
     G('B · full-range superset'),rpe('front_lever_raise','2–3 × 3–5','7–8','front lever pull-ups or rows'),rpe('planche_pushup','2–3 × 3–5','7–8'),
     G('C · progress backups'),rpe('wdips','1 × 3','6–7','top set'),rpe('wdips','3–4 × 5','6–7','back-offs'),
     rpe('wchin','1 × 3','6–7','top set'),rpe('wchin','3–4 × 5','6–7','back-offs')]}]},
 `<h2 id="infoTitle">Weighted & Skills Week</h2>
  <p class="by">Michael Schulz · from the book Understanding Calisthenics</p>
  <span class="pill2">4 days a week</span><span class="pill2">Strength phase</span><span class="pill2">RPE-based</span>
  <h4>What it is</h4>
  <p>The worked example from the book: a week for an experienced athlete who wants a better front lever and planche, a higher 1RM on chin-ups and dips, and some leg work on the side.</p>
  <h4>The week</h4>
  <ul><li><b>Monday</b> off · <b>Tuesday</b> primary push, secondary pull · <b>Wednesday</b> off</li>
   <li><b>Thursday</b> primary pull, secondary push · <b>Friday</b> legs · <b>Saturday</b> off</li>
   <li><b>Sunday</b> primary pull and push, the hardest session</li></ul>
  <h4>Ideas behind it</h4>
  <ul><li><b>Primary, secondary, tertiary.</b> One or two hard, specific sessions per skill each week; the others are lighter and build volume or technique.</li>
   <li><b>Progress backups.</b> Weighted chin-ups back up the front lever and weighted dips back up the planche, because load is easier to progress than a hold.</li>
   <li><b>Top and back-off sets.</b> A few hard holds or a heavy triple, then easier sets to collect volume.</li>
   <li><b>Triple progression for holds.</b> First clean up technique, then add hold time, then move to a harder lever.</li>
   <li><b>Your 1RM.</b> ${ADDED}</li></ul>`);

/* ===== 6. Strength Side · The Formula ===== */
const RINGS=[G('A · muscle-up'),X('ring_mu','1 × 5–15','feet-down technique, negatives or singles · practise the false grip here'),
  G('B · superset · 3–4 rounds'),X('ring_pullup','3–4 × 5','pull the rings high toward the chest'),X('ring_dip','3–4 × 5','aim to bring the rings to the biceps'),
  G('C · optional superset'),X('ring_rows','1–3 × 8–12'),X('ring_pushup','1–3 × 8–12')];
const HSMOB=[G('Warm-up'),X('wrist_routine','1 × 10–15'),
  G('A · superset · 2–3 rounds'),X('hollow_body','2–3 × 30–60 s'),X('straight_leg_gm','2–3 × 10'),
  G('B · superset · 2–3 rounds'),X('hs_hold','2–3 × 30–60 s','chest to wall'),X('pigeon_hinge','2–3 × 10'),
  G('C · superset · 2–3 rounds'),X('heel_pulls','2–3 × 30–60 s'),X('couch_stretch','2–3 × 60 s','per side'),
  G('D · superset · 2–3 rounds'),X('hs_kickup','2–3 × 2–3','attempts to a hold'),X('squat_knees_inout','2–3 × 30 s')];
const LEGS=[G('A · power'),X('jumps','1 × 5–10','explosive jumps'),G('B · strength'),X('backsquat','3–4 × 5','barbell, or single-leg squats'),
  X('nordic','3 × 5–6','or ring hamstring curls 3 × 8–12'),X('sissy_squat','2 × 5–10'),X('cd_calf_raise','2 × 10–15','or jump rope for 5–10 min')];
R.program({id:'kw_formula',n:'The Formula',sub:'Rings, handstand and legs camp · 7-day week · 6–8 weeks',
  shape:'days',group:SS,by:'Strength Side',type:['Calisthenics','Rings','Handstand'],
  note:'Run it for 6–8 weeks, then take a week off. Not for beginners.',
  days:[
   {key:'kw_formula_d1',eyebrow:'Day 1',n:'Rings',hard:true,tag:'~45 min',items:RINGS},
   {key:'kw_formula_d2',eyebrow:'Day 2',n:'Handstand / mobility',hard:false,tag:'~40 min',items:HSMOB},
   {key:'kw_formula_d3',eyebrow:'Day 3',n:'Legs',hard:true,tag:'~45 min',items:LEGS},
   {key:'kw_formula_d4',eyebrow:'Day 4',n:'Handstand / mobility',hard:false,tag:'~40 min',items:HSMOB},
   {key:'kw_formula_d5',eyebrow:'Day 5',n:'Rings',hard:true,tag:'~45 min',items:RINGS},
   {key:'kw_formula_d6',eyebrow:'Day 6',n:'Handstand / mobility',hard:false,tag:'~40 min',items:HSMOB},
   {key:'kw_formula_d7',eyebrow:'Day 7',n:'Rest day',hard:false,tag:'easy',items:[X('restday','')]}]},
 `<h2 id="infoTitle">The Formula</h2>
  <p class="by">Strength Side · training camp</p>
  <span class="pill2">7-day week</span><span class="pill2">2 rings days</span><span class="pill2">3 handstand days</span><span class="pill2">1 legs day</span>
  <h4>What it is</h4>
  <p>A camp for people who already have a solid base. Rings build the muscle-up, pull-up and dip; short, frequent handstand and mobility days build balance and range; one leg day covers squats, Nordics and sissy squats.</p>
  <h4>The week</h4>
  <ul><li><b>Days 1 and 5</b> rings · <b>Day 3</b> legs</li>
   <li><b>Days 2, 4 and 6</b> handstand and mobility · <b>Day 7</b> rest</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Blocks of 6–8 weeks.</b> Then check your progress, take a week off and start again if your body is up for it.</li>
   <li><b>Optional warm-up.</b> 15–20 minutes of animal movements before any session.</li>
   <li><b>Pairs.</b> Lettered pairs (B1/B2 and so on) are done back to back.</li>
   <li><b>Handstand days.</b> As you get stronger, use the hollow hold and wall handstand as warm-ups and spend more sets on heel pulls and kick-ups, working away from the wall.</li>
   <li><b>Relation to the app.</b> The Rings & Handstand Week borrows its rings and handstand work from this plan.</li></ul>`);

/* the inline script lists programs A–Z before packs run; keep that order */
PROGRAMS.sort((a,b)=>a.n.localeCompare(b.n,'en',{sensitivity:'base',numeric:true}));

/* ---------- approaches ---------- */
R.approach({id:'kotw_peak_block',by:'Michael Schulz',n:'Blocks that peak on test day',
  short:'Weighted basics by RIR: reps fall to singles and triples, deload, then a max test.',
  gp:{s:[3,5],r:[1,5],rest:180,rpe:8},fmt:'straight',prog:'linear',
  cues:['leave the set RIR in reserve','form over load'],prefer:'pull|chin|dip|muscle|squat|deadlift',
  details:'The main lifts are loaded by reps in reserve rather than percentages. Within a block the reps drop and the RIR falls each week, from fives at RIR 3 toward singles and triples at RIR 1–2, while assistance stays at higher reps to keep muscle. A deload follows, then a second block that starts heavier, and finally a peak week with two rest days and a true single. It suits an athlete with a date to test or compete, not someone chasing size.'});
R.approach({id:'kotw_top_backoff',by:'Michael Schulz',n:'Top single, then back-offs',
  short:'One heavy single or triple at RPE 7–9, then 3 lighter back-off sets of 5–7.',
  gp:{s:[4,5],r:[1,7],rest:180,rpe:8},fmt:'straight',prog:'linear',
  cues:['work up to the top set','back-offs: same form, less load'],prefer:'pull|chin|dip|squat',
  details:'Work up to one heavy top set, a single or a triple, then drop the load and collect volume with three or four back-off sets. The top set keeps you used to heavy weights; the back-offs build muscle without much extra fatigue. The same split works for lever holds: a few hard holds first, then easier ones. Raise the top set first and the back-offs second.'});
R.approach({id:'kotw_skill_backup',by:'Michael Schulz',n:'Skills first, weighted backup',
  short:'Lever holds while fresh, then weighted dips or chin-ups to back up the skill.',
  gp:{s:[3,4],r:[3,8],rest:150,rpe:8},fmt:'super',prog:'double',
  cues:['skills first, while fresh','stop holds when the shape breaks'],prefer:'lever|planche|muscle|handstand|chin|dip',
  details:'Open with the skill: front lever, planche or muscle-up, held or repeated with clean form. Progress holds in three steps: tidy the technique, add hold time, then move to a harder lever. Follow with a weighted basic that trains the same muscles (chin-ups for the front lever, dips for the planche), since load is easier to progress than a hold. Pair antagonists, such as push and pull, to save time.'});
R.approach({id:'ss_formula_camp',by:'Strength Side',n:'Rings, handstand, legs camp',
  short:'Rings twice, handstand and mobility three times, legs once a week, paired sets.',
  gp:{s:[2,4],r:[5,12],rest:90,rpe:7},fmt:'super',prog:'reps',
  cues:['pair a strength move with a stretch'],prefer:'ring|handstand|hollow|nordic|sissy|heel',
  details:'A weekly camp that trains rings strength (muscle-up, pull-up, dip) twice, short handstand and mobility sessions three times, and legs once. Exercises come in pairs, often a strength or balance drill with a stretch, so mobility work fills the rest periods. Run it for 6–8 weeks, then take a week off. It needs a solid base and is not a beginner plan.'});
})();
