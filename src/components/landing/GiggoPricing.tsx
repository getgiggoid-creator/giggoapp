import { motion } from "framer-motion";
import { Check, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  "Balance di dashboard",
  "Checklist campaign brief",
  "Competitive support",
];

const GiggoPricing = () => {
  return (
    <section className="py-32 bg-landing-bg" id="pricing">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[40px] font-bold text-white mb-4 leading-tight"
          >
            Model Harga yang Masuk Akal{"\n"}& Transparan.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[600px] mx-auto bg-landing-surface/70 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-[0_20px_60px_hsl(var(--landing-accent-glow)/0.1)] text-center"
        >
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-landing-accent/10 mx-auto flex items-center justify-center mb-6 shadow-[0_0_40px_hsl(var(--landing-accent-glow)/0.2)]">
            <Scale className="w-10 h-10 text-landing-accent" />
          </div>

          <h3 className="text-3xl font-bold text-white mb-8">Pay-As-You-Go</h3>

          {/* Features */}
          <ul className="text-left max-w-[400px] mx-auto space-y-4 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-status-success flex-shrink-0" />
                <span className="text-white">{f}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-landing-body leading-relaxed mb-8">
            No subscription fees. No hidden costs. Bayar hanya untuk campaign yang aktif.
          </p>

          <Button
            asChild
            className="h-14 px-10 text-lg font-bold rounded-lg bg-landing-accent hover:bg-landing-accent-hover text-landing-bg shadow-[0_0_30px_hsl(var(--landing-accent-glow)/0.3)]"
          >
            <Link to="/auth?mode=register&role=brand">Mulai Sekarang</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GiggoPricing;
