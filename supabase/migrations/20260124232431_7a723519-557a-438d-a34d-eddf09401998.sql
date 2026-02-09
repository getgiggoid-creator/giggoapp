-- Create storage bucket for video uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'submissions', 
  'submissions', 
  true,
  104857600, -- 100MB in bytes
  ARRAY['video/mp4', 'video/quicktime', 'video/webm']
);

-- RLS Policies for submissions bucket

-- Anyone can view videos (public bucket)
CREATE POLICY "Public can view submission videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'submissions');

-- Creators can upload their own videos (folder structure: creator_id/filename)
CREATE POLICY "Creators can upload their own videos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'submissions' 
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND public.has_role(auth.uid(), 'creator'::app_role)
);

-- Creators can update their own videos
CREATE POLICY "Creators can update their own videos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'submissions' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Creators can delete their own videos
CREATE POLICY "Creators can delete their own videos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'submissions' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);