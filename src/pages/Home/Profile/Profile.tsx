import { Avatar, Button } from "@mui/material";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileService from "src/api/services/profile-service";
import ImageCard from "src/pages/common/ImageCard";
import { RootState } from "src/redux";
import { getAvatar } from "src/utils/avatar";
import {
  FeedContainer,
  FeedSeparator,
  FeedTitle,
  FeedTitleSection,
} from "../Feed/Feed.styles";
import {
  FollowerInformationSection,
  Stats,
  StatsName,
  StatsValue,
  UserInfoSection,
  UserName,
  UserStatsSection,
} from "./Profile.styles";

const Profile: React.FC = () => {
  /**
   * Hooks
   */
  const storedUser = useSelector((state: RootState) => state.auth);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    "profile",
    () => {
      if (!id) return;

      return ProfileService.getProfile(id);
    },
    {
      cacheTime: 0,
    },
  );

  /**
   * To check if profile is of signed in user;
   */
  const isSelf = id == storedUser.id;

  /**
   * LifeCycle
   */
  useEffect(() => {
    return () => {
      queryClient.removeQueries("profile");
    };
  }, [queryClient]);

  /**
   * Main
   */
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <FeedSeparator>
        <UserInfoSection>
          <Avatar
            src={getAvatar(data?.id)}
            sx={{
              width: 200,
              height: 200,
            }}
          />
          <UserStatsSection center={isSelf}>
            <UserName>{data?.username}</UserName>
            <FollowerInformationSection>
              <Stats>
                <StatsValue>{data?.followerCount}</StatsValue>
                <StatsName>Followers</StatsName>
              </Stats>
              <Stats>
                <StatsValue>{data?.followingCount}</StatsValue>
                <StatsName>Following</StatsName>
              </Stats>
              <Stats>
                <StatsValue>{data?.images.length}</StatsValue>
                <StatsName>Posts</StatsName>
              </Stats>
            </FollowerInformationSection>
            {!isSelf && <Button>Follow</Button>}
          </UserStatsSection>
        </UserInfoSection>
      </FeedSeparator>
      <FeedSeparator>
        <FeedTitleSection>
          <FeedTitle>Posts</FeedTitle>
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
