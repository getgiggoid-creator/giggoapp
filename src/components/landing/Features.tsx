import { useTranslation } from "react-i18next";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Megaphone,
  Video,
  Trophy,
  DollarSign,
  BarChart3,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface FeatureItem {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  gradient: string;
  iconColor: string;
  spotlightColor: string;
}

const Features = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const features: FeatureItem[] = [
    {
      icon: Megaphone,
      titleKey: "features.launchGigs.title",
      descriptionKey: "features.launchGigs.description",
      gradient: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-400",
      spotlightColor: "rgba(34, 211, 238, 0.15)",
    },
    {
      icon: Video,
      titleKey: "features.collectEntries.title",
      descriptionKey: "features.collectEntries.description",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
      spotlightColor: "rgba(192, 132, 252, 0.15)",
    },
    {
      icon: Trophy,
      titleKey: "features.challengeSystem.title",
      descriptionKey: "features.challengeSystem.description",
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400",
      spotlightColor: "rgba(251, 191, 36, 0.15)",
    },
    {
      icon: DollarSign,
      titleKey: "features.easyPayouts.title",
      descriptionKey: "features.easyPayouts.description",
      gradient: "from-emerald-500/20 to-green-500/20",
      iconColor: "text-emerald-400",
      spotlightColor: "rgba(52, 211, 153, 0.15)",
    },
    {
      icon: BarChart3,
      titleKey: "features.analyticsHub.title",
      descriptionKey: "features.analyticsHub.description",
      gradient: "from-blue-500/20 to-indigo-500/20",
      iconColor: "text-blue-400",
      spotlightColor: "rgba(96, 165, 250, 0.15)",
    },
    {
      icon: ShieldCheck,
      titleKey: "features.verifiedProfiles.title",
      descriptionKey: "features.verifiedProfiles.description",
      gradient: "from-rose-500/20 to-red-500/20",
      iconColor: "text-rose-400",
      spotlightColor: "rgba(251, 113, 133, 0.15)",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-landing-surface relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-landing-heading mb-6 tracking-tight drop-shadow-sm"
          >
            {t("features.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 animate-gradient-x">
              {t("features.titleHighlight")}
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-landing-body text-lg md:text-xl leading-relaxed"
          >
            {t("features.subtitle")}
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index} 
              prefersReducedMotion={prefersReducedMotion} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  feature, 
  index, 
  prefersReducedMotion 
}: { 
  feature: FeatureItem; 
  index: number; 
  prefersReducedMotion: boolean;
}) => {
  const { t } = useTranslation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion) opacity.set(1);
  };

  const handleMouseLeave = () => {
    if (!prefersReducedMotion) opacity.set(0);
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl border border-landing-card-border/10 bg-landing-card/40 backdrop-blur-sm overflow-hidden hover:border-landing-card-border/20 transition-colors duration-300"
    >
      {/* Dynamic Spotlight Gradient Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${feature.spotlightColor},
              transparent 40%
            )
          `,
        }}
      />

      <div className="relative h-full p-8 flex flex-col z-10">
        {/* Icon Container */}
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 bg-gradient-to-br border border-landing-card-border/10",
          feature.gradient
        )}>
          <feature.icon className={cn("w-7 h-7 transition-colors duration-300", feature.iconColor)} />
        </div>

        {/* Content */}
        <h3 className="font-display text-xl font-bold text-landing-heading mb-3 tracking-tight group-hover:text-primary transition-colors">
          {t(feature.titleKey)}
        </h3>
        
        <p className="text-landing-body text-base leading-relaxed flex-grow group-hover:text-landing-heading/80 transition-colors">
          {t(feature.descriptionKey)}
        </p>
      </div>
    </motion.div>
  );
};

export default Features;
