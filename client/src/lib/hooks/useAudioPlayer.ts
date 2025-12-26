// hooks/useAudioPlayer.ts
import { useRef, useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Track } from '@/lib/api/endpoints/track/type';

export function useAudioPlayer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Throttle timeupdate to ~15 FPS max (smooth + performant)
  const throttleRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);

  const THROTTLE_MS = 66; // ~15 FPS (1000/15 ≈ 66ms)

  const updateURL = useCallback(
    (track: Track | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (track) {
        params.set('track', track.id);
        params.set(
          'slug',
          track.slug || track.title.toLowerCase().replace(/\s+/g, '-')
        );
        router.push(`?${params.toString()}`, { scroll: false });
      } else {
        router.push('?', { scroll: false });
      }
    },
    [router, searchParams]
  );

  const handlePlayToggle = async (track: Track) => {
    if (!audioRef.current) return;

    // Same track → toggle play/pause
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        try {
          await audioRef.current.play();
        } catch (err) {
          console.error('Playback failed:', err);
        }
      }
      return;
    }

    // New track
    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
    updateURL(track);

    audioRef.current.src = track.trackUrl;
    audioRef.current.load();

    try {
      await audioRef.current.play();
    } catch (err) {
      console.error('Playback failed:', err);
      setIsPlaying(false);
    }
  };

  const handleSeek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time); // Instant feedback
    }
  }, []);

  const handleClosePlayer = () => {
    audioRef.current?.pause();
    audioRef.current!.src = ''; // Free memory
    setCurrentTrack(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    updateURL(null);
  };

  const handleVolumeChange = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  // === Native Events Only (No rAF!) ===
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(duration || audio.duration);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Throttled timeupdate (optional but recommended)
    const handleTimeUpdate = () => {
      const now = Date.now();
      if (now - lastUpdateRef.current > THROTTLE_MS) {
        lastUpdateRef.current = now;
        setCurrentTime(audio.currentTime);
      }
      // Always request next if playing
      if (!audio.paused && !audio.ended) {
        throttleRef.current = requestAnimationFrame(handleTimeUpdate);
      }
    };

    const startTimeTracking = () => {
      if (throttleRef.current) cancelAnimationFrame(throttleRef.current);
      lastUpdateRef.current = 0;
      throttleRef.current = requestAnimationFrame(handleTimeUpdate);
    };

    const stopTimeTracking = () => {
      if (throttleRef.current) {
        cancelAnimationFrame(throttleRef.current);
        throttleRef.current = null;
      }
      // Final sync on pause/seek/end
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', startTimeTracking);
    audio.addEventListener('playing', startTimeTracking); // For when autoplay resumes
    audio.addEventListener('pause', stopTimeTracking);
    audio.addEventListener('ended', stopTimeTracking);
    audio.addEventListener('seeking', stopTimeTracking);
    audio.addEventListener('seeked', () => setCurrentTime(audio.currentTime));

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', startTimeTracking);
      audio.removeEventListener('playing', startTimeTracking);
      audio.removeEventListener('pause', stopTimeTracking);
      audio.removeEventListener('ended', stopTimeTracking);
      audio.removeEventListener('seeking', stopTimeTracking);
      audio.removeEventListener('seeked', () => {});
      if (throttleRef.current) cancelAnimationFrame(throttleRef.current);
    };
  }, [duration]);

  return {
    audioRef,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    handlePlayToggle,
    handleSeek,
    handleClosePlayer,
    handleVolumeChange,
  };
}
