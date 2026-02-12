const logos = [
  "Spotify", "Apple", "Blibli", "Tokopedia", "Bukalapak", "Halodoc",
  "Spotify", "Apple", "Blibli", "Tokopedia", "Bukalapak", "Halodoc",
];

const TrustStats = () => {
  return (
    <section className="py-12 bg-landing-bg border-t border-b border-white/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <p className="text-center text-sm text-landing-body-muted mb-8">
          Dipercaya oleh Tim Marketing Berkapita Tinggi:
        </p>

        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-marquee">
            {logos.map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="flex-shrink-0 h-8 flex items-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-110 transition-all duration-300"
              >
                <span className="text-lg font-bold text-white tracking-wider whitespace-nowrap">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
