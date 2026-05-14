import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {

  const navigate = useNavigate();

  const [showGlow, setShowGlow] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {

    const glowTimer = setTimeout(() => {
      setShowGlow(true);
    }, 400);

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1500);

    const navTimer = setTimeout(() => {
      navigate("/login");
    }, 4500);

    return () => {
      clearTimeout(glowTimer);
      clearTimeout(textTimer);
      clearTimeout(navTimer);
    };

  }, [navigate]);

  return (

    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#020617] to-black" />

      {/* Cinematic Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" />

      {/* Light Rays */}
      <div className="absolute inset-0 overflow-hidden opacity-20">

        {[...Array(12)].map((_, i) => (

          <div
            key={i}
            className="absolute top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 to-transparent animate-pulse"
            style={{
              left: `${i * 8}%`,
            }}
          />

        ))}

      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Outer Ring */}
        <div
          className={`absolute rounded-full border border-cyan-400/20 transition-all duration-1000 ${showGlow ? "w-72 h-72 opacity-100 animate-spin" : "w-0 h-0 opacity-0"}`}
          style={{ animationDuration: "10s" }}
        />

        {/* Inner Ring */}
        <div
          className={`absolute rounded-full border border-purple-500/20 transition-all duration-1000 ${showGlow ? "w-56 h-56 opacity-100 animate-spin" : "w-0 h-0 opacity-0"}`}
          style={{
            animationDuration: "6s",
            animationDirection: "reverse"
          }}
        />

        {/* Logo */}
        <div
          className={`relative flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-2xl transition-all duration-1000 ${showGlow ? "w-40 h-40 scale-100 opacity-100" : "w-0 h-0 scale-0 opacity-0"}`}
        >

          <h1
            className={`text-white font-black tracking-[0.2em] transition-all duration-1000 ${showText ? "text-6xl opacity-100" : "text-sm opacity-0"}`}
          >
            AI
          </h1>

        </div>

        {/* Title */}
        <div
          className={`transition-all duration-1000 ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >

          <h1 className="mt-16 text-5xl font-black tracking-[0.3em] text-transparent bg-gradient-to-r from-cyan-400 via-white to-purple-500 bg-clip-text text-center">

            AI CAREER

          </h1>

          <p className="mt-6 text-center text-cyan-300 tracking-[0.4em] text-sm animate-pulse">

            NEXT GENERATION INTELLIGENCE

          </p>

        </div>

        {/* Loading Bar */}
        <div className="w-72 h-1 mt-14 overflow-hidden rounded-full bg-gray-800">

          <div className="h-full w-full bg-gradient-to-r from-cyan-400 via-white to-purple-500 animate-pulse" />

        </div>

      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">

        {[...Array(15)].map((_, i) => (

          <div
            key={i}
            className="absolute rounded-full bg-cyan-400 animate-pulse"
            style={{
              width: "4px",
              height: "4px",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random()
            }}
          />

        ))}

      </div>

    </div>
  );
}