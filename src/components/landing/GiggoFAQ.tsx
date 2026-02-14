import { motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Bagaimana cara sistem escrow bekerja? Apakah uang saya aman?",
    a: "100% aman! Saat Anda membayar, uang ditahan oleh sistem Giggo (bukan langsung ke kreator). Kreator baru menerima pembayaran setelah Anda approve video final. Jika kreator tidak deliver atau hasil sangat buruk, Anda bisa request refund dan kami akan kembalikan uang Anda.",
  },
  {
    q: "Berapa lama proses dari order sampai video selesai?",
    a: "Rata-rata 3-5 hari kerja. Anda buat brief & bayar (5-15 menit), kirim produk ke kreator (2-3 hari tergantung kurir), kreator bikin video (2-3 hari setelah produk diterima), Anda review & approve (1 hari).",
  },
  {
    q: "Apakah benar unlimited revisi?",
    a: "Ya, benar! Di semua paket Giggo, Anda bisa minta revisi sebanyak yang Anda mau tanpa biaya tambahan. Kami ingin Anda 100% puas dengan hasilnya.",
  },
  {
    q: "Bagaimana kualitas kreator di Giggo?",
    a: "Semua kreator melewati proses seleksi ketat: verifikasi KTP, review portfolio, dan test video. Hanya kreator dengan kualitas terbaik yang lolos.",
  },
  {
    q: "Apakah saya mendapat hak cipta penuh atas video?",
    a: "Ya! Semua video yang Anda order menjadi milik Anda sepenuhnya. Anda bebas menggunakannya untuk TikTok Spark Ads, Shopee Video, Instagram Reels, atau platform manapun.",
  },
  {
    q: "Bagaimana jika kreator tidak mengirim video tepat waktu?",
    a: "Sistem kami memiliki deadline otomatis. Jika kreator tidak mengirim tepat waktu, Anda bisa request kreator pengganti atau refund penuh.",
  },
];

const GiggoFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-32 bg-[#0A1628]" id="faq">
      <div className="mx-auto px-6 max-w-[800px]">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold text-white mb-4">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-base text-[#94A3B8]">
            Semua yang perlu Anda tahu tentang Giggo
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 overflow-hidden"
              style={{ background: "rgba(26, 35, 50, 0.7)", backdropFilter: "blur(10px)" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <h3 className="text-sm md:text-base font-semibold text-white pr-4">{faq.q}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-[#00D9FF] transition-transform duration-300 flex-shrink-0 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="px-6 pb-5 text-sm text-[#94A3B8] leading-relaxed">{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg font-semibold text-white mb-2">Masih Ada Pertanyaan?</p>
          <p className="text-[#94A3B8] mb-6">Tim support kami siap membantu Anda via WhatsApp</p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#25D366] text-white font-bold hover:-translate-y-0.5 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Chat via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GiggoFAQ;
