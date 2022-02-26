import { useQuery } from "react-query";
import PostService from "src/api/services/post-services";
import ImageCard from "src/pages/common/ImageCard";
import {
  FeedContainer,
  FeedSeparator,
  FeedTitle,
  FeedTitleSection,
} from "../Feed/Feed.styles";

function Popular() {
  const { data, isLoading } = useQuery("Popular", PostService.getPopularPosts);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <>
      <FeedSeparator>
        <FeedTitleSection>
          <FeedTitle>Explore</FeedTitle>
        </FeedTitleSection>
      </FeedSeparator>
      <FeedContainer>
        {data?.map((img) => (
          <FeedSeparator key={img.id}>
            <ImageCard
              id={img.id}
              likeCount={img.likeCount}
              liked={img.isLiked}
              saved={img.isSaved}
              commentCount={img?.commentCount || 0}
              caption={img.caption}
              uploader={img.uploader}
              url={img.url}
              tags={img.tags}
              createdOnDate={img.formatedCreatedOnDate}
            />
          </FeedSeparator>
        ))}
      </FeedContainer>
    </>
  );
}

export default Popular;
