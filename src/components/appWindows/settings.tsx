import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { SettingsTabsAndContent } from "../constants/settings";

export default function SettingsApp({
  defaultTab = "general",
}: {
  defaultTab?: string;
}) {
  return (
    <div className="h-full w-full">
      <Tabs
        className="flex h-full w-full flex-row gap-4"
        defaultValue={defaultTab}
      >
        <TabsList className="flex h-full w-fit flex-col justify-start">
          {Object.entries(SettingsTabsAndContent).map(([key, { title }]) => (
            <TabsTrigger className="max-h-8 w-32" key={key} value={key}>
              {title}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(SettingsTabsAndContent).map(([key, { content }]) => (
          <TabsContent key={key} value={key}>
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
