"use client";

import { DashboardLink } from "@/types";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

type Props = {
  link: DashboardLink;
  userRole: string;
  isIconLink?: boolean;
};

function NavbarLink({ link, userRole, isIconLink }: Props) {
  const { access, url, icon, title } = link;
  const pathname = usePathname();
  const isActive = pathname === url || pathname.startsWith(url + "/");

  if (!access.some((role) => userRole === role)) {
    return null;
  }

  if (isIconLink) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            prefetch={true}
            data-state={isActive ? "active" : "inactive"}
            href={url}
            className="flex items-start [&>svg]:shrink-0 [&>svg]:size-4.5  hover:data-[state=inactive]:text-black underline-offset-4 hover:data-[state=active]:text-black hover:underline text-sm font-circular-medium font-medium gap-2 data-[state=active]:text-main-green data-[state=inactive]:text-light-gray"
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom">{title}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link
      prefetch={true}
      data-state={isActive ? "active" : "inactive"}
      href={url}
      className="flex items-start w-full hover:data-[state=inactive]:[&>svg]:text-black data-[state=inactive]:[&>svg]:text-light-gray data-[state=active]:[&>svg]:text-main-green [&>svg]:shrink-0 [&>svg]:size-4.5  hover:data-[state=inactive]:text-black underline-offset-4 hover:underline text-sm font-circular-medium font-medium gap-2 data-[state=active]:text-main-green data-[state=inactive]:text-light-gray"
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}
export default NavbarLink;
