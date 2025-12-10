# Branded By Winni - Admin Dashboard Setup Guide

This project now includes a fully functional CMS, Admin Dashboard, and Lead Management system powered by Supabase.

## 1. Supabase Setup (Backend)

1.  **Create an Account**: Go to [Supabase.com](https://supabase.com) and create a free account.
2.  **New Project**: Create a new project named "BrandedByWinni".
3.  **Get Credentials**:
    *   Go to **Project Settings** -> **API**.
    *   Copy the `Project URL` and `anon public` key.
4.  **Connect to App**:
    *   Rename `.env.example` to `.env` in your project root.
    *   Paste the URL and Key into this file.
    
    ```env
    VITE_SUPABASE_URL=your_project_url_here
    VITE_SUPABASE_ANON_KEY=your_key_here
    ```

## 2. Database Setup

1.  Go to the **SQL Editor** in your Supabase Dashboard.
2.  Open the file `supabase_schema.sql` from your project folder.
3.  Copy the entire content and paste it into the Supabase SQL Editor.
4.  Click **Run**. This will create your Tables (Projects, Leads, Testimonials) and Security Policies.

## 3. Storage Setup (Images)

1.  Go to **Storage** in Supabase.
2.  Create a new bucket named `portfolio`.
3.  Make sure it is set to **Public**.
4.  (Optional) Create another public bucket named `uploads` if needed.

## 4. Admin Access

Since this is a private dashboard, we disabled public sign-ups.

1.  Go to **Authentication** -> **Users** in Supabase.
2.  Click **Add User** -> **Create New User**.
3.  Enter your email (e.g., `admin@brandedbywinni.com`) and a strong password.
4.  **Important**: By default, I have enabled Row Level Security so only authenticated users can edit content. Since you are the only user, this secures your dashboard.

## 5. Using the Dashboard

1.  Start your app: `npm run dev`
2.  Go to `http://localhost:5173/admin/login`
3.  Login with the credentials you created in Step 4.

### Features:
*   **Projects**: Add case studies with before/after descriptions and upload cover images.
*   **Leads**: View inquiries from the Chatbot and Contact Form. Export them as CSV.
*   **Testimonials**: Manage client reviews.
*   **Chatbot**: The floating chat widget automatically saves leads to the `leads` table.

## 6. SEO & Performance

*   **SEO**: Each page is optimized with standard Meta tags. The Home page uses the `SEO` component.
*   **Performance**: 
    *   Images uploaded to Supabase are served via CDN.
    *   The app uses lazy loading for routes.

## Troubleshooting

*   **Login fails?** Check your `.env` file and ensure the user exists in Supabase.
*   **Images not loading?** Ensure the `portfolio` bucket is Public in Supabase Storage settings.
