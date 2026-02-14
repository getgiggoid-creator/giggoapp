import { motion } from "framer-motion";

const stats = [
  { value: "320", label: "Konten UGC" },
  { value: "Rp 156", label: "CPE" },
  { value: "5.2 Juta", label: "Views" },
  { value: "+25%", label: "Sales Uplift" },
];

const GiggoProof = () => {
  return (
    <section className="py-20 md:py-32 bg-[#0A1628]" id="studi-kasus">
      <div className="mx-auto px-6 max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[1200px] mx-auto p-8 md:p-16 rounded-3xl border border-white/10"
          style={{
            background: "rgba(26, 35, 50, 0.7)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 60px rgba(0,217,255,0.15)",
          }}
        >
          {/* Header */}
          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold text-white mb-12">
            Bukti Nyata: Dari Brief Menjadi Pertumbuhan Bisnis
          </h2>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-3xl md:text-5xl font-bold mb-2"
                  style={{
                    background: "linear-gradient(45deg, #00D9FF, #00A8CC, #0077B6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-[#94A3B8] uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div
            className="p-8 rounded-2xl border border-white/5"
            style={{ background: "rgba(10, 22, 40, 0.5)" }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-20 h-20 rounded-full border-2 border-[#00D9FF] flex-shrink-0 flex items-center justify-center bg-[#1A2332]">
                <span className="text-xl font-bold text-[#00D9FF]">A</span>
              </div>
              <div>
                <p className="text-lg text-white italic leading-[1.6] mb-4">
                  "GIGGO memberi kami akses ke ratusan nano-creators yang sangat terjangkau dan berhasil menurunkan Customer Acquisition Cost kami sebesar 40%. Sebelum GIGGO, kami hanya bisa mengelola max. 5 creator per campaign."
                </p>
                <p className="text-base text-[#94A3B8] font-semibold">
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
