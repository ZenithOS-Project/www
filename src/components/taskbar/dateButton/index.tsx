"use client";

import { getDateString, getTimeString } from "@/utils/getDate";
import { Calendar } from "@components/ui/calendar";
import { DatePopover } from "./DatePopover";
import { useState } from "react";

export default function DateComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-row items-center text-sm">
      <DatePopover
        trigger={
          <>
            {getTimeString(new Date())} / {getDateString(new Date())}
          </>
        }
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow-sm"
          captionLayout="dropdown"
        />
      </DatePopover>
    </div>
  );
}
