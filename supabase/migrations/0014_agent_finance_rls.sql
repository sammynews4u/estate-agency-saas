-- EstateFlow Pro Agent Management + Finance & Business Management RLS Policies
-- Run this after 0013_agent_finance_schema.sql.

alter table public.agent_profiles enable row level security;
alter table public.commission_records enable row level security;
alter table public.expenses enable row level security;
alter table public.payroll_records enable row level security;
alter table public.branch_finance_snapshots enable row level security;

create policy "Super admin can manage agent profiles"
on public.agent_profiles for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency agent profiles"
on public.agent_profiles for all
to authenticated
using (public.current_user_role() = 'agency_admin' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id())
with check (public.current_user_role() = 'agency_admin' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Agents can read own agent profile"
on public.agent_profiles for select
to authenticated
using (public.current_user_role() = 'agent' and public.current_user_status() = 'active' and profile_id = public.current_user_profile_id());

create policy "Finance staff can read agency agent profiles"
on public.agent_profiles for select
to authenticated
using (public.current_user_role() = 'finance_staff' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Super admin can manage commission records"
on public.commission_records for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency commission records"
on public.commission_records for all
to authenticated
using (public.current_user_role() = 'agency_admin' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id())
with check (public.current_user_role() = 'agency_admin' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Agents can read own commission records"
on public.commission_records for select
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and exists (
    select 1 from public.agent_profiles ap
    where ap.id = commission_records.agent_profile_id
      and ap.profile_id = public.current_user_profile_id()
  )
);

create policy "Finance staff can manage agency commission records"
on public.commission_records for all
to authenticated
using (public.current_user_role() = 'finance_staff' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id())
with check (public.current_user_role() = 'finance_staff' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Super admin can manage expenses"
on public.expenses for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency expenses"
on public.expenses for all
to authenticated
using (public.current_user_role() = 'agency_admin' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id())
with check (public.current_user_role() = 'agency_admin' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Finance staff can manage agency expenses"
on public.expenses for all
to authenticated
using (public.current_user_role() = 'finance_staff' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id())
with check (public.current_user_role() = 'finance_staff' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Agents can read own submitted expenses"
on public.expenses for select
to authenticated
using (public.current_user_role() = 'agent' and public.current_user_status() = 'active' and staff_id = public.current_user_profile_id());

create policy "Super admin can manage payroll records"
on public.payroll_records for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency payroll records"
on public.payroll_records for all
to authenticated
using (public.current_user_role() = 'agency_admin' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id())
with check (public.current_user_role() = 'agency_admin' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Finance staff can manage agency payroll records"
on public.payroll_records for all
to authenticated
using (public.current_user_role() = 'finance_staff' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id())
with check (public.current_user_role() = 'finance_staff' and public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Staff can read own payroll records"
on public.payroll_records for select
to authenticated
using (public.current_user_status() = 'active' and staff_id = public.current_user_profile_id());

create policy "Super admin can manage branch finance snapshots"
on public.branch_finance_snapshots for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency finance users can read branch finance snapshots"
on public.branch_finance_snapshots for select
to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id() and public.current_user_role() in ('agency_admin', 'finance_staff'));

create policy "Agency finance users can manage branch finance snapshots"
on public.branch_finance_snapshots for all
to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id() and public.current_user_role() in ('agency_admin', 'finance_staff'))
with check (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id() and public.current_user_role() in ('agency_admin', 'finance_staff'));
