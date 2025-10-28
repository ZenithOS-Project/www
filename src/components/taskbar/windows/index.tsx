"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { useApps } from "@/contexts/AppsContext";

export default function Windows() {
  const { apps, closingApps, startClosingApp } = useApps();

  return (
    <div>
      {apps
        .filter((app) => app.showInTaskbar)
        .map((app) => (
          <Tooltip key={app.id}>
            <TooltipTrigger asChild>
              <span>
                <Toggle
                  key={app.id}
                  variant="textForeground"
                  pressed={app.active}
                  onPressedChange={() => startClosingApp(app.id)}
                  style={{
                    opacity: closingApps.has(app.id) ? 0.5 : 1,
                  }}
                >
                  {app.icon}
                </Toggle>
              </span>
            </TooltipTrigger>
            <TooltipContent>{app.title}</TooltipContent>
          </Tooltip>
        ))}
    </div>
  );
}
