import { renderAxiosOrAuthError } from "@/lib/axios-client";
import {
  createProject,
  deleteProject,
  updateProjectTitle,
} from "@/services/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FolderPlus,
  Loader2,
  Plus,
  EllipsisVertical,
  FolderPen,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useRouter } from "nextjs-toploader/app";
import { Project } from "@/types/project";
import {
  EstimateLineItemCategory,
  EstimateLineItemUnitType,
} from "@/types/message-schema";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type EstimateLineItemCategoryDropdownMenuProps = {
  category: EstimateLineItemCategory;
  estimateId: string;
  lineItemId: string;
};
type EstimateLineItemUnitTypeDropdownMenuProps = {
  unitType: EstimateLineItemUnitType;
  estimateId: string;
  lineItemId: string;
};

export function EstimateLineItemCategoryDropdownMenu({
  category,
}: EstimateLineItemCategoryDropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const categoryOptions = Object.values(EstimateLineItemCategory).filter(
    (v): v is EstimateLineItemCategory => typeof v === "string"
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (newCategory: EstimateLineItemCategory) => {},
    onSuccess() {
      queryClient.invalidateQueries({
        //   queryKey: ["single_project", { projectId }],
      });
      toast.success("Project updated successfully.");
      setOpen(false);
    },

    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          "capitalize hover:shadow-sm rounded-3xl gap-1 [&_svg]:size-4 group/item border border-sidebar-border   transition-colors duration-200  flex items-center py-1 px-2 text-xs "
        )}
      >
        <span>{category}</span>
        <ChevronDown className="size-4 group-hover/item:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={"bottom"}
        align="end"
        className="flex flex-col w-max p-0 divide-y-muted divide-y"
      >
        {categoryOptions.map((stat) => (
          <Button
            key={stat}
            disabled={isPending || category === stat}
            onClick={() => mutate(stat)}
            className={cn(
              "rounded-none [&_svg]:size-4 last:rounded-b-md justify-between items-center gap-2 first:rounded-t-md bg-transparent text-main-blue hover:bg-main-blue/20   text-xs   capitalize w-full"
            )}
          >
            {stat}
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function EstimateLineItemUnitTypeDropdownMenu({
  unitType,
}: EstimateLineItemUnitTypeDropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const unitTypeOptions = Object.values(EstimateLineItemUnitType).filter(
    (v): v is EstimateLineItemUnitType => typeof v === "string"
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (newUnit: EstimateLineItemUnitType) => {},
    onSuccess() {
      queryClient.invalidateQueries({
        //   queryKey: ["single_project", { projectId }],
      });
      toast.success("Project updated successfully.");
      setOpen(false);
    },

    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          "capitalize hover:shadow-sm rounded-3xl gap-1 [&_svg]:size-4 group/unit border border-sidebar-border   transition-colors duration-200  flex items-center py-1 px-2 text-xs "
        )}
      >
        <span>{unitType.toString().replace("_", " ")}</span>
        <ChevronDown className="size-4 group-hover/unit:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={"bottom"}
        align="end"
        className="flex flex-col w-max p-0 divide-y-muted divide-y"
      >
        {unitTypeOptions.map((stat) => (
          <Button
            key={stat}
            disabled={isPending || unitType === stat}
            onClick={() => mutate(stat)}
            className={cn(
              "rounded-none [&_svg]:size-4 last:rounded-b-md justify-between items-center gap-2 first:rounded-t-md bg-transparent text-main-blue hover:bg-main-blue/20   text-xs   capitalize w-full"
            )}
          >
            {stat.toString().replace("_", " ")}
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
