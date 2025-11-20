// components/artist/TrackTab/UploadButtonWithTooltip.tsx
"use client";
import { useState } from "react";
import { Upload, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface UploadButtonWithTooltipProps {
  tier: string;
  trackCount: number;
}

const TRACK_LIMITS = {
  BASIC: 5,
  PREMIUM: 20,
  PRO: 100,
};

export default function UploadButtonWithTooltip({
  tier,
  trackCount,
}: UploadButtonWithTooltipProps) {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);

  const limit = TRACK_LIMITS[tier as keyof typeof TRACK_LIMITS] || 5;
  const hasReachedLimit = trackCount >= limit;
  const canUpload = !hasReachedLimit;

  const handleUploadClick = () => {
    if (canUpload) {
      router.push("/artist/tracks/upload");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleUploadClick}
        onMouseEnter={() => hasReachedLimit && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled={hasReachedLimit}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all
          ${
            canUpload
              ? "bg-[#ff6b35]  text-white shadow-lg hover:shadow-purple-500/50"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        {hasReachedLimit ? (
          <>
            <Lock className="w-5 h-5" />
            <span>Upload Limit Reached</span>
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            <span>Upload Track</span>
          </>
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && hasReachedLimit && (
        <div className="absolute top-full mt-2 right-0 z-50 w-72 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
          <div className="space-y-2">
            <p className="text-sm text-gray-300 font-medium">
              You&apos;ve reached your {tier} plan limit
            </p>
            <p className="text-xs text-gray-400">
              You have {trackCount} of {limit} tracks. Upgrade to upload more tracks.
            </p>
            <button
              onClick={() => router.push("/artist/subscription")}
              className="w-full mt-3 px-4 py-2 bg-[#ff6b35] text-white text-sm font-medium rounded-lg transition-all"
            >
              Upgrade Plan
            </button>
          </div>
          {/* Arrow */}
          <div className="absolute -top-2 right-6 w-4 h-4 bg-gray-800 border-l border-t border-gray-700 transform rotate-45" />
        </div>
      )}
    </div>
  );
}