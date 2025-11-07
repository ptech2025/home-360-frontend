"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { userMutations } from "@/queries/user";

function UnsubscribeButtons({ email }: { email: string }) {
  const router = useRouter();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: userMutations.removeFromWaitList,
    onSuccess: () => {
      router.replace("/");
      toast.success("Successfully unsubscribed!");
    },
  });
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl text-main-green font-circular-medium font-bold">
        Are you sure you want to unsubscribe?
      </h1>
      <div className="flex flex-col gap-4 items-center">
        <Button
          disabled={isLoading}
          onClick={() => mutate(email)}
          className="h-11 text-white rounded-sm w-40 bg-main-yellow"
        >
          {isLoading ? (
            <Loader2 className="size-4" />
          ) : (
            <span>Yes, Unsubscribe Me</span>
          )}
        </Button>
        <Button
          disabled={isLoading}
          variant="outline"
          asChild
          size={"lg"}
          className="h-11  rounded-sm w-40"
        >
          <Link href="/">Cancel</Link>
        </Button>
      </div>
    </div>
  );
}
export default UnsubscribeButtons;
