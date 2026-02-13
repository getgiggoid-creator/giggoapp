import OctopilotNav from "@/components/octopilot/OctopilotNav";
import OctopilotHero from "@/components/octopilot/OctopilotHero";

const Octopilot = () => {
  return (
    <main className="bg-black min-h-screen">
      <OctopilotNav />
      <OctopilotHero />
    </main>
  );
};

export default Octopilot;
