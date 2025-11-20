// app/(dashboard)/approved/page.tsx
'use client';

import { useTracks } from '@/lib/hooks/useTracks';
import TrackFilters from '@/app/admin/components/filters/TrackFilters';
import TrackCard from '@/app/admin/components/track/TrackCard';

export default function ApprovedPage() {
  const {
    tracks,
    filter,
    setFilter,
    sort,
    setSort,
    playingId,
    togglePlay,
    // approve/reject not needed for approved view
  } = useTracks();

  // In a real app you would fetch only approved tracks.
  // Here we just filter the mock list for demo.
  const approvedTracks = tracks.filter((t) => Number(t.id) % 2 === 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">
          Approved Tracks ({approvedTracks.length})
        </h2>

        <TrackFilters
          filter={filter}
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
        />
      </div>

      <div className="space-y-4">
        {approvedTracks.map((track) => (
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