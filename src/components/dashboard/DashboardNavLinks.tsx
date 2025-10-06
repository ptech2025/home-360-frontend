import { DashboardLink, UserRole } from "@/types";
import { Bell, BrushCleaning, FileText, Home, Settings, UserRoundPen, Wallet } from "lucide-react";
import NavbarLink from "./NavbarLink";

export const dashboardLinks: DashboardLink[] = [
  {
    icon: <Home />,
    title: "Dashboard",
    url: "/dashboard",
    access: ["admin", "multiple_home_owner", "single_home_owner"],
  },
  {
    icon: <FileText />,
    title: "Documents",
    url: "#",
    access: ["admin", "multiple_home_owner", "single_home_owner"],
  },
  {
    icon: <BrushCleaning />,
    title: "Maintenance",
    url: "#",
    access: ["admin", "multiple_home_owner", "single_home_owner"],
  },
];
export const iconLinks: DashboardLink[] = [
  {
    icon: <Settings />,
    title: "Settings",
    url: "#",
    access: ["admin", "multiple_home_owner", "single_home_owner"],
  },
  {
    icon: <Bell />,
    title: "Notifications",
    url: "#",
    access: ["admin", "multiple_home_owner", "single_home_owner"],
  },
];

export const dropdownLinks: DashboardLink[] = [
  {
    icon: <UserRoundPen />,
    title: "Profile",
    url: "#",
    access: ["admin", "multiple_home_owner", "single_home_owner"],
  },
  {
    icon: <Wallet />,
    title: "Billing",
    url: "#",
    access: ["admin", "multiple_home_owner", "single_home_owner"],
  },
];

export function DesktopDashboardNavLinks({ userRole }: { userRole: UserRole }) {
  return (
    <div className="hidden md:flex gap-6 lg:gap-8 items-center">
      {dashboardLinks.map((link) => (
        <NavbarLink key={link.title} link={link} userRole={userRole} />
      ))}
    </div>
  );
}

export function IconNavLinks({ userRole }: { userRole: UserRole }) {
  return (
    <div className="hidden md:flex gap-6 items-center">
      {iconLinks.map((link) => (
        <NavbarLink
          key={link.title}
          link={link}
          userRole={userRole}
          isIconLink={true}
        />
      ))}
    </div>
  );
}

