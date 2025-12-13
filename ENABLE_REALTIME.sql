-- Enable Realtime for Dashboard Tables
-- Run this in Supabase SQL Editor to allow the dashboard to update instantly.

-- 1. Add tables to the realtime publication
-- This tells Supabase to broadcast changes (INSERT, UPDATE, DELETE) to these tables.
alter publication supabase_realtime add table leads;
alter publication supabase_realtime add table site_visits;
alter publication supabase_realtime add table testimonials; -- For Review updates too

-- 2. Verify settings (Optional comment)
-- If this fails with "publication does not exist", your project might be very new or custom config.
-- In that case, create it first:
-- create publication supabase_realtime;
