// components/artist/TrackTab/TrackHeader.tsx
import UploadButtonWithTooltip from "./UploadButtonWithTooltip";

interface TrackHeaderProps {
  tier: string;
  trackCount: number;
}

export default function TrackHeader({ tier, trackCount }: TrackHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Tracks
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage & showcase your music collection
        </p>
      </div>
      <UploadButtonWithTooltip tier={tier} trackCount={trackCount} />
    </div>
  );
}