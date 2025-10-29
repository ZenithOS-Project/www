"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export default function ShowAbove768({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setShow(mq.matches);

    onChange();

    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", onChange);
      }
    };
  }, []);

  if (!show) return null;
  return <>{children}</>;
}
