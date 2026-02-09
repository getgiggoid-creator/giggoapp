import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, RefreshCw, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const GiggoHero = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  const stagger = (delay: number) => ({
    duration: 0.6,
    ease: "easeOut" as const,
    delay,
  });

  const trustPills = [
    { icon: ShieldCheck, label: "Kreator Terverifikasi KTP" },
    { icon: ShieldCheck, label: "Bayar Aman (Escrow)" },
    { icon: RefreshCw, label: "Revisi Unlimited" },
    { icon: Zap, label: "Siap Spark Ads" },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-orange-50 via-white to-teal-50 overflow-hidden">
      {/* Subtle decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#00C9B7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 py-20 lg:py-0">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN (60%) */}
          <div className="lg:col-span-3">
            {/* Social proof badge */}
            <motion.div {...fadeUp} transition={stagger(0.1)}>
              <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full px-4 py-2 mb-8">
                <span className="text-sm">🎉</span>
                <span className="text-sm font-medium text-[#1A1A1A]">
                  100+ Seller TikTok Shop Sudah Raup Jutaan Rupiah
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#1A1A1A] mb-6"
              {...fadeUp}
              transition={stagger(0.2)}
            >
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#00C9B7] bg-clip-text text-transparent">
                Video UGC Berkualitas Tinggi
              </span>{" "}
              untuk TikTok Shop Anda. Selesai dalam{" "}
              <span className="text-[#FF6B00] font-black">3 Hari.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg lg:text-xl text-[#666666] leading-relaxed mb-8 max-w-xl"
              {...fadeUp}
              transition={stagger(0.3)}
            >
              Kreator terverifikasi, bayar aman dengan escrow, unlimited revisi.
              Tanpa ribet cari influencer yang kabur dengan produk Anda.
            </motion.p>

            {/* Trust pills */}
            <motion.div
              className="flex flex-wrap gap-3 mb-10"
              {...fadeUp}
              transition={stagger(0.35)}
            >
              {trustPills.map((pill) => (
                <div
                  key={pill.label}
                  className="inline-flex items-center gap-2 bg-white border border-[#E0E0E0] rounded-full px-4 py-2 shadow-sm"
                >
                  <pill.icon className="w-4 h-4 text-[#00C9B7]" />
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    {pill.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              {...fadeUp}
              transition={stagger(0.4)}
            >
              <Button
                asChild
                className="h-14 px-8 text-base font-bold rounded-xl bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white shadow-xl shadow-[#FF6B00]/25 hover:shadow-2xl hover:shadow-[#FF6B00]/30 transition-all hover:scale-105"
              >
                <Link to="/auth?mode=register&role=brand" className="flex items-center gap-2">
                  Pesan Video Sekarang - Mulai Rp 250rb
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="h-14 px-8 text-base font-medium rounded-xl border-[#E0E0E0] text-[#1A1A1A] hover:bg-[#F5F5F5]"
              >
                <Link to="/campaigns" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Lihat Contoh Video
                </Link>
              </Button>
            </motion.div>

            {/* Micro social proof */}
            <motion.p
              className="text-sm text-[#666666]"
              {...fadeUp}
              transition={stagger(0.5)}
            >
              <span className="inline-flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#00C853]" /> Join 100+ seller aktif
              </span>
              <span className="mx-3 text-[#E0E0E0]">|</span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#00C853]" /> Rp 50 juta+ dibayarkan
              </span>
              <span className="mx-3 text-[#E0E0E0] hidden sm:inline">|</span>
              <span className="hidden sm:inline-flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#00C853]" /> 95% on-time delivery
              </span>
            </motion.p>
          </div>

          {/* RIGHT COLUMN (40%) - Video Showcase */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={stagger(0.5)}
          >
            <div className="relative">
              {/* Main video card */}
              <div className="relative aspect-[9/16] max-w-[280px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=700&fit=crop"
                  alt="UGC Beauty Product"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm">Beauty Product</p>
                  <p className="text-white/80 text-xs">ROAS 4.2x</p>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 bg-[#00C853]/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Smaller overlapping cards */}
              <div className="absolute -left-8 top-[20%] w-[120px] aspect-[9/16] rounded-2xl overflow-hidden shadow-xl border-2 border-white hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=350&fit=crop"
                  alt="Fashion UGC"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -right-8 top-[35%] w-[120px] aspect-[9/16] rounded-2xl overflow-hidden shadow-xl border-2 border-white hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=350&fit=crop"
                  alt="Food UGC"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-5 py-2 shadow-lg border border-[#E0E0E0]">
                <span className="text-sm font-bold text-[#1A1A1A]">
                  🔥 Trending di TikTok Shop
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiggoHero;
