import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

const HowItWorks = () => {
  const { t } = useTranslation();
  const { activeRole } = useRole();

  const steps = {
    brands: [
      { step: "01", titleKey: "howItWorks.brand.step1.title", descriptionKey: "howItWorks.brand.step1.description" },
      { step: "02", titleKey: "howItWorks.brand.step2.title", descriptionKey: "howItWorks.brand.step2.description" },
      { step: "03", titleKey: "howItWorks.brand.step3.title", descriptionKey: "howItWorks.brand.step3.description" },
      { step: "04", titleKey: "howItWorks.brand.step4.title", descriptionKey: "howItWorks.brand.step4.description" },
    ],
    creators: [
      { step: "01", titleKey: "howItWorks.creator.step1.title", descriptionKey: "howItWorks.creator.step1.description" },
      { step: "02", titleKey: "howItWorks.creator.step2.title", descriptionKey: "howItWorks.creator.step2.description" },
      { step: "03", titleKey: "howItWorks.creator.step3.title", descriptionKey: "howItWorks.creator.step3.description" },
      { step: "04", titleKey: "howItWorks.creator.step4.title", descriptionKey: "howItWorks.creator.step4.description" },
    ],
  };

  const currentSteps = steps[activeRole];
  const isBrand = activeRole === "brands";

  return (
    <section className="py-24 bg-landing-surface-alt">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-landing-heading mb-4">
            {t('howItWorks.title')} <span className="text-gradient">{t('howItWorks.titleHighlight')}</span>
          </h2>
          <p className="text-landing-body text-lg">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Single Column - Role Aware */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border">
            <div className={`inline-flex items-center gap-2 ${isBrand ? 'bg-primary/15 text-primary' : 'bg-accent/15 text-accent'} rounded-full px-4 py-2 mb-6`}>
              <span className="text-sm font-bold">
                {isBrand ? t('howItWorks.forBrands') : t('howItWorks.forCreators')}
              </span>
            </div>
            <div className="space-y-6">
              {currentSteps.map((item, index) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 ${isBrand ? 'gradient-primary' : 'gradient-dark'} rounded-xl flex items-center justify-center ${isBrand ? 'text-primary-foreground' : 'text-secondary-foreground'} font-display font-bold`}>
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-display font-semibold text-landing-heading mb-1">
                      {t(item.titleKey)}
                    </h4>
                    <p className="text-landing-body text-sm">
                      {t(item.descriptionKey)}
                    </p>
                  </div>
                  {index < currentSteps.length - 1 && (
                    <div className="flex-shrink-0 self-center hidden sm:block">
                      <ArrowRight className="w-5 h-5 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
