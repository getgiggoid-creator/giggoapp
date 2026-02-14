import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GiggoCTA = () => {
  return (
    <section className="relative py-20 md:py-32 bg-[#0A1628] overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #0A1628 0%, #162B4D 100%)" }}
      />

      {/* Glow effects */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,217,255,0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,217,255,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto px-6 max-w-[800px] text-center">
        <motion.h2
          className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-white leading-[1.2] mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Jangan Biarkan Kompetitor Anda{"\n"}Memonopoli Feed.
        </motion.h2>

        <motion.p
          className="text-lg text-[#94A3B8] mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Dengan Gigtech setiap transaksi transparan, memimpin secara mudah pula.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/auth?mode=register&role=brand"
            className="inline-block px-12 py-5 text-lg lg:text-xl font-bold text-[#0A1628] bg-[#00D9FF] rounded-lg hover:scale-105 transition-transform duration-300"
            style={{
              boxShadow: "0 0 40px rgba(0,217,255,0.4)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          >
            BUAT CAMPAIGN PERTAMA (GRATIS POSTING) →
          </Link>
        </motion.div>

        <motion.p
          className="text-xs text-[#94A3B8] mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          *No credit card required. Campaign review gratis dari tim kami.
        </motion.p>
      </div>
    </section>
  );
};

export default GiggoCTA;
