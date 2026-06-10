-- EstateFlow Pro Referral Network + Property Discovery Schema
-- Run this after 0010_valuation_ai_rls.sql.

create type public.referral_type as enum ('buyer_lead', 'seller_lead', 'landlord_lead', 'tenant_lead', 'property_listing', 'service_request');
create type public.referral_status as enum ('pending', 'accepted', 'rejected', 'converted', 'paid');
create type public.discovery_source_type as enum ('website', 'social_media', 'csv_import', 'manual_entry', 'public_feed', 'partner_api');
create type public.discovery_source_status as enum ('active', 'paused', 'blocked');
create type public.discovered_property_status as enum ('new', 'duplicate', 'contacted', 'verified', 'converted', 'rejected');
create type public.duplicate_signal as enum ('same_title', 'same_address', 'same_phone', 'similar_price', 'similar_location', 'similar_image');

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  referral_code text not null,
  referral_type public.referral_type not null default 'buyer_lead',
  status public.referral_status not null default 'pending',
  referring_profile_id uuid references public.profiles(id) on delete set null,
  receiving_profile_id uuid references public.profiles(id) on delete set null,
  referring_agency_id uuid references public.agencies(id) on delete set null,
  receiving_agency_id uuid references public.agencies(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  client_name text not null,
  client_phone text,
  property_title text,
  location text,
  deal_value numeric(14,2) not null default 0,
  currency text not null default 'NGN',
  commission_share numeric(5,2) not null default 0,
  expected_commission numeric(14,2) not null default 0,
  accepted_at timestamptz,
  converted_at timestamptz,
  paid_at timestamptz,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (agency_id, referral_code)
);

create table if not exists public.discovery_sources (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  name text not null,
  source_type public.discovery_source_type not null default 'manual_entry',
  url text,
  status public.discovery_source_status not null default 'active',
  last_checked_at timestamptz,
  discovered_count integer not null default 0,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.discovered_properties (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  discovery_source_id uuid references public.discovery_sources(id) on delete set null,
  converted_property_id uuid references public.properties(id) on delete set null,
  assigned_agent_id uuid references public.profiles(id) on delete set null,
  title text not null,
  property_type text not null,
  listing_category public.listing_category not null default 'sale',
  location text not null,
  address text,
  price numeric(14,2) not null default 0,
  currency text not null default 'NGN',
  owner_name text,
  owner_phone text,
  owner_email text,
  source_name text,
  source_url text,
  source_type public.discovery_source_type not null default 'manual_entry',
  status public.discovered_property_status not null default 'new',
  confidence_score integer not null default 0 check (confidence_score between 0 and 100),
  discovered_at timestamptz not null default now(),
  contacted_at timestamptz,
  verified_at timestamptz,
  converted_at timestamptz,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.discovered_property_duplicate_signals (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  discovered_property_id uuid references public.discovered_properties(id) on delete cascade,
  matching_discovered_property_id uuid references public.discovered_properties(id) on delete set null,
  matching_property_id uuid references public.properties(id) on delete set null,
  signal public.duplicate_signal not null,
  score integer not null default 0 check (score between 0 and 100),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_referrals_agency_id on public.referrals(agency_id);
create index if not exists idx_referrals_branch_id on public.referrals(branch_id);
create index if not exists idx_referrals_status on public.referrals(status);
create index if not exists idx_referrals_referring_profile on public.referrals(referring_profile_id);
create index if not exists idx_referrals_receiving_profile on public.referrals(receiving_profile_id);
create index if not exists idx_referrals_client_id on public.referrals(client_id);
create index if not exists idx_referrals_property_id on public.referrals(property_id);

create index if not exists idx_discovery_sources_agency_id on public.discovery_sources(agency_id);
create index if not exists idx_discovery_sources_source_type on public.discovery_sources(source_type);
create index if not exists idx_discovery_sources_status on public.discovery_sources(status);

create index if not exists idx_discovered_properties_agency_id on public.discovered_properties(agency_id);
create index if not exists idx_discovered_properties_branch_id on public.discovered_properties(branch_id);
create index if not exists idx_discovered_properties_source_id on public.discovered_properties(discovery_source_id);
create index if not exists idx_discovered_properties_assigned_agent on public.discovered_properties(assigned_agent_id);
create index if not exists idx_discovered_properties_status on public.discovered_properties(status);
create index if not exists idx_discovered_properties_source_type on public.discovered_properties(source_type);
create index if not exists idx_discovered_properties_location on public.discovered_properties(location);

create index if not exists idx_duplicate_signals_agency_id on public.discovered_property_duplicate_signals(agency_id);
create index if not exists idx_duplicate_signals_discovered_property_id on public.discovered_property_duplicate_signals(discovered_property_id);
create index if not exists idx_duplicate_signals_signal on public.discovered_property_duplicate_signals(signal);

create trigger set_referrals_updated_at before update on public.referrals for each row execute function public.set_updated_at();
create trigger set_discovery_sources_updated_at before update on public.discovery_sources for each row execute function public.set_updated_at();
create trigger set_discovered_properties_updated_at before update on public.discovered_properties for each row execute function public.set_updated_at();
