// app/artist/verify-email-change/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AuthOnlyRoute from '@/middlewares/AuthOnly';
import { useEmailFlowStore } from '@/store/emailFlowStore';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/loader/spinner';

export default function VerifyEmailChange() {
  const router = useRouter();
  const pendingEmailChange = useEmailFlowStore((state) => state.pendingEmailChange);
  const clearPendingEmailChange = useEmailFlowStore((state) => state.clearPendingEmailChange);
  const checkPendingEmailChange = useEmailFlowStore((state) => state.checkPendingEmailChange);
  
  const [loading, setLoading] = useState(false);

  // ✅ Check if there's actually a pending change when component mounts
  useEffect(() => {
    const checkStatus = async () => {
      try {
        await checkPendingEmailChange();
      } catch (error) {
        // If no pending change found, redirect to profile
        router.replace('/artist/dashboard/Profile');
      }
    };
    
    checkStatus();
  }, []);

  useEffect(() => {
    if (!pendingEmailChange) {
      router.replace('/artist/dashboard/Profile');
    }
  }, [pendingEmailChange, router]);

   const handleResendEmail = async () => {
    if (!pendingEmailChange?.newEmail) return;

    setLoading(true);
    try {
 
      toast.success('Verification email resent!', {
        description: `A new verification link was sent to ${pendingEmailChange.newEmail}.`,
      });
    } catch (error) {
      toast.error('Failed to resend email');
    } finally {
      setLoading(false);
    }
  };


  const handleCancelEmailChange = async () => {
    setLoading(true);
    try {
      // Call your cancel API
      clearPendingEmailChange();
      toast.info('Email change cancelled');
      router.push('/artist/dashboard/Profile');
    } catch (error) {
      toast.error('Failed to cancel email change');
    } finally {
      setLoading(false);
    }
  };

  if (!pendingEmailChange) {
    return <div><Spinner/></div>;
  }

  return (
    <AuthOnlyRoute>
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl text-white font-semibold mb-3">
            Verify Your New Email
          </h1>

          <p className="text-white mb-6">
            A verification link was sent to:
            <br />
            <span className="font-medium text-[#ff6b35]">
              {pendingEmailChange.newEmail}
            </span>
            <br />
            Please check your inbox.
          </p>


              <div className='flex justify-center gap-1.5 items-center'>

                        {/* RESEND BUTTON */}
                        <Button
                          onClick={handleResendEmail}
                          disabled={loading}
                         className="flex-1 bg-white/10 text-white px-4 py-6 rounded-xl hover:bg-white/20 transition-colors font-medium disabled:opacity-60"
                        >
                          {loading ? 'Resending...' : 'Resend Email'}
                        </Button>

                        {/* CANCEL BUTTON */}
                        <Button
                          onClick={handleCancelEmailChange}
                          disabled={loading}
                            className="flex-1 bg-[#ff6b35] cursor-pointer text-white  px-4 py-6 rounded-xl hover:bg-[#e55a2b] transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          Cancel Email Change
                        </Button>
              </div>

          <button
            onClick={() => router.push('/artist/dashboard/Profile')}
            className="mt-4 text-sm text-white underline"
          >
            Back to Profile
          </button>
        </div>
      </div>
      
    </AuthOnlyRoute>
  );
}