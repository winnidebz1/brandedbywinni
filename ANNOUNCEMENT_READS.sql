-- Add a column to track when the user last viewed announcements
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_announcement_view TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Policy is likely already set for users to update their own profile, but just in case:
-- CHECK (auth.uid() = id) for UPDATE is standard.
