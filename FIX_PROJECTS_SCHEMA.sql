-- Run this in your Supabase SQL Editor to fix the missing column error

ALTER TABLE public.internal_projects 
ADD COLUMN IF NOT EXISTS created_by uuid references public.profiles(id);

-- Also ensuring description is there if it wasn't already
ALTER TABLE public.internal_projects 
ADD COLUMN IF NOT EXISTS description text;
