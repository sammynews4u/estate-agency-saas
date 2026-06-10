import Link from 'next/link';
import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset password"
      description="Password reset UI foundation. Connect Supabase reset email when your project keys are configured."
      footer={<span>Remembered it? <Link href="/auth/login" className="font-semibold text-emerald-700">Back to login</Link></span>}
    >
      <form className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
          <Input type="email" placeholder="you@example.com" />
        </div>
        <Button type="button" className="w-full">Send reset link</Button>
      </form>
    </AuthCard>
  );
}
