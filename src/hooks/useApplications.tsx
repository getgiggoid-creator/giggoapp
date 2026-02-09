import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type ApplicationStatus = Database["public"]["Enums"]["application_status"];
type ShippingStatus = Database["public"]["Enums"]["shipping_status"];

export interface Application {
  id: string;
  campaign_id: string;
  creator_id: string;
  status: ApplicationStatus;
  shipping_status: ShippingStatus | null;
  tracking_number: string | null;
  courier_name: string | null;
  shipping_address_snapshot: {
    address_line1?: string;
    address_line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  } | null;
  applied_at: string;
  hired_at: string | null;
  completed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  campaigns?: {
    title: string;
    end_date?: string;
    product_type?: Database["public"]["Enums"]["product_type"] | null;
  } | null;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
    username: string | null;
  } | null;
}

// Fetch applications for brand's campaigns (hired status for shipping)
export const useBrandHiredApplications = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["brand-hired-applications", user?.id],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");

      // First get brand's campaigns
      const { data: campaigns, error: campaignError } = await supabase
        .from("campaigns")
        .select("id, title, product_type")
        .eq("brand_id", user.id);

      if (campaignError) throw campaignError;
      if (!campaigns || campaigns.length === 0) return [];

      const campaignIds = campaigns.map((c) => c.id);

      // Then get applications for those campaigns with 'hired' status
      const { data: applications, error: appError } = await supabase
        .from("applications")
        .select("*")
        .in("campaign_id", campaignIds)
        .eq("status", "hired")
        .order("hired_at", { ascending: false });

      if (appError) throw appError;

      // Fetch creator profiles separately
      const creatorIds = [...new Set(applications?.map((a) => a.creator_id) || [])];
      
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, avatar_url, username")
        .in("user_id", creatorIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) || []);
      const campaignMap = new Map(campaigns.map((c) => [c.id, c]));

      // Combine data
      return (applications || []).map((app) => ({
        ...app,
        campaigns: campaignMap.get(app.campaign_id) || null,
        profiles: profileMap.get(app.creator_id) || null,
      })) as Application[];
    },
    enabled: !!user,
  });
};

// Update shipping details (mark as shipped)
export const useUpdateShipping = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      applicationId,
      courierName,
      trackingNumber,
    }: {
      applicationId: string;
      courierName: string;
      trackingNumber: string;
    }) => {
      const { data, error } = await supabase
        .from("applications")
        .update({
          shipping_status: "shipped",
          courier_name: courierName,
          tracking_number: trackingNumber,
        })
        .eq("id", applicationId)
        .select()
        .maybeSingle();

      if (!data) throw new Error("Failed to update shipping");

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand-hired-applications", user?.id] });
      toast({
        title: "Shipment Updated",
        description: "The item has been marked as shipped.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Update shipping status only
export const useUpdateShippingStatus = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      applicationId,
      shippingStatus,
    }: {
      applicationId: string;
      shippingStatus: ShippingStatus;
    }) => {
      const { data, error } = await supabase
        .from("applications")
        .update({
          shipping_status: shippingStatus,
        })
        .eq("id", applicationId)
        .select()
        .maybeSingle();

      if (!data) throw new Error("Failed to update shipping status");

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand-hired-applications", user?.id] });
      toast({
        title: "Status Updated",
        description: "Shipping status has been updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Creator hooks
export const useCreatorApplications = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["creator-applications", user?.id],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("creator_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch campaign details
      const campaignIds = [...new Set(data?.map((a) => a.campaign_id) || [])];
      
      const { data: campaigns } = await supabase
        .from("public_campaigns")
        .select("id, title, end_date")
        .in("id", campaignIds);

      const campaignMap = new Map(campaigns?.map((c) => [c.id, c]) || []);

      return (data || []).map((app) => ({
        ...app,
        campaigns: campaignMap.get(app.campaign_id) || null,
      })) as Application[];
    },
    enabled: !!user,
  });
};
