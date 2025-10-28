"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn//avatar";
import { UploadButton } from "@/utils/uploadthing";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import type { User } from "@/types";

export default function AccountSettings() {
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`/api/user/me`);
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div>
        <div className="mb-4 flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </div>
    );
  }

  if (isError || !user) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>Account Settings</h1>
      <div className="mb-4 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>{user?.firstName[0]}</AvatarFallback>
        </Avatar>
        <UploadButton
          className="ut-button:border ut-button:bg-background ut-button:shadow-xs ut-button:hover:bg-primary ut-button:hover:text-primary-foreground ut-button:disabled:opacity-50 ut-button:disabled:cursor-not-allowed ut-button:focus-visible:ring-2 ut-button:focus-visible:ring-primary ut-button:active:scale-95 ut-button:transition-all ut-button:dark:bg-input/30 ut-button:dark:border-input ut-button:dark:hover:bg-input/50 ut-readying:opacity-50 ut-readying:cursor-wait ut-uploading:opacity-60 ut-uploading:cursor-progress"
          endpoint={"imageUploader"}
        />
      </div>
      <p className="text-muted-foreground text-sm">
        Name: {user?.firstName} {user?.lastName}
      </p>
    </div>
  );
}
