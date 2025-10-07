import { AuthUserType, DashboardLink, UserRole } from "@/types";

import { LogoWithText } from "@/components/global/Logo";

import Link from "next/link";

import { DesktopDashboardNavLinks, IconNavLinks } from "./DashboardNavLinks";
import {
  DesktopDashboardDropdown,
  MobileDashboardDropdown,
} from "./DashboardDropdown";
import { Home, FileText } from "lucide-react";

type Props = {
  user: AuthUserType;
};

function DashboardNavbar({ user }: Props) {
  const userRole = user.role as UserRole;
  const firstHome = user.homes[0];

  const homeLinks: DashboardLink[] = [
    {
      icon: <Home />,
      title: "Dashboard",
      url: `/dashboard/${firstHome.id}` as DashboardLink["url"],
      access: ["admin", "multiple_home_owner", "single_home_owner"],
    },
    {
      icon: <FileText />,
      title: "Documents",
      url: `/dashboard/${firstHome.id}/documents` as DashboardLink["url"],
      access: ["admin", "multiple_home_owner", "single_home_owner"],
    },
  ];
  return (
    <nav className="w-full max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center gap-6">
      <Link href="/">
        <LogoWithText />
      </Link>
      <DesktopDashboardNavLinks userRole={userRole} homeLinks={homeLinks} />
      <div className="flex gap-6 items-center">
        <IconNavLinks userRole={userRole} />
        <DesktopDashboardDropdown
          user={user}
          userRole={userRole}
          homeLinks={homeLinks}
        />
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
