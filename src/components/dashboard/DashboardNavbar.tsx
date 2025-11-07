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
      access: ["admin", "multiple_home_owner", "single_home_owner"],
    },

    {
      icon: <Wrench />,
      title: "Services",
      url: `/dashboard/${firstHome.id}/services` as DashboardLink["url"],
      access: ["admin", "multiple_home_owner", "single_home_owner"],
    },
    {
      icon: <Home />,
      title: "Property",
      url: `#`,
      access: ["admin", "multiple_home_owner", "single_home_owner"],
      items: [
        {
          icon: <Archive />,
          title: "Details",
          url: `/dashboard/${firstHome.id}/details` as DashboardLink["url"],
          access: ["admin", "multiple_home_owner", "single_home_owner"],
        },
        {
          icon: <FileText />,
          title: "Documents",
          url: `/dashboard/${firstHome.id}/documents` as DashboardLink["url"],
          access: ["admin", "multiple_home_owner", "single_home_owner"],
        },
        {
          icon: <DollarSign />,
          title: "Expenses",
          url: `/dashboard/${firstHome.id}/expenses` as DashboardLink["url"],
          access: ["admin", "multiple_home_owner", "single_home_owner"],
        },
        {
          icon: <Refrigerator />,
          title: "Appliances",
          url: `/dashboard/${firstHome.id}/appliances` as DashboardLink["url"],
          access: ["admin", "multiple_home_owner", "single_home_owner"],
        },
        {
          icon: <BrushCleaning />,
          title: "Tasks",
          url: `/dashboard/${firstHome.id}/tasks` as DashboardLink["url"],
          access: ["admin", "multiple_home_owner", "single_home_owner"],
        },
      ],
    },
  ];
  return (
    <nav className="w-full max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center gap-6">
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
