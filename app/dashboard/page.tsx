import { redirect } from 'next/navigation';

export default function DashboardIndexPage() {
  redirect('/dashboard/super-admin');
}
