import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const GiggoHero = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  const stagger = (delay: number) => ({
    duration: 0.6,
    ease: "easeOut" as const,
    delay,
  });

  return (
    <section className="relative min-h-screen flex items-center bg-landing-bg overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,hsl(var(--landing-accent-glow)/0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,hsl(var(--landing-accent-glow)/0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN */}
          <div>
            {/* Live badge */}
            <motion.div {...fadeUp} transition={stagger(0.1)}>
              <div className="inline-flex items-center gap-2 bg-landing-surface/70 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-landing-accent animate-pulse" />
                <span className="text-sm font-medium text-landing-body">
                  LIVE DATA: 1,250+ Active Creators
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.15] text-white mb-6"
              {...fadeUp}
              transition={stagger(0.2)}
            >
              Ubah Ratusan{"\n"}Pelanggan Menjadi{"\n"}
              <span className="bg-gradient-to-r from-landing-accent via-[hsl(200,100%,45%)] to-[hsl(210,100%,40%)] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_8s_ease_infinite]">
                Marketing Force Anda.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg text-landing-body leading-relaxed mb-8 max-w-[600px]"
              {...fadeUp}
              transition={stagger(0.3)}
            >
              Ubah dari konvensional ke arah yang lebih cerdas. Giggo Membantu marketing force untuk mem-scale kanal Anda atas konten di TikTok.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              {...fadeUp}
              transition={stagger(0.4)}
            >
              <Button
                asChild
                className="h-14 px-8 text-lg font-semibold rounded-lg bg-landing-accent hover:bg-landing-accent-hover text-landing-bg shadow-[0_0_40px_hsl(var(--landing-accent-glow)/0.3)] hover:shadow-[0_0_60px_hsl(var(--landing-accent-glow)/0.4)] hover:-translate-y-0.5 transition-all"
              >
                <Link to="/auth?mode=register&role=brand" className="flex items-center gap-2">
                  Buat Campaign <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="h-14 px-8 text-lg font-semibold rounded-lg border-landing-accent text-landing-accent bg-transparent hover:bg-landing-accent/10"
              >
                <Link to="/auth?mode=register&role=creator">
                  Buat Campaign Kreator
                </Link>
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              className="flex flex-wrap gap-6 text-sm text-landing-body"
              {...fadeUp}
              transition={stagger(0.5)}
            >
              <span className="inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-status-success" /> No credit card required
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-status-success" /> Campaign review gratis
              </span>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Dashboard Visual */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={stagger(0.5)}
          >
            {/* Glow effects */}
            <div className="absolute -inset-4 bg-[radial-gradient(circle,hsl(var(--landing-accent-glow)/0.25)_0%,transparent_70%)] blur-2xl pointer-events-none" />

            {/* Dashboard mockup */}
            <div className="relative bg-landing-surface/70 backdrop-blur-xl p-4 border border-white/10 rounded-2xl shadow-[0_0_60px_hsl(var(--landing-accent-glow)/0.2)] animate-[float_3s_ease-in-out_infinite]">
              <div className="rounded-xl overflow-hidden bg-landing-bg border border-white/5">
                <div className="p-4 border-b border-white/5 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                  <span className="ml-3 text-xs text-landing-body-muted">GIGGO Dashboard</span>
                </div>
                <div className="p-6 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Active Creators", value: "1,250+" },
                      { label: "Campaigns", value: "320" },
                      { label: "Avg ROAS", value: "3.5x" },
                    ].map((s) => (
                      <div key={s.label} className="bg-landing-surface-alt rounded-lg p-3 border border-white/5">
                        <p className="text-xs text-landing-body-muted">{s.label}</p>
                        <p className="text-lg font-bold text-landing-accent">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Chart placeholder */}
                  <div className="bg-landing-surface-alt rounded-lg p-4 border border-white/5 h-32 flex items-end gap-1">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-landing-accent/60 to-landing-accent rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  {/* Creator list */}
                  <div className="space-y-2">
                    {["Putri S.", "Rizky A.", "Maya R."].map((name) => (
                      <div key={name} className="flex items-center justify-between bg-landing-surface-alt rounded-lg px-3 py-2 border border-white/5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-landing-accent/20" />
                          <span className="text-xs text-white">{name}</span>
                        </div>
                        <span className="text-xs text-status-success">● Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiggoHero;
