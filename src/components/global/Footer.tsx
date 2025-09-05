"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiInstagramLogoLight } from "react-icons/pi";
import { TiSocialFacebook } from "react-icons/ti";

const footerLinks = [
  {
    link: "/about",
    title: "About",
  },
  {
    link: "/pricing",
    title: "Pricing",
  },
  {
    link: "/#features",
    title: "Features",
  },
];

function Footer() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href;
  };
  return (
    <footer className="custom-container flex flex-col gap-10">
      <div className="flex flex-col gap-6 sm:flex-row justify-between items-center">
        <ul className="flex sm:flex-row flex-col items-center gap-6">
          {footerLinks.map((link, index) => {
            return (
              <li key={index}>
                <Link
                  data-state={isActive(link.link) ? "active" : "inactive"}
                  href={link.link}
                  className="text-[#808080] transition-colors text-sm hover:text-main-blue data-[state=active]:underline data-[state-active]:text-main-blue"
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-5">
          <a
            href="https://m.facebook.com/quickestimateai/"
            className="p-3  hover:shadow-main-blue hover:shadow h-10 gap-2.5 items-center justify-center  flex rounded-4xl border border-main-blue bg-transparent cursor-pointer text-sm font-semibold"
          >
            <TiSocialFacebook className="size-5" />
            <span className="h-full w-px bg-[#808080]"></span>
            <span>Facebook</span>
          </a>{" "}
          <a
            href="https://www.instagram.com/quickestimate/"
            className="p-3  hover:shadow-main-blue hover:shadow h-10 gap-2.5 items-center justify-center  flex rounded-4xl border border-main-blue bg-transparent cursor-pointer text-sm font-semibold"
          >
            <PiInstagramLogoLight className="size-5" />
            <span className="h-full w-px bg-[#808080]"></span>
            <span>Instagram</span>
          </a>
        </div>
      </div>
      <div className="border-t pt-6 gap-2 border-[#808080] flex items-center justify-center">
        <span className="text-sm text-main-blue">
          &copy; Copyright {new Date().getFullYear()}
        </span>
        <span className="size-1 rounded-full bg-main-blue"></span>

        <Link
          href={`/terms`}
          data-state={isActive("/terms") ? "active" : "inactive"}
          className="text-main-blue transition-colors text-sm hover:underline data-[state=active]:underline"
        >
          Terms
        </Link>

        <span className="size-1 rounded-full bg-main-blue"></span>
        <Link
          href={`/privacy-policy`}
          data-state={isActive("/privacy-policy") ? "active" : "inactive"}
          className="text-main-blue transition-colors text-sm hover:underline data-[state=active]:underline"
        >
          Privacy
        </Link>
      </div>
    </footer>
  );
}
export default Footer;
