import { motion } from "framer-motion";
import { Sparkles, Shield, Check } from "lucide-react";

const GiggoSolution = () => {
  return (
    <section className="py-32 bg-landing-bg" id="solution">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section intro */}
        <div className="text-center max-w-[900px] mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center bg-landing-surface/70 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-landing-accent text-sm font-semibold mb-4">
              GIGGO:
            </span>
            <h2 className="text-3xl md:text-[40px] font-bold text-white mb-6 leading-tight">
              Sistem Operasi untuk{"\n"}Creator Marketing Modern
            </h2>
            <p className="text-lg text-landing-body leading-relaxed">
              GIGGO adalah sistem operasi untuk pelaksanaan kampanye marketing berdasarkan aktivitas creator di social media. Get Started Campaign dengan Creators and Affiliate System.
            </p>
          </motion.div>
        </div>

        {/* Feature Block 1 - Smart Matching */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-[600px]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-landing-accent/10 rounded-xl">
                <Sparkles className="w-6 h-6 text-landing-accent" />
              </div>
              <h3 className="text-2xl md:text-[28px] font-semibold text-white">Smart Matching Engine</h3>
            </div>
            <p className="text-lg text-landing-body leading-relaxed">
              Creator search dilengkapi dengan algoritma dan machine learning untuk menemukan creators yang tepat dengan audiens yang align dengan target pasar campaign.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[radial-gradient(circle,hsl(var(--landing-accent-glow)/0.2)_0%,transparent_70%)] blur-2xl pointer-events-none" />
            <div className="relative bg-landing-surface/70 backdrop-blur-xl p-4 border border-white/10 rounded-2xl shadow-[0_0_60px_hsl(var(--landing-accent-glow)/0.15)]">
              <div className="bg-landing-bg rounded-xl p-6 border border-white/5 space-y-3">
                <div className="text-sm text-landing-body-muted mb-3">Smart Matching Results</div>
                {[
                  { name: "Putri S.", match: "98%", niche: "Beauty" },
                  { name: "Rizky A.", match: "95%", niche: "Food" },
                  { name: "Maya R.", match: "92%", niche: "Fashion" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center justify-between bg-landing-surface-alt rounded-lg px-4 py-3 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-landing-accent/20 flex items-center justify-center text-xs text-landing-accent font-bold">
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{c.name}</p>
                        <p className="text-xs text-landing-body-muted">{c.niche}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-landing-accent">{c.match}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Block 2 - Secure & Strategic (reversed) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-4 bg-[radial-gradient(circle,hsl(var(--landing-accent-glow)/0.2)_0%,transparent_70%)] blur-2xl pointer-events-none" />
            <div className="relative bg-landing-surface/70 backdrop-blur-xl p-4 border border-white/10 rounded-2xl shadow-[0_0_60px_hsl(var(--landing-accent-glow)/0.15)]">
              <div className="bg-landing-bg rounded-xl p-6 border border-white/5 space-y-3">
                <div className="text-sm text-landing-body-muted mb-3">Content Approval Pipeline</div>
                {[
                  { status: "Approved", label: "Skincare Routine Video", color: "text-status-success" },
                  { status: "In Review", label: "OOTD TikTok Content", color: "text-landing-accent" },
                  { status: "Draft", label: "Food Review Reel", color: "text-landing-body-muted" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between bg-landing-surface-alt rounded-lg px-4 py-3 border border-white/5">
                    <span className="text-sm text-white">{item.label}</span>
                    <span className={`text-xs font-semibold ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-[600px] order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-landing-accent/10 rounded-xl">
                <Shield className="w-6 h-6 text-landing-accent" />
              </div>
              <h3 className="text-2xl md:text-[28px] font-semibold text-white">Secure & Strategic</h3>
            </div>
            <p className="text-lg text-landing-body leading-relaxed mb-8">
              GIGGO Built-in approval system untuk konten creators sebelum publishing, dan review performance real time disertakan juga.
            </p>
            <ul className="space-y-3">
              {["Content preview before publish", "Approval workflow dengan timeline", "Revision tracking & history"].map((b) => (
                <li key={b} className="flex items-center gap-3 text-landing-body">
                  <Check className="w-5 h-5 text-status-success flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiggoSolution;
