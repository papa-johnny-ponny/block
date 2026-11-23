-- BLOCK. program packs: the bought programs, kept out of the public repo.
-- One row per creator pack. Any signed-in user can read and write them; sign-ups
-- are disabled, so that is only you. Run once in the Supabase SQL editor.

create table if not exists public.block_packs (
  id         text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.block_packs enable row level security;

grant select, insert, update, delete on public.block_packs to authenticated;

create policy "packs: read when signed in" on public.block_packs
  for select to authenticated using (true);

create policy "packs: add when signed in" on public.block_packs
  for insert to authenticated with check (true);

create policy "packs: update when signed in" on public.block_packs
  for update to authenticated using (true) with check (true);

create policy "packs: delete when signed in" on public.block_packs
  for delete to authenticated using (true);
