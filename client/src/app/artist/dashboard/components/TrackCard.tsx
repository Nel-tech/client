import { TrackResponse } from '@/helper/type';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Pause, Pencil, Trash, MoreVertical, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useArtistPermissions } from '@/lib/queries/track-queries';

interface TrackCardProps {
  track: TrackResponse;
  isPlaying?: boolean;
  currentTime?: number; // Current playback time in seconds
  onPlayToggle: (track: TrackResponse) => void;
  onEdit: (trackId: string) => void;
  onDelete: (trackId: string) => void;
  onSeek?: (time: number) => void; // Optional seek functionality
}

const formatDuration = (seconds?: number | null) => {
  if (!seconds) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' + s : s}`;
};

const TrackCard = ({ 
  track, 
  isPlaying = false, 
  currentTime = 0,
  onPlayToggle, 
  onEdit, 
  onDelete,
  onSeek
}: TrackCardProps) => {
  const { data: permissionInfo } = useArtistPermissions();
  const tier = permissionInfo?.data?.tier ?? "BASIC";
  const canDelete = tier !== "BASIC";

  const duration = track.duration || 0;
  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
  const remainingTime = Math.max(duration - currentTime, 0);

  // Debug logs
  console.log('TrackCard Debug:', {
    trackId: track.id,
    isPlaying,
    currentTime,
    duration,
    progress: `${progress.toFixed(2)}%`
  });

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    onSeek(newTime);
  };

  return (
    <motion.div
      layout 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex flex-col gap-3 p-4 rounded-xl hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-white/10"
    >
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden shadow-lg">
          <Image 
            src={track.thumbnail || '/placeholder-track.jpg'} 
            alt={track.title} 
            fill 
            className="object-cover" 
          />

          {/* Play/Pause Overlay */}
          <button
            onClick={() => onPlayToggle(track)}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
          >
            <div className="bg-[#ff6b35] rounded-full p-2.5 transform hover:scale-110 transition-transform shadow-xl">
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-white ml-0.5" />
              )}
            </div>
          </button>

          {/* Playing Indicator */}
          {isPlaying && (
            <div className="absolute bottom-2 right-2 flex items-center gap-0.5">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-[#ff6b35] rounded-full"
                  animate={{ height: ['4px', '14px', '4px'] }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-white truncate group-hover:text-[#ff6b35] transition-colors">
            {track.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
            <Music2 className="h-3 w-3" />
            <span>{track.genre || 'Unknown'}</span>
          </div>
          {track.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
              {track.description}
            </p>
          )}
        </div>

        {/* Time Display - Desktop */}
        <div className="hidden md:flex flex-col items-end gap-1 min-w-[60px]">
         
            <div className="text-sm text-gray-400">
              {formatDuration(duration)}
            </div>
         
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => onEdit(track.id)} 
            className="h-8 w-8 hover:bg-white/10"
          >
            <Pencil className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
          </Button>
          {canDelete ? (
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => onDelete(track.id)} 
              className="h-8 w-8 hover:bg-red-500/10"
            >
              <Trash className="h-4 w-4 text-red-500 hover:text-red-400 transition-colors" />
            </Button>
          ) : (
            <Button 
              size="icon" 
              variant="ghost" 
              disabled 
              className="h-8 w-8 cursor-not-allowed opacity-50"
            >
              <Trash className="h-4 w-4 text-gray-600" />
            </Button>
          )}
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 hover:bg-white/10"
          >
            <MoreVertical className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
          </Button>
        </div>
      </div>

      {/* Musical Waveform Progress Bar - Shows when playing */}
      {isPlaying && duration > 0 && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="w-full space-y-2"
        >
          {/* Waveform-style Progress Bar */}
          <div 
            onClick={handleProgressClick}
            className="relative w-full h-12 cursor-pointer group/progress"
          >
            {/* Background Waveform Bars */}
            <div className="absolute inset-0 flex items-center gap-0.5">
              {Array.from({ length: 60 }).map((_, i) => {
                // Create pseudo-random heights for waveform effect
                const baseHeight = 20 + Math.sin(i * 0.5) * 15 + Math.cos(i * 0.3) * 10;
                const height = Math.max(8, Math.min(48, baseHeight));
                const isPlayed = (i / 60) * 100 <= progress;
                
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-full transition-all duration-150"
                    style={{
                      height: `${height}%`,
                      backgroundColor: isPlayed 
                        ? 'rgb(255, 107, 53)' 
                        : 'rgba(255, 255, 255, 0.1)',
                      opacity: isPlayed ? 1 : 0.5,
                    }}
                  />
                );
              })}
            </div>

            {/* Playhead Indicator */}
            <motion.div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg shadow-white/50 z-10"
              style={{ left: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              {/* Playhead Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
            </motion.div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/progress:opacity-100 transition-opacity rounded-lg" />
          </div>

          {/* Time Display */}
          <div className="flex justify-between text-xs px-1">
            <span className="text-[#ff6b35] font-medium">
              {formatDuration(currentTime)}
            </span>
            <span className="text-gray-400">
              {formatDuration(duration)}
            </span>
          </div>
        </motion.div>
      )}

      {/* Static Progress Hint (when not playing) */}
      {!isPlaying && duration > 0 && (
        <div className="w-full h-0.5 bg-white/5 rounded-full" />
      )}
    </motion.div>
  );
};

export default TrackCard;