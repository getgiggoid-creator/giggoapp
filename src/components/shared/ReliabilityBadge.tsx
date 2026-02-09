import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ReliabilityBadgeProps {
  score: number; // 0-100
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ReliabilityBadge = ({
  score,
  className,
  showLabel = true,
  size = "md",
}: ReliabilityBadgeProps) => {
  const { t } = useTranslation();

  // Determine tier based on score
  const getTier = () => {
    if (score >= 95) return { label: "Excellent", color: "text-success", bg: "bg-success/10 border-success/30" };
    if (score >= 85) return { label: "Good", color: "text-primary", bg: "bg-primary/10 border-primary/30" };
    if (score >= 70) return { label: "Fair", color: "text-warning", bg: "bg-warning/10 border-warning/30" };
    return { label: "Needs Improvement", color: "text-muted-foreground", bg: "bg-muted border-border" };
  };

  const tier = getTier();

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              "gap-1.5 font-medium border",
              tier.bg,
              tier.color,
              sizeClasses[size],
              className
            )}
          >
            <Shield className={cn(iconSizes[size], "shrink-0")} />
            <span className="font-bold">{score}%</span>
            {showLabel && (
              <span className="hidden sm:inline">
                {t("reliability.onTime", "On-Time")}
              </span>
            )}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold">
                {t("reliability.title", "Reliability Score")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t(
                "reliability.description",
                "This score reflects on-time delivery rate based on past completed gigs."
              )}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <TrendingUp className={cn("w-4 h-4", tier.color)} />
              <span className={cn("text-sm font-medium", tier.color)}>
                {tier.label}
              </span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ReliabilityBadge;
