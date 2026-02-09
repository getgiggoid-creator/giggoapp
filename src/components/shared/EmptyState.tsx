import { LucideIcon, FileQuestion, Search, Trophy, Video, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateType = "gigs" | "entries" | "earnings" | "search" | "orders" | "custom";

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const defaultStates: Record<Exclude<EmptyStateType, "custom">, { 
  icon: LucideIcon; 
  title: string; 
  description: string 
}> = {
  gigs: {
    icon: Trophy,
    title: "No gigs yet",
    description: "Start exploring gigs and find the perfect opportunity for you.",
  },
  entries: {
    icon: Video,
    title: "No entries yet",
    description: "Join a gig and submit your first entry to start earning.",
  },
  earnings: {
    icon: Trophy,
    title: "No earnings yet",
    description: "Win challenges to start earning payouts and build your portfolio.",
  },
  search: {
    icon: Search,
    title: "No results found",
    description: "Try adjusting your search or filters to find what you're looking for.",
  },
  orders: {
    icon: Package,
    title: "No orders to manage",
    description: "When you hire creators for physical product campaigns, their shipping details will appear here.",
  },
};

export const EmptyState = ({
  type = "custom",
  title,
  description,
  icon: CustomIcon,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) => {
  const config = type !== "custom" ? defaultStates[type] : null;
  const Icon = CustomIcon || config?.icon || FileQuestion;
  const displayTitle = title || config?.title || "Nothing here";
  const displayDescription = description || config?.description || "No data available.";

  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{displayTitle}</h3>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">{displayDescription}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="default">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
