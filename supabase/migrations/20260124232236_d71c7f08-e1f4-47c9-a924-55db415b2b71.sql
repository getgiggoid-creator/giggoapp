-- Create enum for submission status
CREATE TYPE public.submission_status AS ENUM (
  'submitted',
  'redo_requested',
  'approved',
  'declined'
);

-- Create submissions table
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Video content
  video_url TEXT,
  caption TEXT,
  hashtags TEXT[] DEFAULT '{}',
  platform_url TEXT,
  
  -- Status workflow
  status public.submission_status NOT NULL DEFAULT 'submitted',
  redo_count INTEGER NOT NULL DEFAULT 0,
  
  -- Feedback from brand
  brand_feedback TEXT,
  feedback_timestamp TIMESTAMP WITH TIME ZONE,
  decline_reason TEXT,
  
  -- Timestamps
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Constraint: max 3 redos
  CONSTRAINT max_redo_count CHECK (redo_count <= 3)
);

-- Create index for faster lookups
CREATE INDEX idx_submissions_campaign_id ON public.submissions(campaign_id);
CREATE INDEX idx_submissions_creator_id ON public.submissions(creator_id);
CREATE INDEX idx_submissions_status ON public.submissions(status);

-- Enable RLS
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Creators can view their own submissions
CREATE POLICY "Creators can view their own submissions"
ON public.submissions
FOR SELECT
USING (auth.uid() = creator_id);

-- Creators can create submissions (must be creator role and campaign must be live)
CREATE POLICY "Creators can submit to live campaigns"
ON public.submissions
FOR INSERT
WITH CHECK (
  auth.uid() = creator_id 
  AND has_role(auth.uid(), 'creator'::app_role)
  AND EXISTS (
    SELECT 1 FROM public.campaigns 
    WHERE id = campaign_id 
    AND status = 'live'::campaign_status
  )
);

-- Creators can update their own submissions (only video content, not status)
CREATE POLICY "Creators can update their own submission content"
ON public.submissions
FOR UPDATE
USING (
  auth.uid() = creator_id 
  AND status IN ('submitted'::submission_status, 'redo_requested'::submission_status)
);

-- Brands can view submissions for their campaigns
CREATE POLICY "Brands can view submissions for their campaigns"
ON public.submissions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.campaigns
    WHERE campaigns.id = submissions.campaign_id
    AND campaigns.brand_id = auth.uid()
  )
);

-- Brands can update submission status (approve, decline, request redo)
CREATE POLICY "Brands can review submissions for their campaigns"
ON public.submissions
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.campaigns
    WHERE campaigns.id = submissions.campaign_id
    AND campaigns.brand_id = auth.uid()
  )
  AND has_role(auth.uid(), 'brand'::app_role)
);

-- Trigger to update updated_at
CREATE TRIGGER update_submissions_updated_at
BEFORE UPDATE ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to increment submission_count on campaigns when a new submission is created
CREATE OR REPLACE FUNCTION public.increment_submission_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.campaigns
  SET submission_count = submission_count + 1
  WHERE id = NEW.campaign_id;
  RETURN NEW;
END;
$$;

-- Trigger to increment campaign submission count
CREATE TRIGGER on_submission_created
AFTER INSERT ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.increment_submission_count();