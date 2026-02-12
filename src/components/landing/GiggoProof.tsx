import { motion } from "framer-motion";

const stats = [
  { value: "320", label: "KONTEN UGC" },
  { value: "Rp 156", label: "CPE" },
  { value: "5.2 Juta", label: "VIEWS" },
  { value: "+25%", label: "SALES UPLIFT" },
];

const GiggoProof = () => {
  return (
    <section className="py-32 bg-landing-bg" id="proof">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-landing-surface/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-[0_20px_60px_hsl(var(--landing-accent-glow)/0.1)]"
        >
          <h2 className="text-3xl md:text-[40px] font-bold text-white mb-12">
            Bukti Nyata: Dari Brief Menjadi Pertumbuhan Bisnis
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-landing-accent via-[hsl(200,100%,45%)] to-[hsl(210,100%,40%)] bg-clip-text text-transparent mb-2">
                  {s.value}
                </p>
                <p className="text-sm text-landing-body uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-landing-bg/50 rounded-2xl p-6 md:p-8 border border-white/5">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-20 h-20 rounded-full bg-landing-accent/20 border-2 border-landing-accent flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-landing-accent">AR</span>
              </div>
              <div>
                <p className="text-lg text-white leading-relaxed italic mb-4">
                  "GIGGO memberi kami akses ke ratusan nano-creators yang sangat terjangkau dan berhasil menurunkan Customer Acquisition Cost kami sebesar 40%. Sebelum GIGGO, kami hanya bisa mengelola max. 5 creator per campaign."
                </p>
                <p className="text-landing-body font-semibold">
                  — Aisyah Rahmadita, Marketing Manager BRAND X
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GiggoProof;
