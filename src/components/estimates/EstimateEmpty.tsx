import { Skeleton } from "../ui/skeleton";

function EstimateEmpty() {
  return (
    <div className="flex gap-4 w-full flex-col items-center">
      <Skeleton className="h-50 w-full max-w-[14rem]" />
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-base text-center lg:text-lg font-medium text-main-blue">
          Your estimate draft will appear here
        </h3>
        <p className="text-sm text-center lg:text-base text-main-blue">
          Start a conversation and view your estimate to get started
        </p>
      </div>
    </div>
  );
}
export default EstimateEmpty;
