-- Profiles table: one row per auth user, holding app-level data (display name, role).
-- Lives in the public schema (yours); auth.users stays Supabase-managed.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Auto-create a profile when a user's email is confirmed.
-- Fires on INSERT (covers the case where email confirmation is disabled, so the
-- user is created already-confirmed) and on UPDATE (the normal flow: the row is
-- inserted unconfirmed at signup, then email_confirmed_at is set when the user
-- clicks the confirmation link). on conflict do nothing keeps it idempotent.
-- ---------------------------------------------------------------------------
create or replace function public.handle_email_confirmed()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.email_confirmed_at is not null
     and (tg_op = 'INSERT' or old.email_confirmed_at is null) then
    insert into public.profiles (id, display_name)
    values (new.id, new.raw_user_meta_data ->> 'display_name')
    on conflict (id) do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_confirmed
  after insert or update on auth.users
  for each row execute function public.handle_email_confirmed();

-- The function is only meant to run as a trigger. Because it is SECURITY DEFINER
-- and lives in the public schema, PostgREST would otherwise expose it as a
-- callable RPC to anon/authenticated. Revoke EXECUTE so clients can't call it.
revoke execute on function public.handle_email_confirmed() from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security: without this, the public anon key could read/write every
-- row from the browser. With it, Postgres checks a policy per row.
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

-- A user can read only their own profile.
create policy "Profiles are viewable by the owner"
  on public.profiles
  for select
  using ((select auth.uid()) = id);

-- A user can update their own profile, but NOT change their role:
-- the with check requires the new role to equal the currently stored role,
-- so normal users can't escalate themselves. The service_role key (used from a
-- trusted backend) bypasses RLS entirely and can still change roles.
create policy "Users can update their own profile (except role)"
  on public.profiles
  for update
  using ((select auth.uid()) = id)
  with check (
    (select auth.uid()) = id
    and role = (select p.role from public.profiles p where p.id = (select auth.uid()))
  );

-- Note: no INSERT policy on purpose — rows are created only by the
-- security-definer trigger above (which bypasses RLS), not by clients.
