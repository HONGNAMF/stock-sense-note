create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  nickname text unique not null,
  profile_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  view_mode text default 'standard',
  default_broker_domestic text,
  default_broker_overseas text,
  default_broker_etf text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create table if not exists public.user_interests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  interest_tag text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_investment_profile (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  risk_level text,
  investment_period text,
  information_style text,
  interest_style text,
  buy_style text,
  review_style text,
  result_summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stock_id text not null,
  created_at timestamptz not null default now(),
  unique(user_id, stock_id)
);

create table if not exists public.custom_watch_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  market_type text,
  memo text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_stock_reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stock_id text not null,
  heart_rating integer,
  reason_watching text,
  reason_not_buying text,
  buy_intention text,
  sell_standard text,
  understanding_level text,
  hold_confidence text,
  created_at timestamptz not null default now()
);

create table if not exists public.trades (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stock_id text not null,
  trade_type text,
  trade_date date,
  price numeric,
  quantity numeric,
  reason text,
  emotion text,
  created_at timestamptz not null default now()
);

create table if not exists public.monthly_trade_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  year integer,
  month integer,
  summary text,
  report_json jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.quarterly_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  year integer,
  quarter integer,
  summary text,
  report_json jsonb,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.recommended_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stock_id text not null,
  reason text,
  category text,
  risk_level text,
  was_saved boolean default false,
  created_at timestamptz not null default now()
);

create table if not exists public.recent_glossary_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  term text not null,
  created_at timestamptz not null default now()
);

-- Legacy all-in-one snapshot table kept for migration/backward compatibility.
create table if not exists public.sensefolio_notes (
  local_user_id text primary key,
  nickname text not null unique,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_nickname_idx on public.profiles (nickname);
create index if not exists favorites_user_id_idx on public.favorites (user_id);
create index if not exists trades_user_id_idx on public.trades (user_id);
create index if not exists recommended_items_user_id_idx on public.recommended_items (user_id);
create index if not exists sensefolio_notes_nickname_idx on public.sensefolio_notes (nickname);

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.user_interests enable row level security;
alter table public.user_investment_profile enable row level security;
alter table public.favorites enable row level security;
alter table public.custom_watch_items enable row level security;
alter table public.user_stock_reflections enable row level security;
alter table public.trades enable row level security;
alter table public.monthly_trade_reviews enable row level security;
alter table public.quarterly_reports enable row level security;
alter table public.recommended_items enable row level security;
alter table public.recent_glossary_searches enable row level security;
alter table public.sensefolio_notes enable row level security;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles',
    'user_settings',
    'user_interests',
    'user_investment_profile',
    'favorites',
    'custom_watch_items',
    'user_stock_reflections',
    'trades',
    'monthly_trade_reviews',
    'quarterly_reports',
    'recommended_items',
    'recent_glossary_searches',
    'sensefolio_notes'
  ]
  loop
    execute format('drop policy if exists %I on public.%I', table_name || '_mvp_select', table_name);
    execute format('drop policy if exists %I on public.%I', table_name || '_mvp_insert', table_name);
    execute format('drop policy if exists %I on public.%I', table_name || '_mvp_update', table_name);
    execute format('drop policy if exists %I on public.%I', table_name || '_mvp_delete', table_name);
    execute format('create policy %I on public.%I for select using (true)', table_name || '_mvp_select', table_name);
    execute format('create policy %I on public.%I for insert with check (true)', table_name || '_mvp_insert', table_name);
    execute format('create policy %I on public.%I for update using (true) with check (true)', table_name || '_mvp_update', table_name);
    execute format('create policy %I on public.%I for delete using (true)', table_name || '_mvp_delete', table_name);
  end loop;
end $$;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();

drop trigger if exists user_settings_set_updated_at on public.user_settings;
create trigger user_settings_set_updated_at before update on public.user_settings for each row execute function public.set_updated_at();

drop trigger if exists user_investment_profile_set_updated_at on public.user_investment_profile;
create trigger user_investment_profile_set_updated_at before update on public.user_investment_profile for each row execute function public.set_updated_at();

drop trigger if exists sensefolio_notes_set_updated_at on public.sensefolio_notes;
create trigger sensefolio_notes_set_updated_at before update on public.sensefolio_notes for each row execute function public.set_updated_at();
