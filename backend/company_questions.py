from openai import OpenAI

client = OpenAI(
    api_key="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",
    base_url="https://api.groq.com/openai/v1"
)

def generate_company_questions(company, role, jd):

    if jd.strip() != "":

        prompt = f"""
        Generate 10 interview questions based on this Job Description.

        Job Description:
        {jd}

        Include:
        - HR questions
        - Technical questions
        - Scenario-based questions
        - Beginner to intermediate level
        """

    else:

        prompt = f"""
        Generate 10 interview questions.

        Company: {company}
        Role: {role}

        Include:
        - HR questions
        - Technical questions
        - Company-specific interview patterns
        """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    text = response.choices[0].message.content

    questions = text.split("\n")

    clean_questions = []

    for q in questions:

        q = q.strip()

        if len(q) > 5:
            clean_questions.append(q)

    return clean_questions