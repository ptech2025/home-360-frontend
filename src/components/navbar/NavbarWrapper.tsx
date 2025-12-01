import Link from "next/link";

import { LogoWithText } from "@/components/global/Logo";
import NavLinksDesktop from "./NavLinksDesktop";
import DesktopNavDropdown from "./DesktopNavDropdown";
import MobileMenu from "./MobileMenu";

function NavbarWrapper() {
  return (
    <nav className="w-full sticky bg-white  top-0  z-50 items-center   flex justify-center">
      <div className="flex w-full py-2 lg:py-2.5 bg-white max-w-[1800px]   gap-4 items-center px-0   lg:px-10  justify-between">
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
