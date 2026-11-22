/* PivotPath: contextual guide, not a second chat or a notification engine.
   Pip appears at high-value transitions and stays quiet after dismissal. */
(function(){
'use strict';
function seen(){if(!S.pipGuideSeen||typeof S.pipGuideSeen!=='object')S.pipGuideSeen={};return S.pipGuideSeen;}
function activeRole(){return S.career?.activeRole||'';}
function skillCount(role){
 const all=ROLES[role]?.competencies||[];
 const selected=S.pipSkillConfidence?.[role]||{};
 return {chosen:all.filter(([code])=>['new','some','independent'].includes(selected[code]?.level)).length,total:all.length};
}
function firstCaseAction(role){
 const unfinished=S.attempt?.role===role&&S.attempt?.status!=='complete';
 if(unfinished)return {label:'Resume my case',action:'resume-case'};
 const firstDone=(S.attempts||[]).some(a=>a.role===role&&a.variant==='A'&&a.completedAt);
 const secondDone=(S.attempts||[]).some(a=>a.role===role&&a.variant==='B'&&a.completedAt);
 if(firstDone&&!secondDone)return {label:'Try a different case',action:'reassess'};
 if(firstDone&&secondDone)return {label:'Review skill progress',action:'evidence'};
 return {label:'Start my first case',action:'start-case'};
}
function nextMoment(){
 if(S.stage==='welcome'||!S.profile?.verified)return null;
 const role=activeRole();
 if(!role&&S.route==='discovery'&&S.discoveryStep>=3){
  return {key:'role-options',title:'You choose the direction',body:'Look through the career paths and pick the one you want to explore. We will test the skills afterwards.',label:'Explore the roles',action:'roles'};
 }
 if(!role)return null;
 if(S.route==='readiness'){
  const {chosen,total}=skillCount(role);
  if(total>0&&chosen===total){
   const next=firstCaseAction(role);
   return {key:'skill-picture-complete:'+role,title:'Your starting picture is ready',body:'Thanks. Those are your own ratings, not test scores. Next, let’s try a case and see what your answers actually demonstrate.',label:next.label,action:next.action};
  }
  if(chosen===0){
   return {key:'readiness-intro:'+role,title:'Start with what you know',body:'The map starts with your resume. Tell me which skills feel familiar; you can leave any uncertain ones unanswered.',label:'Check my skills',action:'confidence'};
  }
  // Deliberately quiet after 1–(n-1) selections: no nudge on every tap.
  return null;
 }
 if(S.route==='practice'&&S.practiceView==='case'&&S.attempt?.role===role){
  const a=S.attempt;
  if(a.status==='complete'){
   const next=firstCaseAction(role);
   return {key:'case-finished:'+role+':'+(a.id||a.caseId||'')+':'+(a.completedAt||''),title:'You completed a case',body:'Your answers are saved. Let’s review the specific skills before moving on to another scenario.',label:'Review my skill evidence',action:'evidence'};
  }
  if(a.status==='feedback'&&a.index===0){
   return {key:'first-feedback:'+role+':'+(a.id||a.caseId||''),title:'Turn feedback into progress',body:'You have your first piece of case feedback. A short worked lesson can help before you continue.',label:'Learn this concept',action:'lesson'};
  }
 }
 return null;
}
let displayedKey='';
function removeTip(){const tip=document.getElementById('pipGuideTip');if(tip)tip.remove();document.getElementById('coachFloat')?.classList.remove('pipGuideMoment');displayedKey='';}
function show(){
 const float=document.getElementById('coachFloat');
 if(!float||S.stage==='welcome'||S.coachOpen||S.coachMuted||S.pipGuideDisabled){removeTip();return;}
 const m=nextMoment();
 if(!m){removeTip();return;}
 if(displayedKey===m.key&&document.getElementById('pipGuideTip'))return;
 if(seen()[m.key]){removeTip();return;}
 removeTip();
 const tip=document.createElement('section');tip.id='pipGuideTip';tip.className='pipGuideTip';
 tip.setAttribute('role','status');tip.setAttribute('aria-live','polite');
 tip.innerHTML='<div class="pipGuideTipTop"><span class="pipGuideEyebrow">PIP · YOUR NEXT STEP</span>'+
  '<button type="button" data-pg-action="dismiss" aria-label="Dismiss this suggestion">×</button></div>'+
  '<strong class="pipGuideTitle">'+esc(m.title)+'</strong><p>'+esc(m.body)+'</p>'+
  '<button type="button" class="pipGuidePrimary" data-pg-action="next">'+esc(m.label)+' →</button>'+
  '<div class="pipGuideSecondary"><button type="button" data-pg-action="chat">Ask Pip instead</button>'+
  '<button type="button" data-pg-action="mute">Turn off tips</button></div>';
 tip.dataset.momentKey=m.key;tip.dataset.momentAction=m.action;
 float.insertBefore(tip,float.firstChild);float.classList.add('pipGuideMoment');
 displayedKey=m.key;
 seen()[m.key]={shownAt:new Date().toISOString()};
 save();
}
function act(action){
 const role=activeRole();
 if(action==='confidence'){document.querySelector('.pcAssessment')?.scrollIntoView({behavior:'smooth',block:'start'});return;}
 if(action==='roles'){document.querySelector('.roleRow')?.scrollIntoView({behavior:'smooth',block:'start'});return;}
 if(action==='evidence'){setRoute('readiness');requestAnimationFrame(()=>document.querySelector('.pcEvidencePanel')?.scrollIntoView({behavior:'smooth',block:'start'}));return;}
 if(action==='lesson'){
  const lesson=document.querySelector('[data-pip-action="lesson"]');
  if(lesson){lesson.click();return;}
  if(typeof window.PipOpenWarmup==='function'){window.PipOpenWarmup();return;}
 }
 if(action==='resume-case'){S.practiceView='case';save();setRoute('practice');return;}
 if(action==='reassess'&&role){beginCase(role,'B');return;}
 if(action==='start-case'&&role){beginCase(role,'A');return;}
}
function preference(){
 const main=document.getElementById('main');if(!main||S.route!=='profile')return;
 if(main.querySelector('.pipGuidePreference'))return;
 const el=document.createElement('div');el.className='pipGuidePreference';
 el.innerHTML='<span><strong>Proactive tips from Pip</strong><small>Brief guidance at important milestones. The chat stays available either way.</small></span>'+
  '<button type="button" data-pg-action="toggle">'+(S.pipGuideDisabled?'Turn tips on':'Turn tips off')+'</button>';
 main.appendChild(el);
}
document.addEventListener('click',function(e){
 const btn=e.target.closest('[data-pg-action]');if(!btn)return;
 e.preventDefault();e.stopPropagation();
 const action=btn.dataset.pgAction,tip=document.getElementById('pipGuideTip');
 if(action==='dismiss'){removeTip();return;}
 if(action==='mute'||action==='toggle'){
  S.pipGuideDisabled=action==='mute'?true:!S.pipGuideDisabled;save();render();return;
 }
 if(action==='chat'){removeTip();if(!S.coachOpen){S.coachOpen=true;save();renderCoach();}document.getElementById('coachInput')?.focus();return;}
 if(action==='next'&&tip){const next=tip.dataset.momentAction;removeTip();act(next);}
});
const priorCoach=renderCoach;
renderCoach=function(){priorCoach();show();};
const priorRender=render;
render=function(){priorRender();preference();show();};
render();
})();