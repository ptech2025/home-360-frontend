"use client";

import { formatDate, addYears, startOfYear } from "date-fns";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";

type EventsCardProps = {
  orientation: "horizontal" | "vertical";
};
type EventsWrapperProps = {
  orientation?: "horizontal" | "vertical";
  homeId: string;
  className?: string;
  calendarClassName?: string;
};

type CalendarCardProps = {
  className?: string;
};

export function EventsCard({ orientation = "horizontal" }: EventsCardProps) {
  return (
    <div
      className={cn(
        "flex gap-3  h-full   flex-col p-2 flex-1",
        orientation === "horizontal" ? "pr-0" : ""
      )}
    >
      <div className="flex items-center gap-4 justify-between">
        <h4 className="text-sm text-black font-medium font-circular-medium">
          Upcoming Events
        </h4>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green  scrollbar-track-lighter-gray">
        {Array.from({ length: 5 }).map((_, index) => (
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

export function CalendarCard({ className }: CalendarCardProps) {
  const now = new Date();

  const [date, setDate] = useState<Date | undefined>(now);

  return (
    <div className="w-full flex-col items-center gap-2">
      <Calendar
        mode="single"
        captionLayout="dropdown"
        defaultMonth={now}
        numberOfMonths={1}
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
        startMonth={startOfYear(now)}
        endMonth={addYears(now, 10)}
        className={cn("w-full", className)}
        classNames={{
          day_button: "data-[selected-single=true]:bg-main-green",
        }}
      />
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-1">
          <Dot className="size-2 bg-main-green text-main-green shrink-0 rounded-full" />
          <span className="text-xs text-gray">Default</span>
        </div>{" "}
        <div className="flex items-center gap-1">
          <Dot className="size-2 bg-main-yellow text-main-yellow shrink-0 rounded-full" />
          <span className="text-xs text-gray">Appliance</span>
        </div>{" "}
        <div className="flex items-center gap-1">
          <Dot className="size-2 bg-red-500 text-red-500 shrink-0 rounded-full" />
          <span className="text-xs">Custom</span>
        </div>
      </div>
    </div>
  );
}

function UpcomingEventsWrapper({
  homeId,
  orientation = "horizontal",
  className,
  calendarClassName,
}: EventsWrapperProps) {
  return (
    <div
      className={cn(
        "overflow-y-hidden p-2  flex-1 w-full  flex gap-6 rounded-md shadow-sm shadow-light-gray/50  bg-white",
        orientation === "horizontal"
          ? "flex-row h-[21.5rem] items-start"
          : "flex-col min-h-full ",
        className
      )}
    >
      <CalendarCard className={calendarClassName} />
      <EventsCard orientation={orientation} />
    </div>
  );
}

export default UpcomingEventsWrapper;
