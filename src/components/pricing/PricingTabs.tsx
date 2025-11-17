"use client";

import {
  subscriptionMutations,
  subscriptionQueries,
} from "@/queries/subscription";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SubscriptionPlan } from "@/types/prisma-schema-types";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { CircleCheck, Loader2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { toast } from "sonner";

const tabsOptions = [
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "yearly",
    label: "Yearly",
  },
];

type Props = {
  currentPlan: SubscriptionPlan | null;
  type: "onboarding" | "change";
};

function PricingTabs({ currentPlan, type }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    currentPlan
  );
  const [activeTab, setActiveTab] = useState("monthly");
  const [hasMounted, setHasMounted] = useState(false);
  const { data, isLoading } = useQuery(subscriptionQueries.fetchPlans());

  useEffect(() => {
    setHasMounted(true);
  }, []);

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
    onSuccess(url) {
      window.location.href = url;
    },
    onError: (error) => {
      const msg = renderAxiosOrAuthError(error);
      toast.error(msg);
    },
  });

  const handleSelectedPlan = (planId: string | undefined) => {
    if (!planId) return;
    if (type === "onboarding") {
      choosePlan({ planId });
    } else {
      changePlan({ planId });
    }
  };

  // Auto-select first plan when data loads or tab changes
  useEffect(() => {
    if (!data || data.length === 0) return;

    const hasMonthly =
      (data || []).filter((p) => p.interval === "monthly").length > 0;
    const hasYearly =
      (data || []).filter((p) => p.interval === "yearly").length > 0;

    // If the active tab has no plans, switch to the one that does to avoid empty mount
    if (activeTab === "monthly" && !hasMonthly && hasYearly) {
      setActiveTab("yearly");
      return;
    }
    if (activeTab === "yearly" && !hasYearly && hasMonthly) {
      setActiveTab("monthly");
      return;
    }

    const plansForActiveTab =
      activeTab === "monthly"
        ? (data || []).filter((p) => p.interval === "monthly")
        : (data || []).filter((p) => p.interval === "yearly");
    if (plansForActiveTab && plansForActiveTab.length > 0) {
      const firstPlan = plansForActiveTab[0];
      if (!selectedPlan || selectedPlan.interval !== activeTab) {
        setSelectedPlan(firstPlan);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, activeTab]);

  return (
    <section className="flex relative z-20 flex-col gap-4 items-center w-full ">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-2xl font-circular-bold text-center font-bold">
          Select Your Plan
        </h2>
        <p className="text-base font-circular-medium text-center text-black">
          Choose the plan that fits your needs. You can upgrade or cancel
          anytime.
        </p>
      </div>

      {isLoading && (
        <div className="w-full flex flex-col gap-6 min-h-[300px]">
          <div className="flex justify-center gap-2">
            {tabsOptions.map((option) => (
              <Skeleton key={option.value} className="h-9 w-24 rounded-md" />
            ))}
          </div>
          <div className="flex w-full flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-6 flex-1 min-h-[300px]">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[60px] rounded-2xl" />
              ))}
            </div>
            <div className="flex p-5 bg-white flex-col rounded-2xl border-light-gray border w-full max-w-[400px] gap-4 min-h-[200px]">
              <Skeleton className="h-5 w-24" />
              <ul className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center gap-2"
                  >
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {!isLoading && (!data || data.length === 0) && (
        <div className="w-full flex items-center justify-center rounded-md border border-light-gray bg-white p-6 text-base text-black">
          No subscription plans available.
        </div>
      )}

      {!isLoading && data && data.length > 0 && !selectedPlan && (
        <div className="w-full flex items-center justify-center rounded-md border border-light-gray bg-white p-6 text-base text-gray">
          Loading plans...
        </div>
      )}

      {hasMounted && !isLoading && data && data.length > 0 && selectedPlan && (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full items-center justify-center gap-6"
        >
          <TabsList>
            {tabsOptions.map((option) => (
              <TabsTrigger
                key={option.value}
                value={option.value}
                className="data-[state=active]:bg-main-green data-[state=inactive]:text-main-green data-[state=active]:text-white text-sm font-circular-medium px-4"
              >
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            value="monthly"
            className="flex w-full flex-col md:flex-row gap-4 min-h-[300px]"
          >
            {(() => {
              const plans = (data || []).filter(
                (p) => p.interval === "monthly"
              );
              if (plans.length === 0) {
                return (
                  <div className="w-full rounded-md border border-light-gray bg-white p-4 text-sm text-black">
                    No monthly plans available.
                  </div>
                );
              }
              const selectedInTab =
                plans.find((p) => p.id === selectedPlan?.id) || plans[0];
              return (
                <>
                  <div className="flex md:basis-1/2 flex-col gap-6 flex-1 min-h-[300px]">
                    {plans.map((plan) => (
                      <Button
                        key={plan.id}
                        data-state={
                          selectedPlan?.id === plan.id ? "active" : "inactive"
                        }
                        onClick={() => setSelectedPlan(plan)}
                        className="flex h-[60px]  rounded-2xl py-4 border data-[state=inactive]:text-black  data-[state=inactive]:border-light-gray shadow-none data-[state=inactive]:bg-white justify-between items-center gap-4 data-[state=active]:bg-main-green data-[state=active]:text-white"
                      >
                        <div className="flex items-center gap-4">
                          <Checkbox
                            checked={selectedPlan?.id === plan.id}
                            className="data-[state=checked]:bg-white data-[state=checked]:border-main-green data-[state=checked]:text-main-green shrink-0"
                          />
                          <h3 className="text-sm font-circular-medium capitalize">
                            {plan.name}
                          </h3>
                        </div>{" "}
                        <span className="text-lg font-circular-medium">
                          ${plan.price}/{plan.interval}
                        </span>
                      </Button>
                    ))}

                    <Button
                      onClick={() => handleSelectedPlan(selectedPlan?.id)}
                      className="w-max green-btn min-w-[175px]"
                      disabled={
                        !selectedPlan || currentPlan?.id === selectedPlan?.id
                      }
                    >
                      {isChoosingPlan || isChangingPlan ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <span>
                          {currentPlan?.id === selectedPlan?.id
                            ? "Current Plan"
                            : `Upgrade to ${selectedPlan?.name}`}
                        </span>
                      )}
                    </Button>
                  </div>
                  <div className="flex p-5 bg-white flex-col rounded-2xl border-light-gray border w-full md:max-w-[400px] gap-4 min-h-[200px]">
                    <h5 className="text-base font-circular-medium">
                      Benefits:
                    </h5>
                    <ul className="flex flex-col gap-2">
                      {selectedInTab?.benefits &&
                      selectedInTab.benefits.length > 0 ? (
                        selectedInTab.benefits.map((benefit) => (
                          <li
                            key={benefit.id}
                            className="flex justify-between items-center gap-2"
                          >
                            <span className="text-sm text-gray ">
                              {benefit.benefit}
                            </span>
                            <CircleCheck className="text-white size-4  shrink-0 fill-main-green" />
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-gray">
                          No benefits available
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              );
            })()}
          </TabsContent>{" "}
          <TabsContent
            value="yearly"
            className="flex w-full flex-col md:flex-row gap-4 min-h-[300px]"
          >
            {(() => {
              const plans = (data || []).filter((p) => p.interval === "yearly");
              if (plans.length === 0) {
                return (
                  <div className="w-full rounded-md border border-light-gray bg-white p-4 text-sm text-gray">
                    No yearly plans available.
                  </div>
                );
              }
              const selectedInTab =
                plans.find((p) => p.id === selectedPlan?.id) || plans[0];
              return (
                <>
                  <div className="flex flex-col gap-6 flex-1 min-h-[300px]">
                    {plans.map((plan) => (
                      <Button
                        key={plan.id}
                        data-state={
                          selectedPlan?.id === plan.id ? "active" : "inactive"
                        }
                        onClick={() => setSelectedPlan(plan)}
                        className="flex h-[60px]  rounded-2xl py-4 border data-[state=inactive]:text-black  data-[state=inactive]:border-light-gray shadow-none data-[state=inactive]:bg-white justify-between items-center gap-4 data-[state=active]:bg-main-green data-[state=active]:text-white"
                      >
                        <div className="flex items-center gap-4">
                          <Checkbox
                            checked={selectedPlan?.id === plan.id}
                            className="data-[state=checked]:bg-white data-[state=checked]:border-main-green data-[state=checked]:text-main-green shrink-0"
                          />
                          <h3 className="text-sm font-circular-medium capitalize">
                            {plan.name}
                          </h3>
                        </div>{" "}
                        <span className="text-lg font-circular-medium">
                          ${plan.price}/{plan.interval}
                        </span>
                      </Button>
                    ))}
                    <Button
                      onClick={() => handleSelectedPlan(selectedPlan?.id)}
                      className="w-max green-btn min-w-[175px]"
                      disabled={
                        !selectedPlan || currentPlan?.id === selectedPlan?.id
                      }
                    >
                      {isChoosingPlan || isChangingPlan ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <span>
                          {currentPlan?.id === selectedPlan?.id
                            ? "Current Plan"
                            : `Subscribe to ${selectedPlan?.name}`}
                        </span>
                      )}
                    </Button>
                  </div>
                  <div className="flex p-5 bg-white flex-col rounded-2xl border-light-gray border w-full md:max-w-[400px] gap-4 min-h-[200px]">
                    <h5 className="text-base font-circular-medium">
                      Benefits:
                    </h5>
                    <ul className="flex flex-col gap-2">
                      {selectedInTab?.benefits &&
                      selectedInTab.benefits.length > 0 ? (
                        selectedInTab.benefits.map((benefit) => (
                          <li
                            key={benefit.id}
                            className="flex justify-between items-center gap-2"
                          >
                            <span className="text-sm text-gray ">
                              {benefit.benefit}
                            </span>
                            <CircleCheck className="text-white size-4  shrink-0 fill-main-green" />
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-gray">
                          No benefits available
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              );
            })()}
          </TabsContent>
        </Tabs>
      )}
    </section>
  );
}

export default PricingTabs;
