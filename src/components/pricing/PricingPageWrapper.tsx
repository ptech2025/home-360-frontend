"use client";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import PlanCard from "./PlanCard";
import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptions } from "@/services/user";
import { Skeleton } from "../ui/skeleton";

function PricingPageWrapper() {
  const [showAnnual, setShowAnnual] = useState(false);

  const {  isLoading } = useQuery({
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
            data-state={showAnnual ? "year" : "month"}
            className={
              "text-sm data-[state=month]:text-main-blue text-[#9E9E9E]"
            }
          >
            Monthly
          </span>
          <Switch
            checked={showAnnual}
            onCheckedChange={setShowAnnual}
            className="data-[state=checked]:bg-main-blue"
          />
          <span
            data-state={showAnnual ? "year" : "month"}
            className={
              "text-sm data-[state=year]:text-main-blue text-[#9E9E9E]"
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
          data-state={showAnnual ? "year" : "month"}
          className={"text-sm data-[state=month]:text-main-blue text-[#9E9E9E]"}
        >
          Monthly
        </span>
        <Switch
          checked={showAnnual}
          onCheckedChange={setShowAnnual}
          className="data-[state=checked]:bg-main-blue"
        />
        <span
          data-state={showAnnual ? "year" : "month"}
          className={"text-sm data-[state=year]:text-main-blue text-[#9E9E9E]"}
        >
          Yearly
        </span>

        <Badge className={cn("bg-light-blue text-black rounded-2xl")}>
          Save 20%
        </Badge>
      </div>
      <section className="grid max-w-[60rem] grid-cols-1 md:grid-cols-2 gap-10 w-full md:min-h-[580px]">
        {Array.from({ length: 2 }).map((_, i) => (
          <PlanCard key={i} />
        ))}
      </section>
    </div>
  );
}
export default PricingPageWrapper;
