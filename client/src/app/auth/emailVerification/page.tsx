// app/verify-email/page.tsx (Next.js 13+ App Router)
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResendVerification, useEmailVerification } from '@/lib/queries/auth-queries';
import { toast } from 'sonner';
import { useAuthUser } from '@/store/useAuthStore';


export default function EmailVerification() {
  const [code, setCode] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const user = useAuthUser()
  const resendMutation = useResendVerification();
  const VerifyEmail = useEmailVerification()

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = async () => {
    try {
      await resendMutation.mutateAsync({ email });
      toast.success('Verification code resent!');
      setCooldown(60);
    } catch (error: string) {
      toast.error(error.response?.data?.error || 'Failed to resend code');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    setIsVerifying(true);
    try {
   const response =   await VerifyEmail.mutateAsync({ email, code });

      if(response?.user?.role === 'Artist'){
        toast.success('Email verified successfully!');
        router.push('/artist/onboarding');
      };
      
    } catch (error: string) {
      const errorMsg = error.response?.data?.error || error.message;
     if (errorMsg?.includes('expired')) {
      toast.error('Code expired. Request a new one below.');
    } else {
      toast.error(errorMsg || 'Verification failed');
    }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Verify Your Email</h2>
          <p className="text-gray-400">
            We sent a verification code to <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="w-full p-4 bg-white/5 border border-white/20 rounded-lg text-white text-center text-2xl tracking-widest focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]"
              maxLength={6}
              disabled={isVerifying}
            />
            <p className="text-xs text-gray-400 mt-2 text-center">
              Enter the 6-digit code from your email
            </p>

             <p className="text-xs text-gray-400 mt-1 text-center">
    Code expires in 15 minutes
  </p>
          </div>

          <button
            type="submit"
            disabled={code.length !== 6 || isVerifying}
            className="w-full bg-[#ff6b35]  cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-[#e55a2b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-3">Didn&apos;t receive the code?</p>
          <button
            onClick={handleResend}
            disabled={cooldown > 0 || resendMutation.isPending}
            className="text-[#ff6b35] hover:text-[#e55a2b] font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cooldown > 0 
              ? `Resend in ${cooldown}s` 
              : resendMutation.isPending 
              ? 'Sending...' 
              : 'Resend Code'
            }
          </button>
        </div>
      </div>
    </div>
  );
}