import { useState, useEffect, useRef, RefObject } from "react";

interface UseLazyVideoOptions {
  rootMargin?: string;
  threshold?: number;
}

interface UseLazyVideoReturn {
  containerRef: RefObject<HTMLDivElement>;
  isVisible: boolean;
  shouldLoad: boolean;
}

/**
 * Hook for lazy loading video elements when they enter the viewport.
 * Returns a ref to attach to the video container and a boolean indicating
 * whether the video should be loaded.
 */
export const useLazyVideo = (
  options: UseLazyVideoOptions = {}
): UseLazyVideoReturn => {
  const { rootMargin = "200px 0px", threshold = 0 } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!("IntersectionObserver" in window)) {
      // Fallback: load immediately if not supported
      setShouldLoad(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setShouldLoad(true);
            // Once loaded, stop observing
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return { containerRef, isVisible, shouldLoad };
};

export default useLazyVideo;
