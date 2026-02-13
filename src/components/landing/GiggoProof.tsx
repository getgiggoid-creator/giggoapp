import { motion } from "framer-motion";

const creators = [
  { name: "Putri S.", location: "Jakarta", category: "Beauty", tag: null, payout: "$2,500" },
  { name: "Rizky A.", location: "Surabaya", category: "Food", tag: null, payout: "$1,800" },
  { name: "Maya R.", location: "Bandung", category: "Fashion", tag: "HUGE DISCOUNT", payout: "$3,200" },
];

const GiggoProof = () => {
  return (
    <section className="py-20 md:py-[120px] bg-[hsl(150,25%,97%)]" id="proof">
      <div className="mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-[hsl(155,60%,38%)] mb-3"
            >
              Creators
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-[40px] font-semibold text-[hsl(0,0%,10%)] leading-[1.2]"
            >
              Hear from Our<br /><span className="text-[hsl(155,60%,38%)]">Creators</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-[hsl(0,0%,50%)] max-w-[360px] leading-relaxed lg:text-right"
          >
            Discover How GIGGO Has Transformed The Journey Of Our Creators, Helping Them Achieve Success And Grow Their Influence.
          </motion.p>
        </div>

        {/* Creator cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator, i) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-full max-w-[280px] mx-auto bg-white rounded-[20px] overflow-hidden border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/5] bg-gradient-to-br from-[hsl(155,30%,88%)] to-[hsl(155,20%,82%)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[hsl(155,60%,38%)]/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-[hsl(155,60%,38%)]">{creator.name[0]}</span>
                  </div>
                </div>
                {creator.tag && (
                  <span className="absolute top-3 left-3 bg-white text-[hsl(155,60%,38%)] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {creator.tag}
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="px-4 pt-3 flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-[hsl(155,60%,38%)] text-white px-2 py-0.5 rounded-full font-medium">
                  {creator.category}
                </span>
                <span className="text-[10px] bg-[hsl(0,0%,95%)] text-[hsl(0,0%,40%)] px-2 py-0.5 rounded-full">
                  {creator.location}
                </span>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-[hsl(0,0%,10%)]">{creator.name}</p>
                <p className="text-sm font-bold text-[hsl(155,60%,38%)]">{creator.payout}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiggoProof;
