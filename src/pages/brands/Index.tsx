import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  FileText, 
  Package, 
  Video, 
  Rocket, 
  CheckCircle, 
  Truck, 
  DollarSign, 
  Users,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TikTokLogo,
  InstagramLogo,
  YouTubeLogo,
  ShopifyLogo,
  StripeLogo,
  SpotifyLogo,
  MetaLogo,
  TwitterXLogo,
  AmazonLogo
} from "@/components/landing/BrandLogos";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Sample video data for marquee
const showcaseVideos = [
  { id: 1, thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=533&fit=crop", brand: "Fashion Co" },
  { id: 2, thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=533&fit=crop", brand: "Beauty Brand" },
  { id: 3, thumbnail: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=533&fit=crop", brand: "Tech Startup" },
  { id: 4, thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=533&fit=crop", brand: "Lifestyle" },
  { id: 5, thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=533&fit=crop", brand: "Fitness Pro" },
  { id: 6, thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=533&fit=crop", brand: "Skincare" },
  { id: 7, thumbnail: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=533&fit=crop", brand: "Food & Bev" },
  { id: 8, thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=533&fit=crop", brand: "Travel" },
];

const BrandsLandingPage = () => {
  const { t } = useTranslation();

  const workflowSteps = [
    { icon: FileText, titleKey: "brandsPage.workflow.step1.title", descKey: "brandsPage.workflow.step1.description" },
    { icon: Package, titleKey: "brandsPage.workflow.step2.title", descKey: "brandsPage.workflow.step2.description" },
    { icon: Video, titleKey: "brandsPage.workflow.step3.title", descKey: "brandsPage.workflow.step3.description" },
    { icon: Rocket, titleKey: "brandsPage.workflow.step4.title", descKey: "brandsPage.workflow.step4.description" },
  ];

  const trustLogos = [
    { name: "TikTok", Logo: TikTokLogo },
    { name: "Instagram", Logo: InstagramLogo },
    { name: "YouTube", Logo: YouTubeLogo },
    { name: "Shopify", Logo: ShopifyLogo },
    { name: "Stripe", Logo: StripeLogo },
    { name: "Spotify", Logo: SpotifyLogo },
    { name: "Meta", Logo: MetaLogo },
    { name: "Twitter", Logo: TwitterXLogo },
    { name: "Amazon", Logo: AmazonLogo },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ==================== SECTION 1: HERO ==================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-24 pb-16">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              {t('brandsPage.hero.badge')}
            </Badge>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 leading-[1.05]">
              {t('brandsPage.hero.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t('brandsPage.hero.titleHighlight')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              {t('brandsPage.hero.subtitle')}
            </p>
            
            <Link to="/auth?mode=register&role=brand">
              <Button size="xl" variant="hero" className="h-16 px-10 text-lg">
                {t('brandsPage.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Trust Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20"
          >
            <p className="text-sm text-muted-foreground mb-6">{t('brandsPage.hero.trustedBy')}</p>
            <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap opacity-50 grayscale">
              {trustLogos.slice(0, 6).map(({ name, Logo }) => (
                <div key={name} className="hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                  <Logo />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 2: BENTO GRID BENEFITS ==================== */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              {t('brandsPage.benefits.sectionTitle')}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]"
          >
            {/* Card 1: 10x Cheaper - Large (2x2) */}
            <motion.div
              variants={staggerItem}
              className="lg:col-span-2 lg:row-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <DollarSign className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('brandsPage.benefits.cheaper.title')}</h3>
              </div>
              
              {/* Comparison Chart */}
              <div className="space-y-4 mt-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{t('brandsPage.benefits.cheaper.comparison.agency')}</span>
                    <span className="text-muted-foreground">$15,000+</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full bg-muted-foreground/30 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{t('brandsPage.benefits.cheaper.comparison.giggo')}</span>
                    <span className="text-primary font-bold">$1,500</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[10%] bg-gradient-to-r from-primary to-accent rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Full Usage Rights - Small */}
            <motion.div
              variants={staggerItem}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all flex flex-col justify-center"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('brandsPage.benefits.rights.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('brandsPage.benefits.rights.description')}</p>
            </motion.div>

            {/* Card 3: Shipping Handled - Small */}
            <motion.div
              variants={staggerItem}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all flex flex-col justify-center"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('brandsPage.benefits.shipping.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('brandsPage.benefits.shipping.description')}</p>
            </motion.div>

            {/* Card 4: Pre-vetted Creators - Medium (2 cols) */}
            <motion.div
              variants={staggerItem}
              className="lg:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                {/* Avatar Stack */}
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-primary/50 to-accent/50 overflow-hidden"
                    >
                      <img 
                        src={`https://i.pravatar.cc/80?img=${i + 10}`} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    12K+
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('brandsPage.benefits.creators.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('brandsPage.benefits.creators.description')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 3: HOW IT WORKS ==================== */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              {t('brandsPage.workflow.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t('brandsPage.workflow.titleHighlight')}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto"
          >
            {workflowSteps.map((step, index) => (
              <motion.div key={index} variants={staggerItem} className="flex items-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto relative">
                    <step.icon className="w-10 h-10 text-primary" />
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{t(step.titleKey)}</h4>
                  <p className="text-sm text-muted-foreground max-w-[150px]">{t(step.descKey)}</p>
                </div>
                
                {/* Connector Line */}
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:block w-16 h-0.5 bg-border mx-4 flex-shrink-0" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 4: VIDEO SHOWCASE MARQUEE ==================== */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 mb-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              {t('brandsPage.showcase.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t('brandsPage.showcase.titleHighlight')}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">{t('brandsPage.showcase.subtitle')}</p>
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Edge Fade Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/80 to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-scroll gap-6">
            {[...showcaseVideos, ...showcaseVideos].map((video, i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-[180px] md:w-[200px] aspect-[9/16] rounded-2xl overflow-hidden bg-muted relative group cursor-pointer"
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.brand}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="text-white text-sm font-medium">{video.brand}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 5: FINAL CTA ==================== */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="gradient-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
              {/* Background Decorations */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                  {t('brandsPage.cta.title')}
                </h2>
                <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                  {t('brandsPage.cta.subtitle')}
                </p>
                <Link to="/auth?mode=register&role=brand">
                  <Button size="xl" className="bg-white text-primary hover:bg-white/90 rounded-full h-14 px-10 text-lg font-bold">
                    {t('brandsPage.cta.button')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BrandsLandingPage;
