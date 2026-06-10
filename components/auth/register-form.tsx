'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';

export function RegisterForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  function onSubmit(data: RegisterInput) {
    console.log('Demo registration payload', data);
    router.push('/dashboard/client');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">Full name</label>
        <Input placeholder="Your full name" {...register('fullName')} />
        {errors.fullName ? <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p> : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
          <Input type="email" placeholder="you@example.com" {...register('email')} />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">Phone</label>
          <Input placeholder="+234..." {...register('phone')} />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">Role</label>
        <Select {...register('role')} defaultValue="client">
          <option value="client">Client/User</option>
          <option value="landlord">Landlord/Seller</option>
          <option value="service_provider">Service Provider</option>
          <option value="developer">Developer</option>
          <option value="agent">Agent</option>
        </Select>
        {errors.role ? <p className="mt-1 text-xs text-red-600">{errors.role.message}</p> : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">Password</label>
        <Input type="password" placeholder="••••••••" {...register('password')} />
        {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password.message}</p> : null}
      </div>
      <Button type="submit" className="w-full">Create account</Button>
    </form>
  );
}
