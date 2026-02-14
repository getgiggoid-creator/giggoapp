import { motion } from "framer-motion";
import { Check, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "Balance di dashboard",
  "Checklist campaign brief",
  "Competitive support",
];

const GiggoPricing = () => {
  return (
    <section className="py-20 md:py-32 bg-[#0A1628]" id="harga">
      <div className="mx-auto px-6 max-w-[1280px]">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold text-white leading-[1.3]">
            Model Harga yang Masuk Akal{"\n"}& Transparan.
          </h2>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-[600px] mx-auto p-12 rounded-3xl border border-white/10 text-center"
          style={{
            background: "rgba(26, 35, 50, 0.7)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 60px rgba(0,217,255,0.15)",
          }}
        >
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6"
            style={{
              background: "rgba(0, 217, 255, 0.1)",
              boxShadow: "0 0 40px rgba(0,217,255,0.3)",
            }}
          >
            <Scale className="w-10 h-10 text-[#00D9FF]" />
          </div>

          <h3 className="text-[32px] font-bold text-white mb-8">Pay-As-You-Go</h3>

          {/* Features */}
          <ul className="text-left max-w-[400px] mx-auto space-y-4 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                <span className="text-base text-white">{f}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-[#94A3B8] leading-[1.6] text-center mb-8">
            No subscription fees. No hidden costs. Bayar hanya untuk campaign yang aktif.
          </p>

          <Link
            to="/auth?mode=register&role=brand"
            className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-[#0A1628] bg-[#00D9FF] rounded-lg hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,217,255,0.4)] transition-all duration-300"
          >
            Mulai Sekarang
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GiggoPricing;
