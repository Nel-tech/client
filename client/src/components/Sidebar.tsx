// src/components/fans/Sidebar.tsx
'use client';

import React from 'react';
import { Compass, Users, Gift, Library, User as ProfileIcon, Settings, LogOut } from 'lucide-react';
import { TropiqkLogo } from './Logo';
import clsx from 'clsx';
import { useAuthUser, useAuthLoading } from '@/store/useAuthStore';
import { useLogout } from '@/lib/queries/auth-queries';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { name: 'Discover', key: 'discover', icon: Compass },
  { name: 'Artists', key: 'artists', icon: Users },
  { name: 'Rewards', key: 'rewards', icon: Gift },
  { name: 'My Library', key: 'library', icon: Library },
];

export default function Sidebar({
  activeSection,
  onSectionChange,
}: SidebarProps) {
  const user = useAuthUser();
  const authLoading = useAuthLoading();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  console.log('👤 Sidebar - User:', user?.username || 'null', 'Loading:', authLoading);

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-64 text-gray-300 flex flex-col p-4 h-screen  border-r border-gray-700">
      {/* Logo */}
      <div className="mb-10 px-3">
        <TropiqkLogo />
      </div>

      {/* Main Nav Links */}
      <nav className="flex-1 flex flex-col space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.key;
          return (
            <button
              key={item.name}
              onClick={() => onSectionChange(item.key)}
              className={clsx(
                'flex items-center cursor-pointer gap-3 font-poppins rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-200 text-left',
                isActive
                  ? 'bg-[#FF6B35] text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon size={20} />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div className="mt-auto">
        <hr className="my-4 border-t border-gray-700/50" />
        
        {/* Show skeleton while user data is loading */}
        {authLoading || !user ? (
          <div className="flex items-center gap-3 p-3">
            <Skeleton className="w-10 h-10 rounded-full bg-gray-600" />
            <div className="flex-1">
              <Skeleton className="h-4 w-20 mb-1 bg-gray-600" />
              <Skeleton className="h-3 w-16 bg-gray-600" />
            </div>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full cursor-pointer flex items-center gap-3 p-3 rounded-lg text-left hover:bg-gray-700 transition-colors duration-200">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.profilePic || ''} alt={user.username || 'User'} />
                  <AvatarFallback className="bg-[#FF6B35] text-white font-bold">
                    {user.username?.[0].toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="font-poppins font-semibold text-sm text-white truncate">
                    {user.username}
                  </p>
                  <p className="font-poppins text-xs text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </button>
            </PopoverTrigger>
            
            <PopoverContent className="w-56 mb-2 bg-gray-800 border-gray-700 text-white p-2" side="top" align="start">
              <div className="flex flex-col space-y-1">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 font-normal"
                  onClick={() => onSectionChange('profile')}
                >
                  <ProfileIcon size={16} />
                  My Profile
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 font-normal"
                  onClick={() => onSectionChange('settings')}
                >
                  <Settings size={16} />
                  Account Settings
                </Button>
                
                <hr className="my-1 border-t border-gray-700" />

                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 font-normal text-red-400 hover:bg-red-500/10 hover:text-red-400"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogOut size={16} />
                  {isLoggingOut ? 'Signing out...' : 'Log Out'}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </aside>
  );
}