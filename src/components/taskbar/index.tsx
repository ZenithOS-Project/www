import DateComponent from "./dateButton";
import HomeButton from "./startMenu";
import Notifications from "./notifications";

export default async function TaskBar() {
  return (
    <div className="border-border fixed bottom-0 flex w-screen justify-between border-t px-5 py-2">
      <HomeButton />
      <div className="flex flex-row items-center gap-2">
        <Notifications />
        <DateComponent />
      </div>
    </div>
  );
}
