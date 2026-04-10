begin;

-- Tento krok dorovna stare `pricing.service_id` hodnoty na novu tabulku `services`.
-- V starych seedoch sa totiz pouzivalo `service_items.id`, co je pri novom FK nespravne.

-- Najprv si postrazime, aby v `services` existovali zaznamy pre sluzby,
-- ktore uz maju cennik v tabulke `pricing`.
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
  trim(concat_ws(E'\n\n', nullif(si.summary, ''), nullif(si.description, ''))) as text,
  null as about_title,
  null as about,
  si.image_url,
  coalesce(si.gallery, '[]'::jsonb) as image_gallery,
  coalesce(si.is_active, true) as is_active,
  coalesce(si.sort_order, 0) as order_index
from public.service_items si
where si.item_type = 'service'
  and exists (
    select 1
    from public.pricing p
    where p.service_id = si.id
  )
on conflict (slug) do nothing;

-- Tu premapujeme stare UUID z `service_items` na spravne UUID z `services`.
update public.pricing p
set service_id = s.id
from public.service_items si
join public.services s on s.slug = si.slug
where p.service_id = si.id
  and p.service_id <> s.id;

-- Ak by po premapovani ostal nejaky riadok bez zodpovedajucej sluzby,
-- radsej migraciu zastavime s jasnou chybou, aby sa problem neskryl.
do $$
declare
  missing_count integer;
begin
  select count(*)
  into missing_count
  from public.pricing p
  left join public.services s on s.id = p.service_id
  where s.id is null;

  if missing_count > 0 then
    raise exception 'Niektore pricing riadky stale nemaju zodpovedajuci services.id (% riadkov).', missing_count;
  end if;
end $$;

alter table public.pricing
  drop constraint if exists pricing_service_id_fkey;

alter table public.pricing
  add constraint pricing_service_id_fkey
  foreign key (service_id)
  references public.services(id)
  on update cascade
  on delete cascade;

create index if not exists pricing_service_id_idx
  on public.pricing (service_id);

commit;
