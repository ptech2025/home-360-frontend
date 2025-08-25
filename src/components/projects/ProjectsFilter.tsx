import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ListFilter } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

import { ProjectStatus } from "@/types/project";

function ProjectsFilter() {
  const { push } = useRouter();
  const pathName = usePathname();
  const search = useSearchParams();
  const status = search.get("status") as ProjectStatus | null;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const statusOptions = Object.values(ProjectStatus).filter(
    (v): v is ProjectStatus => typeof v === "string"
  );

  const changeStatus = (newStatus?: ProjectStatus) => {
    setIsPopoverOpen(false);

    const params = new URLSearchParams(search);

    if (newStatus) {
      params.set("status", String(newStatus));
    } else {
      params.delete("status");
    }

    const query = params.toString();
    const fullPath = query ? `${pathName}?${query}` : pathName;

    push(fullPath, { scroll: false });
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger
            className={cn(
              "w-11 h-full flex items-center justify-center hover:ring-[3px] border-sidebar-border hover:border-ring ring-ring/50 transition-colors rounded-md border   ",
              status
                ? "bg-dark-orange text-white   "
                : "bg-transparent  text-main-blue "
            )}
          >
            <ListFilter className="size-6" />
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="text-xs">Filter by Order Status</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={5}
        className="flex flex-col w-max p-0 divide-y-muted divide-y "
      >
        <Button
          onClick={() => changeStatus()}
          className="rounded-b-none  rounded-t-md  text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted "
        >
          All
        </Button>
        {statusOptions.map((option) => (
          <Button
            key={option}
            data-state={status === option ? "active" : "inactive"}
            onClick={() => changeStatus(option)}
            className="rounded-none last:rounded-b-md capitalize text-xs data-[state=active]:bg-dark-orange data-[state=active]:text-white  bg-transparent w-full text-main-blue hover:bg-main-blue/10 hover:data-[state=active]:bg-dark-orange "
          >
            {String(option).replace("_", " ")}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
export default ProjectsFilter;
