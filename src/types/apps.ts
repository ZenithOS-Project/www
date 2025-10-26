import type { ReactNode } from "react";

export interface AppWindow {
  id: string;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
  x: number;
  y: number;
  w: number;
  h: number;
  active: boolean;
  showInTaskbar: boolean;
}

export interface AppGridProps {
  apps?: AppWindow[];
}

export interface AppsContextType {
  apps: AppWindow[];
  toggleApp: (id: string) => void;
  updateAppLayout: (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
  ) => void;
}

export interface AppsContextTypeWithClosing extends AppsContextType {
  closingApps: Set<string>;
  startClosingApp: (id: string) => void;
}
