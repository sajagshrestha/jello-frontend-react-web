import { PostedImageDTO } from "./image";

export interface ProfileDTO {
  id: number;
  username: string;
  followerCount: number;
  followingCount?: number;
  images: PostedImageDTO[];
}
