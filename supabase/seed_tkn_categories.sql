-- Seed pre public.tkn_categories
--
-- TKN kategorie drzime jednoducho a prehladne:
-- title + text + image + poradie + aktivita.
--
-- `text` je plain text zlozeny zo `summary`, `description`,
-- `content` a `attributes`, bez povodnej JSON struktury.

-- Volitelne pri cistom resete:
-- truncate table public.tkn_categories restart identity cascade;

insert into public.tkn_categories (
  slug,
  title,
  text,
  image_url,
  is_active,
  order_index
)
select
  si.subcategory as slug,
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
  coalesce(si.sort_order, 0) as order_index
from public.service_items si
where si.item_type = 'category'
  and si.category = 'tkn'
order by si.sort_order, si.name
on conflict (slug) do update set
  title = excluded.title,
  text = excluded.text,
  image_url = excluded.image_url,
  is_active = excluded.is_active,
  order_index = excluded.order_index;
