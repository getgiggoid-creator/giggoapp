import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const creatorCards = [
  { name: "Sarah K.", niche: "Beauty", rotation: "-3deg" },
  { name: "Rizky A.", niche: "Food", rotation: "2deg" },
  { name: "Maya R.", niche: "Fashion", rotation: "-1deg" },
  { name: "Dani P.", niche: "Tech", rotation: "3deg" },
  { name: "Lisa W.", niche: "Lifestyle", rotation: "-2deg" },
];

const GiggoHero = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-20">
      <div className="mx-auto px-6 max-w-[1200px] w-full relative z-10 py-16 lg:py-0">
        <div className="text-center max-w-[800px] mx-auto">
          {/* App store badges */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              App Store
            </div>
            <div className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
              Google Play
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.15] text-[hsl(0,0%,10%)] mb-6"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Now <span className="text-[hsl(155,60%,38%)]">Followers?</span>
            <br />
            No Problem!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-[hsl(0,0%,40%)] leading-relaxed mb-8 max-w-[520px] mx-auto"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Brands Need REAL People, Not Just Influencers. Earn By The Hour Shooting Authentic Content At Home.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mb-16"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              asChild
              className="h-12 px-8 text-base font-semibold rounded-full bg-gradient-to-r from-[hsl(155,60%,38%)] to-[hsl(155,60%,30%)] hover:from-[hsl(155,60%,32%)] hover:to-[hsl(155,60%,25%)] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Link to="/auth?mode=register&role=creator" className="flex items-center gap-2">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Creator cards row */}
          <motion.div
            className="flex items-center justify-center gap-3 overflow-x-auto scrollbar-hide pb-4"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {creatorCards.map((card) => (
              <div
                key={card.name}
                className="flex-shrink-0 w-[100px] sm:w-[120px] rounded-2xl overflow-hidden bg-[hsl(150,25%,97%)] border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
                style={{ transform: `rotate(${card.rotation})` }}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-[hsl(155,30%,90%)] to-[hsl(155,20%,85%)] flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[hsl(155,60%,38%)]/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-[hsl(155,60%,38%)]">{card.name[0]}</span>
                  </div>
                </div>
                <div className="p-2 text-center">
                  <p className="text-[10px] font-semibold text-[hsl(0,0%,10%)] truncate">{card.name}</p>
                  <p className="text-[9px] text-[hsl(0,0%,55%)]">{card.niche}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiggoHero;
