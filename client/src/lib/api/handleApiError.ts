import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface ErrorResponse {
  error?: string;
  message?: string;
  code?: string;
  requiresVerification?: boolean;
  email?: string;
}

function isAxiosError(error: unknown): error is AxiosError<ErrorResponse> {
  return !!(error && typeof error === 'object' && 'isAxiosError' in error);
}

export function handleApiError(error: unknown) {
  console.error('API Error:', error);

  if (isAxiosError(error)) {
    const serverData = error.response?.data;
    const msg =
      serverData?.message ||
      serverData?.error ||
      error.message ||
      'Something went wrong. Please try again.';

    return toast.error(msg, { duration: 6000 });
  }

  if (error instanceof Error) {
    return toast.error(error.message, { duration: 6000 });
  }

  toast.error('Unexpected error occurred', { duration: 6000 });
}
