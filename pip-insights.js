/* PivotPath V5.10: skill calibration, evidence alignment and meaningful learning streaks.
   Browser-local enhancements; self-report never becomes proven proficiency. */
(function(){
'use strict';
const confidenceOptions=[
 {id:'new',label:'New to me'},
 {id:'some',label:'Some experience'},
 {id:'independent',label:'Done independently'}
];
function store(){
 if(!S.pipSkillConfidence||typeof S.pipSkillConfidence!=='object')S.pipSkillConfidence={};
 return S.pipSkillConfidence;
}
function selection(role,code){return store()[role]?.[code]?.level||'';}
function dateKey(d){
 const x=new Date(d);if(!Number.isFinite(x.getTime()))return null;
 return [x.getFullYear(),String(x.getMonth()+1).padStart(2,'0'),String(x.getDate()).padStart(2,'0')].join('-');
}
function activity(){
 const all=[];
 for(const a of S.attempts||[]){
  if(a&&a.completedAt&&a.evaluations?.some(e=>e&&e.assessable===true&&Number(e.rating)>=1&&Number(e.rating)<=5))
   all.push({at:a.completedAt,type:'Case completed'});
 }
 for(const t of S.tasks||[])if(t&&t.status==='done'&&t.completedAt)all.push({at:t.completedAt,type:'Learning action completed'});
 for(const p of S.resume?.proposals||[])if(p&&p.acceptedAt)all.push({at:p.acceptedAt,type:'Resume revision approved'});
 const days=new Set(all.map(x=>dateKey(x.at)).filter(Boolean));
 const today=new Date(),todayKey=dateKey(today),dayBefore=new Date(today);dayBefore.setDate(today.getDate()-1);
 const eligible=days.has(todayKey)?today:new Date(dayBefore);
 let streak=0,walk=new Date(eligible);
 while(days.has(dateKey(walk))){streak++;walk.setDate(walk.getDate()-1);}
 const unique=[...days].sort(),recent=[];
 for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(today.getDate()-i);recent.push({date:dateKey(d),weekday:d.toLocaleDateString(undefined,{weekday:'short'}),done:days.has(dateKey(d))});}
 return {streak,days:unique.length,total:all.length,recent,doneToday:days.has(todayKey)};
}
function latestScore(role,code){
 const all=[];
 for(const a of S.attempts||[]){
  if(!a||a.role!==role||!a.completedAt)continue;
  for(const e of a.evaluations||[])if(e&&e.competency===code&&e.assessable===true&&Number.isFinite(Number(e.rating))&&Number(e.rating)>=1&&Number(e.rating)<=5){
   all.push({n:Number(e.rating),variant:a.variant||'?',at:a.completedAt,source:e.source});
  }
 }
 all.sort((a,b)=>String(a.at).localeCompare(String(b.at)));
 if(!all.length)return null;
 const latest=all.at(-1),byVariant={};
 for(const x of all){const list=byVariant[x.variant]||(byVariant[x.variant]=[]);list.push(x.n);}
 const avg=(array)=>array.reduce((s,x)=>s+x,0)/array.length;
 return {latest,overall:avg(all.map(x=>x.n)),count:all.length,byVariant:Object.fromEntries(Object.entries(byVariant).map(([k,v])=>[k,avg(v)]))};
}
function calibrationSignal(level,score){
 if(!level||!score)return {label:'Awaiting comparison',cls:'neutral',detail:'Your experience and practice results are tracked separately.'};
 if(level==='independent'&&score.latest.n<=2)return {label:'Worth exploring',cls:'amber',detail:'You report independent experience, but this case revealed missing reasoning. A new scenario can help distinguish a knowledge gap from an unfamiliar question.'};
 if(level==='new'&&score.latest.n>=4)return {label:'Potential hidden strength',cls:'green',detail:'You are new to this area by self-report, yet you gave strong reasoning in this exercise. Test another example before updating confidence.'};
 if(score.count<2)return {label:'First observation',cls:'neutral',detail:'This is one case observation. Further scenarios can build confidence in the result.'};
 return {label:'Evidence developing',cls:'blue',detail:'Use the case feedback alongside real work evidence; one average does not establish professional mastery.'};
}
function scoreText(score){return score?score.overall.toFixed(1)+'/5 · '+score.count+' answer'+(score.count===1?'':'s'):'Not assessed';}
function progression(score){
 if(!score||score.byVariant.A==null||score.byVariant.B==null)return '';
 const diff=score.byVariant.B-score.byVariant.A;
 const marker=Math.abs(diff)<0.05?'Similar result':diff>0?'Improved on parallel case':'Lower on parallel case';
 return '<div class="pcSkillTrend">'+esc('Case A '+score.byVariant.A.toFixed(1)+'/5 → Case B '+score.byVariant.B.toFixed(1)+'/5 · '+marker)+'</div>';
}
function skillLegend(){return '<div class="pcLegend"><span><i class="pcDot work"></i>Resume/work description</span><span><i class="pcDot own"></i>Your own confidence</span><span><i class="pcDot observed"></i>Case performance</span></div>';}
function evidencePanel(role){
 const evidence=allEvidence(role);
 const answered=evidence.filter(e=>selection(role,e.code)).length;
 return '<section class="pcAssessment card" aria-label="Skill confidence calibration">'+
  '<div class="pcSectionHead"><div><div class="kicker">STEP 1 OF YOUR SKILL PICTURE</div><h3>What do you already feel confident doing?</h3>'+
  '<p class="subtle">A resume tells me what you have done. Your perspective helps me avoid teaching you things you already know. These are self-reports, not test scores.</p></div>'+
  '<span class="pcCompletion">'+answered+'/'+evidence.length+' selected</span></div>'+
  '<div class="pcCalibrationGrid">'+evidence.map(e=>{
    const picked=selection(role,e.code);
    return '<div class="pcCalibrationRow"><div><strong>'+esc(e.label)+'</strong><small>'+esc(e.code)+'</small></div>'+
     '<div class="pcConfidenceChoices" role="group" aria-label="Confidence in '+esc(e.label)+'">'+confidenceOptions.map(o=>'<button type="button" class="'+(picked===o.id?'selected':'')+'" data-pc-confidence="'+esc(o.id)+'" data-pc-role="'+esc(role)+'" data-pc-code="'+esc(e.code)+'" aria-pressed="'+(picked===o.id?'true':'false')+'">'+esc(o.label)+'</button>').join('')+
    '</div></div>';
  }).join('')+'</div><p class="pcHint">Optional: select only the skills you know. You can update these after practising.</p></section>';
}
function insightsPanel(role){
 const evidence=allEvidence(role);
 return '<section class="pcEvidencePanel card" aria-label="Your evidence and practice compared">'+
  '<div class="pcSectionHead"><div><div class="kicker">YOUR EVIDENCE · '+esc(roleName(role))+'</div><h3>What do we know — and what is still untested?</h3>'+
  '<p class="subtle">The three perspectives stay separate. Expand any skill to see what Pip recommends next.</p></div></div>'+
  skillLegend()+
  '<div class="pcEvidenceList">'+evidence.map((e,i)=>{
    const level=selection(role,e.code),p=confidenceOptions.find(x=>x.id===level),score=latestScore(role,e.code);
    const signal=calibrationSignal(level,score);
    const source=e.state==='work'?'Experience described':e.work?.length?'Work keyword found':e.state==='resume'?'Resume claim':e.state==='self'?'Listed skill':'No work evidence yet';
    const q=(ROLES[role].questions_A||[]).find(x=>x.competency===e.code);
    const technical=/SQL|external practice/i.test(e.label);
    return '<details class="pcSkillDetail" '+(i===0?'open':'')+'><summary><div class="pcSkillTitle">'+esc(e.label)+'</div><div class="pcSkillFacts">'+
      '<span title="Resume or work claim">'+esc(source)+'</span><span title="Your self-rating">'+esc(p?.label||'Not rated by you')+'</span>'+
      '<b>'+esc(technical?'External verification needed':scoreText(score))+'</b></div>'+
      '<span class="pcSignal '+signal.cls+'">'+esc(technical?'Not technically verified':signal.label)+'</span></summary>'+
      '<div class="pcSkillExplain"><p>'+esc(signal.detail)+'</p><p><strong>Why this status?</strong> '+esc(e.detail)+'</p>'+
      progression(score)+
      (technical?'<p>Written case answers cannot verify working SQL proficiency. Use an executable practice exercise externally.</p>':
      q?'<p><strong>Practice prompt:</strong> '+esc(q.prompt)+'</p>':'<p>This skill has not been directly tested in the current case bank; practice evidence is still pending.</p>')+
      '<div class="pcSkillActions"><a href="'+esc(resourceFor(e.code))+'" target="_blank" rel="noopener noreferrer">Learn this skill ↗</a>'+
      '<button type="button" data-pc-action="practice" data-pc-role="'+esc(role)+'">'+(score?'Try a different case →':'Practise this role →')+'</button></div></div></details>';
  }).join('')+'</div>'+
  '<p class="pcHint">A self-rating, a keyword in your CV and a case score are not interchangeable. Missing evidence does not imply a weakness. Scores are formative, not a hiring prediction.</p></section>';
}
function streakPanel(){
 const x=activity();
 return '<section class="pcStreak card" aria-label="Your meaningful learning activity">'+
  '<div class="pcStreakTop"><div><div class="kicker">KEEP BUILDING · ONE ACTION AT A TIME</div><h3>Your learning streak</h3>'+
   '<p class="subtle">Counts days with a rated case, a completed learning action, or an approved resume improvement — not page visits or chat messages.</p></div>'+
   '<div class="pcStreakNumber"><span aria-hidden="true">✦</span><strong>'+x.streak+'</strong><small>day'+(x.streak===1?'':'s')+'</small></div></div>'+
  '<div class="pcWeeklyDots">'+x.recent.map(d=>'<div title="'+esc(d.date)+'" class="'+(d.done?'done':'')+'"><span>'+esc(d.weekday)+'</span><b aria-label="'+(d.done?'Activity completed':'No activity')+'">'+(d.done?'✓':'·')+'</b></div>').join('')+'</div>'+
  '<p class="pcHint">'+x.days+' total active learning day'+(x.days===1?'':'s')+' · '+(x.doneToday?'You have already made meaningful progress today.':'A small relevant action is enough for today. No need to rush or repeat cases for points.')+'</p>'+
 '</section>';
}
window.PipLearningProgress=()=>({activity:activity(),confidence:store()});
const previousReadiness=renderReadiness;
renderReadiness=function(){
 const html=previousReadiness();const role=S.career?.activeRole;
 if(!role)return html;
 const slot='<div class="grid2" style="grid-template-columns:';
 return html.includes(slot)?html.replace(slot,streakPanel()+evidencePanel(role)+insightsPanel(role)+slot):
 html+streakPanel()+evidencePanel(role)+insightsPanel(role);
};
const previousPractice=renderPractice;
renderPractice=function(){
 let html=previousPractice();const role=S.career?.activeRole;
 if(!role)return html;
 // Show a short context card on practice entry/after completion, not during question taking.
 if(S.attempt?.role===role&&S.attempt.status!=='complete'&&S.practiceView==='case')return html;
 const slot='<div class="grid2"';
 const inline='<div class="pcPracticeNudge"><span>✦ '+activity().streak+'-day learning streak</span> Your practice is building a record of evidence. <button type="button" data-pc-action="readiness">Compare my skill evidence →</button></div>';
 return html.includes(slot)?html.replace(slot,inline+slot):inline+html;
};
document.addEventListener('click',function(event){
 const b=event.target.closest('[data-pc-confidence],[data-pc-action]');
 if(!b)return;
 event.preventDefault();event.stopPropagation();
 if(b.dataset.pcConfidence){
  const role=b.dataset.pcRole,code=b.dataset.pcCode,level=b.dataset.pcConfidence;
  if(!ROLES[role]||!ROLES[role].competencies.some(c=>c[0]===code)||!confidenceOptions.some(o=>o.id===level))return;
  const entry=store()[role]||(store()[role]={});
  entry[code]={level,updatedAt:stamp()};
  save();render();return;
 }
 if(b.dataset.pcAction==='readiness'){setRoute('readiness');return;}
 if(b.dataset.pcAction==='practice'){
  if(S.attempt?.role===S.career.activeRole&&S.attempt.status!=='complete'){S.practiceView='case';setRoute('practice');return;}
  S.practiceView='case';save();setRoute('practice');return;
 }
});
document.addEventListener('click',function(event){
 // Capture the completion time on the original action without hijacking it.
 const b=event.target.closest('[data-action="complete-task"]');if(!b)return;
 const t=S.tasks?.find(x=>x.id===b.dataset.id);
 if(t&&t.status!=='done')t.completedAt=stamp();
},true);
render();
})();