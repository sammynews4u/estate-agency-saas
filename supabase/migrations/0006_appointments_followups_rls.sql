-- EstateFlow Pro Appointments + Automated Follow-Up RLS Policies
-- Run this after 0005_appointments_followups_schema.sql.

alter table public.viewing_appointments enable row level security;
alter table public.follow_up_tasks enable row level security;
alter table public.message_templates enable row level security;
alter table public.campaigns enable row level security;

-- Appointments
create policy "Super admin can manage viewing appointments"
on public.viewing_appointments for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency viewing appointments"
on public.viewing_appointments for all
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

create policy "Agents can manage assigned viewing appointments"
on public.viewing_appointments for all
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

create policy "Clients can read own viewing appointments"
on public.viewing_appointments for select
to authenticated
using (
  public.current_user_role() = 'client'
  and public.current_user_status() = 'active'
  and client_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

create policy "Landlords can read own property viewing appointments"
on public.viewing_appointments for select
to authenticated
using (
  public.current_user_role() = 'landlord'
  and public.current_user_status() = 'active'
  and owner_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

-- Follow-up tasks
create policy "Super admin can manage follow up tasks"
on public.follow_up_tasks for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency follow up tasks"
on public.follow_up_tasks for all
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

create policy "Agents can manage assigned follow up tasks"
on public.follow_up_tasks for all
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

-- Templates
create policy "Super admin can manage message templates"
on public.message_templates for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency message templates"
on public.message_templates for all
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

create policy "Agents can read active agency message templates"
on public.message_templates for select
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and is_active = true
);

-- Campaigns
create policy "Super admin can manage campaigns"
on public.campaigns for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency campaigns"
on public.campaigns for all
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

create policy "Agents can read agency campaigns"
on public.campaigns for select
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);
