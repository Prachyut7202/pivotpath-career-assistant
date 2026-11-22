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
