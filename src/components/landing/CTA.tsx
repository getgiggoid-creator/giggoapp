import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

const CTA = () => {
  const { t } = useTranslation();
  const { activeRole } = useRole();
  
  const isBrand = activeRole === "brands";

  return (
    <section className="py-24 bg-landing-bg">
      <div className="container mx-auto px-4">
        <div className="relative gradient-primary rounded-3xl p-8 md:p-16 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                {isBrand ? t('cta.badge') : t('cta.creatorBadge', { defaultValue: t('cta.badge') })}
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              {isBrand ? t('cta.brandTitle', { defaultValue: t('cta.title') }) : t('cta.title')}
            </h2>

            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              {isBrand ? t('cta.brandSubtitle', { defaultValue: t('cta.subtitle') }) : t('cta.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="xl" 
                className="bg-white text-primary hover:bg-white/90 shadow-lg"
                asChild
              >
                <Link to={`/auth?mode=register&role=${isBrand ? "brand" : "creator"}`}>
                  {isBrand ? t('cta.brandPrimary', { defaultValue: t('cta.primary') }) : t('cta.primary')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link to="/campaigns">
                  {t('cta.secondary')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
