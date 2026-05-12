import React, { useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaRobot
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isSignup, setIsSignup] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleAuth = async () => {

    try {

      setLoading(true);

      setError("");

      if (isSignup) {

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      }

      else {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      navigate("/home");

    }

    catch (err) {

      setError(err.message);
    }

    setLoading(false);
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #020617, #0f172a, #1e1b4b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Arial"
      }}
    >

      {/* Animated Background Circles */}

      <div style={circle1}></div>

      <div style={circle2}></div>

      <div style={circle3}></div>

      {/* Login Card */}

      <div
        style={{
          width: "420px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "30px",
          padding: "45px",
          boxShadow:
            "0px 0px 40px rgba(0,0,0,0.5)",
          position: "relative",
          zIndex: 2,
          animation:
            "fadeIn 1.2s ease"
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px"
          }}
        >

          <div
            style={{
              width: "90px",
              height: "90px",
              background:
                "linear-gradient(to right, #06b6d4, #9333ea)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              marginBottom: "20px",
              boxShadow:
                "0px 0px 30px rgba(147,51,234,0.6)",
              animation:
                "float 4s ease-in-out infinite"
            }}
          >
            <FaRobot size={40} color="white" />
          </div>

          <h1
            style={{
              color: "white",
              fontSize: "36px",
              marginBottom: "10px"
            }}
          >
            AI Career Assistant
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.7"
            }}
          >
            Resume Analysis & AI Mock Interviews
          </p>

        </div>

        {/* Email Input */}

        <div
          style={{
            position: "relative",
            marginBottom: "20px"
          }}
        >

          <FaEnvelope
            style={{
              position: "absolute",
              left: "15px",
              top: "18px",
              color: "#94a3b8"
            }}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

        </div>

        {/* Password Input */}

        <div
          style={{
            position: "relative",
            marginBottom: "20px"
          }}
        >

          <FaLock
            style={{
              position: "absolute",
              left: "15px",
              top: "18px",
              color: "#94a3b8"
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

        </div>

        {/* Error */}

        {error && (

          <p
            style={{
              color: "#f87171",
              marginBottom: "15px",
              textAlign: "center"
            }}
          >
            {error}
          </p>
        )}

        {/* Login Button */}

        <button
          onClick={handleAuth}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            background:
              "linear-gradient(to right, #06b6d4, #9333ea)",
            border: "none",
            borderRadius: "14px",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow:
              "0px 0px 25px rgba(147,51,234,0.4)",
            transition: "0.3s"
          }}
        >
          {loading
            ? "Please wait..."
            : isSignup
            ? "Create Account"
            : "Login"}
        </button>

        {/* Toggle */}

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginTop: "25px",
            lineHeight: "1.8"
          }}
        >

          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            onClick={() => setIsSignup(!isSignup)}
            style={{
              color: "#38bdf8",
              cursor: "pointer",
              marginLeft: "8px",
              fontWeight: "bold"
            }}
          >
            {isSignup
              ? "Login"
              : "Signup"}
          </span>

        </p>

      </div>

      <style>
        {`
          @keyframes float {

            0% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-15px);
            }

            100% {
              transform: translateY(0px);
            }
          }

          @keyframes fadeIn {

            from {
              opacity: 0;
              transform: scale(0.9);
            }

            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>

    </div>
  );
}

const inputStyle = {

  width: "100%",

  padding: "16px 16px 16px 48px",

  borderRadius: "14px",

  border: "1px solid rgba(255,255,255,0.15)",

  background: "rgba(255,255,255,0.08)",

  color: "white",

  fontSize: "16px",

  outline: "none",

  boxSizing: "border-box"
};

const circle1 = {

  position: "absolute",

  width: "320px",

  height: "320px",

  background: "#2563eb",

  borderRadius: "50%",

  filter: "blur(120px)",

  top: "-100px",

  left: "-100px",

  opacity: 0.4
};

const circle2 = {

  position: "absolute",

  width: "320px",

  height: "320px",

  background: "#9333ea",

  borderRadius: "50%",

  filter: "blur(120px)",

  bottom: "-100px",

  right: "-100px",

  opacity: 0.4
};

const circle3 = {

  position: "absolute",

  width: "220px",

  height: "220px",

  background: "#06b6d4",

  borderRadius: "50%",

  filter: "blur(120px)",

  top: "40%",

  left: "10%",

  opacity: 0.25
};

export default Login;