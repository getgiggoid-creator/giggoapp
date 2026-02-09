import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateSubmission } from "@/hooks/useSubmissions";
import { Loader2, Send, ExternalLink, Lock, Package } from "lucide-react";
import ShippingProgressStepper from "@/components/dashboard/ShippingProgressStepper";
import type { Database } from "@/integrations/supabase/types";

type ApplicationStatus = Database["public"]["Enums"]["application_status"];
type ShippingStatus = Database["public"]["Enums"]["shipping_status"];

interface SubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId: string;
  campaignTitle: string;
  // New props for shipping logic
  hasPhysicalProduct?: boolean;
  applicationStatus?: ApplicationStatus;
  shippingStatus?: ShippingStatus | null;
}

export const SubmissionDialog = ({
  open,
  onOpenChange,
  campaignId,
  campaignTitle,
  hasPhysicalProduct = false,
  applicationStatus = "hired",
  shippingStatus = null,
}: SubmissionDialogProps) => {
  const { t } = useTranslation();
  const [contentUrl, setContentUrl] = useState("");
  const [caption, setCaption] = useState("");
  
  const createSubmission = useCreateSubmission();

  // Check if submission is blocked due to shipping
  const isShippingBlocked = hasPhysicalProduct && shippingStatus !== "delivered";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contentUrl.trim() || isShippingBlocked) return;

    createSubmission.mutate(
      {
        campaign_id: campaignId,
        platform_url: contentUrl.trim(),
        caption: caption.trim() || undefined,
      },
      {
        onSuccess: () => {
          setContentUrl("");
          setCaption("");
          onOpenChange(false);
        },
      }
    );
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {t("submissions.dialog.title")}
          </DialogTitle>
          <DialogDescription>
            {t("submissions.dialog.subtitle")}
          </DialogDescription>
        </DialogHeader>

        {/* Shipping Progress Stepper (for physical products) */}
        {hasPhysicalProduct && (
          <div className="py-4">
            <ShippingProgressStepper
              applicationStatus={applicationStatus}
              shippingStatus={shippingStatus}
              hasPhysicalProduct={hasPhysicalProduct}
            />
          </div>
        )}

        {/* Shipping Block Message */}
        {isShippingBlocked && (
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                <Lock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Submission Terkunci</h4>
                <p className="text-sm text-muted-foreground">
                  Anda harus menerima produk terlebih dahulu sebelum submit entry
                </p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-background/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Status: {" "}
                  <span className="font-medium text-foreground">
                    {shippingStatus === "needs_address" && "Menunggu Alamat"}
                    {shippingStatus === "processing" && "Sedang Diproses"}
                    {shippingStatus === "shipped" && "Dalam Pengiriman"}
                    {shippingStatus === "issue" && "Ada Masalah"}
                    {!shippingStatus && "Belum Diproses"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Form - only show if not blocked */}
        {!isShippingBlocked && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Campaign Reference */}
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Gig:</p>
              <p className="font-medium text-foreground">{campaignTitle}</p>
            </div>

            {/* Content URL */}
            <div className="space-y-2">
              <Label htmlFor="contentUrl">
                {t("submissions.dialog.contentUrl")} *
              </Label>
              <div className="relative">
                <Input
                  id="contentUrl"
                  type="url"
                  placeholder={t("submissions.dialog.contentUrlPlaceholder")}
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                  className="pr-10"
                  required
                />
                {contentUrl && isValidUrl(contentUrl) && (
                  <a
                    href={contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <Label htmlFor="caption">{t("submissions.dialog.caption")}</Label>
              <Textarea
                id="caption"
                placeholder={t("submissions.dialog.captionPlaceholder")}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={!contentUrl.trim() || createSubmission.isPending}
            >
              {createSubmission.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("submissions.dialog.submitting")}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t("submissions.dialog.submit")}
                </>
              )}
            </Button>
          </form>
        )}

        {/* Footer disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-2">
          Pembayaran hadiah diverifikasi dan diproses manual oleh tim Giggo.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionDialog;
