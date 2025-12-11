-- RUN THIS IN SUPABASE SQL EDITOR
-- This adds the missing columns to your database

-- Add project_url to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS project_url text;

-- Add profile_image to testimonials table
ALTER TABLE public.testimonials 
ADD COLUMN IF NOT EXISTS profile_image text;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'projects' 
  AND column_name = 'project_url';

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'testimonials' 
  AND column_name = 'profile_image';
