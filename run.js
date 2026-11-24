/* BLOCK. running, sprinting and jump rope. Programs and approaches from
   Strength Side, Gym Free, Judd Lienhard and Nsima Inyang, built from their
   public videos, podcast notes and free articles (sources on each info page).
   New field on exercises: u = what the user enters instead of reps
   ('min' minutes, 'm' metres, 's' seconds). */
(function(){
const R=window.BLOCK_REG;if(!R)return;
const YT=id=>'https://www.youtube.com/watch?v='+id;
const SKIPS=YT('vmMupFeKcvU'); /* Judd Lienhard: skipping for speed (A, B, power, hip-opening skips) */

/* ---------- exercises ---------- */
R.ex({
  /* runs */
  easy_run:{n:'Easy Run',c:'cond',u:'min'},
  tempo_run:{n:'Tempo Run',c:'cond',u:'min'},
  mile_run:{n:'Mile Run · Timed',c:'cond',u:'min'},
  run_int:{n:'Run Intervals',c:'cond',u:'m'},
  backward_walk:{n:'Backward Walk / Jog',c:'cond',u:'min'},
  /* sprints */
  strides:{n:'Strides',c:'skill',u:'m'},
  accel_sprint:{n:'Acceleration Sprint',c:'cond',u:'m'},
  flying_sprint:{n:'Flying Sprint',c:'cond',u:'m'},
  sprint_20s:{n:'20-Second Sprint',c:'cond',u:'s'},
  /* drills */
  dyn_warmup:{n:'Dynamic Warm-Up',c:'skill',u:'min',v:YT('_yrcP5GyZEc')},
  a_skip:{n:'A-Skip',c:'skill',v:SKIPS},
  b_skip:{n:'B-Skip',c:'skill',v:SKIPS},
  power_skip:{n:'Power Skip',c:'plyo',v:SKIPS},
  hip_skip:{n:'Hip-Opening Skip',c:'skill',v:SKIPS},
  wall_drill:{n:'Wall Drill',c:'skill'},
  pogo:{n:'Pogo Hops',c:'plyo'},
  bounds:{n:'Bounding',c:'plyo',u:'m'},
  atg_split:{n:'Knee-Over-Toe Split Squat',c:'bodyweight'},
  bear_kickthru:{n:'Bear Kick-Through',c:'bodyweight',v:YT('GwVyDR_-iK8')},
  /* jump rope */
  jr_basic:{n:'Jump Rope · Basic Bounce',c:'cond',u:'min',v:YT('5-UJYXINcRA')},
  jr_side:{n:'Jump Rope · Side Swing',c:'skill',u:'min'},
  jr_alt:{n:'Jump Rope · Alternate Foot Step',c:'cond',u:'min'},
  jr_boxer:{n:'Jump Rope · Boxer Skip',c:'cond',u:'min'},
  jr_highknee:{n:'Jump Rope · High Knees',c:'cond',u:'min'},
  jr_cross:{n:'Jump Rope · Criss-Cross',c:'skill',u:'min'},
  jr_du:{n:'Jump Rope · Double Unders',c:'cond',u:'min'},
  /* also defined in quick.js; repeated so this file works whatever the load order */
  air_squat:{n:'Air Squat',c:'bodyweight'},burpee:{n:'Burpee',c:'bodyweight'}
});

R.steps({
  easy_run:['Pick a pace where you can talk in full sentences.','Land under your hips with short, light steps.','Keep the shoulders loose and the arms swinging forward and back.','If you have to breathe through the mouth, slow down or walk a bit.'],
  tempo_run:['Warm up with 5–10 minutes of easy running.','Settle into a pace that feels comfortably hard: a few words at a time, not full sentences.','Hold it steady for the whole block rather than starting fast.','Cool down with a few minutes of easy jogging.'],
  mile_run:['Warm up with easy jogging and a few strides.','Run one mile (1.6 km) as evenly as you can.','Aim to run the second half the same speed or a little faster than the first.','Log the time in minutes; retest every few months.'],
  run_int:['Warm up with easy running and a few strides.','Run each repeat at a hard but repeatable pace.','Walk or jog easy between repeats until breathing settles.','Stop the set when the pace drops clearly.'],
  backward_walk:['Walk backward on flat ground or a treadmill, with a clear path behind you.','Reach back with the toes and roll onto the whole foot.','Keep the knees soft and let them travel over the toes.','Build to a slow backward jog once walking is easy.'],
  strides:['Start at a jog and build smoothly to about 80–90 % of top speed.','Hold that speed for a few seconds, staying relaxed.','Ease off gradually; never stop abruptly.','Walk back to the start and take full recovery.'],
  accel_sprint:['Start from a two-point stance or a falling start.','Push the ground back with a forward lean for the first steps.','Rise gradually as you pick up speed; arms drive hard.','Walk back and rest fully. Every rep should be fast.'],
  flying_sprint:['Mark a build-up zone of 20–30 m and a sprint zone after it.','Build speed smoothly through the first zone.','Hit top speed at the start of the sprint zone and hold it, relaxed, through the end.','Slow down gradually and rest fully between reps.'],
  sprint_20s:['Warm up well, with drills and a few build-ups first.','Run hard for 20 seconds; fast but not tense.','Slow down gradually, then walk or rest for the full recovery.','Stop when the reps start getting slower.'],
  dyn_warmup:['Start with easy movement: marching, arm circles, light jogging.','Move through hips, ankles and spine with leg swings, lunges and twists.','Build up to skips and short bounces.','Finish warm and slightly sweaty, not tired.'],
  a_skip:['Skip forward on the balls of the feet with a rhythmic bounce.','Drive one knee up to hip height while the other leg pushes down.','Snap the lifted foot back down under the hip.','Swing the opposite arm with each knee; stay tall.'],
  b_skip:['Start like an A-skip.','At the top of the knee lift, extend the lower leg forward.','Paw the foot back and down to land under the hip.','Keep it rhythmic; quality over speed.'],
  power_skip:['Skip forward and push hard off the ground with each step.','Drive the knee and opposite arm up to get height.','Land softly and go straight into the next skip.','Aim for height and air time, not distance.'],
  hip_skip:['Skip forward with a light rhythm.','On each knee lift, open the knee out to the side and around.','Keep the chest up and the trunk still.','Alternate legs; do the same moving backward if you like.'],
  wall_drill:['Lean into a wall with straight arms, body in one line at about 45°.','Lift one knee to hip height, toes pulled up.','Switch legs fast, driving the down leg into the ground.','Do single switches first, then doubles and triples.'],
  pogo:['Stand tall with soft knees, arms relaxed.','Bounce off the balls of the feet using mostly the ankles.','Keep ground contact short and quiet, like the ground is hot.','Small hops first; add height only when contact stays quick.'],
  bounds:['Run a few steps, then push off one leg into a long, springy stride.','Drive the opposite knee forward and up.','Land on the other foot under the hips and push again.','Keep it rhythmic; stop when the bounds get shorter.'],
  atg_split:['Stand in a long split stance, front foot flat.','Slide the front knee forward past the toes as far as is comfortable.','Keep the back leg long and the torso upright.','Use a box or support under the hands at first and add range slowly.'],
  bear_kickthru:['Start in a bear position: hands and toes down, knees hovering.','Lift one hand and the opposite foot.','Rotate and kick that leg through under the body, reaching the free arm back.','Return to the bear position and switch sides. Move smoothly.'],
  jr_basic:['Hold the handles at hip height, elbows close to the body.','Turn the rope with the wrists, not the arms.','Jump just high enough to clear the rope; small, quiet bounces on the balls of the feet.','Breathe through the nose and keep the shoulders relaxed.'],
  jr_side:['Hold both handles together in one hand or one in each, hands close.','Swing the rope in a loop beside your body without jumping.','Bounce lightly in rhythm with the rope as it hits the ground.','Switch sides, then try opening the rope and jumping into it.'],
  jr_alt:['Turn the rope at an easy pace.','Step over it one foot at a time, like jogging on the spot.','Land on the ball of the foot with short, light contacts.','Build speed only once the rhythm feels easy.'],
  jr_boxer:['Turn the rope at a steady pace.','Shift your weight to one foot for two turns, then the other.','Keep the feet low and close to the ground.','Stay loose; let the rhythm carry you.'],
  jr_highknee:['Run on the spot over the rope.','Lift each knee to hip height.','Keep the rope turning fast with the wrists.','Short sets; stop when the knees drop.'],
  jr_cross:['Jump a basic bounce to set the rhythm.','As the rope comes over the head, cross the forearms in front of the body.','Jump through the loop, then uncross on the next turn.','Keep the handles pointing out to the sides as you cross.'],
  jr_du:['Start with a basic bounce, slightly higher than usual.','On one jump, spin the rope twice with fast wrist turns.','Keep the body straight and land on the balls of the feet.','Begin with single doubles between basic bounces, then link them.']
});

/* ---------- Strength Side ---------- */
R.group('Strength Side',{blurb:'Trevor Hash’s channel on primal movement and short daily training, with jump rope as an everyday conditioning tool.'});
R.program({id:'rn_ss_rope',n:'Strength Side · Jump Rope & Run',sub:'Short daily rope sessions, a conditioning day and an easy run · 5–30 min',shape:'days',
  group:'Strength Side',by:'Strength Side',type:['Running','Jump rope','Short sessions'],
  note:'Start with 30 s on, 30 s off for 4 min every other day. Add 30 s of jump time each week until you reach 5–6 min. Jump small and quiet.',
  days:[
  {key:'rn_ss_rope1',eyebrow:'Weeks 1–2 · rope day',n:'Learn the bounce',hard:false,tag:'6 min',items:[
    {grp:'Warm-up'},{id:'pogo',s:'2 × 20',nt:'no rope · springy ankles'},{id:'jr_side',s:'1 min',nt:'swing beside the body, bounce in rhythm'},
    {grp:'Rope'},{id:'jr_basic',s:'4 min',nt:'30 s on / 30 s off · 2 min of jumping · week 2: add 30 s'}]},
  {key:'rn_ss_rope3',eyebrow:'Weeks 3–5 · rope day',n:'Build jump time',hard:false,tag:'8 min',items:[
    {grp:'Rope'},{id:'jr_basic',s:'3–4 min',nt:'total jump time grows 30 s a week · rest as needed'},{id:'jr_alt',s:'1 min',nt:'mix in once the bounce is steady'},
    {grp:'Easy finish'},{id:'jr_side',s:'1 min',nt:'relaxed swings'}]},
  {key:'rn_ss_rope8',eyebrow:'Weeks 6–8 · rope day',n:'5–6 minutes of jump time',hard:false,tag:'10 min',items:[
    {grp:'Rope'},{id:'jr_basic',s:'2 min'},{id:'jr_alt',s:'1 min'},{id:'jr_boxer',s:'1 min'},{id:'jr_highknee',s:'30 s',nt:'optional'},{id:'jr_cross',s:'1 min',nt:'optional skill work'},
    {grp:'Note'},{id:'jr_basic',s:'5–6 min total',nt:'once this feels easy, go daily if your joints agree'}]},
  {key:'rn_ss_cond',eyebrow:'Weekly · conditioning',n:'Burpees, kick-throughs, rope, get-ups',hard:true,tag:'20 min',items:[
    {grp:'Practise each move'},{id:'burpee',s:'2 × 5'},{id:'bear_kickthru',s:'2 × 6',nt:'3 per side'},{id:'get_up',s:'2 × 1 each side'},
    {grp:'Rounds · 12–15 min'},{id:'burpee',s:'5 reps'},{id:'bear_kickthru',s:'6 reps'},{id:'jr_basic',s:'1 min'},{id:'get_up',s:'1 each side',nt:'repeat for as many good rounds as you can'}]},
  {key:'rn_ss_run',eyebrow:'Weekly · springy feet + easy run',n:'Jump drills and an easy run',hard:false,tag:'30 min',items:[
    {grp:'Warm-up'},{id:'jr_basic',s:'3 min',nt:'your daily rope'},{id:'pogo',s:'3 × 20'},{id:'a_skip',s:'2 × 20 m'},
    {grp:'Run'},{id:'strides',s:'4 × 60 m',nt:'smooth, not all-out'},{id:'easy_run',s:'15–20 min',nt:'conversational pace'}]}
  ]},
`<h2 id="infoTitle">Strength Side · Jump Rope &amp; Run</h2><p class="by">Strength Side · <a href="https://www.youtube.com/watch?v=5-UJYXINcRA" target="_blank" rel="noopener">watch the jump rope plan</a></p>
<span class="pill2">Jump rope</span><span class="pill2">5–30 min</span><span class="pill2">Rope + open space</span>
<h4>The idea</h4><p>Strength Side favours short, frequent sessions over long ones and uses a few minutes of jump rope as an everyday tool for the feet, ankles and conditioning. The rope plan here follows the free plan from the channel: 30 seconds on, 30 seconds off for 4 minutes every other day, adding 30 seconds of jump time each week until you reach 5–6 minutes after about two months. Keep the jumps small and controlled.</p>
<h4>Learning the rope</h4><p>If the rope is new, bounce without it first, then swing it beside your body in rhythm before jumping through it.</p>
<h4>Conditioning day</h4><p>Based on the channel’s conditioning video: burpees, bear kick-throughs, jump rope and get-ups, first practised one by one, then put together in rounds.</p>
<h4>The run day</h4><p>The channel says simple jumping and running drills build springy feet so you can run faster without piling up miles. We could not find a specific running plan from Strength Side, so the run day (drills, strides and a 15–20 minute easy run) is a generic add-on in the same short-session style.</p>
<h4>Sources</h4><p><a href="https://www.youtube.com/watch?v=5-UJYXINcRA" target="_blank" rel="noopener">How jump rope transforms the body</a> · <a href="https://www.youtube.com/watch?v=GwVyDR_-iK8" target="_blank" rel="noopener">Conditioning video</a> · <a href="https://www.youtube.com/watch?v=F7j5zwRNLgE" target="_blank" rel="noopener">Weekly routine</a> · <a href="https://strengthside.com/pages/primal-movement" target="_blank" rel="noopener">strengthside.com</a></p>`);
R.approach({id:'ss_daily_short',by:'Strength Side',n:'Short daily sessions + rope',short:'Under 30 minutes, simple basics, a few minutes of jump rope.',fmt:'circuit',gp:{rest:45,rpe:7},
  cues:['small, quiet jumps','finish feeling better, not wrecked'],
  details:'Train most days but keep it short: a handful of basic movements done well, stopping while you still feel fresh. Add a few minutes of jump rope, starting with 30 s on and 30 s off and adding 30 s of jump time each week.'});

/* ---------- Gym Free ---------- */
if(!((window.BLOCK_GROUPS||{})['Gym Free']||{}).blurb)
  R.group('Gym Free',{blurb:'Sandbag and bodyweight training with simple daily habits and clear standards, like being able to run a 7-minute mile.'});
R.program({id:'rn_gf_mile',n:'Gym Free · Mile Standard',sub:'Daily basics, sandbag work and runs toward a 7-min mile · 15–40 min',shape:'days',
  group:'Gym Free',by:'Gym Free',type:['Running','Sandbag','Bodyweight'],
  note:'Test the mile first and retest every 3–6 months. Keep the daily basics moderate and never redline the sandbag work.',
  days:[
  {key:'rn_gf_test',eyebrow:'Week 1 · Day 1',n:'Mile test',hard:true,tag:'25 min',items:[
    {grp:'Warm-up'},{id:'easy_run',s:'8 min',nt:'very easy'},{id:'strides',s:'3 × 60 m'},
    {grp:'Test'},{id:'mile_run',s:'1 mile',nt:'log the time · standard: 7:00 or faster'},
    {grp:'Cool-down'},{id:'easy_run',s:'5 min'}]},
  {key:'rn_gf_daily',eyebrow:'Every morning',n:'Daily basics',hard:false,tag:'15 min',items:[
    {grp:'1–2 sets each · moderate'},{id:'pushup',s:'1–2 × 10–20'},{id:'pullups',s:'1–2 × 5–10'},{id:'air_squat',s:'1–2 × 20–30',nt:'pick variations by how you feel'}]},
  {key:'rn_gf_sandbag',eyebrow:'Week 1 · Day 2',n:'Sandbag volume + easy run',hard:true,tag:'40 min',items:[
    {grp:'Sandbag · steady pace, short rest'},{id:'sb_shoulder_carry',s:'10–15 min',nt:'keep moving, never redline'},{id:'bearhug_carry',s:'5 × 40 m'},
    {grp:'Run'},{id:'easy_run',s:'15 min',nt:'conversational'}]},
  {key:'rn_gf_int',eyebrow:'Week 1 · Day 4',n:'Intervals at mile pace',hard:true,tag:'35 min',items:[
    {grp:'Warm-up'},{id:'easy_run',s:'10 min'},{id:'a_skip',s:'2 × 20 m'},{id:'strides',s:'3 × 60 m'},
    {grp:'Intervals'},{id:'run_int',s:'4–6 × 400 m',nt:'at your goal mile pace · walk 90 s between'},
    {grp:'Cool-down'},{id:'easy_run',s:'5 min'}]},
  {key:'rn_gf_tempo',eyebrow:'Week 1 · Day 6',n:'Tempo toward a 5K goal',hard:false,tag:'35 min',items:[
    {grp:'Warm-up'},{id:'easy_run',s:'10 min'},
    {grp:'Tempo'},{id:'tempo_run',s:'15–20 min',nt:'comfortably hard, even pace'},
    {grp:'Cool-down'},{id:'easy_run',s:'5 min'}]}
  ]},
`<h2 id="infoTitle">Gym Free · Mile Standard</h2><p class="by">Gym Free · <a href="https://www.youtube.com/watch?v=-3ecKydREN0" target="_blank" rel="noopener">watch the video on standards</a></p>
<span class="pill2">Running + sandbag</span><span class="pill2">15–40 min</span><span class="pill2">Sandbag + somewhere to run</span>
<h4>The idea</h4><p>Gym Free separates <b>standards</b> (what you can always do, such as a 7-minute mile) from <b>goals</b> (what you chase, such as a sub-20 5K), and suggests reviewing both every 3–6 months. The channel also does a short daily session of one push, one pull and one squat at moderate effort, and credits high-volume sandbag work with short rest, never redlining, for a faster mile even without much running.</p>
<h4>How this week works</h4><p>Test the mile, do the daily basics every morning, one sandbag day with an easy run, one interval day and one tempo day. Retest after 6–12 weeks.</p>
<h4>What is ours</h4><p>We did not find a published running plan from Gym Free. The interval and tempo sessions are generic running practice for a mile and 5K goal, not the channel’s own prescription.</p>
<h4>Sources</h4><p><a href="https://www.youtube.com/watch?v=-3ecKydREN0" target="_blank" rel="noopener">Standards vs goals</a> · <a href="https://www.youtube.com/watch?v=Q-VJspHIxWM" target="_blank" rel="noopener">Why I train every day</a> · <a href="https://www.youtube.com/watch?v=1zII21J-Jlc" target="_blank" rel="noopener">Sandbag volume, short rest</a></p>`);
R.approach({id:'gf_never_redline',by:'Gym Free',n:'Lots of work, never redline',short:'High volume, short rest, steady pace; finish able to do more.',fmt:'circuit',gp:{rest:30,rpe:7},
  cues:['never redline','steady pace, short rest'],
  details:'Do a lot of total work with short rests, but at a pace you could hold for a long time. No set ends in a grind. Pair it with clear standards, such as a mile time, that you retest every few months.'});

/* ---------- Judd Lienhard ---------- */
R.group('Judd Lienhard',{blurb:'Former Army Ranger and speed coach in Austin. His MASS Method mixes movement, athleticism, strength and speed, with sprinting kept in every week.'});
const slow=[{grp:'Slow · warm-up'},{id:'dyn_warmup',s:'8 min'}];
const flow=[{grp:'Flow · skips and hops'},{id:'a_skip',s:'2 × 20 m'},{id:'power_skip',s:'2 × 20 m'},{id:'pogo',s:'2 × 15'}];
R.program({id:'rn_jl_3h',n:'Judd Lienhard · 3-Hour Athlete Week',sub:'Strength, sprints and conditioning in about 3 hours a week · 4 days',shape:'days',
  group:'Judd Lienhard',by:'Judd Lienhard',type:['Sprint','Strength','Conditioning'],
  note:'Every session runs in the same order: slow, flow, go, grow, show. Fast work comes before heavy work. Sprints are fast but relaxed; stop when they slow down.',
  days:[
  {key:'rn_jl_d1',eyebrow:'Day 1',n:'Full body · speed then strength',hard:true,tag:'50 min',items:[
    ...slow,...flow,
    {grp:'Go · speed and power'},{id:'broad_jump',s:'4 × 3',nt:'full intent, full rest'},{id:'accel_sprint',s:'4 × 20 m'},
    {grp:'Grow · strength'},{id:'goblet_squat',s:'3 × 6–8'},{id:'rdl',s:'3 × 6–8'},{id:'pushup',s:'3 × 10–15'},{id:'pullups',s:'3 × 5–8'},
    {grp:'Show · small muscles'},{id:'cd_calf_raise',s:'2 × 15'},{id:'cd_tib_raise',s:'2 × 15'}]},
  {key:'rn_jl_d2',eyebrow:'Day 2',n:'Sprint intervals',hard:true,tag:'35 min',items:[
    ...slow,
    {grp:'Flow · skip series'},{id:'a_skip',s:'2 × 20 m'},{id:'b_skip',s:'2 × 20 m'},{id:'hip_skip',s:'2 × 20 m'},{id:'strides',s:'3 × 60 m',nt:'build to 80–90 %'},
    {grp:'Go · intervals'},{id:'sprint_20s',s:'6–8 × 20 s',nt:'hard but relaxed · walk back, rest 1–2 min'}]},
  {key:'rn_jl_d4',eyebrow:'Day 4',n:'Full body · strength and agility',hard:true,tag:'50 min',items:[
    ...slow,
    {grp:'Flow · lateral and hips'},{id:'hip_skip',s:'2 × 20 m'},{id:'pogo',s:'2 × 15',nt:'side to side'},
    {grp:'Go · change of direction'},{id:'accel_sprint',s:'6 × 10 m',nt:'shuttle: sprint, stop, turn, sprint back'},
    {grp:'Grow · strength'},{id:'reverse_lunge',s:'3 × 8 each'},{id:'pushup',s:'3 × 10–15'},{id:'pullups',s:'3 × 5–8'},
    {grp:'Show'},{id:'nordic',s:'2 × 3–5',nt:'slow lowering'}]},
  {key:'rn_jl_d5',eyebrow:'Day 5',n:'HIIT for the engine',hard:true,tag:'35 min',items:[
    ...slow,
    {grp:'Intervals'},{id:'run_int',s:'4 × 3 min',nt:'hard, steady pace · 2–3 min easy jog between'},
    {grp:'Cool-down'},{id:'easy_run',s:'5 min',nt:'or walk'}]}
  ]},
`<h2 id="infoTitle">Judd Lienhard · 3-Hour Athlete Week</h2><p class="by">Judd Lienhard · <a href="https://www.youtube.com/watch?v=Ih95ij5eMWE" target="_blank" rel="noopener">watch the 3-hour plan</a></p>
<span class="pill2">Sprint</span><span class="pill2">~3 h a week</span><span class="pill2">Open space + light gear</span>
<h4>The idea</h4><p>Judd Lienhard trains adults like athletes: speed and power stay in the week at any age, next to strength. His 3-hour weekly plan uses full-body strength days, a sprint-interval day built around 20-second sprints, a strength-and-agility day, and a HIIT day for the aerobic engine.</p>
<h4>Slow, flow, go, grow, show</h4><p>Every session follows the same order: <b>slow</b> (warm-up and mobility), <b>flow</b> (skips, hops, athletic prep), <b>go</b> (sprints, jumps, explosive work), <b>grow</b> (full-body strength) and <b>show</b> (small isolation work). Fast, fresh work comes first; heavy, tiring work comes after.</p>
<h4>Skips</h4><p>He calls skipping one of the most underrated drills for speed: A-skips, B-skips, power skips and hip-opening skips all show up as warm-up and flow work.</p>
<h4>What is ours</h4><p>The structure, the day themes and the 20-second sprints come from his podcast episode and videos. The exact sets, distances and rest in each day are our filling-in; his full sessions live in his paid app, which we did not use. Days 3, 6 and 7 are rest or easy walking.</p>
<h4>Sources</h4><p><a href="https://www.youtube.com/watch?v=Ih95ij5eMWE" target="_blank" rel="noopener">The 3-hour weekly plan</a> · <a href="https://www.youtube.com/watch?v=vmMupFeKcvU" target="_blank" rel="noopener">Skipping for speed</a> · <a href="https://www.youtube.com/watch?v=_yrcP5GyZEc" target="_blank" rel="noopener">Active dynamic warm-up</a> · <a href="https://rss.buzzsprout.com/2443113.rss" target="_blank" rel="noopener">Podcast episode notes</a></p>`);
R.approach({id:'jl_slow_to_show',by:'Judd Lienhard',n:'Slow, flow, go, grow, show',short:'Warm-up, skips and hops, sprints and jumps, then strength, then small muscles.',fmt:'straight',gp:{rpe:8},
  cues:['fast work before heavy work','full intent on every sprint and jump'],
  details:'Order every session the same way: slow (warm-up and mobility), flow (skips, hops, athletic prep), go (sprints, jumps, explosive work while fresh), grow (full-body strength), show (isolation work). Keep sprints and jumps short with full rest so they stay fast.'});

/* ---------- Nsima Inyang ---------- */
R.group('Nsima Inyang',{blurb:'Movement coach and co-host on Mark Bell’s Power Project. Rope flow, backward walking and short daily movement, with a slow road back to running and sprinting.'});
R.program({id:'rn_ni_wrs',n:'Nsima Inyang · Walk, Run, Sprint',sub:'Feet and knees first, then easy runs, then relaxed sprints · 15–30 min',shape:'days',
  group:'Nsima Inyang',by:'Nsima Inyang',type:['Sprint','Running','Mobility'],
  note:'Move to the next phase only when the last one feels easy and pain-free. Short and often beats long and rare. Go barefoot gradually.',
  days:[
  {key:'rn_ni_p1',eyebrow:'Phase 1 · feet and knees',n:'Backward walk, knees, rope',hard:false,tag:'20 min',items:[
    {grp:'Warm-up'},{id:'backward_walk',s:'5 min',nt:'flat ground or treadmill'},{id:'ropeflow',s:'5 min',nt:'light rope, easy rhythm'},
    {grp:'Knees and feet'},{id:'atg_split',s:'3 × 8 each',nt:'use a box for support, small range first'},{id:'cd_tib_raise',s:'2 × 15'},{id:'cd_calf_raise',s:'2 × 15'},
    {grp:'Bounce'},{id:'jr_basic',s:'5–10 min',nt:'easy pace, in shoes at first'}]},
  {key:'rn_ni_p2',eyebrow:'Phase 2 · easy running',n:'Easy run and strides',hard:false,tag:'30 min',items:[
    {grp:'Warm-up'},{id:'backward_walk',s:'3 min',nt:'add a slow backward jog'},{id:'pogo',s:'2 × 15',nt:'quick, quiet contacts'},
    {grp:'Run'},{id:'easy_run',s:'15–20 min',nt:'relaxed, let the arms and trunk turn'},{id:'strides',s:'4 × 60 m',nt:'smooth and loose'},
    {grp:'Barefoot (optional)'},{id:'barefoot_run',s:'3–5 min',nt:'soft grass only · add time over weeks'}]},
  {key:'rn_ni_p3',eyebrow:'Phase 3 · sprint mechanics',n:'Drills, rhythm, feet',hard:true,tag:'30 min',items:[
    {grp:'Warm-up'},{id:'backward_walk',s:'3 min'},{id:'dyn_warmup',s:'5 min'},
    {grp:'Drills'},{id:'wall_drill',s:'3 × 10 switches',nt:'knee up front, foot under the hip'},{id:'a_skip',s:'3 × 20 m',nt:'rhythm'},{id:'pogo',s:'3 × 15',nt:'stiff, springy feet'},
    {grp:'Sprints'},{id:'accel_sprint',s:'4 × 20 m',nt:'about 80 %, relaxed face and hands'}]},
  {key:'rn_ni_daily',eyebrow:'Phase 3 · daily',n:'Five relaxed sprints',hard:false,tag:'15 min',items:[
    {grp:'Warm-up'},{id:'backward_walk',s:'3 min'},{id:'a_skip',s:'2 × 20 m'},{id:'strides',s:'2 × 60 m'},
    {grp:'Sprints'},{id:'flying_sprint',s:'5 × 20 m',nt:'fast but loose · full walk back'}]}
  ]},
`<h2 id="infoTitle">Nsima Inyang · Walk, Run, Sprint</h2><p class="by">Built from Nsima Inyang’s interviews and his track session with coach Brian Kula</p>
<span class="pill2">Sprint</span><span class="pill2">15–30 min</span><span class="pill2">Rope + open ground</span>
<h4>The idea</h4><p>Nsima Inyang talks about getting back to moving like a kid, slowly. After knee problems he could not run or sprint without pain; months of small-range knee work and split squats with the knee going forward got him running and then sprinting again. He warns that adults who jump straight back into sprinting or barefoot running tend to get hurt.</p>
<h4>What he uses</h4><p>Backward walking (or backward sled work) before training for the knees, rope flow for 5–15 minutes a day, jump rope as a quick mood lift and a way to get the feet used to the ground, and a gradual move toward barefoot shoes. Light, relaxed sprinting shows up as coordination work, and he has mentioned a friend who does five sprints a day.</p>
<h4>Sprint mechanics</h4><p>On Mark Bell’s channel, coach Brian Kula took him through a track session on front-side position, foot strength and rhythm. Phase 3 uses common drills for those same three themes; the exact drills from that session are not listed publicly, so treat ours as a stand-in.</p>
<h4>What is ours</h4><p>Nsima has not published a running program that we could find. The phases, sets and distances are our way of putting his principles in order.</p>
<h4>Sources</h4><p><a href="https://www.youtube.com/watch?v=yyaottsD-cs" target="_blank" rel="noopener">Brian Kula sprint session (Mark Bell)</a> · <a href="https://tim.blog/2025/06/19/nsima-inyang-transcript/" target="_blank" rel="noopener">Tim Ferriss Show #816</a> · <a href="https://themodelhealthshow.com/nsima-inyang/" target="_blank" rel="noopener">Model Health Show 591</a> · <a href="https://themodelhealthshow.com/nsima-inyang-2/" target="_blank" rel="noopener">Model Health Show 845</a></p>`);
R.approach({id:'ni_microdose',by:'Nsima Inyang',n:'Microdose movement',short:'5–15 minutes, often; feel better after; progress slowly.',fmt:'circuit',gp:{rest:45,rpe:6},
  cues:['feel better after, not worse','relaxed, not maximal'],
  details:'Short daily doses of movement instead of long sessions: backward walking, rope work, knee and foot prep, light jumps and relaxed sprints. Stay well short of your limit and add range, load or speed only when the last step feels easy.'});
})();
