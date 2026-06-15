import { Badge } from '@/components/ui/badge';

export function StatusBadge({ status }: { status: string }) {
  const normalised = status.toLowerCase();
  if (normalised === 'active') return <Badge variant="success">Active</Badge>;
  if (normalised === 'pending') return <Badge variant="warning">Pending</Badge>;
  if (normalised === 'suspended') return <Badge variant="danger">Suspended</Badge>;
  if (normalised === 'inactive') return <Badge variant="muted">Inactive</Badge>;
  return <Badge variant="muted">{status}</Badge>;
}
