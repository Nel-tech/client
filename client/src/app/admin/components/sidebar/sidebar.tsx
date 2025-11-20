// components/sidebar/Sidebar.tsx
'use client';

import { Music, Home, Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', Icon: Home },
  { id: 'pending', label: 'Pending Tracks', Icon: Clock, badge: 47 },
  { id: 'approved', label: 'Approved', Icon: CheckCircle },
  { id: 'rejected', label: 'Rejected', Icon: XCircle },
  { id: 'search', label: 'Search', Icon: Search },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const active = pathname.split('/').pop() ?? 'dashboard';

  return (
    <aside className="w-64 text-white border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Music className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold">MusicReview</h1>
        </div>
      </div>

      <nav className="flex-1 p-4">
        {navItems.map(({ id, label, Icon, badge }) => (
          <a
            key={id}
            href={`/${id === 'dashboard' ? '' : id}`}
            className={clsx(
              'flex items-center justify-between gap-3 px-4 py-3 rounded-lg mb-2 transition-colors',
              active === id
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent text-muted-foreground hover:text-foreground'
            )}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </div>
            {badge && (
              <Badge variant="secondary" className="bg-primary/20 text-primary-foreground">
                {badge}
              </Badge>
            )}
          </a>
        ))}
      </nav>
    </aside>
  );
}