import type { DemoUser, RouteRole, UserRole } from '@/types/roles';

export const demoUsers: DemoUser[] = [
  { id: 'usr_001', fullName: 'Amara Okonkwo', email: 'amara@estateflow.test', phone: '+234 801 000 0001', role: 'super_admin', agency: 'Platform', branch: 'HQ', status: 'active', createdAt: '2026-05-10' },
  { id: 'usr_002', fullName: 'Tunde Balogun', email: 'tunde@primecrest.test', phone: '+234 801 000 0002', role: 'agency_admin', agency: 'PrimeCrest Realty', branch: 'Lekki HQ', status: 'active', createdAt: '2026-05-11' },
  { id: 'usr_003', fullName: 'Nneka Ibe', email: 'nneka@primecrest.test', phone: '+234 801 000 0003', role: 'agent', agency: 'PrimeCrest Realty', branch: 'Lekki HQ', status: 'active', createdAt: '2026-05-12' },
  { id: 'usr_004', fullName: 'Seyi Adewale', email: 'seyi@primecrest.test', phone: '+234 801 000 0004', role: 'agent', agency: 'PrimeCrest Realty', branch: 'Ikeja Branch', status: 'pending', createdAt: '2026-05-12' },
  { id: 'usr_005', fullName: 'Aisha Bello', email: 'aisha@example.com', phone: '+234 801 000 0005', role: 'client', agency: 'PrimeCrest Realty', branch: 'Lekki HQ', status: 'active', createdAt: '2026-05-13' },
  { id: 'usr_006', fullName: 'Mr. Chinedu Obi', email: 'chinedu@example.com', phone: '+234 801 000 0006', role: 'landlord', agency: 'PrimeCrest Realty', branch: 'Ikeja Branch', status: 'active', createdAt: '2026-05-14' },
  { id: 'usr_007', fullName: 'Kemi Johnson', email: 'kemi@interiors.test', phone: '+234 801 000 0007', role: 'service_provider', agency: 'Partner Network', branch: 'Lagos', status: 'active', createdAt: '2026-05-14' },
  { id: 'usr_008', fullName: 'David Essien', email: 'david@urbanbuild.test', phone: '+234 801 000 0008', role: 'developer', agency: 'UrbanBuild DevCo', branch: 'Victoria Island', status: 'active', createdAt: '2026-05-15' },
  { id: 'usr_009', fullName: 'Mariam Yusuf', email: 'mariam@primecrest.test', phone: '+234 801 000 0009', role: 'finance_staff', agency: 'PrimeCrest Realty', branch: 'Lekki HQ', status: 'active', createdAt: '2026-05-16' },
];

export const demoAgencies = [
  { id: 'ag_001', name: 'PrimeCrest Realty', email: 'hello@primecrest.test', phone: '+234 802 111 1111', city: 'Lekki', state: 'Lagos', country: 'Nigeria', status: 'active' },
  { id: 'ag_002', name: 'UrbanBuild DevCo', email: 'projects@urbanbuild.test', phone: '+234 802 222 2222', city: 'Victoria Island', state: 'Lagos', country: 'Nigeria', status: 'active' },
  { id: 'ag_003', name: 'Partner Network', email: 'partners@estateflow.test', phone: '+234 802 333 3333', city: 'Ikeja', state: 'Lagos', country: 'Nigeria', status: 'pending' },
];

export const demoBranches = [
  { id: 'br_001', agency: 'PrimeCrest Realty', name: 'Lekki HQ', manager: 'Tunde Balogun', email: 'lekki@primecrest.test', city: 'Lekki', state: 'Lagos', status: 'active' },
  { id: 'br_002', agency: 'PrimeCrest Realty', name: 'Ikeja Branch', manager: 'Seyi Adewale', email: 'ikeja@primecrest.test', city: 'Ikeja', state: 'Lagos', status: 'active' },
];

export const demoActivities = [
  { action: 'Agency created', actor: 'Amara Okonkwo', target: 'PrimeCrest Realty', time: '10 minutes ago' },
  { action: 'User status changed', actor: 'Tunde Balogun', target: 'Seyi Adewale', time: '28 minutes ago' },
  { action: 'Branch updated', actor: 'Tunde Balogun', target: 'Ikeja Branch', time: '1 hour ago' },
  { action: 'Settings reviewed', actor: 'Mariam Yusuf', target: 'Finance workspace', time: '2 hours ago' },
];

export const demoNotifications = [
  { title: 'Foundation ready', message: 'Your role-based dashboard shell is available.', type: 'success' },
  { title: 'Modules added', message: 'Property Marketplace and CRM are now available.', type: 'success' },
  { title: 'Supabase setup', message: 'Apply migrations before connecting live data.', type: 'info' },
];

export const dashboardStatsByRole: Record<RouteRole, { label: string; value: string; change: string }[]> = {
  'super-admin': [
    { label: 'Total Agencies', value: '3', change: '+1 this week' },
    { label: 'Total Users', value: '9', change: '8 roles active' },
    { label: 'Pending Approvals', value: '2', change: 'Needs review' },
    { label: 'Activity Events', value: '48', change: 'Last 24 hours' },
  ],
  agency: [
    { label: 'Active Agents', value: '2', change: '+1 pending' },
    { label: 'Branches', value: '2', change: 'Operational' },
    { label: 'New Leads', value: '4', change: 'CRM active' },
    { label: 'Reports', value: 'Ready', change: 'Foundation only' },
  ],
  agent: [
    { label: 'My Leads', value: '2', change: 'CRM active' },
    { label: 'My Clients', value: '2', change: 'CRM active' },
    { label: 'Appointments', value: '0', change: 'Module pending' },
    { label: 'Commission', value: '₦0', change: 'Finance pending' },
  ],
  client: [
    { label: 'Saved Properties', value: '2', change: 'Marketplace active' },
    { label: 'Inquiries Sent', value: '0', change: 'Module pending' },
    { label: 'Appointments', value: '0', change: 'Module pending' },
    { label: 'Documents', value: '0', change: 'Vault pending' },
  ],
  landlord: [
    { label: 'Submitted Properties', value: '2', change: 'Marketplace active' },
    { label: 'Inquiries', value: '0', change: 'Module pending' },
    { label: 'Valuations', value: '0', change: 'Module pending' },
    { label: 'Documents', value: '0', change: 'Vault pending' },
  ],
  'service-provider': [
    { label: 'Requests', value: '0', change: 'Marketplace pending' },
    { label: 'Quotes', value: '0', change: 'Module pending' },
    { label: 'Portfolio Items', value: '0', change: 'Module pending' },
    { label: 'Reviews', value: '0', change: 'Module pending' },
  ],
  developer: [
    { label: 'Projects', value: '0', change: 'Module pending' },
    { label: 'Units', value: '0', change: 'Module pending' },
    { label: 'Sold Units', value: '0', change: 'Module pending' },
    { label: 'Progress', value: '0%', change: 'Module pending' },
  ],
  finance: [
    { label: 'Revenue', value: '₦0', change: 'Module pending' },
    { label: 'Expenses', value: '₦0', change: 'Module pending' },
    { label: 'Invoices', value: '0', change: 'Module pending' },
    { label: 'Payroll', value: '0', change: 'Module pending' },
  ],
};

export const analyticsData = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 18 },
  { name: 'Wed', value: 14 },
  { name: 'Thu', value: 22 },
  { name: 'Fri', value: 27 },
  { name: 'Sat', value: 19 },
  { name: 'Sun', value: 24 },
];

export function getDemoUserByRole(role: UserRole) {
  return demoUsers.find((user) => user.role === role) ?? demoUsers[0];
}
