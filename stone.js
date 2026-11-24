/* BLOCK. The Stone Circle (Cody Janko): heavy sandbags plus high-rep calisthenics for strength-endurance.
   Sandbag Foundation phase one and two as shown in his free program video, his density and interval
   methods as approaches, and the exercises he teaches on the channel. Notes are in our own words. */
(function(){
const R=window.BLOCK_REG;if(!R)return;
const YT='https://www.youtube.com/watch?v=',SF=YT+'GRW0sCfbFzc';

R.ex({
  sc_bearhug_carry:{n:'Sandbag Bear Hug Carry',c:'carry',u:'min',v:SF+'&t=428s'},
  sc_shoulder_carry:{n:'Sandbag Shoulder Carry',c:'carry',u:'min',v:SF+'&t=696s'},
  sc_box_squat:{n:'Sandbag Box Squat · Lap to Chest',c:'weighted',v:YT+'Fb7e3xSV2NU'},
  sc_lean:{n:'Sandbag Lean',c:'weighted',v:YT+'pzhUM5RSQ-w'},
  sc_row:{n:'Sandbag Row · Explosive',c:'weighted',v:SF+'&t=1308s'},
  sc_to_shoulder:{n:'Sandbag to Shoulder',c:'power',v:YT+'SiGNsskOA6w'},
  sc_ground_chest:{n:'Sandbag Ground to Chest',c:'power',v:YT+'TqEnUh9XNFw&t=526s'},
  sc_pump_curls:{n:'Band Curls · Three Grips',c:'banded',v:YT+'SSpUoMfXQQs&t=103s'},
  sc_incline_pushup:{n:'Incline Knee Push-Up',c:'bodyweight'},
  sc_diamond_pushup:{n:'Diamond Push-Up',c:'bodyweight'},
  sc_decline_pushup:{n:'Decline Push-Up',c:'bodyweight'},
  sc_bk_pike:{n:'Bent-Knee Pike Push-Up',c:'bodyweight'},
  sc_overhand_row:{n:'Ring Row · Overhand',c:'bodyweight',v:SF+'&t=1523s'},
  sc_underhand_row:{n:'Ring Row · Underhand',c:'bodyweight',v:SF+'&t=1746s'},
  sc_ring_curl:{n:'Ring Curl',c:'bodyweight'},
  sc_ring_ext:{n:'Ring Triceps Extension',c:'bodyweight'}
});
R.steps({
  sc_bearhug_carry:['Lap the bag, wrap both arms around it and stand with it high on the chest.','Before you stand, let the bag sit a little below the sternum and take a big breath.','Walk with short steps and a rigid trunk, breathing slowly behind the brace.','Put it down at about 6–7 out of 10 effort, recover, pick it up again. Count laps or distance for the whole block.'],
  sc_shoulder_carry:['Get the bag to one shoulder, catching it on the upper arm and shoulder rather than the forearm.','Stand tall: do not let the bag pull you into a side bend.','Walk steady laps, put it down before your form goes.','Switch shoulders every lap so both sides carry the same distance.'],
  sc_box_squat:['Sit on a box with the bag on your lap, thighs about parallel.','Hug the bag to the chest: fingers laced to start, an S-grip later.','Lean back slightly and rock forward to drive up off the box with the bag held high.','Sit back down under control. Rest 1–2 seconds on the box between reps, or longer if you need a rest-pause.'],
  sc_lean:['Stand with the bag hugged at chest height.','Brace hard, push the hips and glutes forward and lean the upper body back from the hips.','Hold the lean for about 5 seconds, breathing behind the brace.','Come back upright, pause, lean again. Start with a light bag; it teaches the lean-back finish heavy lifts need.'],
  sc_row:['Feet outside the bag, hips high, chest proud, hands under the sides of the bag.','Grip underneath (false grip) or with the fingertips (claw), whichever keeps you more upright.','Pull the bag explosively to the lap or stomach, keeping the torso angle fixed.','Lower it to the floor and reset. Treat every rep as a single.'],
  sc_to_shoulder:['Lay the bag flat on the floor and drape your arms over it.','Push the hips back, then jump and throw in one movement, extending the ankles, knees, hips and upper back.','Turn the bag in the air and catch it on the upper arm and shoulder, not the forearm.','Drop it back down and alternate shoulders.'],
  sc_ground_chest:['Use a bag near your bodyweight, lying flat between the feet.','Hips back, arms around the bag, chest up.','Explode up and pop the bag to chest height in one move, with no stop on the lap.','Lower it and wait for the next interval. One crisp rep at a time.'],
  sc_pump_curls:['Use a light band under the feet or around a post.','Curl with palms up, then palms facing in, then palms down.','No counting: keep the reps smooth and stop at a good pump.','Between heavy sets, to bring blood to the elbows and forearms.'],
  sc_incline_pushup:['Hands on a bench or box, knees on the floor.','Lower the chest to the edge with the body in one line.','Press back up. Move to full push-ups once you get about 100 reps in 5 minutes.'],
  sc_diamond_pushup:['Hands together under the chest, thumbs and index fingers making a diamond.','Elbows track back along the ribs as you lower.','Touch the chest to the hands and press up. Elevate the hands to make it easier.'],
  sc_decline_pushup:['Feet on a box or bench, hands under the shoulders.','Lower the chest to the floor with the body in one line.','Press up. The higher the feet, the more it works the shoulders.'],
  sc_bk_pike:['Hands on the floor, hips high, knees bent and resting on a box or the floor.','Lower the top of the head toward the floor between the hands.','Press back up with the hips stacked over the shoulders.'],
  sc_overhand_row:['Hang under rings or a low bar, palms down, body in one line.','Pull the chest to the hands, squeezing the shoulder blades.','Lower all the way. Walk the feet forward to make it harder.'],
  sc_underhand_row:['Hang under rings or a low bar, palms up.','Pull the chest to the hands with the elbows close.','Lower all the way. Walk the feet forward to make it harder.'],
  sc_ring_curl:['Hold the rings palms up and lean back with straight arms.','Curl yourself up by bending only at the elbows, rings to the forehead.','Lower slowly. Step forward to make it harder.'],
  sc_ring_ext:['Hold the rings, arms straight in front, and lean forward.','Bend only at the elbows, lowering the head past the hands.','Press back to straight arms. Step back to make it easier.']
});

R.group('The Stone Circle',{blurb:'Cody Janko trains heavy sandbags and high-rep calisthenics for strength-endurance: timed density blocks, long carries and plenty of neck and arm work.'});

R.approach({id:'sc_density',by:'The Stone Circle',n:'Density blocks: most work in a fixed time',short:'Set a clock, beat last time\'s reps or distance. Simple lifts, no fancy periodization.',fmt:'amrap',gp:{rest:30,rpe:7},
  prefer:'Sandbag|Carry|Box Squat|Push-Up|Row',cues:['stop each set at 6–7 out of 10','beat last time by one rep or one lap'],
  details:'Pick a few simple moves and give each a time block: 20 minutes of carries, 10 minutes of box squats, 5 minutes of push-ups. Work in sets you can repeat, stopping before you grind, and count everything. Next session, beat the total. When you reach a target (for example 100 box squats in 10 minutes), make it heavier and build back up.'});
R.approach({id:'sc_ladder',by:'The Stone Circle',n:'3-2-1 calisthenics ladder',short:'Four moves, 3 reps each, then 2, then 1, as many rounds as fit in 20–25 minutes.',fmt:'circuit',gp:{rest:15,rpe:7},
  prefer:'Push-Up|Row|Pike|Ab Wheel|Leg Raise|Dips|Chin',cues:['short sets, steady pace','same rounds faster, then add a round'],
  details:'Choose a row, two push-up variations and an ab move. One round is 3 reps of each, then 2 of each, then 1 of each. Do as many rounds as you can in 20–25 minutes. Once you get the same rounds in under 20 minutes, add a round. At 13 rounds in under 25 minutes, change to a 5-3-2 ladder or harder variations.'});
R.approach({id:'sc_wolf',by:'The Stone Circle',n:'Power intervals: one rep on the clock',short:'One explosive sandbag rep per interval for 30 minutes, then shorten the interval.',fmt:'emom',gp:{rest:45,rpe:7},
  prefer:'Sandbag|Shoulder|Clean|Ground to|Swing|Snatch',cues:['every rep crisp, never a grind','shorten the interval, not the session'],
  details:'Cody calls this kind of work power-endurance. Use a bag around bodyweight and do one explosive rep, such as ground to chest, at the top of every minute for 30 minutes. Over the weeks, shorten the interval step by step toward one rep every 20 seconds. Pick a weight you can move fast for the whole block.'});

const neck=[{id:'neck_flexion',s:'3 × 25',nt:'bodyweight to start: lie over the bag, full range'},{id:'neck_extension',s:'3 × 25',nt:'pair with the flexion'}];
const p1A=[
  {grp:'Carry · 20 min'},{id:'sc_bearhug_carry',s:'20 min',nt:'max distance: carry to 6–7/10, drop, recover, go again. Tally the laps'},
  {grp:'Squat · 10 min'},{id:'sc_box_squat',s:'10 min',nt:'max reps in sets you can repeat; log the total'},
  {grp:'Push · 5 + 5 min'},{id:'pushup',s:'5 min',nt:'max reps. Knee or incline push-ups to start, diamond or feet up when you pass 100'},
  {id:'pike_pushup',s:'5 min',nt:'max reps'}];
const p1B=p1A.map(x=>x.id==='sc_bearhug_carry'?{id:'sc_shoulder_carry',s:'20 min',nt:'max distance, switch shoulders every lap so both sides match'}:x);
R.program({id:'sc_found1',n:'Sandbag Foundation · Phase One',sub:'One sandbag, a box and push-ups · 3 days a week · 40 min',shape:'days',
  group:'The Stone Circle',by:'The Stone Circle',type:['Sandbag','Strength-endurance','Calisthenics'],
  note:'Alternate A and B: A-B-A one week, B-A-B the next. Start with a 35–45 kg bag. When you hit 100 box squats in 10 minutes, add about 5 kg. Move to phase two at 100 reps with roughly 57 kg.',
  days:[
    {key:'sc_f1a',eyebrow:'Workout A',n:'Bear hug carry + box squat',hard:true,tag:'40 min',items:p1A},
    {key:'sc_f1b',eyebrow:'Workout B',n:'Shoulder carry + box squat',hard:true,tag:'40 min',items:p1B}]},
`<h2 id="infoTitle">Sandbag Foundation · Phase One</h2><p class="by">The Stone Circle's free beginner program for heavy sandbags and calisthenics</p>
<span class="pill2">One sandbag + box</span><span class="pill2">40 min</span><span class="pill2">3 days a week</span>
<h4>The idea</h4><p>Four timed blocks: a 20-minute carry, 10 minutes of box squats and 5 minutes each of two push-up variations. You don't count sets. You count total work in the time, and next session you try to beat it.</p>
<h4>How to run it</h4><p>Alternate workout A (bear hug carry) and B (shoulder carry), three days a week. Carry until it feels like 6–7 out of 10, drop the bag, recover and pick it up again. The box squat is the benchmark: at 100 reps in 10 minutes, the bag gets heavier and everything builds back up.</p>
<h4>Push-ups</h4><p>Start with knee or incline push-ups, then full push-ups, then diamond or feet-elevated. Move up a version once you pass about 100 reps in 5 minutes.</p>
<h4>How long</h4><p>Cody expects this phase to take months, possibly a year. Go to phase two once you can do 100 box squats in 10 minutes with about 57 kg (125 lb).</p>
<h4>Source</h4><p><a href="${SF}" target="_blank" rel="noopener">Sandbag Foundation (YouTube)</a>. The full PDF is free on thestonecircletraining.com.</p>`);

R.program({id:'sc_found2',n:'Sandbag Foundation · Phase Two',sub:'Two sandbag days, two calisthenics circuits · 4 days a week',shape:'days',
  group:'The Stone Circle',by:'The Stone Circle',type:['Sandbag','Calisthenics','Strength-endurance'],
  note:'Sandbag A, calisthenics A, sandbag B, calisthenics B. About 70 kg is the standard bag. Rings, an ab wheel, light bands and ideally a neck harness.',
  days:[
    {key:'sc_f2sa',eyebrow:'Sandbag A',n:'Lean, shoulder carry, box squat',hard:true,tag:'40 min',items:[
      {grp:'Lean'},{id:'sc_lean',s:'3 × 3',nt:'5-second hold each lean'},{id:'sc_pump_curls',s:'3 sets',nt:'between lean sets, three grips, no counting'},
      {grp:'Density'},{id:'sc_shoulder_carry',s:'10 min',nt:'max distance, even on both shoulders'},{id:'sc_box_squat',s:'10 min',nt:'max reps'},
      {grp:'Neck'},...neck]},
    {key:'sc_f2ca',eyebrow:'Calisthenics A',n:'Ladder circuit A',hard:true,tag:'45 min',items:[
      {grp:'3-2-1 ladder · max rounds in 20–25 min'},{id:'sc_overhand_row',s:'3, 2, 1',nt:'3 reps of each move, then 2 of each, then 1 of each = one round'},
      {id:'sc_diamond_pushup',s:'3, 2, 1'},{id:'ab_wheel',s:'3, 2, 1',nt:'or hanging leg raises'},{id:'sc_decline_pushup',s:'3, 2, 1'},
      {grp:'Accessories'},{id:'facepull',s:'5 min',nt:'band, max reps'},{id:'sc_ring_curl',s:'10 min',nt:'superset with the extension, max reps'},{id:'sc_ring_ext',s:'10 min'}]},
    {key:'sc_f2sb',eyebrow:'Sandbag B',n:'Lean, rows, bear hug carry',hard:true,tag:'40 min',items:[
      {grp:'Lean'},{id:'sc_lean',s:'3 × 3',nt:'5-second hold each lean'},{id:'sc_pump_curls',s:'3 sets',nt:'between lean sets'},
      {grp:'Rows'},{id:'sc_row',s:'10 × 1',nt:'singles to start, add a rep somewhere every session until 10 sets are bigger'},
      {grp:'Density'},{id:'sc_bearhug_carry',s:'10 min',nt:'max distance'},
      {grp:'Neck'},...neck]},
    {key:'sc_f2cb',eyebrow:'Calisthenics B',n:'Ladder circuit B',hard:true,tag:'45 min',items:[
      {grp:'3-2-1 ladder · max rounds in 20–25 min'},{id:'sc_underhand_row',s:'3, 2, 1'},{id:'pushup',s:'3, 2, 1'},
      {id:'ab_wheel',s:'3, 2, 1',nt:'or hanging leg raises'},{id:'sc_bk_pike',s:'3, 2, 1'},
      {grp:'Accessories'},{id:'facepull',s:'5 min',nt:'band, max reps'},{id:'sc_ring_curl',s:'10 min',nt:'superset with the extension'},{id:'sc_ring_ext',s:'10 min'}]}]},
`<h2 id="infoTitle">Sandbag Foundation · Phase Two</h2><p class="by">The second half of The Stone Circle's free beginner program</p>
<span class="pill2">Sandbag + rings</span><span class="pill2">40–45 min</span><span class="pill2">4 days a week</span>
<h4>Sandbag days</h4><p>Each starts with leans: hug the bag, push the hips forward and lean back for about 5 seconds. It builds the lean-back finish that heavy lap-to-chest and shoulder lifts need. Light band curls between lean sets keep the elbows happy. Then a 10-minute carry and either 10 minutes of box squats or 10 sets of explosive rows. Rows start as singles, and you add reps a little at a time.</p>
<h4>Calisthenics days</h4><p>A 3-2-1 ladder of a row, two push-up variations and an ab move: 3 reps of each, then 2, then 1. That is one round. Do as many rounds as you can in 20–25 minutes. Get the same rounds done faster, and once you are under 20 minutes add a round. The long-term goal is 13 rounds in under 25 minutes, then a 5-3-2 ladder.</p>
<h4>Neck</h4><p>Start with bodyweight only, lying over the bag, and build to 3 sets of 25 before you add a towel or harness. Cody includes it to protect the neck under heavy carries.</p>
<h4>Source</h4><p><a href="${SF}&t=887s" target="_blank" rel="noopener">Sandbag Foundation phase two (YouTube)</a>.</p>`);

const wolf=[
  {grp:'Warm-up'},{id:'sc_pump_curls',s:'2 sets'},{id:'sc_lean',s:'2 × 3'},
  {grp:'Power intervals · 30 min'},{id:'sc_ground_chest',s:'30 × 1',nt:'one rep at the top of every minute; later every 45, 30, 20 seconds'}];
R.program({id:'sc_wolf',n:'Power-Endurance Intervals',sub:'One explosive sandbag rep per interval, plus a carry day · 2 days',shape:'days',
  group:'The Stone Circle',by:'The Stone Circle',type:['Sandbag','Power','Strength-endurance'],
  note:'A single-bag taste of Cody\'s power-endurance work. Use a bag near bodyweight. Add these days to phase two or run them next to other training.',
  days:[
    {key:'sc_wolf1',eyebrow:'Day 1',n:'Ground to chest on the clock',hard:true,tag:'40 min',items:[...wolf,{grp:'Neck'},...neck]},
    {key:'sc_wolf2',eyebrow:'Day 2',n:'Shoulder carry intervals',hard:true,tag:'35 min',items:[
      {grp:'Warm-up'},{id:'sc_pump_curls',s:'2 sets'},
      {grp:'Carry intervals'},{id:'sc_shoulder_carry',s:'20 min',nt:'one lap, then 45 s rest, switching shoulders. Over the weeks cut the rest to 20 s, then lengthen the lap'},
      {grp:'Squat'},{id:'sc_box_squat',s:'10 min',nt:'max reps'}]}]},
`<h2 id="infoTitle">Power-Endurance Intervals</h2><p class="by">Built on The Stone Circle's interval method for sandbags</p>
<span class="pill2">One sandbag</span><span class="pill2">35–40 min</span><span class="pill2">2 days</span>
<h4>The idea</h4><p>Cody calls this power-endurance: one explosive rep at a time, on a clock, for a long block. Every rep should be fast and clean. Progress by shortening the interval (60, 45, 30, then 20 seconds) rather than by adding weight.</p>
<h4>The carry day</h4><p>Shoulder carries in laps with fixed rest. Cut the rest from 45 to 20 seconds, then make the laps longer.</p>
<h4>Note</h4><p>His full Sandbag Berserker program uses three bags of different weights and is in his book. This is a simplified single-bag version based on what he shows for free, so the interval steps here are our own.</p>
<h4>Source</h4><p><a href="${YT}TqEnUh9XNFw" target="_blank" rel="noopener">Sandbag Berserker overview (YouTube)</a>.</p>`);
})();
