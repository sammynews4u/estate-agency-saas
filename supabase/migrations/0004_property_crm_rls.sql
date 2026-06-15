-- EstateFlow Pro Property Marketplace + CRM RLS Policies
-- Run this after 0003_property_crm_schema.sql.

alter table public.clients enable row level security;
alter table public.properties enable row level security;
alter table public.property_media enable row level security;
alter table public.saved_properties enable row level security;
alter table public.property_inquiries enable row level security;
alter table public.leads enable row level security;
alter table public.crm_notes enable row level security;
alter table public.communications enable row level security;

-- Clients
create policy "Super admin can manage clients"
on public.clients for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency clients"
on public.clients for all
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

create policy "Agents can read assigned clients"
on public.clients for select
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

create policy "Agents can update assigned clients"
on public.clients for update
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
)
with check (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

-- Properties
create policy "Super admin can manage properties"
on public.properties for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Active users can browse verified available properties"
on public.properties for select
to authenticated
using (
  public.current_user_status() = 'active'
  and verified = true
  and status in ('available', 'vacant', 'under_negotiation', 'reserved')
);

create policy "Agency admin can manage agency properties"
on public.properties for all
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

create policy "Agents can read assigned properties"
on public.properties for select
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

create policy "Agents can update assigned properties"
on public.properties for update
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
)
with check (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

create policy "Landlords can create own property submissions"
on public.properties for insert
to authenticated
with check (
  public.current_user_role() = 'landlord'
  and public.current_user_status() = 'active'
  and owner_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

create policy "Landlords can read own property submissions"
on public.properties for select
to authenticated
using (
  public.current_user_role() = 'landlord'
  and public.current_user_status() = 'active'
  and owner_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

-- Property media
create policy "Active users can read media for visible properties"
on public.property_media for select
to authenticated
using (
  public.current_user_status() = 'active'
  and exists (
    select 1 from public.properties p
    where p.id = property_media.property_id
    and (
      p.verified = true
      or p.agency_id = public.current_user_agency_id()
      or p.assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
      or p.owner_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
    )
  )
);

create policy "Agency admins and assigned agents can manage property media"
on public.property_media for all
to authenticated
using (
  public.current_user_status() = 'active'
  and exists (
    select 1 from public.properties p
    where p.id = property_media.property_id
    and (
      (public.current_user_role() = 'agency_admin' and p.agency_id = public.current_user_agency_id())
      or (public.current_user_role() = 'agent' and p.assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1))
    )
  )
)
with check (
  public.current_user_status() = 'active'
  and exists (
    select 1 from public.properties p
    where p.id = property_media.property_id
    and (
      (public.current_user_role() = 'agency_admin' and p.agency_id = public.current_user_agency_id())
      or (public.current_user_role() = 'agent' and p.assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1))
    )
  )
);

-- Saved properties
create policy "Users can manage own saved properties"
on public.saved_properties for all
to authenticated
using (
  public.current_user_status() = 'active'
  and user_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
)
with check (
  public.current_user_status() = 'active'
  and user_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

-- Property inquiries
create policy "Super admin can manage property inquiries"
on public.property_inquiries for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency property inquiries"
on public.property_inquiries for all
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

create policy "Agents can read assigned property inquiries"
on public.property_inquiries for select
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

create policy "Active users can create inquiries"
on public.property_inquiries for insert
to authenticated
with check (public.current_user_status() = 'active');

-- Leads
create policy "Super admin can manage leads"
on public.leads for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency leads"
on public.leads for all
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

create policy "Agents can manage assigned leads"
on public.leads for all
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
)
with check (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

-- CRM notes
create policy "Agency users can read agency CRM notes"
on public.crm_notes for select
to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

create policy "Agency admin and agents can create CRM notes"
on public.crm_notes for insert
to authenticated
with check (
  public.current_user_status() = 'active'
  and public.current_user_role() in ('agency_admin', 'agent')
  and agency_id = public.current_user_agency_id()
);

-- Communications
create policy "Agency users can read agency communications"
on public.communications for select
to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

create policy "Agency admin and agents can create communications"
on public.communications for insert
to authenticated
with check (
  public.current_user_status() = 'active'
  and public.current_user_role() in ('agency_admin', 'agent')
  and agency_id = public.current_user_agency_id()
);
