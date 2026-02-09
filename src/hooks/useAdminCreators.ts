import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AdminCreator {
  id: string;
  user_id: string;
  categories: string[] | null;
  portfolio_items: unknown[];
  social_connections: Record<string, unknown> | null;
  is_public: boolean;
  verification_status: string;
  created_at: string;
  // joined from profiles
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
}

async function fetchAllCreators(): Promise<AdminCreator[]> {
  // Fetch creator profiles
  const { data: creators, error: creatorsError } = await supabase
    .from("creator_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (creatorsError) throw creatorsError;
  if (!creators || creators.length === 0) return [];

  // Fetch profiles for all creator user_ids
  const userIds = creators.map((c) => c.user_id);
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("user_id, full_name, username, avatar_url, bio")
    .in("user_id", userIds);

  if (profilesError) throw profilesError;

  const profileMap = new Map(
    (profiles ?? []).map((p) => [p.user_id, p])
  );

  return creators.map((c) => {
    const profile = profileMap.get(c.user_id);
    const portfolioItems = Array.isArray(c.portfolio_items)
      ? c.portfolio_items
      : [];

    return {
      id: c.id,
      user_id: c.user_id,
      categories: c.categories,
      portfolio_items: portfolioItems,
      social_connections: c.social_connections as Record<string, unknown> | null,
      is_public: c.is_public,
      verification_status: (c as Record<string, unknown>).verification_status as string ?? "pending",
      created_at: c.created_at,
      full_name: profile?.full_name ?? null,
      username: profile?.username ?? null,
      avatar_url: profile?.avatar_url ?? null,
      bio: profile?.bio ?? null,
    };
  });
}

export function useAdminCreators() {
  return useQuery({
    queryKey: ["admin-creators"],
    queryFn: fetchAllCreators,
    staleTime: 30_000,
  });
}

export function useUpdateVerificationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      creatorId,
      status,
    }: {
      creatorId: string;
      status: string;
    }) => {
      const { error } = await supabase
        .from("creator_profiles")
        .update({ verification_status: status } as Record<string, unknown>)
        .eq("id", creatorId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-creators"] });
      const label = variables.status === "verified" ? "Verified" : "Rejected";
      toast.success(`Creator ${label} successfully`);
    },
    onError: (error) => {
      toast.error(`Failed to update status: ${error.message}`);
    },
  });
}
