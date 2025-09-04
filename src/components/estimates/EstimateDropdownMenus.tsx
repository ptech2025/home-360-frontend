import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

import { RemoveEstimateFromProjectDialog } from "../projects/ProjectEstimatesDialogs";
import { Estimate, EstimateLineItem } from "@/types/estimate";
import { useEstimatePanelStore } from "@/store/estimateStore";
import { deleteLineItem, fetchEstimatePdf } from "@/services/estimate";
import { formatEstimateId } from "@/utils/funcs";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  UpdateEstimateTitleDialog,
  UpdateLineItemDialog,
} from "./EstimateDialogs";

export function EstimateAction({ estimate }: { estimate: Estimate }) {
  const [open, setOpen] = useState(false);
  const { setEstimateMode, estimateMode } = useEstimatePanelStore();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return fetchEstimatePdf(estimate.id);
    },

    onSuccess(data) {
      if (!data) return;

      // Convert ArrayBuffer → Blob
      const blob = new Blob([data], { type: "application/pdf" });

      // Create temporary link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formatEstimateId(estimate.id)}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Cleanup
      URL.revokeObjectURL(url);

      toast.success("Estimate downloaded successfully!");
      setOpen(false);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const handlePreview = () => {
    setEstimateMode("preview");
    setOpen(false);
  };
  const handleEdit = () => {
    setEstimateMode("edit");
    setOpen(false);
  };

  if (estimate.projectId) {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <EllipsisVertical className="size-5 text-main-blue" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="bottom"
          sideOffset={5}
          className="flex flex-col w-max p-0 divide-y-muted divide-y"
        >
          {estimateMode === "edit" ? (
            <>
              <UpdateEstimateTitleDialog
                isLoading={isPending}
                estimateId={estimate.id}
                title={estimate.title}
              />
              <Button
                disabled={isPending}
                onClick={() => mutate()}
                className="rounded-none last:rounded-b-md  first:rounded-t-md  text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted "
              >
                Export as PDF
              </Button>

              <Button
                disabled={isPending}
                onClick={handlePreview}
                className="rounded-none last:rounded-b-md  first:rounded-t-md  text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted "
              >
                Send to Client
              </Button>

              <RemoveEstimateFromProjectDialog
                estimateId={estimate.id}
                projectId={estimate.projectId}
              >
                <Button
                  disabled={isPending}
                  className="rounded-none last:rounded-b-md  first:rounded-t-md   text-xs  bg-transparent w-full text-destructive hover:bg-destructive/20 "
                >
                  Remove from Project
                </Button>
              </RemoveEstimateFromProjectDialog>
            </>
          ) : (
            <Button
              onClick={handleEdit}
              className="rounded-none last:rounded-b-md  first:rounded-t-md  text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted "
            >
              Edit Estimate
            </Button>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}

export function EstimateTableItemAction({
  lineItem,
  estimateId,
}: {
  estimateId: string;
  lineItem: EstimateLineItem;
}) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return deleteLineItem(lineItem.id, estimateId);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["estimate", estimateId],
      });

      toast.success("Line Item deleted successfully!");
      setOpen(false);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="group-hover:visible invisible transition-all duration-200">
        <EllipsisVertical className="size-5  text-main-blue" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={5}
        className="flex flex-col w-max p-0 divide-y-muted divide-y"
      >
        <UpdateLineItemDialog
          isLoading={isPending}
          lineItem={lineItem}
          estimateId={estimateId}
        />
        <Button
          onClick={() => mutate()}
          disabled={isPending}
          className="rounded-none last:rounded-b-md  first:rounded-t-md   text-xs  bg-transparent w-full text-destructive hover:bg-destructive/20 "
        >
          Delete
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
