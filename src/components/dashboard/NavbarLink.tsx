"use client";

import { DashboardLink } from "@/types";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  link: DashboardLink;
  userRole: string;
  isLinkTrigger?: boolean;
  className?: string;
};

function NavbarLink({ link, userRole, isLinkTrigger, className }: Props) {
  const { access, url, icon, title, items } = link;
  const pathname = usePathname();
  const isActive =
    pathname === url ||
    pathname.endsWith(url + "/") ||
    (items && items.some((item) => pathname.startsWith(item.url)));

  if (!access.some((role) => userRole === role)) {
    return null;
  }

  if (isLinkTrigger) {
    return (
      <div
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          "flex text-sm items-start w-full hover:data-[state=inactive]:[&>svg]:text-black data-[state=inactive]:[&>svg]:text-light-gray data-[state=active]:[&>svg]:text-main-green [&>svg]:shrink-0 [&>svg]:size-4.5  hover:data-[state=inactive]:text-black  font-circular-medium font-medium gap-2 data-[state=active]:text-main-green data-[state=inactive]:text-light-gray",
          className
        )}
      >
        {icon}
        <span>{title}</span>
      </div>
    );
  }

  return (
    <Link
      prefetch={true}
      data-state={isActive ? "active" : "inactive"}
      href={url}
      className={cn(
        "flex items-start w-full hover:data-[state=inactive]:[&>svg]:text-black data-[state=inactive]:[&>svg]:text-light-gray data-[state=active]:[&>svg]:text-main-green [&>svg]:shrink-0 [&>svg]:size-4.5  hover:data-[state=inactive]:text-black underline-offset-4 hover:underline text-sm font-circular-medium font-medium gap-2 data-[state=active]:text-main-green data-[state=inactive]:text-light-gray",
        className
      )}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}
export default NavbarLink;
