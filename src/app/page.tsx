import AppContent from "@/components/appContent";
import TaskBar from "@/components/taskbar";
import { AppsProvider } from "@/contexts/AppsContext";
import { Apps } from "@/constants/apps";
import { withAuth } from "@workos-inc/authkit-nextjs";
import ShowAbove768 from "@/components/ensureDesktop";

export default async function Home() {
  const { user } = await withAuth({ ensureSignedIn: true });
  return (
    <AppsProvider initialApps={Apps}>
      <main>
        <ShowAbove768>
          <AppContent />
          <TaskBar />
        </ShowAbove768>
      </main>
    </AppsProvider>
  );
}
