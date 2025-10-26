"use client";
import { Calculator, Settings } from "lucide-react";
import type { AppWindow } from "@/types";
import CalculatorApp from "@apps/calculator";
import SettingsApp from "@apps/settings";

export const Apps: AppWindow[] = [
  {
    id: "settings",
    title: "Settings",
    icon: <Settings className="h-6 w-6" />,
    component: SettingsApp,
    x: 2,
    y: 2,
    w: 10,
    h: 8,
    active: false,
    showInTaskbar: false,
  },
  {
    id: "calculator",
    title: "Calculator",
    icon: <Calculator className="h-6 w-6" />,
    component: CalculatorApp,
    x: 0,
    y: 0,
    w: 7,
    h: 7,
    active: false,
    showInTaskbar: true,
  },
];
