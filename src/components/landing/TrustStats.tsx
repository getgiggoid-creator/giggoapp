const brandNames = ["Spotify", "Apple", "Blibli", "Tokopedia", "Bukalapak", "Halodoc"];

const TrustStats = () => {
  return (
    <section
      className="py-12 border-t border-b border-white/10"
      style={{ background: "rgba(26, 35, 50, 0.3)" }}
    >
      <div className="mx-auto px-6 max-w-[1280px]">
        {/* Label */}
        <p className="text-center text-sm text-[#94A3B8] mb-8">
          Dipercaya oleh Tim Marketing Berkapita Tinggi:
        </p>

        {/* Logo carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-12 hover:[animation-play-state:paused]"
            style={{ animation: "scroll-x 30s linear infinite" }}
          >
            {[...brandNames, ...brandNames].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex-shrink-0 h-8 px-6 rounded-lg bg-[#1A2332] flex items-center justify-center group cursor-pointer transition-all duration-300"
                style={{ minWidth: 120 }}
              >
                <span className="text-sm font-medium text-[#94A3B8] opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:text-[#00D9FF] group-hover:scale-110 transition-all duration-300">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
