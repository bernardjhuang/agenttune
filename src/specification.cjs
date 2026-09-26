// Render the questionnaire contract from its versioned definition.
const cell=s=>String(s).replace(/\|/g,'\\|').replace(/\n/g,' ');
module.exports=function(d){
 const bipolar=d.mode==='bipolar';
 const headings=bipolar?'| ID | First statement | Second statement | Axis | First pole | Second pole |':'| ID | Statement | Dimension | Reverse |';
 const separator=bipolar?'|---|---|---|---|---|---|':'|---|---|---|---|';
 const rows=d.items.map(i=>bipolar?`| ${i.id} | ${cell(i.first)} | ${cell(i.second)} | ${i.dimension} | ${i.low} | ${i.high} |`:`| ${i.id} | ${cell(i.text)} | ${i.dimension} | ${i.reverse?'Yes':'No'} |`).join('\n');
 const scoring={
  mbti:'Subtract 3 from each response. Award the absolute difference to the first pole for values below 3, or the second pole for values above 3. Neutral responses add zero. Compare each axis. Equal totals remain X/unresolved, with no forced type. An explicit follow-up preference may resolve a tied axis for choosing a template, but does not change measured scores.',
  enneagram:'Sum the four responses for each of the nine dimensions (4–20). Preserve every tied highest score; there is no dominant type on a tie. With one highest type, an optional wing is the higher of its two adjacent types; equal adjacent scores leave the wing unresolved.',
  disc:'Sum the four responses for each of D, I, S and C (4–20). Preserve tied highest scores without a dominant type. With a unique leader, a unique runner-up within two points can be shown as an optional blend; a tied runner-up must not be chosen arbitrarily.',
  attachment:'Reverse keyed responses using 8 minus the raw value. Average the 18 responses for each subscale. Anxiety and avoidance each range from 1 to 7. The legacy interface uses a heuristic split at 4: both low = secure, high anxiety only = anxious, high avoidance only = avoidant, both high = disorganized. Exactly 4 is on the low side. This is not a clinical classification.',
  'big-five':'Reverse keyed responses using 6 minus the raw value. Sum each dimension’s ten scored responses (10–50) and divide by ten for its mean (1–5). These are raw scores, not population percentiles. No instruction is selected automatically.'
 }[d.route];
 return `# ${d.title}\n\nInstrument: \`${d.id}@${d.version}\`. Scorer: \`1.0.0\`. Definition SHA-256: \`${d.definitionHash}\`.\n\n${d.instructions}\n\n## Response scale\n${d.anchors.map((a,i)=>`${i+1}. ${a}`).join('\n')}\n\n## Items\n\n${headings}\n${separator}\n${rows}\n\n## Scoring\nRequire all ${d.items.length} valid integer responses. Missing records return incomplete; duplicate IDs, unknown IDs and invalid values are rejected. No imputation. ${scoring}\n\nScores do not authorize installation or override explicit communication preferences. Review suggested templates before using them.\n\n## Source, terms and adaptations\n[Source](${d.source}). Instrument content is subject to separate publisher terms; see [third-party notices](https://agent-tune.com/resources/content/THIRD_PARTY_NOTICES.md). Operational availability does not grant unrestricted redistribution rights.\n\n${d.adaptations.map(x=>'- '+x).join('\n')}\n`;
};
