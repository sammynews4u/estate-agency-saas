'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { demoUsers } from '@/lib/demo-data';
import { roleLabels, routeToUserRole, userRoleToRoute } from '@/lib/roles/config';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import type { RouteRole } from '@/types/roles';

const demoPassword = 'demo12345';

export function LoginForm() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RouteRole>('super-admin');
  const [notice, setNotice] = useState('');
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: demoUsers[0].email,
      password: demoPassword,
    },
  });

  const visibleDemoUsers = useMemo(() => demoUsers.filter((user) => user.role === routeToUserRole[selectedRole]), [selectedRole]);

  function startDemo(userEmail: string, role: RouteRole) {
    setSelectedRole(role);
    setValue('email', userEmail, { shouldValidate: true });
    setValue('password', demoPassword, { shouldValidate: true });
    setNotice(`Demo credentials loaded for ${roleLabels[routeToUserRole[role]]}. Click Login to enter.`);
  }

  function onSubmit(data: LoginInput) {
    const matchedUser = demoUsers.find((user) => user.email.toLowerCase() === data.email.toLowerCase());
    const role = matchedUser ? userRoleToRoute[matchedUser.role] : selectedRole;
    const user = matchedUser ?? demoUsers.find((item) => item.role === routeToUserRole[role]) ?? demoUsers[0];

    try {
      window.localStorage.setItem('estateflow-demo-session', JSON.stringify({ ...user, routeRole: role, loggedInAt: new Date().toISOString() }));
    } catch {
      // Dashboard still opens if browser storage is blocked.
    }

    router.push(`/dashboard/${role}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
        <strong>Demo password:</strong> {demoPassword}. Pick any role below, load its credentials and login.
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
        <Input type="email" placeholder="you@example.com" {...register('email')} />
        {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">Password</label>
        <Input type="password" placeholder="••••••••" {...register('password')} />
        {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password.message}</p> : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">Demo role</label>
        <Select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value as RouteRole)}>
          <option value="super-admin">Super Admin</option>
          <option value="agency">Agency Admin</option>
          <option value="agent">Agent</option>
          <option value="client">Client/User</option>
          <option value="landlord">Landlord/Seller</option>
          <option value="service-provider">Service Provider</option>
          <option value="developer">Developer</option>
          <option value="finance">Finance/Staff</option>
        </Select>
      </div>

      <div className="grid gap-3">
        {visibleDemoUsers.map((user) => (
          <button
            key={user.id}
            type="button"
            onClick={() => startDemo(user.email, userRoleToRoute[user.role])}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-black text-slate-950">{user.fullName}</p>
                <p className="mt-1 text-sm text-slate-500">{user.email}</p>
              </div>
              <Badge variant="success">Use</Badge>
            </div>
          </button>
        ))}
      </div>

      {notice ? <p className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">{notice}</p> : null}

      <div className="flex items-center justify-between text-sm">
        <Link href="/auth/forgot-password" className="font-semibold text-emerald-700">Forgot password?</Link>
        <Link href="/" className="font-semibold text-slate-600">Back to landing</Link>
      </div>
      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
}
