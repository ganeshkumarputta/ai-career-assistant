import os

from openai import OpenAI

client = OpenAI(

    api_key=os.getenv("GROQ_API_KEY"),

    base_url="https://api.groq.com/openai/v1"
)

def get_ai_feedback(resume_text, jd_text):

    prompt = f"""
    Analyze this resume against the job description.

    Resume:
    {resume_text}

    Job Description:
    {jd_text}

    Give:
    1. Strengths
    2. Missing skills
    3. Improvements
    4. ATS optimization suggestions
    """

    try:

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"AI Error: {str(e)}"