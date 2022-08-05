import { formatDistanceToNow } from "date-fns";
import { interpolate } from "src/utils/string";
import { jelloWithAuth } from "..";
import { PostedImageDTO } from "../dto/image";
import endpoints from "../endpoints";

const fromJSON = (img: PostedImageDTO): PostedImageDTO => {
  const formattedDate = new Date(img.created_at);

  return {
    ...img,
    comments: img?.comments?.reverse().map((comment) => {
      const commentDate = new Date(comment.created_at);

      return {
        ...comment,
        formatedCreatedOnDate: formatDistanceToNow(commentDate) + " ago",
      };
    }),
    formatedCreatedOnDate: formatDistanceToNow(formattedDate),
    tags: img?.tags?.map((tag) => ({
      ...tag,
      value: tag?.name || "",
      label: tag?.name || "",
    })),
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

const getPost = async (id: number): Promise<PostedImageDTO> => {
  const finalEndpoint = interpolate(endpoints.POST, { id });

  return jelloWithAuth.get(finalEndpoint).then((res) => fromJSON(res?.data));
};
const getPostsByTagId = async (id: number): Promise<PostedImageDTO[]> => {
  const finalEndpoint = interpolate(endpoints.TAG_IMAGES, { id });

  return jelloWithAuth
    .get(finalEndpoint)
    .then((res) => res?.data.map(fromJSON));
};

const getSimilarImagesByPostId = async (
  id: number
): Promise<PostedImageDTO[]> => {
  const finalEndpoint = interpolate(endpoints.GET_SIMILAR_IMAGES, { id });

  return jelloWithAuth
    .get(finalEndpoint)
    .then((res) => res?.data.map(fromJSON));
};

const PostService = {
  getFeedPosts,
  getPopularPosts,
  likePost,
  fromJSON,
  getSavedPosts,
  getPost,
  getPostsByTagId,
  getSimilarImagesByPostId,
};

export default PostService;
