import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PortfolioItem {
  type: "video" | "tiktok";
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface PublicCreatorProfile {
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  categories: string[] | null;
  social_connections: Record<string, unknown> | null;
  portfolio_items: PortfolioItem[];
  is_public: boolean;
}

async function fetchCreatorByUsername(
  username: string
): Promise<PublicCreatorProfile | null> {
  // First find the profile by username
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("user_id, username, full_name, avatar_url, bio")
    .eq("username", username)
    .maybeSingle();

  if (profileError) throw profileError;
  if (!profile) return null;

  // Then fetch the creator profile
  const { data: creator, error: creatorError } = await supabase
    .from("creator_profiles")
    .select("categories, social_connections, portfolio_items, is_public")
    .eq("user_id", profile.user_id)
    .eq("is_public", true)
    .maybeSingle();

  if (creatorError) throw creatorError;
  if (!creator) return null;

  const portfolioItems = Array.isArray(creator.portfolio_items)
    ? (creator.portfolio_items as unknown as PortfolioItem[])
    : [];

  return {
    username: profile.username ?? username,
    full_name: profile.full_name,
    avatar_url: profile.avatar_url,
    bio: profile.bio,
    categories: creator.categories,
    social_connections: creator.social_connections as Record<string, unknown> | null,
    portfolio_items: portfolioItems,
    is_public: creator.is_public,
  };
}

export function usePublicCreatorProfile(username: string | undefined) {
  return useQuery({
    queryKey: ["public-creator", username],
    queryFn: () => fetchCreatorByUsername(username!),
    enabled: !!username,
    staleTime: 60_000,
  });
}
