export type TransactionStage = 'inquiry' | 'offer' | 'due_diligence' | 'contract' | 'deposit' | 'closing' | 'completed' | 'failed';
export type TransactionType = 'sale' | 'rent' | 'lease' | 'off_plan';
export type TransactionPriority = 'low' | 'medium' | 'high' | 'critical';
export type TransactionTaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked';

export type DealTransaction = {
  id: string;
  title: string;
  property: string;
  client: string;
  counterparty: string;
  agent: string;
  branch: string;
  type: TransactionType;
  stage: TransactionStage;
  priority: TransactionPriority;
  dealValue: number;
  expectedCommission: number;
  closingDate: string;
  nextAction: string;
  checklistProgress: number;
  documentCount: number;
  riskNote: string;
};

export type TransactionTask = {
  id: string;
  transactionTitle: string;
  task: string;
  owner: string;
  dueDate: string;
  status: TransactionTaskStatus;
  blocker?: string;
};

export const transactionStageLabels: Record<TransactionStage, string> = {
  inquiry: 'Inquiry',
  offer: 'Offer',
  due_diligence: 'Due diligence',
  contract: 'Contract',
  deposit: 'Deposit',
  closing: 'Closing',
  completed: 'Completed',
  failed: 'Failed',
};

export const transactionTypeLabels: Record<TransactionType, string> = {
  sale: 'Sale',
  rent: 'Rent',
  lease: 'Lease',
  off_plan: 'Off-plan',
};

export const transactionPriorityLabels: Record<TransactionPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

export const transactionTaskStatusLabels: Record<TransactionTaskStatus, string> = {
  pending: 'Pending',
  in_progress: 'In progress',
  completed: 'Completed',
  blocked: 'Blocked',
};

export const transactionStageTone: Record<TransactionStage, 'muted' | 'warning' | 'success' | 'danger' | 'gold'> = {
  inquiry: 'muted',
  offer: 'gold',
  due_diligence: 'warning',
  contract: 'warning',
  deposit: 'gold',
  closing: 'success',
  completed: 'success',
  failed: 'danger',
};

export const transactionPriorityTone: Record<TransactionPriority, 'muted' | 'warning' | 'success' | 'danger' | 'gold'> = {
  low: 'muted',
  medium: 'gold',
  high: 'warning',
  critical: 'danger',
};

export const transactionTaskTone: Record<TransactionTaskStatus, 'muted' | 'warning' | 'success' | 'danger' | 'gold'> = {
  pending: 'muted',
  in_progress: 'warning',
  completed: 'success',
  blocked: 'danger',
};

export function formatTransactionMoney(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);
}

export const demoDealTransactions: DealTransaction[] = [
  {
    id: 'txn_001',
    title: 'Aisha Bello Lekki Duplex Purchase',
    property: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    client: 'Aisha Bello',
    counterparty: 'Direct landlord mandate',
    agent: 'Nneka Ibe',
    branch: 'Lekki HQ',
    type: 'sale',
    stage: 'due_diligence',
    priority: 'high',
    dealValue: 450000000,
    expectedCommission: 13500000,
    closingDate: '2026-06-28',
    nextAction: 'Confirm title search result and buyer solicitor comments.',
    checklistProgress: 58,
    documentCount: 7,
    riskNote: 'Buyer will not release deposit until Governor’s Consent and survey plan are reviewed.',
  },
  {
    id: 'txn_002',
    title: 'Femi Adebayo Ikoyi Serviced Apartment Rental',
    property: 'Serviced 3-Bedroom Apartment in Ikoyi',
    client: 'Femi Adebayo',
    counterparty: 'Corporate landlord',
    agent: 'Seyi Adewale',
    branch: 'Lekki HQ',
    type: 'rent',
    stage: 'contract',
    priority: 'medium',
    dealValue: 18000000,
    expectedCommission: 1800000,
    closingDate: '2026-06-12',
    nextAction: 'Send amended tenancy agreement and service charge schedule.',
    checklistProgress: 76,
    documentCount: 5,
    riskNote: 'Service charge terms must be clear before signing.',
  },
  {
    id: 'txn_003',
    title: 'VI Residences Phase II Investor Reservation',
    property: 'Victoria Island Residences Phase II',
    client: 'Mrs. Halima Musa',
    counterparty: 'UrbanBuild DevCo',
    agent: 'Developer Sales Team',
    branch: 'Ikeja Branch',
    type: 'off_plan',
    stage: 'deposit',
    priority: 'critical',
    dealValue: 126000000,
    expectedCommission: 3780000,
    closingDate: '2026-06-18',
    nextAction: 'Issue reservation invoice and confirm staged payment calendar.',
    checklistProgress: 64,
    documentCount: 8,
    riskNote: 'Investor wants project permits, construction timeline and escrow terms documented.',
  },
  {
    id: 'txn_004',
    title: 'Commercial Office Lease Renewal',
    property: 'Commercial Office Floor in Victoria Island',
    client: 'Chinedu Nwankwo',
    counterparty: 'Property owner board',
    agent: 'Tunde Lawal',
    branch: 'Ikeja Branch',
    type: 'lease',
    stage: 'offer',
    priority: 'medium',
    dealValue: 65000000,
    expectedCommission: 3250000,
    closingDate: '2026-07-05',
    nextAction: 'Negotiate rent-free fit-out period and escalation clause.',
    checklistProgress: 35,
    documentCount: 4,
    riskNote: 'Client is comparing a competing office in Oniru.',
  },
];

export const demoTransactionTasks: TransactionTask[] = [
  {
    id: 'task_001',
    transactionTitle: 'Aisha Bello Lekki Duplex Purchase',
    task: 'Upload title search report and highlight red flags.',
    owner: 'Legal Desk',
    dueDate: '2026-06-08',
    status: 'in_progress',
  },
  {
    id: 'task_002',
    transactionTitle: 'Femi Adebayo Ikoyi Serviced Apartment Rental',
    task: 'Confirm tenancy agreement corrections with landlord.',
    owner: 'Seyi Adewale',
    dueDate: '2026-06-07',
    status: 'pending',
  },
  {
    id: 'task_003',
    transactionTitle: 'VI Residences Phase II Investor Reservation',
    task: 'Attach project permits, progress photos and payment plan.',
    owner: 'Developer Sales Team',
    dueDate: '2026-06-09',
    status: 'blocked',
    blocker: 'Awaiting updated project permit scan.',
  },
  {
    id: 'task_004',
    transactionTitle: 'Commercial Office Lease Renewal',
    task: 'Prepare side-by-side lease option comparison.',
    owner: 'Tunde Lawal',
    dueDate: '2026-06-10',
    status: 'completed',
  },
];
