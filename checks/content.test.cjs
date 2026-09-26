const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path');
const root=path.resolve(__dirname,'..'),defs=require('../dist/instruments.json'),d=defs.find(d=>d.route==='big-five'),api=require('../dist/score.js'),engine=require('../src/scoring/engine.js');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const request=responses=>({instrumentId:d.id,instrumentVersion:d.version,responses});
const neutral=d.items.map(i=>({itemId:i.id,value:3}));
test('complete, incomplete and invalid inputs are distinct; no coercion, inference or imputation',()=>{
 assert.equal(api.score(request([])).status,'incomplete');assert.equal(api.score(request(neutral.slice(1))).missing[0],d.items[0].id);
 for(const responses of [null,Array(50),[...neutral,neutral[0]],[{itemId:'unknown',value:3}],...['3',null,NaN,Infinity,1.5,0,6].map(value=>[{itemId:d.items[0].id,value}])]){
  const out=api.score(request(responses));assert.equal(out.status,'invalid');assert.equal(out.values,undefined);
 }
 assert.equal(api.score({...request(neutral),instrumentVersion:'0.0.0'}).status,'invalid');
 assert.equal(api.score({...request(neutral),instrumentId:{toString:()=>d.id}}).status,'invalid');
 assert.equal(api.scoreOrdered(d.id,d.version,Array(50)).status,'invalid');
 assert.equal(api.scoreOrdered(d.id,d.version,Array(49).fill(3)).status,'invalid');
 const out=api.score(request(neutral));assert.equal(out.status,'complete');assert.deepEqual(out.values,{O:30,C:30,E:30,A:30,N:30});assert.deepEqual(out.means,{O:3,C:3,E:3,A:3,N:3});
 assert.equal(out.indices,undefined);assert.equal(out.suggestions,undefined);assert.equal(out.definitionHash,d.definitionHash);
 assert.deepEqual(api.score(request(neutral.slice().reverse())),out);
});
test('all 50 item texts and keys match the independently captured upstream factor keys',()=>{
 const reference=require('./fixtures/ipip50-reference.json'),normalize=s=>s.toLowerCase().replace(/[^a-z]/g,'');
 for(const item of d.items){const r=reference.find(r=>normalize(r.text)===normalize(item.text));assert.ok(r);assert.equal(item.dimension,r.dimension);assert.equal(item.reverse,r.reverse);}
 for(let i=0;i<50;i++){
  const answers=neutral.map(x=>({...x}));answers[i].value=5;const out=api.score(request(answers));
  for(const dim of d.dimensions)assert.equal(out.values[dim],30+(dim===d.items[i].dimension?(d.items[i].reverse?-2:2):0));
 }
});
test('generic math preserves ties, reverse-keyed means and rejects corrupt definitions',()=>{
 const base={id:'synthetic',version:'1',mode:'sum',range:[1,5],dimensions:['a','b'],classification:'highest',items:[{id:'x',dimension:'a',reverse:false},{id:'y',dimension:'b',reverse:true}]};
 let scorer=engine.create([base]);let out=scorer.scoreOrdered('synthetic','1',[3,3]);assert.deepEqual(out.leaders,['a','b']);assert.equal(out.type,null);
 assert.equal(scorer.scoreOrdered('synthetic','1',[5,5]).type,'a');
 scorer=engine.create([{...base,mode:'mean',classification:null}]);assert.deepEqual(scorer.scoreOrdered('synthetic','1',[2,1]).means,{a:2,b:5});
 scorer=engine.create([{...base,mode:'mean',items:[...base.items,{id:'z',dimension:'a',reverse:false}]}]);assert.equal(scorer.scoreOrdered('synthetic','1',[3,1,3]).type,'b');
 const bipolar={id:'bipolar',version:'1',mode:'bipolar',range:[1,5],dimensions:['axis'],pairs:{axis:['L','R']},items:[{id:'x',dimension:'axis',low:'L',high:'R'}]};
 scorer=engine.create([bipolar]);assert.equal(scorer.scoreOrdered('bipolar','1',[3]).pattern,'X');assert.equal(scorer.scoreOrdered('bipolar','1',[3]).type,null);assert.equal(scorer.scoreOrdered('bipolar','1',[1]).type,'L');assert.equal(scorer.scoreOrdered('bipolar','1',[5]).type,'R');
 assert.throws(()=>engine.create([{...base,items:[base.items[0],base.items[0]]}]),TypeError);
});
test('release artifacts have exact checksums, approved definitions and all 43 guarded bodies',()=>{
 const manifest=require('../dist/manifest.json'),profiles=require('../dist/tunings.json'),rights=require('../dist/instrument-rights.json');
 assert.equal(profiles.length,43);assert.equal(new Set(profiles.map(p=>p.id)).size,43);
 for(const [file,meta] of Object.entries(manifest.files)){const raw=fs.readFileSync(path.join(root,'dist',file));assert.equal(hash(raw),meta.sha256,file);assert.equal(raw.length,meta.bytes);}
 for(const p of profiles){const body=fs.readFileSync(path.join(root,'dist',p.bodyPath),'utf8');assert.equal(body,fs.readFileSync(path.join(root,p.path),'utf8'));assert.equal(hash(body),p.sha256);assert.match(body,/material uncertainty/);assert.match(body,/authorized scope/);assert.match(body,/does not authorize installation/);assert.doesNotMatch(body,/Confident wrong|only if asked|OCEAN beats/);}
 assert.deepEqual(defs.map(x=>x.route).sort(),['attachment','big-five','disc','enneagram','mbti']);for(const def of defs)assert.ok(rights.instruments.find(r=>r.route===def.route&&r.available));
 for(const policy of rights.instruments.filter(r=>!r.available)){const text=fs.readFileSync(path.join(root,'tests',policy.route+'.md'),'utf8');assert.match(text,/unavailable_pending_rights/);}
 assert.ok(!fs.readFileSync(path.join(root,'dist/score.js'),'utf8').includes(d.items[0].text));
});
