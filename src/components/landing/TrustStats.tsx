import { motion } from "framer-motion";
import { Users, Building2, Wallet, Clock, Headphones, TrendingUp } from "lucide-react";

const stats = [
  { value: "200+", label: "Kreator Aktif", sublabel: "Terverifikasi KTP", icon: Users, color: "#FF6B00" },
  { value: "100+", label: "Brand Puas", sublabel: "UMKM & Enterprise", icon: Building2, color: "#00C9B7" },
  { value: "Rp 50jt+", label: "Dibayarkan ke Kreator", sublabel: "Since launch", icon: Wallet, color: "#FFD600" },
  { value: "95%", label: "On-Time Delivery", sublabel: "Tepat deadline", icon: Clock, color: "#00C853" },
  { value: "<24jam", label: "Response Time", sublabel: "Support cepat", icon: Headphones, color: "#FF6B00" },
  { value: "3.5x", label: "Avg ROAS", sublabel: "Return on Ad Spend", icon: TrendingUp, color: "#00C9B7" },
];

const TrustStats = () => {
  return (
    <section className="py-16 bg-white border-t border-b border-[#E0E0E0]/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <p className="text-center text-[#666666] text-sm font-semibold uppercase tracking-widest mb-12">
          Platform Terpercaya untuk Video UGC di Indonesia
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="text-center group"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-[#1A1A1A]">{stat.label}</p>
              <p className="text-xs text-[#666666]">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
