export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
export type ReceiptStatus = 'issued' | 'voided';
export type PaymentMethod = 'cash' | 'bank_transfer' | 'pos' | 'cheque' | 'other';

export type InvoiceRecord = {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientType: 'buyer' | 'tenant' | 'landlord' | 'seller' | 'developer' | 'service_provider';
  propertyTitle?: string;
  item: string;
  amount: number;
  tax: number;
  discount: number;
  total: number;
  dueDate: string;
  status: InvoiceStatus;
  createdBy: string;
  createdAt: string;
};

export type ReceiptRecord = {
  id: string;
  receiptNumber: string;
  clientName: string;
  propertyTitle?: string;
  amountPaid: number;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  purpose: string;
  receivedBy: string;
  status: ReceiptStatus;
};

export const invoiceStatusLabels: Record<InvoiceStatus, string> = {
  draft: 'Draft',
  sent: 'Sent',
  paid: 'Paid',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
};

export const receiptStatusLabels: Record<ReceiptStatus, string> = {
  issued: 'Issued',
  voided: 'Voided',
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  cash: 'Cash',
  bank_transfer: 'Bank transfer',
  pos: 'POS',
  cheque: 'Cheque',
  other: 'Other',
};

export function formatMoney(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);
}

export const demoInvoices: InvoiceRecord[] = [
  {
    id: 'inv_001',
    invoiceNumber: 'INV-2026-001',
    clientName: 'Aisha Bello',
    clientType: 'buyer',
    propertyTitle: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    item: 'Agency professional fee for sales transaction',
    amount: 8500000,
    tax: 637500,
    discount: 250000,
    total: 8887500,
    dueDate: '2026-06-12',
    status: 'sent',
    createdBy: 'Nneka Ibe',
    createdAt: '2026-06-04',
  },
  {
    id: 'inv_002',
    invoiceNumber: 'INV-2026-002',
    clientName: 'Femi Adebayo',
    clientType: 'tenant',
    propertyTitle: 'Serviced 3-Bedroom Apartment in Ikoyi',
    item: 'Inspection, documentation and tenancy processing fee',
    amount: 650000,
    tax: 48750,
    discount: 0,
    total: 698750,
    dueDate: '2026-06-07',
    status: 'overdue',
    createdBy: 'Seyi Adewale',
    createdAt: '2026-05-31',
  },
  {
    id: 'inv_003',
    invoiceNumber: 'INV-2026-003',
    clientName: 'Mr. Chinedu Obi',
    clientType: 'landlord',
    propertyTitle: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    item: 'Premium listing package and property photography',
    amount: 450000,
    tax: 33750,
    discount: 50000,
    total: 433750,
    dueDate: '2026-06-15',
    status: 'draft',
    createdBy: 'Agency Admin',
    createdAt: '2026-06-04',
  },
  {
    id: 'inv_004',
    invoiceNumber: 'INV-2026-004',
    clientName: 'Tola Martins',
    clientType: 'buyer',
    propertyTitle: 'Commercial Office Floor in Victoria Island',
    item: 'Commercial property advisory fee',
    amount: 1200000,
    tax: 90000,
    discount: 0,
    total: 1290000,
    dueDate: '2026-06-20',
    status: 'paid',
    createdBy: 'Nneka Ibe',
    createdAt: '2026-06-02',
  },
];

export const demoReceipts: ReceiptRecord[] = [
  {
    id: 'rec_001',
    receiptNumber: 'RCT-2026-001',
    clientName: 'Tola Martins',
    propertyTitle: 'Commercial Office Floor in Victoria Island',
    amountPaid: 1290000,
    paymentMethod: 'bank_transfer',
    paymentDate: '2026-06-03',
    purpose: 'Commercial property advisory fee',
    receivedBy: 'Finance Desk',
    status: 'issued',
  },
  {
    id: 'rec_002',
    receiptNumber: 'RCT-2026-002',
    clientName: 'Femi Adebayo',
    propertyTitle: 'Serviced 3-Bedroom Apartment in Ikoyi',
    amountPaid: 300000,
    paymentMethod: 'pos',
    paymentDate: '2026-06-01',
    purpose: 'Part payment for tenancy processing',
    receivedBy: 'Seyi Adewale',
    status: 'issued',
  },
  {
    id: 'rec_003',
    receiptNumber: 'RCT-2026-003',
    clientName: 'Mr. Chinedu Obi',
    propertyTitle: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    amountPaid: 200000,
    paymentMethod: 'cash',
    paymentDate: '2026-05-29',
    purpose: 'Listing preparation deposit',
    receivedBy: 'Agency Admin',
    status: 'voided',
  },
];
