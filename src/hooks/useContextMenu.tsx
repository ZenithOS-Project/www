import { useEffect, useState } from "react";

export type ContextPoint = { x: number; y: number } | null;

export function useContextMenu(
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const [contextPoint, setContextPoint] = useState<ContextPoint>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setContextPoint({ x: e.clientX, y: e.clientY });
    };

    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener("contextmenu", handleContextMenu);
    }

    const handleClick = () => setContextPoint(null);
    window.addEventListener("click", handleClick);

    return () => {
      if (ref) {
        ref.removeEventListener("contextmenu", handleContextMenu);
      }
      window.removeEventListener("click", handleClick);
    };
  }, [containerRef]);

  return [contextPoint, setContextPoint] as const;
}
