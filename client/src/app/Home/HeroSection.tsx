// src/components/hero-section.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  buttonVariants,
  containerVariants,
  itemVariants,
  imageVariants,
  scrollVariants,
  titleVariants,
} from '@/components/Variants';

// Animated Dot Pattern Component
const AnimatedDotPattern = () => (
  <div
    aria-hidden="true"
    className="
      absolute -z-10 inset-0 h-full w-full
      [mask-image:radial-gradient(100%_100%_at_top,white,transparent)]
    "
  >
    <div
      className="
        absolute inset-0 h-full w-full
        bg-[radial-gradient(#2d2d2d_1px,transparent_1px)]
        [background-size:18px_18px]
        animate-[pan_60s_linear_infinite]
      "
    />
  </div>
);

export function HeroSection() {
  return (
    <motion.header
      className="relative w-full overflow-hidden md:pt-32 md:pb-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <AnimatedDotPattern />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/30 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"
      />

      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div
            className="mb-6 lg:mt-0 mt-[3rem] inline-block font-poppins rounded-full bg-neutral-800/50 px-4 py-1.5 text-sm font-semibold text-neutral-300 border border-neutral-700"
            variants={itemVariants}
          >
            Turn Your Fans Into Your Marketing Team
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="font-display font-poppins max-w-4xl text-5xl font-bold tracking-tighter leading-normal text-white sm:text-6xl lg:text-7xl"
            variants={titleVariants}
          >
            Amplify Your Music,
            <span className="bg-gradient-to-r from-orange-500 bg-clip-text text-transparent">
              {' '}
              Reward{' '}
              <span className="bg-gradient-to-r bg-clip-text text-white">
                Your Fans.
              </span>
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            className="mt-6 font-poppins max-w-2xl text-lg text-neutral-400 md:text-xl"
            variants={itemVariants}
          >
            The ultimate platform for emerging artists to grow their audience by
            empowering fans to share and promote their music.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 font-poppins cursor-pointer flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={itemVariants}
          >
            <Link href="/auth/signup-options">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="cursor-pointer font-poppins w-full sm:w-auto bg-[#FF6B35] text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-[#e85f2d] hover:shadow-xl active:shadow-md"
                >
                  Get Started
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll-triggered Mockup Image */}
      <motion.div
        className="max-w-max mx-auto text-center mt-[6rem]"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
          margin: '-100px',
        }}
        variants={scrollVariants}
      >
        <motion.div
          variants={imageVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3, ease: 'easeInOut' },
          }}
        >
          <Image
            src="/images/Mockup.png"
            alt="Artist DashBoard"
            width={1000}
            height={1000}
            priority
          />
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
