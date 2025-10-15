import { Search } from "lucide-react";
import { Button } from "../ui/button";

function ServicesWrapper() {
  return (
    <div className="flex gap-3 shrink-0 rounded-md shadow-sm shadow-light-gray/50  h-[20rem] lg:max-w-[20rem]  flex-col p-2  flex-1">
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
      <div className="flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main-green  scrollbar-track-lighter-gray">
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

export default ServicesWrapper;
