import { CircleCheck, Flame, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { AuthUserType, Subscription } from "@/types";
import Link from "next/link";
import { subscribeToPlan } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getPlanLabel, isCurrentPlan } from "@/utils/funcs";

type Props = {
  plan: Subscription;
  user: AuthUserType | null;
};

function PlanCard({ plan, user }: Props) {
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return subscribeToPlan(plan.id);
    },
    onSuccess(url) {
      window.location.href = url;
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  return (
    <article
      className={cn(
        "w-full relative rounded-[20px] bg-[#FAFAFB] min-h-[500px] px-5 py-6 flex flex-col  justify-between items-start gap-6 h-full"
      )}
    >
      {plan.name === "Starter Plan" && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-sm text-white w-[150px] h-[30px] rounded-4xl  bg-main-blue gap-1 flex items-center justify-center">
          <Flame className="size-4" />
          <span>Popular</span>
        </div>
      )}
      <div className="w-full flex items-center justify-between">
        <h3 className="text-2xl font-medium font-dm text-main-blue">
          {plan.name}
        </h3>
        <span className="text-2xl text-main-blue font-broke-bold ">
          ${plan.price}/{plan.interval === "monthly" ? "mo" : "yr"}
        </span>
      </div>
      <div className="flex flex-col w-full gap-5">
        <h5 className="text-lg font-medium font-dm text-main-blue">
          All core benefits in one unified platform
        </h5>
        <ul className="flex min-h-[160px] flex-col w-full gap-5">
          {plan.benefits.map((benefit) => (
            <li key={benefit.id} className="flex capitalize items-center gap-2">
              <CircleCheck className="text-white fill-black" />
              <span className="text-base text-[#7C7C7C]">
                {benefit.benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {user ? (
        <Button
          disabled={isPending || isCurrentPlan(plan, user)}
          onClick={() => mutate()}
          className="rounded-4xl h-11 w-full bg-main-blue border font-dm font-medium border-transparent text-white hover:border-main-blue hover:bg-transparent hover:text-main-blue"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span> {getPlanLabel(plan, user)}</span>
          )}
        </Button>
      ) : (
        <Button
          asChild
          className="rounded-4xl h-11 w-full bg-main-blue border font-dm font-medium border-transparent text-white hover:border-main-blue hover:bg-transparent hover:text-main-blue"
        >
          <Link href="/sign-in">Sign in to Subscribe</Link>
        </Button>
      )}
    </article>
  );
}
export default PlanCard;
