import React, { useState } from 'react';
import Image from 'next/image';
import DashboardHeader from '@/components/DashboardHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Filter, ArrowUpDown } from 'lucide-react';

interface Artist {
  id: number;
  name: string;
  genre: string;
  followers: string;
  verified: boolean;
  country: string;
  image: string;
}

// Sample artist data
const sampleArtists: Artist[] = [
  { id: 1, name: 'Siz', genre: 'Rap', followers: '2.3M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 2, name: 'African Child', genre: 'Afrobeats', followers: '3.1M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 3, name: 'Icloud', genre: 'Rap', followers: '2.8M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 4, name: 'Siz', genre: 'Rap', followers: '2.3M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 5, name: 'African Child', genre: 'Afrobeats', followers: '3.1M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 6, name: 'Icloud', genre: 'Rap', followers: '2.8M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 7, name: 'Siz', genre: 'Rap', followers: '2.3M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 8, name: 'African Child', genre: 'Afrobeats', followers: '3.1M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 9, name: 'Icloud', genre: 'Rap', followers: '2.8M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 10, name: 'Siz', genre: 'Rap', followers: '2.3M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 11, name: 'African Child', genre: 'Afrobeats', followers: '3.1M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 12, name: 'Icloud', genre: 'Rap', followers: '2.8M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 13, name: 'Siz', genre: 'Rap', followers: '2.3M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 14, name: 'African Child', genre: 'Afrobeats', followers: '3.1M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
  { id: 15, name: 'Icloud', genre: 'Rap', followers: '2.8M', verified: true, country: 'Nigeria', image: '/images/placeholder.png' },
];

function ArtistContent() {
  const [displayedArtists, setDisplayedArtists] = useState<Artist[]>(sampleArtists.slice(0, 8));
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>(sampleArtists);
  const [filterBy, setFilterBy] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [loadMoreCount, setLoadMoreCount] = useState(8);

  // Filter function
  const handleFilter = (value: string) => {
    setFilterBy(value);
    let filtered = sampleArtists;
    
    if (value !== 'all') {
      if (value === 'verified') {
        filtered = sampleArtists.filter(artist => artist.verified);
      } else {
        filtered = sampleArtists.filter(artist => 
          artist.genre.toLowerCase().includes(value.toLowerCase())
        );
      }
    }
    
    setFilteredArtists(filtered);
    setDisplayedArtists(filtered.slice(0, 8));
    setLoadMoreCount(8);
  };

  // Sort function
  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredArtists];
    
    switch (value) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'followers':
        sorted.sort((a, b) => {
          const aFollowers = parseFloat(a.followers.replace(/[KM]/g, '')) * (a.followers.includes('M') ? 1000000 : 1000);
          const bFollowers = parseFloat(b.followers.replace(/[KM]/g, '')) * (b.followers.includes('M') ? 1000000 : 1000);
          return bFollowers - aFollowers;
        });
        break;
      case 'verified':
        sorted.sort((a, b) => Number(b.verified) - Number(a.verified));
        break;
      default:
        break;
    }
    
    setFilteredArtists(sorted);
    setDisplayedArtists(sorted.slice(0, loadMoreCount));
  };

  // Load more function
  const handleLoadMore = () => {
    const newCount = loadMoreCount + 8;
    setLoadMoreCount(newCount);
    setDisplayedArtists(filteredArtists.slice(0, newCount));
  };

  return (
    <div>
      <header>
        <DashboardHeader />
      </header>
      
      <div className="p-6 space-y-6">
        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Filter By */}
           <div className="flex items-center">
  <span className="text-sm font-medium text-white font-poppins dark:text-gray-300 flex items-center gap-1">
    <Filter className="w-4 h-4" />
    Filter by Genre:
  </span>
  <Select value={filterBy} onValueChange={handleFilter}>
    <SelectTrigger className="w-[180px] cursor-pointer border-none" >
      <SelectValue placeholder="Select filter" />
      {/* <ChevronDown className="h-4 w-4  text-white" /> */}
    </SelectTrigger>
    <SelectContent className='bg-white'>
      <SelectItem value="all">All Artists</SelectItem>
      <SelectItem value="afrobeats">Afrobeats</SelectItem>
      <SelectItem value="r&b">R&B</SelectItem>
    </SelectContent>
  </Select>
</div>

            {/* Sort By */}
           <div className="flex items-center">
  <span className="text-sm font-medium text-white font-poppins dark:text-gray-300 flex items-center gap-1">
    <ArrowUpDown className="w-4 h-4" />
    Sort by:
  </span>
  <Select value={sortBy} onValueChange={handleSort}>
    <SelectTrigger className="w-[180px] border-none">
      <SelectValue placeholder="Select sort" />
      {/* <ChevronDown className="h-4 w-4 text-white" /> */}
    </SelectTrigger>
    <SelectContent className='bg-white font-poppins'>
      <SelectItem value="name">Name (A-Z)</SelectItem>
      <SelectItem value="followers">Followers (High-Low)</SelectItem>
      <SelectItem value="verified">Verified First</SelectItem>
    </SelectContent>
  </Select>
</div>
</div>

          {/* Results count */}
          <div className="text-sm text-gray-500 font-poppins dark:text-gray-400">
            Showing {displayedArtists.length} of {filteredArtists.length} artists
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedArtists.map((artist) => (
            <Card key={artist.id} className="group border-none hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-4 border-none">
                <div className="relative mb-4">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  
                </div>
                
                <div className="space-y-2 text-center">
                  <h3 className="font-semibold text-lg font-poppins truncate text-white">{artist.name}</h3>
                  <p className="text-sm text-gray-600 font-poppins dark:text-gray-400">{artist.genre}</p>
                 
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {displayedArtists.length < filteredArtists.length && (
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleLoadMore}
              className="cursor-pointer font-poppins w-full sm:w-auto bg-[#FF6B35] text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-[#e85f2d] hover:shadow-xl active:shadow-md"
              variant="outline"
            >
              Load More Artists
            </Button>
          </div>
        )}

        {/* No results message */}
        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No artists found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtistContent;