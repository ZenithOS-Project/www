import type { Notification } from "@/types/notifications";
import EmptyNotifications from "./empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpenCheck,
  Info,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function NotificationsContent({
  notifications,
}: {
  notifications: Notification[];
}) {
  if (notifications.length === 0) {
    return <EmptyNotifications />;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-semibold">
        Notifications ({notifications.length})
      </h2>
      <ScrollArea className="h-80 w-80">
        <div className="flex flex-col gap-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex ${notification.isRead ? "bg-accent/25" : "bg-muted"} flex-row items-center gap-3 rounded-md border p-3 shadow-sm`}
            >
              {notification.type === "info" && (
                <Info className="text-primary" />
              )}
              {notification.type === "warning" && (
                <ShieldAlert className="text-warning" />
              )}
              {notification.type === "success" && (
                <ShieldCheck className="text-success" />
              )}
              {notification.type === "error" && (
                <ShieldX className="text-error" />
              )}
              <div>
                <div className="text-sm">{notification.title}</div>
                <div className="text-muted-foreground text-xs">
                  {notification.message}
                </div>
              </div>
              {notification.isRead ? null : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className="ml-auto">
                      <BookOpenCheck />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mark As Read</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
