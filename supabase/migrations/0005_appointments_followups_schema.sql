-- EstateFlow Pro Appointments + Automated Follow-Up Schema
-- Run this after 0004_property_crm_rls.sql.

create type public.appointment_status as enum ('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'no_show');
create type public.appointment_type as enum ('property_viewing', 'client_meeting', 'owner_meeting', 'valuation_visit', 'document_review');
create type public.follow_up_channel as enum ('call', 'whatsapp', 'sms', 'email', 'meeting');
create type public.follow_up_status as enum ('scheduled', 'due_today', 'completed', 'missed', 'cancelled');
create type public.follow_up_priority as enum ('low', 'medium', 'high');
create type public.campaign_status as enum ('draft', 'scheduled', 'sent', 'paused');

create table if not exists public.viewing_appointments (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  client_profile_id uuid references public.profiles(id) on delete set null,
  owner_profile_id uuid references public.profiles(id) on delete set null,
  assigned_agent_id uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  title text not null,
  appointment_type public.appointment_type not null default 'property_viewing',
  scheduled_start timestamptz not null,
  scheduled_end timestamptz,
  location text,
  status public.appointment_status not null default 'pending',
  reminder_enabled boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.message_templates (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  created_by uuid references public.profiles(id) on delete set null,
  name text not null,
  channel public.follow_up_channel not null,
  use_case text,
  body text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.follow_up_tasks (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  appointment_id uuid references public.viewing_appointments(id) on delete set null,
  assigned_agent_id uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  recipient_name text not null,
  recipient_phone text,
  recipient_email text,
  channel public.follow_up_channel not null default 'whatsapp',
  message text not null,
  scheduled_at timestamptz not null,
  status public.follow_up_status not null default 'scheduled',
  priority public.follow_up_priority not null default 'medium',
  completed_at timestamptz,
  external_provider text,
  external_message_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  name text not null,
  channel public.follow_up_channel not null,
  audience text,
  recipients_count integer not null default 0,
  message text,
  scheduled_at timestamptz,
  status public.campaign_status not null default 'draft',
  external_provider text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_viewing_appointments_agency_id on public.viewing_appointments(agency_id);
create index if not exists idx_viewing_appointments_agent_id on public.viewing_appointments(assigned_agent_id);
create index if not exists idx_viewing_appointments_client_profile_id on public.viewing_appointments(client_profile_id);
create index if not exists idx_viewing_appointments_owner_profile_id on public.viewing_appointments(owner_profile_id);
create index if not exists idx_viewing_appointments_status on public.viewing_appointments(status);
create index if not exists idx_viewing_appointments_scheduled_start on public.viewing_appointments(scheduled_start);
create index if not exists idx_follow_up_tasks_agency_id on public.follow_up_tasks(agency_id);
create index if not exists idx_follow_up_tasks_agent_id on public.follow_up_tasks(assigned_agent_id);
create index if not exists idx_follow_up_tasks_status on public.follow_up_tasks(status);
create index if not exists idx_follow_up_tasks_scheduled_at on public.follow_up_tasks(scheduled_at);
create index if not exists idx_message_templates_agency_id on public.message_templates(agency_id);
create index if not exists idx_campaigns_agency_id on public.campaigns(agency_id);

create trigger set_viewing_appointments_updated_at before update on public.viewing_appointments for each row execute function public.set_updated_at();
create trigger set_follow_up_tasks_updated_at before update on public.follow_up_tasks for each row execute function public.set_updated_at();
create trigger set_message_templates_updated_at before update on public.message_templates for each row execute function public.set_updated_at();
create trigger set_campaigns_updated_at before update on public.campaigns for each row execute function public.set_updated_at();
