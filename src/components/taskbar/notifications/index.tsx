import { getAllNotifications } from "@/server/fetchers/notifications/getAllNotifications";
import NotificationPopover from "./NotificationPopover";
import NotificationsContent from "./notificationsContent";

export default async function Notifications() {
  const notifications = await getAllNotifications(
    "d2ac5ec2-e135-495b-ae56-0fa1ecbb062f",
  );

  return (
    <NotificationPopover>
      <NotificationsContent notifications={notifications} />
    </NotificationPopover>
  );
}
