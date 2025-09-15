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
import { AuthUserType, DashboardLink } from "@/types";
import { Settings } from "lucide-react";
import { PiToolbox, PiUsers } from "react-icons/pi";
import SidebarLink from "./SidebarLink";
import { LogoSvg } from "@/components/global/Logo";

import Link from "next/link";
import AskAIBtn from "./AskAIBtn";
import LogOutBtn from "./LogOutBtn";
import DashboardUserIcon from "./DashboardUserIcon";

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
  user: AuthUserType;
};

function DashboardNavbar() {
  return <nav>DashboardNavbar</nav>;
}
export default DashboardNavbar;
