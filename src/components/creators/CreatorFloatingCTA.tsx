import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface Props {
  name: string;
  username: string;
}

const CreatorFloatingCTA = ({ name, username }: Props) => {
  const whatsappMessage = `Halo Admin Giggo, saya tertarik merekrut ${name} (giggo.id/c/${username}).`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card/90 backdrop-blur-xl border-t border-border/50 safe-area-bottom">
      <div className="max-w-2xl mx-auto">
        <Button
          className="w-full h-12 text-base font-bold rounded-xl shadow-lg bg-[hsl(24,100%,50%)] hover:bg-[hsl(24,100%,45%)] active:bg-[hsl(24,100%,40%)] text-white border-none"
          onClick={() => window.open(whatsappUrl, "_blank")}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Rekrut {name.split(" ")[0]}
        </Button>
      </div>
    </div>
  );
};

export default CreatorFloatingCTA;
