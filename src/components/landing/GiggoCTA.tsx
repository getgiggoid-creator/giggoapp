import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const GiggoCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#FF6B00] via-[#FF8533] to-[#00C9B7] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-8">
            🚀 Join 100+ Seller Sukses
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Siap Tingkatkan Konversi TikTok Shop Anda?
          </h2>

          <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto">
            Mulai order video UGC pertama Anda hari ini. Hanya butuh 5 menit untuk buat brief.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              asChild
              className="h-14 px-8 rounded-xl bg-white text-[#FF6B00] hover:bg-white/90 font-bold text-base shadow-xl hover:scale-105 transition-transform"
            >
              <Link to="/auth?mode=register&role=brand" className="flex items-center gap-2">
                Pesan Video Sekarang <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-14 px-8 rounded-xl border-white/30 text-white hover:bg-white/10 hover:text-white font-medium text-base"
            >
              <Link to="/campaigns" className="flex items-center gap-2">
                <Play className="w-4 h-4" /> Tonton Demo 2 Menit
              </Link>
            </Button>
          </div>

          {/* Trust */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
            <span className="inline-flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Gratis membuat akun
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> No credit card required
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Setup &lt; 5 menit
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GiggoCTA;
