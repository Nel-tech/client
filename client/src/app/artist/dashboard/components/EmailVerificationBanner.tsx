import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmailVerificationBannerProps {
  pendingVerification: any;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  onVerify: () => void;
  onResend: () => void;
  onCancel: () => void;
  resendCooldown: number;
  isVerifying: boolean;
  isResending: boolean;
}

export const EmailVerificationBanner = ({
  pendingVerification,
  verificationCode,
  setVerificationCode,
  onVerify,
  onResend,
  onCancel,
  resendCooldown,
  isVerifying,
  isResending,
}: EmailVerificationBannerProps) => (
  <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-xl p-4 backdrop-blur-sm">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 p-1">
        <svg
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-yellow-200 mb-2">
          Email Verification Required
        </h3>
        <p className="text-sm text-yellow-100/80 mb-3">
          We&apos;ve sent a verification code to{' '}
          <span className="font-semibold">{pendingVerification?.newEmail}</span>
          . Please check your inbox and enter the code below.
        </p>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Enter 6-digit code"
            className="w-32 p-2 border border-yellow-500/30 rounded-lg bg-white/10 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none text-center tracking-wider"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            maxLength={6}
          />
          <Button
            onClick={onVerify}
            disabled={verificationCode.length !== 6 || isVerifying}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            {isVerifying ? 'Verifying...' : 'Verify'}
          </Button>
          <Button
            onClick={onResend}
            disabled={resendCooldown > 0 || isResending}
            className="px-3 py-2 text-yellow-200 hover:text-white transition-colors text-sm underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : 'Resend Code'}
          </Button>
        </div>
      </div>
      <Button
        onClick={onCancel}
        className="flex-shrink-0 p-1 text-yellow-200 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  </div>
);
