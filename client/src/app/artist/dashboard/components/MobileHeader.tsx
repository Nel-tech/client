'use client';

import { Menu } from 'lucide-react';
import { MobileHeaderProps } from '@/helper/type';

export default function MobileHeader({ setSidebarOpen }: MobileHeaderProps) {
  return (
    <div className="lg:hidden bg-card border-b border-border p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Tropiqk</h1>
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-2 hover:bg-muted rounded-lg"
      >
        <Menu className="h-5 w-5" />
      </button>
    </div>
  );
}
