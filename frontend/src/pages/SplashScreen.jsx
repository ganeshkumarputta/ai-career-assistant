import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {

      navigate("/login");

    }, 4000);

    return () => clearTimeout(timer);

  }, [navigate]);

  return (

    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      {/* Glow Effect */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-10">

          <div className="w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_80px_rgba(34,211,238,0.8)] animate-pulse">

            <h1 className="text-6xl font-black text-white">
              AI
            </h1>

          </div>

        </div>

        {/* Title */}
        <h1 className="text-6xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text animate-pulse tracking-[0.3em]">

          AI CAREER

        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-gray-400 tracking-[0.4em] text-lg">

          POWERED BY INTELLIGENCE

        </p>

        {/* Loading Bar */}
        <div className="mt-12 flex justify-center">

          <div className="w-72 h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/30">

            <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-[loading_4s_ease-in-out_infinite]" />

          </div>

        </div>

        {/* Loading Text */}
        <p className="mt-6 text-cyan-300 tracking-[0.5em] text-sm animate-pulse">

          INITIALIZING AI SYSTEM...

        </p>

      </div>

      <style>{`

        @keyframes loading {

          0% {
            width: 0%;
          }

          50% {
            width: 80%;
          }

          100% {
            width: 100%;
          }
        }

      `}</style>

    </div>
  );
}

export default SplashScreen;