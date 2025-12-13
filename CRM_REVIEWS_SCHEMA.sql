-- Add necessary columns to existing testimonials table or create if missing
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  client_name text not null,
  role text, -- Acts as Brand/Business Name
  content text,
  rating integer default 5,
  profile_image text,
  screenshot text
);

-- Add enhancements for CRM Review features
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS service text;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS status text default 'Pending' check (status in ('Pending', 'Approved', 'Hidden'));
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS is_public_permission boolean default false;

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Policies

-- 1. Public can submit reviews (INSERT)
-- Drop existing insert policy if it exists to clean up
DROP POLICY IF EXISTS "Public can insert testimonials" ON public.testimonials;
CREATE POLICY "Public can submit testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);

-- 2. Admin can view ALL (SELECT)
DROP POLICY IF EXISTS "Admin can view all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.testimonials; -- Clean potential old policy
CREATE POLICY "Admin can view all testimonials" ON public.testimonials FOR SELECT USING (auth.role() = 'authenticated');

-- 3. Admin can update/delete
DROP POLICY IF EXISTS "Admin can update testimonials" ON public.testimonials;
CREATE POLICY "Admin can update testimonials" ON public.testimonials FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin can delete testimonials" ON public.testimonials;
CREATE POLICY "Admin can delete testimonials" ON public.testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- 4. Public can view APPROVED testimonials only (SELECT)
DROP POLICY IF EXISTS "Public can view approved testimonials" ON public.testimonials;
CREATE POLICY "Public can view approved testimonials" ON public.testimonials FOR SELECT USING (status = 'Approved');
