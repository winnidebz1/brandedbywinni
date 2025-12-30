-- Function to automatically create a profile for new users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    -- Try to get full name from metadata, fallback to email username if missing
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'team_member' -- Default role is ALWAYS team_member (safe)
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to execute the function on every new sign-up
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
