import { useState, useEffect } from 'react';
import { BaseUser, ArtistProfile, ArtistFormData, UserData } from '@/helper/type';

export const useProfileData = (
  user: BaseUser | null,
  artist: ArtistProfile | null
) => {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    email: '',
  });

  const [artistFormData, setArtistFormData] = useState<ArtistFormData>({
    fullName: '',
    stageName: '',
    genre: '',
    bio: '',
  });

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || '',
        email: user.email || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (artist) {
      setArtistFormData({
        fullName: artist.fullName || '', 
        stageName: artist.stageName || '',
        genre: artist.genre || '',
        bio: artist.bio || '',
      });
    }
  }, [artist]);

  return { userData, artistFormData, setUserData, setArtistFormData };
};