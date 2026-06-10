-- EstateFlow Pro Property Management System + Service Marketplace RLS Policies
-- Run this after 0015_property_management_services_schema.sql.

alter table public.tenants enable row level security;
alter table public.leases enable row level security;
alter table public.maintenance_records enable row level security;
alter table public.inspection_reports enable row level security;
alter table public.occupancy_records enable row level security;
alter table public.service_providers enable row level security;
alter table public.service_requests enable row level security;
alter table public.service_quotes enable row level security;
alter table public.service_portfolio_items enable row level security;
alter table public.service_reviews enable row level security;

create policy "Super admin can manage tenants"
on public.tenants for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can manage agency tenants"
on public.tenants for all to authenticated
using (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'finance_staff') and agency_id = public.current_user_agency_id())
with check (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'finance_staff') and agency_id = public.current_user_agency_id());

create policy "Agents can read assigned tenants"
on public.tenants for select to authenticated
using (public.current_user_role() = 'agent' and public.current_user_status() = 'active' and assigned_agent_id = public.current_user_profile_id());

create policy "Landlords can read own tenants"
on public.tenants for select to authenticated
using (public.current_user_role() = 'landlord' and public.current_user_status() = 'active' and landlord_id = public.current_user_profile_id());

create policy "Super admin can manage leases"
on public.leases for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can manage agency leases"
on public.leases for all to authenticated
using (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'finance_staff') and agency_id = public.current_user_agency_id())
with check (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'finance_staff') and agency_id = public.current_user_agency_id());

create policy "Agents can read leases for assigned tenants"
on public.leases for select to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and exists (select 1 from public.tenants t where t.id = leases.tenant_id and t.assigned_agent_id = public.current_user_profile_id())
);

create policy "Landlords can read own leases"
on public.leases for select to authenticated
using (public.current_user_role() = 'landlord' and public.current_user_status() = 'active' and landlord_id = public.current_user_profile_id());

create policy "Super admin can manage maintenance records"
on public.maintenance_records for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can manage agency maintenance records"
on public.maintenance_records for all to authenticated
using (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'finance_staff') and agency_id = public.current_user_agency_id())
with check (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'finance_staff') and agency_id = public.current_user_agency_id());

create policy "Agents can read and update assigned maintenance records"
on public.maintenance_records for all to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and exists (select 1 from public.properties p where p.id = maintenance_records.property_id and p.assigned_agent_id = public.current_user_profile_id())
)
with check (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and exists (select 1 from public.properties p where p.id = maintenance_records.property_id and p.assigned_agent_id = public.current_user_profile_id())
);

create policy "Landlords can read own maintenance records"
on public.maintenance_records for select to authenticated
using (public.current_user_role() = 'landlord' and public.current_user_status() = 'active' and landlord_id = public.current_user_profile_id());

create policy "Super admin can manage inspection reports"
on public.inspection_reports for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can manage agency inspection reports"
on public.inspection_reports for all to authenticated
using (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'finance_staff') and agency_id = public.current_user_agency_id())
with check (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'finance_staff') and agency_id = public.current_user_agency_id());

create policy "Agents can manage assigned inspection reports"
on public.inspection_reports for all to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and (inspector_id = public.current_user_profile_id() or exists (select 1 from public.properties p where p.id = inspection_reports.property_id and p.assigned_agent_id = public.current_user_profile_id()))
)
with check (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and (inspector_id = public.current_user_profile_id() or exists (select 1 from public.properties p where p.id = inspection_reports.property_id and p.assigned_agent_id = public.current_user_profile_id()))
);

create policy "Landlords can read own inspection reports"
on public.inspection_reports for select to authenticated
using (public.current_user_role() = 'landlord' and public.current_user_status() = 'active' and landlord_id = public.current_user_profile_id());

create policy "Super admin can manage occupancy records"
on public.occupancy_records for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can manage agency occupancy records"
on public.occupancy_records for all to authenticated
using (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'finance_staff') and agency_id = public.current_user_agency_id())
with check (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'finance_staff') and agency_id = public.current_user_agency_id());

create policy "Landlords can read own occupancy records"
on public.occupancy_records for select to authenticated
using (public.current_user_role() = 'landlord' and public.current_user_status() = 'active' and landlord_id = public.current_user_profile_id());

create policy "Authenticated users can read active service providers"
on public.service_providers for select to authenticated
using (public.current_user_status() = 'active' and status = 'active');

create policy "Super admin can manage service providers"
on public.service_providers for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency service providers"
on public.service_providers for all to authenticated
using (public.current_user_role() = 'agency_admin' and public.current_user_status() = 'active' and (agency_id is null or agency_id = public.current_user_agency_id()))
with check (public.current_user_role() = 'agency_admin' and public.current_user_status() = 'active' and (agency_id is null or agency_id = public.current_user_agency_id()));

create policy "Service providers can manage own profile"
on public.service_providers for all to authenticated
using (public.current_user_role() = 'service_provider' and public.current_user_status() = 'active' and profile_id = public.current_user_profile_id())
with check (public.current_user_role() = 'service_provider' and public.current_user_status() = 'active' and profile_id = public.current_user_profile_id());

create policy "Super admin can manage service requests"
on public.service_requests for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can manage agency service requests"
on public.service_requests for all to authenticated
using (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'agent', 'finance_staff') and agency_id = public.current_user_agency_id())
with check (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'agent', 'finance_staff') and agency_id = public.current_user_agency_id());

create policy "Clients and landlords can manage own service requests"
on public.service_requests for all to authenticated
using (public.current_user_status() = 'active' and requester_id = public.current_user_profile_id())
with check (public.current_user_status() = 'active' and requester_id = public.current_user_profile_id());

create policy "Service providers can read assigned service requests"
on public.service_requests for select to authenticated
using (
  public.current_user_role() = 'service_provider'
  and public.current_user_status() = 'active'
  and exists (select 1 from public.service_providers sp where sp.id = service_requests.service_provider_id and sp.profile_id = public.current_user_profile_id())
);

create policy "Super admin can manage service quotes"
on public.service_quotes for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can manage agency service quotes"
on public.service_quotes for all to authenticated
using (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'agent', 'finance_staff') and agency_id = public.current_user_agency_id())
with check (public.current_user_status() = 'active' and public.current_user_role() in ('agency_admin', 'agent', 'finance_staff') and agency_id = public.current_user_agency_id());

create policy "Service providers can manage own quotes"
on public.service_quotes for all to authenticated
using (
  public.current_user_role() = 'service_provider'
  and public.current_user_status() = 'active'
  and exists (select 1 from public.service_providers sp where sp.id = service_quotes.service_provider_id and sp.profile_id = public.current_user_profile_id())
)
with check (
  public.current_user_role() = 'service_provider'
  and public.current_user_status() = 'active'
  and exists (select 1 from public.service_providers sp where sp.id = service_quotes.service_provider_id and sp.profile_id = public.current_user_profile_id())
);

create policy "Authenticated users can read service portfolio items"
on public.service_portfolio_items for select to authenticated
using (public.current_user_status() = 'active');

create policy "Service providers can manage own portfolio items"
on public.service_portfolio_items for all to authenticated
using (
  public.current_user_role() = 'service_provider'
  and public.current_user_status() = 'active'
  and exists (select 1 from public.service_providers sp where sp.id = service_portfolio_items.service_provider_id and sp.profile_id = public.current_user_profile_id())
)
with check (
  public.current_user_role() = 'service_provider'
  and public.current_user_status() = 'active'
  and exists (select 1 from public.service_providers sp where sp.id = service_portfolio_items.service_provider_id and sp.profile_id = public.current_user_profile_id())
);

create policy "Super admin and agency admin can manage service portfolio items"
on public.service_portfolio_items for all to authenticated
using (public.current_user_status() = 'active' and public.current_user_role() in ('super_admin', 'agency_admin'))
with check (public.current_user_status() = 'active' and public.current_user_role() in ('super_admin', 'agency_admin'));

create policy "Authenticated users can read service reviews"
on public.service_reviews for select to authenticated
using (public.current_user_status() = 'active');

create policy "Request owners can create service reviews"
on public.service_reviews for insert to authenticated
with check (public.current_user_status() = 'active' and reviewer_id = public.current_user_profile_id());

create policy "Service providers can read own service reviews"
on public.service_reviews for select to authenticated
using (
  public.current_user_role() = 'service_provider'
  and public.current_user_status() = 'active'
  and exists (select 1 from public.service_providers sp where sp.id = service_reviews.service_provider_id and sp.profile_id = public.current_user_profile_id())
);
