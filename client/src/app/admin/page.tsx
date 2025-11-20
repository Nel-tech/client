// app/(dashboard)/page.tsx
'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, Music } from 'lucide-react';
import Link from 'next/link';
import { useTracks } from '@/lib/hooks/useTracks';
import ProtectedRoutes from '@/middlewares/ProtectedRoutes'

export default function DashboardHome() {
  const { tracks } = useTracks();

  // Simple stats from mock data
  const pending = 47; // hard-coded badge value
  const approved = tracks.filter((t) => Number(t.id) % 2 === 0).length;
  const rejected = tracks.filter((t) => Number(t.id) % 2 === 1).length;

  const stats = [
    { label: 'Pending', value: pending, icon: Clock, href: '/pending', color: 'text-orange-600' },
    { label: 'Approved', value: approved, icon: CheckCircle, href: '/approved', color: 'text-green-600' },
    { label: 'Rejected', value: rejected, icon: XCircle, href: '/rejected', color: 'text-red-600' },
    { label: 'Total Tracks', value: tracks.length, icon: Music, href: '/search', color: 'text-primary' },
  ];

  return (

    <ProtectedRoutes  allowedRoles={['Admin']}>
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-3xl font-bold mt-1">{s.value}</p>
                  </div>
                  <Icon className={`w-10 h-10 ${s.color}`} />
                </div>
                {s.label === 'Pending' && (
                  <Badge className="mt-3" variant="secondary">
                    {pending} waiting
                  </Badge>
                )}
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <p className="text-muted-foreground">
          (Activity feed can be added later – e.g., last approved/rejected tracks)
        </p>
      </div>
    </div>
        
        </ProtectedRoutes>
  );
}