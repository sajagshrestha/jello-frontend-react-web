
export interface TagDTO {
  label: string;
  value: string;
}
export default interface ImageDTO {
  caption?: string;
  url: string;
  thumbnailUrl: string;
  tags: TagDTO[];
}
