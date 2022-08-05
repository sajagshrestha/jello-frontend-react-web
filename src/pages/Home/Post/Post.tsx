import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import PostService from "src/api/services/post-services";
import ImageCard from "src/pages/common/ImageCard";
import { FeedContainer, FeedSeparator } from "../Feed/Feed.styles";
import CommentSection from "./CommentSection";

const Post: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery(["Post", id], () => {
    if (id) {
      return PostService.getPost(parseInt(id));
    }
  });

  if (data) {
    return (
      <>
        <FeedContainer>
          <FeedSeparator key={data.id}>
            <ImageCard
              id={data.id}
              likeCount={data.likeCount}
              liked={data.isLiked}
              saved={data.isSaved}
              commentCount={data.comments?.length || 0}
              caption={data.caption}
              uploader={data.uploader}
              url={data.url}
              tags={data.tags}
              createdOnDate={data.formatedCreatedOnDate}
            />
          </FeedSeparator>
          <FeedSeparator center={false}>
            <CommentSection id={id ? +id : 0} comments={data.comments} />
          </FeedSeparator>
        </FeedContainer>
      </>
    );
  }

  return <div>loading</div>;
};

export default Post;
