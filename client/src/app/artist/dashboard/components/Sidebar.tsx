'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TropiqkLogo } from '@/components/Logo';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProps } from '@/helper/type';
import { Button } from '@/components/ui/button';

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

  const handleLogout = () => {
   
    router.replace('/login');
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
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border flex flex-col"
          >
            {/* Header */}
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

            {/* Nav */}
            <nav className="p-4 space-y-2 flex-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => handleNavigate(item.route)}
                  className={cn(
                    'w-full flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                    isActive(item.route)
                      ? 'bg-[#FF6B35] text-white'
                      : 'hover:text-white'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-border">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full flex items-center gap-3 text-red-500 hover:bg-red-500/10 hover:text-red-500"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-card border-r border-border flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center">
          <TropiqkLogo />
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-2 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.route)}
              className={cn(
                'w-full flex items-center cursor-pointer gap-3 px-4 py-2.5 rounded-lg text-left transition-colors',
                isActive(item.route)
                  ? 'bg-[#FF6B35] text-white'
                  : 'text-white hover:bg-[#FF6B35]/10'
              )}
            >
              <span className="w-5 h-5 flex items-center justify-center">
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
