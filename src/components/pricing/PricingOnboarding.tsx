"use client";

import {
  subscriptionMutations,
  subscriptionQueries,
} from "@/queries/subscription";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SubscriptionPlan } from "@/types/prisma-schema-types";
import { useState } from "react";
import { Button } from "../ui/button";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AnimatedPrice } from "./AnimatedPrice";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { CircleCheckIcon } from "../global/Icons";
import { ArrowRight, Loader2 } from "lucide-react";

type Props = {
  currentPlan: SubscriptionPlan | null;
  type: "onboarding" | "change";
};

function PricingOnboarding({ currentPlan, type }: Props) {
  const router = useRouter();
  const [priceMode, setPriceMode] = useState<"monthly" | "yearly">("monthly");
  const { data, isLoading } = useQuery(subscriptionQueries.fetchPlans());
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const { mutate: choosePlan, isPending: isChoosingPlan } = useMutation({
    mutationFn: subscriptionMutations.subscribeToPlan,
    onSuccess(url) {
      window.location.href = url;
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });
  const { mutate: changePlan, isPending: isChangingPlan } = useMutation({
    mutationFn: subscriptionMutations.changePlan,
    onSuccess() {
      toast.success("Subscription updated successfully");
      router.push("/onboarding");
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
      setSelectedPlanId(null);
    },
  });

  const handleSelectedPlan = (planId: string | undefined) => {
    if (!planId) return;
    setSelectedPlanId(planId);
    if (type === "onboarding") {
      choosePlan({ planId });
    } else {
      changePlan({ planId });
    }
  };

  const isLoadingSelectedPlan = isChoosingPlan || isChangingPlan;

  return (
    <section className="flex relative z-20 flex-col gap-4 items-center w-full ">
      <div className="flex items-center justify-center gap-4 flex-col text-center max-w-xl">
        <h1 className="text-4xl text-center lg:text-5xl text-black font-medium font-circular-medium">
          Unlock the <span className="text-main-green">Full Potential</span> of
          Your Home{" "}
        </h1>
        <p className="text-black text-base text-center">
          With flexible pricing plans, you can choose the option that best fits
          your needs and budget.
        </p>
      </div>

      <div className="flex items-center justify-center gap-8 flex-col w-full">
        {data && (
          <div className="flex items-center gap-2">
            <span
              data-state={priceMode === "monthly" ? "checked" : "unchecked"}
              className="text-black text-base data-[state=checked]:text-main-green font-circular-medium"
            >
              Monthly
            </span>
            <Switch
              checked={priceMode === "yearly"}
              onCheckedChange={(checked) =>
                setPriceMode(checked ? "yearly" : "monthly")
              }
            />
            <span
              data-state={priceMode === "yearly" ? "checked" : "unchecked"}
              className="text-black text-base data-[state=checked]:text-main-green font-circular-medium"
            >
              Yearly
            </span>
            <Badge className="bg-main-green/10 rounded-xl px-2 font-circular-medium text-sm text-main-green border-main-green">
              <span>-15%</span>
            </Badge>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-light-gray rounded-2xl p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          ) : data && data.length > 0 ? (
            (() => {
              // Filter plans by the selected interval
              const filteredPlans = (data || []).filter(
                (plan) => plan.interval === priceMode
              );

              if (filteredPlans.length === 0) {
                return (
                  <div className="col-span-3 text-center text-black py-8">
                    No {priceMode} plans available.
                  </div>
                );
              }

              return filteredPlans.map((plan, index) => {
                const isMiddleCard = index === 1;
                return (
                  <div
                    key={plan.id}
                    className={`relative bg-white border rounded-3xl p-6 flex flex-col ${
                      isMiddleCard
                        ? "border-main-green shadow-lg"
                        : "border-light-gray"
                    }`}
                  >
                    {isMiddleCard && (
                      <div className="absolute z-10 -top-4 left-1/2 -translate-x-1/2">
                        <div
                          className="absolute inset-0 bg-white rounded-full -z-10"
                          style={{
                            width: "calc(100% + 8px)",
                            height: "calc(100% + 8px)",
                            top: "-4px",
                            left: "-4px",
                          }}
                        ></div>
                        <Badge className="bg-main-yellow/10 border border-main-yellow text-main-yellow rounded-full px-4 py-1 font-circular-medium text-sm relative">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <div className="flex flex-col gap-4 flex-1">
                      <div>
                        <h3
                          className={cn(
                            "text-xl font-circular-bold text-black mb-2",
                            isMiddleCard && "text-main-green"
                          )}
                        >
                          {plan.name}
                        </h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-circular-bold text-black">
                            <AnimatedPrice value={plan.price} />
                          </span>
                          <span className="text-base text-black/60 font-circular-medium">
                            /{plan.interval}
                          </span>
                        </div>
                      </div>
                      {plan.benefits && plan.benefits.length > 0 && (
                        <ul className="flex flex-col gap-3 flex-1">
                          {plan.benefits.map((benefit, benefitIndex) => (
                            <li
                              key={benefitIndex}
                              className="flex items-start gap-2"
                            >
                              <CircleCheckIcon
                                className={cn(
                                  "w-5 h-5 text-black shrink-0 mt-0.5",
                                  isMiddleCard && "text-main-green"
                                )}
                              />
                              <span className="text-sm text-black font-circular-light">
                                {benefit.benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button
                        className={cn(
                          `w-full mt-auto h-12 group`,
                          isMiddleCard
                            ? "bg-main-green hover:bg-main-green/90 text-white"
                            : "bg-white border border-light-gray text-black hover:bg-gray-50"
                        )}
                        onClick={() => handleSelectedPlan(plan.id)}
                        disabled={
                          isLoadingSelectedPlan || currentPlan?.id === plan.id
                        }
                      >
                        {isLoadingSelectedPlan && selectedPlanId === plan.id ? (
                          <Loader2 className="w-5 h-5 animate-spin text-inherit" />
                        ) : (
                          <>
                            <span>
                              {currentPlan?.id === plan.id
                                ? "Current Plan"
                                : `Subscribe to ${plan.name}`}
                            </span>

                            <ArrowRight
                              className={cn(
                                "w-5 h-5 text-inherit shrink-0 group-hover:-translate-x-1 transition-all duration-300",
                                currentPlan?.id === plan.id
                                  ? "opacity-0"
                                  : "opacity-100"
                              )}
                            />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              });
            })()
          ) : (
            <div className="col-span-3 text-center text-black py-8">
              No subscription plans available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PricingOnboarding;
