import { useQuery } from "react-query";
import TagService from "src/api/services/tag-service";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TagDTO } from "src/api/dto/tag";
import { interpolate } from "src/utils/string";
import ROUTES from "src/Router/routes";

const PopularTagsContainer = styled.div`
  padding: 1rem;

  h3: {
    color: ${(props) => props.theme.primary};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Tag = styled(Link)<{ isImageCard?: boolean }>`
  color: ${({ theme, isImageCard }) =>
    isImageCard ? theme.secondaryText : theme.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PopularTags: React.FC = () => {
  const { data } = useQuery("popularTags", TagService.getPopularTags);

  return (
    <PopularTagsContainer>
      <h3>Popular Tags</h3>
      <TagsContainer>
        {data?.map((tag: TagDTO) => (
          <Tag
            key={tag.id}
            to={interpolate(ROUTES.TAG, { id: tag.id, name: tag.name })}
          >
            #{tag.name}
          </Tag>
        ))}
      </TagsContainer>
    </PopularTagsContainer>
  );
};

export default PopularTags;
