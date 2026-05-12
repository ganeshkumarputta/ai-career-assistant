import re

STOPWORDS = {
    "the", "we", "will", "and", "or", "to",
    "a", "an", "of", "for", "in", "on",
    "with", "is", "are", "this", "that",
    "using", "also", "role"
}

def clean_words(text):
    words = re.findall(r'\b[a-zA-Z]+\b', text.lower())

    filtered = [
        word for word in words
        if word not in STOPWORDS and len(word) > 2
    ]

    return set(filtered)

def match_resume_with_jd(resume_text, jd_text):
    resume_words = clean_words(resume_text)
    jd_words = clean_words(jd_text)

    matched = resume_words.intersection(jd_words)

    if len(jd_words) == 0:
        return 0, []

    match_percent = (len(matched) / len(jd_words)) * 100

    missing = list(jd_words - resume_words)

    return round(match_percent, 2), missing[:15]