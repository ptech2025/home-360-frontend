import { AuthUserType, UserRole } from "@/types";

import { LogoWithText } from "@/components/global/Logo";

import Link from "next/link";

import { DesktopDashboardNavLinks, IconNavLinks } from "./DashboardNavLinks";
import {
  DesktopDashboardDropdown,
  MobileDashboardDropdown,
} from "./DashboardDropdown";

type Props = {
  user: AuthUserType;
};

function DashboardNavbar({ user }: Props) {
  const userRole = user.role as UserRole;
  // const userRole = "admin";
  return (
    <nav className="w-full max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center gap-6">
      <Link href="/">
        <LogoWithText />
      </Link>
      <DesktopDashboardNavLinks userRole={userRole} />
      <div className="flex gap-6 items-center">
        <IconNavLinks userRole={userRole} />
        <DesktopDashboardDropdown user={user} userRole={userRole} />
        <MobileDashboardDropdown user={user} userRole={userRole} />
      </div>
    </nav>
  );
}
export default DashboardNavbar;
