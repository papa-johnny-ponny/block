const fs=require('fs'),vm=require('vm');
const path=require('path');const ROOT=path.join(__dirname,'..')+'/';
const html=fs.readFileSync(ROOT+'index.html','utf8');
const start=html.indexOf("<script>\n'use strict';");
const end=html.indexOf('</script>',start);
const inline=html.slice(start+8,end);
function deep(){const f=function(){return p;};const p=new Proxy(f,{get(t,k){if(k===Symbol.toPrimitive)return()=>'';if(k==='then')return undefined;if(k==='length')return 0;if(k===Symbol.iterator)return function*(){};return p;},set(){return true;},apply(){return p;},construct(){return p;}});return p;}
const D=deep();
const store={};
const ctx={console,setTimeout:()=>0,setInterval:()=>0,clearInterval(){},clearTimeout(){},Date,Math,JSON,Promise,
  document:D,navigator:D,location:D,history:D,fetch:()=>new Promise(()=>{}),requestAnimationFrame:()=>0,
  localStorage:{getItem:k=>store[k]??null,setItem:(k,v)=>{store[k]=String(v);},removeItem:k=>{delete store[k];}},
  matchMedia:()=>({matches:false,addEventListener(){},addListener(){}}),addEventListener(){},removeEventListener(){},
  AudioContext:function(){return D;},Audio:function(){return D;},URL,URLSearchParams,crypto:{randomUUID:()=>'x'+Math.random()},
  innerWidth:400,innerHeight:800,scrollTo(){},alert(){},confirm:()=>true,prompt:()=>null,getComputedStyle:()=>D,
  MutationObserver:function(){return {observe(){},disconnect(){}};},IntersectionObserver:function(){return {observe(){},disconnect(){}};},ResizeObserver:function(){return {observe(){},disconnect(){}};},
  Blob:function(){},FileReader:function(){return D;},Image:function(){return D;},HTMLElement:function(){},Event:function(){},CustomEvent:function(){},
};
ctx.window=ctx;ctx.self=ctx;ctx.globalThis=ctx;
vm.createContext(ctx);

/* Bundles private/progs/*.js into private/packs/<name>.json: the exercises, steps,
   programs, info pages, approaches, groups and 1RM aliases each pack registers.
   The JSON is uploaded to Supabase from the app (Settings → Program packs) and is
   never committed: private/ is in .gitignore. Usage: node tools/build-packs.js */
const SRC=ROOT+'private/progs/',OUT=ROOT+'private/packs/';
fs.mkdirSync(OUT,{recursive:true});
function run(code,name){vm.runInContext(code,ctx,{filename:name});}
run(inline,'inline');
for(const f of ['sync.js','cal.js','detmering.js','reg.js'])run(fs.readFileSync(ROOT+f,'utf8'),f);
const G=k=>vm.runInContext(k,ctx);
const index=[];
for(const file of fs.readdirSync(SRC).filter(f=>f.endsWith('.js')).sort()){
  const id=file.replace(/\.js$/,'');
  const exB=new Set(Object.keys(G('EX'))),progB=new Set(G('PROGRAMS').map(p=>p.id)),infoB=new Set(Object.keys(G('INFO'))),
    stB=new Set(Object.keys(G('window.BLOCK_STEPS_EXTRA'))),apB=new Set(G('window.BLOCK_APPROACHES').map(a=>a.id)),
    grB=JSON.stringify(G('window.BLOCK_GROUPS')),alB=new Set(Object.keys(G('RM_ALIAS')));
  run(fs.readFileSync(SRC+file,'utf8'),file);
  const EX=G('EX'),ST=G('window.BLOCK_STEPS_EXTRA'),INFO=G('INFO'),AL=G('RM_ALIAS'),GR=G('window.BLOCK_GROUPS');
  const pick=(o,keys)=>Object.fromEntries(keys.map(k=>[k,o[k]]));
  const progs=G('PROGRAMS').filter(p=>!progB.has(p.id));
  const pack={id,built:new Date().toISOString(),
    ex:pick(EX,Object.keys(EX).filter(k=>!exB.has(k))),
    steps:pick(ST,Object.keys(ST).filter(k=>!stB.has(k))),
    programs:JSON.parse(JSON.stringify(progs)),
    info:pick(INFO,Object.keys(INFO).filter(k=>!infoB.has(k))),
    approaches:JSON.parse(JSON.stringify(G('window.BLOCK_APPROACHES').filter(a=>!apB.has(a.id)))),
    groups:JSON.parse(JSON.stringify(GR)),
    alias:pick(AL,Object.keys(AL).filter(k=>!alB.has(k)))};
  const json=JSON.stringify(pack);fs.writeFileSync(OUT+id+'.json',json);
  index.push({id,bytes:json.length,programs:progs.length});
  console.log(id.padEnd(20),String(progs.length).padStart(3),'programs',(json.length/1024).toFixed(0).padStart(5),'KB');
}
fs.writeFileSync(OUT+'index.json',JSON.stringify(index));
