// hooks/useTracks.ts
import { useState, useMemo } from 'react';
import { mockTracks } from '@/helper/mock';

type Filter = 'all' | 'new' | 'trusted';
type Sort = 'oldest' | 'newest';

export const useTracks = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('oldest');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filteredAndSorted = useMemo(() => {
    let list = [...mockTracks];

    // Simple filter demo (you can expand with real artist flags)
    if (filter === 'new') list = list.filter((t) => t.id === '1');
    if (filter === 'trusted') list = list.filter((t) => t.id !== '1');

    list.sort((a, b) => {
      const order = sort === 'oldest' ? 1 : -1;
      return order * (Number(a.id) - Number(b.id));
    });

    return list;
  }, [filter, sort]);

  const togglePlay = (id: string) =>
    setPlayingId((prev) => (prev === id ? null : id));

  const approve = (id: string) => console.log('Approved', id);
  const reject = (id: string) => console.log('Rejected', id);

  return {
    tracks: filteredAndSorted,
    filter,
    setFilter,
    sort,
    setSort,
    playingId,
    togglePlay,
    approve,
    reject,
  };
};
