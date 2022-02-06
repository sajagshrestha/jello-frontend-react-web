import { LoadingButton } from "@mui/lab";
import { id } from "date-fns/locale";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import ProfileService from "src/api/services/profile-service";
import queryClient from "src/react-query/query-client";
import { RootState } from "src/redux";

interface Props {
  id: number;
  isFollowing: boolean;
  invalidateQueryName: string;
}

interface IFollowButton {
  isBeingHovered: boolean;
  text: string;
}

const initialFollowButton: IFollowButton = {
  isBeingHovered: false,
  text: "Following",
};

const FollowButton: React.FC<Props> = ({
  id,
  isFollowing,
  invalidateQueryName,
}) => {
  /**
   * States
   */
  const [followButton, setFollowButton] =
    useState<IFollowButton>(initialFollowButton);

  /**
   * Hooks
   */
  const storedUser = useSelector((state: RootState) => state.auth);
  /**
   * Mutations
   */
  const followMutation = useMutation(ProfileService.follow);
  const unfollowMutation = useMutation(ProfileService.unfollow);

  /**
   * Event Handlers
   */
  const onFollowClick = async () => {
    if (isFollowing) {
      unfollowMutation.mutateAsync(id).then(() => {
        queryClient.invalidateQueries(invalidateQueryName);
      });
    } else {
      followMutation.mutateAsync(id).then(() => {
        queryClient.invalidateQueries(invalidateQueryName);
      });
    }
  };

  const onFollowButtonEnter = () => {
    if (isFollowing) {
      setFollowButton({
        ...followButton,
        isBeingHovered: true,
        text: "Unfollow",
      });
    }
  };

  const onFollowButtonLeave = () => {
    if (isFollowing) {
      setFollowButton(initialFollowButton);
    }
  };

  return (
    <LoadingButton
      variant="outlined"
      color={followButton.isBeingHovered && isFollowing ? "error" : "primary"}
      loading={followMutation.isLoading || unfollowMutation.isLoading}
      onClick={onFollowClick}
      onMouseEnter={onFollowButtonEnter}
      onMouseLeave={onFollowButtonLeave}
    >
      {isFollowing ? followButton.text : "Follow"}
    </LoadingButton>
  );
};

export default FollowButton;
