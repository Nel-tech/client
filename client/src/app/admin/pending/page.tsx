// app/(dashboard)/pending/page.tsx
'use client';

import { useTracks } from '@/lib/hooks/useTracks';
import TrackFilters from '@/app/admin/components/filters/TrackFilters';
import TrackCard from '@/app/admin/components/track/TrackCard';
import { usePendingTracks } from '@/lib/queries/admin-queries';

export default function PendingPage() {
  const {
    tracks,
    filter,
    setFilter,
    sort,
    setSort,
    playingId,
    togglePlay,
    approve,
    reject,
  } = useTracks();

  

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">
          Pending Review ({tracks.length} tracks)
        </h2>

        <TrackFilters
          filter={filter}
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
        />
      </div>

      <div className="space-y-4">
        {tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            isPlaying={playingId === track.id}
            onTogglePlay={() => togglePlay(track.id)}
            onApprove={() => approve(track.id)}
            onReject={() => reject(track.id)}
          />
        ))}
      </div>
    </div>
  );
}