import Link from "next/link";

import { LogoWithText } from "@/components/global/Logo";
import { TiSocialFacebook } from "react-icons/ti";
import { PiInstagramLogoLight } from "react-icons/pi";

function NavbarWrapper() {
  return (
    <nav className="w-full sticky bg-white lg:bg-transparent top-0 lg:top-1 z-50 items-center px-6 pt-3  flex justify-center">
      <div className="flex w-full py-2 lg:py-2.5 bg-white max-w-[1800px] lg:rounded-[5.5rem]  lg:shadow-sm lg:shadow[#061C3D0D]  gap-4 items-center px-0   lg:px-10  justify-between">
        <Link href={"/"}>
          <LogoWithText />
        </Link>
        <div className="flex gap-3 items-center">
          <a
            href="https://m.facebook.com/quickestimateai/"
            className="rounded-full hover:shadow hover:shadow-[#061C3D0D] hover:bg-dark-orange text-main-blue transition-all hover:text-white hover:border-white border border-main-blue grid place-items-center p-2"
          >
            <TiSocialFacebook className=" size-5" />
          </a>{" "}
          <a
            href="https://www.instagram.com/quickestimate/"
            className="rounded-full hover:shadow hover:shadow-[#061C3D0D] hover:bg-dark-orange text-main-blue transition-all hover:text-white hover:border-white border border-main-blue grid place-items-center p-2"
          >
            <PiInstagramLogoLight className="size-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
export default NavbarWrapper;
