import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { createSession } from "@/services/chat-session";
import { Button } from "@/components/ui/button";
import { Loader2, Ban, Plus } from "lucide-react";

function ProjectEstimatesEmpty() {
  const { push } = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return createSession();
    },

    onSuccess(data) {
      push(`/dashboard/c/${data}`);
    },

    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const handleCreateEstimate = () => {
    mutate();
  };
  return (
    <div className="flex gap-4 min-h-[300px] items-center justify-center flex-col">
      <div className="flex justify-center flex-col gap-1 items-center">
        <Ban className="size-6 text-main-blue" />
        <h3 className="text-lg text-center font-medium text-main-blue">
          No Estimates Found
        </h3>
      </div>
      <p className="text-center text-sm text-main-blue">
        Your recent assigned estimates will appear here{" "}
      </p>
      <Button
        disabled={isPending}
        onClick={handleCreateEstimate}
        className="h-11 hover:ring-[3px]  ring-dark-orange/50  transition-all duration-200 py-1 px-4 w-max rounded-md md:rounded-4xl bg-dark-orange text-white flex gap-1 items-center text-sm border hover:border-dark-orange hover:bg-transparent hover:text-dark-orange"
      >
        {isPending ? (
          <Loader2 className="size-4" />
        ) : (
          <>
            <Plus className="size-4" />
            <span>New Estimate</span>
          </>
        )}
      </Button>
    </div>
  );
}
export default ProjectEstimatesEmpty;
