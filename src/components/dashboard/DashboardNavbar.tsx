import { AuthUserType, DashboardLink, UserRole } from "@/types";

import { LogoWithText } from "@/components/global/Logo";

import Link from "next/link";

import {
  DesktopDashboardNavLinks,
  DesktopDashboardDropdown,
  MobileDashboardDropdown,
} from "./DashboardLinksComps";

import {
  Home,
  FileText,
  Wrench,
  BrushCleaning,
  Refrigerator,
  Target,
  Archive,
  DollarSign,
} from "lucide-react";

type Props = {
  user: AuthUserType;
};

function DashboardNavbar({ user }: Props) {
  const userRole = user.role as UserRole;
  const firstHome = user.homes[0];

  const homeLinks: DashboardLink[] = [
    {
      icon: <Target />,
      title: "Overview",
      url: `/dashboard/${firstHome.id}` as DashboardLink["url"],
      access: ["admin", "user"],
    },

    {
      icon: <Wrench />,
      title: "Services",
      url: `/dashboard/${firstHome.id}/services` as DashboardLink["url"],
      access: ["admin", "user"],
    },
    {
      icon: <Home />,
      title: "Property",
      url: `#`,
      access: ["admin", "user"],
      items: [
        {
          icon: <Archive />,
          title: "Details",
          url: `/dashboard/${firstHome.id}/details` as DashboardLink["url"],
          access: ["admin", "user"],
        },
        {
          icon: <FileText />,
          title: "Documents",
          url: `/dashboard/${firstHome.id}/documents` as DashboardLink["url"],
          access: ["admin", "user"],
        },
        {
          icon: <DollarSign />,
          title: "Expenses",
          url: `/dashboard/${firstHome.id}/expenses` as DashboardLink["url"],
          access: ["admin", "user"],
        },
        {
          icon: <Refrigerator />,
          title: "Appliances",
          url: `/dashboard/${firstHome.id}/appliances` as DashboardLink["url"],
          access: ["admin", "user"],
        },
        {
          icon: <BrushCleaning />,
          title: "Tasks",
          url: `/dashboard/${firstHome.id}/tasks` as DashboardLink["url"],
          access: ["admin", "user"],
        },
      ],
    },
  ];
  return (
    <nav className="w-full  mx-auto px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center gap-6">
      <Link href="/">
        <LogoWithText className="max-md:[&_h3]:hidden" />
      </Link>
      <DesktopDashboardNavLinks userRole={userRole} homeLinks={homeLinks} />
      <div className="flex gap-6 items-center">
        <DesktopDashboardDropdown user={user} userRole={userRole} />
        <MobileDashboardDropdown
          user={user}
          userRole={userRole}
          homeLinks={homeLinks}
        />
      </div>
    </nav>
  );
}
export default DashboardNavbar;
