"use client";
import React from "react";
import PromoterRow from "./PromoterRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  scrollVariants,
} from "@/components/Variants";

// Sample chart data
const chartData = [
  { value: 20 },
  { value: 45 },
  { value: 30 },
  { value: 80 },
  { value: 65 },
  { value: 90 },
  { value: 75 },
  { value: 95 },
];

const ArtistMockup = () => (
  <motion.div
    className="relative w-[320px] h-[640px] mx-auto md:w-[320px] md:h-[640px] sm:w-[280px] sm:h-[560px] max-sm:w-[250px] max-sm:h-[500px] flex justify-center items-center"
    variants={scrollVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <motion.div
      className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-[44px] p-6 shadow-2xl border-2 border-gray-600/50 relative overflow-hidden md:rounded-[44px] md:p-6 sm:rounded-[36px] sm:p-5 max-sm:rounded-[32px] max-sm:p-4"
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-[44px] pointer-events-none md:rounded-[44px] sm:rounded-[36px] max-sm:rounded-[32px]" />

      {/* Screen */}
      <motion.div
        className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-850 to-black rounded-[32px] p-4 flex flex-col gap-4 border border-gray-700/50 shadow-inner md:rounded-[32px] md:p-4 md:gap-4 sm:rounded-[28px] sm:p-3.5 sm:gap-3 max-sm:rounded-[24px] max-sm:p-3 max-sm:gap-2.5"
        variants={containerVariants}
      >
        {/* Status Bar */}
        <motion.div
          className="flex font-inter justify-between items-center text-xs text-gray-400 mb-2 md:text-xs md:mb-2 sm:text-[10px] sm:mb-1.5 max-sm:text-[9px] max-sm:mb-1"
          variants={itemVariants}
        >
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse" />
            <div
              className="w-1 h-1 bg-orange-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="w-1 h-1 bg-orange-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </motion.div>

        {/* Artist Header */}
        <motion.div
          className="flex items-center justify-between mb-4"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-orange-500/50 shadow-lg shadow-orange-500/25">
              <AvatarImage src="/placeholder.svg" alt="iCloud" />
              <AvatarFallback className="bg-gradient-to-br font-poppins from-orange-500 to-orange-400 text-white font-bold">
                iC
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white font-bold text-lg font-poppins">
                iCloud
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-orange-400 text-xs font-inter">
                  Pro Artist
                </span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-orange-400 font-bold text-lg font-inter">
              2.4K
            </div>
            <div className="text-gray-400 text-xs font-inter">Total Streams</div>
          </div>
        </motion.div>

        {/* Top Promoters */}
        <motion.div className="flex-1" variants={containerVariants}>
          <motion.div
            className="flex items-center gap-2 mb-3"
            variants={itemVariants}
          >
            <Users className="w-4 h-4 text-orange-400" />
            <span className="font-inter text-sm text-gray-300 font-medium">
              Top Promoters
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-500/30 to-transparent" />
          </motion.div>

          <motion.div
            className="space-y-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <PromoterRow
                avatar="/placeholder.svg"
                username="Adebayo_J"
                streams="1.2K"
                growth="+45%"
                rank={1}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <PromoterRow
                avatar="/placeholder.svg"
                username="Sarah_M"
                streams="980"
                growth="+32%"
                rank={2}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <PromoterRow
                avatar="/placeholder.svg"
                username="Mike_TM"
                streams="756"
                growth="+28%"
                rank={3}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <PromoterRow
                avatar="/placeholder.svg"
                username="Luna_Rose"
                streams="642"
                growth="+18%"
                rank={4}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Chart */}
        <motion.div className="h-24 relative" variants={itemVariants}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-gray-400 font-inter">Performance</span>
          </div>
          <div className="h-16 relative rounded-lg overflow-hidden bg-gradient-to-b from-orange-500/5 to-transparent">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#fb923c"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="none"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  </motion.div>
);

export default ArtistMockup;
