import { motion } from "framer-motion";
import { Sparkles, Shield, Check } from "lucide-react";

const GiggoSolution = () => {
  return (
    <section className="py-20 md:py-32 bg-[#0A1628]">
      <div className="mx-auto px-6 max-w-[1280px]">
        {/* Section intro */}
        <motion.div
          className="text-center max-w-[900px] mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-sm font-semibold text-[#00D9FF] px-4 py-2 rounded-full border border-white/10 mb-4"
            style={{ background: "rgba(26, 35, 50, 0.7)", backdropFilter: "blur(10px)" }}
          >
            GIGGO:
          </span>
          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold text-white mb-6">
            Sistem Operasi untuk{"\n"}Creator Marketing Modern
          </h2>
          <p className="text-lg text-[#94A3B8] leading-[1.6]">
            GIGGO adalah sistem operasi untuk pelaksanaan kampanye marketing berdasarkan aktivitas creator di social media. Get Started Campaign dengan Creators and Affiliate System.
          </p>
        </motion.div>

        {/* Feature Block 1: Smart Matching */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            className="max-w-[600px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#00D9FF]/10">
                <Sparkles className="w-6 h-6 text-[#00D9FF]" />
              </div>
              <h3 className="text-xl lg:text-[28px] font-semibold text-white">Smart Matching Engine</h3>
            </div>
            <p className="text-lg text-[#94A3B8] leading-[1.6]">
              Creator search dilengkapi dengan algoritma dan machine learning untuk menemukan creators yang tepat dengan audiens yang align dengan target pasar campaign.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Glow */}
            <div className="absolute -inset-4 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,217,255,0.3) 0%, transparent 70%)", filter: "blur(48px)" }} />
            <div
              className="relative z-10 p-4 rounded-2xl border border-white/10"
              style={{
                background: "rgba(26, 35, 50, 0.7)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 60px rgba(0,217,255,0.4)",
              }}
            >
              {/* Matching mockup */}
              <div className="rounded-xl bg-[#1A2332] p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                  <span className="text-xs font-semibold text-white">AI Matching</span>
                </div>
                {[
                  { name: "Putri S.", match: "98%", niche: "Beauty" },
                  { name: "Rizky A.", match: "94%", niche: "Food" },
                  { name: "Maya R.", match: "91%", niche: "Fashion" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center justify-between bg-[#0A1628]/60 rounded-lg px-4 py-3 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#00D9FF]/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#00D9FF]">{c.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{c.name}</p>
                        <p className="text-[11px] text-[#94A3B8]">{c.niche}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#10B981]">{c.match}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Block 2: Secure & Strategic (reversed layout) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual left */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -inset-4 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,217,255,0.3) 0%, transparent 70%)", filter: "blur(48px)" }} />
            <div
              className="relative z-10 p-4 rounded-2xl border border-white/10"
              style={{
                background: "rgba(26, 35, 50, 0.7)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 60px rgba(0,217,255,0.4)",
              }}
            >
              <div className="rounded-xl bg-[#1A2332] p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-[#00D9FF]" />
                  <span className="text-xs font-semibold text-white">Approval Workflow</span>
                </div>
                {[
                  { step: "Brief Submitted", status: "Completed", color: "#10B981" },
                  { step: "Content Review", status: "In Progress", color: "#00D9FF" },
                  { step: "Final Approval", status: "Pending", color: "#94A3B8" },
                ].map((s) => (
                  <div key={s.step} className="flex items-center justify-between bg-[#0A1628]/60 rounded-lg px-4 py-3 border border-white/5">
                    <span className="text-sm text-white">{s.step}</span>
                    <span className="text-xs font-semibold" style={{ color: s.color }}>{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content right */}
          <motion.div
            className="max-w-[600px] order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#00D9FF]/10">
                <Shield className="w-6 h-6 text-[#00D9FF]" />
              </div>
              <h3 className="text-xl lg:text-[28px] font-semibold text-white">Secure & Strategic</h3>
            </div>
            <p className="text-lg text-[#94A3B8] leading-[1.6] mb-8">
              GIGGO Built-in approval system untuk konten creators sebelum publishing, dan review performance real time disertakan juga.
            </p>
            <div className="flex flex-col gap-3">
              {["Content preview before publish", "Approval workflow dengan timeline", "Revision tracking & history"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  <span className="text-base text-[#94A3B8]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiggoSolution;
