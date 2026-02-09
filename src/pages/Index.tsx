import HeroCyberpunk from "@/components/landing/HeroCyberpunk";
import LivePayoutsTicker from "@/components/landing/LivePayoutsTicker";
import TrustBanner from "@/components/landing/TrustBanner";
import Features from "@/components/landing/Features";
import CreatorHub from "@/components/landing/CreatorHub";
import VideoShowcase from "@/components/landing/VideoShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";

const Index = () => {
  return (
    <main className="flex-grow">
      <HeroCyberpunk />
      <LivePayoutsTicker />
      <TrustBanner />
      <Features />
      <CreatorHub />
      <VideoShowcase />
      <HowItWorks />
      <FAQ />
      <CTA />
    </main>
  );
};

export default Index;
