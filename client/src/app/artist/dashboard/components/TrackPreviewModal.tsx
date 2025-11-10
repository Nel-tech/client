import { X, Loader2, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import { TrackPreviewModalProps } from "../../../../helper/type";
import AudioPlayer from "./AudioPlayer";

export default function TrackPreviewModal({
  isOpen,
  formData,
  onSubmit,
  onClose,
  isLoading,
}: TrackPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-200 max-h-[90vh] overflow-y-auto animate-in fade-in-10 slide-in-from-bottom-5">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-2xl">
          <h2 className="text-xl font-semibold text-gray-900">Preview Track</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Thumbnail Preview */}
      {formData.thumbnail && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Thumbnail</label>
              <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src={URL.createObjectURL(formData.thumbnail)}
                  alt="Track thumbnail"
                  className="w-full h-48 object-cover"
                  width={400}
                  height={192}
                />
              </div>
            </div>
          )}


          {/* Track Info */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Title
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {formData.title}
              </p>
            </div>

            {formData.description && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Description
                </label>
                <p className="text-sm text-gray-600">{formData.description}</p>
              </div>
            )}

            {formData.title && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Audio File
                </label>
                <p className="text-sm text-gray-800">{formData.title}</p>
              </div>
            )}
          </div>

          {/* Audio Player */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <AudioPlayer audioFile={formData.track} />
          </div>

          

{/* Consent Info */}
<div className="bg-white border border-white rounded-lg p-4">
  <p className="text-sm text-[#FF6B35] font-medium flex items-center gap-2">
    {formData.consent ? (
      <CheckCircle2 className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    )}
    You confirm that you are the sole owner of this track and have the right to distribute it.
  </p>
</div>

      

{/* Actions */}
<div className="flex gap-3 pt-4 border-t border-gray-200">
  <button
    onClick={onSubmit}
    disabled={isLoading}
    type="button"
    className="relative flex-1 bg-[#FF6B35] text-white px-6 py-3 rounded-lg hover:bg-[#ff814e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 font-medium overflow-hidden"
  >
    {/* Loading Spinner */}
    {isLoading && (
      <span className="absolute inset-0 flex items-center justify-center bg-[#FF6B35]">
        <Loader2 className="h-5 w-5 animate-spin" />
      </span>
    )}
    
    {/* Button Text */}
    <span className={isLoading ? 'invisible' : ''}>
      Upload Track
    </span>
  </button>
  
  <button
    onClick={onClose}
    disabled={isLoading}
    type="button"
    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1"
  >
    Back
  </button>
</div>
        </div>
      </div>
    </div>
  );
}
