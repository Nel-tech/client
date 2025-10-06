import { ProfileImageSection } from './ProfileImageSection';
import { ProfileFormFields } from './ProfileFormFields';
import { ArtistFormData, UserData } from '@/helper/type';

interface ProfileContentProps {
  isEditing: boolean;
  userData:UserData ;
  artistFormData: ArtistFormData;
  onUserInputChange: (field: string, value: string) => void;
  onArtistInputChange: (field: string, value: string) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  user: any;
  artist: any;
  emailFlow: any;
  isSaving: boolean;
  isUploadingImage: boolean;
}

export const ProfileContent = ({
  isEditing,
  userData,
  artistFormData,
  onUserInputChange,
  onArtistInputChange,
  onImageUpload,
  onSave,
  user,
  artist,
  emailFlow,
  isSaving,
  isUploadingImage,
}: ProfileContentProps) => (
  
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
    <ProfileImageSection
      profilePic={artist?.profilePic}
      isEditing={isEditing}
      isUploading={isUploadingImage}
      onImageUpload={onImageUpload}
    />

  <ProfileFormFields
      isEditing={isEditing}
      userData={userData}
      artistFormData={artistFormData}
      onUserInputChange={onUserInputChange}
      onArtistInputChange={onArtistInputChange}
      onSave={onSave}
      user={user}
      artist={artist}
      emailFlow={emailFlow}
      isSaving={isSaving}
    />

   

    
  </div>

  
);
