'use client';
import { Track } from '@/lib/api/endpoints/track/type';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Megaphone, Pause, Pencil, Trash2, Music2, Clock, CheckCircle2, AlertCircle, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface TrackCardProps {
  track: Track;
  isPlaying?: boolean;
  onPlayToggle: (track: Track) => void;
  onPromote: (trackId:string) => void;
  onEdit: (trackId: string) => void;
  onDelete: (trackId: string) => void;
}



export default function TrackCard({
  track,
  isPlaying = false,
  
  onPlayToggle,
  onEdit,
  onDelete,
}: TrackCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const router = useRouter()
 
  const statusConfig = {
    APPROVED: { color: 'emerald', icon: CheckCircle2, label: 'Approved' },
    PENDING: { color: 'amber', icon: Timer, label: 'Pending' },
    REJECTED: { color: 'red', icon: AlertCircle, label: 'Rejected' },
  };

  const status = statusConfig[track.status] || statusConfig.PENDING;

  const redirect=(trackId:string)=>{
    router.push(`/artist/dashboard/Tracks/${trackId}/promote`)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-400"
      style={{
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Top accent bar in your brand color */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6">
        <div className="flex items-start gap-6">
          {/* Thumbnail */}
          <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-zinc-800 ring-2 ring-zinc-700/50 group-hover:ring-[#ff6b35]/30 transition-all duration-300">
            <Image
              src={track.thumbnail || '/placeholder-track.jpg'}
              alt={track.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Play Overlay */}
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPlayToggle(track)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:bg-black/50 transition-all"
            >
              <div className={`rounded-full p-4 bg-white/20 backdrop-blur-md shadow-2xl transition-all ${isPlaying ? 'bg-white text-black' : 'group-hover:bg-white/30'}`}>
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-current" />
                ) : (
                  <Play className="w-7 h-7 fill-current ml-1" />
                )}
              </div>
            </motion.button>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Title + Status */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white tracking-tight truncate">
                  {track.title}
                </h3>
                {track.description && (
                  <p className="mt-1 text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                    {track.description}
                  </p>
                )}
              </div>

              {/* Status Badge */}
              {track.status && (
                <Badge
                  variant="outline"
                  className={`border-${status.color}-500/30 bg-${status.color}-500/10 text-${status.color}-300 px-3 py-1.5`}
                >
                  <status.icon className="w-3.5 h-3.5 mr-1.5" />
                  <span className="text-xs font-medium tracking-wider">{status.label}</span>
                </Badge>
              )}


              {track.status === 'APPROVED' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => redirect(track?.id)}
                className="flex items-center cursor-pointer gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#ff6b35] to-[#ff8a65] text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Megaphone className="w-3.5 h-3.5" />
                Promote
              </motion.button>
              )}
            </div>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Music2 className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-300">{track.genre || 'No Genre'}</span>
              </div>

              {track.duration ? (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-500" />
                  <span className="text-zinc-300">{formatDuration(track.duration)}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              size="icon"
              variant="outline"
              onClick={() => onEdit(track.id)}
              className="h-11 w-11 rounded-xl border-zinc-700 hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/10 text-zinc-400 hover:text-[#ff6b35] transition-all"
            >
              <Pencil className="w-4.5 h-4.5" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={() => onDelete(track.id)}
              className="h-11 w-11 rounded-xl border-zinc-700 hover:border-red-500/50 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}