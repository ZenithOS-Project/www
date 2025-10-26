import { Copy, RefreshCcw, Clipboard, Info } from "lucide-react";
import { openApp } from "@/lib/openApp";

export const contextMenuItems = {
  refresh: {
    label: "Refresh",
    icon: <RefreshCcw />,
    function: () => {
      window.location.reload();
    },
  },
  wallpaper: {
    label: "Change Wallpaper",
    icon: <Clipboard />,
    function: () => {
      alert("Change Wallpaper clicked");
    },
  },
  info: {
    label: "Get System Info",
    icon: <Info />,
    function: () => {
      openApp("settings");
    },
  },
};
