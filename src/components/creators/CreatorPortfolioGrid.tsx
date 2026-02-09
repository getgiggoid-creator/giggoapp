import { useState } from "react";
import { Play, X, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/hooks/usePublicCreatorProfile";

interface Props {
  items: PortfolioItem[];
  creatorName: string;
  creatorUsername: string;
}

const CreatorPortfolioGrid = ({ items, creatorName, creatorUsername }: Props) => {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Halo Admin Giggo, saya tertarik merekrut ${creatorName} (giggo.id/c/${creatorUsername}).`
  )}`;

  return (
    <>
      <section className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">
            Portfolio
          </h2>
          <span className="text-xs text-muted-foreground">
            {items.length} video{items.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(item)}
              className={cn(
                "group relative rounded-xl overflow-hidden bg-muted",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                "transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <AspectRatio ratio={9 / 16}>
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title ?? `Portfolio ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Play className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={cn(
                    "w-11 h-11 rounded-full bg-white/90 dark:bg-white/80 flex items-center justify-center",
                    "shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200",
                    "group-hover:scale-100 scale-90"
                  )}>
                    <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
                  </div>
                </div>

                {/* Title overlay */}
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[11px] text-white font-medium truncate">{item.title}</p>
                  </div>
                )}
              </AspectRatio>
            </button>
          ))}
        </div>
      </section>

      {/* Video Player Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-black border-none rounded-2xl gap-0">
          <DialogTitle className="sr-only">Video Player</DialogTitle>

          {/* Close button */}
          <button
            onClick={() => setSelected(null)}
            className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {selected && (
            <div className="relative">
              <AspectRatio ratio={9 / 16}>
                {selected.type === "tiktok" ? (
                  <iframe
                    src={selected.url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="TikTok video"
                  />
                ) : (
                  <video
                    src={selected.url}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  />
                )}
              </AspectRatio>

              {/* In-modal CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <Button
                  className="w-full h-11 text-sm font-semibold rounded-xl bg-[hsl(24,100%,50%)] hover:bg-[hsl(24,100%,45%)] text-white border-none"
                  onClick={() => window.open(whatsappUrl, "_blank")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Rekrut Kreator Ini
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatorPortfolioGrid;
