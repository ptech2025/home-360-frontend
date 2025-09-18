import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/types";
import { AlignRight, ChevronDown } from "lucide-react";
import NavbarLink from "./NavbarLink";
import LogOutBtn from "./LogOutBtn";
import DashboardUserIcon from "./DashboardUserIcon";
import { Button } from "../ui/button";
import { dropdownLinks, iconLinks, dashboardLinks } from "./DashboardNavLinks";

export function DesktopDashboardDropdown({ userRole }: { userRole: UserRole }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden md:flex items-center gap-6 group">
        {/* <DashboardUserIcon /> */}
        <ChevronDown className="size-4 text-black group-hover:rotate-180 transition-transform duration-300" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="hidden md:block w-50"
        align="end"
        side="bottom"
      >
        <DropdownMenuGroup>
          {dropdownLinks.map((link) => (
            <DropdownMenuItem key={link.title}>
              <NavbarLink link={link} userRole={userRole} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MobileDashboardDropdown({ userRole }: { userRole: UserRole }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden" asChild>
        <Button
          className="bg-white text-black shadow-none hover:bg-lighter-grey gap-2 items-center"
          size="icon"
        >
          <AlignRight className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-[15rem] md:hidden flex p-0 flex-col"
      >
        <DropdownMenuGroup>
          {dashboardLinks.map((link) => (
            <DropdownMenuItem key={link.title}>
              <NavbarLink link={link} userRole={userRole} />
            </DropdownMenuItem>
          ))}   {iconLinks.map((link) => (
            <DropdownMenuItem key={link.title}>
              <NavbarLink link={link} userRole={userRole} />
            </DropdownMenuItem>
          ))}   {dropdownLinks.map((link) => (
            <DropdownMenuItem key={link.title}>
              <NavbarLink link={link} userRole={userRole} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
