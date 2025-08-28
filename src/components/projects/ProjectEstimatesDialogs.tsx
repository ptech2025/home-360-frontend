import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { renderAxiosOrAuthError } from "@/lib/axios-client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "nextjs-toploader/app";
import { Estimate } from "@/types/estimate";
import { removeEstimateFromProject } from "@/services/estimate";

export function RemoveEstimateFromProjectDialog({
  children,
  projectId,
  estimateId,
}: {
  children: React.ReactNode;
  projectId: string;
  estimateId: string;
}) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return removeEstimateFromProject(estimateId, projectId);
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["project_estimates", { projectId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["estimate", { estimateId }],
      });

      toast.success("Estimate removed from project successfully.");
      setIsDialogOpen(false);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove This Estimate from a Project</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to remove this
            estimate from the project?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          <Button
            disabled={isPending}
            onClick={() => setIsDialogOpen(false)}
            variant={"outline"}
            className="w-full"
          >
            Cancel
          </Button>

          <Button
            disabled={isPending}
            onClick={() => mutate()}
            className="bg-destructive w-full max-sm:order-first"
          >
            {isPending ? "Removing..." : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectEstimatesActions({ estimate }: { estimate: Estimate }) {
  const { push } = useRouter();
  const handleViewEstimate = () => {
    push(`/dashboard/estimates/${estimate.id}`);
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
          className="flex flex-col w-max p-0 divide-y-muted divide-y "
        >
          <Button
            onClick={handleViewEstimate}
            className="rounded-none last:rounded-b-md  first:rounded-t-md  text-xs data-[state=active]:bg-black data-[state=active]:text-white  bg-transparent w-full text-black hover:bg-muted "
          >
            View Estimate
          </Button>

          <RemoveEstimateFromProjectDialog
            estimateId={estimate.id}
            projectId={estimate.projectId}
          >
            <Button className="rounded-none last:rounded-b-md  first:rounded-t-md   text-xs  bg-transparent w-full text-destructive hover:bg-destructive/20 ">
              Remove from Project
            </Button>
          </RemoveEstimateFromProjectDialog>
        </PopoverContent>
      </Popover>
    );
  }
}
