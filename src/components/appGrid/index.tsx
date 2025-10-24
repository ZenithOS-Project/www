"use client";

import { useState, useRef, useEffect } from "react";
import GridLayout, { type Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { Card } from "@components/ui/card";
import { Grip, X } from "lucide-react";
import { useApps } from "@/contexts/AppsContext";
import type { AppGridProps, AppWindow } from "@/types";
import { Button } from "@components/ui/button";

export default function AppGrid({ apps = [] }: AppGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevAppsRef = useRef<AppWindow[] | null>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [containerHeight, setContainerHeight] = useState(600);
  const [openingApps, setOpeningApps] = useState<Set<string>>(new Set());
  const [animatingApps, setAnimatingApps] = useState<Set<string>>(new Set());
  const { updateAppLayout, startClosingApp, closingApps } = useApps();

  const [layout, setLayout] = useState<Layout[]>(
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
    if (prevAppsRef.current === null) {
      prevAppsRef.current = apps;
      return;
    }

    const prevActive = prevAppsRef.current
      .filter((a) => a.active)
      .map((a) => a.id);
    const currentActive = apps.filter((a) => a.active).map((a) => a.id);

    const newOpening = currentActive.filter((id) => !prevActive.includes(id));

    if (newOpening.length > 0) {
      setOpeningApps(new Set(newOpening));
      setAnimatingApps(new Set());

      requestAnimationFrame(() => {
        setAnimatingApps(new Set(newOpening));
      });

      const timer = setTimeout(() => {
        setOpeningApps(new Set());
        setAnimatingApps(new Set());
      }, 300);

      prevAppsRef.current = apps;
      return () => clearTimeout(timer);
    }

    prevAppsRef.current = apps;
  }, [apps]);

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

  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  const onDragStop = (layoutArr: Layout[]) => {
    layoutArr.forEach((item) => {
      updateAppLayout(item.i as string, item.x, item.y, item.w, item.h);
    });
  };

  const onResizeStop = (layoutArr: Layout[]) => {
    layoutArr.forEach((item) => {
      updateAppLayout(item.i as string, item.x, item.y, item.w, item.h);
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
          .map((app) => {
            const isOpening = openingApps.has(app.id);
            const isAnimating = animatingApps.has(app.id);
            const isClosing = closingApps.has(app.id);

            return (
              <div
                key={app.id}
                className=""
                style={{
                  opacity: isClosing ? 0 : isAnimating ? 1 : isOpening ? 0 : 1,
                  transform: isClosing
                    ? "scale(0.90)"
                    : isAnimating
                      ? "scale(1)"
                      : isOpening
                        ? "scale(0.90)"
                        : "scale(1)",
                  transition:
                    isClosing || isAnimating
                      ? "all 0.075s ease-in-out"
                      : "none",
                }}
              >
                <Card className="bg-card/80 h-full w-full overflow-hidden backdrop-blur-md">
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
                    {app.content}
                  </div>
                </Card>
              </div>
            );
          })}
      </GridLayout>
    </div>
  );
}
