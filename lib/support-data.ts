export type SupportStatus = 'open' | 'in_progress' | 'awaiting_user' | 'resolved' | 'escalated';
export type SupportPriority = 'low' | 'medium' | 'high' | 'urgent';
export type SupportCategory = 'account' | 'technical' | 'property' | 'billing' | 'verification' | 'service_request';
export type SlaStatus = 'inside_sla' | 'near_breach' | 'breached';

export type SupportTicket = {
  id: string;
  subject: string;
  requester: string;
  requesterRole: string;
  category: SupportCategory;
  priority: SupportPriority;
  status: SupportStatus;
  slaStatus: SlaStatus;
  assignedTo: string;
  relatedRecord: string;
  createdAt: string;
  lastReplyAt: string;
  summary: string;
};

export type SupportReply = {
  id: string;
  ticketSubject: string;
  author: string;
  channel: string;
  message: string;
  createdAt: string;
};

export const supportStatusLabels: Record<SupportStatus, string> = {
  open: 'Open',
  in_progress: 'In progress',
  awaiting_user: 'Awaiting user',
  resolved: 'Resolved',
  escalated: 'Escalated',
};

export const supportPriorityLabels: Record<SupportPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

export const supportCategoryLabels: Record<SupportCategory, string> = {
  account: 'Account',
  technical: 'Technical',
  property: 'Property',
  billing: 'Billing',
  verification: 'Verification',
  service_request: 'Service request',
};

export const slaStatusLabels: Record<SlaStatus, string> = {
  inside_sla: 'Inside SLA',
  near_breach: 'Near breach',
  breached: 'Breached',
};

export const supportStatusTone: Record<SupportStatus, 'muted' | 'warning' | 'success' | 'danger' | 'gold'> = {
  open: 'gold',
  in_progress: 'warning',
  awaiting_user: 'muted',
  resolved: 'success',
  escalated: 'danger',
};

export const supportPriorityTone: Record<SupportPriority, 'muted' | 'warning' | 'success' | 'danger' | 'gold'> = {
  low: 'muted',
  medium: 'gold',
  high: 'warning',
  urgent: 'danger',
};

export const slaStatusTone: Record<SlaStatus, 'muted' | 'warning' | 'success' | 'danger' | 'gold'> = {
  inside_sla: 'success',
  near_breach: 'warning',
  breached: 'danger',
};

export const demoSupportTickets: SupportTicket[] = [
  {
    id: 'sup_001',
    subject: 'Client cannot upload title documents',
    requester: 'Aisha Bello',
    requesterRole: 'Client',
    category: 'technical',
    priority: 'high',
    status: 'in_progress',
    slaStatus: 'near_breach',
    assignedTo: 'Agency Support Desk',
    relatedRecord: 'Aisha Bello Lekki Duplex Purchase',
    createdAt: '2026-06-05 09:20',
    lastReplyAt: '2026-06-05 10:40',
    summary: 'Upload field accepts images but rejects PDF title file. Support should verify file size and storage rule.',
  },
  {
    id: 'sup_002',
    subject: 'Landlord needs listing verification correction',
    requester: 'Direct landlord mandate',
    requesterRole: 'Landlord/Seller',
    category: 'verification',
    priority: 'medium',
    status: 'open',
    slaStatus: 'inside_sla',
    assignedTo: 'Compliance Desk',
    relatedRecord: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    createdAt: '2026-06-05 11:05',
    lastReplyAt: '2026-06-05 11:05',
    summary: 'Landlord says ownership record was marked incomplete after submitting updated survey plan.',
  },
  {
    id: 'sup_003',
    subject: 'Receipt amount mismatch on rental processing',
    requester: 'Finance Desk',
    requesterRole: 'Finance/Staff',
    category: 'billing',
    priority: 'urgent',
    status: 'escalated',
    slaStatus: 'breached',
    assignedTo: 'Platform Admin',
    relatedRecord: 'Femi Adebayo Ikoyi Serviced Apartment Rental',
    createdAt: '2026-06-04 16:35',
    lastReplyAt: '2026-06-05 08:10',
    summary: 'Receipt shows processing fee but invoice includes service charge. Finance needs reconciliation before printing.',
  },
  {
    id: 'sup_004',
    subject: 'Service provider quote not visible to client',
    requester: 'SkyGrid Drone Media',
    requesterRole: 'Service Provider',
    category: 'service_request',
    priority: 'low',
    status: 'awaiting_user',
    slaStatus: 'inside_sla',
    assignedTo: 'Service Marketplace Desk',
    relatedRecord: 'Drone shoot request for Ikoyi apartment',
    createdAt: '2026-06-03 14:20',
    lastReplyAt: '2026-06-04 12:30',
    summary: 'Provider submitted a quote but client has not confirmed whether the updated quote should replace the first quote.',
  },
];

export const demoSupportReplies: SupportReply[] = [
  {
    id: 'reply_001',
    ticketSubject: 'Client cannot upload title documents',
    author: 'Agency Support Desk',
    channel: 'Internal note',
    message: 'Check Supabase Storage MIME rules and max file size before blaming the user flow.',
    createdAt: '2026-06-05 10:40',
  },
  {
    id: 'reply_002',
    ticketSubject: 'Receipt amount mismatch on rental processing',
    author: 'Platform Admin',
    channel: 'Escalation',
    message: 'Finance should not print this receipt until invoice line items are reconciled.',
    createdAt: '2026-06-05 08:10',
  },
  {
    id: 'reply_003',
    ticketSubject: 'Service provider quote not visible to client',
    author: 'Service Marketplace Desk',
    channel: 'Email',
    message: 'Asked provider to confirm whether this is a revised quote or an additional optional package.',
    createdAt: '2026-06-04 12:30',
  },
];
