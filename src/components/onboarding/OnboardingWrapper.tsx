"use client";

import { useEffect, useState } from "react";
import CreateHomeOnboarding from "./CreateHomeOnboarding";
import WelcomeOnboarding from "./WelcomeOnboarding";
import { Home, Subscription } from "@/types/prisma-schema-types";
import PricingTabs from "../pricing/PricingTabs";

type Props = {
  homes: Home[];
  subscription: Subscription | null;
};

function OnboardingWrapper({ homes, subscription }: Props) {
  const [firstHome, setFirstHome] = useState<Home | null>(homes[0]);

  useEffect(() => {
    if (homes.length > 0) {
      setFirstHome(homes[0]);
    }
  }, [homes]);

  return (
    <section className="custom-container min-h-dvh flex justify-center items-start w-full">
      <div className="w-full max-w-6xl flex-col justify-center items-center flex gap-6 lg:gap-8">
        {subscription ? (
          <div className="max-w-xl">
            {firstHome ? (
              <WelcomeOnboarding home={firstHome} />
            ) : (
              <CreateHomeOnboarding setFirstHome={setFirstHome} />
            )}
          </div>
        ) : (
          <PricingTabs currentPlan={null} type="onboarding" />
        )}
      </div>
    </section>
  );
}
export default OnboardingWrapper;
