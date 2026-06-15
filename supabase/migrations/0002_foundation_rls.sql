-- EstateFlow Pro Foundation RLS Policies
-- Run this after 0001_foundation_schema.sql.

alter table public.roles enable row level security;
alter table public.agencies enable row level security;
alter table public.branches enable row level security;
alter table public.profiles enable row level security;
alter table public.settings enable row level security;
alter table public.activity_logs enable row level security;
alter table public.notifications enable row level security;

-- Roles
create policy "Active authenticated users can read roles"
on public.roles for select
to authenticated
using (public.current_user_status() = 'active');

create policy "Super admin can manage roles"
on public.roles for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

-- Profiles
create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (auth.uid() = auth_user_id and status <> 'suspended');

create policy "Users can update own profile basic record"
on public.profiles for update
to authenticated
using (auth.uid() = auth_user_id and status <> 'suspended')
with check (auth.uid() = auth_user_id and status <> 'suspended');

create policy "Super admin can manage all profiles"
on public.profiles for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can read agency profiles"
on public.profiles for select
to authenticated
using (
  public.current_user_role() = 'agency_admin'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

create policy "Agency admin can update agency profiles"
on public.profiles for update
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

-- Agencies
create policy "Super admin can manage agencies"
on public.agencies for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can read own agency"
on public.agencies for select
to authenticated
using (
  public.current_user_status() = 'active'
  and id = public.current_user_agency_id()
);

create policy "Agency admin can update own agency"
on public.agencies for update
to authenticated
using (
  public.current_user_role() = 'agency_admin'
  and public.current_user_status() = 'active'
  and id = public.current_user_agency_id()
)
with check (
  public.current_user_role() = 'agency_admin'
  and public.current_user_status() = 'active'
  and id = public.current_user_agency_id()
);

-- Branches
create policy "Super admin can manage branches"
on public.branches for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can read agency branches"
on public.branches for select
to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

create policy "Agency admin can manage agency branches"
on public.branches for all
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

-- Settings
create policy "Super admin can manage settings"
on public.settings for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency settings"
on public.settings for all
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

-- Activity logs
create policy "Super admin can read activity logs"
on public.activity_logs for select
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can read agency activity logs"
on public.activity_logs for select
to authenticated
using (
  public.current_user_role() = 'agency_admin'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

create policy "Active users can insert activity logs"
on public.activity_logs for insert
to authenticated
with check (public.current_user_status() = 'active');

-- Notifications
create policy "Users can read own notifications"
on public.notifications for select
to authenticated
using (
  public.current_user_status() = 'active'
  and user_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

create policy "Users can update own notifications"
on public.notifications for update
to authenticated
using (
  public.current_user_status() = 'active'
  and user_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
)
with check (
  public.current_user_status() = 'active'
  and user_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

create policy "Super admin and agency admin can create notifications"
on public.notifications for insert
to authenticated
with check (
  public.current_user_status() = 'active'
  and public.current_user_role() in ('super_admin', 'agency_admin')
);
