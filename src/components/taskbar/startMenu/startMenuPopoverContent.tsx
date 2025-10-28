"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout/logout";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Settings, Power } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { openApp } from "@/lib/openApp";

export default function StartMenuPopoverContent() {
  const { user } = useAuth();

  if (!user) {
    return <div>Not signed in</div>;
  }

  return (
    <div className="flex flex-row">
      <div className="flex h-80 flex-col items-center justify-end gap-2 p-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="p-0">
                    <Power />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Sign out</TooltipContent>
              </Tooltip>
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to sign out?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="ghost">Cancel</Button>
              </AlertDialogCancel>
              <form action={logout}>
                <Button type="submit" variant="outline">
                  Yes, Sign out
                </Button>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="p-0"
              onClick={() => {
                openApp("settings");
              }}
            >
              <Settings />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Settings</TooltipContent>
        </Tooltip>
        <Popover>
          <PopoverTrigger>
            <Avatar className="w-full hover:cursor-pointer">
              <AvatarImage src={user.profilePictureUrl ?? ""} />
              <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <form action={logout}>
              <Button variant="ghost">Sign out</Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
      <Separator orientation="vertical" className="min-h-80" />
      {/* <div>test</div> */}
    </div>
  );
}
