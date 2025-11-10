import { TrackResponse } from '@/helper/type';

export const TrackInfo = ({ track }: { track: TrackResponse }) => (
  <div className="px-2 mt-3">
    <h3 className="text-sm font-medium text-white truncate">{track.title}</h3>
    <p className="text-[11px] text-gray-400 truncate mt-1">
      {track.genre ?? 'Unknown'} • {track.description ?? 'No Description'}
    </p>
  </div>
);
