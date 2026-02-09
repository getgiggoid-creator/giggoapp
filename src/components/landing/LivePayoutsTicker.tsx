import { useEffect, useState } from "react";
import { fetchLivePayouts, LivePayout } from "@/lib/supabaseFunctions";

const SAMPLE_DATA: string[] = [
  "User123 withdrew Rp 500.000 just now",
  "Luna withdrew Rp 2.000.000 just now",
  "AyuPutri withdrew Rp 750.000 just now",
  "Maya withdrew Rp 1.500.000 just now",
  "Rizky withdrew Rp 1.250.000 just now",
  "Sinta withdrew Rp 800.000 just now",
];

const LivePayoutsTicker = () => {
  const [items, setItems] = useState<string[]>(SAMPLE_DATA);

  useEffect(() => {
    let isActive = true;

    const poll = async () => {
      try {
        const data: LivePayout[] = await fetchLivePayouts();

        if (!isActive) return;

        if (Array.isArray(data) && data.length > 0) {
          setItems(data.map((d) => d.message));
        }
      } catch (error) {
        console.error("Failed to fetch live payouts:", error);
        // Keep using fallback data on error
      }
    };

    poll();
    const interval = setInterval(poll, 8000);

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-white/5 via-white/10 to-white/5 border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 py-3">
          {/* Label */}
          <div className="flex-shrink-0">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Live Payouts
            </span>
          </div>

          {/* Marquee Container */}
          <div className="relative flex-1 overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent" />

            {/* Marquee Track */}
            <div className="animate-marquee flex whitespace-nowrap">
              {/* First set of items */}
              <div className="flex gap-8">
                {items.map((item, index) => (
                  <span
                    key={`first-${index}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    {item}
                  </span>
                ))}
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex gap-8 pl-8">
                {items.map((item, index) => (
                  <span
                    key={`second-${index}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePayoutsTicker;
