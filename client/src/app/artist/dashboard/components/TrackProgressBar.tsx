// src/components/track/TrackProgressBar.tsx
import { Play } from 'lucide-react';

interface TrackProgressBarProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatTime: (t: number) => string;
}

export const TrackProgressBar = ({
  currentTime,
  duration,
  isPlaying,
  onTogglePlay,
  onSeek,
  formatTime,
}: TrackProgressBarProps) => (
  <div className="flex items-center justify-between p-2 bg-gray-100 rounded-b-lg">
    <button
      onClick={onTogglePlay}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-200"
    >
      <Play className="h-5 w-5 text-gray-600" fill="currentColor" />
    </button>
    <div className="flex-1 mx-2">
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={onSeek}
        className="w-full h-1 bg-gray-300 rounded-full appearance-none cursor-pointer accent-blue-500"
      />
    </div>
    <span className="text-xs text-gray-600">{`${formatTime(currentTime)} / ${formatTime(
      duration
    )}`}</span>
  </div>
);