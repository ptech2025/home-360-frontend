import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { AlignRight } from "lucide-react";

import { SignedOut, SignedIn } from "../auth/AuthStatusComponent";

import {
  SignedInMobileNavLinks,
  SignedOutMobileNavLinks,
} from "./MobileNavLinks";

function MobileMenu() {
  return (
    <>
      <SignedOut>
        <DropdownMenu>
          <DropdownMenuTrigger className="lg:hidden" asChild>
            <Button
              className="bg-white text-black shadow-none hover:bg-lighter-grey"
              size="icon"
            >
              <AlignRight className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="bottom"
            className="w-[15rem] lg:hidden flex p-0 flex-col"
          >
            <SignedOutMobileNavLinks />
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedOut>
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger className="lg:hidden" asChild>
            <Button
              className="bg-white text-black shadow-none hover:bg-lighter-grey"
              size="icon"
            >
              <AlignRight className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="bottom"
            className="w-[15rem] lg:hidden flex p-0 flex-col"
          >
            <SignedInMobileNavLinks />
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>
    </>
  );
}
export default MobileMenu;
