import GiggoNav from "@/components/landing/GiggoNav";
import GiggoHero from "@/components/landing/GiggoHero";
import TrustStats from "@/components/landing/TrustStats";
import GiggoSolution from "@/components/landing/GiggoSolution";
import GiggoProof from "@/components/landing/GiggoProof";
import ProblemSolution from "@/components/landing/ProblemSolution";
import GiggoPricing from "@/components/landing/GiggoPricing";
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
      <GiggoSolution />
      <GiggoProof />
      <ProblemSolution />
      <GiggoPricing />
      <GiggoFAQ />
      <GiggoCTA />
      <GiggoFooter />
      <WhatsAppWidget />
    </main>
  );
};

export default Index;
