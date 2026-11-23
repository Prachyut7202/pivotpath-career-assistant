"""Real Chromium smoke flows for the three redacted sample careers and a PDF upload.

Run against the local FastAPI app after Playwright Chromium is installed:
    PIVOTPATH_TEST_URL=http://127.0.0.1:8000 python tests/test_browser_e2e.py
No live AI calls: intercepts /api/status to request deterministic demo mode.
"""
from __future__ import annotations
import io
import json
import os
import traceback
from pathlib import Path
import fitz
# Imported only by main(), so the fast unittest job does not require Playwright.

BASE=os.environ.get("PIVOTPATH_TEST_URL","http://127.0.0.1:8000")
SCREENSHOTS=Path("/tmp/pivotpath-browser-screenshots")
SCREENSHOTS.mkdir(parents=True,exist_ok=True)
ANSWER=(
    "I would first clarify the business problem, the user segment, and the time window. "
    "I would validate the event definitions, the data quality, and possible missing or duplicated records. "
    "Then I would compare customer cohorts and the funnel to identify the highest-impact source of friction. "
    "I would form specific hypotheses with stakeholders and compare options on potential user impact, "
    "evidence confidence, delivery effort, and operational risk. Finally I would define outcome and "
    "guardrail metrics, test the proposal with users, review the results and iterate after launch."
)

def clean_api_mode(route):
    route.fulfill(status=200, content_type="application/json",
        body=json.dumps({"ai":"demo","providers":[],"resume_parser":"available","pdf_export":"available"}))

def setup(page):
    page.route("**/api/status",clean_api_mode)
    errors=[]
    page.on("pageerror",lambda exc:errors.append(str(exc)))
    page.on("dialog",lambda dialog:dialog.accept())
    page.goto(BASE,wait_until="domcontentloaded",timeout=25000)
    expect(page.locator('[data-pip-action="sample"]')).to_have_count(3,timeout=10000)
    return errors

def sample_case(page,sample,role,expected_name):
    # Theme is available before onboarding; a device preference survives refresh.
    expect(page.locator('#pipWelcomeTheme')).to_be_visible()
    page.locator('#pipWelcomeTheme').click()
    assert page.evaluate("document.documentElement.dataset.theme")=="dark"
    assert page.evaluate("getComputedStyle(document.body).backgroundColor")=="rgb(14, 22, 41)"
    page.reload(wait_until="domcontentloaded")
    expect(page.locator('[data-pip-action="sample"]')).to_have_count(3)
    assert page.evaluate("document.documentElement.dataset.theme")=="dark"
    page.locator(f'[data-pip-action="sample"][data-persona="{sample}"]').click()
    expect(page.locator('#pipReviewForm input[name="name"]')).to_have_value(expected_name)
    page.locator('#pipReviewForm button[type="submit"]').click()
    page.locator('[data-pip-action="ownership-skip"]').click()
    page.locator('#pipGoalForm select[name="goal"]').select_option(role)
    page.locator('#pipGoalForm button[type="submit"]').click()
    page.locator('[data-pip-action="finish"]').click()
    expect(page.locator('#main')).to_be_visible()
    # Chosen aspiration first; every other role sorted by profile overlap.
    assert page.evaluate("rankedRoles()[0].id")==role
    assert page.evaluate("rankedRoles().length")==6
    assert page.evaluate("rankedRoles().slice(1).every((r,i,a)=>i===0||a[i-1].value>=r.value)")
    cards=page.locator('.roleCard')
    expect(cards).to_have_count(3)
    assert cards.first.get_attribute("data-role-id")==role
    assert [int(el.get_attribute("data-role-rank")) for el in cards.all()]==[1,2,3]
    expect(cards.first.locator('.roleFitMeta')).to_contain_text("Profile overlap rank")
    page.locator('#main [data-action="all-roles"]').click()
    cards=page.locator('.roleCard')
    expect(cards).to_have_count(6)
    assert [int(el.get_attribute("data-role-rank")) for el in cards.all()]==[1,2,3,4,5,6]
    assert [el.get_attribute("data-role-id") for el in cards.all()]==page.evaluate("rankedRoles().map(r=>r.id)")
    page.locator('#main [data-action="all-roles"]').click()
    expect(page.locator('.roleCard')).to_have_count(3)
    # Toggle works in app as well, not just on the welcome screen.
    expect(page.locator('#pipHeaderTheme')).to_be_visible()
    assert page.locator('#pipHeaderTheme').get_attribute('aria-pressed')=="true"
    page.locator('#pipHeaderTheme').click()
    assert page.evaluate("document.documentElement.dataset.theme")=="light"
    page.locator('#pipHeaderTheme').click()
    assert page.evaluate("document.documentElement.dataset.theme")=="dark"
    page.locator(f'[data-action="select-role"][data-role="{role}"]').first.click()
    expect(page.locator('.pcAssessment')).to_be_visible()
    expect(page.locator('.pcCalibrationRow')).to_have_count(6)
    expect(page.locator('.pgRoleSummary')).to_be_visible()
    assert "practice skill checkpoints" in page.locator('.pgRoleSummary').inner_text()
    # Each role's Why? popup must explain real work, metrics, evidence and a next action.
    for row in page.locator('.skillRow').all():
        row.locator('[data-action="inspect-skill"]').click()
        popup=page.locator('#modalRoot .pgModalContent')
        expect(popup).to_be_visible()
        expect(popup.locator('.pgExplainer')).to_have_count(4)
        assert popup.locator('.pgMetricChips span').count()>=2
        expect(popup.locator('.pgCheck')).to_have_count(3)
        assert "Apply it to actual work" in popup.inner_text()
        page.locator('#modalRoot [data-action="close-modal"]').click()
    # Simply visiting pages must never fabricate a Pip conversation.
    nav_baseline=page.evaluate("S.chat.length")
    for destination in ('discovery','practice','readiness'):
        page.locator(f'.sidebar [data-action="nav"][data-route="{destination}"]').click()
        assert page.evaluate("S.chat.length")==nav_baseline,("Auto chat on tab switch",destination)
    page.locator('.sidebar [data-action="nav"][data-route="resume"]').click()
    assert page.evaluate("S.chat.length")==nav_baseline,"Resume detour fabricated a chat turn"
    # The editable A4 sheet stays white regardless of UI theme.
    assert page.evaluate("getComputedStyle(document.querySelector('.resumeSheet')).backgroundColor")=="rgb(255, 255, 255)"
    page.locator('#pipLoopRibbon [data-journey-action="return"]').click()
    assert page.evaluate("S.chat.length")==nav_baseline,"Resume return fabricated a chat turn"
    expect(page.locator('.pcCalibrationRow')).to_have_count(6)
    # Close the panel while filling the wide readiness table; reopen afterward.
    page.locator('#coachPanel [data-action="toggle-coach"]').click()
    for i in range(6):
        page.locator('.pcCalibrationRow').nth(i).locator('[data-pc-confidence="some"]').click()
    expect(page.locator('.pcCompletion')).to_contain_text('6/6')
    page.locator('#coachFloat .coachBtn').click()
    expect(page.locator('#coachMessages .pipFlowBubble').last).to_contain_text("A short case")
    expect(page.locator('#coachQuick .pipNextPanel')).to_have_count(0)
    expect(page.locator('#main #pipJourneyGuide')).to_have_count(0)
    page.locator('#coachMessages [data-journey-action="start-case"]').last.click()
    first_feedback_turns=None
    for q in range(5):
        expect(page.locator('#answerForm')).to_be_visible()
        page.locator('#answerForm textarea[name="answer"]').fill(ANSWER)
        page.locator('#answerForm button[type="submit"]').click()
        if q==0:
            expect(page.locator('#coachMessages .pipFlowBubble').last).to_contain_text('Would a quick example')
            first_feedback_turns=page.locator('#coachMessages .pipFlowBubble').count()
        else:
            assert page.locator('#coachMessages .pipFlowBubble').count()==first_feedback_turns,(
                "Should not create scripted messages after every question",q)
        page.locator('#main [data-action="next-question"]').click()
    expect(page.locator('#main')).to_contain_text('Case completed')
    expect(page.locator('#coachMessages .pipFlowBubble').last).to_contain_text('case is done')
    # After the case, routine tabs still cannot add any chat messages.
    complete_chat_count=page.evaluate("S.chat.length")
    for destination in ('discovery','readiness','practice'):
        page.locator(f'.sidebar [data-action="nav"][data-route="{destination}"]').click()
        assert page.evaluate("S.chat.length")==complete_chat_count,("Auto chat after case",destination)
    state=page.evaluate("({profile:S.profile.name,role:S.career.activeRole,cases:S.attempts.length,chat:S.chat.length,skill:S.pipSkillConfidence})")
    assert state['profile']==expected_name and state['role']==role,state
    assert state['cases']==1,state
    assert state['chat']>0 and role in state['skill'],state
    # Sane progression: the case moves into conversation not a fixed progress overlay.
    assert page.locator('#coachMessages .pipFlowBubble').count()>0
    assert page.locator('#coachMessages .ppCoachProgress').count()==0
    return state

def test_new_candidate_isolation(page):
    page.locator('[data-pip-action="restart"]').first.click()
    expect(page.locator('[data-pip-action="sample"]')).to_have_count(3)
    assert page.evaluate("document.documentElement.dataset.theme")=="dark", "New candidate should not erase the device theme"
    old=page.evaluate("({name:S.profile.name,cases:S.attempts.length,chat:S.chat.length,skills:Object.keys(S.pipSkillConfidence||{}).length})")
    assert old=={'name':'','cases':0,'chat':0,'skills':0},old

def pdf_upload(page):
    # Synthetic private-data-free PDF with a real-world merged name/contact header.
    doc=fitz.open()
    pdf=doc.new_page()
    for i,line in enumerate([
        "SIYA GUPTA       siya@example.com | +91 9000000000",
        "EDUCATIONAL QUALIFICATIONS & ACHIEVEMENTS",
        "Bachelor of Commerce - Sample College",
        "POSITIONS OF RESPONSIBILITY",
        "Volunteer lead - Sample Event",
        "INTERNSHIPS",
        "Business Analyst | Example Strategy Consulting"
    ]):
        pdf.insert_text((40,55+i*22),line,fontsize=10)
    b=doc.tobytes();doc.close()
    page.locator('[data-pip-action="upload"]').click()
    page.locator('#pipIntakeFile').set_input_files(
        {"name":"synthetic_candidate.pdf","mimeType":"application/pdf","buffer":b}
    )
    expect(page.locator('#pipReviewForm input[name="name"]')).to_have_value("Siya Gupta",timeout=20000)
    assert page.evaluate("S.chat.length")==0
    assert page.evaluate("S.attempts.length")==0
    assert page.evaluate("Object.keys(S.pipSkillConfidence||{}).length")==0

def main():
    global expect
    from playwright.sync_api import sync_playwright, expect
    with sync_playwright() as playwright:
        browser=playwright.chromium.launch(headless=True,args=["--no-sandbox"])
        total=0
        for sample,role,name in [
            ("JRA","PA","Prachuit (sample)"),
            ("AC","APM","Siya (sample)"),
            ("BA","PO","Aryan (sample)")
        ]:
            context=browser.new_context(viewport={"width":1440,"height":900})
            page=context.new_page()
            errors=setup(page)
            try:
                result=sample_case(page,sample,role,name)
                test_new_candidate_isolation(page)
                assert not errors,(sample,errors)
                print("PASS",sample,"→",role,": sample onboarding, skill selection, five questions, Pip conversation, clean restart",result['cases'])
                total+=1
            except Exception:
                page.screenshot(path=str(SCREENSHOTS/f"failure_{sample}.png"),full_page=True)
                print("FAILED",sample,traceback.format_exc())
                raise
            finally:
                context.close()
        context=browser.new_context(viewport={"width":1280,"height":840})
        page=context.new_page()
        errors=setup(page)
        try:
            pdf_upload(page)
            assert not errors,errors
            print("PASS PDF upload: candidate name extracted, fresh state and review form")
            total+=1
        except Exception:
            page.screenshot(path=str(SCREENSHOTS/"failure_pdf.png"),full_page=True)
            raise
        finally:
            context.close()
        browser.close()
        print(f"BROWSER SMOKE SUCCESS: {total} independent flows")

if __name__=="__main__":
    main()
