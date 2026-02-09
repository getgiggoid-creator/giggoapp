import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrizeTagProps {
  amount: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const PrizeTag = ({ 
  amount, 
  currency = "USD", 
  size = "md",
  className 
}: PrizeTagProps) => {
  const formatAmount = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K`;
    }
    return num.toLocaleString();
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-2 text-base gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-bold",
        "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
        "shadow-lg shadow-orange-500/25",
        sizeClasses[size],
        className
      )}
    >
      <Trophy className={iconSizes[size]} />
      <span>
        {currency === "USD" ? "$" : currency} {formatAmount(amount)}
      </span>
    </div>
  );
};
