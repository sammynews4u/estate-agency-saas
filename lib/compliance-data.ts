export type VerificationStatus = 'pending' | 'in_review' | 'verified' | 'rejected' | 'expired';
export type VerificationType = 'identity' | 'address' | 'ownership' | 'agency_license' | 'provider_license' | 'developer_project' | 'tenant_kyc';
export type RiskLevel = 'low' | 'medium' | 'high';
export type ComplianceRole = 'agency' | 'agent' | 'client' | 'landlord' | 'service_provider' | 'developer';

export type VerificationRecord = {
  id: string;
  subjectName: string;
  subjectRole: ComplianceRole;
  verificationType: VerificationType;
  documentName: string;
  submittedAt: string;
  expiresAt: string;
  reviewer: string;
  riskLevel: RiskLevel;
  status: VerificationStatus;
  notes: string;
};

export type ComplianceChecklistItem = {
  id: string;
  title: string;
  appliesTo: ComplianceRole;
  requiredDocument: string;
  priority: RiskLevel;
  status: 'required' | 'optional' | 'configured';
};

export const verificationTypeLabels: Record<VerificationType, string> = {
  identity: 'Identity verification',
  address: 'Address verification',
  ownership: 'Property ownership',
  agency_license: 'Agency licence',
  provider_license: 'Provider licence',
  developer_project: 'Developer/project verification',
  tenant_kyc: 'Tenant KYC',
};

export const verificationStatusLabels: Record<VerificationStatus, string> = {
  pending: 'Pending',
  in_review: 'In review',
  verified: 'Verified',
  rejected: 'Rejected',
  expired: 'Expired',
};

export const verificationStatusTone: Record<VerificationStatus, 'muted' | 'warning' | 'success' | 'danger' | 'gold'> = {
  pending: 'warning',
  in_review: 'gold',
  verified: 'success',
  rejected: 'danger',
  expired: 'muted',
};

export const riskLevelTone: Record<RiskLevel, 'success' | 'warning' | 'danger'> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
};

export const complianceRoleLabels: Record<ComplianceRole, string> = {
  agency: 'Agency',
  agent: 'Agent',
  client: 'Client',
  landlord: 'Landlord/Seller',
  service_provider: 'Service Provider',
  developer: 'Developer',
};

export const demoVerificationRecords: VerificationRecord[] = [
  {
    id: 'ver_001',
    subjectName: 'PrimeNest Realty Ltd',
    subjectRole: 'agency',
    verificationType: 'agency_license',
    documentName: 'CAC certificate and agency licence.pdf',
    submittedAt: '2026-06-01',
    expiresAt: '2027-06-01',
    reviewer: 'Compliance Desk',
    riskLevel: 'low',
    status: 'verified',
    notes: 'Agency documents verified against submitted registration records.',
  },
  {
    id: 'ver_002',
    subjectName: 'Mr. Kola Adeyemi',
    subjectRole: 'landlord',
    verificationType: 'ownership',
    documentName: 'Deed of assignment - Chevron terrace.pdf',
    submittedAt: '2026-06-03',
    expiresAt: '2026-12-03',
    reviewer: 'Legal Partner Review',
    riskLevel: 'medium',
    status: 'in_review',
    notes: 'Survey plan and deed must match property address before listing can be marked verified.',
  },
  {
    id: 'ver_003',
    subjectName: 'Adaobi Okafor',
    subjectRole: 'client',
    verificationType: 'tenant_kyc',
    documentName: 'Employment letter and ID card.pdf',
    submittedAt: '2026-06-04',
    expiresAt: '2026-09-04',
    reviewer: 'Nneka Ibe',
    riskLevel: 'low',
    status: 'pending',
    notes: 'KYC is required before corporate rental offer can be forwarded to landlord.',
  },
  {
    id: 'ver_004',
    subjectName: 'Apex Survey & Valuation Partners',
    subjectRole: 'service_provider',
    verificationType: 'provider_license',
    documentName: 'Professional registration and portfolio.pdf',
    submittedAt: '2026-05-28',
    expiresAt: '2027-05-28',
    reviewer: 'Agency Admin',
    riskLevel: 'medium',
    status: 'verified',
    notes: 'Provider cleared for valuation and survey requests.',
  },
  {
    id: 'ver_005',
    subjectName: 'Victoria Island Residences Phase II',
    subjectRole: 'developer',
    verificationType: 'developer_project',
    documentName: 'Building approval and project title pack.zip',
    submittedAt: '2026-05-30',
    expiresAt: '2026-11-30',
    reviewer: 'Compliance Desk',
    riskLevel: 'high',
    status: 'in_review',
    notes: 'Do not run investor campaign until title, approvals and unit allocation schedule are confirmed.',
  },
  {
    id: 'ver_006',
    subjectName: 'Seyi Adewale',
    subjectRole: 'agent',
    verificationType: 'identity',
    documentName: 'Government ID and staff record.pdf',
    submittedAt: '2026-05-20',
    expiresAt: '2027-05-20',
    reviewer: 'Branch Manager',
    riskLevel: 'low',
    status: 'verified',
    notes: 'Agent profile cleared for client-facing assignments.',
  },
];

export const demoComplianceChecklist: ComplianceChecklistItem[] = [
  {
    id: 'chk_001',
    title: 'Seller ownership verification before verified badge',
    appliesTo: 'landlord',
    requiredDocument: 'Deed, survey, allocation letter or title evidence',
    priority: 'high',
    status: 'configured',
  },
  {
    id: 'chk_002',
    title: 'Tenant KYC before lease recommendation',
    appliesTo: 'client',
    requiredDocument: 'ID, employment/business evidence and reference',
    priority: 'medium',
    status: 'configured',
  },
  {
    id: 'chk_003',
    title: 'Service provider licence verification',
    appliesTo: 'service_provider',
    requiredDocument: 'Professional licence, portfolio and ID',
    priority: 'medium',
    status: 'required',
  },
  {
    id: 'chk_004',
    title: 'Developer project title and approval pack',
    appliesTo: 'developer',
    requiredDocument: 'Title documents, building approval and unit schedule',
    priority: 'high',
    status: 'required',
  },
];
