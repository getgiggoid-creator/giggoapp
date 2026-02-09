import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const testimonials = [
  {
    quote:
      "Video dari Giggo hasilkan 500+ penjualan pertama kali pakai TikTok Spark Ads. ROAS 4.2x dalam seminggu. Sekarang order rutin 3 video per minggu!",
    metrics: [
      { value: "500+", label: "Penjualan" },
      { value: "4.2x", label: "ROAS" },
      { value: "7 hari", label: "Waktu" },
    ],
    author: "Budi Santoso",
    role: "Owner, BeautyGlow Skincare",
    location: "Jakarta • TikTok Shop",
    initials: "BS",
  },
  {
    quote:
      "Sebelumnya habis Rp 5 juta bayar influencer, hasilnya mengecewakan. Di Giggo cuma Rp 675k dapat 3 video berkualitas tinggi. ROI jauh lebih bagus!",
    metrics: [
      { value: "90%", label: "Hemat biaya" },
      { value: "3x", label: "Video" },
      { value: "3 hari", label: "Delivery" },
    ],
    author: "Sinta Dewi",
    role: "Founder, NaturalGlow Co.",
    location: "Bandung • Shopee",
    initials: "SD",
  },
  {
    quote:
      "Kreator di Giggo beneran paham style TikTok Shop. Video mereka natural, authentic, dan convert. Sekarang saya gak perlu pusing mikirin konten lagi.",
    metrics: [
      { value: "15+", label: "Video/bulan" },
      { value: "2.8x", label: "ROAS avg" },
      { value: "100%", label: "Satisfaction" },
    ],
    author: "Andi Prasetyo",
    role: "CMO, FashionHub ID",
    location: "Surabaya • TikTok Shop",
    initials: "AP",
  },
];

const GiggoTestimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#F5F5F5] to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4"
          >
            Apa Kata Seller yang Sudah Sukses dengan Giggo?
          </motion.h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Bukan cuma testimoni biasa. Ini hasil nyata dari brand yang revenue-nya naik signifikan.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white border border-[#E0E0E0] rounded-3xl p-6 hover:shadow-xl hover:border-[#FF6B00]/20 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#FFD600] text-[#FFD600]" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-[#FF6B00]/20 absolute -top-2 -left-1" />
                <p className="text-[#1A1A1A] text-sm leading-relaxed pl-4">
                  "{t.quote}"
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-t border-b border-[#E0E0E0]/50">
                {t.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="text-xl font-bold text-[#FF6B00]">{m.value}</p>
                    <p className="text-xs text-[#666666]">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FFA726] flex items-center justify-center text-white font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#1A1A1A]">{t.author}</p>
                  <p className="text-xs text-[#666666]">{t.role}</p>
                  <p className="text-xs text-[#666666]">📍 {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            asChild
            className="rounded-xl border-[#E0E0E0] text-[#1A1A1A] hover:bg-[#F5F5F5]"
          >
            <Link to="/campaigns" className="flex items-center gap-2">
              Lihat Semua Success Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GiggoTestimonials;
