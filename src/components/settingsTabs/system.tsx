import ThemeSwitcher from "@/components/themeSwitcher";

export default function SystemSettings() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        Theme Switcher:
        <ThemeSwitcher />
      </div>
    </div>
  );
}
