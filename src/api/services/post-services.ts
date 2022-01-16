import { formatDistanceToNow } from "date-fns";
import { interpolate } from "src/utils/string";
import { jelloWithAuth } from "..";
import { PostedImageDTO } from "../dto/image";
import endpoints from "../endpoints";

const fromJSON = (img: PostedImageDTO): PostedImageDTO => {
  const formattedDate = new Date(img.created_at);

  return {
    ...img,
    formatedCreatedOnDate: formatDistanceToNow(formattedDate),
  };
};

const getFeedPosts = async (): Promise<PostedImageDTO[]> => {
  return jelloWithAuth
    .get(endpoints.POPULAR)
    .then((res) => res?.data.map(fromJSON));
};

const likePost = async (postId: number) => {
  return jelloWithAuth.post(interpolate(endpoints.LIKE_IMAGE, { postId }));
};

const unLikePost = async (postId: number) => {
  return jelloWithAuth.post(interpolate(endpoints.LIKE_IMAGE, { postId }));
};
// const getPersonalPosts = async () => {

// }

const PostService = {
  getFeedPosts,
  likePost,
  unLikePost,
};

export default PostService;
