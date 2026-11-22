/* Pip Journey Orchestrator v1
   Pip is the navigation guide. Groq helps with reasoning and explanations,
   but user-approved actions and return points are deterministic.
   State persists inside the existing visitor-local PivotPath workspace.
*/
(function(){
  'use strict';
  const allowed=['discovery','readiness','practice','resume','profile'];
  const human={discovery:'Career Discovery',readiness:'Readiness Map',practice:'Practice & Improve',resume:'Living Resume',profile:'Career Profile'};
  const maxStack=4;
  function state(){
    if(!S.pipJourney||typeof S.pipJourney!=='object')S.pipJourney={history:[],lastOptions:[],goal:'',lastScene:'',resumeBaseline:0,completedDetours:0};
    const j=S.pipJourney;
    if(!Array.isArray(j.history))j.history=[];
    if(!Array.isArray(j.lastOptions))j.lastOptions=[];
    j.goal=S.career?.activeRole||S.career?.aspiration||j.goal||'';
    return j;
  }
  function goalName(){const id=S.career?.activeRole||S.career?.aspiration;return id&&ROLES[id] ? roleName(id):'your chosen career direction'}
  function slug(){return String(S.route||'discovery')}
  function escapeHtml(v){return esc(String(v??''))}
  function playbook(){
    const j=state(),r=slug(),role=goalName();
    if(!S.profile?.verified)return {step:'Confirm your experience',desc:'First confirm your career facts. Then we can explore a role and test readiness.',buttons:[['Review my profile','profile'],['Explore careers','discovery']]};
    if(!S.career?.activeRole)return {step:'Choose a career goal',desc:'Choose one of the six destinations. You can reconsider later.',buttons:[['Explore career paths','discovery']]};
    if(j.history.length && (r==='resume'||r==='profile')){
      const prior=j.history[j.history.length-1];
      const destination=human[prior.route]||'your previous step';
      const savedProgress=prior.route==='practice'&&S.attempt&&S.attempt.status!=='complete'
        ? 'Your in-progress assessment stays saved.' : 'Your career goal stays unchanged.';
      return {step:'Resume detour for '+role,desc:'You came here from '+destination+'. '+savedProgress,
        buttons:[['Return to '+destination,'return'],['Edit resume','resume-edit'],['Check readiness','readiness']]};
    }
    if(r==='discovery')return {step:'Explore → choose → check',desc:'Your selected goal is '+role+'. Review the relevant expectations, then test what you already know.',buttons:[['Check '+role+' readiness','readiness'],['Explore other roles','discovery']]};
    if(r==='readiness'){
      const openCase=S.attempt&&S.attempt.role===S.career.activeRole&&S.attempt.status!=='complete';
      return {step:'Evidence → practice',desc:'Your map distinguishes described experience, tested skills and still-unassessed areas. '+(openCase?'You have an unfinished case to resume.':'Start a short case to gather actual evidence.'),
       buttons:[openCase?['Resume my case','practice']:['Start a role-specific case','start-case'],['Tailor my resume, then return','resume-detour'],['Explore role focus','skill-focus']]};
    }
    if(r==='practice'){
      if(S.practiceView==='plan')return {step:'Plan → learn → reassess',desc:'Work through one targeted learning action, then test again on a different case.',buttons:[['Return to case','practice-case'],['Check readiness','readiness'],['Tailor resume and come back','resume-detour']]};
      const a=S.attempt;
      if(!a)return {step:'Try → review → improve',desc:'Start the first five-question case. After each answer, review feedback and learn before reassessing.',buttons:[['Start case A','start-case'],['Review readiness','readiness']]};
      if(a.status==='complete'){
        const hasA=S.attempts.some(x=>x.role===S.career.activeRole&&x.variant==='A');
        return {step:'Case completed → close the loop',desc:'Your case evidence is saved. Check readiness, review the improvement plan, and use a distinct reassessment case.',buttons:[['See updated readiness','readiness'],['My improvement plan','plan'],[hasA?'Try different case B':'Practice again',hasA?'reassess':'start-case']]};
      }
      if(a.status==='feedback')return {step:'Review → learn → continue',desc:'You have feedback for question '+(a.index+1)+'. Learn the concept, then continue this case; your answer is saved.',buttons:[['Learn this concept','lesson'],['Continue the case','next-question'],['See my improvement plan','plan']]};
      return {step:'Answer → get feedback',desc:'You are on question '+(a.index+1)+' of five. You can ask for a hint, or save your reasoning for feedback.',buttons:[['Focus on my answer','focus-answer'],['Hint without the answer','hint'],['Tailor resume and return','resume-detour']]};
    }
    if(r==='resume')return {step:'Draft → review → return',desc:'Keep only accurate achievements in the one-page resume. Every AI suggestion needs your approval. Return to your '+role+' readiness when finished.',buttons:[['Improve a resume bullet','resume-edit'],['Return to readiness','readiness'],['Explore career options','discovery']]};
    if(r==='profile')return {step:'Update → confirm → continue',desc:'Your profile is the source of career facts. Confirm changes and return to the same career goal.',buttons:[['Review my career path','discovery'],['Check readiness','readiness']]};
    return {step:'Continue your journey',desc:'Your career objective stays active as you move through the workspace.',buttons:[['My readiness','readiness']]};
  }
  function stableActions(actions){
    const names=new Set();
    return actions.filter(([label,act])=>allowed.includes(act)||['return','resume-edit','resume-detour','start-case','reassess','plan','lesson','focus-answer','hint','next-question','practice-case','skill-focus'].includes(act))
      .filter(([l,a])=>{if(names.has(a))return false;names.add(a);return true}).slice(0,3);
  }
  function emit(message,opts={}){
    S.chat.push({who:'pip',text:String(message).slice(0,1200),pipJourney:true});
    if(S.chat.length>90)S.chat=S.chat.slice(-90);
    if(opts.buttons)state().lastOptions=stableActions(opts.buttons);
    save();
    renderCoach();
  }
  function snapshot(){
    return {route:slug(),practiceView:S.practiceView||'case',
       role:S.career.activeRole||'',attemptId:S.attempt?.id||'',index:S.attempt?.index||0,
       savedAt:new Date().toISOString()};
  }
  function go(route){
    if(!allowed.includes(route))return;
    if(route==='practice')S.practiceView='case';
    save();setRoute(route);
  }
  function navigate(action){
    const j=state(),goal=goalName();
    if(action==='resume-detour'){
      if(S.route!=='resume'){
        const point=snapshot();
        if(j.history.length>=maxStack)j.history.shift();
        if(j.history[j.history.length-1]?.route!==point.route)j.history.push(point);
        j.resumeBaseline=Number(S.resume?.proposals?.length||0)+Number(S.resume?.history?.length||0);
      }
      S.coachGoal='resume';save();go('resume');
      emit('We’re refining your resume for '+goal+'. Your previous step is bookmarked. Choose an existing bullet to edit or ask me for a factual rewrite, then use “Return to previous step.”');
      return;
    }
    if(action==='return'){
      const previous=j.history.pop();
      if(!previous){
        go('readiness');emit('You’re back on the '+goal+' Readiness Map. We can continue from here.');return;
      }
      // Return to the exact workspace and saved case. Never restart an
      // assessment or discard existing answers for a temporary detour.
      if(previous.role&&S.career.activeRole!==previous.role){
        j.history.push(previous);save();
        emit('Your selected career goal changed during the detour. To avoid mixing assessment evidence, I kept your return point. Choose the intended goal in Career Discovery first.',
          {buttons:[['Career Discovery','discovery']]});return;
      }
      const edits=Number(S.resume?.proposals?.length||0)+Number(S.resume?.history?.length||0)-Number(j.resumeBaseline||0);
      if(edits>0)j.completedDetours=Number(j.completedDetours||0)+1;
      S.practiceView=previous.practiceView||'case';
      S.coachGoal='career_exploration';
      save();setRoute(previous.route);
      emit((edits>0?'Your resume changes are saved. ':'Your resume detour is finished. ')+'Welcome back to '+(human[previous.route]||'your previous step')+' for '+goal+'. Your case answers and readiness evidence are intact. Continue where you paused.');
      return;
    }
    if(action==='start-case'){
      const a=S.attempt;
      if(a&&a.role===S.career.activeRole&&a.status!=='complete'){
        S.practiceView='case';save();go('practice');
        emit('Your existing assessment is still in progress. I’ve reopened question '+(a.index+1)+' instead of restarting it.');
      } else {
        beginCase(S.career.activeRole,'A');
        emit('Your first case is open. Answer the current question in your own words, then submit it for evidence-based feedback.');
      }
      return;
    }
    if(action==='reassess'){
      if(!S.attempts.some(x=>x.role===S.career.activeRole&&x.variant==='A')){
        emit('Complete case A before reassessment. Your work so far is saved.',{buttons:[['Resume or start case A','start-case']]});return;
      }
      beginCase(S.career.activeRole,'B');emit('Now you’re attempting a different scenario. We’ll compare the demonstrated reasoning with your first case rather than assuming improvement.');return;
    }
    if(action==='resume-edit'){
      if(S.route!=='resume'){navigate('resume-detour');return;}
      if(typeof modal!=='undefined'){modal={type:'newBullet'};renderModal();}
      emit('Select an existing bullet or describe a project you actually worked on. I’ll suggest wording for your review, never invent outcomes. When finished, use the return button to continue your career goal.');
      return;
    }
    if(action==='plan'){S.practiceView='plan';save();go('practice');emit('Here’s the improvement plan tied to your case evidence. Choose one task, learn the concept, then reassess.');return;}
    if(action==='practice-case'){S.practiceView='case';save();go('practice');return;}
    if(action==='lesson'){if(typeof window.PipStartLesson==='function')window.PipStartLesson();else emit('Open the current feedback and practice the underlying concept.');return;}
    if(action==='next-question'){
      const a=S.attempt;
      if(a?.status!=='feedback'){emit('Please submit the current answer before continuing.');return;}
      if(a.index>=4){finalizeCase();emit('Case complete. Review the updated readiness evidence, then choose the improvement plan or a different reassessment scenario.');}
      else {a.index++;a.status='question';save();go('practice');emit('Question '+(a.index+1)+' is ready. Your previous evaluation remains saved.');}
      return;
    }
    if(action==='focus-answer'){go('practice');document.getElementById('caseAnswer')?.focus();return;}
    if(action==='hint'){
      const a=S.attempt,q=currentQ();
      if(!a||!q){emit('Start a case first, then I can provide a hint.');return;}
      S.coachGoal='practice';save();baseSend('Give one short hint for this case without stating the answer: '+q.prompt);return;
    }
    if(action==='skill-focus'){
      go('readiness');
      emit('For '+goal+', choose a competency on the map—such as funnels, hypotheses or KPI design. Use its “Why?” explanation or start practice. A missing resume keyword is not a failed skill assessment.');
      return;
    }
    if(allowed.includes(action)){
      if(action==='discovery')S.discoveryStep=3;
      if(action==='practice')S.practiceView='case';
      go(action);
      if(action==='readiness')emit('This is your '+goal+' readiness map. The next closed loop is to test a competency, learn from its feedback and return here to see what changed.');
      else if(action==='discovery')emit('Your career goal is still '+goal+'. Explore alternatives whenever you like; we will not silently switch it.');
      else if(action==='resume')emit('Let’s focus on truthful, role-relevant resume evidence. You can return to '+goal+' readiness afterward.');
      else if(action==='practice')emit('Let’s continue the current case without losing your earlier answers.');
    }
  }
  let baseSend=sendCoach;
  function infer(text){
    const t=String(text).trim().toLowerCase();
    const j=state();
    if(/^(?:what should i do next\??|what next\??|next step\??|guide me\??|where should i go\??)$/.test(t))return 'options';
    if(/(?:return|go back|take me back|resume my earlier step|back to my goal|back to readiness|back to (?:my )?(?:product analyst|product manager|career goal|chosen role)|finished with (?:my |the )?resume)/.test(t) || (j.history.length && /^(?:done|i'm done|finished|that's done|all done)$/.test(t)))return j.history.length?'return':'readiness';
    if(/(?:start|take|open|go to|show|review|check|see).{0,22}(?:readiness|skill map)/.test(t))return 'readiness';
    if(/(?:start|begin|take|do|try|resume).{0,26}(?:case|assessment|practice|quiz)/.test(t))return 'start-case';
    if(/(?:another|different|second|new).{0,18}(?:case|assessment|scenario)|reassess/.test(t))return 'reassess';
    if(/(?:open|go to|start|view|explore).{0,25}(?:career paths|career discovery|other roles)/.test(t))return 'discovery';
    if(/(?:improve|rewrite|tailor|polish|edit|sharpen|work on|help (?:me )?with).{0,42}(?:resume|cv|bullet)/.test(t)
       ||/(?:resume|cv).{0,24}(?:first|now)/.test(t))return 'resume-detour';
    if(/(?:profile|career history).{0,18}(?:edit|update)|(?:edit|update).{0,22}(?:profile|career history)/.test(t))return 'profile';
    if(/(?:learning plan|improvement plan|action plan)/.test(t))return 'plan';
    if(/(?:learn this|explain the concept|teach me this)/.test(t)&&S.route==='practice')return 'lesson';
    if(/^(?:continue|let's continue|go ahead|next)$/.test(t))return j.history.length&&S.route==='resume'?'return':(j.lastOptions.length===1?j.lastOptions[0][1]:'options');
    // Resolve "first one" against the exact options shown by Pip, not a new AI
    // guess. If old unstructured dialogue is ambiguous, request a clear click.
    let index = /^(?:first one|first option|option one|1|1st|the first)$/.test(t)?0:
      /^(?:second one|second option|option two|2|2nd|the second)$/.test(t)?1:
      /^(?:third one|third option|3|3rd|the third)$/.test(t)?2:-1;
    if(index>=0)return j.lastOptions[index]?.[1]||'options';
    if(/^(?:yes|sure|okay|ok|yeah)$/.test(t))return j.lastOptions.length===1?j.lastOptions[0][1]:'options';
    if(/(?:focus on|dive into|specific|learn about).{0,32}(?:product analyst|pa role|analyst role|career role)/.test(t))return 'skill-focus';
    return null;
  }
  function currentOptions(){
    const j=state(),current=playbook();
    const options=stableActions(current.buttons);
    j.lastOptions=options;
    save();return {current,options};
  }
  function showOptions(){
    const {current,options}=currentOptions();
    emit('Your long-term goal is '+goalName()+'. '+current.desc+' Choose one action below; I’ll take you there and keep your progress.',{buttons:options});
  }
  async function orchestratedSend(text){
    text=String(text||'').trim();if(!text)return;
    const intent=infer(text);
    if(intent!==null){
      S.chat.push({who:'user',text:text.slice(0,600)});
      if(S.chat.length>90)S.chat=S.chat.slice(-90);
      save();
      if(intent==='options')showOptions();
      else navigate(intent);
      return;
    }
    // Preserve conversation intelligence for open-ended questions. The
    // journey card remains visible for actionable next steps afterward.
    const prior=S.chat.length;
    await baseSend(text);
    if(S.chat.length>prior&&S.chat[S.chat.length-1]?.who==='pip'){
      const m=S.chat[S.chat.length-1];
      if(m.text&&typeof m.text==='string'&&!m.text.includes('guided demo advice')){
        // The provider may separately emit a question in reply + follow_up.
        // Keep only the first question; one decision per coaching turn.
        const first=m.text.indexOf('?');
        if(first>=0&&m.text.indexOf('?',first+1)>=0){
          const opening=m.text.slice(0,first+1).trim();
          if(opening.length>=15){m.text=opening;save();}
        }
      }
      renderCoach();
    }
  }
  sendCoach=orchestratedSend;
  function actionMarkup(arr){return arr.map(([label,act])=>
   '<button type="button" data-journey-action="'+escapeHtml(act)+'">'+escapeHtml(label)+'</button>').join('')}
  const originalRenderCoach=renderCoach;
  renderCoach=function(){
    originalRenderCoach();
    if(S.stage==='welcome')return;
    const messages=document.getElementById('coachMessages'),quick=document.getElementById('coachQuick');
    if(!messages||!quick)return;
    const j=state(),info=playbook(),opts=stableActions(info.buttons);
    // Show the current goal and next steps below messages, not another question
    // from Groq. Action buttons are real navigation, not decorative prompts.
    messages.insertAdjacentHTML('beforeend',
      '<section class="pipJourneyCard" aria-label="Your career journey">'+
      '<span class="pipJourneyGoal">YOUR ACTIVE GOAL · '+escapeHtml(goalName())+'</span>'+
      '<strong>'+escapeHtml(info.step)+'</strong><p>'+escapeHtml(info.desc)+'</p>'+
      '<div class="pipJourneyCardActions">'+actionMarkup(opts)+'</div>'+
      '</section>');
    const persistent=j.history.length?[['↶ Return to saved step','return']]:[];
    const shortcuts=persistent.length?persistent.concat([['What’s next?','options']]):[['What’s next?','options']];
    quick.innerHTML='<div class="pipJourneyShortcuts">'+actionMarkup(shortcuts)+'</div>';
    messages.scrollTop=messages.scrollHeight;
  };
  document.addEventListener('click',e=>{
    const button=e.target.closest('[data-journey-action]');
    if(!button)return;
    e.preventDefault();e.stopPropagation();
    const action=button.dataset.journeyAction;
    if(action==='options'){showOptions();return;}
    state().lastOptions=stableActions(playbook().buttons);
    navigate(action);
  });
  // Add small in-page journey continuity banner, even with chat closed.
  const originalRender=render;
  render=function(){
    originalRender();
    if(S.stage==='welcome')return;
    const root=document.getElementById('main');
    if(!root||document.getElementById('pipLoopRibbon'))return;
    const j=state(),info=playbook();
    const ribbon=document.createElement('div');
    ribbon.id='pipLoopRibbon';ribbon.className='pipLoopRibbon';
    ribbon.innerHTML='<span>🐣 '+escapeHtml(goalName())+'</span><small>'+escapeHtml(info.step)+'</small>'+
      (j.history.length?'<button data-journey-action="return" type="button">↶ Return to my previous step</button>':
        '<button data-journey-action="options" type="button">Show me the next step →</button>');
    root.insertBefore(ribbon,root.firstChild);
  };
  // Keep the existing real AI, cases, resume exports and assessment routes.
  state();render();
})();