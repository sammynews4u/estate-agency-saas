export type FollowUpChannel = 'call' | 'whatsapp' | 'sms' | 'email' | 'meeting';
export type FollowUpStatus = 'scheduled' | 'due_today' | 'completed' | 'missed' | 'cancelled';
export type CampaignStatus = 'draft' | 'scheduled' | 'sent' | 'paused';

export type FollowUpTask = {
  id: string;
  recipientName: string;
  recipientType: 'buyer' | 'tenant' | 'landlord' | 'seller' | 'investor';
  relatedProperty?: string;
  relatedLead?: string;
  assignedAgent: string;
  channel: FollowUpChannel;
  message: string;
  scheduledAt: string;
  status: FollowUpStatus;
  priority: 'low' | 'medium' | 'high';
};

export type MessageTemplate = {
  id: string;
  name: string;
  channel: FollowUpChannel;
  useCase: string;
  body: string;
};

export type CampaignRecord = {
  id: string;
  name: string;
  channel: Extract<FollowUpChannel, 'whatsapp' | 'sms' | 'email'>;
  audience: string;
  recipients: number;
  status: CampaignStatus;
  scheduledAt: string;
};

export const followUpStatusLabels: Record<FollowUpStatus, string> = {
  scheduled: 'Scheduled',
  due_today: 'Due today',
  completed: 'Completed',
  missed: 'Missed',
  cancelled: 'Cancelled',
};

export const channelLabels: Record<FollowUpChannel, string> = {
  call: 'Call',
  whatsapp: 'WhatsApp',
  sms: 'SMS',
  email: 'Email',
  meeting: 'Meeting',
};

export const demoFollowUps: FollowUpTask[] = [
  {
    id: 'fu_001',
    recipientName: 'Femi Adebayo',
    recipientType: 'tenant',
    relatedProperty: 'Serviced 3-Bedroom Apartment in Ikoyi',
    relatedLead: 'Serviced apartment rental in Ikoyi',
    assignedAgent: 'Seyi Adewale',
    channel: 'whatsapp',
    message: 'Good afternoon Femi. This is a reminder for your Ikoyi apartment viewing today at 4:00pm. Please confirm you are still available.',
    scheduledAt: '2026-06-04 12:00',
    status: 'due_today',
    priority: 'high',
  },
  {
    id: 'fu_002',
    recipientName: 'Aisha Bello',
    recipientType: 'buyer',
    relatedProperty: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    relatedLead: 'Luxury family home in Lekki Phase 1',
    assignedAgent: 'Nneka Ibe',
    channel: 'email',
    message: 'Share the title document checklist, inspection schedule options and short investment summary for the Lekki duplex.',
    scheduledAt: '2026-06-05 09:00',
    status: 'scheduled',
    priority: 'high',
  },
  {
    id: 'fu_003',
    recipientName: 'Mrs. Halima Musa',
    recipientType: 'investor',
    relatedProperty: 'Dry Land Measuring 900sqm in Sangotedo',
    relatedLead: 'Dry land with resale potential',
    assignedAgent: 'Nneka Ibe',
    channel: 'call',
    message: 'Call to clarify land title status, expected closing timeline and appetite for adjacent plots.',
    scheduledAt: '2026-06-06 13:00',
    status: 'scheduled',
    priority: 'medium',
  },
  {
    id: 'fu_004',
    recipientName: 'Mr. Chinedu Obi',
    recipientType: 'landlord',
    relatedProperty: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    relatedLead: 'Owner wants help selling premium duplex and land',
    assignedAgent: 'Seyi Adewale',
    channel: 'meeting',
    message: 'Discuss valuation angle, listing mandate and asking price adjustment.',
    scheduledAt: '2026-06-07 14:00',
    status: 'scheduled',
    priority: 'medium',
  },
  {
    id: 'fu_005',
    recipientName: 'Tola Martins',
    recipientType: 'buyer',
    relatedProperty: 'Commercial Office Floor in Victoria Island',
    relatedLead: 'Commercial office enquiry',
    assignedAgent: 'Nneka Ibe',
    channel: 'whatsapp',
    message: 'Send service charge breakdown and parking allocation details after completed viewing.',
    scheduledAt: '2026-06-08 15:30',
    status: 'completed',
    priority: 'low',
  },
];

export const demoTemplates: MessageTemplate[] = [
  {
    id: 'tpl_001',
    name: 'New inquiry response',
    channel: 'whatsapp',
    useCase: 'Reply quickly to fresh property inquiries',
    body: 'Hello {first_name}, thank you for your interest in {property}. I can help you confirm availability, price, documents and viewing options.',
  },
  {
    id: 'tpl_002',
    name: 'Viewing reminder',
    channel: 'sms',
    useCase: 'Reduce missed inspections',
    body: 'Reminder: your viewing for {property} is scheduled for {date_time}. Reply YES to confirm or call your agent to reschedule.',
  },
  {
    id: 'tpl_003',
    name: 'Post-viewing follow-up',
    channel: 'email',
    useCase: 'Move clients from inspection to negotiation',
    body: 'Thank you for attending the viewing. Here are the next steps, key property details and documents required to proceed.',
  },
  {
    id: 'tpl_004',
    name: 'Dormant client reactivation',
    channel: 'whatsapp',
    useCase: 'Bring cold leads back into the pipeline',
    body: 'Hello {first_name}, we have new options around {location} that match your earlier request. Should I send the best three?',
  },
];

export const demoCampaigns: CampaignRecord[] = [
  {
    id: 'cmp_001',
    name: 'Ikoyi rental availability alert',
    channel: 'whatsapp',
    audience: 'Qualified tenants looking for Ikoyi rentals',
    recipients: 42,
    status: 'scheduled',
    scheduledAt: '2026-06-05 10:00',
  },
  {
    id: 'cmp_002',
    name: 'Lekki seller valuation pitch',
    channel: 'email',
    audience: 'Landlords and sellers with premium properties',
    recipients: 18,
    status: 'draft',
    scheduledAt: 'Not scheduled',
  },
  {
    id: 'cmp_003',
    name: 'Post-viewing conversion push',
    channel: 'sms',
    audience: 'Clients who inspected in the last 7 days',
    recipients: 25,
    status: 'sent',
    scheduledAt: '2026-06-02 09:00',
  },
];
