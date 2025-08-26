// /fans/components/DashboardLayout.tsx
'use client';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function DashboardLayout({
  children,
  activeSection,
  onSectionChange,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
