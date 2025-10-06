// components/ProfileFormFields.tsx
import { ArtistFormData, UserData, } from '@/helper/type';
import React from 'react';

interface ProfileFormFieldsProps {
  isEditing: boolean;
  userData: UserData;
  artistFormData:ArtistFormData
  onUserInputChange: (field: string, value: string) => void;
  onArtistInputChange: (field: string, value: string) => void;
  onSave: () => void;
  user: any;
  artist: any;
  emailFlow: any;
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

  console.log("Artist in the Profile form field",artist)
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
            { user?.username || 'Not set'}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Email
            {emailFlow.hasPendingVerification && (
              <span className="ml-2 text-xs text-yellow-400 font-normal">
                (Pending verification)
              </span>
            )}
          </label>
          {isEditing ? (
            <div className="relative">
              <input
                type="email"
                className={`w-full p-3 border rounded-lg bg-white/5 text-white placeholder:text-gray-400 focus:ring-1 focus:outline-none ${
                  emailFlow.hasPendingVerification
                    ? 'border-yellow-500/40 focus:border-yellow-400 focus:ring-yellow-400'
                    : 'border-white/20 focus:border-[#ff6b35] focus:ring-[#ff6b35]'
                }`}
                placeholder="your.email@example.com"
                value={userData.email}
                onChange={(e) => onUserInputChange('email', e.target.value)}
                disabled={!!emailFlow.hasPendingVerification}
              />
              {emailFlow.hasPendingVerification && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full p-3 border border-white/10 rounded-lg bg-white/5 text-white flex items-center justify-between">
              <span>
                {emailFlow.pendingVerification?.currentEmail ||
                  user?.email ||
                  'Not set'}
              </span>
              {emailFlow.hasPendingVerification && (
                <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded">
                  Pending
                </span>
              )}
            </div>
          )}
          {emailFlow.hasPendingVerification && (
            <p className="text-xs text-yellow-200/80 mt-1">
              New email: {emailFlow.pendingVerification?.newEmail}
            </p>
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
              onChange={(e) => onArtistInputChange('stageName', e.target.value)}
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
        <label className="block text-sm font-medium mb-2 text-white">Bio</label>
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

      {/* Save Button - Only show when editing */}
      {isEditing && (
        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            onClick={onSave}
            className="bg-[#ff6b35] text-white px-8 py-3 rounded-lg hover:bg-[#e55a2b] transition-colors font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
};
