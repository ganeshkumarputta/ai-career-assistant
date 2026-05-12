def analyze_speech(text):
    words = text.split()
    filler_words = ["um", "uh", "like"]
    filler_count = sum(words.count(f) for f in filler_words)

    confidence = max(0, 100 - filler_count * 5)

    return {
        "confidence_score": confidence,
        "filler_words": filler_count
    }
