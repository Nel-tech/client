"use client";

import { motion } from "framer-motion";
import Feature from "@/components/Feature";
import PhoneMockup from "@/components/FansMockup";
import ArtistMockup from "@/components/ArtistMockup";

export function FeatureSection() {
  return (
    <section className="bg-gradient-to-b mt-[4rem] from-gray-900 via-black to-black border-t border-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        
        {/* Animated Heading */}
        <motion.h1
          className="font-poppins text-4xl text-center font-black text-transparent 
                     sm:text-5xl lg:text-6xl 
                     bg-clip-text bg-gradient-to-r from-white to-gray-400"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          WHY TROPIQK STANDS OUT
        </motion.h1>

        {/* Feature - Artists */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Feature
            title="Identify Your Superfans"
            subtitle="For Artists"
            description="Stop guessing who your biggest supporters are. Tropiqk's dashboard shows you exactly which fans are driving the most streams, turning passive analytics into a powerful community-building tool."
            points={[
              { label: "Top Promoter Analytics:", text: "See a ranked leaderboard of your most influential fans." },
              { label: "Actionable Insights:", text: "Discover which tracks are being shared the most and by whom." },
            ]}
            buttonText="See Artist Plans"
            buttonHref="/pricing"
            media={<ArtistMockup />}
            buttonVariant="outline"
          />
        </motion.div>

        {/* Feature - Fans */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Feature
            title="Get Rewarded For Your Influence"
            subtitle="For Fans"
            description="Your passion for music has real value. On Tropiqk, you earn tangible rewards like mobile airtime just for sharing and promoting the music you love."
            points={[
              { label: "Share & Earn:", text: "Get a unique link for any track and earn coins when your friends listen." },
              { label: "Real Rewards:", text: "Redeem your coins for mobile airtime and other valuable rewards." },
            ]}
            buttonText="Start Earning"
            buttonHref="/register"
            media={<PhoneMockup />}
            reverse
          />
        </motion.div>
      </div>
    </section>
  );
}
