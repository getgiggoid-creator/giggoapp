import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FeedbackForm } from "./FeedbackForm";

// Icons
import { 
  ExternalLink, 
  Trophy, 
  Check, 
  X, 
  RotateCcw, 
  Loader2, 
  MessageSquare,
  AlertCircle
} from "lucide-react";

// Hooks & Types
import { useReviewSubmission, type SubmissionWithCreator } from "@/hooks/useSubmissions";

interface SubmissionReviewCardProps {
  submission: SubmissionWithCreator;
  onWinnerSelected?: () => void;
  isContestEnded?: boolean;
}

export const SubmissionReviewCard = ({
  submission,
  onWinnerSelected,
  isContestEnded = false,
}: SubmissionReviewCardProps) => {
  const { t } = useTranslation();
  const reviewSubmission = useReviewSubmission();

  // --- State Management ---
  const [showWinnerConfirm, setShowWinnerConfirm] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState("");

  // --- Derived State (Memoized for performance) ---
  const creatorName = useMemo(() => 
    submission.profiles?.full_name || submission.profiles?.username || "Kreator",
  [submission.profiles]);

  const creatorInitial = useMemo(() => 
    creatorName.charAt(0).toUpperCase(),
  [creatorName]);

  const isWinner = submission.status === "approved" && isContestEnded;
  const isPending = submission.status === "submitted";
  const canReview = isPending || submission.status === "redo_requested";
  const maxRedoReached = (submission.redo_count || 0) >= 3;
  const isProcessing = reviewSubmission.isPending;

  // --- Handlers ---

  const handleApprove = () => {
    reviewSubmission.mutate({
      id: submission.id,
      action: "approve",
    });
  };

  const handleDecline = () => {
    // Bisa ditambahkan dialog konfirmasi terpisah jika perlu alasan penolakan spesifik
    reviewSubmission.mutate({
      id: submission.id,
      action: "decline",
      decline_reason: "Konten tidak sesuai dengan brief",
    });
  };

  const handleFeedbackChange = useCallback((newFeedback: string) => {
    setFeedback(newFeedback);
  }, []);

  const handleRequestRedo = () => {
    if (!feedback.trim()) return;
    
    reviewSubmission.mutate(
      {
        id: submission.id,
        action: "request_redo",
        feedback: feedback.trim(),
      },
      {
        onSuccess: () => {
          setShowFeedbackDialog(false);
          setFeedback("");
        },
      }
    );
  };

  const handleMarkWinner = () => {
    reviewSubmission.mutate(
      {
        id: submission.id,
        action: "approve", // Asumsi endpoint menandai winner lewat logic approve + contest context
      },
      {
        onSuccess: () => {
          setShowWinnerConfirm(false);
          onWinnerSelected?.();
        },
      }
    );
  };

  // --- Helper Renderers ---
  
  // Status mapping untuk menghindari ternary operator yang berantakan di JSX
  const getStatusBadgeVariant = (status: string) => {
    const map: Record<string, "approved" | "declined" | "redo_requested" | "pending"> = {
      approved: "approved",
      declined: "declined",
      redo_requested: "redo_requested",
      submitted: "pending"
    };
    return map[status] || "pending";
  };

  return (
    <>
      <Card className={cn(
        "group transition-all duration-300 hover:shadow-md",
        isWinner ? "border-amber-500/50 bg-amber-500/5" : "hover:border-primary/20"
      )}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* 1. Creator Avatar */}
            <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
              <AvatarImage src={submission.profiles?.avatar_url || undefined} alt={creatorName} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {creatorInitial}
              </AvatarFallback>
            </Avatar>

            {/* 2. Main Content Area */}
            <div className="flex-1 min-w-0 space-y-2">
              {/* Header: Name & Badge */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-semibold text-foreground truncate max-w-[200px]" title={creatorName}>
                    {creatorName}
                  </h4>
                  {isWinner && <Trophy className="w-4 h-4 text-amber-500 fill-amber-500/20" />}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>•</span>
                  <span>{format(new Date(submission.submitted_at), "dd MMM yyyy, HH:mm")}</span>
                </div>
              </div>

              {/* Status & Caption */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <StatusBadge status={getStatusBadgeVariant(submission.status)} />
                </div>

                {submission.caption && (
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {submission.caption}
                  </p>
                )}
              </div>

              {/* Brand Feedback Display (If Exists) */}
              {submission.status === "redo_requested" && submission.brand_feedback && (
                <div className="bg-orange-50 text-orange-700 border border-orange-200 rounded-md p-3 text-sm animate-in fade-in zoom-in-95">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="font-medium text-xs uppercase tracking-wide opacity-80">Feedback Brand</p>
                      <p>{submission.brand_feedback}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* External Link */}
              {submission.platform_url && (
                <div className="pt-1">
                  <a
                    href={submission.platform_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group-hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {t("submissions.review.viewContent")}
                  </a>
                </div>
              )}
            </div>

            {/* 3. Actions Column */}
            <div className="flex flex-col gap-2 shrink-0">
              {canReview && (
                <div className="flex flex-col gap-2 animate-in slide-in-from-right-2">
                  <Button
                    size="sm"
                    variant="success" // Pastikan variant ini ada di config button, atau gunakan className="bg-green-600..."
                    onClick={handleApprove}
                    disabled={isProcessing}
                    className="w-full justify-start shadow-sm"
                  >
                    {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                    {t("submissions.review.approve")}
                  </Button>
                  
                  {!maxRedoReached && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowFeedbackDialog(true)}
                      disabled={isProcessing}
                      className="w-full justify-start"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {t("submissions.review.requestRedo")}
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDecline}
                    disabled={isProcessing}
                    className="w-full justify-start shadow-sm"
                  >
                    <X className="w-4 h-4 mr-2" />
                    {t("submissions.review.reject")}
                  </Button>
                </div>
              )}

              {/* Winner Action */}
              {submission.status === "approved" && !isContestEnded && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-400 text-amber-600 hover:bg-amber-50 hover:text-amber-700 w-full justify-start"
                  onClick={() => setShowWinnerConfirm(true)}
                  disabled={isProcessing}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  {t("submissions.review.markWinner")}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- Dialogs --- */}
      
      {/* 1. Winner Confirmation */}
      <AlertDialog open={showWinnerConfirm} onOpenChange={setShowWinnerConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              {t("submissions.review.winnerConfirm.title")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("submissions.review.winnerConfirm.message")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("submissions.review.winnerConfirm.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleMarkWinner}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : t("submissions.review.winnerConfirm.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 2. Feedback / Redo Dialog */}
      <AlertDialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-primary" />
              {t("submissions.review.requestRedo")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("feedback.dialogDescription", "Berikan detail revisi agar kreator dapat memperbaikinya.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-2">
            <FeedbackForm onFeedbackChange={handleFeedbackChange} />
            {/* Fallback warning jika feedback kosong */}
            {!feedback.trim() && (
              <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {t("feedback.requiredHelper", "Feedback wajib diisi.")}
              </p>
            )}
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRequestRedo}
              disabled={!feedback.trim() || isProcessing}
            >
              {isProcessing && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {t("feedback.sendFeedback", "Kirim Revisi")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SubmissionReviewCard;
