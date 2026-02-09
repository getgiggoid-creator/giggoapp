import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Privacy = () => {
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
            Privacy Policy
          </h1>

          <div className="prose prose-lg dark:prose-invert">
            <p className="text-muted-foreground text-lg mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us, such as when you create an account, 
                submit content, or contact us for support. This may include your name, email address, 
                and social media profile information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our services, 
                process transactions, and communicate with you about campaigns and opportunities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                3. Information Sharing
              </h2>
              <p className="text-muted-foreground">
                We do not sell your personal information. We may share information with brands 
                when you apply to their campaigns, with your consent, or as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                4. Contact Us
              </h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at 
                privacy@giggo.app
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
