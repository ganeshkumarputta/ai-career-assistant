import React, { useState } from "react";

function SpeechInput() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("text", text);

    const res = await fetch("https://ai-career-assistant-f1ca.onrender.com/analyze_speech", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h2>Speech Analyzer</h2>

      <textarea
        rows="6"
        cols="50"
        placeholder="Type your self introduction"
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Analyze Speech</button>

      {result && (
        <div>
          <h3>Speech Results</h3>

          <p>Confidence Score: {result.confidence_score}%</p>

          <p>Filler Words: {result.filler_words}</p>
        </div>
      )}
    </div>
  );
}

export default SpeechInput;