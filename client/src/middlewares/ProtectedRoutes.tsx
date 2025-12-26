'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import {
  useAuthUser,
  useAuthLoading,
  useAuthInitialized,
  useIsRefreshing,
} from '@/store/useAuthStore';
import { useProfileLoading, useProfileInitialized } from '@/store/useProfileStore';
import Spinner from '@/components/loader/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
  requiresOnboarding?: boolean;
}

export default function ProtectedRoute({
  children,
  redirectTo = '/auth/login',
  allowedRoles,
  requiresOnboarding = true,
}: ProtectedRouteProps) {
  const user = useAuthUser();
  const authLoading = useAuthLoading();
  const authInitialized = useAuthInitialized();
  const isRefreshing = useIsRefreshing();
  const profileLoading = useProfileLoading();
  const profileInitialized = useProfileInitialized();
  const router = useRouter();
  const pathname = usePathname();

  const hasRedirected = useRef(false);
  const checkAttempted = useRef(false);

  useEffect(() => {
    hasRedirected.current = false;
    checkAttempted.current = false;
  }, [pathname]);

  useEffect(() => {
    console.log('🔍 ProtectedRoute State:', {
      authLoading,
      authInitialized,
      isRefreshing,
      profileLoading,
      profileInitialized,
      hasUser: !!user,
      userRole: user?.role,
      userHasOnboarded: user?.hasOnboarded,
      pathname,
      requiresOnboarding,
    });

    // Wait for auth to initialize
    if (authLoading || !authInitialized || isRefreshing) {
      console.log('⏳ Waiting for auth state...');
      return;
    }

    // If user is an Artist, also wait for profile to load (only if onboarded)
    if (user?.role === 'Artist' && user.hasOnboarded && profileLoading && !profileInitialized) {
      console.log('⏳ Waiting for profile state...');
      return;
    }

    if (hasRedirected.current) {
      console.log('⏸️ Already redirected');
      return;
    }

    if (!checkAttempted.current) {
      checkAttempted.current = true;
      console.log('✅ Auth check completed');
    }

    // Not logged in
    if (!user) {
      console.log('❌ No user found, redirecting to login');
      hasRedirected.current = true;
      router.replace(redirectTo);
      return;
    }

    // Role check
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      console.log('🚫 User role not allowed');
      hasRedirected.current = true;
      router.replace('/unauthorized');
      return;
    }

const isOnOnboardingPage = pathname.includes('/onboarding');
const hasOnboarded = user.hasOnboarded === true;

console.log('🎯 Onboarding check:', {
  userHasOnboarded: user.hasOnboarded,
  hasOnboarded,
  isOnOnboardingPage,
  requiresOnboarding,
});

if (hasOnboarded && isOnOnboardingPage) {
  console.log('✅ User already onboarded, redirecting to dashboard...');
  hasRedirected.current = true;
  
  if (user.role === 'Artist') {
    router.replace('/artist/dashboard');
    return;
  }
}
if (requiresOnboarding && !hasOnboarded && !isOnOnboardingPage) {
  console.log('⚠️ User not onboarded, redirecting to onboarding...');
  hasRedirected.current = true;
  
  if (user.role === 'Artist') {
    router.replace('/artist/onboarding');
    return;
  }
}

    console.log('✅ All authorization checks passed');
  }, [
    authLoading,
    authInitialized,
    isRefreshing,
    profileLoading,
    profileInitialized,
    user,
    user?.hasOnboarded, // Explicit dependency
    allowedRoles,
    router,
    redirectTo,
    pathname,
    requiresOnboarding,
  ]);

  // Show spinner while loading
  const isLoading = 
    authLoading || 
    !authInitialized || 
    isRefreshing || 
    (user?.role === 'Artist' && user.hasOnboarded && profileLoading && !profileInitialized);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Spinner />
      </div>
    );
  }

  if (!user || hasRedirected.current) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}