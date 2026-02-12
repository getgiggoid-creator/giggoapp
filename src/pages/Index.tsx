import GiggoNav from "@/components/landing/GiggoNav";
import GiggoHero from "@/components/landing/GiggoHero";
import TrustStats from "@/components/landing/TrustStats";
import ProblemSolution from "@/components/landing/ProblemSolution";
import GiggoSolution from "@/components/landing/GiggoSolution";
import GiggoProof from "@/components/landing/GiggoProof";
import GiggoPricing from "@/components/landing/GiggoPricing";
import GiggoFAQ from "@/components/landing/GiggoFAQ";
import GiggoCTA from "@/components/landing/GiggoCTA";
import GiggoFooter from "@/components/landing/GiggoFooter";
import WhatsAppWidget from "@/components/landing/WhatsAppWidget";

const Index = () => {
  return (
    <main className="bg-landing-bg">
      <GiggoNav />
      <GiggoHero />
      <TrustStats />
      <ProblemSolution />
      <GiggoSolution />
      <GiggoProof />
      <GiggoPricing />
      <GiggoFAQ />
      <GiggoCTA />
      <GiggoFooter />
      <WhatsAppWidget />
    </main>
  );
};

export default Index;
