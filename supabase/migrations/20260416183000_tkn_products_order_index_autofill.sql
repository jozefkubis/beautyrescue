-- Automaticky doplni order_index pre novy TKN produkt, ked sa neposle z aplikacie.
-- Poradie sa pocita v ramci jednej kategorie (category_id).

create or replace function public.set_tkn_product_order_index()
returns trigger
language plpgsql
as $$
declare
  next_index integer;
begin
  if new.order_index is not null then
    return new;
  end if;

  select coalesce(max(tp.order_index), 0) + 1
  into next_index
  from public.tkn_products tp
  where tp.category_id = new.category_id;

  new.order_index := next_index;

  -- Ak sa nevyplni sort_order, drzime ho v rovnakej hodnote ako order_index.
  if new.sort_order is null then
    new.sort_order := next_index;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_tkn_products_order_index_autofill on public.tkn_products;

create trigger trg_tkn_products_order_index_autofill
before insert on public.tkn_products
for each row
execute function public.set_tkn_product_order_index();
