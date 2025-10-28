"use client";

import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn//popover";
import { Toggle } from "@/shadcn//toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn//tooltip";
import { Kbd, KbdGroup } from "@/shadcn//kbd";

export function DatePopover({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key.toLowerCase() === "d") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <span>
          <Toggle
            variant="textForeground"
            pressed={isOpen}
            onPressedChange={setIsOpen}
          >
            <span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>{trigger}</span>
                </TooltipTrigger>
                <TooltipContent>
                  Toggle Calendar{" "}
                  <KbdGroup>
                    <Kbd>Shift</Kbd> + <Kbd>D</Kbd>
                  </KbdGroup>
                </TooltipContent>
              </Tooltip>
            </span>
          </Toggle>
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0 select-none">
        {children}
      </PopoverContent>
    </Popover>
  );
}
