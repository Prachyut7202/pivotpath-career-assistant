# PIVOTPATH · PIP-GUIDED WEBSITE / UI PRD

**Version 1.0 | 22 November 2026 | Implementation specification**  
**Companion:** `01_Role_and_Assessment_Matrix.md` is the authoritative skill, source, case and scoring dictionary.  
**Status:** Ready to implement/test as an assignment prototype; not a claim that the V3.2 demo already satisfies these requirements.

## 01 | Product contract

**Audience:** early-career professionals transitioning from junior research/analytics, associate consulting, or business-analysis work into adjacent data, business and product roles. **User chooses the aspiration**. Pip recommends, explains, guides and offers alternatives but never silently changes the destination.

**Three core use cases for the assignment:** (UC1) discover suitable transitions while preserving aspiration, (UC2) practice and close a verified competency gap, (UC3) improve a factual, tailored living resume. **Four visible workspaces:** Career Discovery, Readiness Map, Practice & Improve, Living Resume. **Profile** is a shared foundation; **Pip** is a persistent coach across all pages.

**Main path:** Welcome → resume/manual intake → verify profile with Pip → aspiration and shortlist → choose one active goal → provisional readiness/SWOT → sequential case → feedback → resource + reassessment → approved resume suggestion. **The inner cycle** is assess → learn → reassess, and may repeat without onboarding again.

**Not in prototype:** project upload/grading, SQL code execution, automated hiring-prediction scores, direct Overleaf syncing, mass job scraping, paid authentication; voice input is a progressive enhancement, not a blocker. Do not silently rewrite resume data or present static sample AI feedback as real scoring.

## 02 | Navigation and coach behavior

### Desktop layout

- Left nav: **Discovery · Readiness · Practice & Improve · Living Resume**; Profile accessible via avatar/menu.
- Top bar: chosen target role (or `Discovering`), progress breadcrumb, profile status, and a visible **Continue where I left off** action.
- Persistent Pip mascot in corner with one helpful context-specific message; **Open Pip** expands a right-side conversation panel without replacing the current workspace.
- Main content keeps one dominant CTA. Secondary actions: `Skip for now`, `Back`, `Review information`, `Ask Pip`.

### Mobile layout

- Bottom nav for four modules, Pip chat as bottom drawer; form buttons remain reachable; keyboard does not hide submit or Next; Pip never covers main CTA.
- Speech-to-text button can appear only if browser grants microphone permission; manual typing must always work.

### Pip conversation contract

| Behavior | Requirement |
|---|---|
| Awareness | Receives current route, latest approved profile, active goal, relevant source cards, case state, action plan, resume variant |
| Guided prompts | At most one essential question at a time; quick replies optional; user can type freely or skip |
| Proactivity | Appears at logical milestones, not on every click; can be minimized/muted |
| Site actions | Can **propose** `open_route`, `set_goal`, `start_case`, `add_task`, `suggest_resume_edit` with exact IDs and a visible confirmation |
| Trust | Explicitly separates `extracted_from_resume`, `user_confirmed`, `self_reported`, `case_observed`, and `external_source` |
| Context | Knows current case question and previous answers; doesn't repeat verified background questions |
| Failure | If model unavailable, show a clear connection error, save work, and offer non-AI navigation; no silent canned response pretending to be AI |

## 03 | Screen specifications

### S00 · Welcome and account-free workspace entry

**Purpose:** user understands value and starts without premature career selection.

| Aspect | Specification |
|---|---|
| Visible content | One-sentence value proposition; small Pip intro; choices **Upload resume** and **Tell Pip about my work** |
| Inputs | Resume file optional; no required target role; user can choose a display name or continue |
| Primary CTA | `Get started` → S01; direct `Continue without resume` → S01 manual path |
| Pip prompt | “I'll learn about your experience first, then help you explore where you could go. We can use your resume or talk it through.” |
| Writes | `session.id`, `onboarding.method`, `onboarding.stage=S01` |
| Error / edge | File is not required; invalid file has visible format message without blocking manual path |
| Acceptance | A user with no resume reaches S01; a user with PDF/DOCX sees it in picker; no authentication dead-end |

### S01 · Resume import or conversational profile capture

**Purpose:** collect initial experience without losing source facts.

| Aspect | Specification |
|---|---|
| Visible content | Resume upload zone + `Enter experience manually` alternative; extraction state; consent and privacy note |
| Inputs | `.pdf`, `.docx`, `.txt`, `.md` (and `.tex` optionally); size/parse errors explicit; fields include education, employer, role, dates, project bullets, skills |
| Primary CTA | `Review my profile` → S02; if not uploaded, quick work-history prompts → S02 |
| Pip prompt | From extracted text: “I found [employer], [role], and [project]. Shall we check these?”; without text: “What have you worked on recently?” |
| Writes | `profile.raw_resume`, `profile.extracted_draft`, `profile.sources[]` (not approved facts yet) |
| Error / edge | PDF picker selection **is not** synonymous with parsed text. Failed parser: “I can see the file but could not read its content”; `Paste text` or `Continue manually` |
| Acceptance | Imported content is visible for review; blank resume succeeds; no fabricated missing fields |

### S02 · Confirm profile and ownership

**Purpose:** distinguish resume keywords from proven tasks and individual ownership.

| Aspect | Specification |
|---|---|
| Visible content | Structured timeline, education, tools, 1–3 key achievements, editable fields, data-origin tags |
| Inputs | `confirm/correct` employer & dates; project problem→action→result; tools `independently / AI-assisted / observed` |
| Primary CTA | `Looks right, continue` → S03; `Edit profile` stays S02 |
| Pip prompt | One targeted probe, e.g. “Did you own the PRD, help build the tool, or only support research?” |
| Writes | `profile.verified_claims`, `experience.ownership_evidence`, `tools.provenance` |
| Error / edge | If user skips an unknown, mark it `unconfirmed`; don't require exhaustive typing |
| Acceptance | Editing name/work dates updates profile immediately and feeds Living Resume; source resume is retained as an immutable original |

### S03 · Career motivation conversation

**Purpose:** understand aspiration before rankings.

| Aspect | Specification |
|---|---|
| Visible content | Pip chat full-width or focused card, optional guided chips, a live “What I heard” summary |
| Inputs | Desired nature of work; aspirational role if any; urgency; optional geography/compensation preference |
| Primary CTA | `Show possible paths` → S04; `Skip this question` only for nonessential preferences |
| Pip prompt | “What would you like to do more of in your next role? Is there a role you're already aiming for?” |
| Writes | `career.preferences`, `career.aspiration`, `career.horizon` |
| Error / edge | If aspiration unknown, recommend exploration; never invent a desired role from the title alone |
| Acceptance | If user says “APM, despite the difficulty,” S04 includes APM regardless of alignment ranking |

### S04 · Role shortlist and aspiration–alignment comparison

**Purpose:** show realistic routes without substituting Pip's preference for the user's.

| Aspect | Specification |
|---|---|
| Visible content | Up to three suggested role cards including aspiration; each: why it fits, confirmed transfer skills, unknowns, cited examples, transition level and caveat |
| Inputs | Select goal; `Explore all 6 roles`; `Why is this a stretch?`; select direct/bridge route preference |
| Primary CTA | `Use [selected role] as my goal` → S05 |
| Pip prompt | “You want [role]. Your experience also suggests [other role]. Here's the difference and a route to your choice.” |
| Writes | `career.recommendations[]`, `career.active_goal`, `career.route_preference` |
| Error / edge | No fit percentage and no blanket years thresholds; use specific job posting requirements, date and seniority caveat |
| Acceptance | Chosen aspiration persists on all subsequent pages; alternatives are advisory, not forced |

### S05 · Explainable initial Readiness Map + SWOT

**Purpose:** reveal known strengths, uncertainty and target-role requirements *before* testing.

| Aspect | Specification |
|---|---|
| Visible content | One active-role header; competency rows; status tag, why, supporting resume quote/claim, cited requirement, next assessment; concise SWOT; edit self-report |
| Inputs | Correct a skill claim, add context, mark `I've used this`, ask Pip about a gap, start assessment |
| Primary CTA | `Assess my highest-priority gap` → S06 with exact case ID |
| Pip prompt | “I've found evidence for [X], but [Y] is not yet demonstrated. Would you like to test [Y]?” |
| Writes | `readiness.initial`, `readiness.provenance`, `readiness.swot`; user self-edit changes evidence label only |
| Error / edge | `Unassessed` is not a weakness; no aggregate “75% job ready” |
| Acceptance | Every status has an evidence/source explanation; user correction cannot artificially add practice points |

### S06 · Practice case — focused sequential interface

**Purpose:** one clear question at a time, suited to origin and chosen destination.

| Aspect | Specification |
|---|---|
| Visible content | Case scenario, progress (`Question 2 of 5`), one question, answer box, previous answer summary, `Hint`, `Ask Pip`, `Submit answer`, `Back` |
| Inputs | Typed answer; optional speech-to-text to input only; no SQL code execution; hints recorded |
| Primary CTA | `Submit answer` → validate → S07 feedback for current question; `Next question` appears after valid evaluation |
| Pip prompt | Explanation or targeted hint **about this question**; doesn't reveal rubric-perfect answer before attempt unless user asks to learn instead |
| Writes | `attempt.question_id`, `answer`, `hint_usage`, `submitted_at`, `evaluation_status` |
| Error / edge | Empty/repeated filler → `Not assessable` and remain on current question. Refresh resumes same question; button never returns to question 1 accidentally |
| Acceptance | Five sequential questions, answers persisted, Next advances deterministically, each case ID opens the correct exercise |

### S07 · Question feedback / case summary

**Purpose:** make evaluations specific, credible and useful.

| Aspect | Specification |
|---|---|
| Visible content | Rating 1–5 **for that question** or `Not assessable`; two evidence-linked strengths; missing rubric criteria; one actionable next step; after Q5, case summary by competency |
| Inputs | `Explain feedback`, `Show example structure`, `Next question`, `Review full attempt` |
| Primary CTA | For Q1–Q4: `Next question` → S06 next ID; after Q5: `Build improvement plan` → S08 |
| Pip prompt | “You used [actual phrase/idea], which addresses [criterion], but missed [specific criterion].” |
| Writes | `evaluations[]`, `readiness.case_observed`, `attempt.completed` when Q5 done |
| Error / edge | If AI service fails or feedback doesn't cite observed answer, don't score. Offer `Retry evaluation`; keep saved answer |
| Acceptance | Clearly traceable answer→criterion→feedback; no fictional quotations; no new job-readiness % |

### S08 · Action plan / learning resource / optional project

**Purpose:** convert one observed weakness into a reachable next action.

| Aspect | Specification |
|---|---|
| Visible content | Top 1–3 priority gaps; each has why, source, one learning link, targeted practice case ID, optional project idea |
| Inputs | `Open resource`, `Try guided example`, `Reassess`, `Add personal action`, `Mark reading done` |
| Primary CTA | `Try another case` → S09 with **different** reassessment case matching same competency |
| Pip prompt | “Your metrics explanation missed denominator checks. Review this guide or try a scaffolded example before reassessing.” |
| Writes | `tasks[]` with `competency_id`, `resource_url`, `target_case_id`, status and timestamps |
| Error / edge | Reading done ≠ competency demonstrated; custom action must appear immediately; no dead links or generic first-case redirect |
| Acceptance | Every task has valid destination; custom task persists; task completion doesn't silently change rating |

### S09 · Reassessment and progress comparison

**Purpose:** compare performance on a new, similar case and update observed skill evidence.

| Aspect | Specification |
|---|---|
| Visible content | New scenario ID (B variant); same question flow; after completion side-by-side rubric dimensions: previous vs latest, with caveats |
| Inputs | Answer new sequence; `Compare progress`, `Try harder case`, `Return to readiness` |
| Primary CTA | `Review updated map` → S05; optional `Improve my resume` → S10 |
| Pip prompt | “Your reasoning on [criterion] improved from [observed earlier] to [observed later], but this remains a practice assessment.” |
| Writes | `attempts[]` append-only, `readiness.latest_case`, no erasure of original score |
| Error / edge | If cases not comparable, say `Not directly comparable` rather than drawing a numeric trend |
| Acceptance | Distinct case content; score history preserved; scoped competency updates only |

### S10 · Living Resume workspace

**Purpose:** user can maintain a professional one-pager by talking to Pip or clicking fields; coding stays hidden.

| Aspect | Specification |
|---|---|
| Visible content | Dedicated tab, one-page A4 preview based on supplied LaTeX style; section navigator; side Pip coach; master/source resume vs target-role resume variant |
| Inputs | Click name/contact/role/bullet to edit; include/exclude section; `Help write bullet`; accept/revise/reject proposed change; export PDF/.tex |
| Primary CTA | `Review suggested edit` then `Accept` → preview updates exact field; `Export PDF` |
| Pip prompt | “Tell me what you did, how, and what changed. I'll draft a factual bullet for your approval.” |
| Writes | `resume.master`, `resume.variants[target_role]`, `resume.proposals[]`, `resume.version_history[]` |
| Error / edge | No fabricated employer/metric; preserve full master; one-page overflow → suggest which low-relevance item to shorten/exclude **for this version**, not auto-delete |
| Acceptance | Imported original facts maintained; click-to-edit works; accept changes one preview field, reject leaves original; export preserves formatting & links |

### S11 · Settings / privacy / continuity

| Aspect | Specification |
|---|---|
| Visible content | Edit profile, erase local data, export career data, change active goal, mute Pip, privacy explanation, connection status |
| Inputs | `Reset demo`, `Delete saved data`, `Download my data`, optional speech toggle |
| Primary CTA | `Save` or `Return to workspace` |
| Pip prompt | No intrusive prompts; settings purely optional |
| Writes | Local preferences; explicit consent-based deletes |
| Error / edge | Never show obscure server access-code field in consumer UI; API keys remain server-side |
| Acceptance | No silent data loss; user can erase local state and return to welcome |

## 04 | Critical state and action schema

### Main objects

```text
UserProfile {
 id, name, contact, education[], employment[], projects[], achievements[],
 resume_original_file_metadata, resume_original_text, claims[{value,source,confirmed}],
 tools[{name,usage:'independent'|'AI-assisted'|'observed'|'unknown'}]
}
CareerContext {
 aspiration, preferences, horizon, recommended_roles[], active_role_id,
 transition_route:'direct'|'skill_bridge'|'optional_intermediate', citations[]
}
Readiness {
 role_id, requirements[{id,source_id,evidence_ids[],status}], swot,
 case_observations[{competency_id,attempt_id,question_id,rating,criterion_id}]
}
CaseAttempt {
 id,case_id,role_id,variant:'A'|'B',index,answers[],hints[],evaluations[],completed_at
}
ActionPlan { tasks[{id,competency_id,title,resource_url,case_id,status,created_at}] }
Resume { master, variants_by_role, proposals[{target_field,before,after,source_claims,status}], versions[] }
CoachSession { active_screen, last_step, thread[], muted, outstanding_confirmation }
```

**Identity rule:** `source_claim_id` ties a resume phrase to an actual verified input; `competency_id` links role requirements → question rubric → action → reassessment; `case_id + question_id` define deterministic navigation. Pip must not infer identifiers from free-form text.

### Allowed AI-assisted site actions (confirmation policy)

| Action | May Pip execute automatically? | Required safeguard |
|---|---|---|
| `open_screen` | Yes (after explicit user request or clicked CTA) | Target route must exist |
| `save_practice_answer` | After user submits | Save verbatim; immutable submission record |
| `append_evaluation` | After valid answer + reliable evaluator | Scope to criterion; show feedback & basis |
| `suggest_role` | Yes | Present as recommendation with reasons |
| `set_active_role` | **No** | User confirms role selection |
| `add_task` | **No** | User approves proposed task |
| `edit_profile_fact` | **No** | User confirms factual correction |
| `apply_resume_edit` | **No** | User previews exact diff and approves |
| `delete_data` | **No** | Separate explicit confirmation |

## 05 | AI backend behavior and guardrails

### Service boundary

- Frontend sends only the **minimum relevant state** for a specific coach/evaluator request to the server. Never put a secret API key in HTML, JavaScript bundle or browser storage.
- `POST /api/coach`: message + route + structured context → `{reply, suggested_actions[], follow_up_question}`. Validate action types/targets against local registry. Show network failures clearly.
- `POST /api/assess`: case/question ID + user answer + rubric ID + relevant prior context → typed `{assessable, rating?, evidence[], missed_criteria[], next_action, uncertainty}`. Server validates data shape, rejects unassessable responses before awarding scores, and cannot access private resume text unless supplied with permission.
- `POST /api/resume-suggest`: verified claims + selected field/role + user's instruction → `{draft, supporting_claim_ids[], changes[]}`. **No direct application**; reviewable preview required.
- `POST /api/parse-resume`: file upload with explicit user permission → structured extracted draft + parser warnings; return `parse_status` `success/partial/failure`. For a standalone no-backend demo, disable this with plain explanation rather than fake parsing.

### Required model instructions and response shape

- Never invent employers, skills, metrics, dates, test results, user quotations or job evidence.
- Respect user's chosen aspiration. Recommend adjacent careers as options only.
- Every rated question references specific submitted response fragments and rubric criteria; unassessable filler returns `rating=null`.
- Missing job information or source ambiguity must be flagged, not averaged into an unsupported market expectation.
- Prompts and page state may propose actions but **cannot bypass consent gates** for resume/profile/goal modifications.
- On timeout/unavailable AI: persist user entry, show truthful error, offer retry or manual navigation; never silently substitute fictional evaluation.

### Local persistence for prototype

Use browser-local data only with clear disclosure: profile, conversation, attempt state, tasks and resume variants persist across refresh. Because this is not account login, cross-device sync and security guarantees must not be claimed. Offer Delete/Export and a reset mechanism for demo testers.

## 06 | Readiness and SWOT computation contract

**Initial requirements:** authored from source-backed destination expectations and a profile evidence graph (not a score). Classification per requirement:

| Status | When assigned | How displayed |
|---|---|---|
| `supported_by_work` | User-confirmed, relevant actual task/accomplishment | “Experience suggests exposure” + precise work excerpt |
| `self_report` | Skill claimed or resume keyword only | “Claimed; practical level not established” |
| `not_assessed` | No relevant confirmed work/case | “Unknown / not yet assessed” |
| `practice_observed` | Valid scored case on matching criterion | “Observed on case [ID]” + rating for exercise |
| `needs_improvement` | Case exposed specific weakness | “Practice indicated a gap in [criterion]” |

**SWOT:** Strengths = supported work or strong case observations; Weaknesses = specific observed gaps; Opportunities = roles/projects/learning routes external to person; Threats = external role prerequisites and competition/market expectations. Self-report alone cannot be a verified strength, and unassessed is **not** weakness by default.

**Progress rule:** ratings change only upon valid matched case evidence; profile edits may change match explanations, not historical practice results. No universal readiness percent. A two-case trend is a formative observation with uncertainty.

## 07 | Living Resume formatting requirements

Reference: user-provided **one-page A4 LaTeX template** and matching PDF (November 2026). Preserve structure, not personal contact information as a generic default.

- Header: centered name with clickable phone/email/LinkedIn/portfolio, using profile fields.
- Sections: Education; Professional Experience; Internships; Projects; Skills; optional Certifications/Achievements/Leadership/Publications.
- Entry: organization/left title and right location; supporting role and right dates; impact bullets with selective bold results.
- Template: compact readable type; blue section headings/dividers; controlled spacing; hyperlinks preserved. Do not shrink type indefinitely to force one page.
- Master profile stores everything; target-role one-pager stores **inclusion/ordering choices**. Keep all excluded material recoverable.
- Overflow dialog: `This version exceeds one page. I suggest shortening [specific bullet] or omitting [lower relevance entry]. Review?` No silent removal.
- User action: click any editable text in preview → field editor; coach suggests factual rewrite; Accept/Revise/Reject; preview updates same field; undo/version history.
- Exports: PDF and .tex. If export fails, show error, do not claim success. Direct Overleaf sync is out of scope.

## 08 | Interaction QA checklist — specifically covers V1–V3 failures

| ID | Test | Expected |
|---|---|---|
| T01 | Start with no resume | Profile creation and subsequent navigation succeed |
| T02 | Choose valid PDF/DOCX in file picker | File visible; `parse_status` truthful; extracted content reviewable only on success |
| T03 | Experience = 1.6 or 1.7 years | Accepted; no hidden HTML step=0.5 restriction |
| T04 | Every required field filled; no resume | CTA opens next screen; visible message if anything truly invalid |
| T05 | Edit name/employer after onboarding | Profile and resume preview update appropriate fields |
| T06 | Desire APM but recommendation is BA | APM remains selectable and is not overwritten |
| T07 | User marks SQL “I know it” | Mark self-reported, not independently validated |
| T08 | Enter repeated filler in case | No positive rating; remain on question with helpful retry |
| T09 | Submit valid answer on Q1 | Feedback references user's answer; Next takes Q2, not Q1 |
| T10 | Refresh after Q3 | Restore Q3 / pending feedback and previous answers |
| T11 | Click action for Product Metrics | Opens linked product metrics case, never generic first practice |
| T12 | Add a custom action | Task immediately visible, editable and persists after refresh |
| T13 | Finish case A then reassess | Case B genuinely differs; scores compared only on matched rubric |
| T14 | Click a resume bullet and ask Pip to rewrite | Proposal appears in exact field; no change until Accept |
| T15 | Reject suggested edit | Before text restored/unchanged, master content retained |
| T16 | Resume overflow | Explain options and ask user to approve rather than delete |
| T17 | Open in narrow/mobile viewport | CTA usable; Pip drawer dismissible and does not cover content |
| T18 | AI backend disconnected | Clear non-AI state, no fabricated coaching or scoring |
| T19 | Delete profile data | Confirmation then all saved local state cleared |
| T20 | Complete one end-to-end persona journey | All steps reachable, no dead links, final resume suggestion reviewable |

## 09 | Minimal event taxonomy / assignment metrics

| Event | Key payload (no confidential resume content) | Why track it |
|---|---|---|
| `onboarding_started` | method | Adoption of resume vs conversational entry |
| `profile_confirmed` | persona_class, fields_confirmed | Activation and time to confidence |
| `career_shortlist_viewed` | options_count, includes_aspiration | Discovery utility |
| `target_role_selected` | target_role_id, route_choice | User-goal commitment |
| `readiness_viewed` | role_id, unassessed_count | First value moment |
| `case_question_submitted` | case_id, question_id, assessable | Funnel and input quality |
| `case_completed` | role_id, case_id, duration_bucket | Core action completion |
| `learning_action_opened` | competency_id, resource_id | Utility of recommendations |
| `reassessment_completed` | role_id, matched_dimensions_count | Closed-loop adoption |
| `resume_edit_approved` | section, source_type | Tangible career action |
| `flow_error` | screen, error_code | Detect usability blockers |

**Prototype North Star candidate:** **Users completing a meaningful improvement loop**—case completed + a targeted next action + a different reassessment case. This is behavioral completion, **not proven career success**. Guardrails: invalid answer score rate, resume fabrication/unsupported-claim rate (target zero), broken-link rate, coach intrusion/close rate.

## 10 | Implementer handoff and dependency order

| Build order | Output | Required before |
|---|---|---|
| 1 | Shared state schema, seeded three personas, six-role source/case registry | All screens |
| 2 | Real AI endpoints with typed responses and clear demo/offline distinction | Genuine coach + scoring |
| 3 | S00–S04 onboarding/discovery with aspiration respected | Career recommendation demo |
| 4 | S05–S09 readiness/practice/feedback/reassess with exact case IDs | Closed-loop demo |
| 5 | S10 Living Resume based on master/variant/proposals | Application-readiness demo |
| 6 | Cross-page Pip actions, optional mic input, responsive polish | Usability testing |
| 7 | Run T01–T20 across all 3 personas, record blockers and fixes | Hosted demo and submission |

### Release gate

**Do not present V4 as a “working AI Career Assistant” until:** (a) at least one full three-persona journey works without dead ends, (b) Pip can actually reason from approved profile and active case context, (c) practice scoring is rubric/evidence-linked or honestly labeled not assessed, and (d) resume edits are approved and reliably exported. If credentials or deployment prevent live AI, demonstrate the navigable offline UX truthfully and clearly list its limitations.

## 11 | Scope traceability to assignment

| Assignment criterion | Proof in product | Proof in documentation |
|---|---|---|
| User/problem/use cases | Three origin personas, aspirations, three end-to-end use cases | Product problem, origin→role matrix, prioritized scope |
| Conversational and personalized | Pip with profile/case context and guided questioning | Conversation triggers and state contract |
| Helps take meaningful actions | Start exact case, open resource, reassess, approve resume edit | CTA list, action schema, T01–T20 |
| Engaging lifecycle | Pip context prompts, resumable loop, opted-in reminders | Separate growth & engagement plan and metric events |
| Working prototype | Hosted functioning backend + site or transparently qualified demo | Tested link, QA checklist and limitations |

**Next actions after these specs:** implement the page routes, seed the six-role registry and three demo test personas, connect secure AI backend, test full flows, then finish the brief product decision write-up and lifecycle communication plan. No new scope needs to be added first.
