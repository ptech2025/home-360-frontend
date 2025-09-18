"use client";

import { navLinksArr } from "@/utils/links";
import useActiveLink from "@/hooks/use-active-link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import SignOutLink from "../auth/SignOutLink";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
export function SignedOutMobileNavLinks() {
  const { isActive } = useActiveLink();
  return (
    <>
      {navLinksArr.map((link) => (
        <DropdownMenuItem key={link.name} className="p-0 rounded-none">
          <Link
            data-state={isActive(link.href) ? "active" : "inactive"}
            className={cn(
              "inline-block w-full p-4 text-end border-b border-lighter-grey data-[state=active]:text-main-blue hover:data-[state=inactive]:text-main-blue/80 data-[state=inactive]:text-[#838E9E] cursor-pointer justify-center text-base font-medium   transition-colors"
            )}
            href={link.href}
          >
            {link.name}
          </Link>
        </DropdownMenuItem>
      ))}
      <DropdownMenuItem className="p-4 rounded-none hover:bg-transparent">
        <Button
          asChild
          className="font-medium w-full font-circular-medium text-base h-11 rounded-4xl text-main-blue flex  px-8 bg-[#E7E9EE] hover:border-[#E7E9EE] border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
        >
          <Link prefetch={true} href={"/sign-in"}>
            <span>Sign in</span>
          </Link>
        </Button>{" "}
      </DropdownMenuItem>{" "}
      <DropdownMenuItem className="p-4 rounded-none  hover:bg-transparent">
        <Button
          asChild
          className="font-medium w-full font-circular-medium text-base text-white h-11 rounded-4xl flex  px-8 bg-main-blue hover:border-main-blue border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
        >
          <Link prefetch={true} href={"/sign-up"}>
            <span>Get started</span>
            <ArrowRight className="size-5 text-white group-hover:text-main-blue group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </Button>
      </DropdownMenuItem>
    </>
  );
}

export function SignedInMobileNavLinks() {
  const { isActive } = useActiveLink();
  return (
    <>
      {navLinksArr.map((link) => (
        <DropdownMenuItem key={link.name} className="p-0 rounded-none">
          <Link
            prefetch={true}
            data-state={isActive(link.href) ? "active" : "inactive"}
            className={cn(
              "inline-block w-full p-4 text-end border-b border-lighter-grey data-[state=active]:text-main-blue hover:data-[state=inactive]:text-main-blue/80 data-[state=inactive]:text-[#838E9E] cursor-pointer justify-center text-base font-medium   transition-colors"
            )}
            href={link.href}
          >
            {link.name}
          </Link>
        </DropdownMenuItem>
      ))}
      <DropdownMenuItem className="p-0 rounded-none">
        <Link
          prefetch={true}
          data-state={"inactive"}
          className={cn(
            "inline-block w-full p-4 text-end border-b border-lighter-grey data-[state=active]:text-main-blue hover:data-[state=inactive]:text-main-blue/80 data-[state=inactive]:text-[#838E9E] cursor-pointer justify-center text-base font-medium   transition-colors"
          )}
          href={"/dashboard/projects"}
        >
          Dashboard
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem className="p-0 rounded-none ">
        <SignOutLink
          className={cn(
            "inline-block w-full p-4 text-end border-b border-lighter-grey  text-[#838E9E] hover:text-main-blue/80 cursor-pointer justify-center text-base font-medium   transition-colors"
          )}
        />
      </DropdownMenuItem>
    </>
  );
}
