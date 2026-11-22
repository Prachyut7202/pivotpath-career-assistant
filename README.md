# PivotPath V4 — Pip-guided AI Career Assistant

Assignment prototype built from the approved **Role & Assessment Matrix** and **Pip UI PRD** (22 November 2026).

## Working capabilities

- **Onboarding:** No account or resume required; PDF/DOCX/TXT/MD/TEX resume intake, manual entry, sample personas, arbitrary decimal years.
- **Career discovery:** Guided questions and explained, source-linked suggestions from six target roles. One active user-chosen aspiration, never silently overridden.
- **Readiness Map:** Competency-level evidence statuses and provisional SWOT, without invented general hiring-readiness percentages.
- **Practice & Improve:** Five sequential case questions per role, hints, A/B scenarios, review feedback, targeted learning links, custom actions and attempt history.
- **Living Resume:** One-page A4 layout based on the uploaded resume's style, editable sections, clickable fields, approval-gated drafts, undo, PDF export and LaTeX export.
- **Pip:** Persistent contextual coach, with guided prompts and open-ended messages. Optional browser speech-to-text input.
- **Continuity:** Browser-local state (where permitted), data export/restore/delete; original uploaded text stays in the master profile.

## Local server setup (recommended)

Requirements: Python 3.11+, and packages listed in `requirements.txt`.

```bash
pip install -r requirements.txt
# Optional, needed only for genuine AI:
# macOS/Linux: export OPENAI_API_KEY='YOUR_SECRET_KEY'
# PowerShell:  $env:OPENAI_API_KEY='YOUR_SECRET_KEY'
python -m uvicorn app:app --host 127.0.0.1 --port 8000
```

Visit **http://127.0.0.1:8000** in Chrome or Edge. Resume PDF/DOCX parsing and server PDF export work without an AI key. With `OPENAI_API_KEY` set on the server, Pip attempts genuine OpenAI coaching, case evaluation and resume suggestions. Set `OPENAI_MODEL` to a model that supports the Responses API if needed. Live OpenAI calls were **not tested with a real key** in this environment.

## Standalone HTML demo

Download and open `index.html` directly in a browser. It provides the full interface, sample journeys, role comparisons, practice, action plans, resume editing and LaTeX export. It is **not live AI**. Feedback is an explicitly labeled heuristic checklist, which may miss valid reasoning. PDF and DOCX *text extraction* require the Python server; paste text or enter a profile manually in standalone mode. Print → Save as PDF is the standalone export fallback.

Some browsers restrict localStorage for `file://` pages. Use **Profile → Download career data** and **Restore saved career data** as backups. A normal hosted `http(s)://` deployment is preferable.

## Public deployment

The example `render.yaml` configures a Python web service on Render. To obtain a public URL, push this source to a repository, connect that repository to an authorized hosting account, configure environment variables (especially `OPENAI_API_KEY`, server-side only), and deploy. **This ZIP is not already publicly deployed.** Before public access, add strong authorization or hosting access controls, cost caps, and a reviewed privacy policy. The included in-process request limit is suitable only for a controlled demo, not production.

## Assignment demonstration paths

- Junior Research Analyst → Product Analyst
- Associate Consultant → Associate Product Manager
- Business Analyst → Product Operations Associate

All six destination roles have original role-related question sequences, plus different reassessment scenarios. Question themes are grounded in employer examples and professional resources in `docs/01_Role_and_Assessment_Matrix.md`, but **the questions are PivotPath-authored adaptations, not verbatim company interview questions**. SQL execution is not graded.

## Endpoints

- `GET /api/status` — declares `live` or `demo` AI state.
- `POST /api/parse-resume` — extracts PDF/DOCX/TXT/MD/TEX into a draft for user review.
- `POST /api/coach` — contextual free-form AI coach (requires key).
- `POST /api/assess` — live formative case feedback (requires key).
- `POST /api/resume-suggest` — suggested factual rewrite for approval (requires key).
- `POST /api/export-pdf` — export a one-page PDF with working contact hyperlinks; rejects overflow.

Profile/resume data is held in browser storage; the server does not store uploaded resume files. With live AI enabled, relevant context is sent to the AI provider for the requested action. Don't put the secret API key in HTML or JavaScript.

## Testing

Run after installing `playwright` (Python), Chromium, and the Python requirements:

```bash
python tests/backend_qa.py
python tests/browser_qa.py
python tests/extended_qa.py
```

The tests use isolated browser HTML because this execution environment restricts direct browser navigation to `localhost` or `file:`. Real HTTP service endpoints were also checked separately. Results are in `docs/Release_QA.md`.

## Known limitations and deliberate exclusions

No real user account, cross-device sync, verified hiring prediction, SQL code execution, project grading/upload, direct Overleaf integration, or live job crawler. Job links may change; the website displays cited examples, not universal experience thresholds. Scanned PDF OCR is not available. Resume parsing preserves original text but may need review for complex layouts. Voice recognition depends on browser permissions.
