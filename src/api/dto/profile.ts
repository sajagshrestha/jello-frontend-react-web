import { PostedImageDTO } from "./image";

export interface ProfileDTO {
  id: number;
  username: string;
  isFollowing?: boolean;
  followerCount: number;
  followingCount?: number;
  postCount: number;
  images: PostedImageDTO[];
}
