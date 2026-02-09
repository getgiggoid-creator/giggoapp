import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Terms = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.backToHome")}
          </Link>
        </Button>

        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-foreground mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-lg dark:prose-invert">
            <p className="text-muted-foreground text-lg mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                By accessing or using Giggo, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                2. User Accounts
              </h2>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account credentials 
                and for all activities that occur under your account. You must be at least 18 years 
                old to create an account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                3. Content Guidelines
              </h2>
              <p className="text-muted-foreground">
                Users must not submit content that is illegal, harmful, threatening, abusive, 
                or violates any third-party rights. We reserve the right to remove any content 
                that violates these guidelines.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                4. Campaign Participation
              </h2>
              <p className="text-muted-foreground">
                Creators who participate in campaigns agree to follow brand guidelines and 
                deliver content as specified. Brands agree to provide clear briefs and 
                timely payment for approved content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                5. Contact
              </h2>
              <p className="text-muted-foreground">
                For questions about these Terms, contact us at legal@giggo.app
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
