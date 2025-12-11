
-- Run this in Supabase SQL Editor to enable analytics

CREATE TABLE IF NOT EXISTS public.site_visits (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    page_path TEXT,
    country TEXT,
    device_type TEXT
);

-- Enable RLS
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Allow anyone to track a visit (Insert only)
CREATE POLICY "Public insert access" ON public.site_visits FOR INSERT WITH CHECK (true);

-- Allow only admins to view stats
CREATE POLICY "Admin view access" ON public.site_visits FOR SELECT USING (auth.role() = 'authenticated');
