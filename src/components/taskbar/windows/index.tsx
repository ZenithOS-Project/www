"use client";
import { Toggle } from "@components/ui/toggle";
import { useApps } from "@contexts/AppsContext";

export default function Windows() {
  const { apps, closingApps, startClosingApp } = useApps();

  return (
    <div>
      {apps.map((app) => (
        <Toggle
          key={app.id}
          variant="textForeground"
          pressed={app.active}
          onPressedChange={() => startClosingApp(app.id)}
          className="hover:bg-accent/50 rounded-md transition-opacity"
          style={{
            opacity: closingApps.has(app.id) ? 0.5 : 1,
          }}
        >
          {app.icon}
        </Toggle>
      ))}
    </div>
  );
}
