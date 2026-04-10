-- Seed pre public.services
--
-- Tento krok je zamerany len na bezne sluzby.
-- TKN kategorie a TKN produkty budeme seedovat zvlast,
-- aby v tom bol poriadok a kazda domena mala vlastny subor.
--
-- Poznamka:
-- Stlpec `text` tu berieme ako jeden plain text.
-- Preto z `summary`, `description`, `content` aj `attributes`
-- vytiahneme len textove hodnoty a spojime ich do jedneho obsahu.
--
-- `about_title` bude samostatny textovy stlpec z `content.about.title`
-- a `about` bude uz len zvysny plain text bez nazvu a bez JSON struktury.

-- Volitelne pri cistom resete:
-- truncate table public.services restart identity cascade;

insert into public.services (
  slug,
  title,
  text,
  about_title,
  about,
  image_url,
  image_gallery,
  is_active,
  order_index
)
select
  si.slug,
  si.name as title,
  trim(
    concat_ws(
      E'\n\n',
      nullif(si.summary, ''),
      nullif(si.description, ''),
      (
        select string_agg(value, E'\n\n')
        from jsonb_array_elements_text(
          jsonb_path_query_array(coalesce(si.content - 'about', '{}'::jsonb), '$.** ? (@.type() == "string")')
        ) as extracted(value)
      ),
      (
        select string_agg(value, E'\n\n')
        from jsonb_array_elements_text(
          jsonb_path_query_array(coalesce(si.attributes, '{}'::jsonb), '$.** ? (@.type() == "string")')
        ) as extracted(value)
      )
    )
  ) as text,
  nullif(coalesce(si.content #>> '{about,title}', si.content #>> '{about,aboutTitle}'), '') as about_title,
  nullif(
    trim(
      (
        select string_agg(value, E'\n\n')
        from jsonb_array_elements_text(
          jsonb_path_query_array(
            coalesce((si.content -> 'about') - 'title' - 'aboutTitle' - 'about_title', '{}'::jsonb),
            '$.** ? (@.type() == "string")'
          )
        ) as extracted(value)
      )
    ),
    ''
  ) as about,
  si.image_url,
  coalesce(si.gallery, '[]'::jsonb) as image_gallery,
  coalesce(si.is_active, true) as is_active,
  coalesce(si.sort_order, 0) as order_index
from public.service_items si
where si.item_type = 'service'
  and coalesce(si.category, '') <> 'tkn'
order by si.sort_order, si.name
on conflict (slug) do update set
  title = excluded.title,
  text = excluded.text,
  about_title = excluded.about_title,
  about = excluded.about,
  image_url = excluded.image_url,
  image_gallery = excluded.image_gallery,
  is_active = excluded.is_active,
  order_index = excluded.order_index;
