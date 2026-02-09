import { DollarSign, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingNotificationProps {
  type: "earning" | "approved" | "joined";
  user: string;
  highlight: string;
  className?: string;
  delay?: string;
}

const FloatingNotification = ({ 
  type, 
  user, 
  highlight, 
  className,
  delay = "0s" 
}: FloatingNotificationProps) => {
  const icons = {
    earning: DollarSign,
    approved: CheckCircle,
    joined: Sparkles,
  };

  const iconColors = {
    earning: "text-success bg-success/20",
    approved: "text-primary bg-primary/20",
    joined: "text-accent bg-accent/20",
  };

  const highlightColors = {
    earning: "text-success",
    approved: "text-primary",
    joined: "text-accent",
  };

  const Icon = icons[type];

  return (
    <div 
      className={cn(
        "bg-background/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-xl border border-border/50",
        "flex items-center gap-3 animate-float",
        className
      )}
      style={{ animationDelay: delay }}
    >
      <div className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
        iconColors[type]
      )}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-foreground">
          <span className="font-semibold">{user}</span>
          {type === "earning" && " just earned "}
          {type === "approved" && " approved "}
          {type === "joined" && " completed "}
          <span className={cn("font-bold", highlightColors[type])}>
            {highlight}
          </span>
        </p>
      </div>
    </div>
  );
};

export default FloatingNotification;
