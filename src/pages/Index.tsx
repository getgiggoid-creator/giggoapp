import GiggoNav from "@/components/landing/GiggoNav";
import GiggoHero from "@/components/landing/GiggoHero";
import TrustStats from "@/components/landing/TrustStats";
import ProblemSolution from "@/components/landing/ProblemSolution";
import GiggoHowItWorks from "@/components/landing/GiggoHowItWorks";
import GiggoPricing from "@/components/landing/GiggoPricing";
import GiggoPortfolio from "@/components/landing/GiggoPortfolio";
import GiggoTestimonials from "@/components/landing/GiggoTestimonials";
import GiggoFAQ from "@/components/landing/GiggoFAQ";
import GiggoCTA from "@/components/landing/GiggoCTA";
import GiggoFooter from "@/components/landing/GiggoFooter";
import WhatsAppWidget from "@/components/landing/WhatsAppWidget";

const Index = () => {
  return (
    <main className="bg-white">
      <GiggoNav />
      <GiggoHero />
      <TrustStats />
      <ProblemSolution />
      <div id="how-it-works">
        <GiggoHowItWorks />
      </div>
      <div id="pricing">
        <GiggoPricing />
      </div>
      <div id="portfolio">
        <GiggoPortfolio />
      </div>
      <GiggoTestimonials />
      <div id="faq">
        <GiggoFAQ />
      </div>
      <GiggoCTA />
      <GiggoFooter />
      <WhatsAppWidget />
    </main>
  );
};

export default Index;
