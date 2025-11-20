import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import React, { memo } from "react";

// ----------------- Controls -----------------

type ControlsProps = {
  isPlaying: boolean;
  onPlayToggle: () => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
};

const Controls = memo(function Controls({
  isPlaying,
  onPlayToggle,
  onSkipBack,
  onSkipForward,
}: ControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      <button onClick={onSkipBack} className="p-3 rounded-full hover:bg-gray-800 transition">
        <SkipBack className="w-6 h-6 text-gray-300" />
      </button>

      <button
        onClick={onPlayToggle}
        className="p-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                   hover:scale-105 active:scale-95 transition-all shadow-xl"
      >
        {isPlaying ? (
          <Pause className="w-8 h-8 text-white" fill="white" />
        ) : (
          <Play className="w-8 h-8 text-white ml-1" fill="white" />
        )}
      </button>

      <button onClick={onSkipForward} className="p-3 rounded-full hover:bg-gray-800 transition">
        <SkipForward className="w-6 h-6 text-gray-300" />
      </button>
    </div>
  );
});

// ----------------- Volume Control -----------------

type VolumeProps = {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMuteToggle: () => void;
};

export const VolumeControl = memo(function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
}: VolumeProps) {
  return (
    <div className="flex items-center gap-3 px-4">
      <button onClick={onMuteToggle} className="p-2 hover:bg-gray-800 rounded-full transition">
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

export default Controls;
