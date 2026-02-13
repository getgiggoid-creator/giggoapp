import { MessageCircle } from "lucide-react";

const WhatsAppWidget = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-all"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <div className="absolute bottom-full right-0 mb-2 bg-white text-[hsl(0,0%,10%)] text-sm font-medium px-4 py-2 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Ada pertanyaan? Chat kami!
      </div>
    </div>
  );
};

export default WhatsAppWidget;
