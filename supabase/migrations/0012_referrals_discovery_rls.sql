-- EstateFlow Pro Referral Network + Property Discovery RLS Policies
-- Run this after 0011_referrals_discovery_schema.sql.

alter table public.referrals enable row level security;
alter table public.discovery_sources enable row level security;
alter table public.discovered_properties enable row level security;
alter table public.discovered_property_duplicate_signals enable row level security;

-- Referral Network
create policy "Super admin can manage referrals"
on public.referrals for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins can manage agency referrals"
on public.referrals for all
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

create policy "Agents can manage referrals involving them"
on public.referrals for all
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and (
    created_by = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
    or referring_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
    or receiving_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
  )
)
with check (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

-- Discovery sources
create policy "Super admin can manage discovery sources"
on public.discovery_sources for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins can manage agency discovery sources"
on public.discovery_sources for all
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

create policy "Agents can read agency discovery sources"
on public.discovery_sources for select
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

-- Discovered properties
create policy "Super admin can manage discovered properties"
on public.discovered_properties for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins can manage agency discovered properties"
on public.discovered_properties for all
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

create policy "Agents can manage assigned discovered properties"
on public.discovered_properties for all
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and (
    assigned_agent_id is null
    or assigned_agent_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
    or created_by = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
  )
)
with check (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

-- Duplicate signals
create policy "Super admin can manage duplicate signals"
on public.discovered_property_duplicate_signals for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins and agents can manage agency duplicate signals"
on public.discovered_property_duplicate_signals for all
to authenticated
using (
  public.current_user_role() in ('agency_admin', 'agent')
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
)
with check (
  public.current_user_role() in ('agency_admin', 'agent')
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);
