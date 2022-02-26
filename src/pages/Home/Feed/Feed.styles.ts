import styled, { css } from "styled-components";

const feedSpacing = css`
  padding: 0 2rem;
`;
export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 0;
`;
interface FeedSeparatorProps {
  center?: boolean;
}

export const FeedSeparator = styled.div<FeedSeparatorProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.center ? "center" : "flex-start")};
  border-bottom: ${({ theme }) => theme.border};

  ${feedSpacing}
`;

export const FeedTitleSection = styled.div`
  width: 650px;
  padding: 1rem 0;
`;

export const FeedTitle = styled.h2``;
