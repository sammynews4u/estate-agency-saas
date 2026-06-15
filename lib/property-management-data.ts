export type TenantStatus = 'active' | 'notice_given' | 'overdue' | 'moved_out';
export type LeaseStatus = 'active' | 'renewal_due' | 'expired' | 'terminated';
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent';
export type MaintenanceStatus = 'reported' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
export type InspectionStatus = 'scheduled' | 'completed' | 'requires_action' | 'cancelled';
export type OccupancyStatus = 'occupied' | 'vacant' | 'reserved' | 'maintenance_hold';

export interface TenantRecord {
  id: string;
  tenantName: string;
  phone: string;
  email: string;
  property: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  paymentFrequency: 'monthly' | 'quarterly' | 'yearly';
  outstandingBalance: number;
  status: TenantStatus;
  assignedAgent: string;
}

export interface LeaseRecord {
  id: string;
  tenantName: string;
  property: string;
  leaseDocument: string;
  startDate: string;
  endDate: string;
  renewalDate: string;
  rentAmount: number;
  securityDeposit: number;
  status: LeaseStatus;
}

export interface MaintenanceRecord {
  id: string;
  property: string;
  tenantName: string;
  issueTitle: string;
  issueDescription: string;
  priority: MaintenancePriority;
  assignedVendor: string;
  estimatedCost: number;
  dateReported: string;
  dateResolved?: string;
  status: MaintenanceStatus;
}

export interface InspectionRecord {
  id: string;
  property: string;
  inspector: string;
  inspectionDate: string;
  inspectionType: 'move_in' | 'routine' | 'move_out' | 'maintenance';
  conditionScore: number;
  findings: string;
  status: InspectionStatus;
}

export interface OccupancyRecord {
  id: string;
  property: string;
  unit: string;
  landlord: string;
  status: OccupancyStatus;
  currentTenant?: string;
  rentAmount: number;
  nextAvailabilityDate?: string;
}

export const tenantStatusLabels: Record<TenantStatus, string> = {
  active: 'Active',
  notice_given: 'Notice given',
  overdue: 'Overdue',
  moved_out: 'Moved out',
};

export const tenantStatusTone: Record<TenantStatus, 'success' | 'warning' | 'danger' | 'muted'> = {
  active: 'success',
  notice_given: 'warning',
  overdue: 'danger',
  moved_out: 'muted',
};

export const leaseStatusLabels: Record<LeaseStatus, string> = {
  active: 'Active',
  renewal_due: 'Renewal due',
  expired: 'Expired',
  terminated: 'Terminated',
};

export const leaseStatusTone: Record<LeaseStatus, 'success' | 'warning' | 'danger' | 'muted'> = {
  active: 'success',
  renewal_due: 'warning',
  expired: 'danger',
  terminated: 'muted',
};

export const maintenancePriorityLabels: Record<MaintenancePriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

export const maintenancePriorityTone: Record<MaintenancePriority, 'success' | 'warning' | 'danger' | 'gold'> = {
  low: 'success',
  medium: 'warning',
  high: 'gold',
  urgent: 'danger',
};

export const maintenanceStatusLabels: Record<MaintenanceStatus, string> = {
  reported: 'Reported',
  assigned: 'Assigned',
  in_progress: 'In progress',
  resolved: 'Resolved',
  closed: 'Closed',
};

export const maintenanceStatusTone: Record<MaintenanceStatus, 'default' | 'warning' | 'gold' | 'success' | 'muted'> = {
  reported: 'default',
  assigned: 'warning',
  in_progress: 'gold',
  resolved: 'success',
  closed: 'muted',
};

export const inspectionStatusLabels: Record<InspectionStatus, string> = {
  scheduled: 'Scheduled',
  completed: 'Completed',
  requires_action: 'Requires action',
  cancelled: 'Cancelled',
};

export const inspectionStatusTone: Record<InspectionStatus, 'default' | 'success' | 'danger' | 'muted'> = {
  scheduled: 'default',
  completed: 'success',
  requires_action: 'danger',
  cancelled: 'muted',
};

export const occupancyStatusLabels: Record<OccupancyStatus, string> = {
  occupied: 'Occupied',
  vacant: 'Vacant',
  reserved: 'Reserved',
  maintenance_hold: 'Maintenance hold',
};

export const occupancyStatusTone: Record<OccupancyStatus, 'success' | 'warning' | 'gold' | 'danger'> = {
  occupied: 'success',
  vacant: 'warning',
  reserved: 'gold',
  maintenance_hold: 'danger',
};

export const tenantStatuses: TenantStatus[] = ['active', 'notice_given', 'overdue', 'moved_out'];
export const leaseStatuses: LeaseStatus[] = ['active', 'renewal_due', 'expired', 'terminated'];
export const maintenanceStatuses: MaintenanceStatus[] = ['reported', 'assigned', 'in_progress', 'resolved', 'closed'];
export const maintenancePriorities: MaintenancePriority[] = ['low', 'medium', 'high', 'urgent'];
export const inspectionStatuses: InspectionStatus[] = ['scheduled', 'completed', 'requires_action', 'cancelled'];

export function formatPropertyMoney(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export const demoTenants: TenantRecord[] = [
  {
    id: 'tenant_001',
    tenantName: 'Adaeze Okonkwo',
    phone: '+234 803 111 4500',
    email: 'adaeze.okonkwo@example.com',
    property: 'Emerald Court Apartment',
    unit: 'Flat 4B',
    leaseStart: '2025-09-01',
    leaseEnd: '2026-08-31',
    rentAmount: 3500000,
    paymentFrequency: 'yearly',
    outstandingBalance: 0,
    status: 'active',
    assignedAgent: 'Tola Martins',
  },
  {
    id: 'tenant_002',
    tenantName: 'Chinedu Nwankwo',
    phone: '+234 802 888 1976',
    email: 'chinedu.nwankwo@example.com',
    property: 'Lekki Retail Plaza',
    unit: 'Shop 12',
    leaseStart: '2025-04-15',
    leaseEnd: '2026-04-14',
    rentAmount: 5200000,
    paymentFrequency: 'yearly',
    outstandingBalance: 450000,
    status: 'overdue',
    assignedAgent: 'Mariam Balogun',
  },
  {
    id: 'tenant_003',
    tenantName: 'Femi Adebayo',
    phone: '+234 809 444 0101',
    email: 'femi.adebayo@example.com',
    property: 'Victoria Island Office Suite',
    unit: 'Suite 7A',
    leaseStart: '2025-11-01',
    leaseEnd: '2026-10-31',
    rentAmount: 7800000,
    paymentFrequency: 'yearly',
    outstandingBalance: 0,
    status: 'notice_given',
    assignedAgent: 'Kunle Sanni',
  },
];

export const demoLeases: LeaseRecord[] = [
  {
    id: 'lease_001',
    tenantName: 'Adaeze Okonkwo',
    property: 'Emerald Court Apartment',
    leaseDocument: 'emerald-court-flat-4b-lease.pdf',
    startDate: '2025-09-01',
    endDate: '2026-08-31',
    renewalDate: '2026-07-31',
    rentAmount: 3500000,
    securityDeposit: 500000,
    status: 'active',
  },
  {
    id: 'lease_002',
    tenantName: 'Chinedu Nwankwo',
    property: 'Lekki Retail Plaza',
    leaseDocument: 'lekki-retail-shop-12-lease.pdf',
    startDate: '2025-04-15',
    endDate: '2026-04-14',
    renewalDate: '2026-03-15',
    rentAmount: 5200000,
    securityDeposit: 800000,
    status: 'renewal_due',
  },
  {
    id: 'lease_003',
    tenantName: 'Femi Adebayo',
    property: 'Victoria Island Office Suite',
    leaseDocument: 'vi-office-suite-7a-lease.pdf',
    startDate: '2025-11-01',
    endDate: '2026-10-31',
    renewalDate: '2026-09-30',
    rentAmount: 7800000,
    securityDeposit: 1000000,
    status: 'active',
  },
];

export const demoMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'maint_001',
    property: 'Emerald Court Apartment',
    tenantName: 'Adaeze Okonkwo',
    issueTitle: 'Kitchen pipe leakage',
    issueDescription: 'Leak under kitchen sink affecting lower cabinet.',
    priority: 'high',
    assignedVendor: 'RapidFix Plumbing',
    estimatedCost: 85000,
    dateReported: '2026-06-03',
    status: 'assigned',
  },
  {
    id: 'maint_002',
    property: 'Lekki Retail Plaza',
    tenantName: 'Chinedu Nwankwo',
    issueTitle: 'Faulty shop shutter',
    issueDescription: 'Manual shutter is difficult to open and needs servicing.',
    priority: 'medium',
    assignedVendor: 'Prime Steel Works',
    estimatedCost: 120000,
    dateReported: '2026-05-28',
    status: 'in_progress',
  },
  {
    id: 'maint_003',
    property: 'Victoria Island Office Suite',
    tenantName: 'Femi Adebayo',
    issueTitle: 'AC servicing',
    issueDescription: 'Quarterly servicing for two split units.',
    priority: 'low',
    assignedVendor: 'CoolAir Services',
    estimatedCost: 65000,
    dateReported: '2026-05-25',
    dateResolved: '2026-05-27',
    status: 'resolved',
  },
];

export const demoInspections: InspectionRecord[] = [
  {
    id: 'insp_001',
    property: 'Emerald Court Apartment',
    inspector: 'Tola Martins',
    inspectionDate: '2026-06-12',
    inspectionType: 'routine',
    conditionScore: 86,
    findings: 'Overall condition is good. Minor plumbing issue already logged.',
    status: 'scheduled',
  },
  {
    id: 'insp_002',
    property: 'Lekki Retail Plaza',
    inspector: 'Mariam Balogun',
    inspectionDate: '2026-05-30',
    inspectionType: 'maintenance',
    conditionScore: 72,
    findings: 'Front shutter and signage frame require attention before renewal.',
    status: 'requires_action',
  },
  {
    id: 'insp_003',
    property: 'Victoria Island Office Suite',
    inspector: 'Kunle Sanni',
    inspectionDate: '2026-05-20',
    inspectionType: 'routine',
    conditionScore: 91,
    findings: 'Office is well maintained. No major defect found.',
    status: 'completed',
  },
];

export const demoOccupancy: OccupancyRecord[] = [
  {
    id: 'occ_001',
    property: 'Emerald Court Apartment',
    unit: 'Flat 4B',
    landlord: 'Mrs. Kemi Lawal',
    status: 'occupied',
    currentTenant: 'Adaeze Okonkwo',
    rentAmount: 3500000,
    nextAvailabilityDate: '2026-09-01',
  },
  {
    id: 'occ_002',
    property: 'Lekki Retail Plaza',
    unit: 'Shop 12',
    landlord: 'BlueGate Holdings',
    status: 'occupied',
    currentTenant: 'Chinedu Nwankwo',
    rentAmount: 5200000,
    nextAvailabilityDate: '2026-04-15',
  },
  {
    id: 'occ_003',
    property: 'Ikoyi Studio Apartment',
    unit: 'Studio 2C',
    landlord: 'Mr. Dele Ogunleye',
    status: 'vacant',
    rentAmount: 2800000,
    nextAvailabilityDate: '2026-06-10',
  },
  {
    id: 'occ_004',
    property: 'Yaba Mini Flat',
    unit: 'Flat 1A',
    landlord: 'Mrs. Ngozi Eze',
    status: 'maintenance_hold',
    rentAmount: 1500000,
    nextAvailabilityDate: '2026-06-25',
  },
];
