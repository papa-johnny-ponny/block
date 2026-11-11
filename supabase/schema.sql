-- BLOCK. sync: one row per user holding the app's saved state.
-- Run once in the Supabase SQL editor.

create table if not exists public.block_state (
  user_id    uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Only the signed-in owner can see or change their row.
alter table public.block_state enable row level security;

grant select, insert, update on public.block_state to authenticated;

create policy "own row: read" on public.block_state
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "own row: insert" on public.block_state
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "own row: update" on public.block_state
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
