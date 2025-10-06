import { ProfileProgressCardProps } from "@/helper/type";
import { motion } from 'framer-motion';
import Progress from "./Progress";
import CircleProgress from "./Circle";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

function ProfileProgressCard({
  progressPercentage,
  profileTasks,
  message,
}: ProfileProgressCardProps) {

  const completedTasks = profileTasks.filter((task) => task.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">
          Profile Completion
        </h2>
        <CircleProgress value={progressPercentage} maxValue={100} size={60} />
      </div>

      {message && (
        <p className="text-sm text-gray-400 mb-4">{message}</p>
      )}

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2 text-white">
          <span>Progress ({completedTasks}/{profileTasks.length} tasks)</span>
          <span>{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} />
      </div>

      <div className="space-y-2">
        {profileTasks.map((task) => (
          <div key={task.id} className="flex items-center gap-2 text-sm">
            <CheckCircle
              className={cn(
                'h-4 w-4',
                task.completed ? 'text-green-500' : 'text-gray-300'
              )}
            />
            <span className={task.completed ? 'line-through text-white' : 'text-gray-400'}>
              {task.task}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ProfileProgressCard;