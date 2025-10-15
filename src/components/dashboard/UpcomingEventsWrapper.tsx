
"use client";

import { Button } from "../ui/button";
import {
  formatDate,
    addYears,
  startOfYear,
} from "date-fns";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";





export function EventsCard() {
  return (
    <div className="flex gap-3  h-full  flex-col p-2 pr-0  flex-1">
      <div className="flex items-center gap-4 justify-between">
        <h4 className="text-sm text-black font-medium font-circular-medium">
          Reminders
        </h4>
        <Button
          size={"icon"}
          className="text-black hover:bg-main-green hover:text-white bg-transparent shadow-none"
        >
          <Plus />
        </Button>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green  scrollbar-track-lighter-gray">
        {Array.from({ length: 13 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-2  bg-light-gray/10 rounded-md p-2 w-full h-13"
          >
            <span className="rounded-md bg-main-green w-1 min-h-full"> </span>
            <div className="flex flex-col gap-1">
              <h6 className="text-sm font-medium font-circular-medium text-black">
                House Inspection
              </h6>
              <span className="text-gray text-xs">
                {formatDate(new Date(), "MMM dd")},{" "}
                {formatDate(new Date(), "HH:mm aa")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export function CalendarCard() {
  const now = new Date();

  const [date, setDate] = useState<Date | undefined>(now);

  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      defaultMonth={now}
      numberOfMonths={1}
      selected={date}
      onSelect={setDate}
      showOutsideDays={false}
      startMonth={startOfYear(now)}
      endMonth={addYears(now, 5)}
      className="w-full max-w-[15rem] hidden lg:block"
      classNames={{
        day_button: "data-[selected-single=true]:bg-main-green",
      }}
    />
  );
}

 function UpcomingEventsWrapper() {
  return (
    <div className="overflow-y-hidden p-2 max-h-[21.5rem] flex-1 w-full min-h-[21.5rem] flex gap-6 rounded-md shadow-sm shadow-light-gray/50 items-start bg-white">
      <CalendarCard />
      <EventsCard />
    </div>
  );
}


export default UpcomingEventsWrapper