
export interface TagDTO {
  value: string;
  label: string;
}
export default interface ImageDTO {
  title: string;
  url: string;
  thumbnailUrl?: string;
  tags: TagDTO[];
}
