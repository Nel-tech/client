import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ArtistProfile } from '@/lib/api/endpoints/artist/type';
import { ProfileState, ProfileStore } from '@/helper/type';
import {
  getArtistProfile,
  getProfileCompletionStatus,
} from '@/lib/api/endpoints/artist/artist';

const initialState: ProfileState = {
  artistProfile: null,
  loading: false,
  initialized: false,
  error: null,
  lastFetched: null,
  cacheExpiry: 2 * 60 * 1000,
  profileCompletionStatus: null,
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      // Basic setters
      setArtistProfile: (profile) =>
        set((state) => {
          state.artistProfile = profile;
          state.lastFetched = Date.now();
          state.error = null;
          state.initialized = true;
          console.log('✅ Setting profile:', profile);
        }),

      updateArtistProfile: (updates) =>
        set((state) => {
          if (state.artistProfile) {
            Object.assign(state.artistProfile, updates);
            state.lastFetched = Date.now();
          }
        }),

      clearArtistProfile: () =>
        set((state) => {
          state.artistProfile = null;
        }),
      setLoading: (loading) =>
        set((state) => {
          state.loading = loading;
        }),
      setError: (error) =>
        set((state) => {
          state.error = error;
          state.loading = false;
        }),
      setInitialized: (initialized) =>
        set((state) => {
          state.initialized = initialized;
        }),
      clearError: () =>
        set((state) => {
          state.error = null;
        }),

      clearAllProfiles: () =>
        set((state) => {
          state.artistProfile = null;
          state.profileCompletionStatus = null;
          state.lastFetched = null;
          state.error = null;
          state.initialized = false;
        }),

      // Cache management
      isDataStale: () => {
        const { lastFetched, cacheExpiry } = get();
        if (!lastFetched) return true;
        return Date.now() - lastFetched > cacheExpiry;
      },

      refreshCache: () =>
        set((state) => {
          state.lastFetched = Date.now();
        }),

      // API calls
      fetchArtistProfile: async () => {
        const state = get();

        if (state.loading) return state.artistProfile;

        try {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          console.log('📡 Fetching artist profile from API...');
          const profile = await getArtistProfile();
          console.log('✅ Profile fetched:', profile);

          set((state) => {
            state.artistProfile = profile;
            state.lastFetched = Date.now();
            state.loading = false;
            state.initialized = true;
          });

          return profile;
        } catch (error) {
          console.error('❌ Failed to fetch profile:', error);
          set((state) => {
            state.error =
              error instanceof Error
                ? error.message
                : 'Failed to fetch artist profile';
            state.loading = false;
          });
          throw error;
        }
      },

      fetchProfileCompletionStatus: async () => {
        try {
          const completionStatus = await getProfileCompletionStatus();
          set((state) => {
            state.profileCompletionStatus = completionStatus;
          });
          return completionStatus;
        } catch (error) {
          console.error('Failed to fetch profile completion status:', error);
        }
      },

      fetchAndSetArtistData: async () => {
        try {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          const [profile] = await Promise.allSettled([
            getArtistProfile(),
            get().fetchProfileCompletionStatus(),
          ]);

          if (profile.status === 'fulfilled') {
            console.log('✅ fetchAndSetArtistData got:', profile.value);
            set((state) => {
              state.artistProfile = profile.value;
              state.lastFetched = Date.now();
              state.loading = false;
              state.initialized = true;
            });
          } else {
            throw new Error('Failed to fetch artist profile');
          }
        } catch (error) {
          set((state) => {
            state.error =
              error instanceof Error
                ? error.message
                : 'Failed to fetch artist data';
            state.loading = false;
          });
          throw error;
        }
      },

      // Profile utilities
      getCurrentProfile: (userRole) => {
        const state = get();
        return userRole.toLowerCase() === 'artist' ? state.artistProfile : null;
      },

      hasProfile: (userRole) => {
        return get().getCurrentProfile(userRole) !== null;
      },

      getProfileCompletion: (userRole) => {
        const profile = get().getCurrentProfile(userRole);

        if (!profile) {
          return { percentage: 0, missingFields: ['All fields'] };
        }

        if (userRole.toLowerCase() === 'artist' && 'fullName' in profile) {
          const artistProfile = profile as ArtistProfile;
          const requiredFields = [
            'fullName',
            'stageName',
            'bio',
            'genre',
            'profilePic',
          ];

          const missingFields = requiredFields.filter(
            (field) => !artistProfile[field as keyof ArtistProfile]
          );

          const completedFields = requiredFields.length - missingFields.length;
          const percentage = Math.round(
            (completedFields / requiredFields.length) * 100
          );

          return { percentage, missingFields };
        }

        return { percentage: 0, missingFields: [] };
      },
    })),
    {
      name: 'profile-storage',
      version: 2, // Increment this to clear old cached data
      partialize: (state) => ({
        artistProfile: state.artistProfile,
        profileCompletionStatus: state.profileCompletionStatus,
        initialized: state.initialized,
        lastFetched: state.lastFetched,
      }),
    }
  )
);

// Hooks
export const useArtistProfile = () =>
  useProfileStore((state) => state.artistProfile);
export const useProfileLoading = () =>
  useProfileStore((state) => state.loading);
export const useProfileError = () => useProfileStore((state) => state.error);
export const useProfileInitialized = () =>
  useProfileStore((state) => state.initialized);
export const useCurrentUserProfile = (userRole: string) =>
  useProfileStore((state) => state.getCurrentProfile(userRole));
export const useProfileCompletion = (userRole: string) =>
  useProfileStore((state) => state.getProfileCompletion(userRole));
export const useHasProfile = (userRole: string) =>
  useProfileStore((state) => state.hasProfile(userRole));
export const useIsProfileDataStale = () =>
  useProfileStore((state) => state.isDataStale());

// Actions
export const useSetArtistProfile = () =>
  useProfileStore((state) => state.setArtistProfile);
export const useUpdateArtistProfile = () =>
  useProfileStore((state) => state.updateArtistProfile);
export const useClearArtistProfile = () =>
  useProfileStore((state) => state.clearArtistProfile);
export const useSetLoading = () => useProfileStore((state) => state.setLoading);
export const useSetError = () => useProfileStore((state) => state.setError);
export const useClearError = () => useProfileStore((state) => state.clearError);
export const useClearAllProfiles = () =>
  useProfileStore((state) => state.clearAllProfiles);
export const useRefreshCache = () =>
  useProfileStore((state) => state.refreshCache);
export const useFetchArtistProfile = () =>
  useProfileStore((state) => state.fetchArtistProfile);
export const useFetchProfileCompletionStatus = () =>
  useProfileStore((state) => state.fetchProfileCompletionStatus);
export const useFetchAndSetArtistData = () =>
  useProfileStore((state) => state.fetchAndSetArtistData);

export default useProfileStore;
