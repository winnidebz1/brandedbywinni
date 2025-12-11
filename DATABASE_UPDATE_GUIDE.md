# Database Schema Update Guide

## New Fields Added

This update adds two new fields to your Supabase database:

### 1. Projects Table
- **project_url** (text, optional): Live website URL or project link

### 2. Testimonials Table
- **profile_image** (text, optional): Profile picture (base64 or URL)

## How to Update Your Database

### Option 1: Run SQL in Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com
2. Select your project
3. Click on "SQL Editor" in the left sidebar
4. Copy and paste the following SQL:

```sql
-- Add project_url to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS project_url text;

-- Add profile_image to testimonials table
ALTER TABLE public.testimonials 
ADD COLUMN IF NOT EXISTS profile_image text;
```

5. Click "Run" to execute the SQL

### Option 2: Re-run the Full Schema

Alternatively, you can run the updated `supabase_schema.sql` file which now includes these fields.

## What's New

### Admin Panel Updates:
1. **Projects Page**:
   - New "Project URL" field for adding live website links
   - Multiple image upload support for project galleries
   - Image preview and removal functionality

2. **Testimonials Page**:
   - New "Profile Picture" upload field
   - Live preview of uploaded profile pictures
   - Fallback to initials if no picture is uploaded

### Frontend Updates:
1. **Project Detail Pages**:
   - New `/project/:slug` route
   - Displays cover image, problem/solution, and all gallery images
   - "View Live Project" button if URL is provided
   - SEO optimized with meta tags

2. **Testimonials Section**:
   - Star ratings displayed at the bottom of each review
   - Profile pictures shown with client info
   - Fallback to initials if no profile picture

3. **Portfolio Section**:
   - All projects are now clickable
   - Links to individual project detail pages

## Testing

After updating the database:
1. Log into the admin panel
2. Edit an existing project and add a project URL
3. Upload additional images to the gallery
4. Edit a testimonial and upload a profile picture
5. View the changes on the main website

## Notes

- All new fields are optional (nullable)
- Existing data will not be affected
- Images are stored as base64 strings in the database
- For better performance with many images, consider using Supabase Storage in the future
