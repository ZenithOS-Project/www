import type { Layout } from "react-grid-layout";
import type { AppWindow } from "@/types";

export function createLayoutFromApps(apps: AppWindow[]): Layout[] {
  return apps.map((app) => ({
    i: app.id,
    x: app.x,
    y: app.y,
    w: app.w,
    h: app.h,
    minW: 2,
    minH: 2,
  }));
}

export function updateLayoutFromApps(
  prevLayout: Layout[],
  apps: AppWindow[],
): Layout[] {
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
}
