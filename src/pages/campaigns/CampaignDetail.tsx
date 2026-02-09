import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { Leaderboard } from "@/components/campaigns/Leaderboard";
import { BottomNavigation } from "@/components/shared/BottomNavigation";
import { Skeleton } from "@/components/ui/skeleton";
import { SubmissionDialog } from "@/components/submissions/SubmissionDialog";
import { StructuredBrief, type BriefData } from "@/components/campaigns/StructuredBrief";
import { usePublicCampaign } from "@/hooks/useCampaigns";
import { useAuth } from "@/hooks/useAuth";
import { mockLeaderboard } from "@/fixtures";
import {
  ArrowLeft,
  Share2,
  Download,
  FileText,
  Trophy,
  Users,
  CheckCircle,
  ExternalLink,
  Bookmark,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("brief");
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false);

  const { data: campaign, isLoading, error } = usePublicCampaign(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        <Skeleton className="aspect-video md:aspect-[3/1] w-full" />
        <div className="container mx-auto px-4 py-6 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Gig Not Found</h2>
          <p className="text-muted-foreground mb-4">The gig you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/campaigns")}>Browse Gigs</Button>
        </div>
      </div>
    );
  }

  // Note: Using public view - sensitive fields (budget, brief, prize_breakdown, etc.) are not available
  // Brand identity is now anonymized (name/logo only, no UUID exposure)
  const brandName = campaign.brand_name || "Brand";
  const brandLogo = campaign.brand_logo || "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop";
  const coverImage = campaign.cover_image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop";
  
  // These fields are not available in public view for competitive privacy
  const prizeBreakdown: { rank: number; amount: number; label: string }[] = [];
  const rules: string[] = [];
  const assets: { name: string; type: string; size: string }[] = [];

  // Map status for display
  const displayStatus = campaign.status === "live" ? "open" : campaign.status === "completed" ? "closed" : "draft";
  const displayType = campaign.type === "contest" ? "Challenge" : "Collab";

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Hero Section */}
      <div className="relative">
        <div className="aspect-video md:aspect-[3/1] overflow-hidden">
          <img
            src={coverImage}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Back button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/50 backdrop-blur-lg hover:bg-background/80"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/50 backdrop-blur-lg hover:bg-background/80"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-primary text-primary")} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/50 backdrop-blur-lg hover:bg-background/80"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Gig Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <StatusBadge status={displayStatus} />
              <span className="text-sm text-muted-foreground uppercase">
                {displayType}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-4">
              {campaign.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              {/* Prize pool and metrics not shown in public view for security */}
              <CountdownTimer endDate={new Date(campaign.end_date)} />
              <span className="text-sm text-muted-foreground">
                Apply to see full details
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Tabs Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start bg-muted/50 p-1 overflow-x-auto scrollbar-hide flex-nowrap">
                <TabsTrigger value="brief" className="gap-2 shrink-0">
                  <FileText className="w-4 h-4" />
                  <span className="whitespace-nowrap">Gig Brief</span>
                </TabsTrigger>
                <TabsTrigger value="rules" className="gap-2 shrink-0">
                  <CheckCircle className="w-4 h-4" />
                  <span className="whitespace-nowrap">Rules</span>
                </TabsTrigger>
                <TabsTrigger value="prizes" className="gap-2 shrink-0">
                  <Trophy className="w-4 h-4" />
                  <span className="whitespace-nowrap">Payouts</span>
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="gap-2 shrink-0">
                  <Users className="w-4 h-4" />
                  <span className="whitespace-nowrap">Leaderboard</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="brief" className="mt-6">
                {/* Structured Brief - Public preview shows description only */}
                <StructuredBrief
                  brief={{
                    description: campaign.description,
                    // These would come from the full campaign data when hired
                    hook: undefined,
                    keySellingPoints: undefined,
                    callToAction: undefined,
                  } as BriefData}
                  isLocked={false}
                />
                
                {/* Locked full brief notice */}
                <Card className="mt-4 border-dashed">
                  <CardContent className="py-6 text-center">
                    <p className="text-sm text-muted-foreground italic">
                      {t("brief.applyToView", "Apply to this gig to receive the full structured brief with Hook, Key Selling Points, and Call to Action.")}
                    </p>
                  </CardContent>
                </Card>

                {/* Assets */}
                {assets.length > 0 && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Gig Assets
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {assets.map((asset, index) => (
                        <button
                          key={index}
                          className="w-full flex items-center gap-3 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-left"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{asset.name}</p>
                            <p className="text-xs text-muted-foreground uppercase">
                              {asset.type} • {asset.size}
                            </p>
                          </div>
                          <Download className="w-5 h-5 text-muted-foreground" />
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="rules" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    {rules.length > 0 ? (
                      <ul className="space-y-4">
                        {rules.map((rule, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                            <span className="text-foreground">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        No specific rules for this gig.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prizes" className="mt-6">
                {prizeBreakdown.length > 0 ? (
                  <div className="grid gap-4">
                    {prizeBreakdown.map((prize) => (
                      <Card
                        key={prize.rank}
                        className={cn(
                          "transition-all",
                          prize.rank === 1 && "border-amber-500/50 bg-amber-500/5"
                        )}
                      >
                        <CardContent className="py-4 flex items-center gap-4">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                              prize.rank === 1
                                ? "bg-amber-500 text-white"
                                : prize.rank === 2
                                ? "bg-gray-400 text-white"
                                : prize.rank === 3
                                ? "bg-orange-600 text-white"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {prize.rank}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{prize.label}</p>
                          </div>
                          <p className="text-xl font-bold text-primary">
                            ${prize.amount.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">Payout breakdown not available.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="leaderboard" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <Leaderboard entries={mockLeaderboard} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Brand Info Sidebar */}
          <div className="space-y-6">
            {/* Brand Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={brandLogo}
                    alt={brandName}
                    className="w-16 h-16 rounded-xl bg-white object-contain p-2"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        {brandName}
                      </h3>
                      <CheckCircle className="w-4 h-4 text-primary fill-primary/20" />
                    </div>
                    <button className="text-sm text-primary hover:underline flex items-center gap-1">
                      View Profile <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {campaign.description?.substring(0, 150)}...
                </p>
              </CardContent>
            </Card>

            {/* CTA Card - Fixed on mobile */}
            <div className="hidden lg:block">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {t("campaigns.detail.joinGig")}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Kirim entri kamu dan bersaing untuk hadiah menarik!
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-background text-primary hover:bg-background/90"
                    onClick={() => user ? setShowSubmissionDialog(true) : navigate("/auth")}
                  >
                    <Send className="w-4 h-4" />
                    {t("campaigns.detail.joinGig")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed CTA on Mobile */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-border lg:hidden">
        <Button
          size="xl"
          variant="hero"
          className="w-full"
          onClick={() => user ? setShowSubmissionDialog(true) : navigate("/auth")}
        >
          <Send className="w-5 h-5" />
          {t("campaigns.detail.joinGig")}
        </Button>
      </div>

      {/* Submission Dialog */}
      <SubmissionDialog
        open={showSubmissionDialog}
        onOpenChange={setShowSubmissionDialog}
        campaignId={campaign.id}
        campaignTitle={campaign.title}
      />

      <BottomNavigation />
    </div>
  );
};

export default CampaignDetail;
