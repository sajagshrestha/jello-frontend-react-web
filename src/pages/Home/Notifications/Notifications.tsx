import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import notificationService, {
  INotification,
  NOTIFICAITON_TYPE,
} from "src/api/services/notification-service";
import { PostedDate } from "src/pages/common/ImageCard/ImageCard.styles";
import ROUTES from "src/Router/routes";
import { getAvatar } from "src/utils/avatar";
import { interpolate } from "src/utils/string";
import styled from "styled-components";
import {
  FeedSeparator,
  FeedTitle,
  FeedTitleSection,
} from "../Feed/Feed.styles";

interface ISingleNotification {
  notification: INotification;
}

const NotificationsContainer = styled.div`
  padding: 1rem 2rem;
`;

const SingleNotificationContainer = styled.div`
  padding-top: 1rem;
  cursor: pointer;
`;

const InvokerName = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.primary};
`;

const SingleNotificationText = (props: ISingleNotification) => {
  const { notification } = props;

  switch (notification.type) {
    case NOTIFICAITON_TYPE.COMMENT:
      return (
        <p>
          <InvokerName>{notification.invoker.username}</InvokerName>
          <span> commented on your post</span>
        </p>
      );
    case NOTIFICAITON_TYPE.LIKE:
      return (
        <p>
          <InvokerName>{notification.invoker.username}</InvokerName>
          <span> liked your post</span>
        </p>
      );
    case NOTIFICAITON_TYPE.FOLLOW:
      return (
        <p>
          <InvokerName>{notification.invoker.username}</InvokerName>
          <span> followed you</span>
        </p>
      );
    default:
      return <></>;
  }
};

function Notifications() {
  const { data, isLoading } = useQuery(
    "Notifications",
    notificationService.getNotifications
  );
  const navigate = useNavigate();
  const clearNotificationMutation = useMutation(
    notificationService.markAllAsRead
  );
  const queryClient = useQueryClient();

  const navigateToPost = (id: number) => {
    navigate(interpolate(ROUTES.POST, { id }));
  };

  const clearNotification = async () => {
    clearNotificationMutation
      .mutateAsync()
      .then(() => queryClient.invalidateQueries("Notifications"));
  };

  useEffect(() => {
    clearNotification();
  }, []);

  if (isLoading) return <>loading</>;

  return (
    <>
      <FeedSeparator>
        <FeedTitleSection>
          <FeedTitle>Notifications</FeedTitle>
        </FeedTitleSection>
      </FeedSeparator>
      <NotificationsContainer>
        {data?.notifications.map((notification) => (
          <SingleNotificationContainer
            onClick={() => navigateToPost(notification.image.id || 0)}
          >
            <Avatar src={getAvatar(notification?.invoker?.id)} />
            <SingleNotificationText notification={notification} />
            <PostedDate>{notification.createdOn}</PostedDate>
          </SingleNotificationContainer>
        ))}
      </NotificationsContainer>
    </>
  );
}

export default Notifications;
