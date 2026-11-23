/* BLOCK. quick sessions with no equipment beyond a bar. The Willink five
   (pull-ups, push-ups, dips, squats, burpees) — the moves Jocko Willink says
   stayed in his training from SEAL days — as four short formats. */
(function(){
const R=window.BLOCK_REG;if(!R)return;
R.ex({air_squat:{n:'Air Squat',c:'bodyweight'},burpee:{n:'Burpee',c:'bodyweight'}});
R.steps({
  air_squat:['Stand with feet about shoulder width, toes slightly out.','Sit the hips back and down until the thighs pass parallel.','Keep the chest up and knees tracking over the toes.','Drive up through the whole foot to standing.'],
  burpee:['From standing, put your hands on the floor and jump the feet back to a plank.','Lower the chest to the floor.','Push up and jump the feet back under you.','Jump up with the arms overhead and land softly.']});
R.group('Jocko Willink',{blurb:'Former Navy SEAL officer. Five bodyweight moves that never left his training: pull-ups, push-ups, dips, squats and burpees.'});
const five=(r)=>[{id:'pullups',s:r[0]},{id:'pushup',s:r[1]},{id:'dips',s:r[2]},{id:'air_squat',s:r[3]},{id:'burpee',s:r[4]}];
const days=[
  {key:'qk_w_amrap',eyebrow:'Quick · 15 min',n:'Five-move AMRAP',hard:true,tag:'15 min',items:[
    {grp:'AMRAP 15'},...five(['5 reps','10 reps','10 reps','15 reps','5 reps'])]},
  {key:'qk_w_emom',eyebrow:'Quick · 20 min',n:'Five-move EMOM',hard:true,tag:'20 min',items:[
    {grp:'EMOM 20'},...five(['5 reps','12 reps','10 reps','15 reps','8 reps']).map((x,i)=>({...x,nt:`minute ${i+1}, ${i+6}, ${i+11}, ${i+16}`}))]},
  {key:'qk_w_ladder',eyebrow:'Quick · 20 min cap',n:'Five-move ladder',hard:true,tag:'20 min',items:[
    {grp:'METCON 20'},...five(['1, 2, 3 …','2, 4, 6 …','2, 4, 6 …','3, 6, 9 …','1, 2, 3 …']).map(x=>({...x,nt:'round 1 is 1 pull-up, 2 push-ups, 2 dips, 3 squats, 1 burpee; add one step each round until time runs out'}))]},
  {key:'qk_w_century',eyebrow:'Quick · 30 min cap',n:'Five-move century',hard:true,tag:'30 min',items:[
    {grp:'METCON 30'},...five(['25 reps','50 reps','50 reps','75 reps','25 reps']).map(x=>({...x,nt:'for time · split the reps however you like'}))]}];
R.program({id:'qk_willink',n:'Willink Five · Quick Sessions',sub:'Pull-ups, push-ups, dips, squats, burpees · 15–30 min',shape:'days',
  group:'Jocko Willink',by:'Jocko Willink',type:['Bodyweight','Circuit','Time-capped'],
  note:'Pick whichever fits the time you have. Scale pull-ups with a band or rows, dips with bench dips.',days},
`<h2 id="infoTitle">Willink Five · Quick Sessions</h2><p class="by">The five bodyweight moves Jocko Willink keeps coming back to</p>
<span class="pill2">No gym needed</span><span class="pill2">15–30 min</span><span class="pill2">Pull-up bar + dip spot</span>
<h4>The idea</h4><p>Pull-ups, push-ups, dips, squats and burpees. They need almost no equipment, cover the whole body and are easy to do a lot of, which is how he trained them in SEAL training and still does.</p>
<h4>Four ways to run them</h4><p><b>AMRAP 15:</b> as many rounds as you can in 15 minutes. <b>EMOM 20:</b> one move per minute in turn, rest with what is left. <b>Ladder:</b> one step more each round until 20 minutes are up. <b>Century:</b> 25 · 50 · 50 · 75 · 25 for time, split as you like.</p>
<h4>Scaling</h4><p>Band-assisted pull-ups or rows, bench dips, knee push-ups. Keep the form clean: the clock rewards quality reps, not sloppy ones.</p>`);

/* neck training as an add-on next to the grip pairings */
R.ex({neck_flexion:{n:'Neck Flexion · Plate or Band',c:'weighted',v:'https://www.youtube.com/watch?v=5RlmOGEvOns'},
  neck_extension:{n:'Neck Extension · Plate or Band',c:'weighted',v:'https://www.youtube.com/watch?v=_D2VB-q3ywM'}});
R.steps({neck_flexion:['Lie on your back on a bench with the head off the end, or loop a light band around the forehead.','Hold a light plate on the forehead (on a towel).','Tuck the chin and curl the head up toward the chest.','Lower slowly to a gentle stretch. Light weight, smooth reps.'],
  neck_extension:['Lie face down on a bench with the head off the end, or loop a band around the back of the head.','Hold a light plate on the back of the head (on a towel).','Lift the head until you look forward, without cranking the neck back.','Lower slowly. Light weight, smooth reps.']});
if(typeof gripTips==='function'){const _g=gripTips;
  gripTips=function(ids){const out=_g(ids);ids=(ids||[]).filter(Boolean);
    const neck=ids.some(i=>/neck/.test(i)||/neck/i.test((EX[i]||{}).n||''));
    const strength=ids.filter(i=>EX[i]&&['weighted','cal','bodyweight','power','carry'].includes(EX[i].c)).length>=2;
    if(!neck&&strength){out.push(['neck_flexion','2 × 12–15','neck: light and quick, nothing overlaps']);out.push(['neck_extension','2 × 12–15','do it with the flexion as a pair']);}
    return out.slice(0,4);};}
})();
