import { getUser } from "@/fetchers/user/getUser";
import StartMenuPopover from "./startMenuPopover";
import StartMenuPopoverContent from "./startMenuPopoverContent";

export default async function startMenu() {
  const user = await getUser();

  return (
    <StartMenuPopover>
      <StartMenuPopoverContent user={user} />
    </StartMenuPopover>
  );
}
