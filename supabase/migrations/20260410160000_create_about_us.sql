begin;

create extension if not exists pgcrypto;

create table if not exists public.about_us (
  id uuid primary key default gen_random_uuid(),

  slug text not null default 'about-us',
  title text not null,
  quote text,
  quote_author text,
  body_intro text,
  body_team text,
  body_services text,
  body_philosophy text,
  image_url text,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint about_us_slug_not_blank check (length(btrim(slug)) > 0),
  constraint about_us_title_not_blank check (length(btrim(title)) > 0)
);

create unique index if not exists about_us_slug_uidx
  on public.about_us (slug);

create index if not exists about_us_active_idx
  on public.about_us (is_active);

-- Pouzijeme rovnaky trigger na updated_at ako v ostatnych tabulkach.
drop trigger if exists trg_about_us_set_updated_at on public.about_us;
create trigger trg_about_us_set_updated_at
before update on public.about_us
for each row
execute function public.set_updated_at();

alter table public.about_us enable row level security;

drop policy if exists "about_us_select_public" on public.about_us;
create policy "about_us_select_public"
on public.about_us
for select
to anon, authenticated
using (is_active = true);

-- Prenesieme existujuci obsah O nas zo stareho `service_items`,
-- aby bola nova tabulka hned pripravena na pouzitie.
insert into public.about_us (
  slug,
  title,
  quote,
  quote_author,
  body_intro,
  body_team,
  body_services,
  body_philosophy,
  image_url,
  is_active
)
select
  si.slug,
  si.name,
  si.summary,
  si.metadata ->> 'quoteAuthor',
  si.content ->> 'bodyIntro',
  si.content ->> 'bodyTeam',
  si.content ->> 'bodyServices',
  si.content ->> 'bodyPhilosophy',
  si.image_url,
  coalesce(si.is_active, true)
from public.service_items si
where si.slug = 'about-us'
on conflict (slug) do update set
  title = excluded.title,
  quote = excluded.quote,
  quote_author = excluded.quote_author,
  body_intro = excluded.body_intro,
  body_team = excluded.body_team,
  body_services = excluded.body_services,
  body_philosophy = excluded.body_philosophy,
  image_url = excluded.image_url,
  is_active = excluded.is_active;

commit;
