// hooks/useTrackUploadState.ts
import { useState } from 'react';
import { UploadTrackData } from '../../helper/type';

export function useTrackUploadState() {
  const [trackData, setTrackData] = useState<UploadTrackData>({
    title: '',
    description: '',
    genre: '',
    consent: false,
    track: null,
    thumbnail: null,
  });

  const handleThumbnailChange = (file: File | null) => {
    if (trackData.thumbnail && !file) {
      const oldPreview = trackData.thumbnail;
      if (oldPreview instanceof File) {
      }
    }

    setTrackData((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const handleAudioChange = (file: File | null) => {
    console.log('handleAudioChange called with:', file);
    setTrackData((prev) => ({
      ...prev,
      track: file, 
    }));
  };

  const resetTrackData = () => {
    setTrackData({
      title: '',
      description: '',
      genre: '',
      consent: false,
      track: null,
      thumbnail: null,
    });
  };

  return {
    trackData,
    handleThumbnailChange,
    handleAudioChange,
    resetTrackData,
  };
}
