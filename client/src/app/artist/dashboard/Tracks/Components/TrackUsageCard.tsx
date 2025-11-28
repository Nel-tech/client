// components/artist/TrackTab/TrackUsageCard.tsx
"use client";
import { Music, TrendingUp, Crown } from "lucide-react";
import { useRouter } from "next/navigation";

interface TrackUsageCardProps {
  tier: string;
  trackCount: number;
}

const TRACK_LIMITS = {
  BASIC: 5,
  PREMIUM: 20,
  PRO: 100,
};

const TIER_INFO = {
  BASIC: {
    name: "Basic",
    color: "from-gray-500 to-gray-600",
    icon: Music,
  },
  PREMIUM: {
    name: "Premium",
    color: "from-purple-500 to-pink-500",
    icon: TrendingUp,
  },
  PRO: {
    name: "Pro",
    color: "from-yellow-500 to-orange-500",
    icon: Crown,
  },
};

export default function TrackUsageCard({ tier, trackCount }: TrackUsageCardProps) {
  const router = useRouter();
  
  const limit = TRACK_LIMITS[tier as keyof typeof TRACK_LIMITS] || 5;
  const percentage = (trackCount / limit) * 100;
  const tierInfo = TIER_INFO[tier as keyof typeof TIER_INFO] || TIER_INFO.BASIC;
  const TierIcon = tierInfo.icon;

  const isNearLimit = percentage >= 80;
  const isAtLimit = trackCount >= limit;

  return (
    <div className="  p-6 ">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Section - Usage Info */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${tierInfo.color}`}>
              <TierIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Track Usage
              </h3>
              <p className="text-sm text-gray-400">
                {tierInfo.name} Plan
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">
                {trackCount} of {limit} tracks used
              </span>
              <span className={`font-semibold ${
                isAtLimit ? "text-[#ff6b35]" : 
                isNearLimit ? "text-[#ff6b35]" : 
                "text-[#ff6b35]"
              }`}>
                {percentage.toFixed(0)}%
              </span>
            </div>
            
            <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isAtLimit ? "bg-[#ff6b35]" :
                  isNearLimit ? "bg-[#ff6b35]" :
                  "bg-[#ff6b35]"
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>

            {isNearLimit && (
              <p className="text-xs text-[#ff6b35] flex items-center gap-1 mt-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff6b35] animate-pulse" />
                {isAtLimit ? "You've reached your upload limit" : "You're close to your upload limit"}
              </p>
            )}
          </div>
        </div>

        {/* Right Section - Upgrade CTA */}
        {tier !== "PRO" && isNearLimit && (
          <div className="lg:w-64">
            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#ff6b35]" />
                <h4 className="text-sm font-semibold text-white">
                  Need more tracks?
                </h4>
              </div>
              <p className="text-xs text-gray-300">
                Upgrade to {tier === "BASIC" ? "Premium" : "Pro"} and get {tier === "BASIC" ? "20" : "100"} track uploads!
              </p>
              <button
                onClick={() => router.push("/artist/subscription")}
                className="w-full px-4 py-2 bg-[#ff6b35] hover:bg-[#ff6b35] text-white text-sm font-medium rounded-lg transition-all shadow-lg hover:shadow-purple-500/50"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}