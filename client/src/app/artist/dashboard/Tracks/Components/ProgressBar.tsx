import { memo } from "react";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  formatTime: (t: number) => string;
}

const ProgressBar = memo(function ProgressBar({ currentTime, duration, onSeek, formatTime }: ProgressBarProps) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    onSeek(percentage * duration);
  };

  return (
    <div className="space-y-2">
      <div
        className="relative h-2 bg-gray-700 rounded-full overflow-hidden cursor-pointer group"
        onClick={handleClick}
        role="slider"
        aria-valuenow={currentTime}
        aria-valuemin={0}
        aria-valuemax={duration}
      >
        {/* GPU-accelerated progress using transform */}
        <div
          className="absolute inset-y-0 left-0 bg-[#ff6b35] transition-transform duration-75"
          style={{
            transform: `translateX(${progress - 100}%)`,
            width: "100%",
          }}
        />
        <div className="absolute inset-0 bg-transparent group-hover:bg-white/10 transition-colors" />
      </div>

      <div className="flex justify-between text-xs text-gray-400 font-medium">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
});


export default ProgressBar