import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useMutation } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

import { RemoveEstimateFromProjectDialog } from "../projects/ProjectEstimatesDialogs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Estimate } from "@/types/estimate";
import { useEstimatePanelStore } from "@/store/estimateStore";
import { fetchEstimatePdf } from "@/services/estimate";
import { formatEstimateId } from "@/utils/funcs";

export function EstimateAction({ estimate }: { estimate: Estimate }) {
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
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const handlePreview = () => {
    setEstimateMode("preview");
  };
  const handleEdit = () => {
    setEstimateMode("edit");
  };

  if (estimate.projectId) {
    return (
      <Popover>
        <PopoverTrigger>
          <EllipsisVertical className="size-5 text-main-blue" />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          side="bottom"
          sideOffset={5}
          className="flex flex-col w-max p-0 divide-y-muted divide-y"
        >
          {estimateMode === "edit" ? (
            <>
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
        </PopoverContent>
      </Popover>
    );
  }
}
