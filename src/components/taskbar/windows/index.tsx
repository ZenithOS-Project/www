"use client";
import { Toggle } from "@components/ui/toggle";
import { useApps } from "@contexts/AppsContext";

export default function Windows() {
  const { apps, toggleApp } = useApps();

  return (
    <div>
      {apps.map((app) => (
        <Toggle
          key={app.id}
          variant="textForeground"
          pressed={app.active}
          onPressedChange={() => toggleApp(app.id)}
          className="hover:bg-accent/50 rounded-md"
        >
          {app.icon}
        </Toggle>
      ))}
    </div>
  );
}
