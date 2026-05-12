import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {

  const navigate = useNavigate();

  useEffect(() => {

    setTimeout(() => {

      navigate("/login");

    }, 3000);

  }, [navigate]);

  return (

    <div
      style={{
        height: "100vh",
        background: "#020617",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white"
      }}
    >

      <h1
        style={{
          fontSize: "60px",
          animation: "pulse 1.5s infinite"
        }}
      >
        🚀 AI Career Assistant
      </h1>

      <p
        style={{
          marginTop: "20px",
          fontSize: "20px"
        }}
      >
        Smart Resume & Interview Preparation
      </p>

    </div>
  );
}

export default SplashScreen;