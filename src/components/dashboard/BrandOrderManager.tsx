import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Truck, CheckCircle, AlertTriangle, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { OrderCard } from "./OrderCard";
import { useBrandHiredApplications, useUpdateShipping, useUpdateShippingStatus, type Application } from "@/hooks/useApplications";
import type { Database } from "@/integrations/supabase/types";

type ShippingStatus = Database["public"]["Enums"]["shipping_status"];

const shippingStatusConfig: Record<ShippingStatus, { label: string; className: string; icon: typeof Package }> = {
  needs_address: {
    label: "Needs Address",
    className: "bg-warning/10 text-warning border-warning/20",
    icon: MapPin,
  },
  processing: {
    label: "Processing",
    className: "bg-muted text-muted-foreground border-border",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    className: "bg-info/10 text-info border-info/20",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    className: "bg-success/10 text-success border-success/20",
    icon: CheckCircle,
  },
  issue: {
    label: "Issue",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: AlertTriangle,
  },
};

const ShippingBadge = ({ status }: { status: ShippingStatus | null }) => {
  if (!status) {
    return (
      <Badge variant="outline" className="bg-muted/50 text-muted-foreground">
        Digital Only
      </Badge>
    );
  }

  const config = shippingStatusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`${config.className} gap-1`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};

interface ShipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: Application | null;
  onSubmit: (courierName: string, trackingNumber: string) => void;
  isLoading: boolean;
}

const ShipDialog = ({ open, onOpenChange, application, onSubmit, isLoading }: ShipDialogProps) => {
  const [courierName, setCourierName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (courierName.trim() && trackingNumber.trim()) {
      onSubmit(courierName.trim(), trackingNumber.trim());
      setCourierName("");
      setTrackingNumber("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            Mark as Shipped
          </DialogTitle>
          <DialogDescription>
            Enter the shipping details for{" "}
            <span className="font-medium text-foreground">
              {application?.profiles?.full_name || "Creator"}
            </span>
            .
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="courier">Courier Name</Label>
            <Input
              id="courier"
              placeholder="e.g., FedEx, DHL, JNE"
              value={courierName}
              onChange={(e) => setCourierName(e.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tracking">Tracking Number</Label>
            <Input
              id="tracking"
              placeholder="e.g., 1234567890"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              maxLength={100}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !courierName.trim() || !trackingNumber.trim()}>
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Updating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Confirm Shipment
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const BrandOrderManager = () => {
  const navigate = useNavigate();
  const { data: applications, isLoading, error } = useBrandHiredApplications();
  const updateShipping = useUpdateShipping();
  const updateShippingStatus = useUpdateShippingStatus();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleShipClick = (application: Application) => {
    setSelectedApplication(application);
    setDialogOpen(true);
  };

  const handleMarkDelivered = (applicationId: string) => {
    updateShippingStatus.mutate({
      applicationId,
      shippingStatus: "delivered",
    });
  };

  const handleShipSubmit = (courierName: string, trackingNumber: string) => {
    if (selectedApplication) {
      updateShipping.mutate(
        {
          applicationId: selectedApplication.id,
          courierName,
          trackingNumber,
        },
        {
          onSuccess: () => {
            setDialogOpen(false);
            setSelectedApplication(null);
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <p className="text-destructive">Failed to load orders</p>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <EmptyState
        type="orders"
        actionLabel="Create Your First Campaign"
        onAction={() => navigate("/dashboard/brand/campaigns/new")}
        className="bg-muted/30 rounded-2xl border border-dashed border-border"
      />
    );
  }

  // Filter to show only physical product orders that need shipping
  const physicalOrders = applications.filter(
    (app) => app.campaigns?.product_type === "physical" && app.shipping_status
  );
  const digitalOrders = applications.filter(
    (app) => app.campaigns?.product_type !== "physical" || !app.shipping_status
  );

  return (
    <div className="space-y-6">
      {/* Physical Product Orders */}
      {physicalOrders.length > 0 && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border">
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Physical Product Shipments
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage shipping for creators who need physical products
            </p>
          </div>
          
          {/* Mobile: Card Layout */}
          <div className="md:hidden p-4 space-y-4">
            {physicalOrders.map((app) => (
              <OrderCard
                key={app.id}
                application={app}
                onShipClick={() => handleShipClick(app)}
                variant="physical"
              />
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Creator</TableHead>
                  <TableHead className="min-w-[150px]">Campaign</TableHead>
                  <TableHead className="min-w-[120px]">Shipping Status</TableHead>
                  <TableHead className="min-w-[120px]">Tracking</TableHead>
                  <TableHead className="text-right min-w-[120px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {physicalOrders.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">
                          {app.profiles?.full_name?.charAt(0) || "C"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {app.profiles?.full_name || "Unknown Creator"}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            @{app.profiles?.username || "creator"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-foreground truncate">
                        {app.campaigns?.title || "Unknown Campaign"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <ShippingBadge status={app.shipping_status} />
                    </TableCell>
                    <TableCell>
                      {app.tracking_number ? (
                        <div className="text-sm">
                          <p className="font-medium text-foreground">{app.tracking_number}</p>
                          <p className="text-muted-foreground">{app.courier_name}</p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {app.shipping_status === "needs_address" ? (
                        <Badge variant="outline" className="text-warning border-warning/20">
                          Awaiting Address
                        </Badge>
                      ) : app.shipping_status === "processing" ? (
                        <Button size="sm" className="min-h-[44px]" onClick={() => handleShipClick(app)}>
                          <Truck className="w-4 h-4 mr-1" />
                          Mark Shipped
                        </Button>
                      ) : app.shipping_status === "shipped" ? (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="min-h-[44px] text-success border-success/30 hover:bg-success/10"
                          onClick={() => handleMarkDelivered(app.id)}
                          disabled={updateShippingStatus.isPending}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mark Delivered
                        </Button>
                      ) : app.shipping_status === "delivered" ? (
                        <Badge variant="outline" className="text-success border-success/20">
                          Complete
                        </Badge>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Digital Only Orders */}
      {digitalOrders.length > 0 && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border">
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              Digital Campaigns (No Shipping Required)
            </h3>
          </div>
          
          {/* Mobile: Card Layout */}
          <div className="md:hidden p-4 space-y-4">
            {digitalOrders.map((app) => (
              <OrderCard
                key={app.id}
                application={app}
                onShipClick={() => {}}
                variant="digital"
              />
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Creator</TableHead>
                  <TableHead className="min-w-[150px]">Campaign</TableHead>
                  <TableHead className="min-w-[120px]">Hired Date</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {digitalOrders.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">
                          {app.profiles?.full_name?.charAt(0) || "C"}
                        </div>
                        <p className="font-medium text-foreground truncate">
                          {app.profiles?.full_name || "Unknown Creator"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="truncate">{app.campaigns?.title || "Unknown Campaign"}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {app.hired_at
                        ? new Date(app.hired_at).toLocaleDateString()
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <ShippingBadge status={null} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Ship Dialog */}
      <ShipDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        application={selectedApplication}
        onSubmit={handleShipSubmit}
        isLoading={updateShipping.isPending}
      />
    </div>
  );
};

export default BrandOrderManager;
