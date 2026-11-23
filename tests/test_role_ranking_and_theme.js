/* Deterministic, candidate-independent ranking assertions for all six roles. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const theme=fs.readFileSync(path.join(root,'pip-theme.js'),'utf8');
const template=fs.readFileSync(path.join(root,'template.html'),'utf8');
const palette=fs.readFileSync(path.join(root,'pip-theme.css'),'utf8');
const data=JSON.parse(fs.readFileSync(path.join(root,'roles.json'),'utf8'));
const init=app.replace(/\s*checkServer\(\);render\(\);\s*$/,'');
assert.notEqual(init,app,'Expected app bootstrap');
assert.match(template,/id="pipHeaderTheme"/);
assert.match(template,/id="pipWelcomeTheme"/);
assert.match(template,/pip-theme[.]css[?]v=/);
assert.match(template,/pip-theme[.]js[?]v=/);
assert.match(theme,/pivotpath_display_theme_v1/);
assert.match(theme,/localStorage\.setItem\(KEY,mode\)/);
assert.match(palette,/html\[data-theme="dark"\]/);
assert.match(palette,/resumeSheet/);
let stored='';
const context=vm.createContext({
 DATA:data,
 localStorage:{getItem:()=>stored||null,setItem:(k,v)=>{assert.equal(k,'pivotpath_v4_state');stored=v;}},
 document:{getElementById:()=>null,addEventListener:()=>{},querySelectorAll:()=>[]},
 setTimeout:()=>{},clearTimeout:()=>{},console,confirm:()=>true
});
vm.runInContext(init,context,{timeout:1000});
const view=()=>JSON.parse(vm.runInContext('JSON.stringify(rankedRoles())',context));
vm.runInContext([
 "S.profile.role='Junior Research Analyst';",
 "S.profile.achievements='Researched competitors and evaluated user onboarding';",
 "S.profile.resumeText='Product data, SQL, funnels, Python reporting and market research';",
 "S.profile.skills='SQL, Excel, data analysis, research';",
 "S.profile.verified=true;"
].join('\n'),context);
let ranks=view();
assert.equal(ranks.length,6);
assert.equal(new Set(ranks.map(x=>x.id)).size,6);
assert.deepEqual(ranks.map(x=>x.rank),[1,2,3,4,5,6]);
for(let i=1;i<ranks.length;i++)assert(ranks[i-1].value>=ranks[i].value,'Without aspiration, order follows overlap');
const natural=ranks.map(x=>x.id);
const chosen=natural[5];
vm.runInContext("S.career.aspiration="+JSON.stringify(chosen),context);
ranks=view();
assert.equal(ranks[0].id,chosen,'Aspiration pinned even if it has the lowest match');
assert.equal(ranks[0].fitRank,6,'Actual overlap rank preserved despite aspiration pin');
assert.deepEqual(ranks.slice(1).map(x=>x.id),natural.filter(x=>x!==chosen),'Remainder descending by overlap');
assert.deepEqual(ranks.map(x=>x.rank),[1,2,3,4,5,6]);
assert.equal(ranks[0].isAspiration,true);
const top=JSON.parse(vm.runInContext('JSON.stringify(shortlist())',context));
assert.deepEqual(top.map(x=>x.id),ranks.slice(0,3).map(x=>x.id));
for(const id of natural){
 vm.runInContext("S.career.aspiration="+JSON.stringify(id),context);
 const selected=view();
 assert.equal(selected[0].id,id);
 assert.deepEqual(selected.slice(1).map(x=>x.fitRank),
   natural.filter(x=>x!==id).map(other=>natural.indexOf(other)+1));
}
vm.runInContext("S.career.aspiration='';S.profile.resumeText='';S.profile.achievements='';S.profile.role='';S.profile.skills=''",context);
ranks=view();
assert.deepEqual(ranks.map(x=>x.id),['DA','BA','PA','PO','PMM','APM'],
 'Ties without profile evidence are stable and never present as a certainty');
console.log('PASS: Six ranked roles, aspiration-first rule, stable fit provenance and theme assets.');
