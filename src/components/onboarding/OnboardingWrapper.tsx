"use client";

import { useOnboardingStore } from "@/store/onboardingStore";
import { JSX, useEffect, useState } from "react";
import CreateHomeOnboarding from "./CreateHomeOnboarding";
import WelcomeOnboarding from "./WelcomeOnboarding";
import { Home } from "@/types/prisma-schema-types";

type Props = {
  homes: Home[];
};

function OnboardingWrapper({ homes }: Props) {
  const [firstHome, setFirstHome] = useState<Home | null>(homes[0]);

  useEffect(() => {
    if (homes.length > 0) {
      setFirstHome(homes[0]);
    }
  }, [homes]);

  return (
    <section className="custom-container min-h-dvh flex justify-center items-start w-full">
      <div className="w-full max-w-lg flex-col items-center flex gap-6 lg:gap-8">
        {firstHome ? (
          <WelcomeOnboarding home={firstHome} />
        ) : (
          <CreateHomeOnboarding setFirstHome={setFirstHome} />
        )}
      </div>
    </section>
  );
}
export default OnboardingWrapper;
