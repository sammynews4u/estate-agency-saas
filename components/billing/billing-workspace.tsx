'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FilePlus2, Printer, ReceiptText, Send, WalletCards } from 'lucide-react';
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
  demoInvoices,
  demoReceipts,
  formatMoney,
  invoiceStatusLabels,
  paymentMethodLabels,
  receiptStatusLabels,
  type InvoiceRecord,
  type InvoiceStatus,
  type ReceiptRecord,
  type ReceiptStatus,
} from '@/lib/billing-data';

type BillingMode = 'invoices' | 'receipts';
type BillingRole = 'agency' | 'finance';

type Props = {
  mode: BillingMode;
  role: BillingRole;
};

const invoiceStatuses: InvoiceStatus[] = ['draft', 'sent', 'paid', 'overdue', 'cancelled'];
const receiptStatuses: ReceiptStatus[] = ['issued', 'voided'];

export function BillingWorkspace({ mode, role }: Props) {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(demoInvoices);
  const [receipts, setReceipts] = useState<ReceiptRecord[]>(demoReceipts);
  const [showForm, setShowForm] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState<'all' | InvoiceStatus>('all');
  const [receiptStatus, setReceiptStatus] = useState<'all' | ReceiptStatus>('all');

  const filteredInvoices = useMemo(() => invoices.filter((invoice) => invoiceStatus === 'all' || invoice.status === invoiceStatus), [invoices, invoiceStatus]);
  const filteredReceipts = useMemo(() => receipts.filter((receipt) => receiptStatus === 'all' || receipt.status === receiptStatus), [receipts, receiptStatus]);

  function updateInvoiceStatus(id: string, status: InvoiceStatus) {
    setInvoices((current) => current.map((invoice) => (invoice.id === id ? { ...invoice, status } : invoice)));
  }

  function updateReceiptStatus(id: string, status: ReceiptStatus) {
    setReceipts((current) => current.map((receipt) => (receipt.id === id ? { ...receipt, status } : receipt)));
  }

  function addDemoInvoice() {
    const amount = 750000;
    const tax = 56250;
    const next: InvoiceRecord = {
      id: `inv_${String(invoices.length + 1).padStart(3, '0')}_new`,
      invoiceNumber: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
      clientName: 'New Client',
      clientType: 'buyer',
      propertyTitle: 'Newly Added Property',
      item: 'Agency service fee',
      amount,
      tax,
      discount: 0,
      total: amount + tax,
      dueDate: '2026-06-21',
      status: 'draft',
      createdBy: role === 'finance' ? 'Finance Desk' : 'Agency Admin',
      createdAt: '2026-06-04',
    };
    setInvoices((current) => [next, ...current]);
    setShowForm(false);
  }

  function addDemoReceipt() {
    const next: ReceiptRecord = {
      id: `rec_${String(receipts.length + 1).padStart(3, '0')}_new`,
      receiptNumber: `RCT-2026-${String(receipts.length + 1).padStart(3, '0')}`,
      clientName: 'New Client',
      propertyTitle: 'Newly Added Property',
      amountPaid: 750000,
      paymentMethod: 'bank_transfer',
      paymentDate: '2026-06-04',
      purpose: 'Agency service fee payment',
      receivedBy: role === 'finance' ? 'Finance Desk' : 'Agency Admin',
      status: 'issued',
    };
    setReceipts((current) => [next, ...current]);
    setShowForm(false);
  }

  const invoiceColumns: ColumnDef<InvoiceRecord>[] = [
    {
      header: 'Invoice',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.invoiceNumber}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.item}</p>
        </div>
      ),
    },
    {
      header: 'Client / Property',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.clientName}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.propertyTitle ?? 'No property attached'}</p>
        </div>
      ),
    },
    {
      header: 'Total',
      cell: ({ row }) => <span className="font-bold text-slate-950">{formatMoney(row.original.total)}</span>,
    },
    {
      header: 'Due date',
      accessorKey: 'dueDate',
    },
    {
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={invoiceStatusLabels[row.original.status]} />,
    },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateInvoiceStatus(row.original.id, event.target.value as InvoiceStatus)}>
          {invoiceStatuses.map((status) => <option key={status} value={status}>{invoiceStatusLabels[status]}</option>)}
        </select>
      ),
    },
    {
      header: 'Action',
      cell: () => <Button size="sm" variant="outline" onClick={() => window.print()}><Printer className="h-3.5 w-3.5" /> Print</Button>,
    },
  ];

  const receiptColumns: ColumnDef<ReceiptRecord>[] = [
    {
      header: 'Receipt',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-slate-950">{row.original.receiptNumber}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.purpose}</p>
        </div>
      ),
    },
    {
      header: 'Client / Property',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.clientName}</p>
          <p className="mt-1 text-xs text-slate-500">{row.original.propertyTitle ?? 'No property attached'}</p>
        </div>
      ),
    },
    {
      header: 'Amount paid',
      cell: ({ row }) => <span className="font-bold text-slate-950">{formatMoney(row.original.amountPaid)}</span>,
    },
    {
      header: 'Method',
      cell: ({ row }) => <span>{paymentMethodLabels[row.original.paymentMethod]}</span>,
    },
    {
      header: 'Payment date',
      accessorKey: 'paymentDate',
    },
    {
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={receiptStatusLabels[row.original.status]} />,
    },
    {
      header: 'Update',
      cell: ({ row }) => (
        <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateReceiptStatus(row.original.id, event.target.value as ReceiptStatus)}>
          {receiptStatuses.map((status) => <option key={status} value={status}>{receiptStatusLabels[status]}</option>)}
        </select>
      ),
    },
    {
      header: 'Action',
      cell: () => <Button size="sm" variant="outline" onClick={() => window.print()}><Printer className="h-3.5 w-3.5" /> Print</Button>,
    },
  ];

  const paidInvoiceTotal = invoices.filter((invoice) => invoice.status === 'paid').reduce((sum, invoice) => sum + invoice.total, 0);
  const openInvoiceTotal = invoices.filter((invoice) => invoice.status === 'sent' || invoice.status === 'overdue').reduce((sum, invoice) => sum + invoice.total, 0);
  const receiptTotal = receipts.filter((receipt) => receipt.status === 'issued').reduce((sum, receipt) => sum + receipt.amountPaid, 0);
  const overdueCount = invoices.filter((invoice) => invoice.status === 'overdue').length;

  const isInvoices = mode === 'invoices';
  const title = isInvoices ? 'Invoice Management' : 'Receipt Management';
  const description = isInvoices
    ? 'Create, track and print agency invoices without pretending to process payments inside the platform.'
    : 'Record payments received, issue printable receipts and preserve transaction history for finance reporting.';

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{title}</h1>
          <p className="mt-2 text-slate-500">{description}</p>
        </div>
        <Button variant="gold" onClick={() => setShowForm((current) => !current)}>
          <FilePlus2 className="h-4 w-4" /> {isInvoices ? 'Create invoice' : 'Issue receipt'}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Paid invoices" value={formatMoney(paidInvoiceTotal)} change="Confirmed invoice revenue" icon={ReceiptText} />
        <StatCard label="Open invoices" value={formatMoney(openInvoiceTotal)} change="Sent or overdue" icon={Send} />
        <StatCard label="Receipts issued" value={formatMoney(receiptTotal)} change="Recorded payments only" icon={WalletCards} />
        <StatCard label="Overdue" value={String(overdueCount)} change="Needs immediate follow-up" icon={ReceiptText} />
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{isInvoices ? 'Create invoice' : 'Issue receipt'}</CardTitle>
            <CardDescription>This form is wired to local state now and structured for Supabase insert when live data is connected.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Client name" defaultValue="New Client" />
              <Input placeholder="Property title" defaultValue="Newly Added Property" />
              <Input placeholder="Amount" defaultValue="750000" />
              <Input type="date" defaultValue="2026-06-21" />
              {isInvoices ? (
                <Select defaultValue="draft">
                  {invoiceStatuses.map((status) => <option key={status} value={status}>{invoiceStatusLabels[status]}</option>)}
                </Select>
              ) : (
                <Select defaultValue="bank_transfer">
                  {Object.entries(paymentMethodLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </Select>
              )}
              <Input placeholder="Handled by" defaultValue={role === 'finance' ? 'Finance Desk' : 'Agency Admin'} />
              <Textarea className="md:col-span-2" placeholder="Purpose / item" defaultValue={isInvoices ? 'Agency service fee' : 'Agency service fee payment'} />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={isInvoices ? addDemoInvoice : addDemoReceipt}>{isInvoices ? 'Add invoice' : 'Add receipt'}</Button>
              <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <Input placeholder={isInvoices ? 'Search invoices' : 'Search receipts'} />
          {isInvoices ? (
            <Select value={invoiceStatus} onChange={(event) => setInvoiceStatus(event.target.value as typeof invoiceStatus)}>
              <option value="all">All invoice statuses</option>
              {invoiceStatuses.map((status) => <option key={status} value={status}>{invoiceStatusLabels[status]}</option>)}
            </Select>
          ) : (
            <Select value={receiptStatus} onChange={(event) => setReceiptStatus(event.target.value as typeof receiptStatus)}>
              <option value="all">All receipt statuses</option>
              {receiptStatuses.map((status) => <option key={status} value={status}>{receiptStatusLabels[status]}</option>)}
            </Select>
          )}
          <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4" /> Print current list</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isInvoices ? 'Invoice register' : 'Receipt register'}</CardTitle>
          <CardDescription>{isInvoices ? 'Use invoice statuses aggressively. Unpaid invoices are not revenue.' : 'Receipts record money already received. This module does not process payments.'}</CardDescription>
        </CardHeader>
        <CardContent>
          {isInvoices ? (
            <SimpleDataTable data={filteredInvoices} columns={invoiceColumns} searchPlaceholder="Quick search invoices..." />
          ) : (
            <SimpleDataTable data={filteredReceipts} columns={receiptColumns} searchPlaceholder="Quick search receipts..." />
          )}
        </CardContent>
      </Card>

      <Card className="border-amber-100 bg-amber-50/60">
        <CardHeader>
          <CardTitle>Control note</CardTitle>
          <CardDescription>Finance should never be built on vague notes. Every income conversation must end in an invoice, a receipt, or a clearly marked unpaid record.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
