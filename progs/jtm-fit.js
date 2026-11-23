/* BLOCK. program pack: JTM Fit — The Kettlebell Shred and The Functional Method 1.0 / 2.0 / 3.0.
   Sessions are stored as a compact text format and turned into days below:
     "W1 Mon|Title|duration|opt"  day header
     "~ text"   warm-up            "= text"  cool-down
     "# text"   group heading      "- name|sets|note"  item (mapped to an EX key when the name matches)
   ShredFast is a different program (not The Kettlebell Shred), so its group is left alone. */
(function(){
const R=window.BLOCK_REG;if(!R)return;
const G='JTM Fit';
R.group(G,{blurb:'Kettlebell and functional-strength programs built on complexes, timed circuits, horizontal-loading strength days and a weekly challenge.'});

R.ex({
  kb_clean:{n:'Kettlebell Clean',c:'weighted'},
  kb_thruster:{n:'Kettlebell Thruster',c:'weighted'},
  burpee:{n:'Burpee',c:'cond'},
  mountain_climber:{n:'Mountain Climber',c:'cond'},
  renegade_row:{n:'Renegade Row',c:'weighted'},
  plank:{n:'Forearm Plank',c:'bodyweight'},
  hollow_rock:{n:'Hollow Rock',c:'bodyweight'},
  v_up:{n:'V-Up',c:'bodyweight'},
  dive_bomber:{n:'Dive Bomber Push-Up',c:'bodyweight'}
});
R.steps({
  kb_clean:['Hike the bell back between your legs with a flat back.','Drive the hips through and pull the elbow back close to the body.','Let the bell roll around the hand into the rack, wrist straight.','Lock the rack: elbow tucked, bell resting on forearm and chest.','Let it drop back down to the hike and repeat.'],
  kb_thruster:['Hold the bell (or bells) in the rack, elbows tucked.','Squat down with chest up and knees tracking the toes.','Drive up hard and use that drive to press the bell overhead.','Lock out with biceps by the ear, ribs down.','Lower to the rack as you sink into the next squat.'],
  burpee:['Stand tall, then squat and plant the hands.','Jump or step the feet back to a plank.','Lower the chest to the floor and push back up.','Jump the feet back under the hips.','Stand and jump with arms overhead.'],
  mountain_climber:['Start in a high plank, hands under shoulders.','Drive one knee toward the chest.','Switch legs quickly, like running in place.','Keep hips level and the back flat.'],
  renegade_row:['Set up in a high plank on two bells, feet wide.','Brace the trunk and squeeze the glutes.','Row one bell to the hip without twisting the hips.','Lower it under control and switch sides.'],
  plank:['Forearms under the shoulders, legs straight.','Squeeze glutes and quads, tuck the pelvis slightly.','Push the floor away and keep the neck long.','Breathe behind the brace and hold.'],
  hollow_rock:['Lie on your back and press the low back into the floor.','Lift arms and legs into a hollow shape.','Rock from shoulders to hips keeping the shape rigid.','Stop when the low back starts to lift.'],
  v_up:['Lie flat with arms overhead and legs straight.','Lift chest and legs together to meet over the hips.','Reach the hands toward the feet.','Lower both ends slowly and repeat.'],
  dive_bomber:['Start in a pike with hips high and hands wide.','Bend the elbows and swoop the chest down close to the floor.','Push through into an upward dog, hips low.','Reverse the path back to the pike.']
});

/* exact source names → existing or new EX keys (lower case) */
const MAP={'pull ups':'pullups','pull up':'pullups','chin ups':'chinups','chin up':'chinups','push ups':'pushup',
 'dips':'dips','weighted dips':'wdips','weighted pull ups':'wpullup','weighted pull up':'wpullup','weighted chin ups':'wchin',
 'barbell bench press':'bench','barbell back squat':'backsquat','barbell front squat':'frontsquat','barbell deadlift':'deadlift','barbell deadlifts':'deadlift',
 'box jump':'box_jump','jump squat':'jump_squat','jump squats':'jump_squat','bodyweight jump squats':'jump_squat',
 'db bulgarian split squat':'bulgarian','kb turkish get up':'get_up','kb gorilla row':'gorilla_row','gorilla row':'gorilla_row',
 'hollow body hold':'hollow_body','hanging leg raises':'legraise','barbell bent over row':'row','db single arm row':'sa_db_row',
 'snatch':'kb_snatch','single arm snatch':'kb_snatch','kb single arm snatch':'kb_snatch','clean':'kb_clean','cleans':'kb_clean','single arm clean':'kb_clean',
 'kb swings':'swing','kb swing':'swing','swing':'swing','kettlebell swings':'swing','thruster':'kb_thruster','push press':'push_press',
 'goblet squats':'goblet_squat','burpees':'burpee','mountain climbers':'mountain_climber','renegade row':'renegade_row',
 'forearm plank':'plank','hollow rocks':'hollow_rock','hollow rock':'hollow_rock','v ups':'v_up','v up':'v_up',
 'assault bike':'assault','jump rope':'skipping','pike push ups':'pike_pushup','wall walks':'wall_walk','handstand hold':'hs_hold',
 'russian twists':'cd_russian_twist','single arm strict press':'kb_press',"kb or db farmer's carry":'farmers_walk','kb or db farmers carry':'farmers_walk',
 'db single leg rdl':'sl_rdl','barbell reverse lunge':'reverse_lunge','back lunges':'reverse_lunge','barbell cossack squat':'cossack',
 'dive bomber push ups':'dive_bomber'};
const sc=s=>s?s.replace(/ ([A-Z])(?=[a-z])/g,(m,c)=>' '+c.toLowerCase()):s;
const LIGHT=/cardio|mobility/i;
function build(id,txt,eb){
  return txt.trim().split(/\n\s*\n/).map(ch=>{
    const L=ch.trim().split('\n'),h=L[0].split('|'),m=h[0].match(/^W(\d+) (\w+)$/);
    const items=[];let blocks=0;
    L.slice(1).forEach(l=>{const k=l[0],x=l.slice(2).trim();
      if(k==='~')items.push({grp:'Warm-up'},{n:'Warm-up',s:'',nt:x});
      else if(k==='=')items.push({grp:'Cool-down'},{n:'Stretches',s:'',nt:x});
      else if(k==='#'){blocks++;items.push({grp:/^[A-Z] · Rest$/.test(x)?'Rest':x});}
      else if(k==='-'){const [nm,s,nt]=x.split('|'),key=MAP[nm.toLowerCase()];
        const it=key?{id:key}:{n:nm};it.s=s||'';if(nt)it.nt=nt;items.push(it);}});
    return {key:`${id}_w${m[1]}${m[2].toLowerCase()}`,eyebrow:eb(+m[1],m[2],h[3]==='opt'),n:sc(h[1]),
      hard:!LIGHT.test(h[1]),tag:h[2]||`${blocks} blocks`,items};});
}
const EB=(w,d,opt)=>`Week ${w} · ${d}${opt?' · optional':''}`;

/* ===== The Kettlebell Shred: four 2-week blocks, each week run twice ===== */
const KBS=`
W1 Mon|Full body circuit|45–60 min
~ Jump rope 2–3 min · walkout push-ups × 10 · KB good morning to goblet squat × 10 · spider lunge T-frame × 10
# A · Circuit A · 30/15 X 4 Rounds · 3–4 rounds · 60 s rest after each round
- KB Kneeling Front Raise to Halo||
- KB Close Grip Push Up w/ Knee Drive||
- KB Pendulum Lunge||alternate legs
# B · Circuit B · 30/15 X 4 Rounds · 1–2 min rest before it
- KB Goblet Squat Clean Thruster||
- KB Toe Touchers||
- Chin Ups||
# C · Circuit C · 30/15 X 4 Rounds · 1–2 min rest before it
- KB Explosive Single Arm Gorilla Row||
- KB Jumping Deadlift to Deadlift||
- Plank Breakdown Half Burpee||
= Pigeon stretch/side · child's pose · spider lunge stretch/side · 30–60 s each

W1 Tue|Single KB complex|45–60 min
~ 2 rounds: high-knee rope 60 s · KB swings × 15 · inchworms × 10 · goblet squat to halo × 10
# A · Single KB complex · 6–8 rounds · bell stays in hand · 1–2 min rest
- Single Arm Snatch|6–8 × 5|per side
- Single Arm Clean|6–8 × 5|per side
- Single Arm Front Squat|6–8 × 5|per side
- Single Arm Strict Press|6–8 × 5|per side
# B · Core finisher · 45/15 X 3 Rounds · 2–3 min rest before it
- KB Plank Taps||
- Sprinter Sit Ups||
= Pike stretch · child's pose to arch · pigeon stretch/side · 30–60 s each

W1 Wed|Cardio, mobility and core|45 min
# A · Easy cardio
- Easy cardio|20 min|run, rope, row, bike or ski · conversational pace
# B · Mobility and core · 3 rounds · 60 s per move, no rest · 30–60 s between rounds
- Walkout to Scorpion|60 s|
- Lunge Reach Hamstring|60 s|
- Child's Pose to Spider Lunge|60 s|
- Side Plank Toe Touchers|60 s|30 s per side

W1 Thu|Kettlebell circuit|45–60 min
~ Stretch kick back lunge × 10/side · KB swings × 20 · prone pull-ups × 10 · KB good morning to goblet squat × 10 · push-up down dog toe touchers × 10
# A · KB circuit · 4–5 rounds · as heavy as form allows · 2 min rest
- KB Burpee Sumo Deadlift|4–5 × 10|
- KB Single Arm Floor Press|4–5 × 10|alternate arms
- KB Front Squat w/ 2 Second Pause|4–5 × 10|
- KB Single Arm Plank Row|4–5 × 10|per arm
- KB Front Lunge Pass Through|4–5 × 10|per leg
# B · Core finisher · 45/15 X 4 Rounds · 3–4 rounds · 2–3 min rest before it
- KB Russian Twist to V Up||
- KB Taps to Plank Breakdown||
- Oblique Crunches||
= Pigeon T-frame/side · groin stretch · straddle pike/side · 30–60 s each

W1 Fri|Full body HIIT|45–60 min
~ Jump rope 2–3 min · KB hike to swing × 12 · inchworm push-ups × 12 · high knees 60 s
# A · HIIT circuit · 45/15 X 4 Rounds · 3–4 rounds · 1–2 min rest after each round
- KB Clean Back Lunge||alternate sides
- KB Slow Close Grip Push Ups||
- KB RDL to Bent Row||
- Hollow Rocks||
- KB Squat Get Up + Press||
- Oblique Knee Tucks||alternate sides
- KB Single Leg Balance Curls||switch legs halfway
- Twisting Mountain Climber to Pause Jump Squat||
# B · Core finisher · Tabata X 8 Rounds · 2–3 min rest before it
- KB Hollow Flutter Kicks||
= Single-arm pec stretch/side · child's pose to spider lunge · kneeling hip flexor/side · 30–60 s each

W1 Sat|Weekly challenge and mobility|45–60 min
~ Jump rope 2–3 min · scap pull-ups × 10–15 · swimmer push-ups × 10–15 · KB swings × 20
# A · Challenge · for time · finish each move before the next
- KB Swings|60|bell 32 kg men · 20 kg women · split the reps as you like
- Push Ups|80|
- Pull Ups|30|
# B · Mobility · 3 rounds · no rest
- Spider Lunge Stretch w/ T Frame|10|per side
- Child's Pose|60 s|
- Swimmers|10|
- Squat Hold|60 s|

W3 Mon|Full body circuit|45–60 min
~ Jump rope 2–3 min · superman hold to push-up × 12 · KB good morning to goblet squat × 10 · jumping spider lunge T-frame × 10/side
# A · Circuit A · 30/15 X 4 Rounds · 3–4 rounds · 60 s rest after each round
- KB Single Arm Snatch||alternate arms
- Single Leg Push Up Twisting Knee Drive||alternate sides
- KB Front Rack Back Lunge w/ Rotation||alternate sides
# B · Circuit B · 30/15 X 4 Rounds · 1–2 min rest before it
- KB Goblet Squat to Lateral Lunge||
- KB Hollow Body Chest Press||
- Pull Ups||
# C · Circuit C · 30/15 X 4 Rounds · 1–2 min rest before it
- KB Single Arm Plank Rows||switch arms halfway
- KB Heel Elevated Front Squat||
- Plank Spider Knees to Push Up||
= Pigeon stretch/side · child's pose · spider lunge stretch/side · 30–60 s each

W3 Tue|Double KB complex|45–60 min
~ 2 rounds: high-knee rope 60 s · KB swings × 15 · walkouts × 8–10 · KB halo to back lunge × 10
# A · Double KB complex · 6–8 rounds · bells stay in hand · 1–2 min rest
- Double Swing|6–8 × 5|
- Thruster|6–8 × 5|
- RDL Bent Row|6–8 × 5|
- Back Lunge|6–8 × 5|per leg · alternate
- Seesaw Shoulder Press|6–8 × 5|per side
- Push Up Renegade Row|6–8 × 5|
# B · Core finisher · 45/15 X 4 Rounds · 3–4 rounds · 2–3 min rest before it
- Spider Knee to Muay Thai Knee||
- KB Russian Twist to V Up||
= Pike stretch · child's pose to arch · pigeon stretch/side · 30–60 s each

W3 Wed|Cardio, mobility and core|45 min
# A · Easy cardio
- Easy cardio|20 min|run, rope, row, bike or ski · conversational pace
# B · Mobility and core · 3 rounds · 60 s per move, no rest · 30–60 s between rounds
- Down Dog Pigeon|60 s|
- Elevated Child's Pose|60 s|
- Spider Lunge T Frame|60 s|
- Oblique V Ups|60 s|30 s per side

W3 Thu|Kettlebell circuit|45–60 min
~ Front lunge psoas reach × 10/side · KB hike to swing × 10 · prone pull-ups × 10–12 · goblet squat with pause × 10 · push-up down dog toe touchers 60 s
# A · KB circuit · 4–5 rounds · as heavy as form allows · 1–2 min rest
- KB Single Arm Clean to Press|4–5 × 8|per arm
- KB Heel Elevated Squat to Front Lunge|4–5 × 10|
- KB Bridge Chest Press w/ 2 Second Pause|4–5 × 12|
- KB Suitcase Deadlift|4–5 × 14|7 per side
- KB Single Arm Row Jumping Lunge|4–5 × 16|8 per side
# B · Core complex · 3–4 rounds · no rest between moves · 1 min rest
- KB North to South Plank|3–4 × 10|per side
- Leg Lift to Corkscrew Pulse|3–4 × 20|
- KB Speed Taps|3–4 × 30 s|
= Pigeon T-frame/side · groin stretch · single-leg straddle pike/side · 30–60 s each

W3 Fri|Full body HIIT|45–60 min
~ 400 m run · stretch kick to back lunge × 10/side · inchworm push-ups × 12 · lateral high knees 60 s
# A · HIIT circuit · 50/10 X 4 Rounds · 3–4 rounds · 1–2 min rest after each round
- KB Single Arm Overhead Back Lunge||switch sides halfway
- Neutral Grip Bodyweight Rows||
- KB Hollow Rock Press||
- KB Single Arm Jumping Lunges||switch sides halfway
- Slow Pike Push Ups||
- KB Hollow Body Pull Overs||
- KB Single Arm Gorilla Row to Clean||alternate sides
- Lateral Plank Walk to Tuck Jump||
# B · Core finisher · Tabata X 8 Rounds · 2–3 min rest before it
- KB Russian Twist to Single Leg V Up||
= Single-arm pec stretch/side · child's pose to spider lunge · kneeling hip flexor/side · 30–60 s each

W3 Sat|Weekly challenge and mobility|45–60 min
~ Jump rope 2–3 min · supinated bodyweight rows × 10–15 · hand-release push-ups × 10–15 · burpees without push-up × 10–15
# A · Inferno ladder · AMRAP 10 · 1 rep of each, then 2, then 3, and so on
- KB Single Arm Snatch|ladder|alternate arms · bell 24 kg men · 16 kg women
- Blast Off Push Ups|ladder|
- Chin Ups|ladder|
# B · Mobility · 2–3 rounds · 30–60 s rest
- Down Dog Pigeon T Frame|60 s|
- Groin Stretch|60 s|
- Child's Pose Reach Through|60 s|
- Pike Fold to Squat Hold|60 s|

W5 Mon|Full body circuit|60 min
~ Jump rope 2–3 min · down dog toe touchers × 10/side · KB goblet squat to halo × 10 · burpee with 4 high knees × 10
# A · Circuit A · 35/15 X 4 Rounds · 3–4 rounds · 1–2 min rest after each round
- KB Hang Squat Clean w/ 2 Second Pause||
- Push Up Spider Knees to Skier Hops||
- KB RDL to Single Leg RDL||
- Bear Shoulder Taps to Toe Taps||
# B · Circuit B · 35/15 X 4 Rounds · 1–2 min rest before it
- KB Single Arm Front Rack Pendulum Lunge||switch sides halfway
- Pull Up w/ 2 Second Hold||
- KB Bridge Chest Press||alternate arms
- Squat Hold w/ KB Curls||
# C · Circuit C · 35/15 X 4 Rounds · 1–2 min rest before it
- KB Lateral Push Up to Close Grip Push Up||
- KB 2 Toe Touchers 1 V Up||
- KB Jumping Suitcase Squat||switch sides halfway
- Lateral Plank Walk to Plank Breakdown||
= Pigeon stretch/side · child's pose · spider lunge stretch/side · 30–60 s each

W5 Tue|Single KB complex|45–60 min
~ 400 m run · KB swing to goblet squat × 10 · walkout to spider lunge T-frame × 10 · bodyweight thrusters × 20 · hollow hold 45–60 s
# A · Single KB complex · 6–8 rounds · bell stays in hand · 1–2 min rest
- Single Arm Back Lunge Thruster|6–8 × 5|per side
- Single Arm Bent Over Row|6–8 × 5|per side
- Warrior Lunge|6–8 × 5|per side
- Single Arm Push Press|6–8 × 5|per side
- Burpee Squat Clean|6–8 × 5|
# B · Core finisher · 45/15 X 4 Rounds · 3–4 rounds · 2–3 min rest before it
- KB Low Plank Push||
- Sprinter Sit Up to V Up||
= Pike stretch · child's pose to arch · pigeon stretch/side · 30–60 s each

W5 Wed|Cardio, mobility and core|45 min
# A · Easy cardio
- Easy cardio|5–10 min|run, rope, row, bike or ski
# B · Cardio and mobility · 2–3 rounds · no rest between moves · 30–60 s between rounds
- 800 m Run|1 × 800 m|easy pace · or 3–5 min on a rower, bike or rope
- Child's Pose to Spider Lunge|60 s|
- Pike Fold to Squat Hold|60 s|
- Pigeon T Frame|60 s|30 s per side
- Forwards to Backwards Plank Walk|60 s|

W5 Thu|Kettlebell circuit|45–60 min
~ Seal jacks 60 s · KB good mornings × 15 · bodyweight plank rows 30 s · KB single-leg RDL passes × 8/side · hand-release push-ups 30 s · high knees 60 s
# A · KB circuit · 4–5 rounds · as heavy as form allows · 1–2 min rest
- KB Deadlift|4–5 × 12|
- KB Hollow Body Chest Press|4–5 × 10|per side · alternate arms
- KB Front Rack / Overhead Back Lunge|4–5 × 8|per side
- KB ISO Single Arm Gorilla Row|4–5 × 8|per side
- KB Goblet Curl Jump Squat|4–5 × 10|
# B · Core finisher · 30/15 X 4 Rounds · 3–4 rounds · 30–60 s rest after each round
- KB Plank Pull Through||
- Hollow Body Single Leg V Up||
- Plank Jack Shoulder Tap||
= Pigeon T-frame/side · groin stretch · straddle pike/side · 30–60 s each

W5 Fri|Full body HIIT|45–60 min
~ Jump rope 2–3 min · pike fold to squat hold × 12 · down dog toe touch spider lunge × 10 · goblet squat + curl + thruster × 10 · hollow flutter kicks 45 s
# A · HIIT circuit · 50/10 X 4 Rounds · 3–4 rounds · 1–2 min rest after each round
- KB Rotational Thruster||alternate sides
- Oblique Hollow Rocks||
- KB Single Leg Balance Rows||switch sides halfway
- Broad Jump Backwards Bear Crawl||
- KB Lateral Lunge||alternate sides
- Explosive Plank Jack Push Up to Twisting Mountain Climber||
- Bodyweight Row w/ 2 Second Hold||
- KB Goblet Wall Sit||
# B · Shoulder and core ladder · 10-to-1 · for time · 2–3 min rest before it
- KB Overhead Sit Ups||10 down to 1
- Tuck Ups||10 down to 1
= Single-arm pec stretch/side · child's pose to spider lunge · kneeling hip flexor/side · 30–60 s each

W5 Sat|Bodyweight AMRAP challenge and mobility|45–60 min
~ Jump rope 2–3 min · scap pull-ups × 10–15 · back lunge with rotation × 10/leg · superman hold to burpee × 10
# A · Chin-ups · AMRAP 3 · log your reps
- Chin Ups|max reps|
# B · Rest
- Rest 60 sec|
# C · Clap push-ups · AMRAP 3
- Clap Push Ups|max reps|
# D · Rest
- Rest 60 sec|
# E · Back lunges · AMRAP 3
- Back Lunges|max reps|
# F · Rest
- Rest 60 sec|
# G · Lateral burpees · AMRAP 3
- Lateral Burpees|max reps|
# H · Mobility · 2–3 rounds · 30–60 s rest
- Elevated Pigeon Stretch|60 s|per side
- Quadruped T Frame|10|per side
- QL Stretch|30 s|per side
- Child's Pose Spider Lunge|60 s|

W7 Mon|Full body circuit|60 min
~ 2 rounds: jump rope 60–90 s · KB swing to goblet squat × 8 · push-up T-frame × 10 · back lunge scaption × 10
# A · Circuit A · 35/15 X 4 Rounds · 3–4 rounds · 1–2 min rest after each round
- KB Snatch Back Lunge||switch sides halfway
- KB Pause Explosive Push Up||
- KB Single Arm Front Rack Hollow Rocks||switch sides halfway
- KB Drop Lunges||
# B · Circuit B · 35/15 X 4 Rounds · 1–2 min rest before it
- KB Deadlift to Suitcase Deadlift||
- KB 2 for 1 Floor Press||
- Low to High Plank Reaches||
- KB Jump Squat w/ 2 Second Pause||
# C · Circuit C · 35/15 X 4 Rounds · 1–2 min rest before it
- KB Clean Lateral Lunge||alternate sides
- KB Russian Twist Press||
- Mixed Grip Pull Ups||
- Burpee Side Kick Throughs||
= Pigeon stretch/side · child's pose · spider lunge stretch/side · 30–60 s each

W7 Tue|Double KB complex|45–60 min
~ 400 m run · down dog spider lunge × 12 · KB hike to swing × 12 · dive bomber push-ups × 12 · KB front lunge to halo × 12
# A · Double KB complex · 8–10 rounds · bells stay in hand · 1–2 min rest
- Swing Clean + Front Squat|8–10 × 5|
- Single Arm Push Press|8–10 × 5|per arm · alternate
- Front Lunge|8–10 × 5|per leg · alternate
- Renegade Row to Sumo Deadlift|8–10 × 5|
# B · Cardio and core finisher · 3 rounds · fast, no rest between moves
- KB Kneeling Single Arm Explosive Rotation|3 × 10|per side
- Skier Hop Half Burpee|3 × 60 s|
= Pike stretch · child's pose to arch · pigeon stretch/side · 30–60 s each

W7 Wed|Cardio, mobility and core|45 min
# A · Easy cardio
- Easy cardio|5–10 min|run, rope, row, bike or ski
# B · Cardio and mobility · 3 rounds · no rest between moves · 30–60 s between rounds
- 800 m Run|1 × 800 m|easy pace · or 3–5 min on a rower, bike or rope
- Inch Worms|10|
- Pigeon Stretch|45 s|per side
- Down Dog to Scorpion|10|
- Adductor Stretch w/ T Frame|10|per side
- KB Leg Lift Complex|60 s|

W7 Thu|Kettlebell circuit|45–60 min
~ Back lunge with rotation × 10/side · KB kneeling half moons × 10/side · single-leg RDL × 10–12/leg · push-up spider lunge × 10 · burpee side shuffles 60 s
# A · KB circuit · 4–5 rounds · as heavy as form allows · 1–2 min rest
- KB Front Rack / Suitcase Squat|4–5 × 12|6 per side
- KB Leg Lift Floor Press|4–5 × 10|
- KB RDL Walk|4–5 × 8|per leg
- KB Burpee Bent Row|4–5 × 10|
- KB Clean Back Lunge to Single Arm Press|4–5 × 12|6 per side · alternate
# B · Core finisher · 3–4 rounds · little rest between moves · 1 min rest
- KB Single Arm Overhead Sit Up|3–4 × 10|per side
- Oblique V Ups|3–4 × 10|per side
- Single Arm Plank|3–4 × 30 s|per side
= Pigeon T-frame/side · groin stretch · straddle pike/side · 30–60 s each

W7 Fri|Full body HIIT|45–60 min
~ Jump rope 2–3 min · KB kneeling low-to-high wood chopper × 10/side · walkout to superman hold × 10 · goblet squat + curl + press × 10
# A · HIIT circuit · 50/10 X 4 Rounds · 3–4 rounds · 1–2 min rest after each round
- Body Clean to KB Jump Squat||
- Bodyweight Row w/ 4 Second Negative||
- Extended Low Plank Side Kick Outs||
- KB ISO Lunge Single Arm Press||switch sides halfway
- Leg Lift 2 Pulses||
- Explosive Push Up to KB Single Arm Plank||
- KB Goblet Squat w/ Curl to Back Lunges||
- 6 Mountain Climbers to 6 High Knees||
# B · Core ladder · for time · 10-8-6-4-2 and back up to 10, no rest
- KB Front Rack Hollow Rocks||10-8-6-4-2-4-6-8-10
- Side Plank Knee to Elbow||same ladder · per side
= Single-arm pec stretch/side · child's pose to spider lunge · kneeling hip flexor/side · 30–60 s each

W7 Sat|300-rep challenge and mobility|45–60 min
~ Jump rope 2–3 min · KB swings × 20 · bodyweight thrusters × 25 · walkouts × 10
# A · 300-rep challenge · for time · finish each move before the next
- KB Single Arm Snatch|50|25 per arm · bell 24 kg men · 16 kg women
- KB Hollow Body Flutter Kicks|50|per leg
- KB Single Arm Hang Clean to Push Press|50|25 per arm
- KB Jump Squats|50|
- KB Close Grip Push Ups|50|
- KB Swings|50|
# B · Mobility · 2–3 rounds · 30–60 s rest
- Couch Stretch|60 s|per leg
- Elevated Child's Pose Reach Through|60 s|
- Kneeling Hip Flexor T Frame|10|per side
- Elevated Pigeon Stretch|60 s|per side`;
const KBS_DAYS=[];
build('jtm_kbs',KBS,EB).forEach(d=>{KBS_DAYS.push(d);});
/* add the repeat week after each written week, keeping week order */
const KBS_ALL=[];
[1,3,5,7].forEach(w=>{const wk=KBS_DAYS.filter(d=>d.key.startsWith(`jtm_kbs_w${w}`));
  KBS_ALL.push(...wk);
  KBS_ALL.push(...wk.map(d=>({...d,key:d.key.replace(`_w${w}`,`_w${w+1}`),eyebrow:d.eyebrow.replace(`Week ${w}`,`Week ${w+1}`)+` · repeat of week ${w}`})));});

const TFM1=`
W1 Mon|Full Body|60–75 min
~ 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Lunge with Scaption × 10/side · Inch Worm Push Ups × 10 · Band Pass Throughs × 15 · Spider Lunge to T Frame × 10/side
# A · Strength · all sets of one move before the next · 60–90 s rest
- KB Front Squats|3–4 × 12|
- Chin Ups|3–4 × 8–12|
- DB Suitcase Deadlift|3–4 × 8|per side
- Clap Push Ups|3–4 × 10–15|
- DB Step Ups|3–4 × 8|per side
- Weighted V Ups|3–4 × 20|
# B · Core
- Forearm plank punches|2 min|as many seconds as you can inside 2 min
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W1 Tue|Upper Body Push / Pull|60–75 min
~ 2 Minute Row or Jump Rope · Band Pass through × 15 · Walk Out Push Ups × 10 · Y T A's × 10 · Dead Hang × 30–60 s · High Plank Shoulder Taps × 60 s
# A · Strength · all sets of one move before the next · 60–90 s rest
- DB Bench Press|3–4 × 8|
- DB Bent Over Row|3–4 × 8|
- Alternating Single Arm Floor Press|3–4 × 8|per side
- DB Single Arm Row|3–4 × 8|per side
- Pull Ups|3 × F|
- Push Ups|3 × F|
# B · Core
- Hollow body hold|2 min|accumulate · rest when form slips
= Single Arm Pec Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W1 Wed|Cardio / Core / Mobility|30 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Down Dog to Arch|60 s|
- Pigeon|60 s|per leg
- Quadruped Hip Circles|60 s|30 sec. per side
- Spider Lunge with T Frame|60 s|
- Scorpions|60 s|
- Forearm Plank|60 s|

W1 Thu|Full Body|45–60 min
~ 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Push Up T Frame × 12–14 · Bodyweight Squat Press × 20 · Forearm Plank Punches × 45 s · High Knees × 60 s
# A · KB complex · 5 sets · no rest between moves · 2 min rest
- American Swings|5 × 5|
- Thruster|5 × 5|
- Burpee High Pull|5 × 5|
- Goblet Jump Squats|5 × 5|
- American Swings|5 × 5|
# B · Core
- Tuck hold|2 min|accumulate · rest when form slips
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Hamstring Stretch × 60 s/side

W1 Fri|Legs|60–75 min
~ 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Lunge with Scaption × 10/side · Banded Good Mornings × 15 · Spider Lunge with T Frame × 10/side · Tuck Jumps × 8
# A · Strength · all sets of one move before the next · 2 min rest
- Box Jump|3 × 5|
- Barbell Back Squat|3–4 × 8|
- Barbell Deadlift|3–4 × 8|
- Barbell Reverse Lunge|3–4 × 8|per side
- DB RDL|3–4 × 8|
- Bodyweight Jump Squats|1 × 50|
# B · Core
- Hollow rocks|2 min|accumulate · rest when form slips
= Banded Hamstring Stretch × 60 s/side · Kneeling Hip Flexor Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Groin Stretch × 60 s

W1 Sat|Cardio / Core / Mobility|30 min|opt
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Down Dog to Arch|60 s|
- Pigeon|60 s|per leg
- Quadruped Hip Circles|60 s|30 sec. per side
- Spider Lunge to T Frame|60 s|
- Scorpions|60 s|
- Forearm Plank|60 s|

W2 Mon|Full Body|60–75 min
~ 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Lunge with Scaption × 10/side · Inch Worm Push Ups × 10 · Band Pass Throughs × 15 · Spider Lunge to T Frame × 10/side
# A · Strength · all sets of one move before the next · 60–90 s rest
- DB Reverse Lunge + Curl + Press|3–4 × 12|6 per side / alternating sides
- Pull Ups|3–4 × 8–12|
- Ring Push Ups|3–4 × 10–15|
- Kick Stand RDL|3–4 × 8|per side
- Hanging Knee Raises|3–4 × 15–20|
- DB Goblet Squat with 2 second pause|3–4 × 10|
# B · Core
- Weighted V Ups|3–4 × 20|
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W2 Tue|Upper Body Push / Pull|60–75 min
~ 2 Minute Row or Jump Rope · Band Pass through × 15 · Walk Out Push Ups × 10 · Y T A's × 10 · Dead Hang × 30–60 s · High Plank Shoulder Taps × 60 s
# A · Strength · all sets of one move before the next · 60–90 s rest
- DB Bench Press|3–4 × 8|
- DB Bent Over Row|3–4 × 8|
- DB Single Arm Floor Press|3–4 × 8|per side
- DB Single Arm Bent Over Row|3–4 × 8|per side
- Close Grip Push Ups|3 × F|
- ISO Chin Up Hold|3 × max hold|
# B · Core
- Hollow body hold|2 min|accumulate · rest when form slips
= Single Arm Pec Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W2 Wed|Cardio / Core / Mobility|30 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Down Dog to Arch|60 s|
- Pigeon|60 s|per leg
- Quadruped Hip Circles|60 s|30 sec. per side
- Spider Lunge with T Frame|60 s|
- Scorpions|60 s|
- Forearm Plank|60 s|

W2 Thu|Full Body|45–60 min
~ 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Push Up T Frame × 12–14 · Bodyweight Squat Press × 20 · Forearm Plank Punches × 45 s · High Knees × 60 s
# A · DB complex · 5–8 sets · no rest between moves · 2 min rest
- Squat Clean|5–8 × 5|
- Reverse Lunge|5–8 × 5|per leg
- Burpee Deadlift|5–8 × 5|
# B · Core
- Tuck hold|2 min|accumulate · rest when form slips
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Hamstring Stretch × 60 s/side

W2 Fri|Legs|60–75 min
~ 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Lunge with Scaption × 10/side · Banded Good Mornings × 15 · Spider Lunge with T Frame × 10/side · Tuck Jumps × 8
# A · Strength · all sets of one move before the next · 2 min rest
- Seated Box Jump|3 × 5|
- Barbell Front Squat|3–4 × 8|
- Barbell Deadlift|3–4 × 8|
- DB Bulgarian Split Squat|3–4 × 8|per side
- DB Toes Elevated RDL|3–4 × 8|
- Jump Squat with Band|1 × 50|
# B · Core
- Hollow rocks|2 min|accumulate · rest when form slips
= Banded Hamstring Stretch × 60 s/side · Kneeling Hip Flexor Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Groin Stretch × 60 s

W2 Sat|Cardio / Core / Mobility|30 min|opt
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Down Dog to Arch|60 s|
- Pigeon|60 s|per leg
- Quadruped Hip Circles|60 s|30 sec. per side
- Spider Lunge to T Frame|60 s|
- Scorpions|60 s|
- Forearm Plank|60 s|

W3 Mon|Full Body|60–75 min
~ 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Lunge with Scaption × 10/side · Inch Worm Push Ups × 10 · Band Pass Throughs × 15 · Spider Lunge to T Frame × 10/side
# A · Strength · all sets of one move before the next · 60–90 s rest
- KB Reverse Lunge + Clean + Press|3–4 × 8|per side
- Chin Ups|3–4 × 10–12|
- DB Single Leg RDL|3–4 × 10|per side
- Blast Off Push Ups|3–4 × 10–15|
- Barbell Roll Out|3–4 × 8–12|
- KB Goblet Squat to Curl|3–4 × 10|
# B · Core
- Parallette Jump Throughs|3–4 × 10|
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W3 Tue|Upper Body Push / Pull|60–75 min
~ 2 Minute Row or Jump Rope · Band Pass through × 15 · Walk Out Push Ups × 10 · Y T A's × 10 · Dead Hang × 30–60 s · High Plank Shoulder Taps × 60 s
# A · Strength · all sets of one move before the next · 60–90 s rest
- Barbell Bench Press|3–4 × 10|
- Barbell Bent Over Row|3–4 × 10|
- DB Single Arm Floor Press|3–4 × 10|per side
- Pull Up|3–4 × 10–12|
- Weighted Close Grip Push Ups|3 × F|
- ISO Chin Up Hold|3 × max hold|
# B · Core
- Weighted Hollow Body Hold|3–5 × max hold|stop when the low back lifts off the floor
= Single Arm Pec Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W3 Wed|Cardio / Core / Mobility|30 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Down Dog to Arch|60 s|
- Pigeon|60 s|per leg
- Quadruped Hip Circles|60 s|30 sec. per side
- Spider Lunge with T Frame|60 s|
- Scorpions|60 s|
- Forearm Plank|60 s|

W3 Thu|Full Body|45–60 min
~ 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Push Up T Frame × 12–14 · Bodyweight Squat Press × 20 · Forearm Plank Punches × 45 s · High Knees × 60 s
# A · Single-arm DB complex · 5–6 sets · no rest between moves · 2 min rest
- Power Snatch|5–6 × 5|
- Hang Power Clean + Push Press|5–6 × 5|
- Staggered Stance Row|5–6 × 5|
- Front Squat|5–6 × 5|
# B · Core
- Single Leg L Sit Kickouts|2 min|accumulate · rest when form slips
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Hamstring Stretch × 60 s/side

W3 Fri|Legs|60–75 min
~ 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Lunge with Scaption × 10/side · Banded Good Mornings × 15 · Spider Lunge with T Frame × 10/side · Tuck Jumps × 8
# A · Strength · all sets of one move before the next · 2 min rest
- Body Clean|3 × 5|
- Barbell Front Squat with 2 second pause|3–4 × 8|
- Barbell Deadlift|3–4 × 10|
- DB Bulgarian Split Squat|3–4 × 10|per side
- DB Kick Stand RDL|3–4 × 10|per side
- Jumping Lunges|1 × 50|per leg / alternating
# B · Core
- Weighted hollow rocks|2 min|accumulate · rest when form slips
= Banded Hamstring Stretch × 60 s/side · Kneeling Hip Flexor Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Groin Stretch × 60 s

W3 Sat|Cardio / Core / Mobility|30 min|opt
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Down Dog to Arch|60 s|
- Pigeon|60 s|per leg
- Quadruped Hip Circles|60 s|30 sec. per side
- Spider Lunge to T Frame|60 s|
- Scorpions|60 s|
- Forearm Plank|60 s|

W4 Mon|Full Body|60–75 min
~ 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Lunge with Scaption × 10/side · Inch Worm Push Ups × 10 · Band Pass Throughs × 15 · Spider Lunge to T Frame × 10/side
# A · Strength · all sets of one move before the next · 60–90 s rest
- KB Single Arm Thruster|3–4 × 12|6 per side
- Pull Up|3–4 × 12–14|
- DB Push Up to Renegade Row|3–4 × 8|
- DB Suitcase Deadlift|3–4 × 8|per side
- Foam Roller Elevators Planks|3–4 × 8–12|
- DB Bulgarian Split to Hammer Curl|3–4 × 8|per side
# B · Core
- Parallette Jump Throughs|3–4 × 12|
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W4 Tue|Upper Body Push / Pull|60–75 min
~ 2 Minute Row or Jump Rope · Band Pass through × 15 · Walk Out Push Ups × 10 · Y T A's × 10 · Dead Hang × 30–60 s · High Plank Shoulder Taps × 60 s
# A · Strength · all sets of one move before the next · 60–90 s rest
- Barbell Bench Press|3–4 × 12|
- Bench Supported DB Row|3–4 × 12|
- DB Single Arm Floor Press|3–4 × 12|per side
- DB Supinated Single Arm Row|3–4 × 12|per side
- Dips|3 × F|
- Pull Ups|3 × F|
# B · Core
- Weighted Hollow Body Hold|3–5 × max hold|stop when the low back lifts off the floor
= Single Arm Pec Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W4 Wed|Cardio / Core / Mobility|30 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Down Dog to Arch|60 s|
- Pigeon|60 s|per leg
- Quadruped Hip Circles|60 s|30 sec. per side
- Spider Lunge with T Frame|60 s|
- Scorpions|60 s|
- Forearm Plank|60 s|

W4 Thu|Full Body|45–60 min
~ 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Push Up T Frame × 12–14 · Bodyweight Squat Press × 20 · Forearm Plank Punches × 45 s · High Knees × 60 s
# A · Double KB complex · 5–8 sets · no rest between moves · 1–2 min rest
- Double Clean|5–8 × 5|
- Double Swing|5–8 × 5|
- Front Squat|5–8 × 5|
- Push Press|5–8 × 5|
- Burpee Gorilla Row|5–8 × 5|
# B · Core
- L Sit Kickouts|2 min|accumulate · rest when form slips
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Hamstring Stretch × 60 s/side

W4 Fri|Legs|60–75 min
~ 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Lunge with Scaption × 10/side · Banded Good Mornings × 15 · Spider Lunge with T Frame × 10/side · Tuck Jumps × 8
# A · Strength · all sets of one move before the next · 2 min rest
- Body Clean to Vertical Jump|3 × 5|
- Barbell Back Squat with Band|3–4 × 12|
- Barbell Deadlifts|3–4 × 12|
- DB Bulgarian Split with 2 second pause|3–4 × 8|per leg
- DB Single Leg RDL|3–4 × 12|per leg
- Jump Squats with Band|1 × 50|
# B · Core
- Weighted hollow rocks|2 min|accumulate · rest when form slips
= Banded Hamstring Stretch × 60 s/side · Kneeling Hip Flexor Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Groin Stretch × 60 s

W4 Sat|Cardio / Core / Mobility|30 min|opt
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Down Dog to Arch|60 s|
- Pigeon|60 s|per leg
- Quadruped Hip Circles|60 s|30 sec. per side
- Spider Lunge to T Frame|60 s|
- Scorpions|60 s|
- Forearm Plank|60 s|

W5 Mon|Full Body|60–75 min
~ 2–3 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Walkout Push Up T Frame × 10 · Bodyweight Squats × 20 · Hollow Body Hold × 45–60 s · Seal Jacks × 60 s
# A · Strength · all sets of one move before the next · 60–90 s rest
- DB Hang Squat Clean|3–4 × 8|
- Burpee Pull Up|3–4 × 8–12|
- Medicine Ball Push Up to Single Arm Hold|3–4 × 8–12|per side
- DB Single Leg RDL to Bent Row|3–4 × 8|per side
- Foam Roller Plank Elevators with Knees|3–4 × 8|
- Cossack Squat + Clean + Press|3–4 × 8|per side
# B · Core
- Parallette Jump to L-Sit|3–4 × 8|
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W5 Tue|Upper Body Push / Pull|60–75 min
~ 2–3 Minute Row or Jump Rope · Scapula Pull Ups × 15–20 · Forward/Backwards Bear Crawl × 60 s · Band Face Pulls × 20 · Push Up Spider Lunge T Frame × 10
# A · Strength · all sets of one move before the next · 60–90 s rest
- Barbell Bench Press with 2 second pause|3–4 × 8|
- Bench Supported DB Row with 2 second contraction|3–4 × 8|
- DB Bench Press 2 for 1's|3–4 × 5|
- DB Single Arm Row with 2 second contraction|3–4 × 8|per side
- Dips|3 × F|
- Chin Ups|3 × F|
# B · Core · 20/10 X 8 Rounds
- Hollow Body Flutter Kicks||
= Single Arm Pec Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W5 Wed|Cardio / Core / Mobility|30 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Band Pass Throughs|60 s|
- Down Dog Spider Lunge T Frame|60 s|
- Pike Fold to Squat Hold|60 s|
- Table Pose with Reaches|60 s|
- Pigeon with Reaches|60 s|
- Forearm Plank|60 s|

W5 Thu|Full Body|45–60 min
~ 2–3 Minute Row or Jump Rope · Table Pose with Reaches × 8/side · Kettlebell Swings × 20–25 · Push Up to Plank × 12 · Burpee (No push up/No jump) × 12 · Hollow Body Flutter Kicks × 45–60 s
# A · DB complex · 5–8 sets · no rest between moves · 1–2 min rest
- Push Up to Renegade Row|5–8 × 5|
- Jump Squat|5–8 × 5|
- Burpee Power Clean|5–8 × 5|
# B · Core
- Hanging Leg Raises|3–5 × 10–15|controlled tempo
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Hamstring Stretch × 60 s/side

W5 Fri|Legs|60–75 min
~ 2–3 Minute Row or Jump Rope · Monster Walks × 15 (15 forwards then 15 backwards) · Down Dog Spider Lunge × 12 · Stretch Kicks × 10/side · Hollow Rocks × 45–60 s · Jump Squats × 20
# A · Strength · all sets of one move before the next · 2 min rest
- Body Clean to Tuck Jump|3 × 5|
- Barbell Tempo Front Squat|3–4 × 8|4:2:1 tempo
- Barbell Tempo Deadlifts|3–4 × 8|4:2:1 tempo
- Barbell Deficit Reverse Lunge|3–4 × 8|per side
- DB Single Leg RDL to Bent Row|3–4 × 8|per side
- KB Jumping Goblet Squats|1 × 50|
# B · Core
- Ring Support|3–5 × max hold|
= Banded Hamstring Stretch × 60 s/side · Kneeling Hip Flexor Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Groin Stretch × 60 s

W5 Sat|Cardio / Core / Mobility|30 min|opt
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Band Pass Throughs|60 s|
- Down Dog Spider Lunge T Frame|60 s|
- Pike Fold to Squat Hold|60 s|
- Table Pose with Reaches|60 s|
- Pigeon with Reaches|60 s|per side
- Forearm Plank|60 s|

W6 Mon|Full Body|60–75 min
~ 2–3 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Walkout Push Up T Frame × 10 · Bodyweight Squats × 20 · Hollow Body Hold × 45–60 s · Seal Jacks × 60 s
# A · Strength · all sets of one move before the next · 60–90 s rest
- KB Warrior Lunge|3–4 × 8|per side
- Chin Up with 2 second hold|3–4 × 10|
- Barbell Single Leg RDL|3–4 × 8|
- Explosive Plate Push Up|3–4 × 10–15|
- Hanging Knee to Elbow|3–4 × 8–12|controlled tempo
- KB Goblet Squat to Jumping Goblet Squat|3–4 × 10|
# B · Core
- Parallette Jump Through to L- Sit with 2 second hold|3–4 × 8|
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W6 Tue|Upper Body Push / Pull|60–75 min
~ 2–3 Minute Row or Jump Rope · Scapula Pull Ups × 15–20 · Forward/Backwards Bear Crawl × 60 s · Band Face Pulls × 20 · Push Up Spider Lunge T Frame × 10
# A · Strength · all sets of one move before the next · 60–90 s rest
- Barbell Supinated Bent Over Row with 2 second contraction|3–4 × 10|
- Barbell Bench Press with 2 seconds pause|3–4 × 10|
- DB Bent Row 2 for 1's|3–4 × 5|
- Weighted Dips|3–4 × 10|
- Chin Up with 2 second hold|3 × F|
- Staggered Explosive Push Ups|3 × F|
# B · Core
- X Ups|4 × 10–20|
= Single Arm Pec Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W6 Wed|Cardio / Core / Mobility|30 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Band Pass Throughs|60 s|
- Down Dog Spider Lunge T Frame|60 s|
- Pike Fold to Squat Hold|60 s|
- Table Pose with Reaches|60 s|
- Pigeon with Reaches|60 s|
- Forearm Plank|60 s|

W6 Thu|Full Body|45–60 min
~ 2–3 Minute Row or Jump Rope · Table Pose with Reaches × 8/side · Kettlebell Swings × 20–25 · Push Up to Plank × 12 · Burpee (No push up/No jump) × 12 · Hollow Body Flutter Kicks × 45–60 s
# A · Single-arm KB complex · 5–8 sets · no rest between moves · 2 min rest
- Snatch|5–8 × 3|per side
- Clean|5–8 × 3|per side
- Squat Clean Thruster|5–8 × 3|
# B · Core
- Hanging Knee to Elbow|3–5 × 8–12|controlled tempo
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Hamstring Stretch × 60 s/side

W6 Fri|Legs|60–75 min
~ 2–3 Minute Row or Jump Rope · Monster Walks × 15 (15 forwards then 15 backwards) · Down Dog Spider Lunge × 12 · Stretch Kicks × 10/side · Hollow Rocks × 45–60 s · Jump Squats × 20
# A · Strength · all sets of one move before the next · 2 min rest
- Body Clean to Box Jump|3 × 3|
- Barbell Back Squat Lunge Complex|3–4 × 8|
- Barbell Single Leg Deadlift|3–4 × 8|per side
- KB Deficit Front Rack Reverse Lunge|3–4 × 8|per side
- DB Suitcase Deadlift|3–4 × 8|per side
- Ninja Roll Ups|3–4 × 10|
# B · Core
- Ring Support|3–5 × max hold|
= Banded Hamstring Stretch × 60 s/side · Kneeling Hip Flexor Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Groin Stretch × 60 s

W6 Sat|Cardio / Core / Mobility|30 min|opt
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Band Pass Throughs|60 s|
- Down Dog Spider Lunge T Frame|60 s|
- Pike Fold to Squat Hold|60 s|
- Table Pose with Reaches|60 s|
- Pigeon with Reaches|60 s|per side
- Forearm Plank|60 s|

W7 Mon|Full Body|60–75 min
~ 2–3 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Walkout Push Up T Frame × 10 · Bodyweight Squats × 20 · Hollow Body Hold × 45–60 s · Seal Jacks × 60 s
# A · Strength · all sets of one move before the next · 60–90 s rest
- Single Arm KB Squat Clean Thruster|3–4 × 12|6 per side
- Switching Grip Pull Ups|3–4 × 8–12|
- Superman Push Ups|3–4 × 8–12|
- Barbell Suitcase Deadlift|3–4 × 8|per side
- Barbell Ab Rollout|3–4 × 10–15|
- Barbell Jumping Lunges|3–4 × 10|per side
# B · Core
- Weighted V Up Complex|3–4 × 8|
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W7 Tue|Upper Body Push / Pull|60–75 min
~ 2–3 Minute Row or Jump Rope · Scapula Pull Ups × 15–20 · Forward/Backwards Bear Crawl × 60 s · Band Face Pulls × 20 · Push Up Spider Lunge T Frame × 10
# A · Strength · all sets of one move before the next · 60–90 s rest
- Tempo Barbell Bench Press|3–4 × 8|4:2:1 tempo
- Bench Supported DB Row with 2 second contraction|3–4 × 8|
- DB Bench Press 2 for 1's|3–4 × 5|
- DB Single Arm Supinated Row with 2 second contraction|3–4 × 8|per side
- Weighted Push Up|3 × F|
- ISO Chin Up L Sit Hold|3 × max hold|
# B · Core · 30/30 X 5 Rounds
- KB Supported Hollow Body Flutter Kicks||
= Single Arm Pec Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W7 Wed|Cardio / Core / Mobility|30 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Band Pass Throughs|60 s|
- Down Dog Spider Lunge T Frame|60 s|
- Pike Fold to Squat Hold|60 s|
- Table Pose with Reaches|60 s|
- Pigeon with Reaches|60 s|
- Forearm Plank|60 s|

W7 Thu|Full Body|45–60 min
~ 2–3 Minute Row or Jump Rope · Table Pose with Reaches × 8/side · Kettlebell Swings × 20–25 · Push Up to Plank × 12 · Burpee (No push up/No jump) × 12 · Hollow Body Flutter Kicks × 45–60 s
# A · DB complex · 5–8 sets · no rest between moves · 1–2 min rest
- Deadlifts|5–8 × 5|
- Hang Squat Cleans|5–8 × 5|
- Push Press|5–8 × 5|
- Front Rack Reverse Lunges|5–8 × 5|per leg
# B · Core
- Hanging Knee to Elbow|3–5 × 8–12|controlled tempo
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Hamstring Stretch × 60 s/side

W7 Fri|Legs|60–75 min
~ 2–3 Minute Row or Jump Rope · Monster Walks × 15 (15 forwards then 15 backwards) · Down Dog Spider Lunge × 12 · Stretch Kicks × 10/side · Hollow Rocks × 45–60 s · Jump Squats × 20
# A · Strength · all sets of one move before the next · 2 min rest
- Body Clean Burpee Box Jump|3 × 5|
- Barbell Tempo Back Squat|3–4 × 8|4:2:1 tempo
- DB Burpee Deadlift|3–4 × 8|
- DB Bulgarian Split Squat with 2 second pause|3–4 × 8|per side
- Barbell Toes Elevated RDL|3–4 × 8|
- Ninja Roll Up to Tuck Jump|3–4 × 8|
# B · Core
- Ring Tuck Hold|3–5 × max hold|
= Banded Hamstring Stretch × 60 s/side · Kneeling Hip Flexor Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Groin Stretch × 60 s

W7 Sat|Cardio / Core / Mobility|30 min|opt
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Band Pass Throughs|60 s|
- Down Dog Spider Lunge T Frame|60 s|
- Pike Fold to Squat Hold|60 s|
- Table Pose with Reaches|60 s|
- Pigeon with Reaches|60 s|per side
- Forearm Plank|60 s|

W8 Mon|Full Body|60–75 min
~ 2–3 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Walkout Push Up T Frame × 10 · Bodyweight Squats × 20 · Hollow Body Hold × 45–60 s · Seal Jacks × 60 s
# A · Strength · all sets of one move before the next · 60–90 s rest
- DB Burpee Squat Clean|3–4 × 8|
- Single Arm Support with Row|3–4 × 10|per side
- DB Goblet Squat with 2 second pause with band|3–4 × 10|
- Chest to Bar Pull Up|3–4 × 8–10|
- KB Single Arm Hollow Body Floor Press|3–4 × 8|per side
- DB Explosive Step Ups|3–4 × 8|per side
# B · Core
- Foam Roller Elevator Planks with knees|4 × 8–12|
= Kneeling Hip Flexor Stretch × 60 s (each · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W8 Tue|Upper Body Push / Pull|60–75 min
~ 2–3 Minute Row or Jump Rope · Scapula Pull Ups × 15–20 · Forward/Backwards Bear Crawl × 60 s · Band Face Pulls × 20 · Push Up Spider Lunge T Frame × 10
# A · Strength · all sets of one move before the next · 60–90 s rest
- Tempo Barbell Bench Press|3–4 × 8|4:2:1 tempo
- Barbell Bent Over Row with 2 second contraction|3–4 × 8|
- KB Single Arm Floor Press with 2 second pause|3–4 × 8|per side
- DB ISO Single Arm Row|3–4 × 8|per side
- Weighted Deficit Push Ups|3 × F|
- ISO Chin Up L Sit Hold|3 × max hold|
# B · Core · 20/10 X 8 Rounds
- Sprinter Sit Ups||
= Single Arm Pec Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Banded Tricep Stretch × 60 s/side

W8 Wed|Cardio / Core / Mobility|30 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Band Pass Throughs|60 s|
- Down Dog Spider Lunge T Frame|60 s|
- Pike Fold to Squat Hold|60 s|
- Table Pose with Reaches|60 s|
- Pigeon with Reaches|60 s|
- Forearm Plank|60 s|

W8 Thu|Full Body|45–60 min
~  · 2 Minute Row or Jump Rope · Lateral Band Walk × 15/side · Lunge with Scaption × 10/side · Inch Worm Push Ups × 10 · Band Pass Throughs × 15 · Spider Lunge to T Frame × 10/side
# A · Double KB complex · 5–8 sets · no rest between moves · 1–2 min rest
- Push Up to L Sit|5–8 × 5|
- Cleans|5–8 × 5|
- Thruster|5–8 × 5|
# B · Core
- Toe to Bar|3–5 × 5–10|controlled tempo
= Kneeling Hip Flexor Stretch × 60 s/side · Banded Lat Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Banded Hamstring Stretch × 60 s/side

W8 Fri|Legs|60–75 min
~ 2–3 Minute Row or Jump Rope · Monster Walks × 15 (15 forwards then 15 backwards) · Down Dog Spider Lunge × 12 · Stretch Kicks × 10/side · Hollow Rocks × 45–60 s · Jump Squats × 20
# A · Strength · all sets of one move before the next · 2 min rest
- Body Clean Tuck Jump Burpee Box Jump|3 × 5|
- Barbell Tempo Front Squat|3–4 × 8|4:2:1 tempo
- Barbell Burpee Deadlift|3–4 × 8|
- KB Front Rack Step Ups|3–4 × 8|per side
- Barbell Single Leg RDL|3–4 × 8|
- Ninja Roll Up Tuck Jump|3–4 × 8|
# B · Core
- Ring Tuck Hold|3–5 × max hold|
= Banded Hamstring Stretch × 60 s/side · Kneeling Hip Flexor Stretch × 60 s/side · Pigeon Stretch × 60 s/side · Groin Stretch × 60 s

W8 Sat|Cardio / Core / Mobility|30 min|opt
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Jump Rope|2 min|
- Band Pass Throughs|60 s|
- Down Dog Spider Lunge T Frame|60 s|
- Pike Fold to Squat Hold|60 s|
- Table Pose with Reaches|60 s|
- Pigeon with Reaches|60 s|per side
- Forearm Plank|60 s|`;
const TFM2=`
W1 Mon|Leg Day|60–75 min
~ Lateral Band Walk × 25/side · Lunge w/ Psoas Reach × 10/side · Pike Fold to Squat Hold × 10 · Double Band Glute Bridge w/ 2 s hold × 15 · Jumping Spider Lunge T Frame × 10/side
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Barbell Box Squat|3–4 × 5|
- Barbell Deadlift|3–4 × 10|
- KB Front Rack Step Up|3–4 × 8|per leg
- KB or DB RDL w/ 2 second pause|3–4 × 10|
# B · Finisher · 10-to-1 ladder · for time
- Goblet Squats||10 down to 1
- Burpees||10 down to 1
# C · Core · 60–90 s rest
- Ab Rollouts w/ 2 sec. pause|3–4 × 8–12|
= Spider Lunge Stretch × 60–90 s/side · Banded Hamstring Stretch 60–90 s/side · Pigeon Stretch w/ reaches × 60–90 s/side

W1 Tue|Full Body|60–75 min
~ Inch Worm Push Up × 10 · Lunge w/ Psoas Reach × 10/side · Band In Front / Behind the Neck Press × 10 · Lateral Bear Crawl × 60 s · High Knees × 60 s
# A · Strength · all sets of one move before the next · 2–3 min rest
- KB or DB Farmer's Carry|3–4 × 40 yd or 45 s|
- KB Clean + Cossack Squat|3–4 × 8|per side
- Horizontal Bodyweight Row w/ 2 second hold|3–4 × 8–12|
- Jump Through to L- Sit|3–4 × 8–12|
- DB or KB Bridge Press|3–4 × 12|
- KB Single Arm Squat Clean Thruster|3–4 × 8|per side
# B · Core finisher · 20/10 X 6 Rounds
- Twisting Mountain Climbers||
- Bridge Sit Ups||
= Band Hip Flexor / Lat Stretch × 60–90 s/side · Child's Pose to Arch × 60–90 s · Pigeon Stretch w/ T Frame × 60–90 s/side

W1 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Prone Floor Angels|3 × 60 s|
- Down Dog Toe Touch|3 × 60 s|
- Foam Roller Thoracic Extensions|3 × 60 s|
- Side Kick Throughs|3 × 60 s|
- Hollow Body Hold|3 × 60 s|

W1 Thu|Upper Body Push / Pull|60–75 min
~ Walkouts × 10 · Band Pass Throughs × 15 · Superman Hold to Push Up × 10 · Band Pull Aparts × 15 · Band In Front / Behind the Neck Press × 10
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Weighted Pull Ups|3–5 × 5|
- Barbell Tempo Bench Press|3–4 × 8|4:2:1 tempo
- DB Bench Supported Alternating Arm Row|3–4 × 10|per arm
- DB Close Grip Bench Press|3–4 × 12|
# B · Finisher · 10-to-1 ladder · for time
- Pull Ups||10 down to 1
- Weighted Push Ups||10 down to 1
= Box / Bench Lat Stretch × 60–90 s/side · Pigeon Stretch w/ T Frame × 60–90 s/side · Scorpions 60–90 s

W1 Fri|Full Body|60 min
~ Inch Worm Push Ups × 10 · Band Pass Through × 15 · Foam Roller Lying Scap Openers × 10/side · Double Band Glute Bridge w/ 2 s hold × 15 · World's Greatest Stretch × 5/side
# A · Strength · all sets of one move before the next · 2–3 min rest
- KB Turkish Get Up|5 × 1|1 per side
# B · KB complex · 6–8 sets · no rest between moves · 1–2 min rest
- Deadlift|6–8 × 5|one rep of each move = 1 cycle · 5 cycles a set
- Row|6–8 × 5|
- Clean|6–8 × 5|
- Thruster|6–8 × 5|
# C · Core finisher · AMRAP 6
- Skier Hops|10|5 per side
- Tuck Ups|10|
- Toe Touchers|10|
= Spider Lunge Stretch × 60–90 s/side · Down Dog to Arch × 60–90 s · Pigeon Stretch w/ reaches × 60–90 s/side

W1 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Pike Fold to Squat Hold|3 × 60 s|
- Prone Floor Angels|3 × 60 s|
- Down Dog Toe Touch|3 × 60 s|
- Foam Roller Thoracic Extensions|3 × 60 s|
- Side Kick Throughs|3 × 60 s|
- Superman Lifts|3 × 60 s|

W2 Mon|Leg Day|60–75 min
~ Lateral Band Walk × 25/side · Lunge w/ Psoas Reach × 10/side · Pike Fold to Squat Hold × 10 · Double Band Glute Bridge w/ 2 s hold × 15 · Jumping Spider Lunge T Frame × 10/side
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Barbell Deadlift|3–4 × 5|
- KB or Barbell Front Squat w/ 4 second negative|3–4 × 8|
- Barbell or DB RDL 2 Position Deadlift|3–4 × 8|
- Barbell Deficit Back Lunge (10 cm deficit)|3–4 × 10|per leg
# B · Finisher · 5 sets · 60 s rest
- KB or DB Deadlift|5 × 30 s|
- Bodyweight Jump Squats|5 × 30 s|
# C · Core · 60–90 s rest
- Bench Leg Lift to Pulse|3–5 × 12–15|slow tempo
= Spider Lunge Stretch × 60–90 s/side · Banded Hamstring Stretch 60–90 s/side · Pigeon Stretch w/ reaches × 60–90 s/side

W2 Tue|Full Body|60–75 min
~ Inch Worm Push Up × 10 · Lunge w/ Psoas Reach × 10/side · Band In Front / Behind the Neck Press × 10 · Lateral Bear Crawl × 60 s · High Knees × 60 s
# A · Strength · all sets of one move before the next · 2–3 min rest
- KB or DB Farmers Carry|3–4 × 40 yd or 45 s|
- KB Snatch Lunge|3–4 × 8|per side
- Single Arm Bodyweight Rows|3–4 × 8|per side
- L- Sit Hold|3–4 × max hold|
- DB or KB Push Up Renegade Row w/ 2 second hold|3–4 × 12|6 per side
- KB or DB Goblet Box Pistols|3–4 × 8|per side
# B · Core finisher · 20/10 X 6 Rounds
- Plank Walks||
- Hollow Body Knee Tucks||
= Band Hip Flexor / Lat Stretch × 60–90 s/side · Child's Pose to Arch × 60–90 s · Pigeon Stretch w/ T Frame × 60–90 s/side

W2 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Single Arm Plank Hold|3 × 60 s|30 seconds per side
- Squat Hold|3 × 60 s|
- Foam Roller Lying Scap Openers|3 × 10|per side
- Candle Stick to Reach Through|3 × 60 s|
- Child's Pose to Arch|3 × 60 s|
- Hollow Rocks|3 × 60 s|

W2 Thu|Upper Body Push / Pull|60–75 min
~ Walkouts × 10 · Band Pass Throughs × 15 · Superman Hold to Push Up × 10 · Band Pull Aparts × 15 · Band In Front / Behind the Neck Press × 10
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Barbell Bench Press|3–5 × 5|
- DB Bench Supported Row w/ 2 second hold|3–4 × 10|
- DB Single Arm Incline Bench Press|3–4 × 8|per side
- KB Gorilla Row|3–4 × 10|per side
# B · Finisher · AMRAP 10
- Chin Up|5|
- Dip to Knee Raise|10|
= Box / Bench Lat Stretch × 60–90 s/side · Pigeon Stretch w/ T Frame × 60–90 s/side · Scorpions 60–90 s

W2 Fri|Full Body|60 min
~ Inch Worm Push Ups × 10 · Band Pass Through × 15 · Foam Roller Lying Scap Openers × 10/side · Double Band Glute Bridge w/ 2 s hold × 15 · World's Greatest Stretch × 5/side
# A · Strength · all sets of one move before the next · 2–5 min rest
- Barbell Step Up|5 × 5|
# B · KB complex · 6–8 sets · no rest between moves · 1–2 min rest
- Body Clean to Snatch|6–8 × 2|per side
- Clean to Back Lunge|6–8 × 4|per side
- Burpee Squat Clean Thruster|6–8 × 6|
# C · Core finisher · AMRAP 6
- Plank Breakdowns|10|
- V Up|10|
- Hollow Body Hold|10 s|
= Spider Lunge Stretch × 60–90 s/side · Child's Pose to Arch × 60–90 s · Pigeon Stretch w/ reaches × 60–90 s/side

W2 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Single Arm Plank Hold|3 × 60 s|30 seconds per side
- Squat Hold|3 × 60 s|
- Foam Roller Lying Scap Openers|3 × 10|per side
- Candle Stick to Reach Through|3 × 60 s|
- Child's Pose to Arch|3 × 60 s|
- Superman Lift Complex|3 × 60 s|

W3 Mon|Leg Day|60–75 min
~ Lateral Band Walk × 25/side · Lunge w/ Psoas Reach × 10/side · Pike Fold to Squat Hold × 10 · Double Band Glute Bridge w/ 2 s hold × 15 · Jumping Spider Lunge T Frame × 10/side
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Barbell Box Squat|3–4 × 5|
- Barbell Sumo Deadlift|3–4 × 8|
- KB or DB Goblet Bench Pistol|3–4 × 10|per leg
- Barbell Kickstand Deadlift|3–4 × 8|per leg
# B · Finisher · 3–4 sets · 60–90 s rest
- KB Swings|3–4 × 20 s|
- KB Squat Cleans|3–4 × 20 s|
- KB Jumping Deadlifts|3–4 × 20 s|
# C · Core · 60–90 s rest
- Band Pallof Press w/ Rotation|3–4 × 10|per side
= Spider Lunge Stretch × 60–90 s/side · Banded Hamstring Stretch 60–90 s/side · Pigeon Stretch w/ reaches × 60–90 s/side

W3 Tue|Full Body|60–75 min
~ Inch Worm Push Up × 10 · Lunge w/ Psoas Reach × 10/side · Band In Front / Behind the Neck Press × 10 · Lateral Bear Crawl × 60 s · High Knees × 60 s
# A · Strength · all sets of one move before the next · 2–3 min rest
- KB or DB Single Arm Farmers Carry|3–4 × 40 yd or 45 s|per arm
- KB or DB Overhead Single Arm Step Up|3–4 × 10|per side
- Chin Up w/ 4 second negative|3–4 × F|
- DB or KB Supported Hollow Body Flutter Kicks|3–4 × 60 s|
- Explosive Push Up w/ 4 second negative|3–4 × F|
- ISO Lunge Hammer Curls|3–4 × 10|per side
# B · Core finisher · 20/10 X 6 Rounds
- Plank Reach to Spider Knee||
- V Up Complex||
= Band Hip Flexor / Lat Stretch × 60–90 s/side · Child's Pose to Arch × 60–90 s · Pigeon Stretch w/ T Frame × 60–90 s/side

W3 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Pike Fold to Squat Hold|3 × 60 s|
- Prone Floor Angels|3 × 60 s|
- Down Dog Toe Touch|3 × 60 s|
- Foam Roller Thoracic Extensions|3 × 60 s|
- Side Kick Throughs|3 × 60 s|
- Hollow Body Hold|3 × 60 s|

W3 Thu|Upper Body Push / Pull|60–75 min
~ Walkouts × 10 · Band Pass Throughs × 15 · Superman Hold to Push Up × 10 · Band Pull Aparts × 15 · Band In Front / Behind the Neck Press × 10
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Weighted Chin Ups|3–5 × 5|
- Barbell Incline Bench Press|3–4 × 12|
- DB Plank Row|3–4 × 12|per side
- DB Close Grip Bench Press w/ 4 sec negative|3–4 × 12|
# B · Finisher · 10-to-1 ladder · for time
- Pull Ups||10 down to 1
- Superman Push Ups||10 down to 1
= Box / Bench Lat Stretch × 60–90 s/side · Pigeon Stretch w/ T Frame × 60–90 s/side · Scorpions 60–90 s

W3 Fri|Full Body|60 min
~ Inch Worm Push Ups × 10 · Band Pass Through × 15 · Foam Roller Lying Scap Openers × 10/side · Double Band Glute Bridge w/ 2 s hold × 15 · World's Greatest Stretch × 5/side
# A · Strength · all sets of one move before the next · 2–5 min rest
- Barbell Glute Bridge|5 × 5|
# B · KB complex · 6–8 sets · no rest between moves · 1–2 min rest
- Snatch|6–8 × 3|one rep of each move = 1 cycle · 3 cycles a set per side
- Row|6–8 × 3|
- Clean Lunge|6–8 × 3|
- Kneeling Press|6–8 × 3|
# C · Core finisher · AMRAP 6
- Plank Reaches|10|per side
- Bridge Sit Up|10|
- Hollow Rock|10|
= Spider Lunge Stretch × 60–90 s/side · Child's Pose to Arch × 60–90 s · Pigeon Stretch w/ reaches × 60–90 s/side

W3 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Pike Fold to Squat Hold|3 × 60 s|
- Prone Floor Angels|3 × 60 s|
- Down Dog Toe Touch|3 × 60 s|
- Foam Roller Thoracic Extensions|3 × 60 s|
- Side Kick Throughs|3 × 60 s|
- Superman Lifts|3 × 60 s|

W4 Mon|Leg Day|60–75 min
~ Lateral Band Walk × 25/side · Lunge w/ Psoas Reach × 10/side · Pike Fold to Squat Hold × 10 · Double Band Glute Bridge w/ 2 s hold × 15 · Jumping Spider Lunge T Frame × 10/side
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Barbell Deadlift|3–4 × 5|
- Barbell Back Squat w/ 4 second negative|3–4 × 8|
- KB or DB Kickstand RDL Walk|3–4 × 10|per side
- Barbell Cossack Squat|3–4 × 8|per side
# B · Finisher · 3–5 sets · 45 s rest
- Jumping Lunge|3–5 × 10|per leg
- Jump Squat|3–5 × 10|
- ISO Squat Hold|3–5 × 10 s|
# C · Core · 60–90 s rest
- Weighted Side Plank Lifts|3–5 × 15–20|
= Spider Lunge Stretch × 60–90 s/side · Banded Hamstring Stretch 60–90 s/side · Pigeon Stretch w/ reaches × 60–90 s/side

W4 Tue|Full Body|60–75
~ Inch Worm Push Up × 10 · Lunge w/ Psoas Reach × 10/side · Band In Front / Behind the Neck Press × 10 · Lateral Bear Crawl × 60 s · High Knees × 60 s
# A · Strength · all sets of one move before the next · 2–3 min rest
- KB or DB Single Arm Farmers Carry|3–4 × 40 yd or 45 s|per arm
- Barbell Clean + Press|3–4 × 8|
- Single Arm Bodyweight Row|3–4 × 8|per arm
- Plank Skull Crushers|3–4 × 10–15|
- KB or DB Single Arm Bridge Press|3–4 × 10|per side
- KB Front Rack Squat Get Ups|3–4 × 5|per side
# B · Core finisher · 20/10 X 6 Rounds
- Double Mountain Climber||
- Hollow Body Scissor Kicks||
= Band Hip Flexor / Lat Stretch × 60–90 s/side · Child's Pose to Arch × 60–90 s · Pigeon Stretch w/ T Frame × 60–90 s/side

W4 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Single Arm Plank Hold|3 × 60 s|30 seconds per side
- Squat Hold|3 × 60 s|
- Foam Roller Lying Scap Openers|3 × 10|per side
- Candle Stick to Reach Through|3 × 60 s|
- Child's Pose to Arch|3 × 60 s|
- Hollow Rocks|3 × 60 s|

W4 Thu|Upper Body Push / Pull|60–75 min
~ Walkouts × 10 · Band Pass Throughs × 15 · Superman Hold to Push Up × 10 · Band Pull Aparts × 15 · Band In Front / Behind the Neck Press × 10
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Barbell Bench Press|3–5 × 5|
- Barbell Supinated Close Grip Row|3–4 × 10|
- Barbell Incline Bench Press w/ 4 second negative|3–4 × 8|
- DB or KB Quadruped Row|3–4 × 10|per side
# B · Finisher · 3–5 sets · 60–90 s rest
- Chin Ups|3–5 × 20 s|
- KB Explosive Push Ups|3–5 × 20 s|
- Skier Hops|3–5 × 20 s|
= Box / Bench Lat Stretch × 60–90 s/side · Pigeon Stretch w/ T Frame × 60–90 s/side · Scorpions 60–90 s

W4 Fri|Full Body|60 min
~ Inch Worm Push Ups × 10 · Band Pass Through × 15 · Foam Roller Lying Scap Openers × 10/side · Double Band Glute Bridge w/ 2 s hold × 15 · World's Greatest Stretch × 5/side
# A · Strength · all sets of one move before the next · 2–5 min rest
- Barbell Back Lunge|5 × 5|
# B · KB complex · 6–8 sets · no rest between moves · 1–2 min rest
- Burpee Clean|6–8 × 5|
- Gorilla Row|6–8 × 7|
- Front Squat|6–8 × 9|
# C · Core finisher · AMRAP 6
- Plank Walkouts|10|
- Side Plank Hip Lift|10|per side
- Leg lifts|10|
= Spider Lunge Stretch × 60–90 s/side · Child's Pose to Arch × 60–90 s · Pigeon Stretch w/ reaches × 60–90 s/side

W4 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Single Arm Plank Hold|3 × 60 s|30 seconds per side
- Squat Hold|3 × 60 s|
- Foam Roller Lying Scap Openers|3 × 10|per side
- Candle Stick to Reach Through|3 × 60 s|
- Child's Pose to Arch|3 × 60 s|
- Superman Lift Complex|3 × 60 s|

W5 Mon|Legs|60–75 min
~ Monster Walks × 15 (15 froward then 15 backward) · Spider Lunge T Frame Crawl × 10/side · Cossack Stretch × 10/side · Single Leg Bridge × 15/side · Body Clean × 5–8
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Barbell Front Squat|3–4 × 5|
- Barbell Sumo Deadlift|3–4 × 10|
- DB or KB Heels Elevated Goblet Squat w/ pause|3–4 × 10|
- DB or KB Single Leg RDL w/ 4 sec negative to kickstand|3–4 × 6|per side
# B · Finisher · 10-to-1 ladder · for time
- Goblet Squats||10 down to 1
- Burpees||10 down to 1
# C · Core · 60–90 s rest
- Ab Rollouts w/ 2 sec pause|3–4 × 8–12|
= Band Hip / Lat Stretch × 60–90 s/side · Band V Stretch 60–90 s · Adductor Stretch × 60–90 s/side

W5 Tue|Full Body|60–75 min
~ Monster Walks × 15 (15 forward then 15 backward) · Superman Hold to Push Up × 12 · Stretch Kick to Lunge × 10/side · Scap Pull Ups × 15 · Body Clean to Tuck Jump × 5–8
# A · Strength · all sets of one move before the next · 2–3 min rest
- KB or DB Front Rack Carry|3–4 × 40 yd or 45 s|
- KB Clean + Cossack Squat + Rotational Press|3–4 × 8|per side
- Pull Ups w/ 4 second negative|3–4 × F|
- Weighted Side Plank Lifts|3–4 × 15–20|per side
- DB Push Up Renegade Row to Reverse Fly|3–4 × 12|6 per side
- KB Burpee Clean + Front Squat|3–4 × 10|
# B · Core finisher · 20/10 X 6 Rounds
- Twisting Mountain Climbers||
- Bridge Sit Ups||
= Child's Pose Reach Through × 45–60 s/side · Band Tricep Stretch × 60–90 s/side · QL Stretch 45–60 s/side

W5 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Pike Fold to Squat Hold|3 × 60 s|
- Prone Floor Angels|3 × 60 s|
- Down Dog Toe Touch|3 × 60 s|
- Foam Roller Thoracic Extensions|3 × 60 s|
- Side Kick Throughs|3 × 60 s|
- Hollow Body Hold|3 × 60 s|

W5 Thu|Upper Body Push / Pull|60–75 min
~ Band Pass Throughs × 15 · Scap Pull Ups × 15 · Swimmer Push Ups × 15 · Bent Row to External Rotation × 10 · Plank Reaches × 60 s
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Weighted Pull Up|3–5 × 5|
- DB or KB Single Arm Incline Bench Press|3–4 × 8|
- DB Bench Supported Single Arm Row|3–4 × 10|per side
- Barbell Bench Press w/ 4 second negative|3–4 × 8|
# B · Finisher · 10-to-1 ladder · for time
- Pull Ups||10 down to 1
- Weighted Push Ups||10 down to 1
= Box / Bench Lat Stretch × 60–90 s · Pec Stretch × 60–90 s · Pigeon Stretch w/ T Frame × 60–90 s/side

W5 Fri|Full Body|60 min
~ Push Up Spider Lunge T Frame × 8 · Monster Walks × 15 (15 forward then 15 backwards) · Scap Pull Ups × 15 · Body Clean to Vertical Jump × 5–8 · Kettle Bell Swings × 25
# A · Strength · all sets of one move before the next · 2–3 min rest
- KB Turkish Get Up|5 × 1|1 per side
# B · KB complex · 6–8 sets · no rest between moves · 1–2 min rest
- Overhead Lunge|6–8 × 5|per side
- Double Clean + Front Squat|6–8 × 5|
- Sea Saw Press|6–8 × 5|per side
- Renegade Row|6–8 × 5|per side
# C · Core finisher · AMRAP 6
- Skier Hops|10|5 per side
- Tuck Ups|10|
- Toe Touchers|10|
= Child's Pose to Arch × 60–90 s · Foam Roller Thoracic Extensions × 60–90 s · Adductor Stretch × 60–90 s/side

W5 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Pike Fold to Squat Hold|3 × 60 s|
- Prone Floor Angels|3 × 60 s|
- Down Dog Toe Touch|3 × 60 s|
- Foam Roller Thoracic Extensions|3 × 60 s|
- Side Kick Throughs|3 × 60 s|
- Superman Lifts|3 × 60 s|

W6 Mon|Legs|60–75 min
~ Monster Walks × 15 (15 froward then 15 backward) · Spider Lunge T Frame Crawl × 10/side · Cossack Stretch × 10/side · Single Leg Bridge × 15/side · Body Clean × 5–8
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Barbell Sumo Deadlift|3–4 × 5|
- Barbell Step Up|3–4 × 8|per leg
- KB or DB Kickstand RDL Walk|3–4 × 10|per leg
- DB or KB Heels Elevated Goblet Squat w/ pause|3–4 × 12|
# B · Finisher · 5 sets · 60 s rest
- KB or DB Deadlift|5 × 30 s|
- Bodyweight Jump Squats|5 × 30 s|
# C · Core · 60–90 s rest
- Band Pallof Press to Rotation|3–4 × 10|per side
= Band Hip / Lat Stretch × 60–90 s/side · Band V Stretch 60–90 s · Adductor Stretch × 60–90 s/side

W6 Tue|Full Body|60–75 min
~ Monster Walks × 15 (15 forward then 15 backward) · Superman Hold to Push Up × 12 · Stretch Kick to Lunge × 10/side · Scap Pull Ups × 15 · Body Clean to Tuck Jump × 5–8
# A · Strength · all sets of one move before the next · 2–3 min rest
- KB or DB Front Rack Carry|3–4 × 40 yd or 45 s|
- DB Burpee Snatch|3–4 × 6|per side
- Single Arm Bodyweight Rows|3–4 × 10|
- KB or DB Supported Hollow Body Scissor Kicks|3–4 × 60 s|
- KB or DB Single Leg Bridge Press|3–4 × 8|per side
- KB Squat Clean to Step Up|3–4 × 8|4 step ups total per leg
# B · Core finisher · 20/10 X 6 Rounds
- Plank Walks||
- Hollow Body Knee Tucks||
= Child's Pose Reach Through × 45–60 s/side · Band Tricep Stretch × 60–90 s/side · QL Stretch 45–60 s/side

W6 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Single Arm Plank Hold|3 × 60 s|30 seconds per side
- Squat Hold|3 × 60 s|
- Foam Roller Lying Scap Openers|3 × 10|per side
- Candle Stick to Reach Through|3 × 60 s|
- Child's Pose to Arch|3 × 60 s|
- Hollow Rocks|3 × 60 s|

W6 Thu|Upper Body Push / Pull|60–75 min
~ Band Pass Throughs × 15 · Scap Pull Ups × 15 · Swimmer Push Ups × 15 · Bent Row to External Rotation × 10 · Plank Reaches × 60 s
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Barbell Bench Press w/ 2 second pause|3–5 × 5|
- DB Bench 2 for 1 Row|3–4 × 6|
- DB Close Grip Bench Press w/ 4 sec negative|3–4 × 12|
- DB or KB Quadruped Row|3–4 × 12|per side
# B · Finisher · AMRAP 10
- Chin Up|5|
- Dip to Knee Raise|10|
= Box / Bench Lat Stretch × 60–90 s · Pec Stretch × 60–90 s · Pigeon Stretch w/ T Frame × 60–90 s/side

W6 Fri|Full Body|60 min
~ Push Up Spider Lunge T Frame × 8 · Monster Walks × 15 (15 forward then 15 backwards) · Scap Pull Ups × 15 · Body Clean to Vertical Jump × 5–8 · Kettle Bell Swings × 25
# A · Strength · all sets of one move before the next · 2–5 min rest
- Barbell Deficit Back Lunge|5 × 5|10 cm deficit
# B · KB complex · 6–8 sets · no rest between moves · 1–2 min rest
- Burpee Snatch|6–8 × 3|
- Single Leg RDL|6–8 × 5|
- Thruster|6–8 × 7|
# C · Finisher · AMRAP 6
- Plank Breakdowns|10|
- V Up|10|
- Hollow Body Hold|10 s|
= Child's Pose to Arch × 60–90 s · Foam Roller Thoracic Extensions × 60–90 s · Adductor Stretch × 60–90 s/side

W6 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Single Arm Plank Hold|3 × 60 s|30 seconds per side
- Squat Hold|3 × 60 s|
- Foam Roller Lying Scap Openers|3 × 10|per side
- Candle Stick to Reach Through|3 × 60 s|
- Child's Pose to Arch|3 × 60 s|
- Superman Lift Complex|3 × 60 s|

W7 Mon|Legs|60–75 min
~ Monster Walks × 15 (15 froward then 15 backward) · Spider Lunge T Frame Crawl × 10/side · Cossack Stretch × 10/side · Single Leg Bridge × 15/side · Body Clean × 5–8
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Barbell Front Squat|3–4 × 5|
- Barbell Sumo Deadlift|3–4 × 8|
- Barbell Deficit Back Lunge (10 cm deficit)|3–4 × 8|per leg
- KB or Barbell 2 Position Deadlift|3–4 × 8|
# B · Finisher · 3–4 sets · 60–90 s rest
- KB Swings|3–4 × 20 s|
- KB Squat Cleans|3–4 × 20 s|
- KB Jumping Deadlifts|3–4 × 20 s|
# C · Core · 60–90 s rest
- Band Pallof Press to Rotation|3–4 × 10|per side
= Band Hip / Lat Stretch × 60–90 s/side · Band V Stretch 60–90 s · Adductor Stretch × 60–90 s/side

W7 Tue|Full Body|60–75 min
~ Monster Walks × 15 (15 forward then 15 backward) · Superman Hold to Push Up × 12 · Stretch Kick to Lunge × 10/side · Scap Pull Ups × 15 · Body Clean to Tuck Jump × 5–8
# A · Strength · all sets of one move before the next · 2–3 min rest
- KB or DB Single Arm Overhead Farmers Carry|3–4 × 40 yd or 45 s|
- KB Burpee Clean to Push Press|3–4 × 10|
- Chin Up w/ 4 second negative|3–4 × F|
- Dip Bar Leg Lifts|3–4 × 10–15|
- Weighted Push Ups w/ 4 second negative|3–4 × F|
- DB Hammer Curl Lunge Switch|3–4 × 8|per side
# B · Core finisher · 20/10 X 6 Rounds
- Plank Reach to Spider Knee||
- V Up Complex||
= Child's Pose Reach Through × 45–60 s/side · Band Tricep Stretch × 60–90 s/side · QL Stretch 45–60 s/side

W7 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Pike Fold to Squat Hold|3 × 60 s|
- Prone Floor Angels|3 × 60 s|
- Down Dog Toe Touch|3 × 60 s|
- Foam Roller Thoracic Extensions|3 × 60 s|
- Side Kick Throughs|3 × 60 s|
- Hollow Body Hold|3 × 60 s|

W7 Thu|Upper Body Push / Pull|60–75 min
~ Band Pass Throughs × 15 · Scap Pull Ups × 15 · Swimmer Push Ups × 15 · Bent Row to External Rotation × 10 · Plank Reaches × 60 s
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Weighted Chin Ups|3–5 × 5|
- Barbell Tempo Bench Press|3–4 × 8|4:2:1 tempo
- DB Plank Row|3–4 × 12|per side
- DB Single Arm Bench Press|3–4 × 10|
# B · Finisher · 10-to-1 ladder · for time
- Pull Ups||10 down to 1
- Superman Push Ups||10 down to 1
= Box / Bench Lat Stretch × 60–90 s · Pec Stretch × 60–90 s · Pigeon Stretch w/ T Frame × 60–90 s/side

W7 Fri|Full Body|60 min
~ Push Up Spider Lunge T Frame × 8 · Monster Walks × 15 (15 forward then 15 backwards) · Scap Pull Ups × 15 · Body Clean to Vertical Jump × 5–8 · Kettle Bell Swings × 25
# A · Strength · all sets of one move before the next · 2–5 min rest
- Barbell Glute Bridge w/ 2 second pause|5 × 5|
# B · KB complex · 6–8 sets · no rest between moves · 1–2 min rest
- Lunge Switch Clean + Press|6–8 × 3|per side
- Explosive Push Ups|6–8 × 6|per side
- Jumping Deadlift|6–8 × 9|
# C · Finisher · AMRAP 6
- Plank Reaches|10|per side
- Bridge Sit Up|10|
- Hollow Rock|10|
= Child's Pose to Arch × 60–90 s · Foam Roller Thoracic Extensions × 60–90 s · Adductor Stretch × 60–90 s/side

W7 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Pike Fold to Squat Hold|3 × 60 s|
- Prone Floor Angels|3 × 60 s|
- Down Dog Toe Touch|3 × 60 s|
- Foam Roller Thoracic Extensions|3 × 60 s|
- Side Kick Throughs|3 × 60 s|
- Superman Lifts|3 × 60 s|

W8 Mon|Legs|60–75 min
~ Monster Walks × 15 (15 froward then 15 backward) · Spider Lunge T Frame Crawl × 10/side · Cossack Stretch × 10/side · Single Leg Bridge × 15/side · Body Clean × 5–8
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Barbell Sumo Deadlift|3–4 × 5|
- Barbell or KB Front Squat w/ 4 second negative|3–4 × 8|
- Barbell or KB Single Leg RDL w/ 4 sec negative|3–4 × 8|per side
- KB or DB Goblet Bench Pistols|3–4 × 8|per side
# B · Finisher · 3–5 sets · 45 s rest
- Jumping Lunge|3–5 × 10|per leg
- Jump Squat|3–5 × 10|
- ISO Squat Hold|3–5 × 10 s|
# C · Core · 60–90 s rest
- Weighted Side Plank Lifts|3–5 × 15–20|
= Band Hip / Lat Stretch × 60–90 s/side · Band V Stretch 60–90 s · Adductor Stretch × 60–90 s/side

W8 Tue|Full Body|60–75 min
~ Monster Walks × 15 (15 forward then 15 backward) · Superman Hold to Push Up × 12 · Stretch Kick to Lunge × 10/side · Scap Pull Ups × 15 · Body Clean to Tuck Jump × 5–8
# A · Strength · all sets of one move before the next · 2–3 min rest
- KB or DB Single Arm Overhead Farmers Carry|3–4 × 40 yd or 45 s|
- KB Lunge Switch Clean + Press|3–4 × 8|per side
- Horizontal Bodyweight Row w/ 2 second hold|3–4 × 10–12|
- Side Plank Star Lifts|3–4 × 10–20|per side
- KB or DB Feet Elevated Push Up Renegade Row|3–4 × 5–8|
- KB Jumping Deadlift to Squat Clean|3–4 × 10|
# B · Core finisher · 20/10 X 6 Rounds
- Double Mountain Climber||
- Hollow Body Scissor Kicks||
= Child's Pose Reach Through × 45–60 s/side · Band Tricep Stretch × 60–90 s/side · QL Stretch 45–60 s/side

W8 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Single Arm Plank Hold|3 × 60 s|30 seconds per side
- Squat Hold|3 × 60 s|
- Foam Roller Lying Scap Openers|3 × 10|per side
- Candle Stick to Reach Through|3 × 60 s|
- Child's Pose to Arch|3 × 60 s|
- Hollow Rocks|3 × 60 s|

W8 Thu|Upper Body Push / Pull|60–75 min
~ Band Pass Throughs × 15 · Scap Pull Ups × 15 · Swimmer Push Ups × 15 · Bent Row to External Rotation × 10 · Plank Reaches × 60 s
# A · Strength · all sets of one move first · 2–5 min rest on the first lift, 90–120 s after
- Barbell Bench Press w/ 2 second pause|3–5 × 5|
- Barbell Supinated Close Grip Bent Row|3–4 × 10|
- DB Single Arm Incline Bench Press|3–4 × 10|
- KB Gorilla Row|3–4 × 10|per side
# B · Finisher · 3–5 sets · 60 s rest
- Chin Ups|3–5 × 20 s|
- KB Explosive Push Ups|3–5 × 20 s|
- Skier Hops|3–5 × 20 s|
= Box / Bench Lat Stretch × 60–90 s · Pec Stretch × 60–90 s · Pigeon Stretch w/ T Frame × 60–90 s/side

W8 Fri|Full Body|60 min
~ Push Up Spider Lunge T Frame × 8 · Monster Walks × 15 (15 forward then 15 backwards) · Scap Pull Ups × 15 · Body Clean to Vertical Jump × 5–8 · Kettle Bell Swings × 25
# A · Strength · all sets of one move before the next · 2–5 min rest
- Barbell Step Up|5 × 5|
# B · KB complex · 6–8 sets · no rest between moves · 2–3 min rest
- Thruster|6–8 × 5|
- Gorilla Row to Deadlift|6–8 × 5|
- Sea Saw Press|6–8 × 5|per side
- Burpee Double Swing|6–8 × 5|
# C · Finisher · AMRAP 6
- Plank Walkouts|10|
- Side Plank Hip Lift|10|per side
- Leg Lifts|10|
= Child's Pose to Arch × 60–90 s · Foam Roller Thoracic Extensions × 60–90 s · Adductor Stretch × 60–90 s/side

W8 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3 rounds · no rest between moves · 60 s rest
- Cardio of choice|3–5 min|row, bike, rope, ski or run
- Pike Fold to Squat Hold|3 × 60 s|
- Single Arm Plank Hold|3 × 60 s|30 seconds per side
- Squat Hold|3 × 60 s|
- Foam Roller Lying Scap Openers|3 × 10|per side
- Candle Stick to Reach Through|3 × 60 s|
- Child's Pose to Arch|3 × 60 s|
- Superman Lift Complex|3 × 60 s|`;
const TFM3=`
W1 Mon|Leg Day|60–75 min
~ Walkout Spider Lunge T Frame × 10 (5/side) · KB Good Morning × 20 · Knee Hugger to Lunge × 10/side · Hip Circle to Back Lunge × 10/side · Burpee to Vertical Jump × 10
# A · Superset 1 · 4 sets · 2–3 min rest
- Barbell Deadlift|4 × 5|
- Vertical Jumps|4 × 8|
# B · Superset 2 · 4 sets · 1–2 min rest
- KB or DB Kickstand Deadlift|4 × 8|per side
- Barbell Heel Elevated Back Squat w/ 2 sec pause|4 × 10|
# C · Finisher · 3–4 sets · 30–60 s rest
- KB Front Rack Back Lunge|3–4 × 10|per side
- Over KB Burpees|3–4 × 10|
# D · Core superset · 4–5 sets · 30–60 s rest
- Decline Leg Lift to Pulse|4–5 × 15–20|
- Ring Plank|4–5 × 45–60 s|
= Hip to Hamstring Stretch × 60 s/side · Band Single Leg V Stretch × 60 s/side · Couch Stretch × 60 s/side

W1 Tue|Full Body|60–75 min
~ Crab Reaches × 10/side · Down Dog Spider Lunge × 8 (8/side) · DB High Pull to External Rotation × 12 · Lunge Complex × 6/side · Hollow Rocks × 60 s
# A · Circuit 1 · 4 sets · 60–90 s rest
- Front Rack / Single Arm Overhead Carry|4 × 40 yd or 45 s|per side
- KB Lateral Step Ups w/ Controlled Negative|4 × 8|per side
- Pike Push Ups|4 × 12–15|
# B · Circuit 2 · 4 sets · 60–90 s rest
- L Chin Up|4 × 10–12|
- Opposite Leg Toe Touchers|4 × 45–60 s|
- DB Curl to Single Arm Press|3–4 × 12|6 presses per side
# C · Circuit 3 · 4 sets · 60–90 s rest
- KB or DB Burpee Deadlift Step Up|4 × 12|6 per leg
- DB Bat Wing Row|4 × 10|
- Weighted Tuck Ups|4 × 60 s|
= Pigeon Stretch × 60 s/side · Wrist / Bicep Stretch 60 s · Assisted V Stretch × 60 s

W1 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Row|3–4 × 500–750 m|
- Down Dog to Arch|3–4 × 10|
- Scap Pull Ups|3–4 × 10–15|
- Pigeon Stretch|3–4 × 60 s|per side
- Burpee (no push up/no jump)|3–4 × 10|
- Bird Dog|3–4 × 10|per side

W1 Thu|Upper Body Push / Pull|60–75 min
~ Push Up to Plank × 10 · Scap Pull Ups × 15 · DB Superman Lift to Press × 10 (very light weight) · Band Internal / External Rotation × 15/side · KB Taps × 60 s
# A · Superset 1 · 4 sets · 2–3 min rest
- Weighted Pull Up|4 × 8|
- DB Single Arm Rows|4 × 8|per arm
# B · Superset 2 · 4 sets · 2–3 min rest
- Barbell Bench Press|4 × 8|
- Clap Push Up|4 × 8–10|
# C · Finisher · 3–4 sets · 60–90 s rest
- DB Plank Rows|3–4 × 12|per side
- Medicine Ball Explosive Push Up Complex|3–4 × F|
- Barbell Curl|3–4 × 10|hold 10 s at mid-range first
= Dead Hang × 30–60 s · Ring Shoulder Extension Stretch × 60 s · Child's Pose w/ Reach × 30 s/side

W1 Fri|Full Body|60–75 min
~ Lunge Complex × 6/side · KB Good Morning × 20 · Lateral Bear Crawl w/ Band × 20/side · KB or DB Goblet Squat w/ 2 s pause × 10 · Hollow Hold × 60
# A · Strength · all sets of one move before the next · 2–3 min rest
- Barbell Thruster|5 × 5|
# B · KB complex · 6–8 sets · no rest between moves · 1–2 min rest
- Deadlift|6–8 × 5|one rep of each move = 1 cycle · 5 cycles a set
- Squat Clean|6–8 × 5|
- Cossack Squat|6–8 × 5|per side
# C · Core finisher · 5 sets · 60 s rest
- V Ups|5 × 10|
- Hollow Rocks|5 × 10|
- Bridge Sit Ups|5 × 10|
- Ab Kickouts|5 × 10|
= Child's Pose × 60 s · Adductor Stretch × 60 s/side · Band Single Leg V Stretch × 60 s/side

W1 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Run|3–4 × 800–1600 m|
- Spider Lunge T Frame|3–4 × 10|per side
- Candle Stick Reach|3–4 × 15|
- DB Bent Row External Rotation|3–4 × 10|
- Walkouts|3–4 × 10|
- Side Plank|3–4 × 45–60 s|per side

W2 Mon|Leg Day|60–75 min
~ KB Single Leg RDL Hand Off × 8/side · Kneeling Scap Openers × 10/side · PVC Overhead Cossack Squat × 8/side · Hamstring Walkouts × 10 (5/side) · Burpee Side Shuffle × 10
# A · Superset 1 · 4 sets · 1–2 min rest
- Barbell or KB Front Squat|4 × 10|
- Bodyweight Jump Squat w/ 2 second pause|4 × 10|
# B · Superset 2 · 4 sets · 1–2 min rest
- Barbell Lateral Step Up|4 × 8|per side
- KB Deadlift to Single Leg Deadlift|4 × 5|
# C · Finisher · 3–4 sets · 60–90 s rest
- Barbell Walking Lunges|3–4 × 10|per leg
- KB or DB Jumping Goblet Squat|3–4 × 10|
# D · Core superset · 4–5 sets · 60–90 s rest
- Jump Through to L Sit|4–5 × 10|
- Ring Side Plank|4–5 × 30–45 s|per side
= Hip to Hamstring Stretch × 60 s/side · Band Single Leg V Stretch × 60 s/side · Elevated Pigeon Stretch × 60 s/side

W2 Tue|Full Body|60–75 min
~ Lateral Bear Crawl w/ Band × 20 (each direction) · Superman Lifts × 15 · KB Back Lunge to Halo × 8/side · Band Face Pulls × 20 · Walkout Spider Lunge T Frame × 10 (5/side)
# A · Circuit 1 · 4 sets · 60–90 s rest
- Barbell Burpee Clean to Press|4 × 8|
- Single Arm Ring Plank|4 × 20–30 s|per side
- Pull Ups|4 × 10–15|
# B · Circuit 2 · 4 sets · 60–90 s rest
- Bench Supported DB Row|4 × 10|hold 10 s at the top first
- Left to Right Plank Walk|4 × 60 s|
- Barbell Squat to Curl|4 × 10|
# C · Circuit 3 · 4 sets · 60–90 s rest
- DB Pike Push Up to Bear Row|4 × 6–8|
- Hollow Pull Overs|4 × 60 s|
- KB Clean to Squat Get Up|4 × 10|5 per side
= Couch Stretch × 60 s/side · Ring Pec Stretch × 60 s · Arch Stretch × 60 s

W2 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Jump Rope|3–4 × 2–3 min|
- Spider Lunge to Hamstring Stretch|3–4 × 10|per side
- DB Bench YTA's|3–4 × 8|
- Shuttle Runs|3–4 × 60 s|
- Sit Back Front Kick Through's|3–4 × 6–8|per side
- Hollow Body Flutter Kicks|3–4 × 60 s|

W2 Thu|Upper Body Push / Pull|60–75 min
~ Superman Hold Push Up × 12 · Band Face Pull × 20 · High Plank Scap Push Ups × 15 · Band Single Arm Pull Down × 10/side · KB Taps × 60 s
# A · Superset 1 · 4 sets · 1–2 min rest
- Barbell Bench Press w/ 2 sec pause|4 × 5|
- Explosive Plate Push Ups|4 × F|
# B · Superset 2 · 4 sets · 1–2 min rest
- Barbell Burpee Bent Row|4 × 10|
- Pull Up|4 × F|
# C · Finisher · 3–4 sets · 60–90 s rest
- Barbell Supinated Grip Hollow Press|3–4 × 12|
- DB Single Arm ISO Hammer Curls|3–4 × 10|per side
- Medicine Ball Close Grip Push Up w/ knee drive|3–4 × F|
= Band Tricep Stretch × 60 s · Box Lat Stretch × 60 s · Child's Pose to Arch × 60 s

W2 Fri|Full Body|60–75 min
~ DB High Pull to External Rotation × 12 · KB Swings × 20 · Prone PVC Raises × 15 · KB or DB Goblet Squat w/ 2 s pause × 10 · Barbell Deadlift × 15 (just the barbell)
# A · Strength · all sets of one move before the next · 2–3 min rest
- Barbell Deficit Deadlift|5 × 5|
# B · KB complex · EMOM 15
- Swing|5|
- Deadlift High Pull|5|
- Thruster|5|
# C · Core finisher · 5 sets · 60–90 s rest
- Hollow Knee Tucks|5 × 10|
- Hollow Rocks|5 × 10|
- Pulse Ups|5 × 10|
- Hollow Flutter Kicks|5 × 10 s|
= Spider Lunge Stretch × 60 s/side · Ring Pec Stretch × 60 s/side · Band Single Leg V Stretch × 60 s/side

W2 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Run|3–4 × 800–1600 m|
- KB Squat to Halo|3–4 × 12|
- Down Dog to Spider Lunge|3–4 × 8|per side
- Scap Pull Ups|3–4 × 10–15|
- Inch Worms|3–4 × 10|
- Side Plank Reach Through|3–4 × 45–60 s|per side

W3 Mon|Leg Day|60–75 min
~ Single Leg RDL to Front Lunge × 10/side · High Plank Scap Push Ups × 20–25 · KB Hike to Swing × 12 · Body Clean Vertical Jump × 5–8 · Barbell Deadlifts × 15 (no weight)
# A · Superset 1 · 4 sets · 2–3 min rest
- Barbell Deadlift|4 × 5|
- Body Clean to Vertical Jump|4 × 5|
# B · Superset 2 · 4 sets · 1–2 min rest
- DB or KB RDL to Front Lunge|4 × 12|6 lunges per side
- Barbell Heel Elevated Back Squat w/ 2 sec pause|4 × 12|
# C · Finisher · 3–4 sets · 60–90 s rest
- KB Hike to Swing|3–4 × 10|
- KB Single Arm Squat Clean|3–4 × 10|5 per arm
# D · Core superset · 4–5 sets · 30–60 s rest
- Dragon Flag Negatives|4–5 × 8–10|
- Side Plank Hip Lift to Knee to Elbow|4–5 × 15–20|per side
= Hip to Hamstring Stretch × 60 s/side · Band Single Leg V Stretch × 60 s/side · Couch Stretch × 60 s/side

W3 Tue|Full Body|60–75 min
~ Pike Shoulder Taps × 50 (25/side) · Band Face Pulls × 20 · Hollow Rocks × 60 s · PVC Overhead Squats × 20 · Inch Worm Push Up × 10
# A · Circuit 1 · 4 sets · 60–90 s rest
- KB Front Rack Grapevine Carry|4 × 40 yd or 45 s|
- Barbell Single Leg RDL to Bent Over Row|4 × 6|per side
- Wall Walks|4 × 5 or Max Reps|
# B · Circuit 2 · 4 sets · 60–90 s rest
- KB Offset Squats|4 × 12|switch side after 6 reps
- Regular to Wide Explosive Pull Ups|4 × 8 or max reps|
- DB High Plank Row|4 × 12|per side
# C · Circuit 1 · 4 sets · 60–90 s rest
- KB or DB Push Press to Single Arm Press|4 × 5|
- DB Single Arm V Up|4 × 20|10 per side
- Medicine Ball Burpee Squat Lunge Complex|4 × 10|
= Couch Stretch × 60 s/side · Ring Pec Stretch × 60 s · Arch Stretch × 60 s

W3 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Run|3–4 × 800–1600 m|
- Spider Lunge Stretch w/ T Frame|3–4 × 10|per side
- Band Face Pulls|3–4 × 10–15|
- Ring Plank|3–4 × 60 s|
- Pigeon Stretch|3–4 × 60 s|per side
- Horizontal Row ISO Hold|3–4 × 30 s|

W3 Thu|Upper Body Push / Pull|60–75 min
~ Swimmer Push Up × 10 · Horizontal Row w/ 2 s hold × 8 · Plank Scap Push Ups × 20–25 · Band Single Arm Pull Down × 10/side · Single Arm Plank YTA's × 8/side
# A · Superset 1 · 4 sets · 1–2 min rest
- DB Single Arm Floor Press|4 × 8|
- Regular to Wide Explosive Pull Ups|4 × F|
# B · Superset 2 · 4 sets · 1–2 min rest
- Bench Supported DB Row|4 × 10|hold 10 s at the top first
- DB Hollow Body Close Grip Press|4 × 10|
# C · Finisher · 3–4 sets · 1–2 min rest
- Switching Grip Pull Ups|3–4 × F|
- Dip to Leg Raise|3–4 × 10–15|
- DB 2 for 1 Hammer Curls|3–4 × 6|
= Band Tricep Stretch × 60 s · Box Lat Stretch × 60 s · Child's Pose to Arch × 60 s

W3 Fri|Full Body|60–75 min
~ Lunge Complex × 6/side · KB Good Morning × 20 · Walkout Spider Lunge T Frame × 10 · KB Back Lunge to Halo × 8/side · Ring Plank Saws × 60 s
# A · Strength · all sets of one move before the next · 2–3 min rest
- Barbell Deficit Front Rack Back Lunge w/ 2 second pause|5 × 5|
# B · Barbell complex · 6–8 sets · no rest between moves · 1–2 min rest
- Deadlift|6–8 × 5|one rep of each move = 1 cycle · 5 cycles a set
- Bent Over Row|6–8 × 5|
- Clean and Press|6–8 × 5|
- Overhead Back Lunge|6–8 × 5|per leg
# C · Core finisher · 5 sets · 60 s rest
- Plank Spider Knees|5 × 10|per side
- Plank Breakdowns|5 × 10|
- Plank Reaches|5 × 10|per side
- Plank Jacks|5 × 20|
= Lunge Reach to Hamstring Stretch × 60 s/side · Ring Pec Stretch × 60 s · Assisted V Stretch × 60 s

W3 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Run|3–4 × 800–1600 m|
- PVC Overhead Squat|3–4 × 15|
- Single Arm High Plank YTA's|3–4 × 8|per side
- Adductor Stretch|3–4 × 60 s|per side
- Kneeling Band Single Arm Lat Pull Down|3–4 × 10|per side
- Ring Saws|3–4 × 45–60 s|

W4 Mon|Leg Day|60–75 min
~ Jumping Spider Lunge T Frame × 10/side · KB Single Leg RDL Hand Off × 8/side · Body Clean × 5–8 · KB Good Morning to Goblet Squat × 10 · Burpee 4 High Knees × 10
# A · Superset 1 · 4 sets · 1–2 min rest
- Barbell Deficit Sumo Deadlift|4 × 8|
- KB Deficit Jumping Deadlift|4 × 12|
# B · Superset 2 · 4 sets · 1–2 min rest
- Barbell Back Lunge to Step Up|4 × 6|per side
- KB or DB Jumping Goblet Squat w/ 2 second pause|4 × 12|
# C · Finisher · 3–4 sets · 30–60 s rest
- KB or Barbell Suitcase Deadlift to Over Bar Burpee|3–4 × 10|
- Heavy KB Swing|3–4 × 10|
# D · Core superset · 4–5 sets · 60 s rest
- KB 1/4 Get Ups|4–5 × 8–10|per side
- Band Power Hooks|4–5 × 10–15|per side
= Hip to Hamstring Stretch × 60 s/side · Band Single Leg V Stretch × 60 s/side · Elevated Pigeon Stretch × 60 s/side

W4 Tue|Full Body|60–75 min
~ Bear Crawl Burpee × 8 · KB Single Arm Swing × 10/side · Push Up T Frame × 12 · KB Squat to Halo × 10 · Plank Walkouts × 60 s
# A · Circuit 1 · 4 sets · 60–90 s rest
- KB or DB Single Arm Push Press|4 × 8|per side
- DB RDL to Front Lunge|4 × 12|6 lunges per leg
- Handstand Hold|4 × 30–60 s|
# B · Circuit 2 · 4 sets · 60–90 s rest
- KB Swing to Squat Clean w/ 2 second pause||reps not listed · match the circuit
- Explosive Push Up to Scaption|4 × 8|per side
- Switching Grip Pull Ups|4 × F|
# C · Circuit 3 · 4 sets · 60–90 s rest
- KB Burpee Gorilla Row|4 × 10|
- Weighted Hollow Rocks|4 × 60 s|
- Dive Bomber Push Ups|4 × 15|
= Couch Stretch × 60 s/side · Ring Pec Stretch × 60 s · Arch Stretch × 60 s

W4 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Row|3–4 × 500–750 m|
- KB Kneeling Halo|3–4 × 8|per side
- Candle Stick Reach|3–4 × 15|
- Band Plank Reaches|3–4 × 60 s|
- Adductor Stretch|3–4 × 60 s|per side
- Side Plank Reach Through|3–4 × 45–60 s|per side

W4 Thu|Upper Body Push / Pull|60–75 min
~ Superman Hold to Push Up × 10 · Band Face Pull × 20 · Quadruped T Spine Openers × 10/side · Band Single Arm Lat Pull Down × 10/side · Bird Dogs × 10/side
# A · Superset 1 · 4 sets · 2–3 min rest
- Weighted Pull Up|4 × 5|
- DB Bench ISO Single Arm Rows|4 × 8|per side
# B · Superset 2 · 4 sets · 1–2 min rest
- DB Single Arm Floor Press|4 × 8|per arm
- Weighted Dips|4 × 12|
# C · Finisher · 3–4 sets · 60–90 s rest
- Push Up to L Sit|3–4 × 10|
- DB Bat Wing Row|3–4 × 10|
- Clap Push Up w/ 2 sec pause|3–4 × F|
= Band Tricep Stretch × 60 s · Box Lat Stretch × 60 s · Child's Pose to Arch × 60 s

W4 Fri|Full Body|60–75 min
~ Band Plank Reaches × 60 s · KB Hike to Swing × 12 · Walkout Spider Lunge T Frame × 10 · KB Back Lunge to Halo × 8/side · Hollow Flutter Kicks × 60 s
# A · Strength · all sets of one move before the next · 2–3 min rest
- Barbell Sumo Box Squat|5 × 5|
# B · KB complex · 6–8 sets · no rest between moves · 1–2 min rest
- Snatch Lunge (Left Arm)|6–8 × 5|one rep of each move = 1 cycle · 5 cycles a set
- Snatch Lunge (Right Arm)|6–8 × 5|
- Squat Clean to Curl|6–8 × 5|
# C · Core finisher · 5 sets · 30–60 s rest
- Foam Roller Plank Elevators|5 × 20 s|
- Foam Roller Twisting Mountain Climbers|5 × 20 s|
- Foam Roller Forearm Plank|5 × 20 s|
= Lunge Reach to Hamstring Stretch × 60 s/side · Ring Pec Stretch × 60 s · Assisted V Stretch × 60 s

W4 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Run|3–4 × 800–1600 m|
- KB Kneeling Single Arm Bottoms Up Hold|3–4 × 30 s|per side
- Crab Reaches|3–4 × 10|per side
- Band Single Arm Row to External Rotation|3–4 × 10|per side
- Hamstring Walkouts|3–4 × 10|5 per side
- Single Arm Ring Plank|3–4 × 30 s|per side

W5 Mon|Leg Day|60–75 min
~ DB Single Leg RDL to Press × 8/side · Knee Hugger to Lunge × 12 (6/side) · KB Good Morning × 20 · Hip Circle to Back Lunge × 12 (6/side) · Bodyweight Squat w/ 2 sec pause × 60 s
# A · Superset 1 · 4 sets · 2–3 min rest
- Barbell or KB Front Rack Step Up|4 × 5|
- Jumping Step Up|4 × 8|per leg
# B · Superset 2 · 4 sets · 1–2 min rest
- KB Deficit Sumo Deadlift|4 × 12|
- KB Front Rack Squat Lunge Complex|4 × 6|
# C · Finisher · 3–4 sets · 30–60 s rest
- KB Squat Get Up w/ Jump|3–4 × 10|
- Wall Sit|3–4 × 60 s|
# D · Core superset · 4–5 sets · 30–60 s rest
- KB East to West Plank|4–5 × 30 s|per side
- Band Wood Choppers|4–5 × 10|per side
= Hip to Hamstring Stretch × 60 s/side · Band Single Leg V Stretch × 60 s/side · Couch Stretch × 60 s/side

W5 Tue|Full Body|60–75 min
~ Walkout to Spider Lunge × 10 (5/side) · Plate Row to External Rotation to Press × 10 · Bodyweight Squat Get Up w/ Jump × 10 · High Plank Scap Push Ups × 20–25 · Burpee Side Shuffles × 60 s
# A · Circuit 1 · 4 sets · 60–90 s rest
- KB Front Rack / Single Arm Overhead Carry|4 × 40 yd or 45 s|
- Rack Assisted Pistols|4 × 8–10|
- Barbell Rollout to Clean + Press|4 × 8–10|
# B · Circuit 2 · 4 sets · 60–90 s rest
- Weighted Pull Up|4 × 8–12|
- Dip Bar Around the World Leg Raises|4 × 12–14|
- KB Hollow Floor Press w/ Flutter Kicks|4 × 12|
# C · Circuit 3 · 4 sets · 60–90 s rest
- KB Lunge Switch Row|4 × 10|per side
- KB North to South Plank|4 × 30 s|per side
- Wall Sit w/ Bicep Curls|4 × 45–60 s|
= Couch Stretch × 60 s/side · Ring Pec Stretch × 60 s · Arch Stretch × 60 s

W5 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Row|3–4 × 500–750 m|
- Scorpion to Push Up|3–4 × 10|5 per side
- KB Swing|3–4 × 15|
- Hollow Rocks|3–4 × 25|
- Hip to Hamstring Stretch|3–4 × 10|per side
- Ring Side Plank|3–4 × 30–45 s|per side

W5 Thu|Upper Body Push / Pull|60–75 min
~ Scorpion to Push Up × 12 (6/side) · Band Single Arm Row to External Rotation × 10/side · Kneeling Medicine Ball Chest Passes × 15–20 · Scap Pull Ups × 15–20 · Single Arm Down Dog × 10/side
# A · Superset 1 · 4 sets · 1–2 min rest
- DB Single Arm Bench Press w/ 2 second pause|4 × 8|
- DB Bench Supported Rows w/ 2 second hold|4 × 10|
# B · Superset 2 · 4 sets · 1–2 min rest
- DB Close Grip Bench Press w/ 2 sec pause|4 × 10|
- Pull Up w/ 4 second negative|4 × F|
# C · Finisher · 3–4 sets · 60–90 s rest
- DB Push Up to Renegade Row w/ Spider Knees|3–4 × 8|
- Barbell or DB Bicep Curl w/ 4 sec negative|3–4 × 10|
- Weighted Dips w/ 2 second pause|3–4 × 8–10|
= Band Tricep Stretch × 60 s · Box Lat Stretch × 60 s · Child's Pose to Arch × 60 s

W5 Fri|Full Body|60–75 min
~ KB Turkish Get Up × 3/side · Pike Shoulder Taps × 25/side · DB Superman Lift to Press × 10 · KB Good Morning to Goblet Squat × 10 · Lateral Bear Crawl w/ Band × 20/side
# A · Strength · all sets of one move before the next · 2–3 min rest
- Barbell Deficit Deadlift|5 × 5|
# B · KB complex · EMOM 15
- Clean|5|
- Push Press|5|
- Jump Squat|5|
# C · Core finisher · 3–5 sets · 60–90 s rest
- Straight Arm Crunches|3–5 × 10|
- V Ups|3–5 × 10|
- Russian Twists|3–5 × 10|per side
- Hollow Body Pull Overs|3–5 × 10|
= Lunge Reach to Hamstring Stretch × 60–90 s/side · Ring Pec Stretch × 60–90 s/side · Assisted V Stretch × 60 s

W5 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Run|3–4 × 800–1600 m|
- Back Lunge to Halo|3–4 × 10|5 per side
- Pike Fold to Squat Hold|3–4 × 10|
- Hollow Toe Touchers|3–4 × 45 s|
- Band Single Arm Row w/ external rotation|3–4 × 10|per side
- Rotational Plank|3–4 × 60 s|

W6 Mon|Leg Day|60–75 min
~ Jumping Spider Lunge T Frame × 10/side · KB Single Arm Swing × 10–15/side · PVC Overhead Cossack Squat × 8/side · Hamstring Walkouts × 10 (5/side) · Bodyweight Squat Get Up w/ Jump × 10
# A · Superset 1 · 4 sets · 1–2 min rest
- Barbell Deadlift|4 × 8|
- Barbell Back Lunge w/ 2 second pause|4 × 8|per side
# B · Superset 2 · 4 sets · 1–2 min rest
- DB or KB Heel Elevated Front Squat|4 × 12|
- Single Leg RDL w/ 2 second pause|4 × 8|per side
# C · Finisher · 40/20 X 4 Rounds
- KB or Barbell Burpee Deadlift to Burpee Tuck Jump||
# D · Core superset · 4–5 sets · 60 s rest
- KB North to South Plank|4–5 × 30 s|per side
- Weighted Seated Tucks|4–5 × 15–20|
= Hip to Hamstring Stretch × 60 s/side · Band Single Leg V Stretch × 60 s/side · Elevated Pigeon Stretch × 60 s/side

W6 Tue|Full Body|60–75 min
~ Lunge Reach to Hamstring Stretch × 8/side · PVC Overhead Squat × 20 · Single Arm Plank YTA × 8/side · Rotational Ball Slam × 8/side · Burpee Shuttle Run × 60 s
# A · Circuit 1 · 4 sets · 60–90 s rest
- KB or DB Push Press to Single Arm Press|4 × 5|
- Burpee Box Jump|4 × 8|
- KB Single Arm Clean w/ Single Arm Deadlift|4 × 12|
# B · Circuit 2 · 4 sets · 60–90 s rest
- KB Push Up Renegade Row to Gorilla Row|4 × 8|
- Hanging Around the World Leg Raises|4 × 12|
- Handstand Shoulder Taps|4 × 30 s|
# C · Circuit 3 · 4 sets · 60–90 s rest
- Weighted Ninja Roll Up w/ jump|4 × 10|
- Offset Hollow Body Hold|4 × 60 s|switch sides after 30 seconds
- DB Lunge Switch Curl to Press|4 × 12|6 per leg
= Couch Stretch × 60 s/side · Ring Pec Stretch × 60 s/side · Arch Stretch × 60 s

W6 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Assault Bike|3–4 × 30 cal|
- Kneeling KB Single Arm Bottoms Up Press|3–4 × 8|per side
- Down Dog to Spider Lunge|3–4 × 8|per side
- Band Core Rotations|3–4 × 8–10|per side
- Burpee (no push up / no jump)|3–4 × 10|
- Single Arm Ring Plank|3–4 × 20–30 s|per arm

W6 Thu|Upper Body Push / Pull|60–75 min
~ Walkouts × 10 · Plate Row to External Rotation to Press × 10 · Kneeling Medicine Ball Chest Passes × 20–25 · Band Pull Aparts × 20 · Push Up T Frame × 12
# A · Superset 1 · 4 sets · 1–2 min rest
- Barbell Bench Press|4 × 5|
- Chin Up w/ 2 second hold|4 × 8–10|
# B · Superset 2 · 4 sets · 1–2 min rest
- DB Single Arm Bench Press w/ 2 sec pause|4 × 8|per side
- DB or KB Single Arm Bent Over Row|4 × 10|per side
# C · Finisher · 3–4 sets · 60–90 s rest
- Weighted Close Grip w/ Knee Drive|3–4 × 8–12|
- DB Zottman Curls|3–4 × 10|
- Superman Hold to Clap Push Up|3–4 × F|
= Band Tricep Stretch × 60 s · Box Lat Stretch × 60 s · Child's Pose to Arch × 60 s

W6 Fri|Full Body|60–75 min
~ KB Turkish Get Up × 3/side · KB Squat to Curl × 10 · Prone PVC Lifts × 15 · KB Hike to Swing × 12 · Single Arm Plank YTA's 8/side
# A · Strength · all sets of one move before the next · 2–3 min rest
- Barbell Sumo Box Squat|5 × 5|
# B · Barbell complex · 6–8 sets · no rest between moves · 1–2 min rest
- Power Clean|6–8 × 5|
- Push Press|6–8 × 5|
- Front Squat|6–8 × 5|
- Burpee Bent Over Row|6–8 × 5|
# C · Core finisher · 3–5 sets · 60–90 s rest
- Foam Roller Elevators Plank w/ Spider Knees|3–5 × 5|
- Foam Roller Shoulder Taps|3–5 × 10|per side
- Foam Roller Plank Saws|3–5 × 15|
= Lunge Reach to Hamstring Stretch × 60–90 s/side · Ring Pec Stretch × 60 s · Assisted V Stretch × 60 s

W6 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Run|3–4 × 800–1600 m|
- KB Turkish Get Up|3–4 × 1|per side
- Assisted V Stretch|3–4 × 60 s|
- Sit Back to Front Kick Through|3–4 × 12|6 per side
- Scap Pull Ups|3–4 × 10–20|
- Offset Hollow Body Hold|3–4 × 60 s|30 seconds each

W7 Mon|Leg Day|60–75 min
~ Kneeling Scap Openers × 10/side · Hip Circle to Back Lunge × 10/side · KB Good Morning to Goblet Squat × 10 · Tuck Jumps × 8–10 · Barbell Back Squat × 15 (just the barbell)
# A · Superset 1 · 4 sets · 2–3 min rest
- Barbell Back Squat|4 × 5|
- Seated Box Jump|4 × 5|
# B · Superset 2 · 4 sets · 1–2 min rest
- Barbell RDL to Single Leg RDL|4 × 5|
- Weighted Box Pistols|4 × 8|per side
# C · Finisher · 3–4 sets · 60–90 s rest
- KB Sumo Deadlift|3–4 × 10|
- KB Back Lunge|3–4 × 10|5 per side
- KB Jump Squat|3–4 × 10|
# D · Core superset · 4–5 sets · 30–60 s rest
- DB Single Arm V Up|4–5 × 10|per arm
- KB Half Moons|4–5 × 10|per side
= Hip to Hamstring Stretch × 60 s/side · Band Single Leg V Stretch × 60 s/side · Couch Stretch × 60 s/side

W7 Tue|Full Body|60–75 min
~ KB Single Arm Swing to Bottoms Up Back Lunge × 8/side · DB Superman Lift to Press × 10 · Hip Circle to Back Lunge × 10/side · Medicine Ball Side Toss Switch × 12/side · Pike Push Up to Shoulder Taps × 8–10
# A · Circuit 1 · 4 sets · 60–90 s rest
- Handstand Push Up|4 × 8–12|
- Ring Side Plank|4 × 30–45 s|
- KB Transverse Lunge to Squat Clean Thruster|4 × 8|per side
# B · Circuit 2 · 4 sets · 60–90 s rest
- Around the World Pull Ups|4 × 10–12|
- Push Up to Elevated Plank|4 × 10–12|
- Barbell Sumo Deadlift High Pull|4 × 10|
# C · Circuit 3 · 4 sets · 60–90 s rest
- KB Burpee Snatch Back Lunge (no push up)|4 × 10|
- KB or DB Feet Elevated Renegade Row|4 × 10|per side
- DB Wall Sit Curl to Lateral Raise|4 × 45–60 s|
= Couch Stretch × 60 s/side · Ring Pec Stretch × 60 s/side · Arch Stretch × 60 s

W7 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Jump Rope|3–4 × 2–3 min|
- Lunge Reach to Hamstring Stretch|3–4 × 10|per side
- High Plank Scap Push Ups|3–4 × 20–25|
- KB Single Arm Swing to Back Lunge to Bottoms Up Press|3–4 × 8|per side
- Shuttle Runs|3–4 × 60 s|
- KB Supported Hollow Body Flutter Kicks|3–4 × 45–60 s|

W7 Thu|Upper Body Push / Pull|60–75 min
~ KB Taps × 60 s · Scap Pull Ups × 10–20 · Kneeling Rotational Ball Slams × 10/side · Band Face Pulls × 20 · Dive Bomber Push Ups × 10–12
# A · Superset 1 · 4 sets · 1–2 min rest
- Barbell or DB Bench Press w/ 2 second pause|4 × 8|
- Weighted Pull Up|4 × 8|
# B · Superset 2 · 4 sets · 1–2 min rest
- Barbell RDL w/ Bent Over Row|4 × 8|
- Weighted Dips w/ 2 second pause|4 × 8|
# C · Finisher · 3–4 sets · 60–90 s rest
- KB or DB Hollow Body Alternating Single Arm Press|3–4 × 10|per side
- Chin Ups|3–4 × F|hold 10 s at the top, then max reps
- Medicine Ball Explosive Push Up Complex|3–4 × F|
= Band Tricep Stretch × 60 s · Box Lat Stretch × 60 s · Child's Pose to Arch × 60 s

W7 Fri|Full Body|60–75 min
~ KB Single Arm Swing to Back Lunge Bottoms Up Hold × 8/side · DB High Pull to External Rotation × 12 · KB Good Morning to Goblet Squat × 10 · DB Superman Lift to Press × 10 · Burpee Shuttle Run × 60 s
# A · Strength · all sets of one move before the next · 2–3 min rest
- Barbell 2 Position Deadlift|5 × 5|
# B · KB complex · 8–10 sets · no rest between moves · 1–2 min rest
- Swing Squat Clean|8–10 × 5|
- Front Rack Back Lunge|8–10 × 5|per leg
- Burpee Gorilla Row|8–10 × 5|
# C · Core finisher · 5 sets · 60–90 s rest
- Tuck Ups|5 × 10|
- Toe Touchers|5 × 10|
- Sit Up Press|5 × 10|
- Hollow Body Flutter Kicks|5 × 10 s|
= Lunge Reach to Hamstring Stretch × 60 s/side · Ring Pec Stretch × 60 s · Assisted V Stretch × 60 s

W7 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Run|3–4 × 800–1600 m|
- KB Bottoms Up Carry|3–4 × 45 s|per side
- Quadruped T Spine Openers|3–4 × 10|per side
- Walkouts|3–4 × 10|
- Spider Lunge Stretch|3–4 × 60 s|per side
- Band Wood Choppers|3–4 × 10|per side

W8 Mon|Leg Day|60–75 min
~ KB or DB Single Leg RDL + Curl + Press × 8/side · High Plank Scap Push Ups × 20–30 · PVC Overhead Cossack Squat × 10/side · Hamstring Walkouts × 10 (5/side) · Ninja Roll Up Tuck Jump × 8–10
# A · Superset 1 · 4 sets · 1–2 min rest
- Barbell Burpee Deadlift to Burpee Tuck Jump|4 × 6|
- Plate Pistol|4 × 6|per side
# B · Superset 2 · 4 sets · 1–2 min rest
- Offset Squats|4 × 12|switch sides at 6 reps
- KB Deadlift to Single Leg Deadlift|4 × 5|
# C · Finisher · 3–4 sets · 60 s rest
- Barbell Back Squat|3–4 × 10|
- Bodyweight Jump Squat|3–4 × 10|
# D · Core superset · 4–5 sets · 60 s rest
- KB or DB Feet Elevated Renegade Row|4–5 × 10|per side
- Band Core Rotations|4–5 × 10|per side
= Hip to Hamstring Stretch × 60 s/side · Band Single Leg V Stretch × 60 s/side · Elevated Pigeon Stretch × 60 s/side

W8 Tue|Full Body|60–75 min
~ KB Single Arm Swing to Bottoms Up Back Lunge to Press × 8/side · Medicine Ball Side Toss Switch × 12/side · Candle Stick Reach × 15 · Scorpion to Push Up × 12 (6/side) · KB Turkish Get Up × 3/side
# A · Circuit 1 · 4 sets · 60–90 s rest
- Barbell Turkish Get Up|4 × 1|per side
- Ring Push Up w/ Single Arm Layout|4 × 10|
- DB or KB Bent Over Single Arm ISO Rows|4 × 10|per side
# B · Circuit 2 · 4 sets · 60–90 s rest
- KB or DB Seated Single Arm Press|4 × 8|per side
- Dragon Flag Negatives|4 × 8–10|
- KB Swing to Squat Get Up w/ Jump|4 × 8–10|
# C · Circuit 3 · 4 sets · 60–90 s rest
- KB Push Up Renegade Row to Tuck Jump|4 × 8|
- Weighted Seated Tucks|4 × 15|
- DB Single Arm ISO Hammer Curls|4 × 10|per side
= Couch Stretch × 60 s/side · Ring Pec Stretch × 60 s/side · Arch Stretch × 60 s

W8 Wed|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Row|3–4 × 500–750 m|
- KB Kneeling Halo|3–4 × 8|per side
- Lunge Reach to Hamstring Stretch|3–4 × 8|per side
- Bear Crawl Burpees|3–4 × 8|
- Scap Pull Ups|3–4 × 12–15|
- Offset Hollow Body Hold|3–4 × 60 s|switch sides halfway

W8 Thu|Upper Body Push / Pull|60–75 min
~ Dive Bomber Push Ups × 12 · Plate Row to External Rotation to Press × 10 · Kneeing Rotational Ball Slam × 10/side · Horizontal Row w/ 2 sec hold × 8 · Plank Walkouts × 60 s
# A · Superset 1 · 4 sets · 1–2 min rest
- Weighted Pull Up|4 × 5|
- Barbell Supinated Grip Bent Over Row w/ 2 sec hold|4 × 8|
# B · Superset 2 · 4 sets · 1–2 min rest
- KB or DB Bench Press|4 × 8|
- Clap Push Up w/ 2 sec pause|4 × 8–10|
# C · Finisher · 3–4 sets · 60–90 s rest
- DB Spider Man Push Up Renegade Row|3–4 × 10|5 per side
- Horizontal Row w/ 2 sec hold|3–4 × 8–10|
- Plank Skull Crusher to Mountain Climber|3–4 × 10–15|
= Band Tricep Stretch × 60 s · Box Lat Stretch × 60 s · Child's Pose to Arch × 60 s

W8 Fri|Full Body|60–75 min
~ Inch Worm Push Ups × 10 · DB Bent Row to External Rotation × 12 · Front Lunge w/ Rotation × 10/side · KB Hike to Swing × 12 · Burpee Shuttle Run × 60 s
# A · Strength · all sets of one move before the next · 2–3 min rest
- Barbell Thruster|5 × 5|
# B · KB complex · 5–7 sets · no rest between moves · 2 min rest
- Body Clean|5–7 × 5|one rep of each move = 1 cycle · 5 cycles a set
- Burpee to Superman Push Up|5–7 × 5|
- Single Arm Squat Clean Thruster|5–7 × 5|per side
# C · Core finisher · 3–4 sets · 60 s rest
- KB Single Arm Straight Leg Sit Ups|3–4 × 10|per side
- KB Single Arm V Ups|3–4 × 10|per side
- KB North to South Plank|3–4 × 10|per side
= Lunge Reach to Hamstring Stretch × 60 s/side · Ring Pec Stretch × 60 s · Assisted V Stretch × 60 s

W8 Sat|Cardio / Core / Mobility|30–45 min
# A · Circuit · 3–4 rounds · no rest
- Assault Bike|3–4 × 30 cal|
- KB Kneeling Single Arm Bottoms Up Hold|3–4 × 30 s|per side
- Candle Stick Reach|3–4 × 15|
- Elevated Pigeon Stretch|3–4 × 60 s|per side
- Medicine Ball Side Toss Switch|3–4 × 12|per side
- Ring Single Arm Plank|3–4 × 20–30 s|per side`;

const SHARED=`<h4>How the weeks run</h4>
  <ul><li><b>Warm up every time.</b> Each session opens with a short movement warm-up; the moves are listed in the first row.</li>
   <li><b>Heavy but in control.</b> Pick the heaviest load you can move with clean form, and ramp up with lighter sets first.</li>
   <li><b>Complexes stay unbroken.</b> Move from one exercise to the next without putting the weight down.</li>
   <li><b>Cool down.</b> A few minutes of stretching closes each day.</li></ul>`;

R.program({id:'jtm_kbshred',n:'The Kettlebell Shred',sub:'8 weeks · 6 days · circuits, complexes and HIIT',shape:'days',days:KBS_ALL,
  type:['Kettlebell','Conditioning','Home'],group:G,by:'JTM Fit',
  note:'Each week is done twice before the next block. Sunday is a full rest day.'},
 `<h2 id="infoTitle">The Kettlebell Shred</h2><p class="by">JTM Fit · 8-week kettlebell program</p>
  <span class="pill2">8 weeks</span><span class="pill2">6 days a week</span><span class="pill2">Kettlebells + pull-up bar</span>
  <h4>What it is</h4>
  <p>A kettlebell conditioning plan in four two-week blocks. Every week has the same shape, and each week is repeated once before the next block brings new exercises.</p>
  <h4>The week</h4>
  <ul><li><b>Mon</b> full-body circuits on a work/rest timer</li>
   <li><b>Tue</b> a single or double kettlebell complex, then a core finisher</li>
   <li><b>Wed</b> easy cardio with mobility and core (active recovery, never all out)</li>
   <li><b>Thu</b> a heavy kettlebell circuit, then core</li>
   <li><b>Fri</b> a long HIIT circuit and a Tabata or ladder finisher</li>
   <li><b>Sat</b> a timed challenge to log and beat, then mobility</li>
   <li><b>Sun</b> rest</li></ul>
  <h4>Equipment</h4><p>A light-to-medium and a heavy kettlebell, ideally in pairs, a jump rope and a pull-up bar or a place to do bodyweight rows.</p>
  ${SHARED}`);

const TFM_INFO=(v,extra)=>`<h2 id="infoTitle">The Functional Method ${v}</h2><p class="by">JTM Fit · 8-week functional strength program</p>
  <span class="pill2">8 weeks</span><span class="pill2">5 days + optional mobility</span><span class="pill2">Barbell, DB, KB</span>
  <h4>What it is</h4>${extra}
  <h4>Core and recovery days</h4>
  <p>Every lifting day ends with core work. Wednesday and Saturday are an easy cardio and mobility circuit at a steady pace; Saturday is optional. Sunday is rest.</p>
  ${SHARED}`;

R.program({id:'jtm_tfm1',n:'The Functional Method 1.0',sub:'8 weeks · 5 days · strength, complexes and core',shape:'days',days:build('jtm_tfm1',TFM1,EB),
  type:['Strength','Full body','Gym'],group:G,by:'JTM Fit',note:'Horizontal loading: finish all sets of one exercise before the next. Saturday is optional.'},
 TFM_INFO('1.0',`<p>A gym program that mixes classic strength work with kettlebell and dumbbell complexes. Strength days use <b>horizontal loading</b>: every set of one exercise before you move on, with 60–90 s rest (2 min on leg day).</p>
  <ul><li><b>Mon</b> full body · <b>Tue</b> upper push/pull · <b>Thu</b> a complex for 5–8 rounds · <b>Fri</b> legs</li></ul>`));

R.program({id:'jtm_tfm2',n:'The Functional Method 2.0',sub:'8 weeks · 5 days · strength plus finishers',shape:'days',days:build('jtm_tfm2',TFM2,EB),
  type:['Strength','Full body','Gym'],group:G,by:'JTM Fit',note:'Long rest on the first heavy lift, shorter on the rest. Every day ends with a finisher or core.'},
 TFM_INFO('2.0',`<p>The second version adds a heavy opening lift (rest 2–5 min), then accessory strength with 90–120 s rest, and closes with a finisher: a 10-to-1 ladder, timed intervals or a short AMRAP.</p>
  <ul><li><b>Mon</b> legs · <b>Tue</b> full body · <b>Thu</b> upper push/pull · <b>Fri</b> a 5 × 5 strength lift, a kettlebell complex and a 6-minute core AMRAP</li></ul>`));

R.program({id:'jtm_tfm3',n:'The Functional Method 3.0',sub:'8 weeks · 5 days · supersets and circuits',shape:'days',days:build('jtm_tfm3',TFM3,EB),
  type:['Strength','Full body','Gym'],group:G,by:'JTM Fit',note:'Supersets: two moves back to back, then rest. Circuits: little rest between moves.'},
 TFM_INFO('3.0',`<p>The third version builds the lifting days from <b>supersets</b> (a heavy lift paired with a jump or bodyweight move) and three-move <b>circuits</b>, then a finisher and a core superset.</p>
  <ul><li><b>Mon</b> legs · <b>Tue</b> full-body circuits · <b>Thu</b> upper push/pull · <b>Fri</b> a 5 × 5 barbell lift, then a complex or a 15-minute EMOM</li></ul>`));

/* ===== approaches ===== */
R.approach({id:'jtm_complex',by:'JTM Fit',n:'Kettlebell complexes',
  short:'Chain 3–6 bell moves for 3–5 reps each without setting the bell down; 5–8 rounds.',
  gp:{s:[5,8],r:[3,6],rest:90,rpe:8},fmt:'circuit',prog:'setsreps',
  cues:['the bell stays in your hands','heavy, but own every rep'],prefer:'clean|snatch|swing|thruster|press|row|squat|lunge|deadlift',
  details:'Pick a few kettlebell moves that flow into each other, such as swing, clean, squat, press and row, and do all the reps of each before moving on, without putting the bell down. Rest 1–2 minutes after the full chain and repeat for 5–8 rounds. Use one bell or two. It builds strength and conditioning at once; it is not a place for grinding max lifts.'});
R.approach({id:'jtm_timed',by:'JTM Fit',n:'Timed full-body circuits',
  short:'30–50 s of work and 10–15 s of rest per move, 3–4 rounds of bell and bodyweight work.',
  gp:{s:[3,4],r:[8,15],rest:15,rpe:8},fmt:'circuit',prog:'reps',
  cues:['keep moving, rest is short','quality reps over speed'],prefer:'swing|clean|snatch|thruster|lunge|push|row|burpee|squat',
  details:'Group 3–8 moves into a circuit and work each one against a timer, for example 30 s on and 15 s off, then rest a minute and go again. Mix loaded moves with bodyweight and core moves so no area gets fried. Suits fat-loss and conditioning blocks; it is not a strength-peaking method.'});
R.approach({id:'jtm_horizontal',by:'JTM Fit',n:'Strength first, then finish',
  short:'All sets of one lift before the next, 3–4 × 5–12 heavy, then a fast finisher and core.',
  gp:{s:[3,4],r:[5,12],rest:90,rpe:8},fmt:'straight',prog:'double',
  cues:['control the weight','build up to your working sets'],prefer:'squat|deadlift|bench|row|pull|press|lunge|rdl',
  details:'Do every set of one exercise before moving on, resting 60–120 s (longer for the first heavy lift). Go as heavy as clean form allows. Close with a short finisher, such as a 10-to-1 ladder or a 6-minute AMRAP, and some core. It pairs real strength work with a dose of conditioning.'});
})();
