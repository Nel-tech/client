// components/track/TrackCard.tsx
'use client';

import { Play, Pause, CheckCircle2, XCircle, Music2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Track } from '@/helper/mock';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Props {
  track: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export default function TrackCard({
  track,
  isPlaying,
  onTogglePlay,
  onApprove,
  onReject,
}: Props) {

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="group w-full rounded-lg bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/15 hover:border-white/25 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-white/5"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Thumbnail + Play Button */}
        <div className="relative w-full md:w-28 h-40 md:h-28 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-slate-700 to-slate-900">
          <Image
            src={track.thumbnail || '/placeholder-track.jpg'}
            alt={track.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={300}
            height={300}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
          
          {/* Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onTogglePlay}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-3 transition-all duration-200 ${
              isPlaying
                ? 'bg-white/20 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/30 hover:text-white'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-white" />
            ) : (
              <Play className="w-6 h-6 fill-white ml-0.5" />
            )}
          </motion.button>
        </div>

        {/* Info Section */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <div>
            <h3 className="text-white font-semibold text-lg leading-tight truncate group-hover:text-white/90 transition-colors">
              {track.title}
            </h3>
            {/* Optional artist name */}
            {/* <p className="text-gray-400 text-sm">{data?.track.artist}</p> */}
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30">
              <Music2 className="w-3 h-3 mr-1.5" />
              {track.genre}
            </Badge>
            
            {track?.duration && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-2.5 py-1.5 rounded-md">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-gray-300">{track?.duration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full md:w-auto md:flex-col lg:flex-row">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onApprove}
            className="flex-1 md:flex-none bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReject}
            className="flex-1 md:flex-none bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/30 hover:border-red-500/50 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            <span>Reject</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}