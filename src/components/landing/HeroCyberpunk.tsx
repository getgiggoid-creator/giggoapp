import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Search } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroCyberpunk = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const fadeUp = {
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
  };

  const stagger = (delay: number) => prefersReducedMotion 
    ? { duration: 0.01 } 
    : { duration: 0.5, ease: "easeOut" as const, delay };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-cyberpunk-bg">
      {/* BACKGROUND VISUAL ELEMENTS */}
      
      {/* Cyan glow orb - left */}
      <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] glow-orb-cyan pointer-events-none" />
      
      {/* Magenta glow orb - right */}
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] glow-orb-magenta pointer-events-none" />
      
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* NETWORK LINES */}
      <div className="absolute left-0 top-[25%] w-[35%] h-px glow-line-cyan animate-network-pulse opacity-40" />
      <div className="absolute left-[5%] top-[40%] w-[25%] h-px glow-line-cyan animate-network-pulse opacity-30" style={{ animationDelay: '1s' }} />
      <div className="absolute left-0 top-[55%] w-[20%] h-px glow-line-cyan animate-network-pulse opacity-25" style={{ animationDelay: '2s' }} />
      
      <div className="absolute right-[10%] top-[15%] w-[200px] h-px glow-line-magenta animate-network-pulse opacity-30 rotate-[30deg]" style={{ animationDelay: '0.5s' }} />
      <div className="absolute right-[5%] top-[35%] w-[150px] h-px glow-line-magenta animate-network-pulse opacity-25 rotate-[-20deg]" style={{ animationDelay: '1.5s' }} />
      <div className="absolute right-[15%] bottom-[25%] w-[180px] h-px glow-line-magenta animate-network-pulse opacity-35 rotate-[15deg]" style={{ animationDelay: '2.5s' }} />

      {/* Orbital accent circles */}
      <div className="absolute top-[30%] left-[15%] w-3 h-3 rounded-full bg-glow-cyan/40 animate-orbit pointer-events-none" />
      <div className="absolute top-[50%] right-[20%] w-2 h-2 rounded-full bg-glow-magenta/30 animate-orbit pointer-events-none" style={{ animationDelay: '-5s' }} />
      
      {/* Floating particles */}
      <div className="absolute top-[40%] left-[25%] w-1 h-1 rounded-full bg-glow-cyan/60 animate-float-particle" />
      <div className="absolute top-[60%] right-[30%] w-1.5 h-1.5 rounded-full bg-glow-magenta/40 animate-float-particle" style={{ animationDelay: '-2s' }} />
      <div className="absolute top-[35%] right-[40%] w-1 h-1 rounded-full bg-glow-cyan/50 animate-float-particle" style={{ animationDelay: '-4s' }} />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--glow-cyan) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--glow-cyan) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-0">
        <div className="max-w-3xl">
          
          {/* Badge */}
          <motion.div
            {...fadeUp}
            transition={stagger(0.1)}
          >
            <div className="inline-flex items-center gap-2.5 glass-pill rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-glow-cyan" />
              <span className="text-sm font-medium text-foreground/90">
                Creators & Brands Connected
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-glow-cyan" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6"
            {...fadeUp}
            transition={stagger(0.2)}
          >
            Connect Creators
            <br />
            with Brands
            <br />
            <span className="hero-heading-italic text-foreground/95">
              and Get Paid Securely.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-foreground/75 mb-10 leading-relaxed max-w-xl"
            {...fadeUp}
            transition={stagger(0.3)}
          >
            Browse gigs, submit your best content, and get paid securely — all in one platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            {...fadeUp}
            transition={stagger(0.4)}
          >
            <Link 
              to="/auth?mode=register&role=brand"
              className="btn-hero-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white font-medium text-base"
            >
              Start Hiring
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              to="/campaigns"
              className="glass-button inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-foreground font-medium text-base"
            >
              <Search className="w-4 h-4" />
              Explore Gigs Now
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 flex items-center gap-6 text-sm text-foreground/50"
            {...fadeUp}
            transition={stagger(0.5)}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-status-success" />
              <span>500+ Active Campaigns</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-foreground/20" />
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-glow-cyan" />
              <span>Secure Payments</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* DECORATIVE GLASS CARD - Right side (Desktop only) */}
      <motion.div
        className="hidden lg:block absolute right-[8%] top-1/2 -translate-y-1/2 w-[340px]"
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
        transition={stagger(0.6)}
      >
        <div className="glass-card rounded-2xl p-6">
          {/* Card header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-glow-cyan/20 to-glow-magenta/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-glow-cyan" />
              </div>
              <span className="text-sm font-medium text-foreground">Live Activity</span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-status-error/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-status-warning/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-status-success/80" />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="glass-pill rounded-xl p-3">
              <p className="text-xs text-foreground/50 mb-1">Active Gigs</p>
              <p className="text-xl font-bold text-foreground">247</p>
            </div>
            <div className="glass-pill rounded-xl p-3">
              <p className="text-xs text-foreground/50 mb-1">Creators</p>
              <p className="text-xl font-bold text-foreground">12.4K</p>
            </div>
          </div>

          {/* Activity feed */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 glass-pill rounded-lg px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-glow-cyan to-primary flex items-center justify-center text-xs font-bold text-white">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">New submission received</p>
                <p className="text-xs text-foreground/50">2 min ago</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-glow-cyan" />
            </div>
            
            <div className="flex items-center gap-3 glass-pill rounded-lg px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-glow-magenta to-purple-900 flex items-center justify-center text-xs font-bold text-white">
                M
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">Payment completed</p>
                <p className="text-xs text-foreground/50">5 min ago</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-status-success" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="flex justify-between text-xs text-foreground/50 mb-2">
              <span>Platform Growth</span>
              <span>78%</span>
            </div>
            <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
              <div className="h-full w-[78%] bg-gradient-to-r from-glow-cyan to-glow-magenta rounded-full" />
            </div>
          </div>
        </div>

        {/* Floating accent behind card */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] glow-orb-cyan opacity-30" />
      </motion.div>
    </section>
  );
};

export default HeroCyberpunk;
