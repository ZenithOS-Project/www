"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import Image from "next/image";
import LogoDark from "public/LogoDark.svg";
import LogoLight from "public/LogoLight.svg";
import { Skeleton } from "@/components/ui/skeleton";

export default function StartMenuPopover({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key.toLowerCase() === "s") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    setMounted(true);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!mounted) {
    return <Skeleton className="m-2 h-4 w-4 rounded-md" />;
  }

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
                    <Image
                      src={resolvedTheme === "dark" ? LogoDark : LogoLight}
                      alt="Start Menu"
                      width={16}
                      height={16}
                    />
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
      <PopoverContent
        className="p-0"
        onCloseAutoFocus={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
