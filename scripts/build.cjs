const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),version=require('../package.json').version;
const read=p=>fs.readFileSync(path.join(root,p),'utf8'),json=x=>JSON.stringify(x,null,2)+'\n';
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const write=(p,s)=>{fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.writeFileSync(path.join(root,p),s);};
const profiles=require('../data/tunings.json'),rights=require('../data/instrument-rights.json');
const out=path.join(root,'dist');fs.rmSync(out,{recursive:true,force:true});
const contract=read('data/contract.md');
for(const p of profiles){
 const body=`# ${p.code} — communication preferences\n\nAn optional template to try and edit. This does not assert a personality type or diagnosis.\n\n## Communication style\n${p.preference}\n\n${contract}`;
 write(p.path,body);write('dist/tunings/'+p.id+'.md',body);p.bodyPath='tunings/'+p.id+'.md';p.sha256=hash(body);
}
write('dist/tunings.json',json(profiles));
write('dist/compact-tunings.js',read('templates/compact-runtime.js.txt').replace('__RULES__',JSON.stringify(Object.fromEntries(profiles.map(p=>[p.id,p.preference])),null,2)));
write('dist/instrument-rights.json',json(rights));
write('dist/legacy-provenance.json',read('data/legacy-provenance.json'));
const definitions=[];
for(const name of fs.readdirSync(path.join(root,'data/instruments')).sort()){
 const source=read('data/instruments/'+name),d=JSON.parse(source),policy=rights.instruments.find(r=>r.route===d.route);
 if(!policy?.available||policy.instrumentId!==d.id||policy.instrumentVersion!==d.version||policy.license_expression!==d.license)throw Error('Instrument metadata mismatch: '+name);
 d.definitionHash=hash(source);definitions.push(d);
}
write('dist/instruments.json',json(definitions));
write('dist/engine.js',read('src/scoring/engine.js'));
const keys=definitions.map(d=>({...d,items:d.items.map(({text,first,second,...item})=>item)}));
write('dist/score.js',read('src/scoring/engine.js')+`\n(function(root){const engine=typeof module==='object'&&module.exports?module.exports:root.AgentTuneEngine;const api=engine.create(${JSON.stringify(keys)});if(typeof module==='object'&&module.exports)module.exports=api;else root.AgentTuneScoring=api;})(typeof globalThis!=='undefined'?globalThis:this);\n`);
for(const policy of rights.instruments){
 const d=definitions.find(x=>x.route===policy.route);
 let spec;
 if(d){spec=require('../src/specification.cjs')(d);}
 else spec=`# ${policy.route} questionnaire availability\n\nStatus: unavailable_pending_rights. The questionnaire is not included in AgentTune content ${version}. ${policy.next_action}\n\n[Original publisher](${policy.evidence_urls[0]}) · [Choose communication preferences](https://agent-tune.com/tools/custom-instructions-generator) · [Browse templates](https://agent-tune.com/library)\n\nThe framework's optional communication templates remain available. They are editorial suggestions, not questionnaire results or diagnoses. Historical research used an AgentTune adaptation; see the release's legacy provenance record.\n`;
 write('tests/'+policy.route+'.md',spec);write('dist/tests/'+policy.route+'.md',spec);
}
for(const file of ['LICENSE','THIRD_PARTY_NOTICES.md','CHANGELOG.md'])write('dist/'+file,read(file));
const files={};function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else files[path.relative(out,p).split(path.sep).join('/')]={sha256:hash(fs.readFileSync(p)),bytes:fs.statSync(p).size};}}walk(out);
write('dist/manifest.json',json({version,profile:'core',source:'https://github.com/bernardjhuang/agenttune',files}));
console.log(`Built ${profiles.length} profiles and ${definitions.length} available instrument; ${Object.keys(files).length} pinned artifacts.`);
