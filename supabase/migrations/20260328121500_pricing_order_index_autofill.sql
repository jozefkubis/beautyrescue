-- Ensure pricing rows have section-local ordering and auto-assign order_index on insert
alter table public.pricing
add column if not exists order_index integer;

-- Normalize existing rows so each service_id has contiguous 1..N ordering.
with ranked as (
  select
    ctid,
    row_number() over (
      partition by service_id
      order by coalesce(order_index, 2147483647), treatment nulls last, ctid
    ) as rn
  from public.pricing
)
update public.pricing p
set order_index = ranked.rn
from ranked
where p.ctid = ranked.ctid;

alter table public.pricing
  alter column order_index set not null;

alter table public.pricing
  drop constraint if exists pricing_order_index_positive;

alter table public.pricing
  add constraint pricing_order_index_positive check (order_index > 0);

create unique index if not exists pricing_service_order_index_uidx
on public.pricing (service_id, order_index);

create or replace function public.set_pricing_order_index()
returns trigger
language plpgsql
as $$
begin
  if new.service_id is null then
    return new;
  end if;

  if new.order_index is null or new.order_index <= 0 then
    -- Lock per service to avoid concurrent inserts computing the same next index.
    perform pg_advisory_xact_lock(hashtextextended(new.service_id::text, 0));

    select coalesce(max(p.order_index), 0) + 1
    into new.order_index
    from public.pricing p
    where p.service_id = new.service_id;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_pricing_set_order_index on public.pricing;

create trigger trg_pricing_set_order_index
before insert on public.pricing
for each row
execute function public.set_pricing_order_index();
