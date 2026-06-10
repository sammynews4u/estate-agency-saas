'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export function AgencyForm() {
  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
      <Input placeholder="Agency name" />
      <Input placeholder="Email" type="email" />
      <Input placeholder="Phone" />
      <Input placeholder="Website" />
      <Input placeholder="City" />
      <Input placeholder="State" />
      <Select defaultValue="active"><option value="active">Active</option><option value="pending">Pending</option><option value="suspended">Suspended</option></Select>
      <Button type="submit">Save agency</Button>
    </form>
  );
}

export function BranchForm() {
  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
      <Input placeholder="Branch name" />
      <Input placeholder="Email" type="email" />
      <Input placeholder="Phone" />
      <Input placeholder="City" />
      <Input placeholder="State" />
      <Select defaultValue="active"><option value="active">Active</option><option value="inactive">Inactive</option></Select>
      <Input placeholder="Manager name" />
      <Button type="submit">Save branch</Button>
    </form>
  );
}
