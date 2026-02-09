import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { PrizeTag } from "@/components/shared/PrizeTag";
import { Users, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Campaign {
  id: string;
  title: string;
  brandName: string;
  brandLogo: string;
  coverImage: string;
  category: string;
  endDate: Date;
  type: "contest" | "deal";
  status: "live" | "ended" | "draft";
  // Optional fields - not available in public view
  prizePool?: number;
  submissionCount?: number;
  viewCount?: number;
}

interface CampaignCardProps {
  campaign: Campaign;
  className?: string;
}

export const CampaignCard = ({ campaign, className }: CampaignCardProps) => {
  const navigate = useNavigate();

  // Map status for display
  const displayStatus = campaign.status === "live" ? "open" : campaign.status === "ended" ? "closed" : "draft";
  const displayType = campaign.type === "contest" ? "Challenge" : "Collab";

  return (
    <Card
      className={cn(
        "group overflow-hidden cursor-pointer transition-all duration-300",
        "hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1",
        "border-border/50",
        className
      )}
      onClick={() => navigate(`/campaigns/${campaign.id}`)}
    >
      {/* Cover Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={campaign.coverImage}
          alt={campaign.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Payout tag - only show if prizePool is available */}
        {campaign.prizePool !== undefined && campaign.prizePool > 0 && (
          <div className="absolute top-3 right-3">
            <PrizeTag amount={campaign.prizePool} size="sm" />
          </div>
        )}
        
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={displayStatus} />
        </div>

        {/* Brand info overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
          <img
            src={campaign.brandLogo}
            alt={campaign.brandName}
            className="w-8 h-8 rounded-lg bg-white object-contain p-1"
          />
          <span className="text-white text-sm font-medium truncate">
            {campaign.brandName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {campaign.title}
        </h3>

        <div className="flex items-center justify-between text-sm">
          <span className="px-2 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
            {campaign.category}
          </span>
          <span className="text-xs text-muted-foreground uppercase">
            {displayType}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          {/* Show metrics only if available, otherwise show "View Details" */}
          {(campaign.submissionCount !== undefined || campaign.viewCount !== undefined) ? (
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              {campaign.submissionCount !== undefined && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{campaign.submissionCount}</span>
                </div>
              )}
              {campaign.viewCount !== undefined && (
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{campaign.viewCount.toLocaleString()}</span>
                </div>
              )}
            </div>
          ) : (
            <span className="text-sm text-primary font-medium">View Details →</span>
          )}
          
          {campaign.status === "live" && (
            <CountdownTimer endDate={campaign.endDate} compact showIcon />
          )}
        </div>
      </div>
    </Card>
  );
};
