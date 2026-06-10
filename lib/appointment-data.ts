export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';
export type AppointmentType = 'property_viewing' | 'client_meeting' | 'owner_meeting' | 'valuation_visit' | 'document_review';

export type AppointmentRecord = {
  id: string;
  clientName: string;
  clientRole: 'buyer' | 'tenant' | 'landlord' | 'seller' | 'investor';
  propertyId?: string;
  propertyTitle?: string;
  agentName: string;
  ownerName?: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  type: AppointmentType;
  status: AppointmentStatus;
  notes: string;
  reminderEnabled: boolean;
};

export const appointmentStatusLabels: Record<AppointmentStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
  rescheduled: 'Rescheduled',
  no_show: 'No-show',
};

export const appointmentTypeLabels: Record<AppointmentType, string> = {
  property_viewing: 'Property viewing',
  client_meeting: 'Client meeting',
  owner_meeting: 'Owner meeting',
  valuation_visit: 'Valuation visit',
  document_review: 'Document review',
};

export const demoAppointments: AppointmentRecord[] = [
  {
    id: 'apt_001',
    clientName: 'Femi Adebayo',
    clientRole: 'tenant',
    propertyId: 'prop_002',
    propertyTitle: 'Serviced 3-Bedroom Apartment in Ikoyi',
    agentName: 'Seyi Adewale',
    ownerName: 'PrimeCrest Realty',
    date: '2026-06-04',
    time: '16:00',
    endTime: '17:00',
    location: 'Bourdillon Road, Ikoyi',
    type: 'property_viewing',
    status: 'confirmed',
    notes: 'Send access instruction, estate gate contact and available parking details before the viewing.',
    reminderEnabled: true,
  },
  {
    id: 'apt_002',
    clientName: 'Aisha Bello',
    clientRole: 'buyer',
    propertyId: 'prop_001',
    propertyTitle: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    agentName: 'Nneka Ibe',
    ownerName: 'Mr. Chinedu Obi',
    date: '2026-06-05',
    time: '11:30',
    endTime: '12:30',
    location: 'Admiralty Way, Lekki Phase 1',
    type: 'property_viewing',
    status: 'pending',
    notes: 'Client requested title checklist before confirming. Do not waste the inspection slot without sending documents.',
    reminderEnabled: true,
  },
  {
    id: 'apt_003',
    clientName: 'Mrs. Halima Musa',
    clientRole: 'investor',
    propertyId: 'prop_004',
    propertyTitle: 'Dry Land Measuring 900sqm in Sangotedo',
    agentName: 'Nneka Ibe',
    ownerName: 'Direct owner mandate',
    date: '2026-06-06',
    time: '10:00',
    endTime: '11:15',
    location: 'Monastery Road axis, Sangotedo',
    type: 'valuation_visit',
    status: 'confirmed',
    notes: 'Carry survey summary, neighbourhood price comparison and verification notes.',
    reminderEnabled: true,
  },
  {
    id: 'apt_004',
    clientName: 'Mr. Chinedu Obi',
    clientRole: 'landlord',
    propertyId: 'prop_001',
    propertyTitle: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    agentName: 'Seyi Adewale',
    ownerName: 'Mr. Chinedu Obi',
    date: '2026-06-07',
    time: '14:00',
    endTime: '14:45',
    location: 'PrimeCrest Lekki HQ',
    type: 'owner_meeting',
    status: 'rescheduled',
    notes: 'Discuss revised asking price, marketing mandate and document readiness.',
    reminderEnabled: false,
  },
  {
    id: 'apt_005',
    clientName: 'Tola Martins',
    clientRole: 'buyer',
    propertyId: 'prop_003',
    propertyTitle: 'Commercial Office Floor in Victoria Island',
    agentName: 'Nneka Ibe',
    ownerName: 'UrbanBuild DevCo',
    date: '2026-06-08',
    time: '09:30',
    endTime: '10:30',
    location: 'Akin Adesola Street, Victoria Island',
    type: 'property_viewing',
    status: 'completed',
    notes: 'Client liked the location but wants parking confirmation and service charge breakdown.',
    reminderEnabled: true,
  },
];

export function appointmentTimeLabel(appointment: AppointmentRecord) {
  return `${appointment.date} • ${appointment.time}-${appointment.endTime}`;
}
