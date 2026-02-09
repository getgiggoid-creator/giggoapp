import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  X,
  ExternalLink,
  Search,
  Users,
  LogOut,
  Shield,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCreators, useUpdateVerificationStatus } from "@/hooks/useAdminCreators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type FilterTab = "all" | "pending" | "verified" | "rejected";

const statusBadgeClass: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  verified: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-600 border-red-500/20",
};

const CreatorManagement = () => {
  const { user, signOut } = useAuth();
  const { data: creators, isLoading } = useAdminCreators();
  const updateStatus = useUpdateVerificationStatus();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered = useMemo(() => {
    if (!creators) return [];
    return creators.filter((c) => {
      const matchesTab =
        activeTab === "all" || c.verification_status === activeTab;
      const matchesSearch =
        !search ||
        (c.full_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (c.username ?? "").toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [creators, activeTab, search]);

  const counts = useMemo(() => {
    if (!creators) return { all: 0, pending: 0, verified: 0, rejected: 0 };
    return {
      all: creators.length,
      pending: creators.filter((c) => c.verification_status === "pending").length,
      verified: creators.filter((c) => c.verification_status === "verified").length,
      rejected: creators.filter((c) => c.verification_status === "rejected").length,
    };
  }, [creators]);

  const getSocialUrl = (
    social: Record<string, unknown> | null,
    platform: string
  ): string | null => {
    if (!social) return null;
    const entry = social[platform];
    if (typeof entry === "string") return entry;
    if (entry && typeof entry === "object" && "url" in (entry as Record<string, unknown>)) {
      return (entry as Record<string, unknown>).url as string;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">Giggo Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <Link
            to="/admin/creators"
            className="flex items-center gap-3 px-3 py-2 rounded-md bg-accent text-accent-foreground text-sm font-medium"
          >
            <Users className="w-4 h-4" />
            Creator List
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                A
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.email}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Creator Management</h1>
            <p className="text-sm text-muted-foreground">
              Vet, verify, and manage creator profiles
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as FilterTab)}
          className="mb-6"
        >
          <TabsList>
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
            <TabsTrigger value="verified">Verified ({counts.verified})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({counts.rejected})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Creator</TableHead>
                <TableHead>Niche</TableHead>
                <TableHead>Portfolio</TableHead>
                <TableHead>Socials</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No creators found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((creator, idx) => (
                  <TableRow
                    key={creator.id}
                    className={idx % 2 === 0 ? "" : "bg-muted/30"}
                  >
                    {/* User */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          {creator.avatar_url ? (
                            <AvatarImage src={creator.avatar_url} />
                          ) : null}
                          <AvatarFallback className="text-xs">
                            {(creator.full_name ?? "?")[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm leading-tight">
                            {creator.full_name ?? "—"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            @{creator.username ?? "—"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Niche */}
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {creator.categories?.slice(0, 3).map((cat) => (
                          <Badge
                            key={cat}
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0"
                          >
                            {cat}
                          </Badge>
                        )) ?? (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Portfolio */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {creator.portfolio_items.length} Videos
                        </span>
                        {creator.username && (
                          <Link
                            to={`/c/${creator.username}`}
                            target="_blank"
                            className="text-primary hover:underline"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </TableCell>

                    {/* Socials */}
                    <TableCell>
                      <div className="flex gap-2 text-xs">
                        {getSocialUrl(creator.social_connections, "tiktok") ? (
                          <a
                            href={getSocialUrl(creator.social_connections, "tiktok")!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            TikTok
                          </a>
                        ) : null}
                        {getSocialUrl(creator.social_connections, "instagram") ? (
                          <a
                            href={getSocialUrl(creator.social_connections, "instagram")!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            IG
                          </a>
                        ) : null}
                        {!getSocialUrl(creator.social_connections, "tiktok") &&
                          !getSocialUrl(creator.social_connections, "instagram") && (
                            <span className="text-muted-foreground">—</span>
                          )}
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                          statusBadgeClass[creator.verification_status] ??
                          statusBadgeClass.pending
                        }`}
                      >
                        {creator.verification_status.charAt(0).toUpperCase() +
                          creator.verification_status.slice(1)}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {creator.verification_status !== "verified" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
                            disabled={updateStatus.isPending}
                            onClick={() =>
                              updateStatus.mutate({
                                creatorId: creator.id,
                                status: "verified",
                              })
                            }
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        {creator.verification_status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                            disabled={updateStatus.isPending}
                            onClick={() =>
                              updateStatus.mutate({
                                creatorId: creator.id,
                                status: "rejected",
                              })
                            }
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                        {creator.username && (
                          <Button size="sm" variant="ghost" asChild>
                            <Link
                              to={`/c/${creator.username}`}
                              target="_blank"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default CreatorManagement;
