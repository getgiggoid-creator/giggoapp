import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Star,
  MousePointer2,
  Lock,
  Lightbulb,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface BriefData {
  hook?: string;
  keySellingPoints?: string[];
  callToAction?: string;
  description?: string;
}

interface StructuredBriefProps {
  brief: BriefData;
  isLocked?: boolean;
  className?: string;
}

export const StructuredBrief = ({
  brief,
  isLocked = false,
  className,
}: StructuredBriefProps) => {
  const { t } = useTranslation();

  if (isLocked) {
    return (
      <Card className={cn("border-dashed", className)}>
        <CardContent className="py-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Lock className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            {t("brief.lockedMessage", "Apply to this gig to view the full brief")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Hook Section */}
      {brief.hook && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  {t("brief.hook", "Hook")}
                </h4>
                <p className="text-foreground font-medium text-lg leading-snug">
                  "{brief.hook}"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Selling Points Section */}
      {brief.keySellingPoints && brief.keySellingPoints.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-warning/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-warning" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  {t("brief.keySellingPoints", "Key Selling Points")}
                </h4>
                <ul className="space-y-2">
                  {brief.keySellingPoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-foreground"
                    >
                      <Lightbulb className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Call to Action Section */}
      {brief.callToAction && (
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-success/10 flex items-center justify-center">
                <MousePointer2 className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-success mb-1">
                  {t("brief.callToAction", "Call to Action")}
                </h4>
                <p className="text-foreground font-medium">
                  {brief.callToAction}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Description fallback if no structured data */}
      {!brief.hook && !brief.keySellingPoints?.length && !brief.callToAction && brief.description && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-muted flex items-center justify-center">
                <Target className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  {t("brief.description", "Brief Description")}
                </h4>
                <p className="text-foreground whitespace-pre-wrap">
                  {brief.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StructuredBrief;
