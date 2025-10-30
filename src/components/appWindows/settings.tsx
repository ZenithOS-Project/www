"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/tabs";
import { SettingsTabsAndContent } from "@/constants/settings";

export default function SettingsApp({
  defaultTab = "System",
}: {
  defaultTab?: string;
}) {
  return (
    <div className="h-full w-full">
      <Tabs
        className="flex h-full w-full flex-row gap-4"
        defaultValue={defaultTab}
      >
        <TabsList className="fixed flex h-full max-h-[84%] w-fit flex-col justify-start">
          {Object.entries(SettingsTabsAndContent).map(
            ([key, { icon, title }]) => (
              <TabsTrigger
                className="max-h-8 w-32 justify-start hover:cursor-pointer"
                key={key}
                value={title}
              >
                {icon}
                {title}
              </TabsTrigger>
            ),
          )}
        </TabsList>
        {Object.entries(SettingsTabsAndContent).map(
          ([key, { title, content }]) => (
            <TabsContent className="ml-38" key={key} value={title}>
              {content}
            </TabsContent>
          ),
        )}
      </Tabs>
    </div>
  );
}
