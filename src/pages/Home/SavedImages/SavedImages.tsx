import { useQuery } from "react-query";
import PostService from "src/api/services/post-services";
import ImageCard from "src/pages/common/ImageCard";
import {
  FeedContainer,
  FeedSeparator,
  FeedTitle,
  FeedTitleSection,
} from "../Feed/Feed.styles";

function Feed() {
  const { data, isLoading } = useQuery("feed", PostService.getFeedPosts);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <>
      <FeedSeparator>
        <FeedTitleSection>
          <FeedTitle>Feed</FeedTitle>
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
              commentCount={img.comments?.length || 0}
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

export default Feed;
