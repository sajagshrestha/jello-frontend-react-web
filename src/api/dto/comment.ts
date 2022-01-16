import { UploaderDTO } from "./user";

export interface CommentDTO {
  id: number;
  body: string;
  author: UploaderDTO;
  imageId: number;
  parentId?: number;
  replies?: CommentDTO[];
  replies_count?: number;
}
