"use client";

import NavbarLink from "./NavbarLink";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole, AuthUserType, DashboardLink } from "@/types";
import { AlignRight, ChevronDown, Settings, UserRoundPen } from "lucide-react";
import LogOutBtn from "./LogOutBtn";
import DashboardUserIcon from "./DashboardUserIcon";
import { Button } from "../ui/button";

export const dropdownLinks: DashboardLink[] = [
  {
    icon: <UserRoundPen />,
    title: "Profile",
    url: "#",
    access: ["admin", "multiple_home_owner", "single_home_owner"],
  },
  {
    icon: <Settings />,
    title: "Settings",
    url: "#",
    access: ["admin", "multiple_home_owner", "single_home_owner"],
  },
];

type Props = {
  userRole: UserRole;
  user: AuthUserType;
  homeLinks: DashboardLink[];
};

type DesktopDropdownProps = {
  userRole: UserRole;
  user: AuthUserType;
};

export function DesktopDashboardDropdown({
  userRole,
  user,
}: DesktopDropdownProps) {
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

export function DesktopDashboardNavLinks({
  userRole,
  homeLinks,
}: {
  userRole: UserRole;
  homeLinks: DashboardLink[];
}) {
  return (
    <NavigationMenu viewport={false} className="hidden z-50 md:flex">
      <NavigationMenuList className="gap-6 lg:gap-8">
        {homeLinks.map((link) => {
          const subLinks = link.items;

          if (subLinks && subLinks.length > 0) {
            return (
              <NavigationMenuItem key={link.title} className="relative">
                <NavigationMenuTrigger
                  onPointerMove={(e) => e.preventDefault()}
                  onPointerLeave={(e) => e.preventDefault()}
                  className="p-0 hover:bg-transparent focus:bg-transparent data-[state=open]:hover:bg-transparent  data-[state=open]:focus:bg-transparent  data-[state=open]:focus-visible:bg-transparent data-[state=open]:bg-transparent"
                >
                  <NavbarLink link={link} userRole={userRole} isLinkTrigger />
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  onPointerMove={(e) => e.preventDefault()}
                  onPointerLeave={(e) => e.preventDefault()}
                >
                  <ul className="grid w-[200px] gap-4">
                    <li>
                      {subLinks.map((subLink) => (
                        <NavigationMenuLink key={subLink.title} asChild>
                          <NavbarLink
                            className="gap-2 flex-row items-center"
                            link={subLink}
                            userRole={userRole}
                          />
                        </NavigationMenuLink>
                      ))}
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={link.title}>
              <NavbarLink link={link} userRole={userRole} />
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
