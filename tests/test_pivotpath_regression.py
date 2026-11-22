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
        self.assertIn('/pip-journey.js?v=1.3',html)
        self.assertIn('/pip-insights.js?v=5.10',html)
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
        self.assertIn('/pip-experience.js?v=5.11',html)

    def test_explainable_insight_controls(self):
        script=(ROOT/'pip-insights.js').read_text('utf-8')
        self.assertIn("data-pc-confidence",script)
        self.assertIn("data-pc-action",script)
        self.assertIn("function activity()",script)
        self.assertIn("e.assessable===true",script)
        self.assertIn("completedAt",script)
        self.assertNotIn("hiring probability",script)

if __name__=='__main__':
    unittest.main()
