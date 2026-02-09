import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, CheckCircle2, MapPin } from "lucide-react";
import { toast } from "sonner";
import type { PublicCreatorProfile } from "@/hooks/usePublicCreatorProfile";

interface Props {
  creator: PublicCreatorProfile;
}

const CreatorProfileHeader = ({ creator }: Props) => {
  const initials = (creator.full_name ?? creator.username)
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const socials = creator.social_connections as Record<string, { followers?: number; username?: string }> | null;
  const tiktokFollowers = socials?.tiktok?.followers;
  const igFollowers = socials?.instagram?.followers;

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${creator.full_name} on Giggo`, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link disalin ke clipboard!");
      }
    } catch {
      // User cancelled share
    }
  };

  const formatFollowers = (n?: number) => {
    if (!n) return null;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
  };

  return (
    <header className="flex flex-col items-center pt-8 pb-6">
      {/* Avatar */}
      <div className="relative">
        <Avatar className="w-28 h-28 border-4 border-card shadow-xl ring-2 ring-border/30">
          <AvatarImage
            src={creator.avatar_url ?? undefined}
            alt={creator.full_name ?? ""}
            className="object-cover"
          />
          <AvatarFallback className="text-3xl font-bold bg-muted text-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        {/* Verified badge */}
        <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-0.5 shadow-md">
          <CheckCircle2 className="w-7 h-7 text-[hsl(210,100%,56%)] fill-[hsl(210,100%,56%)]" />
        </div>
      </div>

      {/* Name & Handle */}
      <h1 className="mt-5 text-2xl font-bold text-foreground tracking-tight">
        {creator.full_name ?? creator.username}
      </h1>
      <p className="text-sm text-muted-foreground font-medium">@{creator.username}</p>

      {/* Bio */}
      {creator.bio && (
        <p className="mt-3 text-sm text-center text-muted-foreground leading-relaxed max-w-xs line-clamp-3">
          {creator.bio}
        </p>
      )}

      {/* Category Tags */}
      {creator.categories && creator.categories.length > 0 && (
        <div className="flex gap-2 flex-wrap justify-center mt-4">
          {creator.categories.slice(0, 4).map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="text-xs capitalize rounded-full px-3 py-1 bg-muted text-muted-foreground font-medium"
            >
              {cat}
            </Badge>
          ))}
        </div>
      )}

      {/* Stats Row */}
      <div className="flex items-center gap-3 mt-5">
        {tiktokFollowers && (
          <StatPill icon="🎵" label="TikTok" value={formatFollowers(tiktokFollowers)!} />
        )}
        {igFollowers && (
          <StatPill icon="📸" label="Instagram" value={formatFollowers(igFollowers)!} />
        )}
        {!tiktokFollowers && !igFollowers && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span>Indonesia</span>
          </div>
        )}
      </div>

      {/* Share */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="mt-5 gap-2 rounded-full px-5 text-muted-foreground hover:text-foreground"
      >
        <Share2 className="w-4 h-4" />
        Bagikan Profil
      </Button>
    </header>
  );
};

const StatPill = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border/50">
    <span className="text-sm">{icon}</span>
    <div className="flex flex-col">
      <span className="text-sm font-bold text-foreground leading-tight">{value}</span>
      <span className="text-[10px] text-muted-foreground leading-tight">{label}</span>
    </div>
  </div>
);

export default CreatorProfileHeader;
