import { LucideIcon, ArrowRight, Play, Users, CheckCircle2, TrendingUp, Shield, Zap } from "lucide-react";

export type HeroRole = "creators" | "brands";

export interface HeroCtaConfig {
  textKey: string;
  defaultText: string;
  link: string;
  icon: LucideIcon;
}

export interface HeroStatConfig {
  icon: LucideIcon;
  textKey: string;
  defaultText: string;
}

export interface HeroRoleContent {
  badgeKey: string;
  badgeDefault: string;
  headline1Key: string;
  headline1Default: string;
  headline2Key: string;
  headline2Default: string;
  subheadlineKey: string;
  subheadlineDefault: string;
  primaryCta: HeroCtaConfig;
  secondaryCta: HeroCtaConfig;
  stats: HeroStatConfig[];
}

export type HeroContentConfig = Record<HeroRole, HeroRoleContent>;

/**
 * Hero section content configuration.
 * Translation keys are separated from default values for i18n support.
 */
export const heroContentConfig: HeroContentConfig = {
  creators: {
    badgeKey: "hero.creators.badge",
    badgeDefault: "The #1 Marketplace for Verified Creators",
    headline1Key: "hero.creators.headline1",
    headline1Default: "Create. Get Paid.",
    headline2Key: "hero.creators.headline2",
    headline2Default: "Repeat.",
    subheadlineKey: "hero.creators.subheadline",
    subheadlineDefault: "Giggo connects creators with brands looking for authentic UGC. Apply to gigs, create content, get paid securely.",
    primaryCta: {
      textKey: "hero.creators.cta",
      defaultText: "Start Earning",
      link: "/auth?mode=register&role=creator",
      icon: ArrowRight,
    },
    secondaryCta: {
      textKey: "hero.creators.secondaryCta",
      defaultText: "Browse Gigs",
      link: "/campaigns",
      icon: Play,
    },
    stats: [
      { icon: CheckCircle2, textKey: "hero.creators.stat1", defaultText: "Verified Brands" },
      { icon: Shield, textKey: "hero.creators.stat2", defaultText: "Secure Escrow" },
      { icon: Users, textKey: "hero.creators.stat3", defaultText: "10k+ Creators" },
    ],
  },
  brands: {
    badgeKey: "hero.brands.badge",
    badgeDefault: "Trusted by 850+ Leading Brands",
    headline1Key: "hero.brands.headline1",
    headline1Default: "Scale Your UGC.",
    headline2Key: "hero.brands.headline2",
    headline2Default: "Instantly.",
    subheadlineKey: "hero.brands.subheadline",
    subheadlineDefault: "Access pre-vetted creators ready to produce high-converting content. Launch campaigns in minutes, not weeks.",
    primaryCta: {
      textKey: "hero.brands.cta",
      defaultText: "Start Hiring",
      link: "/auth?mode=register&role=brand",
      icon: ArrowRight,
    },
    secondaryCta: {
      textKey: "hero.brands.secondaryCta",
      defaultText: "View Creators",
      link: "/creators",
      icon: Users,
    },
    stats: [
      { icon: Zap, textKey: "hero.brands.stat1", defaultText: "Pre-vetted Creators" },
      { icon: CheckCircle2, textKey: "hero.brands.stat2", defaultText: "Full Usage Rights" },
      { icon: TrendingUp, textKey: "hero.brands.stat3", defaultText: "7-Day Delivery" },
    ],
  },
};

/**
 * Video grid configuration for the Hero section bento grid.
 */
export const heroVideoCards = {
  fashion: {
    videoSrc: "https://cdn.coverr.co/videos/coverr-fashion-photoshoot-model-5348/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    title: "Zara Summer Campaign",
    price: "$1,200",
    type: "Video Reel",
    category: "Fashion",
  },
  fitness: {
    videoSrc: "https://cdn.coverr.co/videos/coverr-man-doing-crossfit-exercises-5120/1080p.mp4",
    title: "Gymshark Challenge",
    price: "$850",
  },
};

/**
 * Stats card configuration based on active role.
 */
export const heroStatsCard = {
  creators: {
    label: "Total Payouts",
    value: "$2.4M+",
  },
  brands: {
    label: "Active Creators",
    value: "10,000+",
  },
};

/**
 * Floating notification configuration for social proof.
 */
export const heroFloatingNotifications = [
  {
    type: "earning" as const,
    user: "@sarah.style",
    highlight: "$1,200",
    className: "absolute -top-4 -right-8 z-30 hidden lg:flex",
    delay: "0.5s",
  },
  {
    type: "approved" as const,
    user: "Nike",
    highlight: "new campaign",
    className: "absolute top-1/3 -left-12 z-30 hidden lg:flex",
    delay: "1.5s",
  },
  {
    type: "joined" as const,
    user: "@jake.fit",
    highlight: "Gymshark gig",
    className: "absolute -bottom-8 right-4 z-30 hidden lg:flex",
    delay: "2.5s",
  },
];
