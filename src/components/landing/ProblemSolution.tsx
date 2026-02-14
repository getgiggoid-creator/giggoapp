import { motion } from "framer-motion";
import { Hourglass, FolderOpen, Package } from "lucide-react";

const problems = [
  {
    icon: Hourglass,
    title: "The Dino-Era Time-Sink",
    desc: "Planning, diskusi, dan persetujuan untuk satu Campaign bisa memakan waktu 2-4 minggu. Manual, lama, dan tidak scalable.",
  },
  {
    icon: FolderOpen,
    title: "The Operational Nightmare",
    desc: "Contract chaos and confusion. Managing 10+ creators = 10+ different terms, payments, dan tracking spreadsheets.",
  },
  {
    icon: Package,
    title: "The ROI Blackbox",
    desc: 'Sebagian besar brands tidak tahu data siapa spends bisa untuk hasil yang terpercaya. Hasilnya ya, ini tidak terukur lah..',
  },
];

const ProblemSolution = () => {
  return (
    <section className="relative py-20 md:py-32 bg-[#0A1628] overflow-hidden" id="solusi">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a2332 1px, transparent 1px), linear-gradient(to bottom, #1a2332 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto px-6 max-w-[1280px]">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 max-w-[900px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold text-white leading-[1.3]" style={{ letterSpacing: "-0.01em" }}>
            Sejujurnya: Influencer Marketing{"\n"}Manual Itu Tidak Skalabel.
          </h2>
        </motion.div>

        {/* Problem cards grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,217,255,0.15)] hover:border-[#00D9FF]/20"
              style={{
                background: "rgba(26, 35, 50, 0.7)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Icon */}
              <div className="relative w-fit mb-6">
                <problem.icon className="w-12 h-12 text-[#EF4444]" strokeWidth={1.5} />
                {/* Glow on hover */}
                <div className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(239, 68, 68, 0.2)", filter: "blur(40px)" }} />
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-[28px] font-semibold text-white mb-4 leading-[1.3]">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-base text-[#94A3B8] leading-[1.6]">
                {problem.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
