// components/ProfileFormFields.tsx
import React, { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { EmailChangeModal } from './EmailChangeModal';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArtistFormData, ArtistProfile } from '@/lib/api/endpoints/artist/type';
import { UserFormData, BaseUser } from '@/lib/api/endpoints/user/type';
import { useRouter } from "next/navigation";
import { useIsPendingEmailChange } from '@/store/emailFlowStore';

interface ProfileFormFieldsProps {
  isEditing: boolean;
  userData: UserFormData;
  artistFormData: ArtistFormData;
  onUserInputChange: (field: string, value: string) => void;
  onArtistInputChange: (field: string, value: string) => void;
  onSave: () => void;
  user: BaseUser | null;
  artist: ArtistProfile;
  emailFlow: {
    requestChange: (data: { email: string; password: string }) => Promise<void>;
    isRequesting: boolean;
    isPending: boolean
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
  const router = useRouter();
  const checkEmailChangePending = useIsPendingEmailChange();
console.log('EmailChange', checkEmailChangePending)
  useEffect(() => {
    if (checkEmailChangePending) {
     router.push('/artist/verify-email-change'); 
    }
  }, [checkEmailChangePending, router])

  const handleRequestEmailChange = async (data: { email: string; password: string }) => {
    try {
      await emailFlow.requestChange(data);

      toast.success("Check your email", {
        description: `We sent a verification link to ${data.email}`,
      });

      router.push("/artist/verify-email-change");

    } catch (err) {
      console.error(err);
      toast.error("Email change failed", {
        description: "Please try again.",
      });
    }
  };



  return (
    <div className="space-y-6">

      {/* Username */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Username
          </label>
          {isEditing ? (
            <input
              type="text"
              className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white"
              value={userData.username}
              onChange={(e) => onUserInputChange('username', e.target.value)}
            />
          ) : (
            <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white">
              {user?.username || 'Not set'}
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Email
          </label>
          {isEditing ? (
            <div className="space-y-2">
              <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                {user?.email || 'Not set'}
              </div>


               
              <Button
               disabled={checkEmailChangePending}
                onClick={() => setShowEmailChangeModal(true)}
                className="w-full p-3 border border-[#ff6b35]/40 rounded-lg bg-[#ff6b35]/10 text-[#ff6b35]"
              >
                Change Email
              </Button>
            </div>
          ) : (
            <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              {user?.email || 'Not set'}
            </div>
          )}
        </div>
      </div>

      {/* Artist fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white"
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
              className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white"
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

      {/* Genres */}
      <div>
        <label className="block text-sm font-medium mb-2 text-white">
          Genres
        </label>
        {isEditing ? (
          <input
            type="text"
            className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white"
            value={artistFormData.genre}
            onChange={(e) => onArtistInputChange('genre', e.target.value)}
          />
        ) : (
          <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white">
            {artist?.genre || 'Not set'}
          </div>
        )}
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium mb-2 text-white">
          Bio
        </label>
        {isEditing ? (
          <textarea
            className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white resize-none"
            rows={4}
            value={artistFormData.bio}
            onChange={(e) => onArtistInputChange('bio', e.target.value)}
          />
        ) : (
          <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white min-h-[100px]">
            {artist?.bio || 'No bio added yet'}
          </div>
        )}
      </div>

      {/* Save */}
      {isEditing && (
        <div className="flex justify-end pt-4 border-t border-white/10">
          <Button
            onClick={onSave}
            className="bg-[#ff6b35] text-white px-8 py-3 rounded-lg"
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

    </div>
  );
};
