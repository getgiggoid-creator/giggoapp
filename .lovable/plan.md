
# Create `public_assets` Storage Bucket

## Problem Identified
The onboarding flows (Brand and Creator) attempt to upload files to a bucket called `public_assets`, but **this bucket doesn't exist**. Only the `submissions` bucket exists.

This causes upload failures for:
- **Brand logos** (`brand-logos/` folder)
- **Creator avatars** (`avatars/` folder)
- **Portfolio items** (`portfolio/` folder)

---

## Solution

Create a database migration to add the `public_assets` bucket with appropriate RLS policies.

### Migration Details

| Setting | Value |
|---------|-------|
| **Bucket Name** | `public_assets` |
| **Public Access** | Yes (for serving images) |
| **File Size Limit** | 5MB (suitable for images) |
| **Allowed MIME Types** | `image/jpeg`, `image/png`, `image/webp`, `image/gif` |

### Folder Structure & Permissions

| Folder | Owner | Upload Permission |
|--------|-------|-------------------|
| `brand-logos/` | Brands | Brands can upload/update their own |
| `avatars/` | Any User | Users upload their own (by user_id) |
| `portfolio/` | Creators | Creators can upload/update their own |

---

## Technical Implementation

### Step 1: Create Storage Bucket Migration

```sql
-- Create public_assets bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public_assets',
  'public_assets',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);
```

### Step 2: RLS Policies

**Public Read Access:**
```sql
CREATE POLICY "Public can view all assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'public_assets');
```

**Upload Policies (by folder):**

1. **Brands upload to `brand-logos/`**:
   ```sql
   CREATE POLICY "Brands can upload brand logos"
   ON storage.objects FOR INSERT
   WITH CHECK (
     bucket_id = 'public_assets'
     AND (storage.foldername(name))[1] = 'brand-logos'
     AND public.has_role(auth.uid(), 'brand')
   );
   ```

2. **Authenticated users upload to `avatars/`**:
   ```sql
   CREATE POLICY "Users can upload their avatar"
   ON storage.objects FOR INSERT
   WITH CHECK (
     bucket_id = 'public_assets'
     AND (storage.foldername(name))[1] = 'avatars'
     AND auth.uid() IS NOT NULL
   );
   ```

3. **Creators upload to `portfolio/`**:
   ```sql
   CREATE POLICY "Creators can upload portfolio items"
   ON storage.objects FOR INSERT
   WITH CHECK (
     bucket_id = 'public_assets'
     AND (storage.foldername(name))[1] = 'portfolio'
     AND public.has_role(auth.uid(), 'creator')
   );
   ```

**Update & Delete Policies:**
- Users can update/delete files where their user_id is in the filename prefix

---

## Files to Create

| File | Purpose |
|------|---------|
| `supabase/migrations/[timestamp]_create_public_assets_bucket.sql` | Storage bucket + RLS policies |

---

## Testing After Implementation

1. **Brand Onboarding**: Upload company logo → should succeed
2. **Creator Onboarding**: Upload avatar → should succeed
3. **Creator Portfolio**: Add portfolio images → should succeed
4. All uploaded images should be publicly accessible via URL
