import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CommentDTO } from "src/api/dto/comment";
import ROUTES from "src/Router/routes";
import { FlexRow } from "src/theme/baseStyles";
import { getAvatar } from "src/utils/avatar";
import { interpolate } from "src/utils/string";
import {
  CommentContainer,
  CommentAvatar,
  CommentContent,
  CommentAuthor,
  CommentText,
  CommentDate,
} from "./Post.styles";

interface PROPS {
  comment: CommentDTO;
}

const Comment: React.FC<PROPS> = ({ comment }) => {
  const navigate = useNavigate();

  const redirectToProfile = () => {
    const profileLink = interpolate(ROUTES.PROFILE, { id: comment.author.id });
    navigate(profileLink);
  };

  return (
    <CommentContainer>
      <FlexRow>
        <CommentAvatar>
          <Avatar
            src={getAvatar(comment.author.id)}
            onClick={redirectToProfile}
          />
        </CommentAvatar>
        <CommentContent>
          <FlexRow gap="0.5rem">
            <CommentAuthor>{comment.author.username}</CommentAuthor>
            <CommentDate>{comment.formatedCreatedOnDate}</CommentDate>
          </FlexRow>
          <CommentText>{comment.body}</CommentText>
        </CommentContent>
      </FlexRow>
    </CommentContainer>
  );
};

export default Comment;
