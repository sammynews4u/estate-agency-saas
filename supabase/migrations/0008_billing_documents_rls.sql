-- EstateFlow Pro Receipt, Invoice + Document Management RLS Policies
-- Run this after 0007_billing_documents_schema.sql.

alter table public.invoices enable row level security;
alter table public.receipts enable row level security;
alter table public.documents enable row level security;

-- Invoices
create policy "Super admin can manage invoices"
on public.invoices for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin and finance can manage agency invoices"
on public.invoices for all
to authenticated
using (
  public.current_user_role() in ('agency_admin', 'finance_staff')
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
)
with check (
  public.current_user_role() in ('agency_admin', 'finance_staff')
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

create policy "Agents can read invoices in their agency"
on public.invoices for select
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

create policy "Clients can read own invoices"
on public.invoices for select
to authenticated
using (
  public.current_user_role() = 'client'
  and public.current_user_status() = 'active'
  and client_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

-- Receipts
create policy "Super admin can manage receipts"
on public.receipts for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin and finance can manage agency receipts"
on public.receipts for all
to authenticated
using (
  public.current_user_role() in ('agency_admin', 'finance_staff')
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
)
with check (
  public.current_user_role() in ('agency_admin', 'finance_staff')
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

create policy "Agents can read receipts in their agency"
on public.receipts for select
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

create policy "Clients can read own receipts"
on public.receipts for select
to authenticated
using (
  public.current_user_role() = 'client'
  and public.current_user_status() = 'active'
  and client_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

-- Documents
create policy "Super admin can manage documents"
on public.documents for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency documents"
on public.documents for all
to authenticated
using (
  public.current_user_role() = 'agency_admin'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
)
with check (
  public.current_user_role() = 'agency_admin'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

create policy "Finance can read and create agency finance documents"
on public.documents for all
to authenticated
using (
  public.current_user_role() = 'finance_staff'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and document_type in ('invoice', 'receipt', 'agency_document')
)
with check (
  public.current_user_role() = 'finance_staff'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and document_type in ('invoice', 'receipt', 'agency_document')
);

create policy "Agents can manage documents they uploaded or own agency visible documents"
on public.documents for all
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and (
    uploaded_by = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
    or visibility in ('agency', 'client_visible', 'public')
  )
)
with check (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and uploaded_by = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

create policy "Owners and clients can read visible own documents"
on public.documents for select
to authenticated
using (
  public.current_user_status() = 'active'
  and visibility in ('client_visible', 'public')
  and owner_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

create policy "Active users can upload own documents"
on public.documents for insert
to authenticated
with check (
  public.current_user_status() = 'active'
  and uploaded_by = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);
