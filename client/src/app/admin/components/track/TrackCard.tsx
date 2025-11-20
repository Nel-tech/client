// components/track/TrackCard.tsx
'use client';

import { Play, Pause, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Waveform from './Waveform';
import type { Track } from '@/helper/mock';
import Image from 'next/image';
import { useTracksByStatus } from '@/lib/queries/admin-queries';

interface Props {
  track: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export default function TrackCard({
  track,
  isPlaying,
  onTogglePlay,
  onApprove,
  onReject,
}: Props) {

  const {data} = useTracksByStatus()
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-card border-border">
      <div className="flex items-center gap-6">
        {/* Thumbnail + Play overlay */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted">
            <Image
              src={data?.track.thumbnail}
              alt={track.title}
              className="w-full h-full object-cover"
              width={300}
              height={300}
            />
            <button
              onClick={onTogglePlay}
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white" />
              )}
            </button>
          </div>

          <Waveform isPlaying={isPlaying} />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{data?.track.title}</h3>
          {/* <p className="text-muted-foreground mb-2">{data?.track.artist}</p> */}
          <div className="flex items-center gap-3 text-sm">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {data?.track.genre}
            </Badge>
            <span className="text-muted-foreground">{data?.track?.duration}</span>
            <span className="text-muted-foreground">uploaded {data?.track.createdAt}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={onApprove}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-base font-semibold"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Approve
          </Button>
          <Button
            onClick={onReject}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-base font-semibold"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Reject
          </Button>
        </div>
      </div>
    </Card>
  );
}