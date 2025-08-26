import { Search, User } from 'lucide-react';
import Carousel from '@/components/Caurosel';
import CardRow from '@/components/CardRow';
function Discover() {
  return (
    <div className="flex h-screen w-full  text-gray-200">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between w-full px-6 py-4 border-b border-gray-800">
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

          {/* Profile Icon */}
          <button className="ml-6 flex items-center justify-center w-10 h-10 rounded-full bg-[#262626] hover:bg-[#333] transition">
            <User size={20} className="text-gray-300" />
          </button>
        </header>

        {/* Scrollable Content */}
        <section className="flex-1  p-6">
          <h1 className="text-2xl font-bold mb-2 font-poppins">Discover</h1>
          <p className="text-gray-400 mb-6 font-poppins">
            Explore trending tracks, artists, and playlists curated for you.
          </p>

          <Carousel />

          <CardRow />
        </section>
      </main>
    </div>
  );
}

export default Discover;
