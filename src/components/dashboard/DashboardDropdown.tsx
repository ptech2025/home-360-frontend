import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole, AuthUserType, DashboardLink } from "@/types";
import { AlignRight, ChevronDown } from "lucide-react";
import NavbarLink from "./NavbarLink";
import LogOutBtn from "./LogOutBtn";
import DashboardUserIcon from "./DashboardUserIcon";
import { Button } from "../ui/button";
import { dropdownLinks, iconLinks, dashboardLinks } from "./DashboardNavLinks";

type Props = {
  user: AuthUserType;
  userRole: UserRole;
  homeLinks: DashboardLink[];
};

export function DesktopDashboardDropdown({ userRole, user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden md:flex items-center gap-4 group">
        <DashboardUserIcon user={user} />
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

export function MobileDashboardDropdown({ userRole, user, homeLinks }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden" asChild>
        <Button
          className="bg-white text-black shadow-none hover:bg-lighter-grey gap-2 w-max items-center"
          size="icon"
        >
          <DashboardUserIcon user={user} />
          <AlignRight className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-[15rem] md:hidden flex p-0 flex-col"
      >
        <DropdownMenuGroup>
          {homeLinks.map((link) => (
            <DropdownMenuItem key={link.title}>
              <NavbarLink link={link} userRole={userRole} />
            </DropdownMenuItem>
          ))}{" "}
          {dashboardLinks.map((link) => (
            <DropdownMenuItem key={link.title}>
              <NavbarLink link={link} userRole={userRole} />
            </DropdownMenuItem>
          ))}{" "}
          {iconLinks.map((link) => (
            <DropdownMenuItem key={link.title}>
              <NavbarLink link={link} userRole={userRole} />
            </DropdownMenuItem>
          ))}{" "}
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
