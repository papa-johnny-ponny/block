-- BLOCK. private program videos (e.g. the Zubalenok handstand clips).
-- A private Storage bucket that only a signed-in user can read and write;
-- sign-ups are disabled, so that is only you. Run once in the SQL editor.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('block-media', 'block-media', false, 52428800, array['video/mp4'])
on conflict (id) do nothing;

create policy "block-media: read when signed in" on storage.objects
  for select to authenticated using (bucket_id = 'block-media');

create policy "block-media: add when signed in" on storage.objects
  for insert to authenticated with check (bucket_id = 'block-media');

create policy "block-media: update when signed in" on storage.objects
  for update to authenticated using (bucket_id = 'block-media') with check (bucket_id = 'block-media');
