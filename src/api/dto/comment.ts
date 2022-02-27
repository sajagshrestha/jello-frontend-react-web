import { UploaderDTO } from "./user";

export interface CommentDTO {
  id: number;
  body: string;
  author: UploaderDTO;
  imageId: number;
  parentId?: number;
  replies?: CommentDTO[];
  replies_count?: number;
  date: Date;
  created_at: Date;
  formatedCreatedOnDate: string;
}

export interface PostCommentDTO {
  body: string;
  imageId: number;
  parentId?: number;
}
