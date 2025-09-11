import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabProps } from '@/helper/helper';
import { RolesTypes } from '@/helper/helper';
import clsx from 'clsx';

export default function Tab({ activeTab, setActiveTab }: TabProps) {
  return (
    <Tabs
      defaultValue="Artist"
      value={activeTab}
      onValueChange={(val) => setActiveTab(val as RolesTypes)}
      className="mt-12 flex justify-center items-center mx-auto text-center"
    >
      <TabsList className="relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-1.5 gap-2 shadow-2xl">
        <TabsTrigger
          value="Artist"
          className={clsx(
            'relative cursor-pointer px-8 py-4 text-base font-poppins font-semibold rounded-lg transition-all duration-500 ease-out',
            'overflow-hidden group min-w-[140px]',
            // Active state
            'data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-neutral-100',
            'data-[state=active]:text-neutral-900 data-[state=active]:shadow-lg data-[state=active]:shadow-white/20',
            'data-[state=active]:scale-105 data-[state=active]:border-0',
            // Inactive state
            'data-[state=inactive]:text-neutral-400 data-[state=inactive]:bg-transparent',
            'data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-neutral-800/60',
            'data-[state=inactive]:hover:shadow-md data-[state=inactive]:hover:scale-[1.02]',
            // Shared effects
            'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent',
            'before:translate-x-[-100%] before:transition-transform before:duration-700',
            'hover:before:translate-x-[100%]'
          )}
        >
          <span className="relative z-10 flex items-center font-poppins gap-2">
            <svg
              className="w-4 h-4 opacity-70"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            For Artists
          </span>
        </TabsTrigger>

        <TabsTrigger
          value="fan"
          className={clsx(
            'relative cursor-pointer px-8 py-4 text-base font-poppins font-semibold rounded-lg transition-all duration-500 ease-out',
            'overflow-hidden group min-w-[140px]',
            // Active state
            'data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-neutral-100',
            'data-[state=active]:text-neutral-900 data-[state=active]:shadow-lg data-[state=active]:shadow-white/20',
            'data-[state=active]:scale-105 data-[state=active]:border-0',
            // Inactive state
            'data-[state=inactive]:text-neutral-400 data-[state=inactive]:bg-transparent',
            'data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-neutral-800/60',
            'data-[state=inactive]:hover:shadow-md data-[state=inactive]:hover:scale-[1.02]',
            // Shared effects
            'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent',
            'before:translate-x-[-100%] before:transition-transform before:duration-700',
            'hover:before:translate-x-[100%]'
          )}
        >
          <span className="relative z-10 flex items-center font-poppins gap-2">
            <svg
              className="w-4 h-4 opacity-70"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            For Fans
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
