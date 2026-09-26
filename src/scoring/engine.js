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
