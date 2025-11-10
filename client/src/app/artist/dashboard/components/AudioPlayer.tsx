// components/AudioPlayer.tsx
import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  audioFile: File | null;
  className?: string;
}

export default function AudioPlayer({ audioFile, className = '' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
 const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      setAudioUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [audioFile]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  if (!audioFile) return null;

  return (
    <div className={`bg-muted/50 rounded-lg p-4 ${className}`}>
    {audioUrl && (
  <audio
    ref={audioRef}
    src={audioUrl}
    onEnded={handleAudioEnd}
    className="hidden"
  />
)}
     <Button
  onClick={toggleAudio}
  type="button"
  className="w-full flex items-center justify-center gap-3 bg-[#FF6B35] hover:bg-[#ff814e] text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 font-medium"
>
  {isPlaying ? (
    <>
      <Pause className="h-5 w-5" />
      Pause Preview
    </>
  ) : (
    <>
      <Play className="h-5 w-5" />
      Play Preview
    </>
  )}
</Button>

    </div>
  );
}