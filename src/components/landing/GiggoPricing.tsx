import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ShieldCheck, RefreshCw, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Basic",
    subtitle: "Untuk testing & trial",
    price: "Rp 250k",
    unit: "/video",
    popular: false,
    discount: null,
    features: [
      "1 video UGC 15-30 detik",
      "Delivery 3 hari kerja",
      "Unlimited revisi",
      "Hak komersial penuh",
      "1 angle shooting",
    ],
    cta: "Pilih Basic",
    ctaStyle: "outline" as const,
  },
  {
    name: "Premium",
    subtitle: "Untuk brand serius",
    price: "Rp 350k",
    unit: "/video",
    popular: true,
    discount: null,
    features: [
      "Semua fitur Basic +",
      "Kreator premium (rating 4.5+)",
      "Delivery 2 hari (lebih cepat)",
      "2 angle shooting (variety)",
      "Priority support via WhatsApp",
    ],
    cta: "Pilih Premium",
    ctaStyle: "primary" as const,
  },
  {
    name: "Video Pack 3x",
    subtitle: "Best value untuk A/B test",
    price: "Rp 675k",
    unit: "",
    popular: false,
    discount: { label: "💰 HEMAT 10%", originalPrice: "Rp 750k" },
    features: [
      "3 video dari kreator berbeda",
      "Variety angles & styles",
      "Semua fitur Basic",
      "Perfect untuk A/B testing",
      "Hemat Rp 75k",
    ],
    cta: "Pilih Pack 3x",
    ctaStyle: "outline" as const,
  },
  {
    name: "Custom",
    subtitle: "Untuk kebutuhan besar",
    price: "Hubungi Kami",
    unit: "",
    popular: false,
    discount: null,
    isCustom: true,
    features: [
      "Dedicated account manager",
      "Custom pricing (volume discount)",
      "Priority creator matching",
      "Branded content strategy",
      "Monthly retainer available",
    ],
    cta: "Hubungi Sales",
    ctaStyle: "outline" as const,
  },
];

const GiggoPricing = () => {
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
            Harga Transparan. Tanpa Biaya Tersembunyi.
          </motion.h2>
          <p className="text-lg text-[#666666]">
            Unlimited revisi di semua paket. Pilih sesuai kebutuhan Anda.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white border rounded-3xl p-6 flex flex-col ${
                tier.popular
                  ? "border-[#FF6B00] shadow-xl shadow-[#FF6B00]/10 ring-1 ring-[#FF6B00]/20"
                  : "border-[#E0E0E0] hover:shadow-lg"
              } transition-all duration-300`}
            >
              {/* Badges */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FF6B00] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    🔥 PALING POPULER
                  </span>
                </div>
              )}
              {tier.discount && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FFD600] text-[#1A1A1A] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {tier.discount.label}
                  </span>
                </div>
              )}

              <div className="mb-6 pt-2">
                <h3 className="text-xl font-bold text-[#1A1A1A]">{tier.name}</h3>
                <p className="text-sm text-[#666666]">{tier.subtitle}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#1A1A1A]">{tier.price}</span>
                  {tier.unit && <span className="text-[#666666]">{tier.unit}</span>}
                </div>
                {tier.discount && (
                  <p className="text-sm text-[#666666] line-through mt-1">
                    {tier.discount.originalPrice}
                  </p>
                )}
                {tier.isCustom && (
                  <p className="text-sm text-[#666666] mt-1">10+ video/bulan</p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                    <Check className="w-4 h-4 text-[#00C853] flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full h-12 rounded-xl font-bold ${
                  tier.popular
                    ? "bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white shadow-lg shadow-[#FF6B00]/20"
                    : "bg-white border-2 border-[#E0E0E0] text-[#1A1A1A] hover:bg-[#F5F5F5] hover:border-[#FF6B00]/30"
                }`}
                variant={tier.popular ? "default" : "outline"}
              >
                <Link to={tier.isCustom ? "https://wa.me/6281234567890" : "/auth?mode=register&role=brand"}>
                  {tier.cta}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#666666]">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00C853]" /> Jaminan Uang Kembali
          </span>
          <span className="inline-flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#00C9B7]" /> Unlimited Revisi
          </span>
          <span className="inline-flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#FF6B00]" /> Pembayaran Aman
          </span>
        </div>
      </div>
    </section>
  );
};

export default GiggoPricing;
