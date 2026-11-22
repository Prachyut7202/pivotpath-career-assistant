# PivotPath — Growth & Engagement Communication Plan (V3)
*Hypothesis-based plan · No outbound messaging implemented in this prototype*

## Objective
Get a functional career switcher from vague aspiration to **one defensible next action** and then to evidence of improved role-specific performance. Don't optimize for chat messages, superficial profile completion, or notification opens.

## Segments, lifecycle and interventions

| Segment / trigger | Timing & channel | Example message | Action | Guardrail |
|---|---|---|---|---|
| New user with profile but no target role | On-site only, first session | “Your background is saved. Pick one destination role to see employer examples before deciding what to learn.” | Choose a role | No unsolicited messaging |
| Role selected but no readiness map | On-site, after selection | “You're exploring Product Analyst. Start with your work evidence and a provisional skills map—no hiring score.” | Start assessment | No numerical readiness claim |
| Self-assessment finished but no case attempted | On-site immediately; optional email next day *if subscribed* | “You rated your SQL confidence. Try a short event-analysis case to see what you can demonstrate.” | Open case | One nudge per assessment milestone |
| Practice response unassessable | On-site immediately | “We couldn't assess that response yet. Try stating the goal, one hypothesis and a check; no score was recorded.” | Retry with guidance | No shaming or arbitrary penalty |
| Practice completed with identified weakness | On-site immediately | “Your next practice target is interpreting a checkout funnel. Here's one 15-minute exercise and a relevant resource.” | Start an action | Base on actual feedback, not boilerplate |
| A task remains incomplete | Optional email after 5 days, if user opted in | “Your SQL join exercise is still in your plan. Want to pick up where you left off?” | Resume task | Cap at 1 per week; no message after dismissal |
| Saved APM path and exploring Product Analyst | On-site when user switches | “Your APM work is still saved. Product Analyst expects a different type of evidence. Compare the two paths.” | Compare requirements | Don't rewrite previous work |
| User adds new job description | On-site when pasted | “This posting specifies 2–5 years and SQL. Your total experience meets/doesn't meet the number; relevant experience still needs review.” | Review job requirements | Require cited exact employer posting/JD |
| Returning after a case practice | On-site upon return | “You have two attempts for the same case. Compare the reasoning and evidence before retaking it.” | Compare and retry | Do not imply validated job readiness |
| Future optional market monitor | Email digest monthly **only on opt-in** | “Two employer postings you follow now mention a new tool. Review the sources before changing your plan.” | Review sourced change | Never unsourced market trend; opt-out in every email |

## Frequency and channel policy
- In-app contextual guidance is primary. It is tied to the user's current task.
- Email is opt-in and only after an eligible trigger; maximum **1 career reminder per week**, plus a separate optional monthly sourced-market digest. No SMS or WhatsApp in MVP.
- Suppress on task completion, no activity, dismissed reminder, and after a user changes goals. Offer pause / disable control before enabling messages.
- Respect local time with quiet hours, especially evenings/early mornings. No manipulative “you are falling behind” messages.
- Don't include sensitive resume contents or named confidential projects in push notification previews.

## Measurement plan (not observed)

**North Star candidate:** Weekly users who complete one role-specific readiness action with evidence.

| Funnel stage | Primary event | Diagnostic cut | Quality / guardrail |
|---|---|---|---|
| Acquisition | landing_view → profile_started | campaign / self-discovered | bounce; privacy refusals |
| Activation | role_selected → preliminary_map_generated → first_valid_case | initial function, target role, prior experience | unassessable response rate |
| Action | resource_opened / practice_started / action_added | role, gap, resource | task completion without evidence |
| Practice loop | comparable_second_case_attempt | competency, hint use, answer validity | disagreement with AI feedback |
| Resume value | user_approved_revision → export | source of original project, target role | factual changes caught by user |
| Retention | meaningful_week_2_action | role path, first action type | reminders unsubscribed / complaints |
| Market intelligence | posting_source_opened | role, region | outdated/mislabeled requirements |

## Product experiment ideas
1. **Guidance:** Guided Next Step vs. unguided overview; primary metric first assessable case within 7 days.
2. **Feedback:** Rubric + example revision vs. short generic response; metric useful-feedback rating + high-quality second attempt, not longer text.
3. **Career context:** With source-linked listing examples vs. generic role text; measure confidence accuracy using reviewed target JDs, not subjective certainty alone.

No actual email, notification scheduling, telemetry, customer cohorts, or A/B experiments are implemented in V3. The above is the proposed plan for a subsequent evaluated release.