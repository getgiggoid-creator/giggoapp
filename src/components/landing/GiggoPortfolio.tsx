import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Eye, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const categories = [
  { key: "all", label: "Semua" },
  { key: "beauty", label: "💄 Beauty & Skincare" },
  { key: "fashion", label: "👗 Fashion" },
  { key: "food", label: "🍔 Food & Beverage" },
  { key: "health", label: "💊 Health & Wellness" },
  { key: "tech", label: "📱 Tech & Gadget" },
];

const videos = [
  { id: 1, category: "beauty", thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=500&fit=crop", description: "Skincare routine TikTok", roas: "4.2", views: "125", likes: "8.2", creator: "Putri S." },
  { id: 2, category: "fashion", thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=500&fit=crop", description: "OOTD TikTok Shop", roas: "3.8", views: "98", likes: "5.6", creator: "Dina M." },
  { id: 3, category: "food", thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=500&fit=crop", description: "Food review viral", roas: "5.1", views: "234", likes: "15.3", creator: "Rizky A." },
  { id: 4, category: "tech", thumbnail: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300&h=500&fit=crop", description: "Gadget unboxing", roas: "3.5", views: "87", likes: "4.1", creator: "Budi T." },
  { id: 5, category: "beauty", thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=500&fit=crop", description: "Makeup tutorial", roas: "4.8", views: "156", likes: "11.2", creator: "Maya R." },
  { id: 6, category: "health", thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=500&fit=crop", description: "Supplement review", roas: "3.2", views: "67", likes: "3.8", creator: "Andi F." },
];

const GiggoPortfolio = () => {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? videos : videos.filter((v) => v.category === filter);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4"
          >
            Video Berkualitas dari Kreator Terverifikasi Giggo
          </motion.h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Lihat hasil kerja nyata dari kreator kami. Semua video sudah digunakan untuk iklan dengan
            ROAS terbukti.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === cat.key
                  ? "bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/20"
                  : "bg-[#F5F5F5] text-[#666666] hover:bg-[#E0E0E0] hover:text-[#1A1A1A]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer bg-[#F5F5F5]"
            >
              <img
                src={video.thumbnail}
                alt={video.description}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-block bg-[#FF6B00] text-white text-xs font-bold px-2 py-1 rounded-full mb-2">
                  ROAS {video.roas}x
                </span>
                <p className="text-white text-sm font-medium">{video.description}</p>
                <p className="text-white/70 text-xs mt-1">oleh {video.creator}</p>
              </div>

              {/* Quick stats */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 group-hover:hidden">
                <span className="inline-flex items-center gap-1 text-xs text-white/80">
                  <Eye className="w-3 h-3" /> {video.views}k
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-white/80">
                  <Heart className="w-3 h-3" /> {video.likes}k
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See all */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            asChild
            className="rounded-xl border-[#E0E0E0] text-[#1A1A1A] hover:bg-[#F5F5F5]"
          >
            <Link to="/campaigns" className="flex items-center gap-2">
              Lihat Semua Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GiggoPortfolio;
