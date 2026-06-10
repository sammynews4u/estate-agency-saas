'use client';

import Image from 'next/image';
import { Bath, BedDouble, CalendarDays, Car, CheckCircle2, MapPin, Ruler, UserRound } from 'lucide-react';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney, propertyStatusLabels, type PropertyRecord } from '@/lib/property-data';

export function PropertyDetailPage({ property }: { property: PropertyRecord }) {
  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="overflow-hidden">
          <div className="relative h-[360px] bg-slate-100">
            <Image src={property.media[0]} alt={property.title} fill className="object-cover" priority sizes="100vw" />
            <div className="absolute left-4 top-4 flex gap-2">
              <Badge variant={property.listingCategory === 'sale' ? 'success' : 'default'}>{property.listingCategory === 'sale' ? 'For Sale' : 'For Rent'}</Badge>
              {property.verified ? <Badge variant="gold">Verified</Badge> : null}
            </div>
          </div>
          <CardContent className="space-y-5">
            <div>
              <h1 className="text-3xl font-black text-slate-950">{property.title}</h1>
              <p className="mt-2 flex items-center gap-2 text-slate-500"><MapPin className="h-4 w-4" /> {property.address}, {property.state}</p>
            </div>
            <p className="text-3xl font-black text-emerald-700">{formatMoney(property.price, property.currency)}</p>
            <p className="leading-7 text-slate-600">{property.description}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Bedrooms" value={String(property.bedrooms)} change="Rooms" icon={BedDouble} />
              <StatCard label="Bathrooms" value={String(property.bathrooms)} change="Baths" icon={Bath} />
              <StatCard label="Parking" value={String(property.parkingSpaces)} change="Spaces" icon={Car} />
              <StatCard label="Land size" value={property.landSize} change="Approx." icon={Ruler} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Listing Control</CardTitle>
              <CardDescription>Operational details for agency workflow.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between"><span className="text-slate-500">Status</span><StatusBadge status={propertyStatusLabels[property.status]} /></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Property type</span><strong>{property.propertyType}</strong></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Assigned agent</span><strong>{property.assignedAgent}</strong></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Owner</span><strong>{property.owner}</strong></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Listed</span><strong>{property.dateListed}</strong></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Source</span><strong>{property.source}</strong></div>
              <Button className="w-full"><CalendarDays className="h-4 w-4" /> Book viewing</Button>
              <Button variant="outline" className="w-full"><UserRound className="h-4 w-4" /> Assign lead</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>Title and inspection data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p><strong>Legal status:</strong> {property.legalStatus}</p>
              <p><strong>Ownership:</strong> {property.ownershipType}</p>
              <p><strong>Condition:</strong> {property.propertyCondition}</p>
              <p><strong>Furnishing:</strong> {property.furnishingStatus}</p>
              <p><strong>Building size:</strong> {property.buildingSize}</p>
              <div>
                <strong>Amenities:</strong>
                <div className="mt-2 flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => <Badge key={amenity} variant="muted"><CheckCircle2 className="h-3 w-3" /> {amenity}</Badge>)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
