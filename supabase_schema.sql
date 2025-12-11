-- RUN THIS IN SUPABASE SQL EDITOR
-- This script is safe to run multiple times

-- 1. Create Tables (IF NOT EXISTS)

-- LEADS TABLE (Inquiries)
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text,
  service text,
  message text,
  status text default 'new' check (status in ('new', 'contacted', 'closed'))
);

-- PROJECTS TABLE (Portfolio)
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text unique not null,
  category text not null,
  problem text,
  solution text,
  cover_image text,
  images text[], -- Array of image URLs
  project_url text, -- Live project URL
  seo_keywords text[],
  client_industry text
);

-- TESTIMONIALS TABLE
create table if not exists public.testimonials (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  client_name text not null,
  role text,
  content text not null,
  rating integer default 5,
  profile_image text -- Profile picture (base64 or URL)
);

-- 2. Enable Row Level Security (RLS)
alter table public.leads enable row level security;
alter table public.projects enable row level security;
alter table public.testimonials enable row level security;

-- 3. Drop existing policies if they exist (to avoid conflicts)
drop policy if exists "Public can submit leads" on public.leads;
drop policy if exists "Admin can view leads" on public.leads;
drop policy if exists "Admin can update leads" on public.leads;
drop policy if exists "Public can view projects" on public.projects;
drop policy if exists "Admin can manage projects" on public.projects;
drop policy if exists "Public can view testimonials" on public.testimonials;
drop policy if exists "Admin can manage testimonials" on public.testimonials;

-- 4. Create Policies

-- Leads: Everyone can create (submit form), Only Auth users can view/update
create policy "Public can submit leads" on public.leads for insert with check (true);
create policy "Admin can view leads" on public.leads for select using (auth.role() = 'authenticated');
create policy "Admin can update leads" on public.leads for update using (auth.role() = 'authenticated');

-- Projects: Everyone can view, Only Auth users can insert/update/delete
create policy "Public can view projects" on public.projects for select using (true);
create policy "Admin can manage projects" on public.projects for all using (auth.role() = 'authenticated');

-- Testimonials: Everyone can view, Only Auth users can insert/update/delete
create policy "Public can view testimonials" on public.testimonials for select using (true);
create policy "Admin can manage testimonials" on public.testimonials for all using (auth.role() = 'authenticated');

-- 4. Storage Buckets
-- You need to create a bucket named 'portfolio' and 'uploads' in the Storage dashboard manually or via script if supported.
-- Policy for Storage:
-- "Give public read access" to 'portfolio'
-- "Give auth write access" to 'portfolio'
