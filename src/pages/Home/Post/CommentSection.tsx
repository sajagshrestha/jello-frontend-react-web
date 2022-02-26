import { Button, TextField } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { CommentDTO, PostCommentDTO } from "src/api/dto/comment";
import CommentService from "src/api/services/comment-service";
import { FlexRow } from "src/theme/baseStyles";
import Comment from "./Comment";
import {
  CommentForm,
  CommentSectionContainer,
  CommentTextFiledContainer,
} from "./Post.styles";

interface PROPS {
  id: number;
  comments: CommentDTO[] | [];
}

const CommentSection: React.FC<PROPS> = ({ id, comments }) => {
  const queryClient = useQueryClient();

  const postCommentMutation = useMutation(CommentService.postComment);

  interface INITIAL_VALUES {
    comment: string;
  }
  const initialValues: INITIAL_VALUES = {
    comment: "",
  };

  const onSubmit = async (
    values: INITIAL_VALUES,
    formikHelpers: FormikHelpers<INITIAL_VALUES>
  ) => {
    const paylaod: PostCommentDTO = {
      imageId: +id,
      body: values.comment,
    };

    await postCommentMutation.mutateAsync(paylaod);
    queryClient.invalidateQueries("Post");
    formikHelpers.resetForm();
  };

  const { handleSubmit, handleChange, values, touched, errors, resetForm } =
    useFormik({
      initialValues,
      onSubmit,
    });

  const onClearClick = () => {
    resetForm();
  };

  return (
    <CommentSectionContainer>
      <h3>Comments</h3>
      <CommentForm onSubmit={handleSubmit}>
        <CommentTextFiledContainer>
          <TextField
            fullWidth
            placeholder="Add a comment"
            multiline
            rows={3}
            name="comment"
            value={values.comment}
            onChange={handleChange}
            helperText={touched.comment && errors.comment}
            error={touched.comment && !!errors.comment}
          />
          <FlexRow>
            <Button variant="outlined" onClick={onClearClick}>
              Clear
            </Button>
            <Button type="submit">Comment</Button>
          </FlexRow>
        </CommentTextFiledContainer>
      </CommentForm>
      {comments.map((comment: CommentDTO) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </CommentSectionContainer>
  );
};

export default CommentSection;
