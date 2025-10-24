import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@components/ui/empty";
import { Bell } from "lucide-react";

export default function EmptyNotifications() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <Bell />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
      </EmptyHeader>
      <EmptyDescription>You are all caught up!</EmptyDescription>
    </Empty>
  );
}
