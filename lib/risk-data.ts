export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type RiskStatus = 'open' | 'investigating' | 'mitigated' | 'accepted' | 'closed';
export type AuditEventType = 'login' | 'data_change' | 'permission_change' | 'financial_action' | 'document_action' | 'security_flag';
export type ControlStatus = 'not_started' | 'in_progress' | 'passed' | 'failed';

export type RiskRegisterItem = {
  id: string;
  title: string;
  category: string;
  owner: string;
  level: RiskLevel;
  status: RiskStatus;
  impact: string;
  mitigation: string;
  dueDate: string;
};

export type AuditTrailEvent = {
  id: string;
  actor: string;
  role: string;
  eventType: AuditEventType;
  action: string;
  affectedRecord: string;
  ipAddress: string;
  riskLevel: RiskLevel;
  createdAt: string;
};

export type InternalControlCheck = {
  id: string;
  control: string;
  area: string;
  owner: string;
  status: ControlStatus;
  lastChecked: string;
  evidence: string;
};

export const riskLevelLabels: Record<RiskLevel, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

export const riskLevelTone: Record<RiskLevel, 'success' | 'warning' | 'danger' | 'gold'> = {
  low: 'success',
  medium: 'gold',
  high: 'warning',
  critical: 'danger',
};

export const riskStatusLabels: Record<RiskStatus, string> = {
  open: 'Open',
  investigating: 'Investigating',
  mitigated: 'Mitigated',
  accepted: 'Accepted',
  closed: 'Closed',
};

export const riskStatusTone: Record<RiskStatus, 'muted' | 'success' | 'warning' | 'danger' | 'gold'> = {
  open: 'warning',
  investigating: 'gold',
  mitigated: 'success',
  accepted: 'muted',
  closed: 'muted',
};

export const auditEventLabels: Record<AuditEventType, string> = {
  login: 'Login',
  data_change: 'Data change',
  permission_change: 'Permission change',
  financial_action: 'Financial action',
  document_action: 'Document action',
  security_flag: 'Security flag',
};

export const controlStatusLabels: Record<ControlStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  passed: 'Passed',
  failed: 'Failed',
};

export const controlStatusTone: Record<ControlStatus, 'muted' | 'warning' | 'success' | 'danger'> = {
  not_started: 'muted',
  in_progress: 'warning',
  passed: 'success',
  failed: 'danger',
};

export const demoRisks: RiskRegisterItem[] = [
  {
    id: 'risk_001',
    title: 'Unverified ownership document attached to premium listing',
    category: 'Property verification',
    owner: 'Compliance Desk',
    level: 'high',
    status: 'investigating',
    impact: 'Could expose the agency to listing fraud and reputational damage.',
    mitigation: 'Freeze public promotion until ownership evidence is confirmed by legal review.',
    dueDate: '2026-06-08',
  },
  {
    id: 'risk_002',
    title: 'Agent exported high-value client list',
    category: 'Data protection',
    owner: 'Agency Admin',
    level: 'critical',
    status: 'open',
    impact: 'Potential client data leakage and privacy breach.',
    mitigation: 'Review export log, revoke unnecessary permissions and notify management.',
    dueDate: '2026-06-06',
  },
  {
    id: 'risk_003',
    title: 'Past-due platform subscription with active automation usage',
    category: 'Billing control',
    owner: 'Finance Desk',
    level: 'medium',
    status: 'open',
    impact: 'Usage cost continues while subscription recovery is weak.',
    mitigation: 'Move account to limited mode if invoice is not regularised within grace period.',
    dueDate: '2026-06-10',
  },
  {
    id: 'risk_004',
    title: 'Service provider licence expiry approaching',
    category: 'Marketplace compliance',
    owner: 'Provider Manager',
    level: 'medium',
    status: 'mitigated',
    impact: 'Unlicensed providers weaken trust in the marketplace.',
    mitigation: 'Provider has uploaded renewal acknowledgement pending final certificate.',
    dueDate: '2026-06-20',
  },
];

export const demoAuditEvents: AuditTrailEvent[] = [
  {
    id: 'audit_001',
    actor: 'Nneka Ibe',
    role: 'Agent',
    eventType: 'data_change',
    action: 'Changed property price from ₦180m to ₦172m',
    affectedRecord: 'Luxury 5-Bedroom Detached Duplex',
    ipAddress: '105.112.XX.14',
    riskLevel: 'medium',
    createdAt: '2026-06-05 09:14',
  },
  {
    id: 'audit_002',
    actor: 'Agency Admin',
    role: 'Agency Admin',
    eventType: 'permission_change',
    action: 'Granted finance report access to staff user',
    affectedRecord: 'Finance/Staff account',
    ipAddress: '102.89.XX.77',
    riskLevel: 'high',
    createdAt: '2026-06-05 08:42',
  },
  {
    id: 'audit_003',
    actor: 'Finance Desk',
    role: 'Finance/Staff',
    eventType: 'financial_action',
    action: 'Voided receipt RCT-2026-004',
    affectedRecord: 'Receipt register',
    ipAddress: '197.210.XX.22',
    riskLevel: 'high',
    createdAt: '2026-06-04 17:28',
  },
  {
    id: 'audit_004',
    actor: 'Client User',
    role: 'Client',
    eventType: 'login',
    action: 'Successful dashboard login',
    affectedRecord: 'Client dashboard',
    ipAddress: '41.190.XX.61',
    riskLevel: 'low',
    createdAt: '2026-06-04 16:03',
  },
];

export const demoControlChecks: InternalControlCheck[] = [
  {
    id: 'ctrl_001',
    control: 'Two-person approval for receipt voiding',
    area: 'Finance',
    owner: 'Finance Lead',
    status: 'failed',
    lastChecked: '2026-06-04',
    evidence: 'One receipt was voided without approval evidence.',
  },
  {
    id: 'ctrl_002',
    control: 'Ownership documents required before featured listing',
    area: 'Property verification',
    owner: 'Compliance Desk',
    status: 'in_progress',
    lastChecked: '2026-06-05',
    evidence: 'Three pending listings still require legal document review.',
  },
  {
    id: 'ctrl_003',
    control: 'Monthly access review for agents and finance users',
    area: 'Access control',
    owner: 'Super Admin',
    status: 'passed',
    lastChecked: '2026-06-01',
    evidence: 'Dormant accounts were suspended and branch access corrected.',
  },
];
