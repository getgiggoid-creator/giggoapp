import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// --- ENUMS & CONSTANTS ---
export enum CampaignType {
  CONTEST = "contest",
  DEAL = "deal",
  ALL = "all"
}

export enum CampaignStatus {
  DRAFT = "draft",
  LIVE = "live",
  JUDGING = "judging",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export enum SortOption {
  FOR_YOU = "for-you",
  TRENDING = "trending",
  NEW = "new",
  ENDING_SOON = "ending-soon"
}

// Public campaign type - excludes ALL sensitive fields
export interface PublicCampaign {
  id: string;
  title: string;
  description: string;
  cover_image: string | null;
  category: string;
  type: CampaignType;
  status: CampaignStatus;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  // Brand identity
  brand_name: string | null;
  brand_logo: string | null;
}

// Full campaign type - includes sensitive fields (for brand owners only)
export interface Campaign extends PublicCampaign {
  brief: string | null;
  budget: number;
  submission_count: number;
  view_count: number;
  prize_breakdown: { rank: number; amount: number; label: string }[] | null;
  required_hashtags: string[] | null;
  platform_requirements: string[] | null;
  rules: string[] | null;
  assets: { name: string; type: string; size: string }[] | null;
  brand_profiles?: {
    company_name: string;
    company_logo: string | null;
  } | null;
}

export interface CampaignFilters {
  search?: string;
  category?: string;
  type?: CampaignType | "all";
  sortBy?: SortOption;
}

// Hook for PUBLIC campaign listings - uses secure view
export const usePublicCampaigns = (filters?: CampaignFilters) => {
  return useQuery({
    queryKey: ["public-campaigns", filters],
    queryFn: async (): Promise<PublicCampaign[]> => {
      let query = supabase
        .from("public_campaigns")
        .select("*");

      // Filter: Category
      if (filters?.category && filters.category !== "all") {
        query = query.eq("category", filters.category);
      }

      // Filter: Type
      if (filters?.type && filters.type !== CampaignType.ALL) {
        query = query.eq("type", filters.type);
      }

      // Filter: Search
      if (filters?.search && filters.search.trim()) {
        const searchTerm = filters.search.trim();
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply sorting
      switch (filters?.sortBy) {
        case SortOption.ENDING_SOON:
          query = query.order("end_date", { ascending: true });
          break;
        case SortOption.NEW:
        case SortOption.FOR_YOU:
        case SortOption.TRENDING:
        default:
          query = query.order("created_at", { ascending: false });
          break;
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching public campaigns:", error);
        throw error;
      }

      return (data as unknown as PublicCampaign[]) || [];
    },
  });
};

// Hook for BRAND OWNER campaigns - uses full table
export const useBrandCampaigns = () => {
  return useQuery({
    queryKey: ["brand-campaigns"],
    queryFn: async (): Promise<Campaign[]> => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching brand campaigns:", error);
        throw error;
      }

      return (data || []).map(campaign => ({
        ...campaign,
        brand_name: null,
        brand_logo: null,
      })) as unknown as Campaign[];
    },
  });
};

// Hook for PUBLIC single campaign view
export const usePublicCampaign = (id: string | undefined) => {
  return useQuery({
    queryKey: ["public-campaign", id],
    queryFn: async (): Promise<PublicCampaign | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("public_campaigns")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching public campaign:", error);
        throw error;
      }

      return data as unknown as PublicCampaign | null;
    },
    enabled: !!id,
  });
};

// Hook for BRAND OWNER single campaign
export const useBrandCampaign = (id: string | undefined) => {
  return useQuery({
    queryKey: ["brand-campaign", id],
    queryFn: async (): Promise<Campaign | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching brand campaign:", error);
        throw error;
      }

      if (!data) return null;
      
      return {
        ...data,
        brand_name: null,
        brand_logo: null,
      } as unknown as Campaign;
    },
    enabled: !!id,
  });
};

// Type for creating a new campaign
export interface CreateCampaignInput {
  title: string;
  description: string;
  brief?: string;
  category: string;
  type: CampaignType;
  budget: number;
  prize_breakdown?: { rank: number; amount: number; label: string }[];
  start_date: string;
  end_date: string;
  required_hashtags?: string[];
  platform_requirements?: string[];
  rules?: string[];
  cover_image?: string;
  status?: CampaignStatus;
}

// Hook to CREATE a new campaign
export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (input: CreateCampaignInput): Promise<Campaign> => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to create a campaign");
      }

      const { data, error } = await supabase
        .from("campaigns")
        .insert([{
          brand_id: user.id,
          title: input.title,
          description: input.description,
          brief: input.brief || null,
          category: input.category,
          type: input.type as "contest" | "deal",
          budget: input.budget,
          prize_breakdown: input.prize_breakdown || [],
          start_date: input.start_date,
          end_date: input.end_date,
          required_hashtags: input.required_hashtags || [],
          platform_requirements: input.platform_requirements || [],
          rules: input.rules || [],
          cover_image: input.cover_image || null,
          status: (input.status || CampaignStatus.DRAFT) as "draft" | "live" | "judging" | "completed" | "cancelled",
        }])
        .select()
        .single();

      if (error) {
        console.error("Error creating campaign:", error);
        throw error;
      }

      return {
        ...data,
        brand_name: null,
        brand_logo: null,
      } as unknown as Campaign;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand-campaigns"] });
      toast({
        title: "Gig Created! 🎉",
        description: "Your gig has been saved and is ready to go live.",
      });
      navigate("/dashboard/brand");
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create gig",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
};