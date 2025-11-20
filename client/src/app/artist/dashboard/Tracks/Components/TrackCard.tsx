import { Track } from '@/helper/type';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Pause, Pencil, Trash, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TrackCardProps {
  track: Track;
  isPlaying?: boolean;
 
  currentTime?: number;
  onPlayToggle: (track: Track) => void;
  onEdit: (trackId: string) => void;
  onDelete: (trackId: string) => void;
  onSeek?: (time: number) => void;
}

// const formatDuration = (seconds?: number | null) => {
//   if (!seconds) return "0:00";
//   const m = Math.floor(seconds / 60);
//   const s = Math.floor(seconds % 60);
//   return `${m}:${s < 10 ? '0' + s : s}`;
// };

const TrackCard = ({ 
  track, 
  isPlaying = false, 

  currentTime = 0,
  onPlayToggle, 
  onEdit, 
  onDelete,
  onSeek
}: TrackCardProps) => {
  const duration = track?.duration || 0;
  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

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
      className="group relative flex flex-col gap-3 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-200 border border-white/5 hover:border-white/10"
    >
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden shadow-lg ring-1 ring-white/10">
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
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white truncate group-hover:text-[#ff6b35] transition-colors">
              {track.title}
            </h3>
            {/* Status Badge */}
            {track.status && (
              <span className={`
                px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider shrink-0
                ${track?.status === 'APPROVED' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : ''}
                ${track?.status === 'PENDING' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : ''}
                ${track?.status === 'REJECTED' ? 'bg-gray-500/10 text-gray-400 border border-gray-500/20' : ''}
              `}>
                {track.status}
              </span>
            )}
          </div>
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

        {/* Time Display - Desktop
        <div className="hidden md:flex flex-col items-end gap-1 min-w-[60px]">
          <div className="text-sm text-gray-400 font-mono">
            {formatDuration(duration)}
          </div>
        </div> */}

        {/* Actions - Now visible for all tiers */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => onEdit(track.id)}
            className="h-8 w-8 hover:bg-white/10"
            title="Edit track"
          >
            <Pencil className="h-4 w-4 text-gray-400 hover:text-[#ff6b35] transition-colors" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => onDelete(track.id)} 
            className="h-8 w-8 hover:bg-red-500/10"
            title="Delete track"
          >
            <Trash className="h-4 w-4 text-gray-400 hover:text-red-400 transition-colors" />
          </Button>
        </div>
      </div>

     
      {/* Subtle divider when not playing */}
      {!isPlaying && duration > 0 && (
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      )}
    </motion.div>
  );
};

export default TrackCard;