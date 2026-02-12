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
    <section className="py-32 bg-landing-bg relative" id="problems">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[40px] font-bold text-white leading-tight mb-4"
          >
            Sejujurnya: Influencer Marketing{"\n"}Manual Itu Tidak Skalabel.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-landing-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-[0_20px_60px_hsl(var(--landing-accent-glow)/0.1)] transition-all duration-300"
            >
              <div className="relative mb-6">
                <p.icon className="w-12 h-12 text-[#EF4444] stroke-[1.5]" />
                <div className="absolute inset-0 w-12 h-12 bg-[#EF4444]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl md:text-[28px] font-semibold text-white mb-4 leading-tight">
                {p.title}
              </h3>
              <p className="text-landing-body leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
