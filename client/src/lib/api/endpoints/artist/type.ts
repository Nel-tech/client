import { ProfileBase, BaseUser, StandardResponse, RoleType } from "@/lib/api/endpoints/user/type";

export interface ArtistProfile extends ProfileBase, BaseUser {
  fullName: string | null;
  stageName: string | null;
  bio: string | null;
  genre: string | null;
}
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


