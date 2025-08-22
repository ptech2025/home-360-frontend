import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DashboardLink } from "@/types";
import { Settings } from "lucide-react";
import { PiToolbox, PiUsers } from "react-icons/pi";
import SidebarLink from "./SidebarLink";
import { LogoSvg } from "@/components/global/Logo";

import Link from "next/link";
import { StarIcon } from "../global/Icons";
import AskAIBtn from "./AskAIBtn";

const sidebarLinks: DashboardLink[] = [
  {
    icon: <PiToolbox />,
    title: "Projects",
    url: "/dashboard/projects",
    access: ["user", "admin"],
  },
  {
    icon: <PiUsers />,
    title: "Clients",
    url: "/dashboard/clients",
    access: ["user", "admin"],
  },
];
const footerLinks: DashboardLink[] = [
  {
    icon: <Settings />,
    title: "Settings",
    url: "/dashboard/settings",
    access: ["user", "admin"],
  },
];

type Props = {
  userRole: string;
};

function DashboardSidebar({ userRole }: Props) {
  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="border-main-blue/50 bg-white!"
    >
      <SidebarHeader className="px-0 py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:pl-1! hover:bg-transparent group-data-[collapsible=icon]:size-12! h-12 uppercase font-black text-2xl"
            >
              <Link href="/dashboard/projects">
                <LogoSvg className="size-[38px]!" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="flex-1  p-0">
          <SidebarGroupLabel className="sr-only">
            Dashboard Sidebar Menu Links
          </SidebarGroupLabel>
          <SidebarGroupContent className="p-2">
            <SidebarMenu className="my-6">
              <AskAIBtn />
            </SidebarMenu>
            <SidebarMenu>
              {sidebarLinks.map((link) => {
                return (
                  <SidebarLink
                    key={link.title}
                    link={link}
                    userRole={userRole} // Replace with actual user role
                  />
                );
              })}{" "}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup className="flex-1 p-0">
          <SidebarGroupLabel className="sr-only">
            Organization Sidebar Footer
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {footerLinks.map((link) => {
                return (
                  <SidebarLink
                    key={link.title}
                    link={link}
                    userRole={userRole} // Replace with actual user role
                  />
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
export default DashboardSidebar;
