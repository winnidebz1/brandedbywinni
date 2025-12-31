-- OPTION 1: FIX THE SPECIFIC USER (Run this in Supabase SQL Editor)
-- Replace 'intern@example.com' with the actual email address
UPDATE auth.users
SET email_confirmed_at = now()
WHERE email = 'intern@example.com';

-- OPTION 2: PREVENT THIS FOR FUTURE USERS (Recommended for Internal Portals)
/*
1. Go to your Supabase Dashboard.
2. Click on "Authentication" (icon on the left).
3. Click on "Providers" -> "Email".
4. Toggle OFF "Confirm email".
5. Click Save.

Now, any new user you create will be able to log in immediately without clicking a link.
*/
