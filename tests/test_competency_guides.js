/* Headless tests for each role's competency rationale and honest skill milestones. */
'use strict';
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'roles.json'),'utf8')).roles;
const source=fs.readFileSync(path.join(root,'pip-competency.js'),'utf8');
const context={ROLES:data,S:{attempts:[],pipSkillConfidence:{},career:{activeRole:'APM'}},
  document:{addEventListener:()=>{}},window:{},esc:s=>String(s),
  resourceFor:()=> 'https://www.example.com',allEvidence:()=>[],
  beginCase:()=>{},setRoute:()=>{},renderModal:()=>{},save:()=>{},modal:null};
vm.runInNewContext(source,context,{timeout:1000});
const pg=context.window.PipCompetencyGuides;
assert(pg,'Guide registry should initialize');
let total=0;
for(const [role,config] of Object.entries(data)){
 for(const [code,skill] of config.competencies){
  total++;
  const html=pg.renderSkillModal(role,code);
  assert(html.includes(config.name),role+' '+code+' name');
  assert(html.includes(skill),role+' '+code+' skill');
  assert(html.includes('Why this matters for this role'),role+' '+code+' why');
  assert(html.includes('What would you actually measure?'),role+' '+code+' metrics');
  assert(html.includes('What a strong answer demonstrates'),role+' '+code+' rubric');
  assert(html.includes('Apply it to actual work'),role+' '+code+' external validation');
  assert(html.includes('External learning resource'),role+' '+code+' resource');
  const cov=pg.coverage(role,code),rank=pg.achievement(role,code);
  const covered=cov.a.length>0&&cov.b.length>0&&!/SQL/i.test(skill);
  assert.equal(rank.assessable,covered,'Coverage must reflect actual case bank '+role+' '+code);
 }
}
assert.equal(total,35,'All 35 role-competency pairs covered');
assert.equal(pg.achievement('APM','C5c').assessable,false,'APM rollout unassessed');
assert.equal(pg.achievement('DA','C3a').assessable,false,'SQL unassessed in written cases');
assert.equal(pg.achievement('PO','C7b').assessable,false,'PO stakeholder alignment unassessed');
const make=(variant,score,source='live')=>({role:'APM',variant,completedAt:'2026-11-23T12:00:00'+(variant==='B'?'.100':'.000')+'Z',
 evaluations:[{competency:'C4b',assessable:true,rating:score,source}]});
context.S.attempts=[make('A',4)];
assert.equal(pg.achievement('APM','C4b').met,false);
assert.equal(pg.achievement('APM','C4b').label,'Strong in one case');
context.S.attempts.push(make('B',4));
assert.equal(pg.achievement('APM','C4b').met,true,'Two distinct strong live cases should earn checkpoint');
assert(pg.renderSkillModal('APM','C4b').includes('You reached the practice checkpoint'));
assert(pg.roleSummary('APM').includes('1 of 5 practice skill checkpoints'), 'Only 5 APM skills tested in A/B');
context.S.attempts[1].evaluations[0].source='demo';
assert.equal(pg.achievement('APM','C4b').met,false,'Demo score must never award checkpoint');
context.S.attempts[1].evaluations[0].source='live';
context.S.attempts[1].evaluations[0].rating=3;
assert.equal(pg.achievement('APM','C4b').met,false,'Low B score must not award checkpoint');
context.S.attempts[1].evaluations[0].rating=4;
context.S.attempts.push(make('B',2));context.S.attempts.at(-1).completedAt='2026-11-23T13:00:00Z';
assert.equal(pg.achievement('APM','C4b').met,false,'Latest B must matter, not cherry-picked historic attempts');
console.log('PASS '+total+' role-specific guides: meaningful metrics, truthful coverage and robust live A/B milestones.');
