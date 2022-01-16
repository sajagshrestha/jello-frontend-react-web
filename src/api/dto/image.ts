import { CommentDTO } from "./comment";
import { TagDTO } from "./tag";
import { UploaderDTO } from "./user";

export default interface ImageDTO {
  id?: number;
  caption?: string;
  url: string;
  thumbnailUrl: string;
  uploader?: UploaderDTO;
  tags: TagDTO[] | [];
  comments?: CommentDTO[];
  likes_count?: number;
  created_at?: Date;
}

export interface PostedImageDTO {
  id: number;
  caption: string;
  url: string;
  thumbnailUrl: string;
  uploader: UploaderDTO;
  tags: TagDTO[] | [];
  comments: CommentDTO[] | [];
  likes_count: number;
  created_at: Date;
  formatedCreatedOnDate: string;
  isLiked: boolean;
  isSaved: boolean;
}
