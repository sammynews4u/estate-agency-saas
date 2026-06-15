-- EstateFlow Pro Property Marketplace + CRM Schema
-- Run this after 0002_foundation_rls.sql.

create type public.listing_category as enum ('sale', 'rent');
create type public.property_status as enum (
  'available',
  'sold',
  'reserved',
  'pending_verification',
  'under_review',
  'occupied',
  'vacant',
  'under_negotiation',
  'unavailable'
);
create type public.property_media_type as enum ('image', 'video', 'floor_plan', 'virtual_tour');
create type public.client_type as enum ('buyer', 'seller', 'landlord', 'tenant', 'investor', 'developer');
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'viewing_booked', 'negotiating', 'won', 'lost', 'dormant');
create type public.inquiry_status as enum ('new', 'assigned', 'contacted', 'viewing_booked', 'closed', 'spam');

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  assigned_agent_id uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  full_name text not null,
  email text,
  phone text not null,
  type public.client_type not null default 'buyer',
  budget_min numeric(14,2) default 0,
  budget_max numeric(14,2) default 0,
  preferred_location text,
  property_preference text,
  timeline text,
  lead_source text,
  status public.lead_status not null default 'new',
  last_contacted_at date,
  next_follow_up_at date,
  tags text[] not null default '{}',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  assigned_agent_id uuid references public.profiles(id) on delete set null,
  owner_profile_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  property_type text not null,
  listing_category public.listing_category not null,
  price numeric(14,2) not null default 0,
  currency text not null default 'NGN',
  location text not null,
  city text,
  state text,
  address text,
  bedrooms integer not null default 0,
  bathrooms integer not null default 0,
  toilets integer not null default 0,
  parking_spaces integer not null default 0,
  land_size text,
  building_size text,
  furnishing_status text,
  property_condition text,
  year_built integer,
  legal_status text,
  ownership_type text,
  amenities text[] not null default '{}',
  listing_source text,
  status public.property_status not null default 'pending_verification',
  featured boolean not null default false,
  verified boolean not null default false,
  date_listed date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.property_media (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  agency_id uuid references public.agencies(id) on delete cascade,
  type public.property_media_type not null default 'image',
  url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  agency_id uuid references public.agencies(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, property_id)
);

create table if not exists public.property_inquiries (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  assigned_agent_id uuid references public.profiles(id) on delete set null,
  name text not null,
  email text,
  phone text,
  message text,
  source text not null default 'website',
  status public.inquiry_status not null default 'new',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  client_id uuid references public.clients(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  assigned_agent_id uuid references public.profiles(id) on delete set null,
  interest text not null,
  source text,
  status public.lead_status not null default 'new',
  value_estimate numeric(14,2) default 0,
  next_action text,
  next_follow_up_at date,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_notes (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  note text not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.communications (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  channel text not null,
  direction text not null check (direction in ('inbound', 'outbound')),
  subject text,
  message text not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_clients_agency_id on public.clients(agency_id);
create index if not exists idx_clients_assigned_agent_id on public.clients(assigned_agent_id);
create index if not exists idx_clients_status on public.clients(status);
create index if not exists idx_properties_agency_id on public.properties(agency_id);
create index if not exists idx_properties_assigned_agent_id on public.properties(assigned_agent_id);
create index if not exists idx_properties_listing_category on public.properties(listing_category);
create index if not exists idx_properties_status on public.properties(status);
create index if not exists idx_properties_location on public.properties(location);
create index if not exists idx_property_media_property_id on public.property_media(property_id);
create index if not exists idx_property_inquiries_agency_id on public.property_inquiries(agency_id);
create index if not exists idx_property_inquiries_property_id on public.property_inquiries(property_id);
create index if not exists idx_leads_agency_id on public.leads(agency_id);
create index if not exists idx_leads_assigned_agent_id on public.leads(assigned_agent_id);
create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_crm_notes_client_id on public.crm_notes(client_id);
create index if not exists idx_communications_client_id on public.communications(client_id);

create trigger set_clients_updated_at before update on public.clients for each row execute function public.set_updated_at();
create trigger set_properties_updated_at before update on public.properties for each row execute function public.set_updated_at();
create trigger set_property_media_updated_at before update on public.property_media for each row execute function public.set_updated_at();
create trigger set_property_inquiries_updated_at before update on public.property_inquiries for each row execute function public.set_updated_at();
create trigger set_leads_updated_at before update on public.leads for each row execute function public.set_updated_at();
create trigger set_crm_notes_updated_at before update on public.crm_notes for each row execute function public.set_updated_at();
create trigger set_communications_updated_at before update on public.communications for each row execute function public.set_updated_at();
