export interface TagDTO {
  label: string;
  value: string;
  id?: string;
  name?: string;
}

export interface UploaderDTO {
  id: number;
  username: string;
}

export interface CommentDTO {
  id: number;
  body: string;
  author: UploaderDTO;
  imageId: number;
  parentId?: number;
  replies?: CommentDTO[];
  replies_count?: number;
}
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
