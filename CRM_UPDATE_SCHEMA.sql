-- RUN THIS IN SUPABASE SQL EDITOR TO SUPPORT NEW CRM FEATURES

-- 1. Enhance Leads Table
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS source text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS social_handle text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS industry text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS last_contact_date timestamp with time zone;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS company_name text;

-- 2. Create Outreach Logs Table
CREATE TABLE IF NOT EXISTS public.outreach_logs (
  id uuid default gen_random_uuid() primary key,
  lead_id uuid references public.leads(id) on delete cascade,
  type text check (type in ('DM', 'Email', 'WhatsApp', 'Call')),
  sent_at timestamp with time zone default timezone('utc'::text, now()) not null,
  subject text,
  content text,
  response_received boolean default false,
  outcome text
);

-- 3. Create Links/Content Table
CREATE TABLE IF NOT EXISTS public.tracked_links (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  url text not null,
  slug text unique, -- for internal shortlinker if needed
  clicks integer default 0,
  type text -- 'Portfolio', 'Booking', 'Resource', etc.
);

-- 4. Enable Security
ALTER TABLE public.outreach_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracked_links ENABLE ROW LEVEL SECURITY;

-- 5. Policies
CREATE POLICY "Admin can manage outreach" ON public.outreach_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage links" ON public.tracked_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public can view links" ON public.tracked_links FOR SELECT USING (true); -- If used publicly
