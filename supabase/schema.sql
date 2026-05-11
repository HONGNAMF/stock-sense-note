create table if not exists public.sensefolio_notes (
  local_user_id text primary key,
  nickname text not null unique,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sensefolio_notes_nickname_idx
  on public.sensefolio_notes (nickname);

alter table public.sensefolio_notes enable row level security;

drop policy if exists "sensefolio_notes_public_mvp_select" on public.sensefolio_notes;
drop policy if exists "sensefolio_notes_public_mvp_insert" on public.sensefolio_notes;
drop policy if exists "sensefolio_notes_public_mvp_update" on public.sensefolio_notes;

create policy "sensefolio_notes_public_mvp_select"
  on public.sensefolio_notes
  for select
  using (true);

create policy "sensefolio_notes_public_mvp_insert"
  on public.sensefolio_notes
  for insert
  with check (true);

create policy "sensefolio_notes_public_mvp_update"
  on public.sensefolio_notes
  for update
  using (true)
  with check (true);

create or replace function public.set_sensefolio_notes_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists sensefolio_notes_set_updated_at on public.sensefolio_notes;

create trigger sensefolio_notes_set_updated_at
before update on public.sensefolio_notes
for each row
execute function public.set_sensefolio_notes_updated_at();
