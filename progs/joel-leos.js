/* BLOCK. program pack: Joel Leos — Unconventional Workouts (25 sessions, kettlebell, sandbag, steel mace, landmine).
   Sessions are stored as a compact text format and turned into days below:
     "W1 D1|Title|"  day header ·  "# text" group heading ·  "- name|sets|note" item
   Names that match an EX key (lower case) become {id}, everything else stays free text. */
(function(){
const R=window.BLOCK_REG;if(!R)return;
const G='Joel Leos';
R.group(G,{blurb:'Unconventional strength: kettlebells, sandbags, steel mace and landmine in short, dense circuits.'});

R.ex({
  kb_clean:{n:'Kettlebell Clean',c:'weighted'},
  kb_thruster:{n:'Kettlebell Thruster',c:'weighted'},
  burpee:{n:'Burpee',c:'cond'},
  mountain_climber:{n:'Mountain Climber',c:'cond'},
  plank:{n:'Forearm Plank',c:'bodyweight'},
  dive_bomber:{n:'Dive Bomber Push-Up',c:'bodyweight'},
  mace_360:{n:'Steel Mace 360',c:'rotation'},
  club_mill:{n:'Club Mill',c:'rotation'},
  landmine_clean_press:{n:'Landmine Clean & Press',c:'weighted'}
});
R.steps({
  kb_clean:['Hike the bell back between your legs with a flat back.','Drive the hips through and pull the elbow back close to the body.','Let the bell roll around the hand into the rack, wrist straight.','Lock the rack: elbow tucked, bell resting on forearm and chest.','Let it drop back down to the hike and repeat.'],
  kb_thruster:['Hold the bell (or bells) in the rack, elbows tucked.','Squat down with chest up and knees tracking the toes.','Drive up hard and use that drive to press the bell overhead.','Lock out with biceps by the ear, ribs down.','Lower to the rack as you sink into the next squat.'],
  burpee:['Stand tall, then squat and plant the hands.','Jump or step the feet back to a plank.','Lower the chest to the floor and push back up.','Jump the feet back under the hips.','Stand and jump with arms overhead.'],
  mountain_climber:['Start in a high plank, hands under shoulders.','Drive one knee toward the chest.','Switch legs quickly, like running in place.','Keep hips level and the back flat.'],
  plank:['Forearms under the shoulders, legs straight.','Squeeze glutes and quads, tuck the pelvis slightly.','Push the floor away and keep the neck long.','Breathe behind the brace and hold.'],
  dive_bomber:['Start in a pike with hips high and hands wide.','Bend the elbows and swoop the chest down close to the floor.','Push through into an upward dog, hips low.','Reverse the path back to the pike.'],
  mace_360:['Hold the mace in front with the heavy end up, hands stacked, top hand under the head.','Drop the head behind one shoulder, elbows pointing up.','Circle it around the back of the head without moving the torso.','Pull it back over the other shoulder to the front, then reverse.','Keep ribs down and glutes tight the whole time.'],
  club_mill:['Hold the club in one hand, knob down, in front of the chest.','Let the head drop behind the shoulder, elbow pointing up.','Swing it around behind the back and over the opposite shoulder.','Switch hands at the front and repeat the other way.','Stay tall and keep the club close to the body.'],
  landmine_clean_press:['Stand beside the bar end, hips back, one hand on the sleeve.','Drive the hips and pull the bar up to the shoulder.','Catch it in a front rack, elbow under the bar.','Press up and forward until the arm is straight.','Lower to the shoulder, then to the start, and switch sides on the set.']
});

const MAP={'kettlebell swing':'swing','2h kb swing':'swing','kettlebell snatch':'kb_snatch','snatch':'kb_snatch','snatches':'kb_snatch','single arm kb snatch':'kb_snatch',
 'clean':'kb_clean','single arm clean':'kb_clean','push ups':'pushup','burpees':'burpee','gorilla rows':'gorilla_row','goblet squat':'goblet_squat',
 'bulgarian split squats':'bulgarian','weighted step ups':'step_up','360 steel mace swings':'mace_360','ski erg':'skierg','assault bike':'assault',
 'mountain climbers':'mountain_climber','plank':'plank','russian twist (weighted)':'cd_russian_twist','bench press':'bench','pull ups':'pullups',
 'rear delt flyes':'rev_fly','incline bench':'cd_incline_bench','bent over row':'row','walking lunges':'cd_walking_lunge','jump squat':'jump_squat',
 'suitcase carries':'suitcase_carry','sandbag to shoulder':'sb_shoulder','landmine clean & press':'landmine_clean_press','club mills':'club_mill',
 'sissy squats':'sissy_squat','ab wheel roll outs':'ab_wheel','dive bomber push ups':'dive_bomber','single arm kb strict press':'kb_press',
 'single arm kb thruster':'kb_thruster'};
const sc=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
const TXT=`
W1 D1|Never skip a Monday|
# A · Double KB complex · 6 rounds · climb one rep each round
- Kettlebell Swing|6 × 1–6|ladder: 1 rep in round 1, up to 6 in round 6
- Squat Swing|6 × 1–6|same ladder
- Clean|6 × 1–6|two bells · same ladder
- Kettlebell Snatch|6 × 1–6|two bells · same ladder
# B · Circuit · 5 rounds
- Sandbag To Shoulder|5 × 1–3|per side · reps not listed
- Push Ups|5 × F|
- Burpees|5 × 10|

W1 D2|Full body work|
# A · Single KB · EMOM 25 · 5 rounds · one move per minute, both sides inside it
- Dead Snatch|5 × 5|per side
- Goblet Lunges|5 × 10|per side
- Single Arm Floor Press (Z Press)|5 × 10|per side
# B · Single KB · EMOM 20 · 5 rounds · one move per minute
- Snatch|5 × 5|per side
- Overhead Reverse Lunge|5 × 3|per side
- Alternating Plank Drags w/ Push Ups|5 × 10|per side

W1 D3|Back and arms|
# A · Double KB complex · 5 rounds · reps step down 10-8-6-4-2
- Gorilla Rows|5 × 10|per side
- Gunslingers|5 × 8|
- Clean|5 × 6|two bells
- Double KB Squat|5 × 4|
- Double KB Snatch|5 × 2|
# B · Landmine and push-ups · 5 rounds
- Landmine Clean & Press|5 × 5|per side
- Push Ups|5 × F|
# C · Single KB · 5 rounds
- Single Arm KB Snatch|5 × 5|per side
- Single Arm Clean|5 × 5|per side
- Single Arm KB Strict Press|5 × 5|per side
# D · Landmine and push-ups · 5 rounds
- Landmine Snatch|5 × 3|per side
- Dive Bomber Push Ups|5 × 10|

W1 D4|Kettlebell leg day|
# A · Circuit · 5 rounds
- Kettlebell Swing|5 × 12|
- Dead Clean to Goblet Squat|5 × 10|
- Goblet Rack Reverse Lunge|5 × 7|per side
# B · Circuit · 4 rounds
- Bulgarian Split Squats|4 × 7|per side
- Single Leg KB RDL|4 × 7|per side
- Weighted Step Ups|4 × 7|per side
# C · Circuit · 4 rounds
- Sandbag Bear Hug Squats|4 × 10|
- Ice Skaters|4 × 10|per side

W1 D5|Full body Friday|
# A · Staggered-stance single KB · 5 rounds
- Single Arm Stagger Row|5 × 7|per side
- Single Arm Stagger Clean|5 × 7|per side
- Single Arm Stagger Thruster|5 × 7|per side
- Single Arm Stagger Snatch|5 × 7|per side
- Dive Bomber Push Ups|5 × 10|
# B · Mace, bag and bell · 5 rounds
- 360 Steel Mace Swings|5 × 10|per side
- Sandbag To Shoulder|5 × 1|per side
- 2H Hike to High Pull|5 × 12|
- Ski Erg|5 × 15|

W1 D6|KB core work|
# A · Kneeling KB · 4 rounds
- Kneeling Windmill|4 × 7|per side
- Kneeling Halo w/ Twist|4 × 7|per side
- Kneeling Woodchoppers|4 × 7|per side
# B · Plank work · 5 rounds
- Alternating Plank Drags w/ Push Ups|5 × 10|per side
- Mountain Climbers|5 × 20|per side
- Side Plank V-Ups|5 × 20|per side
# C · Loaded core · 5 rounds
- Russian Twist (weighted)|5 × 20|per side
- Suitcases (weighted)|5 × 15|
- Plank|5 × 1 min|

W2 D1|Push / pull day|
# A · Push and row · 5 rounds
- Hand Release Push-ups|5 × 12–15|
- Bench Press|5 × 3–15|pyramid 15, 10, 8, 6, 3–5 · add weight each round
- Gorilla Rows|5 × 10|per side
# B · Pull · 5 rounds
- Pull Ups|5 × 10|
- 2H Hike to High Pull|5 × 12|
- Rear Delt Flyes|5 × 12|
# C · Incline · 5 rounds
- Incline Bench|5 × 8–10|
- Incline Bench Flyes|5 × 10–12|
# D · Rows · 5 rounds
- Bent Over Row|5 × 6–8|
- Tactical Row|5 × 10|per side

W2 D2|Leg day|
# A · Circuit · 5 rounds
- Kettlebell Swing|5 × 10|
- Single Arm Clean to Reverse Lunge|5 × 5|per side
- Figure 8 to Side Lunge|5 × 7|per side
# B · Circuit · 5 rounds
- Dead Clean to Goblet Squat|5 × 10|
- Walking Lunges|5 × 10|per side
- Landmine Clean to Pulse Lunge|5 × 5|per side
# C · Circuit · 4 rounds
- Sandbag Bear Hug Squats|4 × 10|
- Jump Squat|4 × 15|

W2 D3|Unconventional shoulder pump|
# A · Circuit · 6 rounds
- Tactical Snatches|6 × 5|per side
- KB High Pull to Snatch|6 × 3|per side
- Steel Mace 360 Uppercuts|6 × 10|per side
# B · KB complex · 5 rounds · open with a set of swings
- Kettlebell Swing||to open the block
- Gorilla Cleans|5 × 6|
- Alternating Press|5 × 6|
- Double KB Strict Press|5 × 6|
- Snatches|5 × 6|
- Gunslingers|5 × 6|
- Landmine Clean & Press|5 × 5|per side

W2 D4|Unconventional legs|
# A · Circuit · 5 rounds
- Assault Bike|5 × 12|12 cal
- Alternating Overhead Press Walking Lunges|5 × 10|per side
- Suitcase Carries|5 × 30 yd|
# B · Circuit · 5 rounds
- Landmine Split Snatch|5 × 5|per side
- 2H KB Alternating Lunge Clean|5 × 7|per side
- Sandbag To Shoulder|5 × 3|per side
- Landmine Reverse Lunge Pulse to Jerk|5 × 5|per side
- Rapid Fire Banded Hamstring Curls|5 × 20 s|
- Hanging Knee Raises|5 × 20|

W2 D5|Unconventional upper body|
# A · Circuit · 4 rounds
- Tactical Row|4 × 10|per side
- Landmine Clean & Press|4 × 5|per side
- Sandbag Toss Over the Shoulder|4 × 3|per side
- Double KB Snatch|4 × 8|
# B · Circuit · 4 rounds
- Tactical Clean|4 × 7|per side
- Single Arm KB High Pull to Snatch|4 × 3|per side
- Sandbag To Shoulder|4 × 2|per side
- Landmine Cleans|4 × 3|per side

W2 D6|Bells and bags|
# A · Block 1 · circuit · 4–5 rounds · reps not listed, 5–8 per move
- Double KB Clusters||
- Tactical Clean Reverse Lunge||per side
- Rotational Press||per side
# B · KB complex · 4–5 rounds · reps not listed
- Ballistic Rows||
- Tactical Clean||per side
- Tactical Snatches||per side
# C · Block 3 · circuit · 4–5 rounds · reps not listed
- Sandbag Squats||
- Single KB High Pull to Snatch||per side
- Single Arm Rack KB Squats||per side
- Figure 8 to Front Lunge to Kneeling Windmill||per side
- Sandbag To Shoulder||per side
- Sandbag Kneeling Windmill||per side

W3 D1|Full send Monday|
# A · Circuit · 5 rounds · 30 s rest after the goblet squats
- Squat Swing|5 × 7|
- Kettlebell Swing|5 × 7|
- Goblet Squat|5 × 7|
- 2H KB Alternating Lunge Clean|5 × 7|per side
# B · Circuit · 5 rounds
- Sandbag Bear Hug Squats|5 × 10|
- Bulgarian Split Squats|5 × 7|per side
- Figure 8 to Side Lunge|5 × 5|per side
# C · Circuit · 4 rounds
- Single Arm Clean to Reverse Lunge|4 × 5|per side
- Landmine Clean to Pulse Lunge|4 × 5|per side

W3 D2|Upper body blast|
# A · Circuit · 4 rounds
- Dive Bomber Push Ups|4 × 10|
- Double KB Cleans|4 × 8|
- Double KB Push Press|4 × 6|
# B · Carries · 4 rounds
- Overhead KB March|4 × 30 s|
- Rack KB March|4 × 30 s|
# C · Circuit · 4 rounds
- Gorilla Rows|4 × 7|per side
- Alternating KB Bench Press|4 × 7|per side
# D · Core · 4 rounds
- Alternating Plank Drags w/ Push Ups|4 × 5|per side
- Mountain Climbers|4 × 20|per side
- Shoulder Taps|4 × 15|per side
- Side Plank V-Ups|4 × 20|per side

W3 D3|Hump day|
# A · Circuit · 5 rounds
- Contralateral Bulgarian Split Squat|5 × 7|per side
- Double KB Rack Reverse Lunge|5 × 7|per side
- Double KB Squat|5 × 5|
# B · Circuit · 5 rounds
- Ipsilateral Bulgarian Split Squat|5 × 7|per side
- Dead Clean to Goblet Squat|5 × 7|
- Landmine Side Lunges|5 × 5|per side
- 2H KB Swing|5 × 10|

W3 D4|Shoulders to boulders|
# A · Double KB · 5 rounds
- Gorilla Cleans|5 × 5|per side
- Double KB Cleans|5 × 5|
- Double KB High Pull|5 × 5|
- Double KB Push Press|5 × 5|
# B · Crawl, club and flow · 4 rounds
- Bear Crawl Rows|4 × 7|per side
- Club Mills|4 × 7|per side
- Side Kick Throughs|4 × 7|per side
# C · Mace and bell · 4 rounds
- 360 Steel Mace Swings|4 × 10|per side
- Single Arm KB Snatch|4 × 5|per side
# D · Carries · 4 rounds
- Overhead KB March|4 × 30 s|
- Rack KB March|4 × 30 s|

W3 D5|Legs on legs on legs|
# A · Block 1 · circuit · 4–5 rounds · reps not listed, 5–10 per move
- Assault Bike||
- 2H KB Swing||
- Squat Swing||
- Figure 8 to Side Lunge||per side
# B · Block 2 · circuit · 4–5 rounds · reps not listed
- Sandbag Bear Hug Squats||
- Sandbag Back Lunges||per side
- Landmine Clean to Pulse Lunge||per side
# C · Block 3 · circuit · 4–5 rounds · reps not listed
- Single Arm Stagger Squat||per side
- Single Arm Stagger Swing||per side
- Ice Skater Clean||per side

W3 D6|Full body fiesta|
# A · Block 1 · circuit · 4–5 rounds · reps not listed, 5–10 per move
- Assault Bike||
- Dive Bomber Push Ups||
- Double KB Swing||
- Landmine Clean & Press||per side
# B · Block 2 · double KB · 4–5 rounds · reps not listed
- Double KB Squat||
- Double KB Cleans||
- Double KB Reverse Lunges||per side
# C · Block 3 · circuit · 4–5 rounds · reps not listed
- Gorilla Rows||per side
- Sandbag To Shoulder||per side
- Ab Wheel Roll Outs||

W4 D1|Never skip a leg day|
# A · Single KB complex · AMRAP 10 · all moves on one side, then switch
- Figure 8 to Side Lunge|1|one rep of each move = one round of the complex
- Single Arm Clean to Reverse Lunge|1|
- Jump Squat|1|
- Sprinter Lunges|1|per side
# B · Circuit · 5 rounds
- Sandbag Bear Hug Squats|5 × 10|
- Deadlift to Swing|5 × 7|per side
# C · Circuit · 5 rounds
- Squat Swing / Swing / Goblet Squat|5 × 5|5 of each, unbroken
- Single Arm Clean to Reverse Lunge|5 × 5|per side

W4 D2|Shoulders day|
# A · Circuit · 4 rounds
- Rotational Press|4 × 8|per side
- Inside Rotational Snatch|4 × 5|per side
- Gorilla Rows|4 × 10|per side
- 360 Steel Mace Swings|4 × 12|per side
# B · Circuit · 4 rounds
- Double KB Complex|4 × 1|one round of the complex · moves not listed
- 2H High Pulls|4 × 12|
- Single Arm Tactical Cleans|4 × 3|per side
- Single Arm KB Snatch|4 × 5|per side

W4 D3|Single KB banger|
# A · Single KB · 5 rounds · go heavy, low reps
- Single Arm Clean & Press|5 × 5|per side
- Single Arm Row to Dead Clean|5 × 5|per side
- Single Arm Clean to Reverse Lunge|5 × 5|per side
- Single Arm KB Thruster|5 × 5|per side
- Single Arm KB High Pull to Snatch|5 × 5|per side
- Goblet Squat|5 × 10|

W4 D4|Arms and upper body|
# A · Circuit · 4 rounds
- Gorilla Rows|4 × 10|per side
- Gunslingers|4 × 7|
- Single Arm KB Snatch|4 × 5|per side
- Double KB Cleans|4 × 5|
# B · Circuit · 4 rounds
- Single Arm Tactical Row|4 × 7|per side
- Single Arm Swings|4 × 7|per side
- Single Arm Clean & Press|4 × 3|per side
- Sandbag Toss|4 × 2|per side

W4 D5|Legs for days|
# A · Circuit · 5 rounds
- Double KB Seesaw Lunges|5 × 5|per side
- Elevated Reverse Curtsy Lunges|5 × 5|per side
- Single Leg Hack Squats|5 × 8|per side
- Swiss Ball Elevated Glute Bridge|5 × 12|
# B · Circuit · 5 rounds
- Diagonal Clean to Front Curtsy|5 × 5|per side
- Sissy Squats|5 × 10|
- Dead Clean to Goblet Squat|5 × 10|
# C · Circuit · 5 rounds
- Figure 8 to Side Lunge|5 × 7|per side
- Figure 8 to Transverse Lunge|5 × 7|per side
- Squat Swing / Swing|5 × 7|7 of each

W4 D6|Primal power|
# A · Circuit · 5 rounds
- Gorilla Rows|5 × 10|per side
- Gorilla Cleans|5 × 10|per side
- Tactical Clean|5 × 5|per side
- Club Mills|5 × 10|per side
# B · Complexes · 5 rounds
- Single Arm KB Complex|5 × 1|one round of the complex, left side
- Single Arm KB Complex|5 × 1|one round of the complex, right side
- 360 Steel Mace Swings|5 × 15|per side
- Double KB Complex|5 × 1|one round of the complex

W5 D1|Push / pull|
# A · Circuit · 5 rounds
- Dive Bomber Push Ups|5 × 20|
- Resistance Band Rows|5 × 20|
- Ski Erg|5 × 12|12 cal
# B · Circuit · 5 rounds
- Single Arm KB Complex|5 × 1|one round of the complex
- Sandbag To Shoulder|5 × 1|per side
# C · Circuit · 5 rounds
- Double KB Complex|5 × 1|5 swings, 4 thrusters, 3 cleans, 2 push presses, 1 snatch
- Sandbag To Shoulder|5 × 1|per side`;
const DAYS=TXT.trim().split(/\n\s*\n/).map(ch=>{
  const L=ch.trim().split('\n'),h=L[0].split('|'),m=h[0].match(/^W(\d+) D(\d+)$/);
  const items=[];let blocks=0;
  L.slice(1).forEach(l=>{const k=l[0],x=l.slice(2).trim();
    if(k==='#'){blocks++;items.push({grp:x});}
    else if(k==='-'){const [nm,s,nt]=x.split('|'),key=MAP[nm.toLowerCase()];
      const it=key?{id:key}:{n:nm};it.s=s||'';if(nt)it.nt=nt;items.push(it);}});
  return {key:`jl_uw_w${m[1]}d${m[2]}`,eyebrow:`Week ${m[1]} · Day ${m[2]}`,n:sc(h[1]),hard:true,tag:`${blocks} blocks`,items};});

R.program({id:'jl_unconventional',n:'Unconventional Workouts',sub:'4 weeks · 6 days · bells, bags, mace and landmine',shape:'days',days:DAYS,
  type:['Kettlebell','Circuit','Full body'],group:G,by:'Joel Leos',
  note:'Run the blocks as circuits: one round of every move, then repeat. Per-side reps are written as "per side". Day 7 is rest.'},
 `<h2 id="infoTitle">Unconventional Workouts</h2><p class="by">Joel Leos · 25 sessions</p>
  <span class="pill2">4 weeks + 1 day</span><span class="pill2">6 days a week</span><span class="pill2">KB · sandbag · mace · landmine</span>
  <h4>What it is</h4>
  <p>Strength-conditioning sessions built from odd objects: one or two kettlebells, a sandbag, a steel mace or club and a landmine, with push-ups, pull-ups and a few gym lifts mixed in. Each day has two to four blocks, and each block is a circuit of 2–7 moves run for 4–6 rounds.</p>
  <h4>How to run it</h4>
  <ul><li><b>Circuits.</b> Do one round of every move in the block, then start the next round. Rest when you need to between rounds.</li>
   <li><b>Per side.</b> Most single-bell moves are done on both sides in every round.</li>
   <li><b>Go heavy on low reps.</b> When a day lists 3–5 reps, pick a bell that makes the last rounds hard.</li>
   <li><b>Complexes.</b> A complex is one round of several bell moves without setting the bell down. Some days list the moves; on others, build one from swings, cleans, presses, squats and snatches.</li>
   <li><b>Rest days.</b> Day 7 of each week is rest.</li></ul>
  <h4>Gaps in the source</h4>
  <p>Three days (Bells and bags, Legs on legs on legs, Full body fiesta) list exercises without sets or reps. They are kept as 4–5 round circuits; pick 5–10 reps per move.</p>`);

R.approach({id:'jl_odd_object',by:'Joel Leos',n:'Odd-object circuits',
  short:'Bells, sandbag, mace and landmine in 4–6 round circuits of 2–6 moves, mostly per side.',
  gp:{s:[4,6],r:[5,10],rest:60,rpe:8},fmt:'circuit',prog:'reps',
  cues:['work both sides every round','move from the hips, not the arms'],
  prefer:'swing|clean|snatch|sandbag|mace|club|landmine|gorilla|windmill|halo|lunge|thruster',
  details:'Build each block as a circuit of a few loaded moves done per side for 5–10 reps, and repeat it 4–6 times. Mix ballistic bell work, sandbag shouldering, mace or club swings and landmine presses with a push-up or pull. The odd shapes train grip, rotation and bracing; it is general strength-conditioning, not max-strength work.'});
R.approach({id:'jl_complex_ladder',by:'Joel Leos',n:'Complex ladders',
  short:'Chain swings, cleans, squats and snatches; climb 1→6 reps or run 5-4-3-2-1 rounds.',
  gp:{s:[5,6],r:[1,6],rest:90,rpe:8},fmt:'circuit',prog:'reps',
  cues:['do not put the bells down','smooth transitions'],prefer:'swing|clean|snatch|thruster|press|squat',
  details:'String several kettlebell moves into one unbroken complex with one or two bells. Either climb a ladder (1 rep of each in round one, 2 in round two, up to 6) or descend the reps per move inside a round, such as 5 swings, 4 thrusters, 3 cleans, 2 presses and 1 snatch. Rest 1–2 minutes between rounds.'});
})();
