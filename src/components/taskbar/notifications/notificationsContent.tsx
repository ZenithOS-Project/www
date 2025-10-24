"use client";
import type { Notification } from "@/types";
import EmptyNotifications from "./empty";
import { ScrollArea } from "@components/ui/scroll-area";
import {
  BookOpenCheck,
  Info,
  MailCheck,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { markNotificationAsRead } from "@actions/notifications/markAsRead";
import { useActionState, useEffect, useState, useTransition } from "react";
import { Spinner } from "@components/ui/spinner";
import { toast } from "sonner";
import { getAllNotifications } from "@fetchers/notifications/getAllNotifications";
import { markAllNotificationsAsRead } from "@server/actions/notifications/markAllAsRead";

export default function NotificationsContent({
  notifications: initialNotifications,
  isOpen,
  userId,
}: {
  notifications: Notification[];
  isOpen?: boolean;
  userId: string;
}) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [refreshPending, startTransition] = useTransition();

  const [readState, readAction, readIsPending] = useActionState(
    markNotificationAsRead,
    null,
  );

  const [markAllState, markAllAction, markAllIsPending] = useActionState(
    markAllNotificationsAsRead,
    null,
  );

  useEffect(() => {
    if (isOpen) {
      startTransition(async () => {
        const fresh = await getAllNotifications(userId);
        setNotifications(fresh);
      });
    }
  }, [isOpen, userId]);

  useEffect(() => {
    if (readState?.success || markAllState?.success) {
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
    }

    if (markAllState?.success) {
      toast.success("All notifications marked as read");
    }

    if (readState?.success) {
      toast.success("Notification marked as read");
    }
  }, [readState, markAllState]);

  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.isRead === b.isRead) return 0;
    return a.isRead ? 1 : -1;
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="flex items-center justify-between text-lg font-semibold">
        Notifications ({notifications.length})
        <div className="flex flex-row">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className=""
                disabled={refreshPending}
                onClick={() => {
                  startTransition(async () => {
                    const fresh = await getAllNotifications(userId);
                    setNotifications(fresh);
                    toast.success("Notifications refreshed");
                  });
                }}
              >
                {refreshPending ? <Spinner /> : <RotateCcw />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh Notifications</p>
            </TooltipContent>
          </Tooltip>
          <form action={markAllAction}>
            <input type="hidden" name="userId" value={userId} />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="" type="submit">
                  <MailCheck />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark All As Read</p>
              </TooltipContent>
            </Tooltip>
          </form>
        </div>
      </h2>
      {notifications.length > 0 ? (
        <ScrollArea className="h-80 w-80">
          <div className="flex flex-col gap-3">
            {sortedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex flex-row items-center gap-3 rounded-md border p-3 shadow-sm transition-colors ${
                  notification.isRead
                    ? "bg-muted/30 border-border/50"
                    : "bg-primary/10 border-primary/30"
                }`}
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
                  <form className="ml-auto" action={readAction}>
                    <input
                      type="hidden"
                      name="notificationId"
                      value={notification.id}
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" disabled={readIsPending}>
                          {readIsPending ? <Spinner /> : <BookOpenCheck />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Mark As Read</p>
                      </TooltipContent>
                    </Tooltip>
                  </form>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <EmptyNotifications />
      )}
    </div>
  );
}
