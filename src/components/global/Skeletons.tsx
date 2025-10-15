"use client";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

export function TableLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Skeleton className=" min-h-[300px] w-full" />
      <div className="flex  w-full flex-col sm:flex-row items-center sm:justify-between">
        <Skeleton className="h-8 w-1/4" />
        <div className="flex gap-2 ">
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
