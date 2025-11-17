"use client";

import { formatDate, addYears, startOfYear } from "date-fns";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarOff, Dot } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { taskQueries } from "@/queries/task";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MaintenanceInstance, Reminder } from "@/types/prisma-schema-types";
import { UpcomingEventsWrapperLoadingSkeleton } from "../global/Skeletons";
import { Route } from "next";
import { applianceQueries } from "@/queries/appliance";

type EventsCardProps = {
  orientation: "horizontal" | "vertical";
  type: "reminders" | "tasks";
  reminders?: Reminder[];
  tasks?: MaintenanceInstance[];
};
type EventsWrapperProps = {
  orientation?: "horizontal" | "vertical";
  homeId: string;
  className?: string;
  calendarClassName?: string;
  type: "tasks" | "reminders";
};

type CalendarCardProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
  date?: string;
};

export function EventsCard({
  orientation = "horizontal",
  reminders,
  type,
  tasks,
}: EventsCardProps) {
  return (
    <div
      className={cn(
        "flex gap-3  w-full h-full   flex-col p-2 flex-1",
        orientation === "horizontal" ? "pr-0" : ""
      )}
    >
      <div className="flex items-center gap-4 justify-between">
        <h4 className="text-sm capitalize text-black font-medium font-circular-medium">
          Upcoming {type}
        </h4>
      </div>
      <div className="flex min-h-full flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green  scrollbar-track-lighter-gray">
        {type === "tasks" && (
          <>
            {tasks &&
              tasks.length > 0 &&
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-2  bg-light-gray/10 rounded-md p-2 w-full h-13"
                >
                  <span
                    className={cn(
                      "rounded-md w-1 min-h-full",
                      task.isCustom ? "bg-red-500" : "bg-main-green"
                    )}
                  >
                    {" "}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h6 className="text-sm font-medium font-circular-medium text-black">
                      {task.title}
                    </h6>
                    <span className="text-gray text-xs">
                      {formatDate(new Date(task.dueDate), "MMM dd")},{" "}
                      {formatDate(new Date(task.dueDate), "HH:mm aa")}
                    </span>
                  </div>
                </div>
              ))}
            {(!tasks || tasks.length === 0) && (
              <div className="p-4 text-black bg-light-gray/10 h-full text-sm font-circular-medium rounded-md flex items-center justify-center flex-col gap-4">
                <div className="size-10 p-1 flex items-center justify-center rounded-md border bg-white">
                  <CalendarOff />
                </div>
                <span className="capitalize">
                  No {type} Found For Selected Date
                </span>
              </div>
            )}
          </>
        )}

        {type === "reminders" && (
          <>
            {reminders &&
              reminders.length > 0 &&
              reminders.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-2  bg-light-gray/10 rounded-md p-2 w-full h-13"
                >
                  <span
                    className={cn("rounded-md w-1 min-h-full bg-main-yellow")}
                  >
                    {" "}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h6 className="text-sm font-medium font-circular-medium text-black">
                      {task.taskName}
                    </h6>
                    <span className="text-gray text-xs">
                      {formatDate(new Date(task.dueDate), "MMM dd")},{" "}
                      {formatDate(new Date(task.dueDate), "HH:mm aa")}
                    </span>
                  </div>
                </div>
              ))}
            {(!reminders || reminders.length === 0) && (
              <div className="p-4 text-black bg-light-gray/10 h-full text-sm font-circular-medium rounded-md flex items-center justify-center flex-col gap-4">
                <div className="size-10 p-1 flex items-center justify-center rounded-md border bg-white">
                  <CalendarOff />
                </div>
                <span className="capitalize">
                  No {type} Found For Selected Date
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function CalendarCard({
  className,
  orientation = "horizontal",
  date,
}: CalendarCardProps) {
  const now = new Date();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    date ? new Date(date) : undefined
  );

  const handleDateSelect = (newDate: Date | undefined) => {
    const params = new URLSearchParams(searchParams);
    setSelectedDate(newDate);
    if (newDate) {
      params.set("date", newDate.toISOString());
    } else {
      params.delete("date");
    }
    router.push(`${pathname}?${params.toString()}` as Route, { scroll: false });
  };
  return (
    <div
      className={cn(
        " flex items-center gap-0",
        orientation === "vertical" ? "flex-col" : "flex-col-reverse"
      )}
    >
      <Calendar
        mode="single"
        captionLayout="label"
        defaultMonth={selectedDate ?? now}
        numberOfMonths={1}
        selected={selectedDate}
        onSelect={handleDateSelect}
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
  type,
  calendarClassName,
}: EventsWrapperProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date")
    ? new Date(searchParams.get("date") as string).toISOString()
    : undefined;

  const { data: tasks, isLoading: isTasksLoading } = useQuery(
    taskQueries.taskEvents(homeId, type === "tasks", date)
  );
  const { data: appliance, isLoading: isRemindersLoading } = useQuery(
    applianceQueries.applianceEvents(homeId, type === "reminders", date)
  );

  return (
    <div
      className={cn(
        "overflow-y-hidden p-1.5  flex-1 w-full  flex gap-6 rounded-md shadow-sm shadow-light-gray/50  bg-white",
        orientation === "horizontal"
          ? "flex-row h-[22rem] items-start"
          : "flex-col min-h-full ",
        className
      )}
    >
      <CalendarCard
        className={calendarClassName}
        date={date}
        orientation={orientation}
      />

      {isTasksLoading || isRemindersLoading ? (
        <UpcomingEventsWrapperLoadingSkeleton orientation={orientation} />
      ) : (
        <EventsCard
          orientation={orientation}
          tasks={type === "tasks" ? tasks : []}
          type={type}
          reminders={type === "reminders" ? appliance?.data : []}
        />
      )}
    </div>
  );
}

export default UpcomingEventsWrapper;
