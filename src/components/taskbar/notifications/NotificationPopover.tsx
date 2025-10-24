"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Toggle } from "@components/ui/toggle";
import { Bell } from "lucide-react";
import { Kbd, KbdGroup } from "@components/ui/kbd";

export default function NotificationPopover({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key.toLowerCase() === "n") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Toggle
                  variant="textForeground"
                  pressed={isOpen}
                  onPressedChange={setIsOpen}
                >
                  <Bell />
                </Toggle>
              </span>
            </TooltipTrigger>
            <TooltipContent className="flex gap-2">
              Notifications
              <KbdGroup>
                <Kbd>Shift</Kbd> + <Kbd>N</Kbd>
              </KbdGroup>
            </TooltipContent>
          </Tooltip>
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        {React.cloneElement(children as React.ReactElement<any>, {
          isOpen,
          userId,
        })}
      </PopoverContent>
    </Popover>
  );
}
