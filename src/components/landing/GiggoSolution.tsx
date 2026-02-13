import { motion } from "framer-motion";

const steps = [
  {
    title: "Browse 100s of Active Jobs",
    desc: "Apply to companies that you think you'd be a good fit to make content for.",
    active: true,
  },
  {
    title: "Check your messages for the brand's response",
    desc: "Apply to companies that you think you'd be a good fit to make content for.",
    active: false,
  },
  {
    title: "Film!",
    desc: "Apply to companies that you think you'd be a good fit to make content for.",
    active: false,
  },
  {
    title: "Get paid!",
    desc: "Apply to companies that you think you'd be a good fit to make content for.",
    active: false,
  },
];

const GiggoSolution = () => {
  return (
    <section className="py-20 md:py-[120px] bg-white" id="solution">
      <div className="mx-auto px-6 max-w-[1200px]">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[40px] font-semibold text-[hsl(0,0%,10%)] leading-[1.2] mb-3"
          >
            How it <span className="text-[hsl(155,60%,38%)]">works?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base text-[hsl(0,0%,40%)]"
          >
            Join And Start Earning In Minutes
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Green accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[hsl(155,60%,38%)] to-[hsl(155,60%,38%)]/20 rounded-full" />

            <div className="space-y-6 pl-8">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  {/* Dot on line */}
                  <div className={`absolute -left-8 top-1 w-3 h-3 rounded-full border-2 ${step.active ? 'bg-[hsl(155,60%,38%)] border-[hsl(155,60%,38%)]' : 'bg-white border-[hsl(0,0%,80%)]'}`} />

                  <h3 className={`text-lg font-semibold mb-2 ${step.active ? 'text-[hsl(155,60%,30%)]' : 'text-[hsl(0,0%,10%)]'}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-[hsl(0,0%,50%)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="w-[260px] md:w-[300px] bg-[hsl(0,0%,10%)] rounded-[30px] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <div className="bg-white rounded-[24px] aspect-[9/16] overflow-hidden p-4 flex flex-col">
                <div className="text-xs font-semibold text-[hsl(0,0%,10%)] mb-3">GIGGO Creator Hub</div>
                <div className="space-y-2 flex-1">
                  {["UGC Creator for Health Products", "Fashion Content Creator", "TikTok Livestream Host"].map((job, i) => (
                    <div key={i} className="bg-[hsl(150,25%,97%)] rounded-xl p-3 border border-black/5">
                      <p className="text-[10px] font-semibold text-[hsl(0,0%,10%)]">{job}</p>
                      <p className="text-[8px] text-[hsl(0,0%,50%)] mt-0.5">Starting from $25/hr</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <span className="text-[7px] bg-[hsl(155,60%,38%)]/10 text-[hsl(155,60%,38%)] px-1.5 py-0.5 rounded-full font-medium">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiggoSolution;
