"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthUser, useAuthLoading, useAuthInitialized } from "@/store/useAuthStore";
import Spinner from "@/components/loader/spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;   
  allowedRoles?: string[]; 
}

export default function ProtectedRoute({
  children,
  redirectTo = "/auth/login",
  allowedRoles,
}: ProtectedRouteProps) {
  const user = useAuthUser();
  const loading = useAuthLoading();
  const initialized = useAuthInitialized();
  const router = useRouter();

  useEffect(() => {
    if (!loading && initialized) {
      if (!user) {
        router.replace(redirectTo);
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.replace("/unauthorized"); 
      }
    }
  }, [loading, initialized, user, allowedRoles, router, redirectTo]);

  if (loading || !initialized) {
    return <Spinner />;
  }

  return <>{children}</>;
}
