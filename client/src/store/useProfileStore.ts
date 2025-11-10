import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  ArtistProfile,
  FanProfile,
  ProfileState,
  ProfileStore,
} from '@/helper/type';
import {
  getArtistProfile,
  getProfileCompletionStatus,
} from '@/lib/api/endpoints';

const initialState: ProfileState = {
  artistProfile: null,
  fanProfile: null,
  loading: false,
  initialized: false,
  error: null,
  lastFetched: null,
  cacheExpiry: 2 * 60 * 1000, // 2 minutes (shorter for production)
  profileCompletionStatus: null,
};

// NO PERSIST MIDDLEWARE - Just devtools and immer
export const useProfileStore = create<ProfileStore>()(
  devtools(
    immer((set, get) => ({
      ...initialState,

      setArtistProfile: (profile) =>
        set((state) => {
          state.artistProfile = profile;
          state.lastFetched = Date.now();
          state.error = null;
          state.initialized = true;
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

      setFanProfile: (profile) =>
        set((state) => {
          state.fanProfile = profile;
          state.lastFetched = Date.now();
          state.error = null;
          state.initialized = true;
        }),

      updateFanProfile: (updates) =>
        set((state) => {
          if (state.fanProfile) {
            Object.assign(state.fanProfile, updates);
            state.lastFetched = Date.now();
          }
        }),

      clearFanProfile: () =>
        set((state) => {
          state.fanProfile = null;
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
          state.fanProfile = null;
          state.profileCompletionStatus = null;
          state.lastFetched = null;
          state.error = null;
          state.initialized = false;
        }),

      // Cache management (memory only)
      isDataStale: () => {
        const { lastFetched, cacheExpiry } = get();
        if (!lastFetched) return true;
        return Date.now() - lastFetched > cacheExpiry;
      },

      refreshCache: () =>
        set((state) => {
          state.lastFetched = Date.now();
        }),

      // API methods
      fetchArtistProfile: async () => {
        try {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          const profile = await getArtistProfile();

          set((state) => {
            state.artistProfile = profile;
            state.lastFetched = Date.now();
            state.loading = false;
            state.initialized = true;
          });
        } catch (error) {
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

      // Helper methods
      getCurrentProfile: (userRole) => {
        const state = get();
        switch (userRole.toLowerCase()) {
          case 'artist':
            return state.artistProfile;
          case 'fan':
            return state.fanProfile;
          default:
            return null;
        }
      },

      hasProfile: (userRole) => {
        const profile = get().getCurrentProfile(userRole);
        return profile !== null;
      },

      getProfileCompletion: (userRole) => {
        const profile = get().getCurrentProfile(userRole);

        if (!profile) {
          return { percentage: 0, missingFields: ['All fields'] };
        }

        let totalFields = 0;
        let completedFields = 0;
        const missingFields: string[] = [];
        const commonRequiredFields = ['profilePic'];

        if (userRole.toLowerCase() === 'artist' && 'fullName' in profile) {
          const artistProfile = profile as ArtistProfile;
          const requiredFields = [
            'fullName',
            'stageName',
            'bio',
            'genre',
            ...commonRequiredFields,
          ];

          totalFields = requiredFields.length;

          requiredFields.forEach((field) => {
            if (artistProfile[field as keyof ArtistProfile]) {
              completedFields++;
            } else {
              missingFields.push(field);
            }
          });
        } else if (
          userRole.toLowerCase() === 'fan' &&
          'displayName' in profile
        ) {
          const fanProfile = profile as FanProfile;
          const requiredFields = [
            'displayName',
            'favoriteGenres',
            ...commonRequiredFields,
          ];

          totalFields = requiredFields.length;

          requiredFields.forEach((field) => {
            if (fanProfile[field as keyof FanProfile]) {
              completedFields++;
            } else {
              missingFields.push(field);
            }
          });
        }

        const percentage =
          totalFields > 0
            ? Math.round((completedFields / totalFields) * 100)
            : 0;
        return { percentage, missingFields };
      },
    })),
    { name: 'ProfileStore' }
  )
);

// ============================================================
// SELECTOR HOOKS - For reading state (these won't cause re-renders)
// ============================================================
export const useArtistProfile = () =>
  useProfileStore((state) => state.artistProfile);
export const useFanProfile = () => useProfileStore((state) => state.fanProfile);
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

// ============================================================
// ACTION HOOKS - For calling methods (stable references)
// ============================================================
export const useSetArtistProfile = () =>
  useProfileStore((state) => state.setArtistProfile);
export const useUpdateArtistProfile = () =>
  useProfileStore((state) => state.updateArtistProfile);
export const useClearArtistProfile = () =>
  useProfileStore((state) => state.clearArtistProfile);
export const useSetFanProfile = () =>
  useProfileStore((state) => state.setFanProfile);
export const useUpdateFanProfile = () =>
  useProfileStore((state) => state.updateFanProfile);
export const useClearFanProfile = () =>
  useProfileStore((state) => state.clearFanProfile);
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
