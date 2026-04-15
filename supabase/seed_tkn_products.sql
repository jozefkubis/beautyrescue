-- Seed pre public.tkn_products
--
-- Tento seed treba pustit az po `seed_tkn_categories.sql`,
-- pretoze kazdy produkt sa napaja na kategoriu cez `category_id`.
--
-- `category_id` = foreign key na `public.tkn_categories(id)`.
-- `text` je plain text zlozeny zo `summary`, `description`,
-- `content` a `attributes`, bez povodnej JSON struktury.

-- Volitelne pri cistom resete:
-- truncate table public.tkn_products restart identity cascade;

insert into public.tkn_products (
  category_id,
  slug,
  title,
  text,
  image_url,
  is_active,
  order_index,
  name,
  summary,
  description,
  subcategory,
  sort_order,
  content,
  attributes,
  metadata
)
select
  tc.id as category_id,
  coalesce(nullif(si.metadata ->> 'original_product_slug', ''), si.slug) as slug,
  si.name as title,
  nullif(
    trim(
      concat_ws(
        E'\n\n',
        nullif(si.summary, ''),
        nullif(si.description, ''),
        (
          select string_agg(value, E'\n\n')
          from jsonb_array_elements_text(
            jsonb_path_query_array(coalesce(si.content, '{}'::jsonb), '$.** ? (@.type() == "string")')
          ) as extracted(value)
        ),
        (
          select string_agg(value, E'\n\n')
          from jsonb_array_elements_text(
            jsonb_path_query_array(coalesce(si.attributes, '{}'::jsonb), '$.** ? (@.type() == "string")')
          ) as extracted(value)
        )
      )
    ),
    ''
  ) as text,
  si.image_url,
  coalesce(si.is_active, true) as is_active,
  coalesce(si.sort_order, 0) as order_index,
  si.name as name,
  nullif(si.summary, '') as summary,
  nullif(si.description, '') as description,
  si.subcategory,
  coalesce(si.sort_order, 0) as sort_order,
  coalesce(si.content, '{}'::jsonb) as content,
  coalesce(si.attributes, '{}'::jsonb) as attributes,
  coalesce(si.metadata, '{}'::jsonb) as metadata
from public.service_items si
join public.tkn_categories tc
  on tc.slug = si.subcategory
where si.item_type = 'product'
  and si.category = 'tkn'
  and si.subcategory is not null
order by tc.order_index, si.sort_order, si.name
on conflict (slug) do update set
  category_id = excluded.category_id,
  title = excluded.title,
  text = excluded.text,
  image_url = excluded.image_url,
  is_active = excluded.is_active,
  order_index = excluded.order_index,
  name = excluded.name,
  summary = excluded.summary,
  description = excluded.description,
  subcategory = excluded.subcategory,
  sort_order = excluded.sort_order,
  content = excluded.content,
  attributes = excluded.attributes,
  metadata = excluded.metadata;
