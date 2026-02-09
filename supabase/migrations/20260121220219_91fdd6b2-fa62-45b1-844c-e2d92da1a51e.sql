-- Create campaign_type enum (if not exists)
DO $$ BEGIN
  CREATE TYPE public.campaign_type AS ENUM ('contest', 'deal');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create campaign_status enum (if not exists)
DO $$ BEGIN
  CREATE TYPE public.campaign_status AS ENUM ('draft', 'live', 'judging', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create campaigns table
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  brief TEXT,
  cover_image TEXT,
  category TEXT NOT NULL,
  type campaign_type NOT NULL DEFAULT 'contest',
  status campaign_status NOT NULL DEFAULT 'draft',
  budget NUMERIC(10,2) NOT NULL DEFAULT 0,
  prize_breakdown JSONB DEFAULT '[]'::jsonb,
  required_hashtags TEXT[] DEFAULT '{}',
  platform_requirements TEXT[] DEFAULT '{}',
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  rules TEXT[] DEFAULT '{}',
  assets JSONB DEFAULT '[]'::jsonb,
  submission_count INTEGER NOT NULL DEFAULT 0,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on campaigns
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- RLS Policies for campaigns
-- Anyone can view live campaigns (for browsing)
CREATE POLICY "Anyone can view live campaigns"
  ON public.campaigns
  FOR SELECT
  TO public
  USING (status = 'live');

-- Brands can view all their own campaigns (any status)
CREATE POLICY "Brands can view all their own campaigns"
  ON public.campaigns
  FOR SELECT
  USING (auth.uid() = brand_id);

-- Brands can create campaigns
CREATE POLICY "Brands can create campaigns"
  ON public.campaigns
  FOR INSERT
  WITH CHECK (auth.uid() = brand_id AND public.has_role(auth.uid(), 'brand'));

-- Brands can update their own campaigns
CREATE POLICY "Brands can update their own campaigns"
  ON public.campaigns
  FOR UPDATE
  USING (auth.uid() = brand_id AND public.has_role(auth.uid(), 'brand'));

-- Brands can delete their own draft campaigns
CREATE POLICY "Brands can delete their draft campaigns"
  ON public.campaigns
  FOR DELETE
  USING (auth.uid() = brand_id AND status = 'draft');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for faster querying
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON public.campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_category ON public.campaigns(category);
CREATE INDEX IF NOT EXISTS idx_campaigns_brand_id ON public.campaigns(brand_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_end_date ON public.campaigns(end_date);