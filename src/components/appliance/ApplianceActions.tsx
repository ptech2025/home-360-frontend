import { ApplianceWithWarranty } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  AddOrEditApplianceDialog,
  DeleteApplianceDialog,
} from "./ApplianceDialogs";
import { DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import Link from "next/link";

type Props = {
  appliance: ApplianceWithWarranty;
};

function ApplianceActions({ appliance }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="size-9 flex items-center justify-center shrink-0 text-black hover:text-main-green">
        <MoreHorizontal className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          asChild
        >
          <Link
            href={`/dashboard/${appliance.homeId}/appliances/${appliance.id}`}
            className="cursor-pointer text-start w-full"
          >
            View Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <AddOrEditApplianceDialog type="update" data={appliance}>
            <DialogTrigger className="cursor-pointer text-start w-full">
              Edit
            </DialogTrigger>
          </AddOrEditApplianceDialog>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <DeleteApplianceDialog applianceId={appliance.id}>
            <DialogTrigger className="cursor-pointer text-start text-red-500 w-full">
              Delete
            </DialogTrigger>
          </DeleteApplianceDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ApplianceActions;
