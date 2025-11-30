import { StandardResponse, ProfileBase, UserBase, RoleType } from "../user/type";


export interface FanProfile extends ProfileBase, UserBase {
  genres: string[];
  xHandle: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  profilePic: string;
}

export interface FanFormData {
  genres: string[];
  xHandle?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

export type UpdateFanRequest = FanFormData;

export interface UpdateFanResponse extends StandardResponse {
  fan: FanProfile;
}

export interface ProfilePictureRequest {
  file: File;
}

export interface ProfilePictureResponse extends StandardResponse {
  profilePic: string;
  fan: FanProfile;
}

export interface FanOnboardingResponse extends StandardResponse {
  role: RoleType;
  fan: FanProfile;
}
