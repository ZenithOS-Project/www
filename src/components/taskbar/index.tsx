import DateComponent from "./dateButton";
import HomeButton from "./startMenu";
import Notifications from "./notifications";
import Windows from "./windows";

export default async function TaskBar() {
  return (
    <div className="border-border bg-background/10 fixed bottom-0 flex w-screen justify-between border-t-2 px-5 py-2 backdrop-blur-md">
      <div className="flex flex-row items-center gap-2">
        <HomeButton />
        <p className="text-muted-foreground select-none">&#124;</p>
        <Windows />
      </div>

      <div className="flex flex-row items-center gap-2">
        <Notifications />
        <p className="text-muted-foreground select-none">&#124;</p>
        <DateComponent />
      </div>
    </div>
  );
}
