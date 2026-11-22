# Future research backlog — Role-based upskilling roadmaps & meaningful return loops

**Status: proposed, NOT implemented or validated.** Recorded on 23 November 2026 for a separate product/research discussion. This is intentionally outside the two-day assignment MVP. Do not market it as a current PivotPath feature.

## Product question

How can PivotPath graduate from a one-off career-fit + assessment tool into a personalized, goal-directed development companion, without artificially increasing streaks, manipulating users to return, or claiming that a calendar deadline means job readiness?

The current prototype has role choice, self-confidence, a bounded six-skill map, cases, feedback, an improvement plan and an activity streak. It does **not** yet have a complete occupational competency taxonomy, validated skill mastery, adaptive course sequencing, production notifications or measured retention.

## Hypotheses to investigate

### H1 — Role-specific, time-aware roadmap

The user picks a **destination role** and an approximate **time budget**. PivotPath builds a role-specific set of competencies with prerequisite ordering, learning tasks and evidence-based milestones. A calendar target is an *estimate of study plan duration*, not a deadline to 'become qualified'.

Example planning assumptions to test, **not product promises**:
- Data Analyst: illustrative two-week *foundation sprint*, conditional on current SQL/analytics experience and available time.
- Associate Product Manager: illustrative four-week *practice sprint*, conditional on the user's existing product work and learning availability.

The same role can require different plans. Someone with SQL experience and 10 hours a week must not receive the same plan as a beginner with 2 hours.

Learning milestones: Understand -> practise -> explain trade-offs -> demonstrate in another scenario -> build a real deliverable -> seek review. The system should allow skipped/credited steps when evidence justifies them, and replan after missed days.

Potential interface: role-specific learning path, a weekly roadmap, estimated hours **ranges**, proof tasks and 'what changed since last assessment'. The existing streak becomes a secondary indicator of *meaningful completed learning days*.

### H2 — Competency completeness and occupational credibility

Audit the six current role maps against actual entry-level job descriptions, practitioner input and occupational frameworks. Identify what is missing **before** promising an end-to-end pathway. Examples to investigate (not comprehensive): product discovery, experimentation, instrumentation, prioritization, specs, stakeholder management, delivery, post-launch outcomes for APM; SQL execution, statistical reasoning, data modeling, dashboards and communication for Data Analyst.

Each competency needs: why it matters, observable behavior, prerequisites, safe practice task, scoring/evidence method, real-work application and limits of the assessment. Written cases alone cannot verify skills such as executable SQL or product launches.

### H3 — Milestones versus raw scores and streaks

Define achievements based on **what was done and what was demonstrated**, not a daily login or one score. Distinguish (i) self-reported confidence, (ii) formative case performance, (iii) externally checked or work-based skill evidence. Milestones should unlock the next meaningful challenge; declining scores on a harder question should not 'erase' progress.

Possible role-level milestones: completed learning foundation, independently completed a role-specific case, portfolio proof reviewed, stronger second-case performance. Avoid 'mastered role' and 'job-ready' badges unless externally validated.

### H4 — Graduation and post-goal value

Completing a roadmap might reduce short-term visits; this is not automatically bad churn. Success can include reaching a real career outcome and **graduating** from the initial job-transition journey.

Potential opt-in post-goal journeys: preparing for interviews, applying effectively, first-90-days role support, continuing competency development, maintaining a portfolio, or moving to the next career aspiration. Test whether these are actually valuable instead of creating endless engagement loops.

### H5 — Relevant industry changes as a reason to return

Opt-in, targeted, verifiable updates about the user's chosen role and demonstrated skills—for example a changed tool, new standard practice, widely adopted workflow or role expectation. A useful message would include: **what changed, why it matters to this role, source/date, which competency it affects, and one bounded activity or question**.

Distinguish evergreen career skills from genuinely new role expectations. Verify external sources, label uncertainty, avoid inventing news, prevent irrelevant or repeated alerts, cap frequency and honor unsubscribe/quiet preferences. This is a **research hypothesis**, not an implemented newsfeed or notification system.

## Competitor/reference research to conduct next

Evaluate a manageable set of **current** relevant experiences: Duolingo (learning path, streak, leagues), DataCamp and Codecademy (role/skill tracks and practical checks), Coursera (program milestones, certificates), LeetCode and CodeChef (progress and practice), LinkedIn Learning (role skills), and one or two career-coach/AI interview-prep products. Verify current actual behavior, pricing and features from primary product materials and user reviews; do not transfer features by assumption.

For each comparator record:
1. What goal does the learner choose?
2. How does the plan adapt to starting proficiency and weekly availability?
3. What is the milestone's evidence standard?
4. What happens after missing a day, scoring worse or completing the track?
5. What drives the return: intrinsic progress, useful tasks, gamification, or notifications?
6. How does the product avoid overstating readiness?
7. Which element (if any) would make PivotPath materially more useful?

## Research outputs proposed for next session

- **Opportunity/competitor matrix** with sourced product screenshots or citations and risks.
- **Role-competency coverage gap audit** for APM and DA as deep dives, then the remaining roles.
- **Roadmap prototype on paper**: one beginner and one experienced user for each deep-dive role; compare time-budget assumptions and re-planning.
- **Retention concept**: activation event, meaningful learning return, milestone completion, graduation (positive exit), voluntary re-entry.
- **Notification decision tree**: trigger, personalized evidence, source/date, relevance, opt-in, suppression/frequency cap and measurable action.
- **MVP prioritization** using impact, effort, uncertainty and validation requirements; explicit 'not now' list.

## Questions requiring actual validation

- Would people prefer a 15/30-day promise, or a flexible plan with a study-hours estimate and checkpoints?
- Do visible streaks help users complete *meaningful* tasks, or mainly encourage low-quality repeat visits?
- Is earning the same milestone on two comparable AI-graded cases credible enough, or does it require a project or reviewer?
- Does relevance-based role news cause useful learning actions rather than clicks?
- What qualifies as *healthy graduation*, and should returning after job placement count as retention?
- Would users trust approximate readiness language and the limitations of automated scoring?

**Build boundary:** No changes to application, assessment thresholds, notification delivery or live roadmap until the research is reviewed and a small validated scope is explicitly approved.
