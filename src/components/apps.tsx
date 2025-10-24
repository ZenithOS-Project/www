import { Calculator } from "lucide-react";

export const Apps = [
  {
    id: "calculator",
    title: "Calculator",
    icon: <Calculator className="h-4 w-4" />,
    content: (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Calculator App</p>
      </div>
    ),
    x: 0,
    y: 0,
    w: 20,
    h: 20,
    active: false,
  },
];
