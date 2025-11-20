// app/(dashboard)/layout.tsx
import Sidebar from '@/app/admin/components/sidebar/sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}