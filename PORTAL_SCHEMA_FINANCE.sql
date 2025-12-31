-- 10. Finance Roles Update
-- Update profiles to allow 'accountant' role
ALTER TABLE public.profiles 
DROP CONSTRAINT profiles_role_check;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_role_check CHECK (role IN ('founder', 'team_member', 'accountant'));

-- 11. Finance Goals (12-Week Year)
create table if not exists public.finance_goals (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  start_date date not null,
  end_date date not null,
  revenue_target numeric not null,
  profit_target numeric not null,
  savings_target numeric not null,
  tax_target numeric not null,
  founder_pay_target numeric not null,
  is_active boolean default true,
  is_locked boolean default false, -- Set to true when cycle starts, prevents edits
  year int,
  quarter int
);

-- 12. Finance Invoices (Billings sent to Clients)
create table if not exists public.finance_invoices (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  invoice_number text not null,
  client_name text not null,
  project_id uuid references public.internal_projects(id),
  amount numeric not null,
  status text default 'pending' check (status in ('pending', 'paid', 'overdue', 'cancelled')),
  due_date date,
  notes text,
  file_url text, -- PDF upload
  created_by uuid references public.profiles(id)
);

-- 13. Finance Income (Payments Received)
create table if not exists public.finance_income (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  invoice_id uuid references public.finance_invoices(id),
  amount numeric not null,
  payment_method text, -- Bank, Stripe, Mobile Money
  date_received date not null,
  notes text,
  created_by uuid references public.profiles(id)
);

-- 14. Finance Expenses
create table if not exists public.finance_expenses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  category text not null, -- Software, Marketing, Contractors, Operations, Education, Misc
  amount numeric not null,
  expense_date date not null,
  is_recurring boolean default false,
  requires_approval boolean default false,
  is_approved boolean default false, 
  approved_by uuid references public.profiles(id),
  receipt_url text,
  created_by uuid references public.profiles(id)
);

-- 15. Finance Reports (For Accountant)
create table if not exists public.finance_reports (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  report_type text, -- Monthly Summary, Tax Report, Audit
  file_url text not null,
  notes text,
  flags text, -- Issues flagged by accountant
  created_by uuid references public.profiles(id)
);


-- RLS POLICIES FOR FINANCE
-- IMPORTANT: Only 'founder' and 'accountant' can access these tables.

-- Goals: Founder RW, Accountant R
alter table public.finance_goals enable row level security;
create policy "Finance Access Goals" on public.finance_goals for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('founder', 'accountant'))
);
create policy "Founder Manage Goals" on public.finance_goals for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'founder')
);

-- Invoices: Founder & Accountant RW
alter table public.finance_invoices enable row level security;
create policy "Finance Access Invoices" on public.finance_invoices for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('founder', 'accountant'))
);

-- Income: Founder & Accountant RW (But Account cannot delete paid? Logic in UI often, but RLS can enforce too)
-- Let's keep RW for both for simplicity, enforcing 'no delete' logic in app or trigger if strictness needed.
alter table public.finance_income enable row level security;
create policy "Finance Access Income" on public.finance_income for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('founder', 'accountant'))
);

-- Expenses: Founder & Accountant RW
alter table public.finance_expenses enable row level security;
create policy "Finance Access Expenses" on public.finance_expenses for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('founder', 'accountant'))
);

-- Reports: Founder & Accountant RW
alter table public.finance_reports enable row level security;
create policy "Finance Access Reports" on public.finance_reports for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('founder', 'accountant'))
);
