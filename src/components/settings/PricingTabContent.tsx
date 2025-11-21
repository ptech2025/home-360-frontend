"use client";

import { AuthUserType } from "@/types";
import { format } from "date-fns";
import { Button } from "../ui/button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import { subscriptionMutations } from "@/queries/subscription";
import { Badge } from "../ui/badge";

export const DisplayCurrentPlan = ({ user }: { user: AuthUserType }) => {
  const { subscription } = user;
  const { mutate, isPending } = useMutation({
    mutationFn: subscriptionMutations.cancelSubscription,
    onSuccess() {
      toast.success("Subscription cancelled successfully.");
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const handleCancelSubscription = () => {
    if (!subscription?.plan?.id) return;
    mutate({ planId: subscription.plan.id });
  };

  return (
    <div className="min-h-full w-full p-4 flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-base font-medium font-circular-medium text-black">
          Plans & Billing
        </h3>
        <p className="text-xs text-gray">
          Review your current subscription and adjust your Home360 plan.
        </p>
      </div>

      <div className="bg-white grid gap-4 ">
        <div className="flex border-2 border-main-green/50 rounded-md p-4 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <h4 className="text-base font-medium font-circular-medium text-black">
                {subscription
                  ? `${subscription.plan.name} - $${subscription.plan.price}/${subscription.plan.interval}`
                  : "Free Plan"}
              </h4>

              {subscription && (
                <Badge className="font-circular-medium  text-center text-main-green bg-main-green/10">
                  Active
                </Badge>
              )}
            </div>

            {subscription && (
              <p className="text-xs text-gray">
                Next billing date:{" "}
                {format(subscription.currentPeriodEnd, "MMM d, yyyy")}
              </p>
            )}
          </div>
          <Button asChild className="h-max green-btn">
            <Link href="/pricing">Manage plan</Link>
          </Button>
        </div>

        {subscription && !subscription.hasBeenCancelled && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="size-6 shrink-0 rounded-full  border border-grey bg-white text-grey"
              >
                <ChevronDown className="size-4" />
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Cancel subscription</DialogTitle>
                <DialogDescription>
                  This will downgrade your Home360 account to the free tier at
                  the end of the current billing period. You can reactivate
                  anytime from the pricing page.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 text-sm text-gray">
                <p>
                  You&apos;ll retain access to premium features until your paid
                  cycle ends. After cancellation, premium automations and
                  insights will pause.
                </p>
                <p className="text-xs text-destructive/80">
                  This action can be reversed before the cycle ends from the
                  pricing page.
                </p>
              </div>
              <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <DialogClose asChild>
                  <Button variant="outline" className="w-full sm:w-max">
                    Keep plan
                  </Button>
                </DialogClose>

                <Button
                  disabled={isPending}
                  onClick={handleCancelSubscription}
                  className="w-full rounded-md border border-destructive bg-destructive text-white transition-all duration-200 hover:bg-transparent hover:text-destructive hover:ring-[3px] ring-destructive/40 sm:w-max"
                >
                  <span>
                    {isPending ? "Cancelling..." : "Confirm cancellation"}
                  </span>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};
