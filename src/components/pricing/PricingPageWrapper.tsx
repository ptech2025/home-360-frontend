"use client";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import PlanCard from "./PlanCard";
import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptions } from "@/services/user";
import { Skeleton } from "../ui/skeleton";
import { AuthUserType } from "@/types";

type Props = {
  user: AuthUserType | null;
};

function PricingPageWrapper({ user }: Props) {
  const [pricingModel, setPricingModel] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const { data, isLoading } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => fetchSubscriptions(),
  });

  if (isLoading) {
    return (
      <div className="custom-container flex justify-center items-center flex-col gap-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-sm text-center uppercase text-[#9E9E9E] font-mon">
            Pricing
          </h1>
          <h2 className="text-3xl text-center md:text-[2.5rem] font-bold font-broke-bold text-main-blue">
            Plans and Pricing
          </h2>
          <span className="text-sm text-center text-[#9E9E9E] ">
            Flexible plans and solutions for business of all sizes
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <span
            data-state={pricingModel}
            className={
              "text-sm data-[state=monthly]:text-main-blue text-[#9E9E9E]"
            }
          >
            Monthly
          </span>
          <Switch
            checked={pricingModel === "yearly"}
            onCheckedChange={(state) =>
              setPricingModel(state ? "yearly" : "monthly")
            }
            className="data-[state=checked]:bg-main-blue"
          />
          <span
            data-state={pricingModel}
            className={
              "text-sm data-[state=yearly]:text-main-blue text-[#9E9E9E]"
            }
          >
            Yearly
          </span>

          <Badge className={cn("bg-light-blue text-black rounded-2xl")}>
            Save 20%
          </Badge>
        </div>
        <section className="grid max-w-[60rem] grid-cols-1 md:grid-cols-2 gap-10 w-full md:min-h-[580px]">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="w-full min-h-[400px] h-full" />
          ))}
        </section>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="custom-container flex justify-center items-center flex-col gap-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-sm text-center uppercase text-[#9E9E9E] font-mon">
            Pricing
          </h1>
          <h2 className="text-3xl text-center md:text-[2.5rem] font-bold font-broke-bold text-main-blue">
            Plans and Pricing
          </h2>
          <span className="text-sm text-center text-[#9E9E9E] ">
            Flexible plans and solutions for business of all sizes
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <span
            data-state={pricingModel}
            className={
              "text-sm data-[state=monthly]:text-main-blue text-[#9E9E9E]"
            }
          >
            Monthly
          </span>
          <Switch
            checked={pricingModel === "yearly"}
            onCheckedChange={(state) =>
              setPricingModel(state ? "yearly" : "monthly")
            }
            className="data-[state=checked]:bg-main-blue"
          />
          <span
            data-state={pricingModel}
            className={
              "text-sm data-[state=yearly]:text-main-blue text-[#9E9E9E]"
            }
          >
            Yearly
          </span>

          <Badge className={cn("bg-light-blue text-black rounded-2xl")}>
            Save 20%
          </Badge>
        </div>
        <section className="grid max-w-[60rem] grid-cols-1 md:grid-cols-2 gap-10 w-full md:min-h-[580px]"></section>
      </div>
    );
  }

  return (
    <div className="custom-container flex justify-center items-center flex-col gap-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-sm text-center uppercase text-[#9E9E9E] font-mon">
          Pricing
        </h1>
        <h2 className="text-3xl text-center md:text-[2.5rem] font-bold font-broke-bold text-main-blue">
          Plans and Pricing
        </h2>
        <span className="text-sm text-center text-[#9E9E9E] ">
          Flexible plans and solutions for business of all sizes
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <span
          data-state={pricingModel}
          className={
            "text-sm data-[state=monthly]:text-main-blue text-[#9E9E9E]"
          }
        >
          Monthly
        </span>
        <Switch
          checked={pricingModel === "yearly"}
          onCheckedChange={(state) =>
            setPricingModel(state ? "yearly" : "monthly")
          }
          className="data-[state=checked]:bg-main-blue"
        />
        <span
          data-state={pricingModel}
          className={
            "text-sm data-[state=yearly]:text-main-blue text-[#9E9E9E]"
          }
        >
          Yearly
        </span>

        <Badge className={cn("bg-light-blue text-black rounded-2xl")}>
          Save 20%
        </Badge>
      </div>
      <section className="grid max-w-[60rem] grid-cols-1 md:grid-cols-2 gap-10 w-full md:min-h-[580px]">
        {data
          .filter((item) => item.interval === pricingModel)
          .map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} user={user} />
          ))}{" "}
      </section>
    </div>
  );
}
export default PricingPageWrapper;
