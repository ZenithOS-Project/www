import { Calculator } from "lucide-react";
import type { AppWindow } from "@/types";
import CalculatorApp from "@apps/calculator";

export const Apps: AppWindow[] = [
  {
    id: "calculator",
    title: "Calculator",
    icon: <Calculator className="h-6 w-6" />,
    content: <CalculatorApp />,
    x: 0,
    y: 0,
    w: 5,
    h: 8,
    active: false,
  },
];
