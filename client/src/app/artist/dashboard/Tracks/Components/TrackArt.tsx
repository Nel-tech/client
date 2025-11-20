import React, { memo, FC } from "react";
import Image from "next/image";

type TrackInfoProps = {
  title: string;
  thumbnail?: string;
};

const TrackArt: FC<TrackInfoProps> = memo(({ thumbnail, title }) => (
  <div className="relative h-64 bg-gradient-to-b from-gray-800 to-gray-900">
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={title}
          fill
          width={300}
          height={300}
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 512px"
        />
      ) : (
        <div className="w-40 h-40 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
          <span className="text-7xl font-bold text-white opacity-90">
            {title.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
  </div>
));

export default TrackArt;
