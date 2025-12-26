import React from 'react';
import { toast } from 'sonner';
import { useUpdateusername, useEmailChangeFlow } from '../queries/user-queries';
import {
  useUpdateArtistProfile,
  useProfilePictureUpload,
} from '../queries/artist-queries';

import { BaseUser, UserFormData} from '../api/endpoints/user/type';
import { ArtistFormData, ArtistProfile } from '../api/endpoints/artist/type';
interface ProfileHandlersConfig {
  setIsEditing: (editing: boolean) => void;
  refetch: () => void;
}

interface ProfileHandlersParams {
  userData: UserFormData;
  artistFormData: ArtistFormData;
  user: BaseUser | null;
  artist: ArtistProfile | null;
  updateUsername: ReturnType<typeof useUpdateusername>;
  updateArtist: ReturnType<typeof useUpdateArtistProfile>;
  uploadProfilePic: ReturnType<typeof useProfilePictureUpload>;
  emailFlow: ReturnType<typeof useEmailChangeFlow>;
  setUserData: React.Dispatch<React.SetStateAction<UserFormData>>;
  setArtistFormData: React.Dispatch<React.SetStateAction<ArtistFormData>>;
  setIsEditing: (editing: boolean) => void;
  setResendCooldown: (cooldown: number) => void;
  isEditing: boolean;
}

// Hook for managing mutations
export const useProfileHandlers = ({ refetch }: ProfileHandlersConfig) => {
  const updateUsername = useUpdateusername({
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      refetch(); 
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });

  const updateArtist = useUpdateArtistProfile({
    onSuccess: () => {
      toast.success('Artist profile updated successfully!');
      refetch(); 
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
  const isSaving = updateUsername.isPending || updateArtist.isPending;
  const isUploadingImage = uploadProfilePic.isPending;

  return {
    updateUsername,
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
    updateUsername,
    uploadProfilePic,
    emailFlow,
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

      // Check username change
      if (userData.username !== user?.username && userData.username.trim()) {
        promises.push(
          updateUsername.mutateAsync({ username: userData.username.trim() })
        );
      }

      // Check artist changes
      const hasArtistChanges =
        artistFormData.fullName !== artist?.fullName ||
        artistFormData.stageName !== artist?.stageName ||
        artistFormData.genre !== artist?.genre ||
        artistFormData.bio !== artist?.bio;

      if (hasArtistChanges) {
        promises.push(updateArtist.mutateAsync(artistFormData));
      }

      if (promises.length > 0) {
        await Promise.all(promises);
        setIsEditing(false); // ✅ Exit edit mode after successful save
      } else {
        toast.info('No changes to save');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Save changes error:', error);
      // ✅ Don't exit edit mode on error
    }
  };


  const handleResendCode = async () => {
    try {
      await emailFlow.resendCode();
      setResendCooldown(60);
      toast.success('Email resent!');
    } catch (error) {
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
      console.error('Cancel email change error:', error);
      // ✅ Error already handled by mutation's onError
    }
  };

  // Input change handlers
  const handleUserInputChange = (field: keyof UserFormData, value: string) => {
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
