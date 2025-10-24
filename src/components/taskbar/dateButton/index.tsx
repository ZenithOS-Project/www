"use client";

import { getDateString, getTimeString } from "@utils/getDate";
import { Calendar } from "@components/ui/calendar";
import { DatePopover } from "./DatePopover";
import { useState, useEffect } from "react";

export default function DateComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    setCurrentTime(getTimeString(now));
    setCurrentDate(getDateString(now));

    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(getTimeString(now));
      setCurrentDate(getDateString(now));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row items-center text-sm">
      <DatePopover
        trigger={
          <>
            {currentTime || "--:--"} / {currentDate || "--/--/----"}
          </>
        }
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border bg-none! shadow-sm"
          captionLayout="dropdown"
        />
      </DatePopover>
    </div>
  );
}
