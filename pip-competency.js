/* Role-specific competency explanations and honest practice milestones.
   These role examples and metrics are illustrative, not employer standards. */
(function(){
'use strict';
const G={
PA:{
 C1a:["A Product Analyst must clarify what changed and for whom before exploring data.","A reported 15% activation decline could be a change in event tracking, cohort mix, or actual behavior.",["Activation rate by cohort","Event completeness","Baseline window"],"Identify the population, metric numerator and denominator, comparison period, and decision the analysis supports.","An investigation brief linking the suspected problem to a defensible baseline."],
 C2b:["Funnels reveal where users drop out; cohorts reveal which users are affected.","Compare signup → verification → first successful action, split by device and acquisition cohort.",["Step conversion","Day-7 activation","Cohort drop-off"],"Choose relevant stages and cohorts, show comparable denominators, and isolate the largest change.","A documented funnel with definitions and a cohort-level explanation."],
 C2c:["Several causes can create the same metric movement; the analyst needs tests that distinguish them.","Stable downloads with falling first-week activation could indicate onboarding friction, a tracking bug, or traffic mix.",["Event failure rate","Step-level conversion","OS/version split"],"Give competing hypotheses, propose a falsifiable test for each, and distinguish instrumentation from behavior.","A hypothesis tree and test results that eliminate alternative explanations."],
 C2d:["Analysis creates value when it guides a decision under constraints.","Only one activation hypothesis can be investigated today; choose the highest-value test.",["Decision impact","Evidence confidence","Investigation effort"],"Explicitly compare alternatives, the cost of delay, confidence, and next decision.","A decision note showing the recommended investigation and why alternatives wait."],
 C2a:["A change needs a success metric and guardrails to avoid improving one number while harming others.","After an onboarding fix, measure successful activation and detect a rise in support complaints.",["Activation rate","Support contacts","Latency/error rate"],"Specify a primary outcome, relevant denominator, comparison window, and guardrail.","A measurement plan and post-release outcome review."],
 C3a:["SQL helps independently join, filter, and validate behavioral data; written reasoning cannot prove query execution.","Join user onboarding records to events and identify missing activations without multiplying rows.",["Join cardinality","Query accuracy","Duplicate/missing rows"],"Execute correct queries, explain join grain and data quality checks, and validate outputs.","A runnable SQL notebook or query with reviewed results."]
},
APM:{
 C1a:["An APM must identify the user problem and intended outcome before proposing a feature.","For three possible improvements, specify the target user, pain point, and outcome to change.",["Task completion","Activation","Customer complaints"],"Describe the affected segment, current problem, baseline, goal, and constraints without jumping to a solution.","A concise problem brief tested against real user evidence."],
 C1b:["Product decisions require evidence of customer needs rather than assumptions alone.","Use interviews, support themes, and behavioral data to investigate three feature requests.",["Pain-point frequency","Task completion","Support themes"],"Choose complementary qualitative and quantitative evidence and explain how it would change the decision.","A research synthesis separating assumptions, observed behaviors, and unmet needs."],
 C4b:["Limited capacity makes prioritization unavoidable; teams must explain why one feature should come first.","Compare onboarding, recommendations, and notifications before committing an engineering sprint.",["Expected user impact","Reach/confidence","Effort and risk"],"Apply a consistent decision framework, show evidence and assumptions, discuss trade-offs, and say what will not be built.","A prioritized roadmap with documented rationale and a credible counterargument."],
 C4c:["Engineering and design need a clear, testable outcome rather than a vague feature request.","Define the smallest version of the chosen feature and its acceptance criteria.",["Acceptance pass rate","Task success","Scope/defect count"],"State user journey, MVP boundaries, success condition, measurable acceptance criteria, and exclusions.","An approved MVP scope and testable requirements validated with collaborators."],
 C2a:["Shipping a feature is not the same as improving customer outcomes.","After releasing onboarding improvements, track activation while monitoring quality and complaints.",["Activation/retention","Feature adoption","Error and complaint rates"],"Identify a primary outcome metric with baseline, timeframe and relevant guardrails, and define decision rules.","A launch measurement dashboard and follow-up decision memo."],
 C5c:["A launch only succeeds if users can adopt the feature safely and the team learns after release.","Stage a rollout, instrument key events, monitor incidents, and decide whether to expand.",["Adoption by cohort","Defects and rollbacks","Post-launch support volume"],"Describe owners, release gates, monitoring, escalation, feedback collection and post-launch iteration.","A real launch checklist, evidence from monitoring and an improvement decision."]
},
PO:{
 C5a:["Product Operations turns messy handoffs into reliable end-to-end workflows.","Map an approval or support journey from incoming request through resolution and ownership.",["Turnaround time","Queue age","Handoff count"],"Define stages, inputs, owners, service expectations, exception paths and bottlenecks.","A current-state map and improved workflow with owners and measurable handoffs."],
 C2c:["A rising backlog can be caused by product defects, process rules or capacity—not always the software.","Separate a ticket surge caused by a new release from an increase in staffing gaps or approvals.",["Tickets by root cause","Backlog age","Reopen rate"],"Form alternative causes, segment evidence, check instrumentation, and test the likely bottleneck.","A root-cause analysis distinguishing system, process and capacity issues."],
 C5d:["Operations teams must balance urgent containment with sustainable fixes.","Decide when to escalate a delayed customer request and which process to stabilize later.",["Breach count","Escalation time","Repeat incidents"],"Specify escalation thresholds, owner, cadence, short-term containment, longer-term correction and trade-offs.","An operating cadence with thresholds, responsibilities and an incident review."],
 C5b:["Product operations protects customers from defects and inconsistent execution.","Check exception paths before rollout and monitor whether an approval workflow fails after release.",["Defect escape rate","QA pass rate","Incident recurrence"],"Design scenario tests, negative cases, rollout checks, and operational post-launch monitoring.","QA evidence, issue triage and a post-release control plan."],
 C5c:["Rollouts need phased change management, training, checkpoints and rollback readiness.","Pilot a revised workflow with one team before expanding to all operations.",["Adoption by team","Training completion","Rollback triggers"],"Describe pilot scope, owner alignment, runbook, feedback channels and go/no-go criteria.","A rollout plan with a completed pilot and measured adoption."],
 C7b:["New processes fail without shared decision rights across product, support and operations.","Resolve disagreement between engineering, support and business owners over escalation responsibility.",["Decision turnaround","Exception resolution","Ownership clarity"],"Map stakeholders, resolve conflicting priorities, assign accountable owners, and record decisions.","A stakeholder agreement and decision/ownership log."]
},
DA:{
 C2a:["A Data Analyst must compute the right business metric before interpreting its movement.","Compare activation between two months while accounting for different signup counts.",["Activation rate","Unique active users","Cohort denominators"],"Calculate a valid metric using the correct grain, population, denominator and comparison period.","A reproducible calculation with definitions and interpretation."],
 C3d:["Wrong joins or changing definitions can make a dashboard look persuasive but be incorrect.","Check whether joining events to users duplicates records and inflates activation.",["Join multiplicity","Missing IDs","Row reconciliation"],"Define table grains, check key uniqueness and join type, reconcile totals and detect missing or duplicate events.","An audited query or data-quality checklist with resolved discrepancies."],
 C2c:["Before trusting a conclusion, analysts must check alternative explanations and data integrity.","A dashboard drops sharply after an SDK update: verify tracking before concluding usage fell.",["Event coverage","Outlier share","Definition stability"],"Identify competing causes and perform validity checks before publishing claims.","A documented validation plan and caveat-aware finding."],
 C2d:["The analyst's output must guide the next business decision.","Choose which two cohorts to investigate first to explain the conversion gap.",["Segment contribution","Change magnitude","Actionability"],"Prioritize comparisons based on impact, uncertainty, and the business decision supported.","A prioritized analytical recommendation and decision follow-through."],
 C7a:["Accurate analysis still needs clear communication of uncertainty and implications.","Explain falling activation to management without claiming causation from one chart.",["Decision clarity","Uncertainty stated","Recommended action"],"State the main takeaway, evidence, limitations, implications and next recommended check.","A decision-ready written or visual analysis reviewed by stakeholders."],
 C3a:["Analysts often need to produce, execute and check SQL rather than merely describe a query.","Write a join between users and events to compute a monthly cohort activation rate.",["Query correctness","Join grain","Performance/validation"],"Execute a correct query, reconcile counts and explain edge cases such as duplicates.","A working SQL query/notebook checked against known results."]
},
BA:{
 C1b:["A Business Analyst must translate different stakeholder needs into a shared problem definition.","Clarify what employees, managers and HR expect from a leave or refunds process.",["Stakeholder coverage","Requirement clarity","Exception frequency"],"Identify stakeholders, their desired outcomes, conflicting needs, and questions to resolve.","A verified discovery summary and stakeholder sign-off."],
 C5a:["Process mapping identifies where work stalls, rules conflict or handoffs create delays.","Map a leave approval flow from request to payroll update.",["Cycle time","Rework rate","Approval handoffs"],"Document the as-is process, actors, decisions, exceptions, data inputs and bottlenecks.","An as-is/to-be process map validated with operators."],
 C7b:["Conflicting rules need facilitated agreement before a solution can be specified.","HR and line managers disagree on exceptions and who can approve requests.",["Decision lead time","Exception escalations","Rule conflicts"],"Surface trade-offs, clarify decision authority, document agreed rules and resolve open issues.","A decision log and approved business rules."],
 C4c:["Requirements must be testable to avoid delivery rework.","Write three acceptance conditions for a self-service approval workflow.",["Acceptance-test pass rate","Rework","Requirement ambiguity"],"State actor, trigger, rule, outcome, edge case and measurable acceptance condition.","A signed-off requirements document and passing UAT tests."],
 C5c:["A solution is not finished at release; analysts must confirm the intended process actually improved.","After implementing a new approval system, compare processing time and error rates.",["Turnaround time","Processing errors","User adoption"],"Define a baseline, UAT evidence, release checks and a post-launch measurement plan.","Documented UAT, go-live checks and observed improvement."],
 C2a:["Clear KPIs keep business requirements connected to measurable outcomes.","For a refund process, track elapsed time, SLA compliance and corrected transactions.",["Refund cycle time","SLA breaches","Rework rate"],"Define outcomes, denominators, baselines, owner and measurement cadence.","A KPI specification validated with business stakeholders."]
},
PMM:{
 C1c:["Product Marketing starts by understanding who buys, who uses and what job they need done.","Differentiate the economic buyer from the daily user of a new B2B offering.",["Segment size","Pain intensity","Willingness to pay"],"Name a priority segment, job-to-be-done, buying context and evidence supporting selection.","A validated customer segment and buyer/user persona."],
 C6b:["Positioning explains why the product matters and why alternatives are weaker.","Write a differentiated value proposition for an offer in a crowded category.",["Message recall","Conversion by message","Win/loss themes"],"Identify the target segment, frame of reference, valuable difference and proof points.","Tested positioning statements supported by buyer feedback."],
 C6c:["Limited GTM resources make channel choice and sales enablement critical.","Select two acquisition channels and prepare sales to explain the launch.",["Qualified lead rate","Channel CAC","Sales enablement adoption"],"Compare channel fit and efficiency; outline tests, messaging, sales assets and objections.","A channel experiment plan and tested launch enablement materials."],
 C6d:["Awareness isn't adoption; marketing must connect demand to activation and revenue outcomes.","Check whether campaign reach produced activated users and commercial interest.",["Awareness-to-activation","Trial conversion","Paid adoption"],"Separate funnel stages, define conversion and revenue measures, add efficiency guardrails.","A launch funnel dashboard with cohort and conversion analysis."],
 C7a:["Commercial storytelling turns technical features into persuasive buyer outcomes.","Translate an operational feature into a clear business value narrative for sales.",["Sales objection resolution","Message comprehension","Win/loss feedback"],"Connect customer pain, differentiated value, evidence, business impact and a credible call to action.","A pitch or case story tested with target buyers or sales teams."]
}
};
const escHtml=value=>esc(String(value??''));
const roleNameSafe=role=>ROLES[role]?.name||'your chosen role';
function coverage(role,code){
 const def=ROLES[role];
 return def?{a:def.questions_A.filter(q=>q.competency===code),b:def.questions_B.filter(q=>q.competency===code)}:{a:[],b:[]};
}
function latestByVariant(role,code,variant){
 const attempts=(S.attempts||[]).filter(a=>a.role===role&&a.variant===variant&&a.completedAt&&Array.isArray(a.evaluations))
   .sort((a,b)=>String(a.completedAt).localeCompare(String(b.completedAt)));
 const a=attempts.at(-1);
 if(!a)return null;
 const results=a.evaluations.filter(e=>e?.competency===code&&e.assessable===true&&Number(e.rating)>=1&&Number(e.rating)<=5);
 if(!results.length)return null;
 const allLive=results.every(e=>e.source==='live');
 const good=results.every(e=>Number(e.rating)>=4);
 return {score:results.reduce((sum,e)=>sum+Number(e.rating),0)/results.length,good,live:allLive,n:results.length,completedAt:a.completedAt};
}
function achievement(role,code){
 const c=coverage(role,code),hasA=c.a.length>0,hasB=c.b.length>0;
 const A=latestByVariant(role,code,'A'),B=latestByVariant(role,code,'B');
 const technical=/SQL|external practice/i.test(ROLES[role]?.competencies.find(x=>x[0]===code)?.[1]||'');
 const assessable=hasA&&hasB&&!technical;
 let label='Not assessed yet',tone='neutral';
 if(!assessable){label='Requires separate evidence';tone='neutral';}
 else if(A?.good&&B?.good&&A.live&&B.live){label='Practice milestone reached';tone='success';}
 else if(A?.good&&B?.good){label='Promising; check with live feedback';tone='info';}
 else if((A?.good&&A.live)||(B?.good&&B.live)){label='Strong in one case';tone='info';}
 else if(A||B){label='Still developing';tone='warning';}
 return {code,label,tone,assessable,A,B,hasA,hasB,met:tone==='success'};
}
function scoreLabel(e){
 if(!e)return 'Not yet completed';
 return e.score.toFixed(1)+'/5 · '+(e.live?'live AI':'illustrative demo')+(e.good?' · strong':' · needs practice');
}
function skillBadge(role,code){
 const r=achievement(role,code);
 return r.met?'<span class="pgRowAchievement" title="At least 4/5 on this competency in both case A and case B with live formative feedback; not a professional certification">✦ Practice milestone reached</span>':'';
}
function roleSummary(role){
 const compet=ROLES[role]?.competencies||[];
 const outcomes=compet.map(([code])=>achievement(role,code));
 const eligible=outcomes.filter(x=>x.assessable),uncovered=outcomes.length-eligible.length;
 const passed=eligible.filter(x=>x.met).length;
 return '<div class="pgRoleSummary" role="status"><div class="pgSummaryLead"><span class="pgSummaryIcon">✦</span><div><strong>'+
  passed+' of '+eligible.length+' practice skill checkpoints reached</strong><small>'+
  (uncovered?uncovered+' additional '+(uncovered===1?'skill needs':'skills need')+' separate evidence. ':'')+
  'Earn a checkpoint by showing strong reasoning in both case A and case B using live formative feedback.</small></div></div>'+
  '<span class="pgSummaryNote">A practice milestone is not a job-readiness certificate.</span></div>';
}
function renderSkillModal(role,code){
 const guide=G[role]?.[code],entry=ROLES[role]?.competencies.find(c=>c[0]===code);
 if(!guide||!entry)return '';
 const [why,scenario,metrics,criteria,artifact]=guide,perf=achievement(role,code);
 const evidence=allEvidence(role).find(e=>e.code===code);
 const selfLevel=S.pipSkillConfidence?.[role]?.[code]?.level;
 const levels={new:'New to me',some:'Some experience',independent:'Done independently'};
 const self=levels[selfLevel]||'Not provided';
 const caseRow=(v,label,r)=>'<li class="pgCheck '+(r?.good&&r.live?'passed':'')+'"><span aria-hidden="true">'+
   (r?.good&&r.live?'✓':'○')+'</span><div><strong>'+label+'</strong><small>'+
   (v.length?scoreLabel(r):'Not tested by this case bank')+'</small></div></li>';
 const external=/SQL/i.test(entry[1]);
 const scenarioCaption='Illustrative example for '+roleNameSafe(role);
 const coverageText=perf.assessable?
  'This skill appears in both authored case scenarios. A practice milestone needs 4/5 or higher on each comparable scenario using live formative AI feedback.':
  (external?'SQL requires an executable query, not a written answer.':
    'This competency is part of the role map but is not directly tested in both existing case scenarios.')+
    ' Build evidence through a real project, reviewed deliverable or external task; the prototype does not automatically certify it.';
 const userEvidence=evidence?.detail||'No evidence recorded yet.';
 const inProgress=S.attempt?.role===role&&S.attempt?.status!=='complete';
 const chosen=S.attempts?.some(a=>a.role===role&&a.variant==='A')?'B':'A';
 const CTA=inProgress?'<button type="button" data-pg-skill-action="continue">Continue my current case →</button>':
 perf.assessable?'<button type="button" data-pg-skill-action="case" data-pg-case="'+chosen+'">'+
  (chosen==='B'?'Try case B →':'Try the first case →')+'</button>':
 '<button type="button" data-pg-skill-action="readiness">Review my learning plan →</button>';
 return '<section class="pgModalContent" aria-label="Why this competency matters">'+
  '<div class="pgModalEyebrow">'+escHtml(roleNameSafe(role))+' · '+escHtml(code)+'</div>'+
  '<h2>'+escHtml(entry[1])+'</h2>'+
  '<div class="pgStatus '+perf.tone+'"><span aria-hidden="true">'+(perf.met?'✦':'◎')+'</span><strong>'+escHtml(perf.label)+'</strong></div>'+
  '<div class="pgExplainer"><h3>Why this matters for this role</h3><p>'+escHtml(why)+'</p>'+
  '<div class="pgScenario"><small>'+escHtml(scenarioCaption)+'</small><p>'+escHtml(scenario)+'</p></div></div>'+
  '<div class="pgExplainer"><h3>What would you actually measure?</h3><p class="pgSoftText">Illustrative role-specific metrics or decision signals, not universal hiring benchmarks.</p>'+
  '<div class="pgMetricChips">'+metrics.map(x=>'<span>'+escHtml(x)+'</span>').join('')+'</div></div>'+
  '<div class="pgExplainer"><h3>What a strong answer demonstrates</h3><p>'+escHtml(criteria)+'</p></div>'+
  '<div class="pgExplainer"><h3>How far have you demonstrated it?</h3>'+
  '<div class="pgCurrentEvidence"><div><span>From your own self-rating</span><strong>'+escHtml(self)+'</strong></div>'+
  '<div><span>Resume / case evidence</span><strong>'+escHtml(userEvidence)+'</strong></div></div>'+
  '<ul class="pgChecks">'+caseRow(coverage(role,code).a,'Case A',perf.A)+caseRow(coverage(role,code).b,'Case B',perf.B)+
  '<li class="pgCheck"><span aria-hidden="true">○</span><div><strong>Apply it to actual work</strong><small>'+escHtml(artifact)+' · External review still required</small></div></li></ul>'+
  '<div class="pgProgressNarrative">'+escHtml(coverageText)+'</div></div>'+
  (perf.met?'<p class="pgAchievementText">✦ You reached the practice checkpoint. Now show you can apply it to real work and get feedback—this is not a full competency certification.</p>':
    '<p class="pgSoftText">The goal is to move from understanding → demonstrating in a case → applying in real work.</p>')+
  '<div class="pgModalActions">'+CTA+
  '<a href="'+escHtml(resourceFor(code))+'" target="_blank" rel="noopener noreferrer">External learning resource ↗</a></div></section>';
}
window.PipCompetencyGuides={renderSkillModal,achievement,skillBadge,roleSummary,coverage};
document.addEventListener('click',function(event){
 const el=event.target.closest('[data-pg-skill-action]');
 if(!el)return;
 event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
 const action=el.dataset.pgSkillAction,role=S.career?.activeRole;
 modal=null;renderModal();
 if(action==='continue'){S.practiceView='case';setRoute('practice');return;}
 if(action==='case'){beginCase(role,el.dataset.pgCase==='B'?'B':'A');return;}
 if(action==='readiness'){S.practiceView='plan';save();setRoute('practice');}
},true);
})();