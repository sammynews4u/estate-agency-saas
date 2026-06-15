import type { RouteRole } from '@/types/roles';

export type DemoRecordStatus = 'Active' | 'Pending' | 'In Progress' | 'Completed' | 'Escalated' | 'Closed';

export type DemoModuleRecord = {
  id: string;
  title: string;
  category: string;
  owner: string;
  status: DemoRecordStatus;
  value: string;
  dueDate: string;
  notes: string;
};

export const moduleDescriptions: Record<string, string> = {
  properties: 'Manage sales and rental listings, status changes, inquiries and property assignments.',
  'browse-properties': 'Search available listings, save properties, send inquiries and open property detail pages.',
  'saved-properties': 'Track saved listings and compare preferred properties.',
  clients: 'Centralise buyers, sellers, landlords, tenants and investors in the CRM.',
  leads: 'Track lead source, qualification stage, assigned agent and conversion movement.',
  appointments: 'Manage viewings, bookings, calendars, reminders and appointment outcomes.',
  'follow-ups': 'Run reminders, WhatsApp, SMS and email follow-up workflows.',
  valuation: 'Prepare valuation estimates, market comparisons and owner-facing valuation reports.',
  'ai-assistant': 'Generate property descriptions, follow-up messages, client replies and listing improvements.',
  discovery: 'Record discovered listings, source URLs, duplicate signals and agent assignments.',
  referrals: 'Track agent-to-agent and agency-to-agency referrals with commission sharing.',
  agents: 'Manage agent profiles, workload, performance and commission allocation.',
  commissions: 'Review agent commissions, deal value and commission payout status.',
  finance: 'Monitor revenue, expenses, payroll, branch performance and finance KPIs.',
  invoices: 'Create, track and print client invoices.',
  receipts: 'Record payment receipts and transaction history without processing payments.',
  expenses: 'Track operational expenses, approval status and branch cost centres.',
  payroll: 'Manage staff payroll records and payout status.',
  documents: 'Store contracts, leases, ownership documents, inspection reports and KYC files.',
  'property-management': 'Manage tenants, leases, maintenance, inspections and occupancy records.',
  services: 'Connect clients with lawyers, surveyors, photographers, valuers and other providers.',
  projects: 'Manage developer projects, milestones, documentation and construction progress.',
  units: 'Track developer unit inventory, availability, pricing and buyer reservations.',
  sales: 'Track project sales, deposits, closing stage and off-plan transactions.',
  progress: 'Record construction milestones, risks, contractors and completion percentages.',
  reports: 'View revenue, activity, lead, referral, discovery and performance analytics.',
  marketing: 'Plan campaigns, audiences, channels, budgets and lead conversion metrics.',
  verification: 'Track identity, ownership, agency, provider and developer compliance checks.',
  transactions: 'Manage deal pipeline, closing tasks, document readiness and transaction risk.',
  support: 'Handle support tickets, priorities, SLA status, replies and escalations.',
  subscription: 'Track agency plan limits, renewals, feature gates and usage.',
  subscriptions: 'Control platform plans, agency subscriptions, limits and billing status.',
  'risk-control': 'Monitor risk register, audit trail, failed controls and high-risk actions.',
  users: 'Manage platform users, roles, status and account controls.',
  agencies: 'Manage agencies, branches, status and operational onboarding.',
  branches: 'Manage agency branch records, managers, location and status.',
  activity: 'Review platform activity, logs, risk events and recent system actions.',
  'roles-access': 'Create role policies, review permissions and test access controls by user type.',
  profile: 'Manage profile details, service information and account settings.',
  requests: 'Track service requests and job workflow.',
  quotes: 'Manage quotes, pricing and provider responses.',
  portfolio: 'Showcase provider work samples and service proof.',
  reviews: 'Review feedback, ratings and service quality signals.',
  'submit-property': 'Submit seller or landlord property information for review.',
  inquiries: 'Track property enquiries, replies, appointments and conversion follow-up.',
};

export function titleise(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

const ownerByRole: Record<RouteRole, string[]> = {
  'super-admin': ['Amara Okonkwo', 'Platform Ops', 'Risk Desk'],
  agency: ['Tunde Balogun', 'Nneka Ibe', 'Seyi Adewale'],
  agent: ['Nneka Ibe', 'Assigned Agent', 'Sales Desk'],
  client: ['Aisha Bello', 'Client Desk', 'Viewing Desk'],
  landlord: ['Mr. Chinedu Obi', 'Listing Desk', 'Verification Desk'],
  'service-provider': ['Kemi Johnson', 'Provider Desk', 'Operations Desk'],
  developer: ['David Essien', 'Project Desk', 'Sales Desk'],
  finance: ['Mariam Yusuf', 'Accounts Desk', 'Billing Desk'],
};

const moduleCategoryMap: Record<string, string[]> = {
  agencies: ['Onboarding', 'Compliance', 'Operations'],
  users: ['Access', 'Activation', 'Suspension'],
  'roles-access': ['Permission', 'Role Policy', 'Audit'],
  activity: ['Audit Trail', 'Risk Event', 'System Event'],
  branches: ['Branch Setup', 'Manager Review', 'Location'],
  agents: ['Workload', 'Performance', 'Commission'],
  clients: ['Buyer', 'Tenant', 'Investor'],
  leads: ['Portal Lead', 'Referral Lead', 'Walk-in Lead'],
  appointments: ['Viewing', 'Inspection', 'Consultation'],
  'follow-ups': ['WhatsApp', 'Phone Call', 'Email'],
  transactions: ['Sales Deal', 'Rental Deal', 'Closing Task'],
  marketing: ['Campaign', 'Audience', 'Creative'],
  valuation: ['Market Estimate', 'Owner Report', 'Comparable'],
  'ai-assistant': ['Listing Copy', 'Client Reply', 'Follow-up'],
  discovery: ['Found Listing', 'Duplicate Check', 'Assignment'],
  referrals: ['Agency Referral', 'Agent Referral', 'Commission Split'],
  commissions: ['Due Commission', 'Paid Commission', 'Dispute'],
  finance: ['Revenue', 'Expense', 'Cashflow'],
  invoices: ['Draft Invoice', 'Sent Invoice', 'Overdue Invoice'],
  receipts: ['Bank Transfer', 'Cash Receipt', 'Card Receipt'],
  expenses: ['Office Cost', 'Marketing Cost', 'Payroll Cost'],
  payroll: ['Salary', 'Allowance', 'Deduction'],
  documents: ['Contract', 'KYC', 'Ownership File'],
  'property-management': ['Lease', 'Tenant', 'Maintenance'],
  services: ['Legal', 'Survey', 'Photography'],
  requests: ['New Request', 'Assigned Job', 'Completed Job'],
  quotes: ['Draft Quote', 'Submitted Quote', 'Accepted Quote'],
  portfolio: ['Project Photo', 'Case Study', 'Proof of Work'],
  reviews: ['Client Review', 'Quality Issue', 'Recommendation'],
  projects: ['Estate Project', 'Off-plan Project', 'Mixed-use Project'],
  units: ['Available Unit', 'Reserved Unit', 'Sold Unit'],
  sales: ['Deposit', 'Reservation', 'Closing'],
  progress: ['Foundation', 'Superstructure', 'Finishing'],
  reports: ['Revenue Report', 'Lead Report', 'Performance Report'],
  verification: ['Identity Check', 'Ownership Check', 'Provider Check'],
  support: ['Ticket', 'Escalation', 'Resolved Case'],
  subscription: ['Plan Usage', 'Renewal', 'Feature Limit'],
  subscriptions: ['Agency Plan', 'Payment Review', 'Feature Gate'],
  'risk-control': ['Risk Register', 'Failed Control', 'Exception'],
  profile: ['Service Profile', 'Business Details', 'Availability'],
  inquiries: ['Buyer Inquiry', 'Viewing Request', 'Follow-up'],
};

const seedStatuses: DemoRecordStatus[] = ['Active', 'Pending', 'In Progress', 'Completed', 'Escalated', 'Closed'];

function moduleSeedTitles(sectionKey: string) {
  const label = titleise(sectionKey);
  return [
    `${label} intake review`,
    `${label} priority workflow`,
    `${label} approval queue`,
    `${label} conversion task`,
    `${label} audit check`,
  ];
}

export function getDemoModuleRecords(role: RouteRole, sectionKey: string): DemoModuleRecord[] {
  const owners = ownerByRole[role];
  const categories = moduleCategoryMap[sectionKey] ?? ['Record', 'Workflow', 'Review'];
  return moduleSeedTitles(sectionKey).map((title, index) => ({
    id: `${sectionKey.replaceAll('-', '_')}_${index + 1}`,
    title,
    category: categories[index % categories.length],
    owner: owners[index % owners.length],
    status: seedStatuses[index % seedStatuses.length],
    value: index % 2 === 0 ? `₦${(18 + index * 7).toLocaleString()}m` : `${20 + index * 11}%`,
    dueDate: `2026-06-${String(18 + index).padStart(2, '0')}`,
    notes: `${title} is editable in demo mode. Changes are saved in this browser through localStorage so the dashboard behaves like a working MVP without requiring Supabase keys.`,
  }));
}

export function getDemoRecordById(role: RouteRole, sectionKey: string, id: string) {
  return getDemoModuleRecords(role, sectionKey).find((record) => record.id === id);
}
