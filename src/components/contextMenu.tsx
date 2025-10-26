import { Copy, RefreshCcw, Clipboard } from "lucide-react";
import Calculator from "./appWindows/calculator";
import { Apps } from "./apps";

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
    icon: <Clipboard />,
    function: () => {
      window.dispatchEvent(
        new CustomEvent("open-app", { detail: "calculator" }),
      );
    },
  },
};
