# PivotPath — QA and three-persona demo runbook

## Standard
A GitHub commit or successful Render build isn't proof of full browser correctness. Verify all three journeys and real asset URLs against the live commit before calling the release QA-complete.

## Persona A — Research Analyst → Product Analyst
1. Choose redacted Research Analyst sample and confirm only factual work details.
2. Choose Product Analyst from six destinations; inspect the provisional readiness map.
3. Optionally self-rate "Funnels & cohorts" as "New to me". Refresh and confirm it persists.
4. Complete five case A questions with assessable answers. Confirm rating source (live AI vs illustrative demo), overall 5-question average and earned activity day.
5. Open skill evidence, resource, action plan, and second case B. Compare only legitimately matched competency observations.
6. Approve a truthful Living Resume edit and return to the original goal.

## Persona B — Siya consulting track → APM
1. Confirm sample track "Associate Consultant" never overrides the true CV-listed role "Business Analyst — Redseer Strategy Consultants".
2. Separately upload a synthetic PDF with header "SIYA GUPTA   siya@example.com | +91 9000000000"; name must parse as Siya Gupta and await confirmation.
3. Confirm "Educational Qualifications & Achievements" and "Positions of Responsibility" are correctly classified.
4. Self-rate feature prioritization as "Done independently"; produce a weak relevant answer; confirm self-confidence and case rating remain distinct.
5. Open a worked lesson; revisit the answer; take a resume detour then return with case context intact.
6. Complete both case scenarios, inspect honest score comparison, no 3/5 mastery claim.

## Persona C — Business Analyst track → Product Operations
1. Start the Business Analyst redacted sample, but preserve factual latest role "Project Intern at Fractal Analytics".
2. Choose Product Operations and work through the workflow/bottleneck case.
3. Mark a relevant saved learning task complete: multiple same-day actions earn one learning day only.
4. Confirm pages and chats never earn a streak. Check that changing the active career goal does not blend earlier role-specific scores.

## Must-pass QA matrix
| Check | Expected behavior |
|---|---|
| PDF header | Name extracted despite adjacent email/phone; draft, not externally verified |
| Common CV headings | Education and leadership/positions recognized |
| Confidence | Optional, per-role, per-competency, editable and persisted |
| Evidence | Resume, self-report, and case observations shown separately |
| Invalid answer | Not assessable, no score |
| 3/5 score | "Developing", not a demonstrated strong skill |
| SQL | Not verified by written case |
| Case B | Different scenario, like-for-like comparisons only |
| Streak | Earned via valid case, completed task, approved factual resume edit; once/day |
| Navigation | Goal and draft preserved across lesson/resume detours |
| Failure | No pretending offline heuristic is live AI |
| Mobile | Buttons reachable and no side-panel obstruction |
| Persistence | Refresh and export/restore functional |

## Automated regression
GitHub workflow .github/workflows/verify.yml runs python -m unittest discover -s tests -p "test_*.py" -v. Parser tests use synthetic contact details; private candidate CVs must never be committed.

## Current known constraints
No production analytics, external reminders, account sync, executable SQL testing, hiring prediction, or universal multi-column PDF perfection. AI scoring is formative and dependent on provider responses. Test the real live browser before making end-to-end completion claims.

## Four-minute demo script
Sample resume → user-confirmed profile → aspiration and role shortlist → competency self-view → readiness evidence comparison → role-specific practice/feedback → resource and next case → earned learning activity strip → factual resume edit → return to same chosen goal → measured retention hypothesis.

## Candidate-switching privacy test

- Complete a five-question case as Sample A. Record the visible chat, confidence choices, streak and resume changes.
- Choose **Start a new person’s journey**. Confirm the replacement warning. The app should return to the first Pip greeting. No Sample A messages, ratings, streak history, tasks, or resume edits should remain.
- Start Sample B or upload a different person’s file. Confirm the new candidate's name and job history; visit every workspace and the Pip coach to check for cross-person carryover.
- In Profile, a new file starts a fresh candidate workspace by default. The explicit **same person** checkbox is the only upload route that retains existing history.
- Cancel a reset confirmation and verify the prior profile remains unchanged.
- Start an AI response, switch to a new person before the response returns, and verify that no late response or assessment is added to the new person's chat.

## Executed automated Chromium validation

The GitHub Actions browser job completed **four independent local-server tests in demo assessment mode**: (1) Research Analyst → Product Analyst, (2) Siya consulting-track → APM, (3) Business Analyst → Product Operations, and (4) a synthetic PDF resume with name/contact on one header line. The three personas each completed onboarding, six confidence selections, all five case questions, contextual Pip guidance and clean new-candidate restart. Python parser tests, JavaScript syntax tests and candidate-isolation tests passed.

**Boundaries of this evidence:** The automated job does not validate live AI grader consistency, unusual scanned or multi-column resumes, measured D7/D30 retention, outbound messaging, all browser engines, or human usability. A passing demo test is not a guarantee of production readiness; these remain explicit next validation tasks.



## Competency guide QA

Each competency's Why? popup should:
- Match the active role and competency, with a realistic use case rather than a generic definition.
- Show 2–3 example decision metrics, not an invented employer benchmark.
- Explain what good reasoning looks like and what actual-world proof is still needed.
- Distinguish A and B practice observations from the candidate's own skill rating and resume keywords.
- Withhold the practice achievement for demo/checklist scores, a single strong answer, or a low latest parallel-case score.
- Explicitly disclose when the authored cases cannot directly test the competency.
- Offer a real practice/learning path and correctly close/reopen without changing chat history.

The automated Chromium suite opens all relevant competency popups for each of the three sample tracks. An independent JavaScript test covers all 35 role-skill combinations and simulated milestone progression; this does not validate the consistency of live LLM grading or externally assessed workplace competence.
