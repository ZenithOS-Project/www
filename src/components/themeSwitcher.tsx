"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { RadioGroup, RadioGroupItem } from "@/shadcn/radio-group";
import { Label } from "@/shadcn/label";
import { themes } from "@/constants/themes";
import { Card } from "@/shadcn/card";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-row items-center">
      <RadioGroup
        value={theme}
        className="flex flex-row flex-wrap"
        onValueChange={setTheme}
      >
        {Object.values(themes).map((thm) => (
          <Card
            key={thm.name}
            className={`bg-card/20 flex min-w-50 cursor-pointer space-y-2 p-2 ${theme === thm.name ? "border-primary" : ""}`}
            onClick={() => setTheme(thm.name)}
          >
            <Image
              src={thm.img}
              alt={thm.name}
              width={200}
              height={48}
              className="rounded-sm"
            />
            <div className="flex flex-row items-center space-x-2">
              <RadioGroupItem value={thm.name} id={thm.name} />
              <Label htmlFor={thm.name} className="capitalize">
                {thm.name}
              </Label>
            </div>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
}
