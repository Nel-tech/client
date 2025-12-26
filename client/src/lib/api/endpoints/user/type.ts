// ===== ROLE TYPES =====
export type RoleType = 'Artist' | 'Fan' | 'Admin';

// ===== BASE ENTITY =====
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BaseUser {
  id: string;
  username: string;
  email: string | null;
  role: RoleType;
  hasOnboarded: boolean;
  createdAt: string;
}

export type UserFormData = Pick<BaseUser, 'username' | 'email'>;


// ===== PROFILE TYPES =====
import { ArtistProfile } from '../artist/type';
import { FanProfile } from '../fan/type';

export interface ProfileBase extends BaseEntity {
  profilePic: string | null;
}

export type UserProfile = ArtistProfile | FanProfile | null;

// ===== STANDARD API RESPONSE =====
export interface StandardResponse<T = void> {
  message: string;
  status?: string;
  success?: boolean;
}

// ===== AUTH & USER RESPONSES =====
export interface AuthResponse {
  user: BaseUser;
  token?: string;
}

export interface UpdateUserRequest {
  username: string;
}

export interface UpdateUserResponse extends StandardResponse {
  user: BaseUser;
}

// ===== EMAIL VERIFICATION =====
export interface EmailVerification {
  code: string;
  email: string;
}

export interface ResendVerificationRequest {
  email: string | null;
}

export interface ResendVerificationResponse extends StandardResponse {
  success: boolean;
  expiresIn?: string;
}

// ===== EMAIL CHANGE =====
export interface EmailChangeRequest {
  email: string;
  password: string;
}

export interface VerifyEmailChangeRequest {
  verificationToken: string;
}

export interface EmailChangeResponse extends StandardResponse {
  pendingEmailChange?: { 
    currentEmail: string;
    newEmail: string;
    expiresAt: string;
    isExpired: boolean;
  };
}

export interface ResendToken {
  message: string;
  success: boolean;
  expiresIn?: string;
}

export interface CancelEmailChangeToken {
  message: string;
}

export interface VerifyEmailChangeResponse extends StandardResponse {
  user: BaseUser;
}

// ===== PENDING EMAIL CHANGE =====
export interface PendingEmailVerification {
  currentEmail: string;
  newEmail: string;
  expiresAt: string;
  isExpired: boolean;
}

export interface GetPendingResponse {
  pendingEmailChange: PendingEmailVerification | null;
}
