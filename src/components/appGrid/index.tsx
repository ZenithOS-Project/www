"use client";

import { useState, useRef, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { Card } from "@/components/ui/card";
import { Grip } from "lucide-react";
import { useApps } from "@/contexts/AppsContext";
import type { AppGridProps } from "@/types";

export default function AppGrid({ apps = [] }: AppGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [containerHeight, setContainerHeight] = useState(600);
  const { updateAppLayout } = useApps();

  const [layout, setLayout] = useState(
    apps.map((app) => ({
      i: app.id,
      x: app.x,
      y: app.y,
      w: app.w,
      h: app.h,
      minW: 2,
      minH: 2,
    })),
  );

  useEffect(() => {
    setLayout((prevLayout) => {
      const layoutMap = new Map(prevLayout.map((item) => [item.i, item]));
      const activeApps = apps.filter((app) => app.active);

      return activeApps.map((app) => {
        const existing = layoutMap.get(app.id);
        return {
          i: app.id,
          x: existing?.x ?? app.x,
          y: existing?.y ?? app.y,
          w: app.w,
          h: app.h,
          minW: 2,
          minH: 2,
        };
      });
    });
  }, [apps]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  const onDragStop = (layout: any) => {
    layout.forEach((item: any) => {
      updateAppLayout(item.i, item.x, item.y, item.w, item.h);
    });
  };

  const onResizeStop = (layout: any) => {
    layout.forEach((item: any) => {
      updateAppLayout(item.i, item.x, item.y, item.w, item.h);
    });
  };
  return (
    <div ref={containerRef} className="h-full w-full">
      <GridLayout
        className="layout"
        style={{ height: containerHeight, width: containerWidth }}
        layout={layout}
        cols={20}
        width={containerWidth}
        rowHeight={50}
        onLayoutChange={onLayoutChange}
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        draggableHandle=".drag-handle"
        isDraggable={true}
        isResizable={true}
        compactType={null}
        preventCollision={true}
        isBounded={true}
        maxRows={Infinity}
      >
        {apps
          .filter((app) => app.active)
          .map((app) => (
            <div key={app.id}>
              <Card className="bg-card/80 h-full w-full overflow-hidden backdrop-blur-md">
                <div className="drag-handle bg-muted/50 flex h-10 cursor-move items-center gap-2 border-b px-3">
                  <Grip className="text-muted-foreground h-4 w-4" />
                  {app.icon && <span className="text-sm">{app.icon}</span>}
                  <span className="text-sm font-medium">{app.title}</span>
                </div>
                <div className="h-[calc(100%-2.5rem)] overflow-auto p-4">
                  {app.content}
                </div>
              </Card>
            </div>
          ))}
      </GridLayout>
    </div>
  );
}
