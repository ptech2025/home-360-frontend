"use client";

import { useOnboardingStore } from "@/store/onboardingStore";
import { AuthUserType } from "@/types";
import { JSX, useEffect } from "react";
import CreateHomeOnboarding from "./CreateHomeOnboarding";
import WelcomeOnboarding from "./WelcomeOnboarding";

// type Props = {
//   // profile: AuthUserType["profile"];
//   // name: string;
//   // userId: string;
// };

type RenderCompType = {
  [key: number]: JSX.Element;
};
function OnboardingWrapper() {
  const { currentPage, setCurrentPage } = useOnboardingStore();

  const renderComp: RenderCompType = {
    1: <CreateHomeOnboarding />,
    2: <WelcomeOnboarding />,
  };

  // useEffect(() => {
  //   if (!profile) {
  //     setCurrentPage(1);
  //   } else if (profile.companyTrade.length === 0) {
  //     setCurrentPage(2);
  //   } else if (profile.companyTrade.length > 0 && !profile.location) {
  //     setCurrentPage(3);
  //   } else {
  //     setCurrentPage(4);
  //   }
  // }, [profile]);

  return (
    <section className="custom-container min-h-dvh flex justify-center items-start w-full">
      <div className="w-full max-w-md flex-col items-center flex gap-6 lg:gap-8">
        {renderComp[currentPage] || (
          <h1 className="text-2xl text-main-green">Page not found</h1>
        )}
      </div>
    </section>
  );
}
export default OnboardingWrapper;
