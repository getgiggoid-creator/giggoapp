import { useState, useMemo } from "react";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { CampaignFilters } from "@/components/campaigns/CampaignFilters";
import { BottomNavigation } from "@/components/shared/BottomNavigation";
import { EmptyState } from "@/components/shared/EmptyState";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicCampaigns, CampaignType, SortOption } from "@/hooks/useCampaigns";
import { Flame, Sparkles, Clock, TrendingUp } from "lucide-react";

const BrowseCampaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState<CampaignType | "all">("all");
  const [activeTab, setActiveTab] = useState<SortOption>(SortOption.FOR_YOU);

  const { data: campaigns, isLoading, error } = usePublicCampaigns({
    search: searchQuery,
    category: selectedCategory,
    type: selectedType === "all" ? CampaignType.ALL : selectedType,
    sortBy: activeTab,
  });

  // Transform public campaigns data (no sensitive fields available)
  const transformedCampaigns = useMemo(() => {
    if (!campaigns) return [];
    
    return campaigns.map((campaign) => ({
      id: campaign.id,
      title: campaign.title,
      // Use real brand data from anonymized view (no UUID exposure)
      brandName: campaign.brand_name || "Brand",
      brandLogo: campaign.brand_logo || "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop",
      coverImage: campaign.cover_image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      category: campaign.category,
      endDate: new Date(campaign.end_date),
      type: campaign.type as "contest" | "deal",
      status: campaign.status as "live" | "ended" | "draft",
      // These fields are not in public view for competitive privacy
      prizePool: undefined,
      submissionCount: undefined,
      viewCount: undefined,
    }));
  }, [campaigns]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedType("all");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Discover Campaigns
          </h1>
          
          <CampaignFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedType={selectedType}
            onTypeChange={(type) => setSelectedType(type as CampaignType | "all")}
          />
        </div>
      </header>

      {/* Tabs - Scrollable on mobile */}
      <div className="container mx-auto px-4 py-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SortOption)}>
          <TabsList className="w-full justify-start bg-transparent gap-2 p-0 h-auto overflow-x-auto scrollbar-hide flex-nowrap">
            <TabsTrigger
              value="for-you"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 gap-1.5 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span className="whitespace-nowrap">For You</span>
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 gap-1.5 shrink-0"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="whitespace-nowrap">Trending</span>
            </TabsTrigger>
            <TabsTrigger
              value="new"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 gap-1.5 shrink-0"
            >
              <Flame className="w-4 h-4" />
              <span className="whitespace-nowrap">New</span>
            </TabsTrigger>
            <TabsTrigger
              value="ending-soon"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 gap-1.5 shrink-0"
            >
              <Clock className="w-4 h-4" />
              <span className="whitespace-nowrap">Ending Soon</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Campaign Grid */}
      <main className="container mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <EmptyState
            type="custom"
            title="Something went wrong"
            description="Failed to load campaigns. Please try again."
            actionLabel="Try Again"
            onAction={() => window.location.reload()}
          />
        ) : transformedCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformedCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <EmptyState
            type="search"
            actionLabel="Clear Filters"
            onAction={clearFilters}
          />
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default BrowseCampaigns;
