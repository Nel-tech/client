// /fans/components/Sidebar.tsx
'use client';
import { Compass, Users, Gift, Library } from 'lucide-react';
import { TropiqkLogo } from './Logo';
import clsx from 'clsx';

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
  return (
    <aside className="w-64 0 text-gray-300 flex flex-col p-4">
      {/* Logo */}
      <div className="mb-10">
        <TropiqkLogo />
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-4">
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
    </aside>
  );
}
