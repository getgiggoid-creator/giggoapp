import { cn } from "@/lib/utils";

type StatusType = 
  | "open" 
  | "pending" 
  | "approved" 
  | "declined" 
  | "closed" 
  | "draft"
  | "live"
  | "ended"
  | "reviewing"
  | "winner"
  | "redo_requested";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  open: {
    label: "Open",
    className: "bg-success/10 text-success border-success/20",
  },
  pending: {
    label: "Pending",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  approved: {
    label: "Approved",
    className: "bg-success/10 text-success border-success/20",
  },
  declined: {
    label: "Declined",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  closed: {
    label: "Closed",
    className: "bg-muted text-muted-foreground border-border",
  },
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground border-border",
  },
  live: {
    label: "Open",
    className: "bg-success/10 text-success border-success/20",
  },
  ended: {
    label: "Closed",
    className: "bg-muted text-muted-foreground border-border",
  },
  reviewing: {
    label: "Reviewing",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  winner: {
    label: "Winner",
    className: "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 border-amber-500/30",
  },
  redo_requested: {
    label: "Redo Requested",
    className: "bg-warning/10 text-warning border-warning/20",
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {(status === "live" || status === "open") && (
        <span className="w-1.5 h-1.5 rounded-full bg-success mr-1.5 animate-pulse" />
      )}
      {config.label}
    </span>
  );
};
