import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Bagaimana cara sistem escrow bekerja? Apakah uang saya aman?",
    a: "100% aman! Saat Anda membayar, uang ditahan oleh sistem Giggo (bukan langsung ke kreator). Kreator baru menerima pembayaran setelah Anda approve video final. Jika kreator tidak deliver atau hasil sangat buruk, Anda bisa request refund dan kami akan kembalikan uang Anda.",
  },
  {
    q: "Berapa lama proses dari order sampai video selesai?",
    a: "Rata-rata 3-5 hari kerja. Anda buat brief & bayar (5-15 menit), kirim produk ke kreator (2-3 hari tergantung kurir), kreator bikin video (2-3 hari setelah produk diterima), Anda review & approve (1 hari). Total 5-7 hari untuk video pertama.",
  },
  {
    q: "Apakah benar unlimited revisi? Tidak ada biaya tambahan?",
    a: "Ya, benar! Di semua paket Giggo, Anda bisa minta revisi sebanyak yang Anda mau tanpa biaya tambahan. Kami ingin Anda 100% puas dengan hasilnya.",
  },
  {
    q: "Bagaimana kualitas kreator di Giggo?",
    a: "Semua kreator melewati proses seleksi ketat: verifikasi KTP, review portfolio, dan test video. Hanya kreator dengan kualitas terbaik yang lolos. Anda juga bisa lihat rating dan review dari brand lain sebelum memilih.",
  },
  {
    q: "Apakah saya mendapat hak cipta penuh atas video?",
    a: "Ya! Semua video yang Anda order menjadi milik Anda sepenuhnya. Anda bebas menggunakannya untuk TikTok Spark Ads, Shopee Video, Instagram Reels, atau platform manapun tanpa batasan waktu.",
  },
  {
    q: "Bagaimana jika kreator tidak mengirim video tepat waktu?",
    a: "Sistem kami memiliki deadline otomatis. Jika kreator tidak mengirim tepat waktu, Anda bisa request kreator pengganti atau refund penuh. Uang Anda 100% aman di escrow.",
  },
  {
    q: "Produk apa saja yang bisa dibuatkan video UGC?",
    a: "Hampir semua produk! Skincare, makeup, fashion, makanan, gadget, suplemen, perlengkapan rumah, dan lainnya. Kami memiliki kreator dari berbagai niche. Hubungi tim kami jika Anda tidak yakin.",
  },
  {
    q: "Bagaimana cara mengirim produk ke kreator?",
    a: "Setelah Anda membayar, sistem akan memberikan alamat pengiriman kreator. Anda bisa kirim via kurir pilihan Anda (JNE, J&T, SiCepat, dll). Input resi pengiriman di dashboard dan kami akan track sampai produk diterima.",
  },
];

const GiggoFAQ = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4"
          >
            Pertanyaan yang Sering Ditanyakan
          </motion.h2>
          <p className="text-lg text-[#666666]">
            Semua yang perlu Anda tahu tentang Giggo
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-[#F5F5F5] rounded-2xl px-6 border-none data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-semibold text-[#1A1A1A] hover:text-[#FF6B00] py-5 hover:no-underline text-sm md:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#666666] pb-5 leading-relaxed text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg font-semibold text-[#1A1A1A] mb-2">Masih Ada Pertanyaan?</p>
          <p className="text-[#666666] mb-6">
            Tim support kami siap membantu Anda via WhatsApp
          </p>
          <Button
            asChild
            className="h-12 px-8 rounded-xl bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold"
          >
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat via WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GiggoFAQ;
