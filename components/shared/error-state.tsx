import { TriangleAlert } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function ErrorState({ message }: { message: string }) {
  return (
    <Card className="flex items-start gap-3 border-red-200 bg-red-50 p-5 text-red-800">
      <TriangleAlert className="mt-0.5 h-5 w-5" />
      <div>
        <p className="font-semibold">Something went wrong</p>
        <p className="text-sm">{message}</p>
      </div>
    </Card>
  );
}
