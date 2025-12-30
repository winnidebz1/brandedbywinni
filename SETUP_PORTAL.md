# Portal Setup Instructions

## 1. Database Setup
To enable the portal functionality, you need to create the necessary tables in your Supabase project.

1. Go to your Supabase Dashboard -> **SQL Editor**.
2. Click **New Query**.
3. Copy and paste the contents of `PORTAL_SCHEMA.sql` (located in your project root).
4. Click **Run**.

## 2. Storage Setup
The portal uses Supabase Storage for Brand Assets and Task uploads.

1. Go to **Storage** in Supabase.
2. Create a new bucket named `portal_uploads`.
3. Set it to **Public** (or keep private and use signed URLs, but Public is easier for assets).
4. Add a policy to allow authenticated users to Upload and Select.

## 3. Creating Admin User
Since the `profiles` table is new, your existing user might not have a profile.

1. In Supabase **Table Editor**, go to `auth.users` to find your User ID (UUID).
2. Go to `public.profiles` table.
3. Insert a new row:
   - `id`: [Your User UUID]
   - `role`: `founder`
   - `full_name`: Winni (or your name)
   - `email`: [Your Email]

## 4. Onboarding Logic
The portal assumes users have a profile. You should create a Trigger to automatically create a profile when a new user signs up, or handle it in your Sign Up flow.

### Example Trigger (Optional):
```sql
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'team_member');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 5. Deployment
Push your changes to Git and deploy to Vercel.
`git add .`
`git commit -m "Added Internal Portal"`
`git push`
