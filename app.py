"""PivotPath V4 -- local server and optional live OpenAI integration.
Run: python -m uvicorn app:app --host 127.0.0.1 --port 8000
All demo user data lives in the visitor's browser, never in a server database.
"""
from __future__ import annotations
import os, re, json, io, pathlib, textwrap, time
from collections import defaultdict, deque
from typing import Any
import httpx
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import FileResponse, JSONResponse, Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from providers import configured_providers, route_json

ROOT=pathlib.Path(__file__).resolve().parent
KEY=os.getenv('OPENAI_API_KEY','').strip()
MODEL=os.getenv('OPENAI_MODEL','gpt-4.1-mini')
app=FastAPI(title='PivotPath Career Coach',version='4.0')
# Lightweight per-process demo limit, not a production access-control solution.
_ai_requests=defaultdict(deque)
@app.middleware('http')
async def basic_demo_limits(request:Request,call_next):
    if request.method=='POST' and request.url.path.startswith('/api/'):
        try:size=int(request.headers.get('content-length','0'))
        except ValueError:size=0
        if size>8*1024*1024:
            return JSONResponse(status_code=413,content={'detail':'Request exceeds demo limit.'})
        if request.url.path in ('/api/coach','/api/assess','/api/resume-suggest'):
            ip=(request.client.host if request.client else 'unknown')
            now=time.monotonic();q=_ai_requests[ip]
            while q and q[0]<now-60:q.popleft()
            if len(q)>=25:
                return JSONResponse(status_code=429,content={'detail':'Too many AI requests; try again shortly.'})
            q.append(now)
    return await call_next(request)

@app.get('/api/status')
def status():
    return {'ai':'live' if configured_providers() else 'demo', 'providers':configured_providers(), 'gemini_opt_in_required':True, 'resume_parser':'available','pdf_export':'available','authentication':'not provided'}

@app.get('/pip-experience.js')
def pip_experience_js():
    return FileResponse(ROOT / 'pip-experience.js', media_type='application/javascript', headers={'Cache-Control':'public, max-age=300'})

@app.get('/pip-experience.css')
def pip_experience_css():
    return FileResponse(ROOT / 'pip-experience.css', media_type='text/css', headers={'Cache-Control':'public, max-age=300'})

@app.get('/pip-journey.js')
def pip_journey_js():
    return FileResponse(ROOT / 'pip-journey.js', media_type='application/javascript', headers={'Cache-Control':'public, max-age=300'})

@app.get('/pip-journey.css')
def pip_journey_css():
    return FileResponse(ROOT / 'pip-journey.css', media_type='text/css', headers={'Cache-Control':'public, max-age=300'})

@app.get('/pip-progress.js')
def pip_progress_js():
    return FileResponse(ROOT / 'pip-progress.js', media_type='application/javascript', headers={'Cache-Control':'public, max-age=300'})

@app.get('/pip-progress.css')
def pip_progress_css():
    return FileResponse(ROOT / 'pip-progress.css', media_type='text/css', headers={'Cache-Control':'public, max-age=300'})

@app.get('/roles.json')
def role_file(): return FileResponse(ROOT/'roles.json',media_type='application/json')

def extract_sections(content: str) -> dict:
    """Conservative resume structural extraction; never generates new facts.
    Carries original strings forward, even when a template cannot decide priority.
    """
    headings = {
      'education':'education','educational qualifications':'education',
      'educational qualifications & achievements':'education','academic qualifications':'education',
      'academic background':'education','professional experience':'experience',
      'work experience':'experience','employment':'experience',
      'internships':'internships','internship experience':'internships',
      'projects':'projects','projects and research':'projects',
      'technical publication':'projects','publications':'projects',
      'live project experience':'projects','project experience':'projects',
      'skills':'skills','technical skills':'skills',
      'certifications':'certifications','certificates':'certifications',
      'achievements':'leadership','positions of responsibility':'leadership',
      'position of responsibility':'leadership','responsibilities and leadership':'leadership',
      'leadership experience':'leadership',
      'leadership & achievements':'leadership'
    }
    parts={}
    section=None
    pieces=[]
    def flush():
      nonlocal pieces
      if not section or not pieces: pieces=[];return
      rows=[];last_bullet=None
      for raw in pieces:
        line=raw.strip()
        if not line: continue
        bullet=line.startswith(('•','\u2022','●','* ')) or (line.startswith('- ') and not re.match(r'^-?\d',line))
        if bullet:
          clean=line.lstrip('•●* -').strip()
          item={'title':'','detail':clean,'kind':'bullet'}
          rows.append(item);last_bullet=item
        elif last_bullet and (raw.startswith((' ', '\t')) or line[:1].islower()):
          last_bullet['detail']+=' '+line
        else:
          rows.append({'title':line,'detail':'','kind':'entry'})
          last_bullet=None
      if section=='education':
        grouped=[]
        for n in range(0,len(rows),2):
          left=rows[n]
          if n+1<len(rows) and left['kind']=='entry' and rows[n+1]['kind']=='entry':
            grouped.append({'title':left['title'],'detail':rows[n+1]['title'],'kind':'entry'})
          else:grouped.append(left)
        rows=grouped
      elif section in ('experience','internships','projects','leadership'):
        grouped=[]
        idx=0
        while idx<len(rows):
          item=rows[idx]
          if item['kind']=='entry' and idx+1<len(rows) and rows[idx+1]['kind']=='entry':
            item['detail']=rows[idx+1]['title'];idx+=1
          grouped.append(item);idx+=1
        rows=grouped
      elif section=='skills':
        rows=[{'title':'','detail':row['title'] or row['detail'],'kind':'bullet'} for row in rows]
      parts.setdefault(section,[]).extend(rows[:50]);pieces=[]
    for raw in content.splitlines():
      line=raw.strip()
      if not line: continue
      sec=headings.get(line.lower().rstrip(':'))
      if sec:
        flush();section=sec;continue
      if section:pieces.append(raw)
    flush()
    return parts

@app.post('/api/parse-resume')
async def parse_resume(request: Request):
    filename=request.headers.get('x-filename','resume').lower()
    data=await request.body()
    if not data: raise HTTPException(status_code=400,detail='File is empty')
    if len(data)>7*1024*1024: raise HTTPException(status_code=413,detail='Resume exceeds 7 MB limit')
    try:
        if filename.endswith('.pdf'):
            import fitz
            doc=fitz.open(stream=data,filetype='pdf')
            if doc.page_count>12: raise ValueError('Please upload a resume of 12 pages or fewer')
            content='\n'.join(p.get_text(sort=True) for p in doc)
        elif filename.endswith('.docx'):
            import docx
            document=docx.Document(io.BytesIO(data))
            content='\n'.join(p.text for p in document.paragraphs if p.text.strip())
            for table in document.tables:
                content+='\n'+'\n'.join(' | '.join(c.text for c in row.cells) for row in table.rows)
        elif filename.endswith(('.txt','.md','.tex')):
            content=data.decode('utf-8-sig',errors='replace')
        else: raise ValueError('Please choose a PDF, DOCX, TXT, MD or TEX file')
    except ValueError as e: raise HTTPException(status_code=422,detail=str(e))
    except Exception: raise HTTPException(status_code=422,detail='Could not extract text from this file. Try a text-based document or paste your resume.')
    if not content.strip(): raise HTTPException(status_code=422,detail='No readable text found. Scanned resumes need OCR, which is not available in this prototype.')
    match_email=re.search(r'[\w.+-]+@[\w.-]+\.\w+',content)
    # A real CV often has NAME, phone, e-mail and LinkedIn in the same
    # extracted header line. Don't discard the candidate's name merely
    # because contact details appear later in that line.
    lines=[i.strip() for i in content.splitlines() if i.strip()]
    def candidate_name(rows):
        stop={'RESUME','CURRICULUM VITAE','PROFILE','SUMMARY','EDUCATION',
              'EDUCATIONAL QUALIFICATIONS','INTERNSHIPS','EXPERIENCE',
              'CONTACT','LINKEDIN','SKILLS','PROJECTS'}
        for raw in rows[:8]:
            # Once a real resume section begins, any following two-word phrase
            # is more likely a skill or position than the candidate's name.
            section_head=raw.strip().upper().rstrip(':')
            if section_head in {'RESUME','CURRICULUM VITAE','PROFILE'}: continue
            if section_head in {'SKILLS','TECHNICAL SKILLS','EXPERIENCE','WORK EXPERIENCE',
                                'EDUCATION','EDUCATIONAL QUALIFICATIONS & ACHIEVEMENTS',
                                'INTERNSHIPS','PROJECTS','POSITIONS OF RESPONSIBILITY'}: break
            # Multiple spaces frequently separate name/contact columns.
            head=re.split(r'\s{3,}|\s*\|\s*|[\w.+-]+@[\w.-]+\.\w+|(?:\+91[- ]?)?\d{10}\b',raw,maxsplit=1)[0]
            head=re.sub(r'^(?:name\s*:\s*)','',head.strip(),flags=re.I).strip(' -:,')
            # Fall back to two leading title-cased name words if the header
            # was collapsed without spacing by a PDF text extractor.
            if len(head)>65 or len(head.split())>5:
                m=re.match(r'^([A-Z][A-Za-z.\x27-]+(?:\s+[A-Z][A-Za-z.\x27-]+){1,3})(?=\s|$)',head)
                if m: head=m.group(1)
            words=head.split()
            if not 2<=len(words)<=4 or len(head)>65: continue
            if not all(re.fullmatch(r"[A-Za-z][A-Za-z.'-]*",w) for w in words): continue
            if head.upper() in stop or any(w.upper() in {'@','EMAIL','PHONE'} for w in words): continue
            if any(k in head.upper() for k in ('COLLEGE','UNIVERSITY','CONSULTANT','EDUCATION','ADDRESS')): continue
            return head.title() if head.isupper() else head
        return ''
    possible_name=candidate_name(lines)
    skills=[]
    for s in lines:
        if re.match(r'^(programming|skills|technical skills|tools|data\s*&\s*bi)',s,re.I):
            skills+=re.findall(r'(?::|—|-)(.*)',s)[:1]
    bullet_lines=[x.lstrip('•-* \t') for x in lines if x.startswith(('•','-','*'))]
    output={'name':possible_name,'email':match_email.group(0) if match_email else '',
            'bullets':bullet_lines[:35], 'skills':', '.join(skills)[:1000], 'sections':extract_sections(content)}
    return {'parse_status':'success','text':content[:40000], 'draft':output,
            'warning':'Machine-extracted text must be reviewed before use. Some two-column PDF layouts may be read out of order.'}

def valid_answer(s: str)->bool:
    a=re.sub(r'\s+',' ',str(s)).strip()
    if len(a)<32 or len(re.findall(r'[a-zA-Z]+',a))<7: return False
    words=re.findall(r'[a-zA-Z]{2,}',a.lower())
    if len(words)>8 and len(set(words))<max(5,len(words)//5): return False
    if len(re.sub(r'[^a-zA-Z]','',a))>8:
        chars=re.sub(r'[^a-zA-Z]','',a).lower()
        if len(set(chars))<5: return False
    return True

async def pip_json(system: str, payload: dict, max_output_tokens: int, task: str, allow_gemini: bool):
    return await route_json(system, payload, max_output_tokens, task, allow_gemini)

_META_USER_QUESTION = re.compile(r"(?:what did i ask(?: you)?|what was my (?:last|previous|earlier) question|do you (?:know|remember) what my (?:last|previous) question was)", re.I)

def _clean_thread(raw):
    if not isinstance(raw,list): return []
    items=[]
    for x in raw[-20:]:
        if not isinstance(x,dict): continue
        who=x.get('who')
        if who not in ('user','pip'): continue
        msg=str(x.get('text','')).strip()[:2000]
        if msg: items.append({'speaker':'user' if who=='user' else 'pip','text':msg})
    return items

# Guard against models inventing a separate learning hub or built-in media.
_FAKE_PRODUCT_DESTINATION=re.compile(
    r'\b(?:learning hub|learning centre|learning center|skills? hub|'
    r'course library|training portal|video library|resource library)\b',re.I)
_FAKE_BUILTIN_MATERIALS=re.compile(
    r'\b(?:curated\s+(?:videos|templates)|built-in\s+(?:video|course)\s+library)\b',re.I)

def _ground_coach_navigation(reply:str,message:str,context:dict)->str:
    # If the model already correctly says the feature does not exist, don't
    # rewrite it. This is a safety net for affirmative, unsupported claims.
    if not (_FAKE_PRODUCT_DESTINATION.search(reply) or _FAKE_BUILTIN_MATERIALS.search(reply)):
        return reply
    # Correctly describing a missing feature is allowed.
    negative=r"\b(?:no|not|isn't|is not|don't have|do not have)\b.{0,45}\b(?:learning hub|learning center|learning centre|skills? hub|video library|course library|resource library)\b"
    if re.search(negative,reply,re.I) and not _FAKE_BUILTIN_MATERIALS.search(reply):
        return reply
    role=str(context.get('active_goal_name') or 'your chosen role').strip()[:100]
    wants_readiness=bool(re.search(r'\b(?:ready|readiness|prepared|interview|apply|application)\b',message,re.I))
    checkpoint=context.get('practice_checkpoint')
    if wants_readiness:
        count=checkpoint.get('completed_cases',0) if isinstance(checkpoint,dict) else 0
        rated=checkpoint.get('rated_answers',0) if isinstance(checkpoint,dict) else 0
        return (
          f'For {role}, you have {count} completed {"case" if count==1 else "cases"} and '
          f'{rated} assessable {"answer" if rated==1 else "answers"} recorded. '
          'Our suggested checkpoint before trying a harder mock is two different cases with at least eight rated answers, '
          'an average of 3.5/5 or higher, and no answer below 3/5 in the latest case. '
          'That is only a learning suggestion, not proof of job readiness; you can apply at any stage. '
          'In PivotPath, open Readiness Map to review skill evidence and Practice & Improve for cases and your improvement plan.'
        )
    return (
      'In Readiness Map, expand a skill evidence card to see why it was flagged and use its external '
      '"Learn this skill" link. In Practice & Improve, you can review case feedback and your improvement plan. '
      'There is no separate in-app learning hub. Which skill would you like to focus on?'
    )

@app.post('/api/coach')
async def coach(request:Request):
    data=await request.json()
    message=str(data.get('message','')).strip()[:3000]
    if not message: raise HTTPException(400,detail='Enter a message')
    context=data.get('context') if isinstance(data.get('context'),dict) else {}
    goal=str(data.get('conversation_goal') or 'general')
    if goal not in ('career_exploration','practice','resume','general'): goal='general'
    # Never let an unrelated case question override a career-exploration chat.
    if goal!='practice':
        context={k:v for k,v in context.items() if k not in ('active_question','latest_results')}
    thread=_clean_thread(data.get('thread',[]))
    if _META_USER_QUESTION.search(message):
        questions=[m['text'] for m in thread if m['speaker']=='user' and
                   '?' in m['text'] and not _META_USER_QUESTION.search(m['text'])]
        if questions:
            last=questions[-1].strip()[:550]
            return {'reply':'Earlier, you asked: “'+last+'” I should respond to that career goal, not switch to an unrelated practice case.',
                    'follow_up_question':'','suggested_route':'','provider':'conversation_history'}
        return {'reply':'I can only reference messages in this chat, and I cannot find an earlier question from you in the available history.',
                'follow_up_question':'','suggested_route':'','provider':'conversation_history'}
    sys=('You are Pip, a friendly but grounded career-transition interviewer. '
    'This is a natural conversation, NOT an assessment unless the user specifically requests practice. '
    'The current conversation_goal is '+goal+'. Honor it; screen location is secondary and may be unrelated. '
    'The recent_thread is the REAL, chronological dialogue; speaker=user means the human, speaker=pip means you. '
    'The user_message is the newest message and is NOT included in recent_thread. '
    'When asked about previous questions, use the actual dialogue, and never attribute your own words to the user. '
    'When a user says no, cannot, or has no relevant experience, acknowledge that and ask about '
    'transferable work such as research, problem-solving, stakeholder collaboration, or process improvement. '
    'Never force product-requirements experience or make up projects, metrics, activation data, or skills. '
    'Do not abruptly introduce funnel metrics, practice cases, or unrelated topics. '
    'The user has a persistent long-term target career; do not switch that goal when improving a resume. '
    'A resume edit is a temporary detour and the user should return to their previous readiness or practice step. '
    'If the user has already chosen an option, do not repeat the same menu or ask them to choose again. '
    'Instead honor their selection or give a brief next action. '
    'The website has explicit action buttons for navigation; never promise you have navigated unless the UI confirms it. '
    'Treat context.available_ui as the exact product navigation contract, not a guess. '
    'Only name the real screens: Career Discovery, Readiness Map, Practice & Improve, Living Resume, and My profile & settings. '
    'Readiness Map contains Competencies that matter, expandable skill-evidence cards and external Learn this skill links. '
    'Practice & Improve includes cases, feedback, progress and an improvement plan. '
    'There is NO separate learning hub, skills portal, video library, course catalog, or in-app set of curated templates. '
    'Do not invent screens, buttons, videos, curated articles, resources or features; external links must be described as external. '
    'When asked WHEN the user is ready, distinguish readiness to try harder practice from readiness to interview or apply. '
    'Use context.practice_checkpoint if provided: two different cases, at least eight assessable answers, overall 3.5/5 or higher '
    'and no result below 3/5 in the most recent case is ONLY an illustrative milestone for a harder mock, not a hiring benchmark. '
    'The user may apply at any stage. Ground readiness advice in their actual evidence and uncertainty. '
    'Do not suggest working on the resume unless the user asks or it is directly relevant to the current task. '
    'Use career_skill_picture, recent_practice and open_learning_actions when relevant; do not recite them as a dashboard. '
    'Self-reported confidence, resume claims and case ratings are different evidence; one case never proves mastery. '
    'Never narrate a tab change, repeat a step log, or introduce yourself again on routine navigation. '
    'Sound like a human coach: acknowledge the substance, add one grounded insight or gentle challenge, '
    'then ask ONE purposeful next question or offer one helpful action only when it advances the career goal. '
    'Do not use generic praise or pretend something was assessed if it was not. '
    'Make the most recent user message and the active career objective central to your reply. '
    'Ask at most ONE simple follow-up question, tailored to the last reply and original career aim. '
    'Keep the response concise (usually 2-4 sentences) and avoid repeating prompts. '
    'Treat unassessed competency as unknown rather than a weakness. Respect the user-chosen aspiration. '
    'Only suggest a navigation route if the user explicitly asks to navigate to that workspace. '
    'Return JSON ONLY with {"reply":"helpful response", "follow_up_question":"optional single question or empty string", '
    '"suggested_route":"discovery|readiness|practice|resume|profile|"}; no markdown fences.')
    out=await pip_json(sys,{'user_message':message,'conversation_goal':goal,
                            'context':context,'recent_thread':thread},650,'coach',data.get('allow_gemini') is True)
    reply=str(out.get('reply','')).strip()[:2300]
    followup=str(out.get('follow_up_question','')).strip()[:450]
    if followup and '?' not in reply and followup.lower() not in reply.lower():
        reply=(reply+'\n\n'+followup).strip()
    if not reply: reply='Could you tell me a little more about the experience you want to discuss?'
    reply=_ground_coach_navigation(reply,message,context)
    route=out.get('suggested_route','')
    # No unsolicited 'Open practice' button in a career-interview conversation.
    explicit_navigation=bool(re.search(r"\b(?:open|go to|navigate to|take me to|show me|start)\s+(?:the |my )?(?:practice|readiness|resume|profile|discovery)\b", message,re.I))
    if goal=='career_exploration' or not explicit_navigation: route=''
    return {'reply':reply,'follow_up_question':'',
            'suggested_route':route if route in ('discovery','readiness','practice','resume','profile') else '',
            'provider':out.get('_provider','unknown')}

@app.post('/api/assess')
async def assess(request:Request):
    data=await request.json()
    answer=str(data.get('answer',''))[:8000]
    if not valid_answer(answer): return {'assessable':False,'rating':None,'evidence':[],'missed':['Provide a meaningful, relevant answer rather than filler.'],'next_action':'Try explaining the steps and reasoning you would take.','source':'live'}
    sys=('You are a formative assessor of an original career practice case. Return JSON only with '
    '{"assessable":boolean,"rating":integer 1..5 or null,"evidence":["EXACT short substring appearing verbatim in answer"],'
    '"strengths":["specific observation"],"missed":["missing required criterion"],"next_action":"one actionable recommendation"}. '
    'Assess ONLY the current question, using the supplied competency and ideal answer expectations. '
    '1=weak relevant, 2=partial, 3=adequate, 4=strong, 5=exceptional. '
    'Invalid or irrelevant filler is not assessable and rating must be null. '
    'Do not invent quotations. If evidence is quoted, it must be exact substring. '
    'Be fair on alternative valid approaches; account for hints as context, not automatic deduction. '
    'This is formative case feedback, never an estimate of interview or hiring success. No code fences.')
    out=await pip_json(sys,{k:data.get(k) for k in ('question','competency','ideal','scenario','answer','hints_used','previous_answers')},800,'assess',data.get('allow_gemini') is True)
    rating=out.get('rating')
    assessable=bool(out.get('assessable',False)) and isinstance(rating,int) and 1<=rating<=5
    evidence=[str(e) for e in out.get('evidence',[]) if isinstance(e,str) and e and e in answer][:3]
    return {'assessable':assessable, 'rating':rating if assessable else None,'evidence':evidence,
            'strengths':[str(x)[:250] for x in out.get('strengths',[])][:3],
            'missed':[str(x)[:250] for x in out.get('missed',[])][:3],
            'next_action':str(out.get('next_action','Review the underlying principle and try a similar question.'))[:400], 'source':'live', 'provider':out.get('_provider','unknown')}

@app.post('/api/resume-suggest')
async def resume_suggest(request:Request):
    data=await request.json()
    source=str(data.get('source',''))[:2200]
    if len(source.strip())<12: raise HTTPException(status_code=422,detail='Tell Pip what you actually did before requesting a suggested bullet.')
    sys=('You edit a resume bullet to improve clarity and role relevance. Output strictly JSON with '
    '{"draft":"single concise bullet","reason":"why this wording is better"}. '
    'Never invent a metric, employer, responsibility, tool, result, competition, or date. '
    'Preserve all underlying facts; if the source is vague, prefer restrained wording. '
    'Do not treat an AI practice case as professional work experience. '
    'Make the bullet ATS-friendly, precise, action-led and 20-36 words if possible. No code fences.')
    out=await pip_json(sys,{'source':source,'role':str(data.get('role',''))[:120],'instruction':str(data.get('instruction',''))[:1200]},400,'resume',data.get('allow_gemini') is True)
    draft=str(out.get('draft','')).strip()[:800]
    if not draft: raise HTTPException(502,detail='AI did not produce an edit')
    return {'draft':draft,'reason':str(out.get('reason','')).strip()[:400],'source':'live','provider':out.get('_provider','unknown')}

@app.post('/api/export-pdf')
async def export_pdf(request:Request):
    data=await request.json()
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.colors import HexColor
    from reportlab.pdfbase.pdfmetrics import stringWidth
    buffer=io.BytesIO(); c=canvas.Canvas(buffer,pagesize=A4, pageCompression=1)
    W,H=A4; margin=34; y=H-34; maxw=W-2*margin
    c.setTitle(str(data.get('name') or 'PivotPath Resume'))
    def textline(s,sz=9,bold=False, color='#1D2640',extra=3):
        nonlocal y
        font='Helvetica-Bold' if bold else 'Helvetica'
        c.setFillColor(HexColor(color)); c.setFont(font,sz)
        s=str(s).replace('\\n',' ')
        words=s.split(); cur=''; lines=[]
        for word in words:
            nxt=(cur+' '+word).strip()
            if stringWidth(nxt,font,sz)>maxw-12 and cur:
                lines.append(cur);cur=word
            else: cur=nxt
        if cur:lines.append(cur)
        if not lines: lines=['']
        for line in lines:
            if y<38: raise HTTPException(422,detail='Resume exceeds one page. Shorten or hide lower-priority entries before exporting.')
            c.drawString(margin+ (9 if sz==8.4 else 0),y,line);y-=sz+extra
    name=str(data.get('name',''))[:140] or 'Your Name'
    c.setFont('Helvetica-Bold',16);c.setFillColor(HexColor('#25316B'));c.drawCentredString(W/2,y,name);y-=21
    segments=[]
    if data.get('email'):
        addr=str(data['email']).strip()[:120]
        segments.append((addr,'mailto:'+addr))
    if data.get('phone'): segments.append((str(data['phone']).strip()[:40],None))
    if str(data.get('linkedin','')).startswith(('https://','http://')):
        segments.append(('LinkedIn',str(data['linkedin']).strip()[:500]))
    if str(data.get('portfolio','')).startswith(('https://','http://')):
        segments.append(('Portfolio',str(data['portfolio']).strip()[:500]))
    c.setFont('Helvetica',7.6);c.setFillColor(HexColor('#3D4A68'))
    sep='  |  '
    total=sum(stringWidth(t,'Helvetica',7.6) for t,_ in segments)+max(0,len(segments)-1)*stringWidth(sep,'Helvetica',7.6)
    x=max(margin,(W-total)/2)
    for idx,(t,url) in enumerate(segments):
        c.drawString(x,y,t)
        width=stringWidth(t,'Helvetica',7.6)
        if url: c.linkURL(url,(x,y-2,x+width,y+9),relative=0)
        x+=width
        if idx<len(segments)-1:
            c.drawString(x,y,sep);x+=stringWidth(sep,'Helvetica',7.6)
    y-=20
    sections=data.get('sections',[])
    for section in sections:
        if not section.get('enabled',True):continue
        items=section.get('items',[])
        if not items:continue
        y-=5;c.setFont('Helvetica-Bold',10);c.setFillColor(HexColor('#322D82'));c.drawString(margin,y,str(section.get('title',''))[:80].upper()); y-=4
        c.setStrokeColor(HexColor('#98A5CF'));c.setLineWidth(.6);c.line(margin,y,W-margin,y);y-=12
        for i in items[:50]:
            if isinstance(i,dict):
                title=str(i.get('title',''));desc=str(i.get('detail',''))
                if title:textline(title,8.9,True,extra=3)
                if desc:textline(desc,8.1,False,extra=2)
            else:
                t=str(i).strip()
                if t: textline('•  '+t,8.4,False,extra=2.5)
            y-=2
    c.showPage();c.save()
    return Response(buffer.getvalue(),media_type='application/pdf',headers={'Content-Disposition':'attachment; filename="PivotPath_Resume.pdf"'})

@app.get('/')
def home(): return FileResponse(ROOT/'index.html')
app.mount('/', StaticFiles(directory=ROOT,html=True),name='static')
