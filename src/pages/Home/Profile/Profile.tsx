import { Avatar } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ProfileService from "src/api/services/profile-service";
import ImageCard from "src/pages/common/ImageCard";
import { getAvatar } from "src/utils/avatar";
import {
  FeedContainer,
  FeedSeparator,
  FeedTitle,
  FeedTitleSection,
} from "../Feed/Feed.styles";

const Profile: React.FC = () => {
  /**
   * Hooks
   */
  const { id = 0 } = useParams();
  const { data, isLoading } = useQuery("profile", () =>
    ProfileService.getProfile(id),
  );

  /**
   * Main
   */
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <FeedSeparator>
        <Avatar
          src={getAvatar(data?.id)}
          sx={{
            width: 200,
            height: 200,
          }}
        />
      </FeedSeparator>
      <FeedSeparator>
        <FeedTitleSection>
          <FeedTitle>Feed</FeedTitle>
        </FeedTitleSection>
      </FeedSeparator>
      <FeedContainer>
        {data?.images.map((img) => (
          <FeedSeparator key={img.id}>
            <ImageCard
              id={img.id}
              likeCount={img.likeCount}
              liked={img.isLiked}
              saved={img.isSaved}
              commentCount={img.comments?.length || 0}
              caption={img.caption}
              uploader={{ id: data?.id, username: data?.username }}
              url={img.url}
              tags={img.tags}
              createdOnDate={img.formatedCreatedOnDate}
            />
          </FeedSeparator>
        ))}
      </FeedContainer>
    </>
  );
};

export default Profile;
