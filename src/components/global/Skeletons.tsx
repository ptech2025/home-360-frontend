"use client";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableLoadingSkeleton() {
  const rows = Array.from({ length: 6 });

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="overflow-hidden w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#fbfbfb]">
              <TableHead className="py-4 font-circular-medium first:pl-6 w-[25px]">
                <Skeleton className="h-4 w-4" />
              </TableHead>
              <TableHead className="py-4 font-circular-medium first:pl-6">
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead className="py-4 font-circular-medium first:pl-6">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="py-4 font-circular-medium first:pl-6">
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead className="py-4 font-circular-medium first:pl-6">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="py-4 font-circular-medium last:pr-6 w-[40px]">
                <Skeleton className="h-4 w-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((_, index) => (
              <TableRow key={index}>
                <TableCell className="py-4 first:pl-6 w-[25px]">
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell className="py-4 first:pl-6">
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="py-4 first:pl-6">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                <TableCell className="py-4 first:pl-6">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </TableCell>
                <TableCell className="py-4 first:pl-6">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="py-4 last:pr-6 w-[40px]">
                  <Skeleton className="h-4 w-4" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full flex-col sm:flex-row items-center sm:justify-between">
        <Skeleton className="h-8 w-1/4" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
export function MetricsWrapperLoadingSkeleton() {
  return (
    <div className="grid   grid-cols-1 lg:grid-cols-3 w-full gap-4 items-center lg:flex-row flex-col lg:col-span-2 lg:row-start-2">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

export function ServicesWrapperLoadingSkeleton() {
  return (
    <div className="flex gap-3 shrink-0 rounded-md shadow-sm shadow-light-gray/50  h-[20rem] w-full min-w-[20rem] lg:max-w-[20rem]  flex-col p-2  flex-1">
      <div className="flex items-center gap-4 justify-between">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="size-10" />
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green  scrollbar-track-lighter-gray">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-50 w-full" />
        ))}
      </div>
    </div>
  );
}

export function DashboardPageLoadingSkeleton() {
  return (
    <section className="flex w-full flex-col gap-4 px-4 py-4 ">
      <div className="lg:flex-row flex flex-col gap-4 w-full">
        <Skeleton className="lg:max-w-[30rem] w-full min-h-[12rem]" />
        <Skeleton className="w-full flex-1 h-full min-h-[12rem]" />
      </div>
      <MetricsWrapperLoadingSkeleton />
      <div className="lg:flex-row w-full flex flex-col gap-4">
        <TableLoadingSkeleton />
        <ServicesWrapperLoadingSkeleton />
      </div>
    </section>
  );
}

export function DocumentsPageLoadingSkeleton() {
  return (
    <section className="flex flex-col items-center gap-2 w-full">
      <div className="py-2 px-3 w-full flex flex-col">
        <div className="border-b border-lighter-gray flex justify-between items-center py-4">
          <div className="flex w-full gap-1 items-center">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 rounded-full w-4" />
          </div>
          <Skeleton className="h-6 w-1/4" />
        </div>{" "}
        <div className="flex justify-end items-center py-4">
          <div className="flex items-center gap-2">
            <Skeleton className="size-10" />
            <Skeleton className="size-10" />
          </div>
        </div>
      </div>

      <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-50 rounded-xl  w-full" />
        ))}
      </div>
    </section>
  );
}

export function UpcomingEventsWrapperLoadingSkeleton({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      className={cn(
        "flex gap-3 w-full h-full flex-col p-2 flex-1",
        orientation === "horizontal" ? "pr-0" : ""
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-4 justify-between">
        <Skeleton className="h-5 w-32" />
      </div>
      {/* Events List */}
      <div className="flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green scrollbar-track-lighter-gray">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-2 bg-light-gray/10 rounded-md p-2 w-full h-13"
          >
            <Skeleton className="w-1 min-h-full rounded-md" />
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeDetailsWrapperLoadingSkeleton() {
  return (
    <section className="px-4 flex flex-col gap-4 py-4 bg-lighter-gray/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Top Grid - 3 Cards */}
      <div className="md:grid-cols-3 grid grid-cols-1 gap-4">
        {/* Property Address Card */}
        <div className="rounded-xl flex flex-col gap-4 bg-white p-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-10 w-36" />
        </div>

        {/* County Card */}
        <div className="rounded-xl bg-white p-6 flex flex-col gap-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>

        {/* Property Type Card */}
        <div className="rounded-xl relative bg-white p-6 flex flex-col gap-4">
          <Skeleton className="absolute top-4 right-4 h-6 w-16 rounded-full" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      {/* Bottom Grid - 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Property Details Section */}
        <div className="rounded-xl bg-white p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={`detail-${index}`}
                className="flex bg-lighter-gray/50 py-2 px-4 rounded-md gap-4 items-center justify-between"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Public Record Details Section */}
        <div className="rounded-xl bg-white p-6 flex flex-col gap-4">
          <Skeleton className="h-7 w-48" />
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`record-${index}`}
                className="flex bg-lighter-gray/50 py-2 px-4 rounded-md gap-4 items-center justify-between"
              >
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExpensesMetricsWrapperLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 w-full md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="w-full min-h-[165px] relative h-full bg-white rounded-xl p-6 flex flex-col gap-4 border border-lighter-gray"
        >
          {/* Title */}
          <Skeleton className="h-6 w-40" />

          {/* Value and Subtext */}
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>

          {/* Icon in top-right corner */}
          <Skeleton className="size-12 absolute top-4 right-4 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function ExpensesBreakdownLoadingSkeleton() {
  return (
    <div className="rounded-xl bg-white p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-6 w-40" />
      </div>
      {/* Expense Items Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex bg-lighter-gray/50 py-2 px-4 rounded-md gap-4 items-center justify-between"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AppliancePageWrapperLoadingSkeleton() {
  return (
    <section className="px-4 flex flex-col gap-4 py-4 bg-lighter-gray/50 min-h-screen">
      {/* Title and Description */}
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Metrics Wrapper */}
      <ExpensesMetricsWrapperLoadingSkeleton />

      {/* Main Content Container */}
      <div className="flex flex-col items-center min-h-screen w-full bg-white rounded-t-md p-4 gap-6">
        {/* Page Header */}
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex gap-1 items-center">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
          <div className="flex gap-4 justify-end items-center">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-64 rounded-md" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-10 rounded-md" />
              <Skeleton className="size-10 rounded-md" />
            </div>
          </div>
        </div>

        {/* Grid View Skeleton */}
        <div className="grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] min-h-[300px]">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl w-full flex flex-col gap-3 p-4 bg-white border border-lighter-gray"
            >
              <div className="flex flex-col gap-1 flex-1">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <div className="grid md:grid-cols-2 gap-4 justify-between w-full items-center">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex w-full flex-col sm:flex-row items-center sm:justify-between">
          <Skeleton className="h-8 w-1/4" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SingleAppliancePageWrapperLoadingSkeleton() {
  return (
    <section className="px-4 flex flex-col gap-4 py-4 bg-lighter-gray/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-7 w-80" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Back Button */}
      <Skeleton className="h-10 w-40 rounded-md" />

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {/* Appliance Preview Card Skeleton */}
          <div className="flex flex-col gap-2 bg-white rounded-md p-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-10 w-20 rounded-md" />
            </div>
            <div className="flex items-center bg-lighter-gray/50 rounded-md p-2 min-h-[240px] justify-center">
              <Skeleton className="size-[240px] rounded-md" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance History Skeleton */}
          <ApplianceMaintenanceHistoryLoadingSkeleton />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {/* Warranty Card Skeleton */}
          <div className="flex flex-col gap-2 bg-white rounded-md p-4">
            <Skeleton className="h-7 w-48" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>

          {/* Reminder Card Skeleton */}
          <div className="flex flex-col gap-2 bg-white rounded-md p-4">
            <Skeleton className="h-7 w-40" />
            <div className="flex h-full flex-col gap-3">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>

          {/* Document Card Skeleton */}
          <div className="flex flex-col gap-2 bg-white rounded-md p-4">
            <Skeleton className="h-7 w-32" />
            <div className="grid grid-cols-1 gap-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="flex gap-3 justify-between items-center"
                >
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="size-10 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ApplianceMaintenanceHistoryLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-4">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-xl border border-lighter-gray p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-7 w-20" />
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
