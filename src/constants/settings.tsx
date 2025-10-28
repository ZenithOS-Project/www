import { Bell, Info, Lock, MonitorCog, User } from "lucide-react";
import AccountSettings from "@/components/settingsTabs/account";
import SystemSettings from "@/components/settingsTabs/system";

export const SettingsTabsAndContent = {
  system: {
    icon: <MonitorCog />,
    title: "System",
    content: <SystemSettings />,
  },
  account: {
    icon: <User />,
    title: "Account",
    content: <AccountSettings />,
  },
  privacy: {
    icon: <Lock />,
    title: "Privacy",
    content: <div>Privacy Settings</div>,
  },
  notifications: {
    icon: <Bell />,
    title: "Notifications",
    content: <div>Notification Settings</div>,
  },
  info: {
    icon: <Info />,
    title: "Info",
    content: (
      <div>
        <h2>System Information</h2>
        <p className="text-muted-foreground text-xs">OS: Zenith OS</p>
        <p className="text-muted-foreground text-xs">Version: 1.2.0</p>

        <br />
        <p className="text-foreground text-xs">Credits:</p>
        <ul className="text-muted-foreground list-inside list-disc text-xs">
          <li>Zyggzz - Lead Developer & Designer</li>
        </ul>
      </div>
    ),
  },
};
