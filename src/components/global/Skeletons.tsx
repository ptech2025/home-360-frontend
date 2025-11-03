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
