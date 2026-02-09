import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useLazyVideo } from "@/hooks/useLazyVideo";
import { cn } from "@/lib/utils";

interface LazyVideoProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  className?: string;
  onVideoRef?: (video: HTMLVideoElement | null) => void;
}

export interface LazyVideoHandle {
  play: () => Promise<void> | undefined;
  pause: () => void;
  getVideo: () => HTMLVideoElement | null;
}

const LazyVideo = forwardRef<LazyVideoHandle, LazyVideoProps>(
  (
    {
      src,
      poster,
      autoPlay = true,
      muted = true,
      loop = true,
      playsInline = true,
      className,
      onVideoRef,
    },
    ref
  ) => {
    const { containerRef, shouldLoad } = useLazyVideo({ rootMargin: "300px 0px" });
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useImperativeHandle(ref, () => ({
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      getVideo: () => videoRef.current,
    }));

    useEffect(() => {
      if (onVideoRef) {
        onVideoRef(videoRef.current);
      }
    }, [shouldLoad, onVideoRef]);

    useEffect(() => {
      if (shouldLoad && autoPlay && videoRef.current) {
        videoRef.current.play().catch(() => {
          // Autoplay was prevented, ignore
        });
      }
    }, [shouldLoad, autoPlay]);

    const handleVideoLoaded = () => {
      setIsVideoLoaded(true);
    };

    return (
      <div ref={containerRef} className={cn("relative", className)}>
        {/* Skeleton placeholder with fade-out transition */}
        <div 
          className={cn(
            "absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-700 ease-out z-10",
            isVideoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          {/* Poster image as background if available */}
          {poster && (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${poster})` }}
            />
          )}
          {/* Skeleton shimmer overlay */}
          <div className="absolute inset-0 bg-muted/60 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent animate-[shimmer_2s_infinite] -translate-x-full" />
          </div>
          {/* Loading indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={cn(
                "w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary transition-opacity duration-300",
                isVideoLoaded ? "opacity-0" : "animate-spin"
              )} 
            />
          </div>
        </div>
        
        {shouldLoad && (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            onLoadedData={handleVideoLoaded}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out",
              isVideoLoaded ? "opacity-100" : "opacity-0"
            )}
          />
        )}
      </div>
    );
  }
);

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;
