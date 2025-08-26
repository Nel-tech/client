import React from 'react';
// Assuming FloatingCoinProps is correctly defined in your helper file
import { FloatingCoinProps } from '@/helper/helper';
import { Card } from '@/components/ui/card';

// The FloatingCoin component remains the same. It's perfect.
const FloatingCoin = ({ className, delay = 0 }: FloatingCoinProps) => (
  <div
    className={`absolute w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-bounce md:w-10 md:h-10 sm:w-8 sm:h-8 max-sm:w-6 max-sm:h-6 ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: '3s',
      animationIterationCount: 'infinite',
    }}
  >
    <span className="md:text-base sm:text-sm max-sm:text-xs">₵</span>
  </div>
);

// The main PhoneMockup component with updated content
const PhoneMockup = () => (
  <div className="relative w-[300px] h-[600px] mx-auto md:w-[300px] md:h-[600px] sm:w-[260px] sm:h-[520px] max-sm:w-[220px] max-sm:h-[440px] flex justify-center items-center">
    {/* Phone Frame (This part is great, no changes needed) */}
    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-[40px] p-5 shadow-2xl border-4 border-gray-700 md:rounded-[40px] md:p-5 md:border-4 sm:rounded-[32px] sm:p-4 sm:border-3 max-sm:rounded-[28px] max-sm:p-3 max-sm:border-2">
      {/* Screen (Same styling, new content) */}
      <div className="w-full h-full bg-gradient-to-r from-orange-500 bg-clip-text text-transparent rounded-[30px] relative overflow-hidden flex flex-col items-center justify-center p-6 md:rounded-[30px] md:p-6 sm:rounded-[24px] sm:p-5 max-sm:rounded-[20px] max-sm:p-4">
        {/* --- START: NEW CONTENT --- */}
        <div className="text-center text-white z-10 w-full">
          {/* 1. Header and Coin Balance */}
          <div className="mb-8 md:mb-8 sm:mb-6 max-sm:mb-4">
            <div className="text-base font-poppins opacity-90 md:text-base sm:text-sm max-sm:text-xs">
              Your Balance
            </div>
            <div className="text-5xl font-poppins font-black drop-shadow-lg flex items-center justify-center gap-2 md:text-5xl sm:text-4xl max-sm:text-3xl">
              2,450{' '}
              <span className="text-4xl text-orange-500 md:text-4xl sm:text-3xl max-sm:text-2xl">
                ₵
              </span>
            </div>
          </div>

          {/* 2. List of Actions / Features */}
          <div className="space-y-4 w-full md:space-y-4 sm:space-y-3 max-sm:space-y-2">
            <div className="text-sm font-poppins font-medium text-left text-white/80 md:text-sm sm:text-xs max-sm:text-[10px]">
              What you can do:
            </div>

            {/* Feature 1: Discover Music */}
            <Card className="bg-white/20 backdrop-blur-sm border-white/20 p-4 flex items-center gap-3 text-left md:p-4 md:gap-3 sm:p-3 sm:gap-2.5 max-sm:p-2.5 max-sm:gap-2">
              <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center text-xl shrink-0 md:w-10 md:h-10 md:text-xl sm:w-8 sm:h-8 sm:text-lg max-sm:w-6 max-sm:h-6 max-sm:text-sm">
                🎧
              </div>
              <div>
                <span className="text-sm font-poppins font-semibold md:text-sm sm:text-xs max-sm:text-[10px]">
                  Discover Music
                </span>
                <p className="text-xs font-poppins opacity-80 leading-tight md:text-xs sm:text-[10px] max-sm:text-[9px]">
                  Find and listen to tracks from upcoming artists.
                </p>
              </div>
            </Card>

            {/* Feature 2: Share & Earn */}
            <Card className="bg-white/20 backdrop-blur-sm border-white/20 p-4 flex items-center gap-3 text-left md:p-4 md:gap-3 sm:p-3 sm:gap-2.5 max-sm:p-2.5 max-sm:gap-2">
              <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center text-xl shrink-0 md:w-10 md:h-10 md:text-xl sm:w-8 sm:h-8 sm:text-lg max-sm:w-6 max-sm:h-6 max-sm:text-sm">
                🚀
              </div>
              <div>
                <span className="text-sm font-poppins font-semibold md:text-sm sm:text-xs max-sm:text-[10px]">
                  Share & Earn Coins
                </span>
                <p className="text-xs font-poppins opacity-80 leading-tight md:text-xs sm:text-[10px] max-sm:text-[9px]">
                  Promote music with your unique link to get rewards.
                </p>
              </div>
            </Card>

            {/* Feature 3: Redeem Airtime */}
            <Card className="bg-white/20 backdrop-blur-sm border-white/20 p-4 flex items-center gap-3 text-left md:p-4 md:gap-3 sm:p-3 sm:gap-2.5 max-sm:p-2.5 max-sm:gap-2">
              <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center text-xl shrink-0 md:w-10 md:h-10 md:text-xl sm:w-8 sm:h-8 sm:text-lg max-sm:w-6 max-sm:h-6 max-sm:text-sm">
                📱
              </div>
              <div>
                <span className="text-sm font-poppins font-semibold md:text-sm sm:text-xs max-sm:text-[10px]">
                  Redeem Airtime
                </span>
                <p className="text-xs font-poppins opacity-80 leading-tight md:text-xs sm:text-[10px] max-sm:text-[9px]">
                  Cash out your coins for mobile airtime. Real rewards.
                </p>
              </div>
            </Card>
          </div>
        </div>
        {/* --- END: NEW CONTENT --- */}
      </div>
    </div>

    {/* Floating Coins (This part is great, no changes needed) */}
    <FloatingCoin className="top-[10%] right-[10%]" delay={0} />
    <FloatingCoin className="top-[60%] right-[5%]" delay={1} />
    <FloatingCoin className="top-[30%] -left-2" delay={2} />
  </div>
);

export default PhoneMockup;
