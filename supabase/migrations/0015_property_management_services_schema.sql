-- EstateFlow Pro Property Management System + Service Marketplace Schema
-- Run this after 0014_agent_finance_rls.sql.

do $$ begin
  create type public.tenant_status as enum ('active', 'notice_given', 'overdue', 'moved_out');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.lease_status as enum ('active', 'renewal_due', 'expired', 'terminated');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.maintenance_priority as enum ('low', 'medium', 'high', 'urgent');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.maintenance_status as enum ('reported', 'assigned', 'in_progress', 'resolved', 'closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.inspection_status as enum ('scheduled', 'completed', 'requires_action', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.occupancy_status as enum ('occupied', 'vacant', 'reserved', 'maintenance_hold');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.service_category as enum ('lawyer', 'surveyor', 'architect', 'interior_designer', 'photographer', 'drone_operator', 'valuer', 'construction_consultant');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.service_provider_status as enum ('active', 'pending_review', 'suspended');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.service_request_status as enum ('new', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.service_quote_status as enum ('draft', 'sent', 'accepted', 'declined');
exception when duplicate_object then null; end $$;

create or replace function public.current_user_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.profiles where auth_user_id = auth.uid() limit 1;
$$;

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  assigned_agent_id uuid references public.profiles(id) on delete set null,
  landlord_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  phone text,
  email text,
  unit text,
  rent_amount numeric(14,2) not null default 0,
  payment_frequency text not null default 'yearly',
  outstanding_balance numeric(14,2) not null default 0,
  status public.tenant_status not null default 'active',
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leases (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  tenant_id uuid references public.tenants(id) on delete cascade,
  landlord_id uuid references public.profiles(id) on delete set null,
  lease_document_id uuid references public.documents(id) on delete set null,
  start_date date not null,
  end_date date not null,
  renewal_date date,
  rent_amount numeric(14,2) not null default 0,
  security_deposit numeric(14,2) not null default 0,
  status public.lease_status not null default 'active',
  terms text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.maintenance_records (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  tenant_id uuid references public.tenants(id) on delete set null,
  landlord_id uuid references public.profiles(id) on delete set null,
  issue_title text not null,
  issue_description text,
  priority public.maintenance_priority not null default 'medium',
  assigned_vendor text,
  estimated_cost numeric(14,2) not null default 0,
  actual_cost numeric(14,2) not null default 0,
  date_reported date not null default current_date,
  date_resolved date,
  status public.maintenance_status not null default 'reported',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inspection_reports (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  property_id uuid references public.properties(id) on delete cascade,
  inspector_id uuid references public.profiles(id) on delete set null,
  landlord_id uuid references public.profiles(id) on delete set null,
  inspection_date date not null,
  inspection_type text not null default 'routine',
  condition_score integer not null default 0 check (condition_score between 0 and 100),
  findings text,
  action_required text,
  status public.inspection_status not null default 'scheduled',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.occupancy_records (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  property_id uuid references public.properties(id) on delete cascade,
  tenant_id uuid references public.tenants(id) on delete set null,
  landlord_id uuid references public.profiles(id) on delete set null,
  unit text,
  status public.occupancy_status not null default 'vacant',
  rent_amount numeric(14,2) not null default 0,
  next_availability_date date,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_providers (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  business_name text not null,
  contact_name text not null,
  category public.service_category not null,
  phone text,
  email text,
  location text,
  pricing_range text,
  availability text not null default 'available',
  rating numeric(3,2) not null default 0,
  completed_jobs integer not null default 0,
  status public.service_provider_status not null default 'pending_review',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  requester_id uuid references public.profiles(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  service_provider_id uuid references public.service_providers(id) on delete set null,
  service_title text not null,
  category public.service_category not null,
  preferred_date date,
  budget numeric(14,2) not null default 0,
  notes text,
  status public.service_request_status not null default 'new',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_quotes (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  service_request_id uuid references public.service_requests(id) on delete cascade,
  service_provider_id uuid references public.service_providers(id) on delete cascade,
  amount numeric(14,2) not null default 0,
  timeline text,
  scope text,
  submitted_date date not null default current_date,
  status public.service_quote_status not null default 'draft',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_portfolio_items (
  id uuid primary key default gen_random_uuid(),
  service_provider_id uuid references public.service_providers(id) on delete cascade,
  agency_id uuid references public.agencies(id) on delete set null,
  title text not null,
  category public.service_category not null,
  location text,
  completion_date date,
  media_urls text[] not null default '{}',
  description text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_reviews (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete set null,
  service_provider_id uuid references public.service_providers(id) on delete cascade,
  service_request_id uuid references public.service_requests(id) on delete set null,
  reviewer_id uuid references public.profiles(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  review text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_tenants_agency_id on public.tenants(agency_id);
create index if not exists idx_tenants_property_id on public.tenants(property_id);
create index if not exists idx_tenants_assigned_agent_id on public.tenants(assigned_agent_id);
create index if not exists idx_leases_agency_id on public.leases(agency_id);
create index if not exists idx_leases_tenant_id on public.leases(tenant_id);
create index if not exists idx_maintenance_records_agency_id on public.maintenance_records(agency_id);
create index if not exists idx_maintenance_records_property_id on public.maintenance_records(property_id);
create index if not exists idx_inspection_reports_agency_id on public.inspection_reports(agency_id);
create index if not exists idx_occupancy_records_agency_id on public.occupancy_records(agency_id);
create index if not exists idx_service_providers_category on public.service_providers(category);
create index if not exists idx_service_requests_agency_id on public.service_requests(agency_id);
create index if not exists idx_service_requests_provider_id on public.service_requests(service_provider_id);
create index if not exists idx_service_quotes_request_id on public.service_quotes(service_request_id);
create index if not exists idx_service_portfolio_provider_id on public.service_portfolio_items(service_provider_id);
create index if not exists idx_service_reviews_provider_id on public.service_reviews(service_provider_id);

create trigger set_tenants_updated_at before update on public.tenants for each row execute function public.set_updated_at();
create trigger set_leases_updated_at before update on public.leases for each row execute function public.set_updated_at();
create trigger set_maintenance_records_updated_at before update on public.maintenance_records for each row execute function public.set_updated_at();
create trigger set_inspection_reports_updated_at before update on public.inspection_reports for each row execute function public.set_updated_at();
create trigger set_occupancy_records_updated_at before update on public.occupancy_records for each row execute function public.set_updated_at();
create trigger set_service_providers_updated_at before update on public.service_providers for each row execute function public.set_updated_at();
create trigger set_service_requests_updated_at before update on public.service_requests for each row execute function public.set_updated_at();
create trigger set_service_quotes_updated_at before update on public.service_quotes for each row execute function public.set_updated_at();
create trigger set_service_portfolio_items_updated_at before update on public.service_portfolio_items for each row execute function public.set_updated_at();
create trigger set_service_reviews_updated_at before update on public.service_reviews for each row execute function public.set_updated_at();
