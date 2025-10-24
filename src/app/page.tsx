import AppContent from "@components/appContent";
import TaskBar from "@components/taskbar";
import { AppsProvider } from "@contexts/AppsContext";
import { Apps } from "@components/apps";

export default async function Home() {
  return (
    <AppsProvider initialApps={Apps}>
      <main>
        <AppContent />
        <TaskBar />
      </main>
    </AppsProvider>
  );
}
