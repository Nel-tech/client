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

    // ⏳ Wait for initial auth check or token refresh to complete
    if (loading || !initialized || isRefreshing) {
      console.log('⏳ Waiting for auth state...', {
        loading,
        initialized,
        isRefreshing,
      });
      return;
    }

    // Don't proceed if already redirected
    if (hasRedirected.current) {
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

    // 🚫 Not logged in → go to login
    if (!user) {
      console.log('❌ No user found, redirecting to login');
      hasRedirected.current = true;
      router.replace(redirectTo);
      return;
    }

    // 🚦 Onboarding redirect logic by role
    if (!user.hasOnboarded) {
      console.log('⚠️ User not onboarded, redirecting...');
      hasRedirected.current = true;

      if (user.role === 'Artist') {
        router.replace('/artist/onboarding');
         } else if (user.role === 'Fan') {
             router.replace('/fans/onboarding');
        } else {
          return;
         
        }
    }

    // 🔒 Check role authorization ONLY if allowedRoles is specified
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(user.role)) {
        console.log('🚫 User role not allowed:', {
          userRole: user.role,
          allowedRoles,
        });
        hasRedirected.current = true;
        router.replace('/unauthorized');
        return;
      }
    }

    // ✅ All checks passed
    console.log('✅ All authorization checks passed');
  }, [loading, initialized, isRefreshing, user, allowedRoles, router, redirectTo]);

  // Show spinner during initial load, auth loading, or token refresh
  if (loading || !initialized || isRefreshing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Show spinner while redirecting
  if (!user || hasRedirected.current) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Show spinner if role check fails (before redirect happens)
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // ✅ All checks passed - render children
  return <>{children}</>;
}