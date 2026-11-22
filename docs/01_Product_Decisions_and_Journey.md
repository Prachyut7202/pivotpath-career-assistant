# PivotPath — product thinking and journey
**Apna APM assignment | November 2026**

## 1. Product problem and target users
**Audience:** Early-career research associates, consultants and business/data analysts exploring moves into analytics, product and adjacent operational roles.

**Pain:** A resume describes what someone says they have done, not how well they could solve a new role's problems. Conventional JD comparisons are keyword-heavy; generic AI conversations give suggestions but rarely help users close a measurable skill gap while keeping their chosen goal.

**Product job:** Help a user select a career destination, understand *existing work evidence vs self-belief vs observed practice*, and complete one role-relevant action that brings them closer to that goal.

## 2. Three prioritized MVP use cases
| Priority | Use case | Evidence of value |
|---|---|---|
| P0 | Discover a destination from resume or conversation | Confirmed profile, aspirational role preserved, three reasoned options from six destinations |
| P0 | Calibrate, assess, learn and reassess | Editable confidence per skill, honest readiness map, five-question case A, specific lesson/task, parallel case B, updated evidence |
| P1 | Build a living, accurate resume | User-controlled draft, approve/revise factual edits, export and return to career goal |

**Role coverage:** Data Analyst, Business Analyst, Product Analyst, Product Operations Associate, Product Marketing Associate and Associate Product Manager. Sample entry points reflect Research Analyst, consulting-career-track and Business Analyst backgrounds, but a job-title category must not overwrite the person's actual role.

## 3. The actual user journey
1. **Start:** User chooses PDF/DOCX/TXT upload, manual conversation or a redacted sample CV. Pip extracts and *asks for confirmation* of facts, name, role, employer, ownership and achievements.
2. **Explore:** User expresses desired work and chooses a career aspiration. Pip shows three justified suggestions (and lets user explore all six) without silently substituting an easier role.
3. **Map:** Show relevant role competencies and SWOT. Distinguish CV/work claims, optional three-level self-rating and unassessed skills. Explain every gap rather than implying missing keywords mean incompetence.
4. **Assess:** A five-question, original case A evaluates specific *reasoning* against stated criteria. Feedback gives an observed strength, missing criterion, one next action and source-labeled 1–5 formative score, or "not assessable".
5. **Learn:** Recommend a worked example, targeted external resource or short action. A completion checkbox is not a proof of skill; it records an activity.
6. **Reassess:** Case B uses a different situation but comparable reasoning; only compare matching competencies and identify what changed. The overall average is context, not a readiness verdict.
7. **Act:** Tailor the factual Living Resume with explicit approval, then return to the same career goal and unfinished improvement loop.

Pip's next-step action tray responds in place. Resume/profile edits are detours with a return point. No required re-onboarding after completing a case.

## 4. Evidence integrity (most important product decision)
| Evidence | What it means | What it must not mean |
|---|---|---|
| Verified-by-user resume text | The user confirms the employment/project claim is accurately represented | Proof of technical proficiency or external employment verification |
| Self-assessment | New to me / Some experience / Done independently | Certified skill level |
| Case observation | 1–5 formative rating on a particular question | Interview pass probability or salary/hiring forecast |
| Not assessed | Insufficient task evidence | Weakness |
| Technical skill | Requires executable or verified external work | Assessed SQL ability from a prose answer |

If users rate themselves highly but score 2/5, show a respectful *calibration prompt* ("This exercise missed a trade-off; try another scenario"), not a personality judgment. Low confidence + 4/5 suggests a possible transferable strength, not proof of mastery. Score 3/5 is **developing**, not a validated strength.

## 5. Streaks inspired by learning platforms
A seven-day strip and current-day streak reward days with an **assessable completed case**, a **marked-complete learning action**, or an **approved factual resume revision**; multiple actions in a day count once. Browsing, mere logins, chats, opening lessons and ungraded warmups do not earn days. Progress evidence survives a missed streak, and the interface never pressures users to grind for points.

**Why this matters:** The return reason is always a saved next action: an unfinished case, a missing competency, a comparable reassessment or a resume edit awaiting approval. A badge is a helpful cue, not the product's value.

## 6. Key trade-offs and non-goals
- Authored case banks and stable competency codes over unbounded generated questions, allowing more consistent A/B comparisons.
- Six destinations over hundreds of shallow recommendations.
- One active aspiration (with preserved history on switch) rather than automatic career reassignment.
- Browser-local state and export/restore over full user accounts for a two-day prototype.
- No real job posting crawl, executable SQL engine, project grading, production reminders, or psychometric job-readiness predictions.
- AI service can be unavailable; demo/checklist feedback must be labeled clearly and never presented as live AI.

## 7. Demo success criteria
A new user can onboard, choose their goal, adjust skill confidence, understand why Pip identifies a potential learning area, submit an assessable answer, receive real source-labeled feedback, finish a case, access a targeted lesson and second scenario, then approve a truthful resume edit without losing the selected goal.

This is an implemented prototype with unmeasured retention and no verified hiring outcomes. The full design constraints and detailed question dictionary remain in docs/archive.
