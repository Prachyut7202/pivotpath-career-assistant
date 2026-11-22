# PivotPath — release notes and safety

## Improvements implemented
- Optional, editable skill-confidence selection for each competency: New to me / Some experience / Done independently.
- Evidence details distinguishing resume/work claims, self-view and case observations, plus cautious calibration when they differ.
- Parallel case A/B observations when both test comparable competencies.
- Seven-day earned learning activity strip and persistent header badge. Only an assessable completed case, a marked-complete learning action or approved factual resume edit earns one learning day.
- Friendlier competency names while retaining stable assessment identifiers and original rubric logic.
- Extended resume PDF parsing for names alongside contact details, and more common CV headings.
- 3/5 case result now "Developing in practice" instead of being counted as a strong observed skill.
- Earlier releases: more responsive full-width welcome, in-place next-step action ribbon, gentle Pip blink and colored SWOT.

## Facts, privacy, and honesty
- All original detailed PRDs are retained in docs/archive.
- Career-track labels are distinct from factual latest CV roles (particularly Siya and the Fractal sample).
- Do not commit source resumes or personally identifying details to the public repository.
- Resume edits require user confirmation; AI case success is not represented as job history.
- Case ratings are formative observations, never hiring-probability or certification scores.

## Technical limitations
- Browser-local progress, no user account and no cross-device sync.
- AI can be unavailable; a clearly labeled fallback may use an illustrative checklist.
- No production telemetry, triggered emails, verified employer postings, SQL execution, project grading or measured retention outcomes.
- A PDF containing unusual columns, embedded graphics or scans may need manual confirmation or pasted text.
- A confirmed Render deployment does not imply every interactive browser workflow was tested.

## Release QA
Review .github/workflows/verify.yml and the three-persona checks in docs/03_QA_and_Demo_Runbook.md. Verify newest GitHub SHA matches Render live commit before showing the prototype. Run a hard-refresh to avoid stale cached JavaScript assets.

## Candidate separation and consent

Different people must not share one local career workspace. Sample changes, guided uploads, manual onboarding and an explicit new-person action now use a common full reset, clearing profile, Pip history, cases, skill confidence, streak data, tasks, resume drafts and guide history. The app requests confirmation before replacing saved progress. Profile uploads default to a fresh candidate; updating an existing candidate requires a **same person** checkbox. Previously queued AI responses are invalidated on switching. The app does not create user accounts or maintain cross-device sessions.


## Role-specific competency explanations and transparent practice achievements

- Every **Why?** popup now explains how its competency is used in the *selected role*, an example work scenario, suitable role-specific metrics or decision signals, how strong reasoning looks, and a practical proof artifact.
- Each popup separates the person's self-rating, resume/case evidence, case A/B results and external work validation. It explicitly notes when the question bank does not assess that skill.
- The Readiness Map shows **practice skill checkpoints** only for competencies evaluated in both authored cases. A checkpoint requires at least 4/5 for all relevant questions in the most recently completed Case A and Case B, with *live formative AI* scores. Illustrative demo ratings do not award the achievement.
- The UI uses **Practice milestone reached**, never "fully competent" or "job-ready". Real-world application and appropriate external review remain necessary.
- The current case bank does not directly test every listed skill (e.g., analyst SQL, APM rollout, and some Product Operations skills); these are explicitly labeled as requiring separate evidence. Example metrics are not employer-specific requirements.

Tests include headless checks for all 35 role/competency guides, strict milestone gating and browser-popup inspection across the three sample journeys.
