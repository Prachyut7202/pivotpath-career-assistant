/* Headless regression against the actual app state helpers, with no network. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const pip=fs.readFileSync(path.join(root,'pip-experience.js'),'utf8');
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
const data=JSON.parse(fs.readFileSync(path.join(root,'roles.json'),'utf8'));
assert.match(app,/function freshCandidateSession\(\)/);
assert.match(app,/function confirmNewCandidate\(\)/);
assert.match(app,/if\(newProfile\)\s*\{\s*freshCandidateSession\(\)/);
assert.match(app,/newProfile:!document\.getElementById\('resumeSamePerson'\)\?\.checked/);
assert.match(pip,/if\(target==='restart'\)\{if\(!confirmNewCandidate\(\)\)/);
assert.match(pip,/if\(a==='manual'\)\{if\(!confirmNewCandidate\(\)\)/);
assert.match(pip,/if\(a==='upload'\)\{if\(!confirmNewCandidate\(\)\)/);
assert.match(pip,/if\(ok\)\{const current=intake\(\)/);
assert.match(app,/requestSession!==candidateSessionEpoch/);
assert.match(app,/responseSession!==candidateSessionEpoch/);
assert.match(index,/pip-guide\.js\?v=1\.0/);
assert.match(index,/candidateSessionEpoch/);

const initial=app.replace(/\s*checkServer\(\);render\(\);\s*$/,'');
assert.notEqual(initial,app,'Removed only the initial live render call');
let persisted='';
const context=vm.createContext({
 DATA:data,
 localStorage:{getItem:()=>persisted||null,setItem:(k,v)=>{assert.equal(k,'pivotpath_v4_state');persisted=v;},removeItem:()=>{persisted='';}},
 document:{getElementById:()=>null,addEventListener:()=>{},querySelectorAll:()=>[]},
 clearTimeout:()=>{},setTimeout:()=>{},console,confirm:()=>false
});
vm.runInContext(initial,context,{timeout:1000});
const setup=[
 "S.profile.name='Old Person';",
 "S.profile.role='Analyst';",
 "S.profile.resumeText='Sensitive old resume';",
 "S.profile.verified=true;",
 "S.career.activeRole='PA';",
 "S.career.aspiration='PA';",
 "S.chat=[{who:'user',text:'Private question from previous person'}];",
 "S.pipIntake={step:'ready',owned:['User research'],note:'old note'};",
 "S.pipSkillConfidence={PA:{C2b:{level:'independent'}}};",
 "S.pipGuideSeen={'skill-picture-complete:PA':{shownAt:'yesterday'}};",
 "S.pipGuideDisabled=true;",
 "S.attempt={role:'PA',index:2,status:'feedback'};",
 "S.attempts=[{role:'PA',completedAt:'yesterday'}];",
 "S.tasks=[{status:'done',completedAt:'yesterday'}];",
 "S.resume.history=['old draft'];",
 "S.resume.proposals=[{draft:'old private proposal'}];",
 "S.pipJourney={history:[{route:'practice'}]};",
 "if(!hasCandidateSession())throw Error('Existing candidate not detected');",
 "if(confirmNewCandidate())throw Error('Declined confirmation must not reset');",
 "const before=candidateSessionEpoch;",
 "freshCandidateSession();",
 "globalThis.checked={before,after:candidateSessionEpoch,name:S.profile.name,role:S.profile.role,",
 "resumeText:S.profile.resumeText,activeRole:S.career.activeRole,chat:S.chat.length,",
 "attempt:S.attempt,attempts:S.attempts.length,tasks:S.tasks.length,",
 "history:S.resume.history.length,proposals:S.resume.proposals.length,",
 "intake:S.pipIntake,confidence:S.pipSkillConfidence,guideSeen:S.pipGuideSeen,",
 "guideDisabled:S.pipGuideDisabled,journey:S.pipJourney};"
].join('\n');
vm.runInContext(setup,context,{timeout:1000});
const result=context.checked;
assert.equal(result.after,result.before+1);
assert.equal(result.name,'');
assert.equal(result.role,'');
assert.equal(result.resumeText,'');
assert.equal(result.activeRole,'');
assert.equal(result.chat,0);
assert.equal(result.attempt,null);
assert.equal(result.attempts,0);
assert.equal(result.tasks,0);
assert.equal(result.history,0);
assert.equal(result.proposals,0);
assert.equal(result.intake,undefined);
assert.equal(result.confidence,undefined);
assert.equal(result.guideSeen,undefined);
assert.equal(result.guideDisabled,undefined);
assert.equal(result.journey,undefined);
assert.equal(JSON.parse(persisted).chat.length,0);
assert.doesNotMatch(persisted,/Sensitive old resume|Private question|old private proposal/);
console.log('PASS: New person has no previous profile, conversation, skills, cases, streaks, tasks or resume.');
