import React from 'react'
import { Search, User } from 'lucide-react';

function DashboardHeader() {
  return (
    <div>
        <header className="relative flex items-center justify-between w-full px-6 py-4 border-b border-gray-800">
          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search music, artists..."
              className="w-full pl-10 pr-4 py-2 font-poppins placeholder:font-poppins rounded-2xl bg-[#262626] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            />
          </div>

          
      

        </header>
    </div>
  )
}

export default DashboardHeader