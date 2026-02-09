import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: 1,
    emoji: "📝",
    title: "Buat Brief Dalam 5 Menit",
    desc: "Isi Smart Brief Builder kami. Bahkan jika Anda tidak punya pengalaman bikin brief, form kami akan guide Anda step-by-step.",
    badge: "Template tersedia",
    gradient: "from-[#FF6B00] to-[#FFA726]",
  },
  {
    num: 2,
    emoji: "💳",
    title: "Bayar & Kirim Produk",
    desc: "Pembayaran aman via escrow. Produk dikirim langsung ke kreator dengan tracking real-time.",
    badge: "100% Aman",
    gradient: "from-[#00C9B7] to-[#00E5CC]",
  },
  {
    num: 3,
    emoji: "🎬",
    title: "Review & Approve Video",
    desc: "Kreator mengirim video draft. Review dan minta revisi unlimited sampai Anda puas.",
    badge: "Unlimited revisi",
    gradient: "from-[#7C3AED] to-[#A78BFA]",
  },
  {
    num: 4,
    emoji: "🚀",
    title: "Download & Jalankan Ads",
    desc: "Download video final dalam kualitas HD. Langsung gunakan untuk TikTok Spark Ads atau Shopee Video.",
    badge: "Spark Ads ready",
    gradient: "from-[#00C853] to-[#69F0AE]",
  },
];

const GiggoHowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4"
          >
            Dari Brief Sampai Video Final Cuma 4 Langkah Mudah
          </motion.h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Platform yang dirancang untuk seller sibuk. Tidak perlu jadi ahli marketing.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              <div className="bg-white border border-[#E0E0E0] rounded-3xl p-6 h-full hover:shadow-xl hover:border-[#FF6B00]/20 transition-all duration-300">
                {/* Number badge */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-lg mb-5 group-hover:scale-110 transition-transform`}>
                  {step.num}
                </div>

                <div className="text-2xl mb-3">{step.emoji}</div>

                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed mb-4">
                  {step.desc}
                </p>

                <span className="inline-flex items-center gap-1 bg-[#F5F5F5] text-[#1A1A1A] text-xs font-medium px-3 py-1.5 rounded-full">
                  ✓ {step.badge}
                </span>
              </div>

              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-[#E0E0E0]" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Pro tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-start gap-3 bg-[#FF6B00]/5 border border-[#FF6B00]/10 rounded-2xl p-5 mb-6 text-left max-w-xl">
            <Lightbulb className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#666666]">
              <span className="font-semibold text-[#1A1A1A]">Tips Pro:</span> Rata-rata brand butuh
              waktu 15 menit untuk proses step 1-2. Video final biasanya sudah siap dalam 3-5 hari
              kerja.
            </p>
          </div>
          <div>
            <Button
              asChild
              className="h-12 px-8 rounded-xl bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-bold shadow-lg shadow-[#FF6B00]/20"
            >
              <Link to="/auth?mode=register&role=brand" className="flex items-center gap-2">
                Mulai Buat Brief Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GiggoHowItWorks;
