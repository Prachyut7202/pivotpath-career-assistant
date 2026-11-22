/* PivotPath V5: Pip-led journey, deterministic intake and actionable inner loops.
   This layer augments the existing workspaces, preserves original resume content,
   and keeps practice evidence separate from self-reported career history. */
(function(){
  'use strict';
  const stages=['hello','upload','review','ownership','destination','ready'];
  const lessons={
    C1:{title:'Frame the problem before choosing a solution',concept:'Start with the user, the objective, and a measurable outcome. Separate what is known from what still needs checking.',example:'If activation drops, confirm what counts as activation and which users are affected before proposing a new feature.',check:'What should come first?',choices:['Choose a feature immediately','Clarify the problem and affected users','Increase marketing spend'],correct:1},
    C2:{title:'Move from a number to a decision',concept:'Define the metric, denominator, time window, segments and relevant guardrails. A change in a metric is a clue, not a diagnosis.',example:'Activation is 450/1,000 = 45%; last month 400/800 = 50%. Check tracking changes before claiming a real decline.',check:'Which comparison is most defensible?',choices:['Raw events alone','Rates with consistent definitions','The larger absolute count'],correct:1},
    C3:{title:'Check the data before interpreting it',concept:'Validate definitions, missing values, duplicates and join keys. SQL and Python competence require hands-on practice, not a chat answer.',example:'A join on user_id may duplicate users if one table has multiple events per user. Check row counts before and after.',check:'What makes the result trustworthy?',choices:['A neat chart','Validated join and data grain','A longer query'],correct:1},
    C4:{title:'Prioritize by outcome and evidence',concept:'Describe the user need, value, uncertainty, effort and dependencies. A PRD captures why and what, not just a feature list.',example:'With capacity for one feature, compare expected user impact, confidence and implementation risk; document the trade-off.',check:'Which is the best priority rationale?',choices:['Executive preference alone','Impact, evidence and effort','Whichever idea is newest'],correct:1},
    C5:{title:'Close the delivery loop',concept:'Turn requirements into milestones, owners, acceptance criteria, test evidence, launch checks and post-release follow-up.',example:'A new workflow is not complete at launch: check adoption, failure rates and feedback after release.',check:'What happens after launch?',choices:['Measure outcomes and resolve issues','Declare success automatically','Stop tracking'],correct:0},
    C6:{title:'Connect audience, message and value',concept:'Define the customer segment, pain point, promise, channel, adoption metric and feedback loop.',example:'A launch plan for a new analytics feature should specify who needs it, why they care and how activation is measured.',check:'Where should positioning begin?',choices:['A slogan','A clear customer problem','The launch date'],correct:1}
  };
  function intake(){if(!S.pipIntake||!stages.includes(S.pipIntake.step))S.pipIntake={step:'hello',method:null,filename:'',owned:[],note:'',done:false};return S.pipIntake;}
  function setStep(step){intake().step=step;save();render();}
  function safe(s){return esc(String(s??''));}
  function primary(label,action,extra){return '<button class="pipPrimary" type="button" data-pip-action="'+action+'" '+(extra||'')+'>'+label+'</button>';}
  function secondary(label,action,extra){return '<button class="pipSecondary" type="button" data-pip-action="'+action+'" '+(extra||'')+'>'+label+'</button>';}
  function bubble(text){return '<div class="pipBubble"><div class="pipMiniAvatar">'+mascot+'</div><div class="pipBubbleText">'+text+'</div></div>';}
  function progress(step){const i=stages.indexOf(step);return '<div class="pipProgress"><span>YOUR STARTING POINT</span><span>'+(i===0?'A fresh start':Math.max(1,i)+' of 5')+'</span></div><div class="pipProgressBar">'+[1,2,3,4,5].map(n=>'<i class="'+(n<=i?'on':'')+'"></i>').join('')+'</div>';}
  function consent(){return '<p class="pipConsent">No account needed. Your workspace is kept in this browser. Resume text is extracted on the server; when you message live AI, selected career context is processed by the connected provider. Please avoid confidential data.</p>';}
  function content(){
    const o=intake(),p=S.profile;
    if(o.step==='hello')return bubble('<strong>Hi, I’m Pip.</strong> Before we talk about your next job, I’d love to understand what you’ve already done. How shall we begin?')+
      '<div class="pipChoices">'+primary('↥ Upload my resume','upload')+secondary('Let’s talk instead','manual')+'</div>'+
      '<div class="pipSampleHead">Or try a sample career story · based on redacted CVs</div><div class="pipSamples">'+
      ['JRA','AC','BA'].map(x=>{
        const entry=window.PIVOTPATH_SAMPLES?.[x];
        const title=entry?.track||(x==='JRA'?'Research analyst':x==='AC'?'Associate consultant':'Business analyst');
        const person=entry?.firstName?entry.firstName+' example':'sample profile';
        return '<button type="button" data-pip-action="sample" data-persona="'+x+'" title="CV-based prototype story; not a verified skill rating"><strong>'+safe(title)+'</strong><small>'+safe(person)+'</small></button>';
      }).join('')+'</div>';
    if(o.step==='upload')return bubble('Great. Share a PDF, DOCX or text resume. I’ll extract what I can, then <strong>you’ll confirm the facts</strong>. We won’t treat a listed skill as proven proficiency.')+
      '<p class="pipUploadNote">Testing with a different person’s resume? Pip will ask before replacing a saved profile, so career details never get mixed.</p>'+ 
      '<label class="pipDrop" for="pipIntakeFile"><span class="pipDropIcon">↥</span><strong>Choose your resume</strong><span>PDF, DOCX, TXT, MD or TEX · up to 7 MB</span><input id="pipIntakeFile" type="file" accept=".pdf,.docx,.txt,.md,.tex" /></label>'+
      '<div class="pipInline">'+secondary('I’ll describe my experience','manual')+secondary('Back','back')+'</div>';
    if(o.step==='review'){
      const rep=p.importReport&&p.resumeText?p.importReport:null;
      const demo=rep?.status==='sample';
      let extracted='';
      if(rep){
        const displayOrder=[['experience','Work experience'],['internships','Internships'],['projects','Projects'],['education','Education'],['skills','Skills'],['leadership','Leadership']];
        const segments=displayOrder.filter(([key])=>Array.isArray(rep.sections?.[key])&&rep.sections[key].length);
        extracted='<section class="pipImportFacts" aria-label="Information extracted from this resume">'+
        '<div class="pipImportTitle"><span>'+(demo?'✓ Redacted CV-based sample':'✓ Resume text extracted')+'</span><strong>'+safe(rep.filename)+'</strong></div>'+
        '<p class="pipImportMeta">'+(demo?'Curated excerpts from the provided CV · no file uploaded in this session':Number(rep.originalTextLength||0).toLocaleString()+' characters read · Review before using')+'</p>'+
        (demo?'<p class="pipSampleNote">'+safe(p.sampleExperienceNote||'The career track is a demo grouping, not an asserted job title.')+'</p>':'')+
        '<div class="pipImportFields">'+
        '<div><small>'+(demo?'SAMPLE PROFILE':'NAME FOUND IN DOCUMENT')+'</small><strong>'+safe(rep.candidateName||'Not confidently identified')+'</strong></div>'+
        '<div><small>'+(demo?'CONTACT INFORMATION':'EMAIL FOUND IN DOCUMENT')+'</small><strong>'+safe(demo?'Removed for privacy':(rep.candidateEmail||'Not found'))+'</strong></div></div>'+
        (segments.length?segments.map(([key,title])=>
          '<details class="pipImportSection" '+(key==='experience'?'open':'')+'>'+
          '<summary>'+safe(title)+' <span>'+rep.sections[key].length+' extracted entries</span></summary>'+
          '<div class="pipImportEntries">'+rep.sections[key].slice(0,5).map(item=>
            '<p>'+safe([item.title,item.detail].filter(Boolean).join(item.title&&item.detail?' — ':''))+'</p>').join('')+
          '</div></details>').join(''):'<p class="pipImportFallback">Section headings were not confidently recognized in this file. Inspect the actual extracted text below and fill in any missing fields.</p>')+
        '<details class="pipImportSection"><summary>'+(demo?'View curated CV excerpts':'View original extracted text')+' <span>'+(demo?'Redacted test data':'From this upload')+'</span></summary><pre class="pipImportRaw">'+safe(rep.rawPreview||p.resumeText.slice(0,2200))+'</pre></details>'+
        '<p class="pipImportWarning">'+(demo?'This sample is based on actual CV excerpts with contact details removed. The selected career track does not change the job titles on the source CV. Confirm any claim before using it as evidence.':'The text above comes from the uploaded file, not from a previous profile. A job title or employer is left blank when it cannot be confidently identified.')+'</p></section>';
      }else if(p.resumeText)extracted='<div class="pipExtract"><strong>Resume text available</strong><span>'+safe(p.resumeText.slice(0,430))+'</span></div>';
      return bubble((demo?'I’ve loaded a redacted example based on a real CV. ':p.resumeText?'I’ve extracted text from the resume you selected. ':'Let’s start with the basics. ')+'<strong>Does this career story look right?</strong> Review the work examples and correct any missing details before we continue.')+extracted+
      '<form id="pipReviewForm" class="pipMiniForm"><div class="pipFormGrid"><label>Your name <input name="name" required placeholder="How should I address you?" value="'+safe(p.name)+'"/></label>'+
      '<label>Current / latest role <input name="role" required placeholder="e.g. Research Associate" value="'+safe(p.role)+'"/></label>'+
      '<label>Organization <input name="employer" placeholder="Optional" value="'+safe(p.employer)+'"/></label>'+
      '<label>Years of experience <input name="years" type="number" min="0" max="45" step="any" placeholder="e.g. 1.5" value="'+safe(p.years)+'"/></label></div>'+
      '<label>One project or achievement you would like me to know<textarea name="achievements" rows="3" placeholder="What happened, and what did you do?">'+safe((p.achievements||'').slice(0,1800))+'</textarea></label>'+
      '<button class="pipPrimary" type="submit">Yes, that’s my starting point →</button></form>'+
      '<div class="pipInline">'+secondary('Back','back')+'</div>';
    }
    if(o.step==='ownership'){
      const options=['Defined the problem','Research / analysis','Wrote requirements','Built a prototype','Tested with users','Led rollout','Measured results'];
      return bubble('Thanks. Now I have one question: <strong>which parts of that work did you personally own?</strong> Select any that apply; “none” and “not sure” are perfectly fine.')+
      '<div class="pipOwnership">'+options.map(x=>'<button type="button" aria-pressed="'+(o.owned.includes(x)?'true':'false')+'" class="'+(o.owned.includes(x)?'selected':'')+'" data-pip-action="own" data-value="'+safe(x)+'">'+(o.owned.includes(x)?'✓ ':'')+safe(x)+'</button>').join('')+'</div>'+
      '<label class="pipTextLabel">Anything else? (optional)<textarea id="pipOwnershipNote" rows="2" placeholder="Tell me briefly, in your own words.">'+safe(o.note)+'</textarea></label>'+
      '<div class="pipInline">'+primary('Continue →','ownership-next')+secondary('Not sure / skip','ownership-skip')+secondary('Back','back')+'</div>';
    }
    if(o.step==='destination')return bubble('And where would you like your career to go? <strong>Your aspiration is your choice.</strong> I’ll show transferable strengths and what we still need to test—even if your goal is ambitious.')+
      '<form id="pipGoalForm" class="pipMiniForm"><label>A role I’d like to explore<select name="goal"><option value="">Help me explore first</option>'+
      roleOrder.map(id=>'<option value="'+id+'" '+(S.career.aspiration===id?'selected':'')+'>'+safe(roleName(id))+'</option>').join('')+
      '</select></label><label>What interests you about the next step? (optional)<textarea name="motivation" rows="2" placeholder="e.g. building tools that solve user problems">'+safe(S.career.motivation||'')+'</textarea></label>'+
      '<button class="pipPrimary" type="submit">Show me my paths →</button></form>'+
      '<div class="pipInline">'+secondary('Back','back')+'</div>';
    if(o.step==='ready')return bubble('<strong>I’ve got your starting story.</strong> We can now compare paths, inspect your evidence, practice a real decision, learn from feedback and update your resume. Nothing is graded from a resume alone.')+
      '<div class="pipSummary"><div><span>YOUR EXPERIENCE</span><strong>'+safe(p.role||'Career explorer')+'</strong></div><div><span>YOUR DIRECTION</span><strong>'+safe(S.career.aspiration?roleName(S.career.aspiration):'Explore possible roles')+'</strong></div><div><span>REVIEWED WORK</span><strong>'+safe(o.owned.length?o.owned.slice(0,3).join(' · '):'More to understand together')+'</strong></div></div>'+
      primary('Explore my career paths →','finish')+'<div class="pipInline">'+secondary('Edit my answers','back')+'</div>';
    return bubble('Let’s start with your career story.');
  }
  // Previous steps stay visible as concise chat turns. Only the current
  // question is actionable and the conversation scrolls to it.
  function intakeHistory(){
    const o=intake(),p=S.profile,at=stages.indexOf(o.step);
    if(at<=0)return '';
    const turns=[];
    const source=o.method==='sample'?'a redacted sample career story':o.method==='resume'?'a resume upload':'a conversation';
    turns.push({pip:'Let’s begin with your experience.',user:'I chose '+source+'.'});
    if(at>=2&&o.method==='resume')turns.push({pip:'I’ll extract your resume details for review.',user:'I shared my resume.'});
    if(at>=3)turns.push({pip:'We reviewed your career story.',user:'My role is '+(p.role||'not specified')+(p.employer?' at '+p.employer:'')+'.'});
    if(at>=4)turns.push({pip:'Which parts of the work did you personally own?',user:o.owned?.length?o.owned.join(' · '):'I’m still figuring out which work I owned.'});
    if(at>=5)turns.push({pip:'What career would you like to explore?',user:S.career.aspiration?roleName(S.career.aspiration):'I’d like to explore possible roles.'});
    return '<div class="pipConversationHistory" aria-label="Previous conversation">'+turns.map(t=>
      '<div class="pipHistoryTurn"><div class="pipHistoryPip"><span class="pipMiniAvatar">'+mascot+'</span><p>'+safe(t.pip)+'</p></div>'+
      '<p class="pipHistoryUser">'+safe(t.user)+'</p></div>').join('')+'</div>';
  }
  function renderWelcomeV5(){
    intake();
    document.getElementById('welcome').innerHTML='<div class="pipWelcome">'+
      '<div class="pipHero"><div class="pipHeroBrand"><span class="pipMark">✦</span> Pivot<span>Path</span></div>'+
      '<span class="pipEyebrow">YOUR CAREER, IN CONVERSATION</span>'+
      '<h1>You bring the experience.<br/><em>We’ll find the next move.</em></h1>'+
      '<p class="pipHeroDesc">Not another career questionnaire. A conversation that understands your work, helps you try new skills, and gets better with every step.</p>'+
      '<div class="pipStoryLoop"><div><b>01</b> Understand your story</div><div><b>02</b> Explore your paths</div><div><b>03</b> Practice & learn</div><div><b>04</b> Revisit & grow ↺</div></div>'+
      '<p class="pipFootnote">Guided by Pip · AI-supported when available · You stay in control</p></div>'+
      '<section class="pipConversation" aria-label="Start your journey with Pip"><header class="pipConversationHeader"><span class="pipLargeAvatar">'+mascot+'</span><div><strong>Pip</strong><span>Your personal career guide</span></div><span class="pipOnline">● Here with you</span></header>'+
      '<div class="pipConversationBody">'+progress(intake().step)+intakeHistory()+'<div class="pipCurrentTurn" id="pipCurrentTurn">'+content()+'</div></div>'+
      '<footer class="pipConversationFooter">'+consent()+'</footer></section></div>';
    const body=document.querySelector('#welcome .pipConversationBody');
    if(body){body.scrollTop=body.scrollHeight;}
  }
  function back(){
    const o=intake(),i=stages.indexOf(o.step);
    if(i>0)o.step=stages[i-1]==='upload'&&o.method==='manual'?'hello':stages[i-1];
    else o.step='hello';
    save();render();
  }
  function finish(){
    const o=intake();
    if(!S.profile.name.trim()||!S.profile.role.trim()){o.step='review';save();render();notify('Confirm your name and role first.','bad');return;}
    S.profile.verified=true;S.stage='app';S.route='discovery';S.discoveryStep=3;S.showAllRoles=false;S.coachGoal='career_exploration';S.coachOpen=!S.coachMuted;
    o.done=true;
    syncProfileToResume();
    if(!S.chat.some(m=>m.pipWelcomeV5)){
      S.chat.push({who:'pip',text:'I’ve saved the starting story you confirmed. Let’s explore career paths without assuming your resume proves every skill. You can choose any goal, then we’ll check evidence, practice and revisit your map.',pipWelcomeV5:true});
      if(S.profile.sampleFollowup){
        S.chat.push({who:'pip',text:'Based on the work described in this sample: '+S.profile.sampleFollowup,pipSamplePrompt:true});
      }
    }
    save();render();
  }
  const strip=(v,n=1000)=>String(v??'').trim().slice(0,n);
  function guide(){
    const route=S.route, goal=S.career.activeRole?roleName(S.career.activeRole):'a career direction';
    if(route==='profile')return {stage:'UNDERSTAND',title:'Your story can change. I’ll use your latest confirmed facts.',body:'Edit your work and projects here, then revisit your career options. Your original resume stays intact.',primary:'Return to discovery',action:'discovery',secondary:'Redo guided introduction',other:'restart'};
    if(route==='discovery')return S.career.activeRole
      ?{stage:'DISCOVER ↺',title:'Your goal is '+goal+'. Want to check the evidence?',body:'Explore alternatives whenever you like. Your ambition stays yours; the map shows what is described versus what still needs testing.',primary:'See my readiness',action:'readiness',secondary:'Explore another path',other:'change-goal'}
      :{stage:'DISCOVER',title:'Let’s compare realistic paths without limiting your ambition.',body:'Choose a destination to begin a practical evidence → practice → learn → reassess loop.',primary:'See all six options',action:'all-roles',secondary:'Ask Pip about my options',other:'talk'};
    if(route==='readiness')return {stage:'MAP → TRY → REVISIT',title:'What do we know about your fit for '+goal+'?',body:'Resume claims are not skill scores. Pick a competency, attempt a case, and come back to see updated evidence.',primary:'Start skill practice',action:'practice-start',secondary:'Discuss this evidence',other:'talk'};
    if(route==='practice'){
      if(!S.attempt)return {stage:'TRY → REVIEW',title:'Let’s test one skill at a time.',body:'I’ll ask a case question, assess your reasoning, teach the missing concept, and let you try a different scenario.',primary:'Start the first case',action:'practice-start',secondary:'See your action plan',other:'plan'};
      if(S.attempt.status==='feedback')return {stage:'REVIEW → LEARN',title:'You answered. Now turn the feedback into learning.',body:'Open a short worked lesson and check your understanding before your next attempt.',primary:'Learn this concept',action:'lesson',secondary:'Revisit readiness',other:'readiness'};
      if(S.attempt.status==='complete')return {stage:'LEARN → REASSESS ↺',title:'Your first cycle is complete. Time to test growth.',body:'Take a different case, inspect your updated readiness, or capture a truthful improvement in your role-focused resume.',primary:'Try a new scenario',action:'reassess',secondary:'Review my readiness',other:'readiness'};
      return {stage:'TRY',title:'Take your time. I’m here if you need a nudge.',body:'Answer the current question in your own words. A hint is optional; feedback is based on this answer, not your job title.',primary:'Focus on my answer',action:'focus-answer',secondary:'Ask Pip for a hint',other:'hint'};
    }
    if(route==='resume')return {stage:'DRAFT → REVIEW → REFINE ↺',title:'Let’s tell the story for '+goal+'.',body:'Use only experiences you genuinely had. Review proposed edits before accepting, then revisit your target role as you learn.',primary:'Improve a bullet with Pip',action:'resume-edit',secondary:'Revisit readiness',other:'readiness'};
    return {stage:'YOUR JOURNEY',title:'Keep learning with Pip',body:'Explore your goals, validate evidence, practice and improve.',primary:'Explore paths',action:'discovery',secondary:'Chat with Pip',other:'talk'};
  }
  function dock(){
    document.body.classList.toggle('pipGuideDocked',S.stage!=='welcome'&&S.coachOpen&&!S.coachMuted);
  }
  function proactiveScene(){
    let suffix='';
    if(S.route==='practice'&&S.attempt){
      suffix=':'+S.attempt.id+':'+S.attempt.index+':'+S.attempt.status;
    }
    return S.route+':'+(S.career.activeRole||'explore')+suffix;
  }
  function proactiveCopy(){
    const goal=S.career.activeRole?roleName(S.career.activeRole):'your next role';
    if(S.route==='discovery')return 'Welcome to discovery. I’ll show possible paths from the work you described. You can choose the role you really want, even when we still have questions about readiness.';
    if(S.route==='readiness')return 'Here is the evidence map for '+goal+'. Your resume describes some experience, but anything untested stays unassessed. Shall we use a case to check one area?';
    if(S.route==='practice'){
      if(S.attempt?.status==='feedback')return 'You have feedback on this question. Want a short worked lesson, then a fresh attempt? We can turn each gap into a learning loop.';
      if(S.attempt?.status==='complete')return 'Nice work completing the case. Let’s review what changed, revisit readiness, and try a different scenario when you’re ready.';
      return 'In this practice step, try your own reasoning first. I can offer a hint without giving away the answer, then we’ll review what you actually demonstrated.';
    }
    if(S.route==='resume')return 'Now we can translate your experience into a role-focused one-pager. I’ll suggest improvements, but you approve each change and we keep the original history.';
    return 'Your career profile is the foundation. Review the facts, then we can explore roles again.';
  }
  function enhance(){
    dock();
    if(S.stage==='welcome')return;
    // One contextual guide already exists in the chat timeline and the small
    // milestone bubble. Do not insert another banner above each page or
    // append scripted "proactive" chatter on every visit.
    const old=document.getElementById('pipJourneyGuide');
    if(old)old.remove();
    const top=document.querySelector('.topbar .topright');
    if(top&&!top.querySelector('[data-pip-action="toggle-guide"]'))
      top.insertAdjacentHTML('afterbegin','<button class="pipTopGuide" data-pip-action="toggle-guide" type="button">Talk with Pip</button>');
    const nav=document.querySelector('.sidebarFoot');
    if(nav&&!nav.querySelector('[data-pip-action="restart"]'))
      nav.insertAdjacentHTML('beforeend','<button class="pipRestart" data-pip-action="restart" type="button">↺ Start a new person’s journey</button>');
  }
  let lessonOpen=false;
  function openLesson(){
    const q=typeof currentQ==='function'?currentQ():null;
    const code=String(q?.competency||'C1').slice(0,2);
    const l=lessons[code]||lessons.C1;
    const root=document.createElement('div');root.id='pipLesson';root.className='pipLessonOverlay';
    root.innerHTML='<section class="pipLessonCard" role="dialog" aria-modal="true" aria-label="Learn with Pip">'+
     '<header><span class="pipLessonAvatar">'+mascot+'</span><div><small>LEARN WITH PIP</small><h2>'+safe(l.title)+'</h2></div><button type="button" data-pip-action="close-lesson" aria-label="Close lesson">✕</button></header>'+
     '<div class="pipLessonBody"><h3>The idea</h3><p>'+safe(l.concept)+'</p><h3>Worked example</h3><p>'+safe(l.example)+'</p>'+
     '<h3>Quick check</h3><p>'+safe(l.check)+'</p><div class="pipLessonOptions">'+l.choices.map((x,i)=>'<button type="button" data-pip-action="check-lesson" data-choice="'+i+'" data-correct="'+l.correct+'">'+safe(x)+'</button>').join('')+'</div>'+
     '<div id="pipLessonFeedback" aria-live="polite"></div></div>'+
     '<footer>'+secondary('Back to my answer','close-lesson')+primary('Revisit readiness ↺','guide','data-target="readiness"')+'</footer></section>';
    document.body.appendChild(root);lessonOpen=true;
  }
  // The journey controller can open the same verified lesson UI.
  window.PipStartLesson=()=>openLesson();
    function action(target){
    if(target==='toggle-guide'||target==='talk'){S.coachOpen=!S.coachOpen;save();renderCoach();dock();if(!S.coachOpen&&target==='talk'){S.coachOpen=true;renderCoach();dock();}return;}
    if(target==='restart'){if(!confirmNewCandidate())return;freshCandidateSession();render();notify('New person, new journey. Previous chat and evidence are cleared.');return;}
    if(target==='lesson'){openLesson();return;}
    if(target==='focus-answer'){document.getElementById('caseAnswer')?.focus();return;}
    if(target==='hint'){sendCoach('Please give me a hint for the current case question, without answering it.');S.coachOpen=true;renderCoach();dock();return;}
    if(target==='resume-edit'){modal={type:'newBullet'};renderModal();return;}
    if(target==='practice-start'){beginCase(S.career.activeRole,'A');return;}
    if(target==='reassess'){beginCase(S.career.activeRole,'B');return;}
    if(target==='all-roles'){S.showAllRoles=true;save();render();return;}
    if(target==='change-goal'){S.showAllRoles=true;S.discoveryStep=3;save();setRoute('discovery');return;}
    if(target==='plan'){S.practiceView='plan';save();setRoute('practice');return;}
    if(['discovery','readiness','practice','resume','profile'].includes(target)){if(document.getElementById('pipLesson'))document.getElementById('pipLesson').remove();setRoute(target);}
  }
  document.addEventListener('click',function(e){
    const b=e.target.closest('[data-pip-action]');if(!b)return;
    const a=b.dataset.pipAction,o=intake();e.preventDefault();
    if(a==='upload'){if(!confirmNewCandidate())return;freshCandidateSession();const fresh=intake();fresh.step='upload';fresh.method='resume';save();render();}
    else if(a==='manual'){if(!confirmNewCandidate())return;freshCandidateSession();const fresh=intake();fresh.step='review';fresh.method='manual';save();render();}
    else if(a==='back')back();
    else if(a==='sample'){
      const id=b.dataset.persona;
      const story=window.PIVOTPATH_SAMPLES?.[id];
      if(!story){notify('Sample story is unavailable. Please try a resume upload.','bad');return;}
      if(!confirmNewCandidate())return;
      // New sample, new candidate: no chats, cases, skills, resume or guide history.
      freshCandidateSession();
      const profile=JSON.parse(JSON.stringify(story.profile));
      const sections=JSON.parse(JSON.stringify(story.sections));
      const excerpt=Object.entries(sections).map(([key,items])=>
        key.toUpperCase()+'\n'+items.map(it=>[it.title,it.detail].filter(Boolean).join(' — ')).join('\n')
      ).join('\n\n');
      S.profile={...S.profile,...profile,verified:false,source:'redacted CV-based sample',
        email:'',phone:'',linkedin:'',portfolio:'',resumeText:excerpt,
        sampleTrack:story.track,sampleExperienceNote:story.experienceNote,
        sampleFollowup:story.followup,
        importReport:{
          status:'sample',filename:story.firstName+' · '+story.track+' sample',
          candidateName:profile.name,candidateEmail:'',
          originalTextLength:excerpt.length,
          sections:sections,rawPreview:excerpt.slice(0,2600),
          warning:'Curated, redacted excerpts from the uploaded reference CV. Not a freshly parsed file.'
        }
      };
      for(const [sectionId,items] of Object.entries(sections)){
        const dest=getSection(sectionId);
        if(dest)dest.items=items.map(it=>({
          id:uid(),title:it.title||'',detail:it.detail||'',
          kind:it.kind==='bullet'?'bullet':'entry',imported:true
        }));
      }
      S.pipIntake={step:'review',method:'sample',sampleId:id,
        filename:story.firstName+' sample CV',owned:[],note:'',done:false,recorded:false};
      S.coachGoal='career_exploration';
      save();render();notify('Loaded redacted '+story.track+' sample based on the provided CV.');
    }
    else if(a==='own'){const v=b.dataset.value;const i=o.owned.indexOf(v);i<0?o.owned.push(v):o.owned.splice(i,1);save();render();}
    else if(a==='ownership-next'||a==='ownership-skip'){
      o.note=strip(document.getElementById('pipOwnershipNote')?.value,700);
      if(a==='ownership-skip'){o.owned=[];o.note='';}
      if(!o.recorded&&(o.owned.length||o.note)){
        const description=[o.owned.length?'Personally handled: '+o.owned.join(', '):'',o.note].filter(Boolean).join('. ');
        S.profile.achievements=(S.profile.achievements?S.profile.achievements+'\n':'')+'Self-reported: '+description;
        o.recorded=true;
      }
      o.step='destination';save();render();
    }
    else if(a==='finish')finish();
    else if(a==='guide')action(b.dataset.target);
    else if(a==='toggle-guide'||a==='restart')action(a);
    else if(a==='close-lesson'){document.getElementById('pipLesson')?.remove();lessonOpen=false;}
    else if(a==='check-lesson'){
      const right=b.dataset.choice===b.dataset.correct;
      document.getElementById('pipLessonFeedback').textContent=right?'Exactly. Apply the same reasoning to your next answer.':'Not quite. Re-read the principle above and try a different option.';
      document.querySelectorAll('.pipLessonOptions button').forEach(x=>{x.classList.toggle('pipAnswerCorrect',x.dataset.choice===b.dataset.correct);});
    }
  });
  document.addEventListener('change',async function(e){
    if(e.target.id!=='pipIntakeFile')return;
    const f=e.target.files&&e.target.files[0];if(!f)return;
    const o=intake();o.step='upload';o.filename=f.name;save();
    // The parser reports success explicitly. Do not compare resume strings:
    // uploading the same PDF again is valid and must continue to review.
    const ok=await handleResumeFile(f,{newProfile:true});
    if(ok){const current=intake();current.step='review';current.filename=f.name;save();render();}
    // handleResumeFile already displays a specific error when parsing fails.
  });
  document.addEventListener('submit',function(e){
    if(e.target.id==='pipReviewForm'){
      e.preventDefault();
      const f=new FormData(e.target),p=S.profile;
      p.name=strip(f.get('name'),150);p.role=strip(f.get('role'),150);
      p.employer=strip(f.get('employer'),150);p.years=strip(f.get('years'),12);
      p.achievements=strip(f.get('achievements'),1800);
      if(!p.name||!p.role){notify('Please enter your name and your latest role.','bad');return;}
      p.verified=true;intake().step='ownership';save();render();return;
    }
    if(e.target.id==='pipGoalForm'){
      e.preventDefault();const f=new FormData(e.target);
      S.career.aspiration=strip(f.get('goal'),5);S.career.motivation=strip(f.get('motivation'),700);
      intake().step='ready';save();render();return;
    }
  });
  const originalRender=render;
  render=function(){originalRender();enhance();};
  const originalCoach=renderCoach;
  renderCoach=function(){
    originalCoach();dock();
    const quick=document.getElementById('coachQuick');
    if(quick&&S.route==='practice'&&S.attempt?.status==='feedback'&&!quick.querySelector('[data-pip-action="lesson"]'))
      quick.insertAdjacentHTML('beforeend','<button type="button" data-pip-action="lesson">📖 Learn this concept</button>');
  };
  renderWelcome=renderWelcomeV5;
  render();
})();