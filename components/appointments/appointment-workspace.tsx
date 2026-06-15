'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { CalendarCheck, CalendarClock, CheckCircle2, Clock3, Plus, RotateCcw } from 'lucide-react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { SimpleDataTable } from '@/components/dashboard/simple-data-table';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  appointmentStatusLabels,
  appointmentTimeLabel,
  appointmentTypeLabels,
  demoAppointments,
  type AppointmentRecord,
  type AppointmentStatus,
  type AppointmentType,
} from '@/lib/appointment-data';

type AppointmentWorkspaceRole = 'agency' | 'agent' | 'client' | 'landlord';

type Props = { role: AppointmentWorkspaceRole };

const pageCopy: Record<AppointmentWorkspaceRole, { title: string; description: string }> = {
  agency: {
    title: 'Appointment & Viewing Management',
    description: 'Coordinate property viewings, client meetings, owner meetings and valuation visits across the agency.',
  },
  agent: {
    title: 'My Appointments',
    description: 'Keep your viewing calendar disciplined. Missed inspections kill deals faster than weak adverts.',
  },
  client: {
    title: 'My Appointments',
    description: 'Track your booked inspections, meeting status and property viewing details.',
  },
  landlord: {
    title: 'Property Viewings',
    description: 'See viewing activity, owner meetings and inspection schedules tied to your submitted properties.',
  },
};

const statusOptions: AppointmentStatus[] = ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'no_show'];
const typeOptions: AppointmentType[] = ['property_viewing', 'client_meeting', 'owner_meeting', 'valuation_visit', 'document_review'];

function getRoleAppointments(role: AppointmentWorkspaceRole) {
  if (role === 'agent') return demoAppointments.filter((appointment) => appointment.agentName === 'Nneka Ibe');
  if (role === 'client') return demoAppointments.filter((appointment) => appointment.clientName === 'Aisha Bello' || appointment.clientName === 'Femi Adebayo');
  if (role === 'landlord') return demoAppointments.filter((appointment) => appointment.ownerName === 'Mr. Chinedu Obi' || appointment.clientRole === 'landlord');
  return demoAppointments;
}

export function AppointmentWorkspace({ role }: Props) {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(getRoleAppointments(role));
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | AppointmentStatus>('all');
  const [type, setType] = useState<'all' | AppointmentType>('all');
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    return appointments.filter((appointment) => {
      const text = `${appointment.clientName} ${appointment.propertyTitle ?? ''} ${appointment.agentName} ${appointment.location} ${appointment.notes}`.toLowerCase();
      return text.includes(search.toLowerCase()) && (status === 'all' || appointment.status === status) && (type === 'all' || appointment.type === type);
    });
  }, [appointments, search, status, type]);

  function updateStatus(id: string, nextStatus: AppointmentStatus) {
    setAppointments((current) => current.map((appointment) => (appointment.id === id ? { ...appointment, status: nextStatus } : appointment)));
  }

  function addDemoAppointment() {
    const next: AppointmentRecord = {
      id: `apt_${String(appointments.length + 1).padStart(3, '0')}_new`,
      clientName: 'New Prospect',
      clientRole: 'buyer',
      propertyId: 'prop_001',
      propertyTitle: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
      agentName: role === 'agent' ? 'Nneka Ibe' : 'Seyi Adewale',
      ownerName: 'Mr. Chinedu Obi',
      date: '2026-06-10',
      time: '12:00',
      endTime: '13:00',
      location: 'Lekki Phase 1, Lagos',
      type: 'property_viewing',
      status: 'pending',
      notes: 'New appointment created from dashboard demo form. Wire this to Supabase insert when live data is connected.',
      reminderEnabled: true,
    };
    setAppointments((current) => [next, ...current]);
    setShowForm(false);
  }

  const columns: ColumnDef<AppointmentRecord>[] = [
    {
      header: 'Appointment',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.clientName}</p>
          <p className="mt-1 text-xs text-slate-500">{appointmentTypeLabels[row.original.type]}</p>
        </div>
      ),
    },
    {
      header: 'Property / Location',
      cell: ({ row }) => (
        <div>
          {row.original.propertyId ? (
            <Link href={`/dashboard/${role === 'agency' ? 'agency' : role}/properties/${row.original.propertyId}`} className="font-semibold text-emerald-700 hover:text-emerald-800">
              {row.original.propertyTitle}
            </Link>
          ) : (
            <p className="font-semibold text-slate-800">No property attached</p>
          )}
          <p className="mt-1 text-xs text-slate-500">{row.original.location}</p>
        </div>
      ),
    },
    {
      header: 'Time',
      cell: ({ row }) => <span className="font-semibold text-slate-800">{appointmentTimeLabel(row.original)}</span>,
    },
    {
      header: 'Agent',
      accessorKey: 'agentName',
    },
    {
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={appointmentStatusLabels[row.original.status]} />,
    },
    {
      header: 'Reminder',
      cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.reminderEnabled ? 'Enabled' : 'Off'}</span>,
    },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateStatus(row.original.id, event.target.value as AppointmentStatus)}>
          {statusOptions.map((option) => <option key={option} value={option}>{appointmentStatusLabels[option]}</option>)}
        </select>
      ),
    },
  ];

  const todayCount = appointments.filter((appointment) => appointment.date === '2026-06-04').length;
  const confirmedCount = appointments.filter((appointment) => appointment.status === 'confirmed').length;
  const completedCount = appointments.filter((appointment) => appointment.status === 'completed').length;
  const rescheduledCount = appointments.filter((appointment) => appointment.status === 'rescheduled').length;

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{pageCopy[role].title}</h1>
          <p className="mt-2 text-slate-500">{pageCopy[role].description}</p>
        </div>
        {(role === 'agency' || role === 'agent') && (
          <Button variant="gold" onClick={() => setShowForm((current) => !current)}><Plus className="h-4 w-4" /> Schedule viewing</Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today" value={String(todayCount)} change="Appointments dated 4 Jun 2026" icon={CalendarClock} />
        <StatCard label="Confirmed" value={String(confirmedCount)} change="Ready for attendance" icon={CalendarCheck} />
        <StatCard label="Completed" value={String(completedCount)} change="Needs post-viewing follow-up" icon={CheckCircle2} />
        <StatCard label="Rescheduled" value={String(rescheduledCount)} change="Watch these closely" icon={RotateCcw} />
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule a viewing</CardTitle>
            <CardDescription>This is a working front-end form pattern. Connect it to Supabase when live appointments are enabled.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Client name" defaultValue="New Prospect" />
              <Input placeholder="Property title" defaultValue="Luxury 5-Bedroom Detached Duplex in Lekki Phase 1" />
              <Input type="date" defaultValue="2026-06-10" />
              <Input type="time" defaultValue="12:00" />
              <Select defaultValue="property_viewing">
                {typeOptions.map((option) => <option key={option} value={option}>{appointmentTypeLabels[option]}</option>)}
              </Select>
              <Input placeholder="Location" defaultValue="Lekki Phase 1, Lagos" />
              <Textarea className="md:col-span-2" placeholder="Appointment notes" defaultValue="Confirm gate access, client availability and documents to carry." />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={addDemoAppointment}>Add appointment</Button>
              <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <Input placeholder="Search appointments" value={search} onChange={(event) => setSearch(event.target.value)} />
        <Select value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
          <option value="all">All statuses</option>
          {statusOptions.map((option) => <option key={option} value={option}>{appointmentStatusLabels[option]}</option>)}
        </Select>
        <Select value={type} onChange={(event) => setType(event.target.value as typeof type)}>
          <option value="all">All appointment types</option>
          {typeOptions.map((option) => <option key={option} value={option}>{appointmentTypeLabels[option]}</option>)}
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Viewing calendar list</CardTitle>
          <CardDescription>Bookings are linked to clients, agents and properties so reminders and follow-ups can be automated later.</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleDataTable data={filtered} columns={columns} searchPlaceholder="Quick search appointments..." />
        </CardContent>
      </Card>

      <Card className="border-emerald-100 bg-emerald-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-emerald-700" /> Operational note</CardTitle>
          <CardDescription>Every confirmed viewing should trigger a reminder before inspection and a follow-up after inspection. That is how this module feeds the follow-up system.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
