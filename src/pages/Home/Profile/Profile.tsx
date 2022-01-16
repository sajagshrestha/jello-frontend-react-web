import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
  FeedTitleSection
} from "../Feed/Feed.styles";
import {
  FollowerInformationSection,
  Stats,
  StatsName,
  StatsValue,
  UserInfoSection,
  UserName,
  UserStatsSection
} from "./Profile.styles";

interface IFollowButton {
  isBeingHovered: boolean;
  text: string;
}

const initialFollowButton: IFollowButton = {
  isBeingHovered: false,
  text: "Following"
};

const Profile: React.FC = () => {
  /**
   * State.
   */
  const [followButton, setFollowButton] =
    useState<IFollowButton>(initialFollowButton);
  /**
   * Hooks
   */
  const storedUser = useSelector((state: RootState) => state.auth);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery("profile", () => {
    if (!id) return;

    return ProfileService.getProfile(id);
  });

  /**
   * Mutations
   */
  const followMutation = useMutation(ProfileService.follow);
  const unfollowMutation = useMutation(ProfileService.unfollow);

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
   * Event Handlers
   */
  const onFollowClick = async () => {
    if (!data?.isFollowing) {
      followMutation.mutateAsync(data?.id || 0).then(() => {
        queryClient.invalidateQueries("profile");
      });
    } else {
      unfollowMutation.mutateAsync(data?.id).then(() => {
        queryClient.invalidateQueries("profile");
      });
    }
  };

  const onFollowButtonEnter = () => {
    if (data?.isFollowing) {
      setFollowButton({
        ...followButton,
        isBeingHovered: true,
        text: "Unfollow"
      });
    }
  };

  const onFollowButtonLeave = () => {
    if (data?.isFollowing) {
      setFollowButton(initialFollowButton);
    }
  };

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
              height: 200
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
            {!isSelf && (
              <LoadingButton
                variant="outlined"
                color={
                  followButton.isBeingHovered && data?.isFollowing
                    ? "error"
                    : "primary"
                }
                loading={followMutation.isLoading || unfollowMutation.isLoading}
                onClick={onFollowClick}
                onMouseEnter={onFollowButtonEnter}
                onMouseLeave={onFollowButtonLeave}
              >
                {data?.isFollowing ? followButton.text : "Follow"}
              </LoadingButton>
            )}
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
