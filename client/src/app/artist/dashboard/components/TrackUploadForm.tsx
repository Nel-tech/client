// components/TrackUploadForm.tsx
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TrackUploadValidator } from '@/lib/validators/track';
import FileUpload from './FileUpload';
import { Button } from '@/components/ui/button';
import { UploadTrackData } from '@/helper/type';


interface TrackUploadFormProps {
  register: UseFormRegister<TrackUploadValidator>;
  errors: FieldErrors<TrackUploadValidator>;
  trackData: UploadTrackData;
  onThumbnailChange: (file: File | null) => void;
  onAudioChange: (file: File | null) => void;
  onPreview: () => void;
  onCancel: () => void;
  maxAudioSizeMB?: number;
}

export default function TrackUploadForm({
  register,
  errors,
  trackData,
  onThumbnailChange,
  onAudioChange,
  onPreview,
  onCancel,
  maxAudioSizeMB, 
}: TrackUploadFormProps) {
  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Upload New Track</h1>

      <form onSubmit={onPreview} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Track Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter track title"
            className="w-full p-3 border border-border rounded-xl"
            {...register('title')}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            placeholder="Tell your fans about this track..."
            rows={4}
            className="w-full p-3 border border-border rounded-xl"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-2">Thumbnail Image</label>
          <FileUpload
            type="thumbnail"
            file={trackData.thumbnail}
             preview={trackData.thumbnail ? URL.createObjectURL(trackData.thumbnail) : null}
            onFileChange={onThumbnailChange}
          />
        </div>

        {/* Genre */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium mb-2">
            Genre <span className="text-red-500">*</span>
          </label>
          <select
            id="genre"
            {...register('genre')}
            className="w-full bg-white/5 border border-white/20 text-white focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] focus:outline-none rounded-md px-3 py-2"
          >
            <option value="" className="bg-gray-800 text-gray-400">
              Select your genre
            </option>
            <option value="Afrobeats" className="bg-gray-800 text-white">
              Afrobeats
            </option>
            <option value="Hip_Hop" className="bg-gray-800 text-white">
              Hip Hop
            </option>
          </select>
          {errors.genre && (
            <p className="mt-1 text-sm text-red-500">{errors.genre.message}</p>
          )}
        </div>

        {/* Audio Upload - Pass maxAudioSizeMB here */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Audio File <span className="text-red-500">*</span>
          </label>
          <FileUpload
            type="audio"
            file={trackData.track}
            onFileChange={onAudioChange}
            maxAudioSizeMB={maxAudioSizeMB} 
          />
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3 p-4 rounded-lg">
          <input
            type="checkbox"
            id="consent"
            className="mt-1 w-4 h-4 cursor-pointer"
            {...register('consent')}
          />
          <label htmlFor="consent" className="text-sm cursor-pointer flex-1">
            I confirm that I am the sole owner of this track and have the right to
            distribute it. I understand that uploading content I don&apos;t own may result
            in account suspension.
          </label>
        </div>
        {errors.consent && (
          <p className="text-red-500 text-sm">{errors.consent.message}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            type="submit"
            className="flex-1 bg-[#FF6B35] text-white px-4 py-3 rounded-lg cursor-pointer font-medium transition-all duration-300 transform hover:-translate-y-1 hover:bg-[#ff814e] disabled:opacity-50"
          >
            Preview Track
          </Button>

          <Button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-border rounded-lg hover:bg-muted text-white transition-all duration-300 transform hover:-translate-y-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}