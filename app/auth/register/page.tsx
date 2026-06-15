import Link from 'next/link';
import { AuthCard } from '@/components/auth/auth-card';
import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create account"
      description="Register a demo profile. Live Supabase auth can be connected after migrations are applied."
      footer={<span>Already registered? <Link href="/auth/login" className="font-semibold text-emerald-700">Login</Link></span>}
    >
      <RegisterForm />
    </AuthCard>
  );
}
