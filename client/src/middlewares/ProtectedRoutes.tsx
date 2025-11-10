'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import {
  useAuthUser,
  useAuthLoading,
  useAuthInitialized,
  useIsRefreshing,
} from '@/store/useAuthStore';
import Spinner from '@/components/loader/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
}

export default function ProtectedRoute({
  children,
  redirectTo = '/auth/login',
  allowedRoles,
}: ProtectedRouteProps) {
  const user = useAuthUser();
  const loading = useAuthLoading();
  const initialized = useAuthInitialized();
  const isRefreshing = useIsRefreshing();
  const router = useRouter();

  const hasRedirected = useRef(false);
  const checkAttempted = useRef(false);

  useEffect(() => {
    hasRedirected.current = false;
    checkAttempted.current = false;
  }, []);

  useEffect(() => {
    console.log('🔍 ProtectedRoute State:', {
      loading,
      initialized,
      isRefreshing,
      hasUser: !!user,
      userRole: user?.role,
    });

    if (loading || !initialized || isRefreshing) {
      console.log('⏳ Waiting for auth state...', {
        loading,
        initialized,
        isRefreshing,
        hasUser: !!user,
      });
      return;
    }

    if (!checkAttempted.current) {
      checkAttempted.current = true;
      console.log('✅ Auth check completed', {
        hasUser: !!user,
        userRole: user?.role,
        allowedRoles,
      });
    }

    if (hasRedirected.current) return;

    // 🚫 Not logged in → go to login
    if (!user) {
      hasRedirected.current = true;
      router.replace(redirectTo);
      return;
    }

    // 🚦 Onboarding redirect logic by role
    if (!user.hasOnboarded) {
      hasRedirected.current = true;

      if (user.role === 'Artist') {
        router.replace('/artist/onboarding');
      } else if (user.role === 'Fan') {
        router.replace('/fan/onboarding');
      } else {
        router.replace('/'); // fallback
      }
      return;
    }

    // 🔒 Check role authorization
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      hasRedirected.current = true;
      router.replace('/unauthorized');
      return;
    }
  }, [loading, initialized, isRefreshing, user, allowedRoles, router, redirectTo]);

  if (loading || !initialized || isRefreshing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // ✅ All checks passed
  return <>{children}</>;
}
