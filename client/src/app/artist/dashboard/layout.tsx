// app/artist/dashboard/layout.tsx
'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import { sidebarItems } from '@/helper/mock';
import ProtectedRoute from '@/middlewares/ProtectedRoutes';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute allowedRoles={['Artist']}>
      <div className="min-h-screen flex">
        <MobileHeader setSidebarOpen={setSidebarOpen} />
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarItems={sidebarItems}
        />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
