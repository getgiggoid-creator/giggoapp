import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Package, Truck, Home, Video } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type ApplicationStatus = Database["public"]["Enums"]["application_status"];
type ShippingStatus = Database["public"]["Enums"]["shipping_status"];

interface ShippingProgressStepperProps {
  applicationStatus: ApplicationStatus;
  shippingStatus: ShippingStatus | null;
  hasPhysicalProduct: boolean;
}

interface Step {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "completed" | "current" | "upcoming" | "locked";
}

const ShippingProgressStepper = ({
  applicationStatus,
  shippingStatus,
  hasPhysicalProduct,
}: ShippingProgressStepperProps) => {
  const getSteps = (): Step[] => {
    if (!hasPhysicalProduct) {
      // Digital product flow - simpler
      return [
        {
          id: "applied",
          label: "Applied",
          icon: Circle,
          status: applicationStatus === "applied" ? "current" : "completed",
        },
        {
          id: "hired",
          label: "Hired",
          icon: CheckCircle,
          status:
            applicationStatus === "hired" || applicationStatus === "completed"
              ? applicationStatus === "hired"
                ? "current"
                : "completed"
              : "upcoming",
        },
        {
          id: "submit",
          label: "Submit Entry",
          icon: Video,
          status:
            applicationStatus === "completed"
              ? "completed"
              : applicationStatus === "hired"
              ? "current"
              : "upcoming",
        },
      ];
    }

    // Physical product flow - with shipping
    const steps: Step[] = [
      {
        id: "applied",
        label: "Applied",
        icon: Circle,
        status: applicationStatus === "applied" ? "current" : "completed",
      },
      {
        id: "hired",
        label: "Hired",
        icon: CheckCircle,
        status:
          applicationStatus === "hired" || applicationStatus === "completed"
            ? "completed"
            : applicationStatus === "applied"
            ? "upcoming"
            : "completed",
      },
      {
        id: "shipped",
        label: "Product Shipped",
        icon: Truck,
        status: getShippingStepStatus(shippingStatus, "shipped"),
      },
      {
        id: "delivered",
        label: "Product Received",
        icon: Home,
        status: getShippingStepStatus(shippingStatus, "delivered"),
      },
      {
        id: "submit",
        label: "Submit Entry",
        icon: Video,
        status: getSubmitStepStatus(applicationStatus, shippingStatus),
      },
    ];

    return steps;
  };

  function getShippingStepStatus(
    shippingStatus: ShippingStatus | null,
    step: "shipped" | "delivered"
  ): Step["status"] {
    if (!shippingStatus || shippingStatus === "needs_address" || shippingStatus === "processing") {
      return step === "shipped" ? "current" : "locked";
    }
    if (shippingStatus === "shipped") {
      return step === "shipped" ? "completed" : step === "delivered" ? "current" : "upcoming";
    }
    if (shippingStatus === "delivered") {
      return "completed";
    }
    return "upcoming";
  }

  function getSubmitStepStatus(
    appStatus: ApplicationStatus,
    shipStatus: ShippingStatus | null
  ): Step["status"] {
    if (appStatus === "completed") return "completed";
    if (shipStatus === "delivered") return "current";
    return "locked";
  }

  const steps = getSteps();

  const getStepStyles = (status: Step["status"]) => {
    switch (status) {
      case "completed":
        return {
          circle: "bg-success text-success-foreground border-success",
          line: "bg-success",
          text: "text-foreground",
        };
      case "current":
        return {
          circle: "bg-primary text-primary-foreground border-primary animate-pulse",
          line: "bg-border",
          text: "text-foreground font-medium",
        };
      case "locked":
        return {
          circle: "bg-muted text-muted-foreground border-border opacity-50",
          line: "bg-border",
          text: "text-muted-foreground opacity-50",
        };
      default:
        return {
          circle: "bg-muted text-muted-foreground border-border",
          line: "bg-border",
          text: "text-muted-foreground",
        };
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const styles = getStepStyles(step.status);
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all",
                    styles.circle
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 text-center max-w-[80px] leading-tight",
                    styles.text
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-1 mx-2 rounded-full transition-all",
                    step.status === "completed" ? "bg-success" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Status Message */}
      {hasPhysicalProduct && shippingStatus !== "delivered" && applicationStatus === "hired" && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-sm text-warning flex items-center gap-2">
            <Package className="w-4 h-4" />
            {shippingStatus === "needs_address" && "Menunggu brand mengirim produk"}
            {shippingStatus === "processing" && "Produk sedang diproses untuk pengiriman"}
            {shippingStatus === "shipped" && "Produk dalam perjalanan - Tunggu sampai diterima"}
            {shippingStatus === "issue" && "Ada masalah dengan pengiriman - Hubungi brand"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Anda baru bisa submit entry setelah menerima produk
          </p>
        </div>
      )}
    </div>
  );
};

export default ShippingProgressStepper;
