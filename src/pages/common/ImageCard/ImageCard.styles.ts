import styled, { css } from "styled-components";

const spacing = css`
  padding-top: 0.5rem;
`;

export const ImageCardContainer = styled.div`
  width: 100%;
`;

export const TitleSection = styled.div``;

export const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const PostInfoSection = styled.div``;
export const PostedDate = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondaryText};
`;
export const AuthorName = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
`;

export const CaptionSection = styled.div`
  ${spacing}
`;

export const Caption = styled.p`
  font-size: 1.2rem;
`;

export const TagsSection = styled.div`
  ${spacing}
  font-size: 0.8rem;
`;

export const MainImageSection = styled.div`
  padding-top: 0.5rem;
`;

export const StatsSection = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0.5rem 1.7rem 0.5rem 0;
`;

export const WallPaper = styled.img`
  aspect-ratio: 16/9;
  width: 100%;
  object-fit: contain;
`;

export const MenuSection = styled.div`
  margin-left: auto;
`;

export const OptionButtonContainer = styled.div`
  cursor: pointer;
`;
