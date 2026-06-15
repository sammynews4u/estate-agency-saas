-- EstateFlow Pro Property Valuation + AI Assistant Schema
-- Run this after 0008_billing_documents_rls.sql.

create type public.valuation_status as enum ('draft', 'under_review', 'approved', 'sent', 'archived');
create type public.market_demand_level as enum ('low', 'moderate', 'high', 'very_high');
create type public.valuation_property_condition as enum ('newly_built', 'excellent', 'good', 'needs_renovation', 'distressed');
create type public.ai_tool_type as enum ('property_description', 'client_response', 'follow_up_message', 'listing_analyzer', 'property_match', 'pricing_suggestion');
create type public.ai_generation_status as enum ('draft', 'saved', 'used');

create table if not exists public.valuation_reports (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  owner_profile_id uuid references public.profiles(id) on delete set null,
  prepared_by uuid references public.profiles(id) on delete set null,
  report_number text not null,
  property_title text not null,
  property_type text not null,
  location text not null,
  client_name text,
  estimated_value numeric(14,2) not null default 0,
  low_estimate numeric(14,2) not null default 0,
  high_estimate numeric(14,2) not null default 0,
  recommended_listing_price numeric(14,2) not null default 0,
  currency text not null default 'NGN',
  confidence_score integer not null default 0 check (confidence_score between 0 and 100),
  demand_level public.market_demand_level not null default 'moderate',
  property_condition public.valuation_property_condition not null default 'good',
  status public.valuation_status not null default 'draft',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (agency_id, report_number)
);

create table if not exists public.valuation_comparables (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  valuation_report_id uuid references public.valuation_reports(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  title text not null,
  location text not null,
  property_type text not null,
  price numeric(14,2) not null default 0,
  currency text not null default 'NGN',
  size_label text,
  bedrooms integer not null default 0,
  sold_or_listed_at date,
  similarity_score integer not null default 0 check (similarity_score between 0 and 100),
  source_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_prompt_templates (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  created_by uuid references public.profiles(id) on delete set null,
  name text not null,
  tool_type public.ai_tool_type not null,
  description text,
  default_prompt text not null,
  is_system_template boolean not null default false,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_generations (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  template_id uuid references public.ai_prompt_templates(id) on delete set null,
  tool_type public.ai_tool_type not null,
  title text not null,
  input_summary text,
  prompt text,
  output text not null,
  status public.ai_generation_status not null default 'draft',
  model_name text,
  tokens_used integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_valuation_reports_agency_id on public.valuation_reports(agency_id);
create index if not exists idx_valuation_reports_branch_id on public.valuation_reports(branch_id);
create index if not exists idx_valuation_reports_property_id on public.valuation_reports(property_id);
create index if not exists idx_valuation_reports_client_id on public.valuation_reports(client_id);
create index if not exists idx_valuation_reports_owner_profile_id on public.valuation_reports(owner_profile_id);
create index if not exists idx_valuation_reports_prepared_by on public.valuation_reports(prepared_by);
create index if not exists idx_valuation_reports_status on public.valuation_reports(status);

create index if not exists idx_valuation_comparables_agency_id on public.valuation_comparables(agency_id);
create index if not exists idx_valuation_comparables_report_id on public.valuation_comparables(valuation_report_id);
create index if not exists idx_valuation_comparables_property_id on public.valuation_comparables(property_id);

create index if not exists idx_ai_prompt_templates_agency_id on public.ai_prompt_templates(agency_id);
create index if not exists idx_ai_prompt_templates_tool_type on public.ai_prompt_templates(tool_type);
create index if not exists idx_ai_generations_agency_id on public.ai_generations(agency_id);
create index if not exists idx_ai_generations_branch_id on public.ai_generations(branch_id);
create index if not exists idx_ai_generations_created_by on public.ai_generations(created_by);
create index if not exists idx_ai_generations_property_id on public.ai_generations(property_id);
create index if not exists idx_ai_generations_client_id on public.ai_generations(client_id);
create index if not exists idx_ai_generations_tool_type on public.ai_generations(tool_type);
create index if not exists idx_ai_generations_status on public.ai_generations(status);

create trigger set_valuation_reports_updated_at before update on public.valuation_reports for each row execute function public.set_updated_at();
create trigger set_valuation_comparables_updated_at before update on public.valuation_comparables for each row execute function public.set_updated_at();
create trigger set_ai_prompt_templates_updated_at before update on public.ai_prompt_templates for each row execute function public.set_updated_at();
create trigger set_ai_generations_updated_at before update on public.ai_generations for each row execute function public.set_updated_at();
