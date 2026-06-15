-- EstateFlow Pro Foundation Seed Data
-- Use after creating auth users manually or through Supabase Auth.
-- Replace the auth_user_id values with actual auth.users IDs before inserting profiles in a real project.

insert into public.roles (name, label, description) values
  ('super_admin', 'Super Admin', 'Controls the entire platform'),
  ('agency_admin', 'Agency Admin', 'Manages agency operations'),
  ('agent', 'Agent', 'Handles assigned leads, properties and clients'),
  ('client', 'Client/User', 'Browses properties and manages inquiries'),
  ('landlord', 'Landlord/Seller', 'Submits properties and tracks inquiries'),
  ('service_provider', 'Service Provider', 'Offers real estate-related services'),
  ('developer', 'Developer', 'Manages real estate projects and unit inventory'),
  ('finance_staff', 'Finance/Staff', 'Handles finance records and reports')
on conflict (name) do update set label = excluded.label, description = excluded.description;

insert into public.agencies (id, name, email, phone, website, address, city, state, country, status) values
  ('00000000-0000-0000-0000-000000000101', 'PrimeCrest Realty', 'hello@primecrest.test', '+2348021111111', 'https://primecrest.test', 'Admiralty Way', 'Lekki', 'Lagos', 'Nigeria', 'active'),
  ('00000000-0000-0000-0000-000000000102', 'UrbanBuild DevCo', 'projects@urbanbuild.test', '+2348022222222', 'https://urbanbuild.test', 'Akin Adesola Street', 'Victoria Island', 'Lagos', 'Nigeria', 'active')
on conflict (id) do nothing;

insert into public.branches (id, agency_id, name, email, phone, address, city, state, country, status) values
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101', 'Lekki HQ', 'lekki@primecrest.test', '+2348031111111', 'Admiralty Way', 'Lekki', 'Lagos', 'Nigeria', 'active'),
  ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000101', 'Ikeja Branch', 'ikeja@primecrest.test', '+2348032222222', 'Allen Avenue', 'Ikeja', 'Lagos', 'Nigeria', 'active')
on conflict (id) do nothing;

-- Demo profile inserts are commented because auth_user_id must match real Supabase Auth users.
-- Create auth users first, then insert corresponding profile records.

-- insert into public.profiles (auth_user_id, full_name, email, phone, role, agency_id, branch_id, status) values
--   ('replace-with-auth-user-id', 'Amara Okonkwo', 'amara@estateflow.test', '+2348010000001', 'super_admin', null, null, 'active');

insert into public.settings (agency_id, key, value) values
  ('00000000-0000-0000-0000-000000000101', 'theme', '{"name":"premium-real-estate","darkMode":false}'::jsonb),
  ('00000000-0000-0000-0000-000000000101', 'notifications', '{"email":true,"sms":false,"whatsapp":false}'::jsonb)
on conflict (agency_id, key) do update set value = excluded.value;

-- Property Marketplace + CRM demo seed. These records do not require auth users.
insert into public.properties (
  id, agency_id, branch_id, title, description, property_type, listing_category, price, currency,
  location, city, state, address, bedrooms, bathrooms, toilets, parking_spaces, land_size, building_size,
  furnishing_status, property_condition, year_built, legal_status, ownership_type, amenities,
  listing_source, status, featured, verified, date_listed
) values
  ('00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1', 'Premium detached duplex with cinema room, fitted kitchen, BQ, swimming pool and smart-home readiness.', 'House', 'sale', 450000000, 'NGN', 'Lekki Phase 1', 'Lekki', 'Lagos', 'Admiralty Way, Lekki Phase 1', 5, 5, 6, 4, '600 sqm', '480 sqm', 'Semi-furnished', 'Newly built', 2025, 'Governor’s Consent', 'Freehold', array['Swimming pool','BQ','CCTV','Smart locks','Fitted kitchen'], 'Direct landlord', 'available', true, true, '2026-05-24'),
  ('00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Serviced 3-Bedroom Apartment in Ikoyi', 'Well-managed serviced apartment with elevator access, backup power, security, gym and waterfront proximity.', 'Apartment', 'rent', 18000000, 'NGN', 'Old Ikoyi', 'Ikoyi', 'Lagos', 'Bourdillon Road, Ikoyi', 3, 3, 4, 2, 'Shared compound', '210 sqm', 'Fully furnished', 'Excellent', 2023, 'Registered lease', 'Leasehold', array['Elevator','Gym','Backup power','Security','Water treatment'], 'Agency mandate', 'vacant', true, true, '2026-05-26'),
  ('00000000-0000-0000-0000-000000001003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', 'Commercial Office Floor in Victoria Island', 'Open-plan office floor suitable for corporate teams, fintechs and professional services firms.', 'Office', 'rent', 65000000, 'NGN', 'Victoria Island', 'Lagos Island', 'Lagos', 'Akin Adesola Street, Victoria Island', 0, 6, 6, 10, 'Commercial block', '720 sqm', 'Shell and core', 'Good', 2020, 'Commercial title verified', 'Leasehold', array['Elevator','Reception','Backup power','Fire alarm','Parking'], 'Developer inventory', 'under_negotiation', false, true, '2026-05-27')
on conflict (id) do nothing;

insert into public.property_media (property_id, agency_id, type, url, alt_text, sort_order) values
  ('00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000000101', 'image', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', 'Luxury duplex exterior', 1),
  ('00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000000101', 'image', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop', 'Serviced apartment living room', 1),
  ('00000000-0000-0000-0000-000000001003', '00000000-0000-0000-0000-000000000101', 'image', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop', 'Commercial office floor', 1);

insert into public.clients (
  id, agency_id, branch_id, full_name, email, phone, type, budget_min, budget_max, preferred_location,
  property_preference, timeline, lead_source, status, last_contacted_at, next_follow_up_at, tags, notes
) values
  ('00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Aisha Bello', 'aisha@example.com', '+2348034102211', 'buyer', 180000000, 500000000, 'Lekki, Ikoyi, Victoria Island', '4-5 bedroom detached or semi-detached house', '0-3 months', 'Website inquiry', 'qualified', '2026-06-02', '2026-06-05', array['High intent','Mortgage-ready','Family home'], 'Needs secure estate, good road access, and clear title documents before inspection.'),
  ('00000000-0000-0000-0000-000000002002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Femi Adebayo', 'femi@example.com', '+2348056124433', 'tenant', 12000000, 22000000, 'Ikoyi', 'Serviced 3-bedroom apartment', 'Immediate', 'WhatsApp campaign', 'viewing_booked', '2026-06-03', '2026-06-04', array['Urgent rental','Corporate tenant'], 'Prefers furnished apartment with generator, elevator and professional facility management.'),
  ('00000000-0000-0000-0000-000000002003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', 'Mrs. Halima Musa', 'halima@example.com', '+2348097145501', 'investor', 70000000, 150000000, 'Sangotedo, Ajah, Ibeju-Lekki', 'Dry land or distressed sale property', '1-6 months', 'Referral', 'contacted', '2026-05-31', '2026-06-06', array['Investor','Land buyer'], 'Wants strong resale potential and proof of ownership before commitment.')
on conflict (id) do nothing;

insert into public.leads (
  id, agency_id, branch_id, client_id, property_id, interest, source, status, value_estimate, next_action, next_follow_up_at
) values
  ('00000000-0000-0000-0000-000000003001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000001001', 'Luxury family home in Lekki Phase 1', 'Website inquiry', 'qualified', 450000000, 'Send title document checklist and book inspection', '2026-06-05'),
  ('00000000-0000-0000-0000-000000003002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000002002', '00000000-0000-0000-0000-000000001002', 'Serviced apartment rental in Ikoyi', 'WhatsApp campaign', 'viewing_booked', 18000000, 'Confirm 4:00pm viewing and send access instructions', '2026-06-04'),
  ('00000000-0000-0000-0000-000000003003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000002003', null, 'Dry land with resale potential', 'Referral', 'contacted', 85000000, 'Share verification status and survey document summary', '2026-06-06')
on conflict (id) do nothing;

-- Appointments + Automated Follow-Up demo seed. Profile-linked columns are left null until auth users are created.
insert into public.viewing_appointments (
  id, agency_id, branch_id, property_id, title, appointment_type, scheduled_start, scheduled_end, location, status, reminder_enabled, notes
) values
  ('00000000-0000-0000-0000-000000004001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001002', 'Femi Adebayo viewing for Ikoyi serviced apartment', 'property_viewing', '2026-06-04 16:00:00+01', '2026-06-04 17:00:00+01', 'Bourdillon Road, Ikoyi', 'confirmed', true, 'Send access instruction and estate gate contact before the viewing.'),
  ('00000000-0000-0000-0000-000000004002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001001', 'Aisha Bello viewing for Lekki duplex', 'property_viewing', '2026-06-05 11:30:00+01', '2026-06-05 12:30:00+01', 'Admiralty Way, Lekki Phase 1', 'pending', true, 'Send title checklist before confirming inspection.'),
  ('00000000-0000-0000-0000-000000004003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', null, 'Investor valuation visit for Sangotedo land', 'valuation_visit', '2026-06-06 10:00:00+01', '2026-06-06 11:15:00+01', 'Monastery Road axis, Sangotedo', 'confirmed', true, 'Carry survey summary and neighbourhood price comparison.')
on conflict (id) do nothing;

insert into public.message_templates (id, agency_id, name, channel, use_case, body) values
  ('00000000-0000-0000-0000-000000005001', '00000000-0000-0000-0000-000000000101', 'New inquiry response', 'whatsapp', 'Reply quickly to fresh property inquiries', 'Hello {first_name}, thank you for your interest in {property}. I can help you confirm availability, price, documents and viewing options.'),
  ('00000000-0000-0000-0000-000000005002', '00000000-0000-0000-0000-000000000101', 'Viewing reminder', 'sms', 'Reduce missed inspections', 'Reminder: your viewing for {property} is scheduled for {date_time}. Reply YES to confirm or call your agent to reschedule.'),
  ('00000000-0000-0000-0000-000000005003', '00000000-0000-0000-0000-000000000101', 'Post-viewing follow-up', 'email', 'Move clients from inspection to negotiation', 'Thank you for attending the viewing. Here are the next steps, key property details and documents required to proceed.')
on conflict (id) do nothing;

insert into public.follow_up_tasks (
  id, agency_id, branch_id, client_id, lead_id, property_id, appointment_id, recipient_name, recipient_phone, recipient_email, channel, message, scheduled_at, status, priority
) values
  ('00000000-0000-0000-0000-000000006001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000002002', '00000000-0000-0000-0000-000000003002', '00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000004001', 'Femi Adebayo', '+2348056124433', 'femi@example.com', 'whatsapp', 'Good afternoon Femi. This is a reminder for your Ikoyi apartment viewing today at 4:00pm. Please confirm you are still available.', '2026-06-04 12:00:00+01', 'due_today', 'high'),
  ('00000000-0000-0000-0000-000000006002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000003001', '00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000004002', 'Aisha Bello', '+2348034102211', 'aisha@example.com', 'email', 'Share the title document checklist, inspection schedule options and short investment summary for the Lekki duplex.', '2026-06-05 09:00:00+01', 'scheduled', 'high'),
  ('00000000-0000-0000-0000-000000006003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000002003', '00000000-0000-0000-0000-000000003003', null, '00000000-0000-0000-0000-000000004003', 'Mrs. Halima Musa', '+2348097145501', 'halima@example.com', 'call', 'Call to clarify land title status, expected closing timeline and appetite for adjacent plots.', '2026-06-06 13:00:00+01', 'scheduled', 'medium')
on conflict (id) do nothing;

insert into public.campaigns (id, agency_id, branch_id, name, channel, audience, recipients_count, message, scheduled_at, status) values
  ('00000000-0000-0000-0000-000000007001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Ikoyi rental availability alert', 'whatsapp', 'Qualified tenants looking for Ikoyi rentals', 42, 'New serviced apartment options are available in Ikoyi. Reply to book a viewing.', '2026-06-05 10:00:00+01', 'scheduled'),
  ('00000000-0000-0000-0000-000000007002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Lekki seller valuation pitch', 'email', 'Landlords and sellers with premium properties', 18, 'Use our valuation insight to price your property properly and sell faster.', null, 'draft')
on conflict (id) do nothing;

-- Receipt, Invoice + Document Management demo seed.
insert into public.invoices (
  id, agency_id, branch_id, client_id, property_id, invoice_number, client_name, client_email,
  item_description, amount, tax, discount, due_date, status, notes
) values
  ('00000000-0000-0000-0000-000000008001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000001001', 'INV-2026-001', 'Aisha Bello', 'aisha@example.com', 'Agency professional fee for sales transaction', 8500000, 637500, 250000, '2026-06-12', 'sent', 'Send before final inspection confirmation.'),
  ('00000000-0000-0000-0000-000000008002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000002002', '00000000-0000-0000-0000-000000001002', 'INV-2026-002', 'Femi Adebayo', 'femi@example.com', 'Inspection, documentation and tenancy processing fee', 650000, 48750, 0, '2026-06-07', 'overdue', 'Requires follow-up before lease pack is released.'),
  ('00000000-0000-0000-0000-000000008003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', null, '00000000-0000-0000-0000-000000001001', 'INV-2026-003', 'Mr. Chinedu Obi', 'owner@example.com', 'Premium listing package and property photography', 450000, 33750, 50000, '2026-06-15', 'draft', 'Confirm package before sending invoice.')
on conflict (agency_id, invoice_number) do nothing;

insert into public.receipts (
  id, agency_id, branch_id, invoice_id, client_id, property_id, receipt_number, client_name,
  amount_paid, payment_method, payment_date, purpose, status, notes
) values
  ('00000000-0000-0000-0000-000000009001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000008001', '00000000-0000-0000-0000-000000002001', '00000000-0000-0000-0000-000000001001', 'RCT-2026-001', 'Aisha Bello', 2000000, 'bank_transfer', '2026-06-04', 'Part payment for agency professional fee', 'issued', 'Balance remains payable before closing.'),
  ('00000000-0000-0000-0000-000000009002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000008002', '00000000-0000-0000-0000-000000002002', '00000000-0000-0000-0000-000000001002', 'RCT-2026-002', 'Femi Adebayo', 300000, 'pos', '2026-06-01', 'Part payment for tenancy processing', 'issued', 'Client still has outstanding balance.'),
  ('00000000-0000-0000-0000-000000009003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', null, null, '00000000-0000-0000-0000-000000001001', 'RCT-2026-003', 'Mr. Chinedu Obi', 200000, 'cash', '2026-05-29', 'Listing preparation deposit', 'voided', 'Voided because receipt was reissued manually.')
on conflict (agency_id, receipt_number) do nothing;

insert into public.documents (
  id, agency_id, branch_id, property_id, client_id, invoice_id, receipt_id, title, document_type,
  status, visibility, storage_path, file_name, mime_type, file_size_bytes, related_label, expiry_date, notes
) values
  ('00000000-0000-0000-0000-000000010001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001001', null, null, null, 'Lekki Duplex Deed of Assignment', 'ownership_record', 'approved', 'agency', 'demo/lekki-duplex-deed-assignment.pdf', 'lekki-duplex-deed-assignment.pdf', 'application/pdf', 2400000, 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1', '2028-06-01', 'Verified ownership record for internal review.'),
  ('00000000-0000-0000-0000-000000010002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000002002', null, null, 'Ikoyi Apartment Lease Draft', 'lease_agreement', 'pending_review', 'client_visible', 'demo/ikoyi-apartment-lease-draft.docx', 'ikoyi-apartment-lease-draft.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 812000, 'Serviced 3-Bedroom Apartment in Ikoyi', '2027-05-31', 'Draft lease pending legal review.'),
  ('00000000-0000-0000-0000-000000010003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', null, '00000000-0000-0000-0000-000000002001', null, null, 'Aisha Bello KYC Form', 'client_kyc', 'approved', 'private', 'demo/aisha-bello-kyc.pdf', 'aisha-bello-kyc.pdf', 'application/pdf', 1100000, 'Buyer profile', null, 'KYC approved for transaction discussions.'),
  ('00000000-0000-0000-0000-000000010004', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000001003', null, null, null, 'Victoria Island Office Inspection Report', 'inspection_report', 'approved', 'agency', 'demo/vi-office-inspection-report.pdf', 'vi-office-inspection-report.pdf', 'application/pdf', 3800000, 'Commercial Office Floor in Victoria Island', null, 'Inspection completed and approved.'),
  ('00000000-0000-0000-0000-000000010005', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', null, null, '00000000-0000-0000-0000-000000008001', null, 'Invoice INV-2026-001 PDF', 'invoice', 'approved', 'client_visible', 'demo/inv-2026-001.pdf', 'inv-2026-001.pdf', 'application/pdf', 420000, 'Aisha Bello invoice', null, 'Printable invoice copy.'),
  ('00000000-0000-0000-0000-000000010006', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', null, null, null, '00000000-0000-0000-0000-000000009001', 'Receipt RCT-2026-001 PDF', 'receipt', 'approved', 'client_visible', 'demo/rct-2026-001.pdf', 'rct-2026-001.pdf', 'application/pdf', 390000, 'Aisha Bello receipt', null, 'Printable receipt copy.')
on conflict (id) do nothing;

-- Property Valuation + AI Assistant demo seed.
insert into public.valuation_reports (
  id, agency_id, branch_id, property_id, client_id, report_number, property_title, property_type,
  location, client_name, estimated_value, low_estimate, high_estimate, recommended_listing_price,
  confidence_score, demand_level, property_condition, status, notes
) values
  ('00000000-0000-0000-0000-000000011001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001001', null, 'VAL-2026-001', 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1', 'House', 'Lekki Phase 1, Lagos', 'Mr. Chinedu Obi', 438000000, 405000000, 472000000, 450000000, 86, 'high', 'newly_built', 'approved', 'Premium finish, secure estate, clear title and demand from family buyers support a strong listing price.'),
  ('00000000-0000-0000-0000-000000011002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', null, '00000000-0000-0000-0000-000000002003', 'VAL-2026-002', 'Dry Land Measuring 900sqm in Sangotedo', 'Land', 'Sangotedo, Lagos', 'Mrs. Halima Musa', 83000000, 76000000, 91000000, 85000000, 78, 'moderate', 'good', 'under_review', 'Dry land status and road access are positive, but title verification must be completed before aggressive pricing.'),
  ('00000000-0000-0000-0000-000000011003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000001003', null, 'VAL-2026-003', 'Commercial Office Floor in Victoria Island', 'Office', 'Victoria Island, Lagos', 'Tola Martins', 62500000, 58500000, 69000000, 65000000, 82, 'high', 'good', 'sent', 'Corporate demand is stable, but shell-and-core condition limits the rental premium until fit-out terms are clarified.')
on conflict (agency_id, report_number) do nothing;

insert into public.valuation_comparables (
  id, agency_id, valuation_report_id, title, location, property_type, price, size_label, bedrooms, sold_or_listed_at, similarity_score, notes
) values
  ('00000000-0000-0000-0000-000000012001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000011001', '5-Bedroom Detached Duplex', 'Lekki Phase 1', 'House', 430000000, '550 sqm', 5, '2026-05-12', 91, 'Close match in same primary market.'),
  ('00000000-0000-0000-0000-000000012002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000011001', 'Smart 5-Bedroom Duplex with BQ', 'Lekki Phase 1', 'House', 465000000, '600 sqm', 5, '2026-05-18', 88, 'Premium amenity match.'),
  ('00000000-0000-0000-0000-000000012003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000011002', 'Dry Land 900sqm', 'Sangotedo', 'Land', 80000000, '900 sqm', 0, '2026-05-20', 93, 'Strong size and location match.'),
  ('00000000-0000-0000-0000-000000012004', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000011003', 'Open Plan Office Floor', 'Victoria Island', 'Office', 60000000, '690 sqm', 0, '2026-05-15', 87, 'Comparable commercial floor size.')
on conflict (id) do nothing;

insert into public.ai_prompt_templates (id, agency_id, name, tool_type, description, default_prompt, is_system_template) values
  ('00000000-0000-0000-0000-000000013001', '00000000-0000-0000-0000-000000000101', 'Premium property description', 'property_description', 'Turn rough property details into polished marketplace copy.', 'Write a premium real estate description that highlights location, title confidence, amenities, target buyer and viewing urgency.', false),
  ('00000000-0000-0000-0000-000000013002', '00000000-0000-0000-0000-000000000101', 'Fast WhatsApp inquiry reply', 'client_response', 'Reply quickly to a fresh buyer or tenant inquiry.', 'Write a warm but professional WhatsApp reply that confirms availability, asks qualification questions and offers viewing slots.', false),
  ('00000000-0000-0000-0000-000000013003', '00000000-0000-0000-0000-000000000101', 'Listing quality audit', 'listing_analyzer', 'Identify weak listing copy, missing proof points and conversion blockers.', 'Analyse this listing and identify missing details, weak claims, pricing risks, media gaps and trust signals to add.', false)
on conflict (id) do nothing;

insert into public.ai_generations (
  id, agency_id, branch_id, property_id, client_id, template_id, tool_type, title, input_summary, prompt, output, status, model_name
) values
  ('00000000-0000-0000-0000-000000014001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001001', null, '00000000-0000-0000-0000-000000013001', 'property_description', 'Lekki duplex premium copy', '5-bedroom detached duplex, Lekki Phase 1, pool, BQ, fitted kitchen, Governor’s Consent.', 'Generate premium listing copy.', 'Position this as a premium family home in Lekki Phase 1 with clear title confidence, lifestyle amenities and immediate viewing availability.', 'saved', 'placeholder-local'),
  ('00000000-0000-0000-0000-000000014002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000002002', '00000000-0000-0000-0000-000000013002', 'client_response', 'Ikoyi tenant post-viewing follow-up', 'Tenant viewed serviced apartment and asked about service charge, power and payment terms.', 'Generate post-viewing follow-up.', 'Thank the tenant for attending, summarise the apartment benefits, clarify the next documents needed, and ask whether to proceed with lease discussion today.', 'used', 'placeholder-local'),
  ('00000000-0000-0000-0000-000000014003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', null, '00000000-0000-0000-0000-000000002003', '00000000-0000-0000-0000-000000013003', 'listing_analyzer', 'Sangotedo land listing audit', '900sqm dry land, Sangotedo, pending verification, road access, Deed of Assignment.', 'Audit this land listing.', 'The listing needs stronger proof: survey plan status, exact coordinates, neighbourhood landmarks, drainage note, title chain and recent comparable plots.', 'draft', 'placeholder-local')
on conflict (id) do nothing;

-- Agent Management + Finance & Business Management demo seed.
insert into public.agent_profiles (
  id, agency_id, branch_id, full_name, email, phone, team, tier, specialisation, status,
  active_properties, assigned_leads, active_clients, viewings_this_month, deals_closed,
  conversion_rate, revenue_closed, commission_earned
) values
  ('00000000-0000-0000-0000-000000017001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Nneka Ibe', 'nneka.ibe@estateflow.test', '+2348034102211', 'Premium Sales', 'team_lead', 'Luxury residential sales', 'active', 18, 42, 31, 27, 9, 21, 485000000, 14550000),
  ('00000000-0000-0000-0000-000000017002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', 'Seyi Adewale', 'seyi.adewale@estateflow.test', '+2348056124433', 'Rental Desk', 'senior', 'Serviced apartments and corporate rentals', 'active', 12, 37, 24, 31, 7, 19, 126000000, 3780000),
  ('00000000-0000-0000-0000-000000017003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', 'Mariam Lawal', 'mariam.lawal@estateflow.test', '+2348097145501', 'Land Acquisition', 'associate', 'Land sourcing and documentation', 'active', 8, 29, 18, 14, 4, 14, 83000000, 2490000)
on conflict (agency_id, email) do nothing;

insert into public.commission_records (
  id, agency_id, branch_id, agent_profile_id, property_id, client_id, property_title, client_name,
  deal_type, deal_value, commission_rate, status, closed_at, due_date, notes
) values
  ('00000000-0000-0000-0000-000000018001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000017001', '00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000002001', 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1', 'Aisha Bello', 'sale', 450000000, 3, 'approved', '2026-06-01', '2026-06-10', 'Commission approved after final seller confirmation.'),
  ('00000000-0000-0000-0000-000000018002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000017002', '00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000002002', 'Serviced 3-Bedroom Apartment in Ikoyi', 'Femi Adebayo', 'rent', 18000000, 10, 'pending', '2026-06-02', '2026-06-12', 'Awaiting complete tenancy processing payment.'),
  ('00000000-0000-0000-0000-000000018003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000017003', null, '00000000-0000-0000-0000-000000002003', 'Dry Land Measuring 900sqm in Sangotedo', 'Mrs. Halima Musa', 'sale', 85000000, 3, 'paid', '2026-05-28', '2026-06-03', 'Paid after title verification and transfer documentation.')
on conflict (id) do nothing;

insert into public.expenses (
  id, agency_id, branch_id, category, description, amount, expense_date, staff_name, receipt_attached, status, notes
) values
  ('00000000-0000-0000-0000-000000019001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'marketing', 'Meta ads for Lekki luxury listings', 650000, '2026-06-03', 'Nneka Ibe', true, 'approved', 'Campaign tied to premium duplex and investor retargeting.'),
  ('00000000-0000-0000-0000-000000019002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', 'transport', 'Client viewing logistics for Ikoyi rentals', 85000, '2026-06-04', 'Seyi Adewale', true, 'submitted', 'Three corporate apartment inspections.'),
  ('00000000-0000-0000-0000-000000019003', '00000000-0000-0000-0000-000000000101', null, 'software', 'Property media cloud storage renewal', 120000, '2026-06-01', 'Finance Desk', false, 'reimbursed', 'Renewal should be moved to recurring expenses later.')
on conflict (id) do nothing;

insert into public.payroll_records (
  id, agency_id, branch_id, staff_name, role_label, base_salary, commission_bonus, deductions, pay_period, payment_date, status, notes
) values
  ('00000000-0000-0000-0000-000000020001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Nneka Ibe', 'Team Lead Agent', 250000, 1455000, 50000, 'June 2026', '2026-06-28', 'approved', 'Commission bonus based on approved June pipeline.'),
  ('00000000-0000-0000-0000-000000020002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', 'Seyi Adewale', 'Senior Agent', 180000, 378000, 25000, 'June 2026', '2026-06-28', 'pending', 'Pending finance review.'),
  ('00000000-0000-0000-0000-000000020003', '00000000-0000-0000-0000-000000000101', null, 'Finance Desk', 'Finance Staff', 220000, 0, 20000, 'June 2026', '2026-06-28', 'paid', 'Processed as fixed salary.')
on conflict (id) do nothing;

insert into public.branch_finance_snapshots (
  id, agency_id, branch_id, report_month, revenue, expenses, payroll, pending_invoices, receipts_issued, conversion_revenue, notes
) values
  ('00000000-0000-0000-0000-000000021001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'June 2026', 16120000, 820000, 2021000, 4, 7, 485000000, 'Lekki branch has strong revenue but rising marketing spend.'),
  ('00000000-0000-0000-0000-000000021002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', 'June 2026', 2898750, 305000, 533000, 3, 4, 126000000, 'Ikoyi branch needs faster invoice conversion.')
on conflict (agency_id, branch_id, report_month) do nothing;


-- Property Management System + Real Estate Service Marketplace demo seed.
insert into public.tenants (
  id, agency_id, branch_id, property_id, full_name, phone, email, unit, rent_amount,
  payment_frequency, outstanding_balance, status, notes
) values
  ('00000000-0000-0000-0000-000000022001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001002', 'Adaeze Okonkwo', '+2348031114500', 'adaeze.okonkwo@example.com', 'Flat 4B', 3500000, 'yearly', 0, 'active', 'Corporate tenant with clean payment history.'),
  ('00000000-0000-0000-0000-000000022002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000001003', 'Chinedu Nwankwo', '+2348028881976', 'chinedu.nwankwo@example.com', 'Suite 7A', 7800000, 'yearly', 450000, 'overdue', 'Needs structured arrears follow-up.'),
  ('00000000-0000-0000-0000-000000022003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', null, 'Femi Adebayo', '+2348094440101', 'femi.adebayo@example.com', 'Shop 12', 5200000, 'yearly', 0, 'notice_given', 'Notice submitted before renewal discussion.')
on conflict (id) do nothing;

insert into public.leases (
  id, agency_id, branch_id, property_id, tenant_id, start_date, end_date, renewal_date,
  rent_amount, security_deposit, status, terms
) values
  ('00000000-0000-0000-0000-000000023001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000022001', '2025-09-01', '2026-08-31', '2026-07-31', 3500000, 500000, 'active', 'Annual rent, renewal notice required 30 days before expiry.'),
  ('00000000-0000-0000-0000-000000023002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000001003', '00000000-0000-0000-0000-000000022002', '2025-11-01', '2026-10-31', '2026-09-30', 7800000, 1000000, 'active', 'Corporate office lease with service charge billed separately.'),
  ('00000000-0000-0000-0000-000000023003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', null, '00000000-0000-0000-0000-000000022003', '2025-04-15', '2026-04-14', '2026-03-15', 5200000, 800000, 'renewal_due', 'Retail lease renewal pending rent review.')
on conflict (id) do nothing;

insert into public.maintenance_records (
  id, agency_id, branch_id, property_id, tenant_id, issue_title, issue_description, priority,
  assigned_vendor, estimated_cost, date_reported, date_resolved, status
) values
  ('00000000-0000-0000-0000-000000024001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000022001', 'Kitchen pipe leakage', 'Leak under kitchen sink affecting lower cabinet.', 'high', 'RapidFix Plumbing', 85000, '2026-06-03', null, 'assigned'),
  ('00000000-0000-0000-0000-000000024002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', null, '00000000-0000-0000-0000-000000022003', 'Faulty shop shutter', 'Manual shutter is difficult to open and needs servicing.', 'medium', 'Prime Steel Works', 120000, '2026-05-28', null, 'in_progress'),
  ('00000000-0000-0000-0000-000000024003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000001003', '00000000-0000-0000-0000-000000022002', 'AC servicing', 'Quarterly servicing for two split units.', 'low', 'CoolAir Services', 65000, '2026-05-25', '2026-05-27', 'resolved')
on conflict (id) do nothing;

insert into public.inspection_reports (
  id, agency_id, branch_id, property_id, inspection_date, inspection_type, condition_score,
  findings, action_required, status
) values
  ('00000000-0000-0000-0000-000000025001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001002', '2026-06-12', 'routine', 86, 'Overall condition is good. Minor plumbing issue already logged.', 'Vendor should submit completion photos after repair.', 'scheduled'),
  ('00000000-0000-0000-0000-000000025002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', null, '2026-05-30', 'maintenance', 72, 'Front shutter and signage frame require attention before renewal.', 'Resolve before lease renewal negotiation.', 'requires_action'),
  ('00000000-0000-0000-0000-000000025003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000001003', '2026-05-20', 'routine', 91, 'Office is well maintained. No major defect found.', null, 'completed')
on conflict (id) do nothing;

insert into public.occupancy_records (
  id, agency_id, branch_id, property_id, tenant_id, unit, status, rent_amount, next_availability_date
) values
  ('00000000-0000-0000-0000-000000026001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000022001', 'Flat 4B', 'occupied', 3500000, '2026-09-01'),
  ('00000000-0000-0000-0000-000000026002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000001003', '00000000-0000-0000-0000-000000022002', 'Suite 7A', 'occupied', 7800000, '2026-11-01'),
  ('00000000-0000-0000-0000-000000026003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', null, null, 'Studio 2C', 'vacant', 2800000, '2026-06-10')
on conflict (id) do nothing;

insert into public.service_providers (
  id, agency_id, business_name, contact_name, category, phone, email, location,
  pricing_range, availability, rating, completed_jobs, status
) values
  ('00000000-0000-0000-0000-000000027001', '00000000-0000-0000-0000-000000000101', 'LexStone Property Law', 'Barr. Ifeoluwa Adeyemi', 'lawyer', '+2348034441902', 'hello@lexstone.example', 'Victoria Island, Lagos', '₦250k - ₦1.5m', 'available', 4.80, 42, 'active'),
  ('00000000-0000-0000-0000-000000027002', '00000000-0000-0000-0000-000000000101', 'SkyGrid Drone Media', 'David Aina', 'drone_operator', '+2348067773010', 'bookings@skygrid.example', 'Lekki, Lagos', '₦120k - ₦500k', 'busy', 4.60, 71, 'active'),
  ('00000000-0000-0000-0000-000000027003', '00000000-0000-0000-0000-000000000101', 'MeasuredLine Surveyors', 'Engr. Musa Bello', 'surveyor', '+2348092228844', 'office@measuredline.example', 'Ikeja, Lagos', '₦300k - ₦2m', 'available', 4.70, 58, 'pending_review')
on conflict (id) do nothing;

insert into public.service_requests (
  id, agency_id, branch_id, requester_id, property_id, service_provider_id, service_title,
  category, preferred_date, budget, notes, status
) values
  ('00000000-0000-0000-0000-000000028001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', null, '00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000027001', 'Title document review for Lekki duplex', 'lawyer', '2026-06-12', 500000, 'Client wants verification before making deposit.', 'quoted'),
  ('00000000-0000-0000-0000-000000028002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', null, '00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000027002', 'Drone shoot for waterfront listing', 'drone_operator', '2026-06-15', 350000, 'Need 60-second video and 12 aerial stills.', 'accepted'),
  ('00000000-0000-0000-0000-000000028003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', null, null, null, 'Survey plan for commercial land', 'surveyor', '2026-06-20', 900000, 'Surveyor must confirm access road and boundary points.', 'new')
on conflict (id) do nothing;

insert into public.service_quotes (
  id, agency_id, service_request_id, service_provider_id, amount, timeline, scope,
  submitted_date, status
) values
  ('00000000-0000-0000-0000-000000029001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000028001', '00000000-0000-0000-0000-000000027001', 450000, '3 working days', 'Review title documents and issue written risk note.', '2026-06-04', 'sent'),
  ('00000000-0000-0000-0000-000000029002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000028002', '00000000-0000-0000-0000-000000027002', 320000, '48 hours after shoot', 'Drone video, aerial stills and edited short reel.', '2026-06-03', 'accepted')
on conflict (id) do nothing;

insert into public.service_portfolio_items (
  id, service_provider_id, agency_id, title, category, location, completion_date, media_urls, description
) values
  ('00000000-0000-0000-0000-000000030001', '00000000-0000-0000-0000-000000027002', '00000000-0000-0000-0000-000000000101', 'Premium aerial shoot for Ikoyi maisonette', 'drone_operator', 'Ikoyi, Lagos', '2026-05-11', array['demo/portfolio/ikoyi-aerial-1.jpg'], 'Aerial and ground visuals used for a luxury sales campaign.'),
  ('00000000-0000-0000-0000-000000030002', '00000000-0000-0000-0000-000000027001', '00000000-0000-0000-0000-000000000101', 'Title verification for estate block sale', 'lawyer', 'Ajah, Lagos', '2026-04-29', array['demo/portfolio/legal-review.pdf'], 'Due diligence package for a multi-unit investor transaction.')
on conflict (id) do nothing;

insert into public.service_reviews (
  id, agency_id, service_provider_id, service_request_id, rating, review
) values
  ('00000000-0000-0000-0000-000000031001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000027002', '00000000-0000-0000-0000-000000028002', 5, 'Delivered clean drone footage quickly. Strong enough for premium listing campaigns.'),
  ('00000000-0000-0000-0000-000000031002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000027001', '00000000-0000-0000-0000-000000028001', 5, 'The legal review was direct, clear and prevented a weak transaction decision.')
on conflict (id) do nothing;

-- Construction & Development + Reports/Analytics demo seed.
insert into public.developer_projects (
  id, agency_id, branch_id, project_name, developer_name, location, description,
  start_date, expected_completion_date, status, total_units, units_sold, units_available,
  progress_percentage, projected_revenue, documents_count
) values
  ('00000000-0000-0000-0000-000000032001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Emerald Court Ikoyi', 'Crestline Developments', 'Ikoyi, Lagos', 'Luxury 24-unit apartment development with waterfront-facing penthouses and investor-grade finishing.', '2025-10-01', '2027-03-30', 'under_construction', 24, 11, 9, 46, 18200000000, 18),
  ('00000000-0000-0000-0000-000000032002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Orchid Grove Terraces', 'Northbay Homes', 'Orchid Road, Lekki', 'Family-focused terrace estate with staggered payment plans for mid-market buyers.', '2025-05-15', '2026-11-30', 'selling', 36, 22, 10, 71, 13500000000, 24),
  ('00000000-0000-0000-0000-000000032003', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000202', 'Mainland Commerce Park', 'UrbanEdge Projects', 'Ikeja, Lagos', 'Mixed-use commercial project with offices, retail units and serviced business suites.', '2026-01-20', '2027-08-15', 'planning', 58, 4, 49, 12, 9500000000, 9)
on conflict (id) do nothing;

insert into public.project_units (
  id, agency_id, project_id, unit_number, unit_type, floor, bedrooms, bathrooms, size_sqm, price, status
) values
  ('00000000-0000-0000-0000-000000033001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000032001', 'A-1201', 'Penthouse', '12th', 4, 5, 310, 1250000000, 'sold'),
  ('00000000-0000-0000-0000-000000033002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000032001', 'B-0802', 'Apartment', '8th', 3, 4, 210, 760000000, 'reserved'),
  ('00000000-0000-0000-0000-000000033003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000032002', 'T-14', 'Terrace Duplex', 'Ground + 1', 4, 5, 260, 385000000, 'sold'),
  ('00000000-0000-0000-0000-000000033004', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000032002', 'T-19', 'Terrace Duplex', 'Ground + 1', 4, 5, 260, 395000000, 'available'),
  ('00000000-0000-0000-0000-000000033005', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000032003', 'O-03', 'Office Suite', '3rd', 0, 1, 86, 180000000, 'available')
on conflict (id) do nothing;

insert into public.construction_progress_records (
  id, agency_id, project_id, milestone, phase, target_date, completion_date, progress_percentage, contractor, risk_note, status
) values
  ('00000000-0000-0000-0000-000000034001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000032001', 'Structural frame', 'Civil works', '2026-08-30', null, 62, 'Cobalt Build Ltd', 'Concrete schedule is tight. Weekly material tracking is compulsory.', 'in_progress'),
  ('00000000-0000-0000-0000-000000034002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000032002', 'External finishing', 'Finishing', '2026-09-15', null, 81, 'BuildRight Nigeria', 'Paint and aluminium supply must be locked down before rainy season delays.', 'in_progress'),
  ('00000000-0000-0000-0000-000000034003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000032003', 'Planning approval', 'Documentation', '2026-07-10', null, 30, 'UrbanEdge Projects', 'Approval delay will affect pre-sale confidence.', 'delayed')
on conflict (id) do nothing;

insert into public.development_sales (
  id, agency_id, project_id, unit_id, deal_value, deposit_paid, expected_close_date, status, notes
) values
  ('00000000-0000-0000-0000-000000035001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000032001', '00000000-0000-0000-0000-000000033001', 1250000000, 500000000, '2026-08-01', 'closed', 'Penthouse deal closed with staged balance.'),
  ('00000000-0000-0000-0000-000000035002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000032001', '00000000-0000-0000-0000-000000033002', 760000000, 150000000, '2026-07-20', 'deposit_paid', 'Corporate buyer paid reservation deposit.'),
  ('00000000-0000-0000-0000-000000035003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000032002', '00000000-0000-0000-0000-000000033004', 395000000, 0, '2026-06-30', 'reserved', 'Reservation requires deposit follow-up.')
on conflict (id) do nothing;

insert into public.report_snapshots (
  id, agency_id, report_scope, report_month, total_inquiries, total_viewings, total_deals,
  total_revenue, total_expenses, conversion_rate, metadata
) values
  ('00000000-0000-0000-0000-000000036001', '00000000-0000-0000-0000-000000000101', 'agency', '2026-04', 124, 52, 10, 28700000, 7900000, 8.06, '{"note":"April property and CRM snapshot"}'::jsonb),
  ('00000000-0000-0000-0000-000000036002', '00000000-0000-0000-0000-000000000101', 'agency', '2026-05', 169, 73, 16, 48600000, 11800000, 9.47, '{"note":"May conversion improved after follow-up campaign"}'::jsonb),
  ('00000000-0000-0000-0000-000000036003', '00000000-0000-0000-0000-000000000101', 'agency', '2026-06', 154, 68, 14, 42100000, 10400000, 9.09, '{"note":"June mid-month reporting seed"}'::jsonb)
on conflict (agency_id, report_scope, report_month) do nothing;

insert into public.analytics_insights (
  id, agency_id, title, message, status, owner, source_module
) values
  ('00000000-0000-0000-0000-000000037001', '00000000-0000-0000-0000-000000000101', 'Lead volume is not the bottleneck', 'The weak point is the drop from qualified lead to booked viewing. Tighten appointment follow-up before increasing ad spend.', 'warning', 'Agency Admin', 'crm'),
  ('00000000-0000-0000-0000-000000037002', '00000000-0000-0000-0000-000000000101', 'Referral leads convert better', 'Referral leads produced fewer inquiries but stronger conversion. Build incentives around verified referral partners.', 'healthy', 'Agency Admin', 'referrals'),
  ('00000000-0000-0000-0000-000000037003', '00000000-0000-0000-0000-000000000101', 'Developer progress risk', 'Mainland Commerce Park has a documentation delay. Sales confidence will suffer if approval evidence is not visible to buyers.', 'danger', 'Developer', 'development')
on conflict (id) do nothing;

insert into public.report_exports (
  id, agency_id, report_name, report_scope, export_format, generated_at, status, file_url
) values
  ('00000000-0000-0000-0000-000000038001', '00000000-0000-0000-0000-000000000101', 'Agency performance summary', 'agency', 'PDF', '2026-06-04 09:12:00+01', 'ready', 'demo/reports/agency-performance-summary.pdf'),
  ('00000000-0000-0000-0000-000000038002', '00000000-0000-0000-0000-000000000101', 'Lead funnel and agent ranking', 'agency', 'CSV', '2026-06-03 17:45:00+01', 'ready', 'demo/reports/lead-funnel-agent-ranking.csv'),
  ('00000000-0000-0000-0000-000000038003', '00000000-0000-0000-0000-000000000101', 'Developer unit inventory report', 'developer', 'XLSX', '2026-06-02 14:20:00+01', 'queued', null)
on conflict (id) do nothing;

-- Marketing Campaign Studio + KYC/Compliance Verification demo seed.
insert into public.marketing_campaigns (
  id, agency_id, branch_id, title, objective, channel, audience, budget, start_date, end_date,
  message, status, leads_generated, viewings_booked, conversion_rate, api_delivery_status
) values
  ('00000000-0000-0000-0000-000000039001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Lekki Premium Buyer Push', 'Generate qualified buyer inquiries for premium Lekki terrace listings.', 'whatsapp', 'buyers', 180000, '2026-06-05', '2026-06-18', 'Exclusive 4-bedroom terrace duplex in Chevron with clean title and flexible viewing windows.', 'active', 46, 12, 26.00, 'not_configured'),
  ('00000000-0000-0000-0000-000000039002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Landlord Sole Mandate Campaign', 'Convince landlords and sellers to submit properties for exclusive agency management.', 'email', 'landlords', 75000, '2026-06-08', '2026-06-30', 'Your property deserves structured marketing, verified tenants and transparent reporting.', 'scheduled', 18, 0, 11.00, 'not_configured'),
  ('00000000-0000-0000-0000-000000039003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', 'Off-Plan Investor Briefing', 'Warm up investors for developer project unit reservations.', 'portal', 'investors', 310000, '2026-06-01', '2026-07-01', 'Secure off-plan units with staged payments, documented progress and projected rental yield.', 'paused', 27, 5, 19.00, 'not_configured')
on conflict (id) do nothing;

insert into public.marketing_assets (
  id, agency_id, campaign_id, title, asset_format, platform, due_date, status
) values
  ('00000000-0000-0000-0000-000000040001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000039001', 'WhatsApp buyer broadcast copy', 'Short copy', 'WhatsApp', '2026-06-06', 'approved'),
  ('00000000-0000-0000-0000-000000040002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000039002', 'Landlord email sequence', 'Email sequence', 'Email', '2026-06-09', 'briefed'),
  ('00000000-0000-0000-0000-000000040003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000039003', 'Investor one-page project card', 'PDF / image card', 'Portal / WhatsApp', '2026-06-10', 'published')
on conflict (id) do nothing;

insert into public.marketing_schedules (
  id, agency_id, campaign_id, scheduled_at, channel, audience, recipient_count, delivery_status
) values
  ('00000000-0000-0000-0000-000000041001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000039001', '2026-06-06 10:00:00+01', 'whatsapp', 'buyers', 320, 'queued'),
  ('00000000-0000-0000-0000-000000041002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000039002', '2026-06-09 08:30:00+01', 'email', 'landlords', 680, 'queued')
on conflict (id) do nothing;

insert into public.verification_records (
  id, agency_id, subject_name, subject_role, verification_type, document_name, submitted_at,
  expires_at, risk_level, status, notes
) values
  ('00000000-0000-0000-0000-000000042001', '00000000-0000-0000-0000-000000000101', 'PrimeNest Realty Ltd', 'agency', 'agency_license', 'CAC certificate and agency licence.pdf', '2026-06-01', '2027-06-01', 'low', 'verified', 'Agency documents verified against submitted registration records.'),
  ('00000000-0000-0000-0000-000000042002', '00000000-0000-0000-0000-000000000101', 'Mr. Kola Adeyemi', 'landlord', 'ownership', 'Deed of assignment - Chevron terrace.pdf', '2026-06-03', '2026-12-03', 'medium', 'in_review', 'Survey plan and deed must match property address before listing can be marked verified.'),
  ('00000000-0000-0000-0000-000000042003', '00000000-0000-0000-0000-000000000101', 'Adaobi Okafor', 'client', 'tenant_kyc', 'Employment letter and ID card.pdf', '2026-06-04', '2026-09-04', 'low', 'pending', 'KYC is required before corporate rental offer can be forwarded to landlord.'),
  ('00000000-0000-0000-0000-000000042004', '00000000-0000-0000-0000-000000000101', 'Victoria Island Residences Phase II', 'developer', 'developer_project', 'Building approval and project title pack.zip', '2026-05-30', '2026-11-30', 'high', 'in_review', 'Do not run investor campaign until title, approvals and unit allocation schedule are confirmed.')
on conflict (id) do nothing;

insert into public.compliance_checklist_items (
  id, agency_id, title, applies_to, required_document, priority, status
) values
  ('00000000-0000-0000-0000-000000043001', '00000000-0000-0000-0000-000000000101', 'Seller ownership verification before verified badge', 'landlord', 'Deed, survey, allocation letter or title evidence', 'high', 'configured'),
  ('00000000-0000-0000-0000-000000043002', '00000000-0000-0000-0000-000000000101', 'Tenant KYC before lease recommendation', 'client', 'ID, employment/business evidence and reference', 'medium', 'configured'),
  ('00000000-0000-0000-0000-000000043003', '00000000-0000-0000-0000-000000000101', 'Service provider licence verification', 'service_provider', 'Professional licence, portfolio and ID', 'medium', 'required'),
  ('00000000-0000-0000-0000-000000043004', '00000000-0000-0000-0000-000000000101', 'Developer project title and approval pack', 'developer', 'Title documents, building approval and unit schedule', 'high', 'required')
on conflict (id) do nothing;

-- Deal Pipeline / Transaction Management + Customer Support / Ticketing demo seed.
insert into public.deal_transactions (
  id, agency_id, branch_id, property_id, client_id, title, counterparty_name,
  transaction_type, stage, priority, deal_value, expected_commission, closing_date,
  next_action, checklist_progress, document_count, risk_note
) values
  ('00000000-0000-0000-0000-000000037001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001001', '00000000-0000-0000-0000-000000002001', 'Aisha Bello Lekki Duplex Purchase', 'Direct landlord mandate', 'sale', 'due_diligence', 'high', 450000000, 13500000, '2026-06-28', 'Confirm title search result and buyer solicitor comments.', 58, 7, 'Buyer will not release deposit until title documents are reviewed.'),
  ('00000000-0000-0000-0000-000000037002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000001002', '00000000-0000-0000-0000-000000002002', 'Femi Adebayo Ikoyi Serviced Apartment Rental', 'Corporate landlord', 'rent', 'contract', 'medium', 18000000, 1800000, '2026-06-12', 'Send amended tenancy agreement and service charge schedule.', 76, 5, 'Service charge terms must be clear before signing.'),
  ('00000000-0000-0000-0000-000000037003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202', null, '00000000-0000-0000-0000-000000002003', 'Victoria Island Residences Phase II Investor Reservation', 'UrbanBuild DevCo', 'off_plan', 'deposit', 'critical', 126000000, 3780000, '2026-06-18', 'Issue reservation invoice and confirm staged payment calendar.', 64, 8, 'Investor wants project permits and escrow terms documented.')
on conflict (id) do nothing;

insert into public.transaction_tasks (
  id, agency_id, transaction_id, task, due_date, status, blocker
) values
  ('00000000-0000-0000-0000-000000038001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000037001', 'Upload title search report and highlight red flags.', '2026-06-08', 'in_progress', null),
  ('00000000-0000-0000-0000-000000038002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000037002', 'Confirm tenancy agreement corrections with landlord.', '2026-06-07', 'pending', null),
  ('00000000-0000-0000-0000-000000038003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000037003', 'Attach project permits, progress photos and payment plan.', '2026-06-09', 'blocked', 'Awaiting updated project permit scan.')
on conflict (id) do nothing;

insert into public.transaction_checklist_items (
  id, agency_id, transaction_id, title, required, completed
) values
  ('00000000-0000-0000-0000-000000039001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000037001', 'Client identity verified', true, true),
  ('00000000-0000-0000-0000-000000039002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000037001', 'Title documents reviewed', true, false),
  ('00000000-0000-0000-0000-000000039003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000037002', 'Tenancy agreement approved', true, false)
on conflict (id) do nothing;

insert into public.support_tickets (
  id, agency_id, subject, requester_name, requester_role, category, priority, status,
  sla_status, related_record, summary, last_reply_at
) values
  ('00000000-0000-0000-0000-000000040001', '00000000-0000-0000-0000-000000000101', 'Client cannot upload title documents', 'Aisha Bello', 'Client', 'technical', 'high', 'in_progress', 'near_breach', 'Aisha Bello Lekki Duplex Purchase', 'Upload field accepts images but rejects PDF title file.', '2026-06-05 10:40:00+01'),
  ('00000000-0000-0000-0000-000000040002', '00000000-0000-0000-0000-000000000101', 'Landlord needs listing verification correction', 'Direct landlord mandate', 'Landlord/Seller', 'verification', 'medium', 'open', 'inside_sla', 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1', 'Landlord says ownership record was marked incomplete after submitting updated survey plan.', '2026-06-05 11:05:00+01'),
  ('00000000-0000-0000-0000-000000040003', '00000000-0000-0000-0000-000000000101', 'Receipt amount mismatch on rental processing', 'Finance Desk', 'Finance/Staff', 'billing', 'urgent', 'escalated', 'breached', 'Femi Adebayo Ikoyi Serviced Apartment Rental', 'Receipt shows processing fee but invoice includes service charge.', '2026-06-05 08:10:00+01')
on conflict (id) do nothing;

insert into public.support_ticket_messages (
  id, agency_id, ticket_id, author_name, channel, message, internal_note
) values
  ('00000000-0000-0000-0000-000000041001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000040001', 'Agency Support Desk', 'Internal note', 'Check Supabase Storage MIME rules and max file size before blaming the user flow.', true),
  ('00000000-0000-0000-0000-000000041002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000040003', 'Platform Admin', 'Escalation', 'Finance should not print this receipt until invoice line items are reconciled.', true)
on conflict (id) do nothing;

insert into public.support_sla_rules (
  id, agency_id, priority, response_minutes, resolution_minutes, escalation_target, active
) values
  ('00000000-0000-0000-0000-000000042001', '00000000-0000-0000-0000-000000000101', 'urgent', 120, 480, 'Platform Admin', true),
  ('00000000-0000-0000-0000-000000042002', '00000000-0000-0000-0000-000000000101', 'high', 480, 1440, 'Agency Support Desk', true),
  ('00000000-0000-0000-0000-000000042003', '00000000-0000-0000-0000-000000000101', 'medium', 1440, 2880, 'Support Desk', true)
on conflict (id) do nothing;

-- Subscription/Billing Plans + Audit/Risk Control demo seed.
insert into public.platform_subscriptions (
  id, agency_id, plan, status, billing_cycle, monthly_fee, next_billing_date, trial_ends_at,
  seats_used, seats_limit, property_listings_used, property_listings_limit,
  ai_credits_used, ai_credits_limit, storage_used_gb, storage_limit_gb, renewal_risk, notes
) values
  ('00000000-0000-0000-0000-000000044001', '00000000-0000-0000-0000-000000000101', 'growth', 'active', 'monthly', 85000, '2026-07-05', null, 9, 12, 142, 200, 4300, 7000, 22, 60, 'low', 'Primary demo agency subscription.'),
  ('00000000-0000-0000-0000-000000044002', '00000000-0000-0000-0000-000000000102', 'starter', 'trial', 'monthly', 35000, '2026-06-19', '2026-06-19', 3, 4, 43, 50, 1100, 1200, 8, 10, 'medium', 'Trial account approaching listing and AI credit limits.')
on conflict (id) do nothing;

insert into public.subscription_feature_gates (
  id, feature_key, feature_name, starter_enabled, growth_enabled, enterprise_enabled, metered, notes
) values
  ('00000000-0000-0000-0000-000000045001', 'property_listings', 'Property marketplace listings', true, true, true, true, 'Listing caps differ by plan.'),
  ('00000000-0000-0000-0000-000000045002', 'crm_followups', 'CRM and follow-up automation', true, true, true, true, 'Starter has lower campaign volume.'),
  ('00000000-0000-0000-0000-000000045003', 'ai_assistant', 'AI assistant credits', true, true, true, true, 'Credits are metered monthly.'),
  ('00000000-0000-0000-0000-000000045004', 'property_discovery', 'Property discovery tool', false, true, true, true, 'Reserved for serious operators.'),
  ('00000000-0000-0000-0000-000000045005', 'referral_network', 'Referral network', false, true, true, false, 'Network effect module.'),
  ('00000000-0000-0000-0000-000000045006', 'audit_controls', 'Advanced reports and audit controls', false, false, true, false, 'Enterprise governance layer.')
on conflict (feature_key) do nothing;

insert into public.subscription_usage_events (
  id, agency_id, subscription_id, feature_key, quantity, usage_date, source_module
) values
  ('00000000-0000-0000-0000-000000046001', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000044001', 'property_listings', 1, '2026-06-05', 'properties'),
  ('00000000-0000-0000-0000-000000046002', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000044001', 'ai_assistant', 28, '2026-06-05', 'ai-assistant'),
  ('00000000-0000-0000-0000-000000046003', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000044001', 'crm_followups', 120, '2026-06-05', 'follow-ups')
on conflict (id) do nothing;

insert into public.risk_register (
  id, agency_id, title, category, owner_name, level, status, impact, mitigation, due_date, related_record_type
) values
  ('00000000-0000-0000-0000-000000047001', '00000000-0000-0000-0000-000000000101', 'Unverified ownership document attached to premium listing', 'Property verification', 'Compliance Desk', 'high', 'investigating', 'Could expose the agency to listing fraud and reputational damage.', 'Freeze public promotion until ownership evidence is confirmed by legal review.', '2026-06-08', 'property'),
  ('00000000-0000-0000-0000-000000047002', '00000000-0000-0000-0000-000000000101', 'Agent exported high-value client list', 'Data protection', 'Agency Admin', 'critical', 'open', 'Potential client data leakage and privacy breach.', 'Review export log, revoke unnecessary permissions and notify management.', '2026-06-06', 'client_export'),
  ('00000000-0000-0000-0000-000000047003', '00000000-0000-0000-0000-000000000101', 'Past-due platform subscription with active automation usage', 'Billing control', 'Finance Desk', 'medium', 'open', 'Usage cost continues while subscription recovery is weak.', 'Move account to limited mode if invoice is not regularised within grace period.', '2026-06-10', 'subscription')
on conflict (id) do nothing;

insert into public.audit_trail_events (
  id, agency_id, actor_name, actor_role, event_type, action, affected_record_type,
  affected_record_label, ip_address, risk_level
) values
  ('00000000-0000-0000-0000-000000048001', '00000000-0000-0000-0000-000000000101', 'Nneka Ibe', 'Agent', 'data_change', 'Changed property price from ₦180m to ₦172m', 'property', 'Luxury 5-Bedroom Detached Duplex', '105.112.XX.14', 'medium'),
  ('00000000-0000-0000-0000-000000048002', '00000000-0000-0000-0000-000000000101', 'Agency Admin', 'Agency Admin', 'permission_change', 'Granted finance report access to staff user', 'profile', 'Finance/Staff account', '102.89.XX.77', 'high'),
  ('00000000-0000-0000-0000-000000048003', '00000000-0000-0000-0000-000000000101', 'Finance Desk', 'Finance/Staff', 'financial_action', 'Voided receipt RCT-2026-004', 'receipt', 'Receipt register', '197.210.XX.22', 'high')
on conflict (id) do nothing;

insert into public.internal_control_checks (
  id, agency_id, control_name, control_area, owner_name, status, last_checked, evidence, next_review_date
) values
  ('00000000-0000-0000-0000-000000049001', '00000000-0000-0000-0000-000000000101', 'Two-person approval for receipt voiding', 'Finance', 'Finance Lead', 'failed', '2026-06-04', 'One receipt was voided without approval evidence.', '2026-06-11'),
  ('00000000-0000-0000-0000-000000049002', '00000000-0000-0000-0000-000000000101', 'Ownership documents required before featured listing', 'Property verification', 'Compliance Desk', 'in_progress', '2026-06-05', 'Three pending listings still require legal document review.', '2026-06-12'),
  ('00000000-0000-0000-0000-000000049003', '00000000-0000-0000-0000-000000000101', 'Monthly access review for agents and finance users', 'Access control', 'Super Admin', 'passed', '2026-06-01', 'Dormant accounts were suspended and branch access corrected.', '2026-07-01')
on conflict (id) do nothing;
