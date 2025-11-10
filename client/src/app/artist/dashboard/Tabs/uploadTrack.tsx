// components/UploadTrack.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUploadTrack } from '@/lib/queries/track-queries';
import { TrackUploadValidator, trackUploadSchema } from '@/lib/validators/track';
import { useTrackUploadState } from '@/lib/hooks/useTrackUpload';
import TrackUploadForm from '../components/TrackUploadForm';
import TrackPreviewModal from '../components/TrackPreviewModal';
import { ArrowLeft } from 'lucide-react';
import { UploadTrackData } from '@/helper/type';
import { toast } from 'sonner';

interface UploadTrackProps {
  onCancel?: () => void;
}

export default function UploadTrack({ onCancel }: UploadTrackProps) {
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const { mutate: uploadTrack, isPending: isLoading } = useUploadTrack();
  const {
    trackData,
    handleThumbnailChange,
    handleAudioChange,
    resetTrackData,
  } = useTrackUploadState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<TrackUploadValidator>({
    resolver: zodResolver(trackUploadSchema),
    mode: 'onChange',
  });

  const handlePreview = handleSubmit(() => {
    if (!trackData.track) {
      toast.warning('Please select an audio file');
      return;
    }
    setShowPreviewModal(true);
  });

  const handleSubmitTrack = handleSubmit(async (data) => {
    if (!trackData.track) {
      toast.warning('Please select an audio file');
      return;
    }

    // ✅ Create the correct data structure instead of FormData
    const uploadData: UploadTrackData = {
      title: data.title,
       genre: data.genre, 
      description: data.description,
      consent: data.consent,
      track: trackData.track,
      thumbnail: trackData.thumbnail,
    };

    uploadTrack(uploadData, {
      onSuccess: () => {
        setShowPreviewModal(false);
        handleCancel();
      },
    });
  });

  const handleCancel = () => {
    resetTrackData();
    reset();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="space-y-4">
      {onCancel && (
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Tracks
        </button>
      )}

      <TrackUploadForm
        register={register}
        errors={errors}
        trackData={trackData}
        onThumbnailChange={handleThumbnailChange}
        onAudioChange={handleAudioChange}
        onPreview={handlePreview}
        onCancel={handleCancel}
      />

      <TrackPreviewModal
  isOpen={showPreviewModal}
  formData={{
    ...watch(),           
    track: trackData.track,  
    thumbnail: trackData.thumbnail 
  }}
  onSubmit={handleSubmitTrack}
  onClose={() => setShowPreviewModal(false)}
  isLoading={isLoading}
/>
    </div>
  );
}