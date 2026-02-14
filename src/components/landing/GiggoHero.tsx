import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const GiggoHero = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A1628] pt-[72px]">
      {/* Background glow effects */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,217,255,0.3) 0%, transparent 70%)",
          filter: "blur(48px)",
          opacity: 0.3,
        }}
      />
      <div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,217,255,0.15) 0%, transparent 70%)",
          animation: "float 6s ease-in-out infinite",
        }}
      />

      <div className="mx-auto px-6 max-w-[1280px] w-full relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          {/* Left column - Content */}
          <div>
            {/* Live badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 mb-6"
              style={{ background: "rgba(26, 35, 50, 0.7)", backdropFilter: "blur(10px)" }}
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75" style={{ animation: "ping 2s infinite" }} />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]" style={{ animation: "pulse-dot 2s infinite" }} />
              </span>
              <span className="text-sm font-medium text-white">LIVE DATA: 1,250+ Active Creators</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-[32px] sm:text-[40px] lg:text-[56px] font-bold leading-[1.2] text-white mb-6"
              style={{ letterSpacing: "-0.02em" }}
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ubah Ratusan{"\n"}
              Pelanggan Menjadi{"\n"}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(45deg, #00D9FF 0%, #00A8CC 25%, #0077B6 50%, #00D9FF 100%)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 8s ease infinite",
                }}
              >
                Marketing Force Anda.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base lg:text-lg text-[#94A3B8] leading-[1.6] mb-8 max-w-[600px]"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ubah dari konvensional ke arah yang lebih cerdas. Giggo Membantu marketing force untuk mem-scale kanal Anda atas konten di TikTok.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to="/auth?mode=register&role=brand"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base lg:text-lg font-semibold text-[#0A1628] bg-[#00D9FF] rounded-lg hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,217,255,0.4),0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                Buat Campaign
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              <Link
                to="/auth?mode=register&role=creator"
                className="inline-flex items-center justify-center px-8 py-4 text-base lg:text-lg font-semibold text-[#00D9FF] border border-[#00D9FF] rounded-lg hover:bg-[#00D9FF]/10 transition-all duration-300"
              >
                Buat Campaign Kreator
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              className="flex flex-wrap gap-6"
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <CheckCircle className="w-5 h-5 text-[#10B981]" />
                No credit card required
              </span>
              <span className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <CheckCircle className="w-5 h-5 text-[#10B981]" />
                Campaign review gratis
              </span>
            </motion.div>
          </div>

          {/* Right column - Dashboard visual */}
          <motion.div
            className="relative lg:block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Glow effects */}
            <div
              className="absolute -inset-4 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(0,217,255,0.4) 0%, transparent 70%)",
                filter: "blur(48px)",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none"
              style={{
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(0,217,255,0.2) 0%, transparent 70%)",
                filter: "blur(24px)",
                animation: "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />

            {/* Glass card container */}
            <div
              className="relative z-10 p-4 rounded-2xl border border-white/10"
              style={{
                background: "rgba(26, 35, 50, 0.7)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 60px rgba(0,217,255,0.4), 0 20px 40px rgba(0,0,0,0.3)",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              {/* Dashboard mockup */}
              <div className="rounded-xl bg-[#1A2332] aspect-video flex flex-col p-6 gap-4">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#00D9FF]/20 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-[#00D9FF]">G</span>
                    </div>
                    <span className="text-xs font-semibold text-white">Dashboard</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active Campaigns", value: "12" },
                    { label: "Total Creators", value: "248" },
                    { label: "Avg ROAS", value: "3.5x" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#0A1628]/60 rounded-lg p-3 border border-white/5">
                      <p className="text-[10px] text-[#94A3B8] mb-1">{stat.label}</p>
                      <p className="text-lg font-bold text-[#00D9FF]">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Content rows */}
                <div className="flex-1 space-y-2">
                  {["Beauty Campaign — 24 creators", "Tech Review — 12 creators", "Fashion Lookbook — 18 creators"].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#0A1628]/40 rounded-lg px-3 py-2 border border-white/5">
                      <span className="text-[11px] text-[#94A3B8]">{item}</span>
                      <span className="text-[10px] font-semibold text-[#10B981]">Active</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiggoHero;
