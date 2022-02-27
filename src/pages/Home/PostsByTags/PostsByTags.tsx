import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import PostService from "src/api/services/post-services";
import EmptyFeed from "src/pages/common/EmptyFeed/EmptyFeed";
import ImageCard from "src/pages/common/ImageCard";
import {
  FeedContainer,
  FeedSeparator,
  FeedTitle,
  FeedTitleSection,
} from "src/pages/Home/Feed/Feed.styles";

function PostsByTag() {
  const { id, name } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery("postsBytag", () => {
    if (id) {
      return PostService.getPostsByTagId(+id);
    }
  });

  /**
   * LifeCycle
   */
  useEffect(() => {
    queryClient.invalidateQueries("postsBytag");

    return () => {
      queryClient.removeQueries("postsBytag");
    };
  }, [queryClient, id]);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (data) {
    return (
      <>
        <FeedSeparator>
          <FeedTitleSection>
            <FeedTitle>#{name}</FeedTitle>
          </FeedTitleSection>
        </FeedSeparator>
        <FeedContainer>
          {data?.length === 0 ? (
            <EmptyFeed additionalText="Start Following More People." />
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

  return <EmptyFeed />;
}

export default PostsByTag;
