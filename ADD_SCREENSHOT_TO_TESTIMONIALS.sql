
-- Run this SQL command in your Supabase SQL Editor to enable screenshot uploads for testimonials

ALTER TABLE public.testimonials 
ADD COLUMN screenshot text;

-- Optional: If you want to allow larger screenshot data (though 'text' usually holds base64 fine)
-- 'text' is sufficient for base64 strings in Postgres.
