import React from "react";

import { useNavigate } from "react-router-dom";

import {
  FaRobot,
  FaFileAlt,
  FaMicrophoneAlt,
  FaChartLine
} from "react-icons/fa";

function Home() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1e1b4b)",
        color: "white",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Arial"
      }}
    >

      {/* Decorative Blur Circles */}

      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "#2563eb",
          borderRadius: "50%",
          filter: "blur(140px)",
          top: "-100px",
          left: "-100px",
          opacity: 0.4
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "#9333ea",
          borderRadius: "50%",
          filter: "blur(140px)",
          bottom: "-100px",
          right: "-100px",
          opacity: 0.4
        }}
      ></div>

      {/* Navbar */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "25px 60px",
          position: "relative",
          zIndex: 2
        }}
      >

        <h1
          style={{
            fontSize: "32px",
            color: "#38bdf8"
          }}
        >
          🚀 AI Career Assistant
        </h1>

        <div
          style={{
            display: "flex",
            gap: "15px"
          }}
        >

          <button
            onClick={() => navigate("/resume")}
            style={{
              padding: "12px 24px",
              background: "#2563eb",
              border: "none",
              borderRadius: "10px",
              color: "white",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "bold"
            }}
          >
            Resume Analyzer
          </button>

          <button
            onClick={() => navigate("/mock")}
            style={{
              padding: "12px 24px",
              background: "#9333ea",
              border: "none",
              borderRadius: "10px",
              color: "white",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "bold"
            }}
          >
            Mock Interview
          </button>

          <button
            onClick={() => navigate("/reports")}
            style={{
              padding: "12px 24px",
              background: "#0ea5e9",
              border: "none",
              borderRadius: "10px",
              color: "white",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "bold"
              }}
            >
              My Reports
          </button>

        </div>

      </div>

      {/* Hero Section */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "80px 60px",
          position: "relative",
          zIndex: 2,
          flexWrap: "wrap"
        }}
      >

        {/* Left Content */}

        <div
          style={{
            maxWidth: "600px"
          }}
        >

          <h1
            style={{
              fontSize: "70px",
              lineHeight: "1.2",
              marginBottom: "25px",
              fontWeight: "bold"
            }}
          >
            Build Your
            <span style={{ color: "#38bdf8" }}>
              {" "}Dream Career
            </span>
            <br />
            With AI 🚀
          </h1>

          <p
            style={{
              fontSize: "22px",
              lineHeight: "1.8",
              color: "#cbd5e1",
              marginBottom: "35px"
            }}
          >
            Analyze your resume, improve ATS score,
            prepare for company-specific interviews,
            and boost your confidence using AI-powered tools.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap"
            }}
          >

            <button
              onClick={() => navigate("/resume")}
              style={{
                padding: "18px 35px",
                background:
                  "linear-gradient(to right, #06b6d4, #2563eb)",
                border: "none",
                borderRadius: "14px",
                color: "white",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                boxShadow:
                  "0px 0px 20px rgba(37,99,235,0.5)"
              }}
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/mock")}
              style={{
                padding: "18px 35px",
                background:
                  "linear-gradient(to right, #9333ea, #c026d3)",
                border: "none",
                borderRadius: "14px",
                color: "white",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                boxShadow:
                  "0px 0px 20px rgba(147,51,234,0.5)"
              }}
            >
              Start Mock Interview
            </button>

          </div>

        </div>

        {/* Right Side Illustration */}

        <div
          style={{
            marginTop: "30px"
          }}
        >

          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            alt="AI"
            style={{
              width: "420px",
              animation: "float 4s ease-in-out infinite",
              filter:
                "drop-shadow(0px 0px 30px rgba(56,189,248,0.5))"
            }}
          />

        </div>

      </div>

      {/* Features Section */}

      <div
        style={{
          padding: "20px 60px 80px 60px",
          position: "relative",
          zIndex: 2
        }}
      >

        <h2
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "50px"
          }}
        >
          Powerful AI Features
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px"
          }}
        >

          <div style={cardStyle}>
            <FaFileAlt size={45} color="#38bdf8" />
            <h3>Resume Analyzer</h3>
            <p>
              Analyze resume quality and ATS optimization.
            </p>
          </div>

          <div style={cardStyle}>
            <FaChartLine size={45} color="#22c55e" />
            <h3>ATS Score</h3>
            <p>
              Improve your resume matching score instantly.
            </p>
          </div>

          <div style={cardStyle}>
            <FaMicrophoneAlt size={45} color="#c026d3" />
            <h3>AI Mock Interview</h3>
            <p>
              Practice HR and technical interviews with voice.
            </p>
          </div>

          <div style={cardStyle}>
            <FaRobot size={45} color="#f59e0b" />
            <h3>AI Feedback</h3>
            <p>
              Get intelligent suggestions to improve performance.
            </p>
          </div>

        </div>

      </div>

      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-20px);
            }

            100% {
              transform: translateY(0px);
            }
          }
        `}
      </style>

    </div>
  );
}

const cardStyle = {

  background: "rgba(255,255,255,0.05)",

  padding: "30px",

  borderRadius: "20px",

  backdropFilter: "blur(12px)",

  border: "1px solid rgba(255,255,255,0.1)",

  textAlign: "center",

  lineHeight: "1.8",

  boxShadow:
    "0px 0px 20px rgba(0,0,0,0.3)"
};
export default Home;

