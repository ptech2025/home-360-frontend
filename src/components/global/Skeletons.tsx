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
