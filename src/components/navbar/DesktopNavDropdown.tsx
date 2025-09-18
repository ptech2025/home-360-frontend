import Link from "next/link";
import { Button } from "../ui/button";
import { SignedOut, SignedIn } from "../auth/AuthStatusComponent";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutLink from "../auth/SignOutLink";
import { ArrowRight, ChevronDown } from "lucide-react";
import UserIcon from "./UserIcon";

function DesktopNavDropdown() {
  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="font-medium font-circular-medium text-base h-11 rounded-4xl text-main-blue lg:flex hidden px-4 bg-[#E7E9EE] hover:border-[#E7E9EE] border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
          >
            <Link prefetch={true} href={"/sign-in"}>
              <span>Sign in</span>
            </Link>
          </Button>{" "}
          <Button
            asChild
            className="font-medium font-circular-medium text-base text-white h-11 rounded-4xl lg:flex hidden px-4! bg-main-blue hover:border-main-blue border border-transparent transition-colors hover:bg-white hover:text-main-blue group"
          >
            <Link prefetch={true} href={"/sign-up"}>
              <span>Get started</span>
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="hidden lg:flex gap-4 h-11 rounded-4xl max-w-[100px]"
            >
              <UserIcon />
              <ChevronDown className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="bottom"
            className="w-[15rem] flex p-0 flex-col"
          >
            <DropdownMenuItem className="p-0 rounded-none">
              <Link
                prefetch={true}
                data-state={"inactive"}
                className={
                  "inline-block w-full p-4 text-end border-b border-lighter-grey data-[state=active]:text-main-blue hover:data-[state=inactive]:text-main-blue/80 data-[state=inactive]:text-[#838E9E] cursor-pointer justify-center text-base font-medium   transition-colors"
                }
                href={"/dashboard/projects"}
              >
                Dashboard
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="p-0 rounded-none">
              <SignOutLink className="inline-block w-full p-4 text-end border-b border-lighter-grey text-[#838E9E] hover:text-main-blue/80 cursor-pointer justify-center text-base font-medium   transition-colors" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>
    </>
  );
}

export default DesktopNavDropdown;
