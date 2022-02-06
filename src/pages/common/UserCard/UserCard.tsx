import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import ProfileService from "src/api/services/profile-service";
import { FollowerInformationSection } from "src/pages/Home/Profile/Profile.styles";
import queryClient from "src/react-query/query-client";
import ROUTES from "src/Router/routes";
import { getAvatar } from "src/utils/avatar";
import { interpolate } from "src/utils/string";
import FollowButton from "../FollowButton";
import {
  UserCardContainer,
  UserDetails,
  UserName,
  StatsName,
  StatsValue,
  Stats,
  Follow,
  Following,
} from "./UserCard.styles";

interface Props {
  id: number;
  username: string;
  followerCount: number;
  postCount?: number;
  isFollowing: boolean;
}

const UserCard: React.FC<Props> = ({
  id,
  followerCount,
  postCount,
  username,
  isFollowing,
}) => {
  const navigate = useNavigate();
  const followMutation = useMutation(ProfileService.follow);

  const redirectToProfile = () => {
    const profileLink = interpolate(ROUTES.PROFILE, { id: id });
    navigate(profileLink);
  };

  const onFollowClick = () => {
    followMutation.mutateAsync(id);
  };

  return (
    <UserCardContainer>
      <Avatar
        src={getAvatar(id)}
        sx={{ width: 75, height: 75 }}
        onClick={redirectToProfile}
      />
      <UserDetails onClick={redirectToProfile}>
        <UserName>{username}</UserName>
        <FollowerInformationSection>
          <Stats>
            <StatsValue>{followerCount}</StatsValue>
            <StatsName>Followers</StatsName>
          </Stats>
          <Stats>
            <StatsValue>{postCount ?? 0}</StatsValue>
            <StatsName>Posts</StatsName>
          </Stats>
        </FollowerInformationSection>
      </UserDetails>

      <Follow>
        <FollowButton
          id={id}
          isFollowing={isFollowing}
          invalidateQueryName="search"
        />
      </Follow>
    </UserCardContainer>
  );
};

export default UserCard;
