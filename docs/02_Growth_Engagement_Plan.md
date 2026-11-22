# PivotPath — growth and engagement communication plan
**Hypothesis-led strategy; no outbound system or product analytics is implemented.**

## 1. Objective and North Star
**Objective:** Encourage repeat *meaningful* progress toward the user's chosen career destination, not longer chat sessions or arbitrary login activity.

**Candidate North Star:** Weekly users completing at least one evidence-backed career action: a valid role-specific case, completed relevant learning task, or approved factual resume edit. This is a proposed product metric, not an observed result.

## 2. Lifecycle targeting and messages
| Segment/stage | Trigger | Channel, timing | Example message | CTA | Guardrail |
|---|---|---|---|---|---|
| First-time explorer | Profile confirmed, no role selected | In-app, immediately | "Your experience is saved. Which role would you like to work toward? I'll show why it may fit and what we still need to check." | Explore roles | User retains final choice |
| Role chosen, no self-view | Enters readiness map | In-app, at the map | "You've described some relevant experience. Which of these skills have you used independently?" | Rate optional skills | Fully skippable |
| High confidence, weak observation | Independent self-rating, case result 1–2/5 | In-app after feedback | "You have relevant experience; this answer missed how to compare the options. Want a 5-minute worked example?" | Learn/try again | Avoid shame and fake certainty |
| Low confidence, strong observation | New to me, case 4–5/5 | In-app after feedback | "You reasoned through this well, even though it's new to you. Try another scenario to test whether it transfers." | Case B | No mastery claim |
| First case completed | A specific gap is identified | In-app immediately | "Your next Product Analyst focus: distinguish a tracking issue from a real activation decline. Try this short exercise." | Open task | One recommended action |
| Task incomplete | Task saved, incomplete after five days | Email, **only if opted in**, local daytime | "Your prioritization exercise is still saved. Pick up where you left off, or pause reminders anytime." | Continue task | Max one email/week |
| Second case completed | Matching A/B results available | In-app after completion | "Your second case used clearer trade-offs. Compare what improved and what still needs attention." | Compare evidence | Compare comparable dimensions |
| Resume draft awaiting review | Unapproved proposal | In-app during current session; optional email after 7 days | "Your role-targeted draft is ready. Nothing changes until you approve it." | Review draft | Never auto-apply |
| Returning after inactivity | Seven days without meaningful action and opted in | One eligible daytime email | "Your APM goal and latest progress are still here. One short practice case is ready if you're interested." | Resume journey | No guilt or fake urgency |
| Goal switched | User explicitly chooses another role | In-app immediately | "We saved your Product Analyst work. The new goal uses different requirements. Compare the two maps before practising." | New readiness map | Never mix role scores |

## Product-truth rule for every message

A lifecycle message only works if the user can complete the promised action. For this prototype, I would maintain a short **destination-and-capability inventory** and validate every proposed in-app or future outbound message against it:

| What the message says | Real next step | What I would not promise |
|---|---|---|
| "Look at your skill evidence" | **Readiness Map** → expand the relevant skill evidence card | A separate "learning hub" |
| "Learn about this gap" | Open the **Learn this skill** external link on that card, or review a worked lesson where available | An internal course/video library |
| "Put the feedback into practice" | **Practice & Improve** → case feedback or **My improvement plan** | An unlimited adaptive course catalog |
| "Review your career progress" | **Practice & Improve** → full practice progress, or the Readiness Map evidence comparison | A verified employer-readiness score |
| "Improve your CV" | **Living Resume** → review an editable bullet and approve the factual revision | Automatic applications or unapproved AI edits |

**Eligibility rule:** Do not send messages because someone opened a tab. In-app proactive coaching should be triggered only when an actual learning milestone creates useful information—for example, completing self-calibration, receiving the first assessed answer, or finishing a case. Normal screen changes stay silent. For future email, check the action still exists, the task remains incomplete, the user opted in, and the send cap has not been reached.

**Quality check:** Test each message by following its call to action in a fresh sample account. If the copy refers to a capability not available in the build, rewrite or suppress it before delivery. For readiness questions, explain the distinction between a suggested practice checkpoint and real-world hiring readiness.

## 3. Channels, frequency and personalization
**Already implemented:** Contextual Pip guidance in the app, saved practice history, editable confidence, seven-day earned activity strip, resume detours, browser-local state.

**Proposed, not implemented:** Transactional/onboarding emails, periodic summaries, reminders and experiments. Send only with opt-in and easy unsubscribe. No SMS, WhatsApp or push in the prototype.

Use role aspiration, stage, latest evidenced skill, existing task status, source of assessment (demo/live) and return point. Do not embed confidential resume projects in a notification preview. Suppress messages after completion, dismissal, change of goal or unsubscribe. Cap at **one triggered email every seven days**, plus a distinct optional monthly digest. Quiet hours: 9 PM–8 AM local time; eligible emails 10 AM–6 PM.

## 4. Metrics and event plan
| Stage | Event / metric | Breakdown | Quality guardrail |
|---|---|---|---|
| Activation | profile_confirmed → role_selected → first_valid_case | Origin persona, goal | Abandonment, time-to-first-value |
| Learning | lesson_opened → task_completed | Skill, source, case | Lesson usefulness, task relevance |
| Competency progress | case_A_valid → case_B_valid | Same competency, hints | Assessor disagreements, unassessable share |
| Career artifact | resume_proposal_approved → resume_exported | Goal, section | Unverified/fabricated edits prevented |
| Return | meaningful_activity_week_2; D7 and D30 meaningful return | Lifecycle, goal | Negative feedback, reminders disabled |
| Habit | meaningful_days_last_7, restart after lapse | Action type | Excessive repeated weak attempts |
| Channel health | optional email consent, open → meaningful action | Segment, cohort | Unsubscribe and complaint rates |

Don't count page views, chat turns or push opens in the North Star. Actual user research and instrumented telemetry are needed before reporting retention effects.

## 5. Four low-cost experiments (future)
1. **Confidence calibration vs resume-only:** first valid case within seven days; guardrail profile completion/drop-off.
2. **Targeted micro-lesson vs long resource list:** comparable second case completion and perceived feedback relevance.
3. **Personalized return prompt vs generic:** meaningful return within seven days; fatigue opt-outs.
4. **Earned streak visible vs hidden:** meaningful learning days, not raw app sessions; guardrail pressure and repetitive behavior.

## 6. Ready-to-use communication examples
**Welcome (in-app):** "Tell me what you've worked on. You can upload a resume or explain one project — and correct anything I misunderstand."

**After case (in-app):** "You identified a useful hypothesis. The next step is to show which data would actually test it. Want a short worked example?"

**Streak earned (in-app):** "You've completed a meaningful learning action today. The progress is saved — more screen time isn't the goal."

**Email subject (opt-in):** Your next Product Analyst practice is saved  
**Email body:** "You chose to work on cohort analysis. Your earlier feedback and next exercise are ready whenever you are. [Continue practice] [Pause reminders]"

**Email subject (opt-in):** Continue your career plan when you're ready  
**Email body:** "Your APM plan has an unfinished prioritization exercise. Start from your last step or change your goal. [Resume plan] [Unsubscribe]"

All messages above are proposed copy; only the in-product experience is currently implemented.

## 7. What frameworks informed my decisions?

I used five sources to structure the plan, not to assert growth that hasn't happened:

| Source | What it contributes | My product decision |
|---|---|---|
| [Amplitude: North Star](https://www.amplitude.com/books/north-star/about-north-star-framework) | Choose a metric representing user value and actionable inputs. | Weekly meaningful actions with inputs for activation, assessment and follow-up. |
| [Mixpanel: Retention](https://mixpanel.com/blog/what-is-retention-analysis/) | Use a meaningful return event and cohort comparisons. | Count return to another role-specific action, not simply returning to the site. |
| [Braze: Frequency Capping](https://www.braze.com/docs/user_guide/messaging/messaging_fundamentals/frequency_capping) | Manage volume and fatigue per user/channel. | Optional email, once per rolling seven days, with completion and opt-out suppression. |
| [Nielsen Norman Group: Chat UX](https://www.nngroup.com/articles/chat-ux/) | Preserve conversation context and user control. | Put suggestions in the chat stream, with one contextual next action. |
| [Reforge: Experiment Management](https://www.reforge.com/blog/growth-experiment-management-system) | Define hypothesis, metric, and impact/confidence/ease before testing. | Prioritize measurable experiments instead of presenting hypothetical uplift. |

### Proposed analytics events (not yet instrumented)

| Event | Minimal non-sensitive fields | Use |
|---|---|---|
| `profile_confirmed` | pseudonymous session, source | Starting cohort |
| `goal_selected` | role, source of selection | Discovery conversion |
| `confidence_submitted` | role, number of skills | Optional calibration adoption |
| `case_completed` | role, variant, assessable count, rating source | Activation and honest evaluation |
| `learning_action_completed` | role, competency, action type | Meaningful progress |
| `resume_proposal_approved` | role, approved flag | Valuable career output |
| `meaningful_return` | role, elapsed time | D7 / W2 / D30 retention |
| `reminder_preference_changed` | channel, opt-in state | Permission and suppression |

The proposed W2 retention denominator is people who completed at least one qualifying action in their first week. The numerator is those who complete another qualifying action in week two. One action per user per week enters the North Star; the streak separately counts one learning day per calendar day.

Before experiments, I would define eligibility, a randomization unit, measurement window, sample-size calculations and stop rules. This document contains hypotheses and example copy, **not measured retention or conversion results**.

