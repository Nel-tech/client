import { motion } from 'framer-motion';
import { Trash, Lock } from 'lucide-react';

interface Props {
  canDelete: boolean;
  tier: string;
  isHovered: boolean;
  onDelete: () => void;
}

export const TrackActions = ({ canDelete, tier, isHovered, onDelete }: Props) => {
  const allowed = tier !== 'BASIC' && canDelete;

  return (
    <motion.div
      animate={{ opacity: isHovered ? 1 : 0 }}
      className="absolute top-3 right-3"
    >
      <button
        onClick={allowed ? onDelete : undefined}
        disabled={!allowed}
        className={`p-2 rounded-full backdrop-blur-md transition
          ${allowed ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                    : "bg-white/10 text-gray-500 cursor-not-allowed"}`}
      >
        {allowed ? <Trash size={15} /> : <Lock size={15} />}
      </button>
    </motion.div>
  );
};
