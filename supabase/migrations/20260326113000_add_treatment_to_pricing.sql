-- Add per-procedure label to pricing rows
alter table public.pricing
add column if not exists treatment text;

create index if not exists pricing_service_treatment_idx
on public.pricing (service_id, treatment);
