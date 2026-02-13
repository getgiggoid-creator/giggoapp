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
    <section className="py-20 md:py-[120px] bg-[hsl(150,25%,97%)]" id="pricing">
      <div className="mx-auto px-6 max-w-[1200px]">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[40px] font-semibold text-[hsl(0,0%,10%)] leading-[1.2] mb-4"
          >
            Model Harga yang Masuk Akal<br />& Transparan.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[600px] mx-auto bg-white rounded-[20px] border border-black/5 p-10 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-center"
        >
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-[hsl(155,60%,38%)]/10 mx-auto flex items-center justify-center mb-6">
            <Scale className="w-10 h-10 text-[hsl(155,60%,38%)]" />
          </div>

          <h3 className="text-3xl font-bold text-[hsl(0,0%,10%)] mb-8">Pay-As-You-Go</h3>

          {/* Features */}
          <ul className="text-left max-w-[400px] mx-auto space-y-4 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[hsl(155,60%,38%)] flex-shrink-0" />
                <span className="text-[hsl(0,0%,10%)]">{f}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-[hsl(0,0%,50%)] leading-relaxed mb-8">
            No subscription fees. No hidden costs. Bayar hanya untuk campaign yang aktif.
          </p>

          <Button
            asChild
            className="h-12 px-10 text-base font-semibold rounded-full bg-gradient-to-r from-[hsl(155,60%,38%)] to-[hsl(155,60%,30%)] hover:from-[hsl(155,60%,32%)] hover:to-[hsl(155,60%,25%)] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Link to="/auth?mode=register&role=brand">Mulai Sekarang</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GiggoPricing;
