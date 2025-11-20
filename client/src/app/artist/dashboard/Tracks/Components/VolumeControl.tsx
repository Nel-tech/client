import React, { memo } from "react";
import { VolumeX, Volume2 } from "lucide-react";

type VolumeProps = {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMuteToggle: () => void;
};

const VolumeControl = memo(function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
}: VolumeProps) {
  return (
    <div className="flex items-center gap-3 px-4">
      <button
        onClick={onMuteToggle}
        className="p-2 hover:bg-gray-800 rounded-full transition"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-gray-400" />
        ) : (
          <Volume2 className="w-5 h-5 text-gray-400" />
        )}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={onVolumeChange}
        className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer accent-purple-500
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500
                   [&::-webkit-slider-thumb]:shadow-lg"
      />
    </div>
  );
});

export default VolumeControl;
