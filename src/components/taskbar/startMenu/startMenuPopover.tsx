"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Toggle } from "@components/ui/toggle";
import Image from "next/image";
import Logo from "public/logo.svg";
import { useState } from "react";

export default function startMenuPopover() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span>
          <Toggle
            pressed={open}
            onPressedChange={setOpen}
            variant="textForeground"
          >
            <Image src={Logo.src} alt="Favicon" width={20} height={20} />
          </Toggle>
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <p> Popover Content</p>
      </PopoverContent>
    </Popover>
  );
}
