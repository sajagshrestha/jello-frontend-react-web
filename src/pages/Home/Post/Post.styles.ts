import styled from "styled-components";

export const CommentSectionContainer = styled.div`
  width: 100%;
  padding-bottom: 2rem;

  h3 {
    margin-bottom: 0.5rem;
  }
`;

export const CommentTextFiledContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-end;
`;

export const CommentForm = styled.form`
  width: 100%;
`;

export const CommentContainer = styled.div`
  margin: 1rem 0;
`;
export const CommentAvatar = styled.div``;
export const CommentContent = styled.div``;
export const CommentAuthor = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
`;
export const CommentText = styled.p``;
export const CommentDate = styled.p`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.secondaryText};
`;
