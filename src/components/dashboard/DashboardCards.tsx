"use client";
import { Calendar } from "@/components/ui/calendar";

import { formatCurrency } from "@/utils/funcs";
import { Button } from "../ui/button";
import { JSX, useState } from "react";
import {
  addYears,
  formatDate,
  startOfYear,
  differenceInDays,
  addDays,
} from "date-fns";
import { MoreVertical, Plus, Search } from "lucide-react";
import { HouseIcon, AlertIcon, DocumentIcon } from "../global/Icons";
import { Appliance, Document, Home } from "@/types/prisma-schema-types";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";

interface Metric {
  title: string;
  value: string;
  date: Date;
  subtitle?: string;
  icon: JSX.Element;
}
type MetricsCardProps = {
  data: Metric;
};
type MetricsCardWrapperProps = {
  documents: Document[];
  appliances: Appliance[];
};

type OverviewCardProps = {
  home: Home;
};

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
      <div className="flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green scrollbar-track-main-green/20">
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

export function MetricsCard({ data }: MetricsCardProps) {
  const { title, value, date, subtitle, icon } = data;
  return (
    <div className="w-full relative rounded-md overflow-clip flex flex-col items-start px-4 gap-4 py-6 shadow-light-gray/50 shadow-xs ">
      <div className="flex relative z-10 items-start w-full justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium font-circular-medium text-black">
            {title}
          </span>
          <span className="text-gray text-sm">
            {formatDate(date, "MMMM yyyy")}
          </span>
        </div>
        <Button
          size={"icon"}
          className="text-black hover:bg-main-green hover:text-white bg-transparent shadow-none"
        >
          <MoreVertical />
        </Button>
      </div>
      <div className="flex relative z-10 flex-col gap-1 ">
        {subtitle && <span className="text-sm text-gray">{subtitle}</span>}
        <h5 className="text-xl lg:text-2xl font-bold font-circular-bold text-black">
          {value}
        </h5>
      </div>
      {icon}
    </div>
  );
}

export function OverviewCard({ home }: OverviewCardProps) {
  const { isPending, data } = authClient.useSession();
  return (
    <div className="w-full shadow-light-gray/50 shadow-xs lg:max-w-[30rem] lg:min-h-[12rem] bg-main-green rounded-md py-6 px-4 flex-col gap-6 lg:gap-8 flex">
      <div className="flex justify-between lg:items-start gap-4 items-center lg:flex-row flex-col">
        {isPending ? (
          <Skeleton className="w-1/3 h-6" />
        ) : (
          <h4 className="text-white font-circular-light text-sm">
            Welcome {data?.user.name || ""}
          </h4>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-white font-circular-light text-sm">
            Current Home Value
          </span>
          <h5 className="text-white font-circular-bold font-bold text-xl lg:text-2xl">
            {formatCurrency(home.homeValue || 0)}
          </h5>
        </div>
      </div>
      <div className="flex justify-between gap-4 lg:items-end items-center lg:flex-row flex-col">
        <div className="flex items-center lg:items-start flex-col">
          <span className="text-white font-circular-light text-xs">
            Property Details
          </span>
          <p className="text-white text-center lg:text-start font-circular-bold font-bold text-xl lg:text-2xl">
            {home.address || ""}
          </p>
          <div className="w-full flex flex-wrap gap-1.5 justify-center lg:justify-start items-center">
            {home.squareFeet && (
              <>
                <span className="text-xs font-circular-light text-white ">
                  {home.squareFeet} sqft
                </span>
                <span className="bg-white rounded-full size-1"></span>{" "}
              </>
            )}{" "}
            {home.bedrooms && (
              <>
                <span className="text-xs font-circular-light text-white ">
                  {home.bedrooms} Bedrooms
                </span>
                <span className="bg-white rounded-full size-1"></span>{" "}
              </>
            )}{" "}
            {home.bathrooms && (
              <>
                <span className="text-xs font-circular-light text-white ">
                  {home.bathrooms} Bathrooms
                </span>
                <span className="bg-white rounded-full size-1"></span>{" "}
              </>
            )}{" "}
            {home.yearBuilt && (
              <>
                <span className="text-xs font-circular-light text-white ">
                  Year Built: {home.yearBuilt}
                </span>
              </>
            )}{" "}
          </div>
        </div>
        <Button className="w-full shrink-0 lg:w-max text-main-green px-8 bg-white border border-transparent hover:bg-light-gray shadow-none hover:text-white duration-300 hover:border-white">
          Edit
        </Button>
      </div>
    </div>
  );
}
export function UpcomingEventsCardWrapper() {
  return (
    <div className="overflow-y-hidden p-2 max-h-[21.5rem] flex-1 w-full min-h-[21.5rem] flex gap-6 rounded-md shadow-sm shadow-light-gray/50 items-start bg-white">
      <CalendarCard />
      <EventsCard />
    </div>
  );
}
export function MetricsCardWrapper({
  documents,
  appliances,
}: MetricsCardWrapperProps) {
  const metrics: Metric[] = [
    {
      title: "Expenses",
      value: formatCurrency(10000),
      date: new Date(),
      subtitle: "Last 30 days",
      icon: <HouseIcon className="absolute  bottom-0 right-0" />,
    },
    {
      title: "Appliances",
      subtitle: `Total`,
      date: new Date(),
      value: `${appliances.length} Appliances`,
      icon: <AlertIcon className="absolute  bottom-0 right-0" />,
    },
    {
      title: "Documents",
      subtitle: "Total",
      value: `${documents.length} Files`,
      date: new Date(),
      icon: <DocumentIcon className="absolute  bottom-0 right-0" />,
    },
  ];

  return (
    <div className="grid  grid-cols-1 lg:grid-cols-3 w-full gap-4 items-center lg:flex-row flex-col lg:col-span-2 lg:row-start-2">
      {metrics.map((data, index) => (
        <MetricsCard key={index} data={data} />
      ))}
    </div>
  );
}

export function ServicesCard() {
  return (
    <div className="flex gap-3 rounded-md shadow-sm shadow-light-gray/50  h-[20rem] lg:max-w-[20rem]  flex-col p-2  flex-1">
      <div className="flex items-center gap-4 justify-between">
        <h4 className="text-sm text-black font-medium font-circular-medium">
          Services Nearby
        </h4>
        <Button
          size={"icon"}
          className="text-black hover:bg-main-green hover:text-white bg-transparent shadow-none"
        >
          <Search />
        </Button>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green scrollbar-track-main-green/20">
        {Array.from({ length: 13 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-2  bg-light-gray/10 rounded-md p-2 w-full h-13"
          >
            <span className="rounded-md bg-main-green w-1 min-h-full"> </span>
            <div className="flex flex-col gap-1">
              <h6 className="text-sm font-medium font-circular-medium text-black">
                Joe&apos;s Plumbing
              </h6>
              <div className="flex items-center gap-1">
                <span className="text-gray text-xs">Plumbing</span>
                <span className="bg-gray size-1 rounded-full"></span>
                <span className="text-gray text-xs">600m</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
