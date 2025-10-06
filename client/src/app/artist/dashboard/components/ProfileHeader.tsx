import { Edit3, X } from 'lucide-react';

interface ProfileHeaderProps {
  isEditing: boolean;
  onEditToggle: () => void;
  disabled?: boolean;
}

export const ProfileHeader = ({
  isEditing,
  onEditToggle,
  disabled,
}: ProfileHeaderProps) => (
  <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold text-white">Profile</h1>

    <div className="flex items-center gap-3">
      {isEditing ? (
        <button
          onClick={onEditToggle}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          disabled={disabled}
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
      ) : (
        <button
          onClick={onEditToggle}
          className="flex items-center gap-2 text-[#ff6b35] hover:text-[#e55a2b] transition-colors"
        >
          <Edit3 className="h-4 w-4" />
          Edit Profile
        </button>
      )}
    </div>
  </div>
);
