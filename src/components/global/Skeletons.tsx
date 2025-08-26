import { Skeleton } from "../ui/skeleton";

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
