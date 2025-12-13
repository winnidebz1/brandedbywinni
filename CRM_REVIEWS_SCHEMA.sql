-- Create Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  reviewer_name text not null,
  brand_name text,
  service text,
  review_text text,
  rating integer check (rating >= 1 and rating <= 5),
  status text default 'Pending' check (status in ('Pending', 'Approved', 'Hidden')),
  is_public_permission boolean default false
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policies
-- Public can insert (submit reviews)
CREATE POLICY "Public can submit reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- Admin can view all
CREATE POLICY "Admin can view reviews" ON public.reviews FOR SELECT USING (auth.role() = 'authenticated');

-- Admin can update/delete
CREATE POLICY "Admin can update reviews" ON public.reviews FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete reviews" ON public.reviews FOR DELETE USING (auth.role() = 'authenticated');

-- Public can view APPROVED reviews only (for the website testimonials section)
CREATE POLICY "Public can view approved reviews" ON public.reviews FOR SELECT USING (status = 'Approved');
