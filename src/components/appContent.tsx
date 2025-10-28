"use client";

import AppGrid from "@/components/desktop";
import { useApps } from "@/contexts/AppsContext";

export default function AppContent() {
  const { apps } = useApps();

  return (
    <div className="h-[calc(100vh-52px)] w-screen overflow-hidden">
      <AppGrid apps={apps} />
    </div>
  );
}
