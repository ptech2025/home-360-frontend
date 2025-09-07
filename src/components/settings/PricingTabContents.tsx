import { AuthUserType } from "@/types";
import { format, isBefore } from "date-fns";
import { Button } from "../ui/button";
import Link from "next/link";

export const DisplayCurrentPlan = ({ user }: { user: AuthUserType }) => {
  return (
    <div className="rounded-[1.75rem] bg-[#FAFAFB]  p-3 pt-4 flex-col flex gap-3">
      <h3 className=" pl-2 text-base font-medium font-broke-medium text-main-blue">
        Plans
      </h3>

      <div className="bg-white shadow-xs grid-cols-1 grid gap-6 rounded-2xl p-4 lg:p-6 xl:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5 ">
            <span className="text-sm text-main-blue font-medium font-dm">
              Current Plan
            </span>
            <h4 className="text-xl md:text-2xl font-semibold font-dm text-dark-orange">
              {user.subscription ? user.subscription.plan.name : "Free Trial"}
            </h4>
            <p className="text-main-blue/80 text-xs">
              Take your estimates and projects to the next level with more
              features
            </p>
          </div>
          <Button
            asChild
            variant="link"
            className="text-main-blue text-base font-medium"
          >
            <Link href="/pricing">Upgrade or Change Plan</Link>
          </Button>
        </div>
        <h5 className="font-semibold font-broke-semi text-dark-orange text-xl md:text-2xl">
          {user.subscription ? (
            <>
              ${user.subscription.plan.price}/{user.subscription.plan.interval}
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
      </div>
    </div>
  );
};
