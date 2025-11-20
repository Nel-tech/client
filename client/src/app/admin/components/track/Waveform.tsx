// components/track/Waveform.tsx
'use client';

import clsx from 'clsx';

interface Props {
  isPlaying: boolean;
}

export default function Waveform({ isPlaying }: Props) {
  return (
    <div className="flex items-center gap-1 h-20">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'w-1 rounded-full transition-all',
            isPlaying ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'
          )}
          style={{ height: `${Math.random() * 60 + 20}%` }}
        />
      ))}
    </div>
  );
}