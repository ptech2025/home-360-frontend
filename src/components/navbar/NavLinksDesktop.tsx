"use client";

import useActiveLink from "@/hooks/use-active-link";
import { cn } from "@/lib/utils";
import { navLinksArr } from "@/utils/links";
import Link from "next/link";

export default function NavLinksDesktop() {
  const { isActive } = useActiveLink();
  return (
    <ul className="lg:flex hidden gap-8 items-center">
      {navLinksArr.map((link) => (
        <li key={link.name} className="flex items-center justify-center">
          <Link
            prefetch={true}
            data-state={isActive(link.href) ? "active" : "inactive"}
            className={cn(
              "inline-block py-4 data-[state=active]:text-main-blue hover:data-[state=inactive]:text-main-blue/80 data-[state=inactive]:text-[#838E9E] font-circular  cursor-pointer justify-center text-base font-semibold data-[state=active]:border-dark-orange border-b-2 data-[state=inactive]:border-transparent transition-colors "
            )}
            href={link.href}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
