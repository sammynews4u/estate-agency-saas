export type AgentStatus = 'active' | 'pending' | 'suspended' | 'inactive';
export type AgentTier = 'associate' | 'senior' | 'principal' | 'team_lead';
export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'disputed' | 'cancelled';

export type AgentProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  branch: string;
  team: string;
  tier: AgentTier;
  specialisation: string;
  status: AgentStatus;
  activeProperties: number;
  assignedLeads: number;
  activeClients: number;
  viewingsThisMonth: number;
  dealsClosed: number;
  conversionRate: number;
  revenueClosed: number;
  commissionEarned: number;
  lastActivity: string;
  manager: string;
};

export type CommissionRecord = {
  id: string;
  agentName: string;
  propertyTitle: string;
  clientName: string;
  dealType: 'sale' | 'rent' | 'referral' | 'service';
  dealValue: number;
  commissionRate: number;
  commissionAmount: number;
  status: CommissionStatus;
  closedAt: string;
  dueDate: string;
  notes: string;
};

export const agentStatusLabels: Record<AgentStatus, string> = {
  active: 'Active',
  pending: 'Pending',
  suspended: 'Suspended',
  inactive: 'Inactive',
};

export const agentStatusTone: Record<AgentStatus, 'success' | 'warning' | 'danger' | 'muted'> = {
  active: 'success',
  pending: 'warning',
  suspended: 'danger',
  inactive: 'muted',
};

export const agentTierLabels: Record<AgentTier, string> = {
  associate: 'Associate Agent',
  senior: 'Senior Agent',
  principal: 'Principal Agent',
  team_lead: 'Team Lead',
};

export const commissionStatusLabels: Record<CommissionStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  paid: 'Paid',
  disputed: 'Disputed',
  cancelled: 'Cancelled',
};

export const commissionStatusTone: Record<CommissionStatus, 'success' | 'warning' | 'danger' | 'muted' | 'gold'> = {
  pending: 'warning',
  approved: 'gold',
  paid: 'success',
  disputed: 'danger',
  cancelled: 'muted',
};

export function formatAgentMoney(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);
}

export const demoAgents: AgentProfile[] = [
  {
    id: 'agent_001',
    fullName: 'Nneka Ibe',
    email: 'nneka.ibe@estateflow.test',
    phone: '+234 803 410 2211',
    branch: 'Lekki Branch',
    team: 'Premium Sales',
    tier: 'team_lead',
    specialisation: 'Luxury residential sales',
    status: 'active',
    activeProperties: 18,
    assignedLeads: 42,
    activeClients: 31,
    viewingsThisMonth: 27,
    dealsClosed: 9,
    conversionRate: 21,
    revenueClosed: 485000000,
    commissionEarned: 14550000,
    lastActivity: '2026-06-05 09:20',
    manager: 'Agency Admin',
  },
  {
    id: 'agent_002',
    fullName: 'Seyi Adewale',
    email: 'seyi.adewale@estateflow.test',
    phone: '+234 805 612 4433',
    branch: 'Ikoyi Branch',
    team: 'Rental Desk',
    tier: 'senior',
    specialisation: 'Serviced apartments and corporate rentals',
    status: 'active',
    activeProperties: 12,
    assignedLeads: 37,
    activeClients: 24,
    viewingsThisMonth: 31,
    dealsClosed: 7,
    conversionRate: 19,
    revenueClosed: 126000000,
    commissionEarned: 3780000,
    lastActivity: '2026-06-05 08:45',
    manager: 'Nneka Ibe',
  },
  {
    id: 'agent_003',
    fullName: 'Mariam Lawal',
    email: 'mariam.lawal@estateflow.test',
    phone: '+234 809 714 5501',
    branch: 'Mainland Branch',
    team: 'Land Acquisition',
    tier: 'associate',
    specialisation: 'Land sourcing and documentation',
    status: 'active',
    activeProperties: 8,
    assignedLeads: 29,
    activeClients: 18,
    viewingsThisMonth: 14,
    dealsClosed: 4,
    conversionRate: 14,
    revenueClosed: 83000000,
    commissionEarned: 2490000,
    lastActivity: '2026-06-04 17:10',
    manager: 'Nneka Ibe',
  },
  {
    id: 'agent_004',
    fullName: 'Tunde Yusuf',
    email: 'tunde.yusuf@estateflow.test',
    phone: '+234 807 010 9988',
    branch: 'Lekki Branch',
    team: 'Commercial Desk',
    tier: 'principal',
    specialisation: 'Commercial offices and warehouses',
    status: 'pending',
    activeProperties: 5,
    assignedLeads: 13,
    activeClients: 9,
    viewingsThisMonth: 6,
    dealsClosed: 2,
    conversionRate: 15,
    revenueClosed: 62000000,
    commissionEarned: 1860000,
    lastActivity: '2026-06-03 12:35',
    manager: 'Agency Admin',
  },
  {
    id: 'agent_005',
    fullName: 'Adaora Okafor',
    email: 'adaora.okafor@estateflow.test',
    phone: '+234 806 552 1120',
    branch: 'Ikoyi Branch',
    team: 'Investor Relations',
    tier: 'senior',
    specialisation: 'Investor clients and portfolio deals',
    status: 'inactive',
    activeProperties: 3,
    assignedLeads: 8,
    activeClients: 6,
    viewingsThisMonth: 2,
    dealsClosed: 1,
    conversionRate: 13,
    revenueClosed: 41000000,
    commissionEarned: 1230000,
    lastActivity: '2026-05-29 10:05',
    manager: 'Agency Admin',
  },
];

export const demoCommissions: CommissionRecord[] = [
  {
    id: 'comm_001',
    agentName: 'Nneka Ibe',
    propertyTitle: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    clientName: 'Aisha Bello',
    dealType: 'sale',
    dealValue: 450000000,
    commissionRate: 3,
    commissionAmount: 13500000,
    status: 'approved',
    closedAt: '2026-06-01',
    dueDate: '2026-06-10',
    notes: 'Commission approved after final seller confirmation.',
  },
  {
    id: 'comm_002',
    agentName: 'Seyi Adewale',
    propertyTitle: 'Serviced 3-Bedroom Apartment in Ikoyi',
    clientName: 'Femi Adebayo',
    dealType: 'rent',
    dealValue: 18000000,
    commissionRate: 10,
    commissionAmount: 1800000,
    status: 'pending',
    closedAt: '2026-06-02',
    dueDate: '2026-06-12',
    notes: 'Awaiting complete tenancy processing payment.',
  },
  {
    id: 'comm_003',
    agentName: 'Mariam Lawal',
    propertyTitle: 'Dry Land Measuring 900sqm in Sangotedo',
    clientName: 'Mrs. Halima Musa',
    dealType: 'sale',
    dealValue: 85000000,
    commissionRate: 3,
    commissionAmount: 2550000,
    status: 'paid',
    closedAt: '2026-05-28',
    dueDate: '2026-06-03',
    notes: 'Paid after title verification and transfer documentation.',
  },
  {
    id: 'comm_004',
    agentName: 'Nneka Ibe',
    propertyTitle: 'Commercial Office Floor in Victoria Island',
    clientName: 'Tola Martins',
    dealType: 'referral',
    dealValue: 65000000,
    commissionRate: 1.5,
    commissionAmount: 975000,
    status: 'disputed',
    closedAt: '2026-05-25',
    dueDate: '2026-06-09',
    notes: 'Referral split requires agency-admin confirmation.',
  },
];
