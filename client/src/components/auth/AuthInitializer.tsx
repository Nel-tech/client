'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const initialized = useAuthStore((state) => state.initialized);
  const isRefreshing = useAuthStore((state) => state.isRefreshing);
  const loading = useAuthStore((state) => state.loading);
  
  const hasInitialized = useRef(false);

  useEffect(() => {
    // CRITICAL: Don't initialize auth on PUBLIC pages (auth pages and homepage)
    const isPublicPage = pathname === '/' || pathname?.startsWith('/auth/');
    
    if (isPublicPage) {
      console.log('⏸️ Skipping auth initialization on public page:', pathname);
      // Set initialized to true without checking auth
      // This prevents the component from trying to initialize
      if (!initialized) {
        useAuthStore.setState({ initialized: true, loading: false });
      }
      return;
    }

    // Only initialize once when the component mounts on PROTECTED pages
    if (!hasInitialized.current && !initialized && !loading && !isRefreshing) {
      hasInitialized.current = true;
      console.log('🚀 Initializing auth on app load...');
      initializeAuth();
    }
  }, [pathname, initializeAuth, initialized, loading, isRefreshing]);

  return <>{children}</>;
}