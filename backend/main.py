from pydantic import BaseModel

from company_questions import generate_company_questions

from fastapi import FastAPI, UploadFile, File, Form

from fastapi.middleware.cors import CORSMiddleware

from resume_parser import extract_text_from_pdf

from jd_matcher import match_resume_with_jd

from interview_generator import generate_questions

from speech_analyzer import analyze_speech

from ai_analyzer import get_ai_feedback

app = FastAPI()

class InterviewRequest(BaseModel):

    company: str = ""

    role: str = ""

    jd: str = ""

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze_resume")
async def analyze_resume(

    file: UploadFile = File(...),

    jd: str = Form("")

):

    resume_text = extract_text_from_pdf(file.file)

    # IF JD EXISTS
    if jd.strip() != "":

        match_percent, missing = match_resume_with_jd(
            resume_text,
            jd
        )

        questions = generate_questions(
            resume_text,
            jd
        )

    # IF JD NOT PROVIDED
    else:

        match_percent = 0

        missing = []

        questions = [
            "Tell me about yourself.",
            "What are your strengths?",
            "Explain one project from your resume.",
            "Why should we hire you?"
        ]

    ai_feedback = get_ai_feedback(
        resume_text,
        jd
    )

    # ATS SCORE
    ats_score = 78

    if match_percent > 0:

        ats_score = min(
            95,
            int(match_percent + 20)
        )

    return {

        "ats_score": ats_score,

        "match_percent": match_percent,

        "missing_keywords": missing,

        "questions": questions,

        "ai_feedback": ai_feedback
    }

@app.post("/analyze_speech")
async def analyze(text: str = Form(...)):

    return analyze_speech(text)

@app.post("/generate_interview_questions")
async def generate_questions_api(data: InterviewRequest):

    questions = generate_company_questions(

        data.company,

        data.role,

        data.jd
    )

    return {

        "questions": questions
    }