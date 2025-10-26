"use client";

import { useState, useRef, useEffect } from "react";
import GridLayout, { type Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { useApps } from "@/contexts/AppsContext";
import type { AppGridProps, AppWindow } from "@/types";
import ContextMenu from "./contextMenu";
import WindowCard from "./WindowCard";
import { createLayoutFromApps, updateLayoutFromApps } from "@/lib/desktopUtils";
import { useContextMenu } from "@/hooks/useContextMenu";

export default function AppGrid({ apps = [] }: AppGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevAppsRef = useRef<AppWindow[] | null>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [containerHeight, setContainerHeight] = useState(600);
  const [openingApps, setOpeningApps] = useState<Set<string>>(new Set());
  const [animatingApps, setAnimatingApps] = useState<Set<string>>(new Set());
  const { updateAppLayout, startClosingApp, closingApps, toggleApp } =
    useApps();

  const [layout, setLayout] = useState<Layout[]>(() =>
    createLayoutFromApps(apps),
  );

  useEffect(() => {
    const openAppHandler = (e: Event) => {
      const ce = e as CustomEvent<string>;
      if (ce?.detail) {
        toggleApp(ce.detail);
      }
    };

    window.addEventListener("open-app", openAppHandler as EventListener);
    return () =>
      window.removeEventListener("open-app", openAppHandler as EventListener);
  }, [toggleApp]);

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
      const id = String(item.i);
      updateAppLayout(id, item.x, item.y, item.w, item.h);
    });
  };

  const onResizeStop = (layoutArr: Layout[]) => {
    layoutArr.forEach((item) => {
      const id = String(item.i);
      updateAppLayout(id, item.x, item.y, item.w, item.h);
    });
  };

  const [contextMenu, setContextMenu] = useContextMenu(containerRef);
  return (
    <div ref={containerRef} className="h-full w-full">
      {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} />}
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
                <WindowCard
                  app={app}
                  isOpening={isOpening}
                  isAnimating={isAnimating}
                  isClosing={isClosing}
                  startClosingApp={startClosingApp}
                />
              </div>
            );
          })}
      </GridLayout>
    </div>
  );
}
