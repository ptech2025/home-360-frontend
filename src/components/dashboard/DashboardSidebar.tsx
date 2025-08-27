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
  SidebarTrigger,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DashboardLink } from "@/types";
import { Settings } from "lucide-react";
import { PiToolbox, PiUsers } from "react-icons/pi";
import SidebarLink from "./SidebarLink";
import { LogoSvg } from "@/components/global/Logo";

import Link from "next/link";
import AskAIBtn from "./AskAIBtn";
import LogOutBtn from "./LogOutBtn";

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
  {
    icon: <Settings />,
    title: "Settings",
    url: "/dashboard/settings",
    access: ["user", "admin"],
  },
];
// const footerLinks: DashboardLink[] = [];

type Props = {
  userRole: string;
};

function DashboardSidebar({ userRole }: Props) {
  return (
    <Sidebar collapsible="icon" className="border-main-blue/50 bg-white!">
      <SidebarHeader className="px-0 py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:pl-1! hover:bg-transparent group-data-[collapsible=icon]:size-12! h-12 uppercase font-black text-2xl"
            >
              <Link href="/">
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
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={{
                    children: "Toggle Sidebar",
                  }}
                  className={
                    "group my-4 flex h-10 w-full [&_svg]:size-5!   group-data-[collapsible=icon]:!pl-1.5   items-center justify-start gap-2 text-sm font-medium text-main-blue transition-all data-[active=true]:bg-dark-orange/20 "
                  }
                >
                  <SidebarTrigger />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <LogOutBtn />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
export default DashboardSidebar;
