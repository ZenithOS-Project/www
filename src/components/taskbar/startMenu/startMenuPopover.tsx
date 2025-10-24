"use client";

import { Kbd, KbdGroup } from "@components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Toggle } from "@components/ui/toggle";
import Image from "next/image";
import Logo from "public/logo.svg";
import { useEffect, useState } from "react";

export default function startMenuPopover({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key.toLowerCase() === "s") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span>
          <Toggle
            pressed={open}
            onPressedChange={setOpen}
            variant="textForeground"
          >
            <span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Image src={Logo} alt="Start Menu" width={16} height={16} />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="flex gap-2">
                  Start Menu
                  <KbdGroup>
                    <Kbd>Shift</Kbd> + <Kbd>S</Kbd>
                  </KbdGroup>
                </TooltipContent>
              </Tooltip>
            </span>
          </Toggle>
        </span>
      </PopoverTrigger>
      <PopoverContent className="p-0">{children}</PopoverContent>
    </Popover>
  );
}
