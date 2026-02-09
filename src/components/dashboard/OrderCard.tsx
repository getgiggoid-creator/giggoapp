import { Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Application } from "@/hooks/useApplications";
import type { Database } from "@/integrations/supabase/types";

type ShippingStatus = Database["public"]["Enums"]["shipping_status"];

const shippingStatusConfig: Record<ShippingStatus, { label: string; className: string }> = {
  needs_address: {
    label: "Needs Address",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  processing: {
    label: "Processing",
    className: "bg-muted text-muted-foreground border-border",
  },
  shipped: {
    label: "Shipped",
    className: "bg-info/10 text-info border-info/20",
  },
  delivered: {
    label: "Delivered",
    className: "bg-success/10 text-success border-success/20",
  },
  issue: {
    label: "Issue",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

interface OrderCardProps {
  application: Application;
  onShipClick: () => void;
  variant?: "physical" | "digital";
}

export const OrderCard = ({ application, onShipClick, variant = "physical" }: OrderCardProps) => {
  const statusConfig = application.shipping_status 
    ? shippingStatusConfig[application.shipping_status] 
    : null;

  return (
    <div className="glass-medium rounded-2xl border border-border p-4 space-y-4">
      {/* Creator Header - Avatar + Name */}
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-primary/20">
          <AvatarImage src={application.profiles?.avatar_url || undefined} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {application.profiles?.full_name?.charAt(0) || "C"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">
            {application.profiles?.full_name || "Unknown Creator"}
          </p>
          <p className="text-sm text-muted-foreground truncate">
            @{application.profiles?.username || "creator"}
          </p>
        </div>
      </div>

      {/* Vertical Field Layout */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-start gap-2">
          <span className="text-muted-foreground shrink-0">Campaign</span>
          <span className="font-medium text-foreground truncate text-right">
            {application.campaigns?.title || "Unknown Campaign"}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Status</span>
          {statusConfig ? (
            <Badge variant="outline" className={statusConfig.className}>
              {statusConfig.label}
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-muted/50 text-muted-foreground">
              Digital Only
            </Badge>
          )}
        </div>

        {variant === "physical" && application.tracking_number && (
          <>
            <div className="flex justify-between items-start gap-2">
              <span className="text-muted-foreground shrink-0">Courier</span>
              <span className="font-medium text-foreground text-right">
                {application.courier_name || "—"}
              </span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-muted-foreground shrink-0">Tracking</span>
              <span className="font-medium text-foreground text-right truncate max-w-[60%]">
                {application.tracking_number}
              </span>
            </div>
          </>
        )}

        {variant === "digital" && application.hired_at && (
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Hired</span>
            <span className="font-medium text-foreground">
              {new Date(application.hired_at).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Full-Width Action Button */}
      {variant === "physical" && application.shipping_status === "needs_address" && (
        <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-warning/10 text-warning text-sm">
          <MapPin className="w-4 h-4" />
          Awaiting Creator Address
        </div>
      )}

      {variant === "physical" && application.shipping_status === "processing" && (
        <Button 
          className="w-full min-h-[44px]" 
          onClick={onShipClick}
        >
          <Truck className="w-4 h-4 mr-2" />
          Mark as Shipped
        </Button>
      )}

      {variant === "physical" && application.shipping_status === "shipped" && (
        <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-info/10 text-info text-sm">
          <Truck className="w-4 h-4" />
          In Transit
        </div>
      )}

      {variant === "physical" && application.shipping_status === "delivered" && (
        <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-success/10 text-success text-sm font-medium">
          ✓ Delivered
        </div>
      )}
    </div>
  );
};
