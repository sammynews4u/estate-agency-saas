-- EstateFlow Pro Foundation Schema
-- Run this first in Supabase SQL editor.

create extension if not exists "pgcrypto";

create type public.user_role as enum (
  'super_admin',
  'agency_admin',
  'agent',
  'client',
  'landlord',
  'service_provider',
  'developer',
  'finance_staff'
);

create type public.user_status as enum ('active', 'pending', 'suspended');
create type public.agency_status as enum ('active', 'pending', 'suspended');
create type public.branch_status as enum ('active', 'inactive');
create type public.notification_type as enum ('info', 'success', 'warning', 'error');

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  name public.user_role not null unique,
  label text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  website text,
  logo_url text,
  address text,
  city text,
  state text,
  country text default 'Nigeria',
  status public.agency_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.branches (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  address text,
  city text,
  state text,
  country text default 'Nigeria',
  manager_id uuid,
  status public.branch_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) on delete cascade unique,
  full_name text not null,
  email text not null unique,
  phone text,
  avatar_url text,
  role public.user_role not null default 'client',
  agency_id uuid references public.agencies(id) on delete set null,
  branch_id uuid references public.branches(id) on delete set null,
  status public.user_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.branches
  add constraint branches_manager_id_fkey
  foreign key (manager_id) references public.profiles(id) on delete set null;

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  key text not null,
  value jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (agency_id, key)
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  action text not null,
  target_table text,
  target_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  type public.notification_type not null default 'info',
  read_status boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_auth_user_id on public.profiles(auth_user_id);
create index if not exists idx_profiles_agency_id on public.profiles(agency_id);
create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_branches_agency_id on public.branches(agency_id);
create index if not exists idx_activity_logs_agency_id on public.activity_logs(agency_id);
create index if not exists idx_notifications_user_id on public.notifications(user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_roles_updated_at before update on public.roles for each row execute function public.set_updated_at();
create trigger set_agencies_updated_at before update on public.agencies for each row execute function public.set_updated_at();
create trigger set_branches_updated_at before update on public.branches for each row execute function public.set_updated_at();
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger set_settings_updated_at before update on public.settings for each row execute function public.set_updated_at();

create or replace function public.current_profile()
returns public.profiles
language sql
stable
security definer
set search_path = public
as $$
  select * from public.profiles where auth_user_id = auth.uid() limit 1;
$$;

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where auth_user_id = auth.uid() limit 1;
$$;

create or replace function public.current_user_agency_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select agency_id from public.profiles where auth_user_id = auth.uid() limit 1;
$$;

create or replace function public.current_user_status()
returns public.user_status
language sql
stable
security definer
set search_path = public
as $$
  select status from public.profiles where auth_user_id = auth.uid() limit 1;
$$;
