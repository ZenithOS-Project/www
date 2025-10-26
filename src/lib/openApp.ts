export function openApp(appId: string, initialProps?: Record<string, any>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("open-app", { detail: { appId, initialProps } }),
  );
}
