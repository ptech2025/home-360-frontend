"use client";

import { AuthUserType } from "@/types";
import { format, isBefore } from "date-fns";
import { Button } from "../ui/button";
import Link from "next/link";
import { cancelSubscription } from "@/services/subscription";
import { useMutation } from "@tanstack/react-query";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { toast } from "sonner";

export const DisplayCurrentPlan = ({ user }: { user: AuthUserType }) => {
  const { subscription } = user;
  const { mutate, isPending } = useMutation({
    mutationFn: (planId: string) => {
      return cancelSubscription(planId);
    },
    onSuccess() {
      toast.success("Subscription cancelled successfully.");
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });
  return (
    <div className="rounded-[1.75rem] bg-[#FAFAFB]  p-3 pt-4 flex-col flex gap-3">
      <h3 className=" pl-2 text-base font-medium font-broke-medium text-black">
        Plans
      </h3>

      <div className="bg-white shadow-xs grid-cols-1 grid gap-6 rounded-2xl p-4 lg:p-6 xl:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5 ">
            <span className="text-sm text-black font-medium font-circular-medium">
              Current Plan
            </span>
            <h4 className="text-xl md:text-2xl font-semibold font-circular-medium text-main-yellow">
              {user.subscription ? user.subscription.plan.name : "Free Trial"}
            </h4>
            <p className="text-black/80 text-xs">
              Take your estimates and projects to the next level with more
              features
            </p>
          </div>
          <Button
            asChild
            variant="link"
            className="text-black text-base font-medium"
          >
            <Link href="/pricing">Upgrade or Change Plan</Link>
          </Button>
        </div>
        <h5 className="font-semibold font-broke-semi text-main-yellow text-xl md:text-2xl">
          {subscription ? (
            <>
              ${subscription.plan.price}/{subscription.plan.interval}
            </>
          ) : isBefore(new Date(), new Date(user.trialEnd)) ? (
            // still within trial
            <>
              Free trial ends on {format(new Date(user.trialEnd), "MM/dd/yyyy")}
            </>
          ) : (
            // trial expired
            <>Your free trial has expired</>
          )}
        </h5>
        {subscription && (
          <Button
            disabled={isPending}
            onClick={() => mutate(subscription.plan.id)}
            className="h-11 ml-auto hover:ring-[3px]  ring-destructive/50 min-w-[166px]  transition-all duration-200 py-1 px-4  w-full  md:w-max rounded-md md:rounded-4xl bg-destructive text-white flex gap-1 items-center text-sm border hover:border-destructive hover:bg-transparent hover:text-destructive"
          >
            <span>{isPending ? "Cancelling..." : "Cancel Subscription"}</span>
          </Button>
        )}
      </div>
    </div>
  );
};
