"use client";

import { useAuthUser, useAuthLoading, useAuthInitialized } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Spinner from "@/components/loader/spinner";

export default function AuthOnlyRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthUser();
  const loading = useAuthLoading();
  const initialized = useAuthInitialized();
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!loading && initialized && !user && !hasRedirected.current) {
      hasRedirected.current = true;
      
      // ✅ Clear the current path from history
      router.replace('/auth/login');
    }
  }, [loading, initialized, user, router]);

  if (loading || !initialized) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    
    return null;
  }

  return <>{children}</>;
}