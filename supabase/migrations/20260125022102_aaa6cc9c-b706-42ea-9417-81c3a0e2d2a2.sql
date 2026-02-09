-- Drop the existing view
DROP VIEW IF EXISTS public.public_campaigns;

-- Recreate with privacy-safe columns and brand anonymization
CREATE OR REPLACE VIEW public.public_campaigns
WITH (security_invoker=on) AS
SELECT 
  c.id,
  c.title,
  c.description,
  c.category,
  c.type,
  c.status,
  c.cover_image,
  c.start_date,
  c.end_date,
  c.created_at,
  c.updated_at,
  -- Anonymized brand identity (name/logo only, no UUID)
  bp.company_name AS brand_name,
  bp.company_logo AS brand_logo
FROM public.campaigns c
LEFT JOIN public.brand_profiles bp ON bp.user_id = c.brand_id
WHERE c.status = 'live'::campaign_status;