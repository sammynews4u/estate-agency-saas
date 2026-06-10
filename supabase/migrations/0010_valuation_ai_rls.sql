-- EstateFlow Pro Property Valuation + AI Assistant RLS Policies
-- Run this after 0009_valuation_ai_schema.sql.

alter table public.valuation_reports enable row level security;
alter table public.valuation_comparables enable row level security;
alter table public.ai_prompt_templates enable row level security;
alter table public.ai_generations enable row level security;

-- Valuation reports
create policy "Super admin can manage valuation reports"
on public.valuation_reports for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admin can manage agency valuation reports"
on public.valuation_reports for all
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

create policy "Agents can manage valuation reports in agency"
on public.valuation_reports for all
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
)
with check (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
);

create policy "Landlords can read own valuation reports"
on public.valuation_reports for select
to authenticated
using (
  public.current_user_role() = 'landlord'
  and public.current_user_status() = 'active'
  and owner_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
);

-- Valuation comparables
create policy "Super admin can manage valuation comparables"
on public.valuation_comparables for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins and agents can manage agency valuation comparables"
on public.valuation_comparables for all
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

create policy "Landlords can read comparables for own valuation reports"
on public.valuation_comparables for select
to authenticated
using (
  public.current_user_role() = 'landlord'
  and public.current_user_status() = 'active'
  and exists (
    select 1 from public.valuation_reports vr
    where vr.id = valuation_report_id
    and vr.owner_profile_id = (select id from public.profiles where auth_user_id = auth.uid() limit 1)
  )
);

-- AI templates
create policy "Super admin can manage AI prompt templates"
on public.ai_prompt_templates for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins and agents can read AI prompt templates"
on public.ai_prompt_templates for select
to authenticated
using (
  public.current_user_role() in ('agency_admin', 'agent')
  and public.current_user_status() = 'active'
  and (agency_id = public.current_user_agency_id() or is_system_template = true)
);

create policy "Agency admins can manage agency AI prompt templates"
on public.ai_prompt_templates for all
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

-- AI generations
create policy "Super admin can manage AI generations"
on public.ai_generations for all
to authenticated
using (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active')
with check (public.current_user_role() = 'super_admin' and public.current_user_status() = 'active');

create policy "Agency admins can manage agency AI generations"
on public.ai_generations for all
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

create policy "Agents can manage own agency AI generations"
on public.ai_generations for all
to authenticated
using (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and (created_by is null or created_by = (select id from public.profiles where auth_user_id = auth.uid() limit 1))
)
with check (
  public.current_user_role() = 'agent'
  and public.current_user_status() = 'active'
  and agency_id = public.current_user_agency_id()
  and (created_by is null or created_by = (select id from public.profiles where auth_user_id = auth.uid() limit 1))
);
