// app/(dashboard)/search/page.tsx
'use client';

import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTracks } from '@/lib/hooks/useTracks';
import TrackCard from '@/app/admin/components/track/TrackCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { tracks, playingId, togglePlay } = useTracks();

  const filtered = tracks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.artist.toLowerCase().includes(query.toLowerCase()) ||
      t.genre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Search Tracks</h2>

        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search title, artist, genre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground">No tracks match your search.</p>
        ) : (
          filtered.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isPlaying={playingId === track.id}
              onTogglePlay={() => togglePlay(track.id)}
              onApprove={() => {}}
              onReject={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
}