import Link from 'next/link';
import { AuthCard } from '@/components/auth/auth-card';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <AuthCard
      title="Login"
      description="Access your role-based EstateFlow Pro foundation dashboard."
      footer={<span>New here? <Link href="/auth/register" className="font-semibold text-emerald-700">Create account</Link></span>}
    >
      <LoginForm />
    </AuthCard>
  );
}
