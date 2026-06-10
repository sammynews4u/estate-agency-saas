-- EstateFlow Pro Deal Pipeline/Transaction Management + Customer Support/Ticketing Schema
-- Run this after 0020_marketing_compliance_rls.sql.

do $$ begin
  create type public.transaction_stage as enum ('inquiry', 'offer', 'due_diligence', 'contract', 'deposit', 'closing', 'completed', 'failed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.transaction_type as enum ('sale', 'rent', 'lease', 'off_plan');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.transaction_priority as enum ('low', 'medium', 'high', 'critical');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.transaction_task_status as enum ('pending', 'in_progress', 'completed', 'blocked');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.support_status as enum ('open', 'in_progress', 'awaiting_user', 'resolved', 'escalated');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.support_priority as enum ('low', 'medium', 'high', 'urgent');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.support_category as enum ('account', 'technical', 'property', 'billing', 'verification', 'service_request');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.sla_status as enum ('inside_sla', 'near_breach', 'breached');
exception when duplicate_object then null; end $$;

create table if not exists public.deal_transactions (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  landlord_profile_id uuid references public.profiles(id) on delete set null,
  agent_id uuid references public.profiles(id) on delete set null,
  developer_project_id uuid references public.developer_projects(id) on delete set null,
  title text not null,
  counterparty_name text,
  transaction_type public.transaction_type not null default 'sale',
  stage public.transaction_stage not null default 'inquiry',
  priority public.transaction_priority not null default 'medium',
  deal_value numeric(16,2) not null default 0,
  expected_commission numeric(16,2) not null default 0,
  closing_date date,
  next_action text,
  checklist_progress integer not null default 0 check (checklist_progress >= 0 and checklist_progress <= 100),
  document_count integer not null default 0,
  risk_note text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.transaction_tasks (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  transaction_id uuid references public.deal_transactions(id) on delete cascade,
  owner_id uuid references public.profiles(id) on delete set null,
  task text not null,
  due_date date,
  status public.transaction_task_status not null default 'pending',
  blocker text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.transaction_checklist_items (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  transaction_id uuid references public.deal_transactions(id) on delete cascade,
  title text not null,
  required boolean not null default true,
  completed boolean not null default false,
  completed_at timestamptz,
  completed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  requester_id uuid references public.profiles(id) on delete set null,
  assigned_to uuid references public.profiles(id) on delete set null,
  related_property_id uuid references public.properties(id) on delete set null,
  related_transaction_id uuid references public.deal_transactions(id) on delete set null,
  subject text not null,
  requester_name text not null,
  requester_role text not null,
  category public.support_category not null default 'technical',
  priority public.support_priority not null default 'medium',
  status public.support_status not null default 'open',
  sla_status public.sla_status not null default 'inside_sla',
  related_record text,
  summary text,
  last_reply_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.support_ticket_messages (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  ticket_id uuid references public.support_tickets(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  author_name text not null,
  channel text not null default 'portal',
  message text not null,
  internal_note boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.support_sla_rules (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  priority public.support_priority not null,
  response_minutes integer not null,
  resolution_minutes integer not null,
  escalation_target text,
  active boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists deal_transactions_agency_stage_idx on public.deal_transactions(agency_id, stage);
create index if not exists deal_transactions_agent_idx on public.deal_transactions(agent_id);
create index if not exists transaction_tasks_transaction_idx on public.transaction_tasks(transaction_id);
create index if not exists support_tickets_agency_status_idx on public.support_tickets(agency_id, status);
create index if not exists support_tickets_requester_idx on public.support_tickets(requester_id);
create index if not exists support_ticket_messages_ticket_idx on public.support_ticket_messages(ticket_id);
