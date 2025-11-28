// ===== BASE TYPES =====

export type RoleType = 'Artist' | 'Fan' | 'Admin';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserBase {
  username: string ;
  email: string | null;
  role: RoleType;
  hasOnboarded: boolean;
}

// ===== USER & PROFILE TYPES =====

export interface BaseUser extends UserBase, Pick<BaseEntity, 'createdAt'> {
  id: string | null;
}

export interface ProfileBase extends BaseEntity {
  profilePic: string | null;
}

export interface ArtistProfile extends ProfileBase, UserBase {
  fullName: string | null;
  stageName: string | null;
  bio: string | null;
  genre: string | null;
}

export interface FanProfile extends ProfileBase, UserBase {
  displayName: string | null;
}

export type UserProfile = ArtistProfile | FanProfile | null;

// ===== AUTH & USER MANAGEMENT =====

export interface AuthResponse {
  user: BaseUser;
  token?: string;
}

export interface UpdateUserRequest {
  username: string;
}

export interface StandardResponse<T = void> {
  message: string;
  status?: string;
  success?: boolean;
}

export interface UpdateUserResponse extends StandardResponse {
  user: BaseUser;
}

// ===== EMAIL VERIFICATION & CHANGES =====

export interface EmailVerification {
  verificationCode: string;
  email: string;
}

export interface ResendVerificationRequest {
  email: string | null;
}

export interface ResendVerificationResponse extends StandardResponse {
  success: boolean;
  expiresIn?: string;
}

export interface EmailChangeRequest {
  email: string;
  password: string;
}

export interface VerifyEmailChangeRequest {
  verificationCode: string;
}

export interface EmailChangeResponse extends StandardResponse {
  data?: {
    currentEmail: string;
    newEmail: string;
    expiresIn: string;
  };
}

export interface VerifyEmailChangeResponse extends StandardResponse {
  user: BaseUser;
}

export interface PendingEmailVerification {
  currentEmail: string;
  newEmail: string;
  expiresAt: string;
  isExpired: boolean;
}

export interface GetPendingResponse {
  pendingEmailChange: PendingEmailVerification | null;
}

// ===== TRACK TYPES =====

// Artist info that comes with tracks
export interface TrackArtist {
  id: string;
  fullName: string;
  stageName: string;
  profilePic: string | null;
}

// Updated Track interface to match API response
export interface Track extends BaseEntity {
  id: string;
  title: string;
  slug: string;
  description: string ;
  genre: string;
  thumbnail: string;
  trackUrl: string; 
  duration: number; 
  consent: boolean;
  artistId: string;
  isVerified: boolean;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reviewedBy: string | null;
  reviewedAt: string | null;
  rejectionReason: string | null;
  createdAt: string;
  artist: TrackArtist; 
}

export interface UploadTrackData {
  status: string;
  title: string;
  description?: string;
  genre: string;
  consent: boolean;
  track: File | null;
  thumbnail: File | null;
}


export interface UploadTrackResponse extends StandardResponse, Track {}

export interface UpdateTrackDetailsRequest {
  trackId: string;
  title?: string;
  description?: string;
  genre?: string;
  thumbnail?: File | null;
}


export interface GetTracksResponse extends StandardResponse {
  status: 'success';
  results: number;
  tracks: Track[]; 

}
export interface DeleteTrackResponse extends StandardResponse {
  status: 'success';
}

export interface PermissionsResponse {
  status: 'success';
  data: {
    tier: string;
    features: {
      canDelete: boolean;
      canEdit: boolean;
      maxFileSize: number;
    };
    editableFields: string[];
  };
}
// ===== ARTIST PROFILE MANAGEMENT =====

export interface ArtistFormData {
  fullName: string;
  stageName: string;
  genre: string;
  bio: string;
}

export type UpdateArtistRequest = ArtistFormData;

export interface ProfileCompletion {
  percentage: number;
  missingFields: string[];
}

export interface UpdateArtistResponse extends StandardResponse {
  artist: ArtistProfile;
  profileCompletion?: ProfileCompletion;
}

export interface ProfilePictureRequest {
  file: File;
}

export interface ProfilePictureResponse extends StandardResponse {
  profilePic: string;
  artist: ArtistProfile;
  profileCompletion?: ProfileCompletion;
}

export interface OnboardingResponse extends StandardResponse {
  role: RoleType;
  artist: ArtistProfile;
}

// ===== PROFILE STORE =====

export interface ProfileState {
  artistProfile: ArtistProfile | null;
  fanProfile: FanProfile | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
  lastFetched: number | null;
  cacheExpiry: number;
  profileCompletionStatus: ProfileCompletion | null;
}

export interface ProfileActions {
  // Artist profile actions
  setArtistProfile: (profile: ArtistProfile | null) => void;
  updateArtistProfile: (updates: Partial<ArtistProfile>) => void;
  clearArtistProfile: () => void;
  fetchArtistProfile: () => Promise<void>;

  // Fan profile actions
  setFanProfile: (profile: FanProfile | null) => void;
  updateFanProfile: (updates: Partial<FanProfile>) => void;
  clearFanProfile: () => void;

  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
  clearError: () => void;
  clearAllProfiles: () => void;

  // Cache management
  isDataStale: () => boolean;
  refreshCache: () => void;

  // Profile operations
  fetchProfileCompletionStatus: () => Promise<void>;
  fetchAndSetArtistData: () => Promise<void>;
  getCurrentProfile: (userRole: string) => UserProfile;
  hasProfile: (userRole: string) => boolean;
  getProfileCompletion: (userRole: string) => ProfileCompletion;
}

export type ProfileStore = ProfileState & ProfileActions;

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
  sidebarItems: { id: string; label: string; route:string; icon: React.ReactNode }[];
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

export interface ProfileProgressCardProps {
  progressPercentage: number;
  profileTasks: Array<{ id: string; task: string; completed: boolean }>;
  message?: string;
}
