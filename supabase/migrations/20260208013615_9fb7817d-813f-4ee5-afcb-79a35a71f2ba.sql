
-- Add is_public column to creator_profiles
ALTER TABLE public.creator_profiles
ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT true;

-- Convert portfolio_items from text[] to jsonb
-- First drop the old column, then add as jsonb
ALTER TABLE public.creator_profiles
DROP COLUMN IF EXISTS portfolio_items;

ALTER TABLE public.creator_profiles
ADD COLUMN portfolio_items jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Add public read RLS policy for creator_profiles (anyone can view public profiles)
CREATE POLICY "Anyone can view public creator profiles"
ON public.creator_profiles
FOR SELECT
USING (is_public = true);

-- Add public read RLS policy for profiles (anyone can view profiles of public creators)
CREATE POLICY "Anyone can view profiles of public creators"
ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.creator_profiles cp
    WHERE cp.user_id = profiles.user_id
    AND cp.is_public = true
  )
);
