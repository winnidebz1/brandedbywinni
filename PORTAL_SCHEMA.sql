-- 1. Profiles Table (for Roles)
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text default 'team_member' check (role in ('founder', 'team_member')),
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Internal Projects (distinct from Portfolio Projects)
create table if not exists public.internal_projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  client_name text,
  status text default 'active' check (status in ('active', 'completed', 'on_hold')),
  description text,
  deadline timestamp with time zone
);

-- 3. Tasks
create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  assigned_to uuid references public.profiles(id),
  project_id uuid references public.internal_projects(id),
  deadline timestamp with time zone,
  priority text default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  status text default 'to_do' check (status in ('to_do', 'in_progress', 'review', 'approved')),
  sop_link text, -- URL or ID of related SOP
  asset_url text, -- For uploaded work
  comments text, -- Could be a JSON array or separate table. Simple text for now or JSONB.
  created_by uuid references public.profiles(id)
);

-- 4. SOPs
create table if not exists public.sops (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  category text not null, -- e.g., 'Company Overview', 'Design', 'Content'
  content text, -- Markdown or HTML
  video_url text,
  required_role text default 'team_member', -- Who must read this
  is_micro_sop boolean default false
);

-- 5. SOP Reads (Tracking)
create table if not exists public.sop_reads (
  id uuid default gen_random_uuid() primary key,
  sop_id uuid references public.sops(id),
  user_id uuid references public.profiles(id),
  read_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(sop_id, user_id)
);

-- 6. Brand Assets
create table if not exists public.brand_assets (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  category text not null, -- 'Logo', 'Font', 'Template'
  file_url text not null,
  preview_url text
);

-- 7. Announcements
create table if not exists public.announcements (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text not null,
  is_active boolean default true,
  author_id uuid references public.profiles(id)
);

-- RLS Policies (Simplified)

-- Profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Internal Projects
alter table public.internal_projects enable row level security;
create policy "Authenticated users can view projects" on public.internal_projects for select using (auth.role() = 'authenticated');
create policy "Admins can manage projects" on public.internal_projects for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'founder')
);

-- Tasks
alter table public.tasks enable row level security;
create policy "Authenticated users can view tasks" on public.tasks for select using (auth.role() = 'authenticated');
create policy "Team members update assigned tasks" on public.tasks for update using (
  auth.uid() = assigned_to
);
create policy "Admins can manage all tasks" on public.tasks for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'founder')
);

-- SOPs
alter table public.sops enable row level security;
create policy "Authenticated users can view sops" on public.sops for select using (auth.role() = 'authenticated');
create policy "Admins can manage sops" on public.sops for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'founder')
);

-- SOP Reads
alter table public.sop_reads enable row level security;
create policy "Users manage own reads" on public.sop_reads for all using (auth.uid() = user_id);

-- Brand Assets
alter table public.brand_assets enable row level security;
create policy "View assets" on public.brand_assets for select using (auth.role() = 'authenticated');
create policy "Admins manage assets" on public.brand_assets for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'founder')
);

-- Announcements
alter table public.announcements enable row level security;
create policy "View announcements" on public.announcements for select using (auth.role() = 'authenticated');
create policy "Admins manage announcements" on public.announcements for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'founder')
);
