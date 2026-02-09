-- 1. Create enums for application and shipping status
CREATE TYPE public.application_status AS ENUM ('applied', 'shortlisted', 'hired', 'rejected', 'completed');
CREATE TYPE public.shipping_status AS ENUM ('needs_address', 'processing', 'shipped', 'delivered', 'issue');
CREATE TYPE public.product_type AS ENUM ('physical', 'digital');

-- 2. Add new columns to campaigns table
ALTER TABLE public.campaigns
ADD COLUMN product_type public.product_type DEFAULT 'digital',
ADD COLUMN usage_rights jsonb DEFAULT '{"type": "organic", "duration": "perpetual"}'::jsonb;

-- 3. Create applications table (Creator-to-Campaign relationship)
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  creator_id uuid NOT NULL,
  status public.application_status NOT NULL DEFAULT 'applied',
  
  -- Shipping logistics
  shipping_status public.shipping_status DEFAULT NULL,
  tracking_number text,
  courier_name text,
  shipping_address_snapshot jsonb,
  
  -- Metadata
  applied_at timestamp with time zone NOT NULL DEFAULT now(),
  hired_at timestamp with time zone,
  completed_at timestamp with time zone,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  
  -- Prevent duplicate applications
  UNIQUE(campaign_id, creator_id)
);

-- 4. Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for Creators
CREATE POLICY "Creators can view their own applications"
  ON public.applications FOR SELECT
  USING (auth.uid() = creator_id);

CREATE POLICY "Creators can apply to campaigns"
  ON public.applications FOR INSERT
  WITH CHECK (
    auth.uid() = creator_id 
    AND has_role(auth.uid(), 'creator'::app_role)
    AND EXISTS (
      SELECT 1 FROM public.campaigns 
      WHERE id = campaign_id AND status = 'live'
    )
  );

CREATE POLICY "Creators can update their own application details"
  ON public.applications FOR UPDATE
  USING (
    auth.uid() = creator_id 
    AND status IN ('applied', 'hired')
  );

-- 6. RLS Policies for Brands
CREATE POLICY "Brands can view applications for their campaigns"
  ON public.applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.campaigns 
      WHERE id = campaign_id AND brand_id = auth.uid()
    )
  );

CREATE POLICY "Brands can update applications for their campaigns"
  ON public.applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.campaigns 
      WHERE id = campaign_id AND brand_id = auth.uid()
    )
    AND has_role(auth.uid(), 'brand'::app_role)
  );

-- 7. Trigger for updated_at
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Auto-set shipping_status when hired for physical product campaigns
CREATE OR REPLACE FUNCTION public.handle_application_hired()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- When status changes to 'hired', set hired_at and check if shipping is needed
  IF NEW.status = 'hired' AND OLD.status != 'hired' THEN
    NEW.hired_at = now();
    
    -- Check if campaign has physical product
    IF EXISTS (
      SELECT 1 FROM public.campaigns 
      WHERE id = NEW.campaign_id AND product_type = 'physical'
    ) THEN
      NEW.shipping_status = 'needs_address';
    END IF;
  END IF;
  
  -- When status changes to 'completed', set completed_at
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.completed_at = now();
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_application_status_change
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION public.handle_application_hired();