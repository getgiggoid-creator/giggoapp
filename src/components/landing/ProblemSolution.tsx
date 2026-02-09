import { motion } from "framer-motion";
import { XCircle, CheckCircle } from "lucide-react";

const problems = [
  { title: "Kreator Ghosting Setelah Dapat Produk", desc: "Sudah kirim produk, kreator menghilang. Produk dan uang hilang." },
  { title: "Kualitas Video Tidak Sesuai Ekspektasi", desc: "Video asal-asalan, tidak bisa dipakai untuk iklan." },
  { title: "Proses Negosiasi Harga Melelahkan", desc: "Habis waktu tawar-menawar tanpa kepastian." },
  { title: "Revisi Dikenakan Biaya Tambahan", desc: "Setiap revisi kena charge, budget membengkak." },
  { title: "Video Tidak Bisa Dipakai untuk Ads", desc: "Masalah copyright, tidak bisa jadi Spark Ads." },
];

const solutions = [
  { title: "Sistem Escrow: Uang Ditahan Sampai Anda Puas", desc: "Kreator hanya dibayar setelah Anda approve video final. 100% aman." },
  { title: "Kreator Terverifikasi + Portfolio Review Ketat", desc: "Semua kreator melalui proses seleksi dan verifikasi KTP." },
  { title: "Harga Transparan, Fixed Pricing", desc: "Mulai Rp 250k/video. Tidak ada biaya tersembunyi." },
  { title: "Unlimited Revisi di Semua Paket", desc: "Revisi sampai Anda puas tanpa biaya tambahan." },
  { title: "Hak Komersial Penuh + Spark Ads Code", desc: "Langsung pakai untuk iklan TikTok & Shopee." },
];

const ProblemSolution = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F5F5F5]">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4"
          >
            Berhenti Buang Waktu dan Uang untuk Konten Asal-asalan
          </motion.h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Giggo hadir untuk menyelesaikan masalah produksi konten untuk seller TikTok Shop & Shopee
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Problems */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#E53935] mb-6 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Masalah yang Sering Terjadi
            </h3>
            {problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-4 bg-[#E53935]/5 border border-[#E53935]/10 rounded-2xl"
              >
                <XCircle className="w-6 h-6 text-[#E53935] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">{item.title}</p>
                  <p className="text-sm text-[#666666] mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#00C853] mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Solusi dari Giggo
            </h3>
            {solutions.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-4 bg-[#00C853]/5 border border-[#00C853]/10 rounded-2xl"
              >
                <CheckCircle className="w-6 h-6 text-[#00C853] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">{item.title}</p>
                  <p className="text-sm text-[#666666] mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
