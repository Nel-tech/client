import { motion } from 'framer-motion';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-black/90">
      <motion.div
        className="w-16 h-16 border-4 border-t-transparent border-orange-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
    </div>
  );
}
