import { Camera } from 'lucide-react';
import Image from 'next/image';

interface ProfileImageSectionProps {
  profilePic?: string | null;
  isEditing: boolean;
  isUploading: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileImageSection = ({
  profilePic,
  isEditing,
  isUploading,
  onImageUpload,
}: ProfileImageSectionProps) => (
  <div className="flex justify-center mb-8">
    <div className="relative">
      <Image
        src={profilePic || '/images/placeholder.png'}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
        width={96}
        height={96}
      />
      {isEditing && (
        <label className="absolute bottom-0 right-0 bg-[#ff6b35] text-white p-2 rounded-full hover:bg-[#e55a2b] transition-colors shadow-lg cursor-pointer">
          {isUploading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Camera className="h-4 w-4" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  </div>
);
