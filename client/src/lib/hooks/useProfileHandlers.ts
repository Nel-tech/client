import React from 'react';
import { toast } from 'sonner';
import { useUserUpdate, useEmailChangeFlow } from '../queries/user-queries';
import {
  useUpdateArtistProfile,
  useProfilePictureUpload,
} from '../queries/artist-queries';
import {
  BaseUser,
  ArtistProfile,
  ArtistFormData,
  UserData,
} from '@/helper/type';


interface ProfileHandlersConfig {
  setIsEditing: (editing: boolean) => void;
  refetch: () => void;
}



interface ProfileHandlersParams {
  userData: UserData;
  artistFormData: ArtistFormData;
  user: BaseUser | null;
  artist: ArtistProfile | null; 
  updateUser: ReturnType<typeof useUserUpdate>;
  updateArtist: ReturnType<typeof useUpdateArtistProfile>;
  uploadProfilePic: ReturnType<typeof useProfilePictureUpload>;
  emailFlow: ReturnType<typeof useEmailChangeFlow>;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setArtistFormData: React.Dispatch<React.SetStateAction<ArtistFormData>>;
  setIsEditing: (editing: boolean) => void;
  setResendCooldown: (cooldown: number) => void;
  isEditing: boolean;
}

// Hook for managing mutations
export const useProfileHandlers = ({
  refetch,
}: ProfileHandlersConfig) => {
  const updateUser = useUserUpdate({
    onSuccess: () => {
      toast.success('Profile updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });

  const updateArtist = useUpdateArtistProfile({
    onSuccess: () => {
      toast.success('Artist profile updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update artist profile');
    },
  });

  const uploadProfilePic = useProfilePictureUpload({
    onSuccess: () => {
      toast.success('Profile picture updated!');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to upload image');
    },
  });

  const emailFlow = useEmailChangeFlow();

  // Computed states
  const isSaving = updateUser.isPending || updateArtist.isPending;
  const isUploadingImage = uploadProfilePic.isPending;

  return {
    updateUser,
    updateArtist,
    uploadProfilePic,
    emailFlow,
    isSaving,
    isUploadingImage,
  };
};

// Factory function for creating handlers
export const createProfileHandlers = (params: ProfileHandlersParams) => {
  const {
    userData,
    user,
    artistFormData,
    updateArtist,
    artist,
    updateUser,
    uploadProfilePic,
    emailFlow,
    verificationCode,
    setVerificationCode,
    setUserData,
    setArtistFormData,
    setIsEditing,
    setResendCooldown,
    isEditing,
  } = params;

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      await uploadProfilePic.mutateAsync({ file });
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form data when canceling
      if (user) {
        setUserData({
          username: user.username || '',
          email: user.email || '',
        });
      }

      if (artist) {
        setArtistFormData({
          fullName: artist.fullName || '',
          stageName: artist.stageName || '',
          genre: artist.genre || '',
          bio: artist.bio || '',
        });
      }
    }
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
   

    try {
      const promises: Promise<any>[] = [];

      // Validate required fields
      if (isEditing && !userData.username.trim()) {
        toast.error('Username is required');
        return;
      }
      if (userData.username !== user?.username && userData.username.trim()) {
        promises.push(
          updateUser.mutateAsync({ username: userData.username.trim() })
        );
      } else {
        console.log('❌ No username change detected');
      }

      const hasArtistChanges = 
      artistFormData.fullName !== artist?.fullName ||
      artistFormData.stageName !== artist?.stageName ||
      artistFormData.genre !== artist?.genre ||
      artistFormData.bio !== artist?.bio;

  if (hasArtistChanges) {
    promises.push(
      updateArtist.mutateAsync(artistFormData) 
    );
  }

      if (promises.length > 0) {
        await Promise.all(promises);
      } else {
        toast.info('No changes to save');
        setIsEditing(false);
        return;
      }

      // Exit edit mode if no email change was requested
      if (userData.email === user?.email) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Save changes error:', error);
    }
  };
  const handleVerifyEmail = async () => {
    // Validate verification code format
    if (verificationCode.length !== 6) {
      toast.error('Please enter a 6-digit verification code');
      return;
    }

    if (!/^\d{6}$/.test(verificationCode)) {
      toast.error('Verification code must contain only numbers');
      return;
    }

    try {
      await emailFlow.verifyChange({
        verificationCode: verificationCode.trim(),
      });
      setVerificationCode('');
      setIsEditing(false);
      toast.success('Email verified successfully!');
    } catch (error) {
      // Error handled by mutation's onError
      console.error('Email verification error:', error);
    }
  };

  const handleResendCode = async () => {
    try {
      await emailFlow.resendCode();
      setResendCooldown(60); // 60 second cooldown
      toast.success('Verification code resent!');
    } catch (error) {
      // Error handled by mutation's onError
      console.error('Resend code error:', error);
    }
  };

  const handleCancelEmailChange = async () => {
    try {
      await emailFlow.cancelChange();
      setUserData((prev) => ({
        ...prev,
        email: user?.email || '',
      }));
      toast.success('Email change cancelled');
    } catch (error) {
      // Error handled by mutation's onError
      console.error('Cancel email change error:', error);
    }
  };

  // Input change handlers
  const handleUserInputChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArtistInputChange = (
    field: keyof ArtistFormData,
    value: string
  ) => {
    setArtistFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    handleImageUpload,
    handleEditToggle,
    handleSaveChanges,
    handleVerifyEmail,
    handleResendCode,
    handleCancelEmailChange,
    handleUserInputChange,
    handleArtistInputChange,
  };
};

// Custom hook that combines both functionality
export const useCompleteProfileHandlers = (config: ProfileHandlersConfig) => {
  const mutations = useProfileHandlers(config);

  const createHandlers = (
    params: Omit<ProfileHandlersParams, keyof typeof mutations>
  ) => {
    return createProfileHandlers({
      ...params,
      ...mutations,
    });
  };

  return {
    ...mutations,
    createHandlers,
  };
};
