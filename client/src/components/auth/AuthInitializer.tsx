'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const initialized = useAuthStore((state) => state.initialized);
  const isRefreshing = useAuthStore((state) => state.isRefreshing);
  const loading = useAuthStore((state) => state.loading);
  const user = useAuthStore((state) => state.user);
  
  const fetchArtistProfile = useProfileStore((state) => state.fetchArtistProfile);
  const profileInitialized = useProfileStore((state) => state.initialized);
  
  const hasInitialized = useRef(false);
  const hasProfileFetched = useRef(false);

  // Initialize auth
  useEffect(() => {
    const isPublicPage = pathname === '/' || pathname?.startsWith('/auth/');
    
    if (isPublicPage) {
      console.log('⏸️ Skipping auth initialization on public page:', pathname);
      if (!initialized) {
        useAuthStore.setState({ initialized: true, loading: false });
      }
      return;
    }

    if (!hasInitialized.current && !initialized && !loading && !isRefreshing) {
      hasInitialized.current = true;
      console.log('🚀 Initializing auth on app load...');
      initializeAuth();
    }
  }, [pathname, initializeAuth, initialized, loading, isRefreshing]);

  // Fetch profile after auth is initialized
  useEffect(() => {
    // CRITICAL FIX: Only fetch if user has completed onboarding
    if (
      initialized && 
      user && 
      user.role === 'Artist' && 
      user.hasOnboarded === true && // ← THE KEY FIX!
      !hasProfileFetched.current &&
      !profileInitialized
    ) {
      hasProfileFetched.current = true;
      console.log('🎨 Fetching artist profile after auth initialization...');
      
      fetchArtistProfile()
        .then(() => {
          console.log('✅ Artist profile fetched successfully');
        })
        .catch((error) => {
          console.error('❌ Failed to fetch artist profile:', error);
          // Reset flag so it can retry
          hasProfileFetched.current = false;
        });
    } else if (initialized && user && user.role === 'Artist' && !user.hasOnboarded) {
      console.log('ℹ️ User has not completed onboarding yet, skipping profile fetch');
    }
  }, [initialized, user, user?.hasOnboarded, fetchArtistProfile, profileInitialized]);

  return <>{children}</>;
}

