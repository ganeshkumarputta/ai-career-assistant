import React, { useRef, useState } from "react";

function MockInterview() {

  const [company, setCompany] = useState("");

  const [role, setRole] = useState("");

  const [jd, setJd] = useState("");

  const [questions, setQuestions] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [listening, setListening] = useState(false);

  const [feedback, setFeedback] = useState(null);

  const recognitionRef = useRef(null);

  const analyzeAnswer = (text) => {

    const fillerWords = [
      "um",
      "uh",
      "like",
      "you know",
      "actually",
      "basically"
    ];

    let fillerCount = 0;

    fillerWords.forEach((word) => {

      const regex =
        new RegExp(`\\b${word}\\b`, "gi");

      const matches = text.match(regex);

      if (matches) {
        fillerCount += matches.length;
      }
    });

    const words =
      text.trim().split(/\s+/);

    const wordCount = words.length;

    let repeatedWords = 0;

    for (let i = 1; i < words.length; i++) {

      if (
        words[i].toLowerCase() ===
        words[i - 1].toLowerCase()
      ) {
        repeatedWords++;
      }
    }

    let confidenceScore = 100;

    confidenceScore -= fillerCount * 10;

    confidenceScore -= repeatedWords * 5;

    if (wordCount < 20) {
      confidenceScore -= 30;
    }

    else if (wordCount < 40) {
      confidenceScore -= 15;
    }

    if (wordCount <= 3) {
      confidenceScore = 20;
    }

    if (confidenceScore < 0) {
      confidenceScore = 0;
    }

    if (confidenceScore > 100) {
      confidenceScore = 100;
    }

    let message = "";

    if (confidenceScore >= 85) {

      message =
        "Excellent communication and confidence.";
    }

    else if (confidenceScore >= 65) {

      message =
        "Good communication but improve fluency.";
    }

    else if (confidenceScore >= 40) {

      message =
        "Average communication. Practice speaking clearly.";
    }

    else {

      message =
        "Low confidence detected. Improve speaking confidence.";
    }

    setFeedback({
      fillerCount,
      repeatedWords,
      confidenceScore,
      wordCount,
      message
    });
  };

  const generateQuestions = async () => {

    try {

      const response = await fetch(
        "https://ai-career-assistant.onrender.com/generate_interview_questions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            company,
            role,
            jd
          })
        }
      );

      const data = await response.json();

      setQuestions(data.questions);

      setCurrentQuestionIndex(0);

      setAnswer("");

      setFeedback(null);

    } catch (error) {

      console.error(error);
    }
  };

  const startListening = () => {

    if (listening) return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition =
      new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    let finalTranscript = "";

    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {

      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0].transcript + " ";
      }

      finalTranscript = transcript;

      setAnswer(finalTranscript);
    };

    recognition.onerror = (event) => {

      console.error(event);

      setListening(false);
    };

    recognition.onend = () => {

      setListening(false);

      analyzeAnswer(finalTranscript);
    };
  };

  const stopListening = () => {

    if (recognitionRef.current) {

      recognitionRef.current.stop();

      setListening(false);
    }
  };

  const nextQuestion = () => {

    if (
      currentQuestionIndex <
      questions.length - 1
    ) {

      setCurrentQuestionIndex(
        currentQuestionIndex + 1
      );

      setAnswer("");

      setFeedback(null);
    }
  };

  return (

    <div
      style={{
        marginTop: "40px",
        background: "#0f172a",
        padding: "30px",
        borderRadius: "20px",
        color: "white",
        maxWidth: "1000px",
        margin: "40px auto"
      }}
    >

      <h2
        style={{
          marginBottom: "25px",
          fontSize: "32px"
        }}
      >
        🎤 AI Mock Interview
      </h2>

      <input
        type="text"
        placeholder="Enter Company Name (Optional)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
          fontSize: "15px",
          outline: "none",
          boxSizing: "border-box"
        }}
      />

      <input
        type="text"
        placeholder="Enter Role (Optional)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
          fontSize: "15px",
          outline: "none",
          boxSizing: "border-box"
        }}
      />

      <textarea
        placeholder="Paste Job Description (Optional)"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        rows="8"
        style={{
          width: "100%",
          padding: "14px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
          fontSize: "15px",
          resize: "none",
          outline: "none",
          boxSizing: "border-box"
        }}
      />

      <button
        onClick={generateQuestions}
        style={{
          padding: "14px 28px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "10px",
          marginBottom: "30px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold"
        }}
      >
        Generate Questions
      </button>

      <h3
        style={{
          marginBottom: "15px"
        }}
      >
        Question:
      </h3>

      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "25px",
          lineHeight: "1.8",
          fontSize: "17px"
        }}
      >
        {questions.length > 0
          ? questions[currentQuestionIndex]
          : "Generate interview questions first."}
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap"
        }}
      >

        <button
          onClick={startListening}
          disabled={listening}
          style={{
            padding: "14px 24px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "15px"
          }}
        >
          🎙️ Start Recording
        </button>

        <button
          onClick={stopListening}
          disabled={!listening}
          style={{
            padding: "14px 24px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "15px"
          }}
        >
          ⏹ Stop Recording
        </button>

        <button
          onClick={nextQuestion}
          disabled={
            currentQuestionIndex >=
            questions.length - 1
          }

          style={{
            padding: "14px 24px",
            background: "#9333ea",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "15px"
          }}
        >
          Next Question
        </button>

      </div>

      <div
        style={{
          marginTop: "35px"
        }}
      >

        <h3
          style={{
            marginBottom: "15px"
          }}
        >
          Your Answer:
        </h3>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "12px",
            minHeight: "120px",
            lineHeight: "1.8",
            fontSize: "16px"
          }}
        >
          {answer || "Your speech will appear here..."}
        </div>

      </div>

      {feedback && (

        <div
          style={{
            marginTop: "35px",
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px"
          }}
        >

          <h2
            style={{
              marginBottom: "20px"
            }}
          >
            📊 Interview Feedback
          </h2>

          <p>
            <strong>Confidence Score:</strong>
            {" "}
            {feedback.confidenceScore}%
          </p>

          <p>
            <strong>Word Count:</strong>
            {" "}
            {feedback.wordCount}
          </p>

          <p>
            <strong>Filler Words:</strong>
            {" "}
            {feedback.fillerCount}
          </p>

          <p>
            <strong>Repeated Words:</strong>
            {" "}
            {feedback.repeatedWords}
          </p>

          <p
            style={{
              marginTop: "15px",
              lineHeight: "1.8"
            }}
          >
            <strong>Feedback:</strong>
            {" "}
            {feedback.message}
          </p>

        </div>
      )}

    </div>
  );
}

export default MockInterview;