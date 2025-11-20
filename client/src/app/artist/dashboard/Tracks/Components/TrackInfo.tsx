import React, { memo } from "react";

type TrackInfoProps = {
  title: string;
  artist?: string;
};

const TrackInfo = memo(function TrackInfo({ title, artist }: TrackInfoProps) {
  return (
    <div className="text-center space-y-1">
      <h2 className="text-2xl font-bold text-white truncate max-w-full">
        {title}
      </h2>
      <p className="text-sm text-gray-400">
        {artist || "Unknown Artist"}
      </p>
    </div>
  );
});

export default TrackInfo;
