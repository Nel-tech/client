import { Plus } from 'lucide-react';
import TrackCard from '../components/TrackCard';
import { Button } from '@/components/ui/button';
import { useCurrentArtistTracks } from '@/lib/queries/track-queries';
import Spinner from '@/components/loader/spinner';
import { useState, useRef, useEffect, useCallback } from 'react';

interface TrackTabProps {
  onAddTrackClick: () => void;
}

function TrackTab({ onAddTrackClick }: TrackTabProps) {
  const [currentTrack, setCurrentTrack] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const { data: Tracks, isLoading, isError } = useCurrentArtistTracks();

  // Use requestAnimationFrame for smoother updates as fallback
  const updateTime = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      const time = audioRef.current.currentTime;
      console.log('RAF Update - Current Time:', time, 'Paused:', audioRef.current.paused);
      setCurrentTime(time);
      animationFrameRef.current = requestAnimationFrame(updateTime);
    }
  }, []);

  const handlePlayToggle = async (track: any) => {
    if (!audioRef.current) return;

    // Same track toggle
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          animationFrameRef.current = requestAnimationFrame(updateTime);
        } catch (error) {
          console.error('Play failed:', error);
        }
      }
      return;
    }

    // Different track - stop current animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setCurrentTrack(track);
    setIsPlaying(false);
    setCurrentTime(0);
    
    audioRef.current.src = track.trackUrl;
    audioRef.current.load();

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      animationFrameRef.current = requestAnimationFrame(updateTime);
    } catch (error) {
      console.error('Playback failed:', error);
      setIsPlaying(false);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    const handlePause = () => {
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      // Start animation frame loop
      animationFrameRef.current = requestAnimationFrame(updateTime);
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('error', handleError);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateTime]);

  if (isLoading) return <div className="flex justify-center items-center h-52"><Spinner /></div>;
  if (isError) return <div className="flex flex-col items-center space-y-3 py-16 text-gray-400 text-center"><p className="text-red-500">Failed to fetch tracks.</p></div>;

  const trackList = Tracks?.tracks ?? [];

  return (
    <div className="space-y-10 text-white">
      <audio 
        ref={audioRef} 
        preload="metadata"
      />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold">Tracks</h1>
          <p className="text-sm text-gray-400 mt-1">Manage & showcase your music collection</p>
        </div>

        <Button onClick={onAddTrackClick} className="bg-[#ff6b35] text-white px-4 py-2 rounded-md hover:bg-[#e55a2b] flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Track
        </Button>
      </div>

      {trackList.length === 0 ? (
        <div className="flex flex-col items-center text-center py-24 space-y-3">
          <h2 className="text-2xl font-bold text-white/90">No tracks uploaded yet 🎧</h2>
          <p className="text-sm text-gray-500 max-w-xs">Your audience is waiting — drop your first release.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {trackList.map(track => (
            <TrackCard
              key={track.id}
              track={track}
              isPlaying={currentTrack?.id === track.id && isPlaying}
              currentTime={currentTrack?.id === track.id ? currentTime : 0}
              onPlayToggle={handlePlayToggle}
              onSeek={handleSeek}
              onEdit={(id) => console.log('Edit track', id)}
              onDelete={(id) => console.log('Delete track', id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TrackTab;