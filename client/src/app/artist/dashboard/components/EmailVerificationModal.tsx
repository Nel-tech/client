// components/EmailVerificationModal.tsx
import React, { useState, useEffect } from 'react';
import { AlertCircle, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EmailVerificationModalProps {
  isOpen: boolean;
  newEmail: string;
  isExpired: boolean;
  onVerify: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
  onCancel: () => void;
  isVerifying: boolean;
  isResending: boolean;
}

export const EmailVerificationModal = ({
  isOpen,
  newEmail,
  isExpired,
  onVerify,
  onResend,
  onCancel,
  isVerifying,
  isResending,
}: EmailVerificationModalProps) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerify = async () => {
    if (verificationCode.length !== 6) return;
    await onVerify(verificationCode.trim());
    setVerificationCode('');
  };

  const handleResend = async () => {
    await onResend();
    setResendCooldown(60);
  };

  const handleCancel = () => {
    setVerificationCode('');
    onCancel();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 to-black border-white/10">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-[#ff6b35] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold text-white mb-1">
                Verify Your Email
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-300">
                We sent a 6-digit code to{' '}
                <span className="font-semibold text-[#ff6b35]">{newEmail}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Enter 6-digit code
            </label>
            <input
              type="text"
              maxLength={6}
              className="w-full p-4 border border-white/20 rounded-lg bg-black/20 text-white placeholder:text-gray-500 focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/50 focus:outline-none text-center text-2xl tracking-[0.5em] font-mono"
              placeholder="000000"
              value={verificationCode}
              onChange={(e) =>
                setVerificationCode(e.target.value.replace(/\D/g, ''))
              }
              autoFocus
            />
          </div>

          {isExpired && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-sm text-red-400">
                Code expired. Click &quot;Resend Code&quot; to get a new one.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={handleVerify}
              disabled={verificationCode.length !== 6 || isVerifying}
              className="w-full bg-[#ff6b35] text-white px-4 py-3 rounded-lg hover:bg-[#e55a2b] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              {isVerifying ? 'Verifying...' : 'Verify Email'}
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0 || isResending || !isExpired}
                className="flex-1 bg-white/10 text-white px-4 py-2.5 rounded-lg hover:bg-white/20 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending
                  ? 'Sending...'
                  : resendCooldown > 0
                  ? `Resend (${resendCooldown}s)`
                  : 'Resend Code'}
              </button>

              <button
                onClick={handleCancel}
                className="flex-1 bg-red-500/20 text-red-400 px-4 py-2.5 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>

          <div className="bg-[#ff6b35]/10 border border-[#ff6b35]/30 rounded-lg p-3">
            <p className="text-xs text-gray-300">
              Didn&apos;t receive the code? Check your spam folder or click resend
              {isExpired ? ' to get a new one' : ' after the code expires'}.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};