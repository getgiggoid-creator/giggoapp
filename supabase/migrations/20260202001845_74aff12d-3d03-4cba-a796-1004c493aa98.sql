-- =============================================
-- Create public_assets Storage Bucket
-- =============================================
-- This bucket stores public images for:
-- - Brand logos (brand-logos/)
-- - User avatars (avatars/)
-- - Creator portfolio items (portfolio/)

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public_assets',
  'public_assets',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- =============================================
-- RLS Policies for public_assets bucket
-- =============================================

-- 1. Public read access for all objects in the bucket
CREATE POLICY "Public can view all public_assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'public_assets');

-- 2. Brands can upload to brand-logos/ folder
CREATE POLICY "Brands can upload brand logos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'public_assets'
  AND (storage.foldername(name))[1] = 'brand-logos'
  AND public.has_role(auth.uid(), 'brand')
);

-- 3. Authenticated users can upload to avatars/ folder
CREATE POLICY "Users can upload their avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'public_assets'
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid() IS NOT NULL
);

-- 4. Creators can upload to portfolio/ folder
CREATE POLICY "Creators can upload portfolio items"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'public_assets'
  AND (storage.foldername(name))[1] = 'portfolio'
  AND public.has_role(auth.uid(), 'creator')
);

-- 5. Users can update their own files (filename starts with their user_id)
CREATE POLICY "Users can update their own files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'public_assets'
  AND auth.uid()::text = (string_to_array(name, '-'))[1]
);

-- 6. Users can delete their own files (filename starts with their user_id)
CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'public_assets'
  AND auth.uid()::text = (string_to_array(name, '-'))[1]
);