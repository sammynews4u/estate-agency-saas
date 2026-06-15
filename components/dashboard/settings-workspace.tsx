'use client';

import { useEffect, useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { demoUsers, getDemoUserByRole } from '@/lib/demo-data';
import { roleLabels, routeToUserRole } from '@/lib/roles/config';
import type { RouteRole } from '@/types/roles';

type SettingsState = {
  fullName: string;
  email: string;
  phone: string;
  agency: string;
  branch: string;
  theme: string;
  notifications: string;
  whatsappKey: string;
  smsProvider: string;
  aiProvider: string;
  notes: string;
};

function getDefaultSettings(role: RouteRole): SettingsState {
  const user = getDemoUserByRole(routeToUserRole[role]);
  return {
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    agency: user.agency,
    branch: user.branch,
    theme: 'premium',
    notifications: 'enabled',
    whatsappKey: 'demo-whatsapp-cloud-key',
    smsProvider: 'termii-demo',
    aiProvider: 'openai-demo-mode',
    notes: `${roleLabels[user.role]} settings are editable in this browser demo.`,
  };
}

export function SettingsWorkspace({ role }: { role: RouteRole }) {
  const storageKey = `estateflow-demo-settings:${role}`;
  const [settings, setSettings] = useState<SettingsState>(() => getDefaultSettings(role));
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setSettings(JSON.parse(stored) as SettingsState);
    } catch {
      setSettings(getDefaultSettings(role));
    }
  }, [role, storageKey]);

  function update(field: keyof SettingsState, value: string) {
    setSettings((current) => ({ ...current, [field]: value }));
  }

  function save() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(settings));
      const currentUser = demoUsers.find((user) => user.email === settings.email) ?? getDemoUserByRole(routeToUserRole[role]);
      window.localStorage.setItem('estateflow-demo-session', JSON.stringify({ ...currentUser, ...settings, routeRole: role, loggedInAt: new Date().toISOString() }));
    } catch {
      // UI still works for the current page when storage is blocked.
    }
    setSavedMessage('Settings saved in this browser demo. Open another dashboard page and the profile display will reflect the session account.');
  }

  function reset() {
    const next = getDefaultSettings(role);
    setSettings(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}
    setSavedMessage('Settings reset to the demo account defaults.');
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black text-slate-950">Settings</h1>
            <Badge variant="success">Editable</Badge>
          </div>
          <p className="mt-2 max-w-3xl text-slate-500">Profile, agency, notification, theme and integration settings with browser demo persistence.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={reset}><RotateCcw className="h-4 w-4" /> Reset</Button>
          <Button onClick={save}><Save className="h-4 w-4" /> Save settings</Button>
        </div>
      </div>

      {savedMessage ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">{savedMessage}</div> : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Profile settings</CardTitle><CardDescription>Changes are saved locally for this demo user.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Full name" value={settings.fullName} onChange={(event) => update('fullName', event.target.value)} />
            <Input placeholder="Email" value={settings.email} onChange={(event) => update('email', event.target.value)} />
            <Input placeholder="Phone" value={settings.phone} onChange={(event) => update('phone', event.target.value)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Business settings</CardTitle><CardDescription>Agency, branch or business identity tied to the current role.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Agency / business name" value={settings.agency} onChange={(event) => update('agency', event.target.value)} />
            <Input placeholder="Branch / location" value={settings.branch} onChange={(event) => update('branch', event.target.value)} />
            <Select value={settings.notifications} onChange={(event) => update('notifications', event.target.value)}>
              <option value="enabled">Notifications enabled</option>
              <option value="priority-only">Priority only</option>
              <option value="disabled">Disabled</option>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Theme and workflow</CardTitle><CardDescription>Demo preference controls.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <Select value={settings.theme} onChange={(event) => update('theme', event.target.value)}>
              <option value="premium">Premium real estate</option>
              <option value="dark">Dark dashboard</option>
              <option value="light">Light dashboard</option>
            </Select>
            <Textarea value={settings.notes} onChange={(event) => update('notes', event.target.value)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Integrations</CardTitle><CardDescription>Safe demo placeholders for future live API keys.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="WhatsApp Cloud API key" value={settings.whatsappKey} onChange={(event) => update('whatsappKey', event.target.value)} />
            <Input placeholder="SMS provider" value={settings.smsProvider} onChange={(event) => update('smsProvider', event.target.value)} />
            <Input placeholder="AI provider" value={settings.aiProvider} onChange={(event) => update('aiProvider', event.target.value)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
