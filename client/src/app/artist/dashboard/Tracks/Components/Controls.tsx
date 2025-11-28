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
        className="p-5 rounded-full bg-[#ff6b35] 
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



export default Controls;
