import AppContent from "@components/appContent";
import TaskBar from "@components/taskbar";
import { AppsProvider } from "@contexts/AppsContext";
import { Apps } from "@/components/constants/apps";
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function Home() {
  const { user } = await withAuth({ ensureSignedIn: true });
  return (
    <AppsProvider initialApps={Apps}>
      <main>
        <AppContent />
        <TaskBar />
      </main>
    </AppsProvider>
  );
}
