'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useVerifyEmailChange } from '@/lib/queries/user-queries';
import { LoadingState, SuccessState, ErrorState } from '@/components/loader/EmailVerification/State';

export default function VerifyEmailChangePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const hasVerified = useRef(false); 

  const { mutate: verifyEmail, isPending, isError, error, isSuccess } = useVerifyEmailChange({
    onSuccess: (data) => {
      toast.success('Email verified successfully!');
      setTimeout(() => router.push('/artist/dashboard/Profile'), 2000);
    },
    onError: (err) => {
      toast.error(err.message || 'Verification failed');
    }
  });

  useEffect(() => {
    
    if (token && !hasVerified.current) {
      hasVerified.current = true;
      verifyEmail(token);
    }
  }, [token, verifyEmail]); 

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {isPending && <LoadingState />}
      {isError && <ErrorState error={error?.message} />}
      {isSuccess && <SuccessState />} 
    </div>
  );
}