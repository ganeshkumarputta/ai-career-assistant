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
      <textarea onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}>Analyze</button>

      {result && <p>Confidence: {result.confidence_score}%</p>}
    </div>
  );
}

export default SpeechInput;
