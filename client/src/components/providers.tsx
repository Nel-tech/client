'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const { initializeAuth, initialized, loading, user } = useAuthStore();

  useEffect(() => {
    if (!initialized && !loading) {
      initializeAuth();
    }
  }, [user, initializeAuth, initialized, loading]);

  useEffect(() => {}, [initialized, loading, user]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
