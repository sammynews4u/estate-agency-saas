'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bath, BedDouble, Car, CheckCircle2, MapPin, Ruler, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatMoney, propertyStatusLabels, type PropertyRecord } from '@/lib/property-data';

type PropertyCardProps = {
  property: PropertyRecord;
  detailHref?: string;
  onSave?: (property: PropertyRecord) => void;
  onInquiry?: (property: PropertyRecord) => void;
  compact?: boolean;
};

export function PropertyCard({ property, detailHref = `/dashboard/client/browse-properties/${property.id}`, onSave, onInquiry, compact = false }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-52 bg-slate-100">
        <Image src={property.media[0]} alt={property.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant={property.listingCategory === 'sale' ? 'success' : 'default'}>{property.listingCategory === 'sale' ? 'For Sale' : 'For Rent'}</Badge>
          {property.featured ? <Badge variant="gold">Featured</Badge> : null}
        </div>
        {property.verified ? (
          <div className="absolute right-3 top-3 rounded-full bg-white/95 p-2 text-emerald-600 shadow-sm" title="Verified listing">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        ) : null}
      </div>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-lg font-black text-slate-950">{property.title}</h3>
            <button
              type="button"
              onClick={() => onSave?.(property)}
              className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-[#b98d24] hover:text-[#b98d24]"
              aria-label="Save property"
            >
              <Star className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-4 w-4" /> {property.location}, {property.state}
          </p>
        </div>

        <div>
          <p className="text-2xl font-black text-emerald-700">{formatMoney(property.price, property.currency)}</p>
          <p className="mt-1 text-sm text-slate-500">{propertyStatusLabels[property.status]} • {property.assignedAgent}</p>
        </div>

        {!compact ? <p className="line-clamp-2 text-sm leading-6 text-slate-600">{property.description}</p> : null}

        <div className="grid grid-cols-4 gap-2 text-xs text-slate-600">
          <span className="rounded-xl bg-slate-50 p-2"><BedDouble className="mb-1 h-4 w-4" />{property.bedrooms}</span>
          <span className="rounded-xl bg-slate-50 p-2"><Bath className="mb-1 h-4 w-4" />{property.bathrooms}</span>
          <span className="rounded-xl bg-slate-50 p-2"><Car className="mb-1 h-4 w-4" />{property.parkingSpaces}</span>
          <span className="rounded-xl bg-slate-50 p-2"><Ruler className="mb-1 h-4 w-4" />{property.landSize}</span>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild className="flex-1">
            <Link href={detailHref}>View details</Link>
          </Button>
          <Button type="button" variant="outline" className="flex-1" onClick={() => onInquiry?.(property)}>
            Send inquiry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
