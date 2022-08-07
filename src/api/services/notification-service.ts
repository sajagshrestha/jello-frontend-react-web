import { jelloWithAuth } from "..";
import ImageDTO from "../dto/image";
import { UserDTO } from "../dto/user";
import endpoints from "../endpoints";
import { fromJSON } from "./post-services";
import { formatDistanceToNow } from "date-fns";

export enum NOTIFICAITON_TYPE {
  LIKE = "LIKE",
  COMMENT = "COMMENT",
  FOLLOW = "FOLLOW",
}

export interface INotification {
  type: NOTIFICAITON_TYPE;
  invoker: UserDTO;
  image: ImageDTO;
  createdOn: string;
}

interface INotificationsResponse {
  notifications: INotification[];
  unreadCount: number;
}

const fromNotificationResponseJSON = (data: any): INotificationsResponse => {
  return {
    notifications: data?.notifications.map((notification: any) => {
      const formatedCreatedOnDate =
        formatDistanceToNow(new Date(notification.created_at)) + " ago";

      return {
        type: notification.type,
        invoker: notification.invoker,
        image: fromJSON(notification.image),
        createdOn: formatedCreatedOnDate,
      };
    }),
    unreadCount: data?.unreadCount || 0,
  };
};

const getNotifications = async (): Promise<INotificationsResponse> =>
  jelloWithAuth
    .get(endpoints.GET_NOTIFICATIONS)
    .then((res) => fromNotificationResponseJSON(res?.data));

const markAllAsRead = async () =>
  jelloWithAuth.post(endpoints.MARK_ALL_AS_READ);

const notificationService = {
  getNotifications,
  markAllAsRead,
};

export default notificationService;
