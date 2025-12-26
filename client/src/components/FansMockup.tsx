import React from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

const PhoneMockup = () => (
  <div className="relative w-[340px] h-[640px] mx-auto md:w-[360px] md:h-[680px] sm:w-[300px] sm:h-[580px] max-sm:w-[260px] max-sm:h-[500px] flex justify-center items-center">
    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-[42px] p-4 shadow-2xl border-4 border-gray-700">
      

      <div className="relative w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-[34px] overflow-hidden">
        
        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto overscroll-contain scrollbar-hide px-5 py-6">
          
          {/* Content */}
          <div className="text-center text-white w-full">
            
            {/* Header */}
            <div className="mb-8">
              <div className="text-base font-poppins opacity-90">
                Your Listening Activity
              </div>

              <div className="text-4xl font-poppins font-black drop-shadow-lg mt-1">
                2h 45m
              </div>

              <div className="mt-2 text-xs font-poppins opacity-70">
                Total time spent listening this week
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 w-full">
              <div className="text-sm font-poppins font-medium text-left text-white/80">
                What you can do:
              </div>

              {/* Feature Cards */}
              {[
                {
                  icon: '🎧',
                  title: 'Discover New Music',
                  desc: 'Listen to tracks from talented emerging artists.',
                },
                {
                  icon: '🎶',
                  title: 'Listen & Get Rewarded',
                  desc: 'Enjoy music and receive rewards for your listening time.',
                },
                {
                  icon: '📱',
                  title: 'Redeem Your Rewards',
                  desc: 'Convert rewards into mobile airtime and real benefits.',
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-white/20 p-4 flex items-center gap-3 text-left"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-sm font-poppins font-semibold">
                      {item.title}
                    </span>
                    <p className="text-xs font-poppins opacity-80 leading-tight">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Spacer to ensure scroll */}
            <div className="h-16" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50">
          <ChevronDown className="w-4 h-4 animate-bounce" />
          <span className="text-[10px] font-poppins tracking-wide">
            Scroll
          </span>
        </div>
      </div>
    </div>

    {/* Ambient Activity Effects */}
    <div className="absolute top-[12%] right-[8%] w-10 h-10 rounded-full bg-orange-500/20 animate-pulse" />
    <div className="absolute bottom-[18%] left-[6%] w-7 h-7 rounded-full bg-orange-400/10 animate-ping" />
  </div>
);

export default PhoneMockup;
