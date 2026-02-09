import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

// Types
export type SubmissionStatus = "submitted" | "redo_requested" | "approved" | "declined";

export interface Submission {
  id: string;
  campaign_id: string;
  creator_id: string;
  video_url: string | null;
  caption: string | null;
  hashtags: string[];
  platform_url: string | null;
  status: SubmissionStatus;
  redo_count: number;
  brand_feedback: string | null;
  feedback_timestamp: string | null;
  decline_reason: string | null;
  submitted_at: string;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubmissionWithCampaign extends Submission {
  campaigns?: {
    id: string;
    title: string;
    cover_image: string | null;
    status: string;
    end_date: string;
  };
}

export interface SubmissionWithCreator extends Submission {
  profiles?: {
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  };
}

// Hook: Fetch creator's own submissions
export const useCreatorSubmissions = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["submissions", "creator", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("submissions")
        .select(`
          *,
          campaigns (
            id,
            title,
            cover_image,
            status,
            end_date
          )
        `)
        .eq("creator_id", user.id)
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      return data as unknown as SubmissionWithCampaign[];
    },
    enabled: !!user?.id,
  });
};

// Hook: Fetch submissions for a specific campaign (for brands)
export const useCampaignSubmissions = (campaignId: string | undefined) => {
  return useQuery({
    queryKey: ["submissions", "campaign", campaignId],
    queryFn: async () => {
      if (!campaignId) return [];

      // ✅ OPTIMIZED: Single Query with Join instead of multiple requests
      const { data, error } = await supabase
        .from("submissions")
        .select(`
          *,
          profiles (
            user_id,
            full_name,
            username,
            avatar_url
          )
        `)
        .eq("campaign_id", campaignId)
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      
      // Supabase returns the joined data automatically structure
      return data as unknown as SubmissionWithCreator[];
    },
    enabled: !!campaignId,
  });
};

// Hook: Create a new submission
export const useCreateSubmission = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (submission: {
      campaign_id: string;
      video_url?: string;
      caption?: string;
      hashtags?: string[];
      platform_url?: string;
    }) => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("submissions")
        .insert({
          campaign_id: submission.campaign_id,
          video_url: submission.video_url,
          caption: submission.caption,
          hashtags: submission.hashtags,
          platform_url: submission.platform_url,
          creator_id: user.id,
          status: "submitted" as SubmissionStatus,
        })
        .select()
        .maybeSingle();

      if (!data) throw new Error("Failed to create submission");

      if (error) throw error;
      return data as Submission;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast({
        title: "Submission created",
        description: "Your entry has been submitted successfully!",
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

// Hook: Update submission (for creators resubmitting after redo request)
export const useUpdateSubmission = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      video_url,
      caption,
      hashtags,
      platform_url,
    }: {
      id: string;
      video_url?: string;
      caption?: string;
      hashtags?: string[];
      platform_url?: string;
    }) => {
      const { data, error } = await supabase
        .from("submissions")
        .update({
          video_url,
          caption,
          hashtags,
          platform_url,
          status: "submitted" as SubmissionStatus,
          submitted_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .maybeSingle();

      if (!data) throw new Error("Failed to update submission");

      if (error) throw error;
      return data as Submission;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast({
        title: "Submission updated",
        description: "Your revised entry has been submitted!",
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

// Hook: Brand reviews submission (approve, decline, request redo)
export const useReviewSubmission = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      action,
      feedback,
      decline_reason,
    }: {
      id: string;
      action: "approve" | "decline" | "request_redo";
      feedback?: string;
      decline_reason?: string;
    }) => {
      // First get current submission to check redo count
      const { data: currentSubmission, error: fetchError } = await supabase
        .from("submissions")
        .select("redo_count")
        .eq("id", id)
        .maybeSingle();

      if (!currentSubmission) throw new Error("Submission not found");

      if (fetchError) throw fetchError;

      const updateData: Partial<Submission> = {
        reviewed_at: new Date().toISOString(),
      };

      switch (action) {
        case "approve":
          updateData.status = "approved";
          break;
        case "decline":
          updateData.status = "declined";
          updateData.decline_reason = decline_reason || null;
          break;
        case "request_redo":
          if (currentSubmission.redo_count >= 3) {
            throw new Error("Maximum redo count (3) reached");
          }
          updateData.status = "redo_requested";
          updateData.brand_feedback = feedback || null;
          updateData.feedback_timestamp = new Date().toISOString();
          updateData.redo_count = currentSubmission.redo_count + 1;
          break;
      }

      const { data, error } = await supabase
        .from("submissions")
        .update(updateData)
        .eq("id", id)
        .select()
        .maybeSingle();

      if (!data) throw new Error("Failed to update submission review");

      if (error) throw error;
      return data as Submission;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      
      const messages = {
        approve: "Submission approved!",
        decline: "Submission declined.",
        request_redo: "Redo requested. Creator will be notified.",
      };
      
      toast({
        title: "Review submitted",
        description: messages[variables.action],
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

// Hook: Get single submission
export const useSubmission = (id: string | undefined) => {
  return useQuery({
    queryKey: ["submissions", id],
    queryFn: async () => {
      if (!id) throw new Error("Submission ID is required");

      const { data, error } = await supabase
        .from("submissions")
        .select(`
          *,
          campaigns (
            id,
            title,
            cover_image,
            status,
            end_date
          )
        `)
        .eq("id", id)
        .maybeSingle();

      if (!data) throw new Error("Submission not found");

      if (error) throw error;
      return data as SubmissionWithCampaign;
    },
    enabled: !!id,
  });
};