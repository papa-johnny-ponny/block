/* BLOCK. program pack: FitnessFAQs (Daniel Vadnal).
   Begin Bodyweight levels 1, 2, 4, 5 and 6 (level 3 is already in the app as `bbw`),
   the three Hybrid programs, Body by Rings, Handstand Pro strength phases 2–4 and the
   balance track (phase 1 is already in the app as `hspro`), and Home Hero.
   Sessions are stored as short strings and expanded by R() below:
     '#text'            group heading
     '!text'            free-text row
     'id sets reps/note' exercise row. sets 'a' = accumulate a total, 'c' = clock in minutes.
     reps suffix: s = seconds, m = minutes, L = per side, F = to failure. */
(function(){
const REG=BLOCK_REG,G='FitnessFAQs',BY='Daniel Vadnal';
REG.group(G,{blurb:'Daniel Vadnal, a physiotherapist, builds calisthenics in patient levels: eccentrics and bands first, skills practised fresh, weak links trained last.'});

/* ---------- exercises ---------- */
REG.ex({
  /* Begin Bodyweight */
  ecc_chinup:{n:'Eccentric Chin-Up',c:'bodyweight'},
  ecc_dip:{n:'Eccentric Dip',c:'bodyweight'},
  ecc_pushup:{n:'Eccentric Push-Up',c:'bodyweight'},
  ecc_pike_pushup:{n:'Eccentric Pike Push-Up',c:'bodyweight'},
  dip_shrug:{n:'Dip Shrug',c:'bodyweight'},
  plank:{n:'Plank',c:'bodyweight'},
  scap_pull:{n:'Scap Pull',c:'bodyweight'},
  scap_pushup:{n:'Scap Push-Up',c:'bodyweight'},
  arch_hold:{n:'Arch Body Hold',c:'bodyweight'},
  wall_slide:{n:'Wall Slide',c:'rec'},
  fr_wall_slide:{n:'Foam Roller Wall Slide',c:'rec'},
  shoulder_ext:{n:'Shoulder Extension',c:'aux'},
  stomach_wy:{n:'Stomach W-Y',c:'aux'},
  skin_the_cat:{n:'Skin the Cat',c:'skill'},
  /* Hybrid programs */
  pendlay_row:{n:'Pendlay Row',c:'weighted'},
  larsen_bench:{n:'Larsen Bench Press',c:'weighted'},
  spider_curl:{n:'DB Spider Curl',c:'weighted'},
  incline_db_curl:{n:'Incline DB Curl',c:'weighted'},
  db_fly:{n:'DB Chest Fly',c:'weighted'},
  db_kickback:{n:'DB Triceps Kickback',c:'weighted'},
  lu_raise:{n:'Lu Raise',c:'weighted'},
  lunge:{n:'Lunge',c:'weighted'},
  split_squat:{n:'Split Squat',c:'weighted'},
  single_leg_squat:{n:'Single-Leg Squat',c:'bodyweight'},
  bw_ham_curl:{n:'Bodyweight Hamstring Curl',c:'bodyweight'},
  band_ham_curl:{n:'Band Hamstring Curl',c:'banded'},
  band_leg_ext:{n:'Band Leg Extension',c:'banded'},
  band_pullover:{n:'Band Pullover',c:'banded'},
  band_lateral_raise:{n:'Band Lateral Raise',c:'banded'},
  bw_pullover:{n:'Bodyweight Pullover',c:'bodyweight'},
  bw_tricep_ext:{n:'Bodyweight Triceps Extension',c:'bodyweight'},
  vertical_pushup:{n:'Vertical Push-Up',c:'bodyweight'},
  ring_fly:{n:'Ring Chest Fly',c:'bodyweight'},
  ring_rear_fly:{n:'Ring Rear Delt Fly',c:'bodyweight'},
  ring_curl:{n:'Ring Biceps Curl',c:'bodyweight'},
  ring_pelican_curl:{n:'Ring Pelican Curl',c:'bodyweight'},
  /* Body by Rings */
  archer_pushup:{n:'Archer Push-Up',c:'bodyweight'},
  bulgarian_pushup:{n:'Bulgarian Ring Push-Up',c:'bodyweight'},
  shoulder_pushup:{n:'Ring Shoulder Push-Up',c:'bodyweight'},
  tricep_dip:{n:'Triceps Dip',c:'bodyweight'},
  ring_rollout:{n:'Ring Rollout',c:'bodyweight'},
  hs_shrug:{n:'Handstand Shrug',c:'skill'},
  hs_shoulder_tap:{n:'Wall Handstand Shoulder Tap',c:'skill'},
  hs_waist_tap:{n:'Wall Handstand Waist Tap',c:'skill'},
  mantle_chinup:{n:'Mantle Chin-Up',c:'bodyweight'},
  archer_chinup:{n:'Archer Chin-Up',c:'bodyweight'},
  archer_row:{n:'Archer Row',c:'bodyweight'},
  sa_ring_row:{n:'Single-Arm Ring Row',c:'bodyweight'},
  l_row:{n:'L-Sit Row',c:'bodyweight'},
  dead_hang:{n:'Dead Hang',c:'aux'},
  one_arm_hang:{n:'One-Arm Hang',c:'aux'},
  /* Handstand Pro strength */
  hspu_btw:{n:'Back-to-Wall Handstand Push-Up',c:'skill'},
  hspu_ctw:{n:'Chest-to-Wall Handstand Push-Up',c:'skill'},
  hspu_band:{n:'Band-Assisted Handstand Push-Up',c:'skill'},
  hspu_free:{n:'Freestanding Handstand Push-Up',c:'skill'},
  hspu_free_ecc:{n:'Freestanding HSPU Eccentric',c:'skill'},
  baby_90_pushup:{n:'Baby 90° Push-Up',c:'skill'},
  band_90_pushup:{n:'Band-Assisted 90° Push-Up',c:'skill'},
  ecc_90_pushup:{n:'90° Push-Up Eccentric',c:'skill'},
  planche_pushup:{n:'Planche Push-Up',c:'skill'},
  bent_arm_planche:{n:'Bent-Arm Planche Hold',c:'skill'},
  shoulder_stand:{n:'Shoulder Stand',c:'skill'},
  lsit_shoulderstand:{n:'L-Sit to Shoulder Stand',c:'skill'},
  /* Handstand Pro balance */
  wall_tuck_bail:{n:'Wall Tuck Bail',c:'skill'},
  wall_hollow:{n:'Wall Hollow Hold',c:'skill'},
  hs_cartwheel:{n:'Wall Cartwheel Exit',c:'skill'},
  hs_split_leg:{n:'Split-Leg Handstand',c:'skill'},
  toe_pulls:{n:'Toe Pull to Balance',c:'skill'},
  hs_end_range:{n:'Handstand End-Range Training',c:'skill'},
  wall_tuck_slide:{n:'Wall Tuck Slide',c:'skill'},
  hs_shape:{n:'Handstand Shape Hold',c:'skill'},
  hs_shape_change:{n:'Handstand Shape Change',c:'skill'},
  /* Home Hero */
  l_sit:{n:'L-Sit',c:'bodyweight'},
  bw_step_up:{n:'Step-Up',c:'bodyweight'},
  nordic_hinge:{n:'Nordic Curl Hinge',c:'bodyweight'}
});

REG.steps({
  ecc_chinup:['Grip the bar with palms facing you.','Jump or step up until your chin is over the bar.','Lower to a full hang over 5–8 seconds.','Step down, reset and repeat.'],
  ecc_dip:['Jump or step to the top with straight arms.','Press the shoulders down, away from the ears.','Lower over 5–8 seconds to 90° at the elbow or deeper.','Step back to the top and repeat.'],
  ecc_pushup:['Start in a push-up with the whole body tight.','Lower slowly with the elbows tucked and shoulder blades squeezing.','When the chest touches, drop to the knees.','Push back up from the knees and repeat.'],
  ecc_pike_pushup:['Start in a pike with the hips over the shoulders.','Tuck the elbows and lean forward.','Lower slowly until the head touches the floor.','Kneel, return to the pike and repeat.'],
  dip_shrug:['Support yourself on dip bars with straight arms.','Let the shoulders rise toward the ears.','Push them down hard without bending the elbows.','Pause, then repeat.'],
  plank:['Forearms on the floor, shoulder-width apart, fists closed.','Squeeze the glutes and abs so the low back does not sag.','Breathe deeply into the stomach.','Hold for the time set.'],
  scap_pull:['Hang from the bar with straight arms.','Pull the shoulders down and back so the chest lifts.','Keep the arms straight throughout.','Lower with control into a relaxed hang.'],
  scap_pushup:['Start in a push-up, or on the knees, with straight arms.','Let the chest sink by pinching the shoulder blades together.','Push the floor away to spread the shoulder blades apart.','Keep the elbows locked the whole time.'],
  arch_hold:['Lie face down with the legs straight.','Lift the feet and chest off the floor.','Pinch the shoulders back, arms by the sides or overhead.','Hold an even arch through the whole spine.'],
  wall_slide:['Stand with the low back flat against a wall.','Start with the arms at 90/90 against the wall.','Slide the arms up into a Y.','Pull them down into a W and repeat slowly.'],
  fr_wall_slide:['Face a wall with a foam roller under the forearms.','Hollow the body and press into the roller.','Roll the elbows up overhead, then straighten the arms.','Keep pressing into the roller on the way down.'],
  shoulder_ext:['Stand tall holding a bar or stick behind you, palms facing you.','Pinch the shoulder blades together.','Lift the bar backward, aiming for shoulder height.','Lower with control.'],
  stomach_wy:['Lie face down with the stomach lifted slightly off the floor.','Squeeze the shoulder blades and lift the elbows high.','Move the arms between a Y overhead and a W.','Keep the wrists level with the elbows.'],
  skin_the_cat:['Hang from a bar or rings, hands shoulder-width.','Tuck and roll back into an inverted hang.','With straight arms, lower the legs toward the floor behind you.','Return the way you came, under control.'],
  pendlay_row:['Hinge until the torso is near parallel, bar on the floor.','Row the bar explosively to the lower chest.','Set it back down dead still.','Reset the back before every rep.'],
  larsen_bench:['Lie on the bench with the legs straight and feet off the floor.','Set the shoulder blades back and down.','Lower the bar to the chest under control.','Press without any help from the legs.'],
  spider_curl:['Lie chest-down on an incline bench, arms hanging.','Curl the dumbbells up without swinging.','Squeeze hard at the top.','Lower slowly to straight arms.'],
  incline_db_curl:['Sit back on an incline bench, arms hanging behind the body.','Curl with palms up, elbows still.','Squeeze at the top.','Lower to a full stretch.'],
  db_fly:['Lie on a bench with dumbbells over the chest, elbows slightly bent.','Open the arms wide until you feel a stretch in the chest.','Bring the weights back together over the chest.','Keep the elbow angle the same throughout.'],
  db_kickback:['Hinge forward with the upper arm tight against the side.','Start with the elbow bent at 90°.','Straighten the arm fully behind you.','Lower without moving the upper arm.'],
  lu_raise:['Stand holding light plates or dumbbells at the hips, thumbs up.','Raise the arms out to the sides and on overhead with straight arms.','Keep the ribs down and do not arch.','Lower with control.'],
  lunge:['Stand tall, dumbbells at your sides if loaded.','Step forward and lower the back knee toward the floor.','Keep the front knee over the mid-foot.','Push back to standing and switch legs.'],
  split_squat:['Stand in a long split stance.','Lower straight down until the back knee nearly touches.','Keep the torso tall and the front foot flat.','Drive up through the front foot. Finish one side, then the other.'],
  single_leg_squat:['Stand on one leg, the other leg reaching forward.','Sit back and down as deep as you control, to a box if needed.','Keep the heel down and the knee over the toes.','Stand back up without pushing off the free leg.'],
  bw_ham_curl:['Lie on your back with the heels on sliders, a towel or rings.','Lift the hips into a bridge.','Pull the heels toward the glutes.','Slide them back out without dropping the hips.'],
  band_ham_curl:['Anchor a band low and loop it around one ankle.','Lie face down facing the anchor.','Curl the heel toward the glutes.','Return slowly against the band.'],
  band_leg_ext:['Anchor a band behind you and loop it around one ankle.','Sit or kneel with the knee bent.','Straighten the knee against the band.','Return slowly.'],
  band_pullover:['Anchor a band high in front of you.','Hinge slightly with straight arms overhead.','Sweep the arms down to the hips using the lats.','Return slowly to the stretch.'],
  band_lateral_raise:['Stand on a band and hold the ends at your sides.','Raise the arms out to shoulder height, elbows soft.','Pause at the top.','Lower slowly against the band.'],
  bw_pullover:['Hang from a bar or rings with straight arms.','Brace the core and lift the body by pulling the bar down toward the hips.','Keep the arms nearly straight.','Lower back to a hang with control.'],
  bw_tricep_ext:['Hold a bar or rings at about waist height and lean in, arms straight.','Bend only the elbows so the head goes under the hands.','Keep the body in one straight line.','Straighten the arms to return.'],
  vertical_pushup:['Put the feet on a high box with the hips stacked over the shoulders.','Walk the hands close so the torso is near vertical.','Lower the head in front of the hands with tucked elbows.','Press back to straight arms.'],
  ring_fly:['Hold the rings in a push-up position, body tight.','Open the arms wide with a slight elbow bend.','Lower as far as you control.','Squeeze the arms back together.'],
  ring_rear_fly:['Hold the rings and lean back, arms straight in front.','Open the arms wide like a T.','Squeeze the shoulder blades together at the end.','Return slowly.'],
  ring_curl:['Hold the rings with palms up and lean back, arms straight.','Curl the rings toward the forehead, elbows high and still.','Keep the body straight.','Lower slowly to straight arms.'],
  ring_pelican_curl:['Hold the rings with straight arms behind you in a support or low lean.','Let the arms drift back into a deep biceps stretch.','Curl back to the start with the arms near straight.','Keep the shoulders down and the body tight.'],
  archer_pushup:['Set the hands much wider than shoulder-width.','Shift your weight toward one hand and lower the chest beside it.','Keep the other arm straight as a helper.','Press back up with the working arm.'],
  bulgarian_pushup:['Hold the rings in a push-up with the rings turned out.','Lower deep, letting the rings travel wide past the chest.','Keep the elbows soft and the body straight.','Press back to the top and turn the rings out.'],
  shoulder_pushup:['Set up in a pike with the hands on low rings.','Hips high, feet on the floor or raised.','Lower the head between the rings with tucked elbows.','Press back up to straight arms.'],
  tricep_dip:['Hands behind you on a bench, low rings or bars, legs out in front.','Lower by bending the elbows to about 90°.','Keep the shoulders down and back.','Press up to straight arms.'],
  ring_rollout:['Kneel holding the rings low in front of you, arms straight.','Brace the abs and roll the rings forward.','Go only as far as the low back stays flat.','Pull back to the start.'],
  hs_shrug:['Kick up into a handstand with your back to the wall.','Let the shoulders sink, then shrug up toward the ears.','Arms stay straight the whole time.','Pause at the top of each shrug.'],
  hs_shoulder_tap:['Walk up into a chest-to-wall handstand.','Shift your weight onto one hand.','Lift the other hand to tap the opposite shoulder.','Place it back and switch sides.'],
  hs_waist_tap:['Walk up into a chest-to-wall handstand.','Shift your weight onto one hand.','Reach the other hand down to tap the waist.','Place it back and switch sides.'],
  mantle_chinup:['Hang from rings or a bar.','Pull up and turn the working side over into a mantle at the top.','Keep the elbow tight to the body.','Lower with control. Do all reps on one side, then the other.'],
  archer_chinup:['Grip the bar wide, palms toward you.','Pull up toward one hand, keeping the other arm near straight.','Chin over the bar on the working side.','Lower slowly and switch sides.'],
  archer_row:['Hold rings or a bar with a wide grip and lean back.','Row toward one hand while the other arm stays straight.','Keep the body in one straight line.','Lower slowly and switch sides.'],
  sa_ring_row:['Hold one ring and lean back, body straight.','Row the chest up to the hand without twisting.','Pause at the top.','Lower slowly. Do all reps on one side, then the other.'],
  l_row:['Sit under the rings or a low bar with the legs straight out.','Hold an L shape with the hips off the floor.','Row the chest toward the hands.','Lower to straight arms while keeping the L.'],
  dead_hang:['Grip the bar with both hands, shoulder-width.','Hang with straight arms and the shoulders active.','Breathe calmly.','Rest and repeat until the total time is done.'],
  one_arm_hang:['Hang from the bar with one hand.','Keep the shoulder pulled down slightly, not hanging loose.','Use the free hand to spot only if needed.','Switch arms. Rest and repeat until the total time is done.'],
  hspu_btw:['Kick up into a handstand with your back to the wall, hands a little wider than the shoulders.','Lower until the head touches the floor, elbows tucked.','Avoid arching the low back.','Press back to straight arms.'],
  hspu_ctw:['Walk up the wall into a chest-to-wall handstand, hands 4–6 hand-widths from it.','Lower so the head and hands form a tripod.','Keep the glutes and abs tight.','Press up by shrugging tall.'],
  hspu_band:['Anchor a band overhead or across a frame for support.','Kick up into a handstand with the band taking some weight.','Lower the head toward the floor with tucked elbows.','Press back up to a tall handstand.'],
  hspu_free:['Kick up into a freestanding handstand.','Lower the head toward the floor while keeping balance.','Press back to straight arms.','Rest whenever you need and repeat until the total is done.'],
  hspu_free_ecc:['Kick up into a freestanding handstand.','Lower slowly with tucked elbows until the head touches.','Come down safely.','Reset and repeat.'],
  baby_90_pushup:['Kneel or stand in a short lean with the hands on the floor or parallettes.','Lean the shoulders well past the hands.','Bend the arms to 90° with the elbows tucked.','Press back up while keeping the lean.'],
  band_90_pushup:['Set a band to take some of your weight in a handstand.','Lower from the handstand into a 90° push-up, elbows tucked.','Hold the body straight as it tilts forward.','Press back up to the handstand.'],
  ecc_90_pushup:['Kick up into a handstand.','Slowly lower into the 90° position, leaning forward.','Hold the body line as long as you can.','Come down safely and reset.'],
  planche_pushup:['Use the planche progression you can hold: tuck, advanced tuck or straddle.','Lean forward with the shoulders past the hands.','Bend the arms and lower with control.','Press back up while keeping the lean.'],
  bent_arm_planche:['Lean forward with the elbows bent and tucked into the hips.','Lift the feet so the body rests on the arms.','Keep the body as straight as you can.','Hold for the time set.'],
  shoulder_stand:['Place the hands on the floor or parallettes and the shoulders low.','Lift the hips and legs into a balance on bent arms.','Keep the elbows tucked and the body tight.','Hold for the time set.'],
  lsit_shoulderstand:['Start in an L-sit on parallettes or the floor.','Lean forward and bend the arms.','Lift the hips and roll up into a shoulder stand.','Lower back to the L-sit with control.'],
  wall_tuck_bail:['Walk up into a low chest-to-wall handstand.','Practise stepping down out of it in a tuck.','Start low and climb higher as you feel safe.','Land quietly.'],
  wall_hollow:['Walk up the wall into a slanted handstand, chest facing the wall.','Make a hollow shape with the legs, glutes and abs tight.','Push tall through the shoulders.','Pick an angle you can exit from safely.'],
  hs_cartwheel:['Walk up into a chest-to-wall handstand.','Shift weight to one hand.','Turn out into a cartwheel and step down.','Land quietly and repeat to both sides.'],
  hs_split_leg:['Kick up into a handstand with one leg forward and one back.','Stack the hips over the shoulders.','Balance with pressure through the fingers and wrists.','Use toe taps on the wall if you need to.'],
  toe_pulls:['Stand in a chest-to-wall handstand with the toes on the wall.','Press into the fingers to lift the toes off the wall.','Find balance and hold.','Return to the wall and repeat.'],
  hs_end_range:['Start in a handstand with one foot on the wall.','Slowly bring the legs together away from the wall.','Control the balance at the end.','Return to the wall and repeat.'],
  wall_tuck_slide:['Start in a chest-to-wall handstand.','Slide the feet down the wall into a deep tuck, hips to 90°.','Keep the shoulders from leaning too far forward.','Slide back up slowly. Pause in the tuck.'],
  hs_shape:['Kick up into a freestanding handstand.','Move into the shape named in the note.','Push tall through the shoulders.','Hold as long as you keep balance.'],
  hs_shape_change:['Kick up into a freestanding handstand.','Move between the two shapes named in the note.','Count each change as one rep.','Stop when balance or fatigue ends the set.'],
  l_sit:['Sit with the hands beside the hips on the floor, parallettes or chairs.','Lock the elbows and push the shoulders down.','Lift the straight legs to hip height.','Hold the L for the time set.'],
  bw_step_up:['Place one foot on a box, bench or sturdy chair.','Lean forward onto the top foot, toes of the floor foot raised.','Step up using only the top leg.','Lower slowly back to the floor.'],
  nordic_hinge:['Kneel on a pad with the heels fixed under something solid.','Hinge forward at the hips until the head touches the floor.','Pull back up by driving the heels toward the glutes.','Keep the movement smooth.']
});

/* ---------- session strings ---------- */
const DS=s=>String(s).replace(/(\d)-(\d)/g,'$1–$2');
const U=r=>DS(r).replace(/(\d)s$/,'$1 s').replace(/(\d)m$/,'$1 min');
const ECC=new Set(['ecc_chinup','ecc_dip','ecc_pushup','ecc_pike_pushup','ecc_pullup','hspu_ecc']);
function R(str,ecc){return str.split(';').map(x=>{x=x.trim();
  if(x[0]==='#')return{grp:DS(x.slice(1))};
  if(x[0]==='!')return{n:x.slice(1),s:''};
  const i=x.indexOf('/'),h=(i<0?x:x.slice(0,i)).trim(),note=i<0?'':x.slice(i+1).trim();
  const [id,s,r0]=h.split(' ');let r=r0;const it={id},nt=[];
  if(/\dL$/.test(r)){r=r.slice(0,-1);nt.push('per side');}
  if(s==='a'){it.s='';nt.unshift(`accumulate ${U(r)}${/\d$/.test(r)?' total':' in total'}`);}
  else if(s==='c')it.s=DS(r)+' min';
  else it.s=`${DS(s)} × ${U(r)}`;
  if(ecc&&ECC.has(id))nt.push('5–8 s lowering');
  if(note)nt.push(DS(note));
  if(nt.length)it.nt=nt.join(' · ');
  return it;});}
const day=(key,sec,eyebrow,n,items,hard=true,tag)=>{const d={key,sec,eyebrow,n,hard,items};if(tag)d.tag=tag;return d;};
/* generated from the sheets: u = unique session strings (see R()), w = weeks of indexes into u */
const FF_PPL={u:[
"#A · 3-4 min rest;pullups 3 6-8;pendlay_row 3 8-10;#B · 2 min rest;pullover 3 8-12;rev_fly 3 15-20;ring_pelican_curl 3 8-10;spider_curl 3 10-15",
"#A · 3-4 min rest;ohp 3 6-8;dips 3 8-10;larsen_bench 3 8-12;#B · 2 min rest;db_fly 3 12-15;bw_tricep_ext 3 10-15;lateral_raise 3 12-15",
"#A · 3-4 min rest;backsquat 3 6-8;rdl 3 8-10;#B · 2-3 min rest;hip_thrust 3 10-15;lunge 2 10-15L;#C · 2 min rest;nordic 3 8-12;band_leg_ext 3 12-15;cd_calf_raise 3 10-12",
"#A · 3-4 min rest;chinups 3 6-8;#B · 2-3 min rest;bw_row 3 8-15;sa_db_row 3 12-15;#C · 2 min rest;band_pullover 3 12-15;ring_rear_fly 3 12-15;bbcurl 3 8-12/back braced on a wall;cd_hammer_curl 3 10-15",
"#A · 3-4 min rest;vertical_pushup 3 6-8;pushup 3 8-12;cd_incline_bench 3 8-12;#B · 2 min rest;ring_fly 3 12-15;band_lateral_raise 3 12-15;db_kickback 3 10-12",
"#A · 2-3 min rest;single_leg_squat 3 6-8L;#B · 3-4 min rest;backsquat 2 12-15;#C · 2-3 min rest;backext 3 10-20;#D · 2 min rest;band_ham_curl 3 12-15;sissy_squat 3 8-12;cd_calf_raise 3 10-12",
"#A · 3-4 min rest;backsquat 3 6-8;rdl 3 8-10;#B · 2-3 min rest;hip_thrust 3 10-15;lunge 2 10-15L;#C · 2 min rest;nordic 3 8-12;band_leg_ext 3 12-15;cd_calf_raise 4 10-12",
"#A · 2-3 min rest;single_leg_squat 3 6-8L;#B · 3-4 min rest;backsquat 3 10-12;#C · 2-3 min rest;backext 3 10-20;#D · 2 min rest;band_ham_curl 3 15-20;sissy_squat 3 8-12;cd_calf_raise 4 10-12",
"#A · 3-4 min rest;pullups 4 6-8;pendlay_row 3 8-10;#B · 2 min rest;pullover 3 8-12;rev_fly 3 15-20;ring_pelican_curl 3 8-10;spider_curl 3 10-15",
"#A · 3-4 min rest;ohp 4 6-8;dips 3 8-10;larsen_bench 3 8-12;#B · 2 min rest;db_fly 3 12-15;bw_tricep_ext 3 10-15;lateral_raise 3 12-15",
"#A · 3-4 min rest;backsquat 4 6-8;rdl 3 8-10;#B · 2-3 min rest;hip_thrust 3 10-15;lunge 2 10-15L;#C · 2 min rest;nordic 3 8-12;band_leg_ext 3 12-15;cd_calf_raise 4 10-12",
"#A · 3-4 min rest;chinups 4 6-8;#B · 2-3 min rest;bw_row 3 8-15;sa_db_row 3 12-15;#C · 2 min rest;band_pullover 3 12-15;ring_rear_fly 3 12-15;bbcurl 3 8-12/back braced on a wall;cd_hammer_curl 3 10-15",
"#A · 3-4 min rest;vertical_pushup 4 6-8;pushup 3 8-12;cd_incline_bench 3 8-12;#B · 2 min rest;ring_fly 3 12-15;band_lateral_raise 3 12-15;db_kickback 3 10-12",
"#A · 2-3 min rest;single_leg_squat 4 6-8L;#B · 3-4 min rest;backsquat 3 10-12;#C · 2-3 min rest;backext 3 10-20;#D · 2 min rest;band_ham_curl 3 15-20;sissy_squat 3 8-12;cd_calf_raise 4 10-12",
"#A · 3-4 min rest;bw_pullover 3 5-8;pullups 3 8-12;pendlay_row 3 10-15;#B · 2 min rest;rev_fly 3 15-20/with a band;incline_db_curl 3 8-12;ring_curl 3 12-15",
"#A · 3-4 min rest;vertical_pushup 4 6-8;dips 3 8-12;larsen_bench 3 8-12;#B · 2 min rest;db_fly 3 12-15;skull_crusher 3 12-15;lu_raise 3 12-15",
"#A · 3-4 min rest;good_morning 3 8-10;backsquat 3 8-10;#B · 2-3 min rest;hip_thrust 3 10-15;split_squat 2 15-20L;#C · 2 min rest;nordic 3 8-12;band_leg_ext 3 15-20;cd_calf_raise 3 12-20",
"#A · 3-4 min rest;chinups 4 6-8;sa_db_row 3 12-15;#B · 2-3 min rest;bw_row 3 8-15;band_pullover 3 15-20;#C · 2 min rest;ring_rear_fly 3 12-15;bbcurl 3 8-12/back braced on a wall;cd_hammer_curl 3 10-15",
"#A · 3-4 min rest;ohp 4 6-8;dips 3 8-12;pushup 3 8-12;#B · 2 min rest;bw_tricep_ext 3 10-15;lateral_raise 3 12-15;db_kickback 3 12-15",
"#A · 2-3 min rest;single_leg_squat 4 6-8L;#B · 3-4 min rest;backsquat 3 10-12;#C · 2-3 min rest;rev_back_ext 3 12-15;#D · 2 min rest;bw_ham_curl 3 8-12;revnordic 3 8-12;cd_calf_raise 3 12-20",
"#A · 3-4 min rest;bw_pullover 3 5-8;pullups 3 8-12;pendlay_row 3 10-15;#B · 2 min rest;rev_fly 3 15-20/with a band;incline_db_curl 3 8-12;ring_curl 3 10-15",
"#A · 3-4 min rest;vertical_pushup 3 8-12;dips 3 8-12;larsen_bench 3 8-12;#B · 2 min rest;db_fly 3 12-15;skull_crusher 3 12-15;lu_raise 3 12-15",
"#A · 3-4 min rest;good_morning 3 8-10;backsquat 3 8-10;#B · 2-3 min rest;hip_thrust 3 10-15;split_squat 2 15-20L;#C · 2 min rest;nordic 3 8-12;band_leg_ext 3 15-20;cd_calf_raise 4 12-20",
"#A · 3-4 min rest;chinups 3 8-12;sa_db_row 3 12-15;#B · 2-3 min rest;bw_row 3 8-15;band_pullover 3 15-20;#C · 2 min rest;ring_rear_fly 3 12-15;bbcurl 3 8-12/back braced on a wall;cd_hammer_curl 3 10-15",
"#A · 3-4 min rest;ohp 3 8-12;dips 3 8-12;pushup 3 8-12;#B · 2 min rest;bw_tricep_ext 3 10-15;lateral_raise 3 12-15;db_kickback 3 12-15",
"#A · 2-3 min rest;single_leg_squat 3 8-12L;#B · 3-4 min rest;backsquat 3 10-12;#C · 2-3 min rest;rev_back_ext 3 12-15;#D · 2 min rest;bw_ham_curl 3 8-12;revnordic 3 8-12;cd_calf_raise 4 12-20",
"#A · 3-4 min rest;bw_pullover 4 5-8;pullups 4 8-12;pendlay_row 4 10-15;#B · 2 min rest;rev_fly 3 15-20/with a band;incline_db_curl 3 8-12;ring_curl 3 10-15",
"#A · 3-4 min rest;vertical_pushup 4 8-12;dips 4 8-12;larsen_bench 4 8-12;#B · 2 min rest;db_fly 3 12-15;skull_crusher 3 12-15;lu_raise 3 12-15",
"#A · 3-4 min rest;good_morning 4 8-10;backsquat 4 8-10;#B · 2-3 min rest;hip_thrust 4 10-15;split_squat 3 15-20L;#C · 2 min rest;nordic 3 8-12;band_leg_ext 3 15-20;cd_calf_raise 4 12-20",
"#A · 3-4 min rest;chinups 4 8-12;sa_db_row 4 12-15;#B · 2-3 min rest;bw_row 4 8-15;band_pullover 3 15-20;#C · 2 min rest;ring_rear_fly 3 12-15;bbcurl 3 8-12/back braced on a wall;cd_hammer_curl 3 10-15",
"#A · 3-4 min rest;ohp 4 8-12;dips 4 8-12;pushup 4 8-12;#B · 2 min rest;bw_tricep_ext 3 10-15;lateral_raise 3 12-15;db_kickback 3 12-15",
"#A · 2-3 min rest;single_leg_squat 4 8-12L;#B · 3-4 min rest;backsquat 4 10-12;#C · 2-3 min rest;rev_back_ext 3 12-15;#D · 2 min rest;bw_ham_curl 3 8-12;revnordic 3 8-12;cd_calf_raise 4 12-20",
"#A · 3-4 min rest;pullups 2 6-8;pendlay_row 2 8-10;#B · 2 min rest;pullover 2 8-12;rev_fly 2 15-20;ring_pelican_curl 2 8-10;spider_curl 2 10-15",
"#A · 3-4 min rest;ohp 2 6-8;dips 2 8-10;larsen_bench 2 8-12;#B · 2 min rest;db_fly 2 12-15;bw_tricep_ext 2 10-15;lateral_raise 2 12-15",
"#A · 3-4 min rest;backsquat 2 6-8;rdl 2 8-10;#B · 2-3 min rest;hip_thrust 2 10-15;lunge 2 10-15L;#C · 2 min rest;nordic 2 8-12;band_leg_ext 2 12-15;cd_calf_raise 2 10-12",
"#A · 3-4 min rest;chinups 2 6-8;#B · 2-3 min rest;bw_row 2 8-15;sa_db_row 2 12-15;#C · 2 min rest;band_pullover 2 12-15;ring_rear_fly 2 12-15;bbcurl 2 8-12/back braced on a wall;cd_hammer_curl 2 10-15",
"#A · 3-4 min rest;vertical_pushup 2 6-8;pushup 2 8-12;cd_incline_bench 2 8-12;#B · 2 min rest;ring_fly 2 12-15;band_lateral_raise 2 12-15;db_kickback 2 10-12",
"#A · 2-3 min rest;single_leg_squat 2 6-8L;#B · 3-4 min rest;backsquat 2 12-15;#C · 2-3 min rest;backext 2 10-20;#D · 2 min rest;band_ham_curl 2 12-15;sissy_squat 2 8-12;cd_calf_raise 2 10-12"],
w:[[0,1,2,3,4,5],[0,1,2,3,4,5],[0,1,6,3,4,7],[8,9,10,11,12,13],[14,15,16,17,18,19],[20,21,22,23,24,25],[20,21,22,23,24,25],[26,27,28,29,30,31],[32,33,34,35,36,37]]};
const FF_FB={u:[
"#A · 3-4 min rest;rdl 3 6-8;ohp 3 8-10;pullups 3 8-10;#B · 2-3 min rest;pushup 3 8-12;#C · 2 min rest;sissy_squat 3 8-15;rev_fly 3 15-20/with a band;incline_db_curl 3 8-12",
"#A · 3-4 min rest;vertical_pushup 3 6-8;#B · 2-3 min rest;pullover 3 8-12;#C · 2 min rest;lunge 3 12-15L;#D · 3-4 min rest;larsen_bench 3 8-12;sa_db_row 3 10-12;#E · 2 min rest;db_fly 3 12-15;cd_calf_raise 3 10-12;bw_tricep_ext 3 10-15",
"#A · 3-4 min rest;backsquat 3 6-8;dips 3 8-10;chinups 3 8-10;#B · 2-3 min rest;nordic 3 8-12;bw_row 3 8-15;#C · 2 min rest;lateral_raise 3 12-15;cd_calf_raise 3 10-12;ring_curl 3 12-15",
"#A · 3-4 min rest;pendlay_row 3 6-8;cd_incline_bench 3 8-12;pullups 3 8-10/neutral grip;#B · 2-3 min rest;pushup 3 8-12;backext 3 10-20;#C · 2 min rest;lu_raise 3 12-15;skull_crusher 3 12-15;rev_fly 3 15-20;cd_calf_raise 3 10-12",
"#A · 3-4 min rest;vertical_pushup 3 6-8;#B · 2-3 min rest;pullover 3 8-12;#C · 2 min rest;lunge 3 12-15L;#D · 3-4 min rest;larsen_bench 3 8-12;sa_db_row 3 10-12;#E · 2 min rest;db_fly 3 12-15;cd_calf_raise 4 10-12;bw_tricep_ext 3 10-15",
"#A · 3-4 min rest;backsquat 3 6-8;dips 3 8-10;chinups 3 8-10;#B · 2-3 min rest;nordic 3 8-12;bw_row 3 8-15;#C · 2 min rest;lateral_raise 3 12-15;cd_calf_raise 4 10-12;ring_curl 3 12-15",
"#A · 3-4 min rest;rdl 4 6-8;ohp 3 8-10;pullups 3 8-10;#B · 2-3 min rest;pushup 3 8-12;#C · 2 min rest;sissy_squat 3 8-15;rev_fly 3 15-20/with a band;incline_db_curl 3 8-12",
"#A · 3-4 min rest;vertical_pushup 4 6-8;#B · 2-3 min rest;pullover 3 8-12;#C · 2 min rest;lunge 3 12-15L;#D · 3-4 min rest;larsen_bench 3 8-12;sa_db_row 3 10-12;#E · 2 min rest;db_fly 3 12-15;cd_calf_raise 4 10-12;bw_tricep_ext 3 10-15",
"#A · 3-4 min rest;backsquat 4 6-8;dips 3 8-10;chinups 3 8-10;#B · 2-3 min rest;nordic 3 8-12;bw_row 3 8-15;#C · 2 min rest;lateral_raise 3 12-15;cd_calf_raise 4 10-12;ring_curl 3 12-15",
"#A · 3-4 min rest;pendlay_row 4 6-8;cd_incline_bench 3 8-12;pullups 3 8-10/neutral grip;#B · 2-3 min rest;pushup 3 8-12;backext 3 10-20;#C · 2 min rest;lu_raise 3 12-15;skull_crusher 3 12-15;rev_fly 3 15-20;cd_calf_raise 3 10-12",
"#A · 3-4 min rest;good_morning 3 8-10;dips 3 8-12;pullups 3 8-12;#B · 2-3 min rest;larsen_bench 3 8-12;#C · 2 min rest;revnordic 3 8-12;ring_rear_fly 3 12-15;bbcurl 3 8-12/back braced on a wall",
"#A · 3-4 min rest;vertical_pushup 4 6-8;#B · 2-3 min rest;bw_pullover 3 5-8;#C · 2 min rest;split_squat 3 15-20L;#D · 3-4 min rest;pushup 3 8-12;sa_db_row 3 12-15;#E · 2 min rest;ring_fly 3 12-15;cd_calf_raise 3 12-20;skull_crusher 3 12-15",
"#A · 3-4 min rest;backsquat 4 6-8;ohp 3 8-10;chinups 3 8-12;#B · 2-3 min rest;bw_ham_curl 3 8-12;bw_row 3 8-15;#C · 2 min rest;band_lateral_raise 3 12-15;cd_calf_raise 3 12-20;spider_curl 3 10-15",
"#A · 3-4 min rest;pendlay_row 4 6-8;pushup 3 8-12;pullups 3 8-12/neutral grip;#B · 2-3 min rest;cd_incline_bench 3 8-12;rev_back_ext 3 12-15;#C · 2 min rest;db_kickback 3 10-12;lateral_raise 3 12-15;rev_fly 2 20-30;cd_calf_raise 3 10-12",
"#A · 3-4 min rest;vertical_pushup 3 8-12;#B · 2-3 min rest;bw_pullover 3 5-8;#C · 2 min rest;split_squat 3 15-20L;#D · 3-4 min rest;pushup 3 8-12;sa_db_row 3 12-15;#E · 2 min rest;ring_fly 3 12-15;cd_calf_raise 3 12-20;skull_crusher 3 12-15",
"#A · 3-4 min rest;backsquat 3 8-12;ohp 3 8-10;chinups 3 8-12;#B · 2-3 min rest;bw_ham_curl 3 8-12;bw_row 3 8-15;#C · 2 min rest;band_lateral_raise 3 12-15;cd_calf_raise 3 12-20;spider_curl 3 10-15",
"#A · 3-4 min rest;pendlay_row 3 8-12;pushup 3 8-12;pullups 3 8-12/neutral grip;#B · 2-3 min rest;cd_incline_bench 3 8-12;rev_back_ext 3 12-15;#C · 2 min rest;db_kickback 3 10-12;lateral_raise 3 12-15;rev_fly 2 20-30;cd_calf_raise 3 10-12",
"#A · 3-4 min rest;vertical_pushup 3 8-12;#B · 2-3 min rest;bw_pullover 3 5-8;#C · 2 min rest;split_squat 3 15-20L;#D · 3-4 min rest;pushup 3 8-12;sa_db_row 3 12-15;#E · 2 min rest;ring_fly 3 12-15;cd_calf_raise 4 12-20;skull_crusher 3 12-15",
"#A · 3-4 min rest;backsquat 3 8-12;ohp 3 8-10;chinups 3 8-12;#B · 2-3 min rest;bw_ham_curl 3 8-12;bw_row 3 8-15;#C · 2 min rest;band_lateral_raise 3 12-15;cd_calf_raise 4 12-20;spider_curl 3 10-15",
"#A · 3-4 min rest;good_morning 4 8-10;dips 4 8-12;pullups 4 8-12;#B · 2-3 min rest;larsen_bench 4 8-12;#C · 2 min rest;revnordic 3 8-12;ring_rear_fly 3 12-15;bbcurl 3 8-12/back braced on a wall",
"#A · 3-4 min rest;vertical_pushup 4 8-12;#B · 2-3 min rest;bw_pullover 4 5-8;#C · 2 min rest;split_squat 3 15-20L;#D · 3-4 min rest;pushup 3 8-12;sa_db_row 3 15-20;#E · 2 min rest;ring_fly 3 12-15;cd_calf_raise 4 12-20;skull_crusher 3 12-15",
"#A · 3-4 min rest;backsquat 4 8-12;ohp 4 8-10;chinups 4 8-12;#B · 2-3 min rest;bw_ham_curl 3 8-12;bw_row 4 8-15;#C · 2 min rest;band_lateral_raise 3 12-15;cd_calf_raise 4 12-20;spider_curl 3 10-15",
"#A · 3-4 min rest;pendlay_row 4 8-12;pushup 4 8-12;pullups 4 8-12/neutral grip;#B · 2-3 min rest;cd_incline_bench 4 8-12;rev_back_ext 3 15-20;#C · 2 min rest;db_kickback 3 12-15;lateral_raise 3 12-15;rev_fly 3 20-30;cd_calf_raise 3 10-12",
"#A · 3-4 min rest;rdl 2 6-8;ohp 2 8-10;pullups 2 8-10;#B · 2-3 min rest;pushup 2 8-12;#C · 2 min rest;sissy_squat 2 8-15;rev_fly 2 15-20/with a band;incline_db_curl 2 8-12",
"#A · 3-4 min rest;vertical_pushup 2 6-8;#B · 2-3 min rest;pullover 2 8-12;#C · 2 min rest;lunge 2 12-15L;#D · 3-4 min rest;larsen_bench 2 8-12;sa_db_row 2 10-12;#E · 2 min rest;db_fly 2 12-15;cd_calf_raise 2 10-12;bw_tricep_ext 2 10-15",
"#A · 3-4 min rest;backsquat 2 6-8;dips 2 8-10;chinups 2 8-10;#B · 2-3 min rest;nordic 2 8-12;bw_row 2 8-15;#C · 2 min rest;lateral_raise 2 12-15;cd_calf_raise 2 10-12;ring_curl 2 12-15",
"#A · 3-4 min rest;pendlay_row 2 6-8;cd_incline_bench 2 8-12;pullups 2 8-10/neutral grip;#B · 2-3 min rest;pushup 2 8-12;backext 2 10-20;#C · 2 min rest;lu_raise 2 12-15;skull_crusher 2 12-15;rev_fly 2 15-20;cd_calf_raise 3 10-12"],
w:[[0,1,2,3],[0,1,2,3],[0,4,5,3],[6,7,8,9],[10,11,12,13],[10,14,15,16],[10,17,18,16],[19,20,21,22],[23,24,25,26]]};
const FF_UL={u:[
"#A · 3-4 min rest;vertical_pushup 3 6-8;pullups 3 8-10;larsen_bench 3 8-10;pendlay_row 3 8-10;#B · 2 min rest;ring_fly 3 12-15;db_kickback 3 12-15;lateral_raise 3 12-15;bbcurl 3 8-12/back braced on a wall",
"#A · 2-3 min rest;single_leg_squat 3 6-8L;#B · 3-4 min rest;backsquat 2 12-15;#C · 2-3 min rest;backext 3 10-20;lunge 3 12-15L;#D · 2 min rest;bw_ham_curl 3 8-12;sissy_squat 3 8-15;cd_calf_raise 3 10-12",
"#A · 3-4 min rest;ohp 3 6-8;chinups 3 8-10;dips 3 8-10;#B · 2-3 min rest;sa_db_row 3 10-12;#C · 3-4 min rest;pushup 3 8-12;#D · 2 min rest;ring_pelican_curl 3 8-10;bw_tricep_ext 3 10-15;rev_fly 3 15-20/with a band;lateral_raise 3 12-15",
"#A · 3-4 min rest;rdl 3 6-8;#B · 2-3 min rest;split_squat 3 15-20L;rev_back_ext 3 12-15;#C · 2 min rest;revnordic 3 8-12;#D · 2-3 min rest;hip_thrust 3 10-15;#E · 2 min rest;nordic 3 8-12;cd_calf_raise 3 10-12",
"#A · 2-3 min rest;single_leg_squat 3 6-8L;#B · 3-4 min rest;backsquat 3 10-12;#C · 2-3 min rest;backext 3 10-20;lunge 3 12-15L;#D · 2 min rest;bw_ham_curl 3 8-12;sissy_squat 3 8-15;cd_calf_raise 4 10-12",
"#A · 3-4 min rest;rdl 3 6-8;#B · 2-3 min rest;split_squat 3 15-20L;rev_back_ext 3 12-15;#C · 2 min rest;revnordic 3 8-12;#D · 2-3 min rest;hip_thrust 3 10-15;#E · 2 min rest;nordic 3 8-12;cd_calf_raise 4 10-12",
"#A · 3-4 min rest;vertical_pushup 4 6-8;pullups 3 8-10;larsen_bench 3 8-10;pendlay_row 3 8-10;#B · 2 min rest;ring_fly 3 12-15;db_kickback 3 12-15;lateral_raise 3 12-15;bbcurl 3 8-12/back braced on a wall",
"#A · 2-3 min rest;single_leg_squat 4 6-8L;#B · 3-4 min rest;backsquat 3 10-12;#C · 2-3 min rest;backext 3 10-20;lunge 3 12-15L;#D · 2 min rest;bw_ham_curl 3 8-12;sissy_squat 3 8-15;cd_calf_raise 4 10-12",
"#A · 3-4 min rest;ohp 4 6-8;chinups 3 8-10;dips 3 8-10;#B · 2-3 min rest;sa_db_row 3 10-12;#C · 3-4 min rest;pushup 3 8-12;#D · 2 min rest;ring_pelican_curl 3 8-10;bw_tricep_ext 3 10-15;rev_fly 3 15-20/with a band;lateral_raise 3 12-15",
"#A · 3-4 min rest;rdl 4 6-8;#B · 2-3 min rest;split_squat 3 15-20L;rev_back_ext 3 12-15;#C · 2 min rest;revnordic 3 8-12;#D · 2-3 min rest;hip_thrust 3 10-15;#E · 2 min rest;nordic 3 8-12;cd_calf_raise 4 10-12",
"#A · 3-4 min rest;dips 4 6-8;pullups 3 8-12;larsen_bench 3 8-12;#B · 2-3 min rest;bw_row 3 8-15;#C · 3-4 min rest;pushup 3 8-12;#D · 2 min rest;lu_raise 3 12-15;skull_crusher 3 12-15;spider_curl 3 10-15",
"#A · 3-4 min rest;backsquat 4 6-8;#B · 2-3 min rest;single_leg_squat 3 8-12L;backext 3 10-20;split_squat 3 15-20L;#C · 2 min rest;band_ham_curl 3 12-15;band_leg_ext 3 12-15;cd_calf_raise 3 12-20",
"#A · 3-4 min rest;vertical_pushup 4 6-8;chinups 3 8-12;dips 3 10-15;pendlay_row 3 10-15;cd_incline_bench 3 8-12;#B · 2 min rest;incline_db_curl 3 8-12;db_fly 3 12-15;band_lateral_raise 3 12-15;rev_fly 3 15-20",
"#A · 3-4 min rest;good_morning 3 8-10;backsquat 3 10-12;#B · 2-3 min rest;lunge 3 12-15L;#C · 2 min rest;sissy_squat 3 8-15;#D · 2-3 min rest;hip_thrust 3 10-15;#E · 2 min rest;nordic 3 8-12;cd_calf_raise 3 12-20",
"#A · 3-4 min rest;backsquat 3 8-12;#B · 2-3 min rest;single_leg_squat 3 8-12L;backext 3 10-20;split_squat 3 15-20L;#C · 2 min rest;band_ham_curl 3 12-15;band_leg_ext 3 12-15;cd_calf_raise 4 12-20",
"#A · 3-4 min rest;vertical_pushup 3 8-12;chinups 3 8-12;dips 3 10-15;pendlay_row 3 10-15;cd_incline_bench 3 8-12;#B · 2 min rest;incline_db_curl 3 8-12;db_fly 3 12-15;band_lateral_raise 3 12-15;rev_fly 3 15-20",
"#A · 3-4 min rest;good_morning 3 8-10;backsquat 3 10-12;#B · 2-3 min rest;lunge 3 12-15L;#C · 2 min rest;sissy_squat 3 8-15;#D · 2-3 min rest;hip_thrust 3 10-15;#E · 2 min rest;nordic 3 8-12;cd_calf_raise 4 12-20",
"#A · 3-4 min rest;backsquat 3 8-12;#B · 2-3 min rest;single_leg_squat 3 8-12L;backext 3 10-20;split_squat 3 15-20L;#C · 2 min rest;band_ham_curl 3 15-20;band_leg_ext 3 15-20;cd_calf_raise 4 12-20",
"#A · 3-4 min rest;dips 4 6-8;pullups 4 8-12;larsen_bench 4 8-12;#B · 2-3 min rest;bw_row 4 8-15;#C · 3-4 min rest;pushup 4 8-12;#D · 2 min rest;lu_raise 3 12-15;skull_crusher 3 12-15;spider_curl 3 10-15",
"#A · 3-4 min rest;backsquat 4 8-12;#B · 2-3 min rest;single_leg_squat 4 8-12L;backext 3 10-20;split_squat 3 15-20L;#C · 2 min rest;band_ham_curl 3 15-20;band_leg_ext 3 15-20;cd_calf_raise 4 12-20",
"#A · 3-4 min rest;vertical_pushup 4 8-12;chinups 4 8-12;dips 4 10-15;pendlay_row 4 10-15;cd_incline_bench 4 8-12;#B · 2 min rest;incline_db_curl 3 8-12;db_fly 3 12-15;band_lateral_raise 3 12-15;rev_fly 3 15-20",
"#A · 3-4 min rest;good_morning 4 8-10;backsquat 4 10-12;#B · 2-3 min rest;lunge 3 12-15L;#C · 2 min rest;sissy_squat 3 8-15;#D · 2-3 min rest;hip_thrust 4 10-15;#E · 2 min rest;nordic 3 8-12;cd_calf_raise 4 12-20",
"#A · 3-4 min rest;vertical_pushup 2 6-8;pullups 2 8-10;larsen_bench 2 8-10;pendlay_row 2 8-10;#B · 2 min rest;ring_fly 2 12-15;db_kickback 2 12-15;lateral_raise 2 12-15;bbcurl 2 8-12/back braced on a wall",
"#A · 2-3 min rest;single_leg_squat 2 6-8L;#B · 3-4 min rest;backsquat 2 12-15;#C · 2-3 min rest;backext 2 10-20;lunge 2 12-15L;#D · 2 min rest;bw_ham_curl 2 8-12;sissy_squat 2 8-15;cd_calf_raise 2 10-12",
"#A · 3-4 min rest;ohp 2 6-8;chinups 2 8-10;dips 2 8-10;#B · 2-3 min rest;sa_db_row 2 10-12;#C · 3-4 min rest;pushup 2 8-12;#D · 2 min rest;ring_pelican_curl 2 8-10;bw_tricep_ext 2 10-15;rev_fly 2 15-20/with a band;lateral_raise 2 12-15",
"#A · 3-4 min rest;rdl 2 6-8;#B · 2-3 min rest;split_squat 2 15-20L;rev_back_ext 2 12-15;#C · 2 min rest;revnordic 2 8-12;#D · 2-3 min rest;hip_thrust 2 10-15;#E · 2 min rest;nordic 2 8-12;cd_calf_raise 2 10-12"],
w:[[0,1,2,3],[0,1,2,3],[0,4,2,5],[6,7,8,9],[10,11,12,13],[10,14,15,16],[10,17,15,16],[18,19,20,21],[22,23,24,25]]};
const FF_HSPS={
'2A':{u:[
"#A · 3 min rest;hspu_btw 2 3-5;pike_pushup 2 5-6;baby_90_pushup 2 5-6;dips 2 8-12",
"#A · 3 min rest;hspu_ctw 2 3-5;ohp 2 8-10;pushup 2 8-12;#B · self-paced;wall_walk a 10",
"#A · 3 min rest;hspu_btw 2 3-5;pike_pushup 2 5-6;pseudo_planche 2 6-8;dips 2 8-12",
"#A · 3 min rest;hspu_btw 3 3-5;pike_pushup 3 5-6;baby_90_pushup 3 5-6;dips 3 8-12",
"#A · 3 min rest;hspu_ctw 3 3-5;ohp 3 8-10;pushup 3 8-12;#B · self-paced;wall_walk a 20/cast version",
"#A · 3 min rest;hspu_btw 3 3-5;pike_pushup 3 5-6;pseudo_planche 3 6-8;dips 3 8-12",
"#A · 3 min rest;hspu_btw 3 4-7;pike_pushup 3 6-8;baby_90_pushup 3 6-8;dips 3 8-12",
"#A · 3 min rest;hspu_ctw 3 3-6;ohp 3 8-10;pushup 3 10-15;#B · self-paced;wall_walk a 25/cast version",
"#A · 3 min rest;hspu_btw 3 4-7;pike_pushup 3 6-8;pseudo_planche 3 6-8;dips 3 8-12",
"#A · 3 min rest;hspu_btw 4 4-7;pike_pushup 3 6-8;baby_90_pushup 3 6-8;dips 3 8-12",
"#A · 3 min rest;hspu_btw 4 4-7;pike_pushup 3 6-8;pseudo_planche 3 6-8;dips 3 8-12",
"#A · 3 min rest;hspu_btw 4 4-7;pike_pushup 4 6-8;baby_90_pushup 3 6-8;dips 3 8-12",
"#A · 3 min rest;hspu_ctw 4 3-6;ohp 3 8-10;pushup 3 10-15;#B · self-paced;wall_walk a 30/cast version",
"#A · 3 min rest;hspu_btw 4 4-7;pike_pushup 4 6-8;pseudo_planche 3 6-8;dips 3 8-12",
"#A · 3 min rest;hspu_btw 4 4-7;pike_pushup 4 6-8;baby_90_pushup 4 6-8;dips 3 8-12",
"#A · 3 min rest;hspu_ctw 4 3-6;ohp 4 8-10;pushup 3 10-15;#B · self-paced;wall_walk a 30/cast version",
"#A · 3 min rest;hspu_btw 4 4-7;pike_pushup 4 6-8;pseudo_planche 4 6-8;dips 3 8-12"],
w:[[0,1,2],[3,4,5],[6,7,8],[9,7,10],[11,12,13],[14,15,16]]},
'2B':{u:[
"#A · 3 min rest;hspu_ctw 2 3-6;pike_pushup 2 5-6;baby_90_pushup 2 5-6;dips 2 8-12",
"#A · 2 min rest;shoulder_stand 2 10-15s;#B · 3 min rest;dips 2 5-6;hspu_btw 2 3-6;ohp 2 8-10",
"#A · 3 min rest;hspu_ctw 2 3-6;pike_pushup 2 5-6;pseudo_planche 2 8-10;dips 2 8-12",
"#A · 3 min rest;hspu_ctw 3 3-6;pike_pushup 3 5-6;baby_90_pushup 3 5-6;dips 3 8-12",
"#A · 2 min rest;shoulder_stand 3 10-15s;#B · 3 min rest;dips 3 5-6;hspu_btw 3 3-6;ohp 3 8-10",
"#A · 3 min rest;hspu_ctw 3 3-6;pike_pushup 3 5-6;pseudo_planche 3 8-10;dips 3 8-12",
"#A · 3 min rest;hspu_ctw 4 3-6;pike_pushup 3 6-8;baby_90_pushup 3 5-6;dips 3 8-12",
"#A · 2 min rest;shoulder_stand 3 10-15s;#B · 3 min rest;dips 3 5-6;hspu_btw 3 4-8;ohp 3 8-10",
"#A · 3 min rest;hspu_ctw 4 3-6;pike_pushup 3 6-8;pseudo_planche 3 8-10;dips 3 8-12",
"#A · 2 min rest;shoulder_stand 4 10-15s;#B · 3 min rest;dips 4 5-6;hspu_btw 3 4-8;ohp 3 8-10",
"#A · 3 min rest;hspu_ctw 5 3-6;pike_pushup 3 6-8;baby_90_pushup 3 5-6;dips 3 8-12",
"#A · 2 min rest;shoulder_stand 4 10-20s;#B · 3 min rest;dips 4 5-6;hspu_btw 3 4-8;ohp 3 8-10",
"#A · 3 min rest;hspu_ctw 5 3-6;pike_pushup 3 6-8;pseudo_planche 3 8-10;dips 3 8-12",
"#A · 2 min rest;shoulder_stand 4 10-20s;#B · 3 min rest;dips 5 5-6;hspu_btw 3 4-8;ohp 3 8-10"],
w:[[0,1,2],[3,4,5],[6,7,8],[6,9,8],[10,11,12],[10,13,12]]},
'3A':{u:[
"#A · 3 min rest;hspu_band 2 3-6;pike_pushup 2 5-6/floating;hspu_btw 2 4-7;dips 2 8-12",
"#A · 3 min rest;hspu_free_ecc 6 1;#B · 2 min rest;lsit_shoulderstand 2 3-5;#C · 3 min rest;hspu_ctw 2 3-6;pike_pushup 2 6-8",
"#A · 3 min rest;hspu_band 3 3-6;pike_pushup 3 5-6/floating;hspu_btw 3 4-7;dips 3 8-12",
"#A · 3 min rest;hspu_free_ecc 3 2-3;#B · 2 min rest;lsit_shoulderstand 3 3-5;#C · 3 min rest;hspu_ctw 3 3-6;pike_pushup 3 6-8",
"#A · 3 min rest;hspu_band 4 3-6;pike_pushup 3 5-6/floating;hspu_btw 3 4-7;dips 3 8-12",
"#A · 3 min rest;hspu_free_ecc 4 2-3;#B · 2 min rest;lsit_shoulderstand 3 3-5;#C · 3 min rest;hspu_ctw 3 3-6;pike_pushup 3 6-8",
"#A · 3 min rest;hspu_band 4 3-6;pike_pushup 3 6-8/floating;hspu_btw 3 4-7;dips 3 8-12",
"#A · 3 min rest;hspu_free_ecc 4 2-3;#B · 2 min rest;lsit_shoulderstand 3 4-6;#C · 3 min rest;hspu_ctw 3 3-6;pike_pushup 3 6-8",
"#A · 3 min rest;hspu_band 5 3-6;pike_pushup 3 6-8/floating;hspu_btw 4 4-7;dips 3 8-12",
"#A · 3 min rest;hspu_free_ecc 5 2-3;#B · 2 min rest;lsit_shoulderstand 3 4-6;#C · 3 min rest;hspu_ctw 4 3-6;pike_pushup 3 6-8"],
w:[[0,1,0],[2,3,2],[4,5,4],[6,7,6],[8,9,8],[8,9,8]]},
'3B':{u:[
"#A · self-paced;hspu_free a 10;#B · 3 min rest;hspu_band 2 4-6;hspu_ctw 2 4-6;dips 2 8-12",
"#A · 3 min rest;hspu_free_ecc 6 1;#B · 2 min rest;lsit_shoulderstand 2 3-5;#C · 3 min rest;hspu_band 2 4-6;hspu_btw 2 4-6",
"#A · self-paced;hspu_free a 10;#B · 3 min rest;hspu_band 2 4-6;pike_pushup 2 6-8;dips 2 8-12",
"#A · self-paced;hspu_free a 10;#B · 3 min rest;hspu_band 3 4-6;hspu_ctw 3 4-6;dips 3 8-12",
"#A · 3 min rest;hspu_free_ecc 3 2-3;#B · 2 min rest;lsit_shoulderstand 3 3-5;#C · 3 min rest;hspu_band 3 4-6;hspu_btw 3 4-6",
"#A · self-paced;hspu_free a 10;#B · 3 min rest;hspu_band 3 4-6;pike_pushup 3 6-8;dips 3 8-12",
"#A · self-paced;hspu_free a 15;#B · 3 min rest;hspu_band 3 6-8;hspu_ctw 3 4-6;dips 3 8-12",
"#A · 3 min rest;hspu_free_ecc 3 2-3;#B · 2 min rest;lsit_shoulderstand 3 3-6;#C · 3 min rest;hspu_band 3 6-8;hspu_btw 3 4-6",
"#A · self-paced;hspu_free a 15;#B · 3 min rest;hspu_band 3 6-8;pike_pushup 3 6-8;dips 3 8-12",
"#A · 3 min rest;hspu_free_ecc 4 2-3;#B · 2 min rest;lsit_shoulderstand 3 3-6;#C · 3 min rest;hspu_band 3 6-8;hspu_btw 3 4-6",
"#A · self-paced;hspu_free a 20;#B · 3 min rest;hspu_band 3 6-8;hspu_ctw 3 4-6;dips 3 8-12",
"#A · 3 min rest;hspu_free_ecc 5 2-3;#B · 2 min rest;lsit_shoulderstand 3 3-6;#C · 3 min rest;hspu_band 3 6-8;hspu_btw 3 4-6",
"#A · self-paced;hspu_free a 20;#B · 3 min rest;hspu_band 3 6-8;pike_pushup 3 6-8;dips 3 8-12",
"#A · self-paced;hspu_free a 20;#B · 3 min rest;hspu_band 3 6-8;hspu_ctw 4 4-6;dips 3 8-12",
"#A · 3 min rest;hspu_free_ecc 5 2-3;#B · 2 min rest;lsit_shoulderstand 3 3-6;#C · 3 min rest;hspu_band 3 6-8;hspu_btw 4 4-6",
"#A · self-paced;hspu_free a 20;#B · 3 min rest;hspu_band 3 6-8;pike_pushup 4 6-8;dips 3 8-12"],
w:[[0,1,2],[3,4,5],[6,7,8],[6,9,8],[10,11,12],[13,14,15]]},
'90A':{u:[
"#A · 3 min rest;band_90_pushup 2 3-5;shoulder_stand 2 10-15s;planche_pushup 2 3-5;baby_90_pushup 2 5-6",
"#A · 3 min rest;ecc_90_pushup 3-6 1;hspu_band 2 4-6;bent_arm_planche 2 10-15s;dips 2 8-12",
"#A · 3 min rest;band_90_pushup 2 3-5;pike_pushup 2 5-6/floating;planche_pushup 2 3-5;baby_90_pushup 2 5-6",
"#A · 3 min rest;band_90_pushup 3 3-5;shoulder_stand 3 10-15s;planche_pushup 3 3-5;baby_90_pushup 3 5-6",
"#A · 3 min rest;ecc_90_pushup 3-6 1;hspu_band 3 4-6;bent_arm_planche 3 10-15s;dips 3 8-12",
"#A · 3 min rest;band_90_pushup 3 3-5;pike_pushup 3 5-6/floating;planche_pushup 3 3-5;baby_90_pushup 3 5-6",
"#A · 3 min rest;band_90_pushup 4 3-5;shoulder_stand 4 10-15s;planche_pushup 3 3-5;baby_90_pushup 3 6-8",
"#A · 3 min rest;ecc_90_pushup 3-4 2-3;hspu_band 3 4-6;bent_arm_planche 3 10-15s;dips 3 8-12",
"#A · 3 min rest;band_90_pushup 4 3-5;pike_pushup 3 6-8/floating;planche_pushup 3 3-5;baby_90_pushup 3 6-8",
"#A · 3 min rest;band_90_pushup 4 3-5;shoulder_stand 4 10-15s;planche_pushup 4 3-5;baby_90_pushup 3 6-8",
"#A · 3 min rest;ecc_90_pushup 3-4 2-3;hspu_band 4 4-6;bent_arm_planche 3 10-15s;dips 3 8-12",
"#A · 3 min rest;band_90_pushup 5 3-5;shoulder_stand 4 10-15s;planche_pushup 4 3-5;baby_90_pushup 3 6-8",
"#A · 3 min rest;ecc_90_pushup 4-5 2-3;hspu_band 4 4-6;bent_arm_planche 4 10-15s;dips 3 8-12",
"#A · 3 min rest;band_90_pushup 5 3-5;pike_pushup 3 6-8/floating;planche_pushup 4 3-5;baby_90_pushup 3 6-8"],
w:[[0,1,2],[3,4,5],[6,7,8],[9,10,8],[11,12,13],[11,12,13]]},
'90B':{u:[
"#A · 3 min rest;ecc_90_pushup 3-6 1;#B · self-paced;hspu_free a 10;#C · 3 min rest;hspu_ctw 2 4-6;baby_90_pushup 2 5-6",
"#A · 3 min rest;band_90_pushup 2 3-6;pike_pushup 2 5-6/floating;planche_pushup 2 3-6;dips 2 8-12",
"#A · 3 min rest;ecc_90_pushup 3-6 1;#B · 2 min rest;lsit_shoulderstand 2 3-6;#C · 3 min rest;hspu_ctw 2 4-6;baby_90_pushup 2 5-6",
"#A · 3 min rest;ecc_90_pushup 3-6 1;#B · self-paced;hspu_free a 15;#C · 3 min rest;hspu_ctw 3 4-6;baby_90_pushup 3 5-6",
"#A · 3 min rest;band_90_pushup 3 3-6;pike_pushup 3 5-6/floating;planche_pushup 3 3-6;dips 3 8-12",
"#A · 3 min rest;ecc_90_pushup 3-6 1;#B · 2 min rest;lsit_shoulderstand 3 3-6;#C · 3 min rest;hspu_ctw 3 4-6;baby_90_pushup 3 5-6",
"#A · 3 min rest;ecc_90_pushup 3-4 2-3;#B · self-paced;hspu_free a 20;#C · 3 min rest;hspu_ctw 3 5-8;baby_90_pushup 3 6-8",
"#A · 3 min rest;band_90_pushup 3 3-6;pike_pushup 3 6-8/floating;planche_pushup 3 3-6;dips 3 8-12",
"#A · 3 min rest;ecc_90_pushup 3-4 2-3;#B · 2 min rest;lsit_shoulderstand 3 3-6;#C · 3 min rest;hspu_ctw 3 5-8;baby_90_pushup 3 6-8",
"#A · 3 min rest;ecc_90_pushup 3-4 2-3;#B · self-paced;hspu_free a 25;#C · 3 min rest;hspu_ctw 3 5-8;baby_90_pushup 3 6-8",
"#A · 3 min rest;band_90_pushup 4 3-6;pike_pushup 3 6-8/floating;planche_pushup 3 3-6;dips 3 8-12",
"#A · 3 min rest;ecc_90_pushup 4-5 2-3;#B · self-paced;hspu_free a 25;#C · 3 min rest;hspu_ctw 4 5-8;baby_90_pushup 3 6-8",
"#A · 3 min rest;band_90_pushup 5 3-6;pike_pushup 3 6-8/floating;planche_pushup 3 3-6;dips 3 8-12",
"#A · 3 min rest;ecc_90_pushup 4-5 2-3;#B · 2 min rest;lsit_shoulderstand 3 3-6;#C · 3 min rest;hspu_ctw 4 5-8;baby_90_pushup 3 6-8"],
w:[[0,1,2],[3,4,5],[6,7,8],[9,10,8],[11,12,13],[11,12,13]]},
'90C':{u:[
"#A · 3 min rest;ecc_90_pushup 3-6 1;band_90_pushup 3-6 1;pseudo_planche 2 5-6/floating;baby_90_pushup 2 5-6",
"#A · 2 min rest;lsit_shoulderstand 2 3-6;#B · self-paced;hspu_free a 10;#C · 3 min rest;planche_pushup 2 3-5;dips 2 8-12",
"#A · 3 min rest;ecc_90_pushup 3-6 1;band_90_pushup 3-5 1;#B · 2 min rest;bent_arm_planche 2 10-20s;#C · 3 min rest;baby_90_pushup 2 5-6",
"#A · 3 min rest;ecc_90_pushup 3-6 1-2;band_90_pushup 2 3-6;pseudo_planche 3 5-6/floating;baby_90_pushup 3 5-6",
"#A · 2 min rest;lsit_shoulderstand 3 3-6;#B · self-paced;hspu_free a 20;#C · 3 min rest;planche_pushup 3 3-5;dips 3 8-12",
"#A · 3 min rest;ecc_90_pushup 3-6 1-2;band_90_pushup 3-5 1;#B · 2 min rest;bent_arm_planche 3 10-20s;#C · 3 min rest;baby_90_pushup 3 5-6",
"#A · 3 min rest;ecc_90_pushup 3-6 1-2;band_90_pushup 3 3-6;pseudo_planche 3 6-8/floating;baby_90_pushup 3 6-8",
"#A · 2 min rest;lsit_shoulderstand 3 3-6;#B · self-paced;hspu_free a 25;#C · 3 min rest;planche_pushup 3 3-5;dips 3 8-12",
"#A · 3 min rest;ecc_90_pushup 3-6 1-2;band_90_pushup 3 3-6;#B · 2 min rest;bent_arm_planche 3 10-20s;#C · 3 min rest;baby_90_pushup 3 6-8",
"#A · 3 min rest;ecc_90_pushup 3-6 2-3;band_90_pushup 3 3-6;pseudo_planche 3 6-8/floating;baby_90_pushup 3 6-8",
"#A · 2 min rest;lsit_shoulderstand 3 3-6;#B · self-paced;hspu_free a 25;#C · 3 min rest;planche_pushup 4 3-5;dips 3 8-12",
"#A · 3 min rest;ecc_90_pushup 3-6 2-3;band_90_pushup 4 3-6;pseudo_planche 3 6-8/floating;baby_90_pushup 3 6-8",
"#A · 3 min rest;ecc_90_pushup 3-6 1-2;band_90_pushup 4 3-6;#B · 2 min rest;bent_arm_planche 3 10-20s;#C · 3 min rest;baby_90_pushup 3 6-8"],
w:[[0,1,2],[3,4,5],[6,7,8],[9,10,8],[11,10,12],[11,10,12]]},
};

/* ---------- Begin Bodyweight, levels 1, 2, 4, 5, 6 ---------- */
const BBW_WARM=[{grp:'Warm-up · under 10 min'},{n:'Band dislocates, chest press, row and overhead press · wrist circles and extensions · 10 reps each',s:''}];
const HS='handstand';
const BBW={
 1:w=>{const a=w<4,b=w>4,arch=`arch_hold 2 ${a?'20-30s':b?'40-60s':'20-40s'}`,row=`bw_row ${b?2:3} ${b?'7-12':'6-8'}`,dip=`dips 3 ${b?'6-12':'5-10'}/band-assisted`,
   plank=`plank 3 ${b?'30-60s':'20-30s'}`,ws=`#E · 1 min rest;wall_slide ${b?3:2} 4-6`;
   const d1=`#A · superset · 2 min rest;chinups ${b?4:3} ${a?'5-8':'5-10'}/band-assisted;pushup 3 ${b?'6-12':'5-10'};#B · superset · 2 min rest;${row};${dip};#C · superset · 1 min rest;dip_shrug ${b?3:2} ${a?'4-8':'5-10'};${plank};#D · superset · 1 min rest;scap_pull ${b?3:2} 4-8;${arch};${ws}`;
   const d2=`#A · superset · 2 min rest;pullups 3 ${b?'5-10':'4-8'}/band-assisted;ecc_pushup ${b?4:3} 3-6;#B · superset · 2 min rest;${row};${dip};#C · 1 min rest;${plank};#D · superset · 2 min rest;scap_pushup ${b?3:2} 4-8;${arch};${ws}`;
   return[d1,d2,d1];},
 2:w=>{const b=w>4,push=`#B · self-paced rest;pushup a ${b?'30-40':'20-30'}`,row=`bw_row ${b?2:3} ${b?'8-15':'8-10'}`,hs=`${HS} 3 ${b?'45-60s':'30-45s'}/wall or pike progression`;
   const d1=h=>`#A · 2 min rest;ecc_chinup ${b?4:3} 3-6;${push};#C · superset · 2 min rest;${row};ecc_dip ${b?4:3} 3-6;#D · superset · 2 min rest;hollow_body 3 ${h};scap_pull ${b?2:3} ${b?'8-12':'4-8'};#E · 1 min rest;${hs};wall_slide ${b?2:3} ${b?'8-12':'5-8'}`;
   const d2=`#A · 2 min rest;pullups ${b?4:3} ${b?'4-6':'5-8'}/band-assisted;${push};#C · superset · 2 min rest;${row};dips ${b?4:3} ${b?'4-6':'5-8'}/band-assisted;#D · 1 min rest;hollow_body 3 ${b?'30-50s':'20-30s'};${hs};#E · superset · 1 min rest;scap_pushup ${b?2:3} ${b?'8-12':'4-8'};arch_hold ${b?3:2} 40-60s`;
   return[d1(b?'30-50s':'20-30s'),d2,d1(b?'30-50s':'30-40s')];},
 4:w=>{const b=w>4,hs=`${HS} 4 ${b?'40-60s':'30-45s'}/wall or pike progression`,wy=`stomach_wy 3 ${b?'6-10':'5-8'}`;
   const d1=`#A · self-paced rest;pullups a ${b?'15-30':'10-20'};#B · 2 min rest;pushup 3 ${b?'10-20':'8-15'};bw_row ${b?4:3} 6-10;#C · self-paced rest;dips a ${b?'30-40':'20-30'};#D · superset · 1 min rest;hollow_body 3 ${b?'45-60s':'30-45s'};scap_pull ${b?4:3} 5-8;#E · 1 min rest;${hs};${wy}`;
   const d2=`#A · superset · 2 min rest;chinups 3 ${b?'10-12':'8-10'}/band-assisted;dips 3 ${b?'8-12':'6-10'};#B · 2 min rest;bw_row ${b?4:3} 6-10;ecc_pike_pushup ${b?4:3} 3-6;#C · 1 min rest;ab_wheel 3 8-12;${hs};${wy}`;
   return[d1,d2,d1];},
 5:w=>{const b=w>4,hs=`${HS} ${b?4:3} 45-60s/wall or pike progression`,mid=`#B · superset · 2 min rest;bw_row ${b?2:3} ${b?'12-20':'8-12'};dips 3 ${b?'8-12':'6-10'}`;
   const d1=`#A · superset · 3 min rest;pullups ${b?5:4} 4-6;pike_pushup ${b?4:3} 4-8;${mid};#C · superset · 1 min rest;hollow_body 4 ${b?'45-60s':'30-45s'};scap_pull ${b?4:3} 4-8;#D · 1 min rest;${hs};#E · superset · 1 min rest;fr_wall_slide 3 ${b?'6-10':'4-6'};shoulder_ext 3 ${b?'10-15':'8-12'}`;
   const d2=`#A · superset · 3 min rest;chinups ${b?5:4} 4-6;pseudo_planche 2 ${b?'8-15':'8-12'};${mid};#C · 1 min rest;plank ${b?'3-4':3} ${b?'45-60s':'30-45s'};${hs};stomach_wy 3 ${b?'8-12':'6-10'}`;
   return[d1,d2,d1];},
 6:w=>{const b=w>4,hs=`#D · 1 min rest between holds;${HS} a 5m/wall or freestanding`,row=`bw_row ${b?3:2} ${b?'10-20':'12-20'}`;
   const d1=`#A · superset · 3 min rest;hspu_ecc ${b?4:3} 3-6/back to the wall;pullups 3 ${b?'6-12':'5-10'};#B · superset · 2 min rest;dips 3 ${b?'10-15':'8-10'};${row};#C · 1 min rest;ab_wheel 3 ${b?'10-20':'8-12'};${hs};#E · superset · 1 min rest;shoulder_ext 3 ${b?'12-15':'10-12'};skin_the_cat ${b?'3':'4-5'} ${b?'3-5':'1-2'}`;
   const d2=`#A · superset · 3 min rest;chinups 3 ${b?'6-12':'5-10'};pseudo_planche ${b?5:4} 4-6;#B · superset · 2 min rest;${row};pike_pushup 3 ${b?'10-15':'6-10'};#C · superset · 1 min rest;hollow_body 3 ${b?'40-60s':'30-40s'};scap_pull 3 ${b?'6-10':'4-8'};${hs};#E · 1 min rest;stomach_wy ${b?2:3} ${b?'10-15':'8-12'}`;
   return[d1,d2,d1];}};
function bbwDays(lv){const out=[];for(let w=1;w<=8;w++)BBW[lv](w).forEach((s,i)=>out.push(
  day(`ff_bbw${lv}_w${w}d${i+1}`,`Week ${w}${w>4?' · higher volume':''}`,`Week ${w}`,`Day ${i+1}`,[...BBW_WARM,...R(s,true)])));return out;}
const BBW_META={
 1:{sub:'Eight weeks · three days · bands and eccentrics',note:'For complete beginners. Bands help on chin-ups, pull-ups and dips.',
   who:'Completely new to training, or you cannot yet do a floor push-up, a dip or a pull-up.',
   what:'Band-assisted chin-ups, pull-ups and dips, push-ups and eccentric push-ups, rows, planks and the first weak-link work for the shoulder blades.'},
 2:{sub:'Eight weeks · three days · eccentrics and push-up totals',note:'Push-ups are accumulated: reach the total at your own pace.',
   who:'You finished level 1, or a few push-ups are possible but dips and pull-ups are not.',
   what:'Eccentric chin-ups and dips, a push-up total each session, rows, hollow holds and your first handstand work at the wall.'},
 4:{sub:'Eight weeks · three days · pull-up and dip totals',note:'Pull-ups and dips are accumulated: reach the total in as many sets as you need.',
   who:'You can manage a couple of pull-ups, dips and push-ups.',
   what:'Accumulated pull-ups and dips, harder push-ups and rows, eccentric pike push-ups, ab wheel and wall handstands.'},
 5:{sub:'Eight weeks · three days · straight sets, no bands',note:'Intensification: the reps now come in fewer, harder sets.',
   who:'At least ten push-ups, a handful of dips and pull-ups, no band needed.',
   what:'Pull-ups and chin-ups in sets of 4–6, pike and pseudo planche push-ups, handstands and shoulder weak-link work.'},
 6:{sub:'Eight weeks · three days · HSPU eccentrics, skin the cat',note:'Handstands are accumulated: 5 minutes of holding in as few sets as you can.',
   who:'You finished level 5 and can hold a wall handstand.',
   what:'Handstand push-up eccentrics, pull-ups, dips, pseudo planche push-ups, 5 minutes of handstand time and skin the cat.'}};
[1,2,4,5,6].forEach(lv=>{const M=BBW_META[lv];
  REG.program({id:`ff_bbw${lv}`,n:`BBW Level ${lv}`,sub:M.sub,shape:'days',group:G,by:BY,
    type:lv<=2?['Calisthenics','Beginner','Home']:['Calisthenics','Home'],note:M.note,days:bbwDays(lv)},
  `<h2 id="infoTitle">BBW Level ${lv}</h2><p class="by">Daniel Vadnal · Begin Bodyweight · level ${lv} of 6</p>
  <span class="pill2">3 days a week</span><span class="pill2">8 weeks</span><span class="pill2">Upper body</span>
  <h4>Who it is for</h4><p>${M.who}</p>
  <h4>What it is</h4><p>${M.what} Weeks 1–4 build the base, weeks 5–8 add sets, reps or hold time.</p>
  <h4>How to run it</h4>
  <ul><li><b>Three days a week</b> with a day off between. Do legs, mobility or rest on the days in between.</li>
   <li><b>Supersets.</b> Paired moves train different patterns, so do one set of each and then rest.</li>
   <li><b>Hardest first.</b> The big pulls and pushes come first. Core and weak-link work for the shoulder blades comes last and still counts.</li>
   <li><b>Eccentrics.</b> Lower over 5–8 seconds, 3–6 reps a set. When that is easy, go slower, add sets or add weight.</li>
   <li><b>Accumulate</b> means reach the total however you can: singles, doubles, then bigger sets as you get stronger.</li>
   <li><b>Too hard?</b> Use a heavier band, an incline, or drop a level. <b>Too easy?</b> Lighter band, harder progression or move up a level.</li>
   <li><b>Beat last time</b> on every exercise, even by one rep or five seconds.</li></ul>
  <p>No leg work: the program puts everything into upper-body strength. The source suggests Limitless Legs on the days between.</p>`);});

/* ---------- Hybrid programs (calisthenics + weights) ---------- */
function hybridDays(id,data,names){const out=[],last=data.w.length;
  data.w.forEach((wk,wi)=>{const w=wi+1,dl=w===last;
    wk.forEach((ix,di)=>out.push(day(`${id}_w${w}d${di+1}`,dl?`Week ${w} · deload`:`Week ${w}${w>4?' · new exercises':''}`,
      `Week ${w} · Day ${di+1}`,names[di],R(data.u[ix]),!dl,dl?'deload':undefined)));});return out;}
const HYB_INFO=(n,by,days,split)=>`<h2 id="infoTitle">${n}</h2><p class="by">Daniel Vadnal · FitnessFAQs Hybrid · ${by}</p>
  <span class="pill2">${days} days a week</span><span class="pill2">8 weeks + deload</span><span class="pill2">Calisthenics + weights</span>
  <h4>What it is</h4><p>${split} Bodyweight moves such as pull-ups, dips, vertical push-ups and ring work sit next to barbell and dumbbell lifts. Compounds come first, isolation work for arms, delts and calves after.</p>
  <h4>What to expect</h4>
  <ul><li><b>Weeks 1–4</b> keep the same exercises. Week 3–4 adds a set to the first lift and a few others.</li>
   <li><b>Weeks 5–8</b> swap in new variations and push volume again. Week 8 is the hardest.</li>
   <li><b>Week 9</b> is a deload: the first block, two sets each, no grinding.</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Rest.</b> 3–4 minutes on the heavy compounds, 2–3 on the middle lifts, 2 on isolation.</li>
   <li><b>Pick a load</b> that lands inside the rep range. When you hit the top on every set, go heavier or use a harder progression.</li>
   <li><b>Log every set.</b> The sheet has a column for intensity: write down the load or variation you used.</li></ul>`;
REG.program({id:'ff_ppl',n:'Hybrid Push Pull Legs',sub:'Nine weeks · six days · calisthenics + weights',shape:'days',group:G,by:BY,
  type:['Hypertrophy','Push-pull-legs','Gym'],note:'Pull, push, legs, twice a week. Week 9 is a deload.',
  days:hybridDays('ff_ppl',FF_PPL,['Pull 1','Push 1','Legs 1','Pull 2','Push 2','Legs 2'])},
  HYB_INFO('Hybrid Push Pull Legs','push · pull · legs',6,'Two pull days, two push days and two leg days a week.'));
REG.program({id:'ff_fb',n:'Hybrid Full Body',sub:'Nine weeks · four days · calisthenics + weights',shape:'days',group:G,by:BY,
  type:['Hypertrophy','Full body','Gym'],note:'Four different full-body days a week. Week 9 is a deload.',
  days:hybridDays('ff_fb',FF_FB,['Full body 1','Full body 2','Full body 3','Full body 4'])},
  HYB_INFO('Hybrid Full Body','full body',4,'Four full-body sessions, each opening with a different main lift.'));
REG.program({id:'ff_ul',n:'Hybrid Upper/Lower',sub:'Nine weeks · four days · calisthenics + weights',shape:'days',group:G,by:BY,
  type:['Hypertrophy','Upper/lower','Gym'],note:'Upper, lower, upper, lower. Week 9 is a deload.',
  days:hybridDays('ff_ul',FF_UL,['Upper 1','Lower 1','Upper 2','Lower 2'])},
  HYB_INFO('Hybrid Upper/Lower','upper · lower',4,'Two upper days and two lower days a week.'));

/* ---------- Body by Rings ---------- */
const BBR={
 1:['#A · 90 s rest;ring_dip 3-4 6-8/elbows in · tempo 30X1;archer_pushup 3-4 4-6L/alternating · tempo 20X0;ring_fly 3 8-10/tempo 30X0;tricep_dip 3 6-10/tempo 20X0;bw_tricep_ext 3 8-10/tempo 30X1',
    '#A · 2-3 min rest;chinups 3-5 6-8/regular, tuck L or L-sit · tempo 30X2;#B · 90 s rest;bw_row 3-4 10-15/two arms · tempo 20X1;ring_pelican_curl 3 5-8/tempo 30X0;facepull 3 8-10/on rings · tempo 30X0;ring_rollout 3 8-10/tempo 40X0',
    '#A · 90 s rest;ring_dip 3-4 6-8/elbows in · tempo 30X1;shoulder_pushup 3-4 4-8/feet on the floor · tempo 30X1;bulgarian_pushup 3-4 6-10/tempo 20X0;hs_shrug 3-4 8-12/back to the wall · 2 s hold at the top;tricep_dip 3 6-10/tempo 20X0',
    '#A · 90 s rest;mantle_chinup 3-5 4-6L/tempo 30X2;archer_row 3-4 4-8L/tempo 20X0;facepull 3 8-10/on rings · tempo 20X0;ring_curl 3-4 8-10/tempo 30X1'],
 2:['#A · 90 s rest;ring_dip 3-4 8-10/elbows in · tempo 30X1;archer_pushup 3-4 6-8L/alternating · tempo 20X0;ring_fly 3 8-12/tempo 30X0;tricep_dip 3 8-15/tempo 30X0;bw_tricep_ext 3-4 8-12/tempo 30X1;#B · finisher · self-paced;cd_diamond_pushup 1 8-15/feet elevated · down series: at failure switch to an easier push-up and keep going',
    '#A · 2-3 min rest;pullups 3-4 6-12/wide grip · tuck L · tempo 30X0;#B · 90 s rest;archer_row 3-4 6-8L/tempo 20X0;ring_pelican_curl 3 6-10/tempo 30X0;ring_rear_fly 3 8-12/tempo 30X0;ring_rollout 3 10-12/tempo 40X0',
    '#A · 90 s rest;ring_dip 3-4 5-8/Bulgarian · tempo 30X1;shoulder_pushup 3-4 6-10/feet elevated · tempo 40X1;bulgarian_pushup 3-4 8-10/tempo 30X1;hs_shoulder_tap 3-4 30-45s/chest to wall;tricep_dip 3-4 6-10/tempo 20X0',
    '#A · 90 s rest;archer_chinup 4-6 3-5L/alternating · tempo 30X0;sa_ring_row 3-4 4-8L/tempo 30X0;facepull 3-4 8-12/on rings · tempo 20X0;ring_curl 3-4 8-12/tempo 30X1;#B · hang;dead_hang c 2-4/accumulate in as few sets as you can'],
 3:['#A · 20 min accumulation;hspu_ctw c 20/as many good reps as you can, self-paced · tempo 30X1;#B · 2 min rest;ring_dip 3-5 5-8/Bulgarian · tempo 30X1;archer_pushup 3-5 6-8L/same side · tempo 30X1;ring_fly 4-5 6-8/tempo 30X0;bw_tricep_ext 5-6 5-6/tempo 30X1;tricep_dip 3-4 8-12/tempo 30X0',
    '#A · 2-3 min rest;pullups 3-5 5-8/wide grip · L-sit · tempo 30X0;#B · 2 min rest;l_row 3-5 3-8/tempo 30X0;ring_pelican_curl 3-4 6-10/tempo 40X0;ring_rear_fly 3-4 8-15/tempo 30X0;ring_rollout 3 10-15/tempo 40X1',
    '#A · 2 min rest;ring_dip 3-5 8-12/elbows in · tempo 30X1;shoulder_pushup 3-5 6-10/feet elevated · tempo 30X1;bulgarian_pushup 3-5 10-15/tempo 30X1;hs_waist_tap 3-5 30-45s/chest to wall;tricep_dip 3-4 10-12/tempo 30X1;#B · finisher · self-paced;cd_diamond_pushup 2 8-12/feet elevated · down series · tempo 30X1',
    '#A · 90 s rest;archer_chinup 3-5 4-8L/same side · tempo 30X1;#B · 2 min rest;sa_ring_row 3-5 6-10L/tempo 30X0;facepull 3-4 8-12/on rings · tempo 20X0;ring_pelican_curl 3 3-4/lowering only, 6–8 s each;ring_curl 3-4 6-10/tempo 30X1;#C · hang;one_arm_hang c 2-4/accumulate, switching arms']};
/* deload sets per row, in order; ['c',x] swaps a clock length */
const BBR_DL={1:[['1-2','1-2','1-2','1-2','1-2'],['2-3','1-2','1-2','1-2','1-2'],['1-2','1-2','1-2','1-2','1-2'],['1-2','1-2','1-2','1-2']],
  2:[['1-2','1-2','1-2','1-2','1-2','1'],['1-2','1-2','1-2','1-2','1-2'],['1-2','1-2','1-2','1-2','1-2'],['1-3','1-2','1-2','1-2',['c','1-2']]],
  3:[[['c','10'],'1-3','2-3','2-3','2-3','1-2'],['1-2','1-2','1-2','1-2','1'],['1-2','1-2','1-2','1-2','1-2','1'],['1-2','1-2','1-2','1-2','1-2',['c','1-2']]]};
function bbrDeload(str,sets){let k=0;return str.split(';').map(x=>{if(x[0]==='#')return x;const v=sets[k++],i=x.indexOf('/'),h=i<0?x:x.slice(0,i),t=i<0?'':x.slice(i);
  const p=h.split(' ');if(Array.isArray(v)){p[1]=v[0];p[2]=v[1];}else p[1]=v;return p.join(' ')+t;}).join(';');}
const BBR_N=['Push 1','Pull 1','Push 2','Pull 2'],BBR_DAYS=[];
[1,2,3].forEach(ph=>{BBR[ph].forEach((s,i)=>BBR_DAYS.push(day(`ff_bbr_p${ph}_${i+1}`,`Phase ${ph}`,`Phase ${ph} · session ${i+1}`,BBR_N[i],R(s))));
  BBR[ph].forEach((s,i)=>BBR_DAYS.push(day(`ff_bbr_p${ph}dl_${i+1}`,`Phase ${ph} · deload week`,`Phase ${ph} · deload`,BBR_N[i],R(bbrDeload(s,BBR_DL[ph][i])),false,'deload')));});
REG.program({id:'ff_bbr',n:'Body by Rings',sub:'Three phases · push and pull · gymnastic rings',shape:'days',group:G,by:BY,
  type:['Hypertrophy','Rings','Home'],note:'Repeat the four sessions each week until progress slows, then take the deload week and move on.',days:BBR_DAYS},
  `<h2 id="infoTitle">Body by Rings</h2><p class="by">Daniel Vadnal · push and pull on gymnastic rings</p>
  <span class="pill2">4 sessions</span><span class="pill2">3 phases</span><span class="pill2">Tempo work</span>
  <h4>What it is</h4><p>A muscle-building upper-body plan on rings: two push days and two pull days. Ring dips, archer and Bulgarian push-ups, chin-ups and rows carry the load, with ring flys, curls and triceps work after. Each phase moves to harder variations.</p>
  <h4>How to run it</h4>
  <ul><li><b>Tempo.</b> Four digits: seconds down, pause at the bottom, up (X = fast), pause at the top. 30X1 means three seconds down, no pause, drive up, one second at the top.</li>
   <li><b>Rest</b> 90 s in phases 1–2 and 2 minutes in phase 3. The first pull of a pull day gets 2–3 minutes.</li>
   <li><b>Down series.</b> At failure on diamond push-ups, switch to an easier push-up and keep going.</li>
   <li><b>Deload.</b> Each phase has a lighter week: one or two sets of the same work.</li>
   <li><b>Legs</b> are not included. Limitless Legs is the suggested pairing.</li></ul>
  <h4>Phase length</h4><p>The sheets do not say how many weeks each phase lasts. Repeat the four sessions weekly while you still add reps or harder variations, then deload and move to the next phase.</p>`);

/* ---------- Handstand Pro: strength phases 2–4 ---------- */
const HSPS_PH=[['2A','Phase 2A','wall HSPU'],['2B','Phase 2B','wall HSPU'],['3A','Phase 3A','freestanding HSPU'],['3B','Phase 3B','freestanding HSPU'],
  ['90A','90° 1A','90° push-up'],['90B','90° 1B','90° push-up'],['90C','90° 1C','90° push-up']],HSPS_DAYS=[];
HSPS_PH.forEach(([k,lab,focus])=>{const D=FF_HSPS[k];D.w.forEach((wk,wi)=>wk.forEach((ix,di)=>
  HSPS_DAYS.push(day(`ff_hsps_${k.toLowerCase()}_w${wi+1}d${di+1}`,`${lab} · ${focus}`,`${lab} · week ${wi+1}`,`Day ${di+1}`,R(D.u[ix])))));});
REG.program({id:'ff_hsps',n:'Handstand Pro Strength 2–4',sub:'Wall HSPU to freestanding and the 90° push-up · 42 weeks',shape:'days',group:G,by:BY,
  type:['Skill','Handstand'],note:'Follows Handstand Pro (phase 1). Seven blocks of six weeks, three days a week.',days:HSPS_DAYS},
  `<h2 id="infoTitle">Handstand Pro Strength 2–4</h2><p class="by">Daniel Vadnal · Handstand Pro · strength track after phase 1</p>
  <span class="pill2">3 days a week</span><span class="pill2">7 × 6 weeks</span><span class="pill2">3 min rest</span>
  <h4>What it is</h4><p>The rest of the Handstand Pro strength track. Phase 1 is the separate Handstand Pro program. Here you move from full handstand push-ups against the wall to freestanding ones, then to the 90° push-up.</p>
  <ul><li><b>Phase 2A–2B.</b> Back-to-wall and chest-to-wall handstand push-ups, pike and baby 90° push-ups, shoulder stands and wall walks.</li>
   <li><b>Phase 3A–3B.</b> Band-assisted and freestanding handstand push-ups, freestanding eccentrics and L-sit to shoulder stand.</li>
   <li><b>90° 1A–1C.</b> Band-assisted and eccentric 90° push-ups with planche push-ups, bent-arm planche and freestanding HSPU totals.</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Long rests.</b> Three minutes between hard sets, two on the holds. Quality over volume.</li>
   <li><b>Sets climb</b> from two to four or five across each six-week block.</li>
   <li><b>Accumulated reps</b> (wall walks, freestanding HSPU) are a total done at your own pace.</li>
   <li><b>Log the intensity</b> you used: band strength, wall distance or range.</li></ul>`);

/* ---------- Handstand Pro: balance track ---------- */
const HSB=[
 ['1A','Overcome fear',['hollow_body 2 30-45s/scan head to toe and stay tight;wall_tuck_bail 3 5/three sets or more · start low, build to vertical;wall_hollow 3-5 20-45s/an angle you can exit from;hs_cartwheel 10 1/ten or more · land quietly',
   'wall_walk a 25/keep the torso still;wall_hollow 3-5 20-45s;hs_cartwheel 10 1/ten or more · land quietly',0]],
 ['1B','Overcome fear',['hollow_body 1 60s/one set to switch on;hs_cartwheel 5 1/hands close to the wall;hs_split_leg 3-5 20-40s/toe taps if needed;hs_hold 3-5 20-40s/hands as close to the wall as you can;heel_pulls a 25/to the floor · fingers do the work, no kicking',
   'hollow_body 1 60s;hs_cartwheel 5 1;hs_end_range 5 3-5/scissor the legs together, then back to the wall;hs_hold 3-5 20-40s;heel_pulls a 25/to the floor',0]],
 ['2A','Learning balance',['hs_hold 2 30-60s/alignment, short of fatigue;toe_pulls 3 1-5/pull into balance and hold;heel_pulls 3 1-5/to balance · fingers pull you straight;hs_split_leg 3-5 20-40s;hs_kickup a 25/kick up to split leg, no need to balance yet',
   'hs_hold 2 30-60s;toe_pulls 3 1-5;heel_pulls 3 1-5/to balance;hs_split_leg 3-5 20-40s;wall_walk a 25',0]],
 ['2B','Learning balance',['hs_split_leg 3-5 20-40s/freestanding;heel_pulls 3 1-5/to balance · hold longer each rep;toe_pulls 3 1-5/hold longer each rep;hs_kickup a 25/start pausing in balance;hs_hold 2 max/aim past 40 s',
   'hs_kickup a 25;hs_hold 2 30-60s;hs_split_leg 2 20-40s;hs_end_range 5 1-5/five sets or more · aim for longer freestanding holds;wall_walk a 25',0]],
 ['3A','Freestanding mastery',['hs_hold 2 30-60s;hs_split_leg 3-5 20-40s;toe_pulls 3 1-5;hs_kickup a 30-40/kick up faster, pause in balance;wall_tuck_slide 4 3-6/slow, hips to 90°',
   'heel_pulls 3 1-5/to balance;toe_pulls 3 1-5;hs_end_range 5 1-5/five sets or more;hs_kickup a 30-40;hs_hold 2 max',0]],
 ['3B','Freestanding mastery',['hs_end_range 2 3-5/warm-up, short of fatigue;hs_kickup 5 1;handstand a 3m/freestanding · time it with a stopwatch;hs_hold 2 max',
   'hs_split_leg 2 20-40s;hs_kickup 5 1;handstand 5-10 max/freestanding · only balanced sets count;wall_tuck_slide 3 max/pause in the deep tuck',
   'hs_end_range 2 3-5;hs_kickup 5 1;handstand a 3m/freestanding;hs_hold a 3m/push tall']],
 ['4A','Shape holds',['hs_hold 2 30-60s/warm-up, short of fatigue;hs_split_leg 3-5 max;hs_shape 3-5 max/stag;handstand 3-5 max/full · aim for 30 s plus;hs_shape 3-5 max/tuck · push tall',
   'hs_hold 2 30-60s;handstand 3-5 max/full;hs_shape 3-5 max/half straddle;hs_shape 3-5 max/diamond;hs_shape 3-5 max/pike straddle',
   'hs_hold 2 30-60s;hs_shape 3-5 max/full straddle;hs_split_leg 3-5 max;hs_shape 3-5 max/diamond;wall_tuck_slide 2 max/or hold the deep tuck']],
 ['4B','Shape changing',['handstand 3 max/freestanding · go for 1 min;hs_shape_change 3-5 max/full ↔ stag;hs_shape_change 3-5 max/full ↔ full straddle;hs_shape_change 3-5 max/full ↔ tuck',
   'handstand 3 max/freestanding;hs_shape_change 3-5 max/full straddle ↔ diamond;hs_shape_change 3-5 max/half straddle ↔ split leg;hs_shape_change 3-5 max/full straddle ↔ pike straddle',
   'handstand 3 max/freestanding;hs_shape_change 3-5 max/tuck ↔ full · push tall;hs_shape_change 3-5 max/tuck ↔ split leg;hs_shape_change 3-5 max/tuck ↔ diamond']],
 ['4C','Freestyle',['handstand 3 max/freestanding · go for 1 min;hs_shape_change 3-5 max/full ↔ a shape you choose;hs_shape_change 3-5 max/tuck ↔ a shape you choose;hs_shape_change 3-5 20-60s/freestyle: move between shapes at random;hs_hold 2 max/push tall',
   'handstand 3 max/freestanding;hs_shape_change 3-5 max/straddle ↔ a shape you choose;hs_shape_change 3-5 max/tuck ↔ a shape you choose;hs_shape_change 3-5 20-60s/freestyle;wall_tuck_slide 2 max',
   'handstand 3 max/freestanding;hs_shape_change 3-5 max/split leg ↔ a shape you choose;hs_shape_change 3-5 max/tuck ↔ a shape you choose;hs_shape_change 3-5 20-60s/freestyle · fast and slow;hs_hold 2 max']]];
const HSB_DAYS=[];
HSB.forEach(([k,title,d])=>{const ds=[d[0],d[1],d[2]===0||d[2]===undefined?d[0]:d[2]];
  ds.forEach((s,i)=>HSB_DAYS.push(day(`ff_hspb_${k.toLowerCase()}_d${i+1}`,`${k} · ${title}`,`Balance ${k}`,`Day ${i+1}`,
    [{grp:'Warm-up'},{n:'Wrist warm-up',s:''},{grp:'Practice · rest as needed'},...R(s)],true,'skill')));});
REG.program({id:'ff_hspb',n:'Handstand Pro Balance',sub:'Nine blocks · from fear of falling to freestanding shapes',shape:'days',group:G,by:BY,
  type:['Skill','Handstand'],note:'Pairs with the strength track. Stay on a block until its sessions feel solid.',days:HSB_DAYS},
  `<h2 id="infoTitle">Handstand Pro Balance</h2><p class="by">Daniel Vadnal · Handstand Pro · balance track</p>
  <span class="pill2">3 days a week</span><span class="pill2">9 blocks</span><span class="pill2">Skill practice</span>
  <h4>What it is</h4><p>The balance side of Handstand Pro, step by step: safe exits from the wall, the split-leg handstand, kick-ups, toe and heel pulls to balance, freestanding holds and finally changing shapes in balance.</p>
  <ul><li><b>1A–1B · Overcome fear.</b> Bails, cartwheel exits, wall hollows and heel pulls.</li>
   <li><b>2A–2B · Learning balance.</b> Toe and heel pulls to balance, split-leg holds, kick-ups.</li>
   <li><b>3A–3B · Freestanding mastery.</b> Faster kick-ups and minutes of freestanding time.</li>
   <li><b>4A–4C · Shapes.</b> Stag, tuck, straddles and diamond, held and then changed in balance.</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Warm the wrists</b> every session.</li>
   <li><b>Practise fresh.</b> Balance is a skill: stop a set when the quality drops, not at exhaustion.</li>
   <li><b>Keep the wall work.</b> Chest-to-wall holds build the base that freestanding balance needs.</li>
   <li><b>Block length.</b> The sheets give no week count. Repeat a block until the targets come easily, then move on.</li></ul>`);

/* ---------- Home Hero ---------- */
const VP='pullups 3 5-10/vertical pull: pull-up, chin-up or finger-assisted chin-up',VPU='dips 3 5-10/vertical push: dip, pike push-up or wall HSPU',
  HP=r=>`bw_row 3 ${r}/horizontal pull: row or archer row`,HPU=r=>`pushup 3 ${r}/horizontal push: push-up, pseudo planche or archer`,
  CALF='cd_calf_raise 3 F/pause top and bottom',NORD='nordic 3 5/lowering only',HANG='legraise 3 8-15/hanging knee or leg raise';
const HH=[
 ['Full body 1',`#A · superset · 1 min rest;${VP};bw_step_up 3 8-12;#B · superset · 1 min rest;${VPU};backext 3 10-15;#C · superset · 2 min rest;${HP('8-15')};${HPU('8-15')};#D · superset · 1 min rest;${CALF};hollow_body 3 30-45s`],
 ['Full body 2',`#A · superset · 1 min rest;${VP};pistol 3 8-12;#B · superset · 1 min rest;${VPU};${NORD};#C · superset · 2 min rest;${HP('8-15')};${HPU('8-15')};#D · superset · 1 min rest;${CALF};l_sit 3 15-30s`],
 ['Full body 3',`#A · superset · 1 min rest;pullups 3 8-12/vertical pull;bw_step_up 3 8-12;#B · superset · 1 min rest;${VPU};${HANG};#C · superset · 1 min rest;nordic_hinge 3 6-12;${HP('8-15')};#D · superset · 1 min rest;revnordic 3 8-15;${CALF}`],
 ['Upper body 1',`#A · superset · 2 min rest;${VP};${VPU};#B · superset · 2 min rest;${HP('8-12')};${HPU('8-12')};#C · superset · 1 min rest;backext 3 10-15;hollow_body 3 30-45s;#D · 1 min rest;handstand 3-5 30-60s/pike or chest-to-wall`],
 ['Upper body 2',`#A · superset · 2 min rest;${VP};${VPU};#B · superset · 2 min rest;${HP('8-12')};${HPU('8-12')};#C · superset · 1 min rest;backext 3 10-15;${HANG};#D · 1 min rest;handstand 3-5 30-60s/pike or chest-to-wall`],
 ['Upper body 3',`#A · superset · 2 min rest;${VP};${VPU};#B · superset · 2 min rest;${HP('8-12')};${HPU('8-12')};#C · superset · 1 min rest;backext 3 10-15;l_sit 3 15-30s;#D · 1 min rest;handstand 3-5 30-60s/pike or chest-to-wall`],
 ['Lower body 1',`#A · superset · 2 min rest;bw_step_up 3 8-12;${NORD};#B · superset · 2 min rest;backext 3 10-15;revnordic 3 8-15;#C · superset · 1 min rest;${CALF};hollow_body 3 30-45s`],
 ['Lower body 2',`#A · superset · 2 min rest;pistol 3 8-12/to a box if needed;backext 3 10-15;#B · superset · 2 min rest;sissy_squat 3 8-12;nordic_hinge 3 6-12;#C · superset · 1 min rest;${CALF};${HANG};#D · 2 min rest;revnordic 3 8-15`],
 ['Lower body 3',`#A · superset · 1 min rest;bw_step_up 3 8-12;${CALF};#B · superset · 2 min rest;${NORD};l_sit 3 15-30s;#C · superset · 2 min rest;backext 3 10-15;revnordic 3 8-15`]];
REG.program({id:'ff_homehero',n:'Home Hero',sub:'Nine home workouts · full body, upper or lower',shape:'days',group:G,by:BY,
  type:['Calisthenics','Home','Full body'],note:'Pick one style: full body, or upper and lower. Two to three sessions a week each.',
  days:HH.map(([n,s],i)=>day(`ff_homehero_${i+1}`,n.replace(/ \d$/,''),`Workout ${i+1}`,n,R(s)))},
  `<h2 id="infoTitle">Home Hero</h2><p class="by">Daniel Vadnal · free home calisthenics plan</p>
  <span class="pill2">Pull-up bar + chairs</span><span class="pill2">Supersets</span><span class="pill2">Any level</span>
  <h4>What it is</h4><p>Three full-body, three upper-body and three lower-body workouts you can do at home with a pull-up bar, two sturdy chairs and a band. Rings help but are not needed.</p>
  <h4>Pick your exercise</h4><p>Most upper-body slots are a category. Choose the move that fits your level:</p>
  <ul><li><b>Vertical pull</b> · pull-up, chin-up, finger-assisted chin-up.</li>
   <li><b>Vertical push</b> · dip, pike push-up, back- or chest-to-wall handstand push-up.</li>
   <li><b>Horizontal pull</b> · bodyweight row, archer row.</li>
   <li><b>Horizontal push</b> · push-up, pseudo planche push-up, archer push-up.</li></ul>
  <h4>How to run it</h4>
  <ul><li><b>Full body</b> three days a week, or <b>upper/lower</b> over four to five days. Leave 24–48 hours before training the same muscles again.</li>
   <li><b>Supersets.</b> Same letter, one set of each, then rest.</li>
   <li><b>Progress</b> each workout: more reps, a harder progression or a weighted backpack.</li></ul>`);

/* ---------- approaches ---------- */
REG.approach({id:'ff_accumulate',by:BY,n:'Accumulate, then intensify',
  short:'Hit a rep total at your own pace first, then pack the same reps into fewer, harder sets.',
  gp:{s:[3,4],r:[3,8],rest:120,rpe:8},fmt:'super',prog:'setsreps',
  cues:['full range, every rep','5–8 s on the way down'],prefer:'pull|chin|dip|push|row|hollow|handstand|scap',
  details:'Beginners reach a total, say 20 push-ups, in singles and doubles with rest as needed. As strength grows the sets get bigger, then the work is condensed into straight sets like 4 × 5. Moves you cannot do yet are trained as 3–6 slow eccentrics or with a band. Pushes and pulls are paired in supersets for balance. It is a steady level-by-level path, not a max-effort test.'});
REG.approach({id:'ff_skill_first',by:BY,n:'Skill first, weak links last',
  short:'Practise the skill fresh, then the big compounds, then small shoulder and grip work.',
  gp:{s:[3,5],r:[3,6],rest:180,rpe:8},fmt:'straight',prog:'reps',
  cues:['stop when quality drops','rest until fully fresh'],prefer:'handstand|hspu|pike|planche|pull|chin|dip|hang|scap',
  details:'Balance and hard skills go first while the nervous system is fresh, with long rests of about three minutes. The big pulls and pushes follow. The session ends with weak-link work: scapula pulls, wall slides, external rotation, hangs. It is small but it keeps shoulders and elbows healthy and removes bottlenecks. Train a lift two or three times a week, not every day.'});
REG.approach({id:'ff_hybrid',by:BY,n:'Hybrid: bodyweight + weights',
  short:'Calisthenics and free weights together: heavy compounds first, isolation after.',
  gp:{s:[3,4],r:[6,15],rest:150,rpe:8},fmt:'straight',prog:'double',
  cues:['top of the range, then go harder'],prefer:'pull|chin|dip|ring|row|press|squat|deadlift',
  details:'Neither bodyweight-only nor weights-only. Pull-ups, dips and vertical push-ups sit next to barbell and dumbbell lifts. Compounds in the 6–10 range get 3–4 minutes of rest, isolation in the 10–20 range gets 2. Rings add flys, curls and rows with a strict tempo. Sets climb across a block, the exercises change halfway and a deload week closes it.'});
})();
