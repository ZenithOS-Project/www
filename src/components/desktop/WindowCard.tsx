"use client";

import { Card } from "@/shadcn/card";
import { Grip, X } from "lucide-react";
import { Button } from "@/shadcn/button";
import type { AppWindow } from "@/types";

export default function WindowCard({
  app,
  isOpening,
  isAnimating,
  isClosing,
  startClosingApp,
  initialProps,
}: {
  app: AppWindow;
  isOpening: boolean;
  isAnimating: boolean;
  isClosing: boolean;
  startClosingApp: (id: string) => void;
  initialProps?: Record<string, any>;
}) {
  return (
    <Card className="bg-card/60 dark:bg-card/80 h-full w-full overflow-hidden backdrop-blur-md">
      <div className="drag-handle bg-muted/50 flex h-12 cursor-move items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <Grip className="text-muted-foreground h-4 w-4" />
          {app.icon && <span className="text-sm">{app.icon}</span>}
          <span className="text-sm font-medium">{app.title}</span>
        </div>
        <div id="windowcontrols">
          <Button
            variant="blank"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              startClosingApp(app.id);
            }}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="h-[calc(100%-2.5rem)] overflow-auto p-4">
        {app.component ? <app.component {...initialProps} /> : app.content}
      </div>
    </Card>
  );
}
