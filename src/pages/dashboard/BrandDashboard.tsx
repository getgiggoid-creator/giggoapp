import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EscrowBalanceHeader from "@/components/dashboard/EscrowBalanceHeader";
import BrandOrderManager from "@/components/dashboard/BrandOrderManager";
import SubmissionReviewPanel from "@/components/submissions/SubmissionReviewPanel";
import { useBrandCampaigns, type Campaign } from "@/hooks/useCampaigns";
import { 
  Plus, 
  LayoutDashboard, 
  Megaphone, 
  Users, 
  BarChart3, 
  Settings, 
  TrendingUp,
  Eye,
  Video,
  DollarSign,
  Package,
  FolderOpen,
  FileVideo
} from "lucide-react";
import { differenceInDays } from "date-fns";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "gigs", icon: Megaphone, label: "My Gigs" },
  { id: "entries", icon: FileVideo, label: "Entries" },
  { id: "orders", icon: Package, label: "Orders & Shipping" },
  { id: "creators", icon: Users, label: "Creators" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const headerTitles: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: "Selamat Datang!", subtitle: "Ini yang terjadi dengan gig kamu" },
  gigs: { title: "Gig Saya" },
  entries: { title: "Review Entri", subtitle: "Tinjau dan kelola entri kreator" },
  orders: { title: "Pesanan & Pengiriman", subtitle: "Kelola pengiriman ke kreator" },
  creators: { title: "Temukan Kreator" },
  analytics: { title: "Analitik" },
  settings: { title: "Pengaturan" },
};

// Helper to compute stats from real campaigns
const computeStats = (campaigns: Campaign[]) => {
  const activeGigs = campaigns.filter(c => c.status === "live").length;
  const totalEntries = campaigns.reduce((sum, c) => sum + (c.submission_count || 0), 0);
  const totalViews = campaigns.reduce((sum, c) => sum + (c.view_count || 0), 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return [
    { label: "Active Gigs", value: activeGigs.toString(), icon: Megaphone, trend: "" },
    { label: "Total Entries", value: totalEntries.toString(), icon: Video, trend: "" },
    { label: "Content Views", value: formatViews(totalViews), icon: Eye, trend: "" },
    { label: "Amount Spent", value: `$${totalSpent.toLocaleString()}`, icon: DollarSign, trend: "" },
  ];
};

const BrandDashboard = () => {
  useTranslation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const currentHeader = headerTitles[activeTab] || { title: "Dashboard" };
  
  const { data: campaigns = [], isLoading, error } = useBrandCampaigns();

  const stats = computeStats(campaigns);
  const recentGigs = campaigns.slice(0, 5);
  
  // Get selected campaign for entries review
  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar
        variant="brand"
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName="Acme Inc"
        userInitial="A"
      />

      <main className="flex-1 overflow-auto">
        <DashboardHeader
          title={currentHeader.title}
          subtitle={currentHeader.subtitle}
          actions={
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <EscrowBalanceHeader />
              <Button variant="hero" asChild>
                <Link to="/dashboard/brand/campaigns/new">
                  <Plus className="w-5 h-5" />
                  New Gig
                </Link>
              </Button>
            </div>
          }
        />

        <div className="p-8">
          {activeTab === "orders" ? (
            <BrandOrderManager />
          ) : activeTab === "entries" ? (
            <div className="space-y-6">
              {/* Campaign Selector for Entries */}
              {!selectedCampaignId ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {campaigns.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">Belum ada gig</h3>
                      <p className="text-muted-foreground mb-4">Buat gig pertamamu untuk mulai menerima entri</p>
                      <Button variant="hero" asChild>
                        <Link to="/dashboard/brand/campaigns/new">
                          <Plus className="w-5 h-5" />
                          Buat Gig Pertama
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    campaigns.map((campaign) => (
                      <button
                        key={campaign.id}
                        onClick={() => setSelectedCampaignId(campaign.id)}
                        className="text-left bg-card rounded-2xl p-6 border border-border hover:border-primary transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold">
                            {campaign.title.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{campaign.title}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              campaign.status === "live" 
                                ? "bg-success/10 text-success" 
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {campaign.status === "live" ? "Aktif" : campaign.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileVideo className="w-4 h-4" />
                            {campaign.submission_count || 0} entri
                          </span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              ) : (
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedCampaignId(null)}
                    className="mb-4"
                  >
                    ← Kembali ke daftar gig
                  </Button>
                  {selectedCampaign && (
                    <>
                      <div className="mb-6">
                        <h2 className="font-display text-xl font-semibold text-foreground">
                          {selectedCampaign.title}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                          Review entri dari kreator untuk gig ini
                        </p>
                      </div>
                      <SubmissionReviewPanel
                        campaignId={selectedCampaign.id}
                        campaignStatus={selectedCampaign.status}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                     <div key={i} className="glass-card p-6">
                       <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                      <Skeleton className="h-8 w-20 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))
                ) : (
                  stats.map((stat) => (
                     <div
                       key={stat.label}
                       className="glass-card p-6 card-hover"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <stat.icon className="w-6 h-6 text-primary" />
                        </div>
                        {stat.trend && (
                          <div className="flex items-center gap-1 text-success text-sm font-medium">
                            <TrendingUp className="w-4 h-4" />
                            {stat.trend}
                          </div>
                        )}
                      </div>
                      <p className="font-display text-3xl font-bold text-foreground mb-1">
                        {stat.value}
                      </p>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Recent Gigs */}
              <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Recent Gigs
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                {isLoading ? (
                  <div className="divide-y divide-border">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Skeleton className="w-12 h-12 rounded-xl" />
                          <div>
                            <Skeleton className="h-5 w-48 mb-2" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                        <div className="text-right">
                          <Skeleton className="h-5 w-16 mb-1" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="p-12 text-center">
                    <p className="text-muted-foreground">Failed to load gigs. Please try again.</p>
                  </div>
                ) : recentGigs.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <FolderOpen className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">No gigs yet</h3>
                    <p className="text-muted-foreground mb-4">Create your first gig to start collaborating with creators</p>
                    <Button variant="hero" asChild>
                      <Link to="/dashboard/brand/campaigns/new">
                        <Plus className="w-5 h-5" />
                        Create Your First Gig
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {recentGigs.map((gig) => {
                      const daysLeft = differenceInDays(new Date(gig.end_date), new Date());
                      const isOpen = gig.status === "live";

                      return (
                        <div
                          key={gig.id}
                          className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold">
                              {gig.title.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {gig.title}
                              </h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                                    isOpen
                                      ? "bg-success/10 text-success"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {gig.status === "live" ? "Open" : gig.status === "draft" ? "Draft" : gig.status}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {gig.submission_count || 0} entries
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">
                              ${(gig.budget || 0).toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {daysLeft > 0
                                ? `${daysLeft} days left`
                                : daysLeft === 0
                                ? "Ends today"
                                : "Ended"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default BrandDashboard;