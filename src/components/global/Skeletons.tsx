"use client";

import { useChatPanelStore } from "@/store/chatPanelStore";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

export function TableSkeleton() {
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

export function HeaderSkeleton({ heading }: { heading: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="md:text-lg lg:text-xl text-base text-main-blue font-semibold">
        {heading}
      </h1>
      <div className="w-full max-w-[35rem] flex gap-4 items-center h-11">
        <Skeleton className="flex-1 h-full" />
        <Skeleton className="h-11 w-8" />
        <Skeleton className="h-11 px-3 min-w-14 rounded-4xl  " />
      </div>
    </div>
  );
}

export function ChatPageSkeleton() {
  const { isChatPanelOpen } = useChatPanelStore();
  return (
    <section className="w-full h-full py-4  flex-col flex gap-4">
      <div>
        <Skeleton className="h-10 w-14 rounded-full" />
      </div>
      <div
        className={cn(
          "grid   w-full gap-4 overflow-y-hidden flex-1 justify-between",
          isChatPanelOpen
            ? "grid-cols-1 lg:grid-cols-[0.75fr_1fr]"
            : "grid-cols-1"
        )}
      >
        <div
          className={cn(
            "h-full absolute left-0 top-0 pb-1",
            isChatPanelOpen ? "block" : "hidden"
          )}
        >
          <Skeleton className="min-h-full w-full" />
        </div>

        <div className="hidden lg:block h-full pb-1 transition-width duration-300 ease-in-out">
          <Skeleton className="min-h-full w-full" />
        </div>
      </div>
    </section>
  );
}

export function SingleClientPageWrapperSkeleton() {
  return (
    <section className="w-full flex-col flex gap-4  py-4">
      <div>
        <Skeleton className="h-10 w-14 rounded-full" />
      </div>{" "}
      <div className="p-2 md:p-4 w-full min-h-svh  flex-col flex gap-6">
        <div className="flex w-full flex-col gap-4">
          {" "}
          <div className="flex gap-2 items-center">
            <Skeleton className="h-10 w-14" />
            <Skeleton className="h-10 w-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-2">
            <div className="flex items-center justify-start gap-2 w-full">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-7" />
            </div>{" "}
            <div className="flex items-center justify-start gap-2 w-full">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-7" />
            </div>{" "}
            <div className="flex items-center justify-start gap-2 w-full">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-7" />
            </div>
          </div>
        </div>
        <TableSkeleton />
      </div>
    </section>
  );
}

export function SingleProjectPageSkeleton() {
  return (
    <section className="w-full flex-col flex gap-4  py-4">
      <div>
        <Skeleton className="h-10 w-14 rounded-full" />
      </div>{" "}
      <div className="p-2 md:p-4 w-full min-h-svh  flex-col flex gap-6">
        <div className="flex md:flex-row flex-col justify-between md:items-center w-full gap-3 lg:gap-6">
          <div className="flex items-start gap-4">
            <div className="flex gap-1 flex-col flex-1">
              <Skeleton className="h-10 w-14" />

              <Skeleton className="h-5 w-7" />
            </div>
            <div className="md:hidden flex items-center justify-center">
              <Skeleton className="h-5 w-5" />
            </div>
          </div>
          <div className="flex max-md:flex-wrap items-center gap-3">
            <Skeleton className="h-8 w-10" />

            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-8 w-10" />

            <div className="md:flex items-center justify-center hidden">
              <Skeleton className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full [&>div]:min-h-[16rem]">
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
        </div>
      </div>
    </section>
  );
}
