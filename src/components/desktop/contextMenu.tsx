import { contextMenuItems } from "@/constants/contextMenu";
import { Card } from "@/shadcn//card";
import { Button } from "@/shadcn//button";

export default function ContextMenu({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="context-menu"
      style={{
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <Card className="bg-card/80 flex w-full flex-col space-y-1 p-2">
        {Object.entries(contextMenuItems).map(([key, item]) => (
          <Button
            key={key}
            variant="ghost"
            className="z-10 justify-start"
            onClick={() => {
              item.function();
            }}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </Button>
        ))}
      </Card>
    </div>
  );
}
