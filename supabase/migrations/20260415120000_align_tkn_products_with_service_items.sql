-- TKN produkty nechavame v samostatnej tabulke,
-- ale doplnime im rovnake datove polia ako maju produkty v service_items.
-- Kategorii sa tato zmena netyka.

alter table public.tkn_products
  add column if not exists name text,
  add column if not exists summary text,
  add column if not exists description text,
  add column if not exists subcategory text,
  add column if not exists sort_order integer,
  add column if not exists content jsonb default '{}'::jsonb,
  add column if not exists attributes jsonb default '{}'::jsonb,
  add column if not exists metadata jsonb default '{}'::jsonb;

-- Pre existujuce zaznamy doplnime hodnoty z povodnych service_items,
-- aby sa frontend neskor vedel napajat na uz hotove data priamo z DB.
update public.tkn_products tp
set
  name = si.name,
  summary = si.summary,
  description = si.description,
  subcategory = si.subcategory,
  sort_order = coalesce(si.sort_order, tp.order_index),
  content = coalesce(si.content, '{}'::jsonb),
  attributes = coalesce(si.attributes, '{}'::jsonb),
  metadata = coalesce(si.metadata, '{}'::jsonb)
from public.service_items si
where si.category = 'tkn'
  and si.item_type = 'product'
  and coalesce(nullif(si.metadata ->> 'original_product_slug', ''), si.slug) = tp.slug;

-- Fallback pre pripady, ked produkt este nema naplnene nove polia.
update public.tkn_products
set
  name = coalesce(name, title),
  sort_order = coalesce(sort_order, order_index),
  content = coalesce(content, '{}'::jsonb),
  attributes = coalesce(attributes, '{}'::jsonb),
  metadata = coalesce(metadata, '{}'::jsonb);
