import { Tracks } from '@/helper/type';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Progress from './Progress';
import { Play, Pause } from 'lucide-react';
const TrackCard = ({
  track,
  onToggle,
}: {
  track: Tracks;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      layout
      className="bg-card rounded-xl p-4 border border-border hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={track.thumbnail}
            alt={track.title}
            className="w-16 h-16 rounded-lg object-cover"
            width={30}
            height={30}
          />
          <button
            onClick={onToggle}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
          >
            {track.isActive ? (
              <Pause className="h-6 w-6 text-white" />
            ) : (
              <Play className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{track.title}</h3>
          <p className="text-sm text-white ">{track.platform}</p>

          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>
                {track.shares}/{track.goal} shares
              </span>
            </div>
            <Progress
              value={(track.shares / track.goal) * 100}
              className="h-2"
            />
          </div>
        </div>

        <div className="text-right text-white">
          <p className="text-sm font-medium">
            {track.streams.toLocaleString()}
          </p>
          <p className="text-xs  ">streams</p>
        </div>
      </div>
    </motion.div>
  );
};
export default TrackCard;
