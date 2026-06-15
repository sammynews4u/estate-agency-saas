-- EstateFlow Pro Subscription/Billing Plans + Audit/Risk Control Schema
-- Run this after 0022_transactions_support_rls.sql.

do $$ begin
  create type public.platform_subscription_plan as enum ('starter', 'growth', 'enterprise');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.platform_subscription_status as enum ('trial', 'active', 'past_due', 'suspended', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.platform_billing_cycle as enum ('monthly', 'quarterly', 'annual');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.risk_level as enum ('low', 'medium', 'high', 'critical');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.risk_status as enum ('open', 'investigating', 'mitigated', 'accepted', 'closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.audit_event_type as enum ('login', 'data_change', 'permission_change', 'financial_action', 'document_action', 'security_flag');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.control_status as enum ('not_started', 'in_progress', 'passed', 'failed');
exception when duplicate_object then null; end $$;

create table if not exists public.platform_subscriptions (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  plan public.platform_subscription_plan not null default 'starter',
  status public.platform_subscription_status not null default 'trial',
  billing_cycle public.platform_billing_cycle not null default 'monthly',
  monthly_fee numeric(14,2) not null default 0,
  next_billing_date date,
  trial_ends_at date,
  seats_used integer not null default 0,
  seats_limit integer not null default 4,
  property_listings_used integer not null default 0,
  property_listings_limit integer not null default 50,
  ai_credits_used integer not null default 0,
  ai_credits_limit integer not null default 1200,
  storage_used_gb numeric(10,2) not null default 0,
  storage_limit_gb numeric(10,2) not null default 10,
  renewal_risk public.risk_level not null default 'medium',
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscription_feature_gates (
  id uuid primary key default gen_random_uuid(),
  feature_key text not null unique,
  feature_name text not null,
  starter_enabled boolean not null default false,
  growth_enabled boolean not null default true,
  enterprise_enabled boolean not null default true,
  metered boolean not null default false,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscription_usage_events (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  subscription_id uuid references public.platform_subscriptions(id) on delete cascade,
  feature_key text not null,
  quantity integer not null default 1,
  usage_date date not null default current_date,
  source_module text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.risk_register (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  title text not null,
  category text not null,
  owner_id uuid references public.profiles(id) on delete set null,
  owner_name text,
  level public.risk_level not null default 'medium',
  status public.risk_status not null default 'open',
  impact text,
  mitigation text,
  due_date date,
  related_record_type text,
  related_record_id uuid,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_trail_events (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  actor_name text,
  actor_role text,
  event_type public.audit_event_type not null default 'data_change',
  action text not null,
  affected_record_type text,
  affected_record_id uuid,
  affected_record_label text,
  ip_address text,
  user_agent text,
  risk_level public.risk_level not null default 'low',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.internal_control_checks (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  control_name text not null,
  control_area text not null,
  owner_id uuid references public.profiles(id) on delete set null,
  owner_name text,
  status public.control_status not null default 'not_started',
  last_checked date,
  evidence text,
  next_review_date date,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists platform_subscriptions_agency_idx on public.platform_subscriptions(agency_id);
create index if not exists platform_subscriptions_status_idx on public.platform_subscriptions(status);
create index if not exists subscription_usage_events_agency_feature_idx on public.subscription_usage_events(agency_id, feature_key);
create index if not exists risk_register_agency_level_idx on public.risk_register(agency_id, level);
create index if not exists risk_register_status_idx on public.risk_register(status);
create index if not exists audit_trail_events_agency_type_idx on public.audit_trail_events(agency_id, event_type);
create index if not exists audit_trail_events_actor_idx on public.audit_trail_events(actor_id);
create index if not exists internal_control_checks_agency_status_idx on public.internal_control_checks(agency_id, status);
