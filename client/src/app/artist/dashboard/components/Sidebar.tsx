'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarProps } from '@/helper/type';
import { TropiqkLogo } from '@/components/Logo';

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  sidebarItems,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Sidebar with Animation */}
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
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                    activeTab === item.id
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

      {/* Desktop Sidebar - Always Visible */}
      <aside className="hidden lg:block lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <TropiqkLogo />
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'w-full cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                activeTab === item.id
                  ? 'bg-[#FF6B35] text-white'
                  : 'hover:bg-[#FF6B35] text-white'
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-4 w-4 text-[#FF6B35]" />
              <span className="text-sm font-medium text-white">Quick Tip</span>
            </div>
          
          </div>
        </div> */}
      </aside>
    </>
  );
}
