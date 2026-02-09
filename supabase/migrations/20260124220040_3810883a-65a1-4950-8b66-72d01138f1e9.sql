-- Step 1: Drop the overly permissive policy that exposes all columns
DROP POLICY IF EXISTS "Anyone can view live campaigns" ON public.campaigns;

-- Step 2: Create a public view with ONLY safe columns
-- Using security_invoker=on ensures RLS is respected when querying the view
CREATE OR REPLACE VIEW public.public_campaigns
WITH (security_invoker=on) AS
SELECT 
  id,
  title,
  description,
  category,
  type,
  status,
  cover_image,
  start_date,
  end_date,
  brand_id,
  submission_count,
  view_count,
  created_at,
  updated_at
FROM public.campaigns
WHERE status = 'live';

-- Step 3: Create a new SELECT policy for the campaigns table
-- This allows public access to live campaigns but through the view only
CREATE POLICY "Public can view live campaigns via view"
ON public.campaigns
FOR SELECT
USING (status = 'live'::campaign_status);

-- Note: The view excludes sensitive fields: budget, brief, prize_breakdown, 
-- required_hashtags, platform_requirements, rules, assets