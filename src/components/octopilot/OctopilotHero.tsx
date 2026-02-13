import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const rotatingWords = ["AI Writer", "Smart Scheduling", "Deep Analytics"];

const OctopilotHero = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000000 0%, #0A0A0A 100%)" }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 70%)",
        }}
      />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "10%",
          left: "15%",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 70%)",
          filter: "blur(60px)",
          bottom: "10%",
          right: "10%",
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
          filter: "blur(50px)",
          top: "50%",
          right: "30%",
        }}
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-7xl pt-24 pb-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#06b6d4] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22d3ee]" />
            </span>
            <span
              className="text-sm font-medium text-[#94A3B8]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Platform AI untuk Kreator X Indonesia
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight text-white mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Tumbuhkan Audiens X<br className="hidden sm:block" /> Kamu dengan{" "}
            <span className="relative inline-block min-w-[220px] sm:min-w-[320px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] bg-clip-text text-transparent"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Octopilot membantu kreator Indonesia menulis konten engaging, menjadwalkan
            posting di waktu optimal, dan memahami performa akun — semua didukung AI.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto"
          >
            <Link
              to="/auth?mode=register"
              className="rounded-full bg-[#06b6d4] hover:bg-[#22d3ee] text-black font-semibold text-base px-8 py-3.5 transition-all hover:shadow-[0_0_32px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 text-center"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Mulai Gratis
            </Link>
            <a
              href="#fitur"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#fitur")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-base px-8 py-3.5 transition-all backdrop-blur-sm text-center"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Lihat Fitur
            </a>
          </motion.div>

          {/* Social proof row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
          >
            {/* Avatar stack */}
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {[
                  "https://api.dicebear.com/9.x/notionists/svg?seed=Aiden",
                  "https://api.dicebear.com/9.x/notionists/svg?seed=Lily",
                  "https://api.dicebear.com/9.x/notionists/svg?seed=Jack",
                  "https://api.dicebear.com/9.x/notionists/svg?seed=Mia",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-9 h-9 rounded-full border-2 border-black bg-[#1a1a1a]"
                  />
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-black bg-[#1a1a1a] flex items-center justify-center text-xs font-semibold text-[#06b6d4]">
                  +
                </div>
              </div>
              <span
                className="ml-3 text-sm text-[#94A3B8] font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Dipercaya 500+ kreator
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-white/10" />

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#10B981]" />
                <span
                  className="text-sm text-[#94A3B8]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  10K+ Tweet Dibuat
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#10B981]" />
                <span
                  className="text-sm text-[#94A3B8]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  98% Puas
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OctopilotHero;
