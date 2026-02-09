import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Sun,
  Volume2,
  MessageCircle,
  Clock,
  Video,
  AlertCircle,
} from "lucide-react";

export interface FeedbackOption {
  id: string;
  labelKey: string;
  labelFallback: string;
  icon: React.ReactNode;
}

const DEFAULT_FEEDBACK_OPTIONS: FeedbackOption[] = [
  {
    id: "lighting",
    labelKey: "feedback.lighting",
    labelFallback: "Lighting is too dark",
    icon: <Sun className="w-4 h-4" />,
  },
  {
    id: "audio",
    labelKey: "feedback.audio",
    labelFallback: "Audio is not clear",
    icon: <Volume2 className="w-4 h-4" />,
  },
  {
    id: "usp",
    labelKey: "feedback.usp",
    labelFallback: "Didn't mention the USP",
    icon: <MessageCircle className="w-4 h-4" />,
  },
  {
    id: "duration",
    labelKey: "feedback.duration",
    labelFallback: "Video is too short/long",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    id: "quality",
    labelKey: "feedback.quality",
    labelFallback: "Video quality is poor",
    icon: <Video className="w-4 h-4" />,
  },
  {
    id: "hook",
    labelKey: "feedback.hook",
    labelFallback: "Hook is not engaging",
    icon: <AlertCircle className="w-4 h-4" />,
  },
];

interface FeedbackFormProps {
  options?: FeedbackOption[];
  onFeedbackChange: (feedback: string) => void;
  className?: string;
}

export const FeedbackForm = ({
  options = DEFAULT_FEEDBACK_OPTIONS,
  onFeedbackChange,
  className,
}: FeedbackFormProps) => {
  const { t } = useTranslation();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [showOther, setShowOther] = useState(false);

  // Build feedback string whenever selections change
  useEffect(() => {
    const selectedLabels = selectedOptions.map((id) => {
      const option = options.find((o) => o.id === id);
      return option ? t(option.labelKey, option.labelFallback) : "";
    });

    let feedback = selectedLabels.filter(Boolean).join("; ");

    if (showOther && otherText.trim()) {
      if (feedback) {
        feedback += `; ${otherText.trim()}`;
      } else {
        feedback = otherText.trim();
      }
    }

    onFeedbackChange(feedback);
  }, [selectedOptions, otherText, showOther, options, t, onFeedbackChange]);

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id)
        ? prev.filter((o) => o !== id)
        : [...prev, id]
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-sm text-muted-foreground">
        {t(
          "feedback.selectIssues",
          "Select the issues with this submission:"
        )}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => toggleOption(option.id)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border text-left transition-all",
              selectedOptions.includes(option.id)
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                selectedOptions.includes(option.id)
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {option.icon}
            </div>
            <span className="text-sm font-medium">
              {t(option.labelKey, option.labelFallback)}
            </span>
          </button>
        ))}
      </div>

      {/* Other option */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id="feedback-other"
            checked={showOther}
            onCheckedChange={(checked) => setShowOther(checked === true)}
          />
          <Label
            htmlFor="feedback-other"
            className="text-sm font-medium cursor-pointer"
          >
            {t("feedback.other", "Other (specify)")}
          </Label>
        </div>

        {showOther && (
          <Textarea
            placeholder={t(
              "feedback.otherPlaceholder",
              "Describe the issue in detail..."
            )}
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            rows={3}
            className="mt-2"
          />
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
