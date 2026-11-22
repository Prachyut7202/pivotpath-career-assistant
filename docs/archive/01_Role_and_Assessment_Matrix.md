# PIVOTPATH · ROLE & ASSESSMENT MATRIX

**Version 1.0 | 22 November 2026 | Product-content specification**  
**Purpose:** Define what Pip knows about six destinations, what it asks three starting personas, and how each answer contributes to a legitimate improvement loop.  
**Status:** Evidence-backed design hypotheses and authored practice cases; **not** a predictive hiring benchmark or a catalogue of verbatim employer questions.

## 01 | Decisions carried forward

- **Three starting personas:** Junior Research Analyst (JRA), Associate Consultant (AC), Business Analyst (BA). These are test fixtures, not fixed classifications. Resume/project facts take precedence over title stereotypes.
- **Six target roles:** Data Analyst (DA), Business Analyst (BA), Product Analyst (PA), Product Operations Associate (PO), Product Marketing Associate (PMM), Associate Product Manager (APM). For Product Manager positions with higher seniority, Pip must disclose the difference.
- **One active target after discovery.** Pip must honor the user's aspiration even if adjacent roles seem more accessible.
- **No blanket readiness %** or hiring probability. Show requirement-by-requirement evidence and formative scores from relevant cases only.
- **No SQL execution assessment** in prototype. SQL/Python can be identified as required, self-reported, or unassessed; link out to purpose-built practice.
- **Three complete demo routes:** JRA→PA, AC→APM, BA→PO. All six destinations have a first-pass authored case bank and source references, but only three demo routes are mandatory for end-to-end acceptance.
- **No project uploads or evaluation pipeline.** Pip can recommend a project or learning material. Resume edits reflect user-confirmed accomplishments and approved wording.

## 02 | Research standard: evidence versus design

**E = Published employer requirement** (company job posting; employer-specific, may be senior-level or expire). **F = Professional framework / published learning guide** (describes competency, not universal hiring threshold). **I = Published interview-preparation or candidate-report theme** (does not certify exact employer questions). **A = PivotPath-authored case/question, inspired by a cited competency/theme.**

Source links are collected in Section 10. They were accessed or rechecked **22 Nov 2026**. Do not present any of these examples as a representative labor-market average or infer an average experience requirement from them.

## 03 | MECE-oriented competency dictionary

Each subskill has one **primary owner** for scoring. Other subskills may be related, but cannot earn duplicate credit from the same evidence.

| ID | Competency family | Distinct assessable subskills | What counts as observable evidence |
|---|---|---|---|
| C1 | Problem & customer understanding | C1a problem framing; C1b user/stakeholder discovery; C1c needs/segment definition | Clear objective, scoped user, relevant discovery questions, defensible evidence needs |
| C2 | Analytical reasoning | C2a KPI logic; C2b funnel/cohort reasoning; C2c hypothesis and causal caution; C2d business interpretation; C2e estimation | Correct metric denominator/window, prioritized hypotheses, assumptions, sound inference |
| C3 | Technical execution | C3a SQL; C3b Python; C3c Excel/BI; C3d data quality & joins; C3e automation | Verifiable independent execution; **not inferred from merely listing a tool** |
| C4 | Product & solution design | C4a ideation; C4b prioritization; C4c PRD/user flow; C4d UX/trade-offs | Reasoned solution alternatives, criteria, scope, acceptance conditions |
| C5 | Delivery & operations | C5a workflow mapping; C5b UAT/QA; C5c rollout; C5d operating cadence/escalations | Process handoffs, clear owners, launch gates and measurable guardrails |
| C6 | Commercial & growth | C6a market/competition; C6b positioning; C6c GTM; C6d activation/acquisition economics | Customer–value proposition fit, channels, commercial constraints, impact metrics |
| C7 | Communication & ownership | C7a decision narrative; C7b stakeholder alignment; C7c personal ownership & influence | Specific contribution, reasoned recommendation, resolution of conflicting needs |

**Provenance state is separate from competency rating.** Allowed states: `resume_claim`, `user_confirmed_work`, `self_report`, `case_observed`, `unassessed`, `needs_improvement`. One answer can produce an assessment for a specific subskill; it does not certify job readiness.

## 04 | Employer-backed destination expectations

| Role | Distinct core requirements to investigate | Employer / framework evidence | Caution shown to user |
|---|---|---|---|
| DA | SQL data retrieval, Python/spreadsheets, data quality, metrics, communication | Fam Data Analyst [S01] (E); SQLBolt [S02] (F) | Fam cites 3–5 years of SQL; this is a **specific employer example**, not a universal DA rule |
| BA | Stakeholder elicitation, current-state processes, requirements, functional documentation, solution validation | Lingaro BA [S03] (E); IIBA Standard [S04] (F) | BA job families vary: process/requirements BA differs from analytics-heavy BA |
| PA | Product funnels, retention/cohorts, experimentation, SQL, decisions from user behavior | United Tech PA [S05] (E); Amplitude [S06] (F) | The cited posting includes technical SQL; offline cases cannot validate it |
| PO | Launch readiness, handoffs, operational metrics, adoption tracking, escalation | Omnea Product Ops [S07] (E); Credo.AI Product Ops [S08] (E) | Credo example is a manager role; use for **work scope**, not entry eligibility |
| PMM | Segmentation, value proposition, positioning, messaging, GTM launch, success measurement | Primer.io PMM Associate [S09] (E); Product Marketing Alliance [S10] (F/I) | Primer.io expects B2B marketing experience; alternative employers may differ |
| APM | Discovery, customer needs, requirements/PRDs, prioritization, delivery, outcome metrics | Metaforms APM [S11] (E); Scan.com APM [S12] (E); Atlassian PM handbook [S13] (F) | Some APM roles accept adjacent business/technical experience; others require product tenure |

**Employer-expectation card requirements:** company, exact title, location (if published), work scope, *stated* years (or `not stated`), skills, seniority caveat, URL, access date. A role card must show examples rather than generating a universal experience threshold.

## 05 | Starting profile × destination: all 18 comparisons

Legend: **Transfer** = likely transferable foundation **only if confirmed**; **Probe** = most consequential unknown; **Bridge** = practical next assessment or preparation. These are hypotheses, not scores.

| Origin | Destination | Transfer to examine | Pip must probe / likely uncertainty | First bridge |
|---|---|---|---|---|
| JRA | DA | Data synthesis, Excel, research quality | Independent SQL/Python, row-level data QA | Interpret a flawed dataset; send external SQL practice |
| JRA | BA | Stakeholder research, diagnostics, reporting | Requirements elicitation, acceptance criteria | Define requirements for an internal tool |
| JRA | PA | Market insights, analytical hypotheses | Behavioral metrics, cohorts, product context, SQL | Product activation diagnostic **demo A** |
| JRA | PO | Research process and coordination | Release operations, launch metrics, handoff ownership | Rollout-readiness scenario |
| JRA | PMM | Market/competitor research | Customer positioning, message testing, GTM ownership | Segment-and-position launch brief |
| JRA | APM | PRD/project exposure if documented | User discovery, prioritization and shipping ownership | Feature trade-off case |
| AC | DA | Quantitative/structured business analysis | Independent SQL/Python, statistical QA | Data interpretation and validation case |
| AC | BA | Business problem framing, stakeholder work | Formal requirements, UAT and process flows | Contradictory requirements case |
| AC | PA | Structured analytics, strategic hypotheses | Event instrumentation, retention, SQL | Funnel and experimentation case |
| AC | PO | Operating model, stakeholders, implementation | Day-to-day rollout ownership and metrics | Operational escalation case |
| AC | PMM | GTM planning, segmentation, business narrative | Product messaging, sales enablement | Audience and launch choice case |
| AC | APM | Prioritization, strategy, problem solving | Direct user discovery, product/engineering trade-offs | Product decision case **demo B** |
| BA | DA | Reports and KPI analysis | Technical independence, query validation | Data cleanup and metric check |
| BA | BA | Requirements/process work | Depth of ownership and measurable outcomes | Requirements conflict case |
| BA | PA | Metrics, product-adjacent stakeholders | Cohorts, A/B tests, SQL at scale | Product churn diagnostic |
| BA | PO | Process mapping, cross-functional coordination | Release readiness, monitoring and escalations | Bottleneck case **demo C** |
| BA | PMM | Market-facing requirements/insights | Positioning, channel economics, messaging | GTM segmentation case |
| BA | APM | Requirement writing, delivery exposure | Customer problems, prioritization, outcomes | Scope and product strategy case |

### Profiling logic, all origins

1. Parse the supplied resume as candidate facts; **confirm** employer/role/dates and ask about contributions lacking ownership detail.
2. Ask which tools were used *independently*, *with AI help*, or merely observed. Don't infer mastery from skills keywords.
3. Ask about aspiration and desired nature of work. Show the aspiration among suggestions even when it conflicts with present alignment.
4. Generate up to three reasoned options + “Explore all roles”; separate **current alignment** from **preferred destination**.
5. After the user chooses, show **provisional** requirement map and explain challenging requirements with direct-route and optional stepping-stone options.

## 06 | Adaptive discovery question bank

Ask **one at a time**, only if the answer is not established. Each has a state field Pip should fill.

| ID | Trigger | Pip asks | Resulting field / branch |
|---|---|---|---|
| D01 | Resume processed | “I found [current role] at [employer]. Is this accurate?” | `profile.confirmation` → fix or accept |
| D02 | No resume | “What do you do now, and which two tasks occupy most of your week?” | `profile.role_tasks` |
| D03 | Work samples vague | “Describe one project: problem, your own contribution, tools, and result.” | `achievements[]` |
| D04 | Product claim | “Did you recommend requirements, write the PRD, build/test, or observe the release?” | `ownership.product` |
| D05 | Analytics claim | “Did you perform the analysis independently, with AI support, or review someone else's output?” | `tool_provenance` |
| D06 | Motivation unknown | “What would you like to do *more* and *less* of in your next job?” | `career.motivation` |
| D07 | Aspiration unknown | “Is there a role you especially want, even if it requires a big transition?” | `career.aspiration` |
| D08 | Desire vs alignment mismatch | “Would you like to prepare directly for [aspiration], compare a bridge route, or see both?” | `career.route_choice` |
| D09 | Urgency unknown | “Are you applying now or exploring over the next few months?” | `career.horizon` |
| D10 | Role requirements uncertain | “Which of [skill A], [skill B], [skill C] have you used in real projects?” | `skill_self_report` |
| D11 | Resume thin | “Any college, internship or volunteer project relevant to your chosen direction?” | `profile.missing_experience` |
| D12 | Discovery complete | “Here's what I heard. What would you correct before I suggest paths?” | `profile.user_approval` |

**Origin-specific high-signal probes:** JRA—who set research methodology, what decisions used findings, what analysis was personally executed? AC—did recommendation reach implementation, who made prioritization decisions, what deliverables were owned? BA—who validated requirements, were acceptance criteria written, how was impact measured after go-live?

**Question budget:** 3–6 core questions normally, extra only to resolve conflicting evidence. “Skip for now” and “Edit what Pip understood” are always present. No role choice on registration.

## 07 | Six authored assessment case banks (5 sequential questions each)

**Important:** Every question below is an original PivotPath adaptation mapped to the published role requirements / frameworks in Section 04. It is **not** asserted to be a verbatim employer interview question. Each case is answered one question at a time. A case starts with a synthetic scenario and ends in a decision or measurement step.

### PA · Product Analyst · Case PA-A (demo A, JRA→PA)

**Scenario:** A consumer app's downloads are stable, but weekly active users are down 15% for a month. Synthetic case; no real company is implicated. **Basis:** product funnels, cohorts and experimentation [S05, S06].

| Step | Prompt | Primary criterion | Excellent answer should include |
|---|---|---|---|
| PA1 | “What would you clarify before investigating the 15% decline?” | C1a | Metric definition, dates, segment, instrumentation, seasonality |
| PA2 | “Which usage funnel or cohorts would you examine first?” | C2b | Acquisition→activation→repeat use; weekly cohorts; denominators |
| PA3 | “Downloads are stable but first-week activation fell. Give three hypotheses and how you'd distinguish them.” | C2c | UX regression, mix shift, tracking issue; evidence per hypothesis |
| PA4 | “You can investigate only one hypothesis today. Which and why?” | C2d | Prioritization using impact, evidence and effort; check data validity |
| PA5 | “What would you measure after a fix, and what guardrail would you monitor?” | C2a | Activation and retained use; clear windows/guardrail |

### APM · Associate Product Manager · Case APM-A (demo B, AC→APM)

**Scenario:** A team has capacity to ship only one improvement in the next cycle: onboarding simplification, smarter notifications or a new recommendation feature. **Basis:** APM discovery, requirements and prioritization [S11, S12, S13, S14].

| Step | Prompt | Primary criterion | Excellent answer should include |
|---|---|---|---|
| PM1 | “What outcome and user group must be clarified before choosing?” | C1a | Customer need, baseline outcome, constraints |
| PM2 | “What evidence would you collect about the three opportunities?” | C1b | User research, funnel issues, costs, complaints |
| PM3 | “Choose one feature using explicit criteria and defend the trade-off.” | C4b | User impact, confidence, effort, risk, alternatives |
| PM4 | “What is the smallest testable version and how would you describe it to engineering?” | C4c | MVP scope, user story, acceptance conditions |
| PM5 | “What outcome metric and guardrails would decide whether to continue?” | C2a | Clear metric tree, experiment and risk constraints |

### PO · Product Operations Associate · Case PO-A (demo C, BA→PO)

**Scenario:** A digital onboarding process takes 30% longer this month even though application volume is stable. **Basis:** operational launch/metrics and requirements practice [S07, S08, S04].

| Step | Prompt | Primary criterion | Excellent answer should include |
|---|---|---|---|
| PO1 | “What would you clarify about turnaround time and the affected users?” | C5a | Mean/median, SLA, segments, measurement window |
| PO2 | “Map the stages, owners and possible queues.” | C5a | Queue time vs touch time, rework, handoffs |
| PO3 | “How would you separate a product defect from a staffing or process bottleneck?” | C2c | Logs, queue aging, errors, capacity measures |
| PO4 | “Pick a short-term containment and a longer-term change. Explain the trade-off.” | C5d | Escalation, prioritization, owner, root-cause remediation |
| PO5 | “What launch/QA and operational monitoring would prevent recurrence?” | C5b | SLA dashboard, alerts, UAT, post-fix checks |

### DA · Data Analyst · Case DA-A (analysis reasoning only)

**Scenario:** A signup dashboard shows 1,000 signups and 450 activated users this month, versus 800 signups and 400 activated last month. The new tracking event was introduced midmonth. **Basis:** DA analysis, data validation and metrics [S01, S02].

| Step | Prompt | Primary criterion | Excellent answer should include |
|---|---|---|---|
| DA1 | “Calculate activation rates for both months and interpret the change.” | C2a | 50%→45%; rates down 5 pp despite count up |
| DA2 | “What data-definition problems could make this comparison invalid?” | C3d* | Event change, unique IDs, eligibility, cutoff |
| DA3 | “What checks would you run before publishing the dashboard?” | C2c | Duplicates, missingness, join grain, window consistency |
| DA4 | “Which two segments would you compare first?” | C2d | New/returning, platform, source, region; rationale |
| DA5 | “How would you communicate this cautiously to management?” | C7a | Caveat, magnitude, next checks, no false causation |

*DA2 probes **technical concepts**, not executable technical ability. C3 remains `unassessed` without hands-on work.*

### BA · Business Analyst · Case BA-A (requirements elicitation)

**Scenario:** A company wants to replace spreadsheet-based leave approvals with a self-service workflow, but HR and line managers disagree on exception policies. **Basis:** requirements elicitation and solution evaluation [S03, S04].

| Step | Prompt | Primary criterion | Excellent answer should include |
|---|---|---|---|
| BA1 | “Who are your stakeholders and what outcomes do you clarify?” | C1b | Employees, HR, managers, payroll, audit, outcomes |
| BA2 | “How would you document the current process and pain points?” | C5a | Current-state steps, turnaround, error/exception rates |
| BA3 | “How would you resolve conflicting approval rules?” | C7b | Decision rights, exceptions, escalation, policy owner |
| BA4 | “State three testable requirements or acceptance criteria.” | C4c | Role permissions, SLA, audit trail, edge cases |
| BA5 | “What would you evaluate after rollout?” | C5c | Adoption, SLA, errors, auditability, employee feedback |

### PMM · Product Marketing Associate · Case PMM-A (positioning and GTM)

**Scenario:** A B2B analytics tool launches a simplified dashboard for small retail chains but adoption is low. **Basis:** PMM positioning, GTM and launch work [S09, S10].

| Step | Prompt | Primary criterion | Excellent answer should include |
|---|---|---|---|
| MK1 | “Who is the highest-priority buyer/user and what job do they need done?” | C1c | Decision maker, user, pain, segment selection |
| MK2 | “What positioning statement would differentiate the offer?” | C6b | Target, pain, value, proof, distinction |
| MK3 | “Which two channels would you test first with limited budget?” | C6c | Channel logic, reach, buying journey, resources |
| MK4 | “What would sales/customer-success need to explain the launch?” | C6c | Messaging, objections, demo, enablement |
| MK5 | “How would you measure launch success and separate awareness from activation?” | C6d | Funnel, conversion, adoption, feedback loops |

## 08 | Reassessment bank: different but comparable cases

| Original | Reassessment case / opening scenario | Matched rubric dimensions | Anti-memorization rule |
|---|---|---|---|
| PA-A | **PA-B:** Signup→verification conversion declines for one platform; compare cohorts, tracking and root causes | C1a, C2b, C2c, C2d, C2a | Different metric and context, same reasoning sequence |
| APM-A | **APM-B:** A job platform must choose between application-form simplification, search filters and recruiter messaging | C1a, C1b, C4b, C4c, C2a | Different feature options, same decision rubric |
| PO-A | **PO-B:** A feature launch causes a spike in support tickets and delayed resolutions despite stable staffing | C5a, C5a, C2c, C5d, C5b | Different process, same operations rubric |
| DA-A | **DA-B:** Purchases increase but revenue per active user declines after a pricing change | C2a, C3d concepts, C2c, C2d, C7a | Include denominator, definition, validity checks |
| BA-A | **BA-B:** Refund workflow requirements conflict between risk, finance and support | C1b, C5a, C7b, C4c, C5c | Different stakeholders, same elicitation rubric |
| PMM-A | **PMM-B:** An existing learning app launches a paid employer plan | C1c, C6b, C6c, C6c, C6d | Different audience and GTM, same rubric |

**Scoring comparison:** show latest question-level and competency-level observations side by side only when the dimensions are genuinely comparable; explain any hints, changed prompts, or changed difficulty.

## 09 | Rubric, branching and action contract

### Per-question 1–5 *formative* rubric

| Rating | Criterion | Coach response |
|---|---|---|
| Not assessable | Empty, repeated filler, irrelevant to question, or nonsensical | No score. Ask for a relevant attempt; offer example of what's needed |
| 1/5 | Relevant attempt but no coherent structure or usable justification | One concrete missing step + gentle scaffold |
| 2/5 | Some useful framing but fundamental gaps in analysis or decisions | Name omitted criterion; offer targeted guide |
| 3/5 | Adequate solution with assumptions/metrics or trade-offs underdeveloped | Specific improvement exercise |
| 4/5 | Clear, well-evidenced, appropriately scoped judgment | Deepen one caveat or edge case |
| 5/5 | Exceptional, precise, balanced, actionable **for this case** | Offer more demanding scenario; no automatic job certificate |

**Every evaluation returns**: case/question IDs; primary competency; rating or `not_assessable`; evidence snippets taken only from submitted answer; missed criteria; one prioritized next step; optional relevant source link; hints-used metadata; whether evidence is `self_report` or `case_observed`; revised next case ID. **No invented quotations or fabricated numeric certainty.** If feedback can't be reliably produced, label it demo/illustrative.

### Difficulty labels (qualitative only)

- **More accessible:** several key experiences confirmed and comparatively few major unknowns (role/posting-specific).
- **Preparation required:** relevant background but important capabilities need demonstration.
- **Significant transition:** major employer prerequisites or ownership gaps remain for the selected examples.

User aspiration overrides rankings. Pip may offer direct or intermediate paths, never silently reassign the target.

### Closed-loop branching

1. After role selection → generate provisional map with statuses `supported_by_confirmed_work`, `self_reported`, `unassessed`, `gap_observed`.
2. User corrects profile → update *claim/provenance*, not practice score.
3. After each case answer → validity check; if valid, rubric evaluation; question step advances on user confirmation.
4. If a dimension is weak → Pip proposes one specific resource + one comparable follow-up case; learning may be skipped.
5. Click **Practice this** → open exact case/question, not a generic practice landing page.
6. After reassessment → append evidence, show earlier/latest with caveats; don't silently overwrite history.
7. Resume suggestion → only from confirmed work facts or honest skill phrasing; user approves Accept/Revise/Reject before preview changes.
8. Optional project → external resource or project idea only; no upload, verification or invented portfolio achievement.

### Recommended resource mapping

| Gap | Practical resource | Scope and caution |
|---|---|---|
| SQL fundamentals | https://sqlbolt.com/ | External interactive SQL work; PivotPath cannot grade SQL execution |
| Product funnels/cohorts | https://www.amplitude.com/guides/product-analytics | Conceptual/practical product analytics |
| Requirements and stakeholder elicitation | https://www.iiba.org/knowledgehub/the-business-analysis-standard/ | Professional framework, may require further contextual learning |
| PM prioritization and trade-offs | https://www.atlassian.com/software/jira/product-discovery/resources/handbook/prioritization | Outcome-focused decisions, not memorized framework labels |
| Product marketing positioning | https://www.productmarketingalliance.com/how-to-prepare-for-a-product-marketing-interview/ | Practical expectations and prompts |
| Product interview reasoning | https://www.atlassian.com/company/careers/resources/career-growth/product-managers | Employer's published interview approach |

## 10 | Source registry (actual links)

| ID | Type | Publisher · source | Supports | Verified link |
|---|---|---|---|---|
| S01 | E | Fam — Data Analyst (posting; example asks 3–5 years SQL) | DA SQL/Python/Excel | https://jobs.lever.co/fampay/811d4537-ade2-43fa-83c5-e2d07839b402 |
| S02 | F | SQLBolt — interactive SQL lessons | External technical study | https://sqlbolt.com/ |
| S03 | E | Lingaro — Business Analyst, India | Elicitation/requirements/process | https://jobs.lever.co/lingarogroup/cd755053-4b17-4958-84be-6459737b0120 |
| S04 | F | IIBA — Business Analysis Standard | Elicitation, needs, solution evaluation | https://www.iiba.org/knowledgehub/the-business-analysis-standard/ |
| S05 | E | United Tech — Product Analyst (Web) | SQL, funnel, retention and testing | https://jobs.lever.co/vacancies/f74a4d8c-43d9-4b28-a49f-f42cf8d1c2da |
| S06 | F | Amplitude — Product Analytics Guide | Funnels, cohorts, retention, activation | https://www.amplitude.com/guides/product-analytics |
| S07 | E | Omnea — Product Ops | Launch coordination and metrics | https://jobs.ashbyhq.com/omnea/55478d98-7a69-4386-a57b-ecf6d88087c0 |
| S08 | E | Credo.AI — Product Operations Manager | Metric system, release readiness | https://jobs.ashbyhq.com/credo.ai/0d90b98f-0979-4b2f-b808-e38a90141ff1 |
| S09 | E | Primer.io — Product Marketing Associate | Messaging, positioning, GTM | https://jobs.ashbyhq.com/primer.io/70c05b42-ebfa-4806-8ef1-d042b6b6895f |
| S10 | F/I | Product Marketing Alliance — interview guide | Positioning and GTM themes | https://www.productmarketingalliance.com/how-to-prepare-for-a-product-marketing-interview/ |
| S11 | E | Metaforms — Associate Product Manager | Experience from business/analytical roles, user flows | https://jobs.ashbyhq.com/metaforms/11927a5f-ed4b-4e2a-ae42-aab75bb307c9 |
| S12 | E | Scan.com — Associate Product Manager | Discovery, PRDs, product outcomes | https://jobs.ashbyhq.com/scan-com/e3460b05-078d-4050-ab6a-e62a0f8733a7 |
| S13 | F/I | Atlassian — Product interview handbook | PM customer/outcome/communication expectations | https://www.atlassian.com/company/careers/resources/career-growth/product-managers |
| S14 | F | Atlassian — Prioritizing ideas | Prioritization reasoning | https://www.atlassian.com/software/jira/product-discovery/resources/handbook/prioritization |

**Research limitation:** These are illustrative posts and enduring professional references, not a representative quantitative sample. Recheck posting status, location, and exact experience requirement before displaying an employer card as current. The prototype must not call cases “asked at [company]” unless a separate, reliable source confirms that specific wording.

## 11 | Acceptance tests for the content engine

- **R01** JRA with documented PRD ownership is not treated identically to JRA doing only secondary research.
- **R02** AC targeting APM sees APM even if Pip proposes BA/PO as currently aligned alternatives.
- **R03** BA targeting PO receives PO readiness requirements, not a universal product-sense template.
- **R04** Source card always states whether evidence is company-specific, framework or authored scenario.
- **R05** Meaningless “AAAA...” response is `not_assessable`, never 1/5.
- **R06** SQL claimed in skills but not executed remains `self_report` / `unassessed`, not 4/5.
- **R07** Each of the five questions maps to the correct primary subskill and persists.
- **R08** Reassessment uses a *different* scenario and clearly compared dimensions.
- **R09** An incomplete optional project never becomes a resume accomplishment.
- **R10** A practice success can trigger a *suggestion* to describe a relevant skill, not a claim of work experience.
