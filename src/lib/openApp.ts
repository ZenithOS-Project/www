export function openApp(appId: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("open-app", { detail: appId }));
}
