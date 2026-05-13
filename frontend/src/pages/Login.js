import React, { useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaRobot,
  FaEye,
  FaEyeSlash,
  FaPhone
} from "react-icons/fa";

import PhoneInput from "react-phone-input-2";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  const [isSignup, setIsSignup] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async () => {

    try {

      setLoading(true);

      setError("");

      setMessage("");

      if (!email || !password) {

        setError("Please fill all fields");

        setLoading(false);

        return;
      }

      if (isSignup) {

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        setMessage("Account created successfully!");

      } else {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        setMessage("Login successful!");

      }

      navigate("/home");

    } catch (err) {

      setError(err.message);

    }

    setLoading(false);
  };

  const handleForgotPassword = async () => {

    try {

      setError("");

      setMessage("");

      if (!email) {

        setError("Enter your email");

        return;
      }

      await sendPasswordResetEmail(auth, email);

      setMessage(
        "Password reset email sent successfully!"
      );

    } catch (err) {

      setError(err.message);
    }
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
        position: "relative",
        overflow: "hidden",
        fontFamily: "Arial"
      }}
    >

      <div style={circle1}></div>

      <div style={circle2}></div>

      <div style={circle3}></div>

      <div
        style={{
          width: "430px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          borderRadius: "30px",
          padding: "45px",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0px 0px 40px rgba(0,0,0,0.5)",
          zIndex: 2
        }}
      >

        {/* Logo */}

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
              marginBottom: "20px"
            }}
          >
            <FaRobot size={40} color="white" />
          </div>

          <h1
            style={{
              color: "white",
              fontSize: "34px"
            }}
          >
            AI Career Assistant
          </h1>

          <p style={{ color: "#cbd5e1" }}>
            AI Resume Analysis & Interviews
          </p>

        </div>

        {/* Email */}

        <div style={inputContainer}>

          <FaEnvelope style={iconStyle} />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
          />

        </div>

        {/* Phone Number */}

        <div
          style={{
            marginBottom: "20px"
          }}
        >

          <div
            style={{
              color: "white",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <FaPhone />
            Mobile Number
          </div>

          <PhoneInput
            country={"in"}
            value={phone}
            onChange={(phone) =>
              setPhone(phone)
            }
            inputStyle={{
              width: "100%",
              height: "55px",
              borderRadius: "14px",
              border:
                "1px solid rgba(255,255,255,0.15)",
              background:
                "rgba(255,255,255,0.08)",
              color: "white",
              fontSize: "16px"
            }}
            buttonStyle={{
              borderTopLeftRadius: "14px",
              borderBottomLeftRadius: "14px"
            }}
            dropdownStyle={{
              background: "#0f172a",
              color: "white"
            }}
          />

        </div>

        {/* Password */}

        <div style={inputContainer}>

          <FaLock style={iconStyle} />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={inputStyle}
          />

          <div
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            style={eyeStyle}
          >
            {showPassword
              ? <FaEyeSlash />
              : <FaEye />}
          </div>

        </div>

        {/* Forgot Password */}

        {!isSignup && (

          <div
            style={{
              textAlign: "right",
              marginBottom: "18px"
            }}
          >

            <span
              onClick={
                handleForgotPassword
              }
              style={{
                color: "#38bdf8",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Forgot Password?
            </span>

          </div>
        )}

        {/* Error */}

        {error && (

          <p
            style={{
              color: "#f87171",
              textAlign: "center"
            }}
          >
            {error}
          </p>
        )}

        {/* Success */}

        {message && (

          <p
            style={{
              color: "#4ade80",
              textAlign: "center"
            }}
          >
            {message}
          </p>
        )}

        {/* Button */}

        <button
          onClick={handleAuth}
          disabled={loading}
          style={buttonStyle}
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
            marginTop: "25px"
          }}
        >

          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            onClick={() =>
              setIsSignup(!isSignup)
            }
            style={{
              color: "#38bdf8",
              marginLeft: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >

            {isSignup
              ? "Login"
              : "Signup"}

          </span>

        </p>

      </div>

    </div>
  );
}

const inputContainer = {
  position: "relative",
  marginBottom: "20px"
};

const iconStyle = {
  position: "absolute",
  left: "15px",
  top: "18px",
  color: "#94a3b8"
};

const eyeStyle = {
  position: "absolute",
  right: "15px",
  top: "18px",
  color: "#94a3b8",
  cursor: "pointer"
};

const inputStyle = {
  width: "100%",
  padding: "16px 48px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box"
};

const buttonStyle = {
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
  marginTop: "15px"
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