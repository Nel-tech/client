import { ArtistProfile } from "../artist/type";
import { FanProfile } from "../fan/type";

export type RoleType = 'Artist' | 'Fan' | 'Admin';
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserBase {
  username: string;
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
