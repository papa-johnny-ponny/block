-- BLOCK. calendar: lets the block-cal function read the plan and record skips.
-- Run once in the Supabase SQL editor, after schema.sql.

-- Skips tapped in a calendar event wait here until the app folds them into the plan.
alter table public.block_state add column if not exists cal_skips jsonb not null default '{}'::jsonb;

-- Both functions answer only to the secret key in the subscription link,
-- and only touch the calendar part of the row.
create or replace function public.block_cal_feed(tok text) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object('cal', data->'cal', 'skips', cal_skips)
  from public.block_state
  where length(tok) = 32 and data->'cal'->>'key' = tok
  limit 1;
$$;

create or replace function public.block_cal_skip(tok text, item text) returns boolean
language sql security definer set search_path = public as $$
  update public.block_state
     set cal_skips = cal_skips || jsonb_build_object(item, (extract(epoch from now()) * 1000)::bigint)
   where length(tok) = 32 and length(item) between 1 and 60 and data->'cal'->>'key' = tok
  returning true;
$$;

revoke all on function public.block_cal_feed(text) from public;
revoke all on function public.block_cal_skip(text, text) from public;
grant execute on function public.block_cal_feed(text) to anon, authenticated;
grant execute on function public.block_cal_skip(text, text) to anon, authenticated;
