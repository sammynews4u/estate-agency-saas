-- EstateFlow Pro Deal Pipeline/Transaction Management + Customer Support/Ticketing RLS Policies
-- Run this after 0021_transactions_support_schema.sql.

alter table public.deal_transactions enable row level security;
alter table public.transaction_tasks enable row level security;
alter table public.transaction_checklist_items enable row level security;
alter table public.support_tickets enable row level security;
alter table public.support_ticket_messages enable row level security;
alter table public.support_sla_rules enable row level security;

create policy "Super admin can manage deal transactions"
on public.deal_transactions for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins finance and agents can manage agency deal transactions"
on public.deal_transactions for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'agent', 'finance_staff')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'agent', 'finance_staff')
);

create policy "Clients landlords and developers can read related deal transactions"
on public.deal_transactions for select to authenticated
using (
  public.current_user_status() = 'active'
  and (
    agency_id = public.current_user_agency_id()
    or landlord_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
  )
);

create policy "Super admin can manage transaction tasks"
on public.transaction_tasks for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can manage transaction tasks"
on public.transaction_tasks for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('super_admin', 'agency_admin', 'agent', 'finance_staff')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('super_admin', 'agency_admin', 'agent', 'finance_staff')
);

create policy "Super admin can manage transaction checklist items"
on public.transaction_checklist_items for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency users can manage transaction checklist items"
on public.transaction_checklist_items for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('super_admin', 'agency_admin', 'agent', 'finance_staff')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('super_admin', 'agency_admin', 'agent', 'finance_staff')
);

create policy "Super admin can manage support tickets"
on public.support_tickets for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency staff can manage support tickets"
on public.support_tickets for all to authenticated
using (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'agent', 'finance_staff')
)
with check (
  public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and public.current_user_role() in ('agency_admin', 'agent', 'finance_staff')
);

create policy "Users can read and create own support tickets"
on public.support_tickets for all to authenticated
using (
  public.current_user_status() = 'active'
  and (
    requester_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
    or agency_id = public.current_user_agency_id()
  )
)
with check (
  public.current_user_status() = 'active'
  and (
    requester_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
    or agency_id = public.current_user_agency_id()
  )
);

create policy "Super admin can manage support ticket messages"
on public.support_ticket_messages for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Users can read support ticket messages they can access"
on public.support_ticket_messages for select to authenticated
using (
  public.current_user_status() = 'active'
  and (
    agency_id = public.current_user_agency_id()
    or exists (
      select 1 from public.support_tickets t
      where t.id = support_ticket_messages.ticket_id
      and t.requester_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
    )
  )
);

create policy "Users can create support ticket messages they can access"
on public.support_ticket_messages for insert to authenticated
with check (
  public.current_user_status() = 'active'
  and (
    agency_id = public.current_user_agency_id()
    or exists (
      select 1 from public.support_tickets t
      where t.id = support_ticket_messages.ticket_id
      and t.requester_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
    )
  )
);

create policy "Super admin can manage support SLA rules"
on public.support_sla_rules for all to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins can manage support SLA rules"
on public.support_sla_rules for all to authenticated
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
