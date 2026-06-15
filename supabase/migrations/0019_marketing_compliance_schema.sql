-- EstateFlow Pro Marketing Campaign Studio + KYC/Compliance Verification Schema
-- Run this after 0018_development_reports_rls.sql.

do $$ begin
  create type public.marketing_channel as enum ('whatsapp', 'email', 'sms', 'social', 'portal', 'offline');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.marketing_status as enum ('draft', 'scheduled', 'active', 'paused', 'completed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.marketing_audience as enum ('buyers', 'tenants', 'landlords', 'sellers', 'investors', 'developers');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.marketing_asset_status as enum ('briefed', 'in_design', 'approved', 'published');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.verification_status as enum ('pending', 'in_review', 'verified', 'rejected', 'expired');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.verification_type as enum ('identity', 'address', 'ownership', 'agency_license', 'provider_license', 'developer_project', 'tenant_kyc');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.risk_level as enum ('low', 'medium', 'high');
exception when duplicate_object then null; end $$;

create table if not exists public.marketing_campaigns (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  owner_id uuid references public.profiles(id) on delete set null,
  related_property_id uuid references public.properties(id) on delete set null,
  related_project_id uuid references public.developer_projects(id) on delete set null,
  title text not null,
  objective text not null,
  channel public.marketing_channel not null default 'whatsapp',
  audience public.marketing_audience not null default 'buyers',
  budget numeric(16,2) not null default 0,
  start_date date,
  end_date date,
  message text,
  status public.marketing_status not null default 'draft',
  leads_generated integer not null default 0,
  viewings_booked integer not null default 0,
  conversion_rate numeric(5,2) not null default 0,
  api_delivery_status text not null default 'not_configured',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.marketing_assets (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  campaign_id uuid references public.marketing_campaigns(id) on delete cascade,
  title text not null,
  asset_format text not null,
  platform text,
  file_url text,
  owner_id uuid references public.profiles(id) on delete set null,
  due_date date,
  status public.marketing_asset_status not null default 'briefed',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.marketing_schedules (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  campaign_id uuid references public.marketing_campaigns(id) on delete cascade,
  scheduled_at timestamptz not null,
  channel public.marketing_channel not null,
  audience public.marketing_audience not null,
  recipient_count integer not null default 0,
  delivery_status text not null default 'queued',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.verification_records (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  subject_profile_id uuid references public.profiles(id) on delete set null,
  related_property_id uuid references public.properties(id) on delete set null,
  related_project_id uuid references public.developer_projects(id) on delete set null,
  subject_name text not null,
  subject_role text not null,
  verification_type public.verification_type not null,
  document_name text not null,
  document_url text,
  submitted_at date not null default current_date,
  expires_at date,
  reviewer_id uuid references public.profiles(id) on delete set null,
  risk_level public.risk_level not null default 'medium',
  status public.verification_status not null default 'pending',
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.compliance_checklist_items (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  title text not null,
  applies_to text not null,
  required_document text not null,
  priority public.risk_level not null default 'medium',
  status text not null default 'required',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
