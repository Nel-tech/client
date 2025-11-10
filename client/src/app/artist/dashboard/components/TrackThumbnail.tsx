import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Pause, Edit2 } from 'lucide-react';
import { TrackResponse } from '@/helper/type';

interface Props {
  track: TrackResponse;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onEdit: () => void;
}

export function TrackThumbnail({ track, isPlaying, onTogglePlay, onEdit }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="relative w-full h-56 rounded-xl overflow-hidden bg-[#111]"
    >
      <Image src={track.thumbnail} alt={track.title} fill className="object-cover" />

      {/* Hover Fade Overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-sm 
        text-white opacity-0 group-hover:opacity-100 transition hover:bg-white/20"
      >
        <Edit2 size={16} />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={onTogglePlay}
        className="absolute inset-0 flex items-center justify-center 
        opacity-0 group-hover:opacity-100 transition"
      >
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          {isPlaying ? <Pause size={28} className="text-white" /> : <Play size={28} className="text-white ml-1" />}
        </div>
      </button>
    </motion.div>
  );
}
