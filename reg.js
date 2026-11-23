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
  ex(map){const M=window.BLOCK_MEDIA||{};Object.keys(map||{}).forEach(k=>{if(!EX[k])EX[k]=map[k];else Object.keys(map[k]||{}).forEach(f=>{if(EX[k][f]==null)EX[k][f]=map[k][f];});
    if(M[k]&&M[k].v)EX[k].v=M[k].v;});},
  steps(map){const M=window.BLOCK_MEDIA||{};Object.keys(map||{}).forEach(k=>{if(M[k]&&M[k].steps)return;window.BLOCK_STEPS_EXTRA[k]=map[k];if(window.BLOCK_STEPS&&!BLOCK_STEPS[k])BLOCK_STEPS[k]=map[k];});},
  program(P,info){
    if(!P||!P.id||PROGRAMS.some(x=>x.id===P.id)){warn('skipped program',P&&P.id);return;}
    const keys=new Set();PROGRAMS.forEach(x=>{try{(x.shape==='days'?x.days||[]:[]).forEach(d=>keys.add(d.key));}catch(e){}});
    (P.days||[]).forEach(d=>{if(keys.has(d.key))warn('duplicate day key',d.key);
      (d.items||[]).forEach(it=>{if(it.id&&!EX[it.id])warn('unknown exercise',P.id,it.id);});});
    const at=PROGRAMS.findIndex(x=>x.id==='custom');PROGRAMS.splice(at<0?PROGRAMS.length:at,0,P);
    if(info)INFO[P.id]=info;
    const add=(window.BLOCK_INFO_ADD||{})[P.id];if(add&&INFO[P.id]!=null&&!String(INFO[P.id]).includes(add))INFO[P.id]=String(INFO[P.id])+add;},
  approach(A){if(A&&A.id&&!BLOCK_APPROACHES.some(x=>x.id===A.id))BLOCK_APPROACHES.push(A);},
  group(name,meta){BLOCK_GROUPS[name]=Object.assign(BLOCK_GROUPS[name]||{},meta||{});},
  /* media({key:{v,steps}}): the program's own video and cues for an exercise, overriding the defaults.
     Works for library keys and for free-text rows ("x:Name"). */
  media(map){Object.keys(map||{}).forEach(k=>{const m=map[k];window.BLOCK_MEDIA[k]=Object.assign(window.BLOCK_MEDIA[k]||{},m);
    if(EX[k]&&m.v)EX[k].v=m.v;if(m.steps){window.BLOCK_STEPS_EXTRA[k]=m.steps;if(window.BLOCK_STEPS)BLOCK_STEPS[k]=m.steps;}});},
  /* infoAdd(programId, html): extra sections appended to a program's info page */
  infoAdd(id,html){window.BLOCK_INFO_ADD[id]=(window.BLOCK_INFO_ADD[id]||'')+html;if(INFO[id]!=null&&!String(INFO[id]).includes(html))INFO[id]=String(INFO[id]||'')+html;}
};
window.BLOCK_MEDIA=window.BLOCK_MEDIA||{};window.BLOCK_INFO_ADD=window.BLOCK_INFO_ADD||{};
/* program media wins over the generic video, also for free-text rows */
{const _exOf=exOf;exOf=function(item){const e=_exOf(item),m=window.BLOCK_MEDIA[e.key];if(m&&m.v)e.v=m.v;return e;};}
/* creators of the programs that were already in the app */
const OWN='John Stolpe';
const G={dense12:'Anthony Gusmao',density:'Steven McCoyne',sandbag:'Gym Free',fiveweek:'Josef Eriksson',ssforge:'FORGE',
  bbw:'FitnessFAQs',hspro:'FitnessFAQs',nogi:'Nogi Gorilla',built26:'Josef Eriksson',cd_ul:'Chris Detmering',cd_ppl:'Chris Detmering',cd_bwdb:'Chris Detmering',
  week:OWN,tpp:OWN,chopcarry:OWN,shredfast:'Luke Powell',custom:OWN};
PROGRAMS.forEach(P=>{if(!P.group)P.group=G[P.id]||(P.by)||'Other';});
window.BLOCK_OWN_GROUP=OWN;
})();
