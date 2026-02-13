import { motion } from "framer-motion";
import { Users, MessageCircle, DollarSign, Heart } from "lucide-react";

const stats = [
  { icon: Users, value: "2,000+", label: "Brands and agencies" },
  { icon: MessageCircle, value: "Consistent work", label: "Get reliable hourly work instead of random gigs" },
  { icon: DollarSign, value: "$25-35+", label: "/hour" },
  { icon: Heart, value: "Inclusive", label: "0 Experience required." },
];

const TrustStats = () => {
  return (
    <section className="py-20 md:py-[120px] bg-[hsl(150,25%,97%)] relative overflow-hidden">
      <div className="mx-auto px-6 max-w-[1200px]">
        {/* Section header */}
        <div className="text-center mb-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-[hsl(155,60%,38%)] mb-3"
          >
            ⭐ How we work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[40px] font-semibold text-[hsl(0,0%,10%)] leading-[1.2] mb-4"
          >
            Earning has never<br />been <span className="text-[hsl(155,60%,38%)]">easier</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base text-[hsl(0,0%,40%)]"
          >
            Just Create Videos For Brands And Get Paid Hourly.
          </motion.p>
        </div>

        {/* Phone + floating badges layout */}
        <div className="relative flex items-center justify-center py-16 md:py-24">
          {/* Halo glow */}
          <div className="absolute w-[320px] h-[320px] md:w-[520px] md:h-[520px] rounded-full bg-[radial-gradient(circle,hsl(155,60%,38%,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Dotted circle decoration */}
          <div className="absolute w-[280px] h-[280px] md:w-[460px] md:h-[460px] rounded-full border-2 border-dashed border-[hsl(155,60%,38%)]/10 pointer-events-none" />

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 w-[180px] md:w-[220px] bg-[hsl(0,0%,10%)] rounded-[30px] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
          >
            <div className="bg-gradient-to-br from-[hsl(155,40%,90%)] to-[hsl(155,30%,85%)] rounded-[24px] aspect-[9/16] flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(155,60%,38%)] to-[hsl(155,60%,30%)] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">G</span>
              </div>
            </div>
          </motion.div>

          {/* Floating badges */}
          {stats.map((stat, i) => {
            const positions = [
              "top-0 left-0 md:top-4 md:left-4",
              "top-0 right-0 md:top-4 md:right-4",
              "bottom-0 left-0 md:bottom-4 md:left-4",
              "bottom-0 right-0 md:bottom-4 md:right-4",
            ];
            const delays = [0, 3, 1.5, 4.5];
            return (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`absolute ${positions[i]} z-20`}
                style={{
                  animation: `float-badge 6s ease-in-out ${delays[i]}s infinite`,
                }}
              >
                <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center p-3 border border-black/5">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-[hsl(155,60%,38%)] mb-1.5" />
                  <p className="text-sm md:text-base font-bold text-[hsl(0,0%,10%)] text-center leading-tight">{stat.value}</p>
                  <p className="text-[9px] md:text-[10px] text-[hsl(0,0%,55%)] text-center leading-tight mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/auth?mode=register&role=creator"
            className="inline-flex items-center gap-2 h-12 px-8 text-sm font-semibold rounded-full bg-gradient-to-r from-[hsl(155,60%,38%)] to-[hsl(155,60%,30%)] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Get Started Free <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStats;
