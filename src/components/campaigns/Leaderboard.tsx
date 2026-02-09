import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  viewCount: number;
  engagementScore: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  className?: string;
}

const getPodiumHeight = (rank: number) => {
  switch (rank) {
    case 1:
      return "h-24";
    case 2:
      return "h-20";
    case 3:
      return "h-16";
    default:
      return "h-12";
  }
};

export const Leaderboard = ({ entries, className }: LeaderboardProps) => {
  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  // Reorder for podium: 2nd, 1st, 3rd
  const podiumOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Top 3 Podium */}
      {top3.length > 0 && (
        <div className="flex items-end justify-center gap-4 pt-8">
          {podiumOrder.map((entry) => {
            const actualRank = entry.rank;
            return (
              <div
                key={entry.userId}
                className="flex flex-col items-center"
              >
                {/* Avatar with medal */}
                <div className="relative mb-2">
                  <img
                    src={entry.avatar}
                    alt={entry.username}
                    className={cn(
                      "rounded-full object-cover border-2",
                      actualRank === 1 ? "w-16 h-16 border-amber-500" : "w-14 h-14 border-gray-300"
                    )}
                  />
                  <div
                    className={cn(
                      "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center",
                      actualRank === 1 ? "bg-amber-500" : actualRank === 2 ? "bg-gray-400" : "bg-orange-600"
                    )}
                  >
                    {actualRank === 1 ? (
                      <Trophy className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <span className="text-xs font-bold text-white">{actualRank}</span>
                    )}
                  </div>
                </div>

                <span className="text-sm font-medium text-foreground truncate max-w-[80px]">
                  @{entry.username}
                </span>
                <span className="text-xs text-muted-foreground">
                  {entry.viewCount.toLocaleString()} views
                </span>

                {/* Podium bar */}
                <div
                  className={cn(
                    "w-20 mt-3 rounded-t-lg flex items-center justify-center",
                    getPodiumHeight(actualRank),
                    actualRank === 1
                      ? "bg-gradient-to-t from-amber-600 to-amber-400"
                      : actualRank === 2
                      ? "bg-gradient-to-t from-gray-500 to-gray-300"
                      : "bg-gradient-to-t from-orange-700 to-orange-500"
                  )}
                >
                  <span className="text-white font-bold text-lg">{actualRank}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rest of the list */}
      {rest.length > 0 && (
        <div className="space-y-2">
          {rest.map((entry) => (
            <div
              key={entry.userId}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-colors",
                entry.isCurrentUser
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-card hover:bg-accent"
              )}
            >
              <span className="w-8 text-center font-semibold text-muted-foreground">
                #{entry.rank}
              </span>
              <img
                src={entry.avatar}
                alt={entry.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="font-medium text-foreground truncate block">
                  @{entry.username}
                  {entry.isCurrentUser && (
                    <span className="ml-2 text-xs text-primary">(You)</span>
                  )}
                </span>
                <span className="text-xs text-muted-foreground">
                  {entry.engagementScore.toFixed(1)}% engagement
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {entry.viewCount.toLocaleString()} views
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
