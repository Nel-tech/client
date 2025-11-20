// app/(dashboard)/rejected/page.tsx
'use client';

import { useTracks } from '@/lib/hooks/useTracks';
import TrackFilters from '@/app/admin/components/filters/TrackFilters';
import TrackCard from '@/app/admin/components/track/TrackCard';

export default function RejectedPage() {
  const {
    tracks,
    filter,
    setFilter,
    sort,
    setSort,
    playingId,
    togglePlay,
  } = useTracks();

  // Demo: odd IDs are considered rejected
  const rejectedTracks = tracks.filter((t) => Number(t.id) % 2 === 1);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">
          Rejected Tracks ({rejectedTracks.length})
        </h2>

        <TrackFilters
          filter={filter}
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
        />
      </div>

      <div className="space-y-4">
        {rejectedTracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            isPlaying={playingId === track.id}
            onTogglePlay={() => togglePlay(track.id)}
            onApprove={() => {}}
            onReject={() => {}}
          />
        ))}
      </div>
    </div>
  );
}