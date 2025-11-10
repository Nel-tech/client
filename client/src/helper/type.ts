// ===== CORE TYPES =====

// Shared base types
export type RoleType = 'Artist' | 'Fan';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserBase {
  username: string | null;
  email: string | null;
  role: RoleType;
  hasOnboarded:boolean
}

export interface ProfileBase extends BaseEntity {
  profilePic: string | null;
}

// User types
export interface BaseUser extends UserBase {
  id: string | null;
  createdAt: string;
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

// Form data types
export interface ArtistFormData {
  fullName: string;
  stageName: string;
  genre: string;
  bio: string;
}

export interface UserData {
  username: string;
  email: string;
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


export interface EmailVerification {
  verificationCode: string;
  email:string;
}
export interface ResendVerificationRequest {
  email: string| null
}


export interface ResendVerificationResponse {
  message: string;
  success: boolean;
  expiresIn?:string
}

// ===== EMAIL VERIFICATION TYPES ENDS HERE =====



export interface EmailChangeRequest {
  email: string;
  password: string;
}

export interface VerifyEmailChangeRequest {
  verificationCode: string;
}

// Response types
export interface EmailChangeResponse {
  message: string;
  data?: {
    currentEmail: string;
    newEmail: string;
    expiresIn: string;
  };
}

export interface VerifyEmailChangeResponse {
  message: string;
  user:BaseUser
}

export interface ResendCodeResponse {
  message: string;
  expiresIn?: string;
}

export interface CancelChangeResponse {
  message: string;
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



// ===== TRACK UPLOAD TYPES =====
export interface UploadTrackData {
  title: string;
  description?: string;
  genre: string;
  consent: boolean;
  track: File | null;
  thumbnail: File | null;
}



export interface TrackPreviewModalProps {
  isOpen: boolean;
  formData: UploadTrackData;
  onSubmit: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export interface FileUploadProps {
  type: 'thumbnail' | 'audio';
  file: File | null;
  preview?: string | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  maxAudioSizeMB?: number;
}



export interface UploadTrackResponse {
  status: 'success';
  message: string;
  track: {
    id: string;
    title: string;
    slug: string;
    genre: string;
    description?: string;
    thumbnail: string; 
    track: string;
    artistId: string;
    createdAt: string;
  };
}

export interface UpdateTrackDetailsRequest {
  id: string;
  title?: string;
  description?: string;
  genre?: string;
  thumbnail?: File | null;
}

export interface TrackResponse {
  id: string;
  title: string;
  slug: string;
  genre: string;
  duration:number;
  description?: string;
  thumbnail: string; 
  track: string;
  artistId: string;
  createdAt: string;
  updatedAt: string;
}
export interface TrackCardProps {
  track: TrackResponse;
  onUpdate?: (updatedTrack: UpdateTrackDetailsRequest) => void;
}

export interface GetTracksResponse {
  status: 'success';
  results: number;
  tracks: TrackResponse[];
}

export interface DeleteTrackResponse {
  status: 'success';
  message: string;
}

export interface PermissionsResponse {
  status: 'success';
  data: {
    tier: string;
    features: {
      canDelete: boolean;
      canEdit: boolean;
      // canBulkUpload: boolean;
      // canScheduleRelease: boolean;
      maxFileSize: number;
      // analyticsAccess: boolean;
    };
    editableFields: string[];
  };
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
  profileCompletion?: ProfileCompletion;
}

// ===== FILE UPLOAD TYPES =====

export interface ProfilePictureRequest {
  file: File;
}

export interface ProfilePictureResponse {
  message: string;
  profilePic: string;
  artist: ArtistProfile;
  profileCompletion?: ProfileCompletion;
}

// ===== ONBOARDING TYPES =====

export interface OnboardingResponse {
  message: string;
  role: RoleType;
  artist: ArtistProfile;
}

// ===== PROFILE TYPES =====

export type UserProfile = ArtistProfile | FanProfile | null;

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
  setArtistProfile: (profile: ArtistProfile | null) => void;
  updateArtistProfile: (updates: Partial<ArtistProfile>) => void;
  clearArtistProfile: () => void;

  setFanProfile: (profile: FanProfile | null) => void;
  updateFanProfile: (updates: Partial<FanProfile>) => void;
  clearFanProfile: () => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
  clearError: () => void;
  clearAllProfiles: () => void;

  isDataStale: () => boolean;
  refreshCache: () => void;

  fetchArtistProfile: () => Promise<void>;
  fetchProfileCompletionStatus: () => Promise<void>;
  fetchAndSetArtistData: () => Promise<void>;

  getCurrentProfile: (userRole: string) => UserProfile;
  hasProfile: (userRole: string) => boolean;
  getProfileCompletion: (userRole: string) => ProfileCompletion;
}

export type ProfileStore = ProfileState & ProfileActions;

export interface ProfileCompletion {
  percentage: number;
  missingFields: string[];
}

// ===== UI COMPONENT TYPES =====

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


