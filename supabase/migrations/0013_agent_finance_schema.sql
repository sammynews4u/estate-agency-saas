-- EstateFlow Pro Agent Management + Finance & Business Management Schema
-- Run this after 0012_referrals_discovery_rls.sql.

create type public.agent_status as enum ('active', 'pending', 'suspended', 'inactive');
create type public.agent_tier as enum ('associate', 'senior', 'principal', 'team_lead');
create type public.commission_status as enum ('pending', 'approved', 'paid', 'disputed', 'cancelled');
create type public.expense_category as enum ('marketing', 'office', 'transport', 'utilities', 'professional_services', 'software', 'maintenance', 'miscellaneous');
create type public.expense_status as enum ('draft', 'submitted', 'approved', 'reimbursed', 'rejected');
create type public.payroll_status as enum ('pending', 'approved', 'paid', 'held');

create table if not exists public.agent_profiles (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  team text,
  tier public.agent_tier not null default 'associate',
  specialisation text,
  status public.agent_status not null default 'pending',
  active_properties integer not null default 0,
  assigned_leads integer not null default 0,
  active_clients integer not null default 0,
  viewings_this_month integer not null default 0,
  deals_closed integer not null default 0,
  conversion_rate numeric(5,2) not null default 0,
  revenue_closed numeric(14,2) not null default 0,
  commission_earned numeric(14,2) not null default 0,
  manager_id uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (agency_id, email)
);

create table if not exists public.commission_records (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  agent_profile_id uuid references public.agent_profiles(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  referral_id uuid references public.referrals(id) on delete set null,
  property_title text not null,
  client_name text not null,
  deal_type text not null default 'sale',
  deal_value numeric(14,2) not null default 0,
  commission_rate numeric(5,2) not null default 0,
  commission_amount numeric(14,2) generated always as ((deal_value * commission_rate) / 100) stored,
  status public.commission_status not null default 'pending',
  closed_at date,
  due_date date,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  category public.expense_category not null,
  description text not null,
  amount numeric(14,2) not null default 0,
  expense_date date not null default current_date,
  staff_id uuid references public.profiles(id) on delete set null,
  staff_name text,
  receipt_document_id uuid references public.documents(id) on delete set null,
  receipt_attached boolean not null default false,
  status public.expense_status not null default 'submitted',
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payroll_records (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  staff_id uuid references public.profiles(id) on delete set null,
  staff_name text not null,
  role_label text not null,
  base_salary numeric(14,2) not null default 0,
  commission_bonus numeric(14,2) not null default 0,
  deductions numeric(14,2) not null default 0,
  net_pay numeric(14,2) generated always as (base_salary + commission_bonus - deductions) stored,
  pay_period text not null,
  payment_date date,
  status public.payroll_status not null default 'pending',
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.branch_finance_snapshots (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete cascade,
  report_month text not null,
  revenue numeric(14,2) not null default 0,
  expenses numeric(14,2) not null default 0,
  payroll numeric(14,2) not null default 0,
  pending_invoices integer not null default 0,
  receipts_issued integer not null default 0,
  conversion_revenue numeric(14,2) not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (agency_id, branch_id, report_month)
);

create index if not exists idx_agent_profiles_agency_id on public.agent_profiles(agency_id);
create index if not exists idx_agent_profiles_branch_id on public.agent_profiles(branch_id);
create index if not exists idx_agent_profiles_profile_id on public.agent_profiles(profile_id);
create index if not exists idx_commission_records_agency_id on public.commission_records(agency_id);
create index if not exists idx_commission_records_agent_profile_id on public.commission_records(agent_profile_id);
create index if not exists idx_expenses_agency_id on public.expenses(agency_id);
create index if not exists idx_expenses_branch_id on public.expenses(branch_id);
create index if not exists idx_payroll_records_agency_id on public.payroll_records(agency_id);
create index if not exists idx_branch_finance_snapshots_agency_id on public.branch_finance_snapshots(agency_id);
