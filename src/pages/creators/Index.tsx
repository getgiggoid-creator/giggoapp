import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  UserPlus, 
  Search, 
  Video, 
  Wallet,
  Play,
  Star,
  TrendingUp,
  DollarSign,
  Zap,
  Shield,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

// Sample success stories
const successStories = [
  { 
    id: 1, 
    name: "Sarah Chen", 
    handle: "@sarahcreates",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    earned: "$12,500",
    gigs: 24,
    quote: "Giggo changed my life. I went from 0 brand deals to working with Nike and Adidas.",
    niche: "Fashion"
  },
  { 
    id: 2, 
    name: "Marcus Johnson", 
    handle: "@marcusfitness",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    earned: "$8,200",
    gigs: 18,
    quote: "The best platform for fitness creators. Weekly payouts and amazing brand opportunities.",
    niche: "Fitness"
  },
  { 
    id: 3, 
    name: "Ayu Putri", 
    handle: "@ayubeauty",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    earned: "$15,800",
    gigs: 32,
    quote: "I quit my job to do this full-time. Giggo makes it so easy to find paid gigs.",
    niche: "Beauty"
  },
];

// Sample portfolio videos
const portfolioVideos = [
  { id: 1, thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=533&fit=crop", creator: "Maya", views: "2.4M" },
  { id: 2, thumbnail: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=533&fit=crop", creator: "Jake", views: "1.8M" },
  { id: 3, thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=533&fit=crop", creator: "Luna", views: "3.1M" },
  { id: 4, thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=533&fit=crop", creator: "Zara", views: "890K" },
  { id: 5, thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=533&fit=crop", creator: "Leo", views: "1.2M" },
  { id: 6, thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=533&fit=crop", creator: "Bella", views: "2.7M" },
  { id: 7, thumbnail: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=533&fit=crop", creator: "Nina", views: "1.5M" },
  { id: 8, thumbnail: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=533&fit=crop", creator: "Alex", views: "980K" },
];

const CreatorsLandingPage = () => {
  const { t } = useTranslation();

  const workflowSteps = [
    { icon: UserPlus, titleKey: "creatorsPage.workflow.step1.title", descKey: "creatorsPage.workflow.step1.description" },
    { icon: Search, titleKey: "creatorsPage.workflow.step2.title", descKey: "creatorsPage.workflow.step2.description" },
    { icon: Video, titleKey: "creatorsPage.workflow.step3.title", descKey: "creatorsPage.workflow.step3.description" },
    { icon: Wallet, titleKey: "creatorsPage.workflow.step4.title", descKey: "creatorsPage.workflow.step4.description" },
  ];

  const benefits = [
    { icon: DollarSign, titleKey: "creatorsPage.benefits.earnings.title", descKey: "creatorsPage.benefits.earnings.description" },
    { icon: Zap, titleKey: "creatorsPage.benefits.fast.title", descKey: "creatorsPage.benefits.fast.description" },
    { icon: Shield, titleKey: "creatorsPage.benefits.secure.title", descKey: "creatorsPage.benefits.secure.description" },
    { icon: Clock, titleKey: "creatorsPage.benefits.flexible.title", descKey: "creatorsPage.benefits.flexible.description" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ==================== SECTION 1: HERO ==================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-24 pb-16">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
                {t('creatorsPage.hero.badge')}
              </Badge>
              
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.05]">
                {t('creatorsPage.hero.title')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {t('creatorsPage.hero.titleHighlight')}
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl mb-8">
                {t('creatorsPage.hero.subtitle')}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-3xl font-bold text-foreground">$2.5M+</div>
                  <div className="text-sm text-muted-foreground">{t('creatorsPage.hero.stats.paidOut')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">12,500+</div>
                  <div className="text-sm text-muted-foreground">{t('creatorsPage.hero.stats.creators')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">$850</div>
                  <div className="text-sm text-muted-foreground">{t('creatorsPage.hero.stats.avgEarning')}</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/auth?mode=register&role=creator">
                  <Button size="xl" variant="hero" className="h-14 px-8 text-lg">
                    {t('creatorsPage.hero.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/campaigns">
                  <Button size="xl" variant="outline" className="h-14 px-8 text-lg">
                    {t('creatorsPage.hero.ctaSecondary')}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Floating Earnings Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main Card */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 relative">
                  <div className="text-sm text-muted-foreground mb-2">{t('creatorsPage.hero.earningsCard.title')}</div>
                  <div className="text-5xl font-bold text-foreground mb-6">$4,250</div>
                  
                  {/* Mini Chart */}
                  <div className="flex items-end gap-2 h-24 mb-6">
                    {[40, 65, 45, 80, 60, 90, 75, 95, 85, 100, 90, 110].map((height, i) => (
                      <div 
                        key={i}
                        className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-t-sm"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+32% {t('creatorsPage.hero.earningsCard.growth')}</span>
                  </div>
                </div>

                {/* Floating Badge 1 */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-float">
                  +$500 Today
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-3 rounded-2xl shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{t('creatorsPage.hero.earningsCard.topCreator')}</div>
                      <div className="text-sm font-bold">Sarah Chen</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: BENEFITS GRID ==================== */}
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
              {t('creatorsPage.benefits.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t('creatorsPage.benefits.titleHighlight')}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('creatorsPage.benefits.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t(benefit.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(benefit.descKey)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 3: SUCCESS STORIES ==================== */}
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
              {t('creatorsPage.stories.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t('creatorsPage.stories.titleHighlight')}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">{t('creatorsPage.stories.subtitle')}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {successStories.map((story) => (
              <motion.div
                key={story.id}
                variants={staggerItem}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={story.avatar} 
                    alt={story.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div>
                    <div className="font-bold text-foreground">{story.name}</div>
                    <div className="text-sm text-muted-foreground">{story.handle}</div>
                  </div>
                  <Badge variant="secondary" className="ml-auto">{story.niche}</Badge>
                </div>
                
                <p className="text-muted-foreground mb-6 italic">"{story.quote}"</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <div className="text-2xl font-bold text-primary">{story.earned}</div>
                    <div className="text-xs text-muted-foreground">{t('creatorsPage.stories.earned')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{story.gigs}</div>
                    <div className="text-xs text-muted-foreground">{t('creatorsPage.stories.gigs')}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 4: VIDEO PORTFOLIO MARQUEE ==================== */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 mb-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              {t('creatorsPage.portfolio.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t('creatorsPage.portfolio.titleHighlight')}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">{t('creatorsPage.portfolio.subtitle')}</p>
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/80 to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-scroll gap-6">
            {[...portfolioVideos, ...portfolioVideos].map((video, i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-[180px] md:w-[200px] aspect-[9/16] rounded-2xl overflow-hidden bg-muted relative group cursor-pointer"
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.creator}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{video.creator}</div>
                      <div className="text-white/70 text-xs">{video.views} views</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 5: HOW TO GET STARTED ==================== */}
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
              {t('creatorsPage.workflow.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t('creatorsPage.workflow.titleHighlight')}
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
                
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:block w-16 h-0.5 bg-border mx-4 flex-shrink-0" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 6: FINAL CTA ==================== */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="gradient-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                  {t('creatorsPage.cta.title')}
                </h2>
                <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                  {t('creatorsPage.cta.subtitle')}
                </p>
                <Link to="/auth?mode=register&role=creator">
                  <Button size="xl" className="bg-white text-primary hover:bg-white/90 rounded-full h-14 px-10 text-lg font-bold">
                    {t('creatorsPage.cta.button')}
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

export default CreatorsLandingPage;
