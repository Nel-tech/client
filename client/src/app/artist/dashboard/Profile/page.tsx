'use client'
import { useState, useEffect } from 'react';
import { 
useArtistProfile,
  useFetchAndSetArtistData,  
  useClearError,              
  useProfileLoading, 
  useProfileError 
} from '@/store/useProfileStore';

import { useAuthUser } from '@/store/useAuthStore';
import { ProfileHeader } from './Components/ProfileHeader';
// import { EmailVerificationBanner } from '../components/EmailVerificationModal';
import { ProfileContent } from './Components/ProfileContent';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { useProfileData } from '@/lib/hooks/useProfileData';
import {
  createProfileHandlers,
  useProfileHandlers,
} from '@/lib/hooks/useProfileHandlers';

function ProfileTab() {
  const artistProfile = useArtistProfile();
  const user = useAuthUser();
  const loading = useProfileLoading();
  const error = useProfileError();
  
  const fetchAndSetArtistData = useFetchAndSetArtistData();
  
const clearError = useClearError();

  const [isEditing, setIsEditing] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      if (!artistProfile && !loading) {
        try {
          await fetchAndSetArtistData();
        } catch (err) {
          console.error('Failed to load artist profile:', err);
        }
      }
    };
    loadProfile();
  }, [artistProfile, loading, fetchAndSetArtistData]);

  const { userData, artistFormData, setUserData, setArtistFormData } =
    useProfileData(user, artistProfile);

  const refetch = async () => {
    clearError();
    try {
      await fetchAndSetArtistData();
    } catch (err) {
      console.error('Refetch failed:', err);
    }
  };

  const {
    updateUsername,
    updateArtist,
    uploadProfilePic,
    emailFlow,
    isSaving,
    isUploadingImage,
  } = useProfileHandlers({ 
    setIsEditing, 
    refetch 
  });

  const {
    handleImageUpload,
    handleEditToggle,
    handleSaveChanges,
    // handleVerifyEmail,
    // handleResendCode,
    // handleCancelEmailChange,
  } = createProfileHandlers({
    userData,
    artistFormData, 
    user,
    artist: artistProfile,
    updateUsername,
    updateArtist,
    uploadProfilePic,
    emailFlow,
    verificationCode,
    setVerificationCode,
    setUserData,
    setArtistFormData, 
    setIsEditing,
    setResendCooldown,
    isEditing,
  });

  
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay onRetry={refetch} message={error} />;
  if (!artistProfile) return <ErrorDisplay onRetry={refetch} message="No artist profile found" />;

  return (
    <div className="space-y-6">
      <ProfileHeader
        isEditing={isEditing}
        onEditToggle={handleEditToggle}
        disabled={isSaving}
      />


      <ProfileContent
        isEditing={isEditing}
        userData={userData}
        artistFormData={artistFormData}
        onUserInputChange={(field, value) =>
          setUserData((prev) => ({ ...prev, [field]: value }))
        }
        onArtistInputChange={(field, value) =>
          setArtistFormData((prev) => ({ ...prev, [field]: value }))
        }
        onImageUpload={handleImageUpload}
        onSave={handleSaveChanges}
        user={user}
        artist={artistProfile}
        emailFlow={emailFlow}
        isSaving={isSaving}
        isUploadingImage={isUploadingImage}
      />
    </div>
  );
}

export default ProfileTab;