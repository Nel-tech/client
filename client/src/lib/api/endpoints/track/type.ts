import { StandardResponse, BaseEntity } from "../user/type";

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
  description: string;
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