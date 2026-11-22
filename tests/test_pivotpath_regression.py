"""Regression checks for real PDF intake and bundled conversational experience."""
import pathlib
import unittest
import fitz
from fastapi.testclient import TestClient
from app import app, extract_sections

ROOT=pathlib.Path(__file__).resolve().parents[1]
client=TestClient(app)

class ResumeParsingTests(unittest.TestCase):
    def _pdf(self,lines):
        doc=fitz.open()
        page=doc.new_page(width=595,height=842)
        for i,line in enumerate(lines):
            page.insert_text((36,54+i*19),line,fontsize=10)
        out=doc.tobytes()
        doc.close()
        return out

    def test_name_and_contact_on_same_header_line(self):
        pdf=self._pdf([
            "SIYA GUPTA      siya@example.com | +91 9000000000 | LinkedIn",
            "EDUCATIONAL QUALIFICATIONS & ACHIEVEMENTS",
            "B.Com. (Hons.), Shri Ram College of Commerce",
            "INTERNSHIPS",
            "Business Analyst | Redseer Strategy Consultants",
            "POSITIONS OF RESPONSIBILITY",
            "Director | Shri Ram Consulting and Research Centre"
        ])
        res=client.post('/api/parse-resume',content=pdf,headers={'x-filename':'sample.pdf'})
        self.assertEqual(res.status_code,200,res.text)
        d=res.json()['draft']
        self.assertEqual(d['name'],'Siya Gupta')
        self.assertIn('education',d['sections'])
        self.assertIn('leadership',d['sections'])
        self.assertEqual(d['email'],'siya@example.com')

    def test_no_name_fabrication_from_headings(self):
        pdf=self._pdf([
            "RESUME",
            "SKILLS",
            "SQL Python Excel",
            "EXPERIENCE",
            "Research Assistant | Example Ltd"
        ])
        r=client.post('/api/parse-resume',content=pdf,headers={'x-filename':'sparse.pdf'})
        self.assertEqual(r.status_code,200,r.text)
        self.assertEqual(r.json()['draft']['name'],'')

    def test_input_claims_not_verified(self):
        pdf=self._pdf(["Test Candidate","EXPERIENCE","Analyst | Sample Company"])
        r=client.post('/api/parse-resume',content=pdf,headers={'x-filename':'test.pdf'})
        self.assertIn('review',r.json()['warning'].lower())

class FrontendStructureTests(unittest.TestCase):
    def test_bundled_scripts_order(self):
        html=(ROOT/'index.html').read_text('utf-8')
        self.assertRegex(html,r'/pip-journey[.]js[?]v=[0-9]+(?:[.][0-9]+)*')
        self.assertRegex(html,r'/pip-insights[.]js[?]v=[0-9]+(?:[.][0-9]+)*')
        self.assertLess(html.index('/pip-progress.js'),html.index('/pip-insights.js'))
        self.assertIn("developing:['Developing in practice'",html)

    def test_onboarding_moves_with_chat(self):
        script=(ROOT/'pip-experience.js').read_text('utf-8')
        css=(ROOT/'pip-experience.css').read_text('utf-8')
        html=(ROOT/'index.html').read_text('utf-8')
        self.assertIn('function intakeHistory()',script)
        self.assertIn('pipCurrentTurn',script)
        self.assertIn('body.scrollTop=body.scrollHeight',script)
        self.assertIn('.pipConversationHistory',css)
        self.assertIn('overflow-y:auto',css)
        self.assertRegex(html,r'/pip-experience[.]js[?]v=[0-9]+(?:[.][0-9]+)*')

    def test_chronological_coach_and_unified_mascot(self):
        app=(ROOT/'app.js').read_text('utf-8')
        journey=(ROOT/'pip-journey.js').read_text('utf-8')
        practice=(ROOT/'pip-progress.js').read_text('utf-8')
        experience=(ROOT/'pip-experience.js').read_text('utf-8')
        template=(ROOT/'template.html').read_text('utf-8')
        self.assertIn("lastFlow=items.findLastIndex",app)
        self.assertIn("pipFlowBubble",app)
        self.assertIn("const actions=isGuide",app)
        self.assertIn("function ensureFlow()",journey)
        self.assertIn("if(!pending||pending.route!==S.route",journey)
        self.assertIn("if(silentNavigation)return",journey)
        self.assertIn("S.pipChatCleanupV2",journey)
        self.assertIn("pipFlow:true",journey)
        self.assertIn("actions:m.actions",journey)
        self.assertIn("if(quick)quick.innerHTML=''",journey)
        self.assertNotIn("messages.appendChild(card)",practice)
        self.assertNotIn("m.insertBefore(el,m.firstChild)",experience)
        self.assertIn("pipSidebarAvatar",template)
        for content in (app,practice,template):
            self.assertNotIn("🐣",content)

    def test_explainable_insight_controls(self):
        script=(ROOT/'pip-insights.js').read_text('utf-8')
        self.assertIn("data-pc-confidence",script)
        self.assertIn("data-pc-action",script)
        self.assertIn("function activity()",script)
        self.assertIn("e.assessable===true",script)
        self.assertIn("completedAt",script)
        self.assertNotIn("hiring probability",script)

class CoachProductTruthTests(unittest.TestCase):
    def test_good_response_does_not_get_overwritten(self):
        from app import _ground_coach_navigation
        answer=("On Readiness Map, expand the feature-prioritization skill to see "
                "why it was flagged, then use the external Learn this skill link.")
        self.assertEqual(
            _ground_coach_navigation(answer,"Where do I learn prioritization?",{}),answer)

    def test_correctly_denied_learning_hub_is_preserved(self):
        from app import _ground_coach_navigation
        answer=("There is no learning hub. Open the Readiness Map and expand a skill "
                "evidence card for an external resource.")
        self.assertEqual(
            _ground_coach_navigation(answer,"Where is the learning hub?",{}),answer)

    def test_model_hallucination_is_replaced_by_real_navigation(self):
        from app import _ground_coach_navigation
        answer="Go to our learning hub for curated video lessons and resume templates."
        corrected=_ground_coach_navigation(
            answer,"What is the best way to improve?",{"active_goal_name":"Product Analyst"})
        self.assertIn("Readiness Map",corrected)
        self.assertIn("Practice & Improve",corrected)
        self.assertIn("external",corrected)
        self.assertNotIn("curated video",corrected.lower())

    def test_readiness_reply_is_grounded_in_real_results(self):
        from app import _ground_coach_navigation
        bad="Visit the learning hub to see whether you are ready for an APM interview."
        reply=_ground_coach_navigation(
            bad,"When can I say I am ready?",
            {"active_goal_name":"Associate Product Manager",
             "practice_checkpoint":{"completed_cases":1,"rated_answers":5}})
        self.assertIn("1 completed case",reply)
        self.assertIn("5 assessable answers",reply)
        self.assertIn("not proof of job readiness",reply)
        self.assertIn("Readiness Map",reply)
        self.assertNotIn("Visit the learning hub",reply)

    def test_live_coach_endpoint_sanitizes_unsupported_destination(self):
        from unittest.mock import AsyncMock, patch
        mocked=AsyncMock(return_value={
            "reply":"The learning hub has short videos and templates.",
            "follow_up_question":"","suggested_route":"","_provider":"groq"})
        with patch('app.pip_json',mocked):
            response=client.post('/api/coach',json={
                "message":"How do I improve feature prioritization?",
                "conversation_goal":"career_exploration",
                "context":{"active_goal_name":"Associate Product Manager",
                           "available_ui":{"readiness":"Readiness Map",
                                           "practice":"Practice & Improve"}},
                "thread":[]})
        self.assertEqual(response.status_code,200,response.text)
        text=response.json()['reply']
        self.assertIn("Readiness Map",text)
        self.assertIn("Practice & Improve",text)
        self.assertNotIn("short videos",text)
        self.assertTrue(mocked.await_count==1)

if __name__=='__main__':
    unittest.main()
