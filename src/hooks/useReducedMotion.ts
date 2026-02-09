import { useEffect, useState } from "react";

/**
 * Hook to detect if the user prefers reduced motion.
 * Returns true if the user has enabled "reduce motion" in their OS settings.
 * 
 * Use this to conditionally disable or simplify framer-motion animations.
 */
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Check if window is available (SSR safety)
    if (typeof window === "undefined") return false;
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    return mediaQuery.matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

/**
 * Returns motion variants that respect reduced motion preferences.
 * When reduced motion is preferred, animations are replaced with simple opacity fades.
 */
export const getReducedMotionVariants = (prefersReducedMotion: boolean) => ({
  fadeUp: prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } },
  
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  scale: prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 } },
});

/**
 * Returns a transition config that respects reduced motion preferences.
 */
export const getReducedMotionTransition = (prefersReducedMotion: boolean) => 
  prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.3 };
