'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { handleApiError } from '../lib/api/handleApiError';
import { 
  QueryClient, 
  QueryClientProvider,
  QueryCache,
  MutationCache 
} from '@tanstack/react-query';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
          },
          mutations: {
            retry: false,
          },
        },
        // ✅ Use QueryCache for global error handling
        queryCache: new QueryCache({
          onError: (error) => handleApiError(error),
        }),
        mutationCache: new MutationCache({
          onError: (error) => handleApiError(error),
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}