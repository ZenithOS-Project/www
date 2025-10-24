"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AppWindow, AppsContextType } from "@/types";

const AppsContext = createContext<AppsContextType | undefined>(undefined);

export function AppsProvider({
  children,
  initialApps,
}: {
  children: ReactNode;
  initialApps: AppWindow[];
}) {
  const [mounted, setMounted] = useState(false);
  const [apps, setApps] = useState<AppWindow[]>(initialApps);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("apps-state");
    if (saved) {
      try {
        const parsedApps = JSON.parse(saved);
        setApps(
          initialApps.map((initialApp) => {
            const savedApp = parsedApps.find(
              (a: AppWindow) => a.id === initialApp.id,
            );
            return savedApp
              ? {
                  ...initialApp,
                  active: savedApp.active,
                  x: savedApp.x,
                  y: savedApp.y,
                  w: savedApp.w,
                  h: savedApp.h,
                }
              : initialApp;
          }),
        );
      } catch (e) {
        console.error("Failed to parse saved apps state:", e);
      }
    }
  }, [initialApps]);

  useEffect(() => {
    if (!mounted) return;

    const serializableApps = apps.map((app) => ({
      id: app.id,
      title: app.title,
      x: app.x,
      y: app.y,
      w: app.w,
      h: app.h,
      active: app.active,
    }));
    localStorage.setItem("apps-state", JSON.stringify(serializableApps));
  }, [apps, mounted]);

  const toggleApp = (id: string) => {
    setApps((prevApps) =>
      prevApps.map((app) =>
        app.id === id ? { ...app, active: !app.active } : app,
      ),
    );
  };

  const updateAppLayout = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
  ) => {
    setApps((prevApps) =>
      prevApps.map((app) => (app.id === id ? { ...app, x, y, w, h } : app)),
    );
  };

  return (
    <AppsContext.Provider value={{ apps, toggleApp, updateAppLayout }}>
      {children}
    </AppsContext.Provider>
  );
}

export function useApps() {
  const context = useContext(AppsContext);
  if (!context) {
    throw new Error("useApps must be used within an AppsProvider");
  }
  return context;
}
