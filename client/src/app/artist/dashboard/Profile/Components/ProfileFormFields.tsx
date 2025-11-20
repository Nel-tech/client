// components/ProfileFormFields.tsx
import { ArtistFormData, UserBase, BaseUser, ArtistProfile, GetPendingResponse } from '@/helper/type';
import React, { useState, useEffect, useRef } from 'react';
import { Mail, AlertCircle } from 'lucide-react';
import { EmailChangeModal } from './EmailChangeModal';
import { EmailVerificationModal } from './EmailVerificationModal';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface ProfileFormFieldsProps {
  isEditing: boolean;
  userData: UserBase;
  artistFormData: ArtistFormData;
  onUserInputChange: (field: string, value: string) => void;
  onArtistInputChange: (field: string, value: string) => void;
  onSave: () => void;
  user: BaseUser;
  artist: ArtistProfile;
  emailFlow: {
    pendingVerification:GetPendingResponse
    hasPendingVerification: boolean;
    requestChange: (data: { email: string; password: string }) => Promise<void>;
    verifyChange: (data: { verificationCode: string }) => Promise<void>;
    resendCode: () => Promise<void>;
    cancelChange: () => Promise<void>;
    isRequesting: boolean;
    isVerifying: boolean;
    isResending: boolean;
  };
  isSaving: boolean;
}

export const ProfileFormFields = ({
  isEditing,
  userData,
  artistFormData,
  onUserInputChange,
  onArtistInputChange,
  onSave,
  user,
  artist,
  emailFlow,
  isSaving,
}: ProfileFormFieldsProps) => {
  const [showEmailChangeModal, setShowEmailChangeModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const previousPendingState = useRef(emailFlow.hasPendingVerification);
  const hasJustRequestedChange = useRef(false);
  const hasShownExpiredToast = useRef(false);

  useEffect(() => {
    const pendingChanged = !previousPendingState.current && emailFlow.hasPendingVerification;
    
    if (pendingChanged && hasJustRequestedChange.current) {
      setShowVerificationModal(true);
      hasJustRequestedChange.current = false;
    }
    
    previousPendingState.current = emailFlow.hasPendingVerification;
  }, [emailFlow.hasPendingVerification]);

  // Show toast when code expires
  useEffect(() => {
    if (
      emailFlow.hasPendingVerification && 
      emailFlow.pendingVerification?.pendingEmailChange?.isExpired && 
      !hasShownExpiredToast.current
    ) {
      toast.warning('Verification code expired', {
        description: 'Please request a new code to continue.',
      });
      hasShownExpiredToast.current = true;
    }

    // Reset the flag when code is no longer expired or no pending verification
    if (!emailFlow.hasPendingVerification || !emailFlow.pendingVerification?.pendingEmailChange?.isExpired) {
      hasShownExpiredToast.current = false;
    }
  }, [emailFlow.hasPendingVerification, emailFlow.pendingVerification?.pendingEmailChange?.isExpired]);

  const handleRequestEmailChange = async (data: { email: string; password: string }) => {
    try {
      hasJustRequestedChange.current = true;
      await emailFlow.requestChange(data);
      setShowEmailChangeModal(false);
      
      toast.success('Verification code sent!', {
        description: `Check your inbox at ${data.email}`,
      });
      
    } catch (error) {
      hasJustRequestedChange.current = false;
      console.error('Request email change error:', error);
      toast.error('Failed to send verification code', {
        description: 'Please try again or contact support.',
      });
      throw error;
    }
  };

  const handleVerifyCode = async (verificationCode: string) => {
    try {
      await emailFlow.verifyChange({ verificationCode });
      onUserInputChange('email', emailFlow.pendingVerification?.pendingEmailChange?.newEmail || '');
      setShowVerificationModal(false);
      
      toast.success('Email verified successfully!', {
        description: 'Your email has been updated.',
      });
    } catch (error) {
      console.error('Verify email error:', error);
      toast.error('Verification failed', {
        description: 'Invalid code or code expired. Please try again.',
      });
      throw error;
    }
  };

  const handleResendCode = async () => {
    try {
      await emailFlow.resendCode();
      toast.success('New code sent!', {
        description: 'Check your inbox for the new verification code.',
      });
    } catch (error) {
      console.error('Resend code error:', error);
      toast.error('Failed to resend code', {
        description: 'Please try again.',
      });
      throw error;
    }
  };

  const handleCancelEmailChange = async () => {
    try {
      await emailFlow.cancelChange();
      onUserInputChange('email', user?.email || '');
      setShowVerificationModal(false);
      
      toast.info('Email change cancelled', {
        description: 'Your email remains unchanged.',
      });
    } catch (error) {
      console.error('Cancel email change error:', error);
      toast.error('Failed to cancel email change');
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Username
          </label>
          {isEditing ? (
            <input
              type="text"
              className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-gray-400 focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35] focus:outline-none"
              placeholder="Your username"
              value={userData.username}
              onChange={(e) => onUserInputChange('username', e.target.value)}
            />
          ) : (
            <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white">
              {user?.username || 'Not set'}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Email
          </label>
          {isEditing ? (
            <div className="space-y-2">
              <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {emailFlow.pendingVerification?.pendingEmailChange?.newEmail ||
                    user?.email ||
                    'Not set'}
                </span>
                {emailFlow.hasPendingVerification && (
                  <span className="text-xs text-[#ff6b35] bg-[#ff6b35]/20 px-2 py-1 rounded flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {emailFlow.pendingVerification?.pendingEmailChange?.isExpired ? 'Expired' : 'Pending'}
                  </span>
                )}
              </div>
              
              {emailFlow.hasPendingVerification ? (
                <Button
                  onClick={() => setShowVerificationModal(true)}
                  className="w-full p-3 border border-[#ff6b35]/40 rounded-lg bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35]/20 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {emailFlow.pendingVerification?.pendingEmailChange?.isExpired ? 'Resend Code' : 'Verify Email'}
                </Button>
              ) : (
                <Button
                  onClick={() => setShowEmailChangeModal(true)}
                  className="w-full p-3 border border-[#ff6b35]/40 rounded-lg bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35]/20 transition-colors font-medium text-sm"
                >
                  Change Email
                </Button>
              )}
            </div>
          ) : (
            <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              {user?.email || 'Not set'}
            </div>
          )}
        </div>
      </div>

      {/* Artist Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-gray-400 focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35] focus:outline-none"
              placeholder="Your full name"
              value={artistFormData.fullName ?? ''}
              onChange={(e) => onArtistInputChange('fullName', e.target.value)}
            />
          ) : (
            <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white">
              {artist?.fullName || 'Not set'}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Stage Name
          </label>
          {isEditing ? (
            <input
              type="text"
              className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-gray-400 focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35] focus:outline-none"
              placeholder="Your stage name"
              value={artistFormData.stageName}
              onChange={(e) =>
                onArtistInputChange('stageName', e.target.value)
              }
            />
          ) : (
            <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white">
              {artist?.stageName || 'Not set'}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-white">
          Genres
        </label>
        {isEditing ? (
          <input
            type="text"
            className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-gray-400 focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35] focus:outline-none"
            placeholder="Electronic, Pop, Dance"
            value={artistFormData.genre}
            onChange={(e) => onArtistInputChange('genre', e.target.value)}
          />
        ) : (
          <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white">
            {artist?.genre || 'Not set'}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-white">
          Bio
        </label>
        {isEditing ? (
          <textarea
            className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-gray-400 focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35] focus:outline-none resize-none"
            rows={4}
            placeholder="Tell your fans about yourself..."
            value={artistFormData.bio}
            onChange={(e) => onArtistInputChange('bio', e.target.value)}
          />
        ) : (
          <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white min-h-[100px]">
            {artist?.bio || 'No bio added yet'}
          </div>
        )}
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end pt-4 border-t border-white/10">
          <Button
            onClick={onSave}
            className="bg-[#ff6b35] text-white px-8 py-3 rounded-lg hover:bg-[#e55a2b] transition-colors font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}

      {/* Email Change Modal */}
      <EmailChangeModal
        isOpen={showEmailChangeModal}
        currentEmail={user?.email || ''}
        onRequestChange={handleRequestEmailChange}
        onClose={() => setShowEmailChangeModal(false)}
        isRequesting={emailFlow.isRequesting}
      />

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showVerificationModal}
        newEmail={emailFlow.pendingVerification?.pendingEmailChange?.newEmail || ''}
        isExpired={emailFlow.pendingVerification?.pendingEmailChange?.isExpired || false}
        onVerify={handleVerifyCode}
        onResend={handleResendCode}
        onCancel={handleCancelEmailChange}
        isVerifying={emailFlow.isVerifying}
        isResending={emailFlow.isResending}
      />
    </div>
  );
};