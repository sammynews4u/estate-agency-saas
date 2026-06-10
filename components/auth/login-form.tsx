'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import type { RouteRole } from '@/types/roles';

export function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  function onSubmit(data: LoginInput) {
    const role = (document.getElementById('demo-role') as HTMLSelectElement | null)?.value as RouteRole | undefined;
    console.log('Demo login payload', data);
    router.push(`/dashboard/${role ?? 'super-admin'}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <label className="mb-2 block text-sm font-bold text-slate-700">Demo role redirect</label>
        <Select id="demo-role" defaultValue="super-admin">
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
      <div className="flex items-center justify-between text-sm">
        <Link href="/auth/forgot-password" className="font-semibold text-emerald-700">Forgot password?</Link>
      </div>
      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
}
