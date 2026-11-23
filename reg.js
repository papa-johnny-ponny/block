/* BLOCK. registration API for program packs in progs/*.js.
   Packs load after the inline script (EX, PROGRAMS, INFO exist) and before
   videos.js / steps.js. Nothing here overwrites what is already in the app.

   BLOCK_REG.ex({key:{n,c,v?}})          add exercises (existing keys are kept)
   BLOCK_REG.steps({key:[...]})          how-to steps (merged into BLOCK_STEPS)
   BLOCK_REG.program(P, infoHTML)        P = {id,n,sub,shape:'days',days,type:[...],group,by}
   BLOCK_REG.approach(A)                 a training approach the generator can use, see gen.js
   BLOCK_REG.group(name, {blurb})        optional text shown under a creator group */
(function(){
window.BLOCK_STEPS_EXTRA=window.BLOCK_STEPS_EXTRA||{};
window.BLOCK_APPROACHES=window.BLOCK_APPROACHES||[];
window.BLOCK_GROUPS=window.BLOCK_GROUPS||{};
const warn=(...a)=>{try{console.warn('[BLOCK pack]',...a);}catch(e){}};
window.BLOCK_REG={
  ex(map){Object.keys(map||{}).forEach(k=>{if(!EX[k])EX[k]=map[k];});},
  steps(map){Object.assign(window.BLOCK_STEPS_EXTRA,map||{});if(window.BLOCK_STEPS)Object.keys(map||{}).forEach(k=>{if(!BLOCK_STEPS[k])BLOCK_STEPS[k]=map[k];});},
  program(P,info){
    if(!P||!P.id||PROGRAMS.some(x=>x.id===P.id)){warn('skipped program',P&&P.id);return;}
    const keys=new Set();PROGRAMS.forEach(x=>{try{(x.shape==='days'?x.days||[]:[]).forEach(d=>keys.add(d.key));}catch(e){}});
    (P.days||[]).forEach(d=>{if(keys.has(d.key))warn('duplicate day key',d.key);
      (d.items||[]).forEach(it=>{if(it.id&&!EX[it.id])warn('unknown exercise',P.id,it.id);});});
    const at=PROGRAMS.findIndex(x=>x.id==='custom');PROGRAMS.splice(at<0?PROGRAMS.length:at,0,P);
    if(info)INFO[P.id]=info;},
  approach(A){if(A&&A.id&&!BLOCK_APPROACHES.some(x=>x.id===A.id))BLOCK_APPROACHES.push(A);},
  group(name,meta){BLOCK_GROUPS[name]=Object.assign(BLOCK_GROUPS[name]||{},meta||{});}
};
/* creators of the programs that were already in the app */
const OWN='Your own builds';
const G={dense12:'Anthony Gusmao',density:'Steven McCoyne',sandbag:'Gym Free',fiveweek:'FORGE',ssforge:'FORGE',
  bbw:'FitnessFAQs',hspro:'FitnessFAQs',nogi:'Nogi Gorilla',built26:'Built Project',cd_ul:'Chris Detmering',cd_ppl:'Chris Detmering',cd_bwdb:'Chris Detmering',
  week:OWN,tpp:OWN,chopcarry:OWN,shredfast:OWN,custom:OWN};
PROGRAMS.forEach(P=>{if(!P.group)P.group=G[P.id]||(P.by)||'Other';});
window.BLOCK_OWN_GROUP=OWN;
})();
