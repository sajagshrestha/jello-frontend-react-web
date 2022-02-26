import { useQuery } from "react-query";
import PostService from "src/api/services/post-services";
import EmptyFeed from "src/pages/common/EmptyFeed/EmptyFeed";
import ImageCard from "src/pages/common/ImageCard";
import {
  FeedContainer,
  FeedSeparator,
  FeedTitle,
  FeedTitleSection,
} from "../Feed/Feed.styles";

function SavedImage() {
  const { data, isLoading } = useQuery("savedImage", PostService.getSavedPosts);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <>
      <FeedSeparator>
        <FeedTitleSection>
          <FeedTitle>Saved Images</FeedTitle>
        </FeedTitleSection>
      </FeedSeparator>
      <FeedContainer>
        {data?.length === 0 ? (
          <EmptyFeed />
        ) : (
          data?.map((img) => (
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
          ))
        )}
      </FeedContainer>
    </>
  );
}

export default SavedImage;
