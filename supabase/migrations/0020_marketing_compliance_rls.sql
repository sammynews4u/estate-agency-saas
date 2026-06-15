-- EstateFlow Pro Marketing Campaign Studio + KYC/Compliance Verification RLS Policies
-- Run this after 0019_marketing_compliance_schema.sql.

alter table public.marketing_campaigns enable row level security;
alter table public.marketing_assets enable row level security;
alter table public.marketing_schedules enable row level security;
alter table public.verification_records enable row level security;
alter table public.compliance_checklist_items enable row level security;

create policy "Super admin can manage marketing campaigns"
on public.marketing_campaigns for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can read marketing campaigns"
on public.marketing_campaigns for select to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Agency admins agents and developers can manage marketing campaigns"
on public.marketing_campaigns for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'agent', 'developer')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'agent', 'developer')
);

create policy "Super admin can manage marketing assets"
on public.marketing_assets for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can read marketing assets"
on public.marketing_assets for select to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Agency marketing users can manage marketing assets"
on public.marketing_assets for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'agent', 'developer')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'agent', 'developer')
);

create policy "Super admin can manage marketing schedules"
on public.marketing_schedules for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can read marketing schedules"
on public.marketing_schedules for select to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Agency marketing users can manage marketing schedules"
on public.marketing_schedules for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'agent', 'developer')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'agent', 'developer')
);

create policy "Super admin can manage verification records"
on public.verification_records for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency compliance users can manage verification records"
on public.verification_records for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'agent')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'agent')
);

create policy "Users can read own verification records"
on public.verification_records for select to authenticated
using (
  public.current_user_status() = 'active'
  and (
    subject_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
    or agency_id = public.current_user_agency_id()
  )
);

create policy "Users can create own verification records"
on public.verification_records for insert to authenticated
with check (
  public.current_user_status() = 'active'
  and (
    subject_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
    or agency_id = public.current_user_agency_id()
  )
);

create policy "Super admin can manage compliance checklist"
on public.compliance_checklist_items for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can read compliance checklist"
on public.compliance_checklist_items for select to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Agency admins can manage compliance checklist"
on public.compliance_checklist_items for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() = 'agency_admin'
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() = 'agency_admin'
);
