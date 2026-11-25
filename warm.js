/* BLOCK. warm-ups and running as ready-made picks: jump rope, rope flow and animal
   moves to start a session, and an easy run or a sprint session when that is all
   you want to do. The generator offers them as a warm-up choice and as Run and
   Sprints focus; the own-session builder has them as quick-add chips. */
(function(){
const R=window.BLOCK_REG;if(!R)return;

/* animal moves that were missing from the public library (steps in our own words) */
R.ex({
  an_bear_crawl:{n:'Bear Crawl',c:'bodyweight',u:'s'},
  an_crab_walk:{n:'Crab Walk',c:'bodyweight',u:'s'},
  an_ape_walk:{n:'Ape Walk',c:'bodyweight',u:'s'},
  an_frog_hop:{n:'Frog Hop',c:'plyo'},
  an_deep_squat_rock:{n:'Deep Squat Rock',c:'rec'}});
R.steps({
  an_bear_crawl:['Hands under the shoulders, knees under the hips, knees an inch off the floor.','Move the opposite hand and foot together in small steps.','Keep the back flat and the hips low.','Crawl forward, then back the same way.'],
  an_crab_walk:['Sit, hands behind you with the fingers pointing back, feet flat.','Lift the hips a little off the floor.','Walk with the opposite hand and foot together.','Keep the chest open and the shoulders down.'],
  an_ape_walk:['Sink into a deep squat with the hands on the floor in front.','Shift the weight onto the hands.','Hop or step the feet to the side, landing back in the squat.','Go both directions.'],
  an_frog_hop:['Start in a deep squat with the hands on the floor between the feet.','Jump forward and up.','Land softly back in the squat with the hands down.','Reset and go again.'],
  an_deep_squat_rock:['Sit into a deep squat, heels down if you can.','Hold onto something if you need to.','Rock slowly side to side and forward and back.','Let the hips, knees and ankles open up.']});

/* bundles: [exercise, sets, minutes / seconds / metres / reps, note] */
window.BLOCK_WARM={
  rope:{n:'Jump rope',items:[['jr_basic',1,2,'easy bounce, relaxed shoulders'],['jr_alt',1,2,'light on the feet'],['jr_boxer',1,1,'']]},
  flow:{n:'Rope flow',items:[['rf_underhand',1,2,'both sides'],['rf_overhand',1,2,'both sides'],['rf_dragon_roll',1,1,'let the spine coil and unwind']]},
  animal:{n:'Animal moves',items:[['an_bear_crawl',2,20,'forward and back'],['an_crab_walk',2,20,''],['bear_kickthru',1,8,'per side'],
    ['bio_lizard_crawl',1,20,'slow and low'],['an_deep_squat_rock',1,10,'rocks']]}};
/* whole sessions for the builder's quick picks */
window.BLOCK_RUNS={
  run:{n:'Easy run',items:[['easy_run',1,20,'you can talk in full sentences']]},
  sprint:{n:'Sprints',items:[['dyn_warmup',1,8,''],['strides',3,80,'build to 80–90 %, walk back'],['accel_sprint',6,20,'all-out · walk back + 90 s'],['backward_walk',1,3,'easy']]}};

/* ----- own-session builder: quick-add chips for warm-ups and running ----- */
const st=document.createElement('style');st.textContent=`
.bdquick{margin:14px 0 0}
.bdquick h4{margin:0 0 8px;font-size:13px;font-weight:600;color:var(--dim)}
.bdquick .row{display:flex;flex-wrap:wrap;gap:8px}
.bdquick button{min-height:40px;padding:8px 14px;border-radius:999px;background:var(--surface);border:1px solid var(--line);color:#fff;font:inherit;font-size:14px;font-weight:600;
  transition:transform 140ms ease-out,border-color 140ms ease}
.bdquick button:active{transform:scale(.97)}
@media (hover:hover) and (pointer:fine){.bdquick button:hover{border-color:#fff}}
.bdquick small{display:block;margin-top:8px;color:var(--dim-2);font-size:12px}`;
document.head.appendChild(st);
const QUICK=[['w:rope','Jump rope'],['w:flow','Rope flow'],['w:animal','Animal moves'],['r:run','Easy run'],['r:sprint','Sprints']];
if(typeof renderBuild==='function'){const _rb=renderBuild;
  renderBuild=function(){_rb.apply(this,arguments);
    const box=document.getElementById('bdBody'),anchor=box&&(box.querySelector('#bdAdd')||box.querySelector('.bdpick'));if(!anchor)return;
    const q=document.createElement('div');q.className='bdquick';
    q.innerHTML=`<h4>Warm-up and running</h4><div class="row">${QUICK.map(([k,l])=>`<button data-q="${k}">+ ${l}</button>`).join('')}</div>
      <small>Adds a ready-made block you can adjust.</small>`;
    anchor.after(q);
    q.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{const [t,k]=b.dataset.q.split(':'),B=(t==='w'?window.BLOCK_WARM:window.BLOCK_RUNS)[k];
      const add=B.items.filter(x=>EX[x[0]]).map(([id,sets,reps])=>({id,sets,reps}));
      /* warm-ups go first, runs at the end */
      if(t==='w')BD.items.unshift(...add);else BD.items.push(...add);
      renderBuild();});};}
})();
