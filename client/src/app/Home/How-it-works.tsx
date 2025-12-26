'use client';

import { useState } from 'react';
import Tab from '@/components/Tab';
import { artistSteps, fanSteps } from '@/helper/mock';
import { RoleTypes } from '@/helper/type';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
  titleVariants,
  scrollVariants,
} from '@/components/Variants';

export function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<RoleTypes>('Artist');
  const steps = activeTab === 'Artist' ? artistSteps : fanSteps;

  return (
    <section id="how-it-works" className="w-full py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="font-poppins text-4xl text-center font-black text-transparent 
              sm:text-5xl lg:text-6xl 
              bg-clip-text bg-gradient-to-r from-white to-gray-400"
            variants={titleVariants}
          >
            How Tropiqk Works
          </motion.h2>
          <motion.p
            className="mt-4 font-poppins text-lg text-neutral-400"
            variants={itemVariants}
          >
            A simple process for artists to grow and fans to earn. Select your
            role to see how.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="mt-8"
          variants={scrollVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                variants={itemVariants}
              >
                <Card className="rotate-x-15 -rotate-y-30 mx-auto bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border-zinc-700/50 hover:border-orange-500/30 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-orange-500/10 backdrop-blur-sm h-full">
                  <CardContent className="p-8 text-center mx-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Step Number */}
                    <div className="relative mb-6 mx-auto">
                      <div className="text-7xl font-black text-transparent bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-500">
                        {step.number}
                      </div>
                      <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-6 mx-auto">
                      <div className="relative p-4 bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 rounded-2xl group-hover:from-orange-500/20 group-hover:to-orange-600/20 transition-all duration-500 group-hover:scale-110">
                        <IconComponent className="w-8 h-8 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                        <div className="absolute inset-0 bg-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-2xl font-poppins font-bold text-white mb-4 group-hover:text-orange-300 transition-colors duration-300 leading-tight">
                      {step.headline}
                    </h3>
                    <p className="text-zinc-400 font-poppins text-base leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
