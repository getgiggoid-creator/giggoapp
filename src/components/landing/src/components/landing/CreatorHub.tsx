import { useState } from "react";
import { motion } from "framer-motion";
import { Play, TrendingUp, CheckCircle2 } from "lucide-react";

// --- Types ---
interface Creator {
  id: number;
  name: string;
  handle: string;
  category: string;
  views: string;
  videoUrl: string;
  avatar: string;
}

// --- Mock Data (Sesuai PDF & Request Video) ---
const creators: Creator[] = [
  {
    id: 1,
    name: "Sarah M.",
    handle: "@sarah.creates",
    category: "Fashion",
    views: "2.3M",
    // Video: Fashion Model Photoshoot
    videoUrl: "https://cdn.coverr.co/videos/coverr-fashion-photoshoot-model-5348/1080p.mp4", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Jake L.",
    handle: "@jakefitness",
    category: "Fitness",
    views: "1.8M",
    // Video: CrossFit Exercises
    videoUrl: "https://cdn.coverr.co/videos/coverr-man-doing-crossfit-exercises-5120/1080p.mp4",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Emma K.",
    handle: "@emmastyle",
    category: "Beauty",
    views: "3.1M",
    // Video: Applying Makeup
    videoUrl: "https://cdn.coverr.co/videos/coverr-applying-makeup-in-mirror-5432/1080p.mp4",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80"
  }
];

const categories = ["All", "Fashion", "Beauty", "Tech", "Food", "Fitness", "Travel", "Lifestyle"];

const CreatorHub = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">
      
      {/* Background Decor (Subtle Glows) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
          >
            Creator <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Spotlight</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            See what top creators are making on Giggo.
          </motion.p>
        </div>

        {/* --- Filter Tabs --- */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex space-x-2 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${activeTab === cat 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- Video Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {creators.map((creator, index) => (
            <CreatorCard key={creator.id} creator={creator} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

// --- Sub Component: Creator Card ---
const CreatorCard = ({ creator, index }: { creator: Creator, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900 cursor-pointer shadow-2xl"
    >
      {/* 1. Video Layer */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      >
        <source src={creator.videoUrl} type="video/mp4" />
      </video>

      {/* 2. Gradient Overlay (For Text Readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* 3. Top Badges */}
      <div className="absolute top-4 right-4 z-20">
         <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
            <TrendingUp className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-bold text-white">{creator.views}</span>
         </div>
      </div>

      {/* 4. Play Button Overlay (Appears on Hover) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
         <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
         </div>
      </div>

      {/* 5. Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
             <img 
               src={creator.avatar} 
               alt={creator.name} 
               className="w-10 h-10 rounded-full border-2 border-white/80"
             />
             <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
               <CheckCircle2 className="w-3 h-3 text-white" />
             </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">{creator.name}</h3>
            <p className="text-slate-300 text-xs font-medium">{creator.handle}</p>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
           <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-200 text-xs font-semibold backdrop-blur-sm">
             {creator.category}
           </span>
           <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white text-xs font-semibold backdrop-blur-sm">
             Verified Pro
           </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatorHub;
