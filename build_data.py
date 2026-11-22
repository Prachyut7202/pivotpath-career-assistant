import re,json,pathlib,html
text=pathlib.Path('/mnt/data/pivotpath_v4_specs/01_Role_and_Assessment_Matrix.md').read_text()
roles={
 'PA':{'name':'Product Analyst','summary':'Understand product behavior, measure journeys, and recommend changes with clear evidence.','source_ids':['S05','S06'],'competencies':[('C1a','Problem framing'),('C2b','Funnels & cohorts'),('C2c','Hypotheses and causal caution'),('C2d','Business interpretation'),('C2a','KPI design'),('C3a','SQL (external practice only)')], 'resource': {'title':'Amplitude: Product analytics fundamentals','url':'https://www.amplitude.com/guides/product-analytics'},'keywords':['analysis','data','research','kpi','metrics','excel','python','sql','product','dashboard','funnel','cohort']},
 'APM':{'name':'Associate Product Manager','summary':'Discover user needs, prioritize product decisions, and coordinate measurable delivery.','source_ids':['S11','S12','S13'],'competencies':[('C1a','Problem framing'),('C1b','User discovery'),('C4b','Feature prioritization'),('C4c','PRDs and solution scope'),('C2a','Product outcomes and metrics'),('C5c','Delivery and rollout')],'resource':{'title':'Atlassian: Product management interview handbook','url':'https://www.atlassian.com/company/careers/resources/career-growth/product-managers'},'keywords':['prd','product','user','roadmap','prioritization','requirements','launch','research','strategy','growth']},
 'PO':{'name':'Product Operations Associate','summary':'Keep product launches and operating processes running reliably across teams.','source_ids':['S07','S08'],'competencies':[('C5a','Workflow design'),('C2c','Operational diagnosis'),('C5d','Escalation and operating cadence'),('C5b','Quality assurance'),('C5c','Rollout planning'),('C7b','Stakeholder alignment')],'resource': {'title':'IIBA: Business Analysis Standard','url':'https://www.iiba.org/knowledgehub/the-business-analysis-standard/'},'keywords':['operations','process','workflow','stakeholder','implementation','program','delivery','coordination','qa','launch']},
 'DA':{'name':'Data Analyst','summary':'Prepare and analyze data, check its quality, and communicate reliable business findings.','source_ids':['S01','S02'],'competencies':[('C2a','Analytical metrics'),('C3d','Data quality & joins'),('C2c','Hypothesis checking'),('C2d','Business interpretation'),('C7a','Analytical communication'),('C3a','SQL (external practice only)')],'resource':{'title':'SQLBolt: Interactive SQL lessons','url':'https://sqlbolt.com/'},'keywords':['sql','python','data','analytics','report','excel','dashboard','statistics','power bi','tableau']},
 'BA':{'name':'Business Analyst','summary':'Turn business problems and stakeholder needs into clear requirements and measurable solutions.','source_ids':['S03','S04'],'competencies':[('C1b','Stakeholder discovery'),('C5a','Process mapping'),('C7b','Stakeholder alignment'),('C4c','Requirements & acceptance criteria'),('C5c','Solution validation'),('C2a','KPIs')],'resource': {'title':'IIBA: Business Analysis Standard','url':'https://www.iiba.org/knowledgehub/the-business-analysis-standard/'},'keywords':['analysis','requirements','stakeholder','consulting','process','market','business','interview','operating model']},
 'PMM':{'name':'Product Marketing Associate','summary':'Research customers, position products, and design measurable go-to-market plans.','source_ids':['S09','S10'],'competencies':[('C1c','Customer segments'),('C6b','Positioning'),('C6c','GTM channels'),('C6d','Activation and growth metrics'),('C7a','Commercial storytelling')],'resource': {'title':'Product Marketing Alliance: PMM interview guide','url':'https://www.productmarketingalliance.com/how-to-prepare-for-a-product-marketing-interview/'},'keywords':['marketing','gtm','growth','sales','market research','customer','segmentation','positioning','product']}
}
# match entire A case, regex sections
for code in roles:
 m=re.search(r'^### '+re.escape(code)+r' · .*?Case '+code+r'-A.*?\n\n\*\*Scenario:\*\* (.*?) \*\*Basis:.*?\n\n.*?\n\|---\|---\|---\|---\|\n(.*?)(?=\n\n### |\n## 08)',text,re.M|re.S)
 if not m: raise ValueError('missing '+code)
 roles[code]['scenario_A']=m.group(1).strip()
 q=[]
 for ln in m.group(2).splitlines():
  if ln.startswith('| ') and not ln.startswith('|---'):
   c=[p.strip() for p in ln.strip('|').split('|')]
   if len(c)<4: continue
   p=re.sub('[“”]','',c[1]); q.append({'id':c[0], 'prompt':p,'competency':c[2].replace('*',''), 'ideal':c[3]})
 if len(q)!=5: raise ValueError((code,len(q)))
 roles[code]['questions_A']=q
B={
'PA':("Signup-to-verification conversion has declined on Android, but iOS has remained stable. The event instrumentation recently changed.",["Before diagnosing verification conversion, what definitions and baseline would you confirm?","Which stages and cohorts of the verification journey would you compare?","Offer three possible explanations for the Android decline and explain what data distinguishes them.","Which explanation would you investigate first, and why?","What success and guardrail metrics would you use after a change?"]),
'APM':("A job platform can build only one next-quarter feature: simplify applications, improve search filters, or add recruiter messaging.",["What user group and outcome would you clarify before choosing a feature?","What research or metrics would you gather for the three options?","Pick one feature and justify the trade-off with an explicit decision framework.","Define the smallest usable version and its acceptance criteria.","What would indicate success and what unintended effects would you monitor?"]),
'PO':("After a new feature launch, support tickets spike and resolutions slow down despite unchanged staffing.",["What definitions, customer segments and time windows would you clarify?","Map the support process and identify where tickets may be accumulating.","How would you distinguish product defects from operations capacity or process issues?","What immediate response and longer-term fix would you prioritize?","What monitoring and release quality controls would prevent recurrence?"]),
'DA':("Purchases have increased after a pricing change, but revenue per active customer has declined.",["What metrics would you calculate and how would you interpret their movement?","What definitions, joins and recording changes could distort this conclusion?","Which validity checks would you run before publishing the result?","What customer segments or periods would you compare first?","How would you explain the trade-offs and uncertainty to management?"]),
'BA':("Finance, risk, and customer support disagree on the rules for a new self-service refund workflow.",["Identify the relevant stakeholders and the desired business outcomes.","How would you capture the current-state refund process and issues?","How would you resolve the conflicting approval and exception rules?","Write three testable requirements or acceptance conditions.","How would you evaluate the solution after rollout?"]),
'PMM':("An existing learning app is launching a paid employer offering, but its users are currently students.",["Who are the new buyers, users, and stakeholders, and what jobs are they hiring the product for?","Write a differentiated positioning statement for the new offer.","Which two GTM channels would you test first with limited resources?","What sales-enablement materials and objections should the launch plan address?","How would you distinguish campaign awareness from actual adoption and willingness to pay?"])
}
for code,(scenario,qs) in B.items():
 roles[code]['scenario_B']=scenario
 roles[code]['questions_B']=[{**roles[code]['questions_A'][i],'id':roles[code]['questions_A'][i]['id']+'B','prompt':q} for i,q in enumerate(qs)]
srcs={}
for ln in text.splitlines():
 if re.match(r'^\| S\d\d \|',ln):
  c=[p.strip() for p in ln.strip('|').split('|')]
  if len(c)>=5: srcs[c[0]]={'kind':c[1],'title':c[2],'description':c[3],'url':c[4]}
for code in roles: roles[code]['sources']=[srcs[k] for k in roles[code]['source_ids']]
path=pathlib.Path('/mnt/data/pivotpath_v4_website/roles.json')
path.write_text(json.dumps({'roles':roles,'sourceRegistry':srcs},indent=2,ensure_ascii=False))
print('Wrote',path,[(c,len(roles[c]['questions_A']),len(roles[c]['questions_B'])) for c in roles],len(srcs))
