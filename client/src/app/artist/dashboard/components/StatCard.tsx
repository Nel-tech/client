import { motion } from 'framer-motion';
import { StatCardProps } from '@/helper/type';
import { cn } from '@/lib/utils';
const StatCard = ({ value, label, icon, trend, className }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden rounded-xl bg-[#262626] p-6 ',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
