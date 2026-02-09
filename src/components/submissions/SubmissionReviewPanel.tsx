import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCampaignSubmissions } from "@/hooks/useSubmissions";
import { SubmissionReviewCard } from "./SubmissionReviewCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { AlertCircle, Trophy, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

interface SubmissionReviewPanelProps {
  campaignId: string;
  campaignStatus: string;
}

export const SubmissionReviewPanel = ({
  campaignId,
  campaignStatus,
}: SubmissionReviewPanelProps) => {
  const { t } = useTranslation();
  const [showWinnerAlert, setShowWinnerAlert] = useState(false);
  
  const { data: submissions = [], isLoading, error } = useCampaignSubmissions(campaignId);

  const isContestEnded = campaignStatus === "completed" || campaignStatus === "judging";

  const handleWinnerSelected = () => {
    setShowWinnerAlert(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Gagal memuat entri. Silakan coba lagi.
        </AlertDescription>
      </Alert>
    );
  }

  if (submissions.length === 0) {
    return (
      <EmptyState
        type="entries"
        actionLabel="Tunggu Entri"
      />
    );
  }

  // Group submissions by status
  const pendingSubmissions = submissions.filter(s => s.status === "submitted");
  const redoSubmissions = submissions.filter(s => s.status === "redo_requested");
  const approvedSubmissions = submissions.filter(s => s.status === "approved");
  const declinedSubmissions = submissions.filter(s => s.status === "declined");

  return (
    <div className="space-y-6">
      {/* Winner Alert */}
      {showWinnerAlert && (
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <Trophy className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-600">
            {t("submissions.review.challengeCompleted.title")}
          </AlertTitle>
          <AlertDescription className="text-amber-600/80">
            {t("submissions.review.challengeCompleted.message")}
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{submissions.length}</p>
            <p className="text-sm text-muted-foreground">Total Entri</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">{pendingSubmissions.length}</p>
            <p className="text-sm text-muted-foreground">Menunggu Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">{approvedSubmissions.length}</p>
            <p className="text-sm text-muted-foreground">Disetujui</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{declinedSubmissions.length}</p>
            <p className="text-sm text-muted-foreground">Ditolak</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Submissions */}
      {pendingSubmissions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="w-2 h-2 bg-warning rounded-full" />
              Menunggu Review ({pendingSubmissions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingSubmissions.map((submission) => (
              <SubmissionReviewCard
                key={submission.id}
                submission={submission}
                onWinnerSelected={handleWinnerSelected}
                isContestEnded={isContestEnded}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Redo Requested */}
      {redoSubmissions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              Perlu Revisi ({redoSubmissions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {redoSubmissions.map((submission) => (
              <SubmissionReviewCard
                key={submission.id}
                submission={submission}
                onWinnerSelected={handleWinnerSelected}
                isContestEnded={isContestEnded}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Approved Submissions */}
      {approvedSubmissions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="w-5 h-5 text-success" />
              Disetujui ({approvedSubmissions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {approvedSubmissions.map((submission) => (
              <SubmissionReviewCard
                key={submission.id}
                submission={submission}
                onWinnerSelected={handleWinnerSelected}
                isContestEnded={isContestEnded}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Declined Submissions */}
      {declinedSubmissions.length > 0 && (
        <Card className="opacity-75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-muted-foreground">
              Ditolak ({declinedSubmissions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {declinedSubmissions.map((submission) => (
              <SubmissionReviewCard
                key={submission.id}
                submission={submission}
                isContestEnded={isContestEnded}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Footer Disclaimer */}
      <p className="text-xs text-muted-foreground text-center py-4 border-t border-border">
        Pembayaran hadiah diverifikasi dan diproses manual oleh tim Giggo.
      </p>
    </div>
  );
};

export default SubmissionReviewPanel;
