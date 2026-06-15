-- EstateFlow Pro Subscription/Billing Plans + Audit/Risk Control RLS Policies
-- Run this after 0023_subscriptions_risk_schema.sql.

alter table public.platform_subscriptions enable row level security;
alter table public.subscription_feature_gates enable row level security;
alter table public.subscription_usage_events enable row level security;
alter table public.risk_register enable row level security;
alter table public.audit_trail_events enable row level security;
alter table public.internal_control_checks enable row level security;

create policy "Super admin can manage platform subscriptions"
on public.platform_subscriptions for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins and finance can read own platform subscription"
on public.platform_subscriptions for select to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'finance_staff')
);

create policy "Super admin can manage subscription feature gates"
on public.subscription_feature_gates for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Authenticated active users can read subscription feature gates"
on public.subscription_feature_gates for select to authenticated
using (public.current_user_status() = 'active');

create policy "Super admin can manage subscription usage events"
on public.subscription_usage_events for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins and finance can read own subscription usage events"
on public.subscription_usage_events for select to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'finance_staff')
);

create policy "Super admin can manage risk register"
on public.risk_register for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins and finance can manage agency risk register"
on public.risk_register for all to authenticated
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

create policy "Super admin can read audit trail events"
on public.audit_trail_events for select to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins and finance can read agency audit trail events"
on public.audit_trail_events for select to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'finance_staff')
);

create policy "System-facing users can insert audit trail events"
on public.audit_trail_events for insert to authenticated
with check (
  public.current_user_status() = 'active'
  and (
    public.current_user_role() = 'super_admin'
    or agency_id = public.current_user_agency_id()
  )
);

create policy "Super admin can manage internal control checks"
on public.internal_control_checks for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins and finance can manage agency internal control checks"
on public.internal_control_checks for all to authenticated
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
