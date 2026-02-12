import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const GiggoCTA = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-landing-bg to-landing-surface relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle,hsl(var(--landing-accent-glow)/0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-[800px] relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Jangan Biarkan Kompetitor Anda{"\n"}Memonopoli Feed.
          </h2>

          <p className="text-lg text-landing-body mb-10">
            Dengan Gigtech setiap transaksi transparan, memimpin secara mudah pula.
          </p>

          <Button
            asChild
            className="h-16 px-12 text-xl font-bold rounded-lg bg-landing-accent hover:bg-landing-accent-hover text-landing-bg shadow-[0_0_40px_hsl(var(--landing-accent-glow)/0.4)] hover:scale-105 transition-all animate-[pulse-glow_2s_ease-in-out_infinite]"
          >
            <Link to="/auth?mode=register&role=brand" className="flex items-center gap-2">
              BUAT CAMPAIGN PERTAMA (GRATIS POSTING) <ArrowRight className="w-6 h-6" />
            </Link>
          </Button>

          <p className="text-xs text-landing-body-muted mt-6">
            *No credit card required. Campaign review gratis dari tim kami.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GiggoCTA;
