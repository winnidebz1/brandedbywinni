-- RUN THIS IN SUPABASE SQL EDITOR
-- Creates a country-based service pricing table and seeds starter values.
-- `country_rates` applies to GH/NG/KE/ZA.
-- US/GB/AU are manual special prices in `special_prices` (not exchange-converted).

create table if not exists public.service_country_prices (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  service_id text not null,
  option_id text not null default '__base__',
  country_code text not null,
  currency_code text not null,
  amount numeric(12, 2) not null check (amount >= 0),
  constraint service_country_prices_unique unique (service_id, option_id, country_code)
);

alter table public.service_country_prices alter column option_id set default '__base__';
update public.service_country_prices set option_id = '__base__' where option_id is null;
alter table public.service_country_prices alter column option_id set not null;

create index if not exists idx_service_country_prices_country on public.service_country_prices (country_code);
create index if not exists idx_service_country_prices_service on public.service_country_prices (service_id);

create or replace function public.set_service_country_prices_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists trg_service_country_prices_updated_at on public.service_country_prices;
create trigger trg_service_country_prices_updated_at
before update on public.service_country_prices
for each row execute function public.set_service_country_prices_updated_at();

alter table public.service_country_prices enable row level security;

drop policy if exists "Public can view service country prices" on public.service_country_prices;
drop policy if exists "Authenticated can manage service country prices" on public.service_country_prices;

create policy "Public can view service country prices"
on public.service_country_prices
for select
using (true);

create policy "Authenticated can manage service country prices"
on public.service_country_prices
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

with base_prices(service_id, option_id, ghs_amount) as (
  values
    ('custom-logo-branding', '__base__', 1500.00::numeric),
    ('e-flyer', '__base__', 75.00::numeric),
    ('business-card', '__base__', 60.00::numeric),
    ('product-label', '__base__', 200.00::numeric),
    ('thank-you-card', '__base__', 50.00::numeric),
    ('content-package', '__base__', 120.00::numeric),
    ('content-package', 'content-basic', 120.00::numeric),
    ('content-package', 'content-standard', 250.00::numeric),
    ('content-package', 'content-premium', 500.00::numeric)
),
country_rates(country_code, currency_code, rate_from_ghs) as (
  values
    ('GH', 'GHS', 1.00::numeric),
    ('NG', 'NGN', 110.00::numeric),
    ('KE', 'KES', 10.00::numeric),
    ('ZA', 'ZAR', 0.30::numeric)
),
converted_prices(service_id, option_id, country_code, currency_code, amount) as (
  select
    bp.service_id,
    bp.option_id,
    cr.country_code,
    cr.currency_code,
    round(bp.ghs_amount * cr.rate_from_ghs, 2) as amount
  from base_prices bp
  cross join country_rates cr
),
special_prices(service_id, option_id, country_code, currency_code, amount) as (
  values
    -- United States (manual business pricing)
    ('custom-logo-branding', '__base__', 'US', 'USD', 499.00::numeric),
    ('e-flyer', '__base__', 'US', 'USD', 49.00::numeric),
    ('business-card', '__base__', 'US', 'USD', 39.00::numeric),
    ('product-label', '__base__', 'US', 'USD', 129.00::numeric),
    ('thank-you-card', '__base__', 'US', 'USD', 29.00::numeric),
    ('content-package', '__base__', 'US', 'USD', 99.00::numeric),
    ('content-package', 'content-basic', 'US', 'USD', 99.00::numeric),
    ('content-package', 'content-standard', 'US', 'USD', 229.00::numeric),
    ('content-package', 'content-premium', 'US', 'USD', 449.00::numeric),

    -- United Kingdom (manual business pricing)
    ('custom-logo-branding', '__base__', 'GB', 'GBP', 379.00::numeric),
    ('e-flyer', '__base__', 'GB', 'GBP', 39.00::numeric),
    ('business-card', '__base__', 'GB', 'GBP', 29.00::numeric),
    ('product-label', '__base__', 'GB', 'GBP', 99.00::numeric),
    ('thank-you-card', '__base__', 'GB', 'GBP', 25.00::numeric),
    ('content-package', '__base__', 'GB', 'GBP', 79.00::numeric),
    ('content-package', 'content-basic', 'GB', 'GBP', 79.00::numeric),
    ('content-package', 'content-standard', 'GB', 'GBP', 189.00::numeric),
    ('content-package', 'content-premium', 'GB', 'GBP', 369.00::numeric),

    -- Australia (manual business pricing)
    ('custom-logo-branding', '__base__', 'AU', 'AUD', 599.00::numeric),
    ('e-flyer', '__base__', 'AU', 'AUD', 59.00::numeric),
    ('business-card', '__base__', 'AU', 'AUD', 49.00::numeric),
    ('product-label', '__base__', 'AU', 'AUD', 159.00::numeric),
    ('thank-you-card', '__base__', 'AU', 'AUD', 35.00::numeric),
    ('content-package', '__base__', 'AU', 'AUD', 119.00::numeric),
    ('content-package', 'content-basic', 'AU', 'AUD', 119.00::numeric),
    ('content-package', 'content-standard', 'AU', 'AUD', 269.00::numeric),
    ('content-package', 'content-premium', 'AU', 'AUD', 529.00::numeric)
),
all_prices(service_id, option_id, country_code, currency_code, amount) as (
  select * from converted_prices
  union all
  select * from special_prices
)
insert into public.service_country_prices (service_id, option_id, country_code, currency_code, amount)
select
  service_id,
  option_id,
  country_code,
  currency_code,
  amount
from all_prices
on conflict (service_id, option_id, country_code)
do update set
  currency_code = excluded.currency_code,
  amount = excluded.amount,
  updated_at = timezone('utc'::text, now());
