import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ReliabilityBadge } from "@/components/shared/ReliabilityBadge";
import { useCreatorApplications } from "@/hooks/useApplications";
import { usePublicCampaigns, SortOption } from "@/hooks/useCampaigns";
import { 
  LayoutDashboard, 
  Compass, 
  Video, 
  Trophy, 
  Wallet, 
  Settings, 
  TrendingUp,
  Eye,
  DollarSign,
  Star,
  Clock,
  ChevronRight,
  FolderOpen
} from "lucide-react";
import { differenceInDays } from "date-fns";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "discover", icon: Compass, label: "Discover Gigs" },
  { id: "entries", icon: Video, label: "My Entries" },
  { id: "leaderboard", icon: Trophy, label: "Leaderboard" },
  { id: "wallet", icon: Wallet, label: "My Wallet", path: "/dashboard/creator/wallet" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const CreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const { data: applications = [], isLoading: applicationsLoading } = useCreatorApplications();
  const { data: discoverCampaigns = [], isLoading: campaignsLoading } = usePublicCampaigns({ sortBy: SortOption.NEW });

  // Filter active applications (hired or applied)
  const activeGigs = applications.filter(app => 
    app.status === "hired" || app.status === "applied"
  );
  
  // Calculate reliability score (on-time completion rate)
  const completedGigs = applications.filter(a => a.status === "completed");
  const reliabilityScore = completedGigs.length > 0 
    ? Math.min(98, Math.round(85 + (completedGigs.length * 2))) // Mock: increases with more completed gigs
    : 0;

  // Compute stats from real data
  const stats = [
    { 
      label: "Gigs Joined", 
      value: applications.length.toString(), 
      icon: Video, 
      trend: "" 
    },
    { 
      label: "Active Gigs", 
      value: activeGigs.length.toString(), 
      icon: Trophy, 
      trend: "" 
    },
    { 
      label: "Completed", 
      value: applications.filter(a => a.status === "completed").length.toString(), 
      icon: Eye, 
      trend: "" 
    },
    { 
      label: "Success Rate", 
      value: applications.length > 0 
        ? `${Math.round((applications.filter(a => a.status === "completed").length / applications.length) * 100)}%`
        : "0%", 
      icon: DollarSign, 
      trend: "" 
    },
  ];

  // Take first 3 campaigns for discover section
  const discoverGigs = discoverCampaigns.slice(0, 3);

  const getColorClass = (index: number) => {
    const colors = ["bg-secondary", "gradient-primary", "bg-accent"];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar
        variant="creator"
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName="Creator"
        userInitial="C"
      />

      <main className="flex-1 overflow-auto">
        <DashboardHeader
          title="Welcome Back! 👋"
          subtitle="Ready to land your next gig?"
          searchPlaceholder="Search gigs..."
          actions={
            reliabilityScore > 0 ? (
              <ReliabilityBadge score={reliabilityScore} size="lg" />
            ) : undefined
          }
        />

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {applicationsLoading ? (
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

          {/* Active Gigs */}
          <div className="glass-card overflow-hidden mb-8">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Your Active Gigs
              </h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            {applicationsLoading ? (
              <div className="divide-y divide-border">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-xl" />
                      <div>
                        <Skeleton className="h-5 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : activeGigs.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <FolderOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No active gigs yet</h3>
                <p className="text-muted-foreground mb-4">Browse available gigs and start applying</p>
                <Button variant="hero" asChild>
                  <Link to="/campaigns">
                    <Compass className="w-5 h-5" />
                    Browse Gigs
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {activeGigs.map((app) => {
                  const campaign = app.campaigns;
                  const daysLeft = campaign?.end_date 
                    ? differenceInDays(new Date(campaign.end_date), new Date())
                    : 0;

                  return (
                    <div
                      key={app.id}
                      className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold">
                          {campaign?.title?.charAt(0) || "G"}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">
                              {campaign?.title || "Gig"}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              app.status === "hired" 
                                ? "bg-success/10 text-success" 
                                : "bg-primary/10 text-primary"
                            }`}>
                              {app.status === "hired" ? "Hired" : "Applied"}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Discover Gigs */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Discover New Gigs
              </h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/campaigns">Browse All</Link>
              </Button>
            </div>
            {campaignsLoading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
                    <Skeleton className="h-32 w-full" />
                    <div className="p-5">
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-5 w-full mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : discoverGigs.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <p className="text-muted-foreground">No gigs available right now. Check back later!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {discoverGigs.map((gig, index) => {
                  const daysLeft = differenceInDays(new Date(gig.end_date), new Date());

                  return (
                     <div
                       key={gig.id}
                       className="glass-card overflow-hidden card-hover group"
                    >
                      <div className={`h-32 ${getColorClass(index)} flex items-center justify-center`}>
                        <span className="text-4xl font-display font-bold text-primary-foreground">
                          {gig.title.charAt(0)}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                            {gig.category}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {daysLeft > 0 ? `${daysLeft}d left` : "Ended"}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {gig.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                          {gig.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-warning fill-warning" />
                            <span className="font-semibold text-foreground">
                              {gig.type === "contest" ? "Contest" : "Collab"}
                            </span>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/campaigns/${gig.id}`}>View Gig</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorDashboard;