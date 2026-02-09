import { useParams } from "react-router-dom";
import { usePublicCreatorProfile } from "@/hooks/usePublicCreatorProfile";
import CreatorProfileHeader from "@/components/creators/CreatorProfileHeader";
import CreatorPortfolioGrid from "@/components/creators/CreatorPortfolioGrid";
import CreatorFloatingCTA from "@/components/creators/CreatorFloatingCTA";
import CreatorProfileSkeleton from "@/components/creators/CreatorProfileSkeleton";
import CreatorNotFound from "@/components/creators/CreatorNotFound";
import { EmptyState } from "@/components/shared/EmptyState";
import { Video } from "lucide-react";

const PublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { data: creator, isLoading, error } = usePublicCreatorProfile(username);

  if (isLoading) return <CreatorProfileSkeleton />;
  if (error || !creator) return <CreatorNotFound username={username} />;

  const hasPortfolio = creator.portfolio_items.length > 0;

  return (
    <div className="min-h-screen bg-[hsl(210,20%,98%)] dark:bg-background">
      {/* Giggo branding top bar */}
      <div className="w-full py-3 text-center border-b border-border/50">
        <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          giggo.id
        </span>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-28">
        <CreatorProfileHeader creator={creator} />

        {hasPortfolio ? (
          <CreatorPortfolioGrid
            items={creator.portfolio_items}
            creatorName={creator.full_name ?? creator.username}
            creatorUsername={creator.username}
          />
        ) : (
          <EmptyState
            type="custom"
            icon={Video}
            title="Belum ada portfolio"
            description="Kreator ini belum mengupload video. Cek kembali nanti!"
          />
        )}

        {/* Rating placeholder */}
        <div className="mt-10 mb-6 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-yellow-400 text-lg">★</span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">5.0 · Kreator Baru</span>
        </div>

        {/* Footer */}
        <div className="text-center pb-4">
          <p className="text-[10px] text-muted-foreground/60">
            Powered by <span className="font-semibold">Giggo.id</span>
          </p>
        </div>
      </div>

      <CreatorFloatingCTA
        name={creator.full_name ?? creator.username}
        username={creator.username}
      />
    </div>
  );
};

export default PublicProfile;
