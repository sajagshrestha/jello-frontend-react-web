import { useQuery } from "react-query";
import PostService from "src/api/services/post-services";
import ImageCard from "src/pages/common/ImageCard";
import { FeedContainer, FeedSeparator } from "./Feed.styles";

function Feed() {
  const { data, isLoading } = useQuery("feed", PostService.getFeedPosts);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <FeedContainer>
      {data?.map((img) => (
        <FeedSeparator key={img.id}>
          <ImageCard
            likeCount={img.likes_count}
            liked={false}
            saved={false}
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
  );
}

export default Feed;
//  <FeedContainer>
//   <FeedSeparator>
//
//   </FeedSeparator>
//   <FeedSeparator>
//     <ImageCard
//       likeCount={3}
//       liked={false}
//       saved={true}
//       commentCount={32}
//       caption="Hello World"
//       authorName="batcigar"
//     />
//   </FeedSeparator>
//   <FeedSeparator>
//     <ImageCard
//       likeCount={5}
//       liked={false}
//       saved={false}
//       commentCount={67}
//       caption="Hello World"
//       authorName="batcigar"
//     />
//   </FeedSeparator>
// </FeedContainer>
