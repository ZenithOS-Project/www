"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Toggle } from "@components/ui/toggle";

export function DatePopover({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <span>
          <Toggle
            variant="textForeground"
            pressed={isOpen}
            onPressedChange={setIsOpen}
          >
            {trigger}
          </Toggle>
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0 select-none">
        {children}
      </PopoverContent>
    </Popover>
  );
}
