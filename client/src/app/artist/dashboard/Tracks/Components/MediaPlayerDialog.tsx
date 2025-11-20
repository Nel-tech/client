// components/artist/TrackTab/EnhancedMediaPlayer.tsx
"use client";

import { RefObject, memo, useState, useCallback } from "react";
import { Track } from "@/helper/type";
import { X } from "lucide-react";
import TrackArt from "./TrackArt";
import TrackInfo from "./TrackInfo";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import VolumeControl from "./VolumeControl";

interface EnhancedMediaPlayerProps {
  audioRef: RefObject<HTMLAudioElement | null>;
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  handlePlayToggle: (track: Track) => void;
  handleSeek: (time: number) => void;
  handleClosePlayer: () => void;
  handleVolumeChange: (volume: number) => void; // volume: 0–1
}
const EnhancedMediaPlayer = memo(function EnhancedMediaPlayer({
  audioRef,
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  handlePlayToggle,
  handleSeek,
  handleClosePlayer,
  handleVolumeChange,
}: EnhancedMediaPlayerProps) {
  // All hooks at the top — ALWAYS unconditional
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const formatTime = useCallback((time: number) => {
    if (!isFinite(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const skipTime = useCallback((seconds: number) => {
    const newTime = Math.max(0, Math.min(currentTime + seconds, duration));
    handleSeek(newTime);
  }, [currentTime, duration, handleSeek]); // deps are stable enough

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  }, [audioRef, volume, isMuted]);

  const onVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    handleVolumeChange(newVol);
    setIsMuted(newVol === 0);
  }, [handleVolumeChange]);

  // Early return AFTER all hooks
  if (!currentTrack) {
    return <audio ref={audioRef} preload="metadata" />;
  }

  return (
    <>
      <audio ref={audioRef} preload="metadata" />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <button
            onClick={handleClosePlayer}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors"
            aria-label="Close player"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>

          <TrackArt thumbnail={currentTrack.thumbnail} title={currentTrack.title} />

          <div className="p-6 pt-4 space-y-6">
            <TrackInfo title={currentTrack.title} artist={currentTrack.artist?.stageName} />

            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
              formatTime={formatTime}
            />

            <Controls
              isPlaying={isPlaying}
              onPlayToggle={() => handlePlayToggle(currentTrack)}
              onSkipBack={() => skipTime(-10)}
              onSkipForward={() => skipTime(10)}
            />

            <VolumeControl
              volume={isMuted ? 0 : volume}
              isMuted={isMuted || volume === 0}
              onVolumeChange={onVolumeChange}
              onMuteToggle={toggleMute}
            />
          </div>
        </div>
      </div>
    </>
  );
},
(prev, next) => {
  return (
    prev.currentTrack?.id === next.currentTrack?.id &&
    prev.isPlaying === next.isPlaying &&
    prev.duration === next.duration &&
    Math.abs(prev.currentTime - next.currentTime) < 0.3 &&
    prev.currentTrack?.title === next.currentTrack?.title &&
    prev.currentTrack?.thumbnail === next.currentTrack?.thumbnail
  );
});