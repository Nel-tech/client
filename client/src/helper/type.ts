import {
  ArtistProfile,
  ProfileCompletion,
} from '@/lib/api/endpoints/artist/type';
import { UserProfile, RoleType } from '@/lib/api/endpoints/user/type';
import { UploadTrackResponse, UpdateTrackDetailsRequest,UploadTrackData } from "@/lib/api/endpoints/track/type";
export interface ProfileState {
  artistProfile: ArtistProfile | null;

  loading: boolean;
  initialized: boolean;
  error: string | null;
  lastFetched: number | null;
  cacheExpiry: number;
  profileCompletionStatus: ProfileCompletion | null;
}
export type RoleTypes = RoleType


export interface ProfileActions {
 
  setArtistProfile: (profile: ArtistProfile | null) => void;
  updateArtistProfile: (updates: Partial<ArtistProfile>) => void;
  clearArtistProfile: () => void;
  fetchArtistProfile: () => Promise<void>;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
  clearError: () => void;
  clearAllProfiles: () => void;

  isDataStale: () => boolean;
  refreshCache: () => void;

  fetchProfileCompletionStatus: () => Promise<void>;
  fetchAndSetArtistData: () => Promise<void>;
  getCurrentProfile: (userRole: string) => UserProfile;
  hasProfile: (userRole: string) => boolean;
  getProfileCompletion: (userRole: string) => ProfileCompletion;
}

export type ProfileStore = ProfileState & ProfileActions;

// ===== UI COMPONENT PROPS =====
// ===== UI COMPONENT PROPS =====

export interface TabProps {
  activeTab: RoleType;
  setActiveTab: (tab: RoleType) => void;
}

export interface FileUploadProps {
  type: 'thumbnail' | 'audio';
  file: File | null;
  preview?: string | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  maxAudioSizeMB?: number;
}

export interface TrackPreviewModalProps {
  isOpen: boolean;
  formData: UploadTrackData;
  onSubmit: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export interface TrackCardProps {
  track: UploadTrackResponse;
  onUpdate?: (updatedTrack: UpdateTrackDetailsRequest) => void;
}

export interface FileUploadProps {
  type: 'thumbnail' | 'audio';
  file: File | null;
  preview?: string | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  maxAudioSizeMB?: number;
}

export interface TrackPreviewModalProps {
  isOpen: boolean;
  formData: UploadTrackData;
  onSubmit: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export interface TrackCardProps {
  track: UploadTrackResponse;
  onUpdate?: (updatedTrack: UpdateTrackDetailsRequest) => void;
}

export interface FeatureProps {
  title: string;
  subtitle: string;
  description: string;
  points: { label: string; text: string }[];
  buttonText: string;
  buttonHref: string;
  imageSrc?: string;
  imageAlt?: string;
  media?: React.ReactNode;
  reverse?: boolean;
  buttonVariant?: 'solid' | 'outline';
}

export interface FloatingCoinProps {
  icon?: React.ReactNode;
  className?: string;
  height?: number;
  delay?: number;
}

export interface PromoterRowProps {
  avatar?: string;
  username: string;
  streams: string;
  growth: string;
  rank: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GoogleProps {
  text: string;
}

export interface MusicCardProps {
  img: string;
  song: string;
  artist: string;
}

export interface CircleProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  maxValue: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

export interface Fan {
  id: string;
  name: string;
  avatar: string;
  shares: number;
  rank: number;
}

export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarItems: {
    id: string;
    label: string;
    route: string;
    icon: React.ReactNode;
  }[];
}

export interface MobileHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export interface Task {
  id: number;
  task: string;
  completed: boolean;
}

// export interface OverviewTabProps {
//   stats: any[];
// }
// export interface OverviewTabProps {
//   stats: any[];
// }

export interface ProfileProgressCardProps {
  progressPercentage: number;
  profileTasks: Array<{ id: string; task: string; completed: boolean }>;
  message?: string;
}
