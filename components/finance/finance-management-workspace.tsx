'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Banknote, BarChart3, Coins, FilePlus2, Landmark, ReceiptText, TrendingDown, TrendingUp, UsersRound } from 'lucide-react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { SimpleDataTable } from '@/components/dashboard/simple-data-table';
import { StatCard } from '@/components/dashboard/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  demoBranchFinance,
  demoExpenses,
  demoPayroll,
  expenseCategoryLabels,
  expenseStatusLabels,
  expenseStatusTone,
  formatFinanceMoney,
  payrollStatusLabels,
  payrollStatusTone,
  type ExpenseCategory,
  type ExpenseRecord,
  type ExpenseStatus,
  type PayrollRecord,
  type PayrollStatus,
} from '@/lib/finance-data';

export type FinanceMode = 'overview' | 'expenses' | 'payroll' | 'reports';

type Props = {
  mode: FinanceMode;
  role: 'agency' | 'finance';
};

const expenseStatuses: ExpenseStatus[] = ['draft', 'submitted', 'approved', 'reimbursed', 'rejected'];
const payrollStatuses: PayrollStatus[] = ['pending', 'approved', 'paid', 'held'];
const expenseCategories: ExpenseCategory[] = ['marketing', 'office', 'transport', 'utilities', 'professional_services', 'software', 'maintenance', 'miscellaneous'];

export function FinanceManagementWorkspace({ mode, role }: Props) {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(demoExpenses);
  const [payroll, setPayroll] = useState<PayrollRecord[]>(demoPayroll);
  const [expenseStatus, setExpenseStatus] = useState<'all' | ExpenseStatus>('all');
  const [payrollStatus, setPayrollStatus] = useState<'all' | PayrollStatus>('all');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showPayrollForm, setShowPayrollForm] = useState(false);

  const [expenseDescription, setExpenseDescription] = useState('New operating expense');
  const [expenseAmount, setExpenseAmount] = useState('150000');
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategory>('marketing');
  const [expenseBranch, setExpenseBranch] = useState('Lekki Branch');
  const [expenseStaff, setExpenseStaff] = useState('Agency Admin');
  const [expenseNotes, setExpenseNotes] = useState('Attach evidence before approval.');

  const [staffName, setStaffName] = useState('New Staff Member');
  const [staffRole, setStaffRole] = useState('Agent');
  const [baseSalary, setBaseSalary] = useState('100000');
  const [commissionBonus, setCommissionBonus] = useState('0');
  const [deductions, setDeductions] = useState('0');

  const visibleExpenses = useMemo(() => expenses.filter((expense) => expenseStatus === 'all' || expense.status === expenseStatus), [expenses, expenseStatus]);
  const visiblePayroll = useMemo(() => payroll.filter((record) => payrollStatus === 'all' || record.status === payrollStatus), [payroll, payrollStatus]);

  function updateExpenseStatus(id: string, nextStatus: ExpenseStatus) {
    setExpenses((current) => current.map((expense) => (expense.id === id ? { ...expense, status: nextStatus } : expense)));
  }

  function updatePayrollStatus(id: string, nextStatus: PayrollStatus) {
    setPayroll((current) => current.map((record) => (record.id === id ? { ...record, status: nextStatus } : record)));
  }

  function addExpense() {
    const next: ExpenseRecord = {
      id: `exp_${Date.now()}`,
      category: expenseCategory,
      description: expenseDescription,
      amount: Number(expenseAmount) || 0,
      branch: expenseBranch,
      staffName: expenseStaff,
      expenseDate: '2026-06-05',
      status: 'submitted',
      receiptAttached: false,
      notes: expenseNotes,
    };
    setExpenses((current) => [next, ...current]);
    setShowExpenseForm(false);
  }

  function addPayroll() {
    const salary = Number(baseSalary) || 0;
    const bonus = Number(commissionBonus) || 0;
    const deduction = Number(deductions) || 0;
    const next: PayrollRecord = {
      id: `pay_${Date.now()}`,
      staffName,
      role: staffRole,
      branch: 'Head Office',
      baseSalary: salary,
      commissionBonus: bonus,
      deductions: deduction,
      netPay: salary + bonus - deduction,
      payPeriod: 'June 2026',
      paymentDate: '2026-06-28',
      status: 'pending',
    };
    setPayroll((current) => [next, ...current]);
    setShowPayrollForm(false);
  }

  const expenseColumns: ColumnDef<ExpenseRecord>[] = [
    { header: 'Expense', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.description}</p><p className="mt-1 text-xs text-slate-500">{expenseCategoryLabels[row.original.category]}</p></div> },
    { header: 'Branch / Staff', cell: ({ row }) => <div><p className="font-semibold text-slate-800">{row.original.branch}</p><p className="mt-1 text-xs text-slate-500">{row.original.staffName}</p></div> },
    { header: 'Amount', cell: ({ row }) => <span className="font-bold text-slate-950">{formatFinanceMoney(row.original.amount)}</span> },
    { header: 'Date', accessorKey: 'expenseDate' },
    { header: 'Receipt', cell: ({ row }) => <Badge variant={row.original.receiptAttached ? 'success' : 'warning'}>{row.original.receiptAttached ? 'Attached' : 'Missing'}</Badge> },
    { header: 'Status', cell: ({ row }) => <Badge variant={expenseStatusTone[row.original.status]}>{expenseStatusLabels[row.original.status]}</Badge> },
    { header: 'Update', cell: ({ row }) => <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updateExpenseStatus(row.original.id, event.target.value as ExpenseStatus)}>{expenseStatuses.map((option) => <option key={option} value={option}>{expenseStatusLabels[option]}</option>)}</select> },
  ];

  const payrollColumns: ColumnDef<PayrollRecord>[] = [
    { header: 'Staff', cell: ({ row }) => <div><p className="font-bold text-slate-950">{row.original.staffName}</p><p className="mt-1 text-xs text-slate-500">{row.original.role} • {row.original.branch}</p></div> },
    { header: 'Base salary', cell: ({ row }) => <span>{formatFinanceMoney(row.original.baseSalary)}</span> },
    { header: 'Bonus', cell: ({ row }) => <span>{formatFinanceMoney(row.original.commissionBonus)}</span> },
    { header: 'Deductions', cell: ({ row }) => <span>{formatFinanceMoney(row.original.deductions)}</span> },
    { header: 'Net pay', cell: ({ row }) => <span className="font-bold text-slate-950">{formatFinanceMoney(row.original.netPay)}</span> },
    { header: 'Status', cell: ({ row }) => <Badge variant={payrollStatusTone[row.original.status]}>{payrollStatusLabels[row.original.status]}</Badge> },
    { header: 'Update', cell: ({ row }) => <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700" value={row.original.status} onChange={(event) => updatePayrollStatus(row.original.id, event.target.value as PayrollStatus)}>{payrollStatuses.map((option) => <option key={option} value={option}>{payrollStatusLabels[option]}</option>)}</select> },
  ];

  const branchColumns: ColumnDef<(typeof demoBranchFinance)[number]>[] = [
    { header: 'Branch', cell: ({ row }) => <span className="font-bold text-slate-950">{row.original.branch}</span> },
    { header: 'Revenue', cell: ({ row }) => <span>{formatFinanceMoney(row.original.revenue)}</span> },
    { header: 'Expenses', cell: ({ row }) => <span>{formatFinanceMoney(row.original.expenses)}</span> },
    { header: 'Payroll', cell: ({ row }) => <span>{formatFinanceMoney(row.original.payroll)}</span> },
    { header: 'Net balance', cell: ({ row }) => <span className="font-bold text-emerald-700">{formatFinanceMoney(row.original.netBalance)}</span> },
    { header: 'Pending invoices', accessorKey: 'pendingInvoices' },
    { header: 'Receipts', accessorKey: 'receiptsIssued' },
  ];

  const totalRevenue = demoBranchFinance.reduce((sum, branch) => sum + branch.revenue, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalPayroll = payroll.reduce((sum, record) => sum + record.netPay, 0);
  const netBalance = totalRevenue - totalExpenses - totalPayroll;
  const pendingExpenseTotal = expenses.filter((expense) => expense.status === 'submitted').reduce((sum, expense) => sum + expense.amount, 0);

  const title = mode === 'overview' ? 'Finance & Business Management' : mode === 'expenses' ? 'Expense Management' : mode === 'payroll' ? 'Payroll Management' : 'Financial Reports';
  const description = mode === 'overview'
    ? 'Track revenue, expenses, payroll, branch performance and operational cash pressure without pretending this is a payment processor.'
    : mode === 'expenses'
      ? 'Capture, approve and reimburse business expenses with receipt discipline.'
      : mode === 'payroll'
        ? 'Manage salaries, commission bonuses, deductions and payout status.'
        : 'Compare branch-level revenue, expenses, payroll and net balance.';

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{title}</h1>
          <p className="mt-2 max-w-3xl text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {(mode === 'overview' || mode === 'expenses') && <Button variant="gold" onClick={() => setShowExpenseForm((current) => !current)}><FilePlus2 className="h-4 w-4" /> Add expense</Button>}
          {(mode === 'overview' || mode === 'payroll') && <Button variant="secondary" onClick={() => setShowPayrollForm((current) => !current)}><UsersRound className="h-4 w-4" /> Add payroll</Button>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue recorded" value={formatFinanceMoney(totalRevenue)} change="From branch finance records" icon={TrendingUp} />
        <StatCard label="Expenses" value={formatFinanceMoney(totalExpenses)} change="Operational spend" icon={TrendingDown} />
        <StatCard label="Payroll" value={formatFinanceMoney(totalPayroll)} change="Net staff payout" icon={Banknote} />
        <StatCard label="Net balance" value={formatFinanceMoney(netBalance)} change={role === 'agency' ? 'Agency view' : 'Finance desk'} icon={Landmark} />
      </div>

      {pendingExpenseTotal > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-bold text-amber-900">Pending expense exposure: {formatFinanceMoney(pendingExpenseTotal)}</p>
              <p className="mt-1 text-sm text-amber-800">Approve only expenses with receipts and clear business purpose. Loose expense control will destroy profit faster than weak sales.</p>
            </div>
            <Button variant="outline" size="sm">Review submitted expenses</Button>
          </CardContent>
        </Card>
      )}

      {showExpenseForm && (
        <Card>
          <CardHeader><CardTitle>Add expense</CardTitle><CardDescription>Record spending before it disappears into WhatsApp screenshots and memory.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Input value={expenseDescription} onChange={(event) => setExpenseDescription(event.target.value)} placeholder="Description" />
              <Input value={expenseAmount} onChange={(event) => setExpenseAmount(event.target.value)} placeholder="Amount" />
              <Select value={expenseCategory} onChange={(event) => setExpenseCategory(event.target.value as ExpenseCategory)}>{expenseCategories.map((option) => <option key={option} value={option}>{expenseCategoryLabels[option]}</option>)}</Select>
              <Input value={expenseBranch} onChange={(event) => setExpenseBranch(event.target.value)} placeholder="Branch" />
              <Input value={expenseStaff} onChange={(event) => setExpenseStaff(event.target.value)} placeholder="Staff" />
            </div>
            <Textarea value={expenseNotes} onChange={(event) => setExpenseNotes(event.target.value)} />
            <div className="flex flex-wrap gap-3"><Button onClick={addExpense}>Save expense</Button><Button variant="secondary" onClick={() => setShowExpenseForm(false)}>Cancel</Button></div>
          </CardContent>
        </Card>
      )}

      {showPayrollForm && (
        <Card>
          <CardHeader><CardTitle>Add payroll record</CardTitle><CardDescription>Create salary and commission payout records for staff and agents.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <Input value={staffName} onChange={(event) => setStaffName(event.target.value)} placeholder="Staff name" />
              <Input value={staffRole} onChange={(event) => setStaffRole(event.target.value)} placeholder="Role" />
              <Input value={baseSalary} onChange={(event) => setBaseSalary(event.target.value)} placeholder="Base salary" />
              <Input value={commissionBonus} onChange={(event) => setCommissionBonus(event.target.value)} placeholder="Commission bonus" />
              <Input value={deductions} onChange={(event) => setDeductions(event.target.value)} placeholder="Deductions" />
            </div>
            <div className="flex flex-wrap gap-3"><Button onClick={addPayroll}>Save payroll</Button><Button variant="secondary" onClick={() => setShowPayrollForm(false)}>Cancel</Button></div>
          </CardContent>
        </Card>
      )}

      {(mode === 'overview' || mode === 'reports') && (
        <div className="grid gap-4 lg:grid-cols-3">
          {demoBranchFinance.map((branch) => (
            <Card key={branch.id}>
              <CardHeader><CardTitle>{branch.branch}</CardTitle><CardDescription>Branch performance snapshot</CardDescription></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Revenue</span><span className="font-bold">{formatFinanceMoney(branch.revenue)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Expenses + payroll</span><span className="font-bold">{formatFinanceMoney(branch.expenses + branch.payroll)}</span></div>
                <div className="flex justify-between border-t border-slate-100 pt-3"><span className="text-slate-500">Net balance</span><span className="font-black text-emerald-700">{formatFinanceMoney(branch.netBalance)}</span></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {(mode === 'overview' || mode === 'expenses') && (
        <Card>
          <CardHeader>
            <CardTitle>Expense controls</CardTitle>
            <CardDescription>Filter and update operational spending.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={expenseStatus} onChange={(event) => setExpenseStatus(event.target.value as 'all' | ExpenseStatus)} className="max-w-sm">
              <option value="all">All expense statuses</option>
              {expenseStatuses.map((option) => <option key={option} value={option}>{expenseStatusLabels[option]}</option>)}
            </Select>
          </CardContent>
        </Card>
      )}

      {mode === 'payroll' && (
        <Card>
          <CardHeader><CardTitle>Payroll controls</CardTitle><CardDescription>Filter salary and commission payout records.</CardDescription></CardHeader>
          <CardContent>
            <Select value={payrollStatus} onChange={(event) => setPayrollStatus(event.target.value as 'all' | PayrollStatus)} className="max-w-sm">
              <option value="all">All payroll statuses</option>
              {payrollStatuses.map((option) => <option key={option} value={option}>{payrollStatusLabels[option]}</option>)}
            </Select>
          </CardContent>
        </Card>
      )}

      {(mode === 'overview' || mode === 'expenses') && <SimpleDataTable data={visibleExpenses} columns={expenseColumns} searchPlaceholder="Search expenses..." />}
      {mode === 'payroll' && <SimpleDataTable data={visiblePayroll} columns={payrollColumns} searchPlaceholder="Search payroll records..." />}
      {mode === 'reports' && <SimpleDataTable data={demoBranchFinance} columns={branchColumns} searchPlaceholder="Search branch reports..." />}
    </div>
  );
}
