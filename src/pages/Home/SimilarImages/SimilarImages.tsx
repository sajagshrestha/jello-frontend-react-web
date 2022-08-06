import { useQuery } from "react-query";
import { Router, useNavigate, useParams } from "react-router-dom";
import PostService from "src/api/services/post-services";
import ROUTES from "src/Router/routes";
import { interpolate } from "src/utils/string";
import styled from "styled-components";

const SideBarContainer = styled.div`
  padding: 1rem;
  width: 100%;

  h3: {
    color: ${(props) => props.theme.primary};
  }
`;

const SideBarImageContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 8px;
  margin-top: 1rem;
`;

const SideBarImage = styled.img`
  cursor: pointer;
  width: 100%;
  object-fit: cover;
`;
function SimilarImages() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(["similarImages", id], () => {
    if (id) {
      return PostService.getSimilarImagesByPostId(parseInt(id) || 1);
    }
  });

  const navigateToPost = (id: number) => {
    navigate(interpolate(ROUTES.POST, { id }));
  };

  return (
    <SideBarContainer>
      <h3>Similar Images</h3>
      <SideBarImageContainer>
        {data?.map((img) => (
          <SideBarImage
            key={img.id}
            src={img.url}
            alt=""
            onClick={() => navigateToPost(img.id)}
          />
        ))}
      </SideBarImageContainer>
    </SideBarContainer>
  );
}

export default SimilarImages;
