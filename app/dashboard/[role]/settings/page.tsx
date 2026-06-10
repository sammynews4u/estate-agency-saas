import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { isRouteRole } from '@/lib/roles/config';

export default async function SettingsPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (!isRouteRole(role)) notFound();

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div>
        <h1 className="text-3xl font-black text-slate-950">Settings foundation</h1>
        <p className="mt-2 text-slate-500">Profile, agency, theme, notifications and integration placeholders.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Profile settings</CardTitle><CardDescription>Basic user profile foundation.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Full name" defaultValue="Demo User" />
            <Input placeholder="Email" defaultValue="demo@estateflow.test" />
            <Input placeholder="Phone" defaultValue="+234 800 000 0000" />
            <Button>Save profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Agency settings</CardTitle><CardDescription>Used by agency-linked roles after Supabase connection.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Agency name" defaultValue="PrimeCrest Realty" />
            <Input placeholder="Agency email" defaultValue="hello@primecrest.test" />
            <Select defaultValue="active"><option value="active">Active</option><option value="pending">Pending</option><option value="suspended">Suspended</option></Select>
            <Button>Save agency settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Theme placeholder</CardTitle><CardDescription>Dark mode and brand colour settings will be extended later.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <Select defaultValue="premium"><option value="premium">Premium real estate</option><option value="dark">Dark dashboard</option><option value="light">Light dashboard</option></Select>
            <Button variant="secondary">Save theme preference</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Integration placeholders</CardTitle><CardDescription>Future API settings for WhatsApp, SMS, email and AI.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="WhatsApp Cloud API key placeholder" disabled />
            <Input placeholder="Twilio key placeholder" disabled />
            <Input placeholder="AI provider key placeholder" disabled />
            <Button variant="secondary">Review integrations</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
