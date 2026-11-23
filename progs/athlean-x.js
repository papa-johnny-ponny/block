/* BLOCK. program pack: Athlean-X (Jeff Cavaliere).
   Structure only (exercises, sets, reps, %, rest, order); every note is written in our own words.
   Runs after reg.js, so EX, PROGRAMS, INFO and BLOCK_REG exist. */
(function(){
const R=window.BLOCK_REG;if(!R)return;
const BY='Jeff Cavaliere',GRP='Athlean-X';
/* I(exercise key or F(name), sets, note, %1RM) · F = one-off move with no library entry · G = group heading */
const I=(e,s,nt,p)=>{const o=typeof e==='string'?{id:e}:{n:e.n};o.s=s||'';if(nt)o.nt=nt;if(p!=null)o.p=p;return o;};
const F=n=>({n});
const G=g=>({grp:g});
const D=(key,eyebrow,n,items,tag,hard)=>({key,eyebrow,n,hard:hard!==false,tag,items});
const L='ABCDEFGHIJ';

R.group(GRP,{blurb:'Physical therapist and strength coach Jeff Cavaliere: train like an athlete, with a twist on almost every set.'});

/* ---------- new exercises ---------- */
R.ex({
  inverted_chin_curl:{n:'Inverted Chin Curl',c:'bodyweight',v:'https://www.youtube.com/watch?v=X1VzYvvAvXQ'},
  cobra_pushup:{n:'Cobra Push-Up',c:'bodyweight',v:'https://www.youtube.com/watch?v=SVouNS6Q33M'},
  prisoner_squat:{n:'Prisoner Squat',c:'bodyweight',v:'https://www.youtube.com/watch?v=H0fJ0Ay4U-k'},
  prisoner_jump_squat:{n:'Prisoner Jump Squat',c:'plyo',v:'https://www.youtube.com/watch?v=ZQlTYLbWVC4'},
  oh_walking_lunge:{n:'Overhead DB Walking Lunge',c:'weighted',v:'https://www.youtube.com/watch?v=RAL7xJz2snE'},
  guillotine_press:{n:'DB Guillotine Press',c:'weighted',v:'https://www.youtube.com/watch?v=wpNGJ0KE4nE'},
  cable_crossover:{n:'Cable Crossover',c:'weighted',v:'https://www.youtube.com/watch?v=taI4XduLpTk'},
  straight_arm_pushdown:{n:'Straight-Arm Pushdown',c:'weighted',v:'https://www.youtube.com/watch?v=aXTKdnCIyWA'},
  rack_pull_row:{n:'Rack Pull + Row',c:'weighted'},
  tri_pushaway:{n:'Band Triceps Pushaway',c:'banded'},
  db_kickback:{n:'DB Triceps Kickback',c:'weighted',v:'https://www.youtube.com/watch?v=6SS6K3lAwZ8'},
  db_band_curl:{n:'DB + Band Combo Curl',c:'weighted'},
  three_way_lunge:{n:'3-Way Lunge',c:'bodyweight',v:'https://www.youtube.com/watch?v=zm9ITzloSPM'},
  no_money_curl:{n:'No-Money Curl',c:'weighted',v:'https://www.youtube.com/watch?v=6VVbxLCmOWc'},
  spiderman_pushup:{n:'Spiderman Push-Up',c:'bodyweight',v:'https://www.youtube.com/watch?v=o7hoH-AsAqs'},
  db_bench:{n:'DB Bench Press',c:'weighted',v:'https://www.youtube.com/watch?v=VmB1G1K7v94'},
  renegade_row:{n:'DB Renegade Row',c:'weighted',v:'https://www.youtube.com/watch?v=z90cWhTWNec'},
  clean_press:{n:'Clean and Press',c:'weighted',v:'https://www.youtube.com/watch?v=AsqaWBIz2FM'},
  plank_updown:{n:'Plank Up-Down',c:'bodyweight',v:'https://www.youtube.com/watch?v=yucmTzAtgOI'},
  db_tucked_press:{n:'Elbows-Tucked DB Bench Press',c:'weighted',v:'https://www.youtube.com/watch?v=BwnrH3ATRfQ'},
  bw_tri_ext:{n:'Bodyweight Triceps Extension',c:'bodyweight',v:'https://www.youtube.com/watch?v=ACyLmO9wj98'},
  sl_box_squat:{n:'Single-Leg Box Squat',c:'bodyweight',v:'https://www.youtube.com/watch?v=DuE_ScvXwtg'},
  burpee:{n:'Burpee',c:'cond',v:'https://www.youtube.com/watch?v=NCqbpkoiyXE'},
  run:{n:'Run',c:'cond',v:'https://www.youtube.com/watch?v=_kGESn8ArrU'},
  plank:{n:'Plank',c:'bodyweight',v:'https://www.youtube.com/watch?v=6LqqeBtFn9M'},
  crunch:{n:'Crunch',c:'bodyweight',v:'https://www.youtube.com/watch?v=cQ5JKgEZCU4'},
  long_leg_bridge:{n:'Long-Leg Bridge',c:'bodyweight',v:'https://www.youtube.com/watch?v=SSppd0_L9ng'},
  heel_touch_squat:{n:'Single-Leg Heel Touch Squat',c:'bodyweight',v:'https://www.youtube.com/watch?v=KmGOxssd-Q0'},
  flexed_arm_hang:{n:'Flexed-Arm Hang',c:'bodyweight',v:'https://www.youtube.com/watch?v=egGBo-elaXc'},
  archer_pushup:{n:'Archer Push-Up',c:'bodyweight',v:'https://www.youtube.com/watch?v=MxVbNel13Ek'},
  hip_buck:{n:'High Hip Buck',c:'bodyweight'},
  sprinter_lunge:{n:'Sprinter Lunge',c:'weighted',v:'https://www.youtube.com/watch?v=OW3B5lVJAIc'},
  sprinter_lunge_leap:{n:'Sprinter Lunge Leap',c:'plyo',v:'https://www.youtube.com/watch?v=TUBznZBqJNU'},
  commando_pullup:{n:'Commando Pull-Up',c:'bodyweight',v:'https://www.youtube.com/watch?v=417O4VGusNU'},
  divebomber_pushup:{n:'Dive Bomber Push-Up',c:'bodyweight',v:'https://www.youtube.com/watch?v=mvNcSF-nXg4'},
  tuck_jump:{n:'Tuck Jump',c:'plyo',v:'https://www.youtube.com/watch?v=Yl7tEmpzknY'},
  thruster:{n:'DB Thruster',c:'weighted',v:'https://www.youtube.com/watch?v=1KYPZ-Jzo3w'},
  step_back_curl:{n:'Step-Back Curl',c:'weighted'},
  press_out:{n:'Plate Press-Out',c:'weighted',v:'https://www.youtube.com/watch?v=OkGKqNRkuec'},
  scap_pull_hang:{n:'Scap Pull Hang',c:'bodyweight',v:'https://www.youtube.com/watch?v=V0hzdT1CZnk'},
  incline_db_curl:{n:'Incline DB Curl',c:'weighted',v:'https://www.youtube.com/watch?v=DCe8f6vMe9A'},
  plyo_pushup:{n:'Plyo Push-Up',c:'plyo',v:'https://www.youtube.com/watch?v=FRo3b_Pfw3M'},
  landmine_row:{n:'One-Arm Landmine Row',c:'weighted',v:'https://www.youtube.com/watch?v=eEA6JNbT5FY'},
  wide_arc_press:{n:'DB Wide-Arc Shoulder Press',c:'weighted'},
  rear_delt_row:{n:'Rear Delt Cable Row',c:'weighted',v:'https://www.youtube.com/watch?v=AlMKBqUuMPI'},
  split_squat:{n:'DB Split Squat',c:'weighted',v:'https://www.youtube.com/watch?v=Wcmg-3iHwjQ'},
  ball_ghr:{n:'Glute-Ham Raise (bench or ball)',c:'bodyweight',v:'https://www.youtube.com/watch?v=c2pWqsHR7FU'},
  ball_ham_curl:{n:'Physioball Hamstring Curl',c:'bodyweight',v:'https://www.youtube.com/watch?v=QVMkcf3uCY0'},
  double_under:{n:'Jump Rope Double Under',c:'cond',v:'https://www.youtube.com/watch?v=pQRnSYfliEc'},
  kickthrough:{n:'Side Kickthrough',c:'animal',v:'https://www.youtube.com/watch?v=mfz0aDW5uXc'},
  spider_curl:{n:'DB Spider Curl',c:'weighted',v:'https://www.youtube.com/watch?v=jFxs5x0cAX8'},
  dead_hang:{n:'Dead Hang',c:'bodyweight',v:'https://www.youtube.com/watch?v=fq9gDvNZQ2c'},
  mountain_climber:{n:'Mountain Climber',c:'cond',v:'https://www.youtube.com/watch?v=ixxk9Qfn61o'},
  chin_hold:{n:'Chin-Up Hold',c:'bodyweight',v:'https://www.youtube.com/watch?v=QWaY882IjKg'},
  landmine_press:{n:'Landmine Shoulder Press',c:'weighted',v:'https://www.youtube.com/watch?v=t9GuiNQo1O4'},
  front_raise:{n:'DB Front Raise',c:'weighted',v:'https://www.youtube.com/watch?v=CH9JzDStL3U'},
  floor_fly:{n:'DB Floor Fly',c:'weighted',v:'https://www.youtube.com/watch?v=bgC53-J-6gA'},
  scaption:{n:'DB Scaption',c:'weighted',v:'https://www.youtube.com/watch?v=N3P7rp7bCYc'},
  shrug:{n:'Shrug',c:'weighted',v:'https://www.youtube.com/watch?v=cJRVVxmytaM'},
  bench_dip:{n:'Bench Dip',c:'bodyweight',v:'https://www.youtube.com/watch?v=c3ZGl4pAwZ4'},
  wall_sit:{n:'Wall Sit',c:'bodyweight',v:'https://www.youtube.com/watch?v=eb7vLD6V-iU'},
  band_pull_apart:{n:'Band Pull-Apart',c:'banded',v:'https://www.youtube.com/watch?v=stwYTTPXubo'},
  core_cinch:{n:'Core Cinch Hold',c:'bodyweight'},
  core_cinch_move:{n:'Core Cinch with Movement',c:'bodyweight'},
  leg_lower_test:{n:'Leg Lowering Test',c:'bodyweight'}
});

R.steps({
  inverted_chin_curl:['Hang under a bar at about hip height, palms facing you, body straight.','Keep the elbows pointing forward.','Curl your forehead up toward the bar by bending only at the elbows.','Lower slowly to straight arms.'],
  cobra_pushup:['Lie face down, hands beside the lower ribs, elbows tucked.','Press the chest up while the hips stay on the floor.','Lock the elbows and squeeze the triceps.','Lower under control.'],
  prisoner_squat:['Stand with hands behind the head, elbows pulled back.','Sit the hips back and down to at least parallel.','Keep the chest up and knees tracking over the toes.','Drive up through the whole foot.'],
  prisoner_jump_squat:['Hands behind the head, elbows back.','Squat to about parallel.','Jump as high as you can.','Land softly and go straight into the next rep.'],
  oh_walking_lunge:['Press two dumbbells overhead and lock the arms.','Step forward into a lunge, back knee close to the floor.','Keep the ribs down and the weights stacked over the shoulders.','Drive through the front foot and step into the next rep.'],
  guillotine_press:['Lie on a bench with light dumbbells, elbows flared.','Lower the dumbbells toward the upper chest and collarbones.','Press up and slightly in.','Use a weight you fully control.'],
  cable_crossover:['Set the handles high and take a step forward.','Lean in slightly with soft elbows.','Sweep the hands down and together in an arc.','Squeeze the chest, then return slowly.'],
  straight_arm_pushdown:['Face a high cable or band holding a bar or rope.','Hinge slightly, arms straight.','Pull the bar down to the thighs with the lats.','Return slowly without bending the elbows.'],
  rack_pull_row:['Set a barbell on the pins at knee height.','Pull it from the pins to a full lockout.','Hinge into a bent-over position and row it to the stomach.','Do the pulls and rows the set calls for.'],
  tri_pushaway:['Anchor a band low behind you and face away from it.','Start with the elbows bent and high, hands near the head.','Extend the arms forward and up until locked.','Return slowly, keeping the elbows high.'],
  db_kickback:['Hinge forward with the chest supported.','Pin the upper arm along the side of the body.','Straighten the elbow fully and squeeze the triceps.','Lower slowly without swinging.'],
  db_band_curl:['Stand on a band and hold its handle together with a dumbbell.','Curl both up with the elbows at the sides.','Fight the band at the top, where it pulls hardest.','Lower slowly.'],
  three_way_lunge:['Lunge forward and push back to the start.','Lunge out to the side and push back.','Step back into a reverse lunge and return.','Switch legs and repeat the three directions.'],
  no_money_curl:['Hold light dumbbells, elbows tucked and bent to 90°.','Rotate the forearms out and squeeze the shoulder blades.','Hold that turned-out position and curl to the top.','Lower to 90° and repeat.'],
  spiderman_pushup:['Start in a push-up position.','As you lower, bring one knee to the same-side elbow.','Press up and return the leg.','Alternate sides each rep.'],
  db_bench:['Lie on a bench with a dumbbell in each hand over the chest.','Lower to the sides of the chest, elbows about 45°.','Press up until the arms are straight.','Keep the shoulder blades pinned to the bench.'],
  renegade_row:['Hold a plank on two dumbbells, feet wide.','Row one dumbbell to the hip.','Keep the hips square and still.','Lower and alternate sides.'],
  clean_press:['Start with the weight at the hang or on the floor.','Pull and dip to catch it at the shoulders.','Press it overhead to a full lockout.','Lower to the shoulders, then down, and repeat.'],
  plank_updown:['Start in a forearm plank.','Press up onto one hand, then the other.','Lower back to the forearms one arm at a time.','Keep the hips still the whole time.'],
  db_tucked_press:['Lie on a bench with dumbbells, palms facing each other.','Keep the elbows tucked close to the body.','Lower to the chest.','Press up and squeeze the triceps at lockout.'],
  bw_tri_ext:['Hold a bar at about waist height, body straight in a plank.','Bend only the elbows and lower the head under the bar.','Extend the arms to push back up.','Walk the feet back to make it harder.'],
  sl_box_squat:['Stand on one leg in front of a bench.','Sit back until you touch the bench.','Stand up without using the other foot.','Keep the knee in line with the toes.'],
  burpee:['Squat and put the hands on the floor.','Jump the feet back to a plank.','Jump the feet back in.','Stand and jump with the arms overhead.'],
  run:['Run at a steady pace you can hold.','Keep the shoulders relaxed and the stride short.','Breathe in a steady rhythm.','Note your time for the distance.'],
  plank:['Forearms under the shoulders, body in a straight line.','Squeeze the glutes and brace the belly.','Keep breathing.','Stop when the hips sag.'],
  crunch:['Lie on your back with the knees bent.','Curl the ribs toward the hips.','Pause and squeeze the abs.','Lower slowly.'],
  long_leg_bridge:['Lie on your back with the heels on the floor far from the hips.','Push through the heels and lift the hips.','Hold, or lift one foot at a time to march.','Lower with control.'],
  heel_touch_squat:['Stand on one leg on a step or box.','Squat down until the free heel touches the floor.','Keep the knee in line with the toes.','Stand back up without pushing off the heel.'],
  flexed_arm_hang:['Jump or pull up so the chin is above the bar.','Hold with the arms bent.','Keep the chin above the bar as long as you can.','Lower slowly when done.'],
  archer_pushup:['Set the hands wide.','Lower toward one hand while the other arm straightens.','Press back to the middle.','Alternate sides.'],
  hip_buck:['Lie on your back, knees bent, feet flat.','Drive the hips up fast and high.','Squeeze the glutes at the top.','Lower and repeat quickly.'],
  sprinter_lunge:['Step back into a lunge and lean slightly forward.','Drive through the front foot.','Bring the back knee up high in front, like a sprint start.','Step straight back into the next rep.'],
  sprinter_lunge_leap:['Start in a sprinter lunge.','Drive the back knee up hard.','Leap off the front foot.','Land softly back into the lunge.'],
  commando_pullup:['Grip the bar with hands close, one in front of the other.','Pull up and bring the head to one side of the bar.','Lower under control.','Alternate sides each rep.'],
  divebomber_pushup:['Start in a pike with the hips high.','Swoop the chest down and forward between the hands.','Finish with the arms straight and the chest up.','Reverse the path back to the pike.'],
  tuck_jump:['Stand with feet hip-width apart.','Jump and pull the knees toward the chest.','Land softly on the balls of the feet.','Go straight into the next jump.'],
  thruster:['Hold dumbbells at the shoulders.','Squat to parallel.','Drive up and press overhead in one motion.','Lower to the shoulders as you sit into the next rep.'],
  step_back_curl:['Hold dumbbells at the sides.','Step back into a reverse lunge.','Curl the weights at the bottom of the lunge.','Lower and step back up.'],
  press_out:['Hold a plate or dumbbell at the chest with both hands.','Press it straight out to arm’s length.','Pause and squeeze.','Bring it back to the chest.'],
  scap_pull_hang:['Hang from the bar with straight arms.','Pull the shoulder blades down and back.','Keep the elbows straight.','Hold as long as you can.'],
  incline_db_curl:['Lie back on an incline bench, arms hanging straight down.','Tense the triceps at the bottom.','Curl without moving the elbows forward.','Lower slowly to a full stretch.'],
  plyo_pushup:['Lower into a push-up.','Push so hard the hands leave the floor.','Clap if you can.','Land softly and go into the next rep.'],
  landmine_row:['Stand beside the end of a landmine bar and hinge forward.','Grip the bar end with one hand.','Row it to the hip.','Lower slowly and finish the side.'],
  wide_arc_press:['Hold dumbbells at the shoulders.','Press up in a wide arc out to the sides.','Bring them together over the head.','Lower along the same arc.'],
  rear_delt_row:['Set a cable at chest height with a rope or two handles.','Row toward the face with the elbows high and wide.','Squeeze the rear delts.','Return slowly.'],
  split_squat:['Stand in a long split stance holding dumbbells.','Drop the back knee straight down.','Keep the torso tall.','Drive up through the front foot.'],
  ball_ghr:['Kneel with the heels anchored under a pad or by a partner.','Keep the hips straight and lower the torso forward.','Go as far as you control.','Pull back up with the hamstrings.'],
  ball_ham_curl:['Lie on your back with the heels on a ball.','Lift the hips into a bridge.','Curl the ball toward the glutes.','Roll it back out without dropping the hips.'],
  double_under:['Jump a little higher than for single skips.','Spin the rope fast from the wrists.','Pass the rope twice under the feet per jump.','Land softly and keep a rhythm.'],
  kickthrough:['Start on hands and feet with the knees just off the floor.','Lift one hand and rotate the hips.','Kick the opposite leg through underneath.','Return and switch sides.'],
  spider_curl:['Lie chest-down on an incline bench.','Let the arms hang straight down.','Curl up and squeeze hard at the top.','Lower slowly.'],
  dead_hang:['Grip the bar with straight arms.','Keep the shoulders active, not shrugged to the ears.','Hold as long as you can.','Note the time.'],
  mountain_climber:['Start in a push-up position.','Drive one knee toward the chest.','Switch legs quickly.','Keep the hips low.'],
  chin_hold:['Take an underhand grip on the bar.','Pull up to the position the set calls for.','Hold it without moving.','Lower slowly when the time is up.'],
  landmine_press:['Hold the end of a landmine bar at the shoulder.','Press it up and forward.','Lock out the arm.','Lower under control.'],
  front_raise:['Hold dumbbells in front of the thighs.','Raise them straight ahead to shoulder height.','Pause.','Lower slowly.'],
  floor_fly:['Lie on the floor with dumbbells over the chest.','Open the arms with a slight elbow bend.','Stop when the elbows touch the floor.','Squeeze back together over the chest.'],
  scaption:['Hold dumbbells with the thumbs up.','Raise them at an angle slightly forward of the sides.','Stop at shoulder height.','Lower slowly.'],
  shrug:['Hold a bar or dumbbells at the sides.','Shrug the shoulders straight up.','Pause at the top.','Lower slowly.'],
  bench_dip:['Put the hands on a bench behind you, feet out in front.','Lower until the elbows are about 90°.','Press back up.','Raise the feet to make it harder.'],
  wall_sit:['Lean the back against a wall.','Slide down until the thighs are parallel.','Keep the knees over the ankles.','Hold for the time.'],
  band_pull_apart:['Hold a band at shoulder height with straight arms.','Pull it apart to the chest.','Squeeze the shoulder blades.','Return slowly.'],
  core_cinch:['Lift the pelvic floor, as if stopping the flow of urine.','Draw the navel in, as if stepping into cold water.','Keep breathing normally.','Hold the cinch in the position of the day.'],
  core_cinch_move:['Set the cinch: pelvic floor up, navel in.','Add the small movement of the day.','Keep the belly flat the whole time.','Stop the rep if the belly pushes out.'],
  leg_lower_test:['Lie on your back with the legs straight up.','Set the cinch and press the low back into the floor.','Lower the legs slowly.','Note the angle where the low back lifts.']
});

/* =================== Double Your Max Pull-Ups in 22 Days =================== */
{const P='ax_pullups',days=[];
 const test=()=>[G('A · max test'),I('pullups','1 × F','one all-out set · this number is your max'),
   G('Rest'),{n:'Rest 120 sec',s:''},
   G('B · AMRAP 5'),I('pullups','1 × AMRAP','as many as you can in 5 min · max + these = your test total')];
 const ACC=[['chinups','1 × 2× max','2× your last max in total · rest-pause, never to failure','Chin-ups + pull-ups'],
   ['commando_pullup','1 × 2× max','2× your last max in total · rest-pause, never to failure','Commandos + pull-ups'],
   ['scap_pull_hang','1 × F','hang as long as you can · note the time','Scap hangs + pull-ups']];
 const PCT=[40,50,60];
 for(let b=1;b<=5;b++){const d0=(b-1)*4;
   days.push(D(`${P}_d${d0+1}`,`Block ${b} · Day ${d0+1}`,'Test day',test(),'~10 min'));
   ACC.forEach((a,i)=>days.push(D(`${P}_d${d0+2+i}`,`Block ${b} · Day ${d0+2+i}`,a[3],[
     G('A · accessory · rest 2 min after'),I(a[0],a[1],a[2]+(b>1?' · or another pull-up accessory':'')),
     G('B · pull-ups'),I('pullups',`1 × max +${PCT[i]} %`,`last max + ${PCT[i]} % in total · rest-pause, never to failure`)],'~15 min')));}
 days.push(D(`${P}_d21`,'Final · Day 21','Final test 1',[G('5-minute test · AMRAP 5'),I('pullups','1 × AMRAP','goal: your day-1 test total inside 5 min')],'5 min'));
 days.push(D(`${P}_d22`,'Final · Day 22','Final test 2',[G('Max test'),I('pullups','1 × F','one all-out set · goal: 1.5–2× your day-1 max')],'~5 min'));
 R.program({id:P,n:'Double Your Max Pull-Ups',sub:'Pull-ups · 22 days · test, then three volume days',shape:'days',group:GRP,by:BY,
   type:['Calisthenics','Pull-ups','Test day'],note:'Every fourth day is a test. Volume days use your latest max: split the reps into mini-sets and never go to failure.',days},
 `<h2 id="infoTitle">Double Your Max Pull-Ups</h2>
  <p class="by">Jeff Cavaliere · Athlean-X · 22-day plan</p>
  <span class="pill2">22 days</span><span class="pill2">Test every 4th day</span><span class="pill2">Rest-pause volume</span>
  <h4>What it is</h4>
  <p>Five four-day blocks and two final tests. Each block opens with a test, then three volume days that are set from that test. The targets climb every day, so the bar never feels the same twice.</p>
  <h4>How to run it</h4>
  <ul><li><b>Test day.</b> One max set, 2 minutes rest, then as many pull-ups as you can in 5 minutes. Max plus those reps is your test total.</li>
   <li><b>Volume days.</b> An accessory for 2× your max in total, 2 minutes rest, then pull-ups for your max plus 40, 50 or 60 %. Break the reps into small sets and stop each one short of failure.</li>
   <li><b>Accessories.</b> Block one uses chin-ups, commando pull-ups and scap hangs. Later blocks keep the same slots; swap in another pull-up accessory if you like.</li>
   <li><b>Day 21.</b> Try to match your day-1 test total in just 5 minutes.</li>
   <li><b>Day 22.</b> One max set. The goal is at least 1.5×, up to 2×, your day-1 max.</li></ul>`);}

/* =================== 22 Days to a Flat Stomach =================== */
{const P='ax_flat',days=[];
 const POS=[['Lying flat','on your back, knees bent'],['Hollowed out','shoulders just off the floor'],['V-sit','on the tailbone, knees bent'],['Plank','forearm plank · pull the belly up'],
   ['Elevated plank','hands on a bench or chair'],['Tall kneeling','kneel upright'],['Standing','stand tall']];
 const MOV=[['Lying flutter','small leg flutters'],['Hollow rock','rock in the hollow position'],['V-sit drift','hands drift side to side'],['Step-out plank','step one foot out at a time'],
   ['Elevated knee drive','slow knees toward the elbows'],['Kneeling lateral walk','walk the hands side to side'],['Standing side step','step side to side']];
 const test=n=>[G('Assessment'),I('leg_lower_test','1 × 1','note the angle where the low back lifts'+(n?' · compare with day 0':'')),
   I(F('Side photo, relaxed'),'','stand normally, photo from the side')];
 days.push(D(`${P}_d0`,'Day 0','Assessment',test(0),'~5 min',false));
 POS.forEach((p,i)=>days.push(D(`${P}_d${i+1}`,`Phase 1 · Day ${i+1}`,p[0],[G('Static cinch · 3 times today'),I('core_cinch','10 × 20 s',p[1])],'3 × ~5 min',false)));
 MOV.forEach((m,i)=>days.push(D(`${P}_d${i+8}`,`Phase 2 · Day ${i+8}`,m[0],[G('Moving cinch · 3 times today'),I('core_cinch_move','20 × 10 s',m[1])],'3 × ~5 min',false)));
 POS.forEach((p,i)=>days.push(D(`${P}_d${i+15}`,`Phase 3 · Day ${i+15}`,`${p[0]} + ${MOV[i][0].toLowerCase()}`,[G('Static + moving · 3 times today'),
   I('core_cinch','5 × 20 s',p[1]),I('core_cinch_move','5 × 20 s',MOV[i][1])],'3 × ~5 min',false)));
 days.push(D(`${P}_d22`,'Day 22','Re-test',test(1),'~5 min',false));
 R.program({id:P,n:'22 Days to a Flat Stomach',sub:'Deep core · 22 days · 3 short drills a day',shape:'days',group:GRP,by:BY,
   type:['Core','Bodyweight','Home'],note:'Do the day’s drill three times that day. Breathe normally while you hold the cinch.',days},
 `<h2 id="infoTitle">22 Days to a Flat Stomach</h2>
  <p class="by">Jeff Cavaliere · Athlean-X · free guide</p>
  <span class="pill2">22 days</span><span class="pill2">3 drills a day</span><span class="pill2">No equipment</span>
  <h4>What it is</h4>
  <p>A belly that pushes out is often a deep-core problem, not only fat. This plan trains the transverse abdominis and the pelvic floor to work together, first holding still, then moving, then both.</p>
  <h4>The cinch</h4>
  <ul><li><b>Pelvic floor.</b> Lift it, as if stopping the flow of urine.</li>
   <li><b>Deep abs.</b> Draw the navel in, as if stepping into cold water. Keep breathing.</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Day 0.</b> Leg lowering test and a side photo.</li>
   <li><b>Days 1–7, static.</b> 10 holds of 20 s in the day’s position, three times a day.</li>
   <li><b>Days 8–14, moving.</b> 20 bursts of 10 s of small movement while keeping the cinch.</li>
   <li><b>Days 15–21, both.</b> 5 static holds and 5 moving reps of 20 s in each position.</li>
   <li><b>Day 22.</b> Repeat the test. Success is a lower leg angle before the back lifts. Keep using the cinch in squats and deadlifts.</li></ul>`);}

/* =================== Hurricane Hypertrophy (NXT phase) =================== */
{const P='ax_hurricane';
 /* S.O.B. 320 → 2×10–12 → 4×6 → 2×10–12 → S.O.B. 160 */
 const H=(key,eb,n,sob,lt,hv)=>D(key,eb,n,[
   G('A · S.O.B. 320 · 40/20 X 8 Rounds'),I(sob[0],'8 × 40 s',sob[1]||'about half your 10–12 rep weight'),
   G('B · to failure · 60 s rest after 10–12, 90 s after 6'),I(lt[0],'2 × 10–12',lt[1]),I(hv[0],'4 × 6',hv[1]),I(lt[0],'2 × 10–12',lt[1]),
   G('C · S.O.B. 160 · 40/20 X 4 Rounds'),I(sob[0],'4 × 40 s','same weight as the 320s')],'~40 min');
 const W=[
  [['Biceps',['dbbicep'],['inverted_chin_curl'],['bbcurl']],
   ['Chest',['pushup','bodyweight'],['guillotine_press'],['wdips']],
   ['Back',['cd_lat_pulldown','dual-handle prone grip · band at home'],['row','bent over'],['wpullup','bodyweight is fine if that is hard enough']],
   ['Triceps',['cd_tri_pushdown','rope · band at home'],['cobra_pushup'],['skull_crusher','DBs · lying triceps extension']],
   ['Legs',['prisoner_jump_squat','plain prisoner squats if you can’t jump'],['oh_walking_lunge','per leg'],['dbbulgarian','per leg']]],
  [['Shoulders',['lateral_raise'],['cd_db_press','backwards variation'],['push_press','DB or barbell']],
   ['Biceps',['bbandcurl','stretch curl'],[F('DB shovel curls'),'one set to each side'],['db_band_curl']],
   ['Chest',['db_bench','DB or barbell'],['cable_crossover','3-D · per arm'],['dbincline','thumbs-up grip']],
   ['Back',['straight_arm_pushdown','band if no cable'],['sa_db_row'],['rack_pull_row','6 pulls + 6 rows per set']],
   ['Triceps',['tri_pushaway','band or cable'],['db_kickback','chest on a ball'],['wdips','upright · bodyweight if you’re tired']]],
  [['Legs',['three_way_lunge','alternate sides in each direction'],['step_up','weighted · per leg'],['sl_rdl','DB · per leg']],
   ['Shoulders',[F('Plate 8s'),'one light plate'],['lateral_raise','controlled cheat · per side'],['clean_press','DB or barbell']],
   ['Biceps',['no_money_curl'],['inverted_chin_curl','recline curl'],['chinups','biceps chin-up curl, slow hang on the way down']],
   ['Chest',['spiderman_pushup'],['cable_crossover','overhand X · band or cable'],['db_bench','alternating · per arm']],
   ['Back',['renegade_row'],['pullover'],['pullups','angled sliding: 3 to each side · add weight if easy']]],
  [['Triceps',['plank_updown','elbow-up plank'],['db_tucked_press'],['bw_tri_ext','vest or feet farther back for more']],
   ['Legs',['split_jump'],['sl_box_squat','bench-bottom single-leg squat'],['deadlift']],
   ['Shoulders',['cd_db_press'],[F('Shoulder L raises'),'5–6 per arm each way'],['hang_high_pull','DBs']]]];
 const DN=[['Mon','Tue','Wed','Fri','Sat'],['Mon','Tue','Wed','Fri','Sat'],['Mon','Tue','Wed','Fri','Sat'],['Mon','Tue','Wed']];
 const days=[];
 W.forEach((wk,w)=>wk.forEach((d,i)=>days.push(H(`${P}_w${w+1}d${i+1}`,`Week ${w+1} · ${DN[w][i]}`,d[0],d[1],d[2],d[3]))));
 days.push(D(`${P}_w4d4`,'Week 4 · Fri','Quake challenge',[
   G('Quake challenge · 40/20 X 1 Round'),
   I(F('Biceps plank curls'),'1 × 40 s','the 20 s “rest” is a plank · never break it'),I('pushup','1 × 40 s'),I('renegade_row','1 × 40 s'),
   I('cobra_pushup','1 × 40 s'),I(F('Squat thrusts'),'1 × 40 s'),I(F('Plank presses'),'1 × 40 s'),
   G('Score'),I(F('Quakes (plank breaks)'),'','0 is the best score · more than 5 is the lowest tier')],'~6 min'));
 R.program({id:P,n:'Hurricane Hypertrophy',sub:'Body-part split · 4 weeks · 5 days · timed burnouts around heavy 6s',shape:'days',group:GRP,by:BY,
   type:['Hypertrophy','Gym'],note:'Each session: a timed light burnout, 10–12s and heavy 6s to failure, then a shorter burnout with the same light weight.',days},
 `<h2 id="infoTitle">Hurricane Hypertrophy</h2>
  <p class="by">Jeff Cavaliere · Athlean-X NXT · training phase</p>
  <span class="pill2">4 weeks</span><span class="pill2">One muscle a day</span><span class="pill2">~40 min</span>
  <h4>What it is</h4>
  <p>One muscle group per session, hit with three kinds of work in one go: long timed sets for endurance and pump, moderate sets of 10–12, and heavy sets of 6. The order is a sandwich: light, medium, heavy, medium, light.</p>
  <h4>How to run it</h4>
  <ul><li><b>S.O.B. 320.</b> 40 s on, 20 s off, 8 rounds, with about half the weight you’d use for 10–12 reps.</li>
   <li><b>Middle work.</b> Every set to failure in its rep range. Rest 60 s after sets of 10–12 and 90 s after sets of 6.</li>
   <li><b>S.O.B. 160.</b> The same 40/20 with the same weight, 4 rounds. Cheat a few reps if you need to.</li>
   <li><b>Week.</b> Five sessions, Thursday and Sunday off. The muscle order changes every week.</li>
   <li><b>Quake challenge.</b> Six moves for 40 s each with a 20 s plank in between. Count the times you break the plank.</li></ul>`);}

/* =================== Special Tactix (NXT phase) =================== */
{const P='ax_tactix';
 const STR=(key,eb,n,gc,heavy,light,run)=>D(key,eb,n,[
   G(gc.hold?'A · gut check-in':'A · gut check-in · AMRAP 2'),gc.it,
   G('B · heavy · 5–6RM · 90 s rest'),...heavy,
   G('C · light calisthenics · 45–60 s rest'),...light,
   G('D · conditioning'),I('run','1 × '+run,'extra, but suggested'),
   G('E · grinder penalty'),I(F('Grinder penalty'),'','only if you missed the gut check · see the program notes')],'~60 min');
 const S1=[[I('deadlift','4 × F','5–6RM'),I('dbbulgarian','4 × F','5–6RM · per leg'),I('rdl','4 × F','stiff-legged · 5–6RM')],
   [I('pullups','3 × 15–20','band-assisted only if you can’t reach 15'),I('bw_tri_ext','3 × 15–20','walk the feet in to reach the reps'),I(F('Bodyweight side lateral raises'),'3 × 15–20','per arm · drop to the knees if needed')]];
 const S2=[[I('wchin','4 × 5','load so you fail near 5'),I('bench','4 × F','barbell or DB · 5–6RM'),I('ohp','4 × F','5–6RM')],
   [I('step_up','3 × 15–20','step-up into lunge · per leg'),I('long_leg_bridge','3 × 15–20','alternating march · per leg'),I('heel_touch_squat','3 × 15–20','per leg')]];
 const S3=[[I('backsquat','4 × F','5–6RM'),I('reverse_lunge','4 × F','alternating DB · 5–6RM · per leg'),I('hip_thrust','4 × F','5–6RM')],
   [I('chinups','3 × 15–20','band-assisted only if you can’t reach 15'),I('archer_pushup','3 × 15–20','knees down if needed'),I(F('Rear delt iron cross'),'3 × 15–20','bend the knees as needed')]];
 const S4=[[I('row','4 × F','5–6RM'),I('clean_press','4 × F','single-arm KB or DB · 5–6RM · per arm'),I('cd_incline_bench','4 × F','barbell or DB · 5–6RM')],
   [I('sprinter_lunge_leap','3 × 15–20','per leg'),I('three_way_lunge','3 × 7','7 each way: forward, side, drop step'),I('box_jump','3 × 15–20','ninja jumps from the knees · plain box jumps when tired')]];
 const GC=(e,s,nt)=>({it:I(e,s,nt)});
 const HIIT=(key,eb,n,jog,reps)=>{const it=[];for(let i=0;i<4;i++){it.push(G(`${L[i*2]} · jog`),I('run','1 × '+jog,'moderate pace'));
   if(i<3)it.push(G(`${L[i*2+1]} · sprints · 30/30 X ${reps} Rounds`),I('sprint_int',`${reps} × 30 s`,'all-out · 30 s easy between'));}
   return D(key,eb,n,it,'~25 min');};
 const CW=(key,eb,n,plank)=>{const pl=()=>I('plank','1 × 60 s',plank);
   return D(key,eb,n,[G('Core war · protect the base'),pl(),
     I('crunch','1 × F','21 crunch: right leg, left leg, both'),I('swing','1 × 25','KB or DB on end'),pl(),
     I('cd_situp','1 × F','butterfly sit-ups'),I('swing','1 × 50','rest as needed, but finish them'),pl(),
     I('cd_russian_twist','1 × F','from a V-up'),I('swing','1 × 75'),pl(),
     I('legraise','1 × F'),I('swing','1 × 100'),pl()],'~25 min');};
 const days=[
  STR(`${P}_w1d1`,'Week 1 · Mon','Strength 1 · heavy lower',GC('pushup','1 × 85','chest to the floor · goal 85 in 2 min'),...S1,'800 m'),
  HIIT(`${P}_w1d2`,'Week 1 · Tue','HIIT and run 1','800 m',3),
  CW(`${P}_w1d3`,'Week 1 · Wed','Core war 1','standard plank'),
  STR(`${P}_w1d4`,'Week 1 · Fri','Strength 2 · heavy upper',GC('prisoner_squat','1 × 85','goal 85 in 2 min'),...S2,'800 m'),
  HIIT(`${P}_w1d5`,'Week 1 · Sat','HIIT and run 2','400 m',5),
  STR(`${P}_w2d1`,'Week 2 · Mon','Strength 3 · heavy lower',{hold:1,it:I('flexed_arm_hang','1 × 70 s','goal 1 min 10 s')},...S3,'1.6 km'),
  D(`${P}_w2d2`,'Week 2 · Tue','Air raid 1',[G('Air raid · EMOM 20'),I('burpee','10 × 10','squat burpee with mule kick · even minutes'),I(F('Hanging taps'),'10 × 10','odd minutes · rest what’s left of each minute')],'20 min'),
  CW(`${P}_w2d3`,'Week 2 · Wed','Core war 2','one-arm, one-leg plank · switch each time'),
  STR(`${P}_w2d4`,'Week 2 · Fri','Strength 4 · heavy upper',GC('hip_buck','1 × 120','goal 120 in 2 min'),...S4,'1.6 km'),
  D(`${P}_w2d5`,'Week 2 · Sat','Air raid 2',[G('Air raid · EMOM 20'),I('legraise','10 × 10','even minutes'),I(F('Triple skyfall'),'10 × 7','odd minutes')],'20 min'),
  STR(`${P}_w3d1`,'Week 3 · Mon','Strength 1A · heavy lower',{hold:1,it:I('farmers_walk','1 × 2 min','half your bodyweight in each hand')},...S1,'2.4 km'),
  D(`${P}_w3d2`,'Week 3 · Tue','Swarm tactix 1',[G('Swarm · AMRAP 20'),I(F('Commando push-ups'),'5'),I('chinups','5'),I('box_jump','5')],'20 min'),
  CW(`${P}_w3d3`,'Week 3 · Wed','Core war 3','pendulum plank'),
  STR(`${P}_w3d4`,'Week 3 · Fri','Strength 2A · heavy upper',GC('box_jump','1 × 60','goal 60 in 2 min'),...S2,'2.4 km'),
  D(`${P}_w3d5`,'Week 3 · Sat','Swarm tactix 2',[G('Swarm · AMRAP 20'),I('commando_pullup','5'),I('divebomber_pushup','5'),I('tuck_jump','5','ninja tuck jumps')],'20 min'),
  STR(`${P}_w4d1`,'Week 4 · Mon','Strength 3A · heavy lower',GC(F('Mountain mules'),'1 × 50','goal 50 in 2 min'),...S3,'3.2 km'),
  D(`${P}_w4d2`,'Week 4 · Tue','Guerrilla warfare',[G('Circuit · 3 rounds'),
    I('step_back_curl','3 × 10','per side · ~25 % of bodyweight per hand'),I('press_out','3 × 10'),I('reverse_lunge','3 × 10','alternating · per side'),
    I('thruster','3 × 10'),I(F('Cyclone squats'),'3 × 10','per side'),
    G('Holds and penalty'),I(F('Isometric hold, elbows at 90°'),'','none in round 1 · 15 s between moves in round 2 · 30 s in round 3'),
    I('dead_hang','','10 s at the end for every time you put the weights down')],'~25 min'),
  CW(`${P}_w4d3`,'Week 4 · Wed','Core war 4','cliffhanger plank'),
  STR(`${P}_w4d4`,'Week 4 · Fri','Strength 4A · heavy upper',GC('burpee','1 × 55','goal 55 in 2 min'),...S4,'1.6 km'),
  D(`${P}_w4d5`,'Week 4 · Sat','Seek and destroy',[
    G('A · strength and power · 2–9 reps to failure'),
    I('ohp','1 × 2–9','estimate 1RM · 3 points at 1× bodyweight'),I('deadlift','1 × 2–9','3 points at 2.5× bodyweight'),
    I('bench','1 × 2–9','3 points at 1.5× bodyweight'),I('backsquat','1 × 2–9','3 points at 2× bodyweight'),
    I('run','1 × 400 m','3 points under 55 s'),
    G('Rest'),{n:'Rest 300 sec',s:''},
    G('B · push-ups · AMRAP 2'),I('pushup','1 × AMRAP','3 points at 90'),I('swing','1 × 30'),
    G('C · pull-ups · AMRAP 2'),I('pullups','1 × AMRAP','3 points at 30'),I('swing','1 × 30'),
    G('D · sit-ups · AMRAP 2'),I('cd_situp','1 × AMRAP','3 points at 110'),I('swing','1 × 30'),
    G('E · burpees · AMRAP 2'),I('burpee','1 × AMRAP','3 points at 55'),I('swing','1 × 30'),
    G('F · final run'),I('run','1 × 2.4 km','3 points under 9:00')],'~60 min')];
 R.program({id:P,n:'Special Tactix',sub:'Full body · 4 weeks · 2 strength days + bursts and core',shape:'days',group:GRP,by:BY,
   type:['Strength','Full body','Gym'],note:'Each strength day opens with a 2-minute gut check-in. Miss the goal and you owe grinder reps at the end.',days},
 `<h2 id="infoTitle">Special Tactix</h2>
  <p class="by">Jeff Cavaliere · Athlean-X NXT · training phase</p>
  <span class="pill2">4 weeks</span><span class="pill2">5 days a week</span><span class="pill2">Test on the last day</span>
  <h4>What it is</h4>
  <p>Back-to-basics strength with an athlete’s engine. Two total-body days a week lead with heavy classic lifts for one half of the body and light calisthenics for the other. In between come burst conditioning days and a core day.</p>
  <h4>The week</h4>
  <ul><li><b>Mon</b> heavy lower, light upper · <b>Tue</b> burst · <b>Wed</b> core war · <b>Thu</b> off</li>
   <li><b>Fri</b> heavy upper, light lower · <b>Sat</b> burst · <b>Sun</b> off</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Heavy sets.</b> Use your 5–6RM and go to failure. 90 s rest.</li>
   <li><b>Light sets.</b> 15–20 reps, 45–60 s rest. Make the move easier to hit the reps.</li>
   <li><b>Gut check-in.</b> A 2-minute target first thing. Miss it and do penalty reps at the end in a hard hold position (push-up plank, bridge, hang or carry). The fewer reps you missed by, the bigger the multiplier: roughly 1× to 2× the reps you did.</li>
   <li><b>Core war.</b> A 60 s plank, then an ab move to failure and a growing set of swings (25, 50, 75, 100), back to the plank. The plank gets harder each week.</li>
   <li><b>Bursts.</b> Jog and sprint intervals, minute-on-the-minute sets and 20-minute AMRAPs.</li>
   <li><b>Seek and destroy.</b> Week 4 ends with a scored test: four lifts relative to bodyweight, a 400 m run, four 2-minute calisthenics tests with 30 swings after each, and a 2.4 km run. Each is worth 0–3 points, 30 in total.</li></ul>`);}

/* =================== Wolverine Beastmode (NXT phase) =================== */
{const P='ax_beast';
 const fc=(e,nt,p)=>I(e,'5–7 × 4–5','FC25: 25 reps in as few sets as you can · up to 2 min rest at each failure'+(nt?' · '+nt:''),p===0?null:85);
 const neg=(e,nt)=>I(e,'1 × F','negative-only · slow lowering'+(nt?' · '+nt:''));
 const pairs=(list)=>{const it=[];list.forEach((x,i)=>{it.push(G(`${L[i]} · ${x.length>1?'FC25 → negatives · 2 min rest':'FC25'}`),...x);});return it;};
 const ai=(e,sets,hold,nt)=>I(e,`${sets} × 8–12`,`ascending ISO: hold ${hold} before rep 1, 1 s longer each rep`+(nt?' · '+nt:''));
 const LO='25–50 % lighter than your 10–12RM';
 const burst=(list)=>{const it=[];list.forEach((x,i)=>{it.push(G(`${L[i]} · ${x.length>1?'ascending ISO → burst · 60–90 s rest':'ascending ISO · 60–90 s rest'}`),...x);});return it;};
 const st=(e,s,nt)=>I(e,s,'accelerate, then squeeze 2 s at the top'+(nt?' · '+nt:''));
 const rr=(e,nt)=>I(e,'1 × F','rapid reps: fast, no momentum'+(nt?' · '+nt:''));
 const days=[
  D(`${P}_p1d1`,'Phase 1 · Mon','Biceps · animal strength',pairs([[fc('bbcurl'),neg('inverted_chin_curl')],[fc('wchin','behind the neck'),neg('inverted_chin_curl')],[fc('incline_db_curl','tense the triceps at the bottom'),neg('inverted_chin_curl')]]),'~45 min'),
  D(`${P}_p1d2`,'Phase 1 · Tue','Chest · animal strength',pairs([[fc('dbincline','thumbs-up grip'),neg('wdips')],[fc('cable_crossover','3-D · per arm, alternate without rest'),neg('wdips')],[fc('wdips'),neg('wdips')],[I('plyo_pushup','1 × 25','springboard push-ups · 25 in as few sets as you can')]]),'~50 min'),
  D(`${P}_p1d3`,'Phase 1 · Wed','Back · animal strength',pairs([[fc('wpullup','creeping pull-ups'),neg('wpullup')],[fc('pullover'),neg('wpullup')],[fc('landmine_row','per arm · alternate without rest'),neg('wpullup')],[fc('straight_arm_pushdown','rope, bar or band')]]),'~50 min'),
  D(`${P}_p1d4`,'Phase 1 · Fri','Shoulders · animal strength',pairs([[fc('wide_arc_press'),neg('cd_db_press','two up, one down: press with both, lower with one')],[fc('lateral_raise'),neg('cd_db_press','two up, one down')],[fc('press_out','plate or DB'),neg('cd_db_press','two up, one down')],[fc('rear_delt_row')]]),'~50 min'),
  D(`${P}_p1d5`,'Phase 1 · Sat','Legs · animal strength',pairs([[fc('split_squat','drop into each rep · per leg'),neg('ball_ghr')],[fc('backsquat','pull the bar down into the back as you squat'),neg('ball_ghr')],[fc('step_up','DB · per leg'),neg('ball_ghr')],[fc('rdl','stiff-legged')]]),'~55 min'),
  D(`${P}_p1d6`,'Phase 1 · Mon','Triceps · animal strength',pairs([[fc('db_tucked_press'),neg('bw_tri_ext')],[fc('skull_crusher','lying triceps extension'),neg('bw_tri_ext')],[fc('cd_tri_pushdown','rope'),neg('bw_tri_ext')]]),'~45 min'),
  D(`${P}_p2d1`,'Phase 2 · Tue','Biceps · stalking',burst([[ai('bbcurl',4,'mid-rep',LO),I('double_under','1 × 35')],[ai('chinups',4,'in the lower third','behind the neck'),I('double_under','1 × 35')],[ai('incline_db_curl',4,'mid-rep','25 % lighter than your 10–12RM'),I('double_under','1 × 35')]]),'~40 min'),
  D(`${P}_p2d2`,'Phase 2 · Wed','Chest · stalking',burst([[ai('dbincline',4,'at 90°',LO+' · thumbs-up'),I('box_jump','1 × 25')],[ai('cable_crossover',3,'early in the rep','3-D · per arm'),I('box_jump','1 × 25')],[ai('dips',4,'at 90°','add weight to fail at 10–12'),I('box_jump','1 × 25')],[I('plyo_pushup','1 × F','clapping · one ascending ISO, one descending ISO, then reps to failure')]]),'~45 min'),
  D(`${P}_p2d3`,'Phase 2 · Fri','Back · stalking',burst([[ai('pullups',3,'mid-rep','creeping · add weight if needed'),I('kickthrough','1 × 20','per side')],[ai('pullover',4,'at the bottom',LO),I('kickthrough','1 × 20','per side')],[ai('landmine_row',3,'mid-rep','per arm · 25 % lighter'),I('kickthrough','1 × 20','per side')],[ai('straight_arm_pushdown',4,'in the top third','25 % lighter')]]),'~45 min'),
  D(`${P}_p2d4`,'Phase 2 · Sat','Shoulders · stalking',burst([[ai('wide_arc_press',4,'at the bottom',LO),I('swing','1 × 30','KB or DB')],[ai('lateral_raise',3,'early in the rep',LO),I('swing','1 × 30')],[ai('press_out',4,'early in the rep',LO),I('swing','1 × 30')],[ai('rear_delt_row',3,'at the peak squeeze',LO)]]),'~45 min'),
  D(`${P}_p2d5`,'Phase 2 · Mon','Legs · stalking',burst([[ai('split_squat',3,'at the bottom',LO+' · per leg'),I('burpee','1 × 30')],[ai('backsquat',4,'at the bottom','pulldown squat · '+LO),I('burpee','1 × 30')],[ai('step_up',3,'in the top third','step-down hold into step-up · per leg'),I('burpee','1 × 30')],[ai('rdl',4,'in the lower third','stiff-legged · '+LO)]]),'~50 min'),
  D(`${P}_p2d6`,'Phase 2 · Tue','Triceps · stalking',burst([[ai('db_tucked_press',4,'early in the rep',LO),I('farmers_walk','1 × F','uneven weights · walk to fatigue')],[ai('skull_crusher',4,'at the bottom',LO),I('farmers_walk','1 × F','uneven weights')],[ai('cd_tri_pushdown',4,'early in the rep',LO),I('farmers_walk','1 × F','uneven weights')]]),'~40 min'),
  D(`${P}_p3d1`,'Phase 3 · Wed','Biceps · ruthless aggression',burst([[st('bbcurl','4 × 10–12'),rr('bbcurl','half your working weight')],[st('chinups','4 × F','behind the neck'),rr('bbcurl','half your working weight')],[st('incline_db_curl','4 × 10–12'),rr('bbcurl','half your working weight')]]).map(x=>x.grp?{grp:x.grp.replace('ascending ISO','stick it').replace('burst','rapid reps')}:x),'~40 min'),
  D(`${P}_p3d2`,'Phase 3 · Fri','Chest · ruthless aggression',[G('A · stick it → rapid reps · 60–90 s rest'),st('dbincline','4 × 10–12','thumbs-up'),rr(F('Lizard-walk push-ups')),
    G('B · stick it → rapid reps'),st('cable_crossover','3 × 10–12','3-D · per arm'),rr(F('Lizard-walk push-ups')),
    G('C · stick it → rapid reps'),st('dips','4 × F'),rr(F('Lizard-walk push-ups')),
    G('D · stick it'),st(F('Fingertip follow-through push-ups'),'3 × F')],'~40 min'),
  D(`${P}_p3d3`,'Phase 3 · Sat','Back · ruthless aggression',[G('A · stick it → rapid reps · 60–90 s rest'),st('pullups','3 × F','creeping'),rr(F('Band jackhammers')),
    G('B · stick it → rapid reps'),st('pullover','4 × 10–12'),rr(F('Band jackhammers')),
    G('C · stick it → rapid reps'),st('landmine_row','3 × 10–12','per arm'),rr(F('Band jackhammers')),
    G('D · stick it'),st('straight_arm_pushdown','4 × 10–12')],'~40 min'),
  D(`${P}_p3d4`,'Phase 3 · Mon','Shoulders · ruthless aggression',[G('A · stick it → rapid reps · 60–90 s rest'),st('wide_arc_press','4 × 10–12'),rr('cd_db_press','light DBs, fast presses'),
    G('B · stick it → rapid reps'),st('lateral_raise','3 × 10–12'),rr('cd_db_press','light DBs'),
    G('C · stick it → rapid reps'),st('press_out','3 × 10–12'),rr('cd_db_press','light DBs'),
    G('D · stick it'),st('rear_delt_row','4 × 10–12')],'~40 min'),
  D(`${P}_p3d5`,'Phase 3 · Tue','Legs · ruthless aggression',[G('A · stick it → rapid reps · 60–90 s rest'),st('split_squat','3 × 10–12','per leg'),rr('split_jump'),
    G('B · explode → rapid reps'),I('dbjumpsquat','4 × 10–12','accelerate through the top'),rr('split_jump'),
    G('C · explode → rapid reps'),I('step_up','3 × 10–12','jumping step-ups · per leg'),rr('split_jump'),
    G('D · stick it'),st('rdl','4 × 10–12','stiff-legged')],'~45 min'),
  D(`${P}_p3d6`,'Phase 3 · Wed','Triceps · ruthless aggression',[G('A · stick it → rapid reps · 60–90 s rest'),st('db_tucked_press','4 × 10–12'),rr('cd_diamond_pushup','diamond cutter'),
    G('B · stick it → rapid reps'),st('skull_crusher','4 × 10–12'),rr('cd_diamond_pushup'),
    G('C · stick it → rapid reps'),st('cd_tri_pushdown','4 × 10–12','rope'),rr('cd_diamond_pushup')],'~40 min'),
  D(`${P}_p3d7`,'Phase 3 · Fri','X-Man challenge',[
    G('Cyclops'),I(F('Hanging bat crunches'),'40'),
    G('Toad'),I(F('Lateral frog hops'),'30'),I(F('Frog crunches'),'50'),
    G('Storm'),I(F('Tornado chin-ups'),'25'),I(F('Tornado push-ups'),'25'),I(F('Tornado jump squats'),'25'),
    G('Magneto · one barbell at your 12RM curl weight'),I('frontsquat','20'),I('push_press','10'),I('row','20'),I('bbcurl','10'),
    G('Beast'),I(F('Hanging bat crunches'),'40'),I('thruster','10','same bar or DBs'),I(F('Lateral frog hops'),'30'),I('thruster','10'),
    I(F('Tornado push-ups'),'25'),I('thruster','10'),I('bbcurl','10'),I('thruster','10')],'for time · under 19 min is top tier')];
 R.program({id:P,n:'Wolverine Beastmode',sub:'Body-part split · 3 phases · force clusters, iso holds, then speed',shape:'days',group:GRP,by:BY,
   type:['Hypertrophy','Gym'],note:'Finish all sets of an exercise before its negatives, burst or rapid-reps set.',days},
 `<h2 id="infoTitle">Wolverine Beastmode</h2>
  <p class="by">Jeff Cavaliere · Athlean-X NXT · training phase</p>
  <span class="pill2">19 sessions</span><span class="pill2">3 phases</span><span class="pill2">Challenge to finish</span>
  <h4>What it is</h4>
  <p>Six body-part days, run three times with a new technique each round. First you move heavy weight, then you learn to control it from a dead stop, then you make every rep fast and finish it hard.</p>
  <h4>How to run it</h4>
  <ul><li><b>Phase 1, force clusters.</b> Use 85–90 % of your 1RM (about a 4–5RM) and get 25 reps in as few sets as possible, resting up to 2 minutes at each failure. Then a negative-only set to failure.</li>
   <li><b>Phase 2, ascending ISO.</b> Start each rep from a pause at the hardest point and make that pause 1 s longer each rep. Use 25–50 % less than your 10–12RM; you should fail at 8–12. After each exercise, go straight into the conditioning burst.</li>
   <li><b>Phase 3, stick it.</b> Use your 10–12RM, accelerate every rep and squeeze hard for 2 s at the top. After each exercise, a rapid-reps set to failure.</li>
   <li><b>Rest.</b> 60–90 s between sets in phases 2 and 3. Two days off each week.</li>
   <li><b>X-Man challenge.</b> Five circuits, each a move longer than the last, done in order for time.</li></ul>`);}

/* =================== Ultimate Arms =================== */
{const P='ax_arms',days=[];
 const DBL='1½ reps to failure (5–7), halve the weight, then try for twice as many';
 const PULL=(w,re)=>[G('A · upper pull · 60–90 s rest'),
   I('row','3 × 8–10','underhand dead rows: from the floor each rep'),
   I('landmine_row','3 × 10–12',w===1?'parallel grip · per arm':'offset, underhand · per arm'),
   I(w<3?'wpullup':'wchin','3–4 × F'),
   I('cd_lat_pulldown','3–4 × 10–12',w<4?'dual handles, palms forward':'dual handles, palms up'),
   I('facepull','3 × 12–15',w===5?'palms up':'cable or band'),...re];
 const PUSH=(w,re)=>[G('A · upper push · 60–90 s rest'),
   I(F('Reverse iron cross'),'3 × F'),
   I('dbincline','3–4 × 10–12',w===1?'':'squeeze press'),
   I(w<3?'wide_arc_press':'landmine_press','3–4 × 8–10'),
   I('wdips','3 × F',w<4?'planche lean':'upright, triceps focus'),
   I(w<5?F('Prowler push-ups'):'divebomber_pushup','3 × F'),...re];
 const RE=(g,it)=>[G(g),it];
 const BRE=[RE('B · biceps finisher',I('dbbicep','1 × F','21 rack salute: 7 bottom, 7 top, 7 full halves at each weight, then go down the rack')),
   RE('B · biceps finisher',I('spider_curl','1 × 100','blast and burn: ~20 % under your 12RM · 30–60 s rest at each failure')),
   RE('B · S.O.B. 320 · 40/20 X 8 Rounds',I('dbbicep','8 × 40 s','about half your 10–12RM')),
   RE('B · biceps finisher',I('bbcurl','1 × F','plyo step ladder: 1 explosive rep + 5 s hold, 2 reps + hold … to failure, then lighter, down to the bar')),
   RE('B · In10sity · 5 min',I('bbcurl','5 min','10–12RM · keep going for 5 min, max 15 s rest after each failure'))];
 const TRE=[RE('B · triceps finisher',I('cd_tri_pushdown','1 × F','run the stack: start just under your 10–12RM, drop a plate at each failure')),
   RE('B · triceps finisher',I('db_kickback','1 × 100','blast and burn: inverted · ~20 % under your 12RM')),
   RE('B · S.O.B. 320 · 40/20 X 8 Rounds',I('cd_tri_pushdown','8 × 40 s','about half your 10–12RM')),
   RE('B · triceps finisher',I('bw_tri_ext','1 × F','plyo step ladder: explosive reps + 5 s holds, then feet closer and repeat')),
   RE('B · In10sity · 5 min',I('cd_tri_pushdown','5 min','10–12RM · keep going for 5 min, max 15 s rest after each failure'))];
 const LEGA=[G('A · posterior chain · 60–90 s rest'),I('deadlift','4 × 8'),G('B · single leg'),I('dbbulgarian','4 × 10–12','per leg'),
   G('C · APEX circuit · 3 rounds · 90 s rest'),I('goblet_squat','3 × 12–15','crush the dumbbell'),I('sprinter_lunge','3 × 10','DBs · per leg'),I('swing','3 × 20','KB or DB')];
 const LEGB=[G('A · anterior chain · 60–90 s rest'),I('backsquat','4 × 8–10','high bar'),G('B · single leg'),I('sl_rdl','4 × 10–12','DB · per leg'),
   G('C · APEX circuit · 3 rounds · 90 s rest'),I('prisoner_squat','3 × 30'),I('hip_buck','3 × 30'),I('three_way_lunge','3 × 10','fast · 10 each direction')];
 const LEGC=[G('A · single leg · 60–90 s rest'),I('step_up','4 × 10–12','DB · per leg'),G('B · posterior chain'),I('hip_thrust','4 × 8–10'),
   G('C · APEX circuit · 3 rounds · 90 s rest'),I('oh_walking_lunge','3 × 12','per leg'),I('heel_touch_squat','3 × 12','DB · per leg'),I('tuck_jump','3 × F','ninja tuck jumps')];
 const ARMS=[
  [G('A · biceps · doubling sets · 60 s rest'),I('no_money_curl','3 × 5–7',DBL),I('spider_curl','3 × 5–7',DBL),I('cd_hammer_curl','3 × 5–7',DBL),
   G('B · triceps · doubling sets · 60 s rest'),I('db_tucked_press','3 × 5–7',DBL),I('db_kickback','3 × 5–7','inverted · '+DBL),I('dbtricep','3 × 5–7','on an incline bench · '+DBL)],
  [G('A · biceps combo 1 · 4 rounds · 60–90 s rest'),I('inverted_chin_curl','4 × F','fiber blast: pulse at the top'),I('incline_db_curl','4 × F','stretch reflex · tense the triceps first'),
   G('B · biceps combo 2 · 4 rounds'),I(F('3-D curls'),'4 × F','fiber blast'),I('incline_db_curl','4 × F','stretch reflex'),
   G('C · triceps combo 1 · 4 rounds'),I('cd_tri_pushdown','4 × F','rocking · fiber blast'),I('skull_crusher','4 × F','stretch reflex'),
   G('D · triceps combo 2 · 4 rounds'),I('cobra_pushup','4 × F','fiber blast'),I('skull_crusher','4 × F','stretch reflex')],
  [G('A · biceps CXC · 5 rounds · 30 s between · 60–90 s rest'),I('dbbicep','5 × F','alternating · 10–12RM'),I('chin_hold','5 × 1','eccentric drop: hold 40 s on, 20 off; 30 on, 30 off; 20 on, 40 off; then 10 s'),I('dbbicep','5 × F','half the first weight'),
   G('B · triceps CXC · 5 rounds · 30 s between'),I('db_tucked_press','5 × F','10–12RM'),I('bw_tri_ext','5 × 1','eccentric drop: same on/off holds as biceps'),I('db_tucked_press','5 × F','half the first weight')],
  [G('A · arm ladder · 5 rounds · 60–90 s rest'),I('dbbicep','5 × F','straight-bar style · 8–12RM'),I('db_tucked_press','5 × F'),I(F('3-D curls'),'5 × F'),I('cd_tri_pushdown','5 × F'),
   I('chinups','5 × F','biceps chin-up curl · assisted if needed'),I('cd_diamond_pushup','5 × F','diamond cutter'),I('bbandcurl','5 × F'),I('tri_pushaway','5 × F'),],
  [G('A · biceps · triple contraction · 60–90 s rest'),I('bbcurl','3 × F','lift to failure at 10–12RM, +10 % hold to failure, +10–20 % lower to failure'),
   I('chinups','3 × F','same three failures'),I(F('Dual lip busters'),'3 × F','same three failures'),
   G('B · triceps · triple contraction'),I('bw_tri_ext','3 × F','same three failures'),I(F('Reverse woodchopper extensions'),'3 × F'),I('cd_diamond_pushup','3 × F','diamond cutter')]];
 const NAMES=['Firing range','Fiber opt-X','CXC','Jeff’s ladder','Triple contraction'];
 const C4=[
  ['The pit',[G('Round 1 · 30 s rest after'),I('dead_hang','2 × 90 s'),I('skipping','2 × 100','two-foot hops'),
    G('Round 2 · 30 s rest after'),I('dead_hang','2 × 60 s'),I('skipping','2 × 200','50 high knees per leg + 100 two-foot hops'),
    G('Round 3 · 30 s rest after'),I('dead_hang','2 × 45 s'),I('skipping','2 × 125','50 high knees per leg + 25 rope squats'),
    G('Round 4 · 2 min rest, then all rounds once more'),I('dead_hang','2 × 30 s'),I('skipping','2 × 250','high knees, rope squats, 25 double unders, 100 hops'),
    G('The pit'),I('mountain_climber','','100 fingertip climbers each time you let go of the bar')]],
  ['Don’t drop the bell',[G('Circuit · 4 rounds · 60 s rest'),I('step_back_curl','4 × 10','KB or DB'),I('swing','4 × 30'),I('press_out','4 × 10','KB or DB'),I('swing','4 × 30'),I('thruster','4 × 10'),
    G('Penalty'),I('burpee','','5 for every time you put the bell down · all at the end')]],
  ['Heavy handed',[G('Circuit · 5 rounds · 60 s rest'),I(F('Barbell wring-outs, underhand'),'5 × 60 s','empty bar'),I(F('Barbell wring-outs, overhand'),'5 × 60 s'),
    I(F('Barbell wring-outs, switch grip'),'5 × 10','each way'),I('skipping','5 × 200','two-foot hops')]],
  ['Disarmed',[G('Circuit · 5 rounds · 60 s rest'),I('dead_hang','5 × 30 s'),I('oh_carry','5 × 30','steps · two DBs, ~20 % under your 10RM press'),I('deadlift','5 × 30','DBs'),
    I('farmers_walk','5 × 30','steps'),I('mountain_climber','5 × 50','fingertips · per leg'),I('pushup','5 × 25','fingertips'),
    G('Penalty'),I('double_under','','5 for every time you put the DBs down · all at the end')]],
  ['Home sweat home',[G('Circuit · 6 rounds · 60 s rest'),I('farmers_walk','6 × 30','steps out and back · as heavy as you can'),I('mountain_climber','6 × 90 s','fingertips'),
    I('kickthrough','6 × 60 s','alternating'),I('tuck_jump','6 × 30 s','ninja tuck jumps'),
    G('Penalty'),I(F('Extra sweat circuit'),'','one more circuit each time you drop the carry')]]];
 for(let w=1;w<=5;w++){
   days.push(D(`${P}_w${w}d1`,`Week ${w} · Mon`,'Arms · '+NAMES[w-1],ARMS[w-1],'~45 min'));
   days.push(D(`${P}_w${w}d2`,`Week ${w} · Tue`,'C-4 burst · '+C4[w-1][0],C4[w-1][1],'~30 min'));
   days.push(D(`${P}_w${w}d3`,`Week ${w} · Wed`,'APEX legs',w===5?LEGC:(w%2?LEGA:LEGB),'~45 min'));
   days.push(D(`${P}_w${w}d4`,`Week ${w} · Thu`,'Upper pull + biceps',PULL(w,BRE[w-1]),'~50 min'));
   days.push(D(`${P}_w${w}d5`,`Week ${w} · Fri`,'Upper push + triceps',PUSH(w,TRE[w-1]),'~50 min'));}
 days.push(D(`${P}_w6d1`,'Week 6 · Mon','Upper body touch-up',[G('Straight sets · 60–90 s rest'),I('pullover','3 × 12–15','lats'),I('cable_crossover','3 × 12–15'),
   I('lateral_raise','3 × 12–15'),I('front_raise','3 × 12–15'),I('pullover','3 × 12–15','chest')],'~40 min'));
 days.push(D(`${P}_w6d2`,'Week 6 · Tue','APEX legs · explosive',[G('A · explosive front · 60–90 s rest'),I('step_up','4 × F','step-up thrust · per leg'),
   G('B · explosive back'),I(F('Skier hop switch'),'4 × F','KB or DB'),
   G('C · APEX circuit · 3 rounds · 90 s rest'),I('goblet_squat','3 × 12–15','crush the dumbbell'),I(F('Long-leg plank marches'),'3 × 20','per leg'),I('split_jump','3 × F')],'~40 min'));
 days.push(D(`${P}_w6d3`,'Week 6 · Wed','C-4 burst · Fatal fore',[G('4 rounds · a move each minute, then 1 min rest · EMOM 20'),
   I(F('Skier hops'),'4 × 60 s','KB or DB'),I(F('Skier hop switch'),'4 × 60 s'),I('swing','4 × 60 s'),I('swing','4 × 60 s','switch hands'),
   G('Penalty'),I(F('KB hold, elbows at 90°'),'','20 s at the end for every rest you took')],'~25 min'));
 days.push(D(`${P}_w6d4`,'Week 6 · Fri','Armageddon challenge',[
   G('A · biceps · EMOM 24'),I('bbcurl','6 × 5–10','minute 1 of each round · 10RM · 5 reps, then 1 more each round'),
   I('dbbicep','6 × 10','minute 2 · half your 10RM'),I('bbandcurl','6 × 60 s','minute 3 · then rest until the round ends'),
   G('B · triceps · EMOM 24'),I('skull_crusher','6 × 5–10','minute 1 · 10RM · 5 reps, then 1 more each round'),
   I('cd_tri_pushdown','6 × 10','minute 2 · half your 10RM'),I('tri_pushaway','6 × 60 s','minute 3')],'~50 min · max score 36'));
 R.program({id:P,n:'Ultimate Arms',sub:'Arms focus · 6 weeks · 5 days · a new arm technique each week',shape:'days',group:GRP,by:BY,
   type:['Hypertrophy','Arms','Gym'],note:'Monday is the big arm day. Pull and push days end with a biceps or triceps finisher.',days},
 `<h2 id="infoTitle">Ultimate Arms</h2>
  <p class="by">Jeff Cavaliere · Athlean-X · 6-week program</p>
  <span class="pill2">6 weeks</span><span class="pill2">5 days a week</span><span class="pill2">Challenge in week 6</span>
  <h4>What it is</h4>
  <p>A full-body plan that puts the arms first. Monday is a dedicated arm workout with a new technique every week. Tuesday is grip and conditioning, Wednesday legs, and Thursday and Friday are upper-body strength days that each end with an arm finisher.</p>
  <h4>The week</h4>
  <ul><li><b>Mon</b> arms · <b>Tue</b> C-4 burst (grip + conditioning) · <b>Wed</b> APEX legs</li>
   <li><b>Thu</b> pull + biceps · <b>Fri</b> push + triceps · weekend off</li></ul>
  <h4>Arm techniques</h4>
  <ul><li><b>Doubling sets.</b> 1½ reps with your 10–12RM to failure, halve the weight, try for twice the reps.</li>
   <li><b>Fiber blast + stretch reflex.</b> A pulsing set at the top of the range, then a set in the stretched position.</li>
   <li><b>CXC.</b> A set to failure, a timed hold that gets shorter, then the same lift at half weight.</li>
   <li><b>Ladder.</b> Biceps and triceps moves back to back for 5 rounds, 8–12 reps each.</li>
   <li><b>Triple contraction.</b> Fail lifting, then holding with 10 % more, then lowering with 10–20 % more.</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Legs.</b> One bilateral lift, one single-leg lift, then a three-move circuit for 3 rounds.</li>
   <li><b>Rest.</b> 60–90 s between straight sets. Circuits move from move to move with no rest.</li>
   <li><b>Penalties.</b> Some burst days add burpees or extra work for every time you drop the weight.</li>
   <li><b>Week 6.</b> Back off the arms, then the Armageddon challenge on Friday: a curl and a triceps round, each scored by the minutes you complete.</li></ul>`);}

/* =================== Inferno Size =================== */
{const P='ax_inferno',days=[];
 /* phase 1 · XV-10 */
 const XV={cb:[['cd_incline_bench','DB or barbell'],['row','underhand']],qh:[['backsquat'],['deadlift']],bt:[['bbcurl'],['skull_crusher','EZ bar or DBs']],st:[['cd_db_press','DBs'],['hang_high_pull','DBs']]};
 const PP={cb:[I('pushup','1 × F','max reps, then 2× that within 4:30'),I('bw_row','1 × F','inverted rows · feet flat to make it easier · then 2× within 4:30')],
   qh:[I('prisoner_jump_squat','1 × F','max reps, then 2× that within 4:30'),I('ball_ham_curl','1 × F','max reps, then 2× within 4:30')],
   bt:[I('bw_row','1 × F','inverted chin rows, palms up · then 2× within 4:30'),I('bench_dip','1 × F','max reps, then 2× within 4:30')],
   st:[I('cd_db_press','1 × F','neutral grip · half your 12RM · then 2× within 4:30'),I('shrug','1 × F','seated DB · half your 12RM · then 2× within 4:30')]};
 const ISO={cb:[I('pushup','1 × max','hold a push-up 60 s, then reach your pro-pain max within 9 min · every break starts with a 30 s hold'),I('bw_row','1 × max','same, with an inverted-row hold')],
   qh:[I('prisoner_jump_squat','1 × max','wall sit 60 s, then reach your pro-pain max within 9 min · 30 s wall sit at every break'),I('ball_ham_curl','1 × max','same, with a long-leg bridge hold')],
   bt:[I('bw_row','1 × max','palms up · chin-curl hold 60 s, then your max within 9 min · 30 s hold at every break'),I('bench_dip','1 × max','same, with a bench dip hold')],
   st:[I('cd_db_press','1 × max','neutral grip · 45° lateral hold 60 s, then your max within 9 min'),I('shrug','1 × max','seated DB · shrug hold 60 s, then your max within 9 min')]};
 const XN={cb:'Chest / back',qh:'Quads / hamstrings',bt:'Biceps / triceps',st:'Shoulders / traps'};
 const xv=(k,w)=>{const sw=w%2===0,a=XV[k][sw?1:0],b=XV[k][sw?0:1],alt=w>=3;
   const A=I(a[0],'10 × 10',(a[1]?a[1]+' · ':'')+'60 % of 1RM',60),B=I(b[0],'10 × 5',(b[1]?b[1]+' · ':'')+'your 8RM, about 75 %',75);
   const fin=(w<3?PP:ISO)[k],f=sw?[fin[1],fin[0]]:fin;
   return [...(alt?[G('A · XV-10 · alternate the two lifts · 1 min rest'),A,B]:[G('A · XV-10 · 1 min rest between sets'),A,G('B · XV-10 · 3–5 min rest first, then 1 min'),B]),
     G((alt?'B':'C')+(w<3?' · pro-pain finishers':' · iso-pro-pain finishers')),...f];};
 const SAT1=[
  ['Burn ladder',[G('Burn ladder · minimal rest'),...[['pushup','push-up hold'],['prisoner_squat','squat hold'],['plank','pendulum plank, then plank'],['bw_row','squeeze at the top'],
    ['cd_db_press','seated · hold at 90°'],['cd_calf_raise','DB · hold on the toes'],['dbbicep','hold at 90°'],['shrug','hold the shrug']].map(x=>I(x[0],'5 × 5','5 reps, then hold 5, 10, 15, 20, 25 s · '+x[1]))]],
  ['El Diablo',[G('El Diablo · EMOM 10'),...[['pushup'],['box_jump'],[F('Diagonal jumping planks'),'left + right = 1'],['cd_diamond_pushup','diamond cutter'],['sprinter_lunge','bodyweight · left + right = 1'],
    ['burpee','squat burpees'],[F('Reverse corkscrews')],['renegade_row'],['thruster'],['dbbicep','straight-bar style']].map((x,i)=>I(x[0],'1 × AMRAP',`minute ${i+1}`+(x[1]?' · '+x[1]:'')))]],
  ['Fire and ice',[G('Fire and ice · EMOM 10'),I('burpee','5 × 10','fire minutes: sprawl burpees'),I(F('Twisting pistons'),'5 × 5','fire · per side'),I('divebomber_pushup','5 × 10','fire'),
    I('pullups','5 × 5','ice minutes'),I('legraise','5 × 5','ice · knee raises'),
    G('Options'),I(F('Fire and ice order'),'','hard: fire, ice, repeat · easier: fewer fire minutes, skip rope on ice minutes')]],
  ['You in 30 minutes',[G('Push · EMOM 10'),I('pushup','10 × 10','a harder push-up each minute: standard, prowler, archer, posted, rolling plyo, Hannibal, foot-plant, cliffhanger, hand-plant, then holds'),
    G('Pull · EMOM 10'),I('pullups','10 × 6','a new pull-up each minute: standard, commando, 1½, around the world, plyo, cyclone, front lever, one-arm assisted, headbanger, then slow'),
    G('Legs · EMOM 10'),I('jump_squat','10 × 10','a new leg move each minute: jump squat, drop-step lunge, tuck jump, 1½ squat, sprinter leap, lateral split jump, ninja tuck, levitation squat, 180 jump, then holds'),
    G('Score'),I(F('Minutes completed'),'','out of 30')]]];
 for(let w=1;w<=4;w++){
   ['cb','qh','bt','st'].forEach((k,i)=>{const n=w%2?XN[k]:XN[k].split(' / ').reverse().join(' / ');
     days.push(D(`${P}_w${w}d${i+1}`,`Week ${w} · ${['Mon','Tue','Thu','Fri'][i]}`,'XV-10 · '+n.toLowerCase().replace(/^./,c=>c.toUpperCase()),xv(k,w),'~60 min'));});
   days.push(D(`${P}_w${w}d5`,`Week ${w} · Sat`,(w<4?'10 minutes of torcher · ':'Challenge · ')+SAT1[w-1][0],SAT1[w-1][1],w<4?'~15 min':'30 min'));}
 /* phase 2 · AX-rson */
 const M={chest:['Chest','floor_fly','dbincline','bench'],tri:['Triceps',['db_kickback','inverted'],['dbtricep','incline'],'cg_bench'],
   quad:['Quads',['dbbulgarian','per leg'],'backsquat',['reverse_lunge','alternating DB']],ham:['Hamstrings','ball_ghr','hip_thrust',['rdl','stiff-legged']],
   sh:['Shoulders','scaption','cd_db_press',['clean_press','barbell']],trap:['Traps / upper back',['shrug','barbell'],'facepull',['hang_high_pull','DBs']],
   back:['Back','straight_arm_pushdown','cd_lat_pulldown','row'],bi:['Biceps','spider_curl',['dbbicep','straight-bar style'],'cd_hammer_curl']};
 const ex=x=>Array.isArray(x)?x:[x,''];
 const FIN={
  chest:[[I('dbincline','3 × F','pec purgatory: 8RM, middle of the range only'),I('dips','3 × 30 s','hold the bottom stretch'),I('cable_crossover','3 × F','squeeze until you burn out')],
    [I('floor_fly','3 × F','fire on the floor: 10RM'),I('db_bench','3 × F','floor press'),I('pullover','3 × F','upper-chest pullover')]],
  tri:[[I('cd_tri_pushdown','1 × F','steel moving: 12RM to failure, then 1½× that many without letting the stack rest · each 10 s break costs 3 reps')],
    [I(F('Pancake push-ups'),'3 × F','mechanical drop set, no rest'),I('cd_diamond_pushup','3 × F','diamond cutter'),I(F('Triceps trunk lifts'),'3 × F')]],
  quad:[[I('goblet_squat','1 × 100','liquid legs: 100 reps in total · DB = your one-arm press weight'),I('wall_sit','','1 min at the start of every other minute until the 100 are done')],
    [I('box_squat','1 × F','blast off: 1 box squat + 1 box jump, then 2 + 1, 3 + 1 … until you bail'),I('box_jump','','one after each squat set')]],
  ham:[[I('swing','1 × 100','asses to ashes: 100 swings with a heavy KB'),I('long_leg_bridge','','1 min hold at the start of every other minute')],
    [I('sprinter_lunge','2–3 × 12','3rd-degree lunges: DB 12RM · per leg · no rest'),I('sprinter_lunge_leap','2–3 × 12','per leg'),I('sprinter_lunge','2–3 × 12','bodyweight · per leg')]],
  sh:[[I('lateral_raise','1 × F','cannonball run: 8RM, down the rack to the lightest'),I('cd_db_press','1 × F','back up the rack to the start weight · push press if needed')],
    [I('rev_fly','3 × F','smoldering shoulders: 12RM bent laterals'),I('lateral_raise','3 × F'),I('front_raise','3 × F'),I('wide_arc_press','3 × F')]],
  trap:[[I(F('Overhead trap raises'),'3 × 30','inferno crossfire, no rest'),I('band_pull_apart','3 × 30'),I('shrug','3 × 30 s','DB hold at the top · 6–8RM')],
    [I('shrug','1 × 10','entrapment: leaning DB shrugs 10, 9, 8 … 1 · go lighter and add a rep each time you drop the DBs'),I('farmers_walk','','30 steps between shrug sets')]],
  back:[[I(F('Prone incline Y-T-I raises'),'3 × F','alphabet arson: 15RM on the Ys'),I('backext','3 × F','hold the top through the raises')],
    [I('pullover','8D8-7-6-5-4-3-2-1','ladder 8: 10RM'),I('pullups','8D1-2-3-4-5-6-7-8','one more each time')]],
  bi:[[I('dbbicep','1 × F','12RM to failure, then 1½× that many without putting the DBs down · each 10 s break costs 3 reps')],
    [I('chin_hold','3 × hold','fire pit: 45 s, 30 s, 20 s · alternate with the curl hold, no rest'),I('inverted_chin_curl','3 × hold','hold at the top · same times')]]};
 const ars=(k,w)=>{const m=M[k],x1=ex(m[1]),x2=ex(m[2]),x4=ex(m[3]),iso=w%2?x2:x1,nm=m[0];
   return [G(`${nm} · A · pair · 2 sets · 2 min rest`),I(x1[0],k==='quad'?'2 × F':'2 × 6–9',k==='quad'?'hold the bottom to failure · 6–9RM load · per leg · straight into the next':(x1[1]?x1[1]+' · ':'')+'6–9RM · straight into the next'),I(x2[0],'2 × 6–9',x2[1]),
     G(`${nm} · B · 3 sets · 90 s rest`),I(iso[0],'3 × 8',(iso[1]?iso[1]+' · ':'')+'10RM · then hold mid-rep to failure'),
     G(`${nm} · C · 5 sets · 60 s rest`),I(x4[0],'5 × 6–9',x4[1]),
     G(`${nm} · D · five-alarm finisher`),...FIN[k][w<7?0:1]];};
 const SAT2=[
  ['Bump and run',[G('Bump and run · AMRAP 15'),I('burpee','5'),I('run','100 m','sprint'),I('burpee','10'),I('run','200 m','sprint')],'15 min'],
  ['Sprint ladder',[G('Sprint ladder · for time'),I('run','1 × 800 m','warm-up jog'),I('sprint_int','7 × 100–400 m','100, 200, 300, 400, 300, 200, 100 m · jog the same distance after each · beginners stop after 400'),I('run','1 × 400–800 m','walk to cool down')],'~30 min'],
  ['Track attack',[G('One mile on a track · for time'),I('pushup','4 × F','at the start and after each sprinted straight'),I('sprint_int','6 × 100 m','sprint the straights'),
    I(F('The bends'),'6 × 100 m','lap 1 walk, lap 2 walking lunges, lap 3 walking slide squats'),I('run','1 × 400 m','lap 4: sprint the whole lap')],'~20 min'],
  ['Hot plate challenge',[G('Challenge · for time'),I(F('Plate throws downfield'),'2 × 100 yd','push-press throw, discus left, discus right · sprint to the plate · count throws'),
    I(F('Pinch-grip plate carry back'),'2 × 100 yd','one side, then the other · 15 push-ups each drop'),I('sprint_int','1 × 20 yd','throws ÷ 2 sprints to finish')],'~12 min']];
 for(let w=5;w<=8;w++){
   [['chest','tri','Chest + triceps','Mon'],['quad','ham','Quads + hamstrings','Tue'],['sh','trap','Shoulders + traps','Thu'],['back','bi','Back + biceps','Fri']].forEach((d,i)=>
     days.push(D(`${P}_w${w}d${i+1}`,`Week ${w} · ${d[3]}`,'AX-rson · '+d[2],[...ars(d[0],w),...ars(d[1],w)],'~75 min')));
   const s=SAT2[w-5];days.push(D(`${P}_w${w}d5`,`Week ${w} · Sat`,(w<8?'Metabolic arson · ':'Challenge · ')+s[0],s[1],s[2]));}
 /* phase 3 · Backfire */
 const TB={pushA:['TB push A',[['db_bench'],['dips','weighted if you can'],['thruster'],['frontsquat']]],pushB:['TB push B',[['floor_fly'],['lateral_raise','crossover raise'],['deadlift'],[F('DB Phelps press')]]],
   pullA:['TB pull A',[['cd_lat_pulldown','underhand'],['incline_db_curl','variable grip'],['shrug','seated DB'],['ball_ghr']]],pullB:['TB pull B',[['pullups','weighted if you can'],['bbcurl'],['hang_high_pull','DBs'],['rdl','stiff-legged, DB or barbell']]]};
 const AP={lin:['Linear locomotion',[I('run','1 × 1.6 km')]],sflex:['Static flexibility',[I(F('Static stretches: chest, triceps, shoulders, quads'),'4 × 30 s','each side')]],
   nonlin:['Non-linear locomotion',[I(F('Agility wheel'),'5–8 × 1','rounds')]],crawl:['Crawl',[I(F('Crawl series: alpine climbers, side kickthroughs, scorpions, crab reach'),'4 × 5','slow · per side')]],
   jump:['Jump',[I('skipping','1 × 700','200 two-foot, 100 right leg, 100 left leg, 100 high knees, 200 two-foot')]],
   sbal:['Static balance',[I(F('Balance holds, eyes closed'),'4 × 60 s','heel-to-toe arms out, right leg, heel-to-toe arms up, left leg')]],
   dbal:['Dynamic balance',[I(F('Single-leg jump and stick'),'4 × 10','tuck jumps in place, then side to side · each leg')]],
   dflex:['Dynamic flexibility',[I(F('Standing knee-to-chest, quad, piriformis, leg swing'),'2 × 10','each leg')]]};
 const tb=(t,ecc,fin)=>{const T=TB[t],it=[G(`${T[0]} · ${ecc?'eccentric · 6RM · 5 s lowering':'concentric · 12RM · slow lift'}`)];
   T[1].forEach(x=>it.push(I(x[0],ecc?'1 × 25':'1 × 50',(ecc?'25 total reps · flex the muscle 60 s each time you stop':'50 total reps · stretch 60 s each time you stop')+(x[1]?' · '+x[1]:''))));
   it.push(G('Athletic pillar · '+AP[fin][0]),...AP[fin][1]);return it;};
 const BF=[[9,[['Mon','pushA',0,'lin'],['Tue','pushA',1,'sflex'],['Thu','pullA',0,'nonlin'],['Fri','pullA',1,'crawl'],['Sun','pushB',0,'jump']]],
   [10,[['Mon','pushB',1,'sbal'],['Wed','pullB',0,'dbal'],['Thu','pullB',1,'dflex'],['Sat','pushA',0,'lin'],['Sun','pushA',1,'sflex']]],
   [11,[['Tue','pullA',0,'nonlin'],['Wed','pullA',1,'crawl'],['Fri','pushB',0,'jump'],['Sat','pushB',1,'sbal']]],
   [12,[['Mon','pullB',0,'dbal'],['Tue','pullB',1,'dflex']]]];
 BF.forEach(([w,list])=>list.forEach((d,i)=>days.push(D(`${P}_w${w}d${i+1}`,`Week ${w} · ${d[0]}`,`Backfire · ${TB[d[1]][0].slice(3)} · ${d[2]?'eccentric':'concentric'}`,tb(d[1],d[2],d[3]),'~50 min'))));
 days.push(D(`${P}_w12d3`,'Week 12 · Thu','Fireman’s carry challenge',[G('Four plates, 30 yd runway · for time'),
   I(F('Plate hug carry'),'4 × 30 yd','sprint back after each'),I('farmers_walk','2 × 30 yd','a plate in each hand · sprint back'),I('oh_carry','4 × 30 yd','one plate overhead · sprint back')],'goal under 4:30'));
 days.push(D(`${P}_w12d4`,'Week 12 · Fri','Final challenge · Towering inferno',[
   G('Round 1 · heavy · 10RM'),...[['db_bench'],['backsquat'],['ohp'],['bbcurl'],['cd_tri_pushdown','rope']].map(x=>I(x[0],'3 × 3','3 reps, then hold 5, 10, 15 s'+(x[1]?' · '+x[1]:''))),
   G('Round 2 · moderate · 15RM'),...[['db_bench'],['backsquat'],['ohp'],['bbcurl'],['cd_tri_pushdown','rope']].map(x=>I(x[0],'4 × 3','3 reps, then hold 5–20 s'+(x[1]?' · '+x[1]:''))),
   G('Round 3 · bodyweight'),...[['pushup'],['prisoner_jump_squat'],['pike_pushup'],['bw_row','palms up'],['cd_diamond_pushup','diamond cutter']].map(x=>I(x[0],'5 × 5','5 reps, then hold 5–25 s'+(x[1]?' · '+x[1]:''))),
   G('Score'),I(F('Floors climbed'),'','out of 15')],'~45 min'));
 R.program({id:P,n:'Inferno Size',sub:'Mass · 12 weeks · 3 phases · volume, then intensity, then reps',shape:'days',group:GRP,by:BY,
   type:['Hypertrophy','Percentage-based','Gym'],note:'Phase 1 runs off your 1RM. Save your 1RMs for incline bench, row, squat, deadlift, curl and shoulder press first.',days},
 `<h2 id="infoTitle">Inferno Size</h2>
  <p class="by">Jeff Cavaliere · Athlean-X · 12-week mass program</p>
  <span class="pill2">12 weeks</span><span class="pill2">5 days a week</span><span class="pill2">3 phases</span>
  <h4>What it is</h4>
  <p>A twelve-week size plan in three four-week phases. It starts with high volume at fixed percentages, moves to heavy pre-exhaust and isometric work with brutal finishers, and ends with long rep-target sets split into lifting-focused and lowering-focused days.</p>
  <h4>Phase 1 · ignition (weeks 1–4)</h4>
  <ul><li><b>XV-10.</b> Two lifts per day: 10 × 10 at 60 % and 10 × 5 at your 8RM (about 75 %). 1 min rest between sets, 3–5 min between the two lifts.</li>
   <li><b>Order.</b> Week 2 swaps which lift gets the 10s. Weeks 3–4 alternate the two lifts set by set.</li>
   <li><b>Pro-pain finishers.</b> Weeks 1–2: one max set, then twice that many reps within 4½ minutes. Weeks 3–4: a 60 s hold, then your old max within 9 minutes, with a 30 s hold at every break.</li>
   <li><b>Saturday.</b> A 10-minute conditioning burner, and a 30-minute push, pull and legs test in week 4.</li></ul>
  <h4>Phase 2 · growth (weeks 5–8)</h4>
  <ul><li><b>AX-rson.</b> Two muscles a day. For each: a pre-exhaust pair for 2 sets, 3 sets of 8 with your 10RM plus a hold to failure, 5 sets of 6–9, then a finisher.</li>
   <li><b>Saturday.</b> Runs and sprints, and a plate-throwing challenge in week 8.</li></ul>
  <h4>Phase 3 · max development (weeks 9–12)</h4>
  <ul><li><b>Backfire.</b> Four lifts per session for a total-rep target. Concentric days: 50 reps with your 12RM, slow on the way up, stretch whenever you stop. Eccentric days: 25 reps with your 6RM, 5 s lowering, flex whenever you stop.</li>
   <li><b>Athletic pillar.</b> Each session ends with running, agility, crawling, jumping, balance or mobility.</li>
   <li><b>Finish.</b> A plate-carry relay and the Towering Inferno: rep-and-hold rounds, heavy, moderate and bodyweight.</li></ul>`);}

/* =================== approaches =================== */
R.approach({id:'ax_athlete',by:BY,n:'Train like an athlete',
  short:'Heavy compound lifts moved fast, single-leg work, conditioning bursts between.',
  gp:{s:[3,4],r:[5,8],rest:90,rpe:8},fmt:'straight',prog:'double',
  cues:['move the weight fast','squeeze hard at the top'],
  prefer:'deadlift|squat|press|row|pull|lunge|step|jump|swing|clean|carry',
  details:'Train for performance and the look follows. Lead with a heavy compound lift and move it with speed, add single-leg and explosive work, and slip short conditioning bursts or carries between strength sets. Regular tests and challenges keep score. It is not slow bodybuilding volume, and it is not endless cardio either.'});
R.approach({id:'ax_layers',by:BY,n:'Layered rep ranges',
  short:'Light timed sets, then 10–12s, heavy 6s, back to 10–12s, then a short burnout.',
  gp:{s:[4,6],r:[6,12],rest:75,rpe:9},fmt:'straight',prog:'double',
  cues:['to failure in the rep range'],
  details:'One muscle, several rep ranges in one session: a light timed set (40 s on, 20 s off) to start, sets of 10–12, heavy sets of 6, more 10–12s, then a shorter timed set with the light weight. Each set goes to failure in its range. Rest about 60 s after the 10–12s and 90 s after the 6s. Best for body-part days when you want strength and size together.'});
R.approach({id:'ax_mech_drop',by:BY,n:'Mechanical drop sets',
  short:'At failure, switch to an easier version of the move and keep going without rest.',
  gp:{s:[2,3],r:[8,12],rest:90,rpe:10},fmt:'straight',prog:'reps',
  cues:['switch to an easier version','slow 3 s lowering'],
  prefer:'push-up|pushup|curl|lunge|raise|pushdown|extension|dip',
  details:'Take a set to failure, then change the angle, grip or leverage to a slightly easier variation and keep repping, with no weight change and no rest. Other intensity tricks fit the same idea: 1½ reps, slow 3 s lowering, isometric holds at the hardest point and short rest. Use it for the last exercises of a session, not for heavy compound lifts.'});
})();
