/* BLOCK. navigation: remembers where you were scrolled in each view so going
   back lands on the same spot, and swipe from the left edge to go back. */
(function(){
/* small labels and tags: sentence case, no tracking (big section headings keep their caps) */
const st=document.createElement('style');st.textContent=`
.tag{text-transform:lowercase;letter-spacing:0;font-size:11px}.tag::first-letter{text-transform:uppercase}
.slist .e,.sgh,.hrowp .ey,.hcur .ey,.qrow label,.ptab th,.pring .in small,.pside small,.sslab,#lgRest small,.shp h4,.adc h4,.lgsum h4,
.hbars h4,.hlist h4,.exsec>h4,.exmus h4,.xsec h4,.info h4,.nextc .nlab,.fring span,#plRows.after::before{text-transform:none;letter-spacing:0}
.slist .e,.sgh,.hrowp .ey,.hcur .ey{font-size:12px}
.wrap{padding-bottom:calc(env(safe-area-inset-bottom,0px) + 96px)}`;
document.head.appendChild(st);
const BACK={program:'pBack',session:'sessBack',library:'lBack',settings:'setBack',build:'bdBack',ex:'exBack',log:'lgX',gen:'genBack'};
const stack=[{v:'home',y:0}];
const top=()=>stack[stack.length-1];

const _show=show;
show=function(v){
  top().y=window.scrollY;
  let restore=null,i=-1;
  for(let j=stack.length-1;j>=0;j--)if(stack[j].v===v){i=j;break;}
  if(i>=0&&i<stack.length-1){restore=stack[i].y;stack.length=i+1;}
  else if(top().v!==v)stack.push({v,y:0});
  _show(v);
  /* callers render right after show(); restore once that content is in place */
  if(restore){const go=()=>window.scrollTo(0,restore);setTimeout(go,0);requestAnimationFrame(go);setTimeout(go,120);}
};

/* ----- edge swipe ----- */
const EDGE=28;
let sw=null;
const blocked=()=>document.querySelector('.sheet.on, .lgdlg');
document.addEventListener('touchstart',e=>{
  sw=null;if(e.touches.length!==1)return;const t=e.touches[0];
  if(t.clientX>EDGE||blocked())return;
  const v=top().v,id=BACK[v],el=document.getElementById('v-'+v),btn=id&&document.getElementById(id);
  if(!btn||!el||el.classList.contains('hide'))return;
  sw={x:t.clientX,y:t.clientY,dx:0,lock:null,el,btn,v,t0:Date.now()};
},{passive:true});
document.addEventListener('touchmove',e=>{
  if(!sw)return;const t=e.touches[0],dx=t.clientX-sw.x,dy=t.clientY-sw.y;
  if(!sw.lock){if(Math.abs(dx)+Math.abs(dy)<8)return;sw.lock=Math.abs(dx)>Math.abs(dy)*1.2&&dx>0?'x':'y';
    if(sw.lock==='x'){sw.el.style.transition='none';sw.el.style.willChange='transform';}}
  if(sw.lock!=='x')return;
  e.preventDefault();sw.dx=Math.max(0,dx);
  sw.el.style.transform=`translateX(${sw.dx}px)`;sw.el.style.boxShadow='-12px 0 30px rgba(0,0,0,.6)';
},{passive:false});
function settle(el,to,done){
  el.style.transition='transform .2s cubic-bezier(.2,.8,.2,1)';el.style.transform=`translateX(${to}px)`;
  setTimeout(()=>{el.style.transition='';el.style.transform='';el.style.boxShadow='';el.style.willChange='';done&&done();},200);}
document.addEventListener('touchend',()=>{
  if(!sw||sw.lock!=='x'){sw=null;return;}
  const s=sw;sw=null;const W=window.innerWidth,fast=s.dx>40&&s.dx/(Date.now()-s.t0)>.5;
  if(s.dx<W*.33&&!fast)return settle(s.el,0);
  /* the log view asks before leaving a started workout, so slide back and ask */
  if(s.v==='log')return settle(s.el,0,()=>s.btn.click());
  settle(s.el,W,()=>s.btn.click());
});
document.addEventListener('touchcancel',()=>{if(sw&&sw.lock==='x')settle(sw.el,0);sw=null;});
})();
