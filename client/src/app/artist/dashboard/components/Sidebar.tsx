'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TropiqkLogo } from '@/components/Logo';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProps } from '@/helper/type';

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  sidebarItems,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (route: string) => {
    router.push(route);
    setSidebarOpen(false);
  };

  const isActive = (route: string) => pathname === route;

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border"
          >
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tropiqk
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.route)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                    isActive(item.route)
                      ? 'bg-[#FF6B35] text-white'
                      : 'hover:text-white'
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <TropiqkLogo />
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.route)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                isActive(item.route)
                  ? 'bg-[#FF6B35] text-white'
                  : 'hover:bg-[#FF6B35] text-white'
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
