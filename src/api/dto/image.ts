export default interface ImageDTO {
  title: string;
  url: string;
  thumbnailUrl?: string;
  tags?: string[] | [];
}