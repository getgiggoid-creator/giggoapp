import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Star, 
  Zap, 
  Users,
  Play,
  Pause
} from "lucide-react";
import { cn } from "@/lib/utils";
import LazyVideo, { LazyVideoHandle } from "@/components/shared/LazyVideo";
import {
  featuredCreator,
  spotlightCreators,
  liveActivity,
} from "@/fixtures";

const CreatorHub = () => {
  const { t } = useTranslation();
  const initialPlayingState: Record<string, boolean> = {
    [featuredCreator.id]: true,
    ...Object.fromEntries(spotlightCreators.map((c) => [c.id, true]))
  };

  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>(initialPlayingState);
  const videoRefs = useRef<Record<string, LazyVideoHandle | null>>({});

  const togglePlay = (id: string) => {
    const videoHandle = videoRefs.current[id];
    if (videoHandle) {
      const video = videoHandle.getVideo();
      if (video) {
        if (video.paused) {
          video.play();
          setIsPlaying(prev => ({ ...prev, [id]: true }));
        } else {
          video.pause();
          setIsPlaying(prev => ({ ...prev, [id]: false }));
        }
      }
    }
  };

  const getBadgeLabel = (badge: string) => {
    if (badge === "Verified") return t("creatorHub.featured.verified");
    if (badge === "Top Rated") return t("creatorHub.featured.topRated");
    return badge;
  };

  const getActivityAction = (actionKey: string, amount?: string) => {
    const action = t(`creatorHub.liveActivity.actions.${actionKey}`);
    if (actionKey === "releasedPayment" && amount) {
      return `${action} ${amount}`;
    }
    return action;
  };

  const fmtNumber = (n: number) => n.toLocaleString();
  const fmtCurrency = (n: number) => `$${n.toLocaleString()}`;
  const fmtPercent = (v: number) => `${(v * 100).toFixed(1)}%`;

  return (
    <section className="py-16 md:py-24 bg-landing-surface-alt">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm font-medium border-primary/30 text-primary bg-primary/10">
            <Star className="w-3.5 h-3.5 mr-1.5" />
            {t("creatorHub.badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-landing-heading mb-4">
            {t("creatorHub.title")}
          </h2>
          <p className="text-landing-body text-lg max-w-2xl mx-auto">
            {t("creatorHub.subtitle")}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          
          {/* Featured Creator - Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
          <Card className="md:col-span-2 lg:row-span-2 overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border-border bg-card/50 backdrop-blur-sm h-full">
            <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
              <LazyVideo
                ref={el => videoRefs.current[featuredCreator.id] = el}
                src={featuredCreator.coverVideo}
                poster={featuredCreator.coverPoster}
                className="transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => togglePlay(featuredCreator.id)}
                aria-label={isPlaying[featuredCreator.id] ? 'Pause video' : 'Play video'}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm border border-white/20 text-white hover:bg-background/40 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                {isPlaying[featuredCreator.id] ? (
                  <Pause className="w-7 h-7" />
                ) : (
                  <Play className="w-7 h-7 ml-1" />
                )}
              </Button>
              
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-success text-success-foreground gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  {t("creatorHub.featured.openToWork")}
                </Badge>
              </div>

              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="gap-1.5 bg-white/10 backdrop-blur-sm text-white border-white/20">
                  <Play className="w-3 h-3" />
                  {featuredCreator.platform}
                </Badge>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4 z-10">
                <div className="flex items-center gap-4">
                  <img
                    src={featuredCreator.avatar}
                    alt={featuredCreator.name}
                    className="w-16 h-16 rounded-full border-2 border-white object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{featuredCreator.name}</h3>
                      <CheckCircle className="w-5 h-5 text-primary fill-primary/20" />
                    </div>
                    <p className="text-white/70">{featuredCreator.handle}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {featuredCreator.badges.map((badge) => (
                    <Badge 
                      key={badge} 
                      variant="outline" 
                      className="border-white/30 text-white text-xs"
                    >
                      {badge === "Verified" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {badge === "Top Rated" && <Star className="w-3 h-3 mr-1 fill-amber-400 text-amber-400" />}
                      {getBadgeLabel(badge)}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="border-white/30 text-white text-xs">
                    {featuredCreator.niche}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{fmtNumber(featuredCreator.stats.followers)}</div>
                      <p className="text-xs text-white/60">{t("creatorHub.featured.followers")}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{fmtPercent(featuredCreator.stats.engagement)}</p>
                      <p className="text-xs text-white/60">{t("creatorHub.featured.engagement")}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">{fmtCurrency(featuredCreator.stats.totalEarnings)}</p>
                      <p className="text-xs text-white/60">{t("creatorHub.featured.earned")}</p>
                    </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{featuredCreator.stats.completedGigs}</p>
                    <p className="text-xs text-white/60">{t("creatorHub.featured.gigs")}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          </motion.div>

          {/* Spotlight Video Cards */}
          {spotlightCreators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
            >
            <Card 
              className="overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border bg-card/50 backdrop-blur-sm h-full"
            >
              <div className="relative h-full min-h-[220px]">
                <LazyVideo
                  ref={el => videoRefs.current[creator.id] = el}
                  src={creator.coverVideo}
                  poster={creator.coverPoster}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => togglePlay(creator.id)}
                  aria-label={isPlaying[creator.id] ? 'Pause video' : 'Play video'}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm border border-white/20 text-white hover:bg-background/40 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  {isPlaying[creator.id] ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </Button>
                
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="secondary" className="text-xs bg-white/10 backdrop-blur-sm text-white border-white/20">
                    {creator.platform}
                  </Badge>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white/50"
                    />
                    <div>
                      <h4 className="font-semibold text-white text-sm">{creator.name}</h4>
                      <p className="text-xs text-white/70">{creator.handle}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-white/30 text-white text-xs">
                    {creator.niche}
                  </Badge>
                </div>
              </div>
            </Card>
            </motion.div>
          ))}

          {/* Live Activity Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-2 lg:col-span-2"
          >
          <Card className="overflow-hidden border-border bg-gradient-to-br from-primary/10 to-accent/5 h-full backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-success rounded-full animate-ping" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-success rounded-full" />
                </div>
                <h4 className="font-semibold text-landing-heading">{t("creatorHub.liveActivity.title")}</h4>
              </div>
              
              <div className="space-y-3">
                {liveActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg bg-card/80 backdrop-blur-sm",
                      "animate-fade-in",
                      index === 0 && "ring-1 ring-primary/20"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium text-landing-heading">{activity.user}</span>
                          {" "}
                          <span className="text-landing-body">
                            {getActivityAction(activity.actionKey, activity.amount)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
              
              {/* Summary Stats */}
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold text-landing-heading">12.5K+</p>
                  <p className="text-xs text-muted-foreground">{t("creatorHub.stats.activeCreators")}</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-primary">$2.4M</p>
                  <p className="text-xs text-muted-foreground">{t("creatorHub.stats.paidOut")}</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-landing-heading">850+</p>
                  <p className="text-xs text-muted-foreground">{t("creatorHub.stats.brandPartners")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CreatorHub;
