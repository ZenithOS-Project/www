import { getAllNotifications } from "@fetchers/notifications/getAllNotifications";
import NotificationPopover from "./NotificationPopover";
import NotificationsContent from "./notificationsContent";

export default async function Notifications() {
  const userId = "d2ac5ec2-e135-495b-ae56-0fa1ecbb062f";
  const notifications = await getAllNotifications(userId);

  return (
    <NotificationPopover userId={userId}>
      <NotificationsContent notifications={notifications} userId={userId} />
    </NotificationPopover>
  );
}
