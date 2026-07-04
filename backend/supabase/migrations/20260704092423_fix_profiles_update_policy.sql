-- The previous update policy's with_check referenced the profiles table from
-- within a policy ON profiles, causing "infinite recursion detected in policy
-- for relation profiles" (HTTP 500) on any update. Replace it with a simple,
-- recursion-free policy, and enforce role immutability via a trigger instead.

drop policy if exists "Users can update their own profile (except role)" on public.profiles;

-- Simple, recursion-free policy: a user may update their own row.
create policy "Users can update their own profile"
  on public.profiles
  for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Enforce role immutability for normal users via a trigger instead of RLS.
-- SECURITY INVOKER (default) so current_user reflects the caller:
-- 'authenticated'/'anon' for app users, 'service_role' for the trusted backend.
create or replace function public.enforce_profile_role_immutable()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.role is distinct from old.role and current_user <> 'service_role' then
    raise exception 'Changing role is not allowed';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_role_immutable on public.profiles;
create trigger profiles_role_immutable
  before update on public.profiles
  for each row execute function public.enforce_profile_role_immutable();
