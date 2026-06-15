export type ExpenseCategory = 'marketing' | 'office' | 'transport' | 'utilities' | 'professional_services' | 'software' | 'maintenance' | 'miscellaneous';
export type ExpenseStatus = 'draft' | 'submitted' | 'approved' | 'reimbursed' | 'rejected';
export type PayrollStatus = 'pending' | 'approved' | 'paid' | 'held';

export type ExpenseRecord = {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  branch: string;
  staffName: string;
  expenseDate: string;
  status: ExpenseStatus;
  receiptAttached: boolean;
  notes: string;
};

export type PayrollRecord = {
  id: string;
  staffName: string;
  role: string;
  branch: string;
  baseSalary: number;
  commissionBonus: number;
  deductions: number;
  netPay: number;
  payPeriod: string;
  paymentDate: string;
  status: PayrollStatus;
};

export type BranchFinanceRecord = {
  id: string;
  branch: string;
  revenue: number;
  expenses: number;
  payroll: number;
  pendingInvoices: number;
  receiptsIssued: number;
  netBalance: number;
  conversionRevenue: number;
};

export const expenseCategoryLabels: Record<ExpenseCategory, string> = {
  marketing: 'Marketing',
  office: 'Office operations',
  transport: 'Transport',
  utilities: 'Utilities',
  professional_services: 'Professional services',
  software: 'Software',
  maintenance: 'Maintenance',
  miscellaneous: 'Miscellaneous',
};

export const expenseStatusLabels: Record<ExpenseStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  approved: 'Approved',
  reimbursed: 'Reimbursed',
  rejected: 'Rejected',
};

export const expenseStatusTone: Record<ExpenseStatus, 'success' | 'warning' | 'danger' | 'muted' | 'gold'> = {
  draft: 'muted',
  submitted: 'warning',
  approved: 'gold',
  reimbursed: 'success',
  rejected: 'danger',
};

export const payrollStatusLabels: Record<PayrollStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  paid: 'Paid',
  held: 'Held',
};

export const payrollStatusTone: Record<PayrollStatus, 'success' | 'warning' | 'danger' | 'gold'> = {
  pending: 'warning',
  approved: 'gold',
  paid: 'success',
  held: 'danger',
};

export function formatFinanceMoney(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);
}

export const demoExpenses: ExpenseRecord[] = [
  {
    id: 'exp_001',
    category: 'marketing',
    description: 'Meta ads for Lekki luxury listings',
    amount: 650000,
    branch: 'Lekki Branch',
    staffName: 'Nneka Ibe',
    expenseDate: '2026-06-03',
    status: 'approved',
    receiptAttached: true,
    notes: 'Campaign tied to premium duplex and investor retargeting.',
  },
  {
    id: 'exp_002',
    category: 'transport',
    description: 'Client viewing logistics for Ikoyi rentals',
    amount: 85000,
    branch: 'Ikoyi Branch',
    staffName: 'Seyi Adewale',
    expenseDate: '2026-06-04',
    status: 'submitted',
    receiptAttached: true,
    notes: 'Three corporate apartment inspections.',
  },
  {
    id: 'exp_003',
    category: 'software',
    description: 'Property media cloud storage renewal',
    amount: 120000,
    branch: 'Head Office',
    staffName: 'Finance Desk',
    expenseDate: '2026-06-01',
    status: 'reimbursed',
    receiptAttached: false,
    notes: 'Renewal should be moved to recurring expenses later.',
  },
  {
    id: 'exp_004',
    category: 'professional_services',
    description: 'Legal review for commercial lease pack',
    amount: 250000,
    branch: 'Victoria Island Desk',
    staffName: 'Tunde Yusuf',
    expenseDate: '2026-05-29',
    status: 'approved',
    receiptAttached: true,
    notes: 'Chargeable back to client after invoice confirmation.',
  },
];

export const demoPayroll: PayrollRecord[] = [
  {
    id: 'pay_001',
    staffName: 'Nneka Ibe',
    role: 'Team Lead Agent',
    branch: 'Lekki Branch',
    baseSalary: 250000,
    commissionBonus: 1455000,
    deductions: 50000,
    netPay: 1655000,
    payPeriod: 'June 2026',
    paymentDate: '2026-06-28',
    status: 'approved',
  },
  {
    id: 'pay_002',
    staffName: 'Seyi Adewale',
    role: 'Senior Agent',
    branch: 'Ikoyi Branch',
    baseSalary: 180000,
    commissionBonus: 378000,
    deductions: 25000,
    netPay: 533000,
    payPeriod: 'June 2026',
    paymentDate: '2026-06-28',
    status: 'pending',
  },
  {
    id: 'pay_003',
    staffName: 'Finance Desk',
    role: 'Finance Staff',
    branch: 'Head Office',
    baseSalary: 220000,
    commissionBonus: 0,
    deductions: 20000,
    netPay: 200000,
    payPeriod: 'June 2026',
    paymentDate: '2026-06-28',
    status: 'paid',
  },
  {
    id: 'pay_004',
    staffName: 'Tunde Yusuf',
    role: 'Principal Agent',
    branch: 'Lekki Branch',
    baseSalary: 210000,
    commissionBonus: 186000,
    deductions: 30000,
    netPay: 366000,
    payPeriod: 'June 2026',
    paymentDate: '2026-06-28',
    status: 'held',
  },
];

export const demoBranchFinance: BranchFinanceRecord[] = [
  {
    id: 'bf_001',
    branch: 'Lekki Branch',
    revenue: 16120000,
    expenses: 820000,
    payroll: 2021000,
    pendingInvoices: 4,
    receiptsIssued: 7,
    netBalance: 13279000,
    conversionRevenue: 485000000,
  },
  {
    id: 'bf_002',
    branch: 'Ikoyi Branch',
    revenue: 2898750,
    expenses: 305000,
    payroll: 533000,
    pendingInvoices: 3,
    receiptsIssued: 4,
    netBalance: 2060750,
    conversionRevenue: 126000000,
  },
  {
    id: 'bf_003',
    branch: 'Victoria Island Desk',
    revenue: 1290000,
    expenses: 250000,
    payroll: 366000,
    pendingInvoices: 1,
    receiptsIssued: 2,
    netBalance: 674000,
    conversionRevenue: 65000000,
  },
];
