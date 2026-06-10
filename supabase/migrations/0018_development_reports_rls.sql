-- EstateFlow Pro Construction & Development + Reports/Analytics RLS Policies
-- Run this after 0017_development_reports_schema.sql.

alter table public.developer_projects enable row level security;
alter table public.project_units enable row level security;
alter table public.construction_progress_records enable row level security;
alter table public.development_sales enable row level security;
alter table public.report_snapshots enable row level security;
alter table public.analytics_insights enable row level security;
alter table public.report_exports enable row level security;

create policy "Super admin can manage developer projects"
on public.developer_projects for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency and developer users can manage own developer projects"
on public.developer_projects for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'developer')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'developer')
);

create policy "Agency users can read developer projects"
on public.developer_projects for select to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Super admin can manage project units"
on public.project_units for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency and developer users can manage project units"
on public.project_units for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'developer')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'developer')
);

create policy "Agency users can read project units"
on public.project_units for select to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Super admin can manage construction progress"
on public.construction_progress_records for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency and developer users can manage construction progress"
on public.construction_progress_records for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'developer')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'developer')
);

create policy "Agency users can read construction progress"
on public.construction_progress_records for select to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Super admin can manage development sales"
on public.development_sales for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency and developer users can manage development sales"
on public.development_sales for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'developer')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'developer')
);

create policy "Agency users can read development sales"
on public.development_sales for select to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Super admin can manage reports"
on public.report_snapshots for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency finance admin users can manage reports"
on public.report_snapshots for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'finance_staff')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'finance_staff')
);

create policy "Agency users can read reports"
on public.report_snapshots for select to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Super admin can manage analytics insights"
on public.analytics_insights for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can read analytics insights"
on public.analytics_insights for select to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Agency admins can manage analytics insights"
on public.analytics_insights for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'finance_staff')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'finance_staff')
);

create policy "Super admin can manage report exports"
on public.report_exports for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can read report exports"
on public.report_exports for select to authenticated
using (public.current_user_status() = 'active' and agency_id = public.current_user_agency_id());

create policy "Agency finance admin users can create report exports"
on public.report_exports for insert to authenticated
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'finance_staff', 'developer')
);
