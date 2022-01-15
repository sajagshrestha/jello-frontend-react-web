import { formatDistanceToNow } from "date-fns";
import { jelloWithAuth } from "..";
import { CommentDTO, TagDTO, UploaderDTO } from "../dto/image";
import endpoints from "../endpoints";

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
}

const getFeedPosts = async (): Promise<PostedImageDTO[]> => {
  return jelloWithAuth.get(endpoints.POPULAR).then((res) => {
    return res?.data.map((img: PostedImageDTO) => {
      const formattedDate = new Date(img.created_at);

      return {
        ...img,
        formatedCreatedOnDate: formatDistanceToNow(formattedDate),
      };
    });
  });
};

// const getPersonalPosts = async () => {

// }

const PostService = {
  getFeedPosts,
};

export default PostService;
