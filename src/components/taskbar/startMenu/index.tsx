import StartMenuPopover from "./startMenuPopover";
import { StartMenuPopoverContent } from "./startMenuPopoverContent";

export default async function startMenu() {
  return (
    <StartMenuPopover>
      <StartMenuPopoverContent />
    </StartMenuPopover>
  );
}
