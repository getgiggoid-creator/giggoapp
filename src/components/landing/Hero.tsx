import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp } from "lucide-react";
import LogoMonogram from "@/components/shared/LogoMonogram";
import FloatingNotification from "./FloatingNotification";
import LazyVideo from "@/components/shared/LazyVideo";
import { useReducedMotion, getReducedMotionTransition } from "@/hooks/useReducedMotion";
import {
  heroContentConfig,
  heroVideoCards,
  heroStatsCard,
  heroFloatingNotifications,
  type HeroRole,
} from "@/config/heroContent";

interface HeroProps {
  activeRole?: HeroRole;
}

const Hero = ({ activeRole = "creators" }: HeroProps) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  // Get config for active role and apply translations
  const config = heroContentConfig[activeRole];
  const content = {
    badge: t(config.badgeKey, config.badgeDefault),
    headline1: t(config.headline1Key, config.headline1Default),
    headline2: t(config.headline2Key, config.headline2Default),
    subheadline: t(config.subheadlineKey, config.subheadlineDefault),
    primaryCta: {
      text: t(config.primaryCta.textKey, config.primaryCta.defaultText),
      link: config.primaryCta.link,
      icon: config.primaryCta.icon,
    },
    secondaryCta: {
      text: t(config.secondaryCta.textKey, config.secondaryCta.defaultText),
      link: config.secondaryCta.link,
      icon: config.secondaryCta.icon,
    },
    stats: config.stats.map((stat) => ({
      icon: stat.icon,
      text: t(stat.textKey, stat.defaultText),
    })),
  };

  const statsCardData = heroStatsCard[activeRole];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#020617] pt-12 pb-12">
      {/* Aurora Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Aurora Glow - Indigo (token-based) */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent-primary/12 rounded-full blur-[150px] animate-pulse-slow" />
            {/* Aurora Glow - Cyan (token-based) */}
            <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-accent-hover/12 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            {/* Subtle bottom glow (token-based) */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-primary/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
          </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-6">
          {/* Left Column: Dynamic Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
                transition={getReducedMotionTransition(prefersReducedMotion)}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8 hover:bg-white/10 transition-colors cursor-default">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-medium text-slate-300">
                    {content.badge}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.05]">
                  {content.headline1}
                  <br className="hidden lg:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-hover">
                    {content.headline2}
                  </span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                  {content.subheadline}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mb-12">
                  <Button
                    size="xl"
                    className="h-14 px-8 text-lg rounded-full shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all"
                    asChild
                  >
                    <Link to={content.primaryCta.link}>
                      {content.primaryCta.text}
                      <content.primaryCta.icon className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    className="h-14 px-8 text-lg rounded-full border-2 border-white/20 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to={content.secondaryCta.link}>
                      <content.secondaryCta.icon className="mr-2 w-5 h-5" />
                      {content.secondaryCta.text}
                    </Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center lg:justify-start gap-6 md:gap-8 text-sm font-medium text-slate-400 flex-wrap">
                  {content.stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <stat.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      <span>{stat.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Video Grid */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-full relative animate-float">
            <div className={
              `relative z-10 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-2xl ` +
              (activeRole === 'creators'
                ? 'bg-gradient-to-r from-accent-primary/8 to-primary/0'
                : 'bg-gradient-to-r from-accent-primary/4 to-accent-hover/0')
            }>
              {/* Header Mockup */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <LogoMonogram size="sm" />
                  <span className="font-bold text-lg text-white">
                    {activeRole === "creators" ? "Live Gigs" : "Top Creators"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400"></span>
                  <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                  <span className="h-3 w-3 rounded-full bg-green-400"></span>
                </div>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-[400px]">
                {/* Card 1: Fashion (Large) */}
                <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
                  <LazyVideo
                    src={heroVideoCards.fashion.videoSrc}
                    poster={heroVideoCards.fashion.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 text-white z-10">
                    <p className="font-bold text-lg">{heroVideoCards.fashion.title}</p>
                    <p className="text-sm opacity-90 text-primary font-medium">
                      {heroVideoCards.fashion.price} • {heroVideoCards.fashion.type}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-medium border border-white/20 z-10">
                    {heroVideoCards.fashion.category}
                  </div>
                </div>

                {/* Card 2: Fitness (Small) */}
                <div className="relative rounded-2xl overflow-hidden group hidden md:block">
                  <LazyVideo
                    src={heroVideoCards.fitness.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 text-white z-10">
                    <p className="font-bold text-sm">{heroVideoCards.fitness.title}</p>
                    <p className="text-xs text-green-400">{heroVideoCards.fitness.price}</p>
                  </div>
                </div>

                {/* Card 3: Stats */}
                <div className="relative rounded-2xl bg-slate-900/50 border border-white/10 p-4 flex flex-col justify-between group hover:border-primary/50 transition-colors hidden md:block">
                  <div>
                    <div className="h-8 w-8 rounded-full bg-accent-primary/20 flex items-center justify-center mb-2">
                      {activeRole === "creators" ? (
                        <DollarSign className="w-5 h-5 text-primary" />
                      ) : (
                        <TrendingUp className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{statsCardData.label}</p>
                    <p className="text-2xl font-bold font-display text-white">{statsCardData.value}</p>
                  </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-accent-primary h-full w-[70%] rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Notifications */}
            {heroFloatingNotifications.map((notification, index) => (
              <FloatingNotification
                key={index}
                type={notification.type}
                user={notification.user}
                highlight={notification.highlight}
                className={notification.className}
                delay={notification.delay}
              />
            ))}

            {/* Decoration Blobs */}
            <div className="absolute -z-10 top-10 -right-10 w-32 h-32 bg-signal-yellow/20 rounded-full blur-2xl" />
            <div className="absolute -z-10 bottom-[-20px] left-[-20px] w-40 h-40 bg-accent-primary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;