
-- Add verification_status to creator_profiles
ALTER TABLE public.creator_profiles 
ADD COLUMN IF NOT EXISTS verification_status text NOT NULL DEFAULT 'pending' 
CHECK (verification_status IN ('pending', 'verified', 'rejected'));

-- Admin can view all creator profiles
CREATE POLICY "Admins can view all creator profiles"
ON public.creator_profiles
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Admin can update all creator profiles
CREATE POLICY "Admins can update all creator profiles"
ON public.creator_profiles
FOR UPDATE
USING (public.is_admin(auth.uid()));

-- Admin can view all profiles (for joining)
-- Already exists, skip if error
