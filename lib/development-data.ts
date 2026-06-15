export type DevelopmentProjectStatus = 'planning' | 'selling' | 'under_construction' | 'completed' | 'on_hold';
export type ProjectUnitStatus = 'available' | 'reserved' | 'sold' | 'blocked';
export type ConstructionProgressStatus = 'not_started' | 'in_progress' | 'completed' | 'delayed';
export type DevelopmentSaleStatus = 'prospect' | 'reserved' | 'deposit_paid' | 'closed' | 'cancelled';

export type DevelopmentProjectRecord = {
  id: string;
  projectName: string;
  developerName: string;
  location: string;
  description: string;
  startDate: string;
  expectedCompletionDate: string;
  status: DevelopmentProjectStatus;
  totalUnits: number;
  unitsSold: number;
  unitsAvailable: number;
  progressPercentage: number;
  projectedRevenue: number;
  documentsCount: number;
};

export type ProjectUnitRecord = {
  id: string;
  projectName: string;
  unitNumber: string;
  unitType: string;
  floor: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  price: number;
  buyerName?: string;
  assignedAgent: string;
  status: ProjectUnitStatus;
};

export type ConstructionProgressRecord = {
  id: string;
  projectName: string;
  milestone: string;
  phase: string;
  targetDate: string;
  completionDate?: string;
  progressPercentage: number;
  contractor: string;
  riskNote: string;
  status: ConstructionProgressStatus;
};

export type DevelopmentSaleRecord = {
  id: string;
  projectName: string;
  unitNumber: string;
  buyerName: string;
  agentName: string;
  dealValue: number;
  depositPaid: number;
  expectedCloseDate: string;
  status: DevelopmentSaleStatus;
};

export const developmentProjectStatuses: DevelopmentProjectStatus[] = ['planning', 'selling', 'under_construction', 'completed', 'on_hold'];
export const projectUnitStatuses: ProjectUnitStatus[] = ['available', 'reserved', 'sold', 'blocked'];
export const constructionProgressStatuses: ConstructionProgressStatus[] = ['not_started', 'in_progress', 'completed', 'delayed'];
export const developmentSaleStatuses: DevelopmentSaleStatus[] = ['prospect', 'reserved', 'deposit_paid', 'closed', 'cancelled'];

export const developmentProjectStatusLabels: Record<DevelopmentProjectStatus, string> = {
  planning: 'Planning',
  selling: 'Selling',
  under_construction: 'Under construction',
  completed: 'Completed',
  on_hold: 'On hold',
};

export const projectUnitStatusLabels: Record<ProjectUnitStatus, string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
  blocked: 'Blocked',
};

export const constructionProgressStatusLabels: Record<ConstructionProgressStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Completed',
  delayed: 'Delayed',
};

export const developmentSaleStatusLabels: Record<DevelopmentSaleStatus, string> = {
  prospect: 'Prospect',
  reserved: 'Reserved',
  deposit_paid: 'Deposit paid',
  closed: 'Closed',
  cancelled: 'Cancelled',
};

export const developmentProjectStatusTone: Record<DevelopmentProjectStatus, 'success' | 'warning' | 'danger' | 'muted' | 'gold'> = {
  planning: 'muted',
  selling: 'gold',
  under_construction: 'warning',
  completed: 'success',
  on_hold: 'danger',
};

export const projectUnitStatusTone: Record<ProjectUnitStatus, 'success' | 'warning' | 'danger' | 'muted' | 'gold'> = {
  available: 'success',
  reserved: 'warning',
  sold: 'gold',
  blocked: 'danger',
};

export const constructionProgressStatusTone: Record<ConstructionProgressStatus, 'success' | 'warning' | 'danger' | 'muted'> = {
  not_started: 'muted',
  in_progress: 'warning',
  completed: 'success',
  delayed: 'danger',
};

export const developmentSaleStatusTone: Record<DevelopmentSaleStatus, 'success' | 'warning' | 'danger' | 'muted' | 'gold'> = {
  prospect: 'muted',
  reserved: 'warning',
  deposit_paid: 'gold',
  closed: 'success',
  cancelled: 'danger',
};

export function formatDevelopmentMoney(amount: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
}

export const demoDevelopmentProjects: DevelopmentProjectRecord[] = [
  {
    id: 'project_001',
    projectName: 'Emerald Court Ikoyi',
    developerName: 'Crestline Developments',
    location: 'Ikoyi, Lagos',
    description: 'Luxury 24-unit apartment development with waterfront-facing penthouses and investor-grade finishing.',
    startDate: '2025-10-01',
    expectedCompletionDate: '2027-03-30',
    status: 'under_construction',
    totalUnits: 24,
    unitsSold: 11,
    unitsAvailable: 9,
    progressPercentage: 46,
    projectedRevenue: 18200000000,
    documentsCount: 18,
  },
  {
    id: 'project_002',
    projectName: 'Orchid Grove Terraces',
    developerName: 'Northbay Homes',
    location: 'Orchid Road, Lekki',
    description: 'Family-focused terrace estate with staggered payment plans for mid-market buyers.',
    startDate: '2025-05-15',
    expectedCompletionDate: '2026-11-30',
    status: 'selling',
    totalUnits: 36,
    unitsSold: 22,
    unitsAvailable: 10,
    progressPercentage: 71,
    projectedRevenue: 13500000000,
    documentsCount: 24,
  },
  {
    id: 'project_003',
    projectName: 'Mainland Commerce Park',
    developerName: 'UrbanEdge Projects',
    location: 'Ikeja, Lagos',
    description: 'Mixed-use commercial project with offices, retail units and serviced business suites.',
    startDate: '2026-01-20',
    expectedCompletionDate: '2027-08-15',
    status: 'planning',
    totalUnits: 58,
    unitsSold: 4,
    unitsAvailable: 49,
    progressPercentage: 12,
    projectedRevenue: 9500000000,
    documentsCount: 9,
  },
];

export const demoProjectUnits: ProjectUnitRecord[] = [
  { id: 'unit_001', projectName: 'Emerald Court Ikoyi', unitNumber: 'A-1201', unitType: 'Penthouse', floor: '12th', bedrooms: 4, bathrooms: 5, sizeSqm: 310, price: 1250000000, buyerName: 'Temi Ajayi', assignedAgent: 'Tola Martins', status: 'sold' },
  { id: 'unit_002', projectName: 'Emerald Court Ikoyi', unitNumber: 'B-0802', unitType: 'Apartment', floor: '8th', bedrooms: 3, bathrooms: 4, sizeSqm: 210, price: 760000000, assignedAgent: 'Amaka Obi', status: 'reserved' },
  { id: 'unit_003', projectName: 'Orchid Grove Terraces', unitNumber: 'T-14', unitType: 'Terrace Duplex', floor: 'Ground + 1', bedrooms: 4, bathrooms: 5, sizeSqm: 260, price: 385000000, buyerName: 'Lola Benson', assignedAgent: 'Tola Martins', status: 'sold' },
  { id: 'unit_004', projectName: 'Orchid Grove Terraces', unitNumber: 'T-19', unitType: 'Terrace Duplex', floor: 'Ground + 1', bedrooms: 4, bathrooms: 5, sizeSqm: 260, price: 395000000, assignedAgent: 'Femi Johnson', status: 'available' },
  { id: 'unit_005', projectName: 'Mainland Commerce Park', unitNumber: 'O-03', unitType: 'Office Suite', floor: '3rd', bedrooms: 0, bathrooms: 1, sizeSqm: 86, price: 180000000, assignedAgent: 'Amaka Obi', status: 'available' },
];

export const demoConstructionProgress: ConstructionProgressRecord[] = [
  { id: 'progress_001', projectName: 'Emerald Court Ikoyi', milestone: 'Structural frame', phase: 'Civil works', targetDate: '2026-08-30', progressPercentage: 62, contractor: 'Cobalt Build Ltd', riskNote: 'Concrete schedule is tight. Weekly material tracking is compulsory.', status: 'in_progress' },
  { id: 'progress_002', projectName: 'Orchid Grove Terraces', milestone: 'External finishing', phase: 'Finishing', targetDate: '2026-09-15', progressPercentage: 81, contractor: 'BuildRight Nigeria', riskNote: 'Paint and aluminium supply must be locked down before rainy season delays.', status: 'in_progress' },
  { id: 'progress_003', projectName: 'Mainland Commerce Park', milestone: 'Planning approval', phase: 'Documentation', targetDate: '2026-07-10', progressPercentage: 30, contractor: 'UrbanEdge Projects', riskNote: 'Approval delay will affect pre-sale confidence.', status: 'delayed' },
  { id: 'progress_004', projectName: 'Orchid Grove Terraces', milestone: 'Roofing', phase: 'Civil works', targetDate: '2026-04-12', completionDate: '2026-04-10', progressPercentage: 100, contractor: 'BuildRight Nigeria', riskNote: 'Completed ahead of schedule.', status: 'completed' },
];

export const demoDevelopmentSales: DevelopmentSaleRecord[] = [
  { id: 'sale_001', projectName: 'Emerald Court Ikoyi', unitNumber: 'A-1201', buyerName: 'Temi Ajayi', agentName: 'Tola Martins', dealValue: 1250000000, depositPaid: 500000000, expectedCloseDate: '2026-08-01', status: 'closed' },
  { id: 'sale_002', projectName: 'Emerald Court Ikoyi', unitNumber: 'B-0802', buyerName: 'Zenith Holdings', agentName: 'Amaka Obi', dealValue: 760000000, depositPaid: 150000000, expectedCloseDate: '2026-07-20', status: 'deposit_paid' },
  { id: 'sale_003', projectName: 'Orchid Grove Terraces', unitNumber: 'T-19', buyerName: 'Dr. Kelvin Nnamdi', agentName: 'Femi Johnson', dealValue: 395000000, depositPaid: 0, expectedCloseDate: '2026-06-30', status: 'reserved' },
  { id: 'sale_004', projectName: 'Mainland Commerce Park', unitNumber: 'O-03', buyerName: 'Apex Logistics', agentName: 'Amaka Obi', dealValue: 180000000, depositPaid: 0, expectedCloseDate: '2026-07-15', status: 'prospect' },
];
