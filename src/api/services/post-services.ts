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
    .get(endpoints.FEED)
    .then((res) => res?.data.map(fromJSON));
};

const getPopularPosts = async (): Promise<PostedImageDTO[]> => {
  return jelloWithAuth
    .get(endpoints.POPULAR)
    .then((res) => res?.data.map(fromJSON));
};

const likePost = async (postId: number) => {
  return jelloWithAuth.post(interpolate(endpoints.LIKE_IMAGE, { id: postId }));
};

const getSavedPosts = async (): Promise<PostedImageDTO[]> => {
  return jelloWithAuth
    .get(endpoints.SAVED_IMAGE)
    .then((res) => res?.data.map(fromJSON));
};

const PostService = {
  getFeedPosts,
  getPopularPosts,
  likePost,
  fromJSON,
  getSavedPosts,
};

export default PostService;
