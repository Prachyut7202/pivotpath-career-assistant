/* PivotPath learning progress — question-weighted roll-up and gentle unscored warm-up.
   Never call this a hiring-readiness score. Restrict each calculation to one
   selected role and completed assessable answers. No fabricated baselines. */
(function(){
'use strict';
const score=(v)=>Number.isFinite(Number(v))&&Number(v)>=1&&Number(v)<=5?Number(v):null;
const nice=n=>Number(n).toFixed(1);
function summary(role){
 const unique=new Map();
 for(const a of S.attempts||[]){
   if(!a||a.role!==role||!a.completedAt||!Array.isArray(a.evaluations))continue;
   unique.set(a.id||a.caseId+'-'+a.completedAt,a);
 }
 const cases=[...unique.values()];
 let total=0,count=0,all=[],per={},last=[],demo=false,live=false;
 for(const a of cases){
  let csum=0,cn=0,cv=[];
  for(const e of a.evaluations){
   if(!e||e.assessable!==true)continue;
   const rating=score(e.rating);if(rating===null)continue;
   count++;total+=rating;cn++;csum+=rating;
   if(e.source==='demo')demo=true;
   if(e.source==='live')live=true;
   if(!per[e.competency])per[e.competency]={sum:0,count:0,last:0};
   per[e.competency].sum+=rating;per[e.competency].count++;per[e.competency].last=rating;
   cv.push(rating);
  }
  last.push({caseId:a.caseId||a.id,variant:a.variant||'Case',avg:cn?csum/cn:null,count:cn,
    completedAt:a.completedAt||'',demo:a.evaluations.some(e=>e&&e.source==='demo')});
 }
 const avg=count?total/count:null;
 const completed=cases.length;
 const distinct=new Set(cases.map(a=>a.variant).filter(Boolean)).size;
 const latest=last.filter(x=>x.avg!==null).slice(-2);
 let delta=latest.length===2?latest[1].avg-latest[0].avg:null;
 const newest=cases.at(-1);
 const latestValid=(newest?.evaluations||[]).filter(e=>e&&e.assessable&&score(e.rating)!==null).map(e=>score(e.rating));
 const latestNoLow=latestValid.length>=4&&latestValid.every(n=>n>=3);
 const hasEnoughEvidence=completed>=2&&distinct>=2&&count>=8&&latestNoLow&&avg>=3.5&&!demo;
 let title='Start with a gentle warm-up',step='Complete an unscored mini-lesson, then try the first case';
 if(count){
  if(hasEnoughEvidence){title='Ready to try a harder mock';step='You have met this demo’s practice progression criteria. Keep applying, learning, and validating skills externally';}
  else if(avg<2.5){title='Build the foundations';step='Choose one low-scoring competency and try the guided warm-up before reassessing';}
  else if(avg<3.5){title='Developing your approach';step='Use the feedback to strengthen one skill, then try a different scenario';}
  else if(distinct<2){title='Promising first case — repeat elsewhere';step='Try another case to see whether the reasoning transfers';}
  else {title='Progressing — focus on remaining gaps';step='Revisit the lowest area and retest it. Do not treat one average as a pass mark';}
 }
 const source=demo&&live?'Mixed live + demo scores':demo?'Illustrative demo scores':live?'Live AI formative ratings':'No assessed questions yet';
 return {role,cases,completed,distinct,count,avg,delta,per,latest,source,hasEnoughEvidence,title,step,demo,live};
}
function arrow(delta){if(delta===null)return 'Need two scored cases';if(Math.abs(delta)<0.05)return 'No change';return(delta>0?'+':'')+nice(delta)+'/5 vs previous case'}
function overallMarkup(s){
 const avg=s.avg===null?'—':nice(s.avg);
 const has=s.count>0;
 const width=has?Math.max(0,Math.min(100,(s.avg/5)*100)):0;
 const blocks=s.cases.filter(x=>x.evaluations?.some(e=>e?.assessable&&score(e.rating)!==null)).map((a,i)=>{
   const valid=a.evaluations.filter(e=>e?.assessable&&score(e.rating)!==null);
   const aavg=valid.reduce((n,e)=>n+score(e.rating),0)/valid.length;
   return '<div class="ppCaseTrend"><span>Case '+esc(a.variant||String(i+1))+' · '+valid.length+' questions</span><strong>'+nice(aavg)+'/5</strong></div>';
 }).slice(-5).join('');
 return '<section class="ppProgressCard" aria-label="Overall practice progress">'+
  '<div class="ppProgressTop"><div><span class="ppEyebrow">YOUR PRACTICE PROGRESS · '+esc(roleName(s.role))+'</span>'+
  '<h3>How am I doing overall?</h3><p>One average across all completed, assessable questions for this career goal.</p></div>'+
  '<div class="ppScore"><strong>'+avg+'</strong><span>/5</span></div></div>'+
  '<div class="ppBar" role="img" aria-label="'+(has?'Average '+avg+' out of 5':'No assessment rating yet')+'"><i style="width:'+width+'%"></i></div>'+
  '<div class="ppProgressMeta"><span><b>'+s.count+'</b> rated question'+(s.count===1?'':'s')+'</span><span><b>'+s.completed+'</b> completed case'+(s.completed===1?'':'s')+'</span><span><b>'+esc(arrow(s.delta))+'</b> trend</span></div>'+
  '<div class="ppProgressAdvice"><strong>'+esc(s.title)+'</strong><p>'+esc(s.step)+'.</p></div>'+
  (blocks?'<details class="ppCaseDetails"><summary>See scores for each completed case</summary><div>'+blocks+'</div></details>':'')+
  '<div class="ppPracticeControls"><button type="button" data-pp-action="warmup">Try a 3-minute warm-up</button>'+
  '<button type="button" data-pp-action="insights">See my full progress</button></div>'+
  '<p class="ppScoreDisclaimer">'+esc(s.source)+'. Practice thresholds are illustrative learning milestones, not employer benchmarks, hiring probability, or verified technical proficiency. You can apply for roles at any stage.</p>'+
  '</section>';
}
function progressDetails(s){
 if(!s.count)return '<p class="ppNoScores">No graded case answers yet. Start with a warm-up; its questions are deliberately not graded.</p>';
 const list=Object.entries(s.per).sort((a,b)=>a[1].sum/a[1].count-b[1].sum/b[1].count);
 return '<section class="ppCompetencyBreakdown"><h4>Where should I focus?</h4><p>Each competency average uses all completed rated questions that tested it, not just the most recent attempt.</p>'+
 list.map(([code,d])=>{
  const label=ROLES[s.role]?.competencies?.find(c=>c[0]===code)?.[1]||code;
  const value=d.sum/d.count;
  return '<div class="ppCompRow"><div><strong>'+esc(label)+'</strong><span>'+d.count+' scored answer'+(d.count===1?'':'s')+'</span></div><strong>'+nice(value)+'/5</strong></div>';
 }).join('')+
 '<p class="ppSkillCaution">A missing or lower score is a practice signal, not a verdict about your professional ability. Practical SQL/Python skills need separate hands-on verification.</p></section>';
}
const WARMUPS={
 PA:[
  {scenario:'An app had 100 new users this week. 40 completed onboarding.',q:'How would you describe the activation rate?',choices:['40% of new users activated','40 users is already the percentage','We cannot measure anything'],correct:0,explain:'Divide activated users by new users: 40 ÷ 100 = 40%. State the denominator and time window.'},
  {scenario:'Activation was 50% last week and 40% this week. Tracking changed yesterday.',q:'What should you investigate first?',choices:['Launch a new feature immediately','Check whether events and cohorts are comparable','Assume the product is failing'],correct:1,explain:'Validate tracking definitions, affected users and the comparison period before blaming a product change.'},
  {scenario:'A product team can improve only one part of onboarding.',q:'Which is the best starting point?',choices:['Pick the idea with the loudest supporter','Clarify user friction, impact, and effort','Measure only total downloads'],correct:1,explain:'Frame the affected users and expected outcome; compare impact, confidence and effort before prioritizing.'}
 ],
 APM:[
  {scenario:'Customers say signup is confusing, and the team proposes three features.',q:'What should a PM do first?',choices:['Define the user problem and intended outcome','Choose a feature randomly','Skip user evidence'],correct:0,explain:'Start by defining the user segment and measurable need, not a preferred feature.'},
  {scenario:'Only one improvement fits in the next sprint.',q:'What is a credible prioritization approach?',choices:['Only seniority','User value, evidence, effort and risk','Only which idea is newest'],correct:1,explain:'Make the trade-off transparent and use available evidence.'},
  {scenario:'The feature has launched.',q:'What comes next?',choices:['Ignore it','Measure adoption, quality and customer feedback','Assume success'],correct:1,explain:'A product loop closes by checking user outcomes and learning from the results.'}
 ],
 DEFAULT:[
  {scenario:'A business metric unexpectedly changes.',q:'What comes first?',choices:['Clarify the metric, timeframe, and user segment','Announce a cause without checking','Pick a solution immediately'],correct:0,explain:'Start with a precise problem definition and verify the data.'},
  {scenario:'You want to recommend a change to a business team.',q:'Which evidence is strongest?',choices:['A guess alone','Comparable data and a clear hypothesis','A long presentation'],correct:1,explain:'Tie the recommendation to comparable evidence, assumptions and expected outcomes.'},
  {scenario:'The change has been implemented.',q:'How do you judge whether it helped?',choices:['Track outcome and guardrail metrics','Assume it worked','Stop looking at the data'],correct:0,explain:'Closing the loop means measuring changes and learning.'}
 ]
};
function warmupState(){
 const role=S.career.activeRole||'PA';
 if(!S.pipWarmup||S.pipWarmup.role!==role)S.pipWarmup={role,index:0,answers:[],done:false};
 return S.pipWarmup;
}
function renderWarmup(){
 const st=warmupState(),set=WARMUPS[st.role]||WARMUPS.DEFAULT;
 const idx=Math.max(0,Math.min(set.length-1,st.index));const q=set[idx];
 const chosen=st.answers[idx];const answered=Number.isInteger(chosen);
 const end=st.done;
 let box=document.getElementById('ppWarmup');
 if(!box){box=document.createElement('div');box.id='ppWarmup';box.className='ppWarmupOverlay';document.body.appendChild(box);}
 box.innerHTML='<section class="ppWarmupPanel" role="dialog" aria-modal="true" aria-label="Pip guided practice warm-up">'+
 '<header><span>🐣 PIP · GENTLE PRACTICE</span><button type="button" data-pp-action="close-warmup" aria-label="Close">✕</button></header>'+
 (end?'<div class="ppWarmupBody"><h2>Great — you finished your warm-up!</h2><p>This was just practice, not a graded assessment. You can now try a full case or revisit your Readiness Map.</p>'+
 '<div class="ppWarmupButtons"><button type="button" data-pp-action="go-case">Try my full case →</button><button type="button" data-pp-action="close-warmup">Return to my map</button></div></div>':
 '<div class="ppWarmupBody"><div class="ppWarmupStep">STEP '+(idx+1)+' OF '+set.length+' · NO SCORE, NO PRESSURE</div>'+
 '<h2>Build your confidence, one idea at a time.</h2><div class="ppWarmupScenario">'+esc(q.scenario)+'</div><h3>'+esc(q.q)+'</h3>'+
 '<div class="ppWarmupAnswers">'+q.choices.map((ch,i)=>
 '<button type="button" data-pp-action="choose-warmup" data-index="'+i+'" class="'+(answered?(i===q.correct?'ppCorrect':i===chosen?'ppIncorrect':''):'')+'">'+esc(ch)+'</button>').join('')+'</div>'+
 (answered?'<div class="ppWarmupExplanation"><strong>'+(chosen===q.correct?'That’s right.':'Here is the reasoning.')+'</strong><p>'+esc(q.explain)+'</p></div>':'<p class="ppWarmupHint">Pick whichever seems most sensible. I’ll explain the reasoning; this won’t affect your progress score.</p>')+
 '<div class="ppWarmupButtons"><button type="button" data-pp-action="next-warmup" '+(answered?'':'disabled')+'>'+(idx===set.length-1?'Finish warm-up →':'Next example →')+'</button>'+
 '<button type="button" data-pp-action="close-warmup">I’ll come back later</button></div></div>')+
 '</section>';
}
function openWarmup(){warmupState();renderWarmup();}
window.PipOpenWarmup=openWarmup;
window.PipProgressSummary=summary;
const baseReadiness=renderReadiness;
renderReadiness=function(){
 let html=baseReadiness();if(!S.career.activeRole)return html;
 html=html.replace(/case gaps observed/g,'practice areas to develop')
   .replace(/<b>Weaknesses<\/b>/g,'<b>Practice focus</b>')
   .replace(/Practice gap/g,'Practice focus');
 const s=summary(S.career.activeRole),section=overallMarkup(s)+progressDetails(s);
 return html.replace('<div class="grid2" style="grid-template-columns:',section+'<div class="grid2" style="grid-template-columns:');
};
const basePractice=renderPractice;
renderPractice=function(){
 const html=basePractice();if(!S.career.activeRole)return html;
 const s=summary(S.career.activeRole);
 // Omit summary from the focused question-taking screen to reduce cognitive
 // load, but show it on practice entry, completion, plan and history.
 if(S.attempt?.role===S.career.activeRole&&S.attempt.status!=='complete'&&S.practiceView==='case')return html;
 const marker='<div class="grid2"';
 if(!html.includes(marker))return overallMarkup(s)+html;
 return html.replace(marker,overallMarkup(s)+marker);
};
const originalHistory=renderAttemptHistory;
renderAttemptHistory=function(){
 const html=originalHistory();return progressDetails(summary(S.career.activeRole))+html;
};
document.addEventListener('click',function(e){
 const b=e.target.closest('[data-pp-action]');if(!b)return;
 e.preventDefault();e.stopPropagation();
 const action=b.dataset.ppAction;
 if(action==='warmup'){openWarmup();return;}
 if(action==='close-warmup'){document.getElementById('ppWarmup')?.remove();return;}
 if(action==='choose-warmup'){
   const st=warmupState(),i=Number(b.dataset.index);
   if(Number.isInteger(i)&&i>=0&&i<=2){st.answers[st.index]=i;save();renderWarmup();}return;
 }
 if(action==='next-warmup'){
   const st=warmupState();
   if(!Number.isInteger(st.answers[st.index]))return;
   const n=(WARMUPS[st.role]||WARMUPS.DEFAULT).length;
   if(st.index+1>=n)st.done=true;else st.index++;
   save();renderWarmup();return;
 }
 if(action==='go-case'){
   document.getElementById('ppWarmup')?.remove();
   const a=S.attempt,role=S.career.activeRole;
   if(a&&a.role===role&&a.status!=='complete'){S.practiceView='case';setRoute('practice');}
   else if(typeof beginCase==='function')beginCase(role,'A');
   return;
 }
 if(action==='insights'){S.practiceView='history';save();setRoute('practice');return;}
});
const baseRender=render;
render=function(){baseRender();};
render();
})();