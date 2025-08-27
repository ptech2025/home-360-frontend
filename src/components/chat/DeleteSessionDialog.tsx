import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { PiTrash } from "react-icons/pi";
import { Button } from "../ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { toast } from "sonner";
import { deleteChatSessionServer } from "@/lib/actions";

function DeleteSessionDialog({ sessionId }: { sessionId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return deleteChatSessionServer(sessionId);
    },

    onSuccess() {
      toast.success("Session deleted successfully.");
      setIsDialogOpen(false);
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="shrink-0 size-10 rounded-full flex items-center justify-center  hover:text-destructive text-main-blue/80 ">
        <PiTrash className="size-5 text-inherit" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Chat Session</DialogTitle>
          <DialogDescription>
            This will permanently delete the chat session and any unsaved
            estimates. This action cannot be undone. Are you sure you want to
            continue?
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
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteSessionDialog;
