"use client";

import { useOnboardingStore } from "@/store/onboardingStore";
import { JSX, useEffect } from "react";
import CreateHomeOnboarding from "./CreateHomeOnboarding";
import WelcomeOnboarding from "./WelcomeOnboarding";
import { Home } from "@/types/prisma-schema-types";

type Props = {
  homes: Home[];
};

type RenderCompType = {
  [key: number]: JSX.Element;
};

function OnboardingWrapper({ homes }: Props) {
  const { currentPage, setCurrentPage } = useOnboardingStore();

  const renderComp: RenderCompType = {
    1: <CreateHomeOnboarding />,
    2: <WelcomeOnboarding home={homes[0]} />,
  };

  useEffect(() => {
    if (homes.length > 0) {
      setCurrentPage(2);
    } else {
      setCurrentPage(1);
    }
  }, [homes, setCurrentPage]);

  return (
    <section className="custom-container min-h-dvh flex justify-center items-start w-full">
      <div className="w-full max-w-lg flex-col items-center flex gap-6 lg:gap-8">
        {renderComp[currentPage] || (
          <h1 className="text-2xl text-main-green">Page not found</h1>
        )}
      </div>
    </section>
  );
}
export default OnboardingWrapper;
