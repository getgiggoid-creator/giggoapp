import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
}

interface ConfettiCelebrationProps {
  show: boolean;
  duration?: number;
}

const colors = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "#FFD700",
  "#FF6B6B",
  "#4ECDC4",
  "#A78BFA",
  "#F472B6",
];

export const ConfettiCelebration = ({ show, duration = 3000 }: ConfettiCelebrationProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Skip confetti animation entirely if user prefers reduced motion
  if (prefersReducedMotion && show) {
    return null;
  }

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 8,
      }));
      setPieces(newPieces);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setPieces([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!isVisible || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.x}%`,
            top: "-20px",
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
};
