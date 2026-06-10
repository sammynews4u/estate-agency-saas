-- EstateFlow Pro Construction & Development + Reports/Analytics Schema
-- Run this after 0016_property_management_services_rls.sql.

do $$ begin
  create type public.development_project_status as enum ('planning', 'selling', 'under_construction', 'completed', 'on_hold');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.project_unit_status as enum ('available', 'reserved', 'sold', 'blocked');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.construction_progress_status as enum ('not_started', 'in_progress', 'completed', 'delayed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.development_sale_status as enum ('prospect', 'reserved', 'deposit_paid', 'closed', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.report_export_status as enum ('ready', 'queued', 'failed');
exception when duplicate_object then null; end $$;

create table if not exists public.developer_projects (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  developer_id uuid references public.profiles(id) on delete set null,
  project_name text not null,
  developer_name text not null,
  location text not null,
  description text,
  start_date date,
  expected_completion_date date,
  status public.development_project_status not null default 'planning',
  total_units integer not null default 0,
  units_sold integer not null default 0,
  units_available integer not null default 0,
  progress_percentage integer not null default 0 check (progress_percentage between 0 and 100),
  projected_revenue numeric(16,2) not null default 0,
  documents_count integer not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_units (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  project_id uuid references public.developer_projects(id) on delete cascade,
  assigned_agent_id uuid references public.profiles(id) on delete set null,
  buyer_id uuid references public.profiles(id) on delete set null,
  unit_number text not null,
  unit_type text not null,
  floor text,
  bedrooms integer not null default 0,
  bathrooms integer not null default 0,
  size_sqm numeric(10,2) not null default 0,
  price numeric(16,2) not null default 0,
  status public.project_unit_status not null default 'available',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.construction_progress_records (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  project_id uuid references public.developer_projects(id) on delete cascade,
  milestone text not null,
  phase text,
  target_date date,
  completion_date date,
  progress_percentage integer not null default 0 check (progress_percentage between 0 and 100),
  contractor text,
  risk_note text,
  status public.construction_progress_status not null default 'not_started',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.development_sales (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  project_id uuid references public.developer_projects(id) on delete cascade,
  unit_id uuid references public.project_units(id) on delete set null,
  buyer_id uuid references public.profiles(id) on delete set null,
  assigned_agent_id uuid references public.profiles(id) on delete set null,
  deal_value numeric(16,2) not null default 0,
  deposit_paid numeric(16,2) not null default 0,
  expected_close_date date,
  status public.development_sale_status not null default 'prospect',
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.report_snapshots (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  report_scope text not null default 'agency',
  report_month text not null,
  total_inquiries integer not null default 0,
  total_viewings integer not null default 0,
  total_deals integer not null default 0,
  total_revenue numeric(16,2) not null default 0,
  total_expenses numeric(16,2) not null default 0,
  conversion_rate numeric(5,2) not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (agency_id, report_scope, report_month)
);

create table if not exists public.analytics_insights (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  title text not null,
  message text not null,
  status text not null default 'neutral',
  owner text,
  source_module text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.report_exports (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  report_name text not null,
  report_scope text not null,
  export_format text not null,
  generated_by uuid references public.profiles(id) on delete set null,
  generated_at timestamptz not null default now(),
  status public.report_export_status not null default 'queued',
  file_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
