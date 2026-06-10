export type AnalyticsScope = 'super-admin' | 'agency' | 'developer' | 'finance';
export type ReportStatus = 'healthy' | 'warning' | 'danger' | 'neutral';

export type FunnelRecord = {
  stage: string;
  count: number;
  conversion: number;
};

export type MonthlyPerformanceRecord = {
  month: string;
  inquiries: number;
  viewings: number;
  deals: number;
  revenue: number;
  expenses: number;
};

export type AgentPerformanceRecord = {
  agent: string;
  leads: number;
  viewings: number;
  deals: number;
  revenue: number;
  conversionRate: number;
};

export type PropertyMixRecord = {
  name: string;
  value: number;
};

export type ReportInsightRecord = {
  id: string;
  title: string;
  message: string;
  status: ReportStatus;
  owner: string;
};

export type ExportRecord = {
  id: string;
  reportName: string;
  scope: AnalyticsScope;
  format: 'CSV' | 'PDF' | 'XLSX';
  generatedBy: string;
  generatedAt: string;
  status: 'ready' | 'queued' | 'failed';
};

export function formatReportMoney(amount: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
}

export const monthlyPerformance: MonthlyPerformanceRecord[] = [
  { month: 'Jan', inquiries: 86, viewings: 34, deals: 7, revenue: 17500000, expenses: 6400000 },
  { month: 'Feb', inquiries: 112, viewings: 41, deals: 9, revenue: 23800000, expenses: 7200000 },
  { month: 'Mar', inquiries: 138, viewings: 58, deals: 12, revenue: 34100000, expenses: 8500000 },
  { month: 'Apr', inquiries: 124, viewings: 52, deals: 10, revenue: 28700000, expenses: 7900000 },
  { month: 'May', inquiries: 169, viewings: 73, deals: 16, revenue: 48600000, expenses: 11800000 },
  { month: 'Jun', inquiries: 154, viewings: 68, deals: 14, revenue: 42100000, expenses: 10400000 },
];

export const leadFunnel: FunnelRecord[] = [
  { stage: 'New leads', count: 420, conversion: 100 },
  { stage: 'Qualified', count: 284, conversion: 68 },
  { stage: 'Viewing booked', count: 176, conversion: 42 },
  { stage: 'Negotiating', count: 83, conversion: 20 },
  { stage: 'Closed', count: 37, conversion: 9 },
];

export const agentPerformance: AgentPerformanceRecord[] = [
  { agent: 'Tola Martins', leads: 82, viewings: 35, deals: 9, revenue: 18800000, conversionRate: 11 },
  { agent: 'Amaka Obi', leads: 74, viewings: 31, deals: 8, revenue: 16200000, conversionRate: 10.8 },
  { agent: 'Femi Johnson', leads: 58, viewings: 22, deals: 5, revenue: 9800000, conversionRate: 8.6 },
  { agent: 'Ada Cole', leads: 43, viewings: 17, deals: 3, revenue: 5400000, conversionRate: 7 },
];

export const propertyMix: PropertyMixRecord[] = [
  { name: 'Apartments', value: 36 },
  { name: 'Houses', value: 24 },
  { name: 'Commercial', value: 18 },
  { name: 'Land', value: 12 },
  { name: 'Warehouses', value: 10 },
];

export const discoverySourcePerformance = [
  { source: 'Website', leads: 118, converted: 26 },
  { source: 'WhatsApp', leads: 92, converted: 19 },
  { source: 'Referrals', leads: 68, converted: 24 },
  { source: 'Social', leads: 145, converted: 21 },
  { source: 'Discovery', leads: 57, converted: 13 },
];

export const developerPerformance = [
  { project: 'Emerald Court Ikoyi', units: 24, sold: 11, progress: 46, revenue: 8750000000 },
  { project: 'Orchid Grove Terraces', units: 36, sold: 22, progress: 71, revenue: 8470000000 },
  { project: 'Mainland Commerce Park', units: 58, sold: 4, progress: 12, revenue: 720000000 },
];

export const reportInsights: ReportInsightRecord[] = [
  { id: 'insight_001', title: 'Lead volume is not the bottleneck', message: 'The weak point is the drop from qualified lead to booked viewing. Tighten appointment follow-up before increasing ad spend.', status: 'warning', owner: 'Agency Admin' },
  { id: 'insight_002', title: 'Referral leads convert better', message: 'Referral leads produced fewer inquiries but stronger conversion. Build incentives around verified referral partners.', status: 'healthy', owner: 'Agency Admin' },
  { id: 'insight_003', title: 'Developer progress risk', message: 'Mainland Commerce Park has a documentation delay. Sales confidence will suffer if approval evidence is not visible to buyers.', status: 'danger', owner: 'Developer' },
  { id: 'insight_004', title: 'Expense growth is still controlled', message: 'Monthly expenses increased with revenue but net balance remains healthy. Finance should keep payroll and commission liabilities separated.', status: 'neutral', owner: 'Finance Staff' },
];

export const exportHistory: ExportRecord[] = [
  { id: 'export_001', reportName: 'Agency performance summary', scope: 'agency', format: 'PDF', generatedBy: 'Aisha Bello', generatedAt: '2026-06-04 09:12', status: 'ready' },
  { id: 'export_002', reportName: 'Lead funnel and agent ranking', scope: 'agency', format: 'CSV', generatedBy: 'Aisha Bello', generatedAt: '2026-06-03 17:45', status: 'ready' },
  { id: 'export_003', reportName: 'Developer unit inventory report', scope: 'developer', format: 'XLSX', generatedBy: 'Daniel Okafor', generatedAt: '2026-06-02 14:20', status: 'queued' },
];
