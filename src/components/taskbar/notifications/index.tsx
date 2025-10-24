import { getAllNotifications } from "@fetchers/notifications/getAllNotifications";
import NotificationPopover from "./NotificationPopover";
import NotificationsContent from "./notificationsContent";
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function Notifications() {
  const { user } = await withAuth({ ensureSignedIn: true });
  const notifications = await getAllNotifications(user.id);

  return (
    <NotificationPopover userId={user.id}>
      <NotificationsContent notifications={notifications} userId={user.id} />
    </NotificationPopover>
  );
}
