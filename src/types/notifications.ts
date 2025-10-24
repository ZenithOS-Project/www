export interface NotificationPopoverProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  hasUnread?: boolean;
}

export interface NotificationsContentProps {
  notifications: Notification[];
  userId: string;
  isOpen: boolean;
}
export interface Notification {
  id: number;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}
