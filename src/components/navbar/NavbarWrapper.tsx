import Link from "next/link";

import { LogoWithText } from "@/components/global/Logo";
import NavLinksDesktop from "./NavLinksDesktop";
import DesktopNavDropdown from "./DesktopNavDropdown";
import MobileMenu from "./MobileMenu";

function NavbarWrapper() {
  return (
    <nav className="w-full sticky bg-white lg:bg-transparent top-0 lg:top-1 z-50 items-center px-6 pt-3  flex justify-center">
      <div className="flex w-full py-2 lg:py-2.5 bg-white max-w-[1800px] lg:rounded-[5.5rem]  lg:shadow-sm lg:shadow[#061C3D0D]  gap-4 items-center px-0   lg:px-10  justify-between">
        <Link href={"/"}>
          <LogoWithText />
        </Link>
        <NavLinksDesktop />
        <DesktopNavDropdown />
        <MobileMenu />
      </div>
    </nav>
  );
}
export default NavbarWrapper;
