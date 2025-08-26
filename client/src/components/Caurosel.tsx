'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: 'Discover New Music',
    desc: 'Find tracks tailored for you.',
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Share & Earn',
    desc: 'Promote artists and earn coins.',
    img: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Support Creators',
    desc: 'Help artists grow their streams.',
    img: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <Image
            src={slides[current].img}
            alt={slides[current].title}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
            unoptimized
          />

          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-8">
            <h2 className="text-3xl font-bold font-poppins">
              {slides[current].title}
            </h2>
            <p className="mt-2 text-lg text-gray-100 font-poppins">
              {slides[current].desc}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
