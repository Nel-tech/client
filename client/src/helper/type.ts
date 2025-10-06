// ===== CORE TYPES =====

export type RoleType = 'Artist' | 'Fan';

export interface BaseUser {
  id: string | null;
  username: string | null;
  email: string | null;
  role: RoleType  ;
  createdAt: string;
}

export interface ArtistProfile extends BaseUser {
  id: string;
  fullName: string | null;
  stageName: string | null;
  bio: string | null;
  genre: string | null;
  profilePic: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface FanProfile extends BaseUser {
  id: string;
  displayName: string | null;
  profilePic: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ArtistFormData {
  fullName: string ;
  stageName: string ;
  genre: string ;
  bio: string ;
}

export interface UserData {
  username: string;
  email: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ResendVerificationResponse {
  message: string;
}
export interface EmailVerification{
  email:string;
  code:string;
}
// ===== AUTH TYPES =====

export interface AuthResponse {
  user: BaseUser;
  token?: string;
}

// ===== USER UPDATE TYPES =====

export interface UpdateUserRequest {
  username: string;
}

export interface UpdateUserResponse {
  message: string;
  user: BaseUser;
}

// ===== EMAIL VERIFICATION TYPES =====

export interface EmailChangeRequest {
  email: string;
}

export interface EmailVerificationRequest {
  verificationCode: string;
}

export interface EmailChangeResponse {
  message: string;
  pendingVerification: {
    currentEmail: string;
    newEmail: string;
  };
}

export interface MessageResponse {
  message: string;
}

// ===== ARTIST PROFILE TYPES =====

export interface UpdateArtistRequest {
  fullName: string;
  stageName: string;
  genre: string;
  bio: string;
}

export interface UpdateArtistResponse {
  message: string;
  artist: ArtistProfile;
  profileCompletion?: {
    percentage: number;
    message: string;
  };
}

// ===== FILE UPLOAD TYPES =====

export interface ProfilePictureRequest {
  file: File;
}

export interface ProfilePictureResponse {
  message: string;
  profilePic: string;
  artist: ArtistProfile;
  profileCompletion?: {
    percentage: number;
    message: string;
  };
}

// ===== ONBOARDING TYPES =====

export interface OnboardingResponse {
  message: string;
  role: RoleType;
  artist: ArtistProfile;
}

export type UserProfile = ArtistProfile | FanProfile | null;

export interface ProfileState {
  artistProfile: ArtistProfile | null;
  fanProfile: FanProfile | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
  // Keep cache for current session only (in memory)
  lastFetched: number | null;
  cacheExpiry: number;
  profileCompletionStatus: any | null;
}

export interface ProfileActions {
  // Artist profile actions
  setArtistProfile: (profile: ArtistProfile | null) => void;
  updateArtistProfile: (updates: Partial<ArtistProfile>) => void;
  clearArtistProfile: () => void;

  // Fan profile actions
  setFanProfile: (profile: FanProfile | null) => void;
  updateFanProfile: (updates: Partial<FanProfile>) => void;
  clearFanProfile: () => void;

  // General actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
  clearError: () => void;
  clearAllProfiles: () => void;

  // Cache management (memory only)
  isDataStale: () => boolean;
  refreshCache: () => void;

  // API integration
  fetchArtistProfile: () => Promise<void>;
  fetchProfileCompletionStatus: () => Promise<void>;
  fetchAndSetArtistData: () => Promise<void>;

  // Helper methods
  getCurrentProfile: (userRole: string) => UserProfile;
  hasProfile: (userRole: string) => boolean;
  getProfileCompletion: (userRole: string) => {
    percentage: number;
    missingFields: string[];
  };
}

export type ProfileStore = ProfileState & ProfileActions;

export interface TabProps {
  activeTab: RoleType;
  setActiveTab: (tab: RoleType) => void;
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


// Artist Dashboard Interface
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

export interface Tracks {
  id: string;
  title: string;
  platform: string;
  shares: number;
  streams: number;
  goal: number;
  isActive: boolean;
  thumbnail: string;
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
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarItems: { id: string; label: string; icon: React.ReactNode }[];
}

export interface MobileHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export interface Task {
  id: number;
  task: string;
  completed: boolean;
}
export interface OverviewTabProps {
  stats: any[];
}
export interface ProfileProgressCardProps {
  progressPercentage: number;
  profileTasks: Array<{ id: string; task: string; completed: boolean }>;
  message?: string;
}

// export interface HowItWorksSteps{
//     number: string;
//     icon: React.ReactNode;
//     headline: string;
//     description: string;
// }
