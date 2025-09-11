// /fans/components/DashboardLayout.tsx
'use client';

import Sidebar from './Sidebar';
import SidebarSkeleton from './loader/dashboard/SidebarSkeleton';
import ContentSkeleton from './loader/dashboard/ContentSkeleton';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  isLoading?: boolean;
}

export default function DashboardLayout({
  children,
  activeSection,
  onSectionChange,
  isLoading = false,
}: DashboardLayoutProps) {
  
  return (
    <div className="flex h-screen">
      
      {isLoading ? (
        <SidebarSkeleton />
      ) : (
        <Sidebar
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 ">
        {isLoading ? (
          <ContentSkeleton />
        ) : (
          <div className="p-6 text-white">
            {children}
          </div>
        )}
      </main>
    </div>
  );
}