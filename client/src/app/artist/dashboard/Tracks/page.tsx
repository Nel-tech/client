// components/artist/TrackTab/TrackTab.tsx
"use client";
import { useCurrentArtistTracks, useArtistPermissions } from '@/lib/queries/track-queries';
import TrackList from "./Components/TrackList";
import TrackUsageCard from "./Components/TrackUsageCard";
import TrackHeader from "./Components/TrackHeader";
import { useAudioPlayer } from "@/lib/hooks/useAudioPlayer";
import EnhancedMediaPlayer from "./Components/MediaPlayerDialog";



export default function TrackTab() {
  const { data: tracksData, isLoading, isError } = useCurrentArtistTracks();
  const { data: permissionInfo } = useArtistPermissions();
  const tracks = tracksData?.tracks || [];
  const tier = permissionInfo?.data?.tier ?? "BASIC";
  const audioPlayer = useAudioPlayer();

  return (
    <>
      {/* Beautiful Media Player Dialog - shows when a track is playing */}
      <EnhancedMediaPlayer {...audioPlayer} />
      
      <div className="space-y-6 text-white">
        {/* Header with Upload Button (UploadButtonWithTooltip is inside TrackHeader) */}
        <TrackHeader 
          tier={tier} 
          trackCount={tracks.length} 
        />
        
        {/* Track Usage Progress Card */}
        <TrackUsageCard tier={tier} trackCount={tracks.length} />
        
        {/* List of all tracks  */}
        <TrackList
          tracks={tracks}
          isLoading={isLoading}
          isError={isError}
          currentTrackId={audioPlayer.currentTrack?.id}
          isPlaying={audioPlayer.isPlaying}
          currentTime={audioPlayer.currentTime}
          onPlayToggle={audioPlayer.handlePlayToggle}
          onSeek={audioPlayer.handleSeek}
        />

        {/* Editing Tracks */}

        {/* <EditTrackDetails trackid={trackid as string} /> */}

       
      </div>
    </>
  );
}