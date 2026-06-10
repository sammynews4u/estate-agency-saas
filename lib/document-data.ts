export type DocumentType =
  | 'contract'
  | 'lease_agreement'
  | 'property_document'
  | 'ownership_record'
  | 'inspection_report'
  | 'valuation_report'
  | 'client_kyc'
  | 'agency_document'
  | 'invoice'
  | 'receipt';

export type DocumentStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'expired';
export type DocumentVisibility = 'private' | 'agency' | 'client_visible' | 'public';

export type DocumentRecord = {
  id: string;
  title: string;
  type: DocumentType;
  relatedTo: string;
  ownerName: string;
  uploadedBy: string;
  status: DocumentStatus;
  visibility: DocumentVisibility;
  expiryDate?: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
};

export const documentTypeLabels: Record<DocumentType, string> = {
  contract: 'Contract',
  lease_agreement: 'Lease agreement',
  property_document: 'Property document',
  ownership_record: 'Ownership record',
  inspection_report: 'Inspection report',
  valuation_report: 'Valuation report',
  client_kyc: 'Client KYC',
  agency_document: 'Agency document',
  invoice: 'Invoice',
  receipt: 'Receipt',
};

export const documentStatusLabels: Record<DocumentStatus, string> = {
  draft: 'Draft',
  pending_review: 'Pending review',
  approved: 'Approved',
  rejected: 'Rejected',
  expired: 'Expired',
};

export const documentVisibilityLabels: Record<DocumentVisibility, string> = {
  private: 'Private',
  agency: 'Agency only',
  client_visible: 'Client visible',
  public: 'Public',
};

export const demoDocuments: DocumentRecord[] = [
  {
    id: 'doc_001',
    title: 'Lekki Duplex Deed of Assignment',
    type: 'ownership_record',
    relatedTo: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    ownerName: 'Mr. Chinedu Obi',
    uploadedBy: 'Agency Admin',
    status: 'approved',
    visibility: 'agency',
    expiryDate: '2028-06-01',
    fileName: 'lekki-duplex-deed-assignment.pdf',
    fileSize: '2.4 MB',
    uploadedAt: '2026-06-01',
  },
  {
    id: 'doc_002',
    title: 'Ikoyi Apartment Lease Draft',
    type: 'lease_agreement',
    relatedTo: 'Serviced 3-Bedroom Apartment in Ikoyi',
    ownerName: 'Femi Adebayo',
    uploadedBy: 'Seyi Adewale',
    status: 'pending_review',
    visibility: 'client_visible',
    expiryDate: '2027-05-31',
    fileName: 'ikoyi-apartment-lease-draft.docx',
    fileSize: '812 KB',
    uploadedAt: '2026-06-03',
  },
  {
    id: 'doc_003',
    title: 'Aisha Bello KYC Form',
    type: 'client_kyc',
    relatedTo: 'Buyer profile',
    ownerName: 'Aisha Bello',
    uploadedBy: 'Nneka Ibe',
    status: 'approved',
    visibility: 'private',
    fileName: 'aisha-bello-kyc.pdf',
    fileSize: '1.1 MB',
    uploadedAt: '2026-05-30',
  },
  {
    id: 'doc_004',
    title: 'Victoria Island Office Inspection Report',
    type: 'inspection_report',
    relatedTo: 'Commercial Office Floor in Victoria Island',
    ownerName: 'Tola Martins',
    uploadedBy: 'Nneka Ibe',
    status: 'approved',
    visibility: 'agency',
    fileName: 'vi-office-inspection-report.pdf',
    fileSize: '3.8 MB',
    uploadedAt: '2026-06-02',
  },
  {
    id: 'doc_005',
    title: 'Sangotedo Land Survey Plan',
    type: 'property_document',
    relatedTo: 'Dry Land Measuring 900sqm in Sangotedo',
    ownerName: 'Mrs. Halima Musa',
    uploadedBy: 'Agency Admin',
    status: 'expired',
    visibility: 'agency',
    expiryDate: '2026-05-25',
    fileName: 'sangotedo-land-survey-plan.pdf',
    fileSize: '2.0 MB',
    uploadedAt: '2026-05-20',
  },
];
