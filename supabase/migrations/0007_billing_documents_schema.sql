-- EstateFlow Pro Receipt, Invoice + Document Management Schema
-- Run this after 0006_appointments_followups_rls.sql.

create type public.invoice_status as enum ('draft', 'sent', 'paid', 'overdue', 'cancelled');
create type public.receipt_status as enum ('issued', 'voided');
create type public.payment_method as enum ('cash', 'bank_transfer', 'pos', 'cheque', 'other');
create type public.document_type as enum (
  'contract',
  'lease_agreement',
  'property_document',
  'ownership_record',
  'inspection_report',
  'valuation_report',
  'client_kyc',
  'agency_document',
  'invoice',
  'receipt'
);
create type public.document_status as enum ('draft', 'pending_review', 'approved', 'rejected', 'expired');
create type public.document_visibility as enum ('private', 'agency', 'client_visible', 'public');

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  client_profile_id uuid references public.profiles(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  invoice_number text not null,
  client_name text not null,
  client_email text,
  item_description text not null,
  amount numeric(14,2) not null default 0,
  tax numeric(14,2) not null default 0,
  discount numeric(14,2) not null default 0,
  total numeric(14,2) generated always as (amount + tax - discount) stored,
  currency text not null default 'NGN',
  due_date date,
  status public.invoice_status not null default 'draft',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (agency_id, invoice_number)
);

create table if not exists public.receipts (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  invoice_id uuid references public.invoices(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  client_profile_id uuid references public.profiles(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  received_by uuid references public.profiles(id) on delete set null,
  receipt_number text not null,
  client_name text not null,
  amount_paid numeric(14,2) not null default 0,
  currency text not null default 'NGN',
  payment_method public.payment_method not null default 'bank_transfer',
  payment_date date not null default current_date,
  purpose text not null,
  status public.receipt_status not null default 'issued',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (agency_id, receipt_number)
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references public.agencies(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  uploaded_by uuid references public.profiles(id) on delete set null,
  owner_profile_id uuid references public.profiles(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  invoice_id uuid references public.invoices(id) on delete set null,
  receipt_id uuid references public.receipts(id) on delete set null,
  title text not null,
  document_type public.document_type not null default 'property_document',
  status public.document_status not null default 'pending_review',
  visibility public.document_visibility not null default 'agency',
  storage_bucket text not null default 'documents',
  storage_path text,
  file_name text,
  mime_type text,
  file_size_bytes bigint,
  related_label text,
  expiry_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_invoices_agency_id on public.invoices(agency_id);
create index if not exists idx_invoices_branch_id on public.invoices(branch_id);
create index if not exists idx_invoices_client_id on public.invoices(client_id);
create index if not exists idx_invoices_client_profile_id on public.invoices(client_profile_id);
create index if not exists idx_invoices_property_id on public.invoices(property_id);
create index if not exists idx_invoices_status on public.invoices(status);
create index if not exists idx_invoices_due_date on public.invoices(due_date);

create index if not exists idx_receipts_agency_id on public.receipts(agency_id);
create index if not exists idx_receipts_invoice_id on public.receipts(invoice_id);
create index if not exists idx_receipts_client_id on public.receipts(client_id);
create index if not exists idx_receipts_client_profile_id on public.receipts(client_profile_id);
create index if not exists idx_receipts_property_id on public.receipts(property_id);
create index if not exists idx_receipts_payment_date on public.receipts(payment_date);

create index if not exists idx_documents_agency_id on public.documents(agency_id);
create index if not exists idx_documents_uploaded_by on public.documents(uploaded_by);
create index if not exists idx_documents_owner_profile_id on public.documents(owner_profile_id);
create index if not exists idx_documents_property_id on public.documents(property_id);
create index if not exists idx_documents_client_id on public.documents(client_id);
create index if not exists idx_documents_type on public.documents(document_type);
create index if not exists idx_documents_status on public.documents(status);
create index if not exists idx_documents_visibility on public.documents(visibility);

create trigger set_invoices_updated_at before update on public.invoices for each row execute function public.set_updated_at();
create trigger set_receipts_updated_at before update on public.receipts for each row execute function public.set_updated_at();
create trigger set_documents_updated_at before update on public.documents for each row execute function public.set_updated_at();
