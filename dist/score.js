/* Original AgentTune scoring engine. MIT. No questionnaire wording or network calls. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.AgentTuneEngine=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const version='1.0.0';
  function create(definitions){
    const registry=new Map();
    for(const d of definitions){
      if(!d||typeof d.id!=='string'||!d.id||typeof d.version!=='string'||!d.version||!Array.isArray(d.items)||!d.items.length||!Array.isArray(d.dimensions)||d.dimensions.some(k=>typeof k!=='string'||!k)||new Set(d.dimensions).size!==d.dimensions.length||!['sum','mean','bipolar'].includes(d.mode))throw new TypeError('Invalid instrument definition');
      if(!Array.isArray(d.range)||d.range.length!==2||!d.range.every(Number.isInteger)||d.range[0]>=d.range[1])throw new TypeError('Invalid response range');
      const ids=new Set();
      for(const item of d.items){
        if(typeof item.id!=='string'||ids.has(item.id)||!d.dimensions.includes(item.dimension))throw new TypeError('Invalid item key');
        if(d.mode==='bipolar'&&(!d.pairs?.[item.dimension]?.includes(item.low)||!d.pairs[item.dimension].includes(item.high)||item.low===item.high))throw new TypeError('Invalid bipolar key');
        if(typeof item.reverse!=='boolean'&&d.mode!=='bipolar')throw new TypeError('Invalid reverse key');
        ids.add(item.id);
      }
      if(d.dimensions.some(dim=>!d.items.some(item=>item.dimension===dim)))throw new TypeError('Empty dimension');
      const key=d.id+'@'+d.version;if(registry.has(key))throw new TypeError('Duplicate instrument version');
      // Consumers cannot mutate a definition after registration.
      registry.set(key,JSON.parse(JSON.stringify(d)));
    }
    function score(request){
      const invalid=(code,detail)=>({status:'invalid',errors:[{code,detail}],scorerVersion:version});
      if(!request||typeof request!=='object')return invalid('invalid_request','Expected an instrument ID, exact version and response records.');
      const {instrumentId,instrumentVersion,responses}=request;
      if(typeof instrumentId!=='string'||typeof instrumentVersion!=='string')return invalid('invalid_instrument_version','Instrument ID and version must be strings.');
      const d=registry.get(instrumentId+'@'+instrumentVersion);
      if(!d)return invalid('unknown_instrument_version','Select an available instrument and its exact version.');
      const meta={instrumentId,instrumentVersion,scorerVersion:version,definitionHash:d.definitionHash};
      if(!Array.isArray(responses))return {...invalid('invalid_responses','Expected an array of itemId/value records.'),...meta};
      const allowed=new Set(d.items.map(i=>i.id)),given=new Map(),errors=[];
      for(let i=0;i<responses.length;i++){
        const r=responses[i];
        if(!Object.hasOwn(responses,i)||!r||typeof r!=='object'||Array.isArray(r)){errors.push({code:'invalid_record',index:i});continue;}
        if(!allowed.has(r.itemId)){errors.push({code:'unknown_item',itemId:r.itemId??null});continue;}
        if(given.has(r.itemId))errors.push({code:'duplicate_item',itemId:r.itemId});
        if(!Number.isInteger(r.value)||r.value<d.range[0]||r.value>d.range[1])errors.push({code:'invalid_value',itemId:r.itemId});
        given.set(r.itemId,r.value);
      }
      if(errors.length)return {status:'invalid',...meta,errors};
      const missing=d.items.filter(i=>!given.has(i.id)).map(i=>i.id);
      if(missing.length)return {status:'incomplete',...meta,answered:given.size,total:d.items.length,missing};
      if(d.mode==='bipolar'){
        const midpoint=(d.range[0]+d.range[1])/2,values=Object.fromEntries(Object.values(d.pairs).flat().map(k=>[k,0]));
        for(const item of d.items){const n=given.get(item.id)-midpoint;if(n)values[n<0?item.low:item.high]+=Math.abs(n);}
        const tied=d.dimensions.filter(k=>{const [a,b]=d.pairs[k];return values[a]===values[b];});
        const pattern=d.dimensions.map(k=>{const [a,b]=d.pairs[k];return values[a]===values[b]?'X':values[a]>values[b]?a:b;}).join('');
        return {status:'complete',...meta,values,tied,pattern,type:tied.length?null:pattern};
      }
      const sums=Object.fromEntries(d.dimensions.map(k=>[k,0])),counts={...sums};
      for(const item of d.items){const v=given.get(item.id);sums[item.dimension]+=item.reverse?d.range[0]+d.range[1]-v:v;counts[item.dimension]++;}
      const means=Object.fromEntries(d.dimensions.map(k=>[k,sums[k]/counts[k]]));
      const out={status:'complete',...meta,values:d.mode==='mean'?means:sums,means};
      if(d.classification==='highest'){out.leaders=d.dimensions.filter(k=>out.values[k]===Math.max(...Object.values(out.values)));out.type=out.leaders.length===1?out.leaders[0]:null;}
      return out;
    }
    function scoreOrdered(instrumentId,instrumentVersion,answers){
      const d=registry.get(instrumentId+'@'+instrumentVersion);
      if(!d)return score({instrumentId,instrumentVersion,responses:[]});
      if(!Array.isArray(answers)||answers.length!==d.items.length)return {status:'invalid',errors:[{code:'invalid_length',detail:'Positional input requires the complete pinned item order.'}],scorerVersion:version};
      // Array.from preserves holes as invalid values instead of silently dropping them.
      return score({instrumentId,instrumentVersion,responses:Array.from(answers,(value,i)=>({itemId:d.items[i].id,value}))});
    }
    return Object.freeze({version,score,scoreOrdered});
  }
  return Object.freeze({version,create});
});

(function(root){const engine=typeof module==='object'&&module.exports?module.exports:root.AgentTuneEngine;const api=engine.create([{"id":"agenttune-ipip50","version":"1.0.0","route":"big-five","title":"Big Five — IPIP 50-item adaptation","mode":"sum","dimensions":["O","C","E","A","N"],"range":[1,5],"license":"LicenseRef-IPIP-Public-Domain","source":"https://ipip.ori.org/newBigFive5broadKey.htm","sourceVersion":"IPIP 50-item Big-Five factor markers","adaptations":["Neuroticism is scored in the opposite orientation to the upstream Emotional Stability factor.","O is displayed as Openness; the upstream factor is Intellect/Imagination.","Items are interleaved in the documented AgentTune display order.","First-person prefix is supplied by the questionnaire UI."],"anchors":["Very inaccurate","Moderately inaccurate","Neither accurate nor inaccurate","Moderately accurate","Very accurate"],"instructions":"Describe your typical behavior. Complete all 50 items. These are questionnaire scores, not population percentiles or a diagnosis.","items":[{"id":"ipip50-01","displayOrder":1,"dimension":"E","reverse":false,"sourceLocator":"10-item Factor E, item 1 in source display order"},{"id":"ipip50-02","displayOrder":2,"dimension":"A","reverse":true,"sourceLocator":"10-item Factor A, item 10 in source display order"},{"id":"ipip50-03","displayOrder":3,"dimension":"C","reverse":false,"sourceLocator":"10-item Factor C, item 1 in source display order"},{"id":"ipip50-04","displayOrder":4,"dimension":"N","reverse":false,"sourceLocator":"10-item Factor N, item 3 in source display order"},{"id":"ipip50-05","displayOrder":5,"dimension":"O","reverse":false,"sourceLocator":"10-item Factor O, item 1 in source display order"},{"id":"ipip50-06","displayOrder":6,"dimension":"E","reverse":true,"sourceLocator":"10-item Factor E, item 6 in source display order"},{"id":"ipip50-07","displayOrder":7,"dimension":"A","reverse":false,"sourceLocator":"10-item Factor A, item 1 in source display order"},{"id":"ipip50-08","displayOrder":8,"dimension":"C","reverse":true,"sourceLocator":"10-item Factor C, item 7 in source display order"},{"id":"ipip50-09","displayOrder":9,"dimension":"N","reverse":true,"sourceLocator":"10-item Factor N, item 1 in source display order"},{"id":"ipip50-10","displayOrder":10,"dimension":"O","reverse":true,"sourceLocator":"10-item Factor O, item 8 in source display order"},{"id":"ipip50-11","displayOrder":11,"dimension":"E","reverse":false,"sourceLocator":"10-item Factor E, item 2 in source display order"},{"id":"ipip50-12","displayOrder":12,"dimension":"A","reverse":true,"sourceLocator":"10-item Factor A, item 8 in source display order"},{"id":"ipip50-13","displayOrder":13,"dimension":"C","reverse":false,"sourceLocator":"10-item Factor C, item 2 in source display order"},{"id":"ipip50-14","displayOrder":14,"dimension":"N","reverse":false,"sourceLocator":"10-item Factor N, item 4 in source display order"},{"id":"ipip50-15","displayOrder":15,"dimension":"O","reverse":false,"sourceLocator":"10-item Factor O, item 2 in source display order"},{"id":"ipip50-16","displayOrder":16,"dimension":"E","reverse":true,"sourceLocator":"10-item Factor E, item 7 in source display order"},{"id":"ipip50-17","displayOrder":17,"dimension":"A","reverse":false,"sourceLocator":"10-item Factor A, item 2 in source display order"},{"id":"ipip50-18","displayOrder":18,"dimension":"C","reverse":true,"sourceLocator":"10-item Factor C, item 8 in source display order"},{"id":"ipip50-19","displayOrder":19,"dimension":"N","reverse":true,"sourceLocator":"10-item Factor N, item 2 in source display order"},{"id":"ipip50-20","displayOrder":20,"dimension":"O","reverse":true,"sourceLocator":"10-item Factor O, item 9 in source display order"},{"id":"ipip50-21","displayOrder":21,"dimension":"E","reverse":false,"sourceLocator":"10-item Factor E, item 3 in source display order"},{"id":"ipip50-22","displayOrder":22,"dimension":"A","reverse":true,"sourceLocator":"10-item Factor A, item 9 in source display order"},{"id":"ipip50-23","displayOrder":23,"dimension":"C","reverse":false,"sourceLocator":"10-item Factor C, item 3 in source display order"},{"id":"ipip50-24","displayOrder":24,"dimension":"N","reverse":false,"sourceLocator":"10-item Factor N, item 5 in source display order"},{"id":"ipip50-25","displayOrder":25,"dimension":"O","reverse":false,"sourceLocator":"10-item Factor O, item 3 in source display order"},{"id":"ipip50-26","displayOrder":26,"dimension":"E","reverse":true,"sourceLocator":"10-item Factor E, item 8 in source display order"},{"id":"ipip50-27","displayOrder":27,"dimension":"A","reverse":false,"sourceLocator":"10-item Factor A, item 3 in source display order"},{"id":"ipip50-28","displayOrder":28,"dimension":"C","reverse":true,"sourceLocator":"10-item Factor C, item 9 in source display order"},{"id":"ipip50-29","displayOrder":29,"dimension":"N","reverse":false,"sourceLocator":"10-item Factor N, item 6 in source display order"},{"id":"ipip50-30","displayOrder":30,"dimension":"O","reverse":true,"sourceLocator":"10-item Factor O, item 10 in source display order"},{"id":"ipip50-31","displayOrder":31,"dimension":"E","reverse":false,"sourceLocator":"10-item Factor E, item 4 in source display order"},{"id":"ipip50-32","displayOrder":32,"dimension":"A","reverse":true,"sourceLocator":"10-item Factor A, item 7 in source display order"},{"id":"ipip50-33","displayOrder":33,"dimension":"C","reverse":false,"sourceLocator":"10-item Factor C, item 4 in source display order"},{"id":"ipip50-34","displayOrder":34,"dimension":"N","reverse":false,"sourceLocator":"10-item Factor N, item 7 in source display order"},{"id":"ipip50-35","displayOrder":35,"dimension":"O","reverse":false,"sourceLocator":"10-item Factor O, item 4 in source display order"},{"id":"ipip50-36","displayOrder":36,"dimension":"E","reverse":true,"sourceLocator":"10-item Factor E, item 9 in source display order"},{"id":"ipip50-37","displayOrder":37,"dimension":"A","reverse":false,"sourceLocator":"10-item Factor A, item 4 in source display order"},{"id":"ipip50-38","displayOrder":38,"dimension":"C","reverse":true,"sourceLocator":"10-item Factor C, item 10 in source display order"},{"id":"ipip50-39","displayOrder":39,"dimension":"N","reverse":false,"sourceLocator":"10-item Factor N, item 8 in source display order"},{"id":"ipip50-40","displayOrder":40,"dimension":"O","reverse":false,"sourceLocator":"10-item Factor O, item 5 in source display order"},{"id":"ipip50-41","displayOrder":41,"dimension":"E","reverse":false,"sourceLocator":"10-item Factor E, item 5 in source display order"},{"id":"ipip50-42","displayOrder":42,"dimension":"A","reverse":false,"sourceLocator":"10-item Factor A, item 5 in source display order"},{"id":"ipip50-43","displayOrder":43,"dimension":"C","reverse":false,"sourceLocator":"10-item Factor C, item 5 in source display order"},{"id":"ipip50-44","displayOrder":44,"dimension":"N","reverse":false,"sourceLocator":"10-item Factor N, item 9 in source display order"},{"id":"ipip50-45","displayOrder":45,"dimension":"O","reverse":false,"sourceLocator":"10-item Factor O, item 6 in source display order"},{"id":"ipip50-46","displayOrder":46,"dimension":"E","reverse":true,"sourceLocator":"10-item Factor E, item 10 in source display order"},{"id":"ipip50-47","displayOrder":47,"dimension":"A","reverse":false,"sourceLocator":"10-item Factor A, item 6 in source display order"},{"id":"ipip50-48","displayOrder":48,"dimension":"C","reverse":false,"sourceLocator":"10-item Factor C, item 6 in source display order"},{"id":"ipip50-49","displayOrder":49,"dimension":"N","reverse":false,"sourceLocator":"10-item Factor N, item 10 in source display order"},{"id":"ipip50-50","displayOrder":50,"dimension":"O","reverse":false,"sourceLocator":"10-item Factor O, item 7 in source display order"}],"sourceSha256":"8577862772802903db4330c5a2178bd3948894fe86b82909865bb9b5f17411f9","sourceReviewed":"2026-09-26","definitionHash":"d310c892c4a4fc6d2bb3b1b443bce43d697b808e92f6d26ecdce1139b8ebb352"}]);if(typeof module==='object'&&module.exports)module.exports=api;else root.AgentTuneScoring=api;})(typeof globalThis!=='undefined'?globalThis:this);
