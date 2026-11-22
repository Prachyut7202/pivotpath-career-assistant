# PivotPath — Pip Conversation & Assessment PRD

**Version:** 0.1 · **Status:** Product specification for review, not implemented · **Date:** 22 November 2026

## 1. Product problem and objective

**Problem:** Early-career professionals moving between research, consulting, business analysis, data and product work may have transferable experience but struggle to identify realistic destinations, understand target-role expectations, and demonstrate practical readiness. Conventional job descriptions and resume keywords alone do not establish applied capability.

**Objective:** Create a guided, conversational career assistant that helps a user (a) understand career-fit options while respecting their aspiration, (b) select one role, (c) see an explainable provisional readiness map, (d) complete short, role-specific analytical cases and a targeted learn/reassess loop, and (e) improve a factual, editable one-page resume.

**Assignment scope:** Three representative starting profiles; six navigable destination roles; three deeply scripted demonstration journeys; four user-visible workspaces (Discovery, Readiness, Practice & Improve, Living Resume). Pip guides all four. **One active target role at a time**, but changing it later retains profile history. This is an assignment prototype, not a validated employment-eligibility predictor.

### Starting profiles / test personas
1. **Junior Research Analyst:** research, sector benchmarking, competitive/market analyses and business insights; may or may not have independent technical or product execution.
2. **Associate Consultant:** business diagnostics, structured recommendations, stakeholder coordination and potential implementation exposure.
3. **Business Analyst:** process/requirements analysis, reporting, analytics and potential product delivery exposure.

### Available target roles
Data Analyst; Business Analyst; Product Analyst; Product Operations Associate; Product Marketing Associate; Associate Product Manager / Product Manager (experience expectations distinguished in role detail).

These are **starting archetypes**, not deterministic pathways. Work samples and stated responsibilities override job-title stereotypes. Never claim the title alone proves or disqualifies a competency.

## 2. Hard scope boundaries

**In scope:** Optional PDF/DOCX/TXT resume intake with explicit extraction/verification; conversational profile capture; curated and source-linked job requirement examples; preference-aware role shortlist; one selected aspiration; provisional competency map plus SWOT; guided 4–5 question cases; explainable role-specific feedback; one relevant learning resource and a different reassessment case; simple task tracking; an editable role-tailored one-page resume; context-aware Pip guidance throughout.

**Out of scope in first prototype:** uploading or grading portfolio projects; SQL code execution; automatically verifying employment history; statistically claiming hiring likelihood; direct Overleaf sync; broad job crawling; automatic modification of resume without approval; paid sign-in/accounts or fully deployed voice conversations. **Optional project suggestion only**: external resource or simple project brief, no submission or project-grade pipeline. Speech-to-text is optional after essential typed flows work.

## 3. Core journey and stages

| Stage | User experience | Minimum state/output | Next action |
|---|---|---|---|
| 0 Welcome | Pip explains what it can do; upload resume OR enter experience conversationally | Working profile record | Continue to profile confirmation |
| 1 Profile confirmation | Pip extracts employer/role/dates/projects where available; asks focused corrections; tracks self-reported vs imported | Confirmed career history + stated tools/ownership | Discuss aspiration |
| 2 Career discovery | Pip asks preferred work and desired career, then shows 3 explained role suggestions including the user's aspiration even if not top-aligned | Role shortlist + reasons + possible gaps | Select ONE active target |
| 3 Initial readiness | Requirements from a **specific cited employer/skill source** mapped to profile examples, with provisional status, not a hiring probability | Competency map + SWOT + uncertainty | Start assessment or open learning |
| 4 Practice | Pip guides sequential case questions and optional hints; answers saved per competency | Attempt, question responses and feedback | Show gaps and next action |
| 5 Improve / reassess | Relevant resource or optional project suggestion; new parallel case after user opts in | Learning task, follow-up attempt | Update readiness evidence |
| 6 Living Resume | Use imported factual content and confirmed additions; user chooses sections, edits via coach or direct click | Approved resume variant, PDF/LaTeX exports | Continue to apply or revise |

**Two loops:** The large loop restarts at career discovery only if aspiration changes. The **small loop** repeats Practice → Learn/Optional Project Suggestion → Reassess → Update Readiness, without requiring onboarding again. Resume edits can occur anytime and require user approval.

## 4. Pip interaction specification

- Persistent friendly mascot and chat drawer: small contextual next-step prompt plus optional free conversation; never blocks page content, and may be minimized or muted.
- Context read: current stage/page, verified profile, role aspiration, current skill map, case attempt, tasks, and existing resume.
- **Guidance, not endless questions:** one key question at a time; avoid asking for details already present in verified resume or previous answers.
- **Page actions:** Pip may suggest opening Readiness, starting a specific case, adding a practice task, or drafting a resume bullet; state-changing actions require user confirmation.
- **Answer provenance:** show whether a statement was imported from resume, self-reported, inferred, observed in a practice answer, or sourced externally.
- **Honesty:** if actual AI backend unavailable, clearly identify demo/sample responses and disable claims of authentic scoring. Do not portray scripted text as genuine AI feedback.

## 5. Adaptive discovery question bank

### Universal questions (ask selectively, skip known information)

| ID | Trigger | Pip question | Capture |
|---|---|---|---|
| D01 | Resume parsed | “I've found [role] at [employer] from [dates]. Is this current and complete?” | verified employment |
| D02 | Missing or sparse projects | “Which 1–2 projects best show what you actually contributed?” | accomplishments |
| D03 | Ownership unclear | “What did you personally define, analyze, build, implement or measure—and what did others own?” | ownership level |
| D04 | Tool listed | “Which tools did you use independently, with AI assistance, or only observe?” | technical evidence provenance |
| D05 | Career discovery | “What would you like to do more of in your next job, and what would you like to do less of?” | intrinsic preference |
| D06 | Aspirational role named | “Is there a particular role you want, even if it may be a challenging transition?” | aspiration must be retained |
| D07 | Fit constraints unknown | “Would you consider a product-adjacent stepping-stone role, or do you want to focus directly on [aspiration]?” | preferred route, nonbinding |
| D08 | Urgency unclear | “Are you preparing for a specific interview, applying now, or exploring over the coming months?” | goal horizon |
| D09 | Profile looks thin | “Is there an achievement, college project or responsibility missing from your resume?” | supplemental facts |
| D10 | Ready for recommendation | “I'll show your desired role alongside other aligned options and explain their requirements. Shall we compare them?” | consent to shortlist |

### Origin-specific probes

- **Junior Research Analyst:** “Did you independently choose the research method, sources or hypotheses?”; “What decision did the analysis inform?”; “Which analysis/data tools did you operate rather than direct through someone else?”
- **Associate Consultant:** “Did your work stop at recommendation, or did you participate in execution?”; “Have you drafted a requirements document or prioritized competing initiatives?”; “What stakeholder conflicts did you resolve?”
- **Business Analyst:** “Did you gather and validate user requirements, write user stories/BRDs or define acceptance criteria?”; “Have you measured post-implementation impact?”; “Which analyses did you personally execute?”

### Branching rules

1. If a resume clearly establishes a detail, **confirm** it; do not ask the user to type it again.
2. If an aspiration is expressed, carry it into the shortlist **even if fit is weak**. Do not override the user with the easiest option.
3. If role suitability is uncertain because ownership or technical execution is unclear, ask **one targeted clarifying question** before recommending.
4. Offer up to three explained suggestions initially, plus “Explore more roles.” Explain matched experiences and important unknowns.
5. Allow direct selection of any supported role. If transition is challenging, show a credible direct plan and optional alternative route—never label it impossible.

## 6. Competency taxonomy (MECE-oriented)

| ID | Family | Distinct scope | Typical destinations |
|---|---|---|---|
| C1 | Problem & Customer Understanding | Problem framing, discovery, stakeholder needs, user/market research | BA, PA, PM, PMM |
| C2 | Analytical Reasoning | KPI definition, funnels, cohorts, estimation, hypotheses, interpretation and experimentation reasoning | DA, BA, PA, Ops, PM |
| C3 | Technical Execution | Actual SQL/Python/Excel/BI/data validation and automation operation | DA, PA, selected BA/Ops |
| C4 | Product & Solution Design | User journeys, PRDs, prioritization, MVP definition, UX/solution trade-offs | PM, Ops, selected BA |
| C5 | Delivery & Operations | Workflow design, UAT, launch preparation, QA, operating metrics | Ops, BA, PM |
| C6 | Commercial & Growth | Segmentation strategy, positioning, messaging, pricing, GTM and adoption | PMM, PM, Ops |
| C7 | Communication & Ownership | Stakeholder influence, evidence-led storytelling, independent accountability | All |

Each assessed question has **one primary competency** and optional secondary observations. Do not double-count an answer across multiple overall scores. The actual role-specific competency requirements must come from cited sources (with role title, employer, seniority, URL and access date). Missing profile evidence is **Not yet demonstrated**, not proof of incompetence.

## 7. First readiness map: states, not fake percentages

Each requirement displays its source and one evidence state: `Relevant work described`, `Self-reported only`, `Assessed in practice`, `Needs further practice`, `Not yet assessed`. The user may add/correct details, but self-reports do not secretly become assessment scores. Each skill includes *Why does this matter?*, *What do employers expect?*, and *How can I show it?*. SWOT summarizes actual observations; opportunities/threats are external, strengths/weaknesses are internal. No arbitrary “67% ready” hiring probability.

## 8. Assessment design

- First case: 4–5 sequential prompts, roughly 10–15 minutes, one question visible at a time; ability to ask for a hint, clarify scenario, resume later, or skip.
- Case follows role and **origin-specific uncertainty**: for example, consultant with PRD experience tests trade-offs more deeply; research analyst with strong research history is tested on product metrics rather than redundant research basics.
- Guesstimate/numerical reasoning cases supported. **No fake SQL proficiency score** without executable SQL validation.
- Every question stores: ID, case ID, role, origin-adaptation, primary competency, source URL, source type (`official guidance`, `learning material`, `candidate report`, `synthetic adaptation`), user response, hints used, and feedback.
- Case scenarios below are **original illustrative adaptations of published competency themes**, NOT claimed to be verbatim questions previously used by a named employer.

### Demonstrator route A: Junior Research Analyst → Product Analyst
**Source basis:** Amplitude's guides on conversion funnels, cohorts and retention (https://www.amplitude.com/guides/product-analytics; https://amplitude.com/docs/analytics/product-analytics).

| Question | Prompt | Primary competency |
|---|---|---|
| PA1 | “A consumer app's weekly active users fell by 15% while installs stayed stable. What would you clarify before diagnosing the drop?” | C1 |
| PA2 | “Which engagement, activation, cohort and funnel cuts would you analyze first, and why?” | C2 |
| PA3 | “New signups are steady, but first-week activation dropped. Give three distinct hypotheses and the data needed for each.” | C2 |
| PA4 | “You can investigate only one hypothesis this week. Which one, and what trade-off drives your choice?” | C2 |
| PA5 | “What leading indicator and guardrail would tell you an intervention worked?” | C2 |

**Adaptation for a junior researcher:** acknowledge research/benchmarking experience, probe ability to define **product** behavioral metrics and translate insights into decisions.

### Demonstrator route B: Associate Consultant → APM
**Source basis:** Atlassian PM interview handbook and prioritization guide (https://www.atlassian.com/company/careers/resources/career-growth/product-managers; https://www.atlassian.com/software/jira/product-discovery/resources/handbook/prioritization).

| Question | Prompt | Primary competency |
|---|---|---|
| PM1 | “A job-search app wants to increase completed applications. Which user segment and problem would you investigate before building?” | C1 |
| PM2 | “Research suggests users abandon forms due to length, low trust, or poor job fit. How would you prioritize validating these?” | C4 |
| PM3 | “You have one sprint: simplify applications or add better job recommendations. How would you decide?” | C4 |
| PM4 | “What metric hierarchy and guardrails would you use to evaluate your chosen solution?” | C2 |
| PM5 | “What would you do if engineering constraints invalidate your initial scope?” | C5 |

**Adaptation for an associate consultant:** recognize problem structuring and stakeholder work, test product-user understanding, prioritization and delivery trade-offs rather than another generic strategy framework.

### Demonstrator route C: Business Analyst → Product Operations
**Source basis:** IIBA's business analysis standard and elicitation process (https://www.iiba.org/knowledgehub/business-analysis-standard/4-tasks-and-knowledge-areas/introducing-business-analysis-tasks; https://www.iiba.org/knowledgehub/business-analysis-standard/).

| Question | Prompt | Primary competency |
|---|---|---|
| PO1 | “Customer onboarding turnaround increased 30% while request volume stayed stable. What do you clarify?” | C5 |
| PO2 | “Map the stages and stakeholders. Where could queue time and rework arise?” | C5 |
| PO3 | “What metrics or evidence would differentiate a process bottleneck from a product bug?” | C2 |
| PO4 | “What short-term intervention and longer-term process change would you prioritize?” | C5 |
| PO5 | “What monitoring, QA and cross-functional coordination would prevent recurrence?” | C5 |

**Adaptation for a business analyst:** recognize requirements and process mapping, test operating ownership, implementation and monitoring.

### Remaining role availability
For V4, offer these as role-discovery options. Before claiming full assessment coverage, prepare a similarly sourced case and rubric:
- **Data Analyst:** business-data interpretation and validation, not executable SQL assessment; use clear provided tables.
- **Business Analyst:** stakeholder elicitation, conflicting requirements and acceptance criteria (IIBA).
- **Product Marketing Associate:** customer segmentation, positioning, messaging and GTM prioritization (Product Marketing Alliance: https://www.productmarketingalliance.com/how-to-prepare-for-a-product-marketing-interview/).

If depth is limited, show those roles as explored/available and label the full assessment as not yet implemented, rather than pretending identical cases assess all six.

## 9. Scoring and feedback contract

**Reject invalid/unassessable responses** (repeated filler, irrelevant text, empty responses) as `Not assessable`; provide a constructive retry prompt and no positive proficiency claim. Meaningful weak responses can receive 1/5.

For each question score against pre-specified, observable criteria on a 1–5 formative scale:
- 1 = relevant attempt, little structured reasoning;
- 2 = partial framing, important missing logic;
- 3 = adequate approach with gaps or unjustified trade-offs;
- 4 = strong, appropriately scoped and evidence-led answer;
- 5 = exceptionally thorough, precise, balanced and actionable **for this exercise**.

Feedback must return: `rating`, `competency`, `what_the_user_did_well` (quotation or concise reference to answer), `missed_criteria`, `one_next_step`, `optional_hint_or_reading`, and `next_case_id`. Do not invent what the user said. Make case use of hints visible; do not secretly penalize users for asking for help. If multiple cases are required for a stronger claim, label a single rating as *one exercise*, not a profession-level certificate.

### Learning loop
1. If formative performance is weak or user asks for help: explain the **specific missing reasoning**, link one high-quality resource, offer a small guided example.
2. Offer an **optional project recommendation** if the user wants broader portfolio experience; no upload/grading required in MVP.
3. Present a **different comparable case** after improvement; compare like-for-like rubric dimensions and show explicit change.
4. Record assessment history to support the readiness map; no separate project submission or competency verification system.
5. If ready for resume update, distinguish evaluated interview skill from genuine work/project experience and require explicit approval.

## 10. Living Resume contract

- Preserve the uploaded resume's content and section structure in a **master profile**; a role-specific one-page **version** may prioritize or omit items, but never delete source facts.
- A4 one-page template modeled on the supplied user's LaTeX PDF: centered name/contact, colored section headings, structured two-line entries, compact impact bullets. Sections: Education, Experience, Internships, Projects, Skills, optional Certifications and Achievements.
- Direct click on any field to edit; Pip can ask for specifics and draft **only factual** additions; Accept / Revise / Reject before applying.
- If new content doesn't fit, suggest lower-priority bullets to shorten or omit from this version; user chooses. Do not reduce legibility or fabricate metrics.
- Skills inferred from practice may be **suggested** for the resume if relevant, but an exercise score cannot be described as professional tenure or proof of a deployed project.
- Optional project advice: link to a resource or propose a project brief, but do not require upload or maintain project grading statuses.
- PDF export and LaTeX export, with user-facing editor hiding the code. No Overleaf integration needed in MVP.

## 11. Minimal product data and actions

**Profile:** name/contact, education, employment history, achievements/projects, tools with independence marker, source provenance and confirmations.

**Career target:** aspiration, top suggestions with explanation, one active goal, cited requirements, possible transition route.

**Readiness:** per-requirement evidence state, self-report, task/action state, latest practice evaluations.

**Practice:** case ID, question ID, answers, hints used, feedback/rubric, completion and follow-up case.

**Resume:** original extracted content, chosen sections, role-specific variants, pending proposals, accepted revisions.

Pip may **read** all of this contextual state. Pip may **propose**, but any modification to profile facts, career target, skills or resume requires user approval. A practice submission can update practice history automatically, with a clear user-visible explanation.

## 12. Functional acceptance criteria (must pass before a public demo)

1. User with valid profile inputs can enter workspace **with no resume**; PDF/DOCX picker displays accepted files; failed parsing is explicit.
2. Onboarded profile information survives navigation and refresh; name and edits appear in profile and resume.
3. Pip asks only missing details, never forces a target role before discovery, and respects the chosen aspiration.
4. Changing career paths does not erase the original career history; only one role is actively assessed.
5. Initial map differentiates imported evidence, self-report, untested skills, and practice observations; no unsupported readiness percentage.
6. Five ordered questions appear one at a time for the chosen case; the Next control advances, works on mobile, and retains responses.
7. Repeated filler is `Not assessable`; meaningful responses receive role-specific, evidence-linked feedback.
8. Clicking a prescribed practice action opens the exact skill-specific case, **not the same first question for all actions**.
9. Completing a comparable reassessment updates the correct competency and shows old/new performance along with remaining uncertainty.
10. Pip can propose a resume change from user-confirmed details; Reject leaves the original intact; Accept updates the exact preview field.
11. Optional project suggestions do not require artifact upload; no automatic project claims on resume.
12. **Live AI backend really works end to end** or the experience is clearly labeled demo and no real personalized scoring is implied.

## 13. Prototype success measures and next work

**Primary test outcome:** user completes one focused career improvement loop: goal selected → one relevant case answered → specific feedback understood → next action selected → follow-up case attempted.

**Diagnostic measures:** onboarding completion; recommendation relevance and user understanding; first-case completion; feedback usefulness; action-click-to-right-destination; reassessment rate; approved resume edit; invalid-answer false positives; core-flow blocker rate.

**Build order:** (1) finalize question/rubric and source registry, (2) design screen-level state transitions, (3) implement/test real Pip backend, (4) profile + discovery, (5) sequential practice + linked task + reassessment, (6) role-tailored one-pager, (7) usability test against all three personas, (8) prepare short assignment documentation + growth communication plan and deploy.

### Reference sources (verified publicly, Nov 2026)
- Atlassian, Product Interview Handbook: https://www.atlassian.com/company/careers/resources/career-growth/product-managers
- Atlassian, Prioritizing Ideas: https://www.atlassian.com/software/jira/product-discovery/resources/handbook/prioritization
- IIBA, Introducing Business Analysis Tasks: https://www.iiba.org/knowledgehub/business-analysis-standard/4-tasks-and-knowledge-areas/introducing-business-analysis-tasks
- IIBA, Business Analysis Competency Model: https://www.iiba.org/professional-development/business-analysis-competency-model
- Amplitude, Guide to Product Analytics: https://www.amplitude.com/guides/product-analytics
- Amplitude, Analytics Documentation: https://amplitude.com/docs/analytics/product-analytics
- Product Marketing Alliance, How to Prepare for a PMM Interview: https://www.productmarketingalliance.com/how-to-prepare-for-a-product-marketing-interview/

**Source classification:** These sources establish broad job competency areas and methodological interview themes. The six cases above are authored adaptations, not unverified claims of verbatim employer interview questions. A subsequent source registry should attach particular job postings with title, location, seniority, exact requirements, URL and date to individual role cards.