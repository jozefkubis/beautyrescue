begin;

create extension if not exists pgcrypto;

create type public.service_item_type as enum (
  'service',
  'product',
  'category',
  'content'
);

create table public.service_items (
  id uuid primary key default gen_random_uuid(),

  slug text not null,
  name text not null,
  summary text,
  description text,
  image_url text,

  gallery jsonb not null default '[]'::jsonb,

  item_type public.service_item_type not null,
  category text,
  subcategory text,

  is_active boolean not null default true,
  sort_order integer not null default 0,

  content jsonb not null default '{}'::jsonb,
  attributes jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint service_items_slug_not_blank check (length(btrim(slug)) > 0),
  constraint service_items_name_not_blank check (length(btrim(name)) > 0),
  constraint service_items_content_is_object check (jsonb_typeof(content) = 'object'),
  constraint service_items_attributes_is_object check (jsonb_typeof(attributes) = 'object'),
  constraint service_items_metadata_is_object check (jsonb_typeof(metadata) = 'object')
);

create unique index service_items_slug_uidx on public.service_items (slug);
create index service_items_item_type_idx on public.service_items (item_type);
create index service_items_category_idx on public.service_items (category);
create index service_items_subcategory_idx on public.service_items (subcategory);
create index service_items_category_subcategory_idx on public.service_items (category, subcategory);
create index service_items_active_sort_idx on public.service_items (is_active, sort_order);

create index service_items_gallery_gin_idx on public.service_items using gin (gallery);
create index service_items_content_gin_idx on public.service_items using gin (content);
create index service_items_attributes_gin_idx on public.service_items using gin (attributes);
create index service_items_metadata_gin_idx on public.service_items using gin (metadata);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_service_items_set_updated_at
before update on public.service_items
for each row
execute function public.set_updated_at();

alter table public.service_items enable row level security;

create policy "service_items_select_public"
on public.service_items
for select
to anon, authenticated
using (is_active = true);

commit;