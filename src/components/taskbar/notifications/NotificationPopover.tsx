"use client";

import { useState } from "react";
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

export default function NotificationPopover({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

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
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        {children}
      </PopoverContent>
    </Popover>
  );
}
