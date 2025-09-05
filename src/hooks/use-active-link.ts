"use client";

import { usePathname } from "next/navigation";

function useActiveLink() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href;
  };

  return {
    isActive,
  };
}
export default useActiveLink;
