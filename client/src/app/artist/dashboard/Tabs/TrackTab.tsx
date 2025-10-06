import React from 'react';
import { Plus } from 'lucide-react';
import TrackCard from '../components/TrackCard';
import { tracks } from '@/helper/mock';
import { Button } from '@/components/ui/button';
function TrackTab() {
  const toggleTrack = (trackId: string) => {
    // Track toggle logic would go here
    console.log('Toggle track:', trackId);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Tracks</h1>
        <Button className="bg-[#ff6b35] text-white px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          Add Track
        </Button>
      </div>

      <div className="space-y-4">
        {tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            onToggle={() => toggleTrack(track.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TrackTab;
