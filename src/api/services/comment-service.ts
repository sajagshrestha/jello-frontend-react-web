import { jelloWithAuth } from "..";
import { PostCommentDTO } from "../dto/comment";
import endpoints from "../endpoints";

const postComment = async (payload: PostCommentDTO) => {
  return await jelloWithAuth.post(endpoints.POST_COMMENT, payload);
};

const CommentService = {
  postComment,
};

export default CommentService;
