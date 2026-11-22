// node tests/merge.test.js — sync merge rules (sync.js runs under Node via module.exports)
const assert=require('assert'),path=require('path');
const {merge,canon,strip,foldSkips}=require(path.join(__dirname,'..','sync.js'));
const now=Date.now();

const phone={_mt:now,prog:'a',goal:4,mute:true,sessions:[{id:'p1',start:1,end:2}],sets:[{sid:'p1',t:10,idx:0,w:50},{sid:'p1',t:11,idx:1,w:55}],_del:{}};
const mac={_mt:now-5000,prog:'b',goal:3,sessions:[{id:'m1',start:3,end:4}],sets:[{sid:'m1',t:20,idx:0,w:60}],_del:{}};
let m=merge(mac,phone,true);
assert.deepStrictEqual(m.sessions.map(s=>s.id),['p1','m1']);     // sessions from both devices
assert.strictEqual(m.sets.length,3);
assert.strictEqual(m.prog,'a');assert.strictEqual(m.goal,4);     // newer device wins settings
assert.strictEqual(m.mute,undefined);                             // per-device key not taken from remote

// a deleted set is not brought back by the other device
m=merge({...m,_mt:now-100},{...phone,sets:[phone.sets[0]],_del:{'p1|11|1':now}},true);
assert.ok(!m.sets.some(r=>r.t===11));assert.strictEqual(m.sets.length,2);

// first sync on a blank device: server settings win, nothing lost
m=merge({_mt:now+99999,prog:null,goal:3,sessions:[],sets:[]},phone,false);
assert.strictEqual(m.prog,'a');assert.strictEqual(m.sets.length,2);

// a finished session keeps its end even if the other side is newer
m=merge({_mt:now,sessions:[{id:'x',start:1,end:null}],sets:[]},{_mt:now-10,sessions:[{id:'x',start:1,end:9}],sets:[]},true);
assert.strictEqual(m.sessions[0].end,9);

// a deleted session goes everywhere, with its sets, whichever side saved last
{const a={_mt:now-50,sessions:[{id:'k',start:1,end:2}],sets:[],_del:{'sess|d':now-60}};
 const b={_mt:now,sessions:[{id:'d',start:1,end:2},{id:'k',start:1,end:2}],sets:[{sid:'d',t:5,idx:0},{sid:'k',t:6,idx:0}],_del:{}};
 for(const [l,r] of [[a,b],[b,a]]){const x=merge(l,r,true);
  assert.deepStrictEqual(x.sessions.map(s=>s.id),['k']);assert.deepStrictEqual(x.sets.map(r=>r.sid),['k']);assert.ok(x._del['sess|d']);}}

// done marks merge per exercise; the newer device wins only where both have an entry
{const a={_mt:now,log:{'p|a|0':{done:true},'p|b|0':{done:false}},sessions:[],sets:[]};
 const b={_mt:now-9,log:{'p|b|0':{done:true},'p|c|0':{done:true}},sessions:[],sets:[]};
 const x=merge(a,b,true);assert.deepStrictEqual(Object.keys(x.log).sort(),['p|a|0','p|b|0','p|c|0']);assert.strictEqual(x.log['p|b|0'].done,false);}

// skips tapped in a calendar event are folded into the plan
{const d={_mt:1,cal:{skip:{a:1},queue:[{k:'a'},{k:'b'},{k:'c'}]}};
 assert.strictEqual(foldSkips(d,{}),false);assert.strictEqual(foldSkips(d,null),false);
 assert.strictEqual(foldSkips(d,{b:5}),true);
 assert.deepStrictEqual(d.cal.queue.map(x=>x.k),['a','c']);assert.deepStrictEqual(Object.keys(d.cal.skip),['a','b']);assert.ok(d._mt>1);}

// no remote: local untouched; canon ignores key order; strip drops device-only keys
assert.strictEqual(merge(mac,null,true),mac);
assert.strictEqual(canon({a:1,b:{d:1,c:2}}),canon({b:{c:2,d:1},a:1}));
assert.ok(!('mute' in strip(phone)));
console.log('merge tests: all passed');
