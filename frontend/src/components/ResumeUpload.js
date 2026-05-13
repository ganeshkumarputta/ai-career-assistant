import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import {
  FaFileAlt,
  FaRobot,
  FaChartBar,
  FaQuestionCircle,
} from "react-icons/fa";

import { auth, db } from "../firebase";

import {
  addDoc,
  collection
} from "firebase/firestore";

function ResumeUpload() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [jd, setJd] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      formData.append("jd", jd);

      const res = await fetch(
        "https://ai-career-assistant-f1ca.onrender.com/analyze_resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      setResult(data);

      // SAVE REPORT TO FIRESTORE

      const user = auth.currentUser;

      if (user) {

        await addDoc(

          collection(db, "reports"),

          {

            email: user.email,

            ats_score: data.ats_score,

            match_score: data.match_percent,

            missing_keywords:
              data.missing_keywords,

            ai_feedback:
              data.ai_feedback,

            created_at:
              new Date().toISOString()
          }
        );
      }

      setLoading(false);

    } catch (error) {

      console.error("Error:", error);

      setLoading(false);
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #0f172a, #1e293b)",
        padding: "40px",
        fontFamily: "Arial",
        color: "white"
      }}
    >

      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          background: "#1e293b",
          padding: "35px",
          borderRadius: "20px",
          boxShadow:
            "0px 0px 25px rgba(0,0,0,0.5)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "45px",
            fontWeight: "bold",
            color: "#38bdf8"
          }}
        >
          🚀 AI Career Assistant
        </h1>

        <div
          style={{
            background: "#0f172a",
            padding: "30px",
            borderRadius: "15px"
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
              color: "#f8fafc"
            }}
          >
            <FaFileAlt /> Resume Analyzer
          </h2>

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            style={{
              marginBottom: "20px",
              color: "white"
            }}
          />

          <textarea
            rows="10"
            placeholder="Paste Job Description (Optional)"
            onChange={(e) =>
              setJd(e.target.value)
            }
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "12px",
              border: "1px solid #475569",
              outline: "none",
              fontSize: "16px",
              resize: "none",
              background: "#1e293b",
              color: "white",
              lineHeight: "1.7"
            }}
          />

          <br /><br />

          <button
            onClick={handleSubmit}
            style={{
              padding: "14px 28px",
              cursor: "pointer",
              background:
                "linear-gradient(to right, #06b6d4, #2563eb)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "17px",
              fontWeight: "bold"
            }}
          >
            Analyze Resume
          </button>

        </div>

        {loading && (

          <div
            style={{
              marginTop: "40px",
              textAlign: "center"
            }}
          >

            <h2>
              Analyzing Resume...
            </h2>

            <div
              style={{
                width: "60px",
                height: "60px",
                border: "6px solid #cbd5e1",
                borderTop:
                  "6px solid #38bdf8",
                borderRadius: "50%",
                margin: "25px auto",
                animation:
                  "spin 1s linear infinite"
              }}
            ></div>

          </div>
        )}

        {result && (

          <div
            style={{
              marginTop: "40px",
              background: "#f8fafc",
              color: "#111827",
              padding: "35px",
              borderRadius: "20px"
            }}
          >

            <h2
              style={{
                textAlign: "center",
                marginBottom: "30px"
              }}
            >
              📊 Analysis Results
            </h2>

            <div
              style={{
                width: "200px",
                height: "200px",
                margin: "auto"
              }}
            >

              <CircularProgressbar
                value={
                  jd.trim() !== ""
                    ? result.match_percent
                    : result.ats_score
                }

                text={
                  jd.trim() !== ""
                    ? `${result.match_percent}%`
                    : `${result.ats_score}%`
                }

                styles={buildStyles({
                  textSize: "16px",

                  pathColor:
                    (
                      jd.trim() !== ""
                        ? result.match_percent
                        : result.ats_score
                    ) > 60
                      ? "#16a34a"
                      : (
                          jd.trim() !== ""
                            ? result.match_percent
                            : result.ats_score
                        ) > 30
                      ? "#f59e0b"
                      : "#dc2626",

                  textColor: "#111827",

                  trailColor: "#d1d5db",
                })}
              />

            </div>

            <h2
              style={{
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "40px"
              }}
            >
              <FaChartBar />

              {" "}

              {jd.trim() !== ""
                ? "JD Match Score"
                : "ATS Score"}
            </h2>

            {jd.trim() !== "" && (

              <div
                style={{
                  marginBottom: "35px"
                }}
              >

                <h3>
                  Missing Keywords
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginTop: "18px"
                  }}
                >

                  {result.missing_keywords.map(
                    (word, index) => (

                    <span
                      key={index}
                      style={{
                        background: "#2563eb",
                        color: "white",
                        padding: "10px 16px",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "bold"
                      }}
                    >
                      {word}
                    </span>

                  ))}

                </div>

              </div>

            )}

            <div
              style={{
                marginBottom: "35px"
              }}
            >

              <h3>
                <FaQuestionCircle />

                {" "}

                Interview Questions
              </h3>

              <ul
                style={{
                  marginTop: "18px",
                  lineHeight: "2",
                  paddingLeft: "20px"
                }}
              >

                {result.questions.map(
                  (q, i) => (

                  <li
                    key={i}
                    style={{
                      marginBottom: "10px"
                    }}
                  >
                    {q}
                  </li>

                ))}

              </ul>

            </div>

            <div>

              <h3>
                <FaRobot />

                {" "}

                AI Feedback
              </h3>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  background: "#ffffff",
                  padding: "25px",
                  borderRadius: "15px",
                  border:
                    "1px solid #d1d5db",
                  lineHeight: "1.8",
                  marginTop: "18px",
                  fontSize: "15px",
                  color: "#111827"
                }}
              >
                {result.ai_feedback}
              </div>

            </div>

            <div
              style={{
                marginTop: "35px",
                textAlign: "center"
              }}
            >

              <h2>
                🎤 Ready for Mock Interview?
              </h2>

              <button
                onClick={() =>
                  navigate("/mock", {
                    state: {
                      jd: jd
                    }
                  })
                }

                style={{
                  marginTop: "20px",
                  padding: "14px 28px",
                  background: "#9333ea",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}
              >
                Start AI Mock Interview
              </button>

            </div>

          </div>
        )}

      </div>

      <style>
        {`
          @keyframes spin {

            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

    </div>
  );
}

export default ResumeUpload;